import type { Metadata } from "next";
import {
  LegalPage,
  LegalSection,
  legalListClasses,
} from "@/app/_components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | Keybridge Residential",
  description: "Draft privacy information for Keybridge Residential applicants.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Applicant Information"
      title="Privacy Policy"
      summary="This draft explains how Keybridge Residential handles information submitted through its rental application form."
    >
      <LegalSection title="Information we collect">
        <p>The application form asks for information needed to review a prospective rental, including:</p>
        <ul className={legalListClasses}>
          <li>Your name, email address, phone number, marital status, and current address.</li>
          <li>Your assigned agent, preferred property type, desired ZIP code, and preferred move-in date.</li>
          <li>Your stated move-in funds, planned length of stay, advance-rent preference, and availability of the $75 application fee.</li>
          <li>Information about vehicle ownership, pets, prior eviction history, and your preferred payment method.</li>
          <li>Your confirmation that the information supplied is accurate.</li>
        </ul>
        <p>
          For security, the server also temporarily uses an IP address for rate limiting and a short-lived hashed form fingerprint to prevent duplicate submissions. These safeguards are held in server memory rather than an applicant database.
        </p>
      </LegalSection>

      <LegalSection title="How applications are delivered">
        <p>
          Keybridge does not save application form submissions in a database. When the form is successfully submitted, the application is emailed to the assigned Keybridge agent, with a copy sent to a central Keybridge address. A confirmation email is also sent to the applicant.
        </p>
        <p>
          Keybridge uses an email delivery provider to transmit those messages. Copies may therefore remain in the relevant Keybridge and applicant mailboxes and in limited delivery records maintained by the email provider.
        </p>
      </LegalSection>

      <LegalSection title="How we use and share information">
        <p>
          Application information is used to receive, route, review, and follow up on the rental application, communicate with the applicant, and coordinate the placement process.
        </p>
        <p>
          Keybridge does not sell applicant information to third parties. Information is shared only with the assigned agent, the central Keybridge recipient, and service providers needed to deliver the application and related communications, subject to confirmation by legal counsel.
        </p>
      </LegalSection>

      <LegalSection title="Retention and security">
        <p>
          Although the website does not maintain an application database, submitted information may remain in business email accounts and provider delivery records. Keybridge&apos;s final retention and deletion practices are still to be confirmed before launch.
        </p>
        <p>
          The application uses server-side validation, bot filtering, rate limiting, duplicate protection, and HTML sanitization. No online service can guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection title="Applicant rights — pending legal confirmation">
        <p>
          Depending on applicable law, applicants may have rights to request access to, correction of, or deletion of personal information held by Keybridge, and may have additional rights to object to or restrict certain uses. Keybridge may need to verify identity before acting on a request.
        </p>
        <p>
          The available rights, response process, exceptions, and official request channel must be confirmed by Keybridge&apos;s legal counsel. Until then, applicants may contact their assigned Keybridge representative for assistance.
        </p>
      </LegalSection>

      <LegalSection title="Questions">
        <p>
          Questions about this draft or the handling of an application should be directed to the applicant&apos;s assigned Keybridge representative. A formal privacy contact will be added following legal review.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
