# Scene 06 — The Corrections Desk

Subsequent owner-authorized continuation (25 October 2026): Scene 07 THE BYLINE and Scene 08 THE MISSING ISSUER now replace the unavailable next-lead boundary for completed final Scene 06 saves. The original phase report below is retained as a historical record; see [SCENES_07_08_IMPLEMENTATION.md](SCENES_07_08_IMPLEMENTATION.md) for current gates and verification.

Implemented from the owner’s complete 24 October 2026 screenplay and companion brief. The request to implement this screenplay supersedes the previous Scene 06 placeholder boundary for the final-script route only.

## Active checkout and sources

Work location: `D:\Web app\TheArchive`. Branch: `main`. Starting HEAD: `70bd7a0ba163e62bbdea9cd25f6dfae8bd406305`. Scene 05 was already present as uncommitted work, including its generated graph, runner, UI, tests, report and source manuscripts. Those changes were retained. No commit, push, installation or APK build was performed.

Read the actual Scene 04/05 reports, graph registry, runner, save normalization, public-source UI, chat renderer and fixtures. Confirmed the literal **REVIEW VERSION HISTORY** entry and runtime completion field `chapter1.versionHistory.complete`. The manuscript’s proposed `scene05.complete` / `scene06.*` are adapted to the existing additive `chapter1` fields; there is no second story store.

Verbatim sources are pinned in `sources/scene06-final/FULL_SCRIPT.txt` and `IMPLEMENTATION_PROMPT.txt`. The full screenplay SHA-256 matches the original supplied Downloads file: `6786EE7BECA6D54F2828C5255379CF4CBCCECFC6A06E0046C5EB36D0E8068863`.

The later owner package `THE_ARCHIVE_SCENE_06_HANDOFF_ALIGNED_WITH_SCENE_05` was reviewed during verification. Its screenplay and implementation prompt have identical SHA-256 hashes to the pinned originals. Its new compatibility addendum is pinned verbatim as `sources/scene06-final/S05_REPORT_COMPATIBILITY_ADDENDUM.txt`. All fourteen integration points were checked against the live runtime: existing IDs, the actual `chapter1.versionHistory.complete` gate, delivered-only prior receipt, optional independent cursors, actual membership, no new Sophie block control, unchanged historical paths and the single runner. No dialogue replacement or save migration was required.

The scene authoring identity is `chapter_01_scene_06_corrections_desk`. Existing planning ID `ch01_sc06_the_missing_line` remains stable for compatibility, while its planning title and requirements now describe the supplied scene. Existing historical graph IDs and saved delivered text are unchanged. `scripts/import-scene06-final.py` reproducibly compiles the source into **214 typed runner nodes** (94 NPC messages, 94 paced waits, fifteen relationship effects, seven composer nodes and four thread endings; seven additional local choice sets are handled by pure local transitions), fourteen stable choices and forty-two variants. Player-facing dialogue remains authored English; wrapped manuscript lines become single bubbles, and author directions do not become messages.

## Scene integration and graph manifest

Scene 05 completion exposes a manually selected **THE CORRECTIONS DESK** card. The existing **OPEN NEXT LEAD** action also enters Scene 06 only when clicked. Neither completion nor notification arrival opens an app, sends a player line or creates a contact. **REVIEW VERSION HISTORY** and all Scene 05 revisits remain available through Back to Archive.

| Choice | Variants | Surface and outcome |
| --- | --- | --- |
| S06-C01 | A/B/C | Local navigation/information; prior-request wording depends on actual sent state |
| S06-C02 | A/B/C | Register information after explicit page acknowledgment |
| S06-C03 | A/B/C | Register classification; B supported, A/C explain and retry |
| S06-C04 | A/B/C | All three source cards inspected; C supported, A/B retry |
| S06-C05 | A/B/C | Optional prior-request inbox follow-up; selection plus actual Send |
| S06-C06 | A/B/C | Optional new form; selection, Review, explicit SEND REQUEST |
| S06-C07 | A/B/C | Byline/operation distinction; A supported, B/C retry |
| S06-C08 | A/B/C | Optional Sophie Send; scoped disclosure and once-only effects |
| S06-C09 | A/B/C | Optional Sophie Send; human response and sharing preference |
| S06-C10 | A/B/C | Optional Sophie Send; food exchange and authored closing |
| S06-C11 | A/B/C | Authored Maya conditional branch retained; unavailable without an authorized private channel |
| S06-C12 | A/B/C | Authored Maya conditional continuation retained, including one shared closing |
| S06-C13 | A/B/C | Optional group Send; only actual Sophie/Maya members receive or respond |
| S06-C14 | A/B/C | Private conclusion; no outgoing message; one-shot mainline completion |

