# TheArchive — narrative state and persistence specification

> **Canon lock update:** [the dated source chain](THEARCHIVE_CANON_LOCK_2026-11-05.md) requires Sophie's actual message to Eli before Unknown contacts the player, preserves consent for the proposed Lucas backup relay, and distinguishes Rachel's report receipt from independent verification and rescue.

Date: 5 November 2026. Status: MASTER PLANNING ONLY. SPOILER / DEVELOPER ONLY.

The new campaign has exactly five chapters of ten scenes. This file proposes content/state contracts for future progressive implementation; it changes no production code, dialogue, route, UI, save or APK. Confirmed story requirements come from the owner's new master brief; technical type names and field layouts below are **PROPOSED DESIGN**, not APIs that already exist.

The [revised continuity recommendation](THEARCHIVE_STARRED_NUMBER_CONTINUITY.md) requires an actual Sophie-to-Eli receipt before Unknown may know she contacted and invited the player. Daniel's warning-card authorship must remain hidden until the planned corroborated C05-S05 reveal.

## Repository audit and reuse boundaries

| Concern | Verified files/symbols | Existing contract and required preservation |
| --- | --- | --- |
| Current chapter definitions | `src/content/chapter1Plan.ts`, `src/content/chapter1V2.ts`: `chapter1V2`; `src/game/sceneLibrary.ts`: `chapterLibraryForSave` | Older 18-scene metadata and a released ten-scene Chapter 1 coexist. The latter retains The Public Story / Version History / The Corrections Desk in scenes 4–6 and a different chapter title. New plan numbers cannot retag existing saves. |
| Branch schema and runner | `src/content/scene01.ts`: `Scene01Node`, `Scene01Choice`; `src/content/actIRegistry.ts`: `actINodes`; `src/game/scene01.ts`: `deliverScene01`, `sendScene01Choice`, `draftScene03Choice`, `pauseScene03` | Existing discriminated nodes include NPC, wait, choice, gate, condition and event; graphs are chosen by actual revision fields. Preserve stable IDs and delivered history. Reuse this runner through explicit adapters rather than creating an unrelated engine. |
| Scene and source transitions | `src/game/chapter1.ts`: `chapter1Action`; `archiveOrigin.ts`, `scene04.ts`, `scene05.ts`, `scene06.ts`, `sourceInvestigation.ts`, `naturalConversation.ts` | Pure functions under `src/game`; UI requests actions. Do not transfer old Bulletin completion flags to new phone-recovery scenes. |
| Message and group presentation | `src/ui/Messenger.tsx`, `Scene01Chat.tsx`, `SophieConversation.tsx`; `src/game/phonePresentation.ts` | Explicit Send, delivered text, presence and group membership are separate facts. No group member gets knowledge from another recipient's private chat. |
| Calls | `src/game/inventoryFinaleV2.ts`: `InventoryFinaleV2State`, `inventoryFinaleAction`, `inventoryFinaleTick`; `src/ui/PhoneCallScreen.tsx`, `FinaleCallOverlay.tsx` | Existing Sophie call has ringing, decline/miss/callback, visible subtitle timing and required player replies. Reuse as a pattern, not a generic call API assumed to exist. New scene must end on the new exact final line rather than inheriting old postscript dialogue. |
| Notifications and shell | `src/ui/PhoneNotifications.tsx`, `PhoneShell.tsx`; `src/game/phonePresentation.ts` | Shell-level incoming banners; notification arrival is not opening/reading/consent. No automatic app navigation. |
| Evidence and recovered media | `src/game/types.ts`: `Evidence`; `src/content/mirror.ts`; `src/game/mirror.ts`; `src/ui/MirrorRecordView.tsx`, `MirrorMediaViewer.tsx`, `MirrorEvidenceBoard.tsx`, `ChatPhotoViewer.tsx` | Current base Evidence is a small `{id, source, collectedAt, verified}` record. Detailed provenance/fragments below are new design. Append-only MIR and legacy inspection keys survive. |
| TRACE | `src/game/trace.ts`, `traceTools.ts`; `src/ui/TraceApp.tsx`; `src/content/traceTools.ts` | Current scan percentage is presentation. Retain TRACE 2.0 style and genuine capability gates; add no tools from display labels alone. |
| Guidance | `src/game/guidance.ts`: `guidanceTarget`, `currentObjective`; `src/ui/GuidanceDot.tsx` | Flashing green dots remain read-only guidance, with static reduced-motion/off settings. Required and optional actions must be distinct. |
| Save contract | `src/game/types.ts`: `GameSave`, `newGame`; `src/game/engine.ts`: `normalizeSave` | Schema version 1; route markers include `narrativePlan`, `chapter1Edition` and graph revision fields. Existing six-character IDs cannot silently absorb newly introduced characters or reorder identity mappings. |
| Persistence | `src/game/save.ts`: `loadGame`, `writeGame`, `archiveAndReplaceGame`, `listHistoricalSaves`, `restoreHistoricalSave`, `loadScenePlaythrough`, `writeScenePlaythrough`; `src/game/store.ts` | IndexedDB `the-archive-reboot`, database version 1, `saves` store, `primary` key, revision checks, serialized commits and pending-write journal. Historical/archive/replay slots are already distinct. Preserve them. |
| Chapter continuation | `src/game/chapter2Access.ts`: `continueFromChapter1` | Existing Chapter 2 access arc requires its own Chapter 1 completion plus manual continuation. The new C02 is not that historical arc. |
| Assets and verification | `src/content/characters.ts`, `galleryMedia.ts`; `package.json`; `src/game/*.test.ts`, `tests/e2e` | Reuse supplied portraits/gallery with honest scope. Current scripts: `typecheck`, `lint`, `test`, `build`, `test:e2e`. |

