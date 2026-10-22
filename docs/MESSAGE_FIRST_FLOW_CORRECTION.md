# Message-first Episode 01 correction

User direction, 21 October 2026: investigations and questions should unfold through NPC messages, with the conversational experience of the supplied reference videos. Bulletin worksheets, source-classification quizzes, “A sentence you can defend”, proof-level summaries and tip-form progression are not the requested player flow.

This explicitly supersedes the earlier instruction to make the Bulletin S02–S30 investigation the default continuation. Canonical records, IDs, source constraints and the old investigation implementation remain preserved. The old interface is available only through the development `legacyopening` regression entrance; normal and production play do not expose Bulletin in the home grid, dock, lead card or navigation.

## Current progression

- Lucas leaves; Sophie/Maya fallout and Sophie private exchanges continue with explicit reply choices and Send.
- The player consents to the recovered snapshot and questions Relay, then reconstructs Fragment 001.
- After Relay's final response, Sophie sends a check-in without knowing what was found. The player may offer/send the full copy, disclose the unknown participant's claim only, ask a question, or keep it private. The count observation is offered only if the index has already been inspected and compared.
- Sophie offers space to continue examining the recovered records. No Bulletin referral or public tip task follows.
- Relay discusses the 7–14 reference as a range already present on Daniel's page, without inventing an authenticated provenance link or an external-access event.
- The player reads the unlocked Untitled note and Archive Index and records the discrepancy. Relay then asks, in the live session chat, what can be connected. Reply selection is a draft; only Send appends the player message. An overconfident answer receives a corrective NPC response, not a score or quiz failure.
- The tentative comparison stays private. No K01/K02/R04, culprit, NPC evidence disclosure, old canonical scene completion or episode ending is awarded by these actions.

The old S02 slice is not started on completion of the new Sophie exchange. Its earlier-save state, choices, evidence and pending history remain stored when the player explicitly uses **Continue MIRROR conversation** from Home. The new `flow: mirror-first` marker makes the active scheduler ignore dormant legacy case events; it neither deletes those events nor migrates the legacy localStorage key. This button is a continuation, not a restart. No user save was reset during development.

This pass provides the corrected conversation/recovery/reference/private-comparison segment. It does not claim the complete 3–4 hour episode or a new ending is authored. Later Episode 01 dialogue and investigations must continue in the same NPC-led format; the old Bulletin ending is not silently reattached.

## Validation

- Typecheck, lint and build pass; 199 unit tests pass.
- Targeted browser checks verify the new fresh route has no Bulletin quiz, reconstruction leads to a Sophie message, source questions come from Relay, and choosing a response does not auto-send it.
- Full browser run: **52/55 passed** in 6.2 minutes. Two legacy tests incorrectly reopened normal play and expected the removed Bulletin button; these now reopen the explicit legacy regression entrance. The new earlier-save test also attempted to press the disabled Home button while already at Home; that redundant test action was removed. This full run was not clean and is not reported as 55/55.
- The corrected legacy referral test passed in the focused run. Final independent checks passed **3/3**: preserved two-tab save-conflict protection, explicit earlier-save continuation without reset, and the complete fresh message/recovery/reference/Relay conversation route. All 55 distinct scenarios have passed across the full and focused runs, rather than in one clean full run.
- Final typecheck, lint, 199 unit tests and build pass. The final browser route also asserts no Bulletin button, no “A sentence you can defend” page and no automatic player reply. Screenshots: `qa/message-flow/relay-conversation.png`, `qa/message-flow/home-no-bulletin.png`.
- The existing production bundle-size advisory remains.
