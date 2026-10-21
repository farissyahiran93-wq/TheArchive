# Episode 01 screenplay — Act 02: A tip, a person

**Fictional date:** 8 October 2026, after the morning comparison. **Active pacing:** unmeasured; S08–S12 is intended as an early human hook, subject to the [route estimate](07_EPISODE_01_TIMING_AND_PACING_MODEL.md). **Channel:** Bulletin tip form and return-token inbox exclusively. A handle is not a phone number. Every `Player` line below is a composer draft until the player presses **Send**; drafts do not reach Maya. `R01` and `R02` are idempotent delivery receipts. T02/T03/T09/T10. Back preserves the draft and source views.

## E01-S08 — The shape of a tip

**Entry/surface:** S07 lead card → Bulletin “Submit a tip.” **Purpose/turn:** Decide what identity and evidence scope to expose. **Exit:** tip preview → S09. **Checkpoint:** `S08.mode_draft`; no receipt, Maya knowledge or relationship yet.

UI: “Tips go to the editor of this case brief. You can hear back without sharing a real name or phone number.”

UI: “What will Maya see?”

UI: “Your selected text, the public record links, and either a return token or a handle you choose. No device contacts or location.”

`C01-TIP.A` UI “Use an anonymous return token.” → UI “Your reply will appear in this Bulletin inbox. Save the token on this device.”

`C01-TIP.B` UI “Use a handle.” → UI “Enter a handle for this case conversation. This does not open Messages.” Invalid handle UI: “Use 2–20 letters, numbers or spaces. You can change it before sending.”

UI draft: “I compared the older Bus 4 preview in your brief with the current civic copy. The escort field shows June Ellis in the preview and is blank now. I can't tell which full version was verified.”

UI buttons: “Edit tip”, “Review recipient and privacy”, “Cancel draft”. If canceled: UI “Draft saved. Maya has not received anything.” Public research remains open, but S11 waits. Designer note: privacy is a real choice before a human gets involved.

## E01-S09 — Press Send

**Entry/surface:** S08 reviewed tip. **Purpose/turn:** Make the player's action, not a cutscene, initiate contact. **Exit:** explicit **Send tip** → S10; leaving keeps draft. **Receipt:** R01 only on server-accepted fictional Bulletin delivery. **Checkpoint:** `S09.tip_sent:{tipId}` keyed once. C01 effects apply only here: anonymous Maya Trust +0/Suspicion +1; handle Trust +2/Suspicion +0, after baseline becomes active at S11. No phone/legal identity disclosed.

UI preview title: “Before you send”

UI: “To: Maya Chen · Greyhaven Memory Project case brief inbox.”

UI conditional: “Reply route: anonymous Bulletin return token.” / “Reply route: Bulletin handle only.”

UI: “Included: your text and two public links. Not included: the cropped image, your contacts, your location or your legal name.”

UI buttons: “Send tip”, “Back to draft”.

On Back: UI “Nothing sent.” On Send accepted: UI “Tip delivered to the case inbox. This is delivery, not a claim that Maya has read it.” On duplicate Send/reload: UI “This tip was already delivered. Open its receipt.” No second tip or second R01. If delivery fails: UI “Tip not delivered. Your draft is safe. Retry when the Bulletin inbox is available.” Designer note: the player owns the first contact.

## E01-S10 — The return route

**Entry/surface:** R01 delivered → Bulletin receipt. **Purpose/turn:** Make the anonymous path tangible and inspectable. **Exit:** inspect receipt and return inbox → S11 when Maya's reply is delivered. **Checkpoint:** `S10.receipt_viewed` and Maya reply event by tip ID, never a real-time timer.

UI: “Tip receipt · R01”

UI: “Recipient: case brief inbox / Maya Chen. Delivered: 8 Oct, after your Send. Scope: observation and two public links.”

UI anonymous: “Reply token: stored on this device. The editor cannot see a name from this token.”

UI handle: “Reply handle: your chosen handle. No Messages connection exists.”

UI: “A delivered tip is not verified evidence. You can keep comparing sources while you wait.”

UI actions: “Open reply inbox”, “Continue public records”, “Copy receipt text”. If Maya reply has not been delivered, UI “No reply yet. Your public record tabs remain available.” The authored reply is event-driven after R01; the player can inspect any earlier public panel. Designer note: waiting is a state, not padding.

## E01-S11 — Someone answers

