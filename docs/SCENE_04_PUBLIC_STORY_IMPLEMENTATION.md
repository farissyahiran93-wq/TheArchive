# Scene 04 — The Public Story

Implemented 23–24 October 2026, following the owner's full Scene 04 supplied while the Act I replacement was in progress. Read together with `ACT_I_FINAL_IMPLEMENTATION.md`.

## Sources and content

The original full Markdown and Read Me First are pinned verbatim in `sources/scene04-final/`. `scripts/import-scene04-final.py` compiles them into `src/content/scene04Final.ts`: **16 stable main choice IDs**, **73 branches**, **nine optional premium choices**, every authored NPC reaction and player continuation, plus the complete **six-paragraph** article. C07 is optional; C10/C11 are local Archive selections, with no fabricated player chat bubbles. Author directions and status text are not character dialogue.

The full article has its own `GB-ARTICLE-001` ID, Nora Vance byline and internal `browser://greyhaven-bulletin/article/gb-daniel-mercer-001` route. It is local game content and causes no network requests. Publication date retains **7 October 2026** from the existing public chronology, rather than silently replacing it with the new manuscript's relative “3 days ago.” The authored displayed **Updated: Yesterday** label and matching dialogue are retained as story-relative, unverified page metadata. No claim is made about the date's forensic validity.

The older `CH1-PUBLIC` structural report, its legacy URL, Maya editor article and Bus 4 records remain unchanged for historical saves and the existing later structural preview. The new article does not contain their Bus 4 extract or imply that they are authenticated older versions of GB-ARTICLE-001. Scenes 05–18 still need their own final screenplays and matching source layers; existing structural source associations must not be treated as a newly authored version history of this article.

The only permitted spoken adaptation is Sophie's callback: **“About how hard it is to know what to believe.”**, as explicitly allowed in the source, so she never attributes unchosen advice to the player. Markdown emphasis is rendered as plain words in text bubbles. A generic public Nora byline preview says journalist/Greyhaven Bulletin; it supplies no invented biography, private contact or Scene 07 interview.

## Manual progression and knowledge

1. Scene 03 finishes on the actual Goodnight and offline beat. The existing queue schedules one article lead after an eight-second saved delay. Only the normal Sophie notification is delivered; no chat or Browser opens itself. The delay is ordinary fictional pacing, not an operating-system deadline or new calendar chronology.
2. Manually opening Sophie starts/resumes C01–C02. Her link card persists; NOT NOW leaves the conversation and does not advance. READ ARTICLE opens the simulated Browser.
3. The player reads six paragraphs, may inspect the byline/update label or save the public copy, and explicitly taps MARK AS READ. Scroll and information-panel state persist separately from inspection. RETURN TO SOPHIE starts C03 only after inspection.
4. C03–C06 react to what the public report actually says. One Maya notification is also the first group bubble. The player can skip C07, read it later, leave it unanswered, or resume its exact saved cursor. No Lucas message/member return is created. Returning to Sophie restores the parked mainline choice/remaining delay.
5. After C09 concludes, the local index badge/notification becomes available. One optional second Unknown hint is omitted if the player blocked the number. Reading or answering it is never a gate. No invented sender response or automatic disclosure occurs.
6. The player opens Archive and OPEN INDEX. `ARC-IDX-GB-041` exposes metadata only: source UNKNOWN, author/capture time NOT ESTABLISHED, verified original NO, content preview UNAVAILABLE. There is no missing line, second body, diff or editor identity in this scene.
7. C10 requires an actual local selection. ACKNOWLEDGE LIMITATIONS is a separate action. C11 can save either, both or neither source; none of the four branches blocks continuation. `EV-PUBLIC-GB-001` and `EV-INDEX-GB-041` have distinct attribution and remain `verified:false`.
8. Leaving Archive after C11 queues the one-shot final Sophie check-in. C12–C16 require a manual chat opening and all player Sends. C13 updates Sophie's index-claim knowledge only when the actual qualifying line is sent; Maya, Lucas, Eli and Nora never learn it automatically. The first introduction sentence of C13-A does not award the later detailed claim.
9. Complete only after the final Goodnight/offline and required inspections. Version History is a separate, deliberately clicked Scene 05 entry. No auto-open, auto-contact, verified original, sender identity, culprit or fate is introduced.

When the article lead arrives while the player is already viewing Sophie's finished chat, a compact **Continue conversation →** action provides the same manual opening as her notification/inbox. It sends no player bubble and never auto-starts Scene 04. The same action supports an already-visible final check-in. A browser journey now covers all 19 FINAL Scene 03 choices, Goodnight, lead arrival and this explicit Scene 04 entry.

## State and file inventory

