const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RULES = {
  name: { min: 2, max: 100, label: 'Name' },
  email: { min: 5, max: 254, label: 'Email' },
  subject: { min: 3, max: 150, label: 'Subject' },
  message: { min: 10, max: 5000, label: 'Message' },
};

/**
 * Mirrors the client-side rules in Contact.jsx so a bypassed form still gets
 * rejected. Returns { valid, errors, value } with trimmed values.
 */
export function validateContact(body = {}) {
  const errors = {};
  const value = {};

  for (const [field, rule] of Object.entries(RULES)) {
    const raw = body[field];

    if (typeof raw !== 'string' || !raw.trim()) {
      errors[field] = `${rule.label} is required`;
      continue;
    }

    const trimmed = raw.trim();

    if (trimmed.length < rule.min) {
      errors[field] = `${rule.label} must be at least ${rule.min} characters`;
    } else if (trimmed.length > rule.max) {
      errors[field] = `${rule.label} must be under ${rule.max} characters`;
    }

    value[field] = trimmed;
  }

  if (!errors.email && !EMAIL_RE.test(value.email)) {
    errors.email = 'Please enter a valid email';
  }

  return { valid: Object.keys(errors).length === 0, errors, value };
}
