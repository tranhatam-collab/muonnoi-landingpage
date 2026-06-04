# BRAND IDENTITY SYSTEM — DESIGN BRIEF
## MUÔN NƠI · Voice & Place v2.0 + NGƯỜI VIỆT MUÔN NƠI

**Version:** 2026-05-17  
**Status:** Design Brief Ready for Execution  
**Audience:** Design team, product team, implementation engineers  

---

## **PHẦN 1: HỆ THỐNG NHẬN DIỆN THƯƠNG HIỆU TOÀN CẦU**

### I. POSITIONING & BRAND ESSENCE

**Tên thương hiệu chính:**
- Tiếng Việt: **Muôn Nơi**
- Tiếng Anh: **Muon Noi**
- ASCII/Domain: `muonnoi.org`
- Compact: `MN` (logo/icon only, NOT replacement for brand name)

**Tagline chính:**
- VI: *"Hạ tầng số cho đời sống thật"* (Digital infrastructure for real life)
- EN: *"Real life first. Real people first. Real value first."*

**Ý nghĩa tên:**
- **Muôn Nơi** = Many Places (đi khắp nơi, kết nối muôn nơi)
- **Muốn Nói** = Want to Speak (gợi âm: people want to express themselves authentically)
- **Philosophy:** "Nói từ muôn nơi. Nghe thấy khắp nơi." (Voice carries everywhere. Every place has a voice.)

---

### II. BRAND ARCHITECTURE HIERARCHY

```
┌─ MUÔN NƠI (Master Brand)
│  ├─ muonnoi.org (Root shell — Homepage + ecosystem navigator)
│  ├─ app.muonnoi.org (App shell — Web + mobile web + app container)
│  ├─ docs.muonnoi.org (Docs hub — Technical + governance documentation)
│  │
│  ├─ NGƯỜI VIỆT MUÔN NƠI (Sub-brand, see Part 2)
│  │  └─ nguoiviet.muonnoi.org (Vietnamese diaspora community hub)
│  │
│  └─ Feature Subdomains (Life Quest modules)
│     ├─ lamviec.muonnoi.org (Work ecosystem)
│     ├─ dulich.muonnoi.org (Travel quests)
│     ├─ suckhoe.muonnoi.org (Health quests)
│     ├─ sangtao.muonnoi.org (Creation quests)
│     ├─ hoctap.muonnoi.org (Learning quests)
│     ├─ family.muonnoi.org (Family layer)
│     ├─ dautu.muonnoi.org (Investment lane)
│     ├─ duan.muonnoi.org (Project lane)
│     ├─ congdong.muonnoi.org (Community layer)
│     ├─ trust.muonnoi.org (Trust & complaints)
│     └─ nhachung.muonnoi.org (Housing/community)
```

**Naming Convention for All Subdomains:**
- Format: `Muôn Nơi · [Module Name]` (with · separator)
- Examples: 
  - Muôn Nơi · Làm Việc
  - Muôn Nơi · Du Lịch
  - Muôn Nơi · Gia Đình

---

### III. VISUAL IDENTITY SYSTEM

#### A. COLOR PALETTE (Brand v2.0)

**Primary Colors:**
```
├─ Azure (Primary Action)
│  ├─ Hex: #3B7EFF
│  ├─ RGB: 59, 126, 255
│  ├─ HSL: 217°, 100%, 63%
│  ├─ Usage: Brand blue, call-to-action buttons, links, trust indicators
│  └─ Dark mode: Keep same, sufficient contrast against dark bg
│
├─ Whisper (Secondary Action)
│  ├─ Hex: #7FE0E5
│  ├─ RGB: 127, 224, 229
│  ├─ HSL: 184°, 68%, 70%
│  ├─ Usage: Secondary UI, input fields, calm interactions, hover states
│  └─ Notes: Cyan-turquoise, softer than primary
│
├─ Gold (Verification)
│  ├─ Hex: #D4AF37
│  ├─ RGB: 212, 175, 55
│  ├─ HSL: 43°, 78%, 52%
│  ├─ Usage: Trust markers, verified badges, proof indicators, achievements
│  └─ Notes: Warm gold, premium feel
│
└─ Charcoal (Text & Structure)
   ├─ Hex: #0a0f14
   ├─ RGB: 10, 15, 20
   ├─ HSL: 200°, 33%, 6%
   ├─ Usage: Body text, UI structure, dark mode primary
   └─ Notes: Very dark blue-black, not pure black
```

**Semantic Colors:**
```
Success (Green):     #10B981 (RGB: 16, 185, 129)
Warning (Amber):     #F59E0B (RGB: 245, 158, 11)
Error (Red):         #EF4444 (RGB: 239, 68, 68)
Info (Azure):        #3B7EFF (use primary)
```

**Background Colors:**
```
Light Mode:
├─ Primary: #FFFFFF (White)
├─ Secondary: #F3F4F6 (Light gray)
└─ Tertiary: #E5E7EB (Border gray)

Dark Mode:
├─ Primary: #0a0f14 (Charcoal)
├─ Secondary: #1a1f26 (Darker gray)
└─ Tertiary: #2d3748 (Border gray)
```

**Color Accessibility Requirements:**
- All text on color: Minimum 4.5:1 contrast ratio (WCAG AA)
- Large text (18px+): Minimum 3:1 contrast ratio
- UI components: Minimum 3:1 contrast ratio
- Never rely on color alone to convey information (use icons + labels)

---

#### B. TYPOGRAPHY SYSTEM

**Font Families:**
```
Display/Headlines:
├─ Primary: Inter Bold (fallback: Roboto Bold)
├─ Characteristics: Modern, confident, geometric sans-serif
└─ Loading: Preload woff2 format

Body Text:
├─ Primary: Inter Regular (fallback: Roboto Regular)
├─ Characteristics: Clear, readable, accessible, uniform stroke
├─ Line height: 1.6 (generous for Vietnamese)
└─ Letter spacing: 0.5px (slight expansion for clarity)

Monospace (Code):
├─ Primary: JetBrains Mono Regular
├─ Usage: Code blocks, technical content, API documentation
└─ Alternative: Courier New (system fallback)
```

**Type Scale:**

| Element | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|-------|
| H1 (Page Title) | 48px | Bold (700) | 1.2 | First mention, major headings |
| H2 (Section) | 36px | Bold (700) | 1.3 | Section headers |
| H3 (Subsection) | 28px | Bold (700) | 1.4 | Content grouping |
| H4 (Module) | 24px | Bold (700) | 1.4 | Module/card titles |
| Body | 16px | Regular (400) | 1.6 | Main copy, Vietnamese + English |
| Small text | 14px | Regular (400) | 1.5 | Descriptions, labels |
| Caption | 12px | Regular (400) | 1.4 | Meta info, hints, small labels |
| Monospace | 13px | Regular (400) | 1.5 | Code snippets |