**Entry/surface:** Maya's reply to R01 in **Bulletin return-token inbox**. **Purpose/turn:** A real person corrects her own awkward opening and asks for precision. **Exit:** player either inspects editor card or explicitly Sends a guarded question, then S12. **Knowledge:** Maya knows only the R01 text/public links. Her delivered reply activates D21 Maya `50/45/20/0` once; C01 delta then applies. No Messages consent. **Checkpoint:** `S11.maya_reply_delivered:{tipId}`.

Maya → token inbox: “Hi. I'm Maya. I edited the Daniel Mercer brief.”

Maya: “I started typing 'thank you' and then realised I haven't told you why I'm in this inbox. Sorry.”

Maya: “I can open the two links. The escort line you described is there.”

If handle mode, Maya: “I can see the handle you chose, and nothing behind it.” If anonymous, Maya: “You can stay anonymous. I can answer here.”

Maya: “Which part are you most worried I missed?”

Maya: “I've read that sentence three times. The word ‘escort’ is clear in the image Daniel sent me. The blank on the portal is clear too. What I can't see is the page between them.”

UI draft options (all optional; selecting opens composer):

`P-S11-A` Player [Send]: “First, how do I know this is really the editor?” → Maya: “Good question. Don't take my word for it. The public editor card has this inbox's case code.” Maya: “I'll wait while you check.”

`P-S11-B` Player [Send]: “June is named in the preview and missing in the current copy.” → Maya: “That's the line I see too. I don't want to pretend the crop tells us the whole version history.” Maya: “Please check the editor card before you send me anything else.”

`P-S11-C` Player [Send]: “I don't want to share more yet.” → Maya: “Understood. The public records are still public. You don't owe me a file.” Maya: “If you do come back, check my editor card first.”

If a draft is abandoned, UI “Unsent reply. Maya knows only your original tip.” S12 is reachable via the public editor-card link without any follow-up Send. No subsequent Maya line assumes A/B/C was sent unless its receipt exists. Designer note: Maya's fallibility makes her more credible than a perfect guide.

If A is sent, after Maya offers the editor card she adds: “The card proves this inbox belongs to the brief. It doesn't prove I made a good call posting the crop.” If B is sent, she adds: “I can re-open your two public links. Please don't send a different file just because I'm asking questions.” If C is sent, she ends the exchange: “All right. I won't chase you into another app.” The player can proceed without an intimacy beat.

**Optional S11 continuation, offered only after a delivered `P-S11-A` or `P-S11-B`:**

Maya: “I was making tea when your tip came in. It's gone cold. That's not your problem; I'm just explaining the dramatic pause.”

Maya: “People have sent us photos of three different men in bus shelters this week. One was a local councillor opening a bus stop.”

Maya: “I called one of the people back before checking the date on the picture. Daniel's sister had already seen it. I won't do that twice.”

Maya: “So I ask too many questions now. Sometimes I ask the wrong one first.”

`P-S11-D` Player [Send]: “I'd ask questions too.” → Maya: “Thank you. I still owe you a clear answer when I have one.”

`P-S11-E` Player [Send]: “That sounds exhausting, but it doesn't make my tip wrong.” → Maya: “No, it doesn't. Sorry if I made it sound that way.” Maya: “I can be tired and you can be right about what you saw.”

`P-S11-F` Player [Send]: “I wasn't trying to solve where Daniel is.” → Maya: “I know. That's partly why I answered. You gave me a line I can check instead of a location guess.”

`P-S11-D/E/F` are offered only within that continuation. After `P-S11-C` or silence, no tea, bus-shelter or sister anecdote is delivered; the public editor card leads directly to S12. This exchange never substitutes for S12 verification. Leaving a composer unsent produces no Maya answer.

## E01-S12 — A name is not a channel

**Entry/surface:** Maya's claimed editor role → independent public Memory Project directory, reachable from original Bulletin byline as well as her reply. **Purpose/turn:** Verify channel identity without validating every claim. **Exit:** match published case code and return route → S13. **Investigation:** I02. **Checkpoint:** `S12.editor_channel_checked`. No trust metric grants verification.

UI directory title: “Memory Project · Public editor listing”

UI: “Maya Chen · Daniel Mercer case brief editor · Bulletin return inbox case code MP-DM-07.”

UI: “The listing confirms who manages this case inbox. It does not certify an attached document.”

UI prompt: “Which two details should match?”

Options: “Case code and return route”, “Her first name and profile photo”, “The tip's delivery time”.

Correct feedback: “The code and return route match the public listing. Channel checked.” Wrong name/photo: “A name or image can be copied. Check the case code printed on the public listing.” Wrong delivery time: “Delivery tells you the tip arrived; it does not identify the editor.”

