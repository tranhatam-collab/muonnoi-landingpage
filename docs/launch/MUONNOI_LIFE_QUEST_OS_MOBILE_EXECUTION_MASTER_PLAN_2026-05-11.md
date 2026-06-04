# MUONNOI LIFE QUEST OS · MOBILE EXECUTION MASTER PLAN · 2026-05-11

## 1. Mục tiêu file
Khóa kế hoạch thực thi mobile app iOS + Android cho Muôn Nơi trên nền kiến trúc đã có của web/public shell, social core, trust layer và Life Quest OS.

File này không thay thế các plan cũ. Nó nối tiếp và hợp nhất:
- public shell của `muonnoi.org`
- app/social core của `app.muonnoi.org`
- AI social + workflow của `ai.muonnoi.org`
- Life Quest OS
- Family / Nhà Chung / Làm Việc / Đầu Tư / Du Lịch về sau

## 2. Định nghĩa sản phẩm mobile
Muôn Nơi mobile app là:
- ứng dụng đời sống số cho con người
- social core trên điện thoại
- trust-first by design
- gateway vào các module đời sống
- layer daily habit cho Life Quest OS

Ứng dụng mobile không được là:
- bản web nhét vào WebView
- app chỉ để chat và feed
- super app rối, nhiều tab nhưng không có lõi
- game gây nghiện

## 3. Product statement
Muôn Nơi mobile app phải giúp người dùng:
- vào social core nhanh hơn
- hoàn thành quest hàng ngày dễ hơn
- chụp và nộp proof ngoài đời thực
- nhận nhắc việc đúng lúc
- giữ nhịp gia đình / sức khỏe / học tập / du lịch / cộng đồng
- duy trì trust và safety trên mobile mạnh hơn web

## 4. Nguyên tắc khóa cứng
### 4.1 Value-first
Không tối ưu screen time. Tối ưu output thật.

### 4.2 Privacy-first
Không third-party analytics kiểu thu behavioral profile sâu. Chỉ event telemetry tối thiểu để vận hành, bảo mật, crash, reliability.

### 4.3 Module-first
Mobile app có shell chung, nhưng từng vertical bật theo feature flags.

### 4.4 Offline-aware
Nhiều use case diễn ra ngoài đời. App phải chịu được mạng yếu, offline capture, upload lại sau.

### 4.5 Proof-native
Camera, location, timestamp, local draft, consent flow là phần lõi của sản phẩm.

## 5. Quyết định kiến trúc mobile
### 5.1 Quyết định đề xuất
Dùng **React Native + Expo + TypeScript** cho app mobile đầu tiên.

### 5.2 Lý do
- gần hệ web nếu web/app hiện đi theo JS/TS
- tốc độ ship iOS + Android nhanh hơn native đôi
- dễ chia sẻ API types, validation schemas, auth flows
- push OTA/update nhẹ trong giai đoạn đầu (nếu cần)
- hệ quest và social core không yêu cầu low-level native quá nặng ở phase đầu

### 5.3 Khi nào mới tách native riêng
Chỉ tách Swift/Kotlin riêng nếu 1 trong 4 điều xảy ra:
- video/call real-time nặng cần native optimization
- health/device integration sâu
- large-scale offline database sync cần tuning vượt JS layer
- app MAU đủ lớn và team mobile riêng đủ mạnh

## 6. Kiến trúc ứng dụng
### 6.1 App shell
- Onboarding
- Auth / Verify state
- Home / Feed
- Quests
- Submit proof
- Rooms / Messages
- Notifications
- Profile / Trust / Family / Wallet / Settings

### 6.2 Navigation chuẩn
Bottom nav phase đầu:
- Home
- Quests
- Rooms
- Alerts
- Profile

### 6.3 Deep links
Phải hỗ trợ:
- `muonnoi://quest/{id}`
- `muonnoi://room/{id}`
- `muonnoi://post/{id}`
- `muonnoi://family/{id}`
- universal links từ web/public pages

## 7. Scope phase đầu
### 7.1 In scope
- auth session
- profile shell
- feed read/write cơ bản
- quest list
- quest detail
- proof capture draft
- proof upload retry
- notification inbox
- settings
- language/theme sync
- minimal trust cues

### 7.2 Not in scope phase đầu
- full video call stack
- advanced creator studio
- full marketplace checkout logic
- enterprise admin
- heavy financial flows

## 8. User lanes
### 8.1 New user
- open app
- understand Muôn Nơi quickly
- read value promise
- join first quest
- save first proof draft

### 8.2 Returning daily user
- check feed
- check quests
- finish one action
- upload proof
- read reflection / trust signal