**Vietnamese Language Requirements:**
- Full diacritics ALWAYS required: à, á, ả, ã, ạ, ă, ằ, ắ, ẳ, ẵ, ặ, â, ầ, ấ, ẩ, ẫ, ậ
- Font must support combining marks
- Never abbreviate or remove accents from visible text
- Example correct: "Đi xa để quay trở về"
- Example wrong: "Di xa de quay tro ve"

**Bilingual Typography Rules:**
- Both languages at equal visual hierarchy
- Vietnamese primary (larger audience)
- English translations immediately below or adjacent
- Never use different font sizes for English (avoid implicit hierarchy)
- Code/API terms: Keep in English (JSON, API, JWT, etc.)

---

#### C. LOGO SYSTEM

**Mark/Icon (MN Circle Badge):**
```
Specifications:
├─ Format: Circular badge
├─ Internal design: Two concentric circles with interlocking M + N
├─ Primary color: Azure #3B7EFF
├─ Aspect ratio: 1:1 (always square canvas, circular content)
│
├─ Sizes:
│  ├─ Digital minimum: 32px × 32px
│  ├─ Digital standard: 64px × 64px, 128px × 128px
│  ├─ Print minimum: 10mm × 10mm
│  ├─ Favicon: 32px × 32px (PNG, ICO formats)
│  └─ App icon: 192px × 192px (iOS, Android, web manifest)
│
├─ Clear space:
│  ├─ Minimum around mark: 1x the height of MN circle
│  ├─ Do not crop closer than this
│  └─ Exception: Favicon can use full 32px
│
├─ Color variations:
│  ├─ Full color: Azure #3B7EFF (primary use)
│  ├─ Monochrome: Charcoal #0a0f14 (printing, accessibility)
│  ├─ Reversed: White on Azure (for backgrounds)
│  └─ Single color white: Use on Azure, Charcoal backgrounds only
│
└─ Usage restrictions:
   ├─ DO: Use as app icon, favicon, small UI badge, internal shorthand
   ├─ DO: Pair with text "Muôn Nơi" in lockup format
   └─ DO NOT: Use as replacement for "Muôn Nơi" brand name in copy
```

**Lockup Formats:**

1. **Horizontal Lockup (Main use, all contexts)**
   ```
   [MN Mark] "Muôn Nơi"
   └─ Spacing: 12px between mark and text
   └─ Color: Azure primary
   └─ Usage: Headers, footers, brand presence
   ```

2. **Vertical Lockup (App footer, constrained spaces)**
   ```
   [MN Mark]
   Muôn Nơi
   └─ Spacing: 8px between mark and text
   └─ Alignment: Center
   └─ Usage: Mobile footers, small UI
   ```

3. **Icon Only (UI, no text)**
   ```
   [MN Mark]
   └─ Size: 32px–128px
   └─ Usage: App icon, favicon, button icon
   └─ Context: Clear from surrounding UI
   ```

4. **Monochrome (Printing, B&W contexts)**
   ```
   [MN Mark] "Muôn Nơi"
   └─ Color: Charcoal #0a0f14
   └─ Usage: Printed materials, certificates, formal documents
   ```

5. **Reversed (On colored backgrounds)**
   ```
   [White MN Mark] "White text"
   └─ Background: Azure or darker colors
   └─ Usage: Hero sections, colored backgrounds
   └─ Contrast: Ensure 4.5:1 minimum
   ```

**Logo Dos & Don'ts:**
- ✅ Maintain consistent proportions
- ✅ Use official color palette
- ✅ Provide adequate clear space
- ❌ Do not stretch, skew, or rotate the mark
- ❌ Do not change stroke weight or proportions
- ❌ Do not use MN mark as replacement for "Muôn Nơi" brand name
- ❌ Do not add effects (shadows, gradients, outlines) unless specified
- ❌ Do not use colors outside official palette

---

### IV. VOICE & TONE GUIDELINES

**Brand Personality Traits:**
- Serious over playful (credible, trustworthy)
- Warm over distant (human, approachable)
- Evidence-led over emotional hype (data-driven, honest)
- Humble but decisive (confident without arrogance)
- Community-builder energy (inclusive, collaborative)
- Privacy-aware technologist (protective, knowledgeable)
- Human editor who respects real life (editorial voice, culturally sensitive)

**Tone by Context:**

| Context | Tone | Example |
|---------|------|---------|
| **Homepage** | Clear, warm, public, human | "Người Việt ở khắp nơi, nói từ nhiều nơi." |
| **Docs** | Exact, direct, versioned, evidence-led | "API v1.2.3 returns JSON with these fields: ..." |
| **Security/Privacy** | Calm, strict, factual | "Your data: encrypted E2E, no trackers, you own it." |
| **Error states** | Name problem, name safe action, next step | "Email verification failed. Try resending link." |
| **Life Quest** | Grounded, purposeful, life-first | "This journey is about real change in real life." |
| **Onboarding** | Encouraging, clear, no hype | "Let's set up your profile. Tell us your story." |
| **Notifications** | Concise, relevant, actionable | "New journey started in Hà Nội. View it →" |

**Approved Words & Phrases:**
```
✅ Use these:
├─ "Real life", "đời sống thật"
├─ "Trust", "proof", "evidence", "bằng chứng"
├─ "Community", "cộng đồng"
├─ "Privacy-first", "no trackers"
├─ "Module", "Life Quest", "journey", "hành trình"
├─ "Đang xây dựng" (in development)
├─ "Đã live" (live/available)
├─ "Đã kiểm tra" (verified/checked)
└─ "Mục tiêu" (goal/target)
```

**Forbidden Words & Phrases:**
```
❌ Never use:
├─ "Revolutionary", "world-class", "game-changer"
├─ "Guaranteed returns", "passive income", "earn fast"
├─ "Social network", "Facebook alternative", "Twitter clone"
├─ "Social Operating System/Space" (v1 legacy, deprecated)
├─ "Instant", "magic", "disruption", "next-gen"
├─ "Viral", "crush it", "hustle", "play-to-earn"
├─ "Official partner" (without written verification)
├─ "Thousands of users" (without measurement evidence)
└─ "Launch ready" (without completion evidence)
```

---

### V. COMPONENT DESIGN SYSTEM

#### Navigation & Buttons

