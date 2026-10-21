# THE ARCHIVE reboot working rules

- Active scope is the Sophie-first Episode 01 reboot (prologue plus existing Bulletin S02–S30 investigation). Preserve the canon, verified source constraints and event IDs; do not introduce Chapter 2 or identify a culprit before approval.
- Treat the 2026 reboot brief as the current production direction. Story Bible v2 is provisional but has not been supplied in this workspace; document conflicts rather than silently resolving them.
- Keep story content in `src/content` and authored docs. Keep state transitions in pure functions under `src/game` (`opening.ts`, `slice.ts`, `phase03b.ts`, `engine.ts`, `board.ts`, `mirror.ts`). React components render state and request actions; they do not advance narrative knowledge on their own.
- Every player-authored message requires a visible Send action. Every NPC fact requires a recipient-specific receipt. Event IDs must be stable and idempotent across refresh.
- Never delete, import over, or migrate the legacy `the-archive:game-save:v1` localStorage key automatically. The reboot uses `the-archive-reboot` IndexedDB.
- Run `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`, and `npm run test:e2e` before reporting a phase complete. Report actual results and known limitations.
- Do not use real GPS, contacts, third-party accounts, or surveillance APIs. Greyhaven data is fictional.

- Daniel mirror Notes and Gallery have public and password-protected **individual items**, not fully locked apps. Clues must be discoverable through unlocked game content; unlocking is optional, persisted and separate per item.
- Opening index mismatch (14 signed / 13 visible) and Bus 4 escort mismatch are **distinct observations** until verified provenance links them. Never automatically share player mirror evidence with Maya.

## Phase 04 architecture and source rules

- `src/content/mirror.ts` is the recovered record catalog, cross-app association manifest and media availability registry; authored records remain in `src/content/opening.ts`. `MIR-*` IDs are append-only: do not reorder existing area records or change their legacy title-based inspection keys.
- `src/game/mirror.ts` owns explicit recovered-source retention, optional private associations and resume navigation. Inspection, saving, association and authentication are separate actions. MIR evidence always begins unverified; a private association never awards K01/K02/R04, completes a canonical scene or grants Sophie/Maya knowledge.
- `src/ui/DanielMirror.tsx` handles read-only navigation, search, folders and per-item locks. `MirrorRecordView.tsx`, `MirrorMediaViewer.tsx` and `MirrorEvidenceBoard.tsx` render record detail, media availability and private comparisons. Saving and linking call store actions; views do not mint narrative facts.
- Six supplied Gallery PNGs are registered in `src/content/galleryMedia.ts`; original forensic provenance, capture timestamps and GPS remain unavailable. Keep an honest image-error fallback. Do not substitute wallpaper or other story props. See `docs/PHASE_05_MEDIA_AND_DEVICE_REPORT.md` and the asset manifest.
- The original collage crops are deliverables under `artifacts/phase05/daniel-collage-crops`, not runtime sources: their 2021 dates, June Ellis row and death headline conflict with canonical sources or expose mandatory discoveries early. The companion six-PNG set contains no June Ellis reveal. A future replacement containing mandatory facts needs a pure scene/knowledge guard for BOTH thumbnail and full image, independent of password unlock; never grant K01/K02/R04 or NPC knowledge from image viewing.
- Portraits are character identity illustrations, not recovered contact photographs or authenticated evidence. `src/content/characters.ts` supports the six existing character IDs. Additional supplied portraits remain dormant; do not introduce people or identify an unknown caller through artwork.
- Keep public Notes/Gallery items readable. Search must not index locked bodies before their individual unlock. All four password answers, hint tiers and independent unlock flags are preserved; wrong attempts do not erase progress.
- Reopening Archive after the prologue starts on its home and offers an explicit Resume action. An interrupted active mirror investigation resumes its saved record. These navigation fields are optional in schema v1; no legacy migration is introduced.
- The Sophie bible uses OPEN-B01–OPEN-B14 outline labels. Canonical identifiers remain E01-S01–E01-S30; OPEN-B14 carries questions forward and is not an early episode ending. See the Phase 04 report for resolved documentation conflicts and unresolved chronology needing author input.
