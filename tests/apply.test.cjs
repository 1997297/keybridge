const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");

function compile(relativePath) {
  return ts.transpileModule(readFileSync(path.join(root, relativePath), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  }).outputText;
}

const routeCode = compile("app/api/apply/route.ts");
const templateModule = { exports: {} };
vm.runInNewContext(compile("lib/email/templates.ts"), {
  module: templateModule,
  exports: templateModule.exports,
});

// Only synthetic configuration is supplied. Email sending is replaced locally.
function setup({ env = {}, outcomes = [], sendDelayMs = 0 } = {}) {
  const calls = [];
  const configuredKeys = [];
  const logs = [];
  const rendered = [];
  const routeModule = { exports: {} };
  const sgMail = {
    setApiKey: (key) => configuredKeys.push(key),
    send: async (message) => {
      calls.push(message);
      if (sendDelayMs > 0) {
        await new Promise((resolve) => setTimeout(resolve, sendDelayMs));
      }
      const result = outcomes[calls.length - 1];
      if (result instanceof Error) throw result;
      return result || [{ statusCode: 202, headers: { "x-message-id": `email-${calls.length}` } }, {}];
    },
  };

  vm.runInNewContext(routeCode, {
    module: routeModule,
    exports: routeModule.exports,
    require: (name) => {
      if (name === "@sendgrid/mail") return sgMail;
      if (name === "node:crypto") return require("node:crypto");
      if (name === "@/lib/email/templates") return Object.fromEntries(
        Object.entries(templateModule.exports).map(([key, render]) => [key, (...args) => {
          const email = render(...args);
          rendered.push(email);
          return email;
        }])
      );
      if (name === "next/server") return require("next/server");
      throw new Error(`Unexpected import: ${name}`);
    },
    process: {
      env: {
        FROM_EMAIL: "sender@example.com",
        SENDGRID_API_KEY: "SG.synthetic-test-credential",
        AGENT_01_EMAIL: "agent01@example.com",
        AGENT_02_EMAIL: "agent02@example.com",
        AGENT_03_EMAIL: "agent03@example.com",
        CENTRAL_KEYBRIDGE_EMAIL: "central@example.com",
        ...env,
      },
    },
    console: { info() {}, log() {}, error: (...args) => logs.push(args), warn() {} },
  });

  return {
    calls,
    configuredKeys,
    logs,
    rendered,
    submit: async (body, { ip = "203.0.113.10" } = {}) => {
      const response = await routeModule.exports.POST({
        json: async () => body,
        headers: {
          get: (name) => name.toLowerCase() === "x-forwarded-for" ? ip : null,
        },
      });
      return { status: response.status, body: await response.json(), headers: response.headers };
    },
    malformed: () => routeModule.exports.POST({
      json: async () => { throw new SyntaxError(); },
      headers: { get: () => "203.0.113.10" },
    }),
  };
}

function application(overrides = {}) {
  return {
    companyWebsite: "",
    agentCode: "Agent 01",
    propertyType: "Studio",
    firstName: "Test",
    lastName: "Applicant",
    email: "applicant@example.com",
    phone: "2025550101",
    maritalStatus: "Single",
    currentStreetAddress: "123 Test Street",
    currentCity: "Washington",
    currentState: "DC",
    currentZipCode: "20001",
    desiredZipCode: "20002",
    preferredMoveInDate: "2099-12-31",
    amountAvailableForMoveIn: "2000",
    ownsCar: "No",
    hasPet: "No",
    hasBeenEvicted: "No",
    plannedStayDuration: "12 months",
    payAdvanceMonths: "No",
    hasFeeAvailable: "Yes",
    preferredPaymentMethod: "Zelle",
    declarationConfirmed: true,
    ...overrides,
  };
}

