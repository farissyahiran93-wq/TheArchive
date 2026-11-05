# TheArchive — 50-scene master matrix

> **Canon lock update:** apply [the resolved starred-number decisions and source chronology](THEARCHIVE_CANON_LOCK_2026-11-05.md). Daniel wrote the warning, the player's enquiry number was held internally, and Sophie's actual message precedes Unknown's contact. Lucas's second-backup custody and authorised relay are proposed, not yet approved. Existing scene contracts remain planning-only.

Status: **MASTER PLANNING ONLY · 5 November 2026 · SPOILER / DEVELOPER ONLY**.

Authority: [the supplied master brief](sources/master-story-2026-11-05/MASTER_STORY_BIBLE_50_SCENES.txt). This document replaces earlier scene counts and Bulletin-led new-campaign plans **for future development**, without changing the running game. See the [story bible](THEARCHIVE_STORY_BIBLE.md), [chapter plan](THEARCHIVE_CHAPTER_MASTER_PLAN.md), [recovery specification](THEARCHIVE_TRACE_RECOVERY_SPEC.md), [state specification](THEARCHIVE_NARRATIVE_STATE_SPEC.md), [gap register](THEARCHIVE_PLOT_GAP_REGISTER.md), and [roadmap](THEARCHIVE_IMPLEMENTATION_ROADMAP.md).

## Status and reading rules

- **CONFIRMED CANON:** the five chapter names, the following fifty scene titles, the supplied story beats, recovery milestones and chapter endings.
- **PROPOSED DESIGN:** the scene contracts, evidence aliases, alternative routes, exact interview assignments and technical interactions below. They are authoring requirements for later approval, not supplied final dialogue or implemented APIs.
- **OPEN DESIGN DECISION:** artifact contents, exact dates, custody details, the planted-number mechanism and warning-card authorship remain subject to the gap register. No proposed explanation becomes canon through its inclusion here.
- IDs `TA-C01-S01` through `TA-C05-S10` are documentation identifiers for a future campaign namespace. They never rename `OPEN-*`, `ch01*`, `ch02*`, `E01-*`, `MIR-*`, or saved events. There are exactly ten numbered scenes per chapter. All activities occur inside these scenes.
- Evidence aliases `TA-PH-*` denote proposed Daniel archive records; `TA-EX-*` denote external sources; `TA-FN-*` denote private player findings. None are current catalog IDs. External materials and findings contribute **zero** phone recovery units. A supplied second backup contributes only deduplicated, eligible Daniel-manifest fragments after inspection and a player-started recovery.
- Recovery below is cumulative phone-manifest progress at scene exit, not confidence, completion of a timer, device access or mystery progress. The displayed approximate intermediate targets become deterministic approved-manifest milestones in the recovery spec. No extra recovery is awarded for re-reading existing fragments.

Every outgoing text requires selection and visible **Send**. Private Save is a different action. Optional disclosure requires review, recipient selection and Send, and cannot gate the main case. Entry readiness never auto-opens chats, evidence or the next scene. Installation deferral and missed calls preserve an explicit route to resume; no consent is fabricated. All required actions are resumable and idempotent. Unknown is displayed only as Unknown Sender until TA-C05-S06; the true identity is absent from player-facing labels, portraits and previews before confirmation.

Proposed story calendar: Chapter 1 day 1; Chapter 2 days 2–3; Chapter 3 days 4–5; Chapter 4 days 6–7; Chapter 5 days 8–9. These are story days, not forced real-world waits. Exact prehistory and timestamps require author sign-off.

## Chapter 1 — THE FIRST TRACE

### TA-C01-S01 — A Message from Sophie

- **Purpose / characters:** Introduce the stranger's involvement, Sophie's concern for her older brother, and the player's boundaries. Sophie and player only.
- **Start / dependencies:** Explicit new campaign and player identity setup; Sophie is the first contacting character. Historical saves keep their original opening.
- **Required play:** Manually open Sophie, ask how she obtained the number, choose and Send replies, review the FIND DANIEL invitation and explicitly join. Inspecting the invitation alone does not join.
- **Information / evidence:** `TA-EX-CONTACT-EXPORT` is only Sophie's attributed explanation of a saved contact copy at this point; no full inspection receipt, Daniel relationship, warning card or phone backup is granted.
- **Branches / knowledge:** Cooperative, cautious and boundary-setting responses change tone and trust. Decline or defer leaves a player-initiated invitation reoffer available; it does not penalize or silently enroll the player. Sophie knows only sent answers.
- **Completion / handoff:** Commit the actual join event once, then offer manual FIND DANIEL opening for TA-C01-S02. **Recovery: 0%.**

### TA-C01-S02 — The Uninvited Guest

- **Purpose / characters:** Establish Maya as Daniel's fiancée and Lucas as his best friend; make Lucas's privacy concern credible. Player, Sophie, Maya, Lucas.
- **Start / dependencies:** Real joined-group event from TA-C01-S01 and manual opening of FIND DANIEL.
- **Required play:** Read delivered introductions; select and Send responses to the privacy conflict. Lucas leaves through a visible saved membership event on every main branch, before any later roster or delivery projection.
- **Information / evidence:** Conversation history supplies attributed relationship statements and an unverified starred-contact claim; no recovered phone material or original warning card.
- **Branches / knowledge:** Acknowledge, challenge or clarify boundaries without automatic private disclosure. Group receipts record only members present when each message was actually delivered. Lucas cannot receive later group messages after leaving.
- **Completion / handoff:** Finish authored group exchange; schedule Sophie's private notification once. Manual DM opening starts TA-C01-S03. Retain the existing persisted handoff pattern, with final pacing to be approved. **Recovery: 0%.**

### TA-C01-S03 — Just Between Us

- **Purpose / characters:** Build Sophie's sibling relationship and Daniel's human context without making the player an old friend. Sophie and player.
- **Start / dependencies:** Completed group exchange, delivered private message, manual Sophie opening.
- **Required play:** Choose and Send private replies; read the actual branch-specific context. Resume a closed conversation at its stored draft or queue rather than replaying delivered lines.
- **Information / evidence:** Sophie can describe what she personally knows about Daniel, Maya, Lucas and his coworker. A coworker's name does not identify Unknown. Unheard optional information is never awarded from a completion checklist.
- **Branches / knowledge:** Empathy, factual questions and privacy boundaries lead to different personal context. No full archive, June-death revelation or public-article detour is required.
- **Completion / handoff:** Deliver the approved private closing, mark Sophie offline and persist readiness for Unknown's first message. Notification delivery does not open TA-C01-S04. **Recovery: 0%.**

### TA-C01-S04 — The Unknown Sender

