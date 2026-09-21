import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import {
  generateAgencyEmail,
  generateApplicantEmail,
  ApplicationEmailData,
} from "@/lib/email/templates";

export const runtime = "nodejs";

const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const IDEMPOTENCY_WINDOW_MS = 10 * 60 * 1000;
const MAX_TRACKED_ENTRIES = 10_000;

type RateLimitEntry = { count: number; resetAt: number };
type StoredResponse = { status: number; body: Record<string, unknown> };
type CompletedSubmission = { expiresAt: number; response: StoredResponse };

// These stores contain only IP counters, hashes, and response metadata—never form data.
// They are lightweight, per-process safeguards suitable for this single-instance setup.
const rateLimitStore = new Map<string, RateLimitEntry>();
const completedSubmissions = new Map<string, CompletedSubmission>();
const inFlightSubmissions = new Map<string, Promise<StoredResponse>>();

// Server-controlled agent code to destination email mapping (loaded from environment variables).
const AGENT_EMAIL_MAP: Record<string, string | undefined> = {
  "Agent 01": process.env.AGENT_01_EMAIL?.trim(),
  "Agent 02": process.env.AGENT_02_EMAIL?.trim(),
  "Agent 03": process.env.AGENT_03_EMAIL?.trim(),
};

const CENTRAL_KEYBRIDGE_EMAIL = process.env.CENTRAL_KEYBRIDGE_EMAIL?.trim();
const FROM_EMAIL = process.env.FROM_EMAIL?.trim();
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY?.trim();

function sanitizeText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value
    .normalize("NFKC")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLength);
}

function sanitizeApplication(body: Record<string, unknown>): ApplicationEmailData {
  return {
    agentCode: sanitizeText(body.agentCode, 32),
    propertyType: sanitizeText(body.propertyType, 64),
    otherPropertyType: sanitizeText(body.otherPropertyType, 100),
    firstName: sanitizeText(body.firstName, 100),
    lastName: sanitizeText(body.lastName, 100),
    email: sanitizeText(body.email, 254),
    phone: sanitizeText(body.phone, 40),
    maritalStatus: sanitizeText(body.maritalStatus, 32),
    currentStreetAddress: sanitizeText(body.currentStreetAddress, 200),
    currentUnit: sanitizeText(body.currentUnit, 100),
    currentCity: sanitizeText(body.currentCity, 100),
    currentState: sanitizeText(body.currentState, 32),
    currentZipCode: sanitizeText(body.currentZipCode, 10),
    desiredZipCode: sanitizeText(body.desiredZipCode, 10),
    preferredMoveInDate: sanitizeText(body.preferredMoveInDate, 10),
    amountAvailableForMoveIn: sanitizeText(body.amountAvailableForMoveIn, 50),
    ownsCar: sanitizeText(body.ownsCar, 3),
    hasPet: sanitizeText(body.hasPet, 3),
    hasBeenEvicted: sanitizeText(body.hasBeenEvicted, 3),
    plannedStayDuration: sanitizeText(body.plannedStayDuration, 50),
    payAdvanceMonths: sanitizeText(body.payAdvanceMonths, 3),
    hasFeeAvailable: sanitizeText(body.hasFeeAvailable, 3),
    preferredPaymentMethod: sanitizeText(body.preferredPaymentMethod, 50),
    declarationConfirmed: body.declarationConfirmed === true,
  };
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function escapeApplicationForHtml(data: ApplicationEmailData): ApplicationEmailData {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      typeof value === "string" ? escapeHtml(value) : value,
    ])
  ) as unknown as ApplicationEmailData;
}

function getClientIp(req: NextRequest): string {
  const headers = req.headers;
  for (const name of [
    "x-vercel-forwarded-for",
    "cf-connecting-ip",
    "x-real-ip",
    "x-forwarded-for",
  ]) {
    const value = headers?.get?.(name);
    if (value) {
      return value.split(",")[0].trim().slice(0, 64) || "unknown";
    }
  }
  return "unknown";
}

