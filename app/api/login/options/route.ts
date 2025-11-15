import { generateAuthenticationOptions } from "@simplewebauthn/server";
import { NextResponse } from "next/server";

const JSON_SERVER = "http://localhost:4000";

export async function POST(request: Request) {
  try {
    const { username } = await request.json();

    const usersRes = await fetch(`${JSON_SERVER}/users?username=${username}`);
    const users = await usersRes.json();
    if (!users.length)
      return NextResponse.json({ error: "User not found" }, { status: 400 });

    const user = users[0];
    
    // ✅ Add logging
  // ...existing code...

    const allowCredentials = (user.credentials || []).map((cred: any) => {
  // ...existing code...
      return {
        id: cred.id,
        type: "public-key" as const,
        transports: ["internal", "hybrid"] as const,
      };
    });

    const options = await generateAuthenticationOptions({
      rpID: "dp2lpccp-3000.asse.devtunnels.ms",
      userVerification: "required",
      timeout: 60000,
      allowCredentials,
    });
    
    // ✅ Log the final options
  // ...existing code...

    await fetch(`${JSON_SERVER}/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...user, currentChallenge: options.challenge }),
    });

    return NextResponse.json(options);
  } catch (err) {
    console.error("LOGIN OPTIONS ERROR:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}