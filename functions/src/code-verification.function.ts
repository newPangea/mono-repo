import * as functions from 'firebase-functions';
import * as twilio from 'twilio';

const accountSid = functions.config().twilio.account_sid;
const authToken = functions.config().twilio.auth_token;

export const codeVerification = functions.https.onCall((data) => {
  const client = twilio(accountSid, authToken);
  const { code, email } = data;
  return client.verify
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

// export const codeVerification = functions.https.onRequest((req, resp) => {
//   const client = twilio(accountSid, authToken);
//   const { code, email } = req.body;
//   client.verify
//     .services('VA1de4266d320cb443769d443a8f617452')
//     .verificationChecks.create({ to: email, code })
//     .then((pp) => {
//       console.log(pp);
//       resp.json({ pp });
//     })
//     .catch((err) => console.log(err));
// });
