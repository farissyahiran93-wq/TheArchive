# CODEX MASTER PROMPT
# THE ARCHIVE — CHAPTER 2
## SCENE 04 CANONICAL ALIGNMENT + SCENE 05: VERSION HISTORY
### Production-Grade Story Implementation | Narrative, Runtime, UI/UX, Persistence & Regression Testing

**MISSION**

Audit the existing THE ARCHIVE repository and implement the complete transition from Chapter 2 Scene 04 into Scene 05, including the canonical Unknown Number installation sequence and removal of the contact-blocking system.

Scene 05 is titled:

**VERSION HISTORY**

Its central mystery is:

*What can the player actually establish about Daniel Mercer's Greyhaven Bulletin article, and what remains unverified?*

The experience must feel like a believable mystery investigation inside a fictional smartphone operating system, not a guided questionnaire, linear slideshow or collection of tutorial buttons.

Target quality: 10/10 for narrative immersion, character authenticity, branching interactions, mobile UX, technical reliability, and continuity.

Implement the improvements in the actual game runtime. Do not deliver mock screens or standalone documentation instead of working functionality.

---

# PART 01 — NON-NEGOTIABLE RULES

1. Preserve canonical story facts, existing dialogue where already authored, character identities, relationships, and protected mysteries.
2. Do not rewrite Chapter 1 or unrelated Chapter 2 scenes.
3. Do not introduce a new or parallel story engine.
4. Reuse the existing dialogue runner, story graph, event queue, Zustand state architecture, messaging components and save migration infrastructure.
5. All player-authored messages must require an explicit choice followed by **SEND**.
6. Never automatically select, compose or send a player's dialogue.
7. NPC messages must follow natural typing rhythms and deterministic ordering.
8. Never force navigation into another chat or app.
9. Preserve player freedom to leave, ignore, investigate or return later.
10. All required story information must remain recoverable after navigation, app reload or save restoration.
11. The Archive index is not proof that the article was altered.
12. A publication update label is not proof of manipulation.
13. No character may know information the player has not disclosed.
14. Avoid revealing Daniel's fate, Unknown Number's identity, the source of the index, or other protected revelations.
15. Never claim verification, source authenticity or evidence that is not established by the story.
16. Do not silently reset saved games, relationship scores or completed conversations.
17. Every new dialogue branch and story transition must be deterministic and idempotent.
18. The game must remain functional in light and dark mode, including mobile and Android navigation.

---

# PART 02 — CANONICAL SCENE 04 ALIGNMENT

Before implementing Scene 05, reconcile Scene 04 with the updated canonical flow.

## 2.1 Scene 03 to Scene 04

Scene 03 ends with Sophie saying:

"Goodbye."

Only after her final message has completed should Sophie change to Offline.

A 10-second delayed event begins after the private conversation is fully committed as completed.

After the delay, Sophie sends:

"I found that article. The one I mentioned."

The message must arrive through the normal notification and message event system.

Never automatically open Sophie's chat.

Do not introduce a **Continue Conversation** button.

Do not introduce a **NOT NOW** choice.

The player may open Sophie from Messages or by tapping the notification.

## 2.2 Greyhaven Bulletin attachment

Sophie shares the Greyhaven Bulletin article as a real chat attachment in the message timeline.

Preserve:

- Existing article headline.
- Daniel Mercer.
- Axiom Recovery.
- Journalist Nora Vance.
- Existing six-paragraph article content.
- Canonical publication and update metadata.
- The existing cautious reporting style.

Do not rewrite the article into an accusation against anyone.

The attachment must:

- Appear at its correct chronological position.
- Scroll with the rest of the chat.
- Remain accessible in historical messages.
- Open in the existing in-game browser.
- Be indexed automatically in Sophie Profile → Links.
- Restore the chat scroll position after closing the browser.

Remove persistent article links from chat footers.

Do not use a large permanent **RETURN TO SOPHIE** button. Normal Android/phone back navigation must return the player to the previous view.

Retain a compact article read state and Save control.

If the existing story uses MARK AS READ internally, preserve its semantic state transition while replacing any oversized mandatory CTA with an unobtrusive, accessible reading action.

## 2.3 Sophie sticky-note image

At the appropriate existing dialogue moment, Sophie sends a photograph of her handwritten reminder.

The text reads:

"WANTING IT TO BE CLEARER
DOESN'T MAKE IT CLEARER."

This image must be:

- A normal IMAGE message inside the chat.
- Openable through the existing media viewer.
- Automatically available in Sophie Profile → Photos.
- Persistent across saves.
- Clearly classified as a personal character moment, not forensic evidence.

Use an existing or configurable asset path. Do not block the story if the image asset is unavailable; show a graceful placeholder.

## 2.4 FIND DANIEL group

The group update arrives through normal notifications.

Remove story-navigation buttons such as:

- OPEN FIND DANIEL
- READ GROUP LATER
- BACK TO SOPHIE
- CONTINUE CONVERSATION

Maya's existing message:

"That's concerning."

must lead to a natural chat closure without forced navigation.

Use unread green dots to show where new content is available.

All group participation in Scene 04 remains optional where allowed by the existing canonical storyline.