- **Purpose / characters:** Introduce a questionable archive custodian and test trust through questions. Unknown and player; Eli's identity is developer-only.
- **Start / dependencies:** TA-C01-S03 complete, once-only first-contact delivery and manual Unknown opening. No Bulletin read or index inspection prerequisite in the new campaign.
- **Required play:** Ask about identity, access, source, privacy and trust through selected Sends; inspect the encrypted-file offer; explicitly accept the archive file after review.
- **Information / evidence:** `TA-EX-ARCHIVE-OFFER-A` records the offered package, claimed custody, advertised manifest and local receipt. Acceptance establishes possession of a copy, not Daniel's authorship or decrypted contents. Sophie supplies no backup.
- **Branches / knowledge:** Refusal/defer pauses the offer and keeps a clear reoffer. Unknown cannot know Sophie's private conversation, group membership or findings unless actually told; the proposed independent contact mechanism remains a gap decision.
- **Completion / handoff:** Store the player's actual acceptance, package identity and receipt. Offer manual continuation to the TRACE explanation in TA-C01-S05; no automatic installation. **Recovery: 0%.**

### TA-C01-S05 — The Digital Archive

- **Purpose / characters:** Introduce TRACE and Daniel's ordinary life through limited recovery. Unknown and player; Daniel and June appear only in recovered records.
- **Start / dependencies:** Accepted archive package from TA-C01-S04; player opens the continuation.
- **Required play:** Review TRACE and installation concerns, explicitly install the fictional app, open the archive, inspect the manifest, manually start initial recovery, read the released message/note fragments and save a source-linked summary.
- **Information / evidence:** `TA-PH-MESSAGE-01` and `TA-PH-NOTE-01` begin as stable partial records. June Ellis appears only as a partial lead. No death circumstances, captor, warning-card origin or Unknown identity is revealed.
- **Branches / knowledge:** Installation can be deferred/cancelled and resumed. Curiosity or suspicion changes replies without authenticity rewards. The recovery result cites only authored fragments, with missing text visibly unavailable.
- **Completion / handoff:** Persist installation consent, first recovery result, actual reads and private finding. Offer activity-log processing in TA-C01-S06. **Recovery: approximately 12% (120/1000 proposed units).**

### TA-C01-S06 — The Missing Hour

- **Purpose / characters:** Turn a gap into an investigation question, not proof of a person's actions. Player; optional source-limited Unknown advice.
- **Start / dependencies:** TA-C01-S05 complete and manual activity-log recovery start.
- **Required play:** Recover `TA-PH-ACTIVITY-01`, inspect timestamp fields and timezone limitations, place observed events on a basic timeline, mark an unresolved interval and Save findings.
- **Information / evidence:** A device-log interval exists in the available data. A log event does not establish that Daniel operated the device, his exact location or a kidnapping time.
- **Branches / knowledge:** Compare alternative timeline interpretations. An unsupported assertion invites a correction/review path; the player can save an uncertainty-aware conclusion without a quiz-based dead end. Reporting to Unknown is separately reviewed and sent.
- **Completion / handoff:** A persisted, source-referenced timeline and limitation acknowledgment complete the scene; offer Sophie's contact-export lead for TA-C01-S07. **Recovery: 20% (200/1000).**

### TA-C01-S07 — The Starred Number

- **Purpose / characters:** Revisit why this uninvolved player was contacted. Sophie and player; Maya only if a separately chosen group disclosure is sent.
- **Start / dependencies:** TA-C01-S06 finding saved; manual Sophie continuation. Adapt existing v2 scene mechanics later without importing its Corrections Desk gate.
- **Required play:** Request/receive the saved export, inspect `TA-EX-CONTACT-EXPORT` labels, masked numbers, unnamed starred entry and source limitations; question Sophie; Save a private conclusion.
- **Information / evidence:** The displayed player number and star can be observed in this copy. It does not establish who inserted or marked the entry, that Daniel knew the player, or that the copy is authentic.
- **Branches / knowledge:** Ask who handled the export or respect Sophie's pause. Group disclosure is optional, recipient-scoped and reviewed; Lucas remains absent unless a later authorized membership event occurs.
- **Completion / handoff:** Actual inspection and sent questioning plus private conclusion make TA-C01-S08 available. Do not reveal the separate warning card yet. **Recovery: 20%.**

### TA-C01-S08 — The Last Check-In

- **Purpose / characters:** Introduce an ambiguous second-copy reference while preserving Lucas's boundaries. Lucas or authorized Maya relay, and player.
- **Start / dependencies:** TA-C01-S07 complete and manual next-lead entry. Establish a credible contact route before any direct Lucas message.
- **Required play:** Receive `TA-EX-LAST-CHECK-IN`, inspect the capture, displayed dates, cropping/context, custody and authenticity; Send a source question; Save its limitations.
- **Information / evidence:** The capture references “another copy.” Neither the copy's contents nor its holder or location is conclusively identified. A captured line is not a live Daniel message.
- **Branches / knowledge:** Direct Lucas route or a Maya relay with explicit Lucas permission supplies the same necessary source. If direct contact is declined, the relay keeps the main route open without restoring Lucas to FIND DANIEL.
- **Completion / handoff:** Persist source route, actual inspections and private conclusion; offer Maya's reference card in TA-C01-S09. **Recovery: 20%.**

### TA-C01-S09 — The Secondary Card

- **Purpose / characters:** Establish a bounded records-search lead. Maya and player.
- **Start / dependencies:** TA-C01-S08 complete; manual Maya/evidence opening.
- **Required play:** Inspect Maya's card photograph `TA-EX-REFERENCE-CARD`, read **GH-DSC-03-A**, ask about her custody and the photograph's limits, compare only visible fields, Save the proposed search target.
- **Information / evidence:** GH-DSC-03-A is a reference, with no established descriptor body, original record, item match, warning-card connection or June link. This card is distinct from Sophie's later warning card.
- **Branches / knowledge:** Optional professional inquiry can be drafted but requires a known recipient and a separate Send. A title/code match does not authenticate either source; no new Nora phone contact is created by viewing.
- **Completion / handoff:** A retained reference and source-limited conclusion allow manual inventory opening in TA-C01-S10. Existing unavailable original image pixels remain honestly labelled until supplied. **Recovery: 20%.**

### TA-C01-S10 — The Inventory Sheet

- **Purpose / characters:** Deliver a concrete records lead, then turn the player's involvement into the chapter cliffhanger. Player and Sophie on an answered call.
- **Start / dependencies:** TA-C01-S09 complete; player manually opens the public inventory.
- **Required play:** Read `TA-EX-PUBLIC-INVENTORY`, distinguish box/descriptor reference from item contents, Save a private conclusion, explicitly return Home, then **answer** Sophie's call. Spoken-choice controls retain explicit player submission; no automatic response.
- **Information / evidence:** Inventory gives a search target only. Sophie reports a **separate** physical card with the player's number, a star and “DO NOT CONTACT THE STARRED NUMBER.” Record `TA-EX-WARNING-CARD-REPORT` as testimony, not a photograph already inspected.
- **Branches / knowledge:** Decline/miss preserves a manual callback and cannot award the full warning or completion. Optional social Sends remain optional. For the new script the final dramatic line is exactly **“But… I already did.”** No new closing line follows it in this chapter.
- **Completion / handoff:** After the real connected call reaches that line and the player finishes it, commit Chapter 1 completion and Chapter 2 unlock once. Manual Continue opens TA-C02-S01; old `CH1-V2-COMPLETE` does not substitute. **Recovery: 20%.**

