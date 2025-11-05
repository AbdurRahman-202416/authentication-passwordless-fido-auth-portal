import { NextResponse } from "next/server";
import { generateRegistrationOptions } from "@simplewebauthn/server";
import { v4 as uuidv4 } from "uuid";

const JSON_SERVER = "http://localhost:4000";

export async function POST(request: Request) {
  try {
    console.log("✅ /api/register/options called");

    const { username } = await request.json();
    console.log("✅ username:", username);

    // Get or create user
    const usersRes = await fetch(
      `${JSON_SERVER}/users?username=${encodeURIComponent(username)}`
    );
    const users = await usersRes.json();
    console.log("✅ users found:", users);

    let user;
    if (users.length === 0) {
      user = { id: uuidv4(), username, credentials: [] };
      const createRes = await fetch(`${JSON_SERVER}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      console.log("✅ user created:", user, "status:", createRes.status);
    } else {
      user = users[0];
    }

    // Generate registration options
    const options = await generateRegistrationOptions({
      rpName: "NextJS Passkey Demo",
      rpID: "dp2lpccp-3000.asse.devtunnels.ms",
      userID: Buffer.from(user.id), // <--- IMPORTANT
      userName: user.username,
      attestationType: "none",
      authenticatorSelection: {
        userVerification: "required",
        residentKey: "preferred",
      },
    });

    console.log("✅ options generated:", options);

    // Save challenge to user
    await fetch(`${JSON_SERVER}/users/${user.id}`, {
      method: "PUT", // Use PUT to replace full object
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...user, currentChallenge: options.challenge }),
    });

    return NextResponse.json(options);
  } catch (err: any) {
    console.error("❌ ERROR /api/register/options:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
