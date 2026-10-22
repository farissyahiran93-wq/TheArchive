# Chapter 2 — The People He Left Behind: Access Arc

Update, 22 October 2026: the owner's later **Life in Fragments** specification expands Scenes 06/07 to twelve mirror apps and authorizes immediate recovery in development preview. The original Unknown branching screenplay and group readiness dialogue remain unchanged. See [Daniel Life in Fragments](DANIEL_LIFE_IN_FRAGMENTS.md) for the new mail prerequisite, testing exception, source limits and latest **82/82** browser regression results. The sections below document the original access-arc delivery.

Owner source: `af88b171-7b91-4ef7-8610-c6bcfb5278e0/Pasted text.txt`, Access Arc v1.0, supplied 22 October 2026. This authorizes C2_ACCESS_001–008 after Chapter 1 Scene 03. Earlier Chapter 2 proposals remain unchanged; this is a separately scoped implementation of the new supplied screenplay.

## Story connection and authored dialogue

The original Sophie script and final “Goodnight :)” remain unchanged. After its actual completion and Lucas's completed departure, a persisted deadline delivers Unknown's first line after seven seconds. Home, Contacts, Archive and Messages can receive the ordinary shell-level notification. Opening the thread is manual; notifications never choose a player response.

`scripts/import-chapter2-access.py` extracts the supplied Unknown dialogue, branch reactions, nested choices, conditional reference and group readiness lines into `src/content/chapter2Access.ts`. The graph contains 148 nodes. All nine main conversational gates (U01–U06, U06B, U07_ACK and U08), nested follow-ups, package questions and U07 interface decisions retain the supplied text. The explicit three-option choices in this newer screenplay supersede the four-option rule specific to the Chapter 1 screenplay; no fourth response is invented.

`src/game/chapter2Access.ts` owns pure transitions in the optional schema-v1 `chapter2Access` extension. Scene stages map to pending/unknown (001–002), package/declined/accepted (003), offline/installing (004), installed/passive relay (005), mirror (006), recovery (007), and ready (008). Stable `C2-UNKNOWN-*`, `C2-PLAYER-*`, installation, inspection, recovery and `C2-GROUP-*` event IDs prevent duplicate delivery across reload. Existing Chapter 1 state and group history are retained, with Chapter 2's readiness messages rendered after the same group history.

## Consent, access and message delivery

Every scripted player bubble is behind selection and Send. Package acceptance additionally requires INSTALL EXTENSION in a confirmation dialog; Cancel installs nothing. Rejection records the supplied refusal and replies, then leaves normal navigation usable. The declined package is inspectable only by a manual action and can later be accepted without a new Unknown reply. Asked package questions are disabled as repeats, with their original replies retained in the thread.

Installation waits for the final Unknown exchange, performs one 1.8-second shell takeover, enables the dataset and Messages integration, then returns Home. The Unknown thread remains searchable. Its optional failed player reply requires Send, produces one delivery failure, and creates no successful recipient receipt. The integration is a subdued Messages indicator and sheet, not another Home app. Relay remains false/STANDBY throughout this arc; no secret conversations or live interception are generated.

## Knowledge and source limits

Unknown's statements receive `unknown-claim` receipts. They do not authenticate provenance, reveal identity, prove Daniel's location, or populate any NPC's private knowledge. In particular, the supplied “Daniel contacted you” assertion is retained as Unknown's unverified claim; it does not rewrite Chapter 1's contact-list account. The conditional 7-14 text uses the existing `N01.literal-7-14` receipt; without it, only the supplied screenshot alternative is delivered.

The new MIRROR/02 catalog in `src/content/chapter2AccessMirror.ts` contains only this arc's ten authored message/mail/note/media entries, not the legacy forensic discovery catalog. Viewing entries records unverified private inspection receipts, never K01/K02/R04 or another character's knowledge. All apps and Recently Deleted are available in any order. Search covers only this supplied indexed content. Outgoing calls, impersonation and modification of Daniel's records are unavailable.

The source names an ordinary indoor IMG_0419 but supplies no pixels for it. Its detail honestly reports the unavailable image. No wallpaper, forensic prop or unrelated existing Gallery image is substituted. The supplied unavailable IMG_0418, mail content and attachment references also remain unavailable. A suitable owner-provided IMG_0419 asset can be connected later without changing the story or knowledge rules.

## Recovery and final boundary

START RECOVERY opens a second confirmation with NOT NOW. Confirmation persists `startedAt` and exactly `dueAt = startedAt + 1,500,000 ms`; repeated taps and reload do not reset or accelerate it. The visible timer reconstructs from that deadline while other apps remain usable. At the deadline, the interface reports elapsed estimation/awaiting review; no deleted contents or completion story are manufactured.

Eighteen seconds after the first successful recovery start, Maya's group message arrives independently of the private dataset activity. Twelve authored readiness messages deliver individually, with per-actor typing and portraits. Lucas, Eli, Sophie and Nora participate without being told about the mirror. The saved completion flag is set only after the group has been opened and all readiness lines received. The last message is Maya's “Can we start?”. There is no player Send, automatic disclosure, next discussion or recovered-content reveal at this boundary.

## Validation

Coverage includes the seven-second notification from four app contexts, all conversational branches and nested Send gates, optional package questions, rejection/reopening, cancelled and confirmed installation, one takeover, relay standby, unverified receipts, mirror access order, persistent 25-minute deadline, and exactly one group readiness sequence. Browser tests exercise the full consent/recovery route at 320px and save/reload boundaries. No real-device OS-kill or forced operating-system-clock manipulation certification is claimed.

Executed on 22 October 2026:

- `npm run typecheck`: passed.
- `npm run lint`: passed without warnings.
- `npm test -- --maxWorkers=4`: **28 files / 507 tests passed**, including 43 new access-arc cases.
- `npm run build`: passed. Existing bundle-size advisory remains: main JavaScript **758.97 kB**, **218.20 kB gzip**.
- Focused browser run: **6 passed** (36.8 seconds), under `artifacts/chapter2-access/focused`. The full 320px consent/recovery/group test also passed in the subsequent complete regression run; its readiness screenshot includes the preserved avatars and online dots.
- The existing Scene 03 browser assertion now checks the newly authorized inactive Archive shell after the unchanged ending, and verifies its PHONE MIRROR action remains unavailable before consent.
- Full fixed-code browser regression: **73 passed / 3 failed** (6.0 minutes), under `artifacts/chapter2-access/verified-full-browser-results`. All six Chapter 2 cases and the complete Chapter 1 narrative route passed. The three failures were test-infrastructure issues: direct IndexedDB fixture replacement racing registration saves, a running fake clock consuming a handoff assertion deadline, and two tests targeting the same Windows screenshot file.
- Those test fixtures now wait for committed registration writes, explicitly pause the handoff test clock, and isolate screenshots with `test.info().outputPath`. All three affected cases were rerun **three times each: 9 passed** (1.3 minutes), under `artifacts/chapter2-access/stabilized-regressions`. Thus all 76 distinct browser cases have passed against the final application code across the full run and targeted reruns; a single uninterrupted 76/76 full-suite pass is not claimed.
- An earlier browser run overlapped source-file reorganization and was invalidated by development-server reloads (70 passed / 6 interrupted failures); it is retained under `artifacts/chapter2-access/full-browser-results`, not used as final regression evidence.
- Final typecheck and lint also passed after the fixture fixes. No application code changed during the fixed-code full regression or its targeted reruns. The 320px readiness image was visually inspected for preserved avatars, online dots, readable header and the absence of a player composer after the authored ending.
