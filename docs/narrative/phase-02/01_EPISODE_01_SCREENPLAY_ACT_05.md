# Episode 01 screenplay — Act 05: Source, not certainty

**Fictional date:** 8 October 2026, early afternoon; the proposed GCRO request is made after public source selection. **Active pacing:** unmeasured; see the [route estimate](07_EPISODE_01_TIMING_AND_PACING_MODEL.md). Maya remains in Bulletin token inbox unless `CONN-E01-01` exists, in which case only **new** Messages content appears there. The public request is independent of Maya, trust and Archive access. T02/T03/T09/T10.

## E01-S25 — A question that isn't about the file

**Entry/surface:** After S24, only when the player previously opened a direct Maya source conversation and taps her check-in notification. **Purpose/turn:** Maya acknowledges Daniel as a missing friend and sets a boundary. **Exit:** listen or reply with Send → optional S26; “Continue public request” → S27. **Checkpoint:** `S25.checkin_seen|skipped`; no case proof here. If the player stayed with a public card, sent no source detail or simply ignores the notification, no S25 Maya bubble is delivered and S27 remains available.

Maya: “Can I say something that isn't about the table? You can tell me no.”

Maya: “People keep asking whether a changed line tells us where Daniel is. I catch myself wanting it to. It doesn't.”

Maya: “Daniel used to bring terrible vending-machine coffee to the archive room because he said at least it was honest about being bad.”

Maya: “I don't want to tell his sister that a changed field means we found him. We haven't.”

Maya: “She asked me this morning whether I had news. I said I had a question about a document. I could hear how small that sounded. It was still the true answer.”

`P-S25-A` Player [Send]: “You can miss him and still check the source.” → Maya: “I know. Hearing them together helps.” Maya Affinity +2.

`P-S25-B` Player [Send]: “I can keep this to the records. You don't have to tell me more.” → Maya: “Thank you. That's the boundary I need today.” Maya Trust +1.

`P-S25-C` Player [Send]: “I need to step away from the personal part.” → Maya: “Of course. The public request link is there when you want it.” No delta, no guilt line.

If C is sent, Maya adds only: “I won't bring his family into the next source question.” The next inbox item, if any, concerns the public record number. If the player says nothing, her check-in remains a delivered message with no presumed comfort from the player. S27 remains reachable without waiting for her emotional response.

**Optional S25 memory, offered only after a delivered `P-S25-A`:**

Maya: “He'd correct a caption even if it made his own work look worse. Last winter he found that he'd labeled a photograph one street over.”

Maya: “He came in on his lunch break to write the correction himself. He had a bus ticket in his hand and kept checking the time.”

Maya: “That's the Daniel I know. It isn't the whole Daniel. I keep having to remind myself of that.”

`P-S25-D` Player [Send]: “What else don't you know?” → Maya: “Why he gave me this crop. Why he stopped answering on the fourth.” Maya: “I know how his sentences sound on a page. That isn't the same as knowing where he is.”

`P-S25-E` Player [Send]: “Maybe he trusted you with only one part.” → Maya: “Maybe. I resent it a little, and then I feel awful for resenting someone who's missing.” Maya: “You didn't ask to hear that. Sorry.”

`P-S25-F` Player [Send]: “You don't need to apologise for being worried.” → Maya: “I'm trying to keep the work from becoming my way of avoiding the worry.” Maya: “Right. You were looking at the version history. I'll let you get back to it.”

`P-S25-D/E/F` are offered only inside that A-memory. **If `P-S25-B` was delivered instead**, Maya: “I appreciate that. I can get sharp when strangers ask about his family.” Maya: “The record number is on the public notice. If you want the original version, the civic archive has its own request desk.”

`P-S25-G` Player [Send]: “I'll follow the public route.” → Maya: “Good. If it turns out the crop was misleading, I'd want to know that too.”

`P-S25-H` Player [Send]: “You can stop answering for a while.” → Maya: “I will. My afternoon shift ends later. The public pages won't vanish because I put my phone down.”

`P-S25-G/H` are offered only after B. If C was sent or the check-in was skipped, no extra personal story or D–H option appears. UI “Continue public request” opens S27 without a framing question. These branches are optional, not missing source gates. They alter the texture of the Maya relationship; only the stated A/B/C committed deltas apply, except where a separate future callback explicitly uses a sent line.

If S15 criticism was sent, replace Maya's second line with: “You were right to ask about what I posted. I keep thinking about that. I still don't want Daniel reduced to a file.” All other lines remain. If player closes without Send, Maya receives nothing and S26/S27 stay available. No unprompted family message is sent. Designer note: connection is offered, not extracted for a relationship reward.

If S15-C was sent, Maya's later tone is restrained: “I added the correction note to the brief. You can read it without trusting me to describe it.” If S15-D was sent instead, she says: “The editor note now says the crop was my decision.” If neither was sent, she does not claim that this player prompted her correction. The public note is the source for the published wording; the chat is only her account of why she changed it.

UI after the check-in: “Discuss the revision notice” → S26; “Continue public request” → S27. Neither tap sends a player line. A closed or unopened check-in leaves both the source request and the player's relationship state intact.

## E01-S26 — What to say aloud

**Entry/surface:** Player opened Maya's S25 check-in and chooses “Discuss the revision notice”; a skipped check-in or public/no-share route goes straight to S27. **Purpose/turn:** Frame a claim to a human recipient without changing fixed truth. **Exit:** any explicit Send or “Keep this private for now” → S27. **Choice:** C03-FRAME. **Checkpoint:** `S26.frame_sent:{option}` or `private`; only sent option adjusts Maya values and facts. The player can also close the check-in without opening this framing composer. A late tip does not retroactively deliver S26.