The new pages are entirely local fictional Browser surfaces: `GB-CORR-REGISTER-001` at `browser://greyhaven-bulletin/help/corrections-register`, and `GB-CORR-SCOPE-001` at `browser://greyhaven-bulletin/help/correction-types`. Their full authored content is available offline. Opening or scrolling does not count as reading: **READ REGISTER** and **READ AND ACKNOWLEDGE** persist separate checkpoints and player-only read knowledge.

Mainline completion requires both acknowledgments, the supported C03/C04/C07 classifications, three explicitly inspected source cards, and C14. Desk correspondence, Sophie, Maya, group, source bookmarks, Unknown Sender state and relationship scores do not gate completion.

## Publisher request states

| Actual state at first manual Scene 06 entry | Behavior |
| --- | --- |
| Delivered `R-GB-VH-001`, A/B/C | Snapshot exact earlier question and selected branch. Persist a 1,600 ms Chapter 1 event deadline. Deliver one matching professional role-inbox response and shell banner. Store full wording, event time and receipt linkage. Inbox opening is manual; the paced reading cursor is separate from delivery. |
| Earlier not sent, saved draft, failed or skipped | No reply, desk event or false notification. Existing Scene 05 draft can be reopened without replacement. Public mainline remains available. |
| New Scene 06 request actually sent | Persist exact question, `R-GB-CD-002` and `EV-S06-INQUIRY-DELIVERED` once. Receipt only, no immediate or retroactive earlier-request response. |

C05 Send persists the exact outgoing question and recipient receipt. Its later authored desk responses use the same existing dialogue queue. Referral, byline question and acknowledgment have separate statuses. A referral does not create an editorial-team answer. The desk uses the fictional return-token convention, with no email transport, real account, private phone number or identified staff operator. It is rendered as a role inbox, without a fictional person portrait.

Changing a new-form selection clears Review. Saving, cancelling, backing out, selecting an option or closing a composer transmits nothing. Failed draft/retry is idempotent. Scene 06 snapshots its entry route; sending an old Scene 05 draft afterwards does not manufacture a prior inquiry or retroactively generate a response.

## Knowledge and evidence audit

| Record/action | Attribution and limits |
| --- | --- |
| GB-ARTICLE-001 / EV-PUBLIC-GB-001 | Existing six-paragraph public article, Nora byline, 7 October 2026; “Updated: Yesterday” remains a displayed relative label |
| ARC-IDX-GB-041 / EV-INDEX-GB-041 | Existing separate metadata only; source UNKNOWN, original unverified, body unavailable |
| GB-CORR-REGISTER-001 | Publisher public claim about notices listed at viewing; not a full edit log or independent audit |
| GB-CORR-SCOPE-001 | Publisher descriptions of notice categories; no finding about this article’s actual edit history |
| EV-S06-DESK-REPLY-001 | Actual role-inbox assertion linked only to delivered R-GB-VH-001; no authenticated CMS log or private Nora identity |
| Actual chat Sends | Exact sent text has recipient-specific receipts; no unsigned draft, private Board, index or desk reply is silently disclosed |
| Delivered NPC bubbles | Testimony/read facts reach the player on delivery, not other NPCs |
| NOTE-S06-DESK-LIMITS | One-shot private selected conclusion, stored with qualified public-source attribution and verified:false |
| EV-S06-PUBLIC-REGISTER-OBSERVED / EV-S06-BYLINE-LIMIT-001 | Player’s qualified observation and attribution limit, verified:false |

The saved conclusion explicitly records `version_authenticated:false`, `article_body_changed:unknown`, `author_equals_editor:unknown`, and `index_validated:false`. No older body, diff, editor, motive, culprit, Daniel outcome, sender identity, Nora contact or authenticated original is awarded. Historical CH1-PUBLIC / Bus 4 material never becomes an edition of GB-ARTICLE-001.

Sophie’s existing private thread supplies C08–C10 only through a manual check-in. Each player line requires selection and Send; relationship deltas apply once on that Send, using existing clamping. Group eligibility uses actual joined membership and Sophie/Maya availability. Departed members generate neither reply nor typing; Lucas never returns. No Eli, Nora, Daniel or Unknown contact is created.

