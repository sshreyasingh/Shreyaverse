import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { saveMessage, isDuplicate, listMessages, markMessageRead, deleteMessage, DB_PATH } from './db.js';
import { validateContact } from './validate.js';

const app = express();
const PORT = process.env.PORT || 5000;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || '';

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ||
  'http://localhost:5173,http://localhost:4173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

// Behind a proxy (Render/Railway/nginx) the real client IP is in X-Forwarded-For.
// Trust exactly one hop so express-rate-limit can't be fooled by a spoofed header.
app.set('trust proxy', 1);

app.use(cors({
  origin(origin, callback) {
    // Same-origin requests and curl send no Origin header.
    if (!origin || ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
}));

app.use(express.json({ limit: '32kb' }));

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many messages sent from this address. Please try again in 15 minutes.',
  },
});

function requireAdmin(req, res, next) {
  if (!ADMIN_TOKEN) {
    return res.status(503).json({
      success: false,
      error: 'Admin API disabled. Set ADMIN_TOKEN in server/.env to enable it.',
    });
  }

  const header = req.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';

  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  next();
}

app.get('/api/health', (_req, res) => {
  res.json({ success: true, status: 'ok', uptime: Math.round(process.uptime()) });
});

app.post('/api/contact', contactLimiter, (req, res) => {
  const { valid, errors, value } = validateContact(req.body);

  if (!valid) {
    return res.status(400).json({ success: false, errors });
  }

  // Treat an identical resend as success so the user isn't told it failed.
  if (isDuplicate(value.email, value.message)) {
    return res.status(200).json({
      success: true,
      duplicate: true,
      message: 'This message was already received. I will get back to you shortly!',
    });
  }

  try {
    const id = saveMessage({
      ...value,
      ip: req.ip || null,
      user_agent: req.get('user-agent')?.slice(0, 255) || null,
    });

    res.status(201).json({
      success: true,
      id,
      message: 'Message received. Thanks for reaching out!',
    });
  } catch (err) {
    console.error('[contact] failed to save message:', err);
    res.status(500).json({
      success: false,
      error: 'Could not save your message. Please email me directly.',
    });
  }
});

app.get('/api/messages', requireAdmin, (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 50, 200);
  const offset = Math.max(Number(req.query.offset) || 0, 0);
  res.json({ success: true, ...listMessages({ limit, offset }) });
});

app.patch('/api/messages/:id/read', requireAdmin, (req, res) => {
  const ok = markMessageRead(Number(req.params.id));
  if (!ok) return res.status(404).json({ success: false, error: 'Message not found' });
  res.json({ success: true });
});

app.delete('/api/messages/:id', requireAdmin, (req, res) => {
  const ok = deleteMessage(Number(req.params.id));
  if (!ok) return res.status(404).json({ success: false, error: 'Message not found' });
  res.json({ success: true });
});

app.use((req, res) => {
  res.status(404).json({ success: false, error: `No route for ${req.method} ${req.path}` });
});

// CORS rejections and malformed JSON both land here.
app.use((err, _req, res, _next) => {
  const status = err.message === 'Not allowed by CORS' ? 403 : 400;
  res.status(status).json({ success: false, error: err.message || 'Request failed' });
});

app.listen(PORT, () => {
  console.log(`\n  Contact API listening on http://localhost:${PORT}`);
  console.log(`  Database: ${DB_PATH}`);
  console.log(`  Admin API: ${ADMIN_TOKEN ? 'enabled' : 'disabled (set ADMIN_TOKEN)'}\n`);
});
