# Contact API

Express + SQLite service that stores submissions from the portfolio's
**Get In Touch** section.

## Running

```bash
npm install

# copy the env template (optional — sensible defaults apply without it)
cp server/.env.example server/.env

npm run dev:all      # frontend (5173) + API (5000) together
# or separately:
npm run dev          # frontend only
npm run server       # API only
```

In development Vite proxies `/api/*` to `http://localhost:5000`, so the
frontend needs no API URL. For production, set `VITE_API_URL` to the deployed
API origin at build time.

## Storage

Submissions land in `server/data/portfolio.db` (SQLite, WAL mode). The file is
created automatically on first run and is **gitignored** — it holds real
messages, so it should never be committed.

Schema (`messages`):

| column | notes |
|---|---|
| `id` | autoincrement primary key |
| `name`, `email`, `subject`, `message` | trimmed, validated |
| `ip`, `user_agent` | captured for abuse triage |
| `read` | `0` / `1`, toggled via the admin API |
| `created_at` | UTC timestamp |

## Endpoints

| Method | Route | Auth | Purpose |
|---|---|---|---|
| `GET` | `/api/health` | — | liveness check |
| `POST` | `/api/contact` | — | store a submission |
| `GET` | `/api/messages` | admin | list submissions (`?limit=&offset=`) |
| `PATCH` | `/api/messages/:id/read` | admin | mark one read |
| `DELETE` | `/api/messages/:id` | admin | delete one |

`POST /api/contact` returns `201` on success, `400` with a per-field `errors`
object on invalid input, and `429` when rate limited. An identical message from
the same address within 5 minutes returns `200` with `duplicate: true` rather
than storing a second copy.

## Reading your messages

The admin routes stay disabled until you set a token:

```bash
# server/.env
ADMIN_TOKEN=some-long-random-string
```

```bash
curl -H "Authorization: Bearer some-long-random-string" \
  http://localhost:5000/api/messages
```

## Protections

- **Validation** mirrored server-side, so a bypassed form still gets rejected.
- **Rate limiting**: 5 submissions per IP per 15 minutes.
- **CORS allowlist** via `ALLOWED_ORIGINS`; add your production domain there.
- **Body cap** of 32 kB.
- Admin routes are off by default and require a bearer token once enabled.

## Deploying

The API needs a host with a persistent disk (Render, Railway, Fly, a VPS) —
SQLite writes to a file, so it will not survive on read-only or ephemeral
serverless filesystems. Set `ALLOWED_ORIGINS` to your site's domain and
`ADMIN_TOKEN` to a strong secret, then point the frontend at it with
`VITE_API_URL`.
