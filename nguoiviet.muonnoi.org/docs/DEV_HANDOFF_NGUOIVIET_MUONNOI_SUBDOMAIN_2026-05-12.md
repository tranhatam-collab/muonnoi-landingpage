# DEV HANDOFF · Người Việt Muôn Nơi subdomain
## Mã: `DEV_HANDOFF_NGUOIVIET_MUONNOI_SUBDOMAIN_2026-05-12`

**Trạng thái deploy**: ✅ DEPLOYED to Cloudflare Pages
**Preview URL**: https://nguoiviet-muonnoi-org.pages.dev/
**Custom domain**: `nguoiviet.muonnoi.org` (status: PENDING_DNS)
**Date**: 2026-05-12

---

## 1. DEPLOY EVIDENCE

### Cloudflare Pages project
- **Account**: Tranhatam@gmail.com (`f3f9e76222dcb488d5e303e29e8ba192`)
- **Project name**: `nguoiviet-muonnoi-org`
- **Project URL**: https://nguoiviet-muonnoi-org.pages.dev/
- **First deploy**: 2026-05-12 (deployment id `7fa60187`)
- **Production branch**: `main`
- **Files deployed**: 17 (12 HTML + 2 assets + 3 config)

### Route audit (preview URL, 2026-05-12)
| Route | Status |
|-------|--------|
| `/` | ✅ 200 |
| `/manifesto/` | ✅ 200 |
| `/journeys/` | ✅ 200 |
| `/journeys/dalat/` | ✅ 200 |
| `/start/` | ✅ 200 |
| `/host/` | ✅ 200 |
| `/stories/` | ✅ 200 |
| `/resources/` | ✅ 200 |
| `/partners/` | ✅ 200 |
| `/members/` | ✅ 200 |
| `/contact/` | ✅ 200 |
| `/404.html` | ✅ 308 (intentional — Pages routes 404s here) |
| `/sitemap.xml` | ✅ 200 |
| `/robots.txt` | ✅ 200 |
| `/manifest.json` | ✅ 200 |
| `/assets/ui.css` | ✅ 200 |
| `/assets/app.js` | ✅ 200 |

**17/17 routes serving correctly.**

---

## 2. DNS — MANUAL STEP REQUIRED

The Cloudflare Pages custom domain `nguoiviet.muonnoi.org` has been **attached** to project `nguoiviet-muonnoi-org` but is currently **pending** because the existing DNS record points to Wix.

### Current DNS (broken)
```
nguoiviet.muonnoi.org   CNAME   pointing.wixdns.net.
```

### Required DNS (target)
```
nguoiviet.muonnoi.org   CNAME   nguoiviet-muonnoi-org.pages.dev.   (Proxied — orange cloud ON)
```

### Manual update steps (Cloudflare Dashboard)

1. Login to https://dash.cloudflare.com/
2. Select **Tranhatam@gmail.com's Account** → **muonnoi.org** zone
3. Open **DNS · Records**
4. Find the record `nguoiviet` (Type CNAME → `pointing.wixdns.net`)
5. Click **Edit**
6. Change Target to: `nguoiviet-muonnoi-org.pages.dev`
7. Ensure **Proxy status: Proxied** (orange cloud ON)
8. Save

DNS propagation: 1–5 minutes.
Pages SSL provisioning: 5–15 minutes after DNS is correct.

### Alternative: via API (requires API Token with `Zone.DNS.Edit` scope)

```bash
# Create API token at: https://dash.cloudflare.com/profile/api-tokens
# Permissions needed: Zone → DNS → Edit · for muonnoi.org zone
export CF_API_TOKEN="<your-token>"
ZONE=e4fd0ac26e66d142107aa87b607fcce2

# 1) Find existing record id
curl -s "https://api.cloudflare.com/client/v4/zones/$ZONE/dns_records?name=nguoiviet.muonnoi.org" \
  -H "Authorization: Bearer $CF_API_TOKEN" | jq '.result[0].id'

# 2) Update to point to Pages
RECORD_ID="<id-from-above>"
curl -s -X PATCH "https://api.cloudflare.com/client/v4/zones/$ZONE/dns_records/$RECORD_ID" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"type":"CNAME","name":"nguoiviet","content":"nguoiviet-muonnoi-org.pages.dev","proxied":true}'
```