## 2.5 Scene 04 ending

Preserve Sophie's final article-conversation dialogue, including:

"Thanks for actually reading it."

After the final NPC message completes:

- Sophie becomes Offline.
- The player retains normal phone navigation.
- The completed conversation is saved.
- No automatic app opening occurs.
- The Unknown Number first-contact event becomes eligible.

Do not add a redundant Goodnight message after the canonical closure.

---

# PART 03 — REMOVE CONTACT BLOCKING GLOBALLY

Remove the contact-blocking feature from the entire THE ARCHIVE runtime and UI.

## 3.1 Remove all visible controls

Remove:

- Block Contact
- Block Number
- Unblock Contact
- Unblock Number
- Blocked-contact management screens
- Block/unblock confirmation dialogs
- "Number blocked." chat status
- Blocking actions in chat overflow menus
- Blocking actions in Contact Profiles

Apply to:

- Unknown Number
- Daniel
- Maya
- Sophie
- Lucas
- Eli
- Nora
- FIND DANIEL
- Other group chats
- All future contacts

Remove blocking checks that prevent legitimate story messages, notifications or delayed events from being delivered.

## 3.2 Legacy save migration

Inspect existing save schema versions.

Implement a safe forward migration which:

- Clears obsolete blocked-contact states.
- Restores normal message delivery.
- Preserves historical messages.
- Preserves read states.
- Preserves relationships and player choices.
- Preserves evidence and chapter progress.
- Recovers pending messages when possible.
- Avoids replaying messages already committed.

Do not blindly wipe event queues.

Do not overwrite completed story nodes.

Remove obsolete blocking UI and runtime dependencies without destabilizing unrelated message functionality.

## 3.3 Preserve freedom

A player may still:

- Leave any conversation.
- Ignore a notification.
- Reopen a chat later.
- Close a media attachment.
- Navigate to another phone app.
- Leave a question unanswered temporarily.

Never confuse absence of a reply with contact blocking.

---

# PART 04 — UNKNOWN NUMBER & FIRST ARCHIVE ACCESS

The canonical Archive access sequence must occur before Scene 05 becomes playable.

## 4.1 Installation chronology

THE ARCHIVE must not automatically appear as an installed app at the beginning of a new game.

After Sophie's Greyhaven article conversation:

1. Unknown Number contacts the player through Messages.
2. The player may ask about the sender's identity and intentions.
3. Unknown Number shares an Archive access package.
4. The access package appears as a chat attachment.
5. The player chooses when to open it.
6. Installation is simulated within the fictional phone OS.
7. The Archive app icon appears only after successful installation.
8. The player manually opens Archive.
9. The app initially displays ACCESS: PARTIAL.
10. ARC-IDX-GB-041 becomes available.
11. The player inspects the reference.
12. Unknown Number's follow-up may arrive through the event queue.
13. Scene 05 becomes available when its required prerequisites are satisfied.

Never install or open the app automatically.

Never download a real APK or request real Android unknown-source installation permissions.

## 4.2 Canonical record

The record ID is:

`ARC-IDX-GB-041`

Its initial information must remain limited:

- TITLE MATCH: CONFIRMED
- SOURCE: UNKNOWN
- CAPTURE TIME: NOT ESTABLISHED
- ORIGINAL CONTENT: UNAVAILABLE
- AUTHENTICITY: UNVERIFIED

A title match establishes a relationship between references, not identity of the complete underlying article content.

It does not establish:

- The time the record was created.
- Whether this is an earlier article version.
- What text appeared in any earlier version.
- Who created or supplied the index.
- Whether intentional article alteration occurred.

## 4.3 Legacy Archive installation migration

Existing saved games may already have Archive installed under the old Chapter 1 flow.

Audit the old installation flags and story dependencies.

Provide a safe compatibility path:

- New games follow the revised Unknown Number installation sequence.
- Existing installed-Archive saves retain compatible progress.
- Never spawn duplicate Archive icons.
- Never force a second installation.
- Never duplicate ARC-IDX-GB-041.
- Never replay Unknown Number's first invitation when it was already completed or equivalent progression has been committed.
- Preserve historical achievements, evidence and completed scenes.

Do not reset Chapter 1 to implement the revised installation flow.

---

# PART 05 — SCENE 05 DEFINITION

**Display title:** VERSION HISTORY

**Internal scene ID:** `ch02_scene05_version_history`

**Entry point:** The Archive → REVIEW VERSION HISTORY

**Next scene:** SCENE 06 — THE CORRECTIONS DESK

**Main investigation question:**

"Does the available material establish how Daniel's public article changed?"

The answer supported by current evidence is:

The public page displays update metadata, but the player does not have a verified earlier copy, a verified change log, or a confirmed before-and-after content comparison.

Do not present uncertainty as confirmation of wrongdoing.

## 5.1 Scene entry requirements

The entry becomes available only after:

- Scene 04's required public-article conversation is complete.
- THE ARCHIVE is installed or has a valid legacy-installed migration state.
- ARC-IDX-GB-041 is accessible.
- The player has performed the required initial reference inspection.

