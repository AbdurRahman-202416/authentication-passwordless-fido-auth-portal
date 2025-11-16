import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./lib/Navbar";
import ToastProvider from "./lib/ToastProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Passkey Auth Demo | FIDO WebAuthn",
  description:
    "A demonstration of modern, passwordless authentication using W3C WebAuthn and FIDO standards (Passkeys).",

  keywords: [
    "WebAuthn",
    "FIDO",
    "Passkeys",
    "Passwordless",
    "Authentication",
    "Next.js",
  ],
  authors: [{ name: "Gemini AI" }],
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