---

## 3. POST-DNS VERIFICATION

After DNS updated, verify via:

```bash
dig +short CNAME nguoiviet.muonnoi.org
# Expected: nguoiviet-muonnoi-org.pages.dev. or similar Cloudflare proxied response

curl -sI https://nguoiviet.muonnoi.org/ | head -5
# Expected: HTTP/2 200, server: cloudflare

curl -L --max-time 15 -sS https://nguoiviet.muonnoi.org/ | grep -oE "<title>[^<]+</title>"
# Expected: <title>Người Việt Muôn Nơi · Đi Xa Để Quay Trở Về</title>
```

Then re-check custom domain status via Pages API:

```bash
TOKEN=$(grep oauth_token ~/.wrangler/config/default.toml | cut -d'"' -f2)
curl -s "https://api.cloudflare.com/client/v4/accounts/f3f9e76222dcb488d5e303e29e8ba192/pages/projects/nguoiviet-muonnoi-org/domains/nguoiviet.muonnoi.org" \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool
# Expected: status: "active"
```

---

## 4. REPO STRUCTURE

```
nguoiviet.muonnoi.org/
├── docs/
│   ├── NGUOIVIET_MUONNOI_MASTER_PLAN_2026-05-12.md
│   └── DEV_HANDOFF_NGUOIVIET_MUONNOI_SUBDOMAIN_2026-05-12.md (this file)
└── public/                                   ← Cloudflare Pages output
    ├── index.html                            (37 KB · 10 sections)
    ├── 404.html
    ├── manifesto/index.html
    ├── journeys/index.html
    ├── journeys/dalat/index.html
    ├── start/index.html
    ├── host/index.html
    ├── stories/index.html
    ├── resources/index.html
    ├── partners/index.html
    ├── members/index.html
    ├── contact/index.html
    ├── assets/
    │   ├── ui.css                            ← Brand v2.0 Voice & Place
    │   └── app.js                            ← Theme + lang toggle + drawer
    ├── _headers                              ← CSP + security headers
    ├── _redirects                            ← Wix legacy URL → new
    ├── robots.txt
    ├── sitemap.xml
    └── manifest.json
```

---

## 5. RE-DEPLOY COMMAND

When updating content:

```bash
cd /Users/tranhatam/Documents/Devnewproject/muonnoi.org/nguoiviet.muonnoi.org
CLOUDFLARE_ACCOUNT_ID=f3f9e76222dcb488d5e303e29e8ba192 \
  wrangler pages deploy public \
  --project-name nguoiviet-muonnoi-org \
  --branch main \
  --commit-dirty=true
```

---

## 6. GIT INTEGRATION (FUTURE)

When ready, push the `nguoiviet.muonnoi.org/` directory to its own GitHub repo at
`github.com/tranhatam-collab/nguoiviet.muonnoi.org` and connect it via Cloudflare Pages
Git integration. That enables auto-deploy on push.

For now, deploys are manual via `wrangler pages deploy` from local.

---

## 7. NEXT STEPS (POST-DNS)

| # | Task | Owner | Done? |
|---|------|-------|-------|
| 1 | Update DNS CNAME (manual step above) | Founder / DNS admin | ⏳ |
| 2 | Verify live at https://nguoiviet.muonnoi.org/ | Founder | ⏳ |
| 3 | Add block on `www.muonnoi.org` homepage linking to subdomain | Web team | ⏳ |
| 4 | Update `MUONNOI_SUBDOMAIN_DNS_CUSTOM_DOMAIN_MATRIX` | Brand Guardian | ⏳ |
| 5 | Submit sitemap to Google Search Console | SEO | ⏳ |
| 6 | After 7 days stable: redirect `www.nguoivietmuonnoi.com` → new subdomain | Phase 5 | ⏳ |
| 7 | Open Đà Lạt Pilot intake form | Operations | ⏳ |