Optional Scene 04 group responses, article saving, Unknown Number follow-up replies or disclosure decisions must not create unnecessary softlocks.

## 5.2 Manual entry

The player opens Archive manually.

A compact entry appears:

**REVIEW VERSION HISTORY**

Underneath, a short description:

"Compare the public report with the recovered reference."

On selection, enter the Scene 05 investigation interface.

Do not auto-navigate from Unknown Number, Sophie, or the phone home screen.

Do not display a full-screen forced story tutorial.

---

# PART 06 — SCENE 05 INTERFACE

The visual experience must feel like a digital investigation, not a school quiz.

Suggested investigation structure:

### VERSION HISTORY

**Source A — Public Article**

GREYHAVEN BULLETIN

Daniel Mercer article

Status: PUBLIC COPY AVAILABLE

Action: VIEW ARTICLE

**Source B — Archive Index**

ARC-IDX-GB-041

Status: REFERENCE ONLY

Action: VIEW INDEX

**Publication Guidance**

HOW THE BULLETIN LABELS UPDATES

Action: READ POLICY

**Verification Gaps**

Four items requiring inspection.

**Personal Notes**

Player observations, investigation strategy and private conclusion.

Avoid excessive on-screen buttons, popups and overlapping panels.

Use readable typography, restrained animations, publication-style formatting, subtle metadata and consistent Archive branding.

Every document must open as a real interactive view.

Back navigation returns to the appropriate Archive investigation screen without losing progress.

---

# PART 07 — SOURCE INVESTIGATION

## 7.1 Public article

The article is reopened from the canonical public article data already used in Scene 04.

Do not maintain a duplicated second article body.

Preserve:

- Headline.
- Six paragraphs.
- Nora Vance byline.
- Publication identity.
- Canonical publication time.
- Update metadata.
- Save/read state.

Player interactions:

- Inspect the byline.
- Inspect update metadata.
- Re-read the article.
- Save the article if desired.

The public article must not contain invented statements about article revisions.

## 7.2 Index inspection

Opening ARC-IDX-GB-041 displays the limited existing fields.

The player can inspect:

- Reference ID.
- Matching title.
- Unverified source.
- Unknown capture time.
- Unavailable original content.
- Unverified authenticity.

The system must not display a fabricated old article, fake redline, invented editor name or unverified historical timestamp.

## 7.3 Bulletin update policy

Add an accessible in-game reference:

**HOW THE BULLETIN LABELS UPDATES**

The policy may explain generally that publishers can label updated material, but the label alone does not provide a verified historical comparison.

The player must explicitly open the policy and mark it as read through:

**READ POLICY**

Policy completion is stored once.

Important:

This policy is general publisher guidance.

It must not claim to authenticate a specific edit made to Daniel's article.

Do not invent a publisher response or hidden editorial record.

---

# PART 08 — ELEVEN CHOICE POINTS, THIRTY-THREE BRANCHES

Implement exactly 11 primary choice groups with three authored choices each.

Total:

**11 primary choice groups × 3 choices = 33 authored choice branches**

Choice IDs must be stable, typed and unique.

Some options are observations, some are investigative preferences and some are dialogue messages.

Incorrect factual interpretations should receive concise, believable feedback and allow the player to reconsider without causing a hard fail.

Private investigation choices must never be sent automatically as chat messages.

Keep optional conversations optional.

## CHOICE 01 — INVESTIGATION ENTRY

ID: `s05_c01_investigation_order`

The player decides which source to inspect first.

A. "Start with the public article."

Effect: Open the article.

B. "Examine the recovered reference."

Effect: Open ARC-IDX-GB-041.

C. "Look at the update information first."

Effect: Focus the public article update metadata.

All options are valid.

The selected path affects initial navigation only.

It must not change source facts or skip mandatory investigation steps.

All required sources remain accessible regardless of the initial selection.

## CHOICE 02 — ARTICLE UPDATE LABEL

ID: `s05_c02_update_label`

After inspecting the article's update metadata:

"What does the update label establish?"

A. "The page shows an update label. It doesn't show what changed."

Feedback: SUPPORTED OBSERVATION.

Record the supported observation.

B. "Someone definitely rewrote the article."

Feedback: NOT ESTABLISHED.

"An update label alone cannot establish which content changed."

Allow retry.

C. "The update proves the publisher is hiding something."

Feedback: NOT ESTABLISHED.

"The label does not establish motive, deception or concealment."

Allow retry.

Only the supported interpretation satisfies this observation requirement.

Do not add suspicion points automatically for trying another interpretation.

## CHOICE 03 — ARCHIVE INDEX INTERPRETATION

ID: `s05_c03_index_meaning`

After inspecting ARC-IDX-GB-041:

"What does this record actually establish?"

A. "A matching reference exists, but the underlying content is unavailable."

Feedback: SUPPORTED OBSERVATION.

Record index limitations.

B. "This must be an earlier version of the article."

Feedback: NOT VERIFIED.

"The record does not establish when the referenced material was captured."

Allow retry.

C. "This proves that the article was changed."

Feedback: UNSUPPORTED.

"The reference does not contain a verified before-and-after comparison."

Allow retry.

Never promote this reference to verified evidence of tampering.