**Primary CTA Button:**
- Background: Azure `#3B7EFF`
- Text: White, 16px bold
- Padding: 12px 24px
- Border radius: 4px
- Hover state: Azure darkened 10% + subtle shadow
- Focus state: 2px Azure outline + 4px padding
- Min touch target: 48px height (mobile)
- Example: "Xem Kế Hoạch", "Khám Phá Hành Trình"

**Secondary CTA Button:**
- Background: Whisper `#7FE0E5`
- Text: Charcoal `#0a0f14`, 16px bold
- Padding: 12px 24px
- Border radius: 4px
- Hover state: Whisper darkened 10%
- Usage: Non-primary actions, navigation

**Text Link:**
- Color: Azure `#3B7EFF`
- Underline: 1px solid Azure (always visible)
- No button styling
- Hover: Underline thickness +1px
- Focus: Outline as per WCAG AA

**Language Toggle:**
- Format: **Text, not abbreviation**
- Labels: "Tiếng Việt" | "English" (full words)
- ❌ DO NOT use "VI", "EN", "VI/EN"
- Implementation: Dropdown or pill toggle
- Active state: Bold + Azure underline

**Navigation Bar:**
- Background: White (light) / Charcoal `#0a0f14` (dark)
- Logo: MN mark + "Muôn Nơi" lockup, 48px height
- Menu items: 16px regular, Charcoal
- Active state: Azure underline + bold
- Mobile: Hamburger icon (24px)
- Sticky: Yes, with subtle shadow on scroll

---

#### Cards & Module Components

**Standard Card:**
- Background: White (light) / `#1a1f26` (dark)
- Border: 1px solid `#E5E7EB` (light) / `#2d3748` (dark)
- Border radius: 8px
- Padding: 24px (desktop) / 16px (mobile)
- Shadow: `0 2px 8px rgba(0,0,0,0.08)` (light) / `0 2px 8px rgba(0,0,0,0.32)` (dark)
- Hover: Slight shadow increase + 2px upward translate (if clickable)
- Gap between cards: 16px (desktop) / 12px (mobile)

**Story Card (for Người Việt content):**
- Image: 1:1 aspect ratio, 200px default (desktop), 150px (mobile)
- Title: 18px bold, Charcoal
- Excerpt: 14px regular, Charcoal (2-3 lines max)
- Author + location: 12px gray, with small (16px) location icon
- Date: 12px gray, italicized
- Hover state: Image 5% zoom, title Azure underline
- CTA: "Read Story" (right-aligned, text link)

**Profile Card (Mentor profiles):**
- Avatar: Circular, 80px diameter
- Name: 20px bold, Charcoal
- Title/Role: 14px regular, Gray
- Bio: 13px regular, Charcoal (2 lines max)
- Location badge: Small circle icon + city name
- CTA: "View Profile" button (secondary style)
- Verification badge: Gold checkmark (if applicable)

---

#### Forms & Input Fields

**Text Input:**
- Border: 1px solid Whisper `#7FE0E5`
- Padding: 12px 16px
- Border radius: 4px
- Font: 16px (prevents zoom on iOS)
- Placeholder: 14px, light gray
- Focus state: 2px Azure border + background `#F0F7FF` (light)
- Error state: 2px Red `#EF4444` border
- Disabled state: Gray border, light background, reduced opacity

**Label:**
- Font size: 14px bold
- Color: Charcoal `#0a0f14`
- Margin bottom: 8px
- Required asterisk: Red `#EF4444`, bold
- Example: "Full Name *"

**Help Text / Error Message:**
- Font size: 12px
- Help text: Gray, italic
- Error text: Red `#EF4444`, regular
- Margin top: 4px

**Checkbox / Radio Button:**
- Size: 20px × 20px
- Checked color: Azure `#3B7EFF`
- Border: 1px solid Whisper `#7FE0E5`
- Label: 16px regular, left-aligned with 12px gap

---

#### Status Indicators & Badges

**Live / Active Status:**
- Badge: Green `#10B981` background, white text, 12px bold
- Icon: Green checkmark (16px)
- Example: "✓ Đã live"

**In Progress Status:**
- Badge: Amber `#F59E0B` background, Charcoal text, 12px bold
- Icon: Rocket emoji or animated dots
- Example: "🚀 Đang xây dựng"

**Verified / Checked Status:**
- Badge: Gold `#D4AF37` background, Charcoal text, 12px bold
- Icon: Gold checkmark (16px) or star (16px)
- Example: "⭐ Đã kiểm tra"

**Blocked / Error Status:**
- Badge: Red `#EF4444` background, white text, 12px bold
- Icon: Red X or warning icon (16px)
- Example: "⚠️ Chưa sẵn sàng"

---

### VI. IMAGERY & VISUAL STYLE

**Photography Direction:**
- Real people, real places, real situations
- Vietnamese cultural context (Đà Lạt, rural communities, urban centers, diaspora locations)
- Diverse ages, backgrounds, authentic expressions
- No stock photo clichés or posed corporate imagery
- Warm, earthy color tones that complement Azure accent
- Natural lighting preferred, avoid artificial studio lighting
- Lifestyle moments (not staged product shots)

**Icon System:**
- Grid: 24px (desktop), 16px (mobile)
- Stroke weight: 2px (consistent throughout)
- Border radius: 2px (rounded for friendliness)
- Color: Charcoal primary `#0a0f14`, Azure for interactive states
- Hover: Change color to Azure, scale +10%
- Library: Minimum 50 icons covering key actions (location, people, journey, trust, etc.)

**Illustration Style:**
- Clean, minimal line-drawing aesthetic
- Not overly complex or decorative
- Show real activities, real tools, real Vietnamese life
- Warm color overlays using Azure `#3B7EFF` + Gold `#D4AF37` accents
- Vietnamese cultural elements (áo dài, pagodas, rice fields, etc.) integrated naturally
- Character illustrations: Diverse, respectful representations

**Photography Mood Board Topics:**
- Vietnamese diaspora: Families, communities, traditions
- Real work: People in their jobs, crafts, professions
- Real travel: Journey moments, connections across cultures
- Real life: Everyday moments of authenticity
- Trust building: Hands, eyes, genuine human connection
- Heritage: Traditional Vietnamese crafts, culture, history

---

### VII. RESPONSIVE DESIGN SPECIFICATIONS

**Breakpoints:**
```
Mobile:       < 768px
Tablet:       768px - 1279px
Desktop:      1280px+
```

**Layout Adjustments by Breakpoint:**

