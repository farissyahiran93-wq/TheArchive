# Phone interaction correction — 21 October 2026

Owner direction: fix phone UI, notification delivery and flow now; substantial new conversation writing is deferred. Use the supplied Duskwood recordings, screenshots and APK as interaction references while keeping The Archive's own interface and character artwork.

## Implemented

- Normal Home has no Search or Bulletin tile/dock entry. Search's visible “FICTIONAL GREYHAVEN” header was removed. The development legacy regression entrance retains its old public-source apps; they are not reintroduced into normal play.
- Photos does not derive images from legacy E001/Bulletin evidence. It contains the wallpaper and the later note only once that note has actually been retained. Old evidence stays in the save; hiding a gallery tile does not delete its source record.
- The early first-page teaser and its “Photo · first page” label are removed from new play and preserved conversation views. The canonical later recovery note remains. No recovery password or knowledge requirement was bypassed.
- Notifications render in the phone shell, outside app content, below the status area and above every app, including image viewers. They include delivered Sophie, group, other NPC and Relay messages, plus group invitations/connection alerts. No player reply or undelivered queue line is projected as an incoming notification.
- Banners slide in, expire after five seconds, open the associated conversation/app on tap or keyboard activation, and dismiss by X, upward swipe or sideways swipe. Dismissing does not mark a conversation read, grant knowledge or navigate. Consecutive deliveries to the same thread update its banner rather than creating a long backlog. Hydrating an old save does not replay its complete notification history.
- Chat and group headers align back control, avatar and title on the left. Identified NPC messages have avatars; unknown identities retain their anonymous fallback. Typing displays the relevant avatar and animated dots without visible “Name is typing” text. Screen readers retain an accessible typing status.
- A green dot indicates online Sophie presence in the inbox/header. Online/offline presentation derives from scheduled activity and current reply gates, not a React-driven narrative transition. Offline state appears as a status in the chat; idle “Waiting for a reply” and “No one is writing…” footer text is removed from active conversations.
- Visible scrollbars are hidden while touch, wheel, keyboard and programmatic scrolling remain available. Readers can stay on older messages and use the existing latest-message control.
- The note attachment sits inside Sophie's incoming message row. The shared image viewer fills the phone, has an X close control, explicit zoom controls, double-tap zoom, pinch zoom and panning when zoomed. It restores focus on close and traps keyboard focus inside the viewer. Viewing does not itself retain or disclose evidence.
- Outgoing bubbles use a muted teal treatment alongside the current Archive visual language rather than reproducing the whole iMessage interface.
- Before the group starts, the player can ask the remaining existing Sophie questions and must explicitly select/send the group-consent response. Group creation no longer starts automatically after a single answer. The existing content is reused; this is a flow gate, not a claim to have authored the future long conversation.
- NPC delivery pacing now gives short messages a larger minimum reading interval and scales with message length. The initial group queue uses the same cumulative actor-aware timing instead of evenly spaced 3.1-second messages. Saved queues retain their existing IDs/deadlines; no save is reset.

## APK inspection

Read-only static inspection of the supplied 187,434,123-byte APK found 726 ZIP entries, Unity data and IL2CPP metadata, and ARM64 native libraries. Selected names include `CalculateTypingTime`, `GetTypingTime`, `IncognitoPartnerTypingBubble`, `FirstCharIsOnline`, `OnOnlineTimeReceived`, `PopupNotification`, `ToastNotification` and nested scroll components.

These names support using separate presentation for typing, presence and notifications. The exact banner position, gesture design, avatar placement and image behaviour are informed by the supplied visual references and the owner's explicit request. Metadata names alone do not establish Duskwood's exact implementation, timing rules or runtime behaviour. The APK was not installed or executed, and no APK code, scripts, portraits or media were imported into the game.

Reproducible inventory: `scripts/inspect-reference-apk.py`. SHA-256, selected identifiers and boot configuration: `artifacts/phone-interaction/duskwood-apk-inspection.json`.

## Verification

- Typecheck, lint, 203 unit/component tests and production build pass. The existing bundle-size advisory remains.
- Seven focused browser tests passed, including group banners over another app, swipe dismiss, correct thread routing, full-size image zoom, attachment ownership, hidden scrollbar, avatar typing and earlier opening compatibility.
- Full browser regression: **57/58 passed** in 5.3 minutes. The sole failure was a Windows `UNKNOWN` error writing the existing `qa/phase-06f-public-comparison.png` screenshot, after all assertions in that test had passed. The test now writes a unique `test.info().outputPath` file instead of overwriting that shared screenshot.
- Final focused verification: **4/4 passed** on a separate test server, covering animated group banners, swipe dismissal/routing, full-screen photo zoom, avatar typing/online-offline presentation and the corrected screenshot test. All 58 scenarios have passed across the full and focused runs; this is not reported as a clean 58-test full run.
- Visual inspection: `qa/phone-interaction/group-banner.png`, `avatar-typing.png`, `full-photo.png`.
- These are in-game phone banners. Android system notifications when the app is backgrounded are not implemented by this pass, and no operating-system permission is requested.
- Human dialogue writing and device-based native touch playtesting remain separate follow-up work. Browser automation verifies pointer swipes and zoom controls; native multi-touch pinch is implemented but has not been manually verified on an Android handset.
