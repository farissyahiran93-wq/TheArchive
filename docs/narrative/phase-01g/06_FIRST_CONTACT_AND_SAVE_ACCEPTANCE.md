# D21 — first-contact baselines and v1 save acceptance, 01G-RC1

**Owner-approved design scope `01G-RC1` on 14 October 2026; D21 `APPROVED` at policy level.** The exact values and guards come from [01F first-contact appendix](../phase-01f/03_RELATIONSHIP_FIRST_CONTACT_APPENDIX.md), [01E D21](../phase-01e/03_CONDITIONAL_POLICIES_AND_RECEIPTS.md) and the current owner's explicit approval. This is a design and future acceptance contract. **No save migration, schema edit or runtime test of migration was performed.** D13 already keeps early romance inactive; optional romance never gates core evidence.

## Tuple and state contract

Tuple order is **Trust / Affinity / Suspicion / Romance**, each axis 0–100. Apply once at *verified, delivered, two-way first direct contact*, before any subsequently authored relationship delta. A file mention, one-way message, queued invitation or phone trace is not contact.

| Character | First-contact tuple | Guard against premature application |
| --- | --- | --- |
| Maya Chen | `50 / 45 / 20 / 0` | Explicit Bulletin tip Send creates R01; her delivered reply in the return-token inbox is the first two-way exchange. Neither token nor handle grants legal identity or Messages opt-in. |
| Lucas Grey | `42 / 40 / 30 / 0` | Verified direct exchanged message/call; fleet role mention and declined photo do not count. |
| Sophie Mercer | `38 / 35 / 25 / 0` | Her direct, consented exchange; Daniel's work order or counsel inquiry does not contact her for the player. |
| Eli Ward (female) | `50 / 48 / 15 / 0` | Her own reply through a verified channel; file queued for her grants neither contact nor private knowledge. |
| Nora Vance | `40 / 38 / 30 / 0` | Direct exchange; public byline does not reveal Ana or Session 02. |
| Daniel Mercer | `45 / 40 / 25 / 0` | Verified direct live exchange; device fix, relay, E015 publication or R12 to Sophie does not count. |

| Typed state | Entry rule | Numerical/permission effect |
| --- | --- | --- |
| `unintroduced` | No verified in-play identity/channel. | No scored opinion. Never render Phase 00 zero as dislike. No contact/private fact permission. |
| `introduced` | Verified public mention or consented referral. | Character-specific tuple is pending, not active. No reciprocal exchange or automatic receipt. |
| `contacted` | Verified direct two-way delivery with stable event ID. | Activate tuple exactly once, then apply only separately authored deltas with provenance. Does not confer legal identity, source access, Archive membership, consent or romance. |

**Idempotence:** repeat scene/reload cannot reapply baseline, duplicate a reply or replay R01/R03/R12. Initial contact event and later deltas require separate stable IDs. Low trust changes tone/callback, never the public/custodian E012/E013/E014/E015/E019 route. All Romance starts at 0; no romance unlocks mandatory evidence.

## Actual v1 surface inventory read from source

| Observed file/shape | Known fact and uncertainty |
| --- | --- |
| [`src/game/types.ts`](../../../src/game/types.ts) `GameSave` | `schemaVersion: 1`; `episodeId: 'phase-00'`; `sceneId: home|fixture`; player, choices, messages, pending/delivered events, per-character knowledge, six relationship objects, evidence, notifications and settings. `newGame()` writes `0/0/0/0` for all six as a **fixture placeholder**. No typed contact-state field or provenance for relationship deltas exists. |
| [`src/game/save.ts`](../../../src/game/save.ts) | IndexedDB `the-archive-reboot`, database version 1, object store `saves`, key `primary`. `loadGame` uses `normalizeSave`; `writeGame` writes `primary`; backup helper serializes an object for download. No v2 slot, migration or rollback implementation exists. |
| [`src/game/engine.ts`](../../../src/game/engine.ts) | `normalizeSave` validates top-level structure and existence of six relationship objects but does **not** validate each numeric axis, range, contact provenance or unknown extra fields. Treat syntactically accepted data as potentially ambiguous; do not infer that every zero is untouched. |
| [`src/game/save.test.ts`](../../../src/game/save.test.ts) | Tests a v1 round trip and rejection of unsupported/incomplete records without overwriting `primary`. These tests do **not** test migration, backup, separate slot, interruption, rollback or real returning-player variants. |
| Legacy key | `the-archive:game-save:v1` is an older localStorage key referenced in [Phase 00](../../../PHASE_00_REPORT.md) and workspace [AGENTS](../../../AGENTS.md). No automatic import/delete/overwrite is permitted. Its real contents were not inventoried or read. |

