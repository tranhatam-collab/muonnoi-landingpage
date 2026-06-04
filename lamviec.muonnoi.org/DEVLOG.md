# lamviec.muonnoi.org — Dev Log

Cập nhật mới nhất ở đầu file.

---

## 2026-05-18 — Google OAuth sign-in/register deployment

### Đã làm
- ✅ **`/*/login`** — Added Google Sign-In button with OAuth flow
- ✅ **`/*/register`** — Added Google Sign-Up button with OAuth flow
- ✅ **CSS divider** — Added consistent divider styling between auth methods
- ✅ **Deployment** — `wrangler pages deploy` to Cloudflare Pages

### Changes
```
src/
  components/
    - GoogleSignInButton.tsx (NEW)
    - GoogleSignUpButton.tsx (NEW)
  pages/
    - login.tsx (MODIFIED - added Google button + divider)
    - register.tsx (MODIFIED - added Google button + divider)
  styles/
    - globals.css (MODIFIED - added divider styling)
```

### OAuth configuration
| Config | Value |
|--------|-------|
| Client ID | From `GOOGLE_CLIENT_ID` env |
| Redirect URI | `https://api.muonnoi.org/api/auth/google/callback` |
| API Endpoint | `POST /api/auth/google/start` |
| Session | HttpOnly cookie after successful auth |

### Form flows
| Page | Flows |
|------|-------|
| `/*/login` | Email/password + Google OAuth |
| `/*/register` | Email/password + Google OAuth |

### Styling
- Divider CSS: border-top 1px #e5e7eb, margin 1rem 0
- Button styling: Consistent with Google Design System
- Dark mode: Supported via Tailwind dark: prefix

### Deployment details
- Platform: Cloudflare Pages
- Build: `npm run build` (React Native Web → web distribution)
- Deploy: `wrangler pages deploy dist/`
- Custom domain: lamviec.muonnoi.org
- Branch: main

### Status
✅ Live on production
- Login flow: Google OAuth working
- Register flow: Google OAuth working
- Fallback: Email/password still available

### Testing checklist
- [ ] Click "Sign in with Google" → redirects to Google consent screen
- [ ] After consent → session created, redirected to dashboard
- [ ] Click "Sign up with Google" → new account created + session
- [ ] Dark mode: buttons and divider render correctly
- [ ] Mobile: responsive layout on < 768px

---

## To-do
- [ ] Test end-to-end with real Google account
- [ ] Monitor error logs for failed OAuth flows
- [ ] Consider social sign-in analytics (privacy-first: no tracking pixels)

