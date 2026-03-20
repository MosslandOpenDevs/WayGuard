# Web Deploy Guide

WayGuard can be shared as a public web app without going through the App Store.

## Recommended Path

Use Vercel for the first public deployment.

- Vite apps deploy cleanly on Vercel
- the current repo already has a Git remote configured
- the app only needs static hosting plus environment variables

## 1. Push The Latest Code

```bash
git add .
git commit -m "prepare web deployment"
git push origin main
```

## 2. Create The Vercel Project

1. Open Vercel and import the GitHub repository.
2. Keep the detected framework as `Vite`.
3. Confirm the build settings:

```text
Build Command: npm run build
Output Directory: dist
```

`vercel.json` is included so React Router routes like `/community` and `/report` resolve correctly in production.

## 3. Add Environment Variables

Add these variables in the Vercel project settings:

```env
VITE_KAKAO_MAP_API_KEY=your_kakao_javascript_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 4. Update External Service Settings

After the first deployment, copy the production URL and update these services.

### Kakao Developers

- open your Kakao app settings
- add the deployed URL to the JavaScript key allowed domains
- example: `https://wayguard.vercel.app`

If this step is skipped, the map may fail to load outside localhost.

### Supabase Auth

Open `Authentication -> URL Configuration` and set:

- `Site URL`: your deployed app URL
- `Redirect URLs`: add `https://your-domain/login`

This app sends password reset users back to `/login`, so that redirect must be allowed.

## 5. Share It

Use one of these options:

- share the Vercel URL directly
- connect a custom domain like `app.yourdomain.com`
- build a simple marketing site and link people into the app

## Notes

- The app is deployable as a website now.
- PWA install polish is not fully finished yet because the manifest still expects install icons that are not in `public/`.
- For web sharing, that does not block deployment.
