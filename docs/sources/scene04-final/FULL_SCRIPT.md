# THE ARCHIVE
## CHAPTER 1 — THE MISSING ENTRY
### ACT II — THE FIRST CRACK
### SCENE 04 — THE PUBLIC STORY

**Status:** Complete authored interactive screenplay (new draft for integration and narrative approval; not tested in the application).  
**In-game language:** English throughout.  
**Style:** Contemporary messenger mystery; slow, believable messages and restrained emotional reveals.  
**Primary channels:** Messages → Sophie; simulated Browser → Greyhaven Bulletin; FIND DANIEL group; optional Unknown Number private thread; The Archive app.  
**Main choice IDs:** `OPEN-S04-C01` through `OPEN-S04-C16` (16 authored choice points, including one optional group choice; 9 extended ★ responses).  
**Extra player actions:** article link open; read/inspect article; optional group conversation; optional sender message; inspect Archive index; acknowledge uncertainty; save index; Scene 05 handoff.  
**Entry:** `scene03_completed=true` and Sophie has *promised* to find a public article. She did NOT send the article, byline, URL or Archive record in Scene 03. The delayed article lead arrives once after the Scene 03 goodbye.  
**Exit:** public article viewed and explicitly marked as inspected; Archive index entry `ARC-IDX-GB-041` manually opened and acknowledged; Scene 04 resolved, Scene 05 — **AN OLDER COPY** available only on player action.  

> **NON-NEGOTIABLE CANON:** Daniel Mercer is missing/unreachable, NOT proven dead; Sophie Mercer is his younger sister; Maya Chen is his fiancée; Lucas Grey, Daniel's childhood friend, left FIND DANIEL in Scene 02; Eli Ward is female and works with Daniel at Axiom Recovery. The starred contact entry is from a file labelled as Daniel's contact export, not proof he personally added the player. Nora Vance is the journalist credited on the public Greyhaven Bulletin article, but she is NOT contacted until Scene 07. Unknown Sender sent “You shouldn't be talking to her.” in Scene 02. The player may or may not have read it, replied to it, blocked the sender, or told Sophie in Scene 03. NEVER infer missing information.

> **SCRIPT PROVENANCE:** The Greyhaven Bulletin article and headline below are original *fictional Chapter 1 story content* written for this scene. They are not a real-world article and must be stored as in-game local content. If the repository already has an established article headline/date/URL or edition metadata, map this screenplay onto those canonical values and report any conflict rather than silently changing the existing canon.

---

# 0 — NARRATIVE INTENT AND PLAYER CONTRACT

1. Begin with a person, not a puzzle: Sophie finally shares a public article after some time away from her phone. She is not operating a hidden evidence system.
2. The player genuinely READS the public version of a report about Daniel. The first crack is between what a headline suggests and what its sentences actually establish.
3. The byline **Nora Vance** is visible but she remains a name on a page, not an instant source of private evidence.
4. The public article may be updated; an update label is observable, NOT proof of manipulation.
5. The Unknown Sender's optional second hint can occur after article inspection: “The version you're reading isn't the first.” This is an allegation from an unknown person, not authenticated proof. If the sender was blocked, deliver NO second message and keep the core route accessible.
6. The Archive was installed in the game's earlier device reconstruction. Its shell could previously display `ACCESS: PARTIAL / No recovered records.` Scene 04 unlocks the **first indexed reference**, NOT a magical reinstall or a complete download of Daniel's phone.
7. The Archive index establishes only that a local recovered dataset contains a possible corresponding record. Its origin, age, author and relationship to the live public article remain unverified.
8. No second version's **body text**, no paragraph-level diff and no missing line are revealed here. Those are reserved for Scene 05 and Scene 06.
9. Never force the player to share Archive findings, Unknown Sender text, or their real name with any NPC. Every outgoing player message requires choose + Send.
10. Scene completion must depend on user actions, not just time or an animation finishing.

# 1 — EVENT ENTRY: THE ARTICLE SHE PROMISED

