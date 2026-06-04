# Muôn Nơi — Security Baseline (Locked)

This baseline enforces:
- Strict CSP (default-src 'none')
- No inline scripts/styles.
- HttpOnly Secure SameSite cookies for sessions.
- CORS allowlist to APP_ORIGIN only.
- D1-backed rate limiting.
- Optional Cloudflare Turnstile integration (secret supported).
- One-time owner bootstrap guarded by OWNER_BOOTSTRAP_TOKEN.
- Admin actions will be audited (admin_audit table).

Operational:
- Use Cloudflare Access (Zero Trust) for admin routes in later steps.
- Keep secrets in Wrangler secrets, never in Git.
- Prefer staging subdomains for preview before production.
