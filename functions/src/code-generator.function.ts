import * as functions from 'firebase-functions';
import * as twilio from 'twilio';

// const sengridKey =
// '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';

const accountSid = functions.config().twilio.account_sid;
const authToken = functions.config().twilio.auth_token;

export const codeGenerator = functions.https.onCall((data) => {
  const { email } = data;
  const client = twilio(accountSid, authToken);
  return client.verify
    .services('VA1de4266d320cb443769d443a8f617452')
    .verifications.create({
      to: email,
      channel: 'email',
    })
    .then(() => ({
      complete: true,
    }));
});
