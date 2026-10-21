# Phase 05 human playtest and Android acceptance

Candidate only. Automated browser checks are not physical-device UAT. Record tester, date, device/model, Android version, WebView version, APK SHA-256 and observed failures. Leave these unchecked until a human executes them.

## Narrative and optional sources

- [ ] Fresh local profile starts with Sophie, explicit player Send and read-only recovered-phone consent.
- [ ] Complete all canonical S01-S30 scenes on social and quiet paths; no Episode 02, culprit or fate reveal.
- [ ] Decline optional locks and finish S30. Then revisit all four independent password puzzles.
- [ ] Public Gallery has shelf/message. Index fragments has two images, Quay references has notice-board/map. No hidden image preview or body before unlock.
- [ ] Image observation/save/link never authenticates a source, supplies K01/K02/R04 or sends a fact to Sophie/Maya. Index 14/13 and Bus 4 stay separate.
- [ ] Compare the partial timestamp image: it has no June Ellis name, source header or recovered calendar date. Original collage exports are excluded from runtime.
- [ ] Review dialogue pacing and author chronology: Sophie reports three days, public last contact is Oct 4, report Oct 5, brief Oct 7, present Oct 8 2026. Story Bible v2 is absent; do not choose a new date silently.

## Real device touch, keyboard and accessibility

- [ ] Install current debug APK on a physical Android phone; test 320-430px CSS widths, portrait and landscape, cutout/status bar and home indicator.
- [ ] Open all six full images; Fit shows the entire image, zoom reaches 400%, drag/scroll reaches corners, previous/next stays within the album, Back and Escape return correctly.
- [ ] Real Android OS Back behavior, keyboard display/dismissal, password entry, keyboard overlap, 44px touch targets and modal scrolling.
- [ ] Offline cold launch, PNG loading delay, missing-image caption/retry and portrait initial fallback. No real location or contacts permission.
- [ ] TalkBack focus order, dialogue announcements, focus return, image captions, large system fonts and reduced motion.
- [ ] Chat scrolling preserves an older reading position; new-message control returns to latest.

## Save and release

- [ ] Unlock each item separately; wrong password does not erase progress. Retain Gallery observations, force stop, relaunch, Resume and inspect the same saved record.
- [ ] Process kill during a pending write, storage denial/full conditions, existing schema-v1 saves, backup download and independent legacy localStorage key.
- [ ] Measure actual human playtime and comprehension; automated route durations are not human pacing evidence.
- [ ] Author approves remaining chronology and visual source substitutions/conflicts.
- [ ] Signed release APK/AAB, secure signing key, install/upgrade acceptance and store checks. Debug build alone does not satisfy this.
