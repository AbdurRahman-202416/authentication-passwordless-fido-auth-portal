import { getUserById, getCredentialsForUser, saveChallenge } from '../../../lib/storage';
import { generateChallenge } from '../../../lib/webauthn-helpers';
import { base64UrlEncode } from '../../../lib/base64url';

// POST /api/login-challenge
// expects { userId }
export async function POST(req) {
  try {
    const { userId } = await req.json();
    if (!userId) return new Response(JSON.stringify({ error: 'userId required' }), { status: 400 });

  const user = getUserById(userId);
  // ...existing code...
  if (!user) return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });

    const challenge = generateChallenge();
    saveChallenge(userId, challenge);

    // Extract RP ID in a robust way so the tunnel hostname (or host header) is used
    // Priority: host header (strip port) -> x-forwarded-host -> origin -> referer
    let rpId = undefined;
    try {
      const host = req.headers.get('x-forwarded-host') || req.headers.get('host') || '';
      const origin = req.headers.get('origin') || '';
      const referer = req.headers.get('referer') || req.headers.get('referrer') || '';
  // ...existing code...

      if (host) {
        rpId = host.split(',')[0].trim().split(':')[0];
  // ...existing code...
      } else if (origin) {
        const url = new URL(origin);
        rpId = url.hostname;
  // ...existing code...
      } else if (referer) {
        const url = new URL(referer);
        rpId = url.hostname;
  // ...existing code...
      }
    } catch (e) {
  // ...existing code...
      // fallback to undefined
    }
  // ...existing code...

    const credentials = getCredentialsForUser(userId) || [];
    // ensure credential ids are base64url strings (handle several stored shapes)
    const allowCredentials = credentials.map((c) => {
      let id = c.id;

      // Helper to normalize many possible shapes into a base64url string
      const normalize = (val) => {
        try {
          if (typeof val === 'string') return val;
          if (Array.isArray(val)) return base64UrlEncode(Buffer.from(val));
          // Buffer or Uint8Array
          if (typeof Buffer !== 'undefined' && Buffer.isBuffer(val)) return base64UrlEncode(Buffer.from(val));
          if (val instanceof Uint8Array) return base64UrlEncode(Buffer.from(val));
          if (val && typeof val === 'object') {
            const nums = Object.values(val).filter((v) => typeof v === 'number');
            if (nums.length) return base64UrlEncode(Buffer.from(nums));
          }
        } catch {
          // fallthrough to string conversion
        }
        return String(val ?? '');
      };

      id = normalize(id);

      return { id, type: 'public-key' };
    });

    const options = {
      publicKey: {
        challenge,
        timeout: 60000,
        allowCredentials,
        userVerification: 'preferred',
      },
    };
    if (rpId) {
      options.publicKey.rpId = rpId;
    }

    return new Response(JSON.stringify({ options }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
}
