# Episode 01 — post-Lucas gameplay expansion

**Superseded flow:** the later user correction removes the Bulletin handoff described in this report. See [MESSAGE_FIRST_FLOW_CORRECTION.md](MESSAGE_FIRST_FLOW_CORRECTION.md) for current progression. Validation and S30 references below describe the earlier implementation, not the current default player route.

Implemented 21 October 2026 from the supplied gameplay request. No PDF is produced. The new dialogue is English, matching the existing game script.

## Playable flow

1. Lucas leaves FIND DANIEL. Sophie and Maya exchange short, increasingly personal messages before Maya leaves. Existing departure IDs and final membership remain intact.
2. The second Sophie private contact leads to four authored response barriers: responsibility for the group conflict, a question about Daniel, Sophie's repeated checking of his conversation, and whether the player will stay involved. Each barrier has three choices and different replies. Refusing involvement stays in `choices`; opening the note later does not rewrite that refusal.
3. The existing note, permission inspection and optional recovery request lead to the read-only snapshot. New playthroughs that completed the expanded private exchange receive the Relay recovery channel. Relay is an alias, never a resolved character identity.
4. The player questions Relay before opening Fragment 001. Four cards expose speaker labels and surviving reply references. Selecting two cards swaps them; Verify Reconstruction checks their relationship. Original timestamps and source authentication remain unavailable.
5. Failure has no energy cost or limit. Three hint tiers are available on request. Four failed attempts offer assistance that places the opening pair, leaving the question/answer relationship for the player to resolve. Reset changes only the arrangement; attempts and hints remain saved.
6. Solving and retaining are separate actions. Solving records `OPEN-RECOVERED-CHAT-001` once as player knowledge; the explicit save action retains an unverified evidence copy. Neither action shares anything with an NPC or awards K01/K02/R04.
7. After the player inspects the existing public Notes item and Archive Index and records the 14/13 discrepancy, Sophie's follow-up offers full copy, claim summary only, count observation only, a question, or privacy. Offering the full copy is not sending it: Sophie asks for the messages, and a second choice plus Send is required. The actual text and a recipient-specific receipt are then recorded. Asking about the index does not grant Sophie knowledge of the recovered conversation.
8. A personal question allows a thoughtful answer, a joke, or deferral. The player then follows the existing public Bulletin bridge and S02–S30 investigation. There is no early episode ending.

All player messages are emitted by explicit send actions. Selecting a reply is only a draft. NPC queues never contain player-authored messages. Choice gates, queues, deadlines, restored sequence, arrangements, hint count, attempts and receipts live in the saved state. Interrupted recovery resumes through The Archive; a completed conversation can be reviewed and retained later from the recovered phone home.

## Source decisions and conflicts

- Sophie is Daniel's younger sister in current canon. Romantic wording from a generic missing-person pitch is not imported into her dialogue, and this segment awards no romance.
- The existing snapshot remains the recovered phone. The proposed separate M-0714 installation is adapted into a limited reconstruction channel inside that snapshot, without replacing the existing recovered-record catalog or item locks.
- The phrase “removed after verification” is a claim made by an unknown participant in an unverified fragment. Correct ordering proves internal reply consistency only. Relay explicitly asks for an original or revision history before drawing a conclusion.
- The opening 14-signed/13-visible index and the later Bus 4 escort discrepancy stay distinct. No private evidence is automatically sent to Maya or the group.
- The note already exposes the 7–14 range. It is not presented as a newly discovered reference after recovery. No unsupported live external-access alert or new culprit is introduced. The canonical next investigation supplies the continuing hook.
- `E01-S01`–`E01-S30`, existing departure events, `MIR-*` catalog order, title inspection keys, four passwords and gallery provenance remain intact. New events use the `OPEN-PRIVATE-*`, `OPEN-RELAY-*`, `OPEN-RECOVERY-DISCLOSURE-*` and `OPEN-RECOVERED-CHAT-001` namespaces.
- Story Bible v2 remains unavailable. These adaptations follow the supplied working rules and current source files; they do not resolve the broader provisional chronology.
- Earlier saves without the expansion fields keep their progress and do not acquire a replacement transcript. New fields are optional in schema v1 and validated on load. The legacy localStorage key is not touched or migrated.

## Reference review and practical limits

Three frames (20%, 50%, 80%) were sampled from each supplied video, not a complete audiovisual viewing. They show short exchanges, group departures, private contacts, player responses and a concealed-identity helper. The authored Archive dialogue is original; Duskwood script, characters, video frames and imagery are not runtime assets. Samples are in `artifacts/post-lucas/video-reference` and can be reproduced with `scripts/inspect-duskwood-reference.mjs`.

This is a playable segment expansion, not a verified 3–4 hour episode. Neither the suggested 35–50 minute segment nor total episode duration has been established through human playtesting. Audio recovery, fragment-image puzzles and CCTV are outside this segment. Existing password locks remain independent and optional.

## Validation

- Typecheck, lint, unit tests and production build were run successfully; the unit suite contains 197 passing tests, including recovery, persistence, refusal, source uncertainty and Sophie disclosure receipts.
- The initial targeted fresh opening, interrupted reconstruction and complete S30 routes passed (4 browser tests).
- `npm run test:e2e -- --workers=4`: **52 passed, 1 failed** in 8.4 minutes. The sole failure was a filesystem `UNKNOWN` error opening `qa/phase-05/sophie-portrait.png` for a screenshot; no gameplay assertion failed in that test before the write error. This was not a clean full-suite pass.
- An isolated final run passed **6/6**, including that portrait test, the new reduced-motion/no-auto-answer regression, the full fresh S30 route, interrupted recovery with a changed arrangement, and earlier-save continuity. Across the full and focused runs all 54 distinct current browser scenarios have passed, but the original screenshot write failure remains documented rather than reported as a clean 54-test run.
- The recovery screenshot was visually inspected; metadata now uses the phone theme's muted text colour to remain readable on the light cards.
- Build retains the existing advisory for a JavaScript chunk over 500 kB.

The first browser pass exposed an omitted Relay queue in the top-level timer. Both the timer and store deadline selection now include that queue. An accessibility correction also keeps phone-first delivery scheduled normally under reduced-motion preferences instead of scheduling a premature zero-delay no-op. The reconstruction screenshot is `qa/post-lucas/reconstruction.png`.

Local review server: `http://127.0.0.1:5173/`. Saves past this segment are not rewound. No APK or deployment was requested in this pass.
