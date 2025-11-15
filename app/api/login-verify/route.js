import { getChallenge, deleteChallenge, getCredentialsForUser } from '../../../lib/storage';

// POST /api/login-verify
// expects { userId, cred }
export async function POST(req) {
  try {
    const { userId, cred } = await req.json();
    if (!userId || !cred) return new Response(JSON.stringify({ error: 'userId and cred required' }), { status: 400 });

    const expectedChallenge = getChallenge(userId);
    if (!expectedChallenge) return new Response(JSON.stringify({ error: 'No challenge for user' }), { status: 400 });

    // NOTE: Real assertion verification must be implemented for production.
    // For demo purposes, accept the assertion if a credential exists for the user.
    const creds = getCredentialsForUser(userId) || [];
    // normalize incoming cred id/rawId to string for comparison
    let incomingId = cred.id;
    if (!incomingId && cred.rawId) incomingId = cred.rawId;
    if (typeof incomingId !== 'string') {
      if (Array.isArray(incomingId)) {
        incomingId = Buffer.from(incomingId).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
      } else if (incomingId && typeof incomingId === 'object') {
        const vals = Object.values(incomingId).filter(v => typeof v === 'number');
        if (vals.length) incomingId = Buffer.from(vals).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
        else incomingId = String(incomingId);
      } else {
        incomingId = String(incomingId);
      }
    }

    const matched = creds.find(c => c.id === incomingId);
    if (!matched) return new Response(JSON.stringify({ error: 'Credential not found' }), { status: 404 });

    deleteChallenge(userId);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
}
