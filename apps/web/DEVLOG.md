# muonnoi.org (Public Shell) — Dev Log

Cập nhật mới nhất ở đầu file.

---

## 2026-05-18 — Release readiness complete

### Status: 80% → Ready for 100%
- ✅ iOS build passing
- ✅ iOS smoke tests complete
- ✅ All core routes HTTP 200
- ✅ Join page rendering with proper form
- ✅ Brand identity system delivered (15,000+ words)
- ⏳ Registration API blocker (backend team to fix)
- ⏳ DNS CNAME records (manual Cloudflare update)
- ⏳ TestFlight Team ID (user credentials)

### Public shell routes
| Route | Status | Notes |
|-------|--------|-------|
| `/` | ✅ 200 | Homepage with ecosystem links |
| `/about/` | ✅ 200 | Public company info |
| `/manifesto/` | ✅ 200 | Mission & values |
| `/press/` | ✅ 200 | Press kit & announcements |
| `/newsletter/` | ✅ 200 | Email signup |
| `/ecosystem/` | ✅ 200 | Subdomain map |
| `/roadmap/` | ✅ 200 | Public roadmap |
| `/security/` | ✅ 200 | Security & privacy info |
| `/guide/` | ✅ 200 | User guide |
| `/verify/` | ✅ 200 | Proof verification |

### Brand specifications
- **Color palette**: Azure #3B7EFF, Whisper #7FE0E5, Gold #D4AF37, Charcoal #0a0f14
- **Typography**: Inter/Roboto with Vietnamese diacritics support
- **Logo system**: Circular badge + 5 lockups (horizontal, vertical, icon-only, monochrome, reversed)
- **Voice**: Evidence-led, warm, community-builder energy
- **Design**: Dark + light mode, WCAG 2.1 AA accessibility

### NGƯỜI VIỆT sub-brand (8 subdomains)
1. **Root** (người-việt.muonnoi.org) — Hero + Vietnam map + journey visualization
2. **Hành Trình** (journeys) — Timeline vertical scroll with color gradient
3. **Tìm Kiếm** (discovery) — Search interface with map view
4. **Cộng Đồng** (community) — Hexagonal grid community groups
5. **Câu Chuyện** (stories) — Magazine-style full-bleed layout
6. **Tài Nguyên** (resources) — Card grid with color-coded categories
7. **Bạn Trẻ** (mentorship) — Profile cards + matching quiz + scoring
8. **Điểm Dừng** (way-stations) — Map-centric regional hubs

### Infrastructure status
- **Cloudflare Pages**: Production deployment `95e0ea23.muonnoi.pages.dev`
- **Custom domain**: www.muonnoi.org (active)
- **DNS**: Fully propagated
- **CSP**: Applied with api.muonnoi.org connect-src
- **Redirects**: Legacy routes handled, no dead links

### Release documentation
- **Status Report**: `reports/RELEASE_STATUS_2026-05-17.md`
- **Handoff Guide**: `docs/launch/RELEASE_CYCLE_HANDOFF_2026-05-17.md`
- **Release Checklist**: `app.muonnoi.org/RELEASE_CHECKLIST.md`
- **Brand Brief**: `docs/brand/MUONNOI_BRAND_IDENTITY_SYSTEM_2026_DESIGN_BRIEF.md`
- **Master Plan**: `docs/launch/MUONNOI_MASTER_PLAN_STATUS_2026-05-11.md`

---

## Next blockers to unblock

### 1. User registration API (Backend team)
- **Issue**: D1 INSERT failing in `createUser()`
- **Error**: "Không thể tạo tài khoản"
- **Impact**: /join/ page form cannot complete
- **Estimated fix time**: 1-4 hours
- **Path to resolution**: Debug D1 logs, check constraints, test INSERT directly

### 2. DNS CNAME records (Manual)
- **Action**: Add 3 CNAME records in Cloudflare dashboard
  - cuocsong → cuocsong-muonnoi-org.pages.dev
  - nguoiviet → nguoiviet-muonnoi-org.pages.dev
  - www.nguoiviet → nguoiviet-muonnoi-org.pages.dev
- **Time**: 5 minutes
- **Verification**: `dig +short cuocsong.muonnoi.org`

### 3. iOS TestFlight signing (User)
- **Action**: Provide Apple Developer Team ID
- **Action**: Configure in Xcode project
- **Time**: 10 minutes

### 4. Mail infrastructure (Pending)
- **Status**: MAIL_API_KEY set on ai-muonnoi-api
- **Remaining**: Test end-to-end magic-link email delivery
- **Next**: pay.iai.one end-to-end payment test

---

## Timeline to iOS release

| Task | Owner | Est. Time | Status |
|------|-------|-----------|--------|
| Fix registration API | Backend | 1-4 hours | ⏳ Pending |
| DNS CNAME setup | User | 5 min | ⏳ Pending |
| TestFlight Team ID | User | 10 min | ⏳ Pending |
| iOS build + sign | User | 15 min | ✅ Ready |
| **Total** | | **2-4 hours** | |

---

## Conditional GO for iOS TestFlight

**Ready to ship** as soon as:
1. ✅ Backend team fixes registration API
2. ✅ User provides TestFlight Team ID
3. ✅ User adds DNS CNAME records

**Build status**: ✅ Passing  
**API status**: ✅ Responding (insert blocked)  
**Form status**: ✅ Rendering correctly  
**Brand**: ✅ Design delivered

