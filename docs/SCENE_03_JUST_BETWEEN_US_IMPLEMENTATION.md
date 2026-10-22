# Just Between Us — implementation

Owner source: `f05f2975-e584-4eef-93fe-ab4f25cf6601/Pasted text.txt`, **FINAL REVISED CANON EDITION**, received 22 October 2026. This supplies the previously missing `ch01_sc03_just_between_us` and supersedes the earlier handoff-only limitation. It replaces the active post-Lucas private conversation without appending the legacy recovery/Relay dialogue.

## Authored content and progression

`scripts/import-scene03.py` imports exact player/NPC lines, pauses, typing markers, responses and effects into `src/content/scene03Script.ts`. The imported scene has **19 main choice points / 86 response branches**, four free options at every main choice, and one premium option at 01/03/06/08/11/13/16/17/18/19. The graph in `src/content/scene03.ts` compiles stable OPEN-S03 events into the existing runner. Authored player follow-ups, including 19B and both 19E follow-ups, remain separate selection-plus-Send confirmations rather than automatic messages. No alternative dialogue is invented to turn a confirmation into another four-way decision.

The existing Scene 02 handoff owns the 5,500 ms delay, notification and original “Hey.”. Scene 03 begins with the following authored 1.5-second pause only after the player opens Sophie. It neither repeats Hey nor adds another 5.5-second delay. An older save where Hey was already opened but the rest of Scene 03 did not exist begins the new post-Hey content on its next private-chat opening. The original opened timestamp, activation event and group history remain intact.

Only Sophie speaks. Existing portraits, shell-level notifications, online status and avatar typing dots are reused. The runner gives short private messages approximately 0.9–1.8 seconds and longer messages up to 3 seconds; authored pauses/typing remain additional explicit nodes. The requested 20–25-minute playtime is a reading/decision target, not a forced wait or measured playtest result.

## Save checkpoints and drafts

Optional `privateScene03` state extends schema v1 without migrating legacy localStorage. It holds the reading/checkpoint state, a remaining queue deadline, selected draft, recipient receipts and completion/readiness flags. Back, Home, lock, page hide and visibility changes request checkpoint actions. No further private turns are delivered while the conversation is paused; reopening restores the same pending turn and remaining delay. Waiting choices remain paused choices, and a selected but unsent response survives leaving/reloading without becoming a message.

Loading a save that was reading Scene 03 checkpoints it before the phone returns to Home. The player still chooses whether to open Sophie again. Duplicate opens and React StrictMode cleanup/setup cannot replay lines or effects. Intentional upward scrolling keeps the scroll position and exposes a new-message count/jump control.

## Canon and knowledge receipts

Knowledge is attributed to actual delivered Sophie lines. Existing OPEN-S01 contact-list/unreadable-note/unreachable and OPEN-S02 disputed-timeline flags are reused. New OPEN-S03 flags cover the disclosed sibling, fiancée, wedding, childhood and coworker facts. Every new private NPC record has a player receipt; each player response has a Sophie-specific receipt. Maya, Lucas, Eli and Nora do not receive private information or relationship changes merely because they are discussed. An undisclosed stored codename remains undisclosed. Neither deleted group-message body is exposed; no retrieved photo/note attachment is added.

The script's global completion checklist is broader than some paths' actual dialogue:

- A police report is explicitly confirmed only on **06B** (“We've reported it.”). Other routes cannot receive that claim automatically.
- Wedding planning is explicit on **08A/C/E**; 08B/D reveal the engagement but do not explicitly confirm wedding preparations.
- Eli's coworker/Axiom affiliation is explicit on **13A/C/D**. 13B/E do not supply it. 14D can confirm she works with Daniel, while 14A names Daniel's workplace; neither is silently expanded into every omitted affiliation claim.
- Choice 14's authored Axiom question may therefore name a company not yet mentioned on some paths. A future option is not an incoming-source receipt.

The implementation preserves all dialogue and all free/premium choices, completes all routes after their final authored message, and awards only heard facts. It does not repair the checklist by inventing common lines, suppressing choices or silently granting knowledge. Source edits would be needed to guarantee every listed fact on every route. Essential facts remain available on free responses, and premium does not grant forensic proof.

## Relationships and completion boundary

Sophie-only authored effects apply once under stable IDs and clamp touched dimensions to 0–100. Romance is unchanged. Earlier Scene 02 permitted signed negative trust/suspicion outcomes; those historical values and other characters are preserved rather than retroactively rewriting prior decisions. This resolves the range conflict conservatively within the new scene: new Sophie deltas are bounded, while existing unrelated state is not reset.

The final authored “Goodnight :)” completes OPEN-S03-COMPLETE, marks Sophie offline and records OPEN-S03-NEXT-EVENT-READY. It does not open Archive, trigger recovery, introduce an Unknown Sender, or schedule Chapter 2. No authorized next screenplay is activated in this task; readiness is stored for that future connection. The existing Chapter 2 proposal files remain untouched.

## Validation

Coverage includes exact imported dialogue for all 86 branches, every free/premium gate, separately sent follow-ups, actual-source facts, receipt privacy, bounded effects and unchanged romance/other characters. Save cases cover drafts, remaining delay, interrupted/old handoffs, completion and idempotence. Browser cases exercise all 19 choices, police-report and canonical relationship disclosures, old handoff compatibility, leaving/reloading mid-sequence, premium follow-ups, narrow-screen scrolling and the offline ending. Actual command results are recorded after execution; no real-device playtime or OS-kill certification is claimed.

Verified on 22 October 2026:

- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm test -- --maxWorkers=4`: 27 files, **464 tests passed**.
- `npm run build`: passed. Vite retains its bundle-size advisory: main JavaScript 714.46 kB (205.96 kB gzip), above the 500 kB advisory threshold.
- Focused Scene 03 browser suite: **5 passed** (1.7 minutes), artifacts under `artifacts/scene03/verified-focused-browser-results`.
- `npm run test:e2e -- --workers=8 --output=artifacts/scene03/full-browser-results`: **70 passed** (5.7 minutes), including the complete Scene 01/02 handoff and five Scene 03 cases.

The first focused browser run exposed a zero-duration stopped-typing marker that could leave the scheduler waiting without a changed deadline. The runner now consumes that marker atomically; a unit regression covers it, and both the focused rerun and full browser run passed after the fix. The 320px private-chat screenshot was inspected for header, avatar, choice/Send and scrolling layout.
