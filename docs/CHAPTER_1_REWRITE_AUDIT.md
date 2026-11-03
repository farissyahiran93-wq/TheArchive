# Chapter 1 rewrite — Phase 00 baseline audit

Date: 2 November 2026. Scope: inspection and safety backup only. No story text, scene registry, progression rule, save schema, or Scenes 1–3 was changed in this phase.

## Safety checkpoint

- Starting branch: `main`; starting HEAD: `3a3ec5d0ff8b6c53cfb494cb15798899ca28a240`.
- The pre-audit tracked working tree is preserved by Git ref `refs/codex/checkpoints/ch1-phase00-20261102` pointing to `eff7fe370c919af652bef2e5fae4bde86df94e4b`. `git stash create` and `git update-ref` did not reset the working tree or index.
- The 29 pre-audit untracked files are stored in `artifacts/chapter1-phase00/untracked-baseline.zip` (27,481,742 bytes), with per-file SHA-256 in `untracked-manifest.json`. These include existing narrative revisions, media and an APK. Do not blindly extract over newer work.
- `artifacts/chapter1-phase00/scene-reference-files.txt` lists 124 source, test and authored-document files matching Scene 01–18 numbers or IDs. This is a search inventory, not a complete semantic dependency graph.
- Pre-existing uncommitted changes, including the recent TRACE dialogue revision and Scene 06/07 revision, are intentionally retained. No commit or push was made.

## Actual structure and scene graph

`src/content/chapter1Plan.ts` has **18 editorial entries**. Its `implementation` field says 1–6 are implemented and 7–18 are structural previews; that field is stale for the final playable route. `src/game/sceneLibrary.ts` derives the chapter-selection registry by including the six flagged entries and the four integrated source investigations. The actual selection screen therefore exposes **Scenes 1–10**. It maps the old planning IDs for 7–10 to the current titles The Byline, The Missing Issuer, The Transfer Register and The Inventory Sheet.

| Scene | Current playable title | Final-route status and entry |
| --- | --- | --- |
| 01 | A Message from Sophie | Integrated; explicit invitation and JOIN GROUP |
| 02 | The Uninvited Guest | Integrated; group choices and Lucas departure |
| 03 | Just Between Us | Integrated; saved 5.5-second private handoff and manually opened Sophie chat |
| 04 | The Public Story | Integrated; saved article lead, public Browser article, Sophie and index |
| 05 | Version History | Integrated; voluntary TRACE installation, index inspection and manual review |
| 06 | The Corrections Desk | Integrated; public register and private finding |
| 07 | The Byline | Integrated final screenplay via source investigation; old plan still calls it The Woman Behind the Byline |
| 08 | The Missing Issuer | Integrated final screenplay via source investigation; old plan still calls it The Page She Kept |
| 09 | The Transfer Register | Integrated final screenplay via source investigation; old plan still calls it Unknown Source |
| 10 | The Inventory Sheet | Integrated final screenplay via source investigation; old plan still calls it A Life in Fragments |
| 11–18 | Editorial preview titles in `chapter1Plan.ts` | No final-route screenplays or selectable library entries; the structural legacy investigation still contains their gates and records |

Final-route dependency chain: 01 JOIN → 02 complete → 03 complete → 04 article/index/Sophie completion → voluntary Unknown Number package and TRACE installation → 05 reviewed → 06 private finding → 07 private C15 → 08 private C16 → 09 private C18 → 10 private C20. Each of 07–10 requires actual saved predecessor conclusions and manual next-lead entry. Optional social and professional requests do not substitute for required public reads or the private conclusion. Scene 10 currently ends at an unavailable Scene 11 hook. It does **not** write Chapter 1 completion or unlock Chapter 2.

The separate historical structural route lives in `src/game/chapter1.ts`: `chapter1Current` iterates 04–18, `advance` marks Chapter 1 complete at 18 and writes `CH1-COMPLETE` plus `unlockedEpisodes: chapter2`. `src/game/chapter2Access.ts` requires both `chapterComplete` and `CH1-COMPLETE` before manual `continueFromChapter1`. `src/ui/Chapter1Investigation.tsx` displays this historical completion screen. Thus the requested 10-scene finale requires a new final-route completion rule; reusing or renumbering the Scene 18 rule would corrupt old saves.

## Architecture and file inventory

