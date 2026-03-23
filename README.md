# Safety Guardian (WayGuard)

Safety Guardian is a mobile-first neighborhood safety app built around three core experiences:

- resident reports
- community safety signals
- safe return sharing
- child safety route guidance

The product no longer assumes government open-data integration as a required runtime dependency. The current app focuses on user-generated safety context, location-aware reporting, guardian-sharing workflows, and a public landing page for web sharing.

## Live Web

- Production: `https://wayguard-web-rose.vercel.app`

## Latest Update - 2026-03-23

- launched the current public web deployment on Vercel
- refined the landing page hero with a cleaner mobile mockup
- polished Korean typography, spacing rhythm, and card hierarchy on the landing page

## Project Docs

- [Product plan](./기획서_안전지킴이.md)
- [Site vision](./SITE.md)
- [Design system](./DESIGN.md)
- [Work log](./작업기록.md)

- [Web deploy guide](./WEB_DEPLOY.md)

## Product Focus

### 1. Home Map

The home map is a live neighborhood surface that combines:

- resident reports stored in Supabase
- community signal markers

### 2. Resident Reports

Users can submit:

- broken lighting
- CCTV blind spots
- hazardous facilities
- suspicious situations

Reports support text, location, and optional image upload through Supabase Storage.

### 3. Community Feed

Users can post short neighborhood safety updates and browse recent local activity.

### 4. Safe Return

Safe Return supports:

- destination saving
- guardian contact saving
- trip session start and finish
- local fallback persistence
- Supabase persistence when the dedicated tables exist

### 5. Child Safety

The app also includes a child safety flow at `/child-safety` for checking safer routes and nearby safety spots.

## Tech Stack

- React + Vite
- React Router
- Supabase
- Kakao Maps JavaScript SDK

## Environment Variables

Create a `.env` file with:

```env
VITE_KAKAO_MAP_API_KEY=your_kakao_javascript_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Local Development

```bash
npm install
npm run dev
```

Default local address:

- `http://localhost:5173/`

## Safe Return Database Setup

To enable remote persistence for Safe Return, run:

- [safe_return_supabase.sql](./safe_return_supabase.sql)

Reference notes:

- [SAFE_RETURN_SETUP.md](./SAFE_RETURN_SETUP.md)

## Community Interaction Database Setup

If you want community likes and comments to work on an existing Supabase project, also run:

- [community_interactions_supabase.sql](./community_interactions_supabase.sql)

If you are setting up the project from scratch and want the full baseline schema in one pass, use:

- [supabase_schema.sql](./supabase_schema.sql)

## Current Direction

Large UI changes should follow this order:

1. create a Stitch screen first
2. confirm layout and hierarchy
3. port the approved direction into React
4. do small spacing and interaction polish in code

## UI Guardrail

The current UI/UX direction is approved and should be preserved.

- Do not change the overall visual tone, layout structure, or interaction pattern unless explicitly requested.
- Limit future UI edits to small bug fixes, connection fixes, copy fixes, spacing polish, and minor usability improvements.

## Working Agreement

For future tasks, changes should be verified first and then reported clearly.

- Check changes directly when possible before saying they are done.
- Report what was confirmed separately from what could not be directly verified in this environment.
- Prefer concrete verification notes such as build status, test status, and interaction checks.

## Deployment Note

The current public web deployment was created as a new Vercel project and is intended to be the clean path for future landing page updates.

- preferred production URL: `https://wayguard-web-rose.vercel.app`
- for future web releases, push the approved landing changes and verify the Vercel production deployment after each release
