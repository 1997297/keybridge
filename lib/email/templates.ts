export interface ApplicationEmailData {
  agentCode: string;
  propertyType: string;
  otherPropertyType?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  maritalStatus: string;
  currentStreetAddress: string;
  currentUnit?: string;
  currentCity: string;
  currentState: string;
  currentZipCode: string;
  desiredZipCode: string;
  preferredMoveInDate: string;
  amountAvailableForMoveIn: string;
  ownsCar: string;
  hasPet: string;
  hasBeenEvicted: string;
  plannedStayDuration: string;
  payAdvanceMonths: string;
  hasFeeAvailable: string;
  preferredPaymentMethod: string;
  declarationConfirmed: boolean;
}

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

/**
 * Generates the internal Agency Notification Email sent to the assigned agent and central office.
 */
export function generateAgencyEmail(
  data: ApplicationEmailData,
  referenceId: string,
  timestamp: string = new Date().toUTCString()
): RenderedEmail {
  const applicantFullName = `${data.firstName.trim()} ${data.lastName.trim()}`;
  const subject = `New Keybridge Apartment Application — ${applicantFullName} — ${data.agentCode}`;

  const currentAddressStr = `${data.currentStreetAddress}${
    data.currentUnit ? `, ${data.currentUnit}` : ""
  }, ${data.currentCity}, ${data.currentState} ${data.currentZipCode}`;

  const propertyTypeDisplay = data.propertyType === "Other" && data.otherPropertyType
    ? `Other (${data.otherPropertyType})`
    : data.propertyType;

  // Plain Text Version
  const text = `
================================================================================
            KEYBRIDGE RESIDENTIAL — NEW APARTMENT APPLICATION
================================================================================
Reference ID:       ${referenceId}
Submission Date:    ${timestamp}
Assigned Agent:     ${data.agentCode}

--------------------------------------------------------------------------------
1. APPLICATION DETAILS
--------------------------------------------------------------------------------
Assigned Agent:     ${data.agentCode}
Property Type:  ${propertyTypeDisplay}

--------------------------------------------------------------------------------
2. APPLICANT INFORMATION
--------------------------------------------------------------------------------
Full Name:          ${applicantFullName}
Email Address:      ${data.email}
Phone Number:       ${data.phone}
Marital Status:     ${data.maritalStatus}

--------------------------------------------------------------------------------
3. CURRENT RESIDENTIAL ADDRESS
--------------------------------------------------------------------------------
Street Address:     ${data.currentStreetAddress}
Apartment/Unit:     ${data.currentUnit || "N/A"}
City, State ZIP:    ${data.currentCity}, ${data.currentState} ${data.currentZipCode}

--------------------------------------------------------------------------------
4. PROPERTY / LOCATION INFORMATION
--------------------------------------------------------------------------------
Desired ZIP Code:   ${data.desiredZipCode}
Preferred Move-In:  ${data.preferredMoveInDate}
Available Move-In:  ${data.amountAvailableForMoveIn}

--------------------------------------------------------------------------------
5. APPLICANT DETAILS & PREFERENCES
--------------------------------------------------------------------------------
Owns Car:           ${data.ownsCar}
Has Pet:            ${data.hasPet}
Prior Eviction:     ${data.hasBeenEvicted}
Planned Stay:       ${data.plannedStayDuration}
Pay Ahead:          ${data.payAdvanceMonths}

--------------------------------------------------------------------------------
6. APPLICATION FEE & DECLARATION
--------------------------------------------------------------------------------
$75 Fee Available:  ${data.hasFeeAvailable}
Payment Channel:    ${data.preferredPaymentMethod}
Declaration:        CONFIRMED (Truthful information statement accepted)

================================================================================
Keybridge Residential Placement Services | Direct Representative File Record
`;

  // HTML Version
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
  <style>
    body { margin: 0; padding: 0; background-color: #F7F5F0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1E2024; -webkit-font-smoothing: antialiased; }
    table { border-collapse: separate; border-spacing: 0; width: 100%; }
    .wrapper { width: 100%; max-width: 640px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #E8E4DA; border-radius: 12px; overflow: hidden; }
    .header { background-color: #0F1013; padding: 32px 36px; border-bottom: 3px solid #B96D21; }
    .brand-title { color: #FFFFFF; font-size: 22px; font-weight: 600; letter-spacing: -0.5px; margin: 0 0 4px 0; }
    .brand-subtitle { color: #A49F93; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; margin: 0; }
    .meta-bar { background-color: #FAF8F5; border-bottom: 1px solid #EAE6DD; padding: 14px 36px; }
    .meta-cell { font-size: 12px; color: #5F594D; }
    .meta-badge { display: inline-block; background-color: #EFE9DE; color: #784513; font-weight: 700; font-size: 11px; padding: 3px 8px; border-radius: 6px; font-family: monospace; }
    .content { padding: 32px 36px 40px 36px; }
    .section-card { margin-bottom: 24px; border: 1px solid #EFECE6; border-radius: 10px; background-color: #FFFFFF; overflow: hidden; }
    .section-header { background-color: #F8F6F2; padding: 10px 18px; border-bottom: 1px solid #EFECE6; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: #6F6656; }
    .section-body { padding: 14px 18px; }
    .data-row { padding: 7px 0; border-bottom: 1px solid #F4F1EA; }
    .data-row:last-child { border-bottom: none; }
    .label { font-size: 12px; color: #7F7769; width: 40%; font-weight: 500; vertical-align: top; }
    .value { font-size: 13px; color: #16171A; font-weight: 600; width: 60%; vertical-align: top; }
    .fee-highlight { background-color: #FFF9F2; border-left: 4px solid #B96D21; padding: 12px 16px; margin: 16px 0; border-radius: 0 8px 8px 0; font-size: 13px; color: #583308; }
    .footer { background-color: #F7F5F0; padding: 24px 36px; border-top: 1px solid #E8E4DA; text-align: center; font-size: 11px; color: #8C8474; line-height: 1.6; }
  </style>
</head>
<body>
  <div style="padding: 24px 12px;">
    <div class="wrapper">
      <!-- Brand Header -->
      <div class="header">
        <h1 class="brand-title">Keybridge Residential</h1>
        <p class="brand-subtitle">Official Apartment Placement Application</p>
      </div>

      <!-- Metadata Banner -->
      <div class="meta-bar">
        <table>
          <tr>
            <td class="meta-cell" style="width: 50%;">
              <strong>Reference:</strong> <span class="meta-badge">${referenceId}</span>
            </td>
            <td class="meta-cell" style="width: 50%; text-align: right;">
              <strong>Assigned Agent:</strong> <span style="color: #B96D21; font-weight: bold;">${data.agentCode}</span>
            </td>
          </tr>
          <tr>
            <td class="meta-cell" colspan="2" style="padding-top: 6px; font-size: 11px; color: #8F8778;">
              Submitted: ${timestamp}
            </td>
          </tr>
        </table>
      </div>

      <!-- Main Content -->
      <div class="content">
        <!-- Section 0: Application Details -->
        <div class="section-card">
          <div class="section-header">00 — Application Details</div>
          <div class="section-body">
            <table>
              <tr class="data-row">
                <td class="label">Assigned Representative:</td>
                <td class="value">${data.agentCode}</td>
              </tr>
              <tr class="data-row">
                <td class="label">Property Type:</td>
                <td class="value">${propertyTypeDisplay}</td>
              </tr>
            </table>
          </div>
        </div>

        <!-- Section 1: Applicant Information -->
        <div class="section-card">
          <div class="section-header">01 — Applicant Information</div>
          <div class="section-body">
            <table>
              <tr class="data-row">
                <td class="label">Applicant Name:</td>
                <td class="value">${applicantFullName}</td>
              </tr>
              <tr class="data-row">
                <td class="label">Email Address:</td>
                <td class="value"><a href="mailto:${data.email}" style="color: #B96D21; text-decoration: none;">${data.email}</a></td>
              </tr>
              <tr class="data-row">
                <td class="label">Phone Number:</td>
                <td class="value"><a href="tel:${data.phone}" style="color: #16171A; text-decoration: none;">${data.phone}</a></td>
              </tr>
              <tr class="data-row">
                <td class="label">Marital Status:</td>
                <td class="value">${data.maritalStatus}</td>
              </tr>
            </table>
          </div>
        </div>

        <!-- Section 2: Current Address -->
        <div class="section-card">
          <div class="section-header">02 — Current Residential Address</div>
          <div class="section-body">
            <table>
              <tr class="data-row">
                <td class="label">Full Address:</td>
                <td class="value">${currentAddressStr}</td>
              </tr>
            </table>
          </div>
        </div>

        <!-- Section 3: Property & Location Information -->
        <div class="section-card">
          <div class="section-header">03 — Target Property & Move-In Readiness</div>
          <div class="section-body">
            <table>
              <tr class="data-row">
                <td class="label">Target Location ZIP:</td>
                <td class="value">${data.desiredZipCode}</td>
              </tr>
              <tr class="data-row">
                <td class="label">Preferred Move-In Date:</td>
                <td class="value">${data.preferredMoveInDate}</td>
              </tr>
              <tr class="data-row">
                <td class="label">Amount Available for Move-In:</td>
                <td class="value">${data.amountAvailableForMoveIn}</td>
              </tr>
            </table>
          </div>
        </div>

        <!-- Section 4: Applicant Details -->
        <div class="section-card">
          <div class="section-header">04 — Applicant Screening & Preferences</div>
          <div class="section-body">
            <table>
              <tr class="data-row">
                <td class="label">Vehicle Ownership:</td>
                <td class="value">${data.ownsCar}</td>
              </tr>
              <tr class="data-row">
                <td class="label">Pet Ownership:</td>
                <td class="value">${data.hasPet}</td>
              </tr>
              <tr class="data-row">
                <td class="label">Prior Eviction History:</td>
                <td class="value">${data.hasBeenEvicted}</td>
              </tr>
              <tr class="data-row">
                <td class="label">Planned Duration of Stay:</td>
                <td class="value">${data.plannedStayDuration}</td>
              </tr>
              <tr class="data-row">
                <td class="label">Pay Months in Advance:</td>
                <td class="value">${data.payAdvanceMonths}</td>
              </tr>
            </table>
          </div>
        </div>

        <!-- Section 5: Application Fee & Declaration -->
        <div class="section-card">
          <div class="section-header">05 — Application Fee & Declaration</div>
          <div class="section-body">
            <div class="fee-highlight">
              <strong>Mandatory $75 Application Fee:</strong><br />
              Applicant stated fee is <strong>${data.hasFeeAvailable === "Yes" ? "AVAILABLE" : "UNAVAILABLE"}</strong>.<br />
              Preferred settlement method: <strong>${data.preferredPaymentMethod}</strong>.
            </div>
            <table>
              <tr class="data-row">
                <td class="label">Declaration Confirmed:</td>
                <td class="value" style="color: #1F7A46;">✓ ACCURACY CONFIRMED BY APPLICANT</td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        This is an automated placement notification dispatched by Keybridge Residential.<br />
        Please initiate client contact and settlement instructions in accordance with Keybridge guidelines.
      </div>
    </div>
  </div>
</body>
</html>
`;

  return { subject, html, text };
}

/**
 * Generates the Applicant Confirmation Email sent directly to the prospective resident.
 */
export function generateApplicantEmail(
  data: ApplicationEmailData,
  referenceId: string,
  timestamp: string = new Date().toUTCString()
): RenderedEmail {
  const applicantFirstName = data.firstName.trim();
  const subject = `Application Received — Keybridge Residential [${referenceId}]`;

  // Plain Text Version
  const text = `
Dear ${applicantFirstName},

Thank you for submitting your apartment application with Keybridge Residential.

We have successfully logged your application for placement review. Below are the key details of your filing:

--------------------------------------------------------------------------------
APPLICATION RECORD
--------------------------------------------------------------------------------
Reference Identifier: ${referenceId}
Assigned Agent Code:  ${data.agentCode}
Property Type:    ${data.propertyType}
Target Move-in Date:  ${data.preferredMoveInDate}
Submission Date:      ${timestamp}

--------------------------------------------------------------------------------
IMPORTANT NEXT STEP — $75 APPLICATION FEE
--------------------------------------------------------------------------------
Please note that all Keybridge applications require a mandatory $75 application fee to cover preliminary background verification and agent underwriting.

CRITICAL NOTICE:
Applications are ONLY reviewed, evaluated, and acted upon after the required $75 application fee has been received and confirmed. Submission of this form does NOT guarantee lease approval.

--------------------------------------------------------------------------------
WHAT HAPPENS NEXT?
--------------------------------------------------------------------------------
Your assigned representative (${data.agentCode}) will review your file details and contact you shortly with official instructions for submitting your $75 fee via your preferred method (${data.preferredPaymentMethod}).

Once your payment is confirmed, your agent will commence formal application review and keep you directly informed regarding the decision and subsequent lease coordination.

If you have any questions, please reference your ID (${referenceId}) in any correspondence.

Warm regards,

Keybridge Residential Placement Team
streak.crm.hr@gmail.com
`;

  // HTML Version
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
  <style>
    body { margin: 0; padding: 0; background-color: #F7F5F0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1E2024; -webkit-font-smoothing: antialiased; }
    table { border-collapse: separate; border-spacing: 0; width: 100%; }
    .wrapper { width: 100%; max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #E8E4DA; border-radius: 12px; overflow: hidden; }
    .header { background-color: #0F1013; padding: 36px 36px 32px 36px; border-bottom: 3px solid #B96D21; text-align: center; }
    .brand-title { color: #FFFFFF; font-size: 24px; font-weight: 600; letter-spacing: -0.5px; margin: 0 0 6px 0; }
    .brand-subtitle { color: #A49F93; font-size: 11px; text-transform: uppercase; letter-spacing: 1.6px; margin: 0; }
    .content { padding: 36px; line-height: 1.6; }
    .greeting { font-size: 18px; font-weight: 600; color: #0F1013; margin: 0 0 14px 0; }
    p { font-size: 14px; color: #423E37; margin: 0 0 16px 0; }
    .card { background-color: #FAF8F5; border: 1px solid #EAE6DD; border-radius: 10px; padding: 20px; margin: 24px 0; }
    .card-title { font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; font-weight: 700; color: #7F7769; margin: 0 0 12px 0; }
    .info-row { padding: 6px 0; font-size: 13px; border-bottom: 1px solid #F0ECE4; }
    .info-row:last-child { border-bottom: none; }
    .info-label { color: #7F7769; width: 45%; font-weight: 500; }
    .info-val { color: #141517; font-weight: 600; }
    .callout-fee { background-color: #FFF9F2; border: 1px solid #F2DEC2; border-left: 4px solid #B96D21; border-radius: 8px; padding: 18px; margin: 24px 0; }
    .callout-title { font-size: 13px; font-weight: 700; color: #8F4C07; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 0.8px; }
    .callout-body { font-size: 13px; color: #5C3A16; margin: 0; line-height: 1.55; }
    .disclaimer-box { background-color: #F8F9FA; border: 1px solid #E5E7EB; border-radius: 8px; padding: 14px 18px; margin: 24px 0; font-size: 12px; color: #6B7280; line-height: 1.5; }
    .footer { background-color: #F7F5F0; padding: 24px 36px; border-top: 1px solid #E8E4DA; text-align: center; font-size: 11px; color: #8C8474; line-height: 1.6; }
  </style>
</head>
<body>
  <div style="padding: 24px 12px;">
    <div class="wrapper">
      <!-- Header -->
      <div class="header">
        <h1 class="brand-title">Keybridge Residential</h1>
        <p class="brand-subtitle">Residential Placement Services</p>
      </div>

      <!-- Main Body -->
      <div class="content">
        <h2 class="greeting">Hello ${applicantFirstName},</h2>
        <p>
          Thank you for initiating your rental application with Keybridge Residential. We have received your submission and created your active placement file.
        </p>

        <!-- Filing Snapshot Card -->
        <div class="card">
          <div class="card-title">Filing Summary</div>
          <table>
            <tr class="info-row">
              <td class="info-label">Application Reference:</td>
              <td class="info-val"><strong style="color: #B96D21; font-family: monospace; font-size: 14px;">${referenceId}</strong></td>
            </tr>
            <tr class="info-row">
              <td class="info-label">Assigned Representative:</td>
              <td class="info-val">${data.agentCode}</td>
            </tr>
            <tr class="info-row">
              <td class="info-label">Property Type:</td>
              <td class="info-val">${data.propertyType}</td>
            </tr>
            <tr class="info-row">
              <td class="info-label">Target Move-In Date:</td>
              <td class="info-val">${data.preferredMoveInDate}</td>
            </tr>
            <tr class="info-row">
              <td class="info-label">Preferred Payment Method:</td>
              <td class="info-val">${data.preferredPaymentMethod}</td>
            </tr>
          </table>
        </div>

        <!-- Mandatory Fee Notice -->
        <div class="callout-fee">
          <div class="callout-title">Required Next Step — $75 Application Fee</div>
          <p class="callout-body">
            A mandatory <strong>$75 application fee</strong> is required for underwriting verification and background screening. Applications are <strong>only reviewed and acted upon after the required application fee has been confirmed</strong>.
          </p>
        </div>

        <p>
          Your assigned representative (<strong>${data.agentCode}</strong>) will contact you shortly to provide official instructions for completing your fee via your preferred method (${data.preferredPaymentMethod}).
        </p>

        <!-- Disclaimer / Approval Warning -->
        <div class="disclaimer-box">
          <strong>Notice Regarding Tenancy Decisions:</strong><br />
          Submission of an application does not guarantee lease approval or property reservation. All applications are objectively reviewed against formal agency underwriting criteria following fee confirmation.
        </div>

        <p style="margin-top: 24px; font-size: 13px; color: #7F7769;">
          Please retain your reference identifier (<strong>${referenceId}</strong>) for all communications with your agent.
        </p>
      </div>

      <!-- Footer -->
      <div class="footer">
        &copy; ${new Date().getFullYear()} Keybridge Residential Placement Services.<br />
        This email was sent to ${data.email} regarding your application filing.
      </div>
    </div>
  </div>
</body>
</html>
`;

  return { subject, html, text };
}
