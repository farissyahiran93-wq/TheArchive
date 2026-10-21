# Episode 01 screenplay — Act 04: Which version?

**Fictional date:** 8 October 2026, after S18. **Active pacing:** unmeasured; see the [route estimate](07_EPISODE_01_TIMING_AND_PACING_MODEL.md). **Surfaces:** Archive if R03, otherwise Bulletin/Browser/Files; both save private Case Board annotations. **Purpose:** test an ordinary correction before requesting independent lineage. **Source discipline:** E001 metadata is reported by the preview; E003 is a public notice; neither is E012. Public Greyhaven Maps depicts places named in acquired E01 sources only, never a device/person location. T01/T03/T08/T09.

## E01-S19 — The date printed on an image

**Entry/surface:** S18 source card or public preview details. **Purpose/turn:** A timestamp tempts certainty; the player learns to cite its carrier. **Exit:** inspect v1 metadata → S20. **Checkpoint:** `S19.preview_metadata_seen`. **Evidence:** E001 reported date, still LEAD. **Investigation:** I04.

UI card title: “Older Bus 4 preview · source details”

UI: “Visible footer in crop: GH-NQ-BUS4-2019-11-23/v1 · VERIFIED 24 NOV 2019 15:20.”

UI: “Carrier: cropped image transferred to the Memory Project on 3 Oct 2026. The audit original is not in this folder.”

UI prompt: “What can you write down now?”

Option “The preview displays a 24 Nov verification stamp.” → UI “Saved as reported by E001. You have not authenticated the stamp.”

Option “The full v1 was verified at that time.” → UI “That may be true, but this crop alone does not prove the full audit state. Save the stamp as a lead.”

Option “This date is when Maya published the article.” → UI “The article is dated 7 Oct 2026. This footer claims a 2019 record event.”

Hint: “Separate when the underlying record claims to be verified from when this image reached Maya.” Text alternative spells out all footer characters. Designer note: evidence can be precise and still provisional.

UI secondary task: “Four dates may appear in your notes. Label what each date belongs to.”

Card “23 Nov 2019” → “Event described by the record.” Card “24 Nov 2019 15:20” → “Verification stamp reported in the crop.” Card “3 Oct 2026” → “Preview transfer to the Memory Project.” Card “7 Oct 2026” → “Bulletin publication.”

If transfer is labeled as verification, UI “Maya received an image in 2026. That cannot be the original 2019 verification.” If Bulletin publication is labeled as event date, UI “The brief was posted years later. The form itself describes the evacuation in 2019.” If the crop stamp is labeled as authenticated, UI “You can read the stamp, but still need the archived source to validate it.”

Hint 1: “Who handled each item at that moment?” Hint 2: “Separate the record's event from its later copies.” Hint 3: “2019 event and stamp; 2026 transfer and public post.”

On correct labeling, UI “Date carriers saved to your private Board. The two 2026 dates explain how the preview reached you; they do not certify its 2019 content.”

UI follow-through: “Someone posts ‘verified in 2026’ beside the crop. Which date did they mistake?” If the player chooses the 3 Oct transfer, UI “Exactly. Receipt of a picture is not verification of the older record.” If the player chooses 24 Nov 2019, UI “That is the stamp printed inside the picture. It still needs an independent carrier.” If the player chooses 7 Oct, UI “That is the article's publication; it tells you even less about the old file.” Hint: “Ask what happened to the *image* in 2026.” This check is optional, and a wrong answer never changes K01.

## E01-S20 — A notice about change

**Entry/surface:** Current civic copy → “Revision history”; available whether or not Archive opened. **Purpose/turn:** Read a public institution's account, then ask what it omits. **Exit:** view notice → S21. **Checkpoint:** `S20.notice_seen`. **Evidence:** E003 public notice; claim is a published process statement, not a complete audit. Full text in [prop P03](04_EPISODE_01_IN_WORLD_ASSETS.md#p03--public-revision-notice-e003).

UI title: “Revision history · GH-NQ-BUS4-2019-11-23”

UI: “v1 · verification recorded 24 Nov 2019 15:20.”

UI: “v2 · correction approved 25 Nov 2019 08:40.”