## Chapter 2 — THE OTHER COPY

### TA-C02-S01 — After the Call

- **Purpose / characters:** Allow Sophie an emotional response and establish a careful preservation process. Sophie and player; Rachel's verified official contact route may be offered.
- **Start / dependencies:** Actual Chapter 1 completion/unlock and manual Continue; existing historical Chapter 2 never auto-converts.
- **Required play:** Open Sophie's follow-up, choose and Send reassurance or provenance questions, record what was heard and request safe preservation of the card without directing Sophie into danger.
- **Information / evidence:** `TA-EX-WARNING-CARD-REPORT` remains a reported discovery; sender/writer, date and original custody remain unknown. A professional contact listing supplies no police findings.
- **Branches / knowledge:** Empathy and careful questioning alter tone. Optional limited notice to Rachel requires verified destination, preview and Send; her knowledge comes from that receipt, not the chapter unlock.
- **Completion / handoff:** Persist a source/handling checklist and a specific photograph request; make the card review manually available in TA-C02-S02. **Recovery: 20%.**

### TA-C02-S02 — The Marked Card

- **Purpose / characters:** Separate observed marks from assumptions about their author. Sophie and player.
- **Start / dependencies:** TA-C02-S01 complete; actual front-and-back capture delivered and opened.
- **Required play:** Inspect both sides of `TA-EX-WARNING-CARD`, number, star, warning, framing and custody statement; compare with the export; Save a two-source observation.
- **Information / evidence:** The warning and matching displayed number can be read. Photograph receipt does not establish handwriting, creation time, card ownership or an independent link to GH-DSC-03-A.
- **Branches / knowledge:** Optional questions about where Sophie found it and who handled the folder. Sharing with Maya or group requires separate reviewed Sends; Sophie's disclosure to the player is not blanket group permission.
- **Completion / handoff:** Both-side inspection and a saved uncertainty-aware comparison enable TA-C02-S03. **Recovery: 20%.**

### TA-C02-S03 — Two Contact Lists

- **Purpose / characters:** Develop the first observable discrepancy between external and phone sources. Player; Unknown can explain format limitations without knowing the answer.
- **Start / dependencies:** TA-C02-S02 complete, accepted archive and installed TRACE; manual fragment recovery.
- **Required play:** Recover `TA-PH-CONTACTS-01`, compare stable entry keys and visible fields against `TA-EX-CONTACT-EXPORT`, inspect missing regions and Save the differing fields.
- **Information / evidence:** These available copies differ. Missing or unrecovered fields do not prove deliberate insertion; technical confirmation waits until Chapter 4.
- **Branches / knowledge:** Filter/review comparison fields; optional source questions require Send. No claim that every number in the phone is visible, and no real contacts API.
- **Completion / handoff:** Persist comparison inputs/versions and a limited discrepancy finding; offer Lucas's source route in TA-C02-S04. **Recovery: approximately 28% (280/1000).**

### TA-C02-S04 — Lucas Breaks His Silence

- **Purpose / characters:** Make Lucas's privacy conflict consequential while clarifying the second-copy lead. Lucas and player; Maya as permission-based relay if needed.
- **Start / dependencies:** TA-C02-S03 complete; player opts into an established contact request or chooses the mediated route.
- **Required play:** Send a bounded question, receive the actual reply or authorized written statement, distinguish Lucas's memory from a retained record, and Save source attribution.
- **Information / evidence:** `TA-EX-LUCAS-COPY-STATEMENT` narrows what Lucas meant or personally received. Exact handover/holder details remain proposed authoring; no automatic access to his private archive.
- **Branches / knowledge:** Direct contact is optional. A limited statement delivered through Maya with Lucas's explicit permission provides the main lead if direct chat is declined; no forced group return or trust threshold.
- **Completion / handoff:** A real attributed source response and preserved boundaries lead to manual gallery recovery in TA-C02-S05. **Recovery: 28%.**

### TA-C02-S05 — Fragments of a Photograph

- **Purpose / characters:** Make visual incompleteness a useful limitation. Player; Daniel's gallery is historical material.
- **Start / dependencies:** TA-C02-S04 complete; manual recovery of an eligible gallery segment.
- **Required play:** Recover `TA-PH-GALLERY-01`, inspect actual available pixels and embedded metadata separately, identify a visible records-related feature and Save what is and is not visible.
- **Information / evidence:** Partial content can suggest a Greyhaven records connection. Metadata origin, capture time and pictured location are not authenticated by recovery or resemblance.
- **Branches / knowledge:** Compare to an external public reference or retain uncertainty. Optional Maya recognition is separately requested and treated as testimony. Existing portrait artwork is never substituted for recovered photography.
- **Completion / handoff:** Retain the partial image/version and its limitations; offer combined meeting-point analysis in TA-C02-S06. **Recovery: approximately 34% (340/1000).**

### TA-C02-S06 — The Meeting Point

- **Purpose / characters:** Form a testable location hypothesis from different kinds of sources. Player; optional Maya/Lucas testimony.
- **Start / dependencies:** TA-C02-S05 complete and relevant prior source records actually inspected.
- **Required play:** Compare recovered metadata, public reference information and delivered testimony; place candidate points on a fictional local map/timeline; Save a possible meeting location with competing explanations.
- **Information / evidence:** `TA-FN-MEETING-POINT` is an inference with cited inputs, not proof Daniel attended or is held there. No live GPS, tracking, field visit or new recovered bytes.
- **Branches / knowledge:** A witness can decline extra questions without blocking the source-based comparison. The player can preserve unresolved candidates rather than guess a required answer.
- **Completion / handoff:** A saved, labelled hypothesis and identified missing corroboration enable Maya's account in TA-C02-S07. **Recovery: 34%.**

### TA-C02-S07 — What Maya Didn't Say

- **Purpose / characters:** Give Maya space to explain guarded behaviour and her relationship with Daniel. Maya and player.
- **Start / dependencies:** TA-C02-S06 complete; manually opened Maya conversation and actual invitation to ask.
- **Required play:** Send respectful questions, hear Maya's branch-specific account, distinguish recollection from retained communications and Save the provenance of her contribution.
- **Information / evidence:** `TA-EX-MAYA-BEHAVIOUR` concerns Daniel's routine and investigation, with a credible route toward a second fragment. Exact disclosures require a later approved script; she cannot know his current captivity.
- **Branches / knowledge:** Allow a pause or a limited written account; tone affects trust and later reactions. Private permission stays exchange-specific; optional group sharing requires its own permission and Send.
- **Completion / handoff:** Persist the actual account and permission/custody terms for the next source, then offer TA-C02-S08. **Recovery: 34%.**

