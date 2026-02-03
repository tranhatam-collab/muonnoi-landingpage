# Muôn Nói / Muon Noi (muonnoi.org)

## Run on Cloudflare Pages
1) Create D1 database
- Cloudflare Dashboard → D1 → Create `muonnoi_db`
- Run schema: copy `scripts/schema.sql` into D1 console and execute.

2) Create R2 bucket
- R2 → Create bucket `muonnoi_uploads`

3) Create Pages project
- Connect GitHub repo
- Build command: (none)
- Output directory: `/`

4) Set bindings
- Pages → Settings → Functions → D1 binding `DB` to your D1
- Pages → Settings → Functions → R2 binding `BUCKET` to your R2

5) Set Secrets (Pages → Settings → Environment variables)
Secrets:
- AUTH_SECRET = random long string
- RESEND_API_KEY = your Resend key
- MAIL_FROM = "Muon Noi <no-reply@yourdomain>"
- ADMIN_EMAILS = "you@domain.com,another@domain.com"

Vars:
- APP_ORIGIN = https://muonnoi.org
- APP_NAME_VI = Muôn Nói
- APP_NAME_EN = Muon Noi
- SESSION_COOKIE = mn_session

Done.
