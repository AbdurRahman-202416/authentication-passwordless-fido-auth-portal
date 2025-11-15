// Minimal polyfill to expose WebCrypto in Node environments
if (typeof globalThis.crypto === 'undefined' || typeof globalThis.crypto.getRandomValues !== 'function') {
  // Node >= 15 provides a webcrypto implementation
  try {
    const { webcrypto } = await import('crypto');
    globalThis.crypto = webcrypto;
  } catch {
    // fallback: provide minimal getRandomValues using crypto.randomFillSync
    const { randomFillSync } = await import('crypto');
    globalThis.crypto = {
      getRandomValues: (arr) => {
        if (!(arr instanceof Uint8Array)) throw new TypeError('expected Uint8Array');
        randomFillSync(arr);
        return arr;
      }
    };
  }
}

export default globalThis.crypto;
