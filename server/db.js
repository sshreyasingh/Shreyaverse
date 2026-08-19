import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = process.env.DB_PATH || join(__dirname, 'data', 'portfolio.db');

mkdirSync(dirname(DB_PATH), { recursive: true });

const db = new Database(DB_PATH);

// WAL keeps reads fast while a write is in flight — worth it even at this scale.
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT    NOT NULL,
    email      TEXT    NOT NULL,
    subject    TEXT    NOT NULL,
    message    TEXT    NOT NULL,
    ip         TEXT,
    user_agent TEXT,
    read       INTEGER NOT NULL DEFAULT 0,
    created_at TEXT    NOT NULL DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages (created_at DESC);
`);

const statements = {
  insert: db.prepare(`
    INSERT INTO messages (name, email, subject, message, ip, user_agent)
    VALUES (@name, @email, @subject, @message, @ip, @user_agent)
  `),
  listAll: db.prepare(`
    SELECT id, name, email, subject, message, read, created_at
    FROM messages ORDER BY created_at DESC LIMIT ? OFFSET ?
  `),
  countAll: db.prepare('SELECT COUNT(*) AS total FROM messages'),
  countUnread: db.prepare('SELECT COUNT(*) AS total FROM messages WHERE read = 0'),
  markRead: db.prepare('UPDATE messages SET read = 1 WHERE id = ?'),
  remove: db.prepare('DELETE FROM messages WHERE id = ?'),
  // Cheap dedupe: same email + message within the last 5 minutes is a double-submit.
  recentDuplicate: db.prepare(`
    SELECT id FROM messages
    WHERE email = ? AND message = ? AND created_at > datetime('now', '-5 minutes')
    LIMIT 1
  `),
};

export function saveMessage(payload) {
  const info = statements.insert.run(payload);
  return info.lastInsertRowid;
}

export function isDuplicate(email, message) {
  return Boolean(statements.recentDuplicate.get(email, message));
}

export function listMessages({ limit = 50, offset = 0 } = {}) {
  return {
    messages: statements.listAll.all(limit, offset),
    total: statements.countAll.get().total,
    unread: statements.countUnread.get().total,
  };
}

export function markMessageRead(id) {
  return statements.markRead.run(id).changes > 0;
}

export function deleteMessage(id) {
  return statements.remove.run(id).changes > 0;
}

export { DB_PATH };
export default db;
