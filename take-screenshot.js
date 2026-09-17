const puppeteer = require("puppeteer-core");
const path = require("path");

async function capture() {
  const artifactDir = "C:\\Users\\Young Duke\\.gemini\\antigravity\\brain\\dce9a853-c499-4bc8-b177-71800ae83195";
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 30000 });

    // Wait 1.5 seconds for all web fonts and styles to settle
    await new Promise((r) => setTimeout(r, 1500));

    // Full page screenshot
    const fullPath = path.join(artifactDir, "keybridge_homepage_full.png");
    await page.screenshot({ path: fullPath, fullPage: true });
    console.log("Captured full page to:", fullPath);

    // Viewport screenshot covering Hero & About
    const heroPath = path.join(artifactDir, "keybridge_hero_about.png");
    await page.screenshot({ path: heroPath, fullPage: false });
    console.log("Captured hero viewport to:", heroPath);

    // Scroll to Services and capture Services
    await page.evaluate(() => {
      const el = document.getElementById("services");
      if (el) el.scrollIntoView();
    });
    await new Promise((r) => setTimeout(r, 500));
    const servicesPath = path.join(artifactDir, "keybridge_services.png");
    await page.screenshot({ path: servicesPath, fullPage: false });
    console.log("Captured services section to:", servicesPath);

  } finally {
    await browser.close();
  }
}

capture().catch((err) => {
  console.error("Screenshot error:", err);
  process.exit(1);
});