Hint 1: “Open the byline's public directory entry.” Hint 2: “Compare MP-DM-07 in the listing and reply header.” Hint 3: “The same case code and Bulletin return route appear in both places.”

If the player sent this tip **after** independently saving K02, UI: “Your earlier GCRO finding is still on your private Board. Maya received only this tip's public observation and links.” UI actions: “Return to saved finding” → S30 entry check; “Continue this conversation” → S13. The return never sends E012, reissues R04, accepts Messages/Archive, or makes Maya aware of K02. S13–S17 stay available as optional conversation and permissions, with their normal explicit actions if opened.

If S11 question A was sent, Maya after channel check: “Thanks for checking. I wish more people did.” If B: Maya: “Now that you know the inbox is mine, tell me which copy you mean when you say 'older'.” If C or no follow-up: Maya: “The listing is mine. The file still needs its own check.” These are delivered in token inbox; no player reply is automated. Designer note: identity checking increases safety, not evidentiary certainty.

For a skeptical or low-trust player, the directory alone gives the next public record link. Maya's follow-up is short: “You can use the portal without asking me. If my crop is wrong, I want the correction in the brief.” The player never has to reassure her to continue.

Optional token exchange after the match:

`P-S12-A` Player [Send]: “How did you end up editing this brief?” → Maya: “The Memory Project collects old neighbourhood records. Daniel brought in a box of ordinary things first—flyers, minutes, a photo of a school roof before the repair.” Maya: “Then he brought the cropped bus record. It's the first time I wished he'd brought something boring instead.”

`P-S12-B` Player [Send]: “Does the Memory Project work for the city?” → Maya: “No. We ask permission, keep copies when people give them, and sometimes annoy the city by asking why a public page moved.” Maya: “We aren't the records office. I wish that distinction were printed bigger on our site.”

`P-S12-C` Player [Send]: “A verified inbox doesn't make you a reliable source.” → Maya: “Correct. It tells you this is my inbox. For the image, all I can tell you is how it reached me.” Maya Trust −1, Suspicion +1; GCRO path remains unchanged.

## E01-S13 — The exact row

**Entry/surface:** Verified editor channel, token inbox. **Purpose/turn:** Clarify what each person has seen when the player elects to continue the conversation, without Maya acquiring the player's private board. **Exit:** one scoped player reply Send or a privacy-preserving “not yet” → S14. **Checkpoint:** `S13.reply_sent` or `S13.refrained`; only the former delivers a fact to Maya.

If `P-S11-C` was Sent or the player kept S11 silent, UI: “The editor channel is checked. You can read the public page yourself or ask Maya about the exact row.” UI actions: “Continue public source” → S14 optional share sheet; “Ask Maya” → the conversation below. Maya sends **no** unsolicited row question on “Continue public source.” `P-S12-C` also keeps this quiet variant unless the player explicitly chooses “Ask Maya.” A choice to ask clears only this conversation pause, not any disclosure permission.

**On a social route, or after “Ask Maya,” the following three messages appear:**

Maya: “I have the image Daniel sent me. It's a crop, so we might be looking at the same few lines.”

Maya: “Was the blank field on the portal page itself, or in another screenshot?”

Maya: “I'm asking because I caught myself writing ‘the city removed June’ in a draft note. I deleted it. A blank field doesn't tell me who touched it.”

`P-S13-A` Player [Send]: “On the civic portal page. I opened the link from your brief.” → Maya: “Okay. That's useful because we can both reopen it. The portal may have changed since Daniel saw it, but we're not comparing two random screenshots.”

`P-S13-B` Player [Send]: “I saw it on the page, but I still think your image could be misleading.” → Maya: “That's fair. I posted the crop to ask for leads, not to certify the original.” Maya: “I should probably put that sentence higher on the brief.”

`P-S13-C` Player [Send]: “I'd rather check the public source myself before saying more.” → Maya: “Do that. I'll leave the link here. You can come back when you have a sentence you trust.”

If C, S14 may be deferred; S15's provenance statement can still be read, and the public S18–S29 route remains. On no Send, UI “Draft saved. The editor has not received this answer.” Designer note: skepticism is treated as discipline, not hostility.

**Optional S13 source discussion, offered only after a delivered `P-S13-A` or `P-S13-B`:**

Maya: “The page was slow when I checked this morning. I thought it was my connection and took a screenshot. That screenshot isn't a second source either.”

