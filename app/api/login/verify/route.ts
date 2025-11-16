// app/api/login/verify/route.ts
import { NextResponse } from 'next/server';
import { verifyAuthenticationResponse } from '@simplewebauthn/server';
import { isoBase64URL } from '@simplewebauthn/server/helpers';

const JSON_SERVER = 'http://localhost:4000';

export async function POST(request: Request) {
  try {
    const { username, credential } = await request.json();

  // ...existing code...
  // ...existing code...

    const usersRes = await fetch(`${JSON_SERVER}/users?username=${encodeURIComponent(username)}`);
    const users = await usersRes.json();
    
    if (users.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 400 });
    }
    
    const user = users[0];

    // ✅ Convert rawId to base64url for comparison
    const credentialIdBase64 = credential.id; // This is already base64url from the browser
    
  // ...existing code...
  // ...existing code...
    
    const authenticator = (user.credentials || []).find((c: any) => c.id === credentialIdBase64);
    
    if (!authenticator) {
      console.error('❌ Authenticator not found. Credential ID:', credentialIdBase64);
      return NextResponse.json({ error: 'Authenticator not found' }, { status: 400 });
    }

  // ...existing code...

    // ✅ Prepare authenticator object for simplewebauthn
    const authenticatorRecord = {
      credentialID: isoBase64URL.toBuffer(authenticator.id),
      credentialPublicKey: isoBase64URL.toBuffer(authenticator.publicKey),
      counter: authenticator.counter || 0,
    };

  // ...existing code...

    // ✅ Verify the authentication response
    const verification = await verifyAuthenticationResponse(({
      response: credential,
      expectedChallenge: user.currentChallenge,
      expectedOrigin: 'https://dp2lpccp-3000.asse.devtunnels.ms',
      expectedRPID: 'dp2lpccp-3000.asse.devtunnels.ms',
      authenticator: authenticatorRecord,
    } as any));

  // ...existing code...

    if (verification.verified) {
      // ✅ Update counter in JSON server
      const updatedCredentials = user.credentials.map((c: any) =>
        c.id === authenticator.id 
          ? { ...c, counter: verification.authenticationInfo.newCounter } 
          : c
      );

      await fetch(`${JSON_SERVER}/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...user,
          credentials: updatedCredentials,
          currentChallenge: null 
        }),
      });

  // ...existing code...
      return NextResponse.json({ verified: true });
    }

    console.error("❌ Verification failed");
    return NextResponse.json({ verified: false }, { status: 401 });
    
  } catch (err) {
    console.error('❌ LOGIN VERIFICATION ERROR:', err);
    return NextResponse.json({ 
      error: 'Verification failed', 
      details: String(err) 
    }, { status: 500 });
  }
}