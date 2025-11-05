🔑 Authentication-Passwordless-FIDO-Auth-Portal

A comprehensive portal demonstrating secure, phishing-resistant, passwordless authentication using FIDO Passkeys.

💡 Motivation: Why Passwordless?

The traditional username/password model is fundamentally broken—it is vulnerable to phishing, suffers from weak password reuse, and causes user fatigue.

This project addresses these issues head-on by adopting FIDO2 / WebAuthn. By using cryptographic keys (Passkeys) bound to the website's domain, we provide a next-generation security model that is:

✅ Phishing-Proof: Credentials only work on the intended domain.
🚀 Lightning Fast: Log in with a single touch (biometrics).
🔒 Highly Secure: Based on public-key cryptography.

✨ Core Features in Detail

The portal implements the complete FIDO authentication lifecycle, focusing on high security and excellent developer experience:

#

Feature

Description

Status

1.

Passkey Registration (Credential Creation)

Guides the user through creating a new cryptographic key pair, storing the private key securely on their device (using Face ID, Touch ID, or PIN), and sending the public key to the server.

✅ Implemented

2.

Passwordless Authentication

Allows users to sign in without ever entering a password. The device proves possession of the private key via a cryptographic signature.

✅ Implemented

3.

Server-Side Verification

Dedicated API handlers (in Next.js) that securely decode and validate FIDO responses (Attestation and Assertion) to ensure they meet security requirements.

✅ Implemented

4.

Phishing Resistance Guarantee

Credentials include the Relying Party ID (RP ID), making them unusable by attackers even if intercepted on a malicious site.

🛡️ Secured

5.

Multi-Device Support

Designed to manage multiple registered authenticators per user (e.g., phone, laptop, security key) and prepares the way for cloud-synced Passkeys.

🛠️ Future Scope

🚀 Key Technologies & Stack

This project leverages a modern and robust full-stack environment:

Technology

Icon

Role

Next.js (React)

⚛️

The full-stack framework handling the client-side UI and server-side API endpoints.

FIDO2 / WebAuthn

🔑

The open standard for cryptographic key management and verification.

Passkeys

📱

The cross-platform credential system replacing passwords.

TypeScript

✍️

Ensures type safety and improves code quality throughout the application.

Tailwind CSS

🎨

Used for rapid, utility-first, and responsive UI styling.

🛠 Installation and Setup Guide

Follow these steps to get your local development environment running:

Step 1: Clone the Repository

Open your terminal and clone the project:

git clone [https://github.com/YourUsername/authentication-passwordless-fido-auth-portal.git](https://github.com/YourUsername/authentication-passwordless-fido-auth-portal.git)
cd authentication-passwordless-fido-auth-portal


Step 2: Install Dependencies

Use your preferred package manager:

# Using npm
npm install

# Alternatively, using yarn
# yarn install


Step 3: Configure Environment Variables

Create a file named .env.local in the root of the project. You must define the FIDO Relying Party (RP) parameters.

# .env.local

# The hostname (domain) that owns the Passkeys. 
# For local development, this is typically 'localhost'
NEXT_PUBLIC_FIDO_RP_ID=localhost 

# The full origin URL. Use HTTPS for production.
NEXT_PUBLIC_FIDO_RP_ORIGIN=http://localhost:3000

# Optional: Server-side secret key for session management
AUTH_SECRET=a_strong_random_secret_key_here


Step 4: Run the Development Server

Start the application:

npm run dev
# or
yarn dev


The application will be accessible at: 👉 http://localhost:3000

🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'feat: Added Amazing Feature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License

Distributed under the MIT License. See LICENSE.md for more information.