### TA-C02-S08 — The Second Backup

- **Purpose / characters:** Establish why two archive copies can add information without declaring one universally true. Player; the approved custodian route, Lucas/Maya relay or Unknown only within actual knowledge.
- **Start / dependencies:** TA-C02-S07 complete, credible custody statement and player acceptance of `TA-EX-BACKUP-B`.
- **Required play:** Inspect both manifests and declared snapshot/copy histories; manually compare and start a deduplicated recovery; read newly eligible Daniel fragments; Save a comparison report.
- **Information / evidence:** A second copy supplies additional eligible fragments, not a replacement for the first or automatic proof of tampering. Disagreements retain both source versions. Holder and transfer mechanism remain a gap decision.
- **Branches / knowledge:** Reject/defer transfer while retaining a return path; choose comparison emphasis without sending whole backups to NPCs. External wrapper metadata earns no recovery credit.
- **Completion / handoff:** Persist fragment/version provenance and comparison findings, making the recovered unsent draft manually reviewable in TA-C02-S09. **Recovery: 40% (400/1000).**

### TA-C02-S09 — The Unsent Draft

- **Purpose / characters:** Show Daniel's unfinished intention and regret without converting it into an accomplished act. Player; Daniel as recovered writer attribution.
- **Start / dependencies:** TA-C02-S08 recovery completed; draft bytes already belong to the 40% stage and the player opens the record.
- **Required play:** Inspect `TA-PH-DRAFT-01`, authorship/source attribution, incomplete portions and unsent status; compare June references; Save an interpretation with uncertainty.
- **Information / evidence:** Strengthens Daniel's connection to June, but an unsent draft proves neither delivery nor a planned meeting's occurrence. Re-reading these bytes does not raise recovery.
- **Branches / knowledge:** Optional private reflection or a reviewed, consent-aware question to Maya/Sophie. No character learns draft contents simply because the player read them.
- **Completion / handoff:** A retained draft observation and unresolved question lead to TA-C02-S10's independent source comparison. **Recovery: 40%.**

### TA-C02-S10 — Two Versions of the Truth

- **Purpose / characters:** Move June's death into the active case and introduce a source-protective journalist. Player, Ana through an established professional route; Unknown optional.
- **Start / dependencies:** TA-C02-S09 complete; player opens the compared records and Ana's professional contact or published material.
- **Required play:** Compare an attributed public report with recovered records; read June's reported death as an accident; review Ana's limited, actually delivered contribution and play/read an incomplete recording `TA-PH-VOICE-01`.
- **Information / evidence:** Recording ends **“The original… isn't where they said it was.”** Its speaker remains unverified. Ana is June's friend and may withhold sources; no actor is convicted by the contradiction.
- **Branches / knowledge:** Respect a reporting boundary; a public/source-redacted route retains the main lead if private interview is declined. Audio has an equivalent partial transcript, not invented missing speech.
- **Completion / handoff:** Save the comparison and unknown-speaker limitation; commit Chapter 2 completion/unlock, then manual Continue to TA-C03-S01. **Recovery: 40%.**

## Chapter 3 — THE BROKEN TIMELINE

### TA-C03-S01 — The Voice Fragment

- **Purpose / characters:** Define what audio can support before building a theory around it. Player; optional Unknown technical explanation.
- **Start / dependencies:** Chapter 2 complete and manual Continue; actual recovered recording available.
- **Required play:** Replay `TA-PH-VOICE-01`, inspect its available waveform/metadata only if authored, compare transcript gaps and Save audible words, attribution limits and missing context.
- **Information / evidence:** The fragment discusses an original record; voice familiarity and audio processing cannot authenticate a speaker or recover nonexistent words.
- **Branches / knowledge:** Optional professional clarification through a known channel; subtitle-only play satisfies equivalent inspection. No speaker name in filename, search, alt text or preview.
- **Completion / handoff:** Persist a limited audio finding and manually open additional log recovery in TA-C03-S02. **Recovery: 40%.**

### TA-C03-S02 — The Wrong Date

- **Purpose / characters:** Establish a specific timestamp contradiction and a method to investigate it. Player.
- **Start / dependencies:** TA-C03-S01 complete; manual log/metadata recovery start.
- **Required play:** Recover `TA-PH-ACTIVITY-02`, compare raw timestamps, displayed timezone, copy/export times and prior events; Save both normalized and original values.
- **Information / evidence:** A date discrepancy can arise from time encoding or copied metadata; an explained conversion resolves only the supported portion. Unexplained residual differences remain open.
- **Branches / knowledge:** Test candidate clock interpretations in a private comparison; never overwrite original evidence timestamps or require a fabricated precise time.
- **Completion / handoff:** A saved discrepancy ledger with known versus unresolved fields enables Maya's witness timeline in TA-C03-S03. **Recovery: approximately 48% (480/1000).**

### TA-C03-S03 — Maya's Account

- **Purpose / characters:** Develop the emotional and evidential limits of Daniel's last communication with his fiancée. Maya and player.
- **Start / dependencies:** TA-C03-S02 complete; manual Maya opening and a bounded interview request.
- **Required play:** Send questions about the last actual communication; inspect any voluntarily supplied capture; record recollection time, original message time and gaps separately.
- **Information / evidence:** `TA-EX-MAYA-LAST-CONTACT` supplies only what Maya personally recalls/retained. Her certainty about a feeling cannot prove the device operator or later movements.
- **Branches / knowledge:** Gentle or direct questioning changes reactions; offer a limited written route if she pauses. Do not imply that withholding personal information proves involvement.
- **Completion / handoff:** Save the attributed account and permission limits, then offer the missing Lucas communication in TA-C03-S04. **Recovery: 48%.**

### TA-C03-S04 — Lucas's Missing Message

- **Purpose / characters:** Clarify an omission without erasing Lucas's privacy motivations. Lucas and player; permission-based relay remains possible.
- **Start / dependencies:** TA-C03-S03 complete; authorized direct or mediated source route from Chapter 2.
- **Required play:** Inspect an already stage-recovered missing segment of `TA-PH-LUCAS-THREAD` against `TA-EX-LUCAS-MESSAGE-COPY`; Send a question or receive the approved limited statement; Save differences and his explanation.
- **Information / evidence:** A withheld message can explain Lucas's earlier silence while leaving its claims unverified. Its bytes are included in the preceding 48% recovery stage; this scene reviews them rather than adding arbitrary units.
- **Branches / knowledge:** Challenge inconsistencies or acknowledge boundaries; declining private chat uses an authorized statement route. No forced apology, group rejoin or wholesale chat disclosure.
- **Completion / handoff:** Persist both source versions and actual explanation, making location-evidence recovery available in TA-C03-S05. **Recovery: 48%.**