UI: “Public reason: route reconciliation. Public view redacted. Approval and publication are separate steps; this notice does not display the publication actor.”

UI: “The notice describes a workflow. It does not certify that the corrected description is historically accurate.”

If the player taps “Who approved it?”, UI “Individual actor fields are not in this public notice. No name can be inferred here.” If “What was corrected?”, UI “The public view identifies a version change. Compare the fields and request lineage for the older version.” If “Open source,” UI “Publisher: Greyhaven civic portal; independent GCRO archive is a separate office.”

If Maya has an active token/consented Messages channel and the player voluntarily sends `P-S20-A` Player [Send]: “The portal says 'route reconciliation.' Is that a normal reason?” → Maya: “It can be. I used to think that label settled things. It doesn't tell me what source they used.” If not sent, no Maya comment is assumed. Designer note: an innocuous label becomes a fair alternative, not a smoking gun.

UI follow-up question: “Which moment does 08:40 name?”

Option “Correction approval.” → UI “Yes. The notice does not give the later publication hour.”

Option “The bus departure.” → UI “The route event was on 23 November. This is a record-workflow time on the 25th.”

Option “The instant Daniel published v2.” → UI “The public notice does not identify a publisher or publication hour. Do not merge those actions.”

UI: “Board note: approval and publication are separate steps. Individual actors remain undisclosed in this public view.” This is a source-limit lesson, not E09 knowledge or an early Daniel accusation.

If Maya was told about the notice, Maya: “I read ‘route reconciliation’ and wanted it to mean someone checked the route. The notice doesn't say what they checked against.” If the player kept the research private, the Board instead asks: “What document would let you compare the pre-correction field without asking Maya to certify her crop?” The answer can be selected from the source map at S23. Neither route assigns the 2019 publication action to the approval actor.

## E01-S21 — Put the cards in order

**Entry/surface:** Board timeline after S19/S20. **Purpose/turn:** Distinguish a claimed order from an authenticated one. **Exit:** correct ordering saved as tentative → S22. **Checkpoint:** `S21.tentative_order_saved`; undoable. **Investigation:** I04.

UI: “Order the dated statements. Which came first?”

Card A: “23 Nov 2019 · Bus 4 record date.”

Card B: “24 Nov 2019 15:20 · v1 verification shown on crop and public notice.”

Card C: “25 Nov 2019 08:40 · v2 correction approval in public notice.”

Correct order A→B→C: UI “Provisional sequence saved. The notice places a correction after a verification stamp. You still need the archived v1 to confirm the lineage.”

If B and C reversed: UI “Read the month and day before the hour. The verification is on the 24th; the approval is on the 25th.” If the event date is treated as publication: UI “The route date says when the 2019 transport was recorded, not when the portal published a version.”

Hint 1: “There are two November dates after the route event.” Hint 2: “24 comes before 25.” Hint 3: “Event → reported verification → public correction approval.”

UI final classification: “Place one card under 'known from the public notice' and one under 'still needs independent release'.”

Correct: “The notice reports a later approval” under known; “The archived v1 escort field is intact” under needs independent release. UI “The public notice and the crop are two different carriers. Neither alone validates the old field.”

If the player puts “The archived v1 escort field is intact” under known, UI “You have not yet received the archive's version view. The crop is the question, not the answer.” If “Approval happened later” is put under unknown, UI “The public revision notice does record an approval time. What it does not show is the underlying correction source.”

UI board status: “After verification? Plausible, not yet authenticated.” No K02 here. Designer note: the player reaches the key phrase through work without being handed proof early.

UI optional annotation: “Write a headline for your private Board.” Choices: “A later approval is listed” → UI “Cites E003.” “An old field may have survived verification” → UI “Mark as hypothesis pending the archive.” “A named person erased it” → UI “No source supports a person or intent.” The annotation is local and reversible. If the player returns after S28 validation, the Board can show the earlier cautious wording beside the later corroborated claim; it never rewrites an old annotation as if the player knew K02 in advance.

## E01-S22 — The boring explanation

**Entry/surface:** Public revision reason after S21. **Purpose/turn:** Give the prosaic correction theory its strongest fair version. **Exit:** record one testable question → S23. **Checkpoint:** `S22.alternative_logged`. **Investigation:** I05.