## CHOICE 04 — PUBLICATION POLICY

ID: `s05_c04_policy_meaning`

After reading HOW THE BULLETIN LABELS UPDATES:

"What can the publication policy tell us?"

A. "It describes how updates may be labelled, not the history of this article."

Feedback: SUPPORTED.

Record the policy observation.

B. "The policy confirms what the previous article said."

Feedback: INCORRECT SOURCE.

"The policy contains no earlier copy of Daniel's article."

Allow retry.

C. "The publisher must have recorded a specific correction."

Feedback: UNVERIFIED.

"A general policy cannot confirm that a particular correction record exists."

Allow retry.

Preserve the distinction between publisher policy and article-specific documentation.

## CHOICE 05 — SOURCE COMPARISON

ID: `s05_c05_comparison`

Once the article, index and policy are inspected:

"Can the available records establish a verified content difference?"

A. "No. There is no verified earlier text to compare."

Feedback: SUPPORTED CONCLUSION.

Record `comparison_status = unavailable`.

B. "Yes. The title match confirms the earlier text was different."

Feedback: NOT SUPPORTED.

"A matching title cannot establish a difference in article content."

Allow retry.

C. "Yes. The update label confirms something was removed."

Feedback: NOT SUPPORTED.

"The update label does not identify removed material."

Allow retry.

The supported conclusion should feel earned through the player's inspection.

Do not reveal it before required source interactions.

## CHOICE 06 — INVESTIGATION STRATEGY

ID: `s05_c06_next_strategy`

After reviewing limitations:

"How do you want to continue?"

A. "Ask the publisher to clarify its update records."

Record:

`strategy = publisher_clarification`

B. "Look for an independent copy of the article."

Record:

`strategy = independent_copy`

C. "Keep the reference without making an accusation."

Record:

`strategy = preserve_uncertainty`

All three are valid investigative approaches.

Do not automatically send a question to the publisher.

Do not automatically begin another scene.

Do not generate new evidence just because the player selected a strategy.

## CHOICE 07 — PERSONAL CONCLUSION

ID: `s05_c07_private_conclusion`

The player records a private conclusion.

A. "There is a reference, but not enough to establish a revision."

Record:

`private_conclusion = reference_without_verified_revision`

B. "The update is worth investigating, but I can't say what changed."

Record:

`private_conclusion = revision_question_unresolved`

C. "I should keep the public report separate from what the index suggests."

Record:

`private_conclusion = maintain_source_separation`

All three remain logically defensible.

All three should permit Scene 05 completion once the other mandatory requirements are satisfied.

The conclusion stays in personal notes.

Do not send it to Sophie, Maya or anyone else.

## CHOICE 08 — OPTIONAL CORRECTIONS DESK QUESTION

ID: `s05_c08_corrections_question`

Optional side activity.

The player may open the Corrections Desk request form.

Display three questions:

A. "Does Greyhaven Bulletin maintain publicly accessible article revision records?"

B. "Can you clarify what the Updated label means for this article?"

C. "Is a previous published copy of this article available for comparison?"

When the player chooses a question, show:

**REVIEW REQUEST**

The review page displays the exact selected question.

The player may edit the selection or return without sending.

Only after pressing:

**SEND REQUEST**

should the system create a submitted request record.

Response:

"Request submitted."

"Response pending."

Create a receipt containing:

- Stable request ID.
- Selected question.
- In-game submission time.
- Status: SUBMITTED / NO RESPONSE YET.

Do not generate an answer from the publisher.

Do not assert that the publisher has received or processed a request beyond what the simulated form receipt establishes.

If the player leaves before SEND REQUEST, nothing is submitted.

If the player returns later, an already submitted request must not be duplicated.

The optional request must not block Scene 05 completion.

## CHOICE 09 — OPTIONAL SOPHIE FIRST EXCHANGE

ID: `s05_c09_sophie_update`

Sophie may send a natural message after the player reaches the relevant investigation milestone.

Use the existing notification system.

Never automatically open her chat.

Suggested NPC opening:

Sophie:

"I kept thinking about that article."

"The update label, especially."

"I don't really know what to make of it."

Offer three player responses.

A. "The label doesn't tell us what actually changed."

Requires SEND.

Sophie:

"Right."

"I think that's what was bothering me."

"I wanted it to mean more than it did."

B. "Did something about the article feel wrong to you?"

Requires SEND.

Sophie:

"Maybe."

"But I don't know if that's because of the article."

"Or because it's about Daniel."

C. "You don't have to decide what it means yet."

Requires SEND.

Sophie:

"Thanks."

"I think I needed to hear that."

"Not everything has to make sense immediately."

All branches converge into the continuation of the optional Sophie conversation.

Do not make Sophie independently aware of Archive records unless her knowledge state explicitly permits it.

## CHOICE 10 — OPTIONAL SOPHIE SECOND EXCHANGE

ID: `s05_c10_sophie_boundary`

Use this conversation after Choice 09 when the optional Sophie interaction proceeds.

Suggested Sophie line:

"I just wanted something that made it clearer."

"And it didn't."

Choices:

A. "We can keep looking without jumping to conclusions."

Requires SEND.