### TA-C03-S05 — The Last Known Place

- **Purpose / characters:** Narrow an historical location lead through source comparison. Player; limited witness replies only if requested.
- **Start / dependencies:** TA-C03-S04 complete; player starts the next archive segment.
- **Required play:** Recover `TA-PH-LOCATION-CONTEXT`, inspect historical file/call/log context, compare against independent fictional public information and Save a bounded last-known-place hypothesis.
- **Information / evidence:** Correlated records strengthen a location lead but do not prove Daniel remained there or identify his present holding site. No real device location access or player field operation.
- **Branches / knowledge:** Keep competing candidates where inputs conflict. Optional disclosure to Rachel creates a recipient receipt only and does not count as official verification.
- **Completion / handoff:** A source-linked location finding and specific corroboration request enable TA-C03-S06. **Recovery: approximately 54% (540/1000).**

### TA-C03-S06 — The Camera Gap

- **Purpose / characters:** Introduce lawful independent corroboration and its limits. Player and Rachel through a verified professional case channel.
- **Start / dependencies:** TA-C03-S05 complete; establish Rachel's official contact from an independently checked directory/case route, review the limited request and explicitly Send it.
- **Required play:** Receive the matching authorized response, inspect `TA-EX-CAMERA-RECORD` and its retention/access statement, compare available interval against the source timeline and Save a limited observation.
- **Information / evidence:** A camera gap is absence in the supplied material, not proof of erasure, abduction or guilt. Rachel's authority does not authenticate unrelated phone files. Exact lawful disclosure scope requires authored approval.
- **Branches / knowledge:** Player may minimize private disclosure; required factual request is distinct from optional whole-case sharing. No hacking, live feed or invented video pixels.
- **Completion / handoff:** Save the independent source and limits; offer GH-DSC-03-A interpretation in TA-C03-S07. **Recovery: 54%.**

### TA-C03-S07 — The Archive Key

- **Purpose / characters:** Turn a reference code into an accountable records route. Player and Nora in her records-management role.
- **Start / dependencies:** TA-C03-S06 complete; revisit the actually inspected reference card/inventory and use Nora's verified professional routing channel.
- **Required play:** Review and Send a precise reference question; inspect Nora's delivered explanation of physical inventory references and the available finding aid; Save what GH-DSC-03-A designates.
- **Information / evidence:** `TA-EX-DESCRIPTOR-RESPONSE` may establish a reference hierarchy or requested source, with exact content still proposed. June's original safety-record relationship needs later item-level corroboration, never code resemblance alone.
- **Branches / knowledge:** Ask procedural followups without making Nora a friend, phone contact or group member. A public custodian reply can replace optional personal dialogue, with equivalent limited facts.
- **Completion / handoff:** Persist the actual professional reply and reference distinction, then offer combined timeline processing in TA-C03-S08. **Recovery: 54%.**

### TA-C03-S08 — Two Timelines

- **Purpose / characters:** Compare digital records with witness accounts while preserving contradictions. Player.
- **Start / dependencies:** TA-C03-S07 complete and required source accounts retained; manual next-segment recovery.
- **Required play:** Recover remaining stage-three fragments; build parallel digital and witness tracks; link supported overlaps, mark disputed intervals and Save `TA-FN-TWO-TIMELINES` with versioned source citations.
- **Information / evidence:** Correlation strengthens particular events only. Testimony, device actions, export dates and independently corroborated human activity remain distinct categories.
- **Branches / knowledge:** Offer several supported interpretations and an unresolved route. A private reconstruction does not automatically update NPC knowledge or authenticate all linked records.
- **Completion / handoff:** Retain the reconstruction and explicit unresolved question for the custodian/witness interview in TA-C03-S09. **Recovery: 60% (600/1000).**

### TA-C03-S09 — Who Was There?

- **Purpose / characters:** Develop June's last known interactions through an accountable human source. Player and a records custodian/relevant witness; Rowan is a **proposed** assignment, not fixed by the brief.
- **Start / dependencies:** TA-C03-S08 complete, a credible professional referral/contact and player-sent request.
- **Required play:** Read the actual statement, question presence versus hearsay, inspect any disclosed contemporaneous record and compare against the two timelines.
- **Information / evidence:** `TA-EX-JUNE-INTERACTIONS` narrows who may have been present or informed. No omniscient account of June's fatal confrontation; a source's confidence is not independent corroboration.
- **Branches / knowledge:** Anonymous/redacted custodian statement preserves the main factual route if a personal interview is declined. Rowan's complicity and Vivian's responsibility remain unproven to the player.
- **Completion / handoff:** Save supported interactions and contradictions, then manually review stronger Daniel movement evidence in TA-C03-S10. **Recovery: 60%.**

### TA-C03-S10 — The Last Sighting

- **Purpose / characters:** Strengthen Daniel's historical movement trail and put Unknown's omissions under pressure. Player, an authorized source and Unknown.
- **Start / dependencies:** TA-C03-S09 complete; actual corroborating source delivered and opened.
- **Required play:** Inspect `TA-EX-LAST-SIGHTING` and `TA-EX-ACCESS-U17`, compare source times, Save the limited match, then choose and Send a question to Unknown about **U-17**.
- **Information / evidence:** Independently stronger evidence supports a last-known movement; U-17 is an access identifier whose operator is not yet established. Unknown's recognition is testimony and cause for scrutiny, not identity proof.
- **Branches / knowledge:** Neutral or confrontational questioning alters trust. Recognition occurs only after the player's real disclosure; Unknown has no preemptive access to the evidence board.
- **Completion / handoff:** Persist the response, timeline limit and chapter completion/unlock; manual Continue to TA-C04-S01. **Recovery: 60%.**

## Chapter 4 — THE HIDDEN HAND

### TA-C04-S01 — The Access ID

- **Purpose / characters:** Confront Unknown's limited explanation and set a technical verification task. Unknown and player.
- **Start / dependencies:** Chapter 3 complete, actual U-17 exchange and manual Continue/opening.
- **Required play:** Send a challenge or clarification, inspect his bounded explanation, distinguish an account/service identifier from a person, and Save a checkable claim.
- **Information / evidence:** `TA-EX-UNKNOWN-U17-CLAIM` gives a claimed connection to archive access, with identity, scope and dates still unconfirmed. Unknown remains anonymous.
- **Branches / knowledge:** Skepticism can restrict optional sharing without closing the investigation. No portrait, sender metadata, internal account owner or narration reveals Eli prematurely.
- **Completion / handoff:** Record the actual claim and requested corroboration, then offer ledger recovery in TA-C04-S02. **Recovery: 60%.**