| Element | Desktop (1280px+) | Tablet (768–1279px) | Mobile (<768px) |
|---------|-------------------|----------------------|-----------------|
| Logo | Full "Muôn Nơi" | "Muôn Nơi" | MN icon + hamburger |
| Navigation | Horizontal menu | Hamburger menu | Hamburger menu |
| Language toggle | "Tiếng Việt / English" | "Tiếng Việt / English" | Dropdown icon |
| Content grid | 3+ columns | 2 columns | 1 column |
| Hero image | Full-bleed, 600px height | Full-bleed, 400px height | Full-bleed, 250px height |
| Font sizes | As specified | -2px | -4px |
| Padding | 24px | 20px | 16px |
| Card height | Auto | Auto | Constrain to 300px |
| Button size | 48px min | 44px min | 44px min (touch) |

**Mobile-Specific Rules:**
- Touch targets: Minimum 44px × 44px (iOS), 48px × 48px (Android)
- Viewport: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- Font size: Never below 16px for input fields (prevents iOS zoom)
- Orientation: Support both portrait and landscape
- Safe area: Account for notches and home indicators (iPhone X+)
- Dark mode: Automatic system detection via `prefers-color-scheme`

---

### VIII. DARK MODE IMPLEMENTATION

**Automatic Detection:**
```css
@media (prefers-color-scheme: dark) {
  /* Dark mode styles */
}
```

**Color Mapping:**

| Light Mode | Dark Mode | Usage |
|------------|-----------|-------|
| `#FFFFFF` (White bg) | `#0a0f14` (Charcoal bg) | Primary backgrounds |
| `#F3F4F6` (Light gray) | `#1a1f26` (Darker gray) | Secondary backgrounds |
| `#0a0f14` (Charcoal text) | `#FFFFFF` (White text) | Body text |
| `#3B7EFF` (Azure) | `#7FE0E5` (Whisper, brighter in dark) | Primary interaction |
| `#7FE0E5` (Whisper) | `#3B7EFF` (Azure, for contrast) | Secondary interaction |
| Border: `#E5E7EB` | Border: `#2d3748` | Dividers |

**Testing Dark Mode:**
- All text must have 4.5:1 contrast ratio in dark mode
- Test on iOS Settings > Display & Brightness > Dark
- Test on Android Settings > Display > Dark Theme
- Test screenshots/images rendering (not washed out)
- Test interactive elements visibility

---

## **PHẦN 2: NGƯỜI VIỆT MUÔN NƠI — SUB-BRAND IDENTITY SYSTEM**

### I. SUB-BRAND POSITIONING

**Tên chính & Variations:**
```
Vietnamese:
├─ Người Việt Muôn Nơi (primary)
├─ Người Việt · [Module] (subdomain format)
└─ NVMN (mark/icon only, NOT as name)

English:
├─ Vietnamese Global Journey (primary)
├─ People Việt Everywhere (alternative)
└─ NVMN (mark/icon only, NOT as name)
```

**Tagline & Philosophy:**
- VI: *"Đi xa để quay trở về"* (Go far to come back home)
- EN: *"Journey far to return home richer"*
- Philosophy: Vietnamese diaspora + local journey of self-discovery, authentic connection, contribution
- Vision: Build community where Người Việt (Vietnamese people globally) can share experiences, resources, wisdom from "many places"

**Target Audience:**
- Vietnamese diaspora (USA, Europe, Asia, Australia, etc.)
- Vietnamese youth seeking connection to heritage
- Overseas Vietnamese professionals & entrepreneurs
- Vietnamese living abroad seeking community
- Vietnamese locally seeking broader perspective

**7-Stage Journey Model** (core narrative structure):
```
1. Con người (The Person)
   └─ Self-discovery, identity, current state
   
2. Mắc kẹt (Stuck)
   └─ Recognizing barriers, limitations, challenges
   
3. Môi trường (Environment)
   └─ Finding resources, mentors, community support
   
4. Va chạm (Collision)
   └─ Facing challenges, cultural friction, hard truths
   
5. Trí tuệ (Wisdom)
   └─ Learning, growth, new perspective
   
6. Hệ quả (Consequence)
   └─ Impact & change, ripples in community
   
7. Quay trở về (Return Home)
   └─ Integration, belonging, paying it forward
```

---

### II. NGƯỜI VIỆT VISUAL IDENTITY

#### Color Palette (Sub-brand Extensions)

**Inherited from Master:**
- Primary: Azure `#3B7EFF` (continuity with Muôn Nơi)
- Secondary: Whisper `#7FE0E5`
- Verification: Gold `#D4AF37`
- Text: Charcoal `#0a0f14`

**Sub-brand Accent Colors (Người Việt Specific):**

**Vermillion (Cultural warmth):**
- Hex: `#D84315`
- RGB: 216, 67, 21
- HSL: 14°, 83%, 47%
- Usage: Heritage moments, cultural connections, Vietnamese identity
- Mood: Warm, energetic, cultural pride
- Associations: Silk, traditional dress (áo dài), Vietnamese lanterns

**Teal (Journey depth):**
- Hex: `#00897B`
- RGB: 0, 137, 123
- HSL: 170°, 100%, 27%
- Usage: Growth, transformation, depth of journey
- Mood: Calm, thoughtful, reflective
- Associations: Water, rivers, travel, connectivity

**Extended Palette:**
```
├─ Gold #D4AF37 (verification, heritage)
├─ Cream #FFFBF0 (warm background, Vietnamese traditional aesthetic)
├─ Charcoal #0a0f14 (text, structure)
├─ Light beige #F5F1E8 (subtle pattern background)
└─ Rust #B85835 (supporting warm accent)
```

**Usage Matrix for Người Việt Modules:**
| Module | Primary | Accent | Mood |
|--------|---------|--------|------|
| Root hub | Azure | Vermillion | Welcoming, energetic |
| Hành Trình (Journey) | Azure → Teal | Vermillion + Gold | Transformative |
| Tìm Kiếm (Discovery) | Teal | Azure | Thoughtful, exploratory |
| Cộng Đồng (Community) | Vermillion | Gold | Warm, inclusive |
| Câu Chuyện (Stories) | Varies by story | Vermillion | Narrative-driven |
| Tài Nguyên (Resources) | Azure | Teal | Clear, helpful |
| Bạn Trẻ (Mentorship) | Gold | Azure | Trust, connection |
| Điểm Dừng (Hubs) | Local color | Vermillion | Regional connection |

---

#### Typography (NGƯỜI VIỆT Specific)

**Display Font (Heritage + Modern):**
- Primary: Inter Bold + Roboto Bold (same as master)
- Optional override for heritage content: Playfair Display (serif, for historical narratives)
- Usage: Headlines, journey stages, feature titles

