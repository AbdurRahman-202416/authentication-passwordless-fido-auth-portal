import { saveChallenge, getUserById } from '../../../lib/storage';
import { generateChallenge, rp } from '../../../lib/webauthn-helpers';

// POST /api/register-challenge
// expects { userId }
export async function POST(req) {
  try {
    const { userId } = await req.json();
    if (!userId) return new Response(JSON.stringify({ error: 'userId required' }), { status: 400 });

    const user = getUserById(userId);
    if (!user) return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });

    const challenge = generateChallenge();
    saveChallenge(userId, challenge);

    // Extract RP ID in a robust way so the tunnel hostname (or host header) is used
    // Priority: host header (strip port) -> x-forwarded-host -> origin -> referer -> configured rp.id
    let rpId = rp.id;
    try {
      const host = req.headers.get('x-forwarded-host') || req.headers.get('host') || '';
      const origin = req.headers.get('origin') || '';
      const referer = req.headers.get('referer') || req.headers.get('referrer') || '';
      console.debug(`/api/register-challenge headers host: "${host}", origin: "${origin}", referer: "${referer}"`);

      if (host) {
        // host may include port
        rpId = host.split(',')[0].trim().split(':')[0];
        console.debug(`/api/register-challenge using host header (RP ID): "${rpId}"`);
      } else if (origin) {
        const url = new URL(origin);
        rpId = url.hostname;
        console.debug(`/api/register-challenge using origin hostname (RP ID): "${rpId}"`);
      } else if (referer) {
        const url = new URL(referer);
        rpId = url.hostname;
        console.debug(`/api/register-challenge using referer hostname (RP ID): "${rpId}"`);
      }
    } catch (e) {
      console.debug(`/api/register-challenge header parsing failed:`, e);
      // fallback to configured rp.id
    }
    console.debug(`/api/register-challenge final RP ID: "${rpId}"`);

    // Build the publicKey options object that @simplewebauthn/browser expects
    const options = {
      publicKey: {
        challenge,
        rp: { name: rp.name, id: rpId },
        user: { id: userId, name: user.username, displayName: user.displayName || user.username },
        // include both ES256 (-7) and RS256 (-257) to maximize authenticator compatibility
        pubKeyCredParams: [{ alg: -7, type: 'public-key' }, { alg: -257, type: 'public-key' }],
        timeout: 60000,
        attestation: 'direct',
      },
    };

    return new Response(JSON.stringify({ options }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
}