UI: “Could this be an ordinary correction?”

UI explainer: “A record may be corrected after verification if an error is found. A reason label and a later approval time do not tell you whether the correction was justified.”

UI link: “Read the public correction guide.”

UI guide heading: “How a public record changes.”

UI guide: “A verified version stays in the archive. An accepted correction creates a new version; the public page may show only the current one. The reason line can be brief. A correction notice does not, by itself, prove the older version was false.”

UI guide: “The portal desk handles the current page. GCRO holds an independent archived-version view for eligible public-interest requests.”

UI comparison prompt: “Which part of the notice is still unanswered?”

Option “What source justified replacing the escort field?” → UI “Useful question. The public reason says 'route reconciliation' but does not name the underlying source here.”

Option “Whether an approval happened at all?” → UI “The notice records an approval time. The missing part is the reason and source behind the changed field.”

Option “Which person is guilty?” → UI “A public reason line cannot answer that. First establish the actual version history.”

The guide's full in-world wording and source scope are [P06](04_EPISODE_01_IN_WORLD_ASSETS.md#p06--public-correction-guide). This additional reading is not a second independent verification of E001; it explains why the archive request is the right test.

UI public guide case example: “A transcription error may be corrected while an older verified version remains in the archive. A reason label describes the office's process category; it is not the underlying correction source.” UI margin prompt: “Could ‘route reconciliation’ still be a good correction?” If yes, UI “Yes. A proper update remains possible. Find its source before arguing motive.” If no, UI “The name disappearing feels alarming, but the reason label alone cannot rule out a good correction.” If uncertain, UI “Uncertainty is the useful state. Your next action can test it.” These responses keep the alternate explanation live without making the player endorse it.

UI prompt: “What would distinguish a justified update from an unexplained removal?”

Option “Check the archived field and the revision trail.” → UI “Test saved: obtain an independent older-version lineage and compare the changed field.”

Option “The current copy is official, so the old name must be wrong.” → UI “Official describes the current publisher, not the accuracy of every underlying event. Look for the older source and the revision trail.”

Option “Maya posted it, so the current copy is a cover-up.” → UI “Posting a crop cannot establish motive. Look for what the record service retained.”

Hint 1: “What source is independent of both the Memory Project and the current portal page?” Hint 2: “The civic archive holds version history.” Hint 3: “Ask GCRO for the redacted older-version lineage.”

If the player has messaged Maya cautiously, optional Maya: “If it's an ordinary correction, the audit trail should make that easier to explain, not harder.” If not, UI board note: “Routine correction remains possible.” Designer note: resisting a dramatic guess strengthens the eventual payoff.

## E01-S23 — Search without a secret door

