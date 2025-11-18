import Link from "next/link";
import React from "react";
import ImageSlider from "./ImageSlider";
import {
  Shield,
  Zap,
  Lock,
  Fingerprint,
  Smartphone,
  Key,
  Check,
  X,
  ArrowRight,
  Globe,
  Users,
  Clock,
  ChevronRight,
} from "lucide-react";

export default function HeroSection() {
  return (
    <div className="bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen flex items-center py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            {/* Text Content */}
            <div className=" w-full text-center lg:text-left space-y-8">
              <div className="space-y-4">
                <div className="inline-block">
                  <span className="bg-indigo-500/20 text-indigo-300 px-4 py-2 rounded-full text-sm font-semibold border border-indigo-500/30 backdrop-blur-sm">
                    FIDO2 WebAuthn Technology
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-extrabold leading-tight">
                  Hello Passkeys.
                </h1>

                {/* Image Slider */}
                <div className=" w-full">
                  <ImageSlider />
                </div>

                {/* <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Experience passwordless authentication with military-grade security. 
                  Login in seconds using biometrics or security keys with FIDO2 standards.
                </p> */}
              </div>

              {/* Feature Tags */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <div className="flex items-center gap-2 bg-indigo-500/20 text-indigo-300 px-4 py-2.5 rounded-xl text-sm font-semibold border border-indigo-500/30 backdrop-blur-sm">
                  <Shield className="w-4 h-4" />
                  <span>FIDO2 Certified</span>
                </div>
                <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-4 py-2.5 rounded-xl text-sm font-semibold border border-emerald-500/30 backdrop-blur-sm">
                  <Zap className="w-4 h-4" />
                  <span>2FA Ready</span>
                </div>
                <div className="flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-2.5 rounded-xl text-sm font-semibold border border-purple-500/30 backdrop-blur-sm">
                  <Lock className="w-4 h-4" />
                  <span>Phishing-Proof</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/register"
                  className="group relative flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-indigo-500/50 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="relative z-10">Get Started Free</span>
                </Link>
                <Link
                  href="/login"
                  className="flex items-center justify-center bg-gray-800/80 hover:bg-gray-700/80 text-white font-bold py-4 px-8 rounded-2xl border-2 border-gray-600 hover:border-gray-500 backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 lg:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="group bg-gradient-to-br from-gray-800/80 to-gray-800/40 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-center w-12 h-12 mb-4 mx-auto rounded-xl bg-indigo-500/20 text-indigo-400">
                <Shield className="w-6 h-6" />
              </div>
              <div className="text-4xl lg:text-5xl font-bold text-indigo-400 mb-2 text-center">
                100%
              </div>
              <div className="text-sm text-gray-400 text-center font-medium">
                Passwordless Security
              </div>
            </div>
            <div className="group bg-gradient-to-br from-gray-800/80 to-gray-800/40 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-center w-12 h-12 mb-4 mx-auto rounded-xl bg-emerald-500/20 text-emerald-400">
                <Zap className="w-6 h-6" />
              </div>
              <div className="text-4xl lg:text-5xl font-bold text-emerald-400 mb-2 text-center">
                &lt;2s
              </div>
              <div className="text-sm text-gray-400 text-center font-medium">
                Average Login Time
              </div>
            </div>
            <div className="group bg-gradient-to-br from-gray-800/80 to-gray-800/40 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-center w-12 h-12 mb-4 mx-auto rounded-xl bg-purple-500/20 text-purple-400">
                <Lock className="w-6 h-6" />
              </div>
              <div className="text-4xl lg:text-5xl font-bold text-purple-400 mb-2 text-center">
                0
              </div>
              <div className="text-sm text-gray-400 text-center font-medium">
                Phishing Attacks Possible
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What are Passkeys Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              What are{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Passkeys?
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Passkeys are a modern, secure authentication method that replaces
              passwords with cryptographic key pairs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-gray-800/80 p-6 rounded-2xl border border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Key className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      FIDO2 & WebAuthn
                    </h3>
                    <p className="text-gray-400">
                      Built on open standards by the FIDO Alliance and W3C,
                      ensuring compatibility across all major platforms and
                      browsers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/80 p-6 rounded-2xl border border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Fingerprint className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Biometric Authentication
                    </h3>
                    <p className="text-gray-400">
                      Use your fingerprint, face recognition, or device PIN for
                      instant, secure access without typing passwords.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/80 p-6 rounded-2xl border border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Cryptographic Security
                    </h3>
                    <p className="text-gray-400">
                      Private keys never leave your device. Public key
                      cryptography ensures maximum security against breaches.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-8 rounded-3xl border border-indigo-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">
                How It Works
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">
                      Registration
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Create a passkey using your device's biometric sensor or
                      security key
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">
                      Cryptographic Pair
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Your device generates a unique key pair - private key
                      stays on your device, public key stored securely
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">
                      Authentication
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Sign in with a simple biometric scan - instant, secure, no
                      passwords to remember
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Password vs Passkeys Comparison */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Why Passkeys Beat{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                Passwords
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              See the difference for yourself
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Traditional Passwords */}
            <div className="bg-red-500/10 border-2 border-red-500/30 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                  <X className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Traditional Passwords
                </h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-400">
                  <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>Vulnerable to phishing attacks</span>
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>Can be stolen in data breaches</span>
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>Hard to remember and manage</span>
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>Weak passwords easily cracked</span>
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>Susceptible to keyloggers</span>
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>Password reset flows are cumbersome</span>
                </li>
              </ul>
            </div>

            {/* Passkeys */}
            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-2 border-indigo-500/30 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                  <Check className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Passkeys (FIDO2)
                </h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Phishing-proof</strong> -
                    bound to your domain
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Breach-resistant</strong> -
                    no secrets to steal
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Nothing to remember</strong>{" "}
                    - just use biometrics
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">
                      Cryptographically secure
                    </strong>{" "}
                    - uncrackable
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Hardware-protected</strong> -
                    keys never leave device
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">
                      Instant authentication
                    </strong>{" "}
                    - seamless experience
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2FA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Two-Factor Authentication{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                (2FA)
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Add an extra layer of security with WebAuthn-based 2FA
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/80 p-8 rounded-2xl border border-gray-700 hover:border-emerald-500/50 transition-all">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Smartphone className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Device-Based 2FA
              </h3>
              <p className="text-gray-400 mb-4">
                Use your phone, tablet, or security key as a second factor. No
                SMS codes or authenticator apps needed.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Platform authenticators
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Hardware security keys
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Biometric verification
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/80 p-8 rounded-2xl border border-gray-700 hover:border-emerald-500/50 transition-all">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Stronger Than SMS
              </h3>
              <p className="text-gray-400 mb-4">
                WebAuthn 2FA is immune to SIM swapping, interception, and
                phishing - unlike SMS-based 2FA.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  No SIM swap vulnerability
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Cannot be intercepted
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Phishing-resistant
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/80 p-8 rounded-2xl border border-gray-700 hover:border-emerald-500/50 transition-all">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Instant Verification
              </h3>
              <p className="text-gray-400 mb-4">
                Authenticate in under 2 seconds. No waiting for SMS codes or
                typing OTP numbers.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  One-tap authentication
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  No code entry required
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Seamless user experience
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Platforms */}
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Universal{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 to-purple-400">
                Compatibility
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Works across all major platforms and devices
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700 text-center hover:border-indigo-500/50 transition-all">
              <Globe className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">
                All Browsers
              </h3>
              <p className="text-sm text-gray-400">
                Chrome, Safari, Firefox, Edge
              </p>
            </div>
            <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700 text-center hover:border-indigo-500/50 transition-all">
              <Smartphone className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">
                Mobile Devices
              </h3>
              <p className="text-sm text-gray-400">iOS, Android, tablets</p>
            </div>
            <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700 text-center hover:border-indigo-500/50 transition-all">
              <Key className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">
                Security Keys
              </h3>
              <p className="text-sm text-gray-400">YubiKey, Titan, Solo</p>
            </div>
            <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700 text-center hover:border-indigo-500/50 transition-all">
              <Fingerprint className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Biometrics</h3>
              <p className="text-sm text-gray-400">
                Touch ID, Face ID, Windows Hello
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-900 to-purple-900">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Go Passwordless?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already ditched passwords for a
            faster, safer login experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center bg-white text-indigo-600 font-bold py-4 px-8 rounded-2xl shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Create Your Account
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-2xl hover:bg-white/10 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
