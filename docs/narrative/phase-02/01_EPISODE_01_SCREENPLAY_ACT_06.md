# Episode 01 screenplay — Act 06: The live queue

**Fictional date:** 8 October 2026, after a scoped GCRO request; proposed issue near 15:42 and closing beat before 18:00. These are authoring times, not real-world waits or measured pacing. **Active pacing:** unmeasured; see the [route estimate](07_EPISODE_01_TIMING_AND_PACING_MODEL.md). **Gate:** no K02 or S30 completion without authentic E012, requester-only R04 and a checked E003 order. The 2019 revision and current role capability are different questions. T01/T03/T08/T09/T10.

## E01-S28 — Four pages, one claim

**Entry/surface:** S27 request eligible and GCRO's separate duty review finishes; Files receives a **fictional in-world** release. If pending/refused, stay in S27/S28 status review with public research available. **Purpose/turn:** The player checks issuer, lineage, page/redaction and transfer, instead of trusting a download badge. **Exit:** all checks pass → requester-only R04 and S29; any failed check → repair loop. **Checkpoint:** `S28.export_revision` and check flags; one receipt per valid delivered revision. **Investigation:** I06. Final authored four-page text is [prop P04](04_EPISODE_01_IN_WORLD_ASSETS.md#p04--gcro-redacted-lineage-view-e012) and its [serialized master](assets/GCRO-EXP-20261008-041.txt); fictional issue and runtime validation remain guarded events.

UI notification: “GCRO request status updated.”

UI status when issued: “Redacted lineage view issued for REQ-20261008-041. Review the source before using it.”

UI file: “GCRO-EXP-20261008-041 · four pages · redacted civilian view.”

UI file preview: “Page 1 shows custody and scope. Page 2 is folded in the preview until opened. The player can read all four pages in order or use the accessible linear text. No dramatic alert announces the escort field before the player reaches it.”

UI page 2, on opening: “Escort: JUNE ELLIS.” UI margin: “The same words you saw in Daniel's crop. This is a different custodian's archived snapshot—if the issue and transfer checks pass.” UI: “Do not add this field to a verified Board card yet.”

UI source drawer: “Issuer: Greyhaven Civic Records Office, separate from the current civic portal and Memory Project. Source: archived v1 snapshot. Recipient: this request session only.”

UI verification tasks: “Check office”, “Check version chain”, “Check page and redaction list”, “Check transfer and file integrity”.

On Check office, the player compares GCRO directory `GCRO-REG-01` with the issuing duty role. If match: UI “Issuer role matches the independent GCRO directory.” If wrong: UI “The issuer does not match the office directory. Do not use this file as verified; request a corrected release.”

On Check version chain, the player matches `GH-NQ-BUS4-2019-11-23/v1`, `SNAP-20191124-1520`, `COR-20191125-B4`, and E003's v2 reference. If match: UI “The archived v1 and public correction refer to the same record lineage.” If wrong: UI “These IDs do not form one lineage. A similar title is not enough.”

If the player sees the name and immediately taps “Use as proof,” UI “The page is promising, but the release may still be incomplete or addressed to another requester. Finish the source checks before making a claim.” The page stays open at the same position. A wrong lineage choice highlights the mismatched segment only; it never replaces the real archive page or awards K02.

UI version-chain subtask: “Choose the link that would make the older field relevant to today's public page.”

Option “Same root record ID, v1 snapshot, correction reference, v2 public reference.” → UI “The identifiers connect an archived older version to the current public view.”

Option “Both pages mention Bus 4.” → UI “A title match is too weak. More than one record could mention a bus number.”

Option “The file was created today.” → UI “Today's issue date dates the export, not the 2019 snapshot it contains.”

On Check pages, if all four numbered pages and `RED-041` field list are present: UI “Four of four pages present. Resident identifying fields are suppressed under the stated redaction list.” If a page or list is missing: UI “Release incomplete. The missing page or redaction statement needs an office reissue.”

On Check transfer/integrity, implementation must compare the **actual final file bytes** to the issued digest and independently validated duty certification; no checksum is hard-coded in this script. On actual match: UI “File integrity matches the GCRO issue record. Delivered to this request session; token spent.” On mismatch: UI “Integrity mismatch. Do not cite this export. Request a fresh certified copy.” On a receipt for another session: UI “This transfer is addressed to another requester. You cannot use it as your R04.”

UI transfer subtask: “Which receipt can you use?”

Option “The issue for this one-use request session, with its own delivery record.” → UI “This is the only transfer addressed to you. Now check the final-file integrity result.”

Option “A copy forwarded by Maya.” → UI “Maya has a preview, not this requester's issued audit transfer. A forwarded file would need its own permitted source and delivery check.”

Option “Any file with the GCRO logo.” → UI “A logo is not an issuer or integrity check. Compare the directory and issue record.”

UI verification explanation: “A matching digest says these are the bytes GCRO issued. It does not make every historic statement inside true.” The player is never asked to type a long checksum from memory; the UI compares final bytes and displays the result with an accessible text description.