`ARCHITECTURE.md`, older README material and historical reports describe different stages. Use this inspected code audit to scope future changes, and retain those reports as historical records rather than treating their old scene counts as the new master plan.

## Identity, authority and content versions

**CONFIRMED CANON:** exactly 50 numbered scenes; optional chats, calls and puzzles are activities inside a scene. New scene names and chapter names are fixed by the owner brief. **PROPOSED DESIGN:** documentation IDs `TA-C01-S01` through `TA-C05-S10`, chapter IDs `TA-C01` through `TA-C05`, campaign ID `thearchive-50`, initial content revision `master-2026-11-05`.

Those IDs are planning namespaces until implemented. Never reuse `ch02_scene05_version_history`, `OPEN-S01`, E01-S01–S30, C2_ACCESS IDs or MIR IDs to mean a different newly numbered scene. Build a reviewed mapping table during each scene implementation; title resemblance is not completion equivalence. An old ten-scene finale cannot automatically unlock the new Chapter 2.

Authority is layered: immutable approved content defines allowed events and prerequisites; player actions request transitions; pure reducers validate prerequisites and append receipts; selectors derive UI. Neither a React effect, a content title, wall-clock passage, a developer checklist nor a relationship score can grant missing narrative facts.

## Proposed content contracts

The code below is an authoring contract to refine in implementation. `Condition` and `StateChange` must be typed unions of reviewed predicates/effects, never `eval` strings. Every reference must resolve within its pinned content revision.

```ts
type NarrativeScene = {
  chapterId: string;
  sceneId: string;
  title: string;
  entryConditions: Condition[];
  characters: CharacterRef[]; // eligible actors, not automatic recipients/members
  dialogueNodes: DialogueNode[];
  playerChoices: PlayerChoice[];
  requiredActions: ActionRequirement[];
  optionalActions: ActionRequirement[];
  evidenceReferences: EvidenceReference[];
  stateChanges: StateChange[];
  completionConditions: Condition[];
  nextScene: { sceneId: string; offerEventId: string; requiresManualEntry: true } | null;
};
type DialogueNode =
  | { id: string; kind: 'npc'; actor: CharacterRef; channelId: string;
      textRef: string; factClaims: ClaimRef[]; next: string }
  | { id: string; kind: 'wait'; durationMs: number; actor?: CharacterRef; next: string }
  | { id: string; kind: 'choice'; choiceIds: string[] }
  | { id: string; kind: 'gate'; actionRequirementId: string; next: string }
  | { id: string; kind: 'condition'; when: Condition; then: string; otherwise: string }
  | { id: string; kind: 'event'; effectIds: string[]; next?: string };
type PlayerChoice = {
  choiceId: string; nodeId: string; textRef: string;
  availableWhen: Condition[]; nextNodeId: string;
  disclosureScope?: { recipientIds: string[]; claimRefs: ClaimRef[] };
  relationshipEffects: RelationshipEffect[];
  requiresSend: true;
};
type ActionRequirement = {
  actionId: string; kind: 'open-chat'|'join-group'|'inspect'|'install'|
    'start-recovery'|'read'|'compare'|'save-finding'|'review-send'|
    'send'|'answer-call'|'return-home';
  subjectRef: string; receiptConditions: Condition[];
  alternativeActionIds?: string[];
};
```

