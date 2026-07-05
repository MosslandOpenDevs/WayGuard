# 안전 지킴이 (WayGuard)

**안전 지킴이 (Safety Guardian / WayGuard)** is a mobile-first, Korean-language
neighborhood safety web app. It helps residents see what is happening nearby,
report local risks, keep an eye out for each other, and share a calm "safe
return" flow — all from the browser, no app store required.

The product is intentionally **community-powered** rather than government-open-data
powered. Everything centers on user-generated safety context, location-aware
reporting, guardian-sharing, and a public landing page for web sharing.

## Live Web

- Production: https://wayguard-web-rose.vercel.app

## Core Experiences

1. **Home map** — resident reports and neighborhood safety signals on one live map
2. **Resident reports** — text, category, location, and optional photo
3. **Community feed** — short neighborhood safety updates with likes and comments
4. **Safe return** — destination + guardian sharing with live location updates
5. **Child safety** — a route-safety preview with nearby protection spots

## Tech Stack

- React 19 + Vite 6
- React Router 7
- Supabase (auth, Postgres, storage)
- Kakao Maps JavaScript SDK
- Tailwind CSS (via CDN) with a Stitch-derived design system
- `vite-plugin-pwa` for installable PWA support

## App Structure

| Route | Screen | Access | Notes |
| --- | --- | --- | --- |
| `/` | Landing | Public | Marketing / share page |
| `/login`, `/signup` | Auth | Public | Supabase email auth |
| `/app` | Home map | Public | Reports + signals, 안심 지수, current location |
| `/report` | Resident report | Protected | Category, photo upload, location picker |
| `/community` | Community feed | Protected | Posts, likes, comments |
| `/safe-return` | Safe return | Protected | Destination, guardians, live session |
| `/settings` | My page | Protected | Profile, dark mode, saved places, legal |
| `/child-safety` | Child safety | Public | Preview screen, reachable by URL |

Protected routes redirect to `/login` when there is no session.

## Feature Status

The app is designed to **degrade gracefully** — it runs without Supabase (local
fallback, auth-gated features disabled) and without a Kakao key (a designed
fallback preview map replaces the live map). Being explicit about what is wired
to real data vs. what is still a front-end preview:

- **Real / persisted:** authentication, resident reports (+ Supabase Storage
  image upload), community posts / likes / comments, safe-return profile and
  session persistence with a local-storage fallback, saved places, dark mode.
- **Heuristic / demo:** the home-map "안심 지수" is a lightweight score derived
  from the visible report and signal counts; the map's community signals are
  generated sample markers; the child-safety screen uses sample route stats and
  protection spots. These are intentional placeholders with real UI, ready to be
  connected to live data.

## Environment Variables

Create a `.env` file (see [.env.example](./.env.example)):

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_KAKAO_MAP_API_KEY=your_kakao_javascript_key
```

All three are optional for a first run: missing Supabase keys disable auth-gated
features with a clear in-app notice, and a missing Kakao key shows the fallback
preview map.

## Local Development

```bash
npm install
npm run dev      # http://localhost:5173/
npm run build    # production build -> dist/
npm run preview  # serve the production build
```

## Database Setup (Supabase)

- Full baseline schema in one pass: [supabase_schema.sql](./supabase_schema.sql)
- Safe-return tables only: [safe_return_supabase.sql](./safe_return_supabase.sql)
  (see [SAFE_RETURN_SETUP.md](./SAFE_RETURN_SETUP.md))
- Community likes & comments on an existing project:
  [community_interactions_supabase.sql](./community_interactions_supabase.sql)

For resident-report photos, create a public Supabase Storage bucket named
`reports`.

## Project Docs

- [Product plan](./기획서_안전지킴이.md)
- [Site vision](./SITE.md)
- [Design system](./DESIGN.md)
- [Web deploy guide](./WEB_DEPLOY.md)
- [Work log](./작업기록.md)

## Design Workflow

Large UI changes follow a Stitch-first flow:

1. create a Stitch screen first
2. confirm layout and hierarchy
3. port the approved direction into React
4. do small spacing and interaction polish in code

Stitch prompts and reference screens live in
[`stitch-prompts/`](./stitch-prompts) and [`src/stitch/`](./src/stitch).

## UI Guardrail

The current UI/UX direction is approved and should be preserved.

- Do not change the overall visual tone, layout structure, or interaction
  pattern unless explicitly requested.
- Limit future UI edits to small bug fixes, connection fixes, copy fixes,
  spacing polish, and minor usability improvements.

## Working Agreement

- Verify changes directly when possible before reporting them done.
- Report what was confirmed separately from what could not be verified in the
  current environment.
- Prefer concrete verification notes (build status, test status, interaction
  checks).

## Deployment Note

The public web deployment is a dedicated Vercel project and is the clean path for
future landing-page updates.

- preferred production URL: https://wayguard-web-rose.vercel.app
- for future releases, push the approved changes and verify the Vercel
  production deployment after each release

---

## 향후 방향 (Where this could go next)

이 저장소는 "완성"이 아니라 **다음 단계를 위한 튼튼한 출발점**으로 정리해 두었습니다.
아래는 확정된 계획이 아니라, 앞으로 어느 방향으로 발전시키면 좋을지에 대한 열린
제안입니다. 필요에 따라 골라서 이어가면 됩니다.

This repo is left as a **solid starting point, not a finished product.** The
items below are open directions rather than commitments — pick up whatever fits
the next goal.

**From demo to live data**
- Replace the map's sample community signals with real geolocated community
  posts (and, if desired later, opt-in open-data layers).
- Evolve the "안심 지수" from a simple count heuristic into a proper model
  (report recency and density, time of day, area history).
- Connect the child-safety screen to real route / CCTV / safe-spot data and give
  it a real entry point in the app instead of being URL-only.

**Close the loop on safety**
- Safe return currently records SOS / alert events locally. Add real guardian
  notifications at the alert threshold (Supabase Edge Function + an SMS or push
  provider).
- The push-alert toggle in Settings has no delivery pipeline yet — add web push.

**Trust & data quality**
- Report moderation and false-report handling.
- Review Supabase Row Level Security across all tables before wider use.

**Engineering foundations**
- Add ESLint + Prettier and a CI check (there is no lint/test tooling today).
- Add tests for the service layer (`src/services/*`).
- Code-split to trim the ~550 KB main bundle (route-level dynamic imports).
- Accessibility and i18n passes for a broader audience.

**Loose ends**
- `src/pages/PatrolStudio.jsx` is a self-contained experimental "night patrol"
  screen that is not routed anywhere. Decide whether to ship it (add a route and
  entry point) or remove it.

**Guiding questions when choosing the next step**
- Does this make the app *more real* (live data) or *more trustworthy*
  (moderation, notifications, security)?
- Can it ship behind the existing UI without breaking the approved design?
- Would a resident notice and benefit from it in daily use?
