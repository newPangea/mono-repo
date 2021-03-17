import * as twilio from 'twilio';
import * as functions from 'firebase-functions';

const accountSid = functions.config().twilio.account_sid;
const authToken = functions.config().twilio.auth_token;

export const clientTwilio = twilio(accountSid, authToken);
