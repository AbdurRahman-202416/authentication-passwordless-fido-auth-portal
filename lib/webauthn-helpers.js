import { base64UrlEncode } from './base64url';

export function generateChallenge() {
  const arr = new Uint8Array(32);
  globalThis.crypto.getRandomValues(arr);
  return base64UrlEncode(arr);
}

export const rp = {
  name: 'Example RP',
  id: undefined, // left for runtime determination
};

export function simpleRegistrationOptions({ user }) {
  return {
    rp,
    user: {
      id: user.id,
      name: user.username,
      displayName: user.displayName,
    },
    challenge: generateChallenge(),
    pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
    timeout: 60000,
    attestation: 'direct',
  };
}

const helpers = { generateChallenge, rp, simpleRegistrationOptions };

export default helpers;
