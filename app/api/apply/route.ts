import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  generateAgencyEmail,
  generateApplicantEmail,
  ApplicationEmailData,
} from "@/lib/email/templates";

// Server-controlled agent code to destination email mapping (loaded from environment variables)
const AGENT_EMAIL_MAP: Record<string, string | undefined> = {
  "Agent 01": process.env.AGENT_01_EMAIL,
  "Agent 02": process.env.AGENT_02_EMAIL,
  "Agent 03": process.env.AGENT_03_EMAIL,
};

const CENTRAL_KEYBRIDGE_EMAIL = process.env.CENTRAL_KEYBRIDGE_EMAIL;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Keybridge Residential <onboarding@resend.dev>";

export async function POST(req: NextRequest) {
  try {
    let body: any;
    try {
      body = await req.json();
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
    } else if (!(agentCode in AGENT_EMAIL_MAP)) {
      errors.agentCode = "Invalid or unrecognized agent code.";
    }

    const destinationEmail = AGENT_EMAIL_MAP[agentCode];
    if (!errors.agentCode && !destinationEmail) {
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

    // 3. Authoritative Reference ID generation
    const referenceId = `KB-${yyyy}-${Math.floor(100000 + Math.random() * 900000)}`;
    const submissionTime = new Date().toUTCString();

    const emailData: ApplicationEmailData = {
      agentCode,
      propertyType: body.propertyType,
      otherPropertyType: body.otherPropertyType,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
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

    // 5. Transactional Email Dispatch via Resend
    const isLiveApiKey =
      Boolean(RESEND_API_KEY) &&
      !RESEND_API_KEY?.includes("placeholder") &&
      !RESEND_API_KEY?.includes("your_api_key");

    if (isLiveApiKey && destinationEmail) {
      try {
        const resend = new Resend(RESEND_API_KEY);

        // Send both Agency and Applicant confirmation emails concurrently
        const [agencyDispatch, applicantDispatch] = await Promise.all([
          resend.emails.send({
            from: RESEND_FROM_EMAIL,
            to: [destinationEmail],
            cc: CENTRAL_KEYBRIDGE_EMAIL ? [CENTRAL_KEYBRIDGE_EMAIL] : undefined,
            subject: agencyEmail.subject,
            html: agencyEmail.html,
            text: agencyEmail.text,
          }),
          resend.emails.send({
            from: RESEND_FROM_EMAIL,
            to: [emailData.email],
            subject: applicantEmail.subject,
            html: applicantEmail.html,
            text: applicantEmail.text,
          }),
        ]);

        if (agencyDispatch.error) {
          console.error("[RESEND ERROR] Agency notification failed:", agencyDispatch.error);
        }
        if (applicantDispatch.error) {
          console.error("[RESEND ERROR] Applicant confirmation failed:", applicantDispatch.error);
        }

        // If agency dispatch failed critically, report error
        if (agencyDispatch.error && applicantDispatch.error) {
          throw new Error(
            agencyDispatch.error.message || "Resend email delivery failure"
          );
        }

        console.log(`[RESEND SUCCESS] Dispatched emails for reference: ${referenceId}`);
      } catch (dispatchError: any) {
        console.error("[RESEND DISPATCH FAILURE]:", dispatchError);
        return NextResponse.json(
          {
            success: false,
            message:
              "Your application was received, but an error occurred while transmitting notification emails to your agent. Please check your connection and try submitting again.",
            referenceId,
          },
          { status: 502 }
        );
      }
    } else {
      // Diagnostic / Development Logging when placeholder key is used
      console.log("===============================================================================");
      console.log("               RESEND EMAIL DISPATCH (DIAGNOSTIC / DEV MODE)                   ");
      console.log("===============================================================================");
      console.log(`Notice: RESEND_API_KEY is unset or placeholder. Emails formatted & logged below.`);
      console.log("-------------------------------------------------------------------------------");
      console.log("1. AGENCY NOTIFICATION EMAIL:");
      console.log(`   To (Agent):     ${destinationEmail}`);
      console.log(`   CC (Central):   ${CENTRAL_KEYBRIDGE_EMAIL}`);
      console.log(`   Subject:        ${agencyEmail.subject}`);
      console.log(`   From:           ${RESEND_FROM_EMAIL}`);
      console.log("-------------------------------------------------------------------------------");
      console.log("2. APPLICANT CONFIRMATION EMAIL:");
      console.log(`   To (Applicant): ${emailData.email}`);
      console.log(`   Subject:        ${applicantEmail.subject}`);
      console.log(`   From:           ${RESEND_FROM_EMAIL}`);
      console.log("-------------------------------------------------------------------------------");
      console.log(`REFERENCE ID:      ${referenceId}`);
      console.log("===============================================================================");
    }

    // 6. Response: Confirm receipt and return authoritative referenceId
    // Security: Destination emails are NEVER exposed in the client response
    return NextResponse.json(
      {
        success: true,
        referenceId,
        message: "Application successfully received and confirmation emails dispatched.",
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