### TA-C04-S02 — The Redacted Ledger

- **Purpose / characters:** Trace records relationships while preserving redaction limits. Player; Nora's professional followup only if requested.
- **Start / dependencies:** TA-C04-S01 complete; manual approved index-fragment recovery.
- **Required play:** Recover `TA-PH-LEDGER-01`, inspect available identifiers/redacted portions, compare with external descriptor responses and Save specific matches and missing links.
- **Information / evidence:** Reference correspondence can support a retrieval chain, not fill redacted names or authenticate an original. External Nora/public sources do not add recovery units.
- **Branches / knowledge:** Optional reviewed custodian question; preserve both uncertain and supported link states. The brief's original record relation still requires item-level evidence.
- **Completion / handoff:** Retain ledger version/provenance and a source-linked comparison; offer restricted conversation recovery in TA-C04-S03. **Recovery: approximately 67% (670/1000).**

### TA-C04-S03 — The Restricted Conversation

- **Purpose / characters:** Add material about June and original evidence without prematurely resolving culpability. Player; recorded participants remain attributed only where supported.
- **Start / dependencies:** TA-C04-S02 complete; evidence-derived access prerequisite and manual recovery start.
- **Required play:** Recover `TA-PH-RESTRICTED-THREAD`, inspect restored and still-missing segments, compare dates and quoted records, Save what the conversation actually supports.
- **Information / evidence:** New communications connect June's concern to original safety material. Selected claims may implicate pressure or concealment but remain subject to provenance and corroboration.
- **Branches / knowledge:** Optional source questions need real disclosure; no forced whole-thread group share. Unknown's named identity and Daniel's present location stay hidden.
- **Completion / handoff:** Persist recovered version and limited findings, then offer a deliberate disclosure decision to Sophie in TA-C04-S04. **Recovery: approximately 74% (740/1000).**

### TA-C04-S04 — Sophie's Decision

- **Purpose / characters:** Let Sophie respond as a sister with agency rather than an evidence dispenser. Sophie and player.
- **Start / dependencies:** TA-C04-S03 complete; manual Sophie contact. Her opening knows only prior received facts.
- **Required play:** Review a bounded disclosure or choose to withhold sensitive details; Send the selected summary/boundary statement, receive her actual response and record a preservation/communication plan.
- **Information / evidence:** Relationship development, not new phone recovery. Sophie may elect limited participation or safe referral; she does not become an investigator who knows every board entry.
- **Branches / knowledge:** Minimum necessary disclosure, fuller permission-based disclosure or privacy-preserving support all keep the main case open. Recipient receipts and revocable future sharing preferences are separate from historical deliveries.
- **Completion / handoff:** A saved actual decision and delivered response enable Unknown's fuller account in TA-C04-S05. **Recovery: 74%.**

### TA-C04-S05 — The Person Behind TRACE

- **Purpose / characters:** Explain some of Unknown's connection to the archive without completing his identity reveal. Unknown and player.
- **Start / dependencies:** TA-C04-S04 complete and manually opened Unknown conversation.
- **Required play:** Send questions about backup custody, technical involvement and omissions; compare his account with manifest dates and Save supported versus uncorroborated elements.
- **Information / evidence:** `TA-EX-UNKNOWN-BACKUP-ACCOUNT` describes limited personal involvement, fear and errors. Exact extent requires approved dialogue. It cannot reveal the name Eli Ward or claim knowledge of the holding site.
- **Branches / knowledge:** Offer a skeptical route that relies on independently checkable records rather than trust. Refusal to share personal secrets changes tone, not access to a main-case clue.
- **Completion / handoff:** Persist the actual account and an independent verification task for TA-C04-S06. **Recovery: 74%.**

### TA-C04-S06 — The Altered Contact

- **Purpose / characters:** Establish technical evidence of insertion while postponing attribution and motive. Player; approved technical/custodian reply if needed.
- **Start / dependencies:** TA-C04-S05 complete and both compared contact sources actually available; use fragments already included in the 74% stage.
- **Required play:** Compare stable entry identifiers, signed/export manifests if authored, ordering/change records and original versus altered fields; Save the supported insertion conclusion and its limitations.
- **Information / evidence:** `TA-FN-CONTACT-INSERTION` can now establish manipulation through meaningful technical corroboration. It does not identify who chose the number, where it came from or who printed the card.
- **Branches / knowledge:** Keep independent copies immutable; unsupported attribution leads to review rather than a punitive fail. Source hashes establish copy identity only unless tied to an accountable original source.
- **Completion / handoff:** A saved, cited insertion finding enables account-access scrutiny in TA-C04-S07. **Recovery: 74%.**

### TA-C04-S07 — The Watcher's Account

- **Purpose / characters:** Investigate suspicious access without equating an account with its operator. Player; Nora/Rachel through existing authorized channels.
- **Start / dependencies:** TA-C04-S06 complete; lawfully supplied account/access record opened after an actual request/response.
- **Required play:** Inspect `TA-EX-ACCESS-RECORDS`, credential scope, retention and possible shared use; compare access intervals against the timeline and Save supported account-level facts.
- **Information / evidence:** An account associated with suspicious records access is a lead. It does not prove live surveillance of the player's phone, a person operating every event or Vivian's command responsibility.
- **Branches / knowledge:** Optional professional question requires reviewed Send. No real account login, network interception, GPS, contacts or surveillance integration.
- **Completion / handoff:** Persist limited access findings and a safe communication choice; make the interference attempt available in TA-C04-S08. **Recovery: 74%.**

### TA-C04-S08 — The Offer

- **Purpose / characters:** Make institutional pressure tangible with consequential player choices. Player and an attributed intermediary/offer source; exact role and wording are open.
- **Start / dependencies:** TA-C04-S07 complete; once-only offer notification and manual opening.
- **Required play:** Inspect `TA-EX-INFLUENCE-OFFER`, preserve the received offer and Save the interaction. Choose and Send a refusal, noncommittal request for written terms or bounded response, or explicitly record a private decision not to respond. Silence creates no outgoing message or sender receipt.
- **Information / evidence:** An attempt to influence the player becomes a preserved source. The sender's claimed authority, link to Vivian and implied threats require independent checking.
- **Branches / knowledge:** Choices change tension, later dialogue and which statement is received. No forced disclosure, dangerous meeting, money transfer or permanent loss of the main mystery; a safe written refusal keeps the source path.
- **Completion / handoff:** Record the actual sent response and any received terms, or the private no-response decision, plus the preservation choice; then offer cross-source reconstruction in TA-C04-S09. **Recovery: 74%.**

### TA-C04-S09 — Trust Under Pressure