**Maya runtime limitation:** the current final route has no authorized two-way private Maya channel. Historical structural Maya DMs are a separate subsystem and cannot authorize one. Accordingly C11–C12 are fully compiled, source-audited and branch-checked, but their optional runtime surface is hidden. No new authorization flag or route was invented. This is the manuscript’s required unavailable-channel behavior.

## Persistence and presentation

`chapter1.correctionsDesk` is optional additive schema-v1 state. Old saves without it keep their current paths. No IndexedDB version change, reset, automatic legacy-localStorage migration or historical transcript rewrite occurs. New content is registered only for the final Act I graph.

Archive panel, per-panel and chat scroll, acknowledgments, inspected cards, classifications, drafts, Review state, sent receipts, inbound response, read cursor, follow-up status, optional thread checkpoints and private conclusion persist. Desk delivery uses existing Chapter 1 pending-event deadlines. Dialogue uses the existing `enterScene01` / `deliverScene01` runner and queue. Pause saves remaining delay and draft; hydration parks the active queue, and manual reopening resumes it. Reading an existing inbox on reload resumes its saved position instead of replaying the opening. Near-bottom delivery follows new text; otherwise the UI offers Jump to latest.

Scene 07 is **not authored or implemented** for the final route. After completion, **OPEN NEXT LEAD** truthfully displays **THE BYLINE — Next lead not yet available. Scene 07 has not been authored.** It never launches an interview or historical prototype scene.

## Files changed for Scene 06

New files:
- `docs/sources/scene06-final/FULL_SCRIPT.txt`, `IMPLEMENTATION_PROMPT.txt`, `S05_REPORT_COMPATIBILITY_ADDENDUM.txt`
- `scripts/import-scene06-final.py`
- `src/content/scene06Final.ts`
- `src/game/scene06.ts`, `scene06Final.test.ts`
- `src/ui/CorrectionsDesk.tsx`
- `tests/e2e/scene06-final.spec.ts`
- This implementation report.

Existing integration files extended:
- `AGENTS.md`, `src/content/actIRegistry.ts`, `scene01.ts`, `chapter1Plan.ts`
- `src/game/chapter1.ts`, `scene01.ts`, `store.ts`, `phonePresentation.ts`, `chapter1Plan.test.ts`
- `src/App.tsx`, `src/ui/Chapter1Investigation.tsx`, `VersionHistory.tsx`, `Scene01Chat.tsx`
- `tests/e2e/scene04-final.spec.ts`, `scene05-final.spec.ts`: replace obsolete Scene 06 placeholder assertions; extend the full Scene 04→05 journey through Scene 06 completion and the Scene 07 placeholder.

- `tests/e2e/chapter2-reunion.spec.ts`, `character-followups.spec.ts`, `life-helper.ts`, `scene02-handoff.spec.ts`: fix pre-existing live-clock pause protocol races by freezing before navigation on controlled fixtures. Production deadlines are unchanged. The long handoff test now pauses at journey start and also explicitly asserts the exact saved 5,500 ms deadline. The declining-referral fixture waits for the registration journal before replacing its save, matching its neighboring fixture.

- `tests/e2e/mirror-native.spec.ts`, `phase04-mirror.spec.ts`: retain actual image readiness/visibility assertions with bounded 15-second loading waits.
- `tests/e2e/phone-interaction.spec.ts`, `scene01-helper.ts`: an optional fixture clock freeze before navigation prevents slow startup from consuming a transient notification deadline; other seed calls retain their original behavior.

The pre-existing Scene 05 uncommitted files remain part of the workspace and are not attributed as new Scene 06 work. Temporary integration-editing scripts were removed; only the reproducible content importer is retained.

## Verification

Final checks ran from `D:\Web app\TheArchive`, branch `main`, HEAD `70bd7a0ba163e62bbdea9cd25f6dfae8bd406305`:

| Command | Actual final result |
| --- | --- |
| `npm run typecheck` | Passed |
| `npm run lint` | Passed, no reported warnings |
| `npm test -- --maxWorkers=2` | **1,092 passed / 0 failed / 0 skipped; 41 files** |
| `npm run build` | Passed; JavaScript 1,431.30 kB / 357.14 kB gzip, CSS 150.42 kB / 30.69 kB gzip |
| `PLAYWRIGHT_PORT=4214 npm run test:e2e -- --workers=1 --timeout=180000 --output=artifacts/scene06-clean-final/results` | **115 passed / 0 failed / 0 skipped in 42.0 minutes**, exit code 0 |
| `git diff --check` | Passed; rechecked after report and generated-baseline cleanup |

