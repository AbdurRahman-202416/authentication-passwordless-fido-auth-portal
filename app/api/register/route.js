import { saveUser } from '../../../lib/storage';
import { base64UrlEncode } from '../../../lib/base64url';

// POST /api/register
// expects { username, password }
export async function POST(req) {
  try {
    const data = await req.json();
    const { username, password } = data;
    if (!username || !password) {
      return new Response(JSON.stringify({ error: 'username and password required' }), { status: 400 });
    }

    // create a stable user id (base64url of username) for demo purposes
    const userId = base64UrlEncode(Buffer.from(username));
    const displayName = username;

  // store user with password (in-memory demo only — do NOT do this in production)
  const userRecord = { id: userId, username, displayName, password };
  saveUser(userRecord);
  console.debug(`/api/register saved user:`, userRecord);

  return new Response(JSON.stringify({ id: userId }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
}
