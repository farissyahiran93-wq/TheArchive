# TheArchive — TRACE phone recovery specification

Date: 5 November 2026. Status: MASTER PLANNING ONLY. SPOILER / DEVELOPER ONLY.

This specification describes future work. It does not unlock a module, amend a save, replace a scene, or authorize an APK. The owner-supplied 50-scene brief is the authority for the new campaign's recovery milestones. The current runtime remains intact.

## Status and scope

- **CONFIRMED CANON:** Daniel's encrypted phone archive is supplied through Unknown, not Sophie; TRACE installation and recovery require explicit player actions. Recovery reaches 20/40/60/80/100 percent across the five chapters.
- **CONFIRMED CANON:** percentages describe a defined recoverable archive, not the whole physical phone, truth, case completion, or source authenticity. External testimony and public records do not add recovery percentage.
- **PROPOSED DESIGN:** the manifest accounting, data structures, operation protocol, technical packaging and exact intermediate integer values below.
- **OPEN DESIGN DECISION:** final manifest contents, approved evidence text, media, exact segment sizes, keys and source transport. A milestone cannot be implemented by inventing recovered material.

Read alongside [the narrative state specification](THEARCHIVE_NARRATIVE_STATE_SPEC.md), [the scene matrix](THEARCHIVE_50_SCENE_MATRIX.md), [the story bible](THEARCHIVE_STORY_BIBLE.md) and [the gap register](THEARCHIVE_PLOT_GAP_REGISTER.md).

## Existing implementation audit

| Verified existing source | Current behavior | Planned disposition |
| --- | --- | --- |
| `src/game/trace.ts`: `TraceState`, `tracePresentation`, `traceAction`, `validateTrace` | Workspace/Tracker/Decryptor/Vault/Activity presentation and a local index-reference scan. Its percentage is elapsed animation, not phone recovery. Only explicit findings inspection creates the private unverified analysis. | Retain for its historical graphs; do not reinterpret `scan.status: complete` as archive progress. |
| `src/ui/TraceApp.tsx`, `src/ui/trace-app.css`, `src/ui/useTraceScan.ts` | TRACE 2.0 interface, local source boundaries, resumable scan presentation, locked payload tools. | Reuse design and lifecycle behavior; add campaign-specific projections only during implementation. |
| `src/content/traceTools.ts`, `src/game/traceTools.ts`: `traceToolAvailable` | Typed nine-tool catalog; actual story guards determine availability. Most future modules remain locked. | Preserve catalog IDs and existing guards for old saves. A new campaign requires real authored capability guards and reducers. |
| `src/game/archiveOrigin.ts`: `archiveInstalled`, `originAction` | Existing voluntary package/install flow. | Reuse interaction pattern, but pin new campaign origin to its Scene 4/5 flow. Do not retag old installs. |
| `src/game/chapter2Access.ts`: `Chapter2Access`, `canStartAccessRecovery`, `chapter2Access` | Historical encrypted-package/recovery subsystem, persisted deadlines and explicit test opening. | Preserve as historical Chapter 2; its timed job is not a new five-chapter manifest. |
| `src/content/mirror.ts`: `RecoveryPolicy`, `mirrorCatalog`, `recoverySources`, `inspectionKey` | Append-only MIR records with independent item locks and source restrictions. | Keep MIR IDs, order and legacy title-based inspection keys. Reuse compatible records only after a reviewed source mapping. |
| `src/game/mirror.ts`: `mirrorAvailability`, `recoverMirrorSource`, `saveMirrorEvidence`, `linkMirrorEvidence` | Pure availability guards; inspection, retention and private linking are independent. | Preserve these distinctions in the new model. |
| `src/ui/DanielMirror.tsx`, `MirrorRecordView.tsx`, `MirrorMediaViewer.tsx`, `MirrorEvidenceBoard.tsx` | Recovered-device navigation, item viewing, zoom and private comparisons. | Reuse as views where suitable; no source read or knowledge award on render. |
| `src/content/galleryMedia.ts`, `src/content/characters.ts`, `public/media/portraits` | Six supplied gallery PNGs and six registered identity portrait sets. Dormant supplied Ana, June, Rowan and Vivian portraits/avatar pairs also exist; Rachel has no supplied portrait. Gallery metadata/authenticity remains unavailable; portrait art is not evidence. | Reuse approved assets when the story authorizes their character; no fabricated photo pixels or identification via Unknown's portrait. |
| `src/game/guidance.ts`, `src/ui/GuidanceDot.tsx`, `src/ui/guidance-dot.css` | Pure objective guidance with flashing green dots; static reduced-motion equivalent. | Preserve visual language and settings. Guidance points to an action and never performs it. |

