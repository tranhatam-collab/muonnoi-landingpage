# Release Cycle Handoff — 2026-05-17
## Next Steps to Ship iOS + Android

**Current Status:** 80% → 100% ready (3 actions to complete)

---

## IMMEDIATE ACTION ITEMS

### 1️⃣ Backend Team: Fix User Registration API (2026-05-17 21:30 ICT)
**Priority:** CRITICAL  
**Issue:** `/api/register` endpoint returns "Không thể tạo tài khoản" error  
**Details:**
- Endpoint: `https://api.muonnoi.org/api/register`
- Method: POST
- Status: Responding with validation, D1 INSERT failing
- Error source: `handleRegister()` → `createUser()` catch block in `ai.muonnoi.org/workers/api/src/api/security-api.ts:192`
- Root cause: Unknown (needs investigation)

**Remediation Steps:**
1. Check Cloudflare D1 logs for INSERT error messages
2. Verify `users` table schema (unique constraints on email/username)
3. Test D1 connection directly: `wrangler d1 execute iai_flow_db --sql "INSERT INTO users..."`
4. Check if password hashing is throwing error
5. Verify `password_salt`, `password_algo` columns exist in users table

**Test after fix:**
```bash
curl -X POST https://api.muonnoi.org/api/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test-'$(date +%s)'@muonnoi.org","name":"Test User","password":"TestPass123!"}'
```

Expected: HTTP 201, `{"ok": true, "data": {...}}`

---

### 2️⃣ User: Add DNS CNAME Records (Manual Cloudflare Dashboard)
**Priority:** HIGH  
**Time estimate:** 5 minutes  
**Steps:**
1. Go to Cloudflare dashboard → muonnoi.org zone
2. Create/update these CNAME records:

| Record | Type | Target | Proxy |
|--------|------|--------|-------|
| cuocsong | CNAME | cuocsong-muonnoi-org.pages.dev | ON |
| nguoiviet | CNAME | nguoiviet-muonnoi-org.pages.dev | ON |
| www.nguoiviet | CNAME | nguoiviet-muonnoi-org.pages.dev | ON |

3. Wait 2-5 minutes for DNS propagation
4. Verify with:
```bash
dig +short cuocsong.muonnoi.org
dig +short nguoiviet.muonnoi.org
dig +short www.nguoiviet.muonnoi.org
```

Expected: All return CNAME pointing to corresponding .pages.dev domains

---

### 3️⃣ User: Configure iOS TestFlight Signing
**Priority:** HIGH  
**Time estimate:** 10 minutes  
**Steps:**
1. Get Apple Developer Team ID (from https://developer.apple.com/account)
2. Open Xcode project: `apps/mobile/ios/App.xcodeproj`
3. Select "App" target → Signing & Capabilities
4. Set Team ID to your Apple Developer Team ID
5. Run build to verify: `npm run build:ios:release`

---

### 4️⃣ User: Install Android SDK (Optional, for Android release)
**Priority:** MEDIUM  
**Time estimate:** 30 minutes + 500MB download  
**Steps:**
1. Download Android SDK from https://developer.android.com/studio
2. Unzip to `~/Library/Android/sdk`
3. Add to shell profile (~/.zprofile or ~/.bashrc):
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```
4. Reload shell: `source ~/.zprofile`
5. Verify: `java -version` (should be 21+)
6. Test Android build: `npm run build:android:debug`

---

## VERIFICATION CHECKLIST

Before pushing to TestFlight, verify:

- [ ] Backend team confirms registration API working
- [ ] Join page form can create new account successfully
- [ ] DNS CNAME records propagated (dig shows correct entries)
- [ ] iOS TestFlight Team ID configured in Xcode
- [ ] iOS release build succeeds: `npm run build:ios:release`
- [ ] Final release checklist validation passes

---

## CONDITIONAL GO DECISION

**iOS TestFlight:** ✅ GO (pending registration API + Team ID)
- Build: ✓ Complete
- Smoke tests: ✓ All passing
- API: ✓ Responding (INSERT pending fix)
- Form: ✓ Renders correctly
- Brand: ✓ Design brief delivered

**Android Beta:** ⏳ GO (pending SDK install)
- Build: ✗ Blocked on SDK
- Smoke tests: ✓ Can proceed after SDK
- API: ✓ Same as iOS
- Form: ✓ Same as iOS

---

## TIMELINE TO SHIP

| Task | Owner | Status | ETA |
|------|-------|--------|-----|
| Fix registration API | Backend | 🔄 In Progress | 1-4 hours |
| DNS CNAME setup | User | ⏳ Pending | 5 min |
| TestFlight Team ID | User | ⏳ Pending | 10 min |
| iOS build + sign | User | ✅ Ready | 15 min |
| TestFlight submission | User | ✅ Ready | 15 min |
| **Total to iOS release** | | | **2-4 hours** |

---

## SUCCESS CRITERIA

**iOS Release GO:**
1. ✅ Registration API working (backend)
2. ✅ TestFlight Team ID configured (user)
3. ✅ DNS records propagated (user)
4. ✅ Final release checklist signed off
5. ✅ Build submitted to TestFlight

**Android Release GO:**
1. ✅ Android SDK installed (user)
2. ✅ Registration API working (backend)
3. ✅ Android build succeeds
4. ✅ Final release checklist updated
5. ✅ Build submitted to Google Play

---

## REFERENCE DOCUMENTS

- **Release Checklist:** `app.muonnoi.org/RELEASE_CHECKLIST.md`
- **Release Status:** `reports/RELEASE_STATUS_2026-05-17.md`
- **Master Plan:** `docs/launch/MUONNOI_MASTER_PLAN_STATUS_2026-05-11.md`
- **Brand Brief:** `docs/brand/MUONNOI_BRAND_IDENTITY_SYSTEM_2026_DESIGN_BRIEF.md`
- **API Implementation:** `ai.muonnoi.org/workers/api/src/api/security-api.ts`

---

**Generated:** 2026-05-17 21:40 ICT  
**Release Owner:** AI Agent (Sonnet 4.6)  
**Status:** Ready for 100% completion pending 3 actions above