Sophie:

"That sounds better than guessing."

"At least we'd know what we were actually looking for."

B. "Sometimes the honest answer is that we don't know."

Requires SEND.

Sophie:

"I hate that answer."

"But I know you're right."

C. "We should separate what the article says from what we feel about Daniel."

Requires SEND.

Sophie:

"Yeah."

"That's difficult for me."

"But I don't want to get it wrong."

Closing NPC message, if consistent with the existing authored dialogue:

"Thanks for checking instead of guessing."

Sophie finishes typing and returns to Offline.

Do not display:

- CONTINUE CONVERSATION
- BACK TO ARCHIVE
- NEXT SCENE

The player may resume Archive independently.

Preserve existing authored lines and branching when present; use the proposed dialogue only where it does not overwrite established canon.

Relationship effects should reuse existing canonical definitions, if any.

Do not invent large affection or romance rewards.

## CHOICE 11 — OPTIONAL FIND DANIEL DISCLOSURE

ID: `s05_c11_group_disclosure`

Maya may initiate a group message about the article.

Suggested opening:

Maya:

"Does anyone actually know what changed in that article?"

"Or are we just looking at the update label?"

The player may open the group when convenient.

Offer three responses.

A. "I checked. We don't have a confirmed before-and-after copy."

Requires SEND.

Maya:

"Okay."

"That's an important distinction."

Lucas, only if present and eligible:

"So we're still missing the comparison itself."

B. "There is an index reference, but it doesn't contain the original text."

Requires SEND.

Update knowledge only for group participants who actually receive this message.

Maya:

"An index reference?"

"Can you show us what it contains?"

Lucas, only if present and eligible:

"That doesn't make it an earlier version."

Branch must not automatically share a document that the player has not chosen to send.

C. "I don't think we should speculate until we have more."

Requires SEND.

Maya:

"Fair."

"Then let's stick to what we can verify."

Lucas, only if present and eligible:

"Agreed."

The group interaction ends naturally.

No character learns about the Archive through branches A or C unless previously disclosed.

For branch B, knowledge is limited to the information in the actual sent message.

Do not reveal Unknown Number's identity or the installation package.

This group interaction is optional and must not block Scene 05 completion.

---

# PART 09 — FOUR MISSING VERIFICATIONS

The player must inspect four verification gaps before completing their main investigation.

Present them as interactive Archive investigation entries.

Do not make them a large forced questionnaire.

Each item should open a concise explanatory panel.

## GAP 01 — PREVIOUS ARTICLE COPY

"An earlier readable copy of the article is not available in the current records."

Status: UNAVAILABLE

## GAP 02 — VERIFIED CHANGE LOG

"No authenticated change log with established timestamps is available."

Status: NOT VERIFIED

## GAP 03 — CONTENT COMPARISON

"No verified comparison of earlier and later article content can be performed."

Status: UNAVAILABLE

## GAP 04 — INDEX ORIGIN

"The identity of the party responsible for issuing this index record has not been established."

Status: UNVERIFIED

When the player inspects an item, mark that specific item as reviewed.

Use four persistent flags or an equivalent typed set.

The items are not evidence of wrongdoing.

A reviewed verification gap is an acknowledged limitation, not a recovered clue.

Once all four are examined, allow the player to continue to investigation strategy and personal conclusion.

Do not overwrite the underlying evidence records.

---

# PART 10 — STORY PROGRESSION STATE MACHINE

Implement Scene 05 in the existing story graph.

Suggested logical states:

`LOCKED`

`AVAILABLE`

`ENTERED`

`INVESTIGATING`

`SOURCES_REVIEWED`

`LIMITATIONS_REVIEWED`

`CONCLUSION_RECORDED`

`REVIEWED`

`NEXT_LEAD_AVAILABLE`

Use the project's actual state conventions rather than creating a redundant competing system.

## Mandatory progression

Scene becomes AVAILABLE when prerequisites are satisfied.

ENTERED occurs when the player opens REVIEW VERSION HISTORY.

The player reviews:

- Public article.
- ARC-IDX-GB-041.
- Bulletin update policy.

Each required source must have an independent durable inspection state.

Complete supported interpretations for the article label, index, policy and comparison.

Review the four missing verification items.

Record:

- Investigation strategy.
- Private conclusion.

The main investigation can then be marked REVIEWED.

## Optional flags

Track separately:

- Corrections Desk request drafted.
- Corrections Desk request submitted.
- Sophie optional event delivered.
- Sophie optional conversation completed.
- FIND DANIEL optional event delivered.
- FIND DANIEL optional conversation completed.
- Group disclosure scope.

These flags must not be mandatory for Scene 05 completion.

Optional events must remain recoverable if the player temporarily leaves.

Do not force their completion before Scene 06.

## Final completion screen

When all mandatory conditions are satisfied:

**VERSION HISTORY — REVIEWED**

Secondary text:

"Public information reviewed."

"Earlier article content remains unavailable."

"Revision history not established."

Provide an in-Archive action:

**OPEN NEXT LEAD**

This opens Scene 06 manually.

The player may also close Archive, visit Messages or return later.

Completing Scene 05 must not auto-open Scene 06.