Entry conditions establish eligibility, not automatic navigation. Completion conditions require the concrete action receipts listed in the scene matrix; `stateChanges` describe permitted changes, not an unconditional batch applied when a view mounts. A branch-specific NPC fact attaches to its real delivered node only. Existing omitted source branches stay omitted; planning never awards a fact because it exists somewhere in the manuscript.

### Evidence, claims and provenance

```ts
type EvidenceRecord = {
  evidenceId: string;
  source: { originClass: string; sourceId: string; suppliedBy?: string };
  provenance: { custodyEvents: CustodyEvent[]; sourceVersionId: string;
    sourceLimitations: string[]; contentDigest?: string };
  timestamps: { kind: 'capture'|'event'|'export'|'received'|'normalized';
    raw: string; timezone?: string; precision: string; basisRef: string }[];
  authenticityStatus: { claimRef: string; status: 'unverified'|'corroborated'|
    'authenticated-for-scope'|'disputed'; basisReceiptIds: string[] }[];
  recoveredFragments: string[];
  recoveryStage: { manifestId?: string; batchIds: string[] };
  analysisSummary: { statement: string; sourceRangeRefs: string[];
    kind: 'observation'|'witness-claim'|'inference'; revision: string }[];
  uncertainty: string[];
  playerObservations: { observationId: string; text: string;
    sourceVersionRefs: string[]; savedEventId: string }[];
};
```

Evidence availability, viewing, retention, comparison, authenticity and transmission are separate state changes. The compact existing `Evidence.verified` field must not become blanket proof by projecting a new record's narrow authenticated claim. Keep detailed verification in a separate optional campaign record and expose a conservative legacy projection only where required.

Use an attribution ledger: a `ClaimRef` identifies the exact statement, whether it is source observation/testimony/inference, cited version/range and supported audience. Examples: “Unknown claims to possess a backup” differs from “this manifest matches an independently supplied fragment”; “Sophie says the number was starred” differs from “tamper evidence shows an inserted entry”. Do not make a single global `knowsTruth` flag.

### Relationship and character knowledge

```ts
type RelationshipState = {
  trust: number; tension: number;
  knownInformation: { claimRef: string; sourceReceiptId: string;
    stance: 'heard'|'believes'|'disputes'|'verified-for-scope' }[];
  disclosureFlags: Record<string, { receiptId: string; scope: string }>;
  conversationHistory: string[]; // immutable delivered event references
};
```

Current relationships contain trust, affinity, suspicion and romance. Preserve all old values; do not reinterpret `suspicion` as tension by mutating old saves. A campaign-specific tension measure or explicit read-only adapter is a future implementation choice. Optional romance/premium paths cannot gate the primary mystery or change basic character relationships.

Known information is recipient-specific. A delivered group event snapshots the actual joined members as its recipients. Lucas after departure receives no subsequent group facts; later return is explicit. A private Sophie/Maya consent receipt authorizes only that exchange and scope. It never grants permission to forward to FIND DANIEL, Rachel, Nora or Ana. Authoritative public material is not automatic live knowledge for every NPC; the relevant character still needs an authored observation/disclosure route.

The new cast introduces Rachel, June, Ana, Rowan and Vivian beyond the current `CharacterId` union. Add their identity/state support only as future scenes authorize them. Developer-only `Unknown = Eli` must not merge their player-facing threads, receipts, art or visible roster before TA-C05-S06. Internally, any alias binding must be isolated from UI projection and not export future truth into player knowledge.