**Body Font (Vietnamese-optimized):**
- Primary: Inter Regular + Roboto Regular
- Line height: 1.6 (generous for Vietnamese readability)
- Letter spacing: 0.5px (slight expansion for clarity)
- Font size: 16px minimum for body (never smaller in primary content)

**Diacritics & Vietnamese-Specific Styling:**
- All diacritics visible: à, á, ả, ã, ạ, ă, ằ, ắ, ẳ, ẵ, ặ, â, ầ, ấ, ẩ, ẫ, ậ, etc.
- Never abbreviate or remove accents (e.g., "Da Lat" is WRONG, "Đà Lạt" is correct)
- Font must support Unicode combining marks
- Test rendering at all sizes (8px–48px)

**Special Typography Cases:**
- User quotes: Preserve original language (VN or EN)
- Code/API: English only (JSON, API keys, etc.)
- Bilingual content: Equal visual weight for both languages
- Names: Honor original diacritics (Nguyễn, Hoàng, etc.)

---

### III. NGƯỜI VIỆT SUBDOMAIN STRUCTURE & VISUAL IDENTITY

#### **Hub 1: Root — người-việt.muonnoi.org**

**Purpose:** Gateway, community discovery, journey browser, cultural hub

**Visual Identity:**
- Hero: Vietnam map with migration patterns (SVG, subtle lines showing global dispersal)
- Color theme: Azure primary + Vermillion accents
- Imagery: Diverse Vietnamese faces (50+ people), multiple locations, different ages
- Layout: Radial design suggesting "center point radiating outward" (Hanoi center, extending to world)
- Pattern overlay: Subtle geometric pattern (triangles or connected nodes, 5% opacity)

**Key Content Sections:**
1. **Hero Section** (above fold)
   - Full-bleed background: Vietnam map fading to world map
   - Headline: "Người Việt Muôn Nơi"
   - Subheading: "Đi xa để quay trở về"
   - CTA: "Khám Phá Hành Trình" (Explore Journey)

2. **7-Stage Journey Visualization**
   - Vertical timeline or circular diagram
   - Each stage with icon + color progression (Vermillion → Azure → Teal)
   - Hover reveals real community stories for each stage

3. **Community Stories Grid**
   - 3-column layout (desktop), 2 (tablet), 1 (mobile)
   - Each card shows location origin (small flag/icon)
   - Story excerpt, author name, location
   - Hover: Image zoom + "Read Story" appears

4. **Featured Locations**
   - Map with pins showing community hubs
   - Interactive: Click pin to see local stories
   - Color: Pin color matches local accent color

5. **Navigation to Sub-modules**
   - 8 feature cards/buttons linking to:
     - Hành Trình (Journey)
     - Tìm Kiếm (Discovery)
     - Cộng Đồng (Community)
     - Câu Chuyện (Stories)
     - Tài Nguyên (Resources)
     - Bạn Trẻ (Mentorship)
     - Điểm Dừng (Hubs)
     - [Event / Featured content]

---

#### **Hub 2: /hanh-trinh (Journeys)**

**Subdomain Visual:** `Người Việt · Hành Trình`

**Purpose:** Browse 7-stage journey narratives from Vietnamese people globally

**Visual Treatment:**
- Timeline scroll: Vertical (mobile/tablet) or horizontal (desktop)
- Color progression: Vermillion (Con người) → Azure (Mắc kẹt) → Teal (Quay trở về)
- Icons: Each of 7 stages has distinct icon (footprint, signpost, sunrise, etc.)
- Typography: Large quotes from community members (16–20px, italic)
- Imagery: Photo essays showing each stage (1 hero image per stage)

**Layout Structure:**
```
Header: "Hành Trình Người Việt" + tagline

7-Stage Timeline:
├─ Stage 1: Con người
│  ├─ Icon: Person silhouette (Vermillion)
│  ├─ Description: Self-discovery journey
│  ├─ Featured stories: 3 cards
│  └─ Filter: By location, keyword
│
├─ Stage 2: Mắc kẹt
│  ├─ Icon: Blocked road (Orange)
│  └─ [Stories...]
│
... (continue for all 7 stages)

CTA at bottom: "Share Your Journey" button (Vermillion)
```

**Visual Elements:**
- Journey map (SVG): User location → destination → return home arc
- Stage badges: Circular icons (48px) with stage number + name
- Story cards: Large image, title, excerpt, author origin
- Hover effect: Image zoom, Vermillion underline on title
- Progress indicator: Visual stage completion for returning visitors

---

#### **Hub 3: /tim-kiem (Discovery)**

**Subdomain Visual:** `Người Việt · Tìm Kiếm`

**Purpose:** Find resources, people, stories by location, interest, life stage

**Visual Treatment:**
- Clean, spacious interface (not cluttered)
- Filter pills: Location, Life stage, Interest, Language
- Map view: Global heatmap showing community activity by region
- Result cards: Story preview + author origin + date
- Color: Azure primary with Teal accents for interaction

**Layout Structure:**
```
Header: "Khám Phá Cộng Đồng Người Việt"

Search + Filter Bar:
├─ Search input: "Find stories, people, resources..."
├─ Filter pills: Location | Life stage | Interest | Language
└─ View toggle: List view | Map view | Grid view

Results Section:
├─ List view: Vertical cards with preview
├─ Map view: Interactive map with pins + list sidebar
├─ Grid view: 3-column card layout
└─ No results state: "Try different filters or search"

Sidebar (Map view):
├─ Active location: Highlighted pin
├─ Community size: "143 members"
├─ Recent activity: "Last story 2 days ago"
└─ "Join community" CTA
```

**Visual Elements:**
- Compass icon (animated, rotating slightly on load)
- Location badges: Small circle flags (24px) showing country/city
- Activity heatmap: Density visualization (darker = more activity)
- Story cards: 3-line excerpt, author image (32px circle), location tag
- Filter pills: Azure background, white text, 12px
- Reset filters button: Text link with X icon

---

#### **Hub 4: /cong-dong (Community)**

**Subdomain Visual:** `Người Việt · Cộng Đồng`

**Purpose:** Gather, discuss, support each other across life stages

**Visual Treatment:**
- Hexagonal grid layout (6-7 cells per row, desktop)
- Each cell: Group avatar (64px), name, member count, activity level
- Color: Warm palette (Vermillion for high activity, Gold for verified, Teal for new)
- Imagery: Group photos, diversity celebration
- Typography: Community names prominent (bold, large)

