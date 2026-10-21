# Save, event and recipient integrity

Phase 03A extends the existing **IndexedDB `the-archive-reboot` v1 / `primary` save** with an optional `e01` slice object. It does not migrate, reset or write the legacy localStorage key `the-archive:game-save:v1`. Old reboot v1 records without `e01` remain loadable; a player with one can explicitly open the Bulletin brief. No new schema version, episode unlock or full-E01 completion marker was introduced. The preexisting Messages fixture and its read flags remain separate from Maya's Bulletin inbox.

| State | Stored field / integrity rule |
| --- | --- |
| Identity and position | Existing `player`; `EV-E01-S01-IDENTITY` once; optional `e01.sceneId` from S02 through S12. |
| Investigation | `briefRead`, `previewInspected`, attempts/hints, `compared`, evidence E001/E002 and player K03/K01. Wrong guesses never grant K01. E001/E002 and K01 remain `verified=false`. |
| Choice and draft | `S07.lead`, `C01-TIP`, `S11.primary/followup` in `choices`; `tipMode`, handle and unsent S11 selection in `e01`. Reselecting or leaving S09 without Send sends nothing. |
| Send and reader knowledge | R01 plus a stable `R01.tip` message only after S09 Send; only `R01.public-escort-observation` enters Maya's knowledge ledger. No phone number, private Board, resident identity, Contacts, GPS or original crop is sent. |
| Replies and first contact | Five stable scheduled S11 opening event IDs; delivered IDs prevent replay. First delivered Maya event adds a notification and activates the chosen D21 tuple once. S11 optional responses are separately scheduled after actual player Send. |
| Reading and editor check | Maya message read state belongs to Bulletin; `EV-E01-S12-EDITOR-CHECK` appears only after the code/return-route answer. It does not grant file authenticity or K02. |

Pure transitions in `src/game/slice.ts` return the existing state when their preconditions fail, including repeated Send and Board Save. `src/game/store.ts` serializes IndexedDB writes in a promise queue, and the existing recovery state blocks mutation of an invalid save. `normalizeSave` accepts the additive `e01` field and rejects malformed scene or required progress data. This is compatibility with existing v1 shape, **not** a full backup/rollback/migration rehearsal.

The unit tests verified old-v1 load, a sent slice save round-trip, pending event count, once-only R01 and preservation of the legacy key. Browser tests verified refresh before Send and after the channel check, app switching, stable tip/receipt counts, and anonymous/handle routes. A process crash before an IndexedDB transaction commits may still lose the last visible action under the existing optimistic UI write strategy; storage quota failure, forced transaction abort, concurrent tabs and device-level corruption were not exercised. Those are Gate B reliability tests before full episode acceptance.

Real-wall-clock milliseconds schedule short reply events; fictional visible story timestamps stay on 8 October 2026. Pending events are saved and resumed on reload. No story inference follows an unverified preview, unsent draft, unopened reply or mere device presence. The local profile name displayed in the phone is not transmitted to the Bulletin case inbox.
