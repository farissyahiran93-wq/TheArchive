# Chapter 1 phone and social overhaul — implementation audit

20 October 2026. This is a progress report, not Episode 01 release acceptance. The attached master prompt requests a complete replacement of the existing Bulletin-led middle. That larger redesign is still incomplete; the playable changes below are connected to the actual runtime.

## Implemented runtime sequence for new saves

1. Sophie sends the existing first private messages. The player selects a reply and presses **Send**.
2. Sophie asks permission before adding the player to FIND DANIEL. The player can delay once without starting the group; the invitation persists through refresh.
3. Sophie adds the player. Maya questions the introduction and Lucas challenges the outsider. The group is stored in `prologue.social` with members, transcript, queued messages and stable `OPEN-GROUP-*` IDs.
4. The player sends one of five first replies: calm, confused, defensive, skeptical or direct. The responses and relationship effects differ.
5. The player sends one of three conflict replies: apology, boundary or challenge. Reactions differ. Lucas leaves, then Sophie leaves in separate saved events. Departed members do not send further group messages.
6. Sophie privately apologizes and offers the page Daniel left. The player sends one of three replies before the handwritten note is delivered. The existing note, recovery consent, read-only mirror, 14/13 deduction and Sophie disclosure then continue unchanged into the existing S02–S30 route.

The group exchange contains no mirror fact or protected evidence. Maya and Lucas do not automatically gain the player's recovered knowledge. The group history remains readable in Messages after the departures. The phone's Home button now works during the prologue; Sophie can be resumed from Messages. Before the prologue finishes, Bulletin shows only a public landing page, so its case engine cannot be advanced early.

Sophie's in-group statement that Daniel gave her the number is recorded as a **claim** heard by Maya and Lucas, with `OPEN-GROUP-SOPHIE-1:maya` and `OPEN-GROUP-SOPHIE-1:lucas` receipts. It conveys no mirror contents, authenticated identity or later public-record conclusion. Group invitation and second private contact create persisted notifications; reading the relevant thread clears its unread badge.

## Settings and phone changes

- **Restart Story** has a cancelable confirmation and an Export Backup action. Confirmation writes a fresh reboot save through the existing IndexedDB compare-and-swap path. It clears story progress, dialogue, choices, relationships, evidence, notifications, group membership and player identity, then returns to lock/setup. Reduce Motion, Appearance, audio preferences and personal notes remain. The legacy `the-archive:game-save:v1` key and unrelated browser storage are untouched.
- Sound Effects and Background Music are separate persistent preferences. After a user gesture, a single Web Audio context plays a quiet local atmospheric tone and notification chimes for newly delivered story messages. The switches control actual playback; no external audio asset or network request is used.
- The ordinary `GREYHAVEN PHONE` header was removed from utility apps. The development test channel and playtime metrics require `?devtools=1` on a development build; production does not expose them. Public Contacts lists Sophie after introduction and Maya only after their separate Messages connection. Photos shows the wallpaper, Sophie's retained note, and the older public Bulletin crop after E001 is discovered. Daniel's recovered Gallery remains in the separate mirror.

## Save continuation policy

New saves use opening dialogue version 3. Existing reboot saves with version 2 or the original opening fields continue their stored route. They are not assigned a fabricated FIND DANIEL transcript or altered relationship values. No legacy localStorage key is imported, overwritten or deleted. This follows the repository's AGENTS.md rule even though the master prompt asks for migration of older opening sequences.

## Open design and acceptance gaps

| Item | Status | Reason |
| --- | --- | --- |
| Fresh Sophie → group conflict/departures → second private message → recovered device | PASS | New `OPEN-GROUP-*` events and persisted state; browser and unit checks are listed below |
| All 30 existing canonical scene IDs and four optional passwords | PASS | No old scene or lock definition was removed; the final 46-test browser suite and 180 unit tests passed |
| Post-recovery Lucas/Eli/Nora private arcs | FAIL | Not implemented. Their new dialogue, contact reasons and knowledge limits require canon review. Eli/Nora are not currently introduced by the verified Chapter 1 runtime. |
| Organic FIND DANIEL reactivation | FAIL | Not implemented. Rejoining after Lucas/Sophie leave needs an in-world trigger and a recipient-specific path for public evidence. An anonymous Bulletin tip cannot silently identify the player to the group. |
| Conversation-driven replacement of Bulletin S02–S30 prompts | FAIL | Not implemented. The existing case puzzle and progression engine still drives those scenes. Removing its buttons without alternative source/evidence actions would strand existing saves. |
| Fully native navigation and notifications | FAIL | Home, Messages, Contacts, Photos and Settings are accessible early; several case handoff buttons, Bulletin prompts and limited notification badges remain. |
| Distinct typing duration and optional natural chat for every character | FAIL | Opening messages are scheduled and resumable; broader character-specific pacing and conversations remain. |
| Author-approved Story Bible v2 and revised Maya chronology crosswalk | BLOCKED | Story Bible v2 was not supplied; the existing scene bible places Maya's introduction after mirror access, while the newer master prompt requires the initial group before it. The conflicting chronology is recorded below for author resolution. |
| Independent code, design and canon approval | NOT TESTED | The Playwright process escalation was approved and the suite ran; this was permission to execute tests, not a code or narrative review. No independent reviewer decision was available for this local non-Git workspace. |
| Signed release and physical Android UX | NOT TESTED | No release signing or device evidence was produced. |
| Human narrative acceptance | NOT TESTED | No author-approved Story Bible v2 or human playtest acceptance evidence was available. |