If all four checks pass, UI: “Validated release · R04 · recipient: you only. This verifies the version lineage and the released redacted fields. It does not prove why anyone changed the record.” If any check fails, UI: “Evidence status: ISSUED BUT UNVERIFIED. Your public comparison remains a lead.” UI actions: “Request corrected release”, “Review public notice”, “Keep current lead”. The correction request uses the same lawful scope, new revision and new recorded issue; no automatic positive response or retroactive R04. A late issue reopens S28 when genuinely delivered, without rewriting the earlier timeline. Designer note: validation is active reasoning, and failure remains honest.

On a pending request, UI: “The office has your question. It has not answered it.” On a refused request, UI: “The refusal is a process result, not evidence that June was absent.” On a mismatched file, UI: “Keep the file in quarantine for the correction request; do not cite its contents.” These routes retain the public S30 process card as an optional research page, but cannot end the K02-dependent episode or show the verified-role cliffhanger as a consequence of K02. They are honest unresolved branches for later authoring/production, not fabricated validation success.

## E01-S29 — After verification

**Entry/surface:** valid E012/R04 and prior E003 notice. **Purpose/turn:** Replace a plausible suspicion with the narrow corroborated fact. **Exit:** cite E012/E003/E002 and save K02 → S30. Without valid R04, board stays open at `LEAD` and S30 remains locked. **Checkpoint:** `S29.k02_cited` idempotent. **Investigation:** I07.

UI board question: “What changed after verification?”

UI citation slots: “Older field”, “Version order”, “Current field”.

Available cards: “E001 cropped preview”, “E012 GCRO redacted lineage”, “E003 public revision notice”, “E002 current civic copy”.

Correct chain: E012 as older field and authenticated v1; E012 + E003 as order; E002 as current field. UI “The independently archived v1 retained June Ellis in the escort field when marked verified on 24 Nov 2019 at 15:20. The public correction was approved on 25 Nov 2019 at 08:40. The current v2 view omits that field.”

UI: “K02 · CORROBORATED: the public manifest changed after v1 verification. Unknown: whether the correction was justified, who operated the queue now, and who directed events in 2019.”

UI Board comparison after citation: “This morning, your card said *the visible escort field changed*. Now the archived v1 is linked to the current record through a released lineage. You can replace the source status of that narrow claim. You cannot replace your earlier uncertainty with a memory that you knew the reason all along.” The player must tap “Save corroborated finding”; backing out leaves the correctly assembled citation draft but no K02 until saved. Receipt records the source IDs and selected claim, once.

On Save, if R01 and S12 already exist, UI: “Finding saved. Follow the public revision-index link to see how corrections reach this record.” → S30. If the player reached K02 before sending any tip, UI: “Finding saved privately. The GCRO export stays with this request session. You can inspect the public service page now or return to the case brief to send a minimal public-observation tip.” The latter opens S08 only on tap; it never copies K02 or E012 into the draft. This later tip is a separate, smaller act of contact, not a retroactive disclosure of the audit.

If E001 alone placed as older source: UI “The crop led you here. Use the GCRO release to certify what v1 contained.” If E003 alone used for the field: UI “The notice gives a version event, not the older escort value.” If dates reversed: UI “Check 24 November against 25 November. Approval came later.” If a motive or person is selected: UI “No cited source here establishes motive or an operator. Keep that as an open question.”

Hint 1: “Use one independent source for the old field.” Hint 2: “The GCRO release authenticates v1; the portal notice dates the correction.” Hint 3: “E012 + E003 + E002 support a changed field after verification, no more.”

If the player has not told Maya the result, Maya receives no K02. Optional `P-S29-A` Player [Send] to the existing token inbox or consented Messages: “The redacted GCRO release confirms the older escort field and the later correction date. I can share the public finding, not the requester-only file.” → Maya: “That's a stronger sentence than the one we had this morning.” Maya: “Keep the export in your receipt folder. I won't post a copy I haven't been cleared to see.” Optional `P-S29-B` Player [Send]: “I checked the lineage. The version changed after verification, but I don't know why.” → Maya: “Good. I can say we're checking a dated revision, not who made it.” If no Send, no Maya knowledge change; her later E02 introduction must depend on an actual disclosure. Designer note: the player earns a fact and still has to decide who hears it.

## E01-S30 — The part that is still open