Maya: “The revision notice calls it a route reconciliation. I can't tell if that's a dull explanation or a useful one.”

Maya: “What would you put in one sentence, if you had to defend it?”

Maya: “It might end up in an email to the records desk. It might never leave this inbox. I'd rather hear the sentence with the uncertainty still in it.”

`C03-FRAME.A` Player [Send]: “The order of versions is odd. Let's ask the audit office before we say why.” → Maya: “Yes. That's a sentence I could stand behind.” Maya: “I'm going to keep the article as it is until we have the source.” Maya Trust +2/Suspicion −1.

`C03-FRAME.B` Player [Send]: “Someone erased June. The people running the portal must know.” → Maya: “Maybe. But 'must know' is doing a lot of work there.” Maya: “I won't put that in the brief on a crop and a notice. The audit request is still open.” Maya Trust −3/Suspicion +4; E03 callback flagged `early_accusation`.

`C03-FRAME.C` Player [Send]: “I'm not sure. The older image could be wrong.” → Maya: “It could. The cleanest next question is whether the archive still has that version.” Maya: “You don't have to choose a side to ask for it.” Maya Trust +1.

UI “Keep this private for now” → UI “No message sent. Your board note remains private.” Maya cannot mention this unsent framing later. Every sent option grants Maya only its exact sentence, not K02. Designer note: Maya can push back while still collaborating through public sources.

If A was sent, Maya's transition is: “I'll put ‘source requested’ in my own notes, nothing about a culprit.” If B was sent, she replies after a pause: “I know why you want a person behind it. I do too. That isn't a reason to put one there.” If C was sent: “Then we're asking the office a question, not arguing with a missing man through a screenshot.” If kept private, there is no Maya transition; the public GCRO result selected at S23 opens S27 directly. These lines do not disclose a request the player has not submitted.

## E01-S27 — Ask the office that holds the past

**Entry/surface:** GCRO public request from SR-01, reachable after S23 even without R01, R03, Messages or S25/S26. **Purpose/turn:** The player seeks an independent redacted lineage as an ordinary civilian. **Exit:** explicit **Submit request**, receipt and eligibility review → S28 when an eligible export is issued; otherwise recoverable review. **Evidence:** request is not E012. **Checkpoint:** `S27.request:{requestId,status}` once per scope. **Investigation:** I06.

UI title: “Greyhaven Civic Records Office · redacted version request”

UI: “Public-interest lineage view · North Quay / Bus 4 / 23 Nov 2019.”

UI: “An adult civilian may request a case-scoped, four-page redacted version view. A duty officer checks eligibility and resident redactions before release. This form cannot open private resident records.”

UI fields: “Record: GH-NQ-BUS4-2019-11-23”, “Requested view: v1/v2 lineage and public escort field”, “Reason: compare a public preview with the current civic view.”

UI scope review: “Choose the narrowest request that answers your question.”

Option “Redacted v1/v2 lineage and public escort field.” → UI “Eligible for public-interest review. The office will still check this request and its redactions.”

Option “Full list of residents and destinations.” → UI “Those are protected fields. This civilian route cannot release them. You can request the redacted lineage without them.”

Option “Who logged into the correction portal today?” → UI “This archived-version request does not cover private account logs or current users. The public process/status pages are separate.”

Hint 1: “What field did you actually compare?” Hint 2: “The escort line is public; resident details are not.” Hint 3: “Select the redacted v1/v2 lineage and escort field.” A wrong scope selection stays in review and cannot be sent as if automatically eligible. If the player deliberately submits an overbroad request through an optional review path, the refusal copy below applies and the form offers a narrower resubmission; no private data is issued.

UI: “This token belongs to this request session. It is not your Bulletin reply token. It can be used once for an approved release.”

UI buttons: “Review request”, “Submit request”, “Back”.

On Review: UI “Requested: redacted lineage only. Excluded: resident names, private destinations, care details, unrelated contacts. Recipient: this request session.”

On Submit accepted for review: UI “Request received by GCRO. Reference: REQ-20261008-041. Status: REVIEWING. No export has been issued.”

UI request receipt drawer: “This receipt proves that GCRO accepted a request for review. It does not prove eligibility was granted, a file exists for you, or that the preview's field is authentic.” If the player tries to cite the request on the Board, UI “A request is a question to a custodian. Wait for an issued redacted view and check its transfer before citing its content.”

If invalid token/replay: UI “This request token cannot be used again or from a different session. Open request recovery; no export was delivered.”

If eligibility is refused: UI “Release refused: the request does not fit the public redacted scope. You may correct the scope or seek a recorded review. The preview remains unverified.”

If review is delayed: UI “Still under redaction review. Keep the public comparison as a lead; do not mark it verified.”

If the office returns a redaction correction instead of a release, UI “Review needs a narrower field list. Resident destinations are excluded. Accept the redacted escort-field scope or keep the public lead.” On accepting, UI “Scope revision recorded for this request session. Still reviewing. No R04.” On refusal, UI “Review closed without release. Reopening requires a new eligible request and a new receipt.” Neither outcome silently upgrades the player's knowledge.

If request is pending, UI “Continue examining public records” and “Return to request status” remain. Maya, if legitimately contacted and explicitly asked with `P-S27-A` Player [Send]: “Can you get me the audit file faster?” replies: “No. The office decides release. I can tell you which public record number I used, but I can't make an audit original appear.” No Send means no reply. Designer note: the formal source is a process with failure states, not a magic button.