### 8.3 Family user
- view family mission
- submit group proof
- manage family streaks

### 8.4 Host / local lead
- accept quest participation
- verify completion
- handle local chat / schedule

## 9. Core mobile features by lane
### Social Core
- clean feed
- no infinite manipulative scroll patterns
- topic chips
- useful / comment / save / AI help

### Quest Layer
- daily quests
- city quests
- family quests
- learning quests
- health quests
- community quests

### Proof Layer
- capture photo/video/text
- geotag optional with consent
- local draft
- offline queue
- upload retry
- proof review status

### Trust Layer
- verify badge state
- complaint/report action
- blocked user indicators
- safety checklists for travel/family/community contexts

## 10. App structure
### Screens phase 1
- Splash
- Welcome
- Sign in / Join
- Feed Home
- Quest Hub
- Quest Detail
- Submit Proof
- My Proofs
- Notifications
- Room List
- Room Detail
- Profile
- Settings
- Safety & Support

## 11. Shared services
- auth client
- API client
- session manager
- upload manager
- local cache
- push notification service
- feature flag service
- telemetry service
- crash logging

## 12. Data and sync
### Local storage
- session token / cookie bridge metadata
- theme
- language
- pending proof drafts
- upload queue
- cached feed slices
- cached quest lists

### Sync strategy
- stale-while-revalidate where possible
- background refresh when app foregrounds
- upload queue with exponential retry
- conflict-safe proof status refresh

## 13. Security and privacy for mobile
- secure keychain / keystore for session materials if token-based
- certificate pinning optional in later stage
- no third-party ad SDKs
- granular permissions: camera, photos, location, notifications
- explicit consent copy before geotag collection
- no silent background surveillance

## 14. Mobile + web consistency
Mobile must align with:
- `muonnoi.org` public promise
- `app.muonnoi.org` product shell
- `ai.muonnoi.org` workflow and AI positioning

Do not let mobile drift into another tone or product definition.

## 15. 30 / 90 / 180 day roadmap
### Day 0–30
- finalize architecture
- repo bootstrap
- auth + session
- feed read shell
- quest hub shell
- proof draft capture
- build system + CI baseline
- TestFlight/Internal Android builds

### Day 31–90
- proof upload queue
- notifications inbox
- room list / room detail baseline
- profile/trust views
- deep link handling
- travel/family/learn feature flags
- beta testing loop

### Day 91–180
- daily quest loop polished
- push notifications
- family quest lane
- health streak lane
- host verification tools
- better offline support
- App Store / Play Store release candidate

## 16. Team ownership
### Product
- product definition
- user journeys
- launch sequencing
- KPI selection

### Mobile
- app shell
- navigation
- local storage
- upload queue
- push notifications

### API
- mobile auth contract
- feed endpoints
- quest endpoints
- proof endpoints
- notification endpoints

### Platform
- CI/CD
- secrets
- crash logging
- release automation
- store signing pipeline

### QA
- release gate verification
- device matrix
- offline tests
- upload retry tests
- permissions tests

## 17. Release gates
A build cannot ship if any of the following fail:
- auth loop fails
- proof draft can be created but not recovered
- upload queue loses items
- theme/lang regressions
- deep links broken
- report/block path absent
- crash-free rate below threshold
- store metadata incomplete

## 18. KPIs
### Value-first KPIs
- quest completion rate
- proof verified rate
- 7-day repeat quest rate
- host/family/team invite rate
- push open rate for value reminders
- crash free sessions
- upload success rate
- safety incident rate

### Do not optimize
- raw screen time
- rage comment count
- addictive infinite feed sessions

## 19. Risks and mitigation
### Risk: mobile becomes feed-only app
Mitigation: quest and proof flows are first-class, not secondary.

### Risk: proof uploads fail in poor network
Mitigation: durable local queue + retry + visible status.

### Risk: privacy contradiction
Mitigation: no ad SDK, minimal telemetry, explicit permissions.

### Risk: too many modules too early
Mitigation: feature flags + phased rollout.

### Risk: app store rejection from immature flows
Mitigation: stage release candidate only after stable auth, support, policy pages.

## 20. Required docs after this file
- `MUONNOI_MOBILE_RELEASE_GATES_2026-05-11.md`
- `MUONNOI_MOBILE_TEAM_HANDOFF_SPRINT_01_2026-05-11.md`
- mobile API contract docs
- app store metadata pack

## 21. Final lock
Muôn Nơi mobile app is not a second website. It is the daily-operating layer of the Muôn Nơi system on the phone.
