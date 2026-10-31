# GREYHAVEN UX / guidance implementation

## Audit and decisions

- The Unknown Number introduction used a linear list of single-line player turns. `withArticleReplyTones` added paraphrases of those turns while preserving the same target and effects. New saves carry `traceIntroRevision: 2026-10-31`; the new graph introduces TRACE with three distinct replies and converges into the old installation sequence. Existing saves without the marker keep the old graph and already-delivered messages. Sender claims remain unverified; the reply about Daniel's files explicitly avoids claiming provenance.
- Some synthetic tone groups had three differently worded variants of the same action. The new graph removes those duplicates while retaining the authored single action; the eleven main Version History groups keep all choice IDs and receive differentiated wording. Legacy graph options remain unchanged to preserve in-progress drafts.
- The Scene 06 form rendered both `local('S06-C06')` and `p.inquiry.text` together. It now uses the existing reviewed and receipt fields for separate selection, review and confirmation screens. Sending remains guarded by the reducer's receipt check. `R-GB-CD-002` is persisted in the existing save and displayed in Browser activity as delivery, not a publisher answer. Saved drafts clear the review state and must be reviewed again.
- The source-comparison button comes from a `vh-source` gate in `UnknownConversation`; gate 05 requires public, index and policy flags; gate 06 requires four explicitly reviewed gaps. It opens the existing Version History workspace. The workspace now explains the three sources and distinguishes matching references from unverified changes and the missing earlier copy. It does not synthesize a past article.
- The visible game and in-game app labels use GREYHAVEN and TRACE. Historical Memory Project Archive names, `Archive Index`, source identifiers, saved transcripts, and internal storage/package IDs have separate meanings and are retained.

## Current guidance coverage and limitations

The typed selector `src/game/guidance.ts` projects a single objective from existing state; it creates no unlocks, knowledge, receipts, or save migration. The `on`, `minimal` and `off` setting is local to the existing menu preference store; no mode changes progress. On shows dots in the phone home/dock and selected conversation areas. Minimal shows only the primary home/dock indicator and suppresses detailed dots; the Current Lead remains readable in TRACE. Off suppresses dots while keeping the Current Lead accessible. The implementation covers opening conversation choices, the Unknown Number package and reference, available Version History reads, Scene 06–10 public source reads and eligible private conclusions, and an actionable Chapter 2 Unknown access choice. It deliberately does not guess future objectives or surface inaccessible sources.

Coverage is not yet global across every Chapter 1 Scene 06–10 local interpretation and interactive element, Browser, Calls, Contacts, every conversation list and future app. Optional activities do not receive dots. This is a material limitation relative to the request, not a claim that those paths were implemented.

The dialogue audit checks exact duplicates and choice targets throughout the active graph, removes known generated tone-only duplicates and checks the newly authored groups. It does not prove that every semantically similar authored branch across all historical and current story graphs is distinct. The separately pinned historical graph intentionally retains old lines/choices for existing saves. Review of all semantic near-duplicates and full branch reachability remains open.

## Files changed for this work

- `src/content/actIRegistry.ts`, `src/game/types.ts`, `src/game/scene01.ts`, `src/game/engine.ts`
- `src/game/guidance.ts`, `src/game/menuPreferences.ts`, `src/game/scene06.ts`, `src/game/archiveOrigin.ts`
- `src/ui/HomeScreen.tsx`, `src/ui/Messenger.tsx`, `src/ui/Scene01Chat.tsx`, `src/ui/VersionHistoryConversation.tsx`, `src/ui/CorrectionsDesk.tsx`, `src/ui/PublicStory.tsx`, `src/ui/TraceTools.tsx`, `src/ui/UtilityApps.tsx`, `src/ui/MainMenu.tsx`, `src/ui/trace-tools.css`
- `src/game/guidance.test.ts`, `src/game/dialogueGraph.test.ts`, `src/game/versionHistoryConversation.test.ts`, `tests/e2e/scene06-final.spec.ts`, `tests/e2e/version-history-conversation.spec.ts`, `tests/e2e/guidance.spec.ts`

## Verification

Results and limitations will be updated when regression testing completes. No APK has been packaged; physical Android behavior has not been tested. Do not uninstall existing playtest installations.