function pruneExpiredEntries(now: number) {
  rateLimitStore.forEach((entry, ip) => {
    if (entry.resetAt <= now) rateLimitStore.delete(ip);
  });
  completedSubmissions.forEach((entry, fingerprint) => {
    if (entry.expiresAt <= now) completedSubmissions.delete(fingerprint);
  });

  // Bound memory even if untrusted proxy headers produce many unique keys.
  while (rateLimitStore.size > MAX_TRACKED_ENTRIES) {
    const oldestKey = rateLimitStore.keys().next().value as string | undefined;
    if (!oldestKey) break;
    rateLimitStore.delete(oldestKey);
  }
  while (completedSubmissions.size > MAX_TRACKED_ENTRIES) {
    const oldestKey = completedSubmissions.keys().next().value as string | undefined;
    if (!oldestKey) break;
    completedSubmissions.delete(oldestKey);
  }
}

function consumeRateLimit(ip: string, now: number) {
  const current = rateLimitStore.get(ip);
  if (!current || current.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

function createReferenceId(date = new Date()) {
  return `KB-${date.getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
}

function createSuccessResponse(referenceId: string): StoredResponse {
  return {
    status: 201,
    body: {
      success: true,
      referenceId,
      centralCopySent: true,
      confirmationEmailSent: true,
      message:
        "Application submitted successfully. Your agent notification and confirmation email have been accepted for sending.",
    },
  };
}

function createSubmissionFingerprint(data: ApplicationEmailData) {
  return createHash("sha256").update(JSON.stringify(data)).digest("hex");
}

function logEmailFailure(kind: string, referenceId: string, error: unknown) {
  const details = error as {
    message?: string;
    code?: string | number;
    response?: { body?: { errors?: unknown } };
  } | null;
  // Log provider diagnostics without serializing request headers or the API key.
  console.error(`[SENDGRID ERROR] ${kind}: reference=${referenceId}`, {
    message: details?.message || "Email dispatch failed.",
    code: details?.code,
    errors: details?.response?.body?.errors,
  });
}

export async function POST(req: NextRequest) {
  try {
    let body: Record<string, unknown>;
    try {
      const parsedBody = await req.json();
      if (!parsedBody || typeof parsedBody !== "object" || Array.isArray(parsedBody)) {
        throw new Error("Expected a JSON object.");
      }
      body = parsedBody as Record<string, unknown>;
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Malformed request payload. Expected JSON body.",
        },
        { status: 400 }
      );
    }

    const now = Date.now();
    const submissionDate = new Date(now);
    const yyyy = submissionDate.getFullYear();
    const mm = String(submissionDate.getMonth() + 1).padStart(2, "0");
    const dd = String(submissionDate.getDate()).padStart(2, "0");
    const todayStr = `${yyyy}-${mm}-${dd}`;

    // Honeypot: return an indistinguishable success response without validating or sending email.
    if (sanitizeText(body.companyWebsite, 200)) {
      const decoy = createSuccessResponse(createReferenceId(submissionDate));
      return NextResponse.json(decoy.body, { status: decoy.status });
    }

    pruneExpiredEntries(now);
    const rateLimit = consumeRateLimit(getClientIp(req), now);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many application attempts. Please wait before trying again.",
        },
        {
          status: 429,
          headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
        }
      );
    }

    const errors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const zipRegex = /^\d{5}$/;
    const emailData = sanitizeApplication(body);
    const agentCode = emailData.agentCode;

    // Agent code validation and lookup against server-only environment configuration.
    if (!agentCode) {
      errors.agentCode = "Please select your assigned agent.";
    } else if (!Object.prototype.hasOwnProperty.call(AGENT_EMAIL_MAP, agentCode)) {
      errors.agentCode = "Invalid or unrecognized agent code.";
    }

    const destinationEmail = AGENT_EMAIL_MAP[agentCode];
    if (!errors.agentCode && (!destinationEmail || !emailRegex.test(destinationEmail))) {
      console.error(
        `[CRITICAL] No destination email configured for assigned agent: "${agentCode}". Check AGENT_XX_EMAIL in .env.local.`
      );
      return NextResponse.json(
        {
          success: false,
          message: "Internal server configuration error: agent routing destination unavailable.",
        },
        { status: 500 }
      );
    }

    // Server-side re-validation of the sanitized form fields.
    if (!emailData.propertyType) errors.propertyType = "Please select a property type.";
    if (!emailData.firstName) errors.firstName = "First name is required.";
    if (!emailData.lastName) errors.lastName = "Last name is required.";

    if (!emailData.email) {
      errors.email = "Email address is required.";
    } else if (!emailRegex.test(emailData.email)) {
      errors.email = "Please provide a valid email address (e.g. name@example.com).";
    }

    const phoneDigits = emailData.phone.replace(/\D/g, "");
    if (!emailData.phone) {
      errors.phone = "Phone number is required.";
    } else if (
      !(phoneDigits.length === 10 || (phoneDigits.length === 11 && phoneDigits.startsWith("1")))
    ) {
      errors.phone = "Please provide a valid 10-digit US phone number.";
    }

    if (!emailData.maritalStatus) errors.maritalStatus = "Please select your marital status.";
    if (!emailData.currentStreetAddress) errors.currentStreetAddress = "Street address is required.";
    if (!emailData.currentCity) errors.currentCity = "City is required.";
    if (!emailData.currentState) errors.currentState = "Please select your current state.";

    if (!emailData.currentZipCode) {
      errors.currentZipCode = "Current ZIP code is required.";
    } else if (!zipRegex.test(emailData.currentZipCode)) {
      errors.currentZipCode = "Current ZIP code must be a valid 5-digit US ZIP code.";
    }

    if (!emailData.desiredZipCode) {
      errors.desiredZipCode = "Desired ZIP code is required.";
    } else if (!zipRegex.test(emailData.desiredZipCode)) {
      errors.desiredZipCode = "Desired ZIP code must be a valid 5-digit US ZIP code.";
    }

    if (!emailData.preferredMoveInDate) {
      errors.preferredMoveInDate = "Preferred move-in date is required.";
    } else if (emailData.preferredMoveInDate < todayStr) {
      errors.preferredMoveInDate = "Preferred move-in date cannot be in the past.";
    }

    if (!emailData.amountAvailableForMoveIn) {
      errors.amountAvailableForMoveIn = "Amount available for move-in is required.";
    }
    if (emailData.ownsCar !== "Yes" && emailData.ownsCar !== "No") {
      errors.ownsCar = "Please indicate whether you own a car (Yes/No).";
    }
    if (emailData.hasPet !== "Yes" && emailData.hasPet !== "No") {
      errors.hasPet = "Please indicate whether you have a pet (Yes/No).";
    }
    if (emailData.hasBeenEvicted !== "Yes" && emailData.hasBeenEvicted !== "No") {
      errors.hasBeenEvicted = "Please indicate whether you have ever been evicted (Yes/No).";
    }
    if (!emailData.plannedStayDuration) {
      errors.plannedStayDuration = "Please select your planned duration of stay.";
    }
    if (emailData.payAdvanceMonths !== "Yes" && emailData.payAdvanceMonths !== "No") {
      errors.payAdvanceMonths = "Please indicate whether you plan to pay advance rent (Yes/No).";
    }
    if (emailData.hasFeeAvailable !== "Yes" && emailData.hasFeeAvailable !== "No") {
      errors.hasFeeAvailable =
        "Please indicate if you currently have the $75 application fee available (Yes/No).";
    }
    if (!emailData.preferredPaymentMethod) {
      errors.preferredPaymentMethod = "Please select your preferred payment method.";
    }
    if (!emailData.declarationConfirmed) {
      errors.declarationConfirmed = "You must confirm that the information provided is accurate.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Application submission failed server validation checks.",
          errors,
        },
        { status: 400 }
      );
    }

    // A submission can only succeed when email sending is configured server-side.
    if (
      !FROM_EMAIL ||
      !emailRegex.test(FROM_EMAIL) ||
      !SENDGRID_API_KEY?.startsWith("SG.") ||
      /placeholder|your_.*key/i.test(SENDGRID_API_KEY) ||
      !CENTRAL_KEYBRIDGE_EMAIL ||
      !emailRegex.test(CENTRAL_KEYBRIDGE_EMAIL)
    ) {
      console.error(
        "[EMAIL CONFIGURATION] Check FROM_EMAIL, SENDGRID_API_KEY, and CENTRAL_KEYBRIDGE_EMAIL before accepting applications."
      );
      return NextResponse.json(
        {
          success: false,
          message:
            "Application submission is temporarily unavailable. Please contact your agent or try again later.",
        },
        { status: 503 }
      );
    }

    const fingerprint = createSubmissionFingerprint(emailData);
    const completed = completedSubmissions.get(fingerprint);
    if (completed && completed.expiresAt > now) {
      return NextResponse.json(completed.response.body, { status: completed.response.status });
    }

    const pending = inFlightSubmissions.get(fingerprint);
    if (pending) {
      const response = await pending;
      return NextResponse.json(response.body, { status: response.status });
    }

    const referenceId = createReferenceId(submissionDate);
    const submissionTime = submissionDate.toUTCString();
    const htmlSafeEmailData = escapeApplicationForHtml(emailData);
    const agencyEmail = generateAgencyEmail(emailData, referenceId, submissionTime);
    const safeAgencyHtml = generateAgencyEmail(
      htmlSafeEmailData,
      referenceId,
      submissionTime
    ).html;
    const applicantEmail = generateApplicantEmail(emailData, referenceId, submissionTime);
    const safeApplicantHtml = generateApplicantEmail(
      htmlSafeEmailData,
      referenceId,
      submissionTime
    ).html;

    const processingPromise = (async (): Promise<StoredResponse> => {
      sgMail.setApiKey(SENDGRID_API_KEY);
      const from = { name: "Keybridge Residential", email: FROM_EMAIL };

      try {
        const [agencyDispatch] = await sgMail.send({
          from,
          to: [destinationEmail!],
          cc: [CENTRAL_KEYBRIDGE_EMAIL],
          subject: agencyEmail.subject,
          html: safeAgencyHtml,
          text: agencyEmail.text,
        });

        if (agencyDispatch.statusCode !== 202) {
          throw new Error(
            `SendGrid did not accept the agent notification (status ${agencyDispatch.statusCode}).`
          );
        }

        console.info(
          `[SENDGRID ACCEPTED] Agent notification: reference=${referenceId} emailId=${agencyDispatch.headers["x-message-id"] || "unavailable"}`
        );
      } catch (dispatchError) {
        logEmailFailure("Agent notification failed", referenceId, dispatchError);
        return {
          status: 502,
          body: {
            success: false,
            message:
              "We could not confirm that your application was sent to your agent. Please try again later or contact your agent.",
            referenceId,
          },
        };
      }

      try {
        const [applicantDispatch] = await sgMail.send({
          from,
          to: [emailData.email],
          subject: applicantEmail.subject,
          html: safeApplicantHtml,
          text: applicantEmail.text,
        });

        if (applicantDispatch.statusCode !== 202) {
          throw new Error(
            `SendGrid did not accept the applicant confirmation (status ${applicantDispatch.statusCode}).`
          );
        }

        console.info(
          `[SENDGRID ACCEPTED] Applicant confirmation: reference=${referenceId} emailId=${applicantDispatch.headers["x-message-id"] || "unavailable"}`
        );
      } catch (dispatchError) {
        logEmailFailure("Applicant confirmation failed", referenceId, dispatchError);
        return {
          status: 502,
          body: {
            success: false,
            message: `Your application was sent to your agent, but your confirmation email could not be sent. Please keep reference ${referenceId} and contact your agent; you do not need to submit again.`,
            referenceId,
            centralCopySent: true,
            confirmationEmailSent: false,
          },
        };
      }

      return createSuccessResponse(referenceId);
    })();

    inFlightSubmissions.set(fingerprint, processingPromise);
    try {
      const response = await processingPromise;
      if (response.body.success === true || response.body.centralCopySent === true) {
        completedSubmissions.set(fingerprint, {
          expiresAt: now + IDEMPOTENCY_WINDOW_MS,
          response,
        });
      }
      return NextResponse.json(response.body, { status: response.status });
    } finally {
      inFlightSubmissions.delete(fingerprint);
    }
  } catch (error) {
    console.error("[FATAL] Error processing application submission:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An internal server error occurred while processing your application.",
      },
      { status: 500 }
    );
  }
}
