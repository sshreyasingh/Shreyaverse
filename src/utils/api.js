// Web3Forms access key is injected at build time from .env (VITE_WEB3FORMS_ACCESS_KEY).
// Get one at https://web3forms.com — the key is public and safe to ship in the bundle.
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
const ENDPOINT = 'https://api.web3forms.com/submit';

/**
 * Sends the contact form to Web3Forms, which delivers the complete payload
 * (name, email, subject, message + any extra fields) to the configured inbox.
 * Resolves to { ok, message, errors } — never throws for expected failures,
 * so the caller can render field errors and network errors the same way.
 */
export async function sendContactMessage(payload, { signal } = {}) {
  if (!ACCESS_KEY) {
    return {
      ok: false,
      errors: null,
      message: 'Contact form is not configured yet. Please email me directly.',
    };
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ access_key: ACCESS_KEY, ...payload }),
      signal,
    });

    // Web3Forms returns JSON on both success and validation failure.
    const data = await res.json().catch(() => null);

    if (res.ok && data?.success) {
      return { ok: true, message: data.message || 'Message sent!', errors: null };
    }

    return {
      ok: false,
      errors: data?.errors || null,
      message: data?.message || 'Could not send your message. Please email me directly.',
    };
  } catch (err) {
    if (err?.name === 'AbortError') throw err;
    return {
      ok: false,
      errors: null,
      message: 'Could not send your message. Please email me directly.',
    };
  }
}
