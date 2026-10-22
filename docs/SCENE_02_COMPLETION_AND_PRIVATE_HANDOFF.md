# Scene 02 completion and private handoff — 22 October 2026

> Scene 03's full script has since been supplied and implemented. The original handoff remains intact; current continuation and source conflicts are documented in [Just Between Us implementation](SCENE_03_JUST_BETWEEN_US_IMPLEMENTATION.md). Missing-script notes below describe the earlier delivery's limits.

The owner supplied the exact missing group continuation in attachment `b3ae8b9b-02a0-4678-aa53-22382ac37086/Pasted text.txt`. The companion `a859b84a-b17b-4319-bfb4-a4b6cdd76496/Pasted text.txt` is Scene 01, not Scene 03. Scene 01's authored content remains unchanged.

`src/content/scene02ContinuationScript.ts` imports the actual continuation with `scripts/import-scene02-continuation.py`. The existing typed scene graph appends choice 08D and choices 09–13 without changing earlier line IDs or duplicating 08C. All 13 main group choices have four free responses; 09E, 11E and 12E add one premium option at their respective points. Every authored player follow-up remains separately selected and sent. Production entitlement and developer preview access remain unchanged; no payment feature is added.

## Group events and knowledge

Two unique system records say “Maya deleted a message.” Neither has an original body, attachment, recovery action or recoverable evidence. Maya's explicit disagreement adds only disputed-timeline knowledge; the premium source-comparison branch does not establish any final movements as verified. No relationship biographies, MIRROR, Relay or culprit claims are introduced.

Lucas leaves through a shared authored event after every choice-11 branch. His earlier messages remain, his member/presence flags become false, the participant display excludes him and subsequent player replies do not grant him receipts. A delivery guard blocks further Lucas group lines without an authored rejoin. If his legacy private contact was already unlocked, it remains accessible as retained history, with further legacy dialogue disabled during the new flow. Maya goes offline but remains a group member.

The existing recipient-specific group receipts remain active. Relationship deltas apply once under stable effect IDs, with romance unchanged. Source receipts and knowledge are never promoted into verified evidence.

## Completion, notification and activation

Scene 02 ends only after choice 13 is explicitly sent and all final group lines finish. It records `OPEN-S02-COMPLETE`, `groupComplete` and its completion timestamp. A queue deadline for `OPEN-S03-FIRST-MESSAGE` is persisted 5,500 ms after the final group message. The authored two-second closing silence falls within this transition rather than adding another two seconds to it.

The player stays on the current screen. At the saved deadline, Sophie sends the supplied “Hey.” once and becomes online. The shell banner says “Tap to open conversation”; viewing an older part of the group is not force-scrolled. Reloading before the deadline preserves it. Reloading after delivery retains one message/notification record. Clicking that notification, opening Sophie's inbox row or opening her contact explicitly records `OPEN-S03-ACTIVATED` and `openedAt`; delivery alone does not activate the private scene.

New optional scene fields validate in save schema v1. A save parked at `OPEN-S02-SOURCE-BOUNDARY` resumes at the new convergence, except old 08D saves first receive their newly supplied reaction. Existing messages, choices, relationships, receipts and source records are preserved; the legacy localStorage key is untouched.

## Missing Scene 03 and scope limit

The full revised **JUST BETWEEN US**, `ch01_sc03_just_between_us`, with 19 choices is absent from the two current attachments and repository searches. The continuation attachment explicitly permits implementing only a persisted pending notification/handoff if Scene 03 is missing. The current implementation therefore delivers only the explicitly supplied opening “Hey.” and records its opening; it does not replay the old post-Lucas recovery dialogue or invent the other 19 choices. The separately quoted following opening lines are not used to masquerade as a complete scene. Full Scene 03 dialogue, all 19 choices and their complete knowledge/relationship audit remain unimplemented and untested until the actual final script is provided. No MIRROR work is part of this task.

## Validation

The automated route traverses all 14 Scene 01 decisions and all 13 Scene 02 decisions, then Lucas's departure, the closing exchange and the handoff deadline. Branch coverage includes all 59 group response branches and separately gated embedded player lines. Dedicated cases verify all five Lucas-exit branches, recipient exclusions, two inaccessible deletions, old-boundary resume, completion order, exact delayed delivery, explicit private opening, no replay, narrow layout and preserved scroll position. Exact command results are appended after execution.

Final executed results:

| Check | Result |
| --- | --- |
| `npm run typecheck` | Passed, 0 errors |
| `npm run lint` | Passed, 0 errors |
| `npm test -- --maxWorkers=4` | 26 files, **365 passed / 0 failed** |
| `npm run build` | Passed; existing bundle-size warning, 665.40 kB JS / 194.82 kB gzip |
| `npm run test:e2e -- --workers=8 --output=artifacts/scene02-completion/full-browser-results` | **65 passed / 0 failed**, 5.3 minutes |

All four dedicated browser handoff scenarios also passed in the focused run. An earlier default-concurrency unit run, concurrent with eight browser workers, exceeded the five-second limit in the existing Photos presentation case; rerunning the full unit suite with four workers passed. No assertions were removed and no timeout was increased for that unit case. The initial handoff browser tests were corrected to explicitly Send the existing choice-06 follow-up and join the group in their fixtures; the final whole-route browser run passes.

Retained-contact presentation tests additionally verify that an already unlocked Lucas remains accessible after his group departure, and that retained private history contains no new group-receipt lines or enabled legacy replies. A pure save/resume test covers a handoff resumed one day overdue, without duplicate delivery or automatic scene activation.

Untested/unimplemented: the full 19-choice Scene 03 screenplay, which the owner confirmed will arrive separately; real-device/OS process-kill testing. Browser reload, normalized-save round trips, overdue resume and cross-tab conflict regression are covered. The task does not add MIRROR functionality or claim that Scene 03 itself is complete.
