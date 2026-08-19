import emailjs from '@emailjs/browser';

// EmailJS config is injected at build time from .env (VITE_EMAILJS_*).
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const TEMPLATE_FIELDS = ['from_name', 'from_email', 'subject', 'message'];

/**
 * Sends the contact form via EmailJS directly from the browser.
 * Resolves to { ok, message, errors } — never throws for expected failures,
 * so the caller can render field errors and network errors the same way.
 */
export async function sendContactMessage(payload, { signal } = {}) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    return {
      ok: false,
      errors: null,
      message: 'Contact form is not configured yet. Please email me directly.',
    };
  }

  try {
    const templateParams = TEMPLATE_FIELDS.reduce((params, key) => {
      params[key] = payload[key] || '';
      return params;
    }, {});

    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
      publicKey: PUBLIC_KEY,
      signal,
    });

    return { ok: true, message: 'Message sent!', errors: null };
  } catch (err) {
    if (err?.name === 'AbortError') throw err;
    return {
      ok: false,
      errors: null,
      message: 'Could not send your message. Please email me directly.',
    };
  }
}