**Layout Structure:**
```
Header: "Cộng Đồng Người Việt"

Tabs/Filters:
├─ All Communities
├─ By Location (Vietnam, USA, Europe, Asia, Australia, etc.)
├─ By Interest (Career, Family, Education, Arts, etc.)
└─ New Communities

Hexagonal Grid:
├─ Each cell = Community group
│  ├─ Avatar (circular, 64px)
│  ├─ Name: Bold, Charcoal
│  ├─ Member count: "427 members"
│  ├─ Activity level: Animated pulse (Vermillion = active)
│  ├─ Last activity: "2 stories this week"
│  └─ Hover: Zoom effect + "Join" CTA appears
│
└─ [Multiple cells in hex grid]

Pagination: Show 20 per page, load more button
```

**Visual Elements:**
- Node network visualization (optional): Members connected by interest/location
- Activity pulse: Animated concentric circles (SVG) for active communities
- Group badges: "Verified" (Gold star), "New" (Blue), "Trending" (Vermillion)
- Hover card details: Show last 3 posts, member preview, join button
- Responsive: 6 cols (desktop) → 3 cols (tablet) → 1 col (mobile)

---

#### **Hub 5: /cau-chuyen (Stories)**

**Subdomain Visual:** `Người Việt · Câu Chuyện`

**Purpose:** Long-form narratives from Vietnamese diaspora

**Visual Treatment:**
- Magazine-style layout
- Large hero image per story (full-bleed, 600px height)
- Typography: Serif + Sans combination (elegant + modern)
- Color: Story-specific accent color (auto-extracted from image palette or chosen by author)
- Imagery: Documentary photography, personal archives, authentic moments

**Layout Structure:**
```
Featured Story (Above fold):
├─ Hero image: Full-bleed, 600px height
├─ Image overlay: Gradient (Charcoal → transparent)
├─ H1: Story title (48px, white, bold)
├─ Meta: Author name | Location | Reading time | Journey stage
└─ CTA: "Read Story" button (scroll indicator)

Story Content:
├─ Rich text with images
├─ Pull quotes: Large, italic, Vermillion accent bar
├─ Author bio box: Circular avatar (80px), name, bio, follow CTA
└─ Related stories: 3 cards at bottom

Story Archive:
├─ Grid layout: 3 columns (desktop), 2 (tablet), 1 (mobile)
├─ Each card:
│  ├─ Image: 1:1 square, 200px default
│  ├─ Title: 18px bold, Charcoal
│  ├─ Excerpt: 14px regular, 2 lines
│  ├─ Meta: Author + location (12px, gray) + icon
│  ├─ Journey stage badge: Small colored circle
│  └─ Hover: Image zoom + underline on title
└─ Filters: By journey stage, location, date
```

**Visual Elements:**
- Story card: Layered design with subtle shadow + 3D tilt effect on hover (optional)
- Reading time badge: "5 min read" positioned on image overlay
- Journey stage indicator: Colored circle (matches 7-stage color progression)
- Pull quotes: 24px italic, Vermillion left border (4px)
- Author avatar: Circular, 80px, with Vermillion ring on hover
- Related stories: Carousel or grid, "You might also like..."

---

#### **Hub 6: /tai-nguyen (Resources)**

**Subdomain Visual:** `Người Việt · Tài Nguyên`

**Purpose:** Tools, guides, references for different life stages

**Visual Treatment:**
- Card grid: Icon (48px) + Title + Brief description
- Color coding: Each resource type has distinct color
- Download CTA: Prominent, clear, Vermillion or Azure
- Imagery: Icons + illustrative graphics (minimal photography)

**Resource Categories & Colors:**
```
🎓 Education (Azure #3B7EFF)
   ├─ Guides for studying abroad
   ├─ Scholarship resources
   └─ Language learning

💼 Work (Vermillion #D84315)
   ├─ Job boards Vietnam → diaspora
   ├─ Entrepreneurship guides
   └─ Visa/work permit resources

🏠 Housing (Gold #D4AF37)
   ├─ Rental guides by country
   ├─ Community housing networks
   └─ Co-living spaces

❤️ Health (Teal #00897B)
   ├─ Healthcare navigation
   ├─ Mental health resources
   └─ Preventive care guides

📚 Learning (Vermillion + Azure)
   ├─ History of Vietnamese diaspora
   ├─ Language & culture resources
   └─ Professional development

💡 Skills (Charcoal #0a0f14)
   ├─ Soft skills workshops
   ├─ Technical training
   └─ Leadership programs
```

**Layout Structure:**
```
Header: "Tài Nguyên Người Việt"

Tab/Filter Navigation:
├─ All resources
├─ Education
├─ Work
├─ Housing
├─ Health
├─ Learning
└─ Skills

Resource Card Grid (3 cols desktop, 2 tablet, 1 mobile):
├─ Each card:
│  ├─ Icon: 48px colored circle + icon inside
│  ├─ Title: 18px bold, Charcoal
│  ├─ Description: 14px regular, 3 lines
│  ├─ Meta: Type badge, last updated date
│  ├─ "Download/View" button: Color matches category
│  └─ Hover: Shadow + slight zoom
│
└─ [Multiple cards]

Sidebar (Optional, desktop only):
├─ Most popular this month
├─ New additions
└─ Top rated
```

**Visual Elements:**
- Icon library: 48px colored circles with icons inside (6–12 per category)
- Category badge: Small color pill (8px height) on card
- Star rating: 1–5 stars + count (12px, gray)
- Download icon: Simple arrow-down (16px)
- Related resources: "You might also like" section

---

#### **Hub 7: /ban-tre (Mentorship)**

**Subdomain Visual:** `Người Việt · Bạn Trẻ`

**Purpose:** Mentorship matching, guidance for different life stages

**Visual Treatment:**
- Profile cards: Large photo (200px circle) + credentials + story excerpt
- Matching flow: Interactive quiz → matching algorithm
- Color: Gold + Azure (trust + connection)
- Imagery: Professional headshots + lifestyle photography (authentic, not corporate)

**Layout Structure:**
```
Header: "Tìm Bạn Trẻ / Bạn Cũ" (Find mentors / Be a mentor)

CTA Buttons:
├─ "Find a mentor" (Blue, Azure)
└─ "Become a mentor" (Gold)

Browse Mentors Grid:
├─ Each profile card:
│  ├─ Avatar: 200px circular image
│  ├─ Name: 24px bold, Charcoal
│  ├─ Title/Expertise: 16px regular, Gray
│  ├─ Bio: 14px regular, 2 lines, Charcoal
│  ├─ Location: 12px + icon, Gray
│  ├─ Journey stage: Badge (colored circle, 16px)
│  ├─ Specialties: Tags (5–6 max, 12px)
│  ├─ Rating: 5-star system + count
│  ├─ Availability: "Open to mentoring" or "By request"
│  └─ CTA: "Request match" button (Gold background)
│
└─ [3 cols desktop, 2 tablet, 1 mobile]

Filter sidebar:
├─ Expertise (checkboxes)
├─ Location
├─ Availability
├─ Journey stage
└─ Language

Mentoring Quiz/Matching Flow:
├─ Step 1: "Tell us about your journey" (7-stage selector)
├─ Step 2: "What are you looking for?" (expertise checkboxes)
├─ Step 3: "Preferred location/timezone" (map selector)
└─ Results: Ranked matching mentors with % match score
```

