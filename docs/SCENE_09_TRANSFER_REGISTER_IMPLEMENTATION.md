# Scene 09 — The Transfer Register

The owner's direct request to continue phase 9 authorizes integration of the supplied screenplay. Its reports of Scene 07/08 being unavailable were checked against the newer local working tree rather than used to overwrite it: the final routes already have real C15/C16 completion, 1,153 passing unit tests and a completed 126/126 browser run (`artifacts/source-investigations-frozen-final/completion.json`, exit 0). This satisfies the predecessor gate. Scene 09 never infers completion from a structural scene number or visiting Archive.

## Source and integration

The three owner files are pinned verbatim in `docs/sources/scene09-final`. `scripts/import-scene09-final.py` compiles only that manuscript into `src/content/scene09Final.ts`: **138 typed nodes**, **18 stable choice sets**, **54 logical alternatives**, two public pages, independent source catalog and thread entrances. Static tests compare every alternative, NPC line and paragraph to the pinned screenplay. The original Scene 07/08 node bodies are retained; their shared generated registry merges the new graph for final-script saves only.

Authoring alias: `chapter_01_scene_09_the_transfer_register`. Existing planning ID: `ch01_sc09_unknown_source`, retained without renumbering old scenes or replacing historical graphs.

`src/game/sourceInvestigation.ts` and `scene09Config.ts` extend the existing pure investigation controller; `enterScene01` / `deliverScene01`, the Zustand commit queue, IndexedDB schema v1, notifications and Messages renderer remain shared. The additive optional `chapter1.transferRegister` is created only after actual saved Scene 07 C15 and Scene 08 C16 plus their completion events, then a manual next-lead press. Entry records the final predecessor, manual action and timestamp. Existing saves without the new field remain valid; malformed Scene 09 state without its predecessors is rejected rather than repaired with invented progress.

`src/ui/TransferRegister.tsx` renders the new Archive/public pages, role inbox, local fixed search examples, source comparison and private conclusion. Sophie and FIND DANIEL use the existing chat UI. Public document text is separate from the player-private Archive annotation; in particular the civic finding aid never contains the publisher's GB-REF-017 comparison.

## Required route

The register must be deliberately opened and marked read, and entry number, series dates and custody fields individually inspected. Supported classifications C02-B / C03-A / C04-C / C05-B remain retriable. The finding aid needs both coverage/access inspections and a separate read action, followed by C06-C / C07-A / C08-B / C09-C / C17-A. Only an explicit private C18 A/B/C after all gates completes Scene 09, appends scene 9 after 8, and records `EV-S09-TRANSFER-LIMIT-001` / `NOTE-S09-SERIES-NOT-ITEM` once. C01 is repeatable information; C10 is a private strategy; neither sends a message.

The five source IDs remain distinct:

| ID | Scope |
|---|---|
| GH-TRANSFER-REGISTER-001 | New public selected-series transfer listing |
| GH-TRANSFER-FINDING-AID-001 | Separate public collection summary |
| GH-TR-2022-063 | Listed transfer row, not an item ID |
| GH-PN-GEN-2017-2021 | Broad administrative postings series |
| GH-INV-2022-063 | Public summary reference, not an original notice |

The row lists Civic Secretariat as former **series custodian**, Greyhaven Records Centre as receiving **series custodian**, broad coverage 2017–2021 and transfer recorded in 2022. `public_listed_series_transfer:true` is scoped to that listing. All specific-notice, publisher-series match, GB-REF-017 transfer, issuer, original text, article revision, culprit and Daniel fate fields remain false or unknown. The private note is explicitly unverified for the case link. No year-range link to 2019, Bus 4, E012, June Ellis or another older investigation is awarded.

## Optional correspondence and people