Maya: “I'm trying not to collect more copies of the same thing and call them confirmation.”

`P-S13-D` Player [Send]: “What would count as a second source to you?” → Maya: “A record held somewhere other than my folder or the live page. An archived version with a release trail.” Maya: “It might still describe the wrong event. But we'd know the old field wasn't something I invented with a crop.”

`P-S13-E` Player [Send]: “Could June's name have been removed for privacy?” → Maya: “Maybe. The residents are covered for that reason. June's field is marked Escort, but I don't know their public-name rule from looking at this page.” Maya: “That's exactly the sort of reason I'd want the revision trail before making a claim.”

`P-S13-F` Player [Send]: “What if the older file was simply wrong?” → Maya: “Then the correction could be proper. I'd rather learn that than turn a mistake into a story about Daniel.”

`P-S13-D/E/F` are offered only inside that source discussion. If `P-S13-C` was sent or nothing was sent, Maya does not launch it; the same independent request path is visible in Search.

After A or B and a sent follow-up D/E/F, Maya asks no second compulsory question. If D, she says: “A copy held by the office that archived v1 would help. We'd still need to read what it actually certifies.” If E, she says: “That privacy explanation is possible. I won't turn June's name into a contact lead.” If F, she says: “Then the changed page might be what a careful office was supposed to do. I can live with that answer if the record supports it.” The player may close the inbox; the next step lives in public Search and needs no reply from Maya.

## E01-S14 — What to share

**Entry/surface:** Optional share sheet after S13 or later return. **Purpose/turn:** Granular disclosure. **Exit:** selected content explicitly Sent, or defer → S15. **Receipt:** R02 only for a Send; fields list actual fact and attachment, not a blanket share. **Relationship:** C02 delta only on committed choice, within 0–100.

**If `P-S13-A` or `P-S13-B` was delivered, Maya's request appears:**

**Only if `P-S13-A` or `P-S13-B` was actually delivered, Maya makes this request:**

Maya: “Could you send me what you're reading? Text is enough. Please crop out anything you don't mean to give me.”

Maya: “Actually—don't send me a whole page if there's more on it. Just the public row.”

Maya: “I know it's a strange request from the person who posted a crop. I should have explained that posting mine didn't give me permission to collect yours.”

**If `P-S13-C` was delivered or S13 was silent, Maya sends no new request.** UI share sheet: “You can send the public escort row to the checked editor inbox if you choose. Nothing is selected.” The same three C02 options are available on player initiative or can be closed immediately. Closing has no R02, relationship change or Maya reply. This keeps a voluntary later share possible without making her ask again after the player set a boundary.

`C02-SHARE.A` UI: “Attachment preview: escort rows only; no resident fields.” Player [Send]: “Cropped public row image attached. Caption: The current portal's Escort field is blank; the older preview shows June Ellis.” Maya: “The crop is readable. Thanks for keeping the other fields out.” Maya: “I can see the difference, not why it happened.” Effect Maya Trust +2.

`C02-SHARE.B` Player [Send]: “Text only: the older preview's Escort field says June Ellis. The current public page leaves it blank. I haven't checked an audit copy.” Maya: “Text is fine. It tells me exactly what you observed and what you haven't established.” Maya: “I'll check the revision tab from my side.” Effect Maya Trust +1.

`C02-SHARE.C` no Send, UI: “Not now. No image or text sent.” Maya response only if the player separately sends `P-S14-DEFER` Player [Send]: “I'm not sharing the row yet. I want to check the source.” → Maya: “Okay. Keep the public link. You can use the records request without me.” Effect Maya Trust −1/Suspicion +1. If the player only closes the sheet, Maya receives no refusal message; the next scene uses the no-reply variant.

Merge Maya if `C02-SHARE.A/B` was Sent: “Daniel sent me the older preview on the third. I can show you the transfer note, if you want. It still won't certify the original.” If `P-S14-DEFER` was Sent: “The preview's transfer note is mine to explain. The public audit path is yours to check.” If silent: Maya makes no new claim; S15 opens as an optional source card and public route proceeds. Designer note: choosing less disclosure changes Maya's response, but cannot hide the official route.

## E01-S15 — The thing Maya chose to post

**Entry/surface:** Bulletin token conversation or public source card after S14; public card is read-only and contains only Maya's already published explanation. **Purpose/turn:** Maya admits an editorial choice and gives Daniel human weight when the player has invited a source conversation. **Exit:** direct conversation → optional S16; public/quiet card → S18 public research. **Evidence:** provenance is `REPORTED` by Maya, not independent v1 certification. **Checkpoint:** `S15.transfer_note_seen`.

