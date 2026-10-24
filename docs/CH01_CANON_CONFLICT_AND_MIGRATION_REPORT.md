> Superseded where it conflicts: the latest official implementation source places Unknown Sender in Scene 02, Nora’s retained page in Scene 08, Archive first investigation record in Scene 04, and the recovered post-verification claim in Scene 15. Scenes 04–18 now have playable structural previews. See [current implementation report](CH01_OFFICIAL_IMPLEMENTATION_REPORT.md). Earlier material below is retained as editorial history.

# Chapter 1 canon conflicts and compatibility report

Authority: owner master prompt dated 23 October 2026, pinned at `docs/sources/CH01_MASTER_18_SCENES.txt`. This is structural approval, not a full screenplay. It supersedes the immediate post-Sophie new-game Chapter 2 entry. Historical implemented Chapter 2 content remains supported, not reassigned to the new Chapter 1 sequence.

| Conflict | Inspected baseline | Resolution / remaining author dependency |
|---|---|---|
| Eli membership | Scene 02 controller tracks Sophie/Maya/Lucas; profile/header had just been expanded to show Eli without a join event | Restore the actual three-NPC roster in new opening UI. No Eli dialogue or join is fabricated. Historical Chapter 2 membership stays as saved. Future 12 introduction and 17 membership need scripts. |
| Maya versus Nora at Bulletin | `src/content/e01Slice.ts` article explicitly credits Maya as editor; tip/Maya return controller lives in `slice.ts` | New 04 proposes Nora byline and 07 direct contact. Do not replace existing article text, redirect Maya receipts to Nora, or relabel historical inboxes. New report, byline and verified channel await scene approval. |
| Unknown timing | `chapter2Access.ts` previously creates Unknown seven seconds after 03 | New saves carry `narrativePlan: ch01-master-18`; absent access state cannot initialize that controller. Proposed 09 stays outline-only. Existing access-state saves continue; untagged historical saves remain readable without automatically creating new access state. |
| Archive timing | Historical access arc installs after U07 consent and U08 followup | New 10 is only a contract, with 09 permission dependency. No fake installer, empty screen or automatic completion is introduced. Existing installations and recovery due times remain intact. |
| Index versus Bus 4 | Recovered signed/visible counts and public Escort omission are different sources | Keep separate source chains; no shared-cause award from similar phrases, dates or numbers. |
| Nora entry | Historical C2 Scene 08 includes Maya invitation plus visible Nora event | Preserve for existing C2 saves only. New Ch1 Scene 08 is a Sophie note outline; do not reuse its number or replay Nora invitation there. |
| Farewell | Scene 03 ended `Goodnight :)` and included time-dependent closings | New deliveries use `Goodbye.`; night-dependent closing responses are neutralized in place, preserving IDs, branch count and effects. Already delivered messages remain unchanged. Descriptions of past events/sleep deprivation stay authored. |
| 30-scene legacy route | E01-S01–E01-S30 include Bulletin questionnaires, Maya editor correspondence and GCRO source checks | Preserve all IDs/controllers. Registry mappings are conceptual candidate reuse, not executable aliases or completed scenes. No old save is renumbered. |
| Public exploration | Search/Bulletin removed from ordinary Home under earlier owner direction | New 04 intentionally proposes a public-search route. Do not reattach old questionnaires as substitute content. Author 04 first, then integrate an explicit search entry with existing design. |
| Future chapter completion | `episodes.ts` has no unlockable episodes; historical C2 continuation has its own hard stop | New 18 role-status ending and explicit Continue need later scripts/events. No Chapter 1 completion or Chapter 2 unlock is manufactured now. |

## Save contract

Schema remains v1. Optional `GameSave.narrativePlan` accepts `ch01-master-18` or explicit historical `legacy-access`. `newGame()` assigns the former. Validation preserves absent fields rather than inferring a migration. Existing `chapter2Access` state is evaluated before the new-route initialization block, preserving ongoing jobs, drafts and messages. No IndexedDB database/key is replaced, no localStorage legacy key is touched, and no completed-choice effect is re-applied.

Untagged historical saves retain their data and any existing access state. Pre-access saves do not automatically start Unknown. They are not silently converted to the new plan: deciding how an in-progress old route should opt into a rewritten public-source arc remains an author/product decision. No opt-in conversion UI is implemented in this task.

Historical fixture builders explicitly select `legacy-access` so existing Chapter 2 tests still exercise their original content. Tests are not skipped or disabled. New tests independently verify fresh-route blocking, registry boundaries, schema compatibility and the neutral farewell.

## Editorial-to-legacy correspondence

See `chapter1Plan.ts` `legacyCandidates`; these are reuse candidates, never equivalence. E01-S01's older recovery opening supplies only concepts for new 10–11. E01-S02–S10 cover old Bulletin navigation, brief, comparison and tip handling; E01-S11–S17 cover editor/private correspondence; E01-S18–S24 cover public research, timeline and alternative explanations; E01-S25–S26 cover source guidance and request framing; E01-S27–S29 cover the recorded request, transfer checks and corroboration; E01-S30 carries the old supported finale. New scenes 01–03 retain OPEN-S01 / ch01_sc02_uninvited_guest / ch01_sc03_just_between_us and their existing node IDs. No legacy scene is considered completed by completing a new editorial scene.

Source responsibilities, request fallback dialogue, approved note pixels, precise Nora channel and new ending media remain authoring dependencies. These are documented instead of resolved by inventing canon.

## Validation followup

The one-millisecond handoff browser assertion now pauses its virtual clock before comparing the persisted due time, preventing real test execution time from crossing the boundary. The UI01 screenshot test writes into its per-test output folder rather than overwriting shared QA files. Gameplay delays, screenshots from other runs and assertions are preserved. Full-run diagnostics remain in artifacts/ch01-master/results; the 16-test successful recheck is in artifacts/ch01-master/recheck.
