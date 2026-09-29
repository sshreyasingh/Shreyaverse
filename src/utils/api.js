// Vite injects this public Web3Forms access key at build time.
const ACCESS_KEY = import.meta.env.WEB3FORMS_ACCESS_KEY;
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
      message: 'The contact form is temporarily unavailable. Please try again later.',
    };
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...payload,
        inquiry_subject: payload.subject.trim(),
        subject: `New Portfolio Contact: ${payload.subject.trim()}`,
        access_key: ACCESS_KEY,
      }),
      signal,
    });

    // Web3Forms returns JSON on both success and validation failure.
    const data = await res.json().catch(() => null);

    if (res.ok && data?.success) {
      return { ok: true, message: 'Thanks for reaching out! Your message was sent.', errors: null };
    }

    return {
      ok: false,
      errors: data?.errors || null,
      message: data?.message || data?.body?.message || 'Your message could not be sent. Please try again.',
    };
  } catch (err) {
    if (err?.name === 'AbortError') throw err;
    return {
      ok: false,
      errors: null,
      message: 'Your message could not be sent. Check your connection and try again.',
    };
  }
}
