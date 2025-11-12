// server.js
const express = require("express");
const crypto = require("node:crypto");
const {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} = require("@simplewebauthn/server");

const cors = require("cors");

// Polyfill Web Crypto API for Node.js (needed by simplewebauthn)
if (!globalThis.crypto) {
  globalThis.crypto = crypto;
}

const PORT = 4000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Next.js dev server
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

// In-memory user store (use a real DB in production)
const userStore = {};
const challengeStore = {};

// =============== REGISTRATION ===============

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  // Check if username already exists
  const existingUser = Object.values(userStore).find(u => u.username === username);
  if (existingUser) {
    return res.status(409).json({ error: "Username already taken" });
  }

  const id = `user_${Date.now()}`;
  userStore[id] = { id, username, password };

  console.log(`✅ Registered user: ${username} (${id})`);
  return res.json({ id });
});

app.post("/register-challenge", async (req, res) => {
  const { userId } = req.body;

  if (!userStore[userId]) {
    return res.status(404).json({ error: "User not found!" });
  }

  const user = userStore[userId];

  const challengePayload = await generateRegistrationOptions({
    rpID: "localhost",
    rpName: "My Local App",
    userName: user.username,
    timeout: 60000,
    attestationType: "none",
    excludeCredentials: user.passkey
      ? [{ id: user.passkey.credentialID, type: "public-key" }]
      : [],
  });

  challengeStore[userId] = challengePayload.challenge;
  return res.json({ options: challengePayload });
});

app.post("/register-verify", async (req, res) => {
  try {
    const { userId, cred } = req.body;

    if (!userStore[userId]) {
      return res.status(404).json({ error: "User not found!" });
    }

    const user = userStore[userId];
    const expectedChallenge = challengeStore[userId];

    if (!expectedChallenge) {
      return res.status(400).json({ error: "No challenge found. Start registration first." });
    }

    const verification = await verifyRegistrationResponse({
      response: cred,
      expectedChallenge,
      expectedOrigin: "http://localhost:3000",
      expectedRPID: "localhost",
      requireUserVerification: false,
    });

    if (!verification.verified) {
      return res.status(400).json({ error: "Passkey verification failed" });
    }

    // Save the passkey (registration info)
    userStore[userId].passkey = verification.registrationInfo;

    // Clean up challenge
    delete challengeStore[userId];

    return res.json({ verified: true });
  } catch (err) {
    console.error("Registration verify error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// =============== LOGIN ===============

// ✅ NEW: Verify username + password FIRST
app.post("/login/credentials", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  const user = Object.values(userStore).find(u => u.username === username);

  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  return res.json({ success: true, userId: user.id });
});

// Challenge for passkey login
app.post("/login-challenge", async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  const user = userStore[userId];
  if (!user) {
    return res.status(404).json({ error: "User not found!" });
  }

  // ✅ CRITICAL: Check if passkey exists
  if (!user.passkey || !user.passkey.credentialID) {
    console.warn(`User ${userId} has no valid passkey registered`);
    return res.status(400).json({ error: "No passkey registered for this user. Please register one first." });
  }

  try {
    const opts = await generateAuthenticationOptions({
      rpID: "localhost",
      allowCredentials: [
        {
          id: user.passkey.credentialID, // Buffer or Uint8Array
          type: "public-key",
        },
      ],
      timeout: 60000,
    });

    challengeStore[userId] = opts.challenge;
    return res.json({ options: opts });
  } catch (err) {
    console.error("Error generating login challenge:", err);
    return res.status(500).json({ error: "Failed to generate authentication challenge" });
  }
});

// Verify passkey response
app.post("/login-verify", async (req, res) => {
  const { userId, cred } = req.body;

  if (!userStore[userId]) {
    return res.status(404).json({ error: "User not found!" });
  }

  const user = userStore[userId];
  const expectedChallenge = challengeStore[userId];

  if (!expectedChallenge) {
    return res.status(400).json({ error: "No login challenge found. Start login first." });
  }

  if (!user.passkey) {
    return res.status(400).json({ error: "No passkey on file" });
  }

  try {
    const verification = await verifyAuthenticationResponse({
      response: cred,
      expectedChallenge,
      expectedOrigin: "http://localhost:3000",
      expectedRPID: "localhost",
      authenticator: user.passkey,
      requireUserVerification: false,
    });

    // Clean up
    delete challengeStore[userId];

    if (verification.verified) {
      return res.json({ success: true, userId });
    } else {
      return res.status(401).json({ error: "Passkey authentication failed" });
    }
  } catch (err) {
    console.error("Login verify error:", err);
    return res.status(500).json({ error: "Internal server error during verification" });
  }
});

// Basic health check
app.get("/", (req, res) => {
  res.json({ message: "WebAuthn server running ✅" });
});

app.listen(PORT, () => {
  console.log(`🚀 WebAuthn server running on http://localhost:${PORT}`);
});