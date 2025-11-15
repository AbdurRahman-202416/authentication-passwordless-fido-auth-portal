# 🔐 Passwordless FIDO Authentication Portal

> **Next-Generation Authentication System** – A comprehensive, production-ready demonstration of phishing-resistant, passwordless authentication using FIDO2/WebAuthn and Passkeys.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Next.js](https://img.shields.io/badge/Framework-Next.js%2016-black?logo=nextdotjs)
![React](https://img.shields.io/badge/UI-React%2019-blue?logo=react)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue?logo=typescript)
![WebAuthn](https://img.shields.io/badge/Auth-WebAuthn%2FFIDO2-green?logo=webauthn)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Why Passwordless Authentication?](#why-passwordless-authentication)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Architecture](#project-architecture)
- [Installation & Setup](#installation--setup)
- [Usage Guide](#usage-guide)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

The **Passwordless FIDO Authentication Portal** is a full-stack web application built with **Next.js 16** that demonstrates secure, modern passwordless authentication using the **W3C WebAuthn API** and **FIDO2 standards**. 

This project replaces traditional username/password authentication with **Passkeys** — cryptographic credentials that are:
- ✅ **Phishing-Proof** – Bound to specific domains
- 🚀 **Lightning Fast** – Single-touch biometric login
- 🔒 **Cryptographically Secure** – Based on public-key cryptography
- 📱 **Cross-Platform** – Works on phones, laptops, and security keys

### Why Build This?

The traditional password model is fundamentally broken:
- 🚨 Vulnerable to phishing attacks
- 🔄 Leads to password reuse across sites
- 😩 Causes user fatigue
- 💰 Expensive to maintain (password resets, account recovery)

This portal solves all these problems with **FIDO2/WebAuthn**, providing a modern, production-ready authentication system.

---

## 💡 Why Passwordless Authentication?

### The Problem with Passwords

| Issue | Impact |
|-------|--------|
| **Phishing** | Users trick into entering credentials on fake sites |
| **Reuse** | Users reuse passwords across sites |
| **Weak Passwords** | Many users create simple, guessable passwords |
| **Breaches** | Stolen password databases compromise accounts |
| **Recovery** | Password reset processes are complex & costly |

### The Passkey Solution

| Benefit | How it Works |
|---------|-------------|
| **Phishing-Proof** | Credentials cryptographically bound to domain |
| **No Reuse** | Keys are unique per service |
| **Strong Security** | Uses elliptic-curve cryptography (P-256, P-384, P-521) |
| **Breach Safe** | Server never stores passwords or private keys |
| **Frictionless** | Biometric or PIN-based authentication |

---

## ✨ Key Features

| # | Feature | Description | Status |
|---|---------|-------------|--------|
| 1 | **Passkey Registration** | Create secure cryptographic credentials stored on user devices (Face ID, Touch ID, PIN) | ✅ Implemented |
| 2 | **Passwordless Login** | Sign in using device biometrics with zero passwords | ✅ Implemented |
| 3 | **Server-Side Verification** | Validate FIDO attestation & assertion responses | ✅ Implemented |
| 4 | **Phishing Resistance** | Domain-bound credentials prevent cross-site attacks | ✅ Implemented |
| 5 | **Multi-Authenticator Support** | Manage multiple registered devices per user | ✅ Implemented |
| 6 | **Dashboard** | View registered passkeys and account details | ✅ Implemented |
| 7 | **Health Check API** | System status monitoring endpoint | ✅ Implemented |
| 8 | **Production-Ready Error Handling** | Comprehensive error messages and logging | ✅ Implemented |

---

## 🚀 Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.0.1 | Full-stack React framework with API routes |
| **React** | 19.2.0 | UI component library |
| **React DOM** | 19.2.0 | React rendering engine |
| **TypeScript** | 5.x | Static typing for JavaScript |
| **Tailwind CSS** | 4.x | Utility-first CSS framework |
| **@simplewebauthn/browser** | 13.2.2 | WebAuthn client-side operations |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | JavaScript runtime |
| **Express** | 5.1.0 | Backend server framework |
| **@simplewebauthn/server** | 13.2.2 | WebAuthn server-side verification |
| **CORS** | 2.8.5 | Cross-origin resource sharing |
| **Body-Parser** | 2.2.0 | HTTP request parsing |

### Development Tools
| Tool | Version | Purpose |
|------|---------|---------|
| **ESLint** | 9.x | Code linting |
| **TypeScript** | 5.x | Type checking |
| **Tailwind CSS PostCSS** | 4.x | CSS preprocessing |
| **Nodemon** | 3.1.11 | Development server auto-reload |

### Database
- **JSON Server** (Development) – In-memory JSON database for local development
- **Recommended for Production** – PostgreSQL, MongoDB, or Firebase

---

## 🏗️ Project Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Frontend (Next.js)                    │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ Home Page    │  │ Register     │  │ Login        │ │
│  │ (HeroSection)│  │ (Passkey)    │  │ (Biometric)  │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│                                                         │
│  ┌─────────────────────────────────────────────────────┤
│  │   @simplewebauthn/browser (WebAuthn Operations)     │
│  └─────────────────────────────────────────────────────┤
│
│                   API Routes (Next.js)                  │
│  ┌──────────────────────────────────────────────────┐ │
│  │ /api/register/options      – Start registration   │ │
│  │ /api/register/verify       – Verify attestation   │ │
│  │ /api/login/options         – Start authentication │ │
│  │ /api/login/verify          – Verify assertion     │ │
│  │ /api/health                – Health check         │ │
│  └──────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────┐
│              Backend (Express + Node.js)                │
│                                                         │
│  ┌──────────────────────────────────────────────────┐ │
│  │ /register              – Create user account      │ │
│  │ /register-challenge    – Generate registration    │ │
│  │ /register-verify       – Verify registration      │ │
│  │ /login-challenge       – Generate authentication  │ │
│  │ /login-verify          – Verify authentication    │ │
│  └──────────────────────────────────────────────────┘ │
│                                                         │
│  ┌─────────────────────────────────────────────────────┤
│  │   @simplewebauthn/server (Verification Logic)      │
│  └─────────────────────────────────────────────────────┤
└─────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────┐
│            Database (JSON Server / PostgreSQL)          │
│                                                         │
│  ┌──────────────────────────────────────────────────┐ │
│  │ Users: { id, username, password, credentials }  │ │
│  │ Credentials: { id, publicKey, counter, ... }    │ │
│  │ Challenges: { userId, challenge, timestamp }    │ │
│  └──────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## 📂 Project Structure

```
authentication-passwordless-fido-auth-portal/
│
├── app/                                # Next.js App Router
│   ├── api/                           # API Routes
│   │   ├── health/route.js            # Health check endpoint
│   │   ├── login/
│   │   │   ├── credentials/route.js   # Get user credentials
│   │   │   ├── options/route.ts       # Generate login challenge
│   │   │   └── verify/route.ts        # Verify login assertion
│   │   ├── login-challenge/route.js   # Legacy challenge endpoint
│   │   ├── login-verify/route.js      # Legacy verify endpoint
│   │   ├── register/
│   │   │   ├── route.js               # Create user account
│   │   │   ├── options/route.ts       # Generate registration challenge
│   │   │   └── verify/route.ts        # Verify registration attestation
│   │   ├── register-challenge/route.js # Legacy challenge endpoint
│   │   └── register-verify/route.js   # Legacy verify endpoint
│   │
│   ├── dashboard/                     # Dashboard Page
│   │   └── page.tsx                   # User dashboard
│   │
│   ├── login/                         # Login Page
│   │   └── page.tsx                   # Biometric login form
│   │
│   ├── register/                      # Registration Page
│   │   └── page.tsx                   # Passkey registration form
│   │
│   ├── lib/                           # React Components
│   │   ├── HeroSection.tsx            # Home page hero component
│   │   ├── Navbar.tsx                 # Navigation bar
│   │   └── base64.ts                  # Base64 utilities
│   │
│   ├── layout.tsx                     # Root layout
│   ├── page.tsx                       # Home page
│   └── globals.css                    # Global styles
│
├── lib/                               # Shared Utilities
│   ├── base64url.js                   # Base64URL encoding/decoding
│   ├── storage.js                     # Local storage utilities
│   ├── webauthn-helpers.js            # WebAuthn helper functions
│   └── webcrypto-polyfill.js          # Web Crypto API polyfill
│
├── public/                            # Static Assets
│   ├── passwordless-authentication.png # Main hero image
│   ├── next.svg, vercel.svg           # Framework logos
│   └── *.svg                          # Icons and graphics
│
├── server/                            # Express Backend
│   ├── server.js                      # Main server file
│   ├── package.json                   # Backend dependencies
│   └── node_modules/                  # Backend packages
│
├── package.json                       # Frontend dependencies
├── tsconfig.json                      # TypeScript configuration
├── next.config.ts                     # Next.js configuration
├── tailwind.config.ts                 # Tailwind CSS config
├── postcss.config.mjs                 # PostCSS configuration
├── eslint.config.mjs                  # ESLint configuration
├── db.json                            # JSON Server data
└── README.md                          # This file
```

---

## 🛠️ Installation & Setup

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- Modern browser with WebAuthn support (Chrome 67+, Firefox 60+, Safari 13+, Edge 18+)

### Step 1: Clone the Repository

```bash
git clone https://github.com/AbdurRahman-202416/authentication-passwordless-fido-auth-portal.git
cd authentication-passwordless-fido-auth-portal
```

### Step 2: Install Frontend Dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

### Step 4: Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# FIDO Relying Party Configuration
NEXT_PUBLIC_FIDO_RP_ID=localhost
NEXT_PUBLIC_FIDO_RP_ORIGIN=http://localhost:3000

# Optional: Server-side secret
AUTH_SECRET=your_secret_key_here

# Backend Server URL (for development)
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Step 5: Start the Development Servers

**Terminal 1 – Start Next.js Frontend:**
```bash
npm run dev
```

The frontend will be available at: **http://localhost:3000**

**Terminal 2 – Start Express Backend:**
```bash
cd server
npm run dev
```

The backend will be available at: **http://localhost:4000**

### Step 6: Verify Installation

Visit **http://localhost:3000** in your browser. You should see:
- ✅ Home page with hero section
- ✅ "Register Passkey" button
- ✅ "Sign In (Passwordless)" button
- ✅ Navigation bar

---

## 📖 Usage Guide

### Creating a Passkey (Registration)

1. Click **"Register Passkey"** on the home page
2. Enter a **username** and **temporary password**
3. Click **"Register"** to create user account
4. Click **"Create Passkey"** to start biometric registration
5. Your device will prompt for Face ID, Touch ID, or Windows Hello
6. Confirm the biometric/PIN
7. ✅ Passkey registered successfully!

### Logging In with Passkey (Authentication)

1. Click **"Sign In (Passwordless)"** on the home page
2. Enter your **username**
3. Click **"Sign In"** to request authentication
4. Your device will prompt for Face ID, Touch ID, or Windows Hello
5. Confirm the biometric/PIN
6. ✅ You are now logged in!
7. View your dashboard at **/dashboard**

### Viewing Your Dashboard

- Click **"Dashboard"** after logging in
- View your registered authenticators
- See account details and login history

---

## 🔌 API Endpoints

### Frontend API Routes (Next.js)

#### Registration Endpoints

| Endpoint | Method | Description | Request | Response |
|----------|--------|-------------|---------|----------|
| `/api/register` | POST | Create user account | `{ username, password }` | `{ id, username }` |
| `/api/register/options` | POST | Generate registration challenge | `{ username }` | `{ options }` |
| `/api/register/verify` | POST | Verify registration attestation | `{ username, credential }` | `{ verified, userId }` |

#### Authentication Endpoints

| Endpoint | Method | Description | Request | Response |
|----------|--------|-------------|---------|----------|
| `/api/login/credentials` | POST | Get user by username | `{ username }` | `{ userId, username, credentials }` |
| `/api/login/options` | POST | Generate authentication challenge | `{ userId }` | `{ options }` |
| `/api/login/verify` | POST | Verify authentication assertion | `{ username, credential }` | `{ verified, userId }` |

#### System Endpoints

| Endpoint | Method | Description | Response |
|----------|--------|-------------|----------|
| `/api/health` | GET | Health check | `{ ok: true, time }` |

### Backend API Routes (Express)

| Endpoint | Method | Description | Port |
|----------|--------|-------------|------|
| `/register` | POST | Create user (legacy) | 4000 |
| `/register-challenge` | POST | Generate registration challenge (legacy) | 4000 |
| `/register-verify` | POST | Verify registration (legacy) | 4000 |
| `/login-challenge` | POST | Generate login challenge (legacy) | 4000 |
| `/login-verify` | POST | Verify login (legacy) | 4000 |

---

## 📦 Dependencies

### Frontend Dependencies (`package.json`)

```json
{
  "@simplewebauthn/browser": "^13.2.2",    // WebAuthn client operations
  "@simplewebauthn/server": "^13.2.2",     // WebAuthn server verification
  "next": "16.0.1",                        // Full-stack framework
  "react": "19.2.0",                       // UI library
  "react-dom": "19.2.0",                   // DOM rendering
  "uuid": "^13.0.0"                        // Unique ID generation
}
```

### Backend Dependencies (`server/package.json`)

```json
{
  "@simplewebauthn/server": "^13.2.2",     // WebAuthn verification
  "body-parser": "^2.2.0",                 // HTTP request parsing
  "cors": "^2.8.5",                        // Cross-origin requests
  "express": "^5.1.0"                      // Web framework
}
```

### Development Dependencies

```json
{
  "@tailwindcss/postcss": "^4",            // Tailwind CSS
  "@types/node": "^20",                    // Node.js types
  "@types/react": "^19",                   // React types
  "@types/react-dom": "^19",               // React DOM types
  "eslint": "^9",                          // Code linting
  "tailwindcss": "^4",                     // CSS utility framework
  "typescript": "^5"                       // TypeScript compiler
}
```

---

## ⚙️ Configuration

### TypeScript (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true,
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Tailwind CSS (`tailwind.config.ts`)

Provides utility-first CSS for responsive design:
- Dark theme support
- Custom color gradients
- Responsive breakpoints

### ESLint (`eslint.config.mjs`)

Enforces code quality standards:
- Next.js linting rules
- TypeScript type checking
- Code formatting rules

---

## 🧪 Testing the Application

### Test Registration Flow

```bash
# 1. Navigate to http://localhost:3000/register
# 2. Username: testuser@example.com
# 3. Password: TempPassword123!
# 4. Create Passkey using biometric
# 5. Verify success message
```

### Test Authentication Flow

```bash
# 1. Navigate to http://localhost:3000/login
# 2. Username: testuser@example.com
# 3. Authenticate using biometric
# 4. Should redirect to /dashboard
```

### Test Health Check

```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "ok": true,
  "time": 1700000000000
}
```

---

## 🔐 Security Considerations

### ✅ What's Protected

- **Private Keys**: Never transmitted; stored securely on device
- **Domain Binding**: Credentials cryptographically tied to domain
- **Challenge-Response**: Uses random challenges to prevent replay attacks
- **Public-Key Cryptography**: Server only stores public keys, not secrets

### 🛠️ Production Recommendations

1. **Use HTTPS**: WebAuthn requires secure context (HTTPS)
2. **Database**: Replace JSON Server with production database
3. **Session Management**: Implement secure session tokens
4. **Rate Limiting**: Add rate limits to API endpoints
5. **Logging**: Implement comprehensive audit logging
6. **Error Handling**: Avoid exposing sensitive information in errors
7. **CORS**: Restrict CORS to trusted origins only
8. **Environment Variables**: Keep secrets in environment variables
9. **Database Encryption**: Encrypt sensitive data at rest
10. **Backup Strategy**: Implement regular backups

---

## 🚀 Performance Optimization

- **Code Splitting**: Automatic with Next.js
- **Image Optimization**: Next.js Image component
- **CSS Optimization**: Tailwind's PurgeCSS removes unused styles
- **Bundle Analysis**: Use `next/bundle-analyzer`

---

## 📚 Learning Resources

### WebAuthn & FIDO2 Documentation
- [W3C WebAuthn Specification](https://www.w3.org/TR/webauthn-2/)
- [FIDO Alliance Official Site](https://fidoalliance.org/)
- [MDN WebAuthn Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API)

### SimpleWebAuthn Library
- [SimpleWebAuthn GitHub](https://github.com/MasterKale/SimpleWebAuthn)
- [SimpleWebAuthn Documentation](https://simplewebauthn.dev/)

### Next.js Resources
- [Next.js Official Documentation](https://nextjs.org/docs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

### TypeScript & React
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Make** your changes
4. **Commit** your changes (`git commit -m 'feat: add amazing feature'`)
5. **Push** to the branch (`git push origin feature/amazing-feature`)
6. **Open** a Pull Request

### Contribution Guidelines
- Follow the existing code style
- Write descriptive commit messages
- Add comments for complex logic
- Test your changes before submitting

---

## 🐛 Troubleshooting

### Issue: "WebAuthn not supported"
**Solution**: Use a modern browser (Chrome 67+, Firefox 60+, Safari 13+, Edge 18+)

### Issue: "CORS error"
**Solution**: Ensure backend is running on port 4000 and CORS is configured

### Issue: "Invalid RP ID"
**Solution**: Check `.env.local` configuration matches your domain

### Issue: "Challenge mismatch"
**Solution**: Ensure backend and frontend timestamps are synchronized

---

## 📄 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Abdur Rahman**
- GitHub: [@AbdurRahman-202416](https://github.com/AbdurRahman-202416)
- Project: [authentication-passwordless-fido-auth-portal](https://github.com/AbdurRahman-202416/authentication-passwordless-fido-auth-portal)

---

## 🌟 Acknowledgments

- [SimpleWebAuthn](https://simplewebauthn.dev/) – Simple WebAuthn library
- [Next.js](https://nextjs.org/) – React framework
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS
- [FIDO Alliance](https://fidoalliance.org/) – Authentication standards

---

## 📞 Support & Contact

For issues, questions, or suggestions:
- Open an [Issue](https://github.com/AbdurRahman-202416/authentication-passwordless-fido-auth-portal/issues)
- Start a [Discussion](https://github.com/AbdurRahman-202416/authentication-passwordless-fido-auth-portal/discussions)

---

**Made with ❤️ for secure, passwordless authentication**