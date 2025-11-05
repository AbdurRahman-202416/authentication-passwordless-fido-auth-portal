function base64urlToBuffer(b64url: string) {
  const base64 = b64url.replace(/-/g, "+").replace(/_/g, "/") +
    "===".slice((b64url.length + 3) % 4);

  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
}
export { base64urlToBuffer };