**Visual Elements:**
- Avatar: 200px circle, 4px Gold ring on hover
- Connection line animation (optional): Visual arc showing mentor-mentee match
- Journey compatibility meter: Visual bar chart (0–100%) showing alignment
- Specialty tags: Pill-shaped, Azure background, white text, 12px
- Availability badge: Green for "Open", Amber for "Request only"
- Matching score: Large % indicator (36px bold) + "Great match" label

---

#### **Hub 8: /diem-dung (Way-stations / Regional Hubs)**

**Subdomain Visual:** `Người Việt · Điểm Dừng`

**Purpose:** Physical + digital hubs in major Vietnamese diaspora cities

**Visual Treatment:**
- Map-centric design (interactive, zoomable)
- City cards: Highlight + key community contacts
- Color: Local color inspiration (e.g., Tokyo card uses cherry blossom pink accent)
- Imagery: City landmarks + Vietnamese community spots (pagodas, restaurants, cultural centers)

**Layout Structure:**
```
Header: "Điểm Dừng: Cộng Đồng Người Việt Toàn Cầu"

Interactive Map:
├─ Base map showing pins for major cities
├─ Pin color: Varies by region
│  ├─ Asia: Vermillion
│  ├─ Americas: Azure
│  ├─ Europe: Teal
│  └─ Australia/Oceania: Gold
├─ Pin size: Represents community size (larger = bigger community)
├─ Hover pin: Show city name + member count
└─ Click pin: Expand to city card (see below)

City Card Carousel (alternative view):
├─ Each card:
│  ├─ Hero image: City landmark + Vietnamese community spot (400px width)
│  ├─ City name: 36px bold, local accent color
│  ├─ Country: 16px gray
│  ├─ Community size: "847 active members"
│  ├─ Key contacts: 3 mentor profiles (80px circles, names)
│  ├─ Local resources: 3 icon pills (healthcare, work, housing)
│  ├─ Last activity: "3 stories this month"
│  ├─ Language support: Bilingual VI/EN or local language
│  └─ CTA: "Explore community" button (local accent color)
│
└─ [Swippable carousel for mobile]

Statistics Section:
├─ "Global community snapshot"
├─ Total members: 10,500+
├─ Active cities: 45+
├─ Stories shared: 1,200+
└─ Mentorship connections: 300+
```

**Visual Elements:**
- Pin network map: Interactive SVG with animated pins
- Hub card carousel: Smooth transitions, swippable on mobile
- City color accent: Auto-determined from landmark image or preset (e.g., Tokyo = sakura pink)
- Mentor preview: 80px circles in horizontal row, names below
- Resource icons: 32px colored circles with icons (healthcare, work, housing, food, etc.)
- "View all resources" link: Text link with arrow, local accent color

---

### IV. BRAND CONSISTENCY RULES FOR NGƯỜI VIỆT

**Naming Convention:**
```
✅ Correct usage:
├─ Người Việt Muôn Nơi (full name, Vietnamese)
├─ Vietnamese Global Journey (English alternative)
├─ Người Việt · [Module] (subdomain format, with · separator)
├─ NVMN (mark/icon only, logo abbreviation)
└─ PVE (People Việt Everywhere, informal internal use only)

❌ Wrong usage:
├─ NguoiVietMuonNoi (no space, no diacritics)
├─ Peoples Viet (non-standard English)
├─ PVM (confusing abbreviation)
├─ Việt Người (reversed order)
└─ NVMN in body copy as brand name
```

**Content Language Hierarchy:**
- Primary: Vietnamese with FULL diacritics
- Secondary: English translations (equal visual weight)
- Code/Technical: English only (JSON, API, etc.)
- Bilingual pages: Both languages side-by-side (not translation toggle)
- User quotes: Preserve original language + translation below
- Navigation: Bilingual (Tiếng Việt / English)

**Logo Usage (NGƯỜI VIỆT Specific):**
- **Horizontal lockup:** "NVMN" mark + "Người Việt Muôn Nơi" text (primary)
- **Icon only:** NVMN mark circular badge (48px minimum, digital)
- **Monochrome:** Charcoal `#0a0f14` only (for printing)
- **Accent color:** Vermillion `#D84315` for secondary branding (subdomains, badges)
- **Never:** Use NVMN as replacement for "Người Việt" in copy

---

### V. DESIGN SYSTEM COMPONENTS (NGƯỜI VIỆT EXTENDED)

**Hero Section (Hub-specific):**
- Full-bleed background image (photography or SVG illustration)
- Overlay gradient: Charcoal → transparent (bottom to top)
- H1: 48px bold, white, left-aligned, shadow (2px black, 20% opacity)
- Tagline: 24px regular, white, below H1, 16px top margin
- CTA button: Prominent, 16px bold, 16px × 12px padding
- Mobile: Adjust image focus (use CSS `object-position`), reduce font sizes (-4px)

**Story Card (Magazine-style):**
- Image container: 1:1 square, 200px default, 8px border radius
- Hover: Image zoom +10%, subtle shadow, title underline appears
- Title: 18px bold, Charcoal, single line
- Excerpt: 14px regular, Charcoal, 2 lines max
- Author + Location: 12px gray, with small icon (16px location pin), left-aligned
- Date: 12px gray italic, right-aligned
- Journey stage badge: 12px colored circle (matches 7-stage progression), top-right corner

**Profile Card (Mentor/Leader):**
- Avatar: 80px circular image, 2px border (color = local accent)
- Name: 20px bold, Charcoal, center-aligned
- Title/Role: 14px regular, Gray, center-aligned
- Bio: 13px regular, Charcoal, center-aligned, max 2 lines
- Location: 12px with icon, Gray, center-aligned
- Rating: 5 stars (16px) + count (12px), center-aligned
- CTA: 16px button, center-aligned, color = local accent
- Hover: Card shadow increases, avatar border color deepens

