import * as functions from 'firebase-functions';
import * as twilio from 'twilio';

// const sengridKey =
// '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';

const accountSid = 'AC16c14349320d07863ccc5ebea0b36ab0';
const authToken = '62f465dfe74150503ac3eb8873091367';

export const codeGenerator = functions.https.onCall((data, context) => {
  const { email } = data;
  const client = twilio(accountSid, authToken);
  return client.verify
    .services('VA1de4266d320cb443769d443a8f617452')
    .verifications.create({
      to: email,
      channel: 'email',
    });
});