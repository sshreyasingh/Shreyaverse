// In dev, Vite proxies /api to the Express server (see vite.config.js).
// In production, set VITE_API_URL to the deployed API origin.
const API_BASE = import.meta.env.VITE_API_URL || '';

/**
 * POSTs the contact form to the backend.
 * Resolves to { ok, message, errors } — never throws for expected failures,
 * so the caller can render field errors and network errors the same way.
 */
export async function sendContactMessage(payload, { signal } = {}) {
  try {
    const response = await fetch(`${API_BASE}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal,
    });

    let data = {};
    try {
      data = await response.json();
    } catch {
      // Non-JSON response (proxy error page, gateway timeout, …)
    }

    if (!response.ok) {
      return {
        ok: false,
        errors: data.errors || null,
        message:
          data.error ||
          (response.status === 429
            ? 'Too many messages sent. Please try again later.'
            : 'Something went wrong. Please email me directly.'),
      };
    }

    return { ok: true, message: data.message || 'Message sent!', errors: null };
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    return {
      ok: false,
      errors: null,
      message: 'Could not reach the server. Please check your connection or email me directly.',
    };
  }
}
