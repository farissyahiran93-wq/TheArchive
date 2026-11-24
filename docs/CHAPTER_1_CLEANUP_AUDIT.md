# Chapter 1 cleanup audit

The active storyline is defined in [Chapter 1 — The First Trace](CHAPTER_1_CANONICAL_FLOW.md). The normal game opens only the approved campaign. Older dialogue revisions within that campaign can still continue from their stored cursors.

| Files | Dependency and disposition |
| --- | --- |
| `masterChapterMetadata.ts`, `game/campaign.ts` | Current campaign names, count, chapter availability and stable checkpoint IDs. |
| `chapter1V2.ts`, `chapter1Plan.ts`, `game/sceneLibrary.ts` | Historical scene numbers and selectors still support compatibility fixtures. The normal menu uses the canonical registry and blocks direct replay from an obsolete campaign. |
| `e01Slice.ts`, `e01Phase03b.ts`, `BulletinSlice.tsx` | The legacy controllers, phone UI and browser fixtures still import these. The normal game does not continue their saves. Physical removal requires decoupling these consumers. |
| `groupTitle.ts`, `scene01.ts` | V4 uses Same Old Chaos. Historical dialogue graphs retain their original titles, text and event IDs. |
| `GameEntry.tsx`, `App.tsx`, `game/store.ts`, `game/save.ts` | Gate normal entry, replay and archive restoration. An incompatible save remains available as a download; a confirmed New Game archives it. No completion receipts are synthesized. |
| `MasterTrace.tsx`, `MasterScene07Evidence.tsx`, `MasterScene08Chat.tsx` | Current archive recovery, temporary fragment analysis and reading surfaces. Older recovered-fragment utilities and save fields still exist; they are not required in the approved playthrough. |
| `public/media`, `qa`, `artifacts` | Approved assets and historical baselines are retained pending an asset-by-asset dependency audit. |

The local backup tag `backup/pre-chapter1-canonical-cleanup` points to the previous committed HEAD. Uncommitted changes already present before cleanup were carried onto the cleanup branch. The explicit `compatibility-qa` mode continues to exercise historical fixtures until their migration coverage has been separated from the old gameplay implementations.
