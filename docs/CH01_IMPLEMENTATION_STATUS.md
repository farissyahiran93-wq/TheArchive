> Superseded where it conflicts: the latest official implementation source places Unknown Sender in Scene 02, Nora’s retained page in Scene 08, Archive first investigation record in Scene 04, and the recovered post-verification claim in Scene 15. Scenes 04–18 now have playable structural previews. See [current implementation report](CH01_OFFICIAL_IMPLEMENTATION_REPORT.md). Earlier material below is retained as editorial history.

# Chapter 1 implementation status

## Completed structure

The 18-scene registry is `src/content/chapter1Plan.ts`: five acts, entry/exit contracts, participants, objectives, surfaces, dependency chain, potential gains, evidence dependencies, relationship limits, implementation/approval statuses and conceptual legacy mappings. It is never imported by the live runner to dispatch scenes. The supplied outline is pinned verbatim under `docs/sources/CH01_MASTER_18_SCENES.txt`; the master flow document retains all detailed scene blueprints.

## Inspected implementation

- Scene 01: `scene01Script.ts` / `scene01.ts`, 14 main choices; explicit Send, optional codename disclosure, invitation and delayed warning preserved.
- Scene 02: `scene02.ts` / `scene02ContinuationScript.ts`, 13 choices; Maya deletions, presence beats, Lucas departure and persisted handoff preserved. Initial roster is the three authored NPCs only.
- Scene 03: `scene03Script.ts` / `scene03.ts`, 19 choices and 86 branches. Its final farewell is now `Goodbye.`. The choice-19 goodnight options/responses, closing life-story reference and break line are time-neutral; IDs and consequences remain unchanged. Already delivered text is retained.
- State and receipt transitions: `src/game/scene01.ts`; scheduling is persisted, not advanced by registry access. `store.ts` routes actions/ticks and saves through existing persistence; `engine.ts` validates saves. IndexedDB remains `the-archive-reboot`; legacy localStorage remains untouched.
- Existing Mirror: `content/mirror.ts`, `opening.ts`, `galleryMedia.ts`; `game/mirror.ts`; DanielMirror/item viewers. Existing C2 life catalog/controllers, per-item locks and recovery deadline remain available to their historical save route.
- Legacy public route: `slice.ts`, `phase03b.ts` (including recovery handling) and related UI retain E01-S01–E01-S30 IDs. Existing tip/editor roles are not silently reattributed to Nora.
- Chapter handling: `content/episodes.ts` declares no unlockable episodes. Historical C2 access/controller saves remain compatible; the new master-route initializer cannot start them after Scene 03.

## Not playable yet

Scenes 04–18 are all outline-only. Existing legacy/C2 content may supply reusable mechanics and artifacts but is not completion of those new scenes. No blank dialogue, invented reply, new score, evidence award or chapter ending is fabricated. Unknown at 09, Archive at 10, Eli introduction at 12 and explicit Chapter 2 continuation are dependency contracts pending approved scripts.

## Missing approvals and media

Next: Scene 04 full public report/search interaction, Nora byline/contact route and authored chronology. Then 05–07 comparison and reporting scripts; 08 approved damaged-note asset and provenance; 09–12 request/consent/introduction scripts; 13–14 personal boundaries; 15–16 exact version/request/custody evidence; 17 disclosure/rejoin alternatives; 18 role-status artifact and chapter finale. Do not substitute old collage pixels, invent protected recovered material or expose a solution through metadata.

Recommended order is 04, 05–06, 07, 08, 09–12, 13–14, 15–16, 17–18. Review source and knowledge boundaries at each integration. Target runtime and editorial quality require playtesting; no numerical quality or 3–4 hour duration claim is made.

## Verification

Typecheck, lint and production build passed. Unit suite: 655 tests across 34 files passed. Full browser run: 88 of 90 passed; the two failures were a non-frozen one-millisecond handoff assertion and a shared QA screenshot file write error. After freezing only the test clock and moving that test’s screenshots into its own output folder, all 16 tests in the four affected/relevant browser files passed (2.9 minutes). The full 90-test suite was not repeated after those harness fixes; all 90 distinct tests were covered across the full run and the targeted recheck. No tests were disabled. Existing Vite >500 kB chunk advisory remains. New coverage checks all 18 registry entries, stable first-scene namespaces, five acts, dependency integrity, fresh-route gating, save reload and invalid-plan validation. Historical C2 fixture builders explicitly select the historical route; those tests remain enabled. Browser coverage includes complete opening branches and historical access/continuation compatibility. No Android device or signed-release acceptance is claimed for this architecture task.
