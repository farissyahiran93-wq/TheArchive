# Architecture - Sophie-first Episode 01, Phase 05

## Runtime and authoring

React 19, strict TypeScript, Vite 8 and Zustand render a fictional player phone and Daniel's separate read-only recovered snapshot. The canonical episode has exactly E01-S01 through E01-S30. S01 identity has its original receipt; the separate Sophie prologue runs before S02 Home/Bulletin. Its fourteen outline labels are OPEN-B01-OPEN-B14 and do not expand the canonical scene count.

Authored dialogue, recovered records, source metadata, media availability and permitted comparison descriptions live in `src/content` and authored docs. `opening.ts` carries the Sophie/mirror record content; `mirror.ts` supplies append-only MIR IDs, cross-app metadata and private association definitions. Existing screenplay/source assets remain under `docs`, never copied wholesale into public assets.

Pure state transitions live under `src/game`: `engine.ts` handles identity, shared delivery/normalization and the development fixture; `opening.ts` handles Sophie, consent, item locks and the ordinary-note/index gate; `slice.ts` and `phase03b.ts` handle canonical investigation, disclosure and GCRO verification; `board.ts` handles canonical private source links; `mirror.ts` handles explicit recovered-source saving, optional associations and resume navigation. React components render state and request store actions.

## State and event invariants

- Save schema version and IndexedDB version remain 1. New mirror fields are optional and validated, preserving older reboot saves without resetting or importing anything.
- `pendingEvents` stores canonical event IDs and absolute deadlines. `prologue.queue` stores Sophie line IDs, text and deadlines. The store tick delivers due records; the UI timer merely requests a tick. Stable IDs and delivered ledgers make repeated ticks/reloads idempotent. Reduced motion can reveal queued Sophie lines immediately without choosing a player response.
- Player-authored dialogue requires an explicit Send. Canonical send functions and `replyToSophie` retain their stable receipts; selection and inspection are separate actions. Each NPC knowledge change needs its actual recipient-specific disclosure or authenticated canonical source boundary.
- Player knowledge, character knowledge, relationships, evidence, permission receipts, optional item unlocks and Board links are independent. Accepting Daniel's mirror is not accepting Maya's later workspace invitation.
- The 14 signed / 13 visible / zero deletion-entry mismatch is a source-unverified observation. It does not establish deletion or a cause, and it stays separate from the public Bus 4 field comparison.
- MIR source retention requires an actually inspected, unlocked record and an explicit Save recovered observation action. MIR evidence stays unverified. Private MIR associations are Observation or Hypothesis; they cannot grant K01/K02/R04, disclose to characters, advance a scene or authenticate another source. The canonical Board/GCRO guards remain separate.
- Locked bodies are not rendered, inspected, retained or included in search before their individual unlock. Notes and Gallery retain ordinary public items. Protected containers have no Episode 01 unlock path.
- Recovered screen navigation is player UI state, not a modification of Daniel's original device. Interrupted active mirror investigation resumes its selected record; later Archive visits offer a deliberate Resume action from the mirror home.

## Saving and recovery

`src/game/save.ts` owns IndexedDB `the-archive-reboot`, store `saves`, key `primary`. Store commits increment the save revision and serialize writes. IndexedDB revision comparison stops a stale tab from overwriting newer progress. A sessionStorage pending-write journal supports interrupted same-tab recovery against the expected revision; conflicting/corrupt data enters a recovery screen with backup download before explicit reload.

The game never reads, deletes, imports or migrates legacy localStorage `the-archive:game-save:v1`. Backup import and cross-device sync are not implemented. Browser/OS storage policy and physical process-kill durability still require device UAT.

## Recovered UI and media

`DanielMirror.tsx` owns app browsing, local search, filters and item password forms. `MirrorRecordView.tsx` renders app-specific detail; `MirrorMediaViewer.tsx` provides a focus-contained device-level overlay; `MirrorEvidenceBoard.tsx` renders private recovered comparisons and is also embedded in the existing Case Board. `mirror.css` scopes recovered-device styles and mobile/safe-area rules.

`src/content/galleryMedia.ts` maps six supplied PNGs to the existing four MIR-GALLERY records: shelf/message public, two index fragments behind album-index and notice-board/map behind album-quay. Images are unchanged copies of the compatible local six-asset pack; WebP thumbnails are derived locally. Both grid and detail exclude hidden image elements until individual unlock. The viewer navigates only within its current album, loads full PNGs on demand, supports 100-400% zoom/pan/reset, Back/Escape, focus containment, loading/error/retry and explicit unverified retention. The Evidence workspace can open retained Gallery images directly, subject to the same unlock guard. None of this advances knowledge or a canonical scene.

Source pixels and source authenticity are distinct: capture time, GPS, original forensic chain and calendar date of the partial 22:30 crop remain unknown. The original collage is separately split into six exact PNGs under artifacts; it is excluded from runtime because its June Ellis/2021/death claims leak or conflict with canon. Companion index crop 02 contains a partial timestamp, not June Ellis. Replacing it with the raw collage in future requires an additional pure scene/knowledge gate before thumbnail, full image and source viewing.

`src/content/characters.ts` registers six existing character identity illustrations. `CharacterAvatar.tsx` loads derived 160px portraits with monogram fallback on error; no save field or identity receipt is introduced. Live Sophie/Maya threads, inbox rows, recovered Contacts/Calls/Messages and Daniel owner/evidence references use these hooks where existing content already supplies that character. Eli/Nora are ready without creating new conversations. Four extra supplied portraits are prepared as dormant assets only.

## Android and acceptance

Capacitor wraps the production `dist` output in the existing Android project. The build configuration has no real contacts/location/surveillance integration; Android's manifest requests Internet only. `npm run cap:sync`, Capacitor Doctor and Gradle debug builds are checked during handoff. A generated debug APK is not signed-release acceptance.

Browser tests exercise multiple widths, reduced visual viewports, scroll/back behavior, source gates, locks, save/resume, legacy-key preservation, canonical social/quiet/late-tip paths and S30. Real IME behavior, OS Back and safe areas, screen readers, lifecycle durability, signed delivery and human pacing need physical-device and human UAT. The fixture is development-only and cannot unlock another episode.
