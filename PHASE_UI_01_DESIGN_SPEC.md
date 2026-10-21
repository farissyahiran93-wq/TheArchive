# Phase UI-01 design specification — Greyhaven Phone

**Scope:** original responsive presentation over the unchanged Phase 00 fixture/story engine. The six supplied screenshots were reviewed as mood and interaction references only; no pictured people, messages, icons, brands, overlays or photos were imported. No video files were provided or inspected. The original vector [Greyhaven canal wallpaper](public/greyhaven-wallpaper.svg) is authored for this reboot.

## Visual language

| Token | Light | Dark | Use |
|---|---|---|---|
| Canvas | `#f5f3f8` | `#081c2c` | Phone and messenger background |
| Surface / raised | `#fff` / `#f8f7fb` | `#13293e` / `#1a344c` | Cards, inbox and composer |
| Text / muted | `#202736` / `#667081` | `#f2f6f8` / `#aec0d1` | Main and secondary copy |
| Divider | `#dedfe7` | `#31495e` | Rows and sections |
| Accent / button | `#6759aa` | `#5595ff` / `#286bd4` | Links, focus context and white-text actions |
| Incoming / outgoing | `#e9e9ef` / `#6b5caf` | `#263d55` / `#2a70de` | One-to-one bubbles; outgoing text white |

System font stack `system-ui, -apple-system, "Segoe UI"`; no downloaded Apple font. Chat text is 15px with 1.38 line height; UI detail runs 10–14px with labels kept readable. Cards have 12–21px radii and restrained shadows; app icons use Lucide glyphs with original gradients. Motion is limited to 200ms icon feedback and short typing dots, disabled by Reduce Motion. Controls are at least roughly 44×44 CSS pixels and have visible focus outlines. Contrast calculated for white/outgoing: light 5.56:1, dark 4.70:1; light incoming 12.36:1; dark incoming 10.27:1. Actual accessibility UAT remains pending.

## Architecture and navigation

`App.tsx` only selects boot/setup/home/app and schedules due **engine** events. `ui/PhoneShell.tsx` owns viewport/safe-area treatment and web-only simulated chrome. It hides the simulated status/home bar when Capacitor reports a native platform; Android status/navigation bar integration still needs real-device validation. `ui/HomeScreen.tsx` has two horizontally swipable pages, two clickable widgets, a four-column app grid, dock and page buttons. A horizontal swipe requires >65px movement exceeding vertical movement by 1.5×; vertical scrolling remains available. Apps open full viewport, and headers/Home control return without losing saved fixture messages. Archive is absent until the existing knowledge gate would grant invitation; Mail is not shown before an authored share. Appearance cannot grant access.

`ui/Messenger.tsx` renders an inbox and one fixture conversation from `GameSave.messages`. This fixture is explicitly labelled non-canonical; no case facts or other screenshot-story content were added. The chat header, grouped bubbles, date separators, timestamps, delivery/read labels, state-backed typing indicator, selected-choice composer and New Messages jump are presentation components around existing stable message/event IDs. The reply search field filters authored choices; it does **not** send arbitrary typed text. Only explicit **Send** calls the existing game action. NPC timing comes from `pendingEvents`; App schedules the next due engine tick rather than a permanent 160ms UI poll. Message read status is set when the conversation is at the bottom. Existing events remain idempotent.

`ui/UtilityApps.tsx` harmonizes fictional Search/Maps fixtures and available Calls, Contacts, Bulletin, Files, Photos, Alerts, Calendar, Notes and Settings. Calendar displays the local preview month; Notes are plain personal local notes, never evidence or a narrative receipt. Settings persists appearance under `the-archive-reboot:appearance:v1` separately from the existing IndexedDB game save. Reduce Motion continues to use the existing game setting. The legacy `the-archive:game-save:v1` key is neither read nor written.

## Responsive and accessibility rules

- The phone fills a real mobile viewport via `visualViewport` height and flex `min-height:0`; chat alone scrolls between sticky header and composer. Focused reply input remains visible in a resized viewport. Physical Android IME behavior is still **NOT TESTED**.
- CSS safe-area insets are applied to web chrome and native root. Native shell hides simulated bars to avoid double chrome; Capacitor/Android hardware behavior is unverified.
- Bubbles use alignment and color, never color alone to identify sender. Date/time labels and read states are text. A new NPC message pins to bottom only while already near bottom; otherwise it preserves position and offers a jump button.
- Search/Maps contain only local fictional fixtures. There are no real sensor, contact, SMS, phone, camera, account or surveillance requests.
- Reduced motion follows the saved toggle; a system appearance choice follows `prefers-color-scheme`. No fake sound/notification toggles are shown.

## Authoring handoff

Future episodes should supply messages, recipients, delivery state, due events, app visibility and permissions through the game engine/content contracts. UI components should receive those state objects; no component should infer knowledge from theme, icon or wallpaper. Designers can replace [the SVG wallpaper](public/greyhaven-wallpaper.svg), adjust CSS custom properties in [App.css](src/App.css), or revise the icon registry in [phone.ts](src/content/phone.ts) without changing the save schema. A future multi-thread inbox needs an authored thread/recipient schema, not fabricated content in this UI layer.