The repository has no complete five-stage manifest with the targets below. Existing `tracePresentation().progress`, a completed MIR inspection, a public finding, or an old Chapter 2 job cannot supply it automatically. Documentation marked as an implementation report describes historical behavior, not proof that this new model exists.

## Five-stage capability and milestone schedule

All scene references below are planning IDs. They do not replace runtime IDs.

| Chapter | Capability scope | Required accounting milestones | Explicit investigation after recovery |
| --- | --- | --- | --- |
| C01 — THE FIRST TRACE | Initial file recovery; recovered messages/notes; source-linked evidence summary; basic timeline | S05 approximately 12%; S06 20%; hold 20% through S10 | Open partial messages and notes, inspect log timestamps, save limited timeline finding. |
| C02 — THE OTHER COPY | Additional fragments; source/file comparison; available photo metadata; backup comparison | S03 approximately 28%; S05 approximately 34%; S08 40%; hold through S10 | Compare contact lists; distinguish external captures; compare second backup lineage; inspect draft/audio. |
| C03 — THE BROKEN TIMELINE | Timeline reconstruction; source correlation; contradiction analysis | S02 approximately 48%; S05 approximately 54%; S08 60%; hold through S10 | Separate digital events from witness accounts; inspect camera gaps; retain U-17 as an identifier, not a person. |
| C04 — THE HIDDEN HAND | File provenance; version history; access records; tamper analysis | S02 approximately 67%; S03 approximately 74%; S09 80%; hold through S10 | Trace authority/custody, evaluate contact manipulation, compare testimony against logs. |
| C05 — THE ORIGINAL RECORD | Final reconstruction; complete archive review; evidence synthesis; final case report | S02 approximately 88%; S03 approximately 94%; S08 100%; hold through ending | Review communications and original references; resolve planted number/card; corroborate attribution; explicitly send report to Rachel. |

Exact integer accounting proposal: fix a versioned manifest at **1,000 recovery units**. Units measure reviewed authored recoverable fragments, with assigned weights; they are not invented physical byte counts. This supports the requested approximate intermediate targets without false claims about real phone capacity.

| Operation batch (PROPOSED DESIGN) | Entry scene | New unique units | Cumulative units | Display |
| --- | --- | ---: | ---: | ---: |
| TA-R01 | TA-C01-S05 | 120 | 120 | 12% |
| TA-R02 | TA-C01-S06 | 80 | 200 | 20% |
| TA-R03 | TA-C02-S03 | 80 | 280 | 28% |
| TA-R04 | TA-C02-S05 | 60 | 340 | 34% |
| TA-R05 | TA-C02-S08 | 60 | 400 | 40% |
| TA-R06 | TA-C03-S02 | 80 | 480 | 48% |
| TA-R07 | TA-C03-S05 | 60 | 540 | 54% |
| TA-R08 | TA-C03-S08 | 60 | 600 | 60% |
| TA-R09 | TA-C04-S02 | 70 | 670 | 67% |
| TA-R10 | TA-C04-S03 | 70 | 740 | 74% |
| TA-R11 | TA-C04-S09 | 60 | 800 | 80% |
| TA-R12 | TA-C05-S02 | 80 | 880 | 88% |
| TA-R13 | TA-C05-S03 | 60 | 940 | 94% |
| TA-R14 | TA-C05-S08 | 60 | 1,000 | 100% |

