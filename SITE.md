# Site Vision: Safety Guardian

## 1. Product Summary
Safety Guardian is a mobile neighborhood safety web app. The product combines a live safety map, resident reporting, community signals, and a safe-return flow for late-night or vulnerable travel. The core product promise is simple: help people move through their neighborhood with more confidence.

## 2. Stitch Workspace
- Stitch project: `Safety Guardian`
- Project ID: `12067784276096933084`
- Resource name: `projects/12067784276096933084`
- Device type: `MOBILE`
- Theme seed: `#2764e7`
- Local project file: `stitch.json`

## 3. Current Product Direction
- Home should be framed around resident activity, community reports, safe routes, and safe hubs.
- Avoid presenting the app like a government-open-data dashboard.
- The product should feel local, human, and practical.
- Stitch should be used first for large UI changes, then React should absorb the approved direction.

## 4. Sitemap
- [x] Home Map: `/`
  Stitch reference: `Main Safety Map Screen`
  Primary screen: `projects/12067784276096933084/screens/c62d7666d4b64f01951c00627723c472`
  Local reference: `src/stitch/main-map.html`
- [x] Safe Return: `/safe-return`
  Stitch reference: `Safe Return Home Screen`
  Primary screen: `projects/12067784276096933084/screens/00136a068235486f9f8f2ed3978fc877`
  Local reference: `src/stitch/safe-return.html`
- [x] Report: `/report`
  Stitch reference: `Emergency Reporting Screen`
  Primary screen: `projects/12067784276096933084/screens/c3ee6c1a9fad4b9385b059924bc46335`
  Local reference: `src/stitch/report.html`
- [x] Community Feed: `/community`
  Stitch reference: `Neighborhood Safety Community Feed`
  Primary screen: `projects/12067784276096933084/screens/751df3c6ab91473297a0e98bc33be8b2`
  Local reference: `src/stitch/community.html`
- [x] Community Write Sheet
  Stitch reference: `Community Post Creation Screen`
  Primary screen: `projects/12067784276096933084/screens/d5a45b8aaf824237b4800111d2a89350`
  Local reference: `src/stitch/community-write.html`
- [x] Child Safety: `/child-safety`
  Stitch reference: `Child Safety Monitoring Screen`
  Primary screen: `projects/12067784276096933084/screens/864aa54956754402969b653cd1e90400`
  Local reference: `src/stitch/child-safety.html`
- [x] Dark Map Variant
  Stitch reference: `Dark Mode Safety Map Screen`
  Primary screen: `projects/12067784276096933084/screens/ee937b53a41a4f45ad38210c471d710d`
  Local reference: `src/stitch/dark-map.html`
- [ ] Settings refresh
- [ ] Login and signup refresh
- [ ] Incident detail sheet
- [ ] Safe hub detail sheet

## 5. Roadmap
- [ ] Refresh the home map so the map area feels wider, the summary card sits lower, and the filter language is community-driven.
- [ ] Redesign the report flow around faster category selection, photo proof, and location confidence.
- [ ] Rework the safe-return screen into a clearer guardian dashboard with stronger emergency hierarchy.
- [ ] Make the community feed feel more local and less like a generic social feed.
- [ ] Replace public-infrastructure style child-safety metrics with route confidence and guardian alerts.
- [ ] Build a settings screen that reflects real saved places, notification settings, and privacy controls.

## 6. Creative Freedom
- A neighborhood trend detail screen with a map snippet and resident activity timeline.
- A safe hub detail card for pharmacies, police boxes, 24-hour stores, or verified shelters.
- A late-night walk mode with simplified high-contrast controls.
- A guardian handoff summary screen shown at safe-return completion.