**Entry/surface:** K02 board saved **and** R01 plus S12 editor-channel check completed; public Civic Portal Validation Desk source independently opened from revision-index link. A no-tip player may inspect this public service page after K02, but the S30 finale remains a recoverable hold until they explicitly send a tip and verify the editor channel; the GCRO request and R04 are not repeated. **Purpose/turn:** End on a process that remains enabled, without accusing a person. **Exit:** inspect source card or downgraded availability notice, save a scoped open question, explicit “End episode” → E01 complete. **Checkpoint:** `S30.hook_variant` and `E01.complete` once; E02 cannot fire before explicit Continue. **Evidence:** `PORTAL-ROLE-STATUS-E01-RC1` when valid, role-class capability only. **Investigation:** I07. Full candidate card in [prop P05](04_EPISODE_01_IN_WORLD_ASSETS.md#p05--public-correction-role-card).

If K02 exists but R01 or S12 does not, UI: “Your checked finding is saved. The public service page can be read now, but the episode's case-brief conversation is still open.” UI actions: “Prepare a public-observation tip” → S08 identity choice and draft with E001/E002 **public links only**; “Check the editor listing” → S12 if R01 was already delivered; “Keep researching” → private Board. Nothing sends or preselects an identity mode on opening this sheet. The draft explicitly excludes E012, R04 and the player's private notes. Once R01 and S12 are complete, “Return to saved finding” reopens S30 without repeating S27–S29. The skeptical player may keep the GCRO finding and role question private throughout.

UI link: “How corrections reach this public record”

If status card is valid against the public `GH-PV-02 v1` rule, UI: “Civic Portal Validation Desk · public service-status register.”

UI card: “Service: public record correction queue. Role class: correction queue submitter. Capability: ENABLED. As of: 8 Oct 2026. This public card lists no individual account, login, submission or operator.”

UI source check: “Issuing desk and public rule match the portal directory. Retrieval saved to your case notes.”

UI board question: “What does this add?”

Option “The role can still submit correction work.” → UI “Supported by the public capability card. Who can use it, or whether anyone used it today, remains unknown.”

Option “The same person is changing records now.” → UI “The card names a role class, not an operator or a new action. Rephrase the question.”

Option “The office must have removed June deliberately.” → UI “The card is about current capability. It cannot prove a 2019 motive.”

If card unavailable, stale or missing a rule/flag, UI: “Public correction-service notice: the portal continues to accept correction requests under published review rules. Individual role status is unavailable in this view.” UI board: “Open question: which review protects the version history now?” UI “No enabled-role fact recorded.” This route can complete E01 after K02, with a narrower cliffhanger.

If valid, final UI: “The archive kept the older line. The public page did not. The queue that can change what everyone sees is still enabled—and the public card won't say whose hand is on it.”

If fallback, final UI: “A verified record was changed. The public process still accepts corrections. The status of any individual role remains out of view.”

The player may open Maya's existing verified Bulletin token channel or consented Messages connection before ending. Nothing is sent automatically by the S30 discovery.

If the role card was valid, `P-S30-A` Player [Send]: “I found a public status card. It says the correction queue submitter role class is still enabled. It doesn't say who uses it.” → Maya: “Still enabled? I thought the old case had gone cold enough that nobody was touching that part of the portal.” Maya: “No—sorry. That was me turning a status card into a story.” Maya: “It tells us what the system allows. It doesn't tell us whether anyone used it today.” Maya: “Can you keep the retrieval note? Don't send me a private log or an account name you don't have.”

After A, Maya: “Daniel would have hated how carefully I'm choosing these words.” Maya: “No. He would have made me choose them twice.” She begins another message, deletes it, then sends: “The queue is open. That's what we know. I'll ask how it is reviewed.” Her concern never supplies an unseen operator, a current correction submission, or access to the player's E012.

`P-S30-B` Player [Send]: “The old record changed after verification. The role card is public, but I don't want to guess who is behind it.” → Maya: “Good. We can ask how corrections are reviewed without pretending we know the operator.” Maya: “I'll update my notes with your selected finding. I won't put a name in the brief.”

If the fallback notice was shown, `P-S30-C` Player [Send]: “The public site still accepts corrections, but the role-status card isn't usable. I can't tell whether that role is enabled.” → Maya: “Then that is where we stop. Process open, role status unknown.” Maya: “It isn't as neat a hook as a name. It's more honest.”

If the player chooses not to Send, UI: “Keep this question private. Maya will not receive the status card or your interpretation.” This option has no relationship penalty. In a sent branch Maya receives only the selected public status/finding, never the requester's E012 file by implication. A future recap must use the exact selected scope.

If B was sent, Maya's final message is: “I'll write the question on paper before I put another sentence online.” If C was sent, she says: “I can live with an unknown on the page. It's harder for someone else to misuse than a name we guessed.” If nothing was sent, the ending stays inside the player's own Board; Maya's next-episode recap cannot treat the role status as shared. A low-trust player receives no suddenly intimate farewell.

UI: “Case Board · One answer: the versions changed after verification. One question: who checks the next change?”

UI Board final interaction: the player opens the verified-lineage card and the live role-capability card side by side. A thin line connects them only as a *question*, labeled “Who reviews changes to a record once a verified version exists?” Tapping the line shows: “No operator identified. No new submission established.” If the public card is unavailable, the second card is a process notice with “role status unknown.” The visual line cannot be saved as an accusation. The end control appears only after the player has read that limit and saved the scoped question.

UI button: “End episode”. No Maya bubble is generated here. No Vivian, Ana, Daniel location, 2019 diversion, or decoded `7-14` appears in the card or notification. Designer note: the cliffhanger grows from a verified process weakness, not a premature culprit reveal.
