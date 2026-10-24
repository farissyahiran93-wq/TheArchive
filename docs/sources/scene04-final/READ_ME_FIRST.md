# CODEX READ ME FIRST — THE ARCHIVE SCENE 04

## What these files are
- `THE_ARCHIVE_SCENE_04_THE_PUBLIC_STORY_FULL_SCRIPT.md` — full authored dialogue, branching choices, complete fictional Greyhaven Bulletin article, Browser/Archive interactions, state map and acceptance checklist.
- `THE_ARCHIVE_SCENE_04_THE_PUBLIC_STORY_FULL_SCRIPT.txt` — same complete text for tools that prefer plain text.

## Your task
1. Inspect the existing repository and the final authored Scenes 01–03 first. Confirm Scene 03 closes with Sophie promising a public article **without actually sending it**. Do not overwrite Scenes 01–03.
2. Integrate Scene 04's entire story flow and all authored dialogue/choice branches. Reuse existing UI, story engine, relationships, event queue, evidence, browser, Archive and save systems. No ad-hoc duplicate state stores.
3. Keep article and records as **local simulated game data**, not a request to an actual public website. If existing canonical article metadata differs, preserve the existing canon and report the conflict instead of silently overwriting it.
4. Preserve real user actions for all choices, links, acknowledgements, source notes, and Scene 05 entry. The optional C07 group segment and unknown sender message must not gate progress.
5. Install The Archive only through the earlier onboarding lifecycle. Scene 04 activates a limited INDEX, and Scene 05 handles the older copy's actual text. NEVER reveal the diff/missing line here.
6. React to the player's actual prior sender disclosure, sender block status, player-name disclosure and relationship changes. No NPC omniscience.
7. Add or update deterministic tests for scene gates, sender blocked/unread, optional group skipped, deferred article, Archive opened/closed, save/load, evidence labels, and no duplicate events.
8. Run typecheck, tests, lint and build where available. Supply changed-file inventory, execution results and outstanding issues. Do not claim integration is already complete.

## Critical gameplay gate
`scene03_completed` → one delayed Sophie article notification → player opens public article → manual article inspection → Sophie discussion → optional group and sender messages → player opens The Archive index and acknowledges source limitations → final Sophie dialogue → `scene04_completed` → player intentionally chooses Scene 05 Version History.

Scene 04 contains 16 authored `OPEN-S04-C01`…`C16` choice points; `C07` is optional if the player enters the group. C10 and C11 are genuine Archive UI choices, not fake player chat messages. Nine E/★ extended responses are optional and must not paywall plot-critical evidence.

## Do not break
Daniel's fate, Nora contact (Scene 07), older article body (Scene 05), missing-line interpretation (Scene 06), unknown sender's identity, provenance of recovered index, saved game compatibility, or Lucas's departure.