**Navigation (NGƯỜI VIỆT Variant):**
- Top bar: MN mark + "Người Việt Muôn Nơi" + main navigation
- Main nav items: 
  - Hành Trình | Tìm Kiếm | Cộng Đồng | Câu Chuyện | Tài Nguyên | Bạn Trẻ | Điểm Dừng
- Right side: Language toggle (Tiếng Việt | English), user menu
- Mobile: Hamburger icon, side drawer navigation
- Active state: 2px Vermillion underline + bold text
- Sticky: Yes, with 8px shadow on scroll

---

## **PHẦN 3: IMPLEMENTATION & QA REQUIREMENTS**

### Design Deliverables Checklist

**Tier 1 — Master Brand (Essential):**
- [ ] Logo mark system (MN circle, all sizes, variations)
- [ ] Color palette swatches (hex, RGB, CMYK, Pantone)
- [ ] Typography file library (Inter, Roboto, JetBrains Mono, WOFF2 formats)
- [ ] Button component library (primary, secondary, text link, states)
- [ ] Form components (inputs, labels, error states, focus states)
- [ ] Navigation patterns (desktop, tablet, mobile, sticky variants)
- [ ] Card component variations (6–8 types)
- [ ] Status indicator system (live, progress, verified, error badges)

**Tier 2 — NGƯỜI VIỆT Sub-brand:**
- [ ] Sub-brand logo (NVMN mark, lockups)
- [ ] Hero section templates (8 variations, one per subdomain)
- [ ] Journey stage visual system (7 icons, color progression, animations)
- [ ] Map & location visualization components
- [ ] Story card template (with typography, metadata)
- [ ] Profile card for mentors (avatar, rating, bio)
- [ ] Community hexagon grid component

**Tier 3 — Responsive & Accessibility:**
- [ ] Responsive breakpoint specifications (mobile, tablet, desktop)
- [ ] Dark mode variants (all components, color mapping)
- [ ] Accessibility audit (WCAG 2.1 AA compliance)
- [ ] Touch target sizing (44px minimum, mobile)
- [ ] Font rendering tests (Vietnamese diacritics at all sizes)
- [ ] Color contrast verification (4.5:1 minimum, all text)

**Tier 4 — Implementation & Deployment:**
- [ ] CSS design tokens (variables for colors, typography, spacing)
- [ ] Figma component library (production-ready, fully interactive)
- [ ] Icon library (SVG + web font, 50+ icons)
- [ ] Photography mood board (reference images, style guide)
- [ ] Component code snippets (HTML, React, Vue examples)
- [ ] Brand guideline document (PDF + interactive web version)

---

### Design QA Checklist

**Accessibility Standards (WCAG 2.1 AA):**
- [ ] Text contrast: 4.5:1 minimum (normal), 3:1 (large text)
- [ ] Focus indicators: Visible on all interactive elements
- [ ] Color not sole means of information: Icons + text labels
- [ ] Keyboard navigation: All interactive elements reachable via Tab
- [ ] Dark mode: Tested and functional on iOS/Android

**Typography & Language:**
- [ ] Vietnamese diacritics render correctly at all sizes (8px–48px)
- [ ] No abbreviations or removed accents in visible text
- [ ] Font files include Vietnamese Unicode ranges
- [ ] Line height: 1.6 minimum for body text (readability)
- [ ] Font size: 16px minimum for inputs (iOS no-zoom)

**Logo & Visual Identity:**
- [ ] Logo renders correctly at 32px (smallest size)
- [ ] Clear space rules maintained
- [ ] Color palette adheres to specifications
- [ ] No unauthorized color modifications
- [ ] Brand name never replaced by "MN" in copy

**Responsive Design:**
- [ ] Tested on 5+ device sizes (mobile, tablet, desktop)
- [ ] Horizontal & vertical orientations tested
- [ ] Touch targets: 44px–48px minimum (mobile)
- [ ] Images: Responsive sizing, no distortion
- [ ] Hamburger menu: Functions correctly on mobile

**Dark Mode:**
- [ ] All components have dark mode variants
- [ ] Text contrast maintained in dark mode
- [ ] Images not washed out in dark mode
- [ ] Interactive elements clearly visible
- [ ] Tested on iOS (Settings > Display & Brightness > Dark)

**Bilingual Content:**
- [ ] Vietnamese primary (larger audience)
- [ ] English translations complete and accurate
- [ ] Equal visual hierarchy for both languages
- [ ] "Tiếng Việt / English" language labels (not "VI/EN")
- [ ] Character encoding: UTF-8 throughout

---

### Sign-off Criteria

Design work is approved only when:
1. ✅ All components pass WCAG 2.1 AA accessibility standards
2. ✅ Color contrast ratios meet minimum requirements
3. ✅ Logo system functions correctly at all specified sizes
4. ✅ Vietnamese diacritics render correctly across all components
5. ✅ Responsive designs tested on 5+ device breakpoints
6. ✅ Dark mode variants complete and functional
7. ✅ Brand consistency: Zero usage of forbidden words/styles
8. ✅ Figma file organized, components well-documented
9. ✅ CSS design tokens generated and validated
10. ✅ Design QA checklist 100% completed

---

## **PHẦN 4: HANDOFF & NEXT STEPS**

**Design Team Deliverable Timeline:**
```
Week 1–2: Logo system + color palette + typography
Week 2–3: Master brand components (buttons, forms, cards)
Week 3–4: Navigation & responsive patterns
Week 4–5: NGƯỜI VIỆT sub-brand identity
Week 5–6: Hero templates + subdomain variants
Week 6–7: Dark mode + accessibility audit
Week 7–8: Figma library + CSS tokens + documentation
Week 8+: Implementation support + QA
```

**Handoff Deliverables:**
1. Figma design file (organized, component-based, well-documented)
2. Brand guidelines PDF (100+ pages, printable, comprehensive)
3. CSS variable file (`brand-tokens.css` with all colors, typography, spacing)
4. Icon library (SVG files + web font format, organized by category)
5. Sample implementation (HTML/React examples for key components)
6. Design QA report (checklist with all items marked ✅)

**Questions for Design Team:**
- Preferred design tool? (Figma, Sketch, Adobe XD, etc.)
- Any design system style guide preferences? (Material Design, Ant Design, custom)
- Timeline preferences? (Agile sprints vs. waterfall delivery)
- Team size & capacity? (Helps with realistic deliverable timeline)

---

**Status: READY FOR DESIGNER ENGAGEMENT**

This brief covers complete master brand identity + detailed NGƯỜI VIỆT sub-brand system with 8 distinct visual identities, responsive design rules, accessibility requirements, and deployment specifications.

Ready to hand off to design team? 📋✅
