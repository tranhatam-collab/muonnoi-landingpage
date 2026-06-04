# MUONNOI LQOS · HOMEPAGE DEPLOY PLAN · 2026-05-11

## 1. Mục tiêu
Giữ nguyên plan homepage cũ, chỉ cập nhật để homepage phản ánh đúng:
- Muôn Nơi public shell
- Life Quest OS
- trust layer
- mobile app execution coming next

## 2. Homepage must communicate
- Muôn Nơi là gì
- social-first, privacy-first, module-first
- life quest layer exists
- value comes from real-world output
- mobile app là lớp thực thi hằng ngày, không phải app game gây nghiện

## 3. Content updates required
### Homepage hero
Thêm 1 line phụ:
- Muôn Nơi đang mở rộng thành hệ nhiệm vụ đời sống và ứng dụng di động để hỗ trợ việc học, đi, làm, chăm sóc gia đình và đóng góp cộng đồng trong đời thực.

### Ecosystem section
Thêm Life Quest OS + Mobile execution lane

### Roadmap section
Add phase note:
- mobile app iOS/Android execution layer

### CTA section
New CTA options:
- Join quests
- Follow mobile build updates
- Become host / partner

## 4. Deployment sequence
1. lock content
2. verify all public routes not blank
3. validate nav/header/footer consistency
4. deploy public shell
5. test mobile deep-link landing points

## 5. QA checklist before deploy
- all public routes render
- theme toggle works
- language toggle works
- mobile menu works
- quest links resolve
- roadmap references consistent with new mobile lane
- no public mention of financial overclaim

## 6. Post-deploy checks
- Lighthouse baseline
- CSP intact
- canonical/meta tags intact
- OG preview valid
- mobile viewport sanity

## 7. Latest execution evidence
- 2026-05-11: public shell preview deployed with Wrangler Pages.
- Deployment URL: `https://c40d0df9.muonnoi.pages.dev`
- Alias URL: `https://brand-v2-0-voice-and-place.muonnoi.pages.dev`
- Link hardening applied: routes that pointed to not-yet-verified subdomains now point to internal safe routes (`/ecosystem/`, `/roadmap/`).