## Proposed campaign persistence

Prefer one optional, validated campaign block within the existing save envelope after compatibility review. The following proposal does not bump `schemaVersion`, change the IndexedDB version or add a field now.

```ts
type CampaignState = {
  campaignId: 'thearchive-50'; contentRevision: string; version: 1;
  activeChapter: string; activeScene: string;
  completedScenes: Record<string, { completionReceiptId: string;
    contentRevision: string; completedAt: number }>;
  dialogueHistory: DeliveredDialogue[];
  playerChoices: Record<string, { choiceId: string; sentEventId: string }>;
  installedApps: Record<string, { installReceiptId: string; sourceReceiptId: string }>;
  evidenceViewed: Record<string, string[]>; // record ID -> inspected version IDs
  findingsSaved: Record<string, FindingRevision[]>;
  recoveryProgress: RecoveryState;
  unlockedEvidence: Record<string, { prerequisiteReceiptIds: string[] }>;
  pendingMessages: PendingMessage[];
  pendingCalls: PendingCall[];
  chapterUnlocks: Record<string, { unlockReceiptId: string; enteredReceiptId?: string }>;
  relationships: Record<string, RelationshipState>;
  drafts: Record<string, { nodeId: string; choiceId: string; reviewId?: string }>;
  groupMembership: MembershipEvent[];
  consentReceipts: ConsentReceipt[];
  actionReceipts: ActionReceipt[];
  pendingEvents: CampaignEvent[];
  deliveredEventIds: string[];
  sceneCheckpoints: Record<string, SceneCheckpoint>;
};
```

`RecoveryState` is defined in the [TRACE specification](THEARCHIVE_TRACE_RECOVERY_SPEC.md). Pending message/call definitions record stable IDs, prerequisites, due/remaining timing, immutable text/source revision references, visibility/answer state and delivered receipt IDs. Scene checkpoints store node, draft, typing/remaining-delay state and navigation resume target. `chapterUnlocks` and `completedScenes` are audit projections validated from receipt prerequisites, not independent authorization toggles.

A single source of truth per operation is mandatory. If implementation persists both typed receipts and fast lookup maps, normalization must reject contradictory state or derive the maps; it must not “repair” missing consent by synthesizing a receipt from a completion flag.

### Transition transaction and idempotence

1. Validate campaign/revision, active node, sender, channel, membership, source availability and actual prerequisite receipts against immutable content.
2. A draft selection changes only the saved draft. Review records exact recipient(s), evidence versions, claim list and redactions. Changing any reviewed value invalidates that review.
3. Explicit Send validates the current draft and review, appends the player line and recipient receipts, applies branch effects once, moves the cursor and schedules the next allowed event in one state transition.
4. Use namespaced deterministic event IDs such as `TA-C01-S04:node-id:option-id:sent`. A repeated click or tick seeing the same event returns unchanged state. Multi-step repeated interactions need an authored attempt/operation ID; wall-clock time is not an identity.
5. Commit through the existing revision-aware serialized store. UI success reflects committed state; on failure preserve a recoverable draft and expose save recovery. Do not continue narrative beyond an unresolved conflicting save.
6. Incoming delivery may add a banner and a delivered-to-player receipt. It does not open the chat, inspect an attachment, install TRACE, answer a call or complete an unread investigation. A branch-specific fact can become available on delivery; an action requiring reading still needs an explicit read/open receipt.

## Critical gate contracts

