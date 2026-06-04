# DEV HANDOFF PUBLIC PAGES MUONNOI · 2026

## Status
`READY_FOR_IMPLEMENTATION_AFTER_CLOUDFLARE_CHECK`

## Rule before any page work
Before creating, editing or deploying a public page:
1. Run Cloudflare project/domain check.
2. Confirm the source folder already in use.
3. Search the repo for an existing near-complete page.
4. Update the existing page if it exists.
5. Create a new page only when no valid page exists.

## Root page matrix
Required before public launch:
- `/` - exists
- `/ecosystem/` - exists
- `/roadmap/` - exists
- `/security/` - exists
- `/guide/` - exists
- `/quests/` - exists
- `/quests/dulich/` - exists
- `/quests/hoctap/` - exists
- `/quests/family/` - exists
- `/quests/suckhoe/` - exists
- `/quests/lamviec/` - exists
- `/quests/sangtao/` - exists
- `/quests/congdong/` - exists
- `/host/` - exists
- `/partners/` - exists
- `/status/` - exists
- `/manifesto/` - missing public HTML
- `/about/` - missing public HTML
- `/press/` - missing public HTML
- `/newsletter/` - missing public HTML

## Implementation order after payment/email gate
1. Create or complete `/manifesto/` and `/about/`.
2. Create or complete `/press/` and `/newsletter/`.
3. Update sitemap and redirects.
4. Add footer links only after routes exist.
5. Run local route matrix.
6. Deploy only after Cloudflare project/domain check.

## Internal link rules
- Homepage must link to `/ecosystem/`, `/roadmap/`, `/quests/`, `/guide/`, `/security/`, `/plan/`, `/investment/`.
- Quest hub must link to all seven quest pages.
- Each quest page must link back to `/quests/`, `/roadmap/`, `/ecosystem/`, `/plan/`.
- Subdomain cards must point to internal status pages until live evidence exists.
- External links to `ai.muonnoi.org`, `docs.muonnoi.org`, `app.muonnoi.org` are allowed when live checks pass.

## Bilingual public UI rule
- Vietnamese pages must use full Vietnamese copy with diacritics.
- Language controls must show `Tiếng Việt` and `English`.
- Do not publish shortened labels such as `VI`, `EN` or `VI/EN` in visible UI.
- Package diagrams may use shorthand for planning only; final public text must not.

## Claim cleanup rules
- Use target language for Local Host and mission counts unless verified.
- Use partner-seeking language unless formal permission exists.
- Use future tense for hash receipts until production proof layer exists.
- No ROI language.
- No guaranteed earning language.
- No token-first language.

## Team ownership
Web/Public:
- page HTML, shared UI, sitemap, redirects

Product:
- copy, claim safety, launch sequence

Legal/Security:
- investment, privacy, proof, host and partner wording

QA/Release:
- route matrix, metadata check, link check, live evidence report