The C05-S01 key unlocks access eligibility for the final archive container, which comprises three disjoint recovery batches: TA-R12 in S02 (80 units), TA-R13 in S03 (60 units) and TA-R14 in S08 (60 units). Submitting the key adds no recovery units and does not process any batch. TA-R14 additionally requires the actual S07 reconstruction/completion receipts and its authored source conditions; it does not require an invented second key puzzle. The final operation still requires an explicit Start in S08. In C02-S09/10, C03-S01/04/06/09/10 and C04-S05/06/07/10, newly *read* or newly compared records may already have been recovered by the preceding batch. This prevents recovery percentage from creeping above the chapter cap. If later authors need a new fragment there, redistribute that chapter's fixed units before its manifest is released, rather than silently adding units to a released manifest.

## Manifest and persistent schemas

The following are **PROPOSED DESIGN** contracts, not existing TypeScript exports. Names are illustrative documentation types; implementation must validate them and bind them to the existing store deliberately.

```ts
type ArchiveManifest = {
  manifestId: string; manifestRevision: string; campaignRevision: string;
  owner: 'daniel'; totalRecoveryUnits: 1000;
  entries: ArchiveEntry[];
  chapterRecoveryTargets: Record<string, number>; // C01:200 ... C05:1000
  sourceReferences: SourceReference[];
};
type ArchiveEntry = {
  entryId: string; category: 'messages'|'notes'|'activity-logs'|'gallery'|
    'call-history'|'voice-recordings'|'deleted-fragments'|'file-metadata'|
    'archived-records';
  sourceArchiveId: string; logicalRecordId: string;
  fragments: ArchiveFragment[];
  permanentlyUnavailableRanges: UnavailableRange[];
};
type ArchiveFragment = {
  fragmentId: string; recoveryUnits: number;
  bodyAssetRef: string; contentDigest: string;
  segmentRange: { start: number; end: number; unit: 'byte'|'authored-segment' };
  fragmentUnlockConditions: Condition[];
  firstEligibleBatchId: string;
  provenanceRef: string;
};
type RecoveryState = {
  archiveManifest: { manifestId: string; manifestRevision: string };
  archiveEntries: Record<string, {
    recoveredFragments: string[]; recoveredVersions: RecoveredVersion[];
  }>;
  chapterRecoveryTargets: Record<string, number>;
  currentRecoveryPercentage: number; // validated derived cache, not authority
  fragmentUnlockConditions: Record<string, Condition[]>; // content projection
  recoveredVersions: RecoveredVersion[];
  sourceReferences: string[];
  persistentRecoveryState: {
    completedBatchIds: string[]; operationReceipts: RecoveryReceipt[];
    job?: { jobId: string; batchId: string; manifestRevision: string;
      status: 'running'|'paused'|'ready-to-review'; elapsedMs: number;
      eligibleFragmentIds: string[]; startedEventId: string };
    viewedVersionIds: string[]; retainedFindingIds: string[];
  };
};
```

`Condition`, `SourceReference`, `RecoveredVersion`, `RecoveryReceipt` and `UnavailableRange` must be implemented as validated discriminated data, not executable content strings. `RecoveredVersion` records a unique deterministic version ID, source archive, sorted fragment IDs, integrity result and first recovery receipt. A receipt records batch/job/event IDs, manifest revision, actual recovered fragment IDs and save revision. Content definitions supply unlock conditions; saves record their receipts, never an editable copy of authority that can unlock itself.

The deliberately repeated brief field names above show the complete requested contract. Implementation should normalize definitions into the immutable manifest and persist references, receipts and actual fragment sets only; redundant target/condition/percentage projections must be recomputed, not trusted from a save.

### Accounting invariants

1. `recoveredUnits = sum(weight(fragmentId))` across **unique** recovered fragment IDs belonging to the pinned manifest. All weights are positive integers and total exactly 1,000.
2. `currentRecoveryPercentage = floor(100 * recoveredUnits / 1000)`. Do not award percentage for elapsed animation, opening TRACE, inspecting external evidence, saving an inference, relationship changes or chapter completion alone.
3. One logical fragment has one accounting identity even if the same content occurs in two backups. Duplicate/retransmitted fragments have zero additional credit; an alternate conflicting source version is retained as comparison evidence unless explicitly allocated a distinct recoverable manifest fragment.
4. The scene milestone guard validates the required batch receipt and fragment set, not just the numeric percentage. A forged `20` cannot complete C01-S06.
5. Recovery is monotonic within a manifest revision. Optional deletion of a private note does not remove recovered bytes; replay does not duplicate units. An integrity failure quarantines a candidate before commit, so counted fragments are never silently replaced or subtracted later.
6. The released manifest's denominator and weights remain fixed. Future optional records live outside the percentage or require a separately versioned, explicit compatibility design. Never make a returning player's 40% become 34% by changing the denominator.
7. All nine categories can have multiple entries/fragments. Allocate authored content by category and reveal schedule before implementation; do not distribute dummy units simply to satisfy the chart.

