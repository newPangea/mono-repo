import * as functions from 'firebase-functions';
import { clientTwilio } from './utils/twilio.utils';

export const codeVerification = functions.https.onCall((data) => {
  const { code, email } = data;
  return clientTwilio.verify
    .services('VA1de4266d320cb443769d443a8f617452')
    .verificationChecks.create({ to: email, code })
    .then(({ valid }) => {
      return { valid };
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
      return { valid: false };
    });
});
