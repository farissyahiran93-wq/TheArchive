# Episode 01 screenplay — Act 03: A door, two permissions

**Fictional date:** 8 October 2026, late morning onward. **Active pacing:** unmeasured; see the [route estimate](07_EPISODE_01_TIMING_AND_PACING_MODEL.md). **Cast:** Maya by Bulletin token unless the player separately opts into Messages. **Rules:** `CONN-E01-01` grants Messages connection only; R03 grants scoped read-only Archive only. An invitation offer or decline grants neither. No private file is authenticated by location inside the workspace. Public comparison, revision and GCRO request remain reachable with both declined. T02/T03/T09.

## E01-S16 — Two invitations

**Entry/surface:** S15 direct source conversation, editor channel verified, **and** player taps “Review optional connections” in that existing Bulletin thread. The tap requests an explanation but accepts nothing. **Purpose/turn:** Maya offers help without swallowing the player's privacy choices. **Exit:** terms opened → S17 or “Stay with public records” → S18. **Checkpoint:** `S16.offer_seen`; an offer is not R03. A silent/no-share or no-tip player reaches S18's public pane without receiving this Maya message. The offer remains requestable later; it never appears because the player merely viewed a public card.

Maya: “I have two things I can offer. They are separate.”

Maya: “One is a Messages connection so you don't have to keep reopening this little token inbox.”

Maya: “The other is a read-only Memory Project workspace. It's called the Archive. It has our source cards and the crop Daniel sent me.”

Maya: “Neither gives me access to your phone. And neither makes our copy the original.”

Maya: “I keep wanting to say ‘come into the folder’ as if a folder were a room with people in it. It isn't. You'd be reading cards. You can leave whenever you want.”

If C02 image was sent, Maya: “I put your cropped row in this thread only. It won't go into the shared workspace.” If text was sent, Maya: “Your text stays in this thread.” If `P-S14-DEFER` was actually sent, Maya: “I haven't added anything from your phone to our files.” A fully silent player has no direct S15 conversation or S16 offer unless they later choose and Send a source message.

`P-S16-A` Player [Send]: “Can I look at the Archive without joining Messages?” → Maya: “Yes. Read-only is its own choice. The token inbox still works if you never connect Messages.”

`P-S16-B` Player [Send]: “Who owns the workspace?” → Maya: “The Memory Project. I'm the editor for this case folder. We don't control the civic portal or its audit office.”

`P-S16-C` Player [Send]: “I'm not joining either right now.” → Maya: “All right. The civic records are public. I'll leave the offer here if you change your mind.” UI “Continue with public records” → S18; S17 does not open unless the player later taps “Review both permissions” voluntarily.

If A was sent, Maya follows with: “I don't need a new way to reach you for you to read a source card.” If B was sent: “We hold Daniel's transfer note. We don't hold the old civic audit. I should have led with that.” If C was sent: “Understood. If the office releases a redacted version, it releases it to you, not through me.” These replies carry no access grant and no implicit Messages consent.

UI: “Review both permissions.” UI: “No choice has been accepted yet.” The player can open S17 without sending an answer. Designer note: Maya can be warm and still name the limits of what she controls.

UI: “Stay with public records.” On tap, UI “No connection opened. The same civic and GCRO sources remain available.” → S18. Maya receives no refusal text unless `P-S16-C` was separately Sent.

**Optional S16 continuation, offered only after a delivered `P-S16-A` or `P-S16-B`:**

Maya: “I used to write 'safe workspace' on the invitation. It sounded reassuring and explained almost nothing.”

Maya: “The folder is useful because each card says what it is. A crop says crop. A public link says public link.”

Maya: “There are mornings I wish a source card could tell me what a person meant. It can't.”

`P-S16-D` Player [Send]: “Why call it the Archive if most of this is links?” → Maya: “Because we preserve the context with them. Who gave us a copy, when we received it, what we're allowed to show.” Maya: “The name is probably grander than the room. The room has two folding chairs.”

`P-S16-E` Player [Send]: “Do other people read this case folder?” → Maya: “Only people the Memory Project permits for this folder. Right now I'm offering a read-only view of public case sources, not an open chat with everyone who has ever volunteered.” Maya: “Your private board stays yours.”

`P-S16-F` Player [Send]: “I don't like being invited into a group I didn't ask to join.” → Maya: “Then don't join one. This isn't a group invitation, and I should have said that first.” Maya: “You can decline both controls and keep using the public links.” Maya Trust +1 for explicit boundary, no access grant.

