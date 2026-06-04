# MUONNOI DNS AND SUBDOMAIN EXECUTION STATUS · 2026-05-11

## Scope
This status file is the source of truth for subdomain routing and DNS execution priorities across Muonnoi.

## Verified repo-side mappings
1. `muonnoi.org` public shell routes are defined in:
`apps/web/public/_redirects`, `apps/web/public/_headers`
2. `api.muonnoi.org` Worker route is defined in:
`ai.muonnoi.org/workers/api/wrangler.toml` with `custom_domain = true`
3. `ai.muonnoi.org` Pages project config exists in:
`ai.muonnoi.org/wrangler.json`
4. `app.muonnoi.org` route aliases and canonical host redirect are defined in:
`app.muonnoi.org/apps/web/_redirects`
5. `docs.muonnoi.org` route aliases are defined in:
`docs.muonnoi.org/public/_redirects`

## Operational blockers
1. Cloudflare Pages project list was checked from this workspace on `2026-05-12 00:03 +07`.
2. Confirmed Pages projects and custom domains:
`muonnoi` -> `muonnoi.pages.dev`, `muonnoi.org`, `www.muonnoi.org`;
`app-muonnoi-org` -> `app-muonnoi-org.pages.dev`, `app.muonnoi.org`, `www.app.muonnoi.org`;
`docs-muonnoi-org` -> `docs-muonnoi-org.pages.dev`, `docs.muonnoi.org`, `www.docs.muonnoi.org`.
3. `lamviec.muonnoi.org` has content and planning references, but no fully locked Pages custom-domain mapping was visible in the Pages project list from this check.
4. `api.muonnoi.org` is a Worker/custom-domain lane, not a Pages project lane; verify separately before API deploy.
5. Payment and email production evidence remain the first operational gate before public expansion.

## Team execution split
1. Platform/DevOps:
Lock Cloudflare DNS records and custom-domain status for `muonnoi.org`, `ai.muonnoi.org`, `app.muonnoi.org`, `docs.muonnoi.org`, `api.muonnoi.org`, `lamviec.muonnoi.org`.
2. AI/API:
Keep `api.muonnoi.org` Worker route and CORS/CSP compatibility stable with public shells.
3. Web/Public shell:
Do not link public CTAs to subdomains without live verification; fallback to `/ecosystem/` or `/roadmap/`.
4. QA/Release:
Re-run live URL matrix and capture evidence before calling release-ready.

## URL evidence checklist (must attach per run)
1. HTTPS status for each core host:
`muonnoi.org`, `ai.muonnoi.org`, `app.muonnoi.org`, `docs.muonnoi.org`, `api.muonnoi.org`, `lamviec.muonnoi.org`
2. CSP header check for hosts that call API.
3. Canonical URL check for public homepage + core public routes.
4. Last deploy id and timestamp per app surface.

## Current true state
`DNS_EXECUTION_IN_PROGRESS`
`PUBLIC_SHELL_LINK_HARDENING_APPLIED`
`CLOUDFLARE_PAGES_PROJECT_LIST_CHECKED`
`DNS_CUSTOM_DOMAIN_MATRIX_LOCKED_2026_05_12`
`PAYMENT_EMAIL_GATE_STILL_FIRST`
`RELEASE_READY_NOT_CLAIMED`

## Locked matrix file
Current evidence matrix:
`docs/launch/MUONNOI_SUBDOMAIN_DNS_CUSTOM_DOMAIN_MATRIX_2026-05-12.md`

Use that file as the latest source of truth for:
- Cloudflare Pages custom-domain evidence.
- DNS evidence.
- HTTPS route evidence.
- which planned subdomains are allowed or blocked as primary public CTAs.

## Production route matrix checkpoint (2026-05-12 +07)
DONE:
- Production host `https://www.muonnoi.org` returned `200` for:
`/`, `/ecosystem/`, `/roadmap/`, `/plan/`, `/security/`, `/investment/`,
`/about/`, `/manifesto/`, `/press/`, `/newsletter/`,
`/quests/`, `/quests/dulich/`, `/quests/hoctap/`, `/quests/family/`, `/quests/suckhoe/`, `/quests/lamviec/`, `/quests/sangtao/`, `/quests/congdong/`,
`/guide/`, `/host/`, `/partners/`, `/feed/`, `/verify/`, `/commit/`, `/complaints/`, `/admin/`, `/status/`.

NEED:
- Subdomain custom-domain evidence for planned domains that still route via ecosystem roadmap lane.
- Worker-side payment/email production verification after payment/email gate closeout.
- Custom-domain source ownership for `ai.muonnoi.org` and `lamviec.muonnoi.org`.

NEXT:
1. Platform resolves custom-domain source ownership for `ai.muonnoi.org` and `lamviec.muonnoi.org`.
2. API + Platform close payment/email production gate.

---

## Update 2026-05-19 — DNS verified for cuocsong + nguoiviet

| Domain | DNS | HTTP | Status |
|--------|:---:|:----:|--------|
| `cuocsong.muonnoi.org` | ✅ Cloudflare `172.67.214.1` | ✅ `200` | `LIVE_LINK_ALLOWED` |
| `nguoiviet.muonnoi.org` | ✅ Cloudflare `172.67.214.1` | ✅ `200` | `LIVE_LINK_ALLOWED` |
| `www.nguoiviet.muonnoi.org` | ✅ Cloudflare `104.21.93.187` | ❌ `522` origin timeout | `DNS_CONFIGURED_ORIGIN_PENDING` |

- DNS matrix file updated at `docs/launch/MUONNOI_SUBDOMAIN_DNS_CUSTOM_DOMAIN_MATRIX_2026-05-12.md`.
- cuocsong and nguoiviet removed from "not allowed" list in public linking rule.
- www.nguoiviet needs Cloudflare Pages project assignment to resolve origin 522.