*[At an authored delay after Scene 03: use the existing one-shot story event `scene04_public_article_lead`. This can happen on next normal return/session; do not use the user's real clock for a narrative deadline. If the player is reading elsewhere, show a standard single notification, not an automatic screen jump.]*

**NOTIFICATION — SOPHIE:** I found that article. The one I mentioned.

*[Player taps the notification OR opens Messages → Sophie. Previous Scene 01 and 03 chat history remains intact. No duplicate message on navigation.]*

**SOPHIE:** Hey.

*[Pause 2.0s. Typing appears, stops; a 1.3s silence.]*

**SOPHIE:** I found the link.

**SOPHIE:** The one I said I'd send you.

*[2.1s]*

**SOPHIE:** I was going to send it earlier, but I kept opening it and closing it.

**SOPHIE:** Which probably sounds ridiculous.

### CHOICE `OPEN-S04-C01` — Coming back to the conversation

**A — PLAYER:** It doesn't. Send it when you're ready.
- **SOPHIE:** Thanks.
- **SOPHIE:** I don't know why a web page feels so difficult to send.

**B — PLAYER:** Is everything okay?
- **SOPHIE:** I'm okay.
- **SOPHIE:** Well. In the very technical sense that I'm sitting here drinking tea.
- **SOPHIE:** Maya would call that progress.

**C — PLAYER:** You don't have to send it.
- *[Pause 2.3s]*
- **SOPHIE:** I know.
- **SOPHIE:** But I said I'd show you. I want you to see what people are reading.

**D — PLAYER:** Did you manage to get any sleep?
- **SOPHIE:** Some.
- **SOPHIE:** Not enough for Maya to stop asking. 😅
- **SOPHIE:** I'm trying.

**E ★ — PLAYER:** Yesterday you said you wanted me to read it without telling me what to think. Does that still stand?
- *[Pause 3.0s]*
- **SOPHIE:** Yeah.
- **SOPHIE:** It does.
- **SOPHIE:** Even if part of me really wants to tell you what I think first.
- **PLAYER (extra tap + Send):** Then I'll read it properly.
- **SOPHIE:** Okay. That's all I wanted.
- *[Effect once: Sophie trust +2]*

**CONVERGE**

**SOPHIE:** Do you know what the worst part is?

*[1.9s]*

**SOPHIE:** My brother has a whole life.

**SOPHIE:** People who love him. Things he hates. A stupid mug he refuses to throw away.

**SOPHIE:** And somehow it all fits into one article.

*[2.7s]*

**SOPHIE:** Sorry. I'm doing that thing again.

### CHOICE `OPEN-S04-C02` — Why this article matters

**A — PLAYER:** What thing?
- **SOPHIE:** Talking around something instead of just showing it to you.
- **SOPHIE:** Give me a second.

**B — PLAYER:** It's about Daniel. You're allowed to feel something.
- **SOPHIE:** I know.
- **SOPHIE:** I just don't want how I feel to tell you what the article says.
- *[Effect: Sophie affinity +1]*

**C — PLAYER:** You said it's public. Is it about his disappearance?
- **SOPHIE:** Yes.
- **SOPHIE:** What people *think* they know about it, anyway.

**D — PLAYER:** If it's upsetting you, maybe we should leave it.
- **SOPHIE:** We can take it slowly.
- **SOPHIE:** But I think it matters that you see it yourself.

**CONVERGE**

*[Typing 1.5s]*

**SOPHIE:** Here.

**SOPHIE:** Please read the whole thing if you can.

**SOPHIE:** Not just the headline.

**ATTACHMENT CARD — PUBLIC LINK (persist once)**
- Publisher: `GREYHAVEN BULLETIN`
- Section: `LOCAL NEWS`
- Headline: `Questions Remain After Greyhaven Data Specialist Stops Responding`
- Byline preview: `Nora Vance`
- Open action: `READ ARTICLE` (player tap; no auto-open)
- Later action: `NOT NOW` (retains unread card; Sophie does not harass the player with an endless reminder)
- Implementation: `browser://greyhaven-bulletin/article/gb-daniel-mercer-001` is a **fictional internal story route**, never an actual website or external request.

*[Scene progress pauses at the attachment. If NOT NOW, remain in Scene 04 with card available from thread or Browser history. No wrong-answer punishment and no forced transition. On READ ARTICLE, open the in-game Browser; do not send a player message on behalf of the user.]*

---

# 2 — THE PUBLIC ARTICLE (FULL TEXT, IN-GAME BROWSER)

**UI: GREYHAVEN BULLETIN**  
**LOCAL NEWS**  

## Questions Remain After Greyhaven Data Specialist Stops Responding

*Concern grows among those close to Daniel Mercer as basic details remain unclear.*

**By Nora Vance**  
**Published: 3 days ago** · **Updated: Yesterday**  
*[Story-relative display strings; use a consistent fictional story clock in the actual data model. Do not replace with the current real-world date or claim that a date is verified if the repo has none.]*

> **PARA P01**  
> Daniel Mercer, a data specialist employed by Axiom Recovery, has not responded to attempts to contact him in recent days, according to people who know him.
>
> **PARA P02**  
> Those close to Mercer describe his silence as unusual. Attempts to reach him by phone and message have reportedly gone unanswered, though no public account has established where he was last seen.
>
> **PARA P03**  
> A member of Mercer's family says a missing-person report has been filed. Authorities have not released a public account explaining his whereabouts. The Bulletin has not independently confirmed the circumstances of his absence.
>
> **PARA P04**  
> Axiom Recovery has not provided a comment in response to the Bulletin's request. It is not clear whether Mercer's work is relevant to his absence.
>
> **PARA P05**  
> Online speculation has offered conflicting explanations. None of those claims has been independently substantiated, and there is currently no verified basis to name a person responsible.
>
> **PARA P06**  
> Those with credible information are encouraged to contact the appropriate authorities. This report may be updated as further facts can be verified.

**END OF PUBLIC ARTICLE**

**Fictional article ID:** `GB-ARTICLE-001`.  
**Attribution:** Greyhaven Bulletin / Nora Vance / *public copy*.  
**Unverified claims in the article:** alleged attempts to contact Mercer; family member's statement; comment request to Axiom Recovery; the newspaper's verification limitations.  
**What the player can DIRECTLY observe:** headline, byline, displayed publication/update labels, published words and absence of a public revision log on this page.  
**What this does NOT establish:** exact last-seen time, reason for disappearance, truth of online rumors, identity of anyone who edited the story, whether any older copy is original, whether Unknown Sender has accurate knowledge.

**BROWSER INTERACTIONS (all player-controlled):**
1. `SCROLL TO ARTICLE END` — flag `scene04_article_scrolled_to_end=true`; don't mark read merely because page mounted. For accessibility, a visible `MARK AS READ` action may also be offered after article content has been made available to the player, without relying on scroll detection alone.
2. `TAP BYLINE` — opens a public bio preview for Nora Vance (journalist), not her contact details, a private inbox or an interview. `CLOSE` returns to the article. No Scene 07 content leaks.
3. `TAP UPDATED LABEL` — opens a neutral tooltip: `This page displays a later update time. A change log is not shown on this page.` It does NOT assert what changed.
4. `SAVE PUBLIC ARTICLE` — evidence collection action; stores *public published content with attribution* as `EV-PUBLIC-GB-001`. This is distinct from declaring its claims proven. Saving can be available in Scene 04 and revisitable later.
5. `RETURN TO SOPHIE` — user navigates back manually. The outgoing Sophie response choices unlock only after player has opened/inspected the article. If they left early, preserve their reading position and await their return.

*[After player has seen the article text and uses MARK AS READ, set `scene04_public_article_inspected=true` exactly once. User may return to Sophie, view article again, or save it first; no evidence auto-open.]*

---

# 3 — SOPHIE: WHAT THE PUBLIC STORY SAYS

*[Player manually returns to Sophie's thread. If they are at a choice in another app, queue Sophie's next message only after arrival; no unsolicited player response.]*

**SOPHIE:** You read it?

*[Do not replace actual reading state with an automatic “yes”. If the article was not read, show `OPEN ARTICLE` reminder card and hold here.]*

**SOPHIE:** I know it doesn't say anything particularly dramatic.

**SOPHIE:** Maybe that's why everyone keeps sharing it.

### CHOICE `OPEN-S04-C03` — First reaction

**A — PLAYER:** It says less than the headline makes you expect.
- **SOPHIE:** That's how I felt.
- **SOPHIE:** It sounds like someone knows what happened until you actually read it.

**B — PLAYER:** At least they're not accusing anyone.
- **SOPHIE:** Yeah.
- **SOPHIE:** I'm relieved about that.
- **SOPHIE:** It could have been much worse.

**C — PLAYER:** I can see why it upset you.
- *[Pause 2.4s]*
- **SOPHIE:** It's weird, isn't it?
- **SOPHIE:** Reading about somebody you know like they're a stranger.
- *[Effect: Sophie trust +1]*

**D — PLAYER:** It seems like a fairly careful article.
- **SOPHIE:** Maybe it is.
- **SOPHIE:** I don't think Nora wrote it to hurt us.
- **SOPHIE:** I just hate that this is what people know about him.

**E ★ — PLAYER:** The article separates what's reported from what's confirmed. That matters, even if it doesn't give us an answer.
- **SOPHIE:** Right.
- **SOPHIE:** I keep wanting it to say more than it does.
- **PLAYER (extra tap + Send):** Wanting it to be clearer doesn't make it clearer.
- *[Pause 2.5s]*
- **SOPHIE:** I should put that on a sticky note.
- **SOPHIE:** Preferably where I can see it when I start spiralling.
- *[Effect: Sophie trust +2]*

**CONVERGE**

**SOPHIE:** When it first started going around, people kept sending it to me.

**SOPHIE:** As if I hadn't seen it.

**SOPHIE:** My phone would light up and I'd think—

*[Typing stops. 2.9s silence.]*

**SOPHIE:** Sorry.

**SOPHIE:** For half a second I'd think it might be Daniel.

*[Pause 3.0s]*

### CHOICE `OPEN-S04-C04` — A human moment

**A — PLAYER:** That must be exhausting.
- **SOPHIE:** It is.
- **SOPHIE:** I don't remember the last time I heard a notification and wasn't disappointed.

**B — PLAYER:** Do you want to take a break from this?
- **SOPHIE:** Maybe after we finish talking.
- **SOPHIE:** I'm doing better than yesterday. I think.

**C — PLAYER:** You don't have to apologize to me.
- **SOPHIE:** I know.
- **SOPHIE:** Apparently apologizing is my main personality trait now.
- **SOPHIE:** Sorry. See? 😅

**D — PLAYER:** Has anyone actually spoken to the reporter?
- **SOPHIE:** I don't know.
- **SOPHIE:** Not that anyone's told me.
- **SOPHIE:** I haven't contacted her.

**CONVERGE**

**SOPHIE:** Daniel used to make fun of newspaper headlines.

**SOPHIE:** Not in a mean way.

**SOPHIE:** He'd read one out and then go, "Well, that's not what the article says."

*[1.8s]*

**SOPHIE:** He'd have a field day with this one.

**SOPHIE:** And then he'd insist I read the whole thing while I was trying to eat breakfast.

### CHOICE `OPEN-S04-C05` — What can be taken from a headline?

**A — PLAYER:** The article confirms people are worried. Not what happened.
- **SOPHIE:** Yeah.
- **SOPHIE:** That's fair.

**B — PLAYER:** It mentions a report to the police.
- **SOPHIE:** We did report him missing.
- **SOPHIE:** But the newspaper doesn't know everything from that.
- **SOPHIE:** Neither do we.

**C — PLAYER:** Did Daniel ever talk about Axiom Recovery?
- **SOPHIE:** Sometimes.
- **SOPHIE:** Usually when something had annoyed him at work.
- **SOPHIE:** I don't want to pretend that means his job caused any of this.

**D — PLAYER:** Why does it say nobody knows where he was last seen?
- **SOPHIE:** Because there isn't a public account everyone agrees on.
- **SOPHIE:** We're still trying to understand the timeline ourselves.
- **SOPHIE:** I won't guess at it for you.

**E ★ — PLAYER:** I see three different things: what the article says, what the family has been told, and what we can actually verify.
- *[2.5s]*
- **SOPHIE:** Three different things.
- **SOPHIE:** That sounds so obvious when you put it like that.
- **PLAYER (extra tap + Send):** Obvious doesn't mean easy when it's someone you love.
- **SOPHIE:** No.
- **SOPHIE:** It really doesn't.
- *[Effect: Sophie trust +2]*

**CONVERGE**

*[Pause 2.4s]*

**SOPHIE:** There's one small thing about the page that bothers me.

**SOPHIE:** Not because I think it's some giant secret.

**SOPHIE:** I just keep noticing it.

**SOPHIE:** It says "Updated: Yesterday."

**SOPHIE:** I don't remember exactly what it said before.

### CHOICE `OPEN-S04-C06` — The update label

**A — PLAYER:** That could be a normal correction.
- **SOPHIE:** I know.
- **SOPHIE:** News sites correct things all the time.

**B — PLAYER:** Does it say what was updated?
- **SOPHIE:** Not where I could find it.
- **SOPHIE:** Maybe there's a note somewhere I missed.

**C — PLAYER:** Are you sure it changed?
- **SOPHIE:** I'm sure the page *says* it was updated.
- **SOPHIE:** I'm not sure what changed in the text.
- **SOPHIE:** There's a difference.

**D — PLAYER:** Maybe you remember an earlier version.
- **SOPHIE:** Maybe.
- **SOPHIE:** But I'm not going to trust my memory over something I can actually check.

**E ★ — PLAYER:** An update time tells us a revision happened on the site. It doesn't tell us what was edited, or why.
- **SOPHIE:** Exactly.
- **SOPHIE:** That's the bit I keep forgetting when I'm upset.
- **PLAYER (extra tap + Send):** So we don't call it suspicious yet.
- **SOPHIE:** Not without something to compare.
- *[Effect: Sophie trust +2]*

**CONVERGE**

**SOPHIE:** I'm not asking you to investigate the newspaper.

**SOPHIE:** That would be a pretty strange thing to ask someone I met through a contact list.

*[2.0s]*

**SOPHIE:** Actually, this whole conversation is a pretty strange thing to ask someone I met through a contact list.

**SOPHIE:** I'm setting new personal records here.

---

# 4 — GROUP INTERRUPT: AN ORDINARY BOUNDARY

*[Schedule exactly one group notification after C06 convergence, but do not open the group automatically. The group still contains Sophie, Maya and the player; Lucas has LEFT. Eli's membership, if any, must use the actual existing roster.]*

**NOTIFICATION — FIND DANIEL · MAYA:** Can we please stop sharing the article in other chats for a while?

*[Player may remain in Sophie's conversation and choose `READ GROUP LATER`, or tap the notification/open FIND DANIEL manually. To keep the scene core self-contained, the group beat is optional and does not gate Archive activation; if deferred, it remains unread and cannot fire twice. The mainline C08 continues after the group is dismissed or skipped.]*

**IF PLAYER OPENS FIND DANIEL:**

**MAYA:** Can we please stop sharing the article in other chats for a while?

**MAYA:** People keep asking me if every sentence in it is true.

**MAYA:** I wasn't interviewed for it.

**SOPHIE:** I know.

**SOPHIE:** Sorry. I sent it to someone because I wanted another opinion.

**MAYA:** That's different from posting it everywhere.

**MAYA:** Just please don't turn it into a debate with strangers.

### CHOICE `OPEN-S04-C07` — Group response (only if group thread opened)

**A — PLAYER:** I read it. It doesn't actually say they know what happened.
- **MAYA:** That's what worries me.
- **MAYA:** People are treating a cautious article like a complete explanation.

**B — PLAYER:** I haven't shared it publicly.
- **MAYA:** Thanks.
- **MAYA:** I wasn't accusing you, by the way.
- **MAYA:** This has just been a lot.
- *[Effect: Maya trust +1]*

**C — PLAYER:** It's public. People are going to discuss it.
- **MAYA:** I know.
- **MAYA:** I'm not asking the whole internet to stop.
- **MAYA:** I'm asking the people in this group to be careful.

**D — PLAYER:** Would you rather nobody talked about Daniel?
- *[2.2s]*
- **MAYA:** Of course not.
- **MAYA:** I just don't want another rumour for his family to deal with.

**E ★ — PLAYER:** The article isn't the same thing as a witness statement. We should be clear about that when we share it.
- **MAYA:** Thank you.
- **MAYA:** That's what I was trying to say.
- **SOPHIE:** And what I've been trying to remember.
- **MAYA:** Then maybe we're making progress.
- *[Effect: Maya trust +2; Sophie trust +1]*

**GROUP CONVERGE**

*[Pause 2.5s]*

**MAYA:** Sorry if I sounded sharp.

**MAYA:** It's been a long couple of days.

**SOPHIE:** You don't need to explain.

**MAYA:** I probably do, occasionally.

**SOPHIE:** Now you're sounding like me.

**MAYA:** That's concerning.

*[Silence 2.4s. No Lucas message; player manually returns to Sophie or Browser. No fake "Lucas online" notification.]*

**IF PLAYER READS GROUP LATER:**
- No `PLAYER` chat bubble is fabricated; `OPEN-S04-C07` is not required to complete Scene 04.
- Maya's message persists unread and can be answered later only if the corresponding optional reply remains authored; no deadlock.

# 5 — BACK TO SOPHIE: THE THING SHE DIDN'T KEEP

*[On return to Sophie, or after group skip. If player had not yet shared the unknown message, Sophie never raises it; if disclosed in Scene 03, she may be more cautious in a conditional one-line callback without speculating about the sender.]*

**SOPHIE (if player opened group):** Sorry about the group.

**SOPHIE (if player did not open group):** Maya's had a rough day.

**SOPHIE:** She's been fielding a lot of messages.

**SOPHIE:** She's trying to keep people from getting carried away.

**SOPHIE:** Sometimes I think she forgets she gets to be upset too.

*[Pause 2.1s]*

**SOPHIE:** I've been staring at that update label again.

**SOPHIE:** Which is exactly what she would tell me not to do.

### CHOICE `OPEN-S04-C08` — Before and after

**A — PLAYER:** Do you have a screenshot from when it was published?
- **SOPHIE:** Not that I know of.
- **SOPHIE:** I never thought to save one.

**B — PLAYER:** What do you remember about the earlier article?
- **SOPHIE:** Honestly? Mostly being sick with worry when I read it.
- **SOPHIE:** I don't trust myself to quote it word for word.

**C — PLAYER:** Maybe the update was just spelling.
- **SOPHIE:** Could be.
- **SOPHIE:** I'd love it if the explanation was boring.

**D — PLAYER:** We should keep the current article separate from what you remember.
- **SOPHIE:** Yeah.
- **SOPHIE:** The page is the page. My memory is something else.
- *[Effect: Sophie trust +1]*

**CONVERGE**

**SOPHIE:** I almost wish I hadn't brought up the update.

**SOPHIE:** Now it sounds like I'm accusing a newspaper of something.

**SOPHIE:** I'm not.

**SOPHIE:** I just wish I had a way to stop guessing.

*[Pause 3.0s]*

**SOPHIE:** It's strange how quickly you start wishing you'd saved every little thing.

**SOPHIE:** Even the things you were sure you'd never need again.

### CHOICE `OPEN-S04-C09` — Staying grounded

**A — PLAYER:** That's understandable.
- **SOPHIE:** Yeah.
- **SOPHIE:** I just don't want to make my own memories into evidence.

**B — PLAYER:** We might find another copy someday.
- **SOPHIE:** Maybe.
- **SOPHIE:** But if we do, we'd still need to know what it actually is.

**C — PLAYER:** You can't keep everything.
- **SOPHIE:** I know.
- **SOPHIE:** Daniel would tell me the same thing.
- **SOPHIE:** Then he'd keep twelve backups of an old shopping list.

**D — PLAYER:** We at least have the version that's public now.
- **SOPHIE:** That's true.
- **SOPHIE:** One thing we can actually point to.

**E ★ — PLAYER:** You don't need to remember the old wording to know the current wording. Let's start with what exists.
- *[Pause 2.7s]*
- **SOPHIE:** You sound annoyingly sensible.
- **SOPHIE:** Don't tell Maya. She'll want you in charge of the group.
- **PLAYER (extra tap + Send):** I'd like to survive my second day first.
- **SOPHIE:** Fair. 😄
- *[Effect: Sophie affinity +1, trust +1]*

**CONVERGE**

*[Pause 2.5s. The player is allowed to leave the chat naturally; no forced urgency.]*

**SOPHIE:** I'm going to get something to eat.

**SOPHIE:** Before Maya decides to supervise me personally.

**SOPHIE:** We can talk later.

**SOPHIE:** And hey...

**SOPHIE:** Thanks for actually reading it.

*[Sophie becomes away/offline when this message is delivered. She cannot react live to the Archive app.]*

---

# 6 — OPTIONAL SECOND UNKNOWN SENDER HINT (PLAYER PRIVACY)

**Trigger:** Once `scene04_public_article_inspected=true` AND C09 convergence / Sophie's closing message have concluded. Do not interrupt an outstanding player choice. If `unknown_sender_blocked=true`, DO NOT deliver the new unknown message, and the core Archive route must work unchanged. If existing authoring intentionally reserves a different sender schedule, document the difference rather than duplicate a hint.

**NOTIFICATION — UNKNOWN NUMBER:** The version you're reading isn't the first.

*[If notification arrives while the player is in the Browser/other app, it is a regular notification. Nothing automatically opens. If unopened, it remains a message request; the plot does not assume the player saw it. Sender identity and motive remain UNKNOWN. Do not imply live surveillance, proof that the sender accessed the game device, or knowledge of the player's precise screen.]*

**IF PLAYER OPENS UNKNOWN NUMBER:**

**UNKNOWN NUMBER:** The version you're reading isn't the first.

*[If the first Scene 02 message is still unread, it remains above this one in the same thread. No sender replies to past questions are generated. If player did not read the earlier message, a non-blocked request can still show this second message; do not retroactively mark the first quote disclosed to Sophie.]*

### OPTIONAL CHOICE `OPEN-S04-UNKNOWN-01` — A sentence without a source

**A — PLAYER:** What version?
- *[Outgoing message sent only on explicit Send. No response. Save `scene04_sender_reply=version`.]*

**B — PLAYER:** Who are you?
- *[Outgoing message sent only on explicit Send. No response. Save `scene04_sender_reply=identity`.]*

**C — PLAYER:** How would you know?
- *[Outgoing message sent only on explicit Send. No response. Save `scene04_sender_reply=proof`.]*

**D — PLAYER:** Stop messaging me.
- *[Outgoing message sent only on explicit Send. No response. Save `scene04_sender_reply=boundary`.]*

**E — KEEP SILENT (UI, not Player message)**
- *[Record `scene04_sender_reply=ignored`. No bubble is sent.]*

**AFTER CHOICE:** The typing indicator must NOT appear for the unknown sender. No dramatic “Seen”, countdown, identity picture, location ping, hidden file attachment, access code or proof is given. `CLOSE THREAD` returns to normal phone navigation. Blocking may be done in standard thread controls and does not delete already received content. Unknown hint is never a core-scene completion requirement.

**IF PLAYER HAS ALREADY TOLD SOPHIE ABOUT SENDER 1 IN SCENE 03:**
- Sophie knows ONLY the earlier quote and the fact the player told her. She does not automatically learn this second hint.

**IF PLAYER NEVER DISCLOSED / NEVER READ SENDER 1:**
- No Sophie dialogue assumes it existed. An optional explicit disclosure of either quote can occur later only when the player chooses it and sends it.

---

# 7 — THE ARCHIVE: FIRST USABLE REFERENCE

*[After public article inspection AND after C09 convergence (the human conversation has concluded), queue exactly one subtle **Archive icon badge** and a normal local app notification if platform/game shell supports them. This is a simulated local recovered-data index event, not an outside service obtaining access to a news site. No real network call, spyware, device permission or “new system infection”.]*

**DEVICE NOTIFICATION — THE ARCHIVE:** 1 recovered index reference available.

*[Player must MANUALLY tap The Archive icon or notification. If the app was installed in onboarding and dormant, do not replay installation. If the repo's legacy save omitted installed state, migrate/repair the shell safely; do not run a second installation spectacle.]*

**THE ARCHIVE — HOME (prior to opening index):**

`THE ARCHIVE`  
`ACCESS: PARTIAL`  
`LOCAL INDEX: 1 MATCH`  
`RECOVERED RECORDS: LIMITED`  

`REFERENCE FOUND`  
`[ OPEN INDEX ]`  

*[If player closes The Archive, badge remains. No automatic scene completion. Prior locked Archive records remain locked; Scene 05 content must not open here.]*

**PLAYER TAPS OPEN INDEX**

**INDEX CARD — `ARC-IDX-GB-041`**

`TITLE MATCH`  
`Questions Remain After Greyhaven Data Specialist Stops Responding`  

`PUBLISHED REFERENCE`  
`Greyhaven Bulletin — Public article GB-ARTICLE-001`  

`RECOVERED ENTRY`  
`TYPE: SNAPSHOT INDEX`  
`SOURCE: UNKNOWN`  
`CAPTURE TIME: NOT ESTABLISHED`  
`AUTHOR: NOT ESTABLISHED`  
`VERIFIED ORIGINAL: NO`  
`CONTENT PREVIEW: UNAVAILABLE IN THIS INDEX VIEW`  

`A saved reference may point to an earlier or different version. This record alone cannot establish sequence, authenticity, or who created it.`

`[ ACKNOWLEDGE LIMITATIONS ]`   `[ CLOSE ]`

*[This view must not show an article diff, deleted sentence, file author, shadowed filename contents, source operator, first editor or a confirmed chronological order. The presence of an index entry is an observation, not proof of misconduct.]*

### CHOICE `OPEN-S04-C10` — First impression of the index (UI choice, not a chat message)

**A — SELECT:** It's another copy of the article.
- **ARCHIVE SYSTEM:** Not confirmed. An index entry exists; its referenced content has not been reviewed.

**B — SELECT:** It's a reference that might be connected.
- **ARCHIVE SYSTEM:** Consistent with current metadata. Connection and provenance remain unverified.

**C — SELECT:** Someone changed the news report.
- **ARCHIVE SYSTEM:** Not established. No content comparison is available in this index view.

**D — SELECT:** There isn't enough information yet.
- **ARCHIVE SYSTEM:** Correct. Additional examination is required.

**CONVERGE**

`INDEX STATUS: OPENED`  
`ORIGIN: UNVERIFIED`  
`VIEW PUBLIC ARTICLE` (returns to existing public item)  
`ACKNOWLEDGE LIMITATIONS` (manual tap required)  

*[Player taps ACKNOWLEDGE LIMITATIONS. Set `scene04_archive_index_acknowledged=true` once. Do not auto-apply on mount.]*

### CHOICE `OPEN-S04-C11` — What should be saved? (UI choice)

**A — SELECT:** Save the public article and this index entry separately.
- **ARCHIVE SYSTEM:** Two sources recorded with distinct provenance labels.

**B — SELECT:** Save the index entry only. I can return to the article later.
- **ARCHIVE SYSTEM:** Index reference saved. Public article remains accessible for later review.

**C — SELECT:** Save the public article only for now.
- **ARCHIVE SYSTEM:** Public article saved. Index remains available; not discarded.

**D — SELECT:** Don't save either item yet.
- **ARCHIVE SYSTEM:** No personal evidence note was created. The inspected reference remains accessible.

**CONVERGE**

*[Every branch persists observation/inspection receipts necessary for continuing Scene 05. Optional save/bookmark choices may differ; they do NOT erase the index or soft-lock progression. The artifact exists independent of how the player chose to classify it.]*

**ARCHIVE SYSTEM — final status:**

`PUBLIC ARTICLE: INSPECTED`  
`INDEX REFERENCE: INSPECTED`  
`PROVENANCE: UNVERIFIED`  
`NEXT REVIEW AVAILABLE: VERSION HISTORY`  

`[ RETURN TO DEVICE ]`   `[ REVIEW VERSION HISTORY ]`

*[Do NOT immediately open comparison on `NEXT REVIEW AVAILABLE`. `REVIEW VERSION HISTORY` is the Scene 05 manual entry action, unlocked only when Scene 04 completes.]*

---

# 8 — HUMAN FOLLOW-UP: DON'T TURN SOPHIE INTO A QUEST GIVER

*[Scene 04's emotional resolution occurs in Sophie's private chat after Archive index acknowledgement. The app does NOT send Sophie a message. Sophie is not notified of it. After ordinary character pacing, she sends a final short check-in, regardless of whether the player opened Unknown Sender's message. This is a new one-shot event delivered only after the player has exited/paused Archive and is not in a pending choice.]*

**NOTIFICATION — SOPHIE:** One more thing, if you're still awake.

*[Player opens her chat manually; not an automatic teleport.]*

**SOPHIE:** Hey.

**SOPHIE:** I promise I don't plan to send you a new article every hour.

**SOPHIE:** That would be a pretty terrible way to make friends.

*[2.0s]*

**SOPHIE:** I've just been thinking about something you said.

**SOPHIE:** About not treating guesses like answers.

*[This last line can be generalized to “About how hard it is to know what to believe” if a prior choice did not explicitly say the quoted advice. Do NOT attribute unchosen player dialogue to them.]*

### CHOICE `OPEN-S04-C12` — What the page did to Sophie

**A — PLAYER:** Has it helped to talk about the article?
- **SOPHIE:** A bit.
- **SOPHIE:** At least I can read it without feeling like every sentence is aimed at me.

**B — PLAYER:** You don't have to make sense of it all today.
- **SOPHIE:** Good.
- **SOPHIE:** Because I have a feeling I won't.

**C — PLAYER:** Did Maya get something to eat too?
- **SOPHIE:** That's the question, isn't it?
- **SOPHIE:** I'm going to ask her when she stops pretending she doesn't need looking after.

**D — PLAYER:** What are you still worried about?
- **SOPHIE:** The same thing I've been worried about since you first answered.
- **SOPHIE:** Not knowing where Daniel is.
- **SOPHIE:** An article hasn't changed that.

**CONVERGE**

**SOPHIE:** I'm not expecting you to come back with answers.

**SOPHIE:** I hope you know that.

**SOPHIE:** People hear "help" and think they have to fix everything.

**SOPHIE:** I don't even know what fixing this would look like.

### CHOICE `OPEN-S04-C13` — What, if anything, should Sophie know about the new index?

*[At this point the player has opened Archive index. The following options are player-controlled. They DO NOT assume Sophie knows the application or its findings. Only explicitly sent lines may update Sophie's knowledge.]*

**A — PLAYER:** I found a saved reference that may relate to the article.
- **SOPHIE:** A reference where?
- **PLAYER (extra tap + Send):** In a recovered index on this device. I haven't verified its source.
- *[Pause 2.0s]*
- **SOPHIE:** Okay.
- **SOPHIE:** So we don't really know what it is yet.
- **SOPHIE:** Thanks for telling me without making it sound like proof.
- *[Set `sophie_knows_archive_index_claim=true` with exact attributed quote, NOT verified provenance. Effect Sophie trust +1.]*

**B — PLAYER:** There's another lead, but I need to look at it properly first.
- **SOPHIE:** That's fine.
- **SOPHIE:** You don't owe me instant updates.
- *[Set `sophie_knows_player_has_unspecified_lead=true` only. She does not learn Archive exists.]*

**C — PLAYER:** I'd rather not say anything until I know what it means.
- **SOPHIE:** Honestly, that sounds sensible.
- **SOPHIE:** I wish more people did that.
- *[No Sophie Archive or sender knowledge.]*

**D — PLAYER:** I don't want you getting your hopes up over a file I haven't checked.
- **SOPHIE:** Thank you.
- **SOPHIE:** I know you mean well.
- **SOPHIE:** I'd rather hear "I don't know" than something that's certain for five minutes.
- *[No Sophie Archive or sender knowledge.]*

**E ★ — PLAYER:** I came across a record index that seems related to that public page. It doesn't prove an earlier article or who saved it. I'd rather verify it before calling it evidence.
- *[3.0s]*
- **SOPHIE:** ...
- **SOPHIE:** I won't pretend I understand what a record index is.
- **SOPHIE:** But I understand the last part.
- **PLAYER (extra tap + Send):** I don't want to give you a false answer.
- **SOPHIE:** Neither do I.
- **SOPHIE:** Thank you for being careful with me.
- *[Set `sophie_knows_archive_index_claim=true` with qualifier. Effect Sophie trust +2.]*

**CONVERGE**

*[Pause 2.5s]*

**SOPHIE:** I used to hate it when Daniel said, "I'll explain later."

**SOPHIE:** I told you about that, didn't I?

**SOPHIE:** I always thought he was just avoiding the conversation.

**SOPHIE:** Maybe sometimes he was.

**SOPHIE:** But sometimes...

*[Typing starts, disappears. Silence 3.4s.]*

**SOPHIE:** Never mind.

**SOPHIE:** I'm not even sure what I was trying to say.

### CHOICE `OPEN-S04-C14` — A conversation that stays human

**A — PLAYER:** You miss him.
- **SOPHIE:** Yeah.
- **SOPHIE:** I really do.

**B — PLAYER:** You can tell me when you've figured out what you meant.
- **SOPHIE:** That's a surprisingly generous offer.
- **SOPHIE:** It might take me a while.

**C — PLAYER:** It's okay if there's no point to the story.
- **SOPHIE:** Funny.
- **SOPHIE:** Daniel used to tell me that when I rambled.
- **SOPHIE:** Usually right before I threw a cushion at him.

**D — PLAYER:** Maybe you should save that thought for another day.
- **SOPHIE:** Maybe.
- **SOPHIE:** I think I've used up my brain for today.

**E ★ — PLAYER:** You don't have to turn every memory into a clue, Sophie. You can just miss your brother.
- *[3.2s]*
- **SOPHIE:** ...
- **SOPHIE:** I hadn't really thought about it that way.
- **SOPHIE:** I've been turning everything about him into something to check.
- **PLAYER (extra tap + Send):** He's still your brother when there's nothing to investigate.
- *[3.0s]*
- **SOPHIE:** Thank you.
- **SOPHIE:** I needed that more than I expected.
- *[Effect: Sophie trust +2, affinity +2]*

**CONVERGE**

**SOPHIE:** Sorry. That got a little heavy.

**SOPHIE:** Again.

**SOPHIE:** I swear I used to be fun at parties.

**SOPHIE:** At least I think I was.

### CHOICE `OPEN-S04-C15` — Gentle humor without deflection

**A — PLAYER:** I'm sure you still are.
- **SOPHIE:** You haven't seen me try to dance.
- **SOPHIE:** Let's not get ahead of ourselves.

**B — PLAYER:** You don't have to be entertaining.
- **SOPHIE:** I know.
- **SOPHIE:** But a laugh would be nice now and then.

**C — PLAYER:** I think the cake story was pretty good.
- **SOPHIE:** The cake story was a tragedy.
- **SOPHIE:** A delicious tragedy, but still.

**D — PLAYER:** You sound like you need to put your phone down.
- **SOPHIE:** Yes, Maya.
- **SOPHIE:** Oh. Sorry. Habit. 😅

**CONVERGE**

*[Pause 2.5s]*

**SOPHIE:** Okay.

**SOPHIE:** I really am going this time.

**SOPHIE:** If I don't, Maya will start threatening to come over with leftovers.

**SOPHIE:** Actually, that might not be so bad.

**SOPHIE:** Don't tell her I said that.

### CHOICE `OPEN-S04-C16` — End the conversation, not the mystery

**A — PLAYER:** I won't. Talk later.
- **SOPHIE:** Talk later.

**B — PLAYER:** Take care of yourself.
- **SOPHIE:** You too.

**C — PLAYER:** Let me know if you hear from Daniel.
- *[Pause 2.3s]*
- **SOPHIE:** You'll be one of the first to know.
- **SOPHIE:** If you're okay with that.

**D — PLAYER:** I may need to check something else about the article.
- **SOPHIE:** Okay.
- **SOPHIE:** Just don't feel like you have to do everything tonight.

**E ★ — PLAYER:** If Maya brings leftovers, accept them. And then both of you take a break.
- **SOPHIE:** I see what you're doing.
- **SOPHIE:** Building an alliance with Maya behind my back.
- **PLAYER (extra tap + Send):** It's for a good cause.
- **SOPHIE:** Fine.
- **SOPHIE:** But you can explain that to her when she starts making schedules for us all. 😄
- *[Effect: Sophie affinity +2]*

**CONVERGE**

*[Sophie typing 1.5s, then one last message.]*

**SOPHIE:** Thank you.

**SOPHIE:** For reading the whole thing.

*[Pause 2.0s]*

**SOPHIE:** Goodnight.

**SYSTEM:** Sophie is offline.

*[Do not pop Scene 05 into the player's face. Leave the device home usable. The Archive app icon now has a quiet available `VERSION HISTORY` interaction.]*

---

# 9 — SCENE END CARD / HANDOFF (NOT NPC DIALOGUE)

**ARCHIVE STATUS AFTER SCENE 04**

`GB-ARTICLE-001 — PUBLIC COPY: VIEWED`  
`ARC-IDX-GB-041 — RECOVERED INDEX: INSPECTED`  
`CONTENT COMPARISON: NOT STARTED`  
`SOURCE AUTHENTICITY: UNVERIFIED`  

`VERSION HISTORY: AVAILABLE`  

**[ REVIEW VERSION HISTORY ]** → when player deliberately taps, begin **Scene 05 — AN OLDER COPY**.  
**[ RETURN TO DEVICE ]** → remain on phone; can return later without losing progress.

**DO NOT:** auto-open the older copy; auto-create the missing-line observation; auto-contact Nora; auto-prove a timestamp; auto-assign an editor; auto-conclude whether Daniel is alive/dead or whether the unidentified sender is truthful.

---

# 10 — STATE, KNOWLEDGE, EVIDENCE, AND ID INTEGRITY

## Stable story IDs

- Scene: `chapter_01_scene_04_public_story` (map to existing stable internal scene ID if one exists; do not create conflicting duplicates).
- Choices: `OPEN-S04-C01`..`OPEN-S04-C16`, plus `OPEN-S04-UNKNOWN-01` optional.
- Browser article: `GB-ARTICLE-001`; evidence receipt: `EV-PUBLIC-GB-001`.
- Archive index: `ARC-IDX-GB-041`; evidence receipt: `EV-INDEX-GB-041` if player saves it.
- Event: `scene04_public_article_lead` once; `scene04_group_article_boundary` once; `scene04_sender_version_hint` at most once and only if not blocked; `scene04_archive_index_available` once; `scene04_sophie_followup` once.
- Handoff: `scene05_version_history_available=true` only when Scene 04 actually completed.

## Progression rules

`scene03_completed`  
→ Sophie delayed article notification delivered (NOT article opened)  
→ player opens private message and taps public link  
→ article displayed and explicitly read/acknowledged  
→ Sophie reaction dialogue (C03–C09; optional C07 group)  
→ optional Unknown Number hint (never gates)  
→ Archive index notification and **manual** app open + index inspect + acknowledge  
→ C10 & C11 choices/receipt  
→ Sophie's final private conversation (C12–C16)  
→ `scene04_completed=true`  
→ player action on `REVIEW VERSION HISTORY` launches Scene 05.

`C01` and `C02` occur before opening the article. **C03–C06** occur after the article has actually been read. **C07** may be skipped/deferred. **C08–C09** resume in Sophie thread. **C10–C11** are Archive UI choices after manual open; **C12–C16** are the final private conversation after index acknowledgement. The optional Unknown Sender interaction may be read at a later point without blocking C10.

## Required knowledge boundaries

- Sophie already knows: Daniel is her brother; the public article is circulating; an update label is displayed; her own worry. She does **not** know the Archive index by default, and she does not know the second sender hint unless the player explicitly shares it. If sender 1 was disclosed in Scene 03, that remains only a report of a private message, not a sender identity.
- Maya knows the public article circulates and she is cautious about the group's handling. She does **not** know the player's private Archive finding, sender text or hidden choice.
- Lucas is no longer a group member. No unseen group messages from him here.
- Nora Vance is credited as the article's author, but there is no direct conversation with her until Scene 07.
- Eli is not suddenly summoned to authenticate records.
- Player knows only what they opened/read/chose. Browser articles are public text; Archive metadata are **recovered and unverified**; Sophie's memories and newspaper statements are **attributed claims**.
- The starred number from Scene 01 remains unresolved. No connection is established between that export and the article index merely because both exist in the story.

## Relationship effects

- Sophie's trust/affinity changes are small and explicitly authored on choices. No negative trust simply because player is skeptical, pauses, refuses to share or skips premium.
- Maya's group-choice rapport applies ONLY if the player sends a message in the optional group segment.
- All changes apply **once** and survive save/load through existing relationship reducers.
- `romance` is never advanced by this scene; friendly empathy is not an automatic romantic route.

## Archive lifecycle

- Before Scene 04: `installed_dormant` (preserve earlier install from device-reconstruction flow), usually `ACCESS: PARTIAL / No recovered records`.
- After article `MARK AS READ` AND C09 convergence: `first_record_available` and app icon badge may appear.
- After index opened and limitations acknowledged: `investigation_active` with only the indexed reference; content comparison remains for Scene 05.
- Never invent remote access, browser tracking, full recovery, Axiom login or malware behavior as an explanation for the index activation. It is fictional local data progression through existing game systems.

## Save / resume rules

- `scene04_article_link_delivered`, `scene04_article_opened`, `scene04_public_article_inspected` are separate persistent flags.
- Preserve the scroll position, article tooltip/bio status, exact choice cursor, all sent player bubbles, pending NPC lines, Archive index panel and selected UI classification.
- `scene04_archive_index_opened`, `scene04_archive_index_acknowledged`, `scene04_completed`, `scene05_version_history_available` are distinct flags.
- Reopening Browser, Archive or messages never replays article delivery, sender warning, “Sophie is offline” or the scene completion event.
- If Unknown Number is blocked, omit its second message and do not soft-lock the story. If opened late, the thread remains valid after Scene 04.
- Neither ignored notification nor premium availability can gate core investigation evidence.
- If the optional group chat is not opened, do NOT require `OPEN-S04-C07` to be selected before advancing C08.

# 11 — CODEX IMPLEMENTATION + TEST ACCEPTANCE

- [ ] Exact scene header `SCENE 04 — THE PUBLIC STORY` and Act II placement.
- [ ] Scene 03 text and choices untouched; Sophie only sends the promised article after Scene 03 completed.
- [ ] No NPC assumes an unknown quote, player name or Archive clue was shared without an actual Send.
- [ ] One public article with six complete paragraphs, Nora Vance byline and public attribution, shown in an internal Browser without real network.
- [ ] Original publish/update strings use coherent story-clock metadata; no real-life current date injected.
- [ ] Player must open and read/acknowledge public article to advance; no auto-open/no fake tap.
- [ ] Player may postpone link; scene resumes at same point, no duplicated message.
- [ ] Maya's optional group beat neither gates scene nor silently invites Lucas back.
- [ ] Optional second Unknown Number hint is delivered once, or never if blocked; no anonymous response/identity proof invented.
- [ ] Archive installed in onboarding remains installed. Activating record does not reinstall or show future evidence.
- [ ] Archive index exposes UNKNOWN provenance and NOT original verification, with no copy text/diff.
- [ ] Player manually opens, inspects and acknowledges index. Choice C10 never confuses belief with proof.
- [ ] Public evidence and recovered index remain distinct types with separately attributed confidence/claims.
- [ ] Optional save/skip source bookkeeping cannot block Scene 05.
- [ ] C12–C16 Sophie follow-up respects player disclosure. Sophie can't know Archive findings by magic.
- [ ] No Nora conversation until Scene 07; no missing-line text until Scene 06; no older copy body until Scene 05.
- [ ] Save/load works while message typing, deferred article view, after sender notification, within group optional, index panel and final goodbye.
- [ ] Autosscroll only when player at bottom; when reading earlier messages, show non-intrusive unread badge.
- [ ] All player replies, including ★ follow-ups and disclosure, require manual choose + Send.
- [ ] Run available tests, type check, lint and build; report genuine results. Do not mark tested if integration hasn't been run.

## NEXT AUTHORING TARGET

**SCENE 05 — AN OLDER COPY**: a manually invoked Version History view, inspection of a separately tagged recovered snapshot, a precise but not yet interpreted difference, and a credible person-to-person conversation about the limits of a comparison. Do not identify the missing line, revision editor, true author, or verified original earlier than their reserved scenes.