| Gate | Required receipts | What must remain separate |
| --- | --- | --- |
| C01-S01 group entry | Invitation offered; player opts in; explicit JOIN/Send | Merely receiving or viewing the invite cannot add the player. Decline/Later persists and can be reconsidered. |
| C01-S02 → S03 | Authored group conclusion, Lucas departure, persisted private handoff; manual Sophie DM open | Notification scheduling/delivery does not auto-navigate or give private facts to the group. Preserve 5.5-second handoff pattern where reused. |
| C01-S03 → S04 | Sophie authored closing/offline; one once-only Unknown offer; manual Unknown chat open | Old article deadline/Unknown intrusion is not the new entry trigger. Pin the graph revision to avoid two Unknown arrivals. |
| C01-S04 package | Actual offered archive; inspection; explicit accept | Unknown's claim remains attributed; no Sophie backup and no auto-install. Decline/Later leaves a credible resume route. |
| C01-S05 TRACE | Package review; separate Install consent; install completion; manual TRACE open; explicit recovery start/read | Install permission is not consent to surveillance, later requests, social disclosure or live device access. |
| C01-S06 timeline | Real recovered batch receipt at 20%; explicit log reads; distinguish event time from human presence; private Save | Scan completion alone gives no conclusion, NPC knowledge or next-scene completion. |
| C01-S07/08/09 | Actual source delivery; inspect specified export/capture/card fields; save limited observation | Group sharing and Lucas outreach remain optional; declined routes need authored source alternatives. |
| C01-S10 cliffhanger | Inventory read; private Save; explicit return Home; incoming Sophie call; Answer or explicit callback; heard warning and exact final line | Decline/miss cannot unlock C02 or disclose the warning via a fabricated transcript. Callback preserves access. Final line is “But… I already did.” without an extra closing bubble. |
| Each chapter boundary | Its ten scene completion receipts and required recovery batch receipts; explicit next-chapter entry | Recovery cap alone never unlocks or enters the next chapter. Unlocked and entered are distinct. |
| C02 optional Lucas route | Consented contact through an existing lawful channel; actual recipient Send | No auto-return to group, no inferred private channel. If declined, authored independent packet/custodian route preserves required mystery. |
| C03-S06 video evidence | Lawfully disclosed limited source; explicit inspection of supplied material | A gap never proves deletion, guilt, the viewer's access to cameras or the existence of unseen footage. |
| C04-S06 contact manipulation | Version-specific comparison and independent provenance/tamper sources | A mismatch establishes difference; insertion/actor attribution needs its own authored support. |
| C05-S01 final container key | Inspected source clues; explicit key submission; valid unlock receipt | Unlocking makes the final container eligible. It does not run TA-R12 in S02, TA-R13 in S03 or TA-R14 in S08; each requires its own real source/scene prerequisites and manual operation. |
| C05-S06 identity reveal | Actual Eli confirmation plus independent corroboration delivered and reviewed | Earlier U-17 recognition/TRACE knowledge is suspicion, not a revealed identity. |
| C05-S08 report | 100% manifest processing, evidence synthesis, reviewed scope/version list, explicit Send to Rachel, delivery receipt | Delivery does not prove a read, a reply, legal admissibility or rescue. |
| C05-S09 rescue | Rachel's authored assessment of actionable evidence, lawful official coordination and actual rescue confirmation | Player stays remote; no GPS, account access, surveillance APIs or personally dangerous rescue task. |

Declining a required consent action pauses that path with a clear way to return; it does not permanently fail the mystery or manufacture consent to advance. Optional choices modify dialogue/relationships/evidence presentation without destroying required source availability. Specific alternative dialogue and packets are **PROPOSED DESIGN** requiring approved text, not placeholders exposed as real evidence.

## Knowledge, reveal and visibility guard policy

Each scene has four independent ledgers: actual writer truth; character claims/beliefs with sources; player observed/heard material; independently corroborated claims with scope. The story bible and scene matrix schedule them; runtime never imports writer truth as starting player facts. A scene summary must cite only real branch receipts, not all branch possibilities.

Use one pure predicate for source text, search indexing, notifications, thumbnails/full images, accessible labels, evidence export and replays. An individual password unlock cannot bypass a future scene/knowledge gate. Existing ordinary public Notes/Gallery items stay readable; do not lock entire apps. Historical mandatory-fact images remain excluded from early runtime unless both thumbnail and full-view guards are explicitly implemented.

An in-game character dossier may say “identity unverified”; it may not expose Eli's hidden alias, Daniel's survival, June's cause of death, Rowan's role or Vivian's culpability from development metadata. Final report claims become verified only when the relevant corroborating sources are actually reviewed and received. A testimony receipt records what a person said, not the truth of every statement.

## Backward compatibility and migration plan

**No migration is performed in this task.** Future work should use the existing database/origin and retain `com.thearchive.game`; package/version/signer changes require a separate authorized build task.

