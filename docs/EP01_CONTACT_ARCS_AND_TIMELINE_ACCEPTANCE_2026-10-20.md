# Episode 01 contact arcs and timeline — verification record

20 October 2026. This report follows the author's Maya chronology ruling in [`STORY_BIBLE_V2.md`](STORY_BIBLE_V2.md). It describes implemented runtime paths and actual automated coverage; it is not physical-device or signed-release acceptance.

## Implemented

- New v4 saves retain the phone-first Sophie → FIND DANIEL → second private contact → recovered mirror path. Closing that prologue now starts **E01-S02**; hydration repairs a saved v4 prologue that had already closed without an `e01` slice. Older v2/v3 openings continue without invented group history. The legacy localStorage save key is untouched.
- Maya's S11 Bulletin reply recalls the v4 group encounter. Her first reciprocal group exchange applies the contact baseline once; the Bulletin reply preserves relationship changes already made in the group. The old first-introduction line remains for earlier saves.
- After K01 and the public editor-channel check, Maya offers a bounded case-contact referral through the already authorized channel: Bulletin return token by default, or Messages if separately accepted. Lucas is known from the old group; Eli and Nora become available after Lucas's two-way private reply. Each individual thread has three explicit player choices and paced replies. Public Bus 4 questions gain recipient-specific receipts; no private mirror file is auto-shared.
- Maya proposes reconvening FIND DANIEL after a Lucas private answer. The player can defer or send public-only consent. Lucas rejoins through a persisted system event before sending a group message. Sophie is not silently added back, and the original group transcript, creator, dates and departures remain.
- New and existing NPC pending events use one scheduled tick ordered by due time. The opening, Bulletin and added character arcs use durable timestamps and stable IDs. Expired v4 NPC backlog is spaced after resume. Maya's longer S11 responses now arrive bubble by bubble. Message length, actor and urgency/reflection context affect bounded delay.

## Actual changed files

`src/content/characterFollowups.ts`, `src/game/characterFollowups.ts`, `src/ui/CharacterFollowupChat.tsx` add the three private contacts and group return. `src/game/opening.ts`, `slice.ts`, `engine.ts`, `store.ts`, `npcDelivery.ts`, `types.ts` connect chronology, event scheduling, relationship receipts, persistence and the S02 transition. `src/ui/Messenger.tsx`, `OpeningV4Chat.tsx`, `UtilityApps.tsx`, `CaseNavigation.tsx`, `BulletinSlice.tsx`, `src/App.tsx` expose the saved threads, Contacts, Bulletin referral, notifications and reply actions. `src/game/characterFollowups.test.ts`, `mayaCanon.test.ts`, `openingV4.test.ts`, `tests/e2e/character-followups.spec.ts`, `v4-s30.spec.ts` add verification. `src/game/episode01Presentation.test.tsx` updates the navigation fixture. The Maya S11 first line is changed only for v4 delivery; existing source text remains for old saves. All E01-S01–S30 identifiers, mirror media and four passwords remain in place.

## Acceptance matrix

| Item | Status | Evidence / limit |
| --- | --- | --- |
| Maya new-game chronology and old-save preservation | PASS | New group-first and old-line unit assertions; v4 and legacy browser routes. |
| Lucas, Eli and Nora optional private exchanges | PASS | Pure event/idempotency tests and a browser run exercising all three two-way threads with Send. Other individual reply wording branches have unit-level guards but were not each played through the full browser UI. |
| FIND DANIEL return | PASS | Browser verifies Maya proposal, defer, explicit consent, one Lucas rejoin after reload; pure tests verify membership and no duplicate event. |
| Bulletin referral without Messages consent | PASS | Browser verifies Maya's referral in the authorized Bulletin return channel and absence of an unauthorized Maya Messages thread. |
| Fresh v4 start through S30 | PASS | `tests/e2e/v4-s30.spec.ts` walks the actual phone-first opening, recovered mirror, public investigation, GCRO check and S30. It caught and led to a fix for the missing S02 initialization. This is one cautious/public route, not exhaustive cross-product coverage. |
| All 30 scene IDs and existing source gates | PASS | Unchanged canonical IDs; full browser regression includes S30 alternatives, recovery states, mirror and locked-item checks. |
| Fully unified pacing across every NPC turn in all 30 scenes | FAIL | A shared durable tick orders scheduled v4 events and prevents resume bursts. Static scene narration and every possible group overlap are not converted into a single typed delivery queue; overlap/interruptions across all 30 scenes lack full automated coverage. |
| Physical Android acceptance | NOT TESTED | No physical device interaction was performed. |
| Author voice/canon review of new referral and contact dialogue | NOT TESTED | The Maya chronology is expressly approved by the prompt; the new minimal dialogue still needs author review. |
| Signed production release | NOT TESTED | Only a debug APK is built. |

The 2026 voice guide identifies Eli Ward as female and treats `E—I` as damaged text, not her identity. The new exchange preserves that limit. Nora separates source, interpretation and conclusion and does not disclose a private identity. Lucas's skepticism concerns the source crop, not presumed guilt. The new social events do not award K01, K02 or R04 and do not block the established public S30 path. The four-password and S30 regression results establish preservation, not a physical-device acceptance verdict.

## Final test results and Android artifact

| Command | Status | Actual result |
| --- | --- | --- |
| `npm run typecheck` | PASS | TypeScript build completed. |
| `npm run lint` | PASS | oxlint completed. |
| `npm test -- --run` | PASS | 20 files, **192/192 tests**. |
| `npm run build` | PASS | Production bundle built; Vite emitted a non-fatal >500 kB chunk advisory. |
| `npm run test:e2e -- --reporter=line` | PASS | **52/52 Playwright tests** in 4.8 minutes, including the fresh v4-to-S30 and no-consent Bulletin routes. |
| `npm run cap:sync` | PASS | Production assets copied into Android. |
| `./scripts/build-android-debug.ps1 -Offline` | PASS | `BUILD SUCCESSFUL in 17s`. |
| Physical Android device UAT | NOT TESTED | No installation or device interaction evidence. |
| Signed release | NOT TESTED | Only a debug package exists. |

Debug APK: `android/app/build/outputs/apk/debug/app-debug.apk`, 16,813,648 bytes, SHA-256 `A2B6F1174239D8C6DA48249A737800DCFAC1D93769A4CD596CF13FA7970BD5AD`. Installation, once a device is available: `adb install -r android/app/build/outputs/apk/debug/app-debug.apk`. Use [`PHASE_06G_ANDROID_UAT_CHECKLIST.md`](PHASE_06G_ANDROID_UAT_CHECKLIST.md) and record model, Android version, APK hash, route and observed result. The Android SDK's user `.android/analytics.settings` warning remains non-fatal; the project-scoped Gradle cache builds without elevation.

Recommendation: the code and one full new-game route are verified, but do **not** mark Episode 01 production-accepted until author voice review, broader branch/overlap pacing validation and physical Android UAT are completed.
