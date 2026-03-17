# Site Vision: Safety Guardian

## 1. Product Summary
Safety Guardian is a mobile-first neighborhood safety web app built around a practical local workflow: check the map, report something risky, share a safe-return session, and keep up with nearby community signals. The product should feel human, quick, and grounded in everyday movement rather than like a government data dashboard.

## 2. Stitch Workspace
- Stitch project: `Safety Guardian`
- Project ID: `12067784276096933084`
- Resource name: `projects/12067784276096933084`
- Device type: `MOBILE`
- Theme seed: `#2764e7`
- Local project file: `stitch.json`

## 3. Current Product Direction
- Home is the living safety surface for resident reports and community signals.
- Reporting should be fast, visual, and location-confident.
- Safe Return should feel like a guardian-sharing flow, not a complex tracking admin tool.
- Child Safety should focus on route confidence and safe hubs instead of dense infrastructure dashboards.
- Settings and auth surfaces should feel complete and support real usage, not placeholder flows.

## 4. Sitemap
- [x] Home Map: `/`
  Stitch reference: `Main Safety Map Screen`
  Primary screen: `projects/12067784276096933084/screens/c62d7666d4b64f01951c00627723c472`
- [x] Safe Return: `/safe-return`
  Stitch reference: `Safe Return Home Screen`
  Primary screen: `projects/12067784276096933084/screens/00136a068235486f9f8f2ed3978fc877`
- [x] Report: `/report`
  Stitch reference: `Emergency Reporting Screen`
  Primary screen: `projects/12067784276096933084/screens/c3ee6c1a9fad4b9385b059924bc46335`
- [x] Community Feed: `/community`
  Stitch reference: `Neighborhood Safety Community Feed`
  Primary screen: `projects/12067784276096933084/screens/751df3c6ab91473297a0e98bc33be8b2`
- [x] Community Write Sheet
  Stitch reference: `Community Post Creation Screen`
  Primary screen: `projects/12067784276096933084/screens/d5a45b8aaf824237b4800111d2a89350`
- [x] Child Safety: `/child-safety`
  Stitch reference: `Child Safety Monitoring Screen`
  Primary screen: `projects/12067784276096933084/screens/864aa54956754402969b653cd1e90400`
- [x] Login: `/login`
- [x] Signup: `/signup`
- [x] Settings: `/settings`
- [x] Incident detail sheet
- [x] Safe hub detail sheet

## 5. Current Build Status
- Resident report markers use custom overlays instead of Kakao default popup UI.
- Home includes a score summary card, a score detail sheet, and an incident detail sheet.
- Report includes category selection, photo proof, and direct location editing.
- Community includes neighborhood selection, compose flow, likes, comments, and post options.
- Settings includes profile edit, saved places, push toggle, dark mode, and legal/support sheets.
- Login and signup include password reset and legal information flows.
- Child Safety includes route analysis UI and safe-hub detail sheets.

## 6. Validation Notes
- Build is passing with `npm run build`.
- Core browser flows outside the Kakao map layer were automation-checked successfully.
- Kakao map marker interaction still needs manual browser/device validation because the automation browser blocked the Kakao SDK request.

## 7. Roadmap
- [ ] Finish manual QA for real Kakao map marker interaction and popup placement.
- [ ] Persist community likes and comments to backend storage.
- [ ] Add report status lifecycle and moderation flow.
- [ ] Connect Safe Return to real guardian alert delivery.
- [ ] Reduce bundle size with code splitting where it matters.
- [ ] Expand verified safe-hub and route-confidence data sources.

## 8. Creative Freedom
- A neighborhood trend detail screen with a map snippet and resident activity timeline.
- A safe hub detail card for pharmacies, police boxes, 24-hour stores, or verified shelters.
- A late-night walk mode with simplified high-contrast controls.
- A guardian handoff summary screen shown at safe-return completion.
