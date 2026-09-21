import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import {
  generateAgencyEmail,
  generateApplicantEmail,
  ApplicationEmailData,
} from "@/lib/email/templates";

export const runtime = "nodejs";

// Server-controlled agent code to destination email mapping (loaded from environment variables)
const AGENT_EMAIL_MAP: Record<string, string | undefined> = {
  "Agent 01": process.env.AGENT_01_EMAIL?.trim(),
  "Agent 02": process.env.AGENT_02_EMAIL?.trim(),
  "Agent 03": process.env.AGENT_03_EMAIL?.trim(),
};

const CENTRAL_KEYBRIDGE_EMAIL = process.env.CENTRAL_KEYBRIDGE_EMAIL?.trim();
const FROM_EMAIL = process.env.FROM_EMAIL?.trim();
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY?.trim();

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
    let body: any;
    try {
      body = await req.json();
      if (!body || typeof body !== "object" || Array.isArray(body)) {
        throw new Error("Expected a JSON object.");
      }
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Malformed request payload. Expected JSON body.",
        },
        { status: 400 }
      );
    }

    const errors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const zipRegex = /^\d{5}$/;

    // Compute today's date in YYYY-MM-DD for move-in date verification
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const todayStr = `${yyyy}-${mm}-${dd}`;

    // 1. Agent Code Validation & Lookup against server environment
    const agentCode = typeof body.agentCode === "string" ? body.agentCode.trim() : "";
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

    // 2. Server-side Re-Validation of all form fields
    if (typeof body.propertyType !== "string" || !body.propertyType.trim()) {
      errors.propertyType = "Please select a property type.";
    }

    if (typeof body.firstName !== "string" || !body.firstName.trim()) {
      errors.firstName = "First name is required.";
    }
    if (typeof body.lastName !== "string" || !body.lastName.trim()) {
      errors.lastName = "Last name is required.";
    }
    if (typeof body.email !== "string" || !body.email.trim()) {
      errors.email = "Email address is required.";
    } else if (!emailRegex.test(body.email.trim())) {
      errors.email = "Please provide a valid email address (e.g. name@example.com).";
    }

    const phoneStr = typeof body.phone === "string" ? body.phone.trim() : "";
    const phoneDigits = phoneStr.replace(/\D/g, "");
    if (!phoneStr) {
      errors.phone = "Phone number is required.";
    } else if (
      !(phoneDigits.length === 10 || (phoneDigits.length === 11 && phoneDigits.startsWith("1")))
    ) {
      errors.phone = "Please provide a valid 10-digit US phone number.";
    }

    if (typeof body.maritalStatus !== "string" || !body.maritalStatus.trim()) {
      errors.maritalStatus = "Please select your marital status.";
    }

    if (typeof body.currentStreetAddress !== "string" || !body.currentStreetAddress.trim()) {
      errors.currentStreetAddress = "Street address is required.";
    }
    if (typeof body.currentCity !== "string" || !body.currentCity.trim()) {
      errors.currentCity = "City is required.";
    }
    if (typeof body.currentState !== "string" || !body.currentState.trim()) {
      errors.currentState = "Please select your current state.";
    }
    const currentZip = typeof body.currentZipCode === "string" ? body.currentZipCode.trim() : "";
    if (!currentZip) {
      errors.currentZipCode = "Current ZIP code is required.";
    } else if (!zipRegex.test(currentZip)) {
      errors.currentZipCode = "Current ZIP code must be a valid 5-digit US ZIP code.";
    }

    const desiredZip = typeof body.desiredZipCode === "string" ? body.desiredZipCode.trim() : "";
    if (!desiredZip) {
      errors.desiredZipCode = "Desired ZIP code is required.";
    } else if (!zipRegex.test(desiredZip)) {
      errors.desiredZipCode = "Desired ZIP code must be a valid 5-digit US ZIP code.";
    }

    const moveInDate = typeof body.preferredMoveInDate === "string" ? body.preferredMoveInDate.trim() : "";
    if (!moveInDate) {
      errors.preferredMoveInDate = "Preferred move-in date is required.";
    } else if (moveInDate < todayStr) {
      errors.preferredMoveInDate = "Preferred move-in date cannot be in the past.";
    }

    if (typeof body.amountAvailableForMoveIn !== "string" || !body.amountAvailableForMoveIn.trim()) {
      errors.amountAvailableForMoveIn = "Amount available for move-in is required.";
    }

    if (body.ownsCar !== "Yes" && body.ownsCar !== "No") {
      errors.ownsCar = "Please indicate whether you own a car (Yes/No).";
    }
    if (body.hasPet !== "Yes" && body.hasPet !== "No") {
      errors.hasPet = "Please indicate whether you have a pet (Yes/No).";
    }
    if (body.hasBeenEvicted !== "Yes" && body.hasBeenEvicted !== "No") {
      errors.hasBeenEvicted = "Please indicate whether you have ever been evicted (Yes/No).";
    }
    if (typeof body.plannedStayDuration !== "string" || !body.plannedStayDuration.trim()) {
      errors.plannedStayDuration = "Please select your planned duration of stay.";
    }
    if (body.payAdvanceMonths !== "Yes" && body.payAdvanceMonths !== "No") {
      errors.payAdvanceMonths = "Please indicate whether you plan to pay advance rent (Yes/No).";
    }

    if (body.hasFeeAvailable !== "Yes" && body.hasFeeAvailable !== "No") {
      errors.hasFeeAvailable = "Please indicate if you currently have the $75 application fee available (Yes/No).";
    }
    if (typeof body.preferredPaymentMethod !== "string" || !body.preferredPaymentMethod.trim()) {
      errors.preferredPaymentMethod = "Please select your preferred payment method.";
    }

    if (body.declarationConfirmed !== true) {
      errors.declarationConfirmed = "You must confirm that the information provided is accurate.";
    }

    // If any validation errors occurred, reject immediately with 400 Bad Request
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

    // A submission can only succeed when email sending is configured.
    if (
      !FROM_EMAIL || !emailRegex.test(FROM_EMAIL) ||
      !SENDGRID_API_KEY?.startsWith("SG.") ||
      /placeholder|your_.*key/i.test(SENDGRID_API_KEY) ||
      !CENTRAL_KEYBRIDGE_EMAIL || !emailRegex.test(CENTRAL_KEYBRIDGE_EMAIL)
    ) {
      console.error("[EMAIL CONFIGURATION] Check FROM_EMAIL, SENDGRID_API_KEY, and CENTRAL_KEYBRIDGE_EMAIL before accepting applications.");
      return NextResponse.json(
        {
          success: false,
          message: "Application submission is temporarily unavailable. Please contact your agent or try again later.",
        },
        { status: 503 }
      );
    }

    // 3. Authoritative Reference ID generation
    const referenceId = `KB-${yyyy}-${Math.floor(100000 + Math.random() * 900000)}`;
    const submissionTime = new Date().toUTCString();

    const emailData: ApplicationEmailData = {
      agentCode,
      propertyType: body.propertyType,
      otherPropertyType: body.otherPropertyType,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email.trim(),
      phone: body.phone,
      maritalStatus: body.maritalStatus,
      currentStreetAddress: body.currentStreetAddress,
      currentUnit: body.currentUnit,
      currentCity: body.currentCity,
      currentState: body.currentState,
      currentZipCode: body.currentZipCode,
      desiredZipCode: body.desiredZipCode,
      preferredMoveInDate: body.preferredMoveInDate,
      amountAvailableForMoveIn: body.amountAvailableForMoveIn,
      ownsCar: body.ownsCar,
      hasPet: body.hasPet,
      hasBeenEvicted: body.hasBeenEvicted,
      plannedStayDuration: body.plannedStayDuration,
      payAdvanceMonths: body.payAdvanceMonths,
      hasFeeAvailable: body.hasFeeAvailable,
      preferredPaymentMethod: body.preferredPaymentMethod,
      declarationConfirmed: body.declarationConfirmed,
    };

    // 4. Render Agency & Applicant Emails
    const agencyEmail = generateAgencyEmail(emailData, referenceId, submissionTime);
    const applicantEmail = generateApplicantEmail(emailData, referenceId, submissionTime);

    // 5. SendGrid must accept the agent notification before confirming a submission.
    sgMail.setApiKey(SENDGRID_API_KEY);
    const from = { name: "Keybridge Residential", email: FROM_EMAIL };
    try {
      const [agencyDispatch] = await sgMail.send({
        from,
        to: [destinationEmail!],
        cc: [CENTRAL_KEYBRIDGE_EMAIL],
        subject: agencyEmail.subject,
        html: agencyEmail.html,
        text: agencyEmail.text,
      });

      if (agencyDispatch.statusCode !== 202) {
        throw new Error(`SendGrid did not accept the agent notification (status ${agencyDispatch.statusCode}).`);
      }

      console.info(`[SENDGRID ACCEPTED] Agent notification: reference=${referenceId} emailId=${agencyDispatch.headers["x-message-id"] || "unavailable"}`);
    } catch (dispatchError) {
      logEmailFailure("Agent notification failed", referenceId, dispatchError);
      return NextResponse.json(
        {
          success: false,
          message: "We could not confirm that your application was sent to your agent. Please try again later or contact your agent.",
          referenceId,
        },
        { status: 502 }
      );
    }

    // Keep the existing error state for confirmation failures too.
    try {
      const [applicantDispatch] = await sgMail.send({
        from,
        to: [emailData.email],
        subject: applicantEmail.subject,
        html: applicantEmail.html,
        text: applicantEmail.text,
      });

      if (applicantDispatch.statusCode !== 202) {
        throw new Error(`SendGrid did not accept the applicant confirmation (status ${applicantDispatch.statusCode}).`);
      }

      console.info(`[SENDGRID ACCEPTED] Applicant confirmation: reference=${referenceId} emailId=${applicantDispatch.headers["x-message-id"] || "unavailable"}`);
    } catch (dispatchError) {
      logEmailFailure("Applicant confirmation failed", referenceId, dispatchError);
      return NextResponse.json(
        {
          success: false,
          message: `Your application was sent to your agent, but your confirmation email could not be sent. Please keep reference ${referenceId} and contact your agent; you do not need to submit again.`,
          referenceId,
          centralCopySent: true,
          confirmationEmailSent: false,
        },
        { status: 502 }
      );
    }

    // 6. Response: Confirm receipt and return authoritative referenceId
    // Security: Destination emails are NEVER exposed in the client response
    return NextResponse.json(
      {
        success: true,
        referenceId,
        centralCopySent: true,
        confirmationEmailSent: true,
        message: "Application submitted successfully. Your agent notification and confirmation email have been accepted for sending.",
      },
      { status: 201 }
    );
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