- `content/scene04Final.ts`: generated typed nodes, article catalog, entrances and manifest.
- `content/actIRegistry.ts`, `content/scene01.ts`: typed graph registration and explicit new interaction kinds.
- `game/scene01.ts`: extends the existing dialogue runner for public-story messages, manual Browser/Archive gates, parked optional group conversation, explicit Send, remaining-delay pause/resume and scoped receipts.
- `game/scene04.ts`: optional `PublicStoryState`, event effects, source bookmarks and validation; no second store.
- `game/chapter1.ts`, `content/chapter1Investigation.ts`: queue integration, additive state, sender reply/block handling, Archive lifecycle and final-route isolation from provisional Scene 04 records.
- `game/store.ts`, `game/phonePresentation.ts`: action routing and delivered-only banners/presence.
- `game/storyTimer.ts`, `game/storyTimer.test.ts`, `App.tsx`: a cancelled or early browser callback cannot silently disarm a future saved deadline. Early callbacks re-arm for the remaining delay; the deadline itself and existing reduced-motion mode are unchanged. Tests cover the exact 5.5-second boundary, cancellation, immediate mode and an empty queue.
- `ui/PublicStory.tsx`, `public-story.css`: internal Browser, six paragraphs, public byline/update information, index metadata, local selection and final handoff.
- `ui/Scene01Chat.tsx`, `Chapter1Investigation.tsx`, `CaseNavigation.tsx`, `HomeScreen.tsx`, `App.tsx`: preserved chat renderer, link/navigation, Archive badge and existing shell.
- `tests/helpers/scene04Final.ts`, `game/scene04Final.test.ts`, `tests/e2e/scene04-final.spec.ts`: all 73 branches, gates, optional group leave/resume, refusal, blocked/unread sender, separate source labels, no-save route, migration/normalization and browser journeys.

Historical saves without the final Act I revision continue their existing screenplay and structural/C2 flow. New final-route saves use this full Scene 04. Already delivered text, old source IDs, relationships and queue events are never overwritten, the IndexedDB version remains v1, and the legacy localStorage save is untouched. A new game is required to replay the rewritten conversations from the beginning; no reset was performed for the owner.

## Verification

Final checks:

- `npm run typecheck`: passed.
- `npm run lint`: passed with no reported lint warnings.
- `npm test -- --maxWorkers=2`: **990/990 passed / 39 files**, confirmed after the last displayed-name regression was added. Covers all 201 Act I and 73 Scene 04 main branches, refusal/no-save routes, scoped knowledge, queue checkpoints and deadline re-arming.
- `npm run build`: production web build passed. JavaScript **1,313.54 kB / 333.52 kB gzip**, CSS **149.63 kB / 30.53 kB gzip**. The existing large-chunk advisory remains because both historical and current screenplay graphs are retained. It is not a compilation failure.
- `git diff --check`: passed; Git only reported its existing CRLF conversion advisory for `src/ui/phone-interaction.css`.
- Full browser command: `PLAYWRIGHT_PORT=4186 npm run test:e2e -- --workers=1 --output=artifacts/final-dialogue-regression` ran **100 scenarios: 98 passed, 2 failed**. The two failures were the fresh handoff test still expecting the former auto-open JOIN/old group dialogue and the archived social route waiting on a disabled ending. No clean 100/100 full run is claimed.
- Updated handoff assertions preserve all fourteen first-contact choices, thirteen group decisions, embedded Sends, Lucas exit, manual opening, scroll preservation and the exact 5.5-second boundary. They now use the FINAL manifest, separate Open FIND DANIEL action, post-C09 LATER, one Maya deletion and the new handoff wording.
- Targeted command against Act I, handoff, Scene 04 and the archived social route (`artifacts/final-dialogue-recheck`): **11/12 passed**. All new-script routes passed, including all nineteen FINAL Sophie choices through the manual article lead, optional disclosure, the complete Scene 04 route, C13-A continuation and persisted index selections. The archived ending remained disabled, so it was not dismissed as merely an assertion wording issue.
- The archived social route then passed an isolated diagnostic run. The scheduler was hardened against a callback firing before its saved wall-clock deadline; deterministic tests prove re-arming without changing that deadline. The long real-clock journey retains a 180-second overall budget and a separate enabled-button assertion. Temporary diagnostic imports/dry runs were removed.
- Final browser command (`artifacts/final-clock-verification`) selected the archived social route, persisted handoff deadline and optional Scene 04 group, **repeated each twice: 6/6 passed** with no diagnostic calls or bypasses. Both Sophie and Maya's online indicators were checked in the active group.
- Earlier focused passes: Act I **3/3**, Scene 04 **2/2**. One earlier browser start stalled before seeding a save; initial Act I virtual-clock/reload diagnostics were fixed by reduced-motion test mode and waiting for normal journal persistence. They are not represented as successful first runs.

Across the full and targeted runs, all **101 distinct browser scenarios** (the original 100 plus the added complete FINAL Scene 03 journey) have successful coverage. This is coverage across runs, not a single 101/101 full-suite result. The final unit count/build result are recorded in the terminal; no physical-device pass is implied.

Screenshots inspected at 320px: `artifacts/final-dialogue-regression/scene04-final-Scene-04-ful-323d8-d-deliberate-Scene-05-entry/public-article-320.png` and `archive-index-320.png`. The final text-only cleanup removes the visible implementation phrase “Local story page” and the debug scene-number label; article/index layout and manual actions are unchanged.

Android device play and a newly packaged APK are outside this check. Production build is the web bundle. There is an existing Vite large-chunk advisory, increased by retaining both historical and current authored graphs. Physical-device notification gestures have not been verified.