- The Records Centre form requires register/finding-aid reads, C07-A and C09-C. C11 selection creates only a draft; editing invalidates Review. Actual reviewed **SEND REQUEST** creates one `R-GH-TR-001`, exact body/choice, recipient route, scope and local fictional return token. Only B includes GB-REF-017; A/C exclude it and all attachments. Failure/cancel/save do not send or grant NPC knowledge.
- The receipt alone schedules the independent persisted 1.6-second fictional deadline for `EV-S09-SERIES-DESK-REPLY-001`. No earlier civic/publisher request is reused. The shell notice appears after delivery; manual opening starts paced reading, and the reply is marked read only after its actual final line. C12 requires that read reply and another explicit Send. The role has no character stats, personal avatar, Contacts entry or phone DM.
- C13 Nora requires the real Scene 07 professional receipt and delivered/read response, retained route and observed new register/finding aid. Only the exact new public question reaches her. No desk transcript, receipt, private Board, new phone contact or new relationship baseline is created.
- Sophie requires her existing private route and an explicit CHECK ON SOPHIE; opening old Messages alone does not start a new conversation. Her private factual option is offered only after the register is read. No Scene 09 option grants case-update permission: old private consent is not reused, so C15-A uses the authored no-permission response and once-only trust consequence. The conditional affirmative text remains in the pinned/compiled source, without inventing a permission grant. B/C remain ordinary humane replies with their authored effects; no mainline clue depends on kindness.
- C16 previews actual recipients and requires observed new public sources. Only current Sophie/Maya members receive the selected line; Lucas stays departed and nobody is added. Actual saved ask-first preference triggers the authored A/B boundary and once-only trust loss; C is method-only. Private permission never becomes group consent.
- Per-thread cursor, draft, remaining NPC beat, read status and panel scroll survive navigation/page hide/reload. Delivered lines and Send receipts are idempotent. Completion permits every optional request to remain absent, draft, failed, pending or unread.

Scene 10 **THE INVENTORY SHEET** is a hook only. Its button returns exactly `Next lead not yet available`; no item sheet, original notice, release promise or culprit is generated.

## Validation

Focused browser run: **8/8 passed**, exit 0, `artifacts/scene09-focused/completion.json`. It covers 320/375/430-pixel manual entry and zero-inquiry completion, all three reviewed request/reply variants, draft/reload and follow-up Sends, Sophie boundary, actual group recipients, eligible/hidden Nora and the unavailable Scene 10. The 320-pixel conclusion screenshot was visually inspected. Core and optional controller tests exercise all 54 authored alternatives and additional gates, retries, scope and malformed saves.

Typecheck and lint passed; **1,217/1,217 unit tests in 44 files passed** using `--maxWorkers=2` (64 new Scene 09 tests, including every A/B/C alternative). Production build passed: JS 1,601.90 kB / 392.82 kB gzip; CSS remains 150.42 kB / 30.69 kB gzip, with the existing large-chunk advisory. Results are recorded under `artifacts/scene09-checks` and `artifacts/scene09-full-final`. **Full browser: 134/134 passed, zero failures or skips**, in one complete single-worker 42.5-minute run, exit 0. `results/.last-run.json` confirms passed with no failed tests. Before/after SHA-256 snapshots confirm all **270 application, test, importer and pinned-source files remained unchanged throughout** (`source-integrity.json`). This is not an aggregation of focused runs. The manuscript's 59 QA scenarios are authoring targets, not a claim of 59 passing runtime scenarios.

No commit, push, release, Android rebuild or physical-device acceptance is claimed. The previously delivered APK remains the Scene 06 baseline and does not contain Scenes 07–09. No real external correspondence, device contacts, GPS or third-party accounts are used.

Pinned screenplay SHA-256: `7276c69f9fcacd9cfa92391f2cbf751c1c870b3d1df30eb5b688f59f6feabe38`. All three pinned files match the supplied Downloads originals byte-for-byte; `artifacts/scene09-full-final/pinned-source-integrity.json` records the comparisons.

The full browser run generated reference screenshots; they were preserved in `artifacts/scene09-full-final/legacy-screenshots` and eight initially clean tracked PNG baselines restored byte-for-byte from the unchanged HEAD. `restored-baselines.json` records both hashes. `git diff --check` passed. `final-validation.json` consolidates actual checks and confirms the delivered Scene 06 APK SHA-256 is unchanged. No intermediate test failure occurred in the focused or full Scene 09 runs.