The older scene bible places Maya's first introduction after Daniel's mirror. The attached master prompt explicitly moves her initial meeting into FIND DANIEL before recovery. This implementation follows that later direction for new saves only; the older document's crosswalk now needs author revision. No Story Bible v2 was available in the workspace, so chronology and voice beyond the newly scripted group exchange have not been silently declared final.

The directory is not a Git repository (`git status` reports “not a git repository”), so no separate branch could be created. No production deployment occurred.

## Verification

- `npm run typecheck`: PASS.
- `npm run lint`: PASS.
- `npm test`: PASS, 180 tests after the social, restart and discovered-photo checks were added.
- `npm run build`: PASS; Vite reports the existing advisory for a bundle over 500 kB.
- `npm run test:e2e -- --reporter=line`: PASS, 46/46 Playwright browser tests (4.8 minutes) on the final synchronized source. This includes the new social opening, notification/photo/settings reset route, existing S30 route, Maps, password locks, save/resume and mirror coverage. Passing the existing suite does not validate the unimplemented post-recovery social overhaul.
- `npm run cap:sync`: PASS; the current production web assets were copied into Android.
- `./scripts/build-android-debug.ps1 -Offline`: PASS (`BUILD SUCCESSFUL in 22s`) using the project-scoped `.gradle-user-home`. The SDK reported a non-fatal analytics-settings access warning for the user `.android` directory; this did not block packaging. Debug APK: `android/app/build/outputs/apk/debug/app-debug.apk` (16,801,307 bytes), SHA-256 `A16EF9C84BD6DD925F69150CD1D06D571017D90A538B02C0BEBAAA8A1A678E71`.
- Android physical-device UAT: NOT TESTED. Signed release: NOT TESTED. Complete Chapter 1 narrative acceptance: FAIL against the attached master prompt because later private arcs, organic group reactivation and replacement of Bulletin-led progression remain absent.

The prepared [Android device worksheet](PHASE_06G_ANDROID_UAT_CHECKLIST.md) still applies. With Android platform tools installed and USB debugging enabled, install this debug package from the project root with `adb install -r android/app/build/outputs/apk/debug/app-debug.apk`. This command has not been run against a physical device in this task; it is an installation instruction, not UAT evidence.

Human review remains pending. The reviewer should verify that Sophie's explanation for the number and the early Maya/Lucas group introduction fit the approved story bible; that each group member only receives messages delivered while present; that the second Sophie conversation justifies the recovered-device event without authenticating its sender; that all S02–S30 alternatives preserve source and recipient limits; and that the phone's remaining Bulletin handoffs feel like in-world actions. Device testers should use the linked worksheet and record model, Android version, installed APK hash, route, observed result and any failure.

## Principal changed files

- `src/content/socialOpening.ts`: authored group and second private dialogue, with stable choice IDs.
- `src/game/opening.ts`, `types.ts`, `engine.ts`, `store.ts`: pure social progression, persisted member list, event delivery, recipient receipts, save validation and guarded restart.
- `src/ui/OpeningPrologue.tsx`, `Messenger.tsx`, `SophieConversation.tsx`, `App.tsx`: group and private Messages presentation, early Home access, notifications and native navigation.
- `src/ui/UtilityApps.tsx`, `settings-polish.css`, `usePhoneAudio.ts`, `CaseNavigation.tsx`: Settings, actual audio control, Contacts and discovered Photos.
- `tests/e2e/social-opening.spec.ts`, `phone-settings.spec.ts`, `opening-helper.ts` and existing route specs: UI/resume coverage. Unit additions cover group branching, old-save continuation, reset isolation, recipient receipts and photo discovery.