The browser result is **one complete clean run on the completed implementation**, not an aggregation of focused reruns. The 180-second test budget accommodates local environment delays; it does not alter production narrative delays, the exact 5.5-second handoff or the recovery deadline. Explicit per-test budgets remain as authored by the test suite. Proof: `artifacts/scene06-clean-final/stdout.log`, `stderr.log`, `completion.json`, and `results/.last-run.json` (`status: passed`, no failed tests).

All eight Scene 06 browser scenarios passed in that clean run: 320/375/430px public pages and conclusions with reloads; all three prior-receipt variants with manual notification/inbox opening, draft restoration and actual Send; the receipt-only new request; and Sophie's full optional exchange. The complete Scene 04→05→06 journey and Scene 07 unavailable placeholder also passed. The new Scene 06 unit coverage contains **53 tests**, including all six dormant Maya branches, exact manuscript dialogue, every graph target, receipt routes, actual group membership combinations, scoped knowledge, once-only Send effects and persisted/re-armed delays.

### Diagnostic history, kept separate from final results

Earlier runs are retained as diagnostic evidence and are not claimed as clean full passes. A sandbox browser spawn initially failed; the authorized local-browser execution succeeded. A missing test delimiter and a predecessor fixture left on its receipt panel were corrected. Source review also removed a duplicated dormant Maya closing and corrected pending/available inbox status, shared presence and per-scene scroll isolation.

Preliminary full runs were deliberately interrupted during those corrections. The port-4202 attempt stopped at **23 passed / 8 failed**, with 84 unexecuted, due to existing live-clock pause races. Its fourteen-scenario fixture recheck recorded **12 passed / 2 failed**, exposing a registration-write race and wall-clock consumption in a handoff assertion. The registration fixture now waits for its journal; controlled clocks freeze before navigation. Isolated referral and handoff rechecks passed. The port-4206 diagnostic stopped at **79 passed / 3 failed**, with 33 unexecuted: two five-second image-loading bounds and a transient typing-banner clock race. Actual image loading/visibility remains required with bounded fifteen-second waits; the typing fixture advances to the exact first delivery deadline. The two image rechecks and subsequent typing recheck passed. The port-4209 attempt stopped after 39 passes for the pending-status correction; port 4210 was interrupted when the later owner handoff arrived and is not counted as a full result.

The saved-log handoff-aligned run at port 4211 completed **113 passed / 2 failed / 0 skipped in 43.3 minutes**. All Scene 06 scenarios passed, but a legacy phone-navigation timeout during a long wall-clock pause and a remaining live-clock handoff race prevented a clean result. The phone-navigation recheck passed **1/1** with a 180-second budget; all four handoff scenarios then passed **4/4** using pre-navigation freezing. The subsequent full port-4214 run above is the clean final result.

### Artifacts and remaining boundaries

Both new public pages, the role notification, inbox and reload screenshots are under `artifacts/scene06-clean-final/results/`. The 320px register, notification and inbox were visually inspected for readable wrapping and role presentation. Earlier targeted screenshots and failure contexts remain in the other `artifacts/scene06-*` directories.

Legacy tests regenerate tracked QA screenshots. Those generated images were copied to `artifacts/scene06-clean-final/legacy-screenshots/` before restoring the previously clean tracked baselines to their starting HEAD contents. `restored-baselines.json` records the exact files. No runtime image asset was changed, no owner's Scene 05 source was replaced, and no save was reset.

The existing >500 kB JavaScript-chunk build advisory remains. Maya's private branch remains unavailable because this final route has no authorized two-way Maya DM. Scene 07 remains an unavailable THE BYLINE placeholder. The web build is not physical Android QA: **APK unchanged**, no physical-device gestures/soft keyboard or external publisher/account/email operation verified. No commit or push was created.

## Visual checkpoints

- [Public register at 320px](../artifacts/scene06-clean-final/results/scene06-final-Scene-06-pub-22706-letion-with-reload-at-320px/register-320.png)
- [Notice-types page at 320px](../artifacts/scene06-clean-final/results/scene06-final-Scene-06-pub-22706-letion-with-reload-at-320px/scope-320.png)
- [Delivered role notification](../artifacts/scene06-clean-final/results/scene06-final-Scene-06-rec-5cbec-raft-reload-and-actual-Send/notification.png)
- [Inbox after draft reload and actual Send](../artifacts/scene06-clean-final/results/scene06-final-Scene-06-rec-5cbec-raft-reload-and-actual-Send/inbox.png)