**Entry/surface:** Search public Greyhaven index. **Purpose/turn:** Find the right custodian and reject a same-number false match. **Exit:** select the GCRO Bus 4 lineage listing and inspect its source badge → S24. **Checkpoint:** `S23.result_checked`; query history retained. **Investigation:** I05. Complete index snippets in [asset search section](04_EPISODE_01_IN_WORLD_ASSETS.md#s01--fictional-public-search-index).

UI: “Search Greyhaven public records and Memory Project pages.”

UI example searches: “Bus 4 2019 version”, “North Quay escort”, “correction archive”.

Result `SR-01` UI: “GCRO · Request a redacted Bus 4 version lineage · records.greyhaven.local/gcro/request/bus4-2019. Public-interest request; one-use case token; eligibility reviewed.”

Result `SR-02` UI: “Civic portal · North Quay Bus 4 current copy and revision notice · records.greyhaven.local/public/evacuation/bus-4.”

Result `SR-03` UI: “Harbour Loop Route 4 schedule, 2024 · routes.greyhaven.local/harbour-loop/4. Similar number, different year and record type.”

Result `SR-04` UI: “Memory Project · Daniel Mercer brief · bulletin.greyhaven.local/memory/daniel-mercer. Community article, not an original audit.”

If SR-03 selected, UI “This is a 2024 passenger timetable, not the 2019 evacuation record. Compare date, custodian and record ID.” If SR-04 selected as audit source, UI “The Memory Project holds a crop. It does not issue the 2019 archive export.” If an unindexed query is entered, UI “No public result for that wording. Try the record title, year or office; private records are not indexed here.”

UI source-comparison drawer: “What can each result answer?”

UI match cards: “Who published the current v2?” → “Civic portal / SR-02”; “Who posted the older crop?” → “Memory Project / SR-04”; “Who holds an archived version independently?” → “GCRO / SR-01”.

If the player assigns SR-04 as independent archive, UI “That folder repeats the preview you already have. Two copies of one crop are still one source.” If SR-02 is assigned as archived custodian, UI “The portal publishes the current page. GCRO's directory says it holds the archived-version view separately.” If SR-03 is assigned anywhere, UI “Same route number, wrong year and purpose. Discard this result.”

Hint 1: “Look at each page's publisher line.” Hint 2: “Separate publisher of the current page from holder of the older version.” Hint 3: “Portal = current; Memory Project = crop; GCRO = archived lineage request.”

On completing the three matches, UI “Source map saved. An independent request can now test whether the crop reflects archived v1.” This is a private research note, not E012 or R04. The player can reopen all result pages before answering and need not type an exact query.

UI search result comparison: “Two results carry the words ‘Bus 4’. What would you check before opening either?” Correct: “Record year and issuing office” → UI “The 2024 timetable is not the 2019 evacuation audit.” Other: “The first thumbnail that looks official” → UI “A thumbnail cannot settle record identity. Read the issuer and date.” Hint: “The question concerns an archived *version*, not a passenger timetable.” This optional challenge surfaces the false match before the office-selection task; it does not require typing an exact phrase.

Maps optional panel: UI “Known places from public sources: North Quay (2019 record area), Civic Records Office (request desk), Memory Project (Bulletin publisher). No historical Bus 4 path or live device location is available yet.” UI “These pins show named places only. They do not show where Daniel is.” Accessible list repeats the three labels. No route-tracking puzzle or GPS inference. Designer note: Search teaches source selection while Maps honestly limits itself.

## E01-S24 — A note with a closed door

**Entry/surface:** S23 verified public index result, then optional Archive note card if R03. **Purpose/turn:** Seed Daniel's concern without decoding or making the note mandatory. **Exit:** acknowledge source limit or skip → S25 only when the player previously opened a direct Maya source conversation and chooses to open her check-in; otherwise → S27 public request. A sent tip alone does not trigger the personal message. **Checkpoint:** `S24.note_viewed|skipped`. **Evidence:** optional note is `REPORTED`, not a private original.

If R03 exists, UI: “Memory Project · Daniel note fragment · read-only”

UI source card: “Transferred 3 Oct with the cropped preview. Maya retained only the line Daniel permitted for this case folder. No full private correspondence is offered.”

UI note text: “Keep the earlier view. If they call the newest copy the only copy, ask for the version record. 7-14 is in my notes; it may matter later.”

UI: “The label 7-14 has no verified meaning here. Do not expand it from a guess.”

If R03 is absent, UI: “Optional Memory Project note unavailable. The public revision and GCRO request do not depend on it.”

If R03 exists, UI note margin: “Daniel wrote this line before he disappeared. The folder does not contain the rest of the notes. The player may save the literal ‘7-14’ as an undecoded label or leave it alone.” If saved, Board: “Unresolved string; no location, person or date inferred.” If skipped, Board: “No note-derived claim.” Both states rejoin the same public request route. A player trying `7-14` as a Search query gets: “No public result tied to this string. Do not promote a guess into a source.”

Optional query to Maya, only if an active channel, **R03 permitted the note and the player actually viewed its `7-14` line**, and the player explicitly Sends: `P-S24-A` Player [Send]: “What does 7-14 mean?” → Maya: “I don't know. Daniel didn't explain it to me.” Maya: “I'd rather leave the label alone than make up a folder or a date.”

`P-S24-B` Player [Send]: “Did he sound frightened?” → Maya: “He sounded careful. I can't tell from a line of text what he felt.” Maya: “I wish I'd asked him.” This option requires an active channel and the permitted note view too; without R03, the player cannot ask about an unseen line. Neither reply grants the rest of Daniel's notes.

No message is required. UI exit: “Continue to source request.” Designer note: the note offers human texture and future suspense without becoming a cheat code.
