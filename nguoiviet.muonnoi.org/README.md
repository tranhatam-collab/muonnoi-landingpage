# Người Việt Muôn Nơi · `nguoiviet.muonnoi.org`

**Vietnamese Global Journey layer of Muôn Nơi.**

> Đi xa để quay trở về.

---

## Status

- **Deployed**: ✅ https://nguoiviet-muonnoi-org.pages.dev/
- **Custom domain**: `nguoiviet.muonnoi.org` — PENDING_DNS (manual step required)
- **Brand**: v2.0 Voice & Place (Azure #3B7EFF · Whisper #7FE0E5 · Gold #D4AF37)
- **Pages project**: `nguoiviet-muonnoi-org` (account `f3f9e76222dcb488d5e303e29e8ba192`)

## Quick links

- [Master Plan](docs/NGUOIVIET_MUONNOI_MASTER_PLAN_2026-05-12.md)
- [Dev Handoff](docs/DEV_HANDOFF_NGUOIVIET_MUONNOI_SUBDOMAIN_2026-05-12.md)
- [Live preview](https://nguoiviet-muonnoi-org.pages.dev/)

## Re-deploy

```bash
cd nguoiviet.muonnoi.org
CLOUDFLARE_ACCOUNT_ID=f3f9e76222dcb488d5e303e29e8ba192 \
  wrangler pages deploy public \
  --project-name nguoiviet-muonnoi-org \
  --branch main \
  --commit-dirty=true
```

## Site structure

```
public/
├── index.html                  ← 10 sections homepage
├── manifesto/                  ← Tuyên ngôn 6 nguyên tắc
├── journeys/                   ← 7 loại hành trình
│   └── dalat/                  ← Đà Lạt Pilot
├── start/                      ← Bắt đầu hành trình
├── host/                       ← Local Host program
├── stories/                    ← Câu chuyện Receipt
├── resources/                  ← Tài nguyên vận hành
├── partners/                   ← Đối tác cộng đồng
├── members/                    ← Thành viên (placeholder)
├── contact/                    ← Liên hệ
├── 404.html
├── assets/{ui.css,app.js}
├── _headers _redirects
├── robots.txt sitemap.xml manifest.json
```

## Bất biến

- Không hứa thu nhập
- Không hứa thành công
- Không phải tour
- Không phải khoá học
- Không placeholder text quá 5s
- Không dead link
- Brand v2.0 tuyệt đối
- Đồng bộ Muôn Nơi

---

© 2026 · A journey layer of Muôn Nơi