| Existing save family | Future compatibility treatment |
| --- | --- |
| No `campaignId`; untagged historical opening or Bulletin E01-S01–S30 | Keep original graph, source IDs, delivered messages, choices and completion. Do not infer new-campaign progress from old scene numbers. |
| `narrativePlan: ch01-master-18` with final-script/revision tags | Keep its pinned graph/checkpoints; new authoring documents supersede future plans, not delivered history. |
| `chapter1Edition: ch01-v2-10` | Retain its released ten-scene title/ordering and call transcript for this save. Its scenes 4–6 do not complete TA-C01-S04–S06. |
| Already-started Version History / natural-flow / TRACE bridge graphs | Preserve actual graph tags, drafts, source read receipts and legitimate Scene 6 completion. No injected new introduction or forged authorization. |
| `chapter2Access` historical access/reunion/continuation | Keep historical Chapter 2 content and recovery deadline intact. It is not the new THE OTHER COPY. |
| `historical-save:*`, `scene-playthrough:*`, replay snapshots | Keep original campaign/revision identity. Replays use isolated slots and cannot transfer future facts/progress to primary. |
| Fresh explicit new campaign | Create a new versioned campaign only after player chooses it. Archive prior primary with `archiveAndReplaceGame`'s atomic pattern before replacing; never launch automatically on load. |

The optional block approach still needs a schema/validator review when implemented. Existing validators may reject unknown new enum variants or identities, so “optional” alone is not proof of compatibility. Preserve envelope fields and data unknown to a new projection; do not round-trip through a narrower DTO that deletes old subsystems. If schema/database changes become necessary, introduce a versioned explicit design with backups and rollback tests before code changes.

Never read, delete, import over or automatically migrate legacy localStorage `the-archive:game-save:v1`. The reboot uses `the-archive-reboot`; its pending sessionStorage key is `the-archive-reboot:pending-save:v1`. Pending journals must retain expected base revision. A newer tab wins through existing optimistic conflict checks; a conflicting or corrupt save enters recovery with a downloadable backup, not an automatic reset or merged consent ledger.

Normalizing a save may validate defaults for absent presentation preferences; it must not fabricate a source delivery, player Send, install consent, actor membership, completed scene, public verification, call answer or report authorization. Save restoration preserves event identity and relative pending timing; replay-time rebasing must not rewrite delivered timestamps or historical text.

## Planned validation and acceptance

These are implementation acceptance requirements, not tests added now:

- Validate exactly five chapter definitions and exactly ten scenes in each; unique IDs; all next-scene edges remain in those 50; activities never add numbered scenes.
- Static graph validation: every branch has a valid node, actual fact source, stable event identity and reachable valid completion; no automatic player-authored messages.
- Runtime invariants: selection versus Send; group consent/membership; manual DM/evidence opening; review invalidation; source read versus Save; recipient-scoped disclosure; private findings never become public knowledge.
- Play every mandatory and decline/Later/optional route; relationship extremes cannot block the primary mystery; skipped Lucas outreach has a credible authored alternative.
- Resume at each draft/wait/install/recovery/read/call/report boundary. Test refresh, hidden page, native suspension, duplicate events, clock movement, declined/missed call and explicit callback.
- Historical regression fixtures preserve IDs, messages, source restrictions, already-started graphs and legitimate completed Scene 6; no legacy localStorage access; archives/replay slots stay isolated.
- Evidence checks cover locked search/media leakage, version-pinned citations, external-source zero recovery credit, unverified identity and claim-scoped authentication.
- Final acceptance requires each requested source-linked reveal, Daniel's official rescue alive, the exact chapter cliffhangers and explicit grateful final contact; 100% alone does not satisfy them.

Existing coverage to extend deliberately includes `src/game/dialogueGraph.test.ts`, `sceneLibrary.test.ts`, `save.test.ts`, `storeHydration.test.ts`, `trace.test.ts`, `guidance.test.ts`, `chapter1V2Finale.test.ts`, `chapter2Access.test.ts`, `naturalConversation.test.ts`, and the matching `tests/e2e` flows. Before reporting an implemented phase complete run `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`, `npm run test:e2e` and report actual outcomes plus physical-device limits. Passing the current suite does not establish the unimplemented fifty-scene campaign.
