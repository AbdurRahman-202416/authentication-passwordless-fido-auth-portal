export function base64UrlEncode(buffer) {
  const b = Buffer.from(buffer instanceof Uint8Array ? buffer : Buffer.from(buffer));
  return b.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

export function base64UrlToBuffer(base64url) {
  // convert base64url to base64
  const b64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  // pad
  const pad = b64.length % 4;
  const padded = b64 + (pad ? '='.repeat(4 - pad) : '');
  return Buffer.from(padded, 'base64');
}
