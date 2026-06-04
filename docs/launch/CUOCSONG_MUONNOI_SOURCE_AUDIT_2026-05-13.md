# CUOCSONG MUONNOI SOURCE AUDIT · 2026-05-13

## Verdict

NO_DEDICATED_CUOCSONG_SUBDOMAIN_FOUND

`cuocsong.muonnoi.org` is a planned Muôn Nơi living-practice layer. It is not yet a deployed subdomain, not yet a Cloudflare Pages project, and not yet a primary public CTA.

The available material is useful as source history, but it must be rewritten into the current Muôn Nơi standard before publishing.

## Evidence Checked

### Local repo

Commands run from `/Users/tranhatam/Documents/Devnewproject/muonnoi.org`:

- `rg -n "cuocsong|cuộc sống|Cuộc Sống|cuoc song|cuocsong.muonnoi|CUOCSONG" docs nguoiviet.muonnoi.org apps . --glob '!node_modules' --glob '!.git'`
- `find . -maxdepth 3 -iname '*cuocsong*' -o -iname '*cuoc-song*' -o -iname '*cuoc_song*'`

Result:

- No dedicated `cuocsong.muonnoi.org` source tree found.
- No dedicated `Cuộc Sống Muôn Nơi` launch plan found before this audit.
- Existing references live inside the Người Việt Muôn Nơi legacy archive:
  - `nguoiviet.muonnoi.org/docs/wix-content-archive/csmn.md`
  - `nguoiviet.muonnoi.org/docs/wix-content-archive/post-mot-noi-de-tro-ve.md`
  - `nguoiviet.muonnoi.org/docs/wix-content-archive/WIX_REDIRECT_MAP_2026-05-12.md`
  - `nguoiviet.muonnoi.org/public/cuoc-song-muon-noi`

### DNS

Command:

- `dig +short cuocsong.muonnoi.org`

Result:

- No DNS answer returned on 2026-05-13.

### Cloudflare Pages

Command:

- `wrangler pages project list | rg -i "cuoc|song|cuocsong"`

Result:

- No matching Cloudflare Pages project or domain entry returned.

### Google Drive source package

Drive folder checked:

- `https://drive.google.com/drive/folders/1CCGH9PcZH7vaxw-IfeymhTDGvjboJd16?usp=share_link`

Files found:

| File | Google Docs ID | Use |
|---|---|---|
| `Tổng Thể về Chuỗi Chương Trình "Cuộc Sống Muôn Nơi - www.cuocsongmuonnoi.net` | `14rAo9gLknH-d3Aa-l5IYuRnu3cAcKuMET8F-_VjryEc` | Source strategy and old page/menu structure |
| `TỔNG HỢP BÀI ĐĂNG WEB WWW.CUOCSONGMUONNOI.COM` | `1oJlAO4txBQI0TOF-nk86y-Xaw3wOVsgcdCX_mNjGPjY` | Legacy article draft source |

## Source Material Fit

### Reusable themes

- Sống, học, làm việc và kết nối ở nhiều nơi.
- Học qua trải nghiệm thật.
- Cộng đồng hỗ trợ nhau bằng kỹ năng, thời gian, địa điểm và tri thức.
- Nhà Chung và Đà Lạt là điểm thử nghiệm đời sống thật.
- Cho và nhận phải dựa trên giá trị thật, không dựa trên lời hứa tài chính.
- Mạng lưới toàn cầu nên bắt đầu như directory, guide và cộng đồng xác minh, không phải dịch vụ bảo lãnh.

### Required cleanup before public copy

The Drive source contains claims that are not safe for direct publication under the current Muôn Nơi release gate.

Blocked until legal or operational evidence exists:

- Visa, immigration and legal process guidance presented as a service.
- Financial, banking, loan, investment or fundraising claims.
- Medical, insurance, psychology, spiritual or crisis support claims.
- Claims of free accommodation, free meals or guaranteed support.
- Fixed price, contribution, fundraising or 11-billion-VND project claims.
- Public phone numbers, office addresses, social links and contact channels that are examples or not verified.
- Claims implying exemption from governments, laws, institutions or local obligations.
- Outcome promises such as guaranteed success, guaranteed relocation or guaranteed support.

Allowed rewrite direction:

- Use the source as historical intent and content taxonomy.
- Rewrite into orientation, readiness, directory, community standards and pilot content.
- Link regulated topics to disclaimer pages and verified partner directories only after approval.
- Keep all public CTAs non-transactional until payment/email gates pass.

## Current System Alignment

`Cuộc Sống Muôn Nơi` must sit under the current Muôn Nơi architecture:

- Social-first: connects people to real local life and community.
- Privacy-first: minimal intake, no tracker-led funnel, no behavioral advertising.
- Trust-first: verified hosts, clear disclaimers, evidence before claims.
- Module-first: separate living layer that links to work, travel, learning, family, health, community and home modules.
- Life-first: the goal is useful living practice, not screen retention or speculative earning.

## Release Status

| Gate | Status | Reason |
|---|---|---|
| Dedicated source tree | `NOT_CREATED` | No `cuocsong.muonnoi.org` source folder exists |
| DNS | `NOT_CONFIGURED` | `dig +short cuocsong.muonnoi.org` returned no answer |
| Cloudflare Pages project | `NOT_FOUND` | Pages list had no `cuoc/song/cuocsong` match |
| Public content | `IMPLEMENTATION_IN_PROGRESS` | first route set exists locally; full route coverage and release evidence are still incomplete |
| Legal/claim review | `IMPLEMENTED_ROUTE_SET_REVIEWED` | Team 5 reviewed the current implemented route set; full release still waits on remaining routes, preview and DNS evidence |
| Primary public CTA | `BLOCKED` | No DNS, no source, no route QA, no claim gate |

## Decision

Create a planning lane now. Do not deploy or promote `cuocsong.muonnoi.org` until the master plan, content map, release checklist, source tree, DNS and claim review are complete.