test("each agent receives the application with central copied, then applicant confirmation", async () => {
  for (const number of ["01", "02", "03"]) {
    const { calls, configuredKeys, rendered, submit } = setup();
    const result = await submit(application({ agentCode: `Agent ${number}` }));
    assert.equal(result.status, 201);
    assert.equal(result.body.success, true);
    assert.equal(result.body.confirmationEmailSent, true);
    assert.equal(result.body.centralCopySent, true);
    assert.equal(calls.length, 2);
    assert.deepEqual([...calls[0].to], [`agent${number}@example.com`]);
    assert.deepEqual([...calls[0].cc], ["central@example.com"]);
    assert.deepEqual([...calls[1].to], ["applicant@example.com"]);
    assert.equal(calls[1].cc, undefined);
    assert.deepEqual(configuredKeys, ["SG.synthetic-test-credential"]);
    for (const [index, message] of calls.entries()) {
      const rawRender = rendered[index * 2];
      const safeRender = rendered[index * 2 + 1];
      assert.equal(message.from.email, "sender@example.com");
      assert.equal(message.from.name, "Keybridge Residential");
      assert.equal(message.subject, rawRender.subject);
      assert.equal(message.text, rawRender.text);
      assert.equal(message.html, safeRender.html);
      assert.ok(message.html.includes(result.body.referenceId));
      assert.ok(message.text.includes(result.body.referenceId));
    }
    assert.equal(JSON.stringify(result.body).includes("@example.com"), false);
    assert.equal(JSON.stringify(result.body).includes("SG.synthetic-test-credential"), false);
  }
});

test("missing or invalid sender configuration cannot produce a successful submission", async () => {
  for (const env of [
    { SENDGRID_API_KEY: undefined },
    { SENDGRID_API_KEY: "" },
    { SENDGRID_API_KEY: "SG.your_sendgrid_api_key_here" },
    { SENDGRID_API_KEY: "SG.placeholder" },
    { SENDGRID_API_KEY: "invalid" },
    { FROM_EMAIL: "" },
    { FROM_EMAIL: "invalid" },
    { CENTRAL_KEYBRIDGE_EMAIL: "" },
    { CENTRAL_KEYBRIDGE_EMAIL: "invalid" },
  ]) {
    const { calls, configuredKeys, submit } = setup({ env });
    const result = await submit(application());
    assert.equal(result.status, 503);
    assert.equal(result.body.success, false);
    assert.equal(calls.length, 0);
    assert.equal(configuredKeys.length, 0);
  }
});

test("agent rejection, network failure, or unexpected status prevents confirmation and success", async () => {
  for (const failure of [
    new Error("SendGrid authentication rejected"),
    new Error("Network failure"),
    [{ statusCode: 403, headers: {} }, {}],
    [{ statusCode: 500, headers: {} }, {}],
  ]) {
    const { calls, logs, submit } = setup({ outcomes: [failure] });
    const result = await submit(application());
    assert.equal(result.status, 502);
    assert.equal(result.body.success, false);
    assert.equal(calls.length, 1);
    assert.equal(result.body.message.includes("was received"), false);
    assert.equal(logs.length, 1);
  }
});

test("confirmation failure uses the error state and explains that the agent already received the submission", async () => {
  for (const failure of [
    new Error("Recipient rejected"),
    new Error("Network failure"),
    [{ statusCode: 500, headers: {} }, {}],
  ]) {
    const { calls, logs, submit } = setup({ outcomes: [undefined, failure] });
    const result = await submit(application());
    assert.equal(result.status, 502);
    assert.equal(result.body.success, false);
    assert.equal(result.body.confirmationEmailSent, false);
    assert.match(result.body.message, /do not need to submit again/);
    assert.ok(result.body.message.includes(result.body.referenceId));
    assert.equal(calls.length, 2);
    assert.equal(logs.length, 1);
  }
});

test("invalid payloads and unrecognized agent codes never send email", async () => {
  for (const body of [null, [], "text", {}, application({ agentCode: "constructor" }), application({ declarationConfirmed: false })]) {
    const { calls, submit } = setup();
    const result = await submit(body);
    assert.equal(result.status, 400);
    assert.equal(result.body.success, false);
    assert.equal(calls.length, 0);
  }
  const { malformed, calls } = setup();
  assert.equal((await malformed()).status, 400);
  assert.equal(calls.length, 0);
});

test("missing or invalid agent routing blocks sending", async () => {
  for (const email of ["", "invalid"]) {
    const { calls, submit } = setup({ env: { AGENT_01_EMAIL: email } });
    assert.equal((await submit(application())).status, 500);
    assert.equal(calls.length, 0);
  }
});

test("email addresses and the API key are trimmed before sending", async () => {
  const { calls, configuredKeys, submit } = setup({
    env: {
      AGENT_01_EMAIL: " agent01@example.com ",
      CENTRAL_KEYBRIDGE_EMAIL: " central@example.com ",
      FROM_EMAIL: " sender@example.com ",
      SENDGRID_API_KEY: " SG.synthetic-test-credential ",
    },
  });
  assert.equal((await submit(application({ email: " applicant@example.com " }))).status, 201);
  assert.equal(calls[0].to[0], "agent01@example.com");
  assert.equal(calls[0].cc[0], "central@example.com");
  assert.equal(calls[0].from.email, "sender@example.com");
  assert.equal(calls[1].to[0], "applicant@example.com");
  assert.equal(configuredKeys[0], "SG.synthetic-test-credential");
});