- **Purpose / characters:** Evaluate people by corroborated actions and source constraints. Player; optional testimony from previously established contacts.
- **Start / dependencies:** TA-C04-S08 complete; manual final stage-four recovery and actual prior account records available.
- **Required play:** Recover remaining eligible fragments, compare testimony/access logs/version evidence, mark corroborated and contested claims, Save a reconstruction with explicit gaps.
- **Information / evidence:** `TA-FN-PRESSURE-RECONSTRUCTION` strengthens the cover-up case without final guilt attribution. Recovery, honesty and authenticity remain independent.
- **Branches / knowledge:** Trust choices affect future reactions but not whether supplied technical evidence exists. Optional followup and recipient-scoped sharing stay optional.
- **Completion / handoff:** Persist reconstruction and limitations; offer a new alleged Daniel message in TA-C04-S10. **Recovery: 80% (800/1000).**

### TA-C04-S10 — The Live Signal

- **Purpose / characters:** End on credible hope while guarding against forged-source certainty. Player, alleged Daniel sender, Unknown.
- **Start / dependencies:** TA-C04-S09 complete; actual message delivery and manual opening.
- **Required play:** Inspect `TA-EX-ALLEGED-DANIEL`, compare claimed knowledge with legitimately known records, choose and Send a bounded query to Unknown, and Save source uncertainty and safe next steps.
- **Information / evidence:** Credible indication Daniel may be alive, without verified sender identity or holding location. Unknown admits more about the backup, but his named identity still waits until TA-C05-S06.
- **Branches / knowledge:** A reply to the alleged sender is optional and explicitly reviewed; preserving/reporting the message can substitute. No automated beacon, technical geolocation or player rescue dispatch.
- **Completion / handoff:** Commit Chapter 4 completion/unlock after actual review and the required Unknown exchange; manual Continue to TA-C05-S01. **Recovery: 80%.**

## Chapter 5 — THE ORIGINAL RECORD

### TA-C05-S01 — The Final Recovery Key

- **Purpose / characters:** Earn access to the final segment through inspected evidence. Player; limited Unknown guidance.
- **Start / dependencies:** Chapter 4 complete and manual Continue; relevant prior key clues actually inspected and saved.
- **Required play:** Compare source-backed key components, inspect the segment/access warning and explicitly submit the evidence-derived recovery key. Offer a grounded hint/review route rather than external trivia or brute-force punishment.
- **Information / evidence:** The `TA-PH-FINAL-SEGMENT` container becomes eligible for processing; its TA-R12 / TA-R13 / TA-R14 batches retain separate scene/source guards. Unlocking does not decrypt all content, prove its authenticity or add recovery by itself.
- **Branches / knowledge:** Wrong attempts preserve progress and show which inspected source can be revisited. Optional Unknown advice has a real exchange and cannot reveal unrecovered bytes.
- **Completion / handoff:** Persist actual key eligibility/unlock receipt and offer manual recovery start in TA-C05-S02. **Recovery: 80%.**

### TA-C05-S02 — The Missing Conversation

- **Purpose / characters:** Recover Daniel's crucial communication and human regret. Player; Daniel and June/Rowan only as supported historical participants.
- **Start / dependencies:** TA-C05-S01 unlock committed and manual recovery operation.
- **Required play:** Recover `TA-PH-FINAL-CONVERSATION`, inspect restored spans and counterpart attribution, compare timing and Save the supported sequence of Daniel's disclosures and intentions.
- **Information / evidence:** Communications support Daniel's connection to June and his trust/mistake in sharing meeting information. The gap register governs exact wording; partial records alone do not prove every step of June's death.
- **Branches / knowledge:** Optional disclosure to Sophie/Maya requires privacy review. Emotional reactions follow only received facts; source inspection never auto-sends Daniel's private messages.
- **Completion / handoff:** Retain source/version and a limited chronology finding; offer original-index comparison in TA-C05-S03. **Recovery: approximately 88% (880/1000).**

### TA-C05-S03 — The Original Index

- **Purpose / characters:** Corroborate original safety findings against published records. Player, Nora/custodian and Rachel on verified professional channels as necessary.
- **Start / dependencies:** TA-C05-S02 complete; actual scoped request/reply chain for accountable originals and manual eligible archive recovery.
- **Required play:** Recover Daniel-held index/reference fragments, inspect separately obtained `TA-EX-CERTIFIED-ORIGINALS`, compare item identifiers/revisions against published approvals and Save field-level differences and custody.
- **Information / evidence:** GH-DSC-03-A reaches an item-level original-record relationship only through the supplied descriptor/retrieval chain. Certified external records count zero toward phone recovery; only deduplicated phone-manifest content contributes.
- **Branches / knowledge:** Independent custodial verification is required; no request receipt alone yields an authenticated original. Redactions remain visible and do not block supported comparisons.
- **Completion / handoff:** Persist actual original-source receipts and a supported comparison; offer planted-number origin analysis in TA-C05-S04. **Recovery: approximately 94% (940/1000).**

### TA-C05-S04 — The Planted Number

- **Purpose / characters:** Resolve how and why an uninvolved number was inserted. Player; Rowan/custodian testimony as approved, corroborated by records.
- **Start / dependencies:** TA-C05-S03 complete, technical insertion established and the approved origin/custody artifacts actually acquired.
- **Required play:** Compare the originating number record, export modification history and accountable statement; trace each transfer; Save a causal explanation with separate facts and inferences.
- **Information / evidence:** `TA-EX-NUMBER-ORIGIN` and corroborating records establish Rowan's misuse of an internal enquiry system, deliberate decoy selection and insertion. The player never gains a retroactive Daniel friendship. Specific source contents remain to be authored.
- **Branches / knowledge:** Challenge the statement against independent records. No unsupported confession-only solution or present-day access to real third-party contact lists.
- **Completion / handoff:** Every causal link has an inspected source or explicit unresolved label; approved full resolution enables warning-card authorship in TA-C05-S05. **Recovery: 94%.**

### TA-C05-S05 — Who Marked the Star?

- **Purpose / characters:** Resolve the distinction between planted contact, star marker and protective warning. Player, Sophie and source accounts delivered within their knowledge.
- **Start / dependencies:** TA-C05-S04 complete, original warning-card preservation and approved production/custody evidence available.
- **Required play:** Compare the contact-marking record, card production/custody trail and independent statements; inspect each link and Save who marked the entry, who produced the warning and how it reached Sophie.
- **Information / evidence:** `TA-FN-STAR-CARD-CHAIN` resolves intent and delayed discovery. Daniel's note, older folder photo and custody evidence corroborate Daniel as writer; handwriting resemblance alone is insufficient. Unknown is confirmed as Eli only in TA-C05-S06.
- **Branches / knowledge:** Permit Sophie's response without blame for following a misleading export. Attribution needs more than handwriting resemblance; exact artifacts and makers remain authoring blockers.
- **Completion / handoff:** A corroborated chain and actual Sophie exchange make explicit Unknown identity confirmation available next. **Recovery: 94%.**

### TA-C05-S06 — Unknown Revealed

