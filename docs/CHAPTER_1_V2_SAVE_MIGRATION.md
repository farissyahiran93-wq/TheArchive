# Chapter 1 v2 — save protection and deterministic mapping (Phase 01)

> **Historical Phase 01 contract.** The runtime now has the released `ch01-v2-10` route and explicit atomic archive/restart/restore operations. The no-active-field/staged statements below describe their earlier phase. The new fifty-scene campaign is a separate **planning-only** proposal: use [THEARCHIVE_NARRATIVE_STATE_SPEC.md](THEARCHIVE_NARRATIVE_STATE_SPEC.md) and [the inspected save audit](THEARCHIVE_IMPLEMENTATION_ROADMAP.md). No existing save is converted, reset or assigned new completion/authorization by this task.

Status: **contract only**. No save migration, new save field, default route or normalizer change is active. `src/content/chapter1V2.ts` contains the staged ten-scene manifest and a pure 18-row legacy disposition table. Existing `the-archive-reboot` IndexedDB schema v1, pending-save journal and the separate legacy localStorage key are untouched.

## Classification before any future conversion

1. Inspect the actual save revision, `narrativePlan`, `prologue.scene01.scriptRevision`, `articleAlignment`, current `chapter1` state, `replayEntries` and Chapter 2 state. Use saved event IDs and explicit scene conclusions, never display text or scene number alone.
2. If a save already has `chapter2Access`, a historical Chapter 1 completion event, or an active structural Scene 11–18 checkpoint, keep its historical route and completion. Do not reassign it to v2.
3. If an active save has only the current final-route graph, keep it on that graph and offer normal resume. Do not silently reset or replay it. Any future opt-in replay must present a preview and create an independent snapshot before switching.
4. A fresh save created after v2 launch may receive the new version tag. Merely loading an old save never adds it. If a future conversion is offered, calculate its eligibility from genuine completed and delivered records and write a single idempotent conversion event. No conversion can award unread facts.

## Mapping table

| Old progress | Proposed v2 interpretation | Required safeguard |
| --- | --- | --- |
| Old Scenes 01–06 | Same numbered main-scene identities and delivered history | Reuse their stable IDs and completion only where actual recorded gates passed; preserve Scene 05's aligned replay key. |
| Old Scene 07 The Byline | Secondary source investigation | Preserve saved C15, professional receipts and messages; do not mark v2 Starred Number complete. |
| Old Scene 08 The Missing Issuer | Secondary source investigation | Preserve C16 and civic/professional routes; do not mark v2 Last Check-In complete. |
| Old Scene 09 The Transfer Register | Secondary source investigation | Preserve C18, public reads and private note; do not mark v2 Secondary Card complete. |
| Old Scene 10 The Inventory Sheet | Secondary investigation / possible source for future finale | Preserve C20 and descriptor observation; do not mark the new v2 finale, call or chapter complete. |
| Old structural Scenes 11–18 | Historical-only route | Keep exact scene IDs, completed array, evidence, ending event and Chapter 2 continuation. No v2 number or clue is inferred. |

The 18-row table is implemented as `chapter1V2LegacyMap`. Old 07–18 rows have no `v2SceneId`; that absence is deliberate. It prevents a matching scene number or title from transferring unearned completion. An old Scene 18 `CH1-COMPLETE` remains historical and does not become the future v2 completion event.

## Fields and invariants to preserve

- Player name and pronouns; relationship trust, affinity, suspicion and romance; player and per-character knowledge; unverified evidence and source attribution.
- Delivered message text, channel, recipient, IDs and timestamps; selected choices, unsent drafts, read state, group membership, voluntary installation state and optional consent scope.
- Pending notifications and due times, active cursor and typing remainder, `replayEntries`, save revision and conflict recovery. Treat a pending journal and its stored copy consistently before any future conversion.
- Existing Chapter 1 completion, Chapter 2 access/reunion progress and unlock flags. A new unlock cannot retroactively start Chapter 2 dialogue.
- The package ID, Android signing identity and all storage names. Never import over `the-archive:game-save:v1` automatically.

## Rollout and tests required before activation

Keep the v2 definition out of `chapterLibrary`, `actINodes`, `newGame`, `normalizeSave`, `chapter1Action` and `continueFromChapter1` until the four new screenplays, finale and migration logic pass review. New games switch only through one explicit version selector at launch; old saves keep their pinned graph. A future version tag should be validated as optional schema-v1 state, with a rejection or safe recovery path for malformed values. The implementation must support save export before any offered conversion.

Phase 01 automated contracts check exactly ten ordered unique scene IDs, the four-act split, preserved 01–06 identities, all eighteen legacy dispositions and the fact that the current playable registry still uses its own 07–10. Phase 02+ needs tests for fresh v2 entry, every old-save boundary, no duplicated evidence or rewards, manual next-scene and chapter Continue, recipient-specific knowledge, pending timers, interrupted writes and corrupted saves.

Phase 01 checks: typecheck, lint, build and **1,417/1,417 unit tests** passed. The staged mapping changes no stored bytes when an existing save is loaded. Browser tests were not rerun because the manifest has no runtime consumer.
