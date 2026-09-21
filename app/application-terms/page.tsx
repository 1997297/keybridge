import type { Metadata } from "next";
import {
  LegalPage,
  LegalSection,
  legalListClasses,
} from "@/app/_components/legal-page";

export const metadata: Metadata = {
  title: "Application Terms | Keybridge Residential",
  description: "Draft rental application terms for Keybridge Residential applicants.",
};

export default function ApplicationTermsPage() {
  return (
    <LegalPage
      eyebrow="Rental Application"
      title="Application Terms"
      summary="These draft terms describe the current Keybridge Residential application and review process."
    >
      <LegalSection title="Submitting an application">
        <p>
          By submitting the form, the applicant confirms that the information provided is accurate to the best of their knowledge and may be used by Keybridge to evaluate and communicate about the requested rental placement.
        </p>
        <p>
          Submission starts the application intake process only. It does not create a lease, reserve an apartment, or guarantee that an application will be approved.
        </p>
      </LegalSection>

      <LegalSection title="$75 application fee">
        <p>
          A $75 application fee is required before Keybridge will begin reviewing or acting on an application. The assigned Keybridge representative will provide the applicable payment instructions after submission.
        </p>
        <div className="rounded-xl border border-sand-300 bg-sand-50 px-4 py-3.5 text-charcoal-800">
          <p>
            <strong className="font-semibold">Refund policy pending confirmation:</strong>{" "}
            Refund policy details for the $75 application fee have not yet been confirmed and will be communicated separately. Applicants should review the confirmed policy before making payment.
          </p>
        </div>
      </LegalSection>

      <LegalSection title="Review and decision">
        <p>
          Keybridge may approve or reject an application at its discretion under its internal review process, subject to applicable law. Factors and documentation considered during review may vary by applicant, property, landlord, and location.
        </p>
        <ul className={legalListClasses}>
          <li>Paying the application fee does not guarantee approval.</li>
          <li>An agent&apos;s initial communication or property discussion is not final approval.</li>
          <li>Additional information or verification may be requested before a decision is made.</li>
        </ul>
      </LegalSection>

      <LegalSection title="If an application is approved">
        <p>
          Approved applicants will be required to pay the applicable rent before Keybridge issues final documentation and before the apartment is released or keys are handed over. The assigned representative will communicate the required amount, timing, and approved payment instructions.
        </p>
        <p>
          Approval remains subject to completion of the required payment and documentation steps. Final lease or occupancy rights arise only from the completed documents applicable to the placement.
        </p>
      </LegalSection>

      <LegalSection title="Questions and confirmation">
        <p>
          Applicants should ask their assigned Keybridge representative about any term they do not understand before paying the application fee or rent. These draft terms, including the fee refund policy and any location-specific requirements, must be confirmed by Keybridge&apos;s legal counsel before launch.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
