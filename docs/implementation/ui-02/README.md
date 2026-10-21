# Phone UI refresh — video reference

Date: 16 October 2026

## Delivered

The home and lock screens now follow the supplied video's phone presentation: photographic canal wallpaper, compact status indicators, photo/calendar widgets, a four-column app grid, colorful icons, a translucent three-app dock, and a gesture bar. Desktop browsers show a rounded device frame; compact mobile viewports use the available screen width.

The lock screen supports an explicit button and upward swipe. Home supports page buttons and horizontal swipes. Existing app destinations and Archive unlocking remain connected. Messages has a large inbox title, search, a compact conversation header, and revised light/dark bubbles. Maya's Bulletin conversation has a compact channel header. Player replies still require Send.

An observed Messages display defect was also corrected: fixture conversation views, previews and search now exclude Bulletin messages. This is a presentation filter, not a redesign of the story event engine.

## Reference and artwork

- Supplied video: `C:/Users/faris_7v6emz4/Downloads/Telegram Desktop/video_2026-10-16_14-58-35.mp4`.
- Inspected home frames at 296–298 seconds, lock screen near 307 seconds, and chat frames. Extracted frames under `qa/ui-02/reference/` are inspection material only.
- Wallpaper: `public/greyhaven-phone-wallpaper.png`, original fictional Greyhaven artwork generated with the built-in image generation tool. [Exact prompt, asset dimensions and SHA-256](../../../qa/ui-02/wallpaper-generation.md).
- App icons are SVG/CSS artwork. Signal and battery graphics are fictional decoration, not hardware readings.

## Changed implementation

- `src/App.tsx`: lock screen, shell surface and stylesheet integration.
- `src/ui/HomeScreen.tsx`, `PhoneShell.tsx`, `LockScreen.tsx`, `AppIcon.tsx`, `phone-polish.css`: phone presentation and interactions.
- `src/ui/Messenger.tsx`, `BulletinSlice.tsx`, `UtilityApps.tsx`: app presentation, channel filtering and consistent story date.
- `public/greyhaven-phone-wallpaper.png`: shared wallpaper.
- Existing E2E selectors and screenshot capture settings updated; `phone-polish.spec.ts` and `ui02.spec.ts` add targeted regression coverage.

No narrative manuscripts, story-engine transitions, save schema, migration code or legacy files were changed for this refresh. Browser tests use isolated test profiles rather than the owner's existing save.

## Verification actually executed

| Command | Result |
| --- | --- |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm test` | 12/12 tests PASS, 3 files; final rerun passed |
| `npm run build` | PASS |
| `npm run test:e2e` | 13/13 tests PASS in Chrome |

Coverage includes explicit Send, reload persistence, existing opening story routes, app navigation, lock/unlock without losing a pinned observation, channel display isolation, light/dark chat, and layout checks. Viewports checked include 320×568, 390×844 and 1280×900. Screenshot review led to corrections for calendar clipping, small-screen notification fit, notification contrast and the Contacts icon.

Vite/Chrome child processes were blocked by the execution sandbox on initial attempts (`spawn EPERM`); authorized reruns outside that restriction passed. An obsolete test expecting the removed greeting was updated to the accessible Home landmark before the final browser run.

## Captured browser evidence

- [Home, 390×844](../../../qa/ui-02/home-390x844.png)
- [Lock screen, 390×844](../../../qa/ui-02/lock-390x844.png)
- [Home page 2](../../../qa/ui-02/home-page2-390x844.png)
- [Small phone, 320×568](../../../qa/ui-02/home-320x568.png)
- [Desktop device frame](../../../qa/ui-02/home-1280x900.png)
- [Messages inbox](../../../qa/ui-01/inbox-390x844.png)
- [Maya's Bulletin chat](../../../qa/phase-03a/maya-chat-390x844.png)

## Limits

These are browser checks, not physical Android or iOS Safari acceptance. Real mobile keyboard behavior, native system bars and device performance still require physical-device testing. No APK or public deployment was produced. Story coverage remains the existing opening vertical slice; this UI task does not complete Episode 01 or Gate B. Visual quality is presented for owner review, without assigning an unmeasured 10/10 score.