test("provider diagnostics are logged without leaking credentials or request headers", async () => {
  const failure = Object.assign(new Error("Forbidden"), {
    code: 403,
    response: { body: { errors: [{ message: "Sender is not verified", field: "from.email" }] } },
    request: { headers: { Authorization: "Bearer SG.synthetic-test-credential" } },
  });
  const { logs, submit } = setup({ outcomes: [failure] });
  const result = await submit(application());
  assert.equal(result.status, 502);
  assert.equal(result.body.success, false);
  const logged = JSON.stringify(logs);
  assert.ok(logged.includes("Sender is not verified"));
  assert.equal(logged.includes("SG.synthetic-test-credential"), false);
  assert.equal(logged.includes("Authorization"), false);
  assert.equal(JSON.stringify(result.body).includes("Sender is not verified"), false);
});

test("honeypot submissions receive a decoy success without sending email", async () => {
  const { calls, configuredKeys, submit } = setup();
  const result = await submit(application({ companyWebsite: "https://spam.example" }));

  assert.equal(result.status, 201);
  assert.equal(result.body.success, true);
  assert.match(result.body.referenceId, /^KB-\d{4}-\d{6}$/);
  assert.equal(result.body.centralCopySent, true);
  assert.equal(result.body.confirmationEmailSent, true);
  assert.equal(calls.length, 0);
  assert.equal(configuredKeys.length, 0);
});

test("rate limiting allows five attempts per IP per hour and rejects the sixth", async () => {
  const { calls, submit } = setup();
  const ip = "198.51.100.25";

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const result = await submit({}, { ip });
    assert.equal(result.status, 400);
  }

  const limited = await submit({}, { ip });
  assert.equal(limited.status, 429);
  assert.equal(limited.body.success, false);
  assert.ok(Number(limited.headers.get("retry-after")) > 0);

  const otherIp = await submit({}, { ip: "198.51.100.26" });
  assert.equal(otherIp.status, 400);
  assert.equal(calls.length, 0);
});

test("sequential duplicate submissions reuse the first result and send only one email pair", async () => {
  const { calls, submit } = setup();
  const payload = application();
  const first = await submit(payload);
  const duplicate = await submit(payload);

  assert.equal(first.status, 201);
  assert.equal(duplicate.status, 201);
  assert.equal(duplicate.body.referenceId, first.body.referenceId);
  assert.equal(calls.length, 2);
});

test("concurrent duplicate submissions share one in-flight delivery", async () => {
  const { calls, submit } = setup({ sendDelayMs: 20 });
  const payload = application();
  const [first, duplicate] = await Promise.all([submit(payload), submit(payload)]);

  assert.equal(first.status, 201);
  assert.equal(duplicate.status, 201);
  assert.equal(duplicate.body.referenceId, first.body.referenceId);
  assert.equal(calls.length, 2);
});

test("user text is normalized and HTML-escaped before insertion into outgoing HTML", async () => {
  const { calls, submit } = setup();
  const result = await submit(application({
    firstName: "  <b>Alice</b>\r\n  ",
    lastName: "O'Connor",
    currentStreetAddress: '<img src=x onerror="alert(1)">',
    currentUnit: "<script>alert(1)</script>",
  }));

  assert.equal(result.status, 201);
  assert.equal(calls.length, 2);
  for (const message of calls) {
    assert.equal(message.html.includes("<script>"), false);
    assert.equal(message.html.includes("<img src=x"), false);
    assert.ok(message.html.includes("&lt;"));
    assert.equal(/[\r\n]/.test(message.subject), false);
  }
  assert.ok(calls[0].text.includes("<img src=x"));
});

test("client form source contains no server email configuration or API-key references", () => {
  const clientSource = readFileSync(
    path.join(root, "components/home/application-intro.tsx"),
    "utf8"
  );
  for (const secretName of [
    "SENDGRID_API_KEY",
    "FROM_EMAIL",
    "AGENT_01_EMAIL",
    "AGENT_02_EMAIL",
    "AGENT_03_EMAIL",
    "CENTRAL_KEYBRIDGE_EMAIL",
  ]) {
    assert.equal(clientSource.includes(secretName), false);
  }
  assert.equal(clientSource.includes("process.env"), false);
});