### External source separation

Maintain separate origin classes: `daniel-phone-archive`, `external-capture`, `witness-statement`, `public-record`, `official-disclosure`, `player-analysis`. An external file may contain genuine Daniel material but counts only when a reviewed manifest lineage identifies eligible archive fragments. A screenshot from Lucas cannot automatically be classified as a newly recovered Daniel message. Nora's certified copy, Rachel's reply, Maya's photograph, Sophie's export and the public inventory remain external even when they corroborate an archive entry.

The second backup in C02-S08 requires receipt of an attributed package, inspection of its manifest/lineage limitations and explicit comparison. It may contribute only preallocated missing fragment IDs. It neither authenticates the first copy wholesale nor upgrades every matching record to verified.

## Recovery operation protocol

**PROPOSED DESIGN**, adapting existing pure reducer and checkpoint patterns:

1. Offer a batch only after its scene, accepted source package, installed TRACE and actual key/source prerequisites are satisfied. Future modules remain visibly locked with a useful prerequisite description.
2. Player opens the operation, reviews source/limitations and presses Start. Save a stable job ID, pinned manifest revision, eligible fragment IDs and start receipt atomically. Review or elapsed time alone cannot start it.
3. Progress animation is a separate `operationProgress` value. A UI may show “Operation 100% · Archive 12%”; never label both values simply “Recovery”. Reduced motion can finish presentation immediately without granting unread source facts.
4. Navigation/lifecycle checkpoint persists remaining work or elapsed presentation. Reopening shows Resume. A job cannot silently restart, duplicate output, run against a newly changed manifest, or bypass a missing prerequisite.
5. On validated completion, commit the predetermined fragment set and job receipt once; show “New recovered material available”. Recovery makes bytes available, not read. An operation success does not grant NPC knowledge or save a player inference.
6. Player explicitly opens recovered records. Each opened version obtains its own inspection receipt. Player then saves a finding, assembles timeline slots or compares sources as the scene requires.
7. Any disclosure uses recipient review, persisted draft and Send; any official report is a separate reviewed Send. Cancel returns without transmission.

No new mandatory 25-minute wait is implied by this plan. The existing historical production deadline is preserved for its route. New operation pacing is an **OPEN DESIGN DECISION**, to be set from human playtests; test bypasses must never write fabricated proof, actor knowledge or authorization.

## Partial rendering and re-recovery

Use **three independent dimensions**:

| Dimension | Permitted labels | Meaning |
| --- | --- | --- |
| Content availability | RECOVERED / PARTIALLY RECOVERED / UNRECOVERED / CORRUPTED | Which authored content is actually readable. CORRUPTED identifies real unavailable ranges; it is not a decoding invitation without a supplied recovery path. |
| Provenance/authenticity | SOURCE UNVERIFIED / corroborated for a specified claim / authenticated for a specified purpose | Who supplied the source, what chain is known, and the narrow claim supported. RECOVERED never means authenticated. |
| Interpretation | direct observation / attributed witness claim / INFERENCE ONLY | Whether the displayed finding quotes observable material or proposes a relationship. |

Render only eligible authored fragments. Represent gaps as neutral range markers such as `[unrecovered segment]`; do not use generated completion, autocomplete, fabricated punctuation or exact missing word counts unless the source encodes them. Do not expose future body text through search, previews, thumbnails, alt text, accessibility trees, notification snippets, audio waveforms or inspector/export routes.

A logical record retains the same ID across chapters. A new fragment creates a version derived from `logicalRecordId + sourceArchiveId + sortedFragmentIds + manifestRevision`. Keep earlier viewed versions and the original source, mark “additional fragment recovered” and highlight the newly readable range. Never rewrite the historical chat delivered to an NPC or an earlier player's saved quotation in place.

