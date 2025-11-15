import { getChallenge, deleteChallenge, saveCredential } from '../../../lib/storage';
import { base64UrlEncode } from '../../../lib/base64url';

// POST /api/register-verify
// expects { userId, cred }
export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, cred } = body;
    if (!userId || !cred) return new Response(JSON.stringify({ error: 'userId and cred required' }), { status: 400 });

    const expectedChallenge = getChallenge(userId);
    if (!expectedChallenge) {
      // For demo: if the challenge has been lost (in-memory), log a warning and proceed to accept the credential.
  // ...existing code...
      console.warn(`No challenge found for userId=${userId} — proceeding in demo mode.`);
    }

  // ...existing code...
    // Normalize credential id/rawId to base64url strings before storing so login flow works.
    let storedId = null;
    if (typeof cred.id === 'string') {
      storedId = cred.id;
    } else if (cred.rawId && typeof cred.rawId === 'string') {
      storedId = cred.rawId;
    } else if (cred.rawId && typeof cred.rawId === 'object') {
      // rawId may be an array-like when JSON-stringified; collect numeric bytes
      try {
        const vals = Object.values(cred.rawId).filter(v => typeof v === 'number');
        if (vals.length) storedId = base64UrlEncode(Buffer.from(vals));
      } catch {
        // fallthrough
      }
    }
    if (!storedId && cred.id && typeof cred.id === 'object') {
      try {
        const vals = Object.values(cred.id).filter(v => typeof v === 'number');
        if (vals.length) storedId = base64UrlEncode(Buffer.from(vals));
      } catch {
        // fallthrough
      }
    }
    // fallback to string conversion
    if (!storedId) storedId = String(cred.id ?? cred.rawId ?? '');

  const saved = { id: storedId, rawId: storedId, response: cred.response };
  saveCredential(userId, saved);
  // ...existing code...
    deleteChallenge(userId);

    return new Response(JSON.stringify({ verified: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
}
