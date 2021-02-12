import * as functions from 'firebase-functions';
import * as twilio from 'twilio';

const accountSid = 'AC16c14349320d07863ccc5ebea0b36ab0';
const authToken = '460cd3033fabded4786d64482f15be89';

export const codeVerification = functions.https.onCall((data, context) => {
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