Overlapping fragments must match at declared boundaries or remain parallel conflicting versions. A comparison can say the sources differ; the tool cannot choose a “true” source by convenience. Metadata retains raw timestamp, timezone/offset availability, parser result and any proposed normalization. Missing timezone remains missing. A call log is an event record, not proof Daniel held the phone; a photo location label is not GPS travel evidence.

An analysis summary cites exact record/version/range references and lists limitations. Updates invalidate only derived comparisons that depend on changed ranges and offer review; they do not unsend previous reports. Player observations remain verbatim and version-pinned. A corrected finding is a new revision with its correction reason and source references.

## Source verification and case conclusion

Verification is claim-scoped. Example: a custodian may confirm that a supplied inventory reference belongs to a named series without confirming the photographed card's author, its original item, Daniel's presence or Vivian's responsibility. Matching hashes between archive copies establish byte agreement at acquisition; they do not establish original authorship or truth of the text.

GH-DSC-03-A begins as a card reference in C01-S09. It is not automatically an original record, identifier for a person, or link to June. Nora's C03-S07 explanation and later custody/index evidence must establish the relation independently. Historical `GB-REF-017`, `ARC-IDX-GB-041`, MIR count discrepancies and public Bus 4 claims remain their own sources unless a later approved authored mapping supplies a link.

At C05-S08, **100% means every recoverable manifest fragment has been processed successfully**. Permanently unavailable material sits outside that denominator and remains honestly marked unavailable. It does not mean all evidence is true, all events are known, the recording speaker is verified, Vivian is legally responsible, or Daniel has been rescued. Those outcomes require separate evidence and official-action receipts. The final case report separates source facts, corroborated findings, testimony, unresolved limits and player hypotheses.

## Spoiler containment and packaging

Developer documents contain the ending. They must stay under `docs`, never copied into `public`, `dist` or Android assets. Unknown's Eli mapping is developer-only until TA-C05-S06; retain Unknown display identity and avoid a named portrait, asset label, accessibility name or debug UI that discloses it earlier.

Client-side story locks protect ordinary play, not against a determined user inspecting a fully shipped offline bundle. This is a material architectural limitation. During future implementation, choose either chapter content packs delivered when available, accepting their offline/network tradeoff, or a fully offline bundle with honest limited resistance to source inspection. Do not claim cryptographic secrecy for plaintext future chapters shipped with their keys. In either design ordinary UI/search/export guards must share the same pure visibility predicate.

## Acceptance and future validation

Do not add tests in this documentation task. Future recovery implementation must demonstrate:

- All 14 batches sum to 1,000 unique units; chapter and scene targets match the table; every unit maps to approved authored material.
- Duplicates, second-copy matches, replay, repeated ticks, changed wall clocks and restore do not inflate recovery or alter collection times.
- Invalid source/key/scene prerequisites cannot start or complete jobs; a persisted fake percentage cannot satisfy completion.
- Partial record expansion preserves old version citations; conflicts remain parallel; gaps reveal no future content in any presentation surface.
- External evidence adds zero units; 100% does not authenticate all records or trigger rescue by itself.
- Save interruption, hidden-page pause, native suspension, two-tab conflicts and reduced motion preserve the same content and receipt state.
- Every required read, saved finding and report Send remains explicit. Optional social disclosure remains optional and recipient-scoped.
- TRACE 2.0 navigation, flashing green guidance/static reduced-motion guidance and existing historical regressions remain intact.

Relevant existing regression sources include `src/game/trace.test.ts`, `traceBridge.test.ts`, `traceTools.test.ts`, `chapter2Access.test.ts`, `save.test.ts`, `storeHydration.test.ts`, `guidance.test.ts`, and `tests/e2e/trace2.spec.ts`, `trace-bridge-v3.spec.ts`, `guidance.spec.ts`, `chapter1-v2-finale.spec.ts`. They cover their existing systems, not this unimplemented manifest. Future authorized implementation must run the repository's required typecheck, lint, unit, build and full E2E commands and report actual results.
