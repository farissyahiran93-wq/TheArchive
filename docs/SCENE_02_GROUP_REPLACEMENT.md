# Scene 02 group transcript replacement

> The later owner-supplied continuation removes the source boundary described below. Current behavior is documented in [Scene 02 completion and private handoff](SCENE_02_COMPLETION_AND_PRIVATE_HANDOFF.md). This report preserves the original replacement's execution history.

Owner direction, 22 October 2026: replace the conversation in FIND DANIEL from the beginning using **THE UNINVITED GUEST**, scene ID `ch01_sc02_uninvited_guest`. This replaces the previous three-line placeholder; it is not an appended old group conversation. Scene 01 private messages, codename privacy and voluntary JOIN GROUP remain intact.

`src/content/scene02.ts` contains the supplied dialogue, eight primary choice points, four free responses per point, and one premium at 01/03/05/07. Authored one-line player follow-ups are confirmations within an already selected branch, each requiring a separate visible Send. No alternative follow-up dialogue is invented to inflate those into four options.

The shared pure conversation engine records stable OPEN-S02 events in the existing optional Scene 01 transcript state. New group fields hold the scene identifier, actor presence, source boundary and recipient receipts. Each NPC line arrives independently with actor-specific pacing and typing. Sophie goes offline after fetching water and returns after choice 07. Group player receipts exclude offline Sophie; private codename disclosure is never copied to Maya or Lucas. Group notifications show the actual sender avatar/name and exclude outgoing player messages.

The timeline premium branch grants only Lucas's claim and Maya's explicit disagreement as unverified knowledge, when those lines actually arrive. It does not establish a verified last-seen time, grant K01/K02/R04 or create evidence. No note image is attached, including the branch asking to see it. Relationship changes apply once after the corresponding branch finishes. Trust, affinity and suspicion preserve the supplied signed deltas, bounded to -100…100; romance is unchanged.

Previously joined three-line reboot saves restart the replacement group from its beginning once, preserving private conversation and existing source data. `groupScript` prevents replay on subsequent refreshes. Legacy localStorage is untouched; authentic legacy regression routes remain separate.

## Supplied source limit

The user supplied all of Parts 01–07 and Part 08 through branch C's effects. Choice 08D text is supplied but its reaction and the subsequent convergence are not. The owner instructed us to follow the supplied script. Accordingly, all supplied reactions are playable, choice 08D sends its supplied line without an invented response, and all routes stop at an internal source boundary after choice 08. The requested Lucas departure and subsequent Sophie private scene are not fabricated or marked complete. No placeholder authoring text is shown inside the game. Additional screenplay can extend the boundary without rewriting already delivered event IDs.

## Validation

Unit coverage exercises all 36 main response branches, nested player Send gates, save normalization, idempotence, NPC receipts, offline recipients, private-name isolation, actual sender notifications, production premium guard, relationship changes, absence of evidence grants and the exact source boundary. Browser coverage checks group replacement, premium sub-reply reload, narrow layout, Sophie presence and earlier three-line save replacement. Actual execution results are reported in the task response.

The composer keeps Send outside its scrollable reply list on small screens, and the status clock stays on one line. Review images are retained in the per-test browser results under `artifacts/scene02`.

The first full regression run exposed an existing overlapping startup-load race during the legacy portrait reload: React StrictMode could call hydrate twice before either asynchronous load finished, including when a pending journal needed replay. Store hydration now shares one in-flight promise, with a dedicated regression test proving one load and one activation write across duplicate callers. Concurrent-save conflict protections remain intact. QA map screenshots also use per-test output paths to avoid Windows errors overwriting a shared PNG.

Final executed checks: typecheck and lint passed; 25 unit files / 320 tests passed; production build passed with the existing large-bundle warning (653.05 kB JavaScript, 191.33 kB gzip). Eight focused browser scenarios passed. After the hydration fix, the repeated full 61-scenario run passed 60, including the previously failing portrait reload and map scenario. Its one failure was a Windows write error for the shared legacy `qa/ui-01/chat-320x720.png` screenshot. That screenshot now uses per-test output, and the failed layout scenario passed in a separate rerun (1/1). The final full run was therefore 60/61 plus a successful targeted rerun, not a single clean 61/61 run. Results are under `artifacts/scene02/verified-browser-results` and `artifacts/scene02/layout-rerun-results`.