---

# PART 11 — SCENE 06 HANDOFF

Scene 06 display title:

**THE CORRECTIONS DESK**

Scene 05 must hand over:

- Current article read state.
- ARC-IDX-GB-041 inspection state.
- Policy inspection status.
- Four reviewed verification gaps.
- Selected strategy.
- Private conclusion.
- Optional Corrections Desk request status.
- Relevant NPC knowledge/disclosure state.

If the player already submitted a Corrections Desk question during Scene 05, show the existing request receipt in Scene 06.

Do not create a second request.

Do not interpret a request receipt as a publisher response.

Scene 06 should investigate whether clarification can be obtained and what information is available.

Do not invent the final outcome of Scene 06 in this implementation.

Implement only the required handoff and entry wiring unless existing canonical Scene 06 content already exists and needs compatibility fixes.

---

# PART 12 — CHAT AND NOTIFICATION SYSTEM

Use the existing Messages system for all interactions.

## 12.1 Player messages

Player dialogue must follow:

1. NPC sends message.
2. Typing finishes.
3. Player choices appear.
4. Player selects one response.
5. Selected response is staged in the message composer.
6. Player presses SEND.
7. Player message is committed once.
8. Relevant NPC reply is scheduled through the dialogue runner.

Never automatically send player text.

Never inject player dialogue as though the player selected it.

Do not skip SEND for optional Sophie or group responses.

## 12.2 Typing and delays

Use natural existing character typing parameters.

Message timing should reflect:

- Speaker identity.
- Message length.
- Existing character-specific cadence.
- Event priority.
- Actual message delivery order.

Avoid dumping an entire conversation instantly.

Never make a new message appear before a prior typing state is committed.

Avoid delays that become frustrating or require unnecessary waiting once the user is actively interacting.

## 12.3 Notifications

Incoming NPC messages create normal notifications.

Use subtle green unread indicators for:

- Messages app.
- Individual chats.
- Group chats.
- Archive new lead availability where appropriate.

Do not use fake unread indicators.

Clear indicators only according to established read semantics.

Notifications must not forcibly navigate the player.

## 12.4 Free navigation

Player can navigate between:

- Phone home.
- Messages.
- Contacts.
- Calls.
- Browser.
- Archive.
- Existing phone applications.

Use normal Back navigation and existing history behavior.

When the player leaves an investigation or chat:

- Preserve progress.
- Preserve scroll position where supported.
- Preserve unsent drafts.
- Preserve pending events.
- Restore the correct screen when returning.

Do not reset the current investigation because the player opened another app.

---

# PART 13 — SHARED MEDIA ARCHITECTURE

Preserve and extend the global NPC media infrastructure.

Use canonical message attachments as the single source of truth.

Supported types should include:

- ARTICLE_LINK
- IMAGE
- DOCUMENT
- AUDIO, if supported by the existing application
- ARCHIVE_PACKAGE, for the canonical Unknown Number attachment if appropriate to the existing type system

NPC contact profiles should expose:

- Photos
- Links
- Documents

Use message attachment references rather than duplicating storage.

The Greyhaven article must be listed in Sophie Profile → Links.

Sophie's sticky-note photograph must be listed in Sophie Profile → Photos.

Media from other NPCs must automatically use the same global behavior.

Replaying a story event must not duplicate media entries.

Maintain origin message references to support jumping back to the original chat context.

---

# PART 14 — EVIDENCE AND KNOWLEDGE MODEL

Maintain strict separation between:

1. Public reporting.
2. Archive reference data.
3. Verified evidence.
4. Investigative observations.
5. Player hypotheses.
6. NPC testimony.
7. NPC knowledge.
8. Personal notes.

## Public article

Source type: PUBLIC_REPORT

Reading it may establish that the player has seen what the bulletin publicly reports.

It must not establish that the report is entirely true.

## Archive index

Source type: UNVERIFIED_INDEX_REFERENCE

The player knows the reference exists and records limited metadata.

Do not establish authenticity, creation time or historical content.

## Policy

Source type: GENERAL_PUBLICATION_GUIDANCE

It may support understanding how labels are used.

It cannot authenticate the Daniel-specific revision history.

## Player conclusions

Store as private observations or selected interpretations.

They must not become canonical facts merely because the player selected them.

## NPC knowledge

Knowledge must change only through:

- Actual authored NPC interactions.
- Delivered player disclosures.
- Explicit existing canonical knowledge events.

Never globally reveal Archive information to all characters.

Sophie, Maya, Lucas, Eli and Nora must not suddenly know about the index unless the corresponding knowledge conditions have been satisfied.

---

# PART 15 — SAVE PERSISTENCE AND MIGRATION

Audit the current save schema before adding fields.

Do not assume any schema version number.

Use the current migration architecture.

Persist, where appropriate:

- Scene 05 progression state.
- Choice group selections.
- Invalid-interpretation retry state if needed.
- Source inspection completion.
- Four verification-gap states.
- Selected investigation strategy.
- Private conclusion.
- Corrections Desk submission receipt.
- Optional NPC conversation state.
- Unread notification state.
- Pending delayed events.
- Archive installation state.
- Legacy contact-blocking migration result.