Only the *source-defined* v1 shape and test fixtures were inspected, not users' saved data. Because old records lack typed contact state and delta provenance, a relation value or zero alone cannot reliably distinguish an unintroduced character from an authored change. Current fixture-only records may be classified as pristine only when a complete known v1 fixture fingerprint and event history support that conclusion; otherwise quarantine. Unsupported/future shapes fail closed.

## Future migration acceptance contract; implementation remains separately gated

1. **Freeze/inventory:** enumerate supported v1 shapes and build fingerprints using synthetic/consented copies. Record database/store/key, schema, field types, event IDs, unknown fields and relationship provenance. Resolve concurrent old-writer behavior before cutover. Unknown or internally inconsistent data goes to read-only quarantine with a recovery/export path.
2. **Raw backup:** before conversion, export the untouched v1 structured value and a deterministic serialized backup with length/digest and source key metadata; retain the original `primary` value. IndexedDB has no exposed raw disk bytes, so a “byte-equivalent rollback” means equality of the captured serialized payload under the documented serializer **and** deep equality of the structured value. Verify restore from an independent copy. Do not open or write legacy localStorage.
3. **Separate slot:** write a proposed v2 to a new versioned store/key, never over v1 `primary` or the legacy key. Link it to backup digest and deterministic migration ID. Validate all fields, character states, receipt IDs and source permissions before an explicit reader cutover. A failed transaction leaves v1 selectable.
4. **Contact conversion:** only a uniquely proven delivered two-way contact gets `contacted` and its baseline. Preserve authored post-contact values/deltas when provenance exists. A pure fixture record with no contact remains `unintroduced` and is not silently set to six active tuples. Ambiguous zeros/nonzero values without contact provenance are quarantined; offer export/review, not guessed rebasing.
5. **Rerun and interruption:** running twice produces the same v2 bytes/state and no duplicate events; every interrupt point between backup, write, validation and reader cutover is recoverable. Never grant a pending Send, R03 on Archive offer, R12 from device or a source fact from a relationship score.
6. **Rollback/recovery:** verify v1 backup digest, restore the v1 reader pointer/structured value without changing the original, and show a specific error for unsupported versions. Test restore after corrupted v2, missing backup, interrupted transaction and old-writer conflict. No migration is accepted until technical reviewer signs these results on supported records.

## T21 required technical matrix (designed, not executed)

| Fixture/sequence | Expected result |
| --- | --- |
| Six fresh first contacts, each preceded by mention; repeat/reopen | Pending tuple while introduced; exact tuple once at verified exchange; zero Romance; no duplicate event. |
| Maya anonymous draft → Send → token reply; handle variant; decline Messages/Archive | No contact/R01 before Send; Maya contacted at reply only; handle/real identity isolated; no R03 on decline. |
| Daniel device/R12 without Daniel exchange | Daniel at most introduced; no tuple activation or location. |
| Pristine v1 zero fixture, supported contact history with proven deltas, ambiguous zero/nonzero record | Pristine retains unintroduced; proven deltas preserved; ambiguous quarantined, never hostile by default. |
| Unsupported/incomplete v1, unknown future schema, malformed axis/out-of-range value | No overwrite, explicit recovery/export. Current shallow `normalizeSave` is insufficient proof of safe conversion. |
| Raw backup, new slot, rerun and interrupt at each write/cutover | V1 and legacy key unchanged; v2 deterministic and validated; retry idempotent; rollback matches captured backup. |
| Low trust, no social/romance, restore mid-episode | Required custodian paths and actual receipts survive; no knowledge leak, replayed Send or fabricated R03/R12. |

**Acceptance dependencies after owner approval:** technical reviewer inventory plus meaningful tests; separate future implementation authorization. Approval of the design does not authorize save migration.
