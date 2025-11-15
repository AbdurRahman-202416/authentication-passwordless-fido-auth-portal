import { getUserByUsername, listAllUsers } from '../../../../lib/storage';

// POST /api/login/credentials
// expects { username, password }
export async function POST(req) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) return new Response(JSON.stringify({ error: 'username and password required' }), { status: 400 });

    console.debug(`/api/login/credentials attempt for username=", ${username}"`);
    const user = getUserByUsername(username);
    if (!user) {
      // dump known users for debugging
      const known = listAllUsers();
      console.debug(`/api/login/credentials user not found. known users=`, known);
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    // demo password check (in-memory plaintext) — replace with proper hashing in production
    if (user.password !== password) return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });

    return new Response(JSON.stringify({ userId: user.id }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
}
