# TheArchive — Master Story Bible

> **Canon lock update:** use [the owner decisions and dated provenance](THEARCHIVE_CANON_LOCK_2026-11-05.md) where this document's older proposed chain differs. The number comes from an internal restricted enquiry system; Sophie uses Daniel's shared family folder; Daniel writes the warning card; Sophie tells Eli before his anonymous contact. Lucas's custody of a second encrypted backup remains proposed. The older Eli-authored-card candidate is superseded.

**Status: MASTER PLANNING ONLY · 5 November 2026 · SPOILER / DEVELOPER ONLY**

This is the narrative planning baseline for [the owner's supplied five-chapter brief](sources/master-story-2026-11-05/MASTER_STORY_BIBLE_50_SCENES.txt), pinned verbatim (SHA-256 `4EEAA0FAB750CB2D45C0E046CA384E11C24501384D17D31D548AC59CD1AB16F3`). It does not activate a route, replace a screenplay, change a save, or authorize APK packaging. The existing runtime remains the delivered GREYHAVEN build until a separate implementation instruction.

Read this with [the chapter plan](THEARCHIVE_CHAPTER_MASTER_PLAN.md), [the 50-scene matrix](THEARCHIVE_50_SCENE_MATRIX.md), [the plot gap register](THEARCHIVE_PLOT_GAP_REGISTER.md), [the recovery specification](THEARCHIVE_TRACE_RECOVERY_SPEC.md), [the state specification](THEARCHIVE_NARRATIVE_STATE_SPEC.md), and [the implementation roadmap](THEARCHIVE_IMPLEMENTATION_ROADMAP.md).

## Authority and status language

- **CONFIRMED CANON:** explicitly stated in the new owner brief. This establishes the future story direction, not player knowledge or shipped functionality.
- **PROPOSED DESIGN:** a recommended way to realise that canon. It needs its own screenplay, evidence source and review before runtime use.
- **OPEN DESIGN DECISION:** missing or conflicting detail requiring a decision before the dependent scene can be implemented.
- **SPOILER / DEVELOPER ONLY:** hidden truth and reveal planning. Nothing here is a public asset, searchable recovered record, notification preview or player-facing summary.

The new direction has exactly **five chapters, exactly ten numbered scenes per chapter, exactly fifty scenes**. Messages, calls, optional conversations, requests, puzzles and documents live inside those scenes. They do not add scenes. The planning identifiers `TA-C01-S01` through `TA-C05-S10` are document identifiers; they are not existing save keys or migration instructions.

## Reconciliation with the existing repository

| Inspected source | Existing direction | Disposition in this plan |
| --- | --- | --- |
| `src/content/chapter1V2.ts` | Released ten-scene Chapter 1, THE MISSING ENTRY; article/version-history/corrections Scenes 4–6 | Retain its runtime and saves. New planning replaces 4–6 with Unknown/archive/missing-hour beats and renames the future chapter THE FIRST TRACE. |
| `docs/CHAPTER_1_V2_STORY_MAP.md` | Earlier staged report; same broad 7–10 starred-number/card/finale structure | Useful historical intent, but its staged status is stale relative to the source. Reconcile concepts, not completion flags. |
| `src/content/starredNumberV2.ts`, `lastCheckInV2.ts`, `secondaryCardV2.ts`, `inventoryFinaleV2.ts` | Actual limited-source contact export, Lucas capture, descriptor card and Sophie call content | Reuse interaction patterns and compatible assets only after a new scene audit. No automatic evidence equivalence. |
| `src/content/chapter1Plan.ts`, `docs/CH01_MASTER_SCENE_FLOW_18_SCENES.md` | Historical eighteen-scene Chapter 1 | Historical route remains intact. Its 11–18 are not additional scenes in this plan. |
| `src/content/chapter2Access.ts`, `chapter2Reunion.ts`, `chapter2Continuation.ts`; `docs/CHAPTER_2_ACCESS_ARC.md`, `CHAPTER_2_SCENES_10_15.md` | Separate historical access/reunion/continuation arc, including more than ten local scene labels | Preserve existing graph, membership events, deadlines and delivered text. New THE OTHER COPY is a distinct planned revision, not a renumbering. |
| `docs/STORY_BIBLE_V2.md` | Historical v2 ruling with a later V6 notice; changing group and Bulletin arrangements | Decision provenance only. New brief controls future relationships and arc. Do not use the title of this historical file as current authority. |
| `src/content/scene01Script.ts`, `scene02.ts`, `scene03Script.ts` | Authored opening with explicit Sends, Lucas departure and manual Sophie DM | Preserve systems and old history. Audit every branch before reusing dialogue; early starred references are hints, not proof of manipulation. |
| `docs/NATURAL_FLOW_2026-11-03.md`, `TRACE_BRIDGE_V3_2026-11-04.md`, `src/content/traceBridgeV3.ts` | Current Unknown/TRACE bridge is led by a public article and metadata reference | Retain delivered history and compatible consent/checkpoint patterns. New phone archive is not the existing metadata-only reference. |
| `src/content/characters.ts`, `public/media/portraits` | Six registered identity portraits plus supplied dormant Ana, June, Rowan and Vivian art; no Rachel portrait in this directory | Reuse available art behind the correct authored introduction. Art does not authenticate a sender, a recovered photo or a live identity. Rachel needs an approved visual decision; do not generate a replacement for existing supplied portraits. |

**OPEN DESIGN DECISION — branding:** the new brief calls the game TheArchive; the delivered title is GREYHAVEN under the 31 October rebranding. Use TheArchive for this planning package and request a specific future display-brand decision. Do not change `com.thearchive.game`, signer, origin, storage or historical titles.

**CONFIRMED CANON / compatibility conflict — Eli:** the new brief uses he/him. Existing `scene03Script.ts` contains she/her references. Future scripts must consistently follow the new direction after an explicit revision audit; historical messages remain as delivered. This task does not edit pronouns, portraits or runtime character definitions.

## Premise and dramatic contract

**CONFIRMED CANON.** An ordinary player with no genuine prior relationship to Daniel Mercer is drawn into a missing-person investigation by Daniel's younger sister Sophie. A number and star in a questionable contact export seem to connect the player to him. The investigation grows from relationships and fragments of Daniel's phone archive into the concealed death of auditor June Ellis and manipulation of Greyhaven Harbor Renewal safety approvals.

The mystery asks three connected questions: where Daniel is, what happened to June, and why this stranger's number was inserted into the investigation. Each has a definite answer by Chapter 5. Daniel is alive in captivity and is rescued by authorities. June is dead; there is no fake-death reveal. Vivian Hale is the principal antagonist, but her guilt must be established through corroborated evidence. TRACE exposes inspectable sources and gaps; it does not narrate the secret truth on demand.

Player choices affect trust, tension, timing, context, permitted disclosures and how people respond. They do not make survival contingent on pleasing an NPC or force the player to conduct a dangerous physical rescue. Deferring an invitation, package, call or sensitive Send preserves a clear return path.

## Secret causal story

The following spine is **CONFIRMED CANON — SPOILER / DEVELOPER ONLY**. Mechanisms absent from the brief remain open below.

1. June, a junior records auditor, identifies discrepancies between original structural safety findings and published approvals for Greyhaven Harbor Renewal. She collects evidence and asks Daniel for assistance.
2. Daniel trusts systems engineer Rowan Bell and discloses a planned meeting with June. Rowan passes the information to Vivian. A contracted security operative attempts to retrieve June's original evidence; June falls during the confrontation and dies from her injuries. The circumstances are concealed as an accident. Vivian knows about the cover-up.
3. Daniel blames himself and continues investigating. He preserves messages, records, logs and references to original documents. He asks coworker Eli Ward to retain an encrypted phone backup.
4. Before Daniel can bring a physical copy of original records to Detective Rachel Hayes, security operatives connected to the cover-up intercept and kidnap him.
5. Daniel is held alive in an old harbor storage facility. The captors need information about hidden evidence and recovery keys. His claim that evidence may be released after a missed check-in creates uncertainty for them; it is a claim, not proof that an automatic release system exists.
6. Eli has the encrypted backup and contacts the player as Unknown Sender. He is afraid because he previously failed to report suspicious system access. He wants Daniel safe and evidence preserved, while hiding his own involvement. He does not know the holding location.
7. The player compares recovered material with witness accounts and official sources. Rowan's actions, the archive manipulation and Vivian's involvement become provable in stages. Rachel evaluates the evidence and directs the rescue.
8. Daniel is found alive. The records conspiracy and the truth of June's death are exposed. Rowan faces consequences and may cooperate; Eli accounts for his omissions. Daniel thanks the player. Sophie, Maya and Daniel receive emotional closure without erasing June's death.

## Character bible and knowledge boundaries

| Character | CONFIRMED CANON: relationship, need and pressure | Voice / playable treatment — PROPOSED DESIGN | Knowledge ceiling before evidence is delivered |
| --- | --- | --- | --- |
| Sophie Mercer | Younger sister; first contact and group inviter; frightened for Daniel; central to number/card discovery | Practical affection, imperfect recollection, occasional impatience, respect for boundaries after they are stated | Knows what she personally found and what she is told. Cannot authenticate Daniel's export, identify Unknown or infer a recovered message the player withheld. |
| Maya Chen | Daniel's fiancée; holds relevant photos, messages and knowledge of his behaviour | Specific everyday memories and guarded grief; withholding is fear/privacy, not automatic guilt | Knows her own exchanges and sources. A received card photo is not first-hand knowledge of the original card. |
| Lucas Grey | Best friend; leaves FIND DANIEL in C1S2 over privacy; later source about another copy | Protective, direct, capable of apologising while maintaining limits | Knows his own capture and friendship. Does not know what another copy contains. Leaving never silently revokes old delivered receipts or grants new ones. |
| Daniel Mercer | Missing, alive, kidnapped; investigated June; regrets exposing her meeting; preserved evidence | Recover ordinary routines, affection, fatigue and mistakes alongside investigation; final gratitude in his own voice | Historical Daniel messages know only their original time context. Live Daniel confirmation waits for Rachel's rescue finding. |
| Eli Ward / Unknown | Coworker; backup custodian; fearful, guilty, not mastermind; anonymous TRACE introducer | Technically bounded explanations, uncertainty, defensive omissions; accountable later | Knows backup handling and his own observed access anomalies. Does not know exact captivity location, other people's private chats, or all of Vivian's actions. Identity confirmed only C5S6. |
| Rachel Hayes | Official investigator; verifies evidence and coordinates rescue | Clear distinctions between leads, corroboration and action; does not promise an outcome on a screenshot | Knows case information available to her official role and actual submissions/replies. Private journal entries never reach her automatically. |
| Nora Vance | Records management officer; explains inventory references and archival indexes | Precise, professional, willing to say an index cannot answer a question | Knows records within her role. No automatic group membership, new phone contact, omniscient provenance or access to all archives. |
| June Ellis | Deceased junior auditor; discovered safety manipulation; Ana's friend; asked Daniel for help | Preserve work, friendships and choices; do not reduce her to an answer-bearing corpse | Records and testimony attribute knowledge to June at the time she had it. A later finding cannot be inserted into her older note. |
| Ana Pierce | Bulletin journalist and June's friend; unpublished material; initially withholds from fear/source protection | Distinguish publication standards from personal loss; consent-based disclosure | Knows her reporting, correspondence and observations. She does not authenticate an unknown audio voice merely because it resembles someone. |
| Rowan Bell | Senior digitisation engineer; complicit under pressure; leaked meeting to Vivian; not mastermind | Rationalisation, responsibility and possible cooperation without absolution | Knows his actions and instructions he actually received. A confession must be checked, and cannot explain events outside his observation as fact. |
| Vivian Hale | Programme director; financial and institutional motive; principal cover-up antagonist | Controlled institutional pressure and intermediaries; no early villain monologue | Knows orders/cover-up within her involvement. Exact knowledge, contractor chain and records need authored sources; no access to player UI. |
| Player | Customisable stranger; no real prior Daniel relationship | Cautious, empathetic, sceptical and boundary-setting choices converge on inspectable leads | Only inspected sources and delivered dialogue. Customisation never implies real GPS, contacts, accounts or an invented biography. |

**PROPOSED DESIGN.** The first three scenes seed Daniel through at least one voluntary ordinary recollection each. Later fragments revisit the same routines with changed context. Maya and Sophie may remember the same habit differently without either being deceptive. Lucas's privacy concern remains valid even when he later helps. No romance statistic or coercive disclosure is required to reach the ending.

### Knowledge audit at the start of play

This is a writer audit, not a save initialiser. **CONFIRMED CANON** establishes each person's own role; exact off-screen communications remain **OPEN DESIGN DECISION**. The proposed card/export chain cannot be added to a character's confirmed knowledge until approved.

| Character | Initial knowledge allowed | Initial knowledge excluded |
| --- | --- | --- |
| Player | Their own identity and lack of a genuine Daniel relationship | Daniel's whereabouts, number-source history, any unreceived NPC account |
| Sophie | Daniel is missing; her own memories; the copy and contact route she actually has | Warning-card contents before discovery; who planted the entry; Unknown's identity |
| Maya | Her relationship, direct communications and material she personally received | Other people's private exchanges; authenticity of merely received photos; warning in unopened effects |
| Lucas | Friendship, privacy concerns, own retained communication/capture | Identity or contents of the “other copy”; private recovery work unless disclosed |
| Daniel | June's request, what he told Rowan, his backup request to Eli, and his own captivity experience | Every step of the cover-up, what his family/player are doing, facts unavailable where he is held |
| Eli / Unknown | Own identity, backup custody, failure to report suspicious access and personally observed technical events | Exact holding location, full kidnapping operation, player/Sophie dialogue or all investigation progress |
| Rachel | The official disappearance inquiry and information genuinely supplied to it | Private player findings, definitive captivity location or corroboration she has not obtained |
| Nora | Professional reference/index methods and records legitimately available in her role | Every hidden document, warning card, family chat or purpose of a code not yet examined |
| June | Before death: her discrepancies, evidence collection and request for Daniel's help | No post-death knowledge or retroactively authored knowledge of later events |
| Ana | Own friendship, reporting and communication from June | Full confrontation/death mechanism or actor responsibility without sources |
| Rowan | His own pressured participation and disclosure of the meeting to Vivian | Every action by security operatives or full player investigation unless a credible channel informs him |
| Vivian | Her own motive, influence, directions and knowledge of the concealed circumstances | Player UI state, unsent findings and private conversations without an actual authored source |

For **each of all fifty scene boundaries**, apply only that scene's inspected-source and actual delivered-message deltas from the chapter plan and scene matrix. Every unaddressed character carries the previous knowledge set forward unchanged. Family, colleagues, antagonists and official investigators all follow this rule; villain status is not permission for omniscience. A future scene script must record any intervening off-screen communication explicitly, with sender, recipient, scope and time. The same audit applies to notification text, summaries and optional branches, not only dialogue bubbles.

## Starred number and two-card continuity

**CONFIRMED CANON:** the player's number is in a manipulated copy of Daniel's contacts; the player has no prior personal relationship with him. The manipulation attempts to misdirect, monitor or compromise the investigation. Sophie first obtains the contact route from that copy. The separate warning card displays the player's number, a star and `DO NOT CONTACT THE STARRED NUMBER.` At C1S10 Sophie reports it and ends with `But… I already did.`

GH-DSC-03-A is on Maya's **secondary reference card**. It is not the warning card, an archive password, a GPS locator, an item match or proof about June. The cards stay distinct in IDs, custody, images and discussion until evidence actually links anything.

### Recommended complete causal chain

> **Superseded candidate:** the owner now proposes Daniel authored the warning, not Eli. Use the [revised dated continuity recommendation](THEARCHIVE_STARRED_NUMBER_CONTINUITY.md) as the controlling proposed chain. The earlier table below is retained as historical design discussion and must not drive new scenes.

<details><summary>Earlier candidate — superseded</summary>

Everything in this subsection is **PROPOSED DESIGN — OPEN DESIGN DECISION**, not additional canon. It is the shared candidate used by the gap register. Owner approval and source authoring are required before the dependent new route is implemented.

| Link | Recommended mechanism | Later proof / implementation gate |
| --- | --- | --- |
| Where the number came from | A mundane Greyhaven project public-consultation or administrative inquiry roster contains an ordinary return contact number. The player is deliberately selected as an uninvolved decoy; no prior Daniel contact is invented. Exact civic context remains open. | A properly scoped roster extract, access history and corroborated instruction; no real personal-data lookup. Decide what minimal past civic interaction the player may canonically have before writing C1S1. |
| Who planted it | Vivian directs diversion of inquiries. Rowan's project access enables alteration of one family-facing contact export, inserting the number and star. Daniel's preserved archive has a different source history. | Export version comparison proves insertion in C4S6; actor and motive require independent records/testimony in C5S4–5. Decide exact editing actor and delivery route. |
| How Sophie gets the export | A project/admin channel passes the labelled copy among Daniel-related material. Sophie initially trusts the label enough to ask the number, not enough to prove ownership. | Preserve envelope/email header and attachment identity. Author who supplied it and when; Sophie reports only what she actually received. |
| Why Eli knows the number | Eli notices the altered export through his own limited work access while preserving Daniel's backup. He does not learn the player through magical tracking or live interception. | A retained comparison/delivery note and his later accountable testimony. Restrict which export he saw and how. |
| Who makes the warning | Eli prints the number/star warning and places it in Daniel's existing document wallet/effects, intending Sophie to receive it. He withholds his name out of fear. | Card material, retained print/delivery note and later corroboration. Exact physical production time and custody must be authored. Existing legacy wording about handwriting is not silently changed. |
| Why Sophie finds it late | Maya passes on the sealed wallet without seeing the card; Sophie first uses the more accessible export, then finds the card inside the wallet while sorting Daniel's material on Day 1. | Maya and Sophie give bounded first-hand custody accounts in C2S1–2; sealed does not mean forensically tamper-proof. Specify why the wallet was not previously opened. |
| Why Unknown selects this player | Eli sees an uninvolved outsider has been exposed by the planted number and independently warns/approaches that number. He offers scoped encrypted material to preserve a copy outside channels he fears are compromised. He asks what the player knows; he does not assume Sophie has spoken to them. | Unknown's opening must avoid private-chat knowledge. His fear is a belief, not confirmed surveillance. Later reveal explains and criticises his risky civilian recruitment. If timing needs coordination, author an actual communication rather than infer it. |
| Why not contact only Rachel | Fear of exposing his own failure makes Eli hesitate; he wants independent preservation before naming himself. This is a flawed character decision with consequences. | An optional safe official reporting route remains available; key evidence must still reach Rachel by C5S8. Decide believable duration and what Eli unsuccessfully attempted. |

This earlier chain is superseded by the revised recommendation.

</details>

## Evidence and deduction contract

**CONFIRMED CANON.** Daniel phone archive recovery progresses cumulatively to 20/40/60/80/100%. Percentages measure a defined recoverable manifest, not truth, all physical phone data, or investigation completion. Sophie/Maya/Lucas records, public inventories, Nora's explanations, Ana's reporting and Rachel's replies stay external and do not increase recovery.

**PROPOSED DESIGN.** Maintain three separate strands through the finale:

| Strand | Early lead | Corroboration path | Final claim it can support |
| --- | --- | --- | --- |
| Daniel's disappearance | Missing hour, last check-in, another-copy capture | Recovered logs + witness timings + lawful access/camera records + current official corroboration | Credible custody/location lead; authorities confirm Daniel alive after rescue. A device event alone is not Daniel's presence. |
| June and safety records | Partial name, photo fragment, GH-DSC-03-A lookup | Ana's correspondence + Nora's reference mapping + original custodian records + version/access history | What changed, who directed it, what happened at June's meeting, and Vivian's responsibility. An index is not a document body. |
| Planted player number | Export with unnamed star, separate warning | Source comparison + alteration record + physical card custody + corroborated actor account | Origin, insertion, selection motive and author of warning. A star alone proves none of these. |

Any summary states source references and uncertainty. `RECOVERED`, `PARTIALLY RECOVERED`, `UNRECOVERED`, `CORRUPTED`, `SOURCE UNVERIFIED` and `INFERENCE ONLY` describe different properties. A recovered message may remain source unverified; two matching copies are not automatically independent. Existing 14/13 and Bus 4 observations remain separate historical records unless a future authored provenance link is approved.

## Reveal schedule and spoiler ceilings

| Beat | Earliest planned player exposure | Confirmation / limit |
| --- | --- | --- |
| Missing Daniel, relationships and unexplained number | C1S1–3 | Missing-person account and character claims; no kidnapping/fate proof. |
| Unknown possesses claimed encrypted material | C1S4 | Claim plus inspectable package; accepting it does not authenticate sender. |
| June as a partial lead | C1S5 | Name/fragment only; no death reconstruction, mastermind or automatic NPC knowledge. |
| Number/star warning | C1S10 | Sophie's answered call reports a separate card; card inspection follows C2S2. |
| June's death and Ana's meaningful role | No later than C2S10 | Reported accident and Ana's limited evidence; hidden confrontation remains unrevealed. |
| Original differs from expected location | C2S10 | Recording ends `The original… isn't where they said it was.` Speaker remains unverified. |
| Reference map and conflicting timelines | C3S7–8 | Nora establishes what records references mean, not guilt. |
| U-17 and Unknown's recognition | C3S10 | Access identifier; not a person's name, current location or proof Unknown harmed Daniel. |
| Number insertion | C4S6 | Technical evidence of insertion; actor and motive remain subject to corroboration. |
| Unknown's partial involvement | C4S5, C4S10 | Backup role and omissions can be admitted without name, portrait, contact merge or identity confirmation. |
| Credible indication Daniel may be alive | C4S10 | Alleged message plus a checkable detail; identity remains unverified. Writer knowledge cannot relabel it live Daniel. |
| Origin and reason for planted number | C5S4 | Approved causal chain supported by records; no late arbitrary explanation. |
| Who marked the star and made the warning | C5S5 | Evidence must distinguish malicious insertion from protective warning. |
| Unknown is Eli | **C5S6 only** | Verified identity reveal. Earlier hints and U-17 recognition never fire identity flags. |
| Kidnapping route/facility lead | C5S7–8 | Corroborated actionable lead delivered to Rachel; player stays remote. |
| Daniel alive | C5S9 | Rachel's official rescue confirmation; Sophie/Maya learn through actual delivered messages. |
| Vivian/Rowan roles, June's death, closure | C5S10 | Corroborated case resolution; do not substitute a villain confession or 100% meter. Daniel sends thanks after he can credibly communicate. |

The [chapter plan](THEARCHIVE_CHAPTER_MASTER_PLAN.md) specifies knowledge movement scene by scene. Optional branches can delay a specific character learning a fact, but cannot advance the player's spoiler ceiling. Names or hidden-source details must not leak in package metadata, file names, avatars, search snippets, alt text, call logs or notification previews.

## Nine-day working timeline

The **7–10 day playable duration is CONFIRMED CANON**. The [revised continuity recommendation](THEARCHIVE_STARRED_NUMBER_CONTINUITY.md) proposes 31 October–8 November 2026 and dated pre-play events. Those dates, exact transport, care arrangements and record retention windows are **PROPOSED DESIGN** pending approval. Gameplay waiting is paced inside scenes; this is not a nine-day real-time lock.

| Time | Actual events — developer view | Character belief at this time | Player knowledge | Independently verified ceiling |
| --- | --- | --- | --- | --- |
| Before play, several weeks | June finds manipulated safety material, asks Daniel; Daniel trusts Rowan; Rowan leaks meeting; confrontation kills June | Daniel initially believes Rowan safe; Ana knows June feared disclosure; public receives accident account | Nothing at start | Historical official classification exists; its correctness is unresolved. |
| Before play, several days | Daniel investigates, asks Eli to preserve backup, seeks original; captors intercept and hold him | Sophie/Maya/Lucas know disappearance, not captivity; Eli knows backup and his own omissions | Nothing at start | Disappearance inquiry can be established through Rachel; exact custody truth is hidden. |
| Pre-game → Day 1 | Proposed altered export and warning-wallet chain occur in a fixed authored order | Sophie mistakes labelled copy for a useful lead; Eli fears compromised channels; Maya does not know wallet contents | Number appears unexplained | Export/card provenance not yet verified. |
| Day 1 — C1 | Daniel remains alive; captors seek keys/evidence; player starts recovery and receives Sophie's warning call | Family hopes Daniel may return; Unknown has partial technical knowledge | Missing person, partial archive, uncertain hour, star, another-copy lead, separate warning | Directly inspected contents and delivery receipts only; no location/fate or culprit finding. |
| Days 2–3 — C2 | Daniel remains held; preserved copies expose divergent histories | Maya/Lucas reconsider omissions; Ana weighs source safety | June's case matters; two backups differ; unidentified voice questions original location | Specific source differences can be checked, not entire narrative or voice identity. |
| Days 4–5 — C3 | Official inquiry and player comparison narrow timeline; U-17 is discovered | Witnesses separate memories from assumptions; Unknown reacts to a known identifier | Digital/witness timelines and stronger last movements | Independent matches exist; a gap or U-17 alone proves no offender. |
| Days 6–7 — C4 | Pressure escalates; planted export is demonstrable; captors still need information | Unknown becomes more candid but conceals name; Vivian's intermediaries try influence | Insertion evidence and credible possibility of survival | Authenticated technical records can prove alteration; alleged live sender remains unresolved. |
| Day 8 — C5S1–6 | Remaining archive segment unlocks; origin/card chain is reconstructed; Eli identifies himself | Family receives only chosen disclosures; Eli acknowledges responsibility | Player understands planted number and Unknown | Identity and causal claims require corroboration, not self-identification alone. |
| Day 9 — C5S7–10 | Facility lead reaches Rachel; official corroboration and rescue; Daniel survives; case reconstruction and epilogue | Sophie and Maya learn survival from delivered confirmation; Rowan may cooperate | Truth and emotional closure | Rescue confirms survival/location. Custodian records and corroborated accounts support case conclusions; exact charges/legal outcomes need review. |

**Plausibility gates before scripting:** define why captors retain the same facility, what human care keeps Daniel alive, how routine site activity conceals detention, what they believe about the check-in claim, why they cannot simply obtain the remaining key, and how official inquiry is actively progressing without finding him earlier. Keep operational detail at story level. Rachel acts promptly on actionable information; the player cannot withhold an urgent credible danger report merely to finish an optional puzzle.

## Ending and emotional closure contract

**CONFIRMED CANON:** Rachel coordinates the rescue, Daniel is found alive at the old harbor storage facility, June's death and manipulated records are exposed, Vivian's role is evidenced, Rowan faces consequences, Eli's role is resolved, and Daniel personally thanks the player.

**PROPOSED DESIGN:** final reconstruction presents what each source establishes, remaining uncertainty, and which conclusions authorities confirm. Rescue success is fixed; relationship variations alter who speaks first, what apologies are accepted, and whether the player remains in touch. Sophie can feel relief and anger about manipulation together. Maya's reunion does not erase fear or Daniel's mistakes. Lucas can thank the player while retaining his privacy boundaries. June receives a named account of her work and loss through Ana and the corrected record, not a sensational reveal. Exact prosecutions, sanctions, clinical recovery and epilogue time jump remain open; do not promise a legal or medical outcome absent authored decisions.

No epilogue adds a sixth chapter or a fifty-first numbered scene. All closure and final case review belong to C5S10.

## Authoring readiness

This bible is a planning deliverable, not fifty approved scripts. Critical pre-implementation decisions are tracked in [the gap register](THEARCHIVE_PLOT_GAP_REGISTER.md). In particular, approve the number/export/card causal chain, early player biography limit, Eli continuity, future display branding, calendar/captivity timeline and evidence sources before activating the new Chapter 1 route. Reuse existing systems while writing scene-specific dialogue progressively under separate instructions. Preserve delivered historical messages and legitimate completion records throughout.

## Owner proposal — detailed Harbor Renewal (not yet canon)

The owner's newer detailed proposal is recorded in [THEARCHIVE_HARBOR_RENEWAL_PROPOSAL.md](THEARCHIVE_HARBOR_RENEWAL_PROPOSAL.md). Warehouse 3, its exact defects, proposed report wording, detailed motives and the item-level GH-DSC-03-A relationship remain proposed pending a final decision and source-chain review. Do not reveal them in Chapter 1 or treat incidental image markings as established identities.
