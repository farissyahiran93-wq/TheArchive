# Chapter 2 — reunion, private loyalties and intercepted context

Owner direction: 22 October 2026. The priority is attachment to FIND DANIEL before suspicion. This replaces the earlier access-arc endpoint at “Can we start?” for new play. Chapter 1 remains unchanged.

## Playable order

1. Scenes 06–07: the existing 12-app / 67-record Phone Mirror, independent optional item locks and storage recovery. Mail's Storage Notification enables recovery. Development preview opens recovery immediately; production retains the saved 25-minute estimate. The six recovered contents remain unspecified, not invented.
2. Scene 08, group reunion: one incoming Maya message 18 seconds after starting recovery. Opening FIND DANIEL continues the authored banter. Lucas returns only if the saved membership says he left. Sophie is not falsely removed and re-added. Nora is not introduced in this new transcript.
3. Eight main group decisions, G01–G08: ordinary memories, coffee, irritation, self-correction and mutual help frame the index discussion. Different choices receive individual reactions. Every embedded player line requires selection plus Send too.
4. G04 offers full Mirror disclosure, observed clues only, or withholding. The clues option requires having actually inspected LIFE-N1 or LIFE-PH5. Only the actual note/image can then be described. Optional locked note N7, unviewed records, Unknown's identity and SPY access are never automatically shared. Full disclosure means a partial reconstruction with an unauthenticated source, not a live device connection.
5. Group members agree on a modest plan and finish with “Talk soon.” After seven seconds a small private followup arrives: Maya after full disclosure, Eli after clues only, Sophie after withholding. These are character moments, not new major clues. After thirty seconds Unknown separately contacts the player. Neither chat opens itself. Choices pause other incoming story beats until the player responds or leaves the conversation.
6. SPY MODE 001, Eli ↔ Lucas: the supplied Unknown introduction, all 33 supplied intercepted lines and the supplied return conversation. The unlock notice precedes Unknown's final invitation. Read-only, irregular pauses, each actor's avatar typing, one canceled typing beat, final silence and manual return. Leaving pauses the stream at its remaining duration. Refusal has no relationship or knowledge penalty.
7. A free Mirror interlude: reopening and navigating the recovered phone lets the player check context and recovery independently. Scene 09 requires this quiet visit plus resolving or declining SPY 001. It cannot interrupt active Eli/Lucas viewing. Recovery can finish independently; finishing never authenticates the recovered source.
8. Scene 09, THE CONVERSATION THEY DIDN'T SEND YOU: Maya ↔ Lucas. Lucas remembers an older conversation differently; Maya asks him to check the wording and preserve context before sharing it. Care for Sophie, a stale cup of tea and fear of judgment support two plausible readings: caution or withholding. The actual earlier message is not supplied or fabricated. A private-Mirror variant is used only if the player disclosed Mirror access. Otherwise they discuss the unexplained number instead.
9. Manual return to Unknown offers three cautious interpretations. Nobody is accused, no culprit is identified, no exact last-seen time or record provenance is established. This is the current authored endpoint.

## Sources and director adaptations

- Main reunion source: attachment `b8c46d6a-a635-490d-bd74-d00ad3d13c0c`, the expanded group reunion; `9d145f27-db44-429a-8dce-9557f28d0c45` is the earlier overlapping version, not an extra repeated scene.
- SPY 001 source: `e1f9a6ae-44f6-413a-8ca8-1ab6fbbff0db`, preserved NPC dialogue and authored timing indications.
- Life in Fragments source `50b167c7-2219-4502-97fa-fdd9bb4d13ee` matches the previously implemented specification. No duplicate records or new invented recovered contents were added.
- Complete B/C reactions were absent at several reunion choices. They are director-authored here rather than silently repeating A. Private followups and Maya/Lucas Scene 09 are explicitly new director-authored material under the owner's request to adapt and arrange this continuation.
- “Daniel contacted [PLAYER_NAME]” becomes “Daniel had your number”: the incomplete contact list does not prove he contacted the player. Maya cannot use a name disclosed only to Sophie.
- The exact three-day assertion becomes an approximate account of being out of touch; no verified disappearance date is inferred from the system clock.
- The optional locked note is not a mandatory reveal. Lucas describes his own recollection of an earlier copy instead. A filename remains a filename; no unavailable screenshot is invented.
- Full disclosure talks about unreadable returned metadata when recovery is ready, or its original estimate when still running. Withheld/clues-only branches discuss backups generally without learning the player's recovery status.

## State and receipt boundaries

`src/content/chapter2Reunion.ts` compiles content into a graph; all player speech is a choice node. `src/game/chapter2Reunion.ts` owns pure transitions, per-thread sessions, active reading, remaining delays, drafts, branch effects, membership, disclosure, receipts and two independent intercepted streams. React renders this state and requests actions.

The optional `chapter2Access.story` schema-v1 extension preserves old saves. Existing readiness transcripts stay readable and begin at the new first unsent decision when opened; already delivered history is retained. It never touches `the-archive:game-save:v1`. Stable event IDs prevent duplicate messages and effects. Closing, hiding or reloading checkpoints active typing. Notifications are shell-level banners, and interception unlocks never auto-open a thread.

A private disclosure awards knowledge only after its actual Send, only to present group recipients. Intercepted messages create `spy-unverified` player receipts, never NPC knowledge, canonical forensic K01/K02/R04, accusations or automatic trust changes. Skipping either interception preserves relationships and narrative progress.

## Verification

Final validation on 22 October 2026: typecheck, lint, all 558 unit tests (30 files), production build and the full 83-test Chrome suite passed. The complete browser suite took 11.1 minutes. It includes Scene 01 → 13-choice Scene 02 → 19-choice Scene 03, the existing Mirror/legacy regressions and the new reunion → SPY 001 → Mirror → Scene 09 → reflection → reload route. The final focused inbox-search regression also passed after the matching access-thread empty-state correction; typecheck, lint, all 558 unit tests and build were then confirmed again. Final production bundle: 854.58 kB minified / 245.59 kB gzip; Vite retains its existing >500 kB advisory. No source media or missing recovered contents were fabricated. Screenshot evidence is written by Playwright under `artifacts/reunion/`. Missing source media and the six unspecified recovered contents retain their existing honest unavailable treatment.