**Only if `C02-SHARE.A/B` or `P-S14-DEFER` was actually Sent, the following three Maya messages appear in the checked Bulletin channel or consented Messages channel:**

Maya: “He sent it on the third with a short note: 'Keep the earlier view.' I didn't ask why. I thought there'd be time.”

Maya: “When he went missing, I put the crop in the brief. That was my decision, not an instruction from Daniel.”

Maya: “I worried it would bring people looking for him. I also worried it would send people after anyone named in a document. That's why the resident fields are covered.”

`P-S15-A/B/C` are optional drafts only in that player-invited conversation:

`P-S15-A` Player [Send]: “Did you ask his family before posting his picture?” → Maya: “The portrait, yes. His sister approved that for the missing-person brief.” Maya: “The document crop was my call. I should have said that more clearly.”

`P-S15-B` Player [Send]: “Why did he trust you with it?” → Maya: “We'd worked on two memory projects. I kept the raw submissions separate from what we published.” Maya: “That doesn't mean he told me everything.”

`P-S15-C` Player [Send]: “You might have put someone at risk.” → Maya: “I might have. I'm not going to argue that away.” Maya: “If you see an identifying detail we missed, tell me here. Don't post it.” Maya Trust −1, Affinity −1; Maya's later S25 check-in is more guarded.

If the player sent no S14 source message, or keeps the R01 conversation closed, the player sees this **public card instead of Maya's messages above**: “Editor note, 7 Oct: Daniel transferred a cropped earlier view on 3 Oct. The Memory Project posted the crop after his disappearance. The editor cannot certify the complete source from this image. Resident details were removed before publication.” The 8 Oct correction note on B01 is also readable here; neither requires the player to have written to Maya. UI actions: “Continue with public sources” → S18; “Reopen the share sheet” → S14. No new Maya bubble, invitation, R02 or relationship effect occurs on the public-card route.

**Optional personal continuation only if `C02-SHARE.A/B` was Sent and Maya's transfer explanation is open:**

Maya: “The first thing Daniel ever gave me was an event programme with half the names misspelled. He made me keep both versions.”

Maya: “He said, 'If you fix it, leave the bad copy where people can see what changed.' Annoying habit. Useful habit.”

Maya: “I didn't tell his sister about this crop before I posted it. I had her permission for the missing-person photo. Those were separate decisions, and I was wrong to let them blur in the brief.”

`P-S15-D` Player [Send]: “Are you going to correct the brief?” → Maya: “Yes. The editor note should say the document decision was mine.” Maya: “I can do that without changing the image or pretending I have the original.”

`P-S15-E` Player [Send]: “Why tell me that now?” → Maya: “Because if I want you to be careful about a source, I should be clear about mine.” Maya: “And because Daniel's family doesn't need another neat story that skips the awkward part.”

`P-S15-F` Player [Send]: “You don't have to tell me about his family.” → Maya: “You're right. I won't give you anything private about them.” Maya: “I'll stick to what I published and what I can check.” Maya Trust +1.

`P-S15-D/E/F` are offered only within that continuation. A no-share or silent player does not receive the event-programme story, the private distinction about Daniel's sister, or those follow-up choices. The optional thread changes Maya's openness, never grants her the independent audit or gives the player a family contact.

If the player sent S15-C, Maya's next authored reply is: “I have put a correction note on the public brief. It says the decision to publish the crop was mine. I can't undo the first version of the page, but I can leave the correction visible.” If the player sent S15-A without C, her next reply is: “I need that distinction in the brief too: family permission for the portrait, my decision on the record image.” If the player sends no S15 line, the amended public editor note is still visible; no private apology is inferred. The correction note is an editorial action by Maya, not an audit finding or a new source for v1.

UI transfer note: “Sender: Daniel Mercer (claimed by Memory Project transfer record). Recipient: Maya Chen. Date: 3 Oct. Attached: cropped preview. Original audit export: not held by Memory Project.”

UI: “A transfer record can support that Maya received this crop. It cannot certify what the 2019 original said.” No optional answer is required for the mandatory evidence route. On the direct-conversation route, UI actions are “Review optional connections” → S16 and “Continue with public sources” → S18. On the public-card route, only the public-source continuation or voluntary return to S14 is shown. Neither control sends player text or accepts a permission. Designer note: Maya owns her mistake without turning it into a puzzle reward.
