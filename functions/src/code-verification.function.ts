import * as functions from 'firebase-functions';
import * as twilio from 'twilio';

const accountSid = 'AC16c14349320d07863ccc5ebea0b36ab0';
const authToken = '62f465dfe74150503ac3eb8873091367';

export const codeVerification = functions.https.onCall((data, context) => {
  const client = twilio(accountSid, authToken);
  const { code, email } = data;
  return client.verify
    .services('VA1de4266d320cb443769d443a8f617452')
    .verificationChecks.create({ to: email, code });
});
