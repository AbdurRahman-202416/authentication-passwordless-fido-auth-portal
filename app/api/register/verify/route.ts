import { NextResponse } from "next/server";
import { verifyRegistrationResponse } from "@simplewebauthn/server";

const JSON_SERVER = "http://localhost:4000";

export async function POST(request: Request) {
  try {
    const { username, credential } = await request.json();

    console.log("VERIFY REGISTER: username =", username);
    console.log("Browser credential received:", credential);

    // 1️⃣ Load user from JSON Server
    const usersRes = await fetch(`${JSON_SERVER}/users?username=${username}`);
    const users = await usersRes.json();

    if (!users || users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const user = users[0];

    // 2️⃣ Verify registration response
    const verification = await verifyRegistrationResponse({
      response: credential,
      expectedChallenge: user.currentChallenge,
      expectedOrigin: "https://dp2lpccp-3000.asse.devtunnels.ms", // ✅ your dev tunnel or domain
      expectedRPID: "dp2lpccp-3000.asse.devtunnels.ms",
    });

    console.log("Verification result:", verification);

    if (!verification.verified) {
      console.error("❌ Registration not verified", verification);
      return NextResponse.json({ verified: false, error: "Registration not verified" }, { status: 400 });
    }

    // 3️⃣ Safe extraction of credentialID, publicKey, counter
    let credID: string;
    let pubKey: string;
    let counter: number;

    const regInfo = verification.registrationInfo;

    if (regInfo && regInfo.credential) {
      // ✅ Correct nested extraction for attestation: 'none'
      credID = Buffer.from(regInfo.credential.id).toString("base64url");
      pubKey = Buffer.from(regInfo.credential.publicKey).toString("base64url");
      counter = regInfo.credential.counter ?? 0;
    } else if (credential.id && credential.publicKey) {
      // fallback for mobile devices
      credID = credential.id;
      pubKey = Buffer.from(credential.publicKey).toString("base64url");
      counter = credential.counter ?? 0;
    } else {
      console.error("❌ Cannot extract credentialID or publicKey", { regInfo, credential });
      return NextResponse.json({ verified: false, error: "credentialID or publicKey missing" }, { status: 400 });
    }

    const newCredential = {
      id: credID,
      publicKey: pubKey,
      counter,
    };

    // 4️⃣ Update user in JSON Server
    const updatedUser = {
      ...user,
      credentials: [...(user.credentials || []), newCredential],
      currentChallenge: null,
    };

    await fetch(`${JSON_SERVER}/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    });

    console.log("✅ SAVED CREDENTIAL:", newCredential);

    return NextResponse.json({ verified: true });
  } catch (err) {
    console.error("REGISTER VERIFY ERROR:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
