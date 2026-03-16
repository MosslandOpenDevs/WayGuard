# Design System: Safety Guardian
**Project ID:** 12067784276096933084

## 1. Visual Theme & Atmosphere
Safety Guardian is a mobile-first neighborhood safety product. The interface should feel calm, trustworthy, and practical instead of official, bureaucratic, or surveillance-heavy. The overall mood is clean and breathable, with a light canvas, rounded surfaces, and strong blue accents that signal guidance and action. The product should feel community-powered rather than government-open-data powered.

## 2. Color Palette & Roles
- Safety Blue (`#2764e7`): Primary actions, active tabs, map focus states, key badges, and progress rings.
- Emerald Signal (`#10b981`): Positive states, safe-route status, guardian-connected moments, and success feedback.
- Alert Amber (`#f59e0b`): Reference metrics, cautionary hints, and gentle warning states.
- Incident Red (`#ef4444`): Resident reports, emergency actions, and urgent status markers.
- Mist Background (`#f6f6f8`): Default app canvas behind cards and maps.
- Deep Night (`#111621`): Dark-mode background and high-contrast fallback surfaces.
- Frosted White (`#ffffff` with high opacity): Floating summary cards, bottom sheets, and elevated controls.
- Slate Ink (`#0f172a` to `#64748b` range): Text hierarchy from bold headings to secondary captions.

## 3. Typography Rules
Inter is the core typeface. Headings should be compact and bold, with short line lengths and clear hierarchy. Supporting text should stay legible at small mobile sizes without feeling dense. Labels, badges, and metric captions should feel crisp and utility-driven. The tone is contemporary and friendly, not editorial and not enterprise.

## 4. Component Stylings
* **Buttons:** Rounded to pill or softly rounded rectangle shapes. Primary buttons use Safety Blue. Secondary and utility buttons sit on pale slate surfaces with subtle borders.
* **Cards and Containers:** Large corner radius, bright surfaces, and soft shadows. Floating cards should feel lightly docked above the map or navigation rather than heavy and modal.
* **Inputs and Search:** Wide pill-like search bars with soft slate backgrounds, left-aligned icons, and minimal border treatment.
* **Map Controls:** Compact floating controls with white surfaces, soft shadows, and strong icon contrast.
* **Markers:** Simple, legible, color-coded markers. Prefer community-oriented semantics like report, route, safe hub, and local signal.
* **Bottom Navigation:** Stable, easy to scan, with a stronger center action for safe return. Avoid oversized chrome that steals space from the map.

## 5. Layout Principles
Design for a narrow mobile frame around `390 x 884`. Keep the map as the visual anchor on the home screen. Floating UI should layer above the map with clear depth but restrained motion. Use generous horizontal padding, keep cards low on the screen when they complement the map, and avoid stacking too many dense rows before the main content. The app should feel vertically balanced: short header, dominant content, steady bottom navigation.

## 6. Design System Notes for Stitch Generation
- Platform: Mobile web app
- Device: Narrow mobile canvas, iPhone-style proportions
- Theme: Light-first, calm, trustworthy, neighborhood-focused
- Background: Soft gray app canvas with bright white elevated surfaces
- Primary Accent: Safety Blue (`#2764e7`)
- Secondary Accent: Emerald (`#10b981`)
- Warning Accent: Amber (`#f59e0b`)
- Danger Accent: Red (`#ef4444`)
- Typography: Inter-like modern sans serif with bold compact headers
- Surfaces: Large radius cards, soft blur when floating, whisper-light shadows
- Interaction Style: Practical and reassuring, not flashy
- Product Framing: Community-powered safety tool, not a government dashboard
- Keep: Wide map canvas, floating summary card docked low, pill filters, clear bottom nav
- Avoid: Purple neon, enterprise admin patterns, dense tables, surveillance-heavy language, public-open-data framing