- Chapter registry, scene presentation and replay: `src/content/chapter1Plan.ts`, `src/game/sceneLibrary.ts`, `src/content/chatScenes.ts`, `src/ui/MainMenu.tsx`. `replayEntries` snapshots are keyed by stable scene identity; Scene 05 may use `ch02_scene05_version_history` on aligned saves.
- Authored dialogue and graph: `src/content/scene01Script.ts`, `scene02.ts`, `scene03Script.ts`, `scene04Final.ts`, `scene05Final.ts`, `scene06Final.ts`, `scene0607Revision.ts`, `scene09Final.ts`, `scene10Final.ts`, `sourceInvestigations.ts`, `versionHistoryConversationData.ts` and `actIRegistry.ts`. Manuscripts are pinned in `docs/sources` and compiled by scripts under `scripts`.
- Runner, choices, effects and relationships: `src/game/scene01.ts`, `archiveOrigin.ts`, `scene04.ts`, `scene05.ts`, `scene06.ts`, `sourceInvestigation.ts`, `scene09Config.ts`, `scene10Config.ts`, `types.ts`, `store.ts`. Player lines are selected then explicitly sent. Trust, affinity, suspicion and romance live in `GameSave.relationships`; NPC knowledge depends on delivered recipient-specific receipts.
- Evidence and Case Board: `src/game/board.ts`, `mirror.ts`, `sourceInvestigation.ts`, `scene10Config.ts`; `src/ui/InventorySheet.tsx`, `SourceInvestigation.tsx`, `TransferRegister.tsx`, `Chapter1Investigation.tsx`, `MirrorEvidenceBoard.tsx`. Scene 10's public descriptor reference has no descriptor body or verified item match.
- Browser, TRACE and phone shell: `src/ui/PublicStory.tsx`, `PublicationReference.tsx`, `VersionHistoryConversation.tsx`, `CorrectionsDesk.tsx`, `UtilityApps.tsx`, `HomeScreen.tsx`, `Messenger.tsx`, `PhoneNotifications.tsx`, `App.tsx`; `src/content/phone.ts`. Browser documents and package installation are fictional local interactions. Contacts are game state, not device contacts.
- Calls: a Calls icon exists in `phone.ts`; the current `UtilityApps.tsx` Calls view renders an empty recent-calls card. No playable phone-call conversation or real telephony API was found in this final-route audit.
- Scheduling and typing: `src/game/scene01.ts`, `chapter1.ts`, `archiveOrigin.ts`, `sourceInvestigation.ts`, `storyTimer.ts` and the saved `pendingEvents`/queue deadlines. Navigation pauses and resumes saved beats. The 10-second Scene 04 article lead and optional delayed role-inbox replies are distinct from scene completion.
- Save and migration: `src/game/types.ts`, `engine.ts`, `save.ts`, `store.ts`, `sceneLibrary.ts`. Primary reboot save is IndexedDB `the-archive-reboot`, schema v1; a sessionStorage pending-write journal protects interrupted saves. `normalizeSave` validates optional scene states and applies compatibility repairs. The legacy `the-archive:game-save:v1` localStorage key must not be automatically migrated or overwritten.
- Tests: Vitest under `src/game/*.test.ts`; Playwright under `tests/e2e`. Particularly relevant are `chapter1Plan.test.ts`, `chapter1.test.ts`, `sceneLibrary.test.ts`, `scene05Final.test.ts`, `scene06Final.test.ts`, `scene09Final.test.ts`, `scene10Final.test.ts`, `sourceInvestigation.test.ts` and the matching scene browser specs.

## Canonical conflicts and evidence dependencies

1. The editorial plan still declares 18 main scenes and six implemented scenes while the playable library has ten. Changing only the menu count would leave the historical completion rule at Scene 18 and the final route without a finale.
2. Plan titles and IDs for Scenes 7–10 describe older concepts. Runtime screenplays use different titles but preserve planning IDs. Scene 05's aligned canonical identity also has a `ch02_` prefix despite sitting in Chapter 1's playable sequence. Those IDs are save and replay keys, not safe renumbering targets.
3. The 11–18 plan contains potential future beats such as the 14/13 index discrepancy, Eli's warning, Maya/Lucas perspectives, post-verification claim, original-copy request and role trace. Their authored source and evidence prerequisites are not present as final-route Scene 10 content. A ten-scene finale must not imply these were discovered or spoken already.
4. Public article `GB-ARTICLE-001`, index `ARC-IDX-GB-041`, publisher label `GB-REF-017`, civic series transfer and Box 03 descriptor reference have different provenance. No current final-route source proves an earlier article body, text diff, specific notice, item match, issuer, editor, culprit or Daniel's fate. Optional private Sophie consent does not grant group consent.
5. The separate historical Chapter 2 access/reunion implementation has its own saved state and scene numbers. Its manual continuation must stay distinct from any new final-route Chapter 2 title screen or unlock event.

## Save migration and implementation recommendations

Treat the current final-route 01–10 graph as an immutable baseline. Add a separately tagged ten-scene chapter revision only after the finale and transition screenplay are approved. Keep `com.thearchive.game`, schema v1, all old scene/event/source IDs, stored message text, receipts, `replayEntries`, pending deadlines and Chapter 2 historical states. A new completion event for final Scene 10 should be idempotent and require real C20 plus all predecessor gates; it must never be inferred from a scene number, opening TRACE or reading a notification.

Handle 11–18 as editorial candidates in an explicit disposition matrix before moving any beat. Only authored, source-supported dialogue may enter Scene 10. Defer other beats without deleting their historical structural path. The new chapter-selection view can display exactly ten current main scenes while retaining a safe historical resume path for saves already at 11–18. Do not auto-play Chapter 2 after completion; require a deliberate title-screen Continue action. Test fresh final, every legacy boundary, pending queues, replay snapshots, duplicate events, evidence scope and Chapter 2 handoff before implementation.

## Baseline checks

| Command | Result |
| --- | --- |
| `npm run typecheck` | PASS, exit 0 |
| `npm run lint` | PASS, exit 0 |
| `npm run build` | PASS, exit 0; Vite reports the existing large client chunk advisory |
| `npm test -- --maxWorkers=2 --reporter=dot` | PASS, exit 0: 1,414 tests in 53 files |

No Phase 01 change has been made.
