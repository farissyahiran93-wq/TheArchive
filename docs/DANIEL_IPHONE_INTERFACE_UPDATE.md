# Daniel phone interface — 21 October 2026

The supplied video informed the phone presentation: a wallpaper home screen with widgets and a translucent dock, ordinary app navigation, uncluttered conversations, and image-first viewing. Reference video content was not imported into the story.

## Player-visible changes

- Home uses the existing decorative Greyhaven wallpaper, a calendar widget using the established 8 October date, and app icons. Gallery, Email and Calls display as Photos, Mail and Phone.
- Messages shows character avatars and blue/grey conversation bubbles. The snapshot/replies-unavailable box, inline source metadata and always-visible evidence disclaimer/save panel are removed.
- Notes uses a light reading surface. Photos uses an album grid and black image viewer; locked albums do not request their thumbnails or full images until individually unlocked.
- More options (`…`) provides explicit Save to Case Board, optional Info and related-item links. The photo viewer has an explicit bookmark action and optional Info. The home screen keeps an explicit Resume action.
- The phone home indicator stays visible while app content scrolls independently.

## Story and state contract

This is a presentation change. Authored record bodies, stable MIR IDs and legacy inspection keys remain intact. Source uncertainty remains available in optional Info and the private Case Board. Saving is explicit, associations stay private, and viewing never authenticates a source or grants NPC knowledge. No game transition, database schema, unlock answer or hint tier was changed. No real phone services or GPS were added.

Original collage crops remain outside runtime. The existing six supplied gallery PNGs and registered character illustrations are reused. The home photo widget is decorative wallpaper, not recovered evidence.

## Validation

- Typecheck, lint, 192 unit tests and production build passed.
- Native phone screenshots at 390×844 and 320×568 are in `qa/iphone-redesign/`.
- Media checks cover all six images, locked-image requests, zoom/reset, image failure/retry, keyboard focus and persistence. Phone checks cover explicit evidence saving, hidden optional tools, narrow layouts and exit/resume navigation.
- E2E uses a selectable `PLAYWRIGHT_PORT` with strict port binding so a running older development server cannot silently substitute for the workspace being tested.
- All 53 E2E scenarios are verified across the full run and targeted reruns: the full run passed 47; three tests hit Windows errors overwriting old screenshot files and three still used old UI labels loaded before their updates. The six affected scenarios passed on rerun using the updated labels and dedicated screenshot directory. The final narrow-screen and exit-navigation checks also passed separately (2/2).
- The existing JavaScript bundle-size warning remains (about 566 kB minified, 167 kB gzip). No deployment or physical iPhone acceptance is claimed.
