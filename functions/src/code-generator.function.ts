import * as functions from 'firebase-functions';
import { clientTwilio } from './utils/twilio.utils';

// const sengridKey =
// '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';

export const codeGenerator = functions.https.onCall((data) => {
  const { email } = data;
  return clientTwilio.verify
    .services('VA1de4266d320cb443769d443a8f617452')
    .verifications.create({
      to: email,
      channel: 'email',
    })
    .then(() => ({
      complete: true,
    }));
});