Stable event IDs are required for idempotency.

Suggested event identities:

`ch02.s04.sophie.article_notification`

`ch02.archive.unknown_first_contact`

`ch02.archive.access_package_received`

`ch02.archive.install_completed`

`ch02.archive.idx_gb041_inspected`

`ch02.s05.sophie.optional_checkin`

`ch02.s05.find_daniel.optional_update`

`ch02.s05.version_history_reviewed`

Avoid relying on raw timers alone as the only source of pending state.

Test save/reload at every important boundary.

No completed player choice should be erased or repeated after reload.

---

# PART 16 — UI/UX QUALITY REQUIREMENTS

Target a polished, believable fictional phone experience.

## Design principles

- Natural smartphone interaction.
- Duskwood-style immersion without copying protected assets.
- No intrusive tutorial overlays.
- No unnecessary story-navigation commands inside conversations.
- Clear information hierarchy.
- Minimal screen clutter.
- Compact metadata panels.
- Consistent typography.
- Smooth native-feeling transitions.

## Version History design

Visualize the investigation as linked source cards or Archive records.

Distinguish source status clearly:

PUBLIC

REFERENCE ONLY

UNVERIFIED

UNAVAILABLE

REVIEWED

Do not use colors that imply certainty where no verification exists.

Use a restrained status design, not excessive bright warnings.

## Responsive layout

Support:

- Narrow Android devices.
- Standard Android phones.
- Larger screens.
- Desktop/browser preview.
- Landscape where the existing app supports it.

Ensure:

- No bottom navigation overlap.
- No clipped choice buttons.
- No hidden SEND button.
- No inaccessible scroll regions.
- No overflowing article text.
- No modal that cannot be dismissed.
- No unreadable labels in light or dark mode.

## Accessibility

Provide:

- Accessible labels for media.
- Accessible names for unread indicators.
- Keyboard navigation for interactive panels.
- Adequate contrast.
- Appropriate focus management.
- Reduced-motion support where relevant.
- Semantic status messages.

---

# PART 17 — SOFTLOCK PREVENTION

Treat softlock prevention as a critical acceptance requirement.

Test these cases:

1. Player leaves Archive after inspecting only one source.
2. Player closes the policy before marking it read.
3. Player reads the article but does not save it.
4. Player saves the index but not the article.
5. Player saves both sources.
6. Player saves neither source.
7. Player selects an unsupported interpretation.
8. Player retries and later selects the supported interpretation.
9. Player ignores Sophie's optional message.
10. Player ignores FIND DANIEL.
11. Player opens an optional chat midway through Archive review.
12. Player drafts a Corrections Desk question but does not send it.
13. Player submits the question and immediately closes the app.
14. Player completes the main investigation before optional events.
15. Player leaves after reaching REVIEWED but before opening Scene 06.
16. Player reopens a completed Scene 05.
17. A migrated save contains blocked Unknown Number.
18. A migrated save already contains ARC-IDX-GB-041.
19. A migrated save already has Archive installed.
20. Reload occurs while delayed NPC events are pending.

In every case:

- No duplicate messages.
- No lost mandatory clue.
- No repeated installation.
- No impossible story conditions.
- No scene restarting unexpectedly.
- No premature Scene 06 unlock.
- No permanent progression blockage.

---

# PART 18 — TEST SUITE

Extend existing tests. Do not create a separate testing architecture.

## 18.1 Narrative tests

Verify:

- Scene 03 closes with Goodbye.
- Sophie Offline occurs after final message completion.
- Article notification begins after the required 10-second post-completion delay.
- No Continue Conversation button.
- No Not Now choice.
- No forced Return to Sophie button.
- No forced FIND DANIEL navigation.
- Correct Unknown Number chronology.
- Manual Archive installation.
- Scene 05 entry prerequisites.
- Scene 06 unlock criteria.

## 18.2 Choice tests

Verify:

- Exactly 11 primary choice groups.
- Exactly three authored options per group.
- Exactly 33 primary branches.
- Choice IDs are unique.
- No unreachable branches.
- No accidental player auto-send.
- Invalid observations provide retry.
- All supported observations can be completed.
- All valid investigation strategies persist.
- All private conclusions persist.
- Optional choices do not block completion.

## 18.3 Evidence tests

Verify:

- No fabricated earlier article.
- No verified timestamps invented.
- No confirmed change log invented.
- No index-source identity invented.
- No article manipulation prematurely confirmed.
- Public reporting and verified evidence remain separate.
- NPC knowledge updates only following relevant disclosure.

## 18.4 Save and migration tests

Verify:

- Legacy blocked-contact states migrate.
- Pending messages become deliverable.
- Existing chat histories remain unchanged.
- Existing relationship values are preserved.
- Existing Archive installation survives migration.
- No duplicate Unknown Number invitation.
- No repeated article attachment.
- No duplicated index record.
- No repeated Corrections Desk receipt.
- Delayed events survive reload.
- Scene 05 resumes after reload.
- Completed Scene 05 remains completed.

## 18.5 UI tests

Verify:

- Article and sticky-note media work.
- Media appears in contact profiles.
- Shared-media indexes are deduplicated.
- Normal Back navigation works.
- Chat scroll restores correctly.
- Optional messages display unread indicators.
- SEND is available and functional.
- Dark and light themes are legible.
- Small-screen panels remain accessible.
- Source views do not lose progress.

## 18.6 Commands

Run, where supported by the repository:

- TypeScript typecheck
- ESLint / lint
- Unit tests
- Integration tests
- Production build

Use the project's actual scripts.

If possible, execute the real gameplay path through browser or UI automation.

Never claim PASS for commands not actually executed.

---

# PART 19 — IMPLEMENTATION PROCEDURE

Follow this order.

### Phase A — Audit

Inspect:

- Chapter 2 scene registry.
- Scene 03 ending.
- Scene 04 current implementation.
- Unknown Number definitions.
- Archive installation sequence.
- Current ARC-IDX-GB-041 record.
- Story event queue.
- Dialogue runner.
- Messaging system.
- Article browser.
- Contact Profiles.
- Shared media storage.
- Contact-blocking functionality.
- Save schema and migrations.
- Existing Scene 05 and Scene 06, if present.

Identify canonical content already implemented and avoid duplicates.

### Phase B — Canonical repair

Reconcile Scene 04 flow, notifications and Unknown Number installation.

Remove obsolete automatic installation logic.

Implement safe migration for previously installed Archive saves.

Remove contact blocking globally.

### Phase C — Scene 05 implementation

Implement:

- Scene registration.
- Entry condition.
- Source inspection views.
- Bulletin policy.
- Four verification gaps.
- Eleven choice groups.
- Thirty-three branches.
- Strategy recording.
- Private conclusion.
- Reviewed state.
- Scene 06 handoff.

### Phase D — Optional interactions

Implement:

- Corrections Desk question submission.
- Sophie optional conversation.
- FIND DANIEL optional group conversation.
- Knowledge disclosure logic.
- Notifications and unread states.

### Phase E — UX polish

Improve:

- Mobile presentation.
- Source status visuals.
- Message timing.
- Attachment behavior.
- Back navigation.
- Scroll restoration.
- Light/dark modes.
- Save/resume experience.

### Phase F — Verification

Run all available checks.

Fix implementation regressions.

Do not stop at compiling successfully; verify that the scene is reachable through real gameplay.

---

# PART 20 — REQUIRED FINAL REPORT

When the implementation is complete, provide:

## A. Files changed

List actual file paths and summarize modifications.

## B. Canonical story flow

Show the implemented Scene 03 → Scene 04 → Unknown Number → Archive → Scene 05 → Scene 06 progression.

## C. Scene 05 decision coverage

Report all 11 choice IDs, 33 branch options and whether they are reachable.

## D. Blocking removal

Confirm removal of visible blocking UI, runtime delivery checks and safe legacy-state migration.

## E. Persistence

Describe schema changes, migration handling, event idempotency and recovery behavior.

## F. Verification results

Report actual TypeScript, lint, unit test, integration test and build results.

State which checks could not be executed.

## G. Remaining issues

Identify unresolved problems without concealing them.

## H. Acceptance checklist

Report PASS, FAIL or NOT TESTED for each important acceptance criterion.

Do not report PASS based only on code inspection when runtime verification is required.

---

# FINAL ACCEPTANCE CRITERIA

The implementation is accepted only when:

1. Scene 04 uses the revised natural chat and media flow.
2. No Continue Conversation or Not Now navigation choices remain.
3. No forced cross-chat navigation exists.
4. Unknown Number provides the Archive package through the canonical conversation.
5. Archive installation is voluntary and simulated.
6. ARC-IDX-GB-041 is available after installation.
7. Scene 05 is reached manually through REVIEW VERSION HISTORY.
8. Both required sources can be reopened.
9. The Bulletin policy can be inspected.
10. All four verification gaps are accessible and persistent.
11. All 11 choice groups and 33 authored branches work correctly.
12. Player messages require explicit SEND.
13. Sophie and FIND DANIEL participation remain optional.
14. Corrections Desk request submission works without fabricating a response.
15. Public reporting, index reference, observations and verified evidence remain distinct.
16. No protected mystery is solved prematurely.
17. VERSION HISTORY — REVIEWED appears only after required investigation completion.
18. OPEN NEXT LEAD opens Scene 06 manually.
19. Contact blocking is removed globally.
20. Legacy saves, notifications, NPC relationships and message histories remain compatible.
21. The player can freely leave and resume the scene.
22. No duplicate messages, duplicated evidence or progression softlocks remain.
23. Light mode, dark mode and mobile navigation work correctly.
24. Available tests and production checks execute successfully, with honest reporting of any failures.

**IMPLEMENTATION DIRECTIVE**

Do not merely describe how these features could work.

Implement them into the existing THE ARCHIVE repository using its actual story architecture and existing runtime systems.

Preserve the underlying mystery.

Make the player feel like they are independently investigating a plausible digital trail, rather than being pushed through a scripted sequence of answers.

The goal is not to prove what happened to Daniel.

The goal is to let the player discover precisely what the available records can — and cannot — establish.

**END OF MASTER PROMPT**