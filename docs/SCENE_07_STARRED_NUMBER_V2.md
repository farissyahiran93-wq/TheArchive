# Chapter 1 v2 — Scene 07: The Starred Number

The new scene is an opt-in continuation from a completed Corrections Desk scene. The old Scene 07 Byline route and its saves remain available. The v2 scene uses `ch01v2_sc07_starred_number` and an optional `chapter1.starredNumberV2` save field; no existing state is migrated or reset.

## Playable sequence

1. After Scene 06 completion, manually open **The Starred Number**.
2. A delayed Sophie notification starts the private conversation.
3. Select and Send one request to see the saved export.
4. Inspect the label, unnamed number, star and provenance limits.
5. Select and Send one of four attitude choices. Three specific follow-up questions and a recipient-scoped group message are optional.
6. Save one private conclusion. Completion records readiness for Scene 08, **The Last Check-In**.

The entry displays `555-0147`, a fictional in-game number that is never read from the device. The observed entry is stored as unverified evidence because its original source and author cannot be authenticated. The scene grants no knowledge that Daniel selected the number or knew the player. The player's private note is not shared with NPCs. Group sharing requires a separate selected Send.

Scene 08 was subsequently implemented in Phase 04 and now opens through a manual next-lead action.

## Save and regression contract

The new save field is optional, so earlier saves validate unchanged. Repeated entry, ticks and Sends are idempotent. Old Byline source state and event IDs remain untouched. Tests cover prerequisites, delayed delivery, explicit Send, evidence limits, private completion, group Send guard and save normalization.

Checks executed on 2 November 2026: `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`, and focused `npm run test:e2e -- tests/e2e/scene0607-email.spec.ts`. Record the actual e2e result in the delivery report.
