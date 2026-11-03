# TRACE origin dialogue clarification — 2 November 2026

The owner asked what “Something indexed under a name” meant and requested a
rewrite of the conversation. The line mixed up the reference being discussed
with the name of the tool used to view it. The revised exchange identifies the
reference as pointing to the Bulletin article about Daniel, then introduces
TRACE as the app in which the player can inspect it.

## Dialogue changes

Both the common origin bridge and the newer three-choice introduction use the
clearer explanation. The surrounding conversation now answers what the entry
contains, what TRACE shows and what remains unknown. “Very little” is replaced
by the article title and reference number, followed by the explicit absence of
the original article text. The sender invites independent inspection instead
of telling the player what they are “supposed to understand.”

This is a wording change. The reference remains unverified. No earlier article
body, authenticated provenance, Daniel device access, suspect or fate is added.
The curious, suspicious and cautious branches retain their original choices
and continuations. Installation still requires the separate player action.

## Save compatibility and source authoring

- The 31 common bridge speaker positions, all player turns, node IDs and branch
  IDs are preserved. Already-selected reply IDs remain valid.
- Existing delivered messages remain in the saved message history. The revised
  wording applies to future delivery; there is no replay or history rewrite.
- No save schema, storage, completion guard or recipient-knowledge rule changes.
- The original 28 October manuscript remains untouched. The revised bridge is
  authored in `docs/sources/trace-origin-2026-11-02/NARRATIVE.md`.
- The importer reads the revised source, verifies its stable speaker positions
  and generates the runtime data. Repeated generation produced identical bytes.
- All eleven Version History groups and its closing dialogue remain identical
  to their values before this change.

## Files changed for this request

- `src/content/versionHistoryConversationData.ts`: common bridge wording.
- `src/content/actIRegistry.ts`: newer three-choice introduction wording; all
  pre-existing workspace edits retained.
- `scripts/import-version-history-conversation.py`: revised source and stable
  bridge-position check.
- `docs/sources/trace-origin-2026-11-02/NARRATIVE.md`: complete revised bridge
  and the three branch responses.
- `tests/e2e/version-history-conversation.spec.ts`: check the clearer exchange
  through the real chat flow; use the existing revised Corrections Desk button
  label instead of the obsolete `OPEN NEXT LEAD` label in three scenarios.
- This report and `artifacts/trace-origin-2026-11-02`: verification records.

## Verification

Typecheck and lint passed. All 1,414 unit tests passed in 53 files. Production
build passed with the existing advisory about the large client chunk.

| Check | Actual result |
| --- | --- |
| `npm run typecheck` | PASS; repeated after correcting the test button labels |
| `npm run lint` | PASS; repeated after correcting the test button labels |
| `npm test -- --maxWorkers=2 --reporter=dot` | PASS: 1,414 tests / 53 files |
| `npm run build` | PASS; existing large-client-chunk advisory |
| Full `npm run test:e2e -- --workers=4 --reporter=line` | 166 passed, 6 failed / 172, 20.7 minutes |
| Focused rerun, 8 scenarios with one worker | 7 passed, 1 failed, 6.7 minutes |
| Unknown origin and all Version History conversation scenarios | PASS: 5/5 in the focused rerun |

The initial full run had two screenshot-write `UNKNOWN` errors, one desktop
viewport assertion failure and three scenarios waiting for the obsolete
`OPEN NEXT LEAD` button. The screenshot cases passed on rerun without source
changes. The three conversation scenarios passed after using the existing
`THE CORRECTIONS DESK` button label. The origin scenario additionally checked
the new wording through actual selection and Send, voluntary installation,
reload and manual reference entry. The optional conversation scenario retained
its recipient-scoped Send checks.

One regression remains: the legacy Home test at 1280×900 expects the “Read
Daniel Mercer brief” button to be 100% inside the viewport. Its measured
intersection ratio was `0.9967672228813171` in both runs. The Home layout and
that assertion were not changed by this dialogue task. This failure is recorded
without weakening the assertion or claiming a clean complete-suite pass.

Across the initial run and focused rerun, 171 of the 172 scenarios had a
successful run; the full 172-scenario suite was not repeated after the test-only
label corrections. The initial sandbox launch failed with `spawn EPERM` before
any tests ran; the permitted browser runs supplied the results above.

Logs and machine-readable results are in `artifacts/trace-origin-2026-11-02`.
Tracked screenshots overwritten by the test runs are restored to their exact
pre-run working-copy bytes, retaining the owner's earlier changes.

The owner explicitly selected “Baiki skrip perbualan dahulu” when asked about
the attachment. The 10-main-scene chapter restructuring has therefore not been
implemented in this task. No APK, commit or push was produced.
