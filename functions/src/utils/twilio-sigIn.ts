import * as twilio from 'twilio';

const AccessToken = twilio.jwt.AccessToken;

const twilioAccountSid = 'AC16c14349320d07863ccc5ebea0b36ab0';
const twilioApiKey = 'SK04847ae292fae4d3ab7a97c1b055421f';
const twilioApiSecret = 'CCaD8ZAMMB4Uzj2NdbcYDjA3AVUpIuyA';

/**
 * Get token session
 *
 * @return {string} token
 */
export function generateToken(): string {
  const token = new AccessToken(
    twilioAccountSid,
    twilioApiKey,
    twilioApiSecret
  );
  return token.toJwt();
}