`P-S16-D/E/F` are offered only within that continuation. After `P-S16-C` or no Send, Maya sends no folder anecdote or follow-up prompt; the permission terms still open. The player may decline both controls there. Maya never treats silence as agreement.

## E01-S17 — The permission sheet

**Entry/surface:** invitation terms from S16. **Purpose/turn:** Make Messages and Archive genuinely independent. **Exit:** finish each control or select “Continue with public records” → S18. **Receipts:** `CONN-E01-01` on Messages consent; R03 on Archive acceptance only. **Checkpoint:** `S17.permission_state` stores each choice and supports later reopening. None of these controls changes K02 or Maya relationship.

UI title: “Your case connections”

UI panel 1: “Connect in Messages”

UI: “Maya can message this case profile. She sees the display name you choose for this connection and the messages you explicitly send there. She does not receive your phone number, contacts, GPS, Files or Case Board.”

UI buttons: “Connect in Messages”, “Not now”.

On accept, UI: “Messages connection accepted. You can disconnect later. Existing Bulletin tips are not copied into Messages.” On decline, UI: “Messages remains disconnected. Maya can reply to your Bulletin token.”

UI panel 2: “Open read-only Archive”

UI: “Owner: Greyhaven Memory Project. Folder: Daniel Mercer public case sources. You may read permitted cards and save your own notes. This does not share your files or join a group. Source labels show what is a preview, a public link or an issued copy.”

UI buttons: “Open read-only Archive”, “Not now”.

On accept, UI: “Read-only access accepted · R03 · folder: Daniel Mercer public case sources.” On decline, UI: “Archive not opened. Public Bulletin and civic records remain available.” If reopened later, accepting creates one grant at that later in-world order, never retroactively. “Not now” on both still enables “Continue with public records.” If the player leaves mid-sheet, no unpressed control is accepted. Designer note: permission is an action, not a narrative montage.

## E01-S18 — What a workspace holds

**Entry/surface:** S17 resolution, S15/S16 “Continue with public sources,” or no-tip public route after S07. **Purpose/turn:** Explore source labels and choose a legitimate research path. **Exit:** inspect at least one relevant source card/public link → S19. **Checkpoint:** `S18.route` = `archive` if R03 exists, otherwise `public`; resuming preserves it. **Investigation:** I03. No mandatory source is hidden behind Archive. A player who never opened S16/S17 still performs I03's source-label question on the public route; no permission sheet is silently accepted.

If R03 accepted, UI: “THE ARCHIVE · Memory Project · read-only”

UI Archive cards: “Older Bus 4 preview · cropped image · received 3 Oct · source not certified”, “Current civic copy · public portal link · v2”, “Revision notice · public portal link”, “Daniel's note fragment · restricted context · optional”.

UI: “Inside a workspace is not the same as verified. Open a card to see who holds its original.”

UI Archive card opened: “This cropped image arrived from Daniel on 3 Oct. Maya's receipt can document that transfer. It cannot show what GCRO's archived original contained.” UI comparison: “Same thumbnail as the Bulletin preview. Saving it here creates a second location for your note, not a second witness to the record.”

If R03 declined or absent, UI: “Public research path”

UI: “The Bulletin preview and civic portal are still open. You can save public links to your private Case Board. No Archive folder is required.”

UI public cards: “Bulletin preview”, “Current civic copy”, “Civic revision notice”, “Search public index”.

UI public card opened: “You kept the public route. The same source-limit labels remain beside every link: preview, current page, notice. Your private Board records what you inspected; the Memory Project receives no browsing history.”

UI question: “Which label tells you most about the older image?”

Correct tap: “Cropped preview; original not held here.” → UI “Right. It explains why a separate audit request matters.”

Wrong tap: “Daniel sent it, so it is certified.” → UI “A trusted sender can pass on a crop. The 2019 original needs its own source.”

Hint 1: “Read the source status, not the folder name.” Hint 2: “Who has the complete 2019 record?” Hint 3: “Neither the Bulletin nor the Memory Project claims to hold the original audit.”

If the player tries to open the restricted Daniel fragment without R03, UI: “Optional private context. Not available on this route. The public audit path does not need it.” If R03 is accepted, the fragment still requires its separate permitted card at S24. If Maya Messages was connected, her next optional conversation may appear there; otherwise it stays in the token inbox. Designer note: the public route feels deliberate, not like a punished refusal.

On a player who declined both controls, the next Search prompt reads: “Find the office that holds a separate archived version.” On a player who accepted Archive, it reads: “The source card says the original is elsewhere. Find that custodian.” Both point to the same public index and the same GCRO eligibility review. The difference is the path the player used to reach the question, not the quality of the answer available.
