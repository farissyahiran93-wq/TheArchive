> Runtime integration update (19 Oct 2026): see [the current integration audit and scene crosswalk](docs/EP01_FULL_INTEGRATION_REPORT_2026-10-19.md). Paced Sophie messages, explicit recovery dialogue, disclosure branches and the public Bulletin handoff now run in code. Earlier implementation/QA limitations below are historical; use the new report for executed results. The 14 bible beats do not add canonical scenes.

# The Archive — Chapter 1 opening rewrite (Sophie-first)

## Player experience

1. The lock screen teases an unknown-number message from Sophie Mercer; on first use the player chooses a local display name.
2. Sophie's fictional chat appears automatically. Her older brother Daniel has been missing for three days and left her the player's number. The player must **select and explicitly Send** a response.
3. Sophie provides a photograph of Daniel's handwritten note. The player opens it and saves the source-limited evidence `OPEN-NOTE`. The note carries recovery phrase `ECHO-7/14`, the hint **7–14**, and an instruction to compare revisions before assuming a deletion.
4. A recovery offer appears from an **unverified sender**. The player inspects a permission notice, then explicitly chooses Restore. This is a *visual simulation inside the existing game*, not an OS app installation. It reads no live phone data or external accounts.
5. The player explores a read-only mirror of Daniel's phone: Messages, Email, Gallery, Calls, Notes, Files, Browser, Contacts, Maps, Protected, Archive Index. These are curated fictional records. The encrypted container remains locked.
6. The player must inspect the **ordinary Untitled Note** and **Archive Index report** before recording the opening discrepancy: 14 signed records, 13 indexed entries, zero deletion-log entries. The evidence is marked **unverified** and no cause/culprit is disclosed.
7. Sophie asks if the player found something and points to Maya’s older **Bus 4 public preview** in Greyhaven Bulletin. The mirror index 14/13 inconsistency and Bus 4 Escort difference are not proven to share a cause. The three unresolved questions are foregrounded. After Continue, the phone home becomes available with The Archive app and Sophie's chat history. Existing Greyhaven Bulletin/Maya Episode 01 route remains on the device as an investigation continuation.

## Technical approach

- New narrative: `src/content/opening.ts`.
- New pure state transitions: `src/game/opening.ts`.
- Persisted, optional `GameSave.prologue` under the existing reboot IndexedDB schema, without touching the legacy `the-archive:game-save:v1` key. `normalizeSave` checks the new structure when present. Older reboot saves without the prologue remain readable and are not reset.
- UI: `src/ui/OpeningPrologue.tsx`, `src/ui/DanielMirror.tsx`, `src/ui/SophieConversation.tsx`, `src/ui/opening.css`, with entrypoints in App/Messenger/UtilityApps/HomeScreen/LockScreen.
- Duplicate actions are idempotent: no auto-sent player messages, no repeat evidence for the same record, and no repeat restoration receipt.
- Daniel mirror access has a separate fact from Maya's optional Memory Project Archive invitation. Prologue consent does not pre-consent on behalf of the player for a later, different archive.
- The mock token is explicitly a story prop, not real device access; recovery origin and note provenance stay uncertain.

## Test notes

- `src/game/opening.test.ts` covers opening dialogue, source evidence, explicit consent, gating, idempotency and older saves.
- `tests/e2e/opening-helper.ts` completes the prologue as preparation for existing later-episode browser tests.
- Existing debug APK in `artifacts/` is **not rebuilt**, and predates this change.
- Test commands for a fully provisioned Node environment: `npm ci && npm run typecheck && npm run lint && npm test && npm run build && npm run test:e2e`.
- Limitations: an earlier reboot player save resumes its existing route without forcibly overwriting progress; the prologue is for new games. Currently Sophie's post-prologue conversation is read-only until later authored scenes; there is no live voicemail/typing cadence or physical Android acceptance test. Full suite and APK require project dependencies, Chrome and an Android toolchain.

## Narrative continuity caveat

The existing Greyhaven Bulletin route and Maya story remain authored with an older introduction. This update makes Sophie-first the entry point while preserving that route, rather than rewriting all Episode 01 scenes and signatures. Future narrative review should reconcile any date/knowledge handoff discrepancies without inventing answers to the three mysteries.

## Item-level iPhone-style privacy and clues (19 Oct 2026)

- Notes: 2 ordinary notes readable immediately; locked `revision copy` (password located in Sophie’s physical note), locked `public comparison` (hinted in Daniel’s Email).
- Gallery: 2 ordinary recovered items; hidden `Index fragments` (hint from ordinary Untitled Note), hidden `Quay references` (hint from Maps saved pin).
- Every locked item has three optional progressive hints; failures do not erase progress or block completion. Passwords and hint tiers are saved in `prologue` and validated on load.
- The `Protected` encrypted container remains inaccessible in Episode 1. No extra evidence is silently verified by an unlock.
- After the prologue, open **Greyhaven Bulletin** and independently compare the older Bus 4 preview with the current civic copy. Neither mismatch establishes the same causal history as the other.
- UI media art is still a placeholder; full-screen authentic image assets, natural typing beats, call/audio and real device QA remain outstanding.
