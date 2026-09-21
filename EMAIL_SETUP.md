# SendGrid application notifications

The backend sends through `@sendgrid/mail`. A submission goes to the selected agent, copies the central mailbox, and then sends a separate confirmation to the applicant. Both emails use `FROM_EMAIL` as the sender and the existing email templates.

## Connect the sender

1. Use the sender already verified through SendGrid's Single Sender Verification. Its address is configured as `FROM_EMAIL` in `.env.local`.
2. Create a SendGrid API key with **Mail Send** permission and replace the `SENDGRID_API_KEY` placeholder in `.env.local` with that key. Keep the real key outside source control.
3. Check `AGENT_01_EMAIL`, `AGENT_02_EMAIL`, `AGENT_03_EMAIL`, and `CENTRAL_KEYBRIDGE_EMAIL` in that file. These are destinations, separate from the sender.
4. Start or restart the app with `npm run dev`, open the localhost address printed by Next.js, and submit the form.

For a published website, configure those same six environment variables on its host and redeploy before testing there. All six variables are used only by the server API route. None should have a `NEXT_PUBLIC_` prefix.

See the [SendGrid Node.js quickstart](https://www.twilio.com/docs/sendgrid/for-developers/sending-email/quickstart-nodejs) for API key setup.

## Check delivery

Choose the agent whose inbox you can check. Each submission goes to that selected agent and the central mailbox; it does not go to all three agents.

Check the selected agent's inbox and spam folder, the central mailbox, and the applicant's inbox. SendGrid's HTTP 202 response confirms acceptance for sending; check its Email Activity and the inboxes to establish delivery. The server logs the application reference and SendGrid message ID when available.

Missing sender, central address, or API key configuration returns an error. Either email failing produces the form's existing error state and logs provider diagnostics on the server. If the agent email was accepted but the applicant confirmation fails, the error message includes the application reference and explains that resubmission is unnecessary. The API never returns configured email addresses, credentials, or raw provider errors.

## Backend checks

Run `npm run test:backend` and `npx tsc --noEmit --incremental false`. The tests use synthetic addresses and a simulated SendGrid client; they do not send email.
