# Personal OpenAI-compatible coach backend

Prepared for a **single-user** deployment. No server or provider account is provisioned. The static GitHub Pages app works without it. Node 22+; no dependencies.

## Configure and run

Copy `.env.example` to `server/.env` locally, keep it private and set values through your hosting service's secret manager for deployment:

- `OPENAI_API_KEY`: provider secret, server only.
- `OPENAI_BASE_URL`: compatible API base ending in `/v1` (default `https://api.openai.com/v1`). Requests append `/chat/completions`.
- `OPENAI_MODEL`: a model your provider supports (example default `gpt-4.1-mini`). It must accept JSON object output, `max_tokens`, `temperature` and `store:false`; adjust the server adapter if your provider differs.
- `COACH_ACCESS_TOKEN`: a separate random private token, minimum 24 characters. Generate a long random value using your secret manager or `openssl rand -hex 32`. Never reuse the provider key.
- `COACH_ALLOWED_ORIGINS`: exact comma-separated origins. For this Pages app: `https://jusumusu.github.io` (no path/trailing slash). Stable and preview share this origin. Local development needs the exact printed localhost origin.
- `PORT`: loopback listening port, default 8787.

```sh
node --env-file=server/.env server/coach-server.mjs
```

For a personal HTTPS reverse proxy, forward only `POST /coach` and `OPTIONS /coach` to `127.0.0.1:8787`. Keep the Node process supervised and configure the proxy's TLS certificate normally. The current executable binds loopback deliberately; container/PaaS platforms that require another interface need an explicit deployment adapter. Never expose an unauthenticated provider proxy. Do not commit `.env` or configure provider secrets through Pages build variables.

In app Coach → **Style, privacy & backend**, enter `https://your-host.example/coach` and the separate backend access token, opt in to relevant training facts, then choose Cloud AI. Body and readiness each have separate optional consent. Reloading clears the browser token. Local analysis stays usable without network. The local static server keeps a restrictive CSP; to test a separate backend locally, start it with `COACH_CONNECT_ORIGIN=http://127.0.0.1:8787 npm run dev` (or the exact HTTPS backend origin), and add the printed app origin to the backend allowlist.

## Boundaries and operations

Exact origin allowlist, timing-safe bearer comparison, 10 requests/minute per allowed origin, 26KB request cap, 25-second provider timeout (30-second client timeout), 1,800 output-token budget, sanitized bounded context and validated fact references/action whitelist. It sends no cookies and keeps no workout database. Responses are `no-store`; the server does not log personal bodies. Configure reverse-proxy/host logs accordingly.

This personal shared-token setup is not multi-tenant authentication. For a public service, add real accounts, per-user quotas, durable rate limiting, secret rotation, monitoring, consent/retention policy and account deletion before launch. CORS is a browser control, not authentication. Set provider budget alerts and hard spend limits in your provider account before enabling paid requests. Some compatible services do not accept all request fields; a failed provider response is reported rather than treated as a successful local answer.

Rotate the access token at the host to revoke clients. Rotate the provider key in the provider account if needed. Local conversation/memory deletion does not delete provider-held data; consult that provider's controls. The app requests `store:false` but cannot guarantee a provider's retention behavior.

```sh
npm run test:backend
```

Tests use an in-process stub provider over actual localhost HTTP. No provider key is used and no real-model evaluation is claimed. Missing credentials return an unavailable response and local coaching remains functional. See [coaching evaluation](../docs/upgrade/COACH.md) for the live evaluation work still required.