- **Purpose / characters:** Confirm Eli's identity and make his omissions accountable. Player and Eli; optional Sophie/Maya disclosure is separate.
- **Start / dependencies:** TA-C05-S05 complete and the proposed identity-verification source/route actually delivered.
- **Required play:** Review Unknown's identity claim, independently corroborate the coworker/backup connection through accountable records and known contacts, Send the chosen response and Save the verified identity scope.
- **Information / evidence:** **CONFIRMED CANON reveal: Unknown is Eli Ward.** Explain his work with Daniel, preserved encrypted backup, fear and failure to report suspicious access. A self-declared name alone is insufficient; he does not know the holding site.
- **Branches / knowledge:** Anger, guarded cooperation or forgiveness alter relationship and epilogue reactions, not the rescued-alive ending. Earlier messages retain their historical Unknown sender presentation and original text.
- **Completion / handoff:** Store a real identity-confirmation receipt and response; future sender presentation may identify Eli, then offer last-hour reconstruction in TA-C05-S07. **Recovery: 94%.**

### TA-C05-S07 — The Missing Hour — Revisited

- **Purpose / characters:** Convert the early log gap into an evidence-supported account of Daniel's movements. Player; Rachel through the established official channel, Eli only within observed knowledge.
- **Start / dependencies:** TA-C05-S06 complete; relevant original/custodial records and prior timeline sources actually inspected.
- **Required play:** Reopen `TA-PH-ACTIVITY-01` with later fragments, compare independent access/camera/witness records, distinguish device movement from human presence and Save a reconstruction linking the kidnapping to a contractor facility.
- **Information / evidence:** `TA-FN-FACILITY-LEAD` is a credible actionable lead, supported by multiple independent sources. It is not a magical live location or authority for the player to enter a facility.
- **Branches / knowledge:** Compare alternatives and report uncertainty. Eli contributes only personally observed backup history; external authorities obtain new operational information through their own process.
- **Completion / handoff:** Persist source links, unresolved alternatives and a case-report draft; offer final archive processing in TA-C05-S08. **Recovery: 94%.**

### TA-C05-S08 — Recovery Complete

- **Purpose / characters:** Finish the defined archive and deliver an honest, actionable report. Player and Rachel as actual recipient.
- **Start / dependencies:** TA-C05-S07 complete; manual final recovery operation and report review.
- **Required play:** Reach the last eligible manifest units, inspect final additions, classify facts/testimony/inferences, review source references and redactions, then explicitly **Send** the final case report to Rachel's verified channel.
- **Information / evidence:** `TA-FN-FINAL-CASE-REPORT` compiles separate evidence chains for record manipulation, June, number/card, identity and Daniel's facility lead. **100%** means all defined recoverable units, not every original phone byte, all corruption repaired or all claims true.
- **Branches / knowledge:** Optional personal details may be redacted while preserving required actionable sources. A report receipt proves delivery; Rachel's later assessment is a separate saved response.
- **Completion / handoff:** Persist completed recovery, reviewed report version, actual recipient delivery and Rachel's matching acknowledgment/assessment readiness. Offer TA-C05-S09 manually. **Recovery: 100% (1000/1000).**

### TA-C05-S09 — The Final Contact

- **Purpose / characters:** Resolve the immediate disappearance through an official rescue. Rachel, player, Sophie and Maya; Daniel after independently confirmed rescue.
- **Start / dependencies:** TA-C05-S08 delivered report and actual Rachel assessment. Authorities independently corroborate the facility lead and follow an approved fictional operational process; delivery alone does not launch a raid.
- **Required play:** Open official updates, provide a requested clarification through an explicit Send if needed, receive the verified rescue confirmation and review a carefully scoped family notification before sending/acknowledging it.
- **Information / evidence:** **Daniel is found alive at the old harbor storage facility by authorities under Rachel**, after official corroboration of contractor vehicle records, storage access logs, witness evidence and independent location confirmation. His identity and safe recovery are confirmed through the official source; the player does not conduct the operation.
- **Branches / knowledge:** Safe waiting/review interactions preserve agency without asking the player to direct tactics. Sophie and Maya learn survival only through actual official/family delivery, never a global flag before a message.
- **Completion / handoff:** Commit official rescue confirmation and actual family notification receipts, then offer the final resolution in TA-C05-S10. **Recovery: 100%.**

### TA-C05-S10 — The Archive Closes

- **Purpose / characters:** Close June's case, establish responsibility and give the relationships an ending. Player, Rachel, Daniel, Sophie, Maya, Lucas, Eli; Rowan/Vivian through accountable case findings, Ana/Nora within their established roles.
- **Start / dependencies:** Verified rescue and family notification complete; manual final case review.
- **Required play:** Review the corroborated reconstruction and official status, inspect how each conclusion maps to sources, open Daniel's personally confirmed gratitude message and choose/Send an optional response or explicitly finish without replying.
- **Information / evidence:** Resolve June's fatal confrontation and concealment, Rowan's disclosure/record manipulation, Vivian's evidenced responsibility, Eli's omissions and Daniel's kidnapping. June remains deceased. Distinguish established findings, ongoing legal process and speculative details; do not invent an instant trial.
- **Branches / knowledge:** Trust and privacy decisions shape apologies, cooperation and emotional reactions. Sophie, Maya, Lucas and Daniel receive closure on their actual relationship histories. No secret Daniel friendship or fake-death reversal.
- **Completion / handoff:** Player explicitly closes the final reviewed case/epilogue once. Preserve read-only archive/history access. **Recovery: 100%. End of Chapter 5 and the fifty-scene story; no additional numbered scene or chapter.**

## Cross-scene validation obligations

1. Validate the exact five-by-ten registry, ordered IDs and all fifty supplied titles before any future runtime route is activated. Required handoffs target only the next documented scene; optional activities never increase the count.
2. No recovery target can be satisfied by article scan animation, external evidence, private conclusions, installation, viewing, sharing or completion flags. Content released after a chapter's last recovery milestone must already be in that stage's recovered set, or the manifest/stage budget must be revised before implementation.
3. Test each entry and exit with missing predecessor receipts, selection without Send, revisits, duplicate ticks and save/reload. Decline/defer/callback alternatives preserve player agency without inventing actions.
4. Apply reveal guards to text, thumbnails, portraits, source names, filenames, previews, summaries, search, notifications, screenshots used in-game and accessibility labels. A UI view cannot mint knowledge.
5. Before activating a scene, its proposed artifacts need approved bodies or honest unavailable representations, explicit source/custody limits and a branch-specific recipient knowledge review. All plot-critical open decisions in the gap register must be resolved before dependent scripts are written.
6. The existing game remains on its recorded route. A new campaign requires its own future approved edition tag, story schema, content graph and tested explicit restart/compatibility path. None of these fifty contracts is a runtime completion flag today.
