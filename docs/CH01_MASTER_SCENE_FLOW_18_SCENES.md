> Superseded where it conflicts: the latest official implementation source places Unknown Sender in Scene 02, Nora’s retained page in Scene 08, Archive first investigation record in Scene 04, and the recovered post-verification claim in Scene 15. Scenes 04–18 now have playable structural previews. See [current implementation report](CH01_OFFICIAL_IMPLEMENTATION_REPORT.md). Earlier material below is retained as editorial history.

# Chapter 1 master scene flow — 18 scenes

Owner structural approval, 23 October 2026. Source: `sources/CH01_MASTER_18_SCENES.txt`. Scenes 04–18 below are approved outlines, not playable scripts. Their presence here or in the registry does not award knowledge, complete a scene or unlock an app. Target 3–4 hours remains an unmeasured playtest target.

Act I builds consent and personal stakes; Act II introduces public discrepancies and independent reporting; Act III separates recovered fragments from authenticated records; Act IV tests personal accounts against chronology; Act V earns a limited documentary conclusion and a role-status cliffhanger.



# ACT I — THE STRANGER

## SCENE 01 — A MESSAGE FROM SOPHIE

**Status:** Existing implemented scene  
**Characters:** Player, Sophie Mercer  
**Primary Surface:** Messages  
**Narrative Type:** First Contact / Character Introduction

### Opening

The Player unlocks a fictional smartphone.

The device initially functions like an ordinary phone.

After the established in-game delay, an unknown number sends a message.

The sender eventually identifies herself as Sophie Mercer.

She explains Daniel's disappearance and how the Player's phone number was found in Daniel's saved contacts.

### Narrative Objectives

- Establish the Player as an ordinary civilian.
- Introduce Sophie naturally.
- Make Daniel's disappearance emotionally relevant.
- Establish uncertainty about why the Player was contacted.
- Allow the Player to set personal boundaries.
- Introduce the concept of a selected codename.
- Build the first relationship with Sophie.

### Interaction Requirements

Preserve the current 14 main player choices and authored response branches.

All player responses require explicit selection and Send.

The Player's selected codename must not automatically become information known by Sophie.

Only an authored disclosure can grant that information to her.

Preserve the existing premium options, relationship changes and saved progress.

### Ending

Sophie invites the Player to join FIND DANIEL.

The Player may accept, defer or decline according to existing gameplay.

Scene 02 should begin only through the authorized JOIN GROUP action.

### Restrictions

Do not reveal the complete note.

Do not introduce The Archive prematurely.

Do not reveal who caused Daniel's disappearance.

Do not rewrite the existing conversation.

---

## SCENE 02 — THE UNINVITED GUEST

**Status:** Existing implemented scene  
**Characters:** Player, Sophie, Maya, Lucas  
**Primary Surface:** FIND DANIEL group chat  
**Narrative Type:** Group Introduction / Social Conflict

### Opening

The Player joins FIND DANIEL.

Sophie introduces the newcomer.

Maya and Lucas react to the decision.

Lucas is uncomfortable with an unknown person being brought into a private discussion concerning his missing friend.

### Narrative Objectives

- Establish group dynamics.
- Introduce Maya's and Lucas's distinct personalities.
- Create believable tension concerning privacy.
- Allow the Player to defend themselves, remain cautious or show empathy.
- Show Sophie struggling between desperation and responsibility.
- Demonstrate that not everyone trusts the Player.

### Interaction Requirements

Preserve all existing 13 main group choice points, their branches and authored follow-up messages.

Preserve:

- Individual NPC typing behavior.
- Maya's deleted-message events.
- Sophie's temporary offline period.
- Lucas's departure.
- Character-specific knowledge receipts.
- Relationship effects.
- Group message history.
- Save and reload behavior.

The active Scene 02 group is the Player, Sophie, Maya and Lucas.

Do not silently add Eli or Nora to this script.

The current code must be treated as the implementation baseline unless an explicit approved script later changes group membership.

### Ending

Lucas leaves FIND DANIEL.

Maya may go offline but remains a group member unless an explicit membership event removes her.

Sophie eventually contacts the Player privately.

Preserve the established handoff timing and manual chat-opening behavior.

---

## SCENE 03 — JUST BETWEEN US

**Status:** Existing implemented scene  
**Characters:** Player, Sophie  
**Primary Surface:** Private Messages  
**Narrative Type:** Emotional Development / Personal History

### Opening

Sophie sends the existing private message:

`Hey.`

The conversation continues only when the Player opens her thread.

### Narrative Objectives

- Explore Sophie's anxiety regarding Daniel.
- Introduce Daniel's relationship with Sophie.
- Establish Maya as Daniel's fiancée.
- Explain Lucas's longstanding friendship.
- Introduce Eli as a female colleague of Daniel.
- Establish Axiom Recovery where supported by the actual chosen dialogue.
- Develop Sophie's trust, affinity and suspicion.
- Allow the Player to remain emotionally distant without blocking progression.

### Existing Script

Preserve all 19 main choice points and their 86 response branches.

Maintain existing optional premium choices and follow-up Send requirements.

Do not automatically disclose every biographical fact on branches where Sophie has not said it.

### Mandatory Farewell Correction

The game must not assume the Player is playing at night.

Replace the final:

`Goodnight :)`

with:

`Goodbye.`

Also inspect other authored closing dialogue for inappropriate assumptions about real-world time.

Where necessary, replace time-dependent greetings with contextually equivalent, neutral wording.

Preserve the conversation's original emotional intention and player-choice consequences.

Do not rewrite unrelated dialogue.

### Ending

Sophie says:

`Goodbye.`

She becomes Offline.

Scene 03 is marked complete.

The Player returns to normal phone exploration.

No automatic Unknown Sender message, Archive installation or Chapter 2 start may occur merely because this scene ended.

### Next Scene Trigger

Scene 04 becomes available through an intentional Player action using the public information/search system.

---

# ACT II — THE FIRST CRACK

## SCENE 04 — THE PUBLIC STORY

**Proposed ID:** `ch01_sc04_the_public_story`  
**Characters:** Player; Daniel and Nora through public records  
**Primary Surface:** Browser / Search / Greyhaven Bulletin  
**Narrative Type:** Exploration / First Public Lead

### Opening

After Scene 03, the Player can use the fictional smartphone freely.

The Player begins searching for Daniel Mercer.

The search is Player-driven rather than initiated by an omniscient system prompt.

A public Greyhaven Bulletin report about Daniel's disappearance is discoverable.

The article introduces relevant public chronology and historical references involving Bus 4.

Nora Vance appears as the article's reporter.

### Key Gameplay

- Search Daniel Mercer's name.
- Open a public report.
- Examine its date, source and author.
- Separate public facts from speculation.
- Identify a link to an archived historical record.

### Player Knowledge

The Player learns that Daniel's disappearance has a public record.

The public report does not establish the cause of his disappearance.

### Exit Condition

The Player discovers an older archived document reference.

### Narrative Hook

Why would a missing-person report connect to records from several years earlier?

---

## SCENE 05 — AN OLDER COPY

**Proposed ID:** `ch01_sc05_an_older_copy`  
**Characters:** Player  
**Primary Surface:** Browser / Documents / Case Board  
**Narrative Type:** Investigation Setup

### Opening

The Player follows a credible public source link and obtains an older version of a historical document.

A more recent public version is also available.

Both versions appear related to the same historical incident.

### Gameplay

- Open the older version.
- Inspect document title and version information.
- Locate the corresponding current public copy.
- Save both sources for comparison.
- Review the limitation of an archived preview versus an authenticated original.

### Evidence

Preserve existing historical evidence concepts for the older and current Bus 4 documents.

Use canonical evidence identifiers if already established in the repository.

Do not reuse a pre-existing evidence ID for a different artifact.

### Exit Condition

Both versions are accessible to the comparison interface.

### Hook

A document that should describe the same event appears to contain different details.

---

## SCENE 06 — THE MISSING LINE

**Proposed ID:** `ch01_sc06_the_missing_line`  
**Characters:** Player  
**Primary Surface:** Document Comparison / Case Board  
**Narrative Type:** First Major Puzzle

### Opening

The Player examines the two document versions side by side.

One historical detail differs between them.

### Investigation Mechanics

Allow the Player to:

- Zoom documents.
- Compare selected sections.
- Mark an inconsistent field.
- Inspect source and version metadata.
- Save a comparison observation.
- Reconsider an incorrect conclusion.

The difference must come from actual authored documents rather than randomly generated values.

Where consistent with existing canon, preserve the discrepancy involving the Bus 4 escort record and June Ellis.

### Key Learning

A visible difference is not proof of deliberate falsification.

### Exit Condition

The Player correctly identifies the discrepancy and records it as an observed lead.

### Hook

Who changed the information, and why?

---

## SCENE 07 — THE WOMAN BEHIND THE BYLINE

**Proposed ID:** `ch01_sc07_the_woman_behind_the_byline`  
**Characters:** Player, Nora Vance  
**Primary Surface:** Bulletin / Messages or verified return inbox  
**Narrative Type:** New Character Introduction

### Opening

The Player finds Nora Vance's professional contact route through the Bulletin report.

Contact must occur through a believable reporting channel.

Do not make Nora inexplicably know the Player's private number.

### Nora's Personality

Nora is observant, professional, skeptical and careful about source confidentiality.

She does not automatically trust a new contact.

### Narrative Objectives

- Establish Nora's professional role.
- Introduce journalism and source verification.
- Explain why a public document difference requires corroboration.
- Allow the Player to share a limited observed discrepancy.
- Preserve Nora's independence from FIND DANIEL.

### Interaction Design

The future full script should support different approaches: polite, skeptical, cautious and direct.

Do not script the exact responses in this task.

Nora receives only information actually sent by the Player.

### Exit Condition

A credible reporting contact is established, or a narrower public-record route remains available.

### Hook

The discrepancy deserves investigation, but the Player lacks access to a verified original.

---

# ACT III — WHAT DANIEL LEFT BEHIND

## SCENE 08 — THE PAGE SHE KEPT

**Proposed ID:** `ch01_sc08_the_page_she_kept`  
**Characters:** Player, Sophie  
**Primary Surface:** Messages / Photo Viewer  
**Narrative Type:** Emotional Callback / Evidence Discovery

### Opening

Sophie contacts the Player again after the appropriate narrative transition.

The interaction reflects previous conversations and whether the Player has disclosed information to her.

Sophie has reconsidered a damaged page associated with Daniel.

### Narrative Development

The damaged page contains surviving text fragments associated with:

`after verification`

`newest copy`

`7-14`

Any additional wording must come from approved note assets or later authorized scene writing.

### Gameplay

- Open the image.
- Zoom into relevant sections.
- Inspect legibility limits.
- Save a source-limited note.
- Ask Sophie about its origin.
- Choose whether to mention the public document discrepancy.

### Important Restrictions

Do not present the note as independently authenticated.

Do not solve the meaning of `7-14`.

Do not make Sophie know public discoveries unless the Player has disclosed them.

### Exit Condition

The Player has inspected the note and recorded its surviving clues.

### Hook

Daniel appeared concerned about the reliability of a newer copy.

---

## SCENE 09 — UNKNOWN SOURCE

**Proposed ID:** `ch01_sc09_unknown_source`  
**Characters:** Player; unidentified source  
**Primary Surface:** Notifications / Unknown Sender / Recovery Request  
**Narrative Type:** Mystery Escalation / Access Decision

### Opening

An unfamiliar recovery-related notification or message appears through a grounded fictional in-game delivery mechanism.

The interface identifies the source as unknown or unverified.

This is the first meaningful Unknown Sender encounter in the proposed 18-scene structure.

### Distinguish Two Concepts

**Unknown Sender:** The apparent origin of the communication or request.

**THE ARCHIVE:** The software or recovered-data interface the Player may later access.

The game must not establish that Unknown Sender created The Archive, knows Daniel personally or is responsible for his disappearance.

Those matters remain unresolved.

### Narrative Objectives

- Create uncertainty about the recovered connection.
- Give the Player a meaningful access decision.
- Introduce realistic security and privacy concerns.
- Avoid portraying suspicious access as inherently trustworthy.
- Establish that the recovery request may not be authentic.

### Gameplay Requirements

The Player may:

- Inspect the sender information.
- Examine the recovery notice.
- Review access scope.
- Defer the request.
- Revisit it later.
- Explicitly authorize the simulated reconstruction.

Do not force consent to proceed with public investigation content.

### Unknown Sender Restrictions

Do not invent a detailed two-way relationship with Unknown Sender.

Do not reveal identity, motive or technical authority.

Any future direct messaging must be separately authored.

### Exit Condition

The Player explicitly approves access or retains a persistent pending request while continuing eligible content.

### Hook

Someone or something has offered access to Daniel's recovered digital records.

But the source remains unknown.

---

## SCENE 10 — A LIFE IN FRAGMENTS

**Proposed ID:** `ch01_sc10_a_life_in_fragments`  
**Characters:** Player; Daniel through recovered records  
**Primary Surface:** THE ARCHIVE / Read-Only Device Mirror  
**Narrative Type:** Digital Exploration

### Opening

After an authorized recovery sequence, The Archive becomes accessible.

The simulated process may show:

Connecting  
Validating reference  
Restoring available records  
Recovery complete

The Archive app becomes available on the fictional phone Home screen.

### Main Gameplay

The Player explores recovered digital surfaces such as:

- Messages
- Mail
- Photos
- Notes
- Files
- Calls
- Contacts
- Browser
- Maps
- Archive Index
- Protected content

Use the existing mirror and puzzle systems where suitable.

### Content Direction

Not every item should contain a major clue.

Include ordinary contextual material that makes Daniel feel like a real person.

However, ordinary content must not expose protected story revelations.

### Locked Content

Preserve existing optional note and hidden-album puzzles.

Do not change established password answers or evidence rewards without explicit authorization.

### Restrictions

The mirror is a fictional, incomplete, read-only reconstruction.

It cannot send messages as Daniel.

It does not provide real device access.

It does not automatically prove any record authentic.

### Exit Condition

The Player discovers enough relevant ordinary material to identify the Archive Index as worthy of inspection.

Allow further optional exploration.

---

## SCENE 11 — FOURTEEN / THIRTEEN

**Proposed ID:** `ch01_sc11_fourteen_thirteen`  
**Characters:** Player  
**Primary Surface:** Archive Index / Notes / Evidence Viewer  
**Narrative Type:** Core Missing Entry Puzzle

### Opening

The Player examines the recovered Archive Index report.

The available information shows:

Reported signed count: 14  
Visible entries: 13  
Available deletion-log entries: 0

### Investigation Requirements

Require the Player to inspect both the relevant ordinary note and Index report before making the core comparison.

The Player should understand what each count represents.

### Possible Hypotheses

- An entry was removed.
- A view or copy is incomplete.
- The index was changed.
- The reported signed count is incorrect.
- Recovery omitted a record.

These are possibilities, not established truths.

### Evidence Rule

The conclusion must remain:

**UNVERIFIED INDEX DISCREPANCY**

The Player cannot conclude deliberate deletion or identify a culprit.

### Exit Condition

The discrepancy is correctly recorded in the Case Board.

### Hook

What happened between the signed count and the visible index?

---

## SCENE 12 — THE TECHNICIAN'S WARNING

**Proposed ID:** `ch01_sc12_the_technicians_warning`  
**Characters:** Player, Eli Ward; Sophie where required for introduction  
**Primary Surface:** Contacts / Private Messages  
**Narrative Type:** Technical Explanation / Character Introduction

### Opening

Sophie provides an appropriate reason and contact route for Eli Ward.

Eli is a female colleague of Daniel at Axiom Recovery.

The Player must not receive an unexplained direct message from Eli before contact authorization or introduction.

### Eli's Personality

Intelligent, technically competent, cautious, observant and human.

She may be helpful without being omniscient.

### Narrative Objectives

- Establish Eli's connection to Daniel.
- Explain incomplete metadata.
- Distinguish recoverable data from verified records.
- Establish technical limitations.
- Allow questions about the missing index entry.

### Gameplay

The Player may ask Eli about:

- The meaning of an index count.
- Damaged record metadata.
- Partial backups.
- Revision histories.
- Limits of digital reconstruction.

Eli should not automatically receive private files the Player has not sent.

### Important Mystery Restriction

Do not prove that Eli is associated with the damaged `E—I` field.

Do not reveal its complete meaning in Chapter 1.

### Exit Condition

The Player obtains a reasonable technical framework for interpreting the recovered discrepancy.

### Hook

A mismatch in a recovered system may be important, but the Player still needs an independently verifiable source.

---

# ACT IV — THE PEOPLE WHO KNEW HIM

## SCENE 13 — THE WOMAN HE LOVED

**Proposed ID:** `ch01_sc13_the_woman_he_loved`  
**Characters:** Player, Maya Chen  
**Primary Surface:** Private Messages  
**Narrative Type:** Personal Relationship / Emotional Conflict

### Opening

The Player establishes a legitimate private communication route with Maya.

Maya is Daniel's fiancée and was present during the initial group conflict.

### Narrative Objectives

Explore:

- Maya's relationship with Daniel.
- The effects of Daniel's disappearance.
- How Maya views the Player.
- Why people close to Daniel disagree.
- The distinction between emotional memory and factual evidence.

### Character Direction

Maya must have her own agency, uncertainty and emotional boundaries.

Do not make her merely an information dispenser.

She should not become automatically affectionate because the Player selects a sympathetic answer.

### Relationship Design

Later authored choices may affect:

- Trust
- Affinity
- Suspicion
- Future willingness to communicate

Do not assign numerical effects in this structural task.

### Exit Condition

The Player gains personal context or preserves a respectful boundary.

The core investigation remains accessible even if Maya withholds personal details.

---

## SCENE 14 — THE FRIEND WHO WALKED AWAY

**Proposed ID:** `ch01_sc14_the_friend_who_walked_away`  
**Characters:** Player, Lucas Grey  
**Primary Surface:** Private Messages  
**Narrative Type:** Conflict Repair / Character Depth

### Opening

A credible path becomes available to contact Lucas privately.

Lucas previously left FIND DANIEL.

The game must remember this history.

### Narrative Objectives

- Explore Lucas's protective attitude.
- Explain why he distrusts unfamiliar people.
- Show his long-standing friendship with Daniel.
- Allow the Player to respond respectfully or defensively.
- Build tension without making Lucas an obvious suspect.

### Relationship Mechanics

The scene may change Lucas's willingness to cooperate later.

However, the Player must not be forced to gain Lucas's approval to solve mandatory evidence puzzles.

### Group Membership Rule

Speaking to Lucas privately does not automatically return him to FIND DANIEL.

His return requires a separate authorized group event.

### Exit Condition

Lucas's boundaries and current relationship with the Player are recorded.

A future group return may become possible, but is not guaranteed.

---

## SCENE 15 — AFTER VERIFICATION

**Proposed ID:** `ch01_sc15_after_verification`  
**Characters:** Player; optional limited source guidance  
**Primary Surface:** Browser / Revision Viewer / Case Board  
**Narrative Type:** Historical Timeline Investigation

### Opening

The Player returns to the public historical record discrepancy.

A revision notice or equivalent credible record provides additional chronology.

### Gameplay

Compare:

- Earlier version identification.
- Earlier verification timestamp.
- Correction approval timestamp.
- Later publication/version information.

The Player must place the relevant events in the correct order.

Use existing approved in-world dates and source metadata, rather than generating new chronology.

### Core Discovery

The available records indicate a correction after an earlier verification.

But timing alone does not establish misconduct or motive.

### False Lead

A routine administrative correction remains a legitimate alternative hypothesis.

### Exit Condition

The Player records the chronology and identifies which source still needs independent verification.

### Hook

The Player needs an authenticated source before making a stronger claim.

---

# ACT V — THE TRUTH IN THE RECORD

## SCENE 16 — A REQUEST FOR THE ORIGINAL

**Proposed ID:** `ch01_sc16_a_request_for_the_original`  
**Characters:** Player; authorized records custodian through an official interface  
**Primary Surface:** Public Records Portal / Files / Case Board  
**Narrative Type:** Authentication / Major Investigative Payoff

### Opening

The Player follows the documented process for obtaining a versioned historical record.

### Required Process

- Inspect source identity.
- Submit a request through a believable channel.
- Receive a recorded request receipt.
- Access an appropriately scoped document.
- Verify version and transfer information.
- Compare the authenticated record with the earlier public preview.

Do not create instant access to protected information without an authored source process.

### Core Discovery

The Player establishes a supported conclusion about a post-verification record change.

This is a documentary conclusion, not a conclusion about criminal responsibility.

### Evidence Status

The finding may move from observed discrepancy to independently corroborated chronology only after the required source checks succeed.

### Exit Condition

The required historical version comparison is properly supported by recorded sources.

### Hook

The alteration is real enough to investigate further.

But why was it made, and who authorized it?

---

## SCENE 17 — WHAT WE CAN PROVE

**Proposed ID:** `ch01_sc17_what_we_can_prove`  
**Characters:** Player, Sophie, Maya, Lucas and possibly Eli depending on authorized membership  
**Primary Surface:** FIND DANIEL / Case Board  
**Narrative Type:** Group Reconciliation / Evidence Discussion

### Opening

Following the new verified finding, the Player has a reason to return to FIND DANIEL.

The group must not automatically reform with every character.

### Group Membership Requirements

Respect prior history:

- Sophie remains a group participant unless an explicit later event changes that.
- Maya remains a member after her temporary offline period.
- Lucas left the group.
- Eli was not part of the active replacement Scene 02 group script.
- Nora remains independent unless a separately approved event states otherwise.

Any rejoining or new membership requires believable consent and a persisted system event.

### Narrative Objectives

- Revisit the emotional fallout from Scene 02.
- Give characters an opportunity to acknowledge earlier disagreements.
- Allow the Player to share selected verified information.
- Establish a productive investigative direction.
- Show that different characters interpret the same evidence differently.

### Knowledge Protection

A character cannot discuss:

- A recovered private file they have not received.
- A conversation from another person's DM.
- A hidden album the Player alone opened.
- An unshared discovery made in the Case Board.

Information sharing must be explicit.

### Player Agency

The Player should control disclosure scope.

Refusing unnecessary personal disclosure must not block the main case.

### Exit Condition

The necessary public findings have been reviewed, or an equivalent individual-contact route is available when group participation is declined.

### Hook

A new question about access and authorization emerges from the documentary findings.

---

## SCENE 18 — THE ROLE STILL ACTIVE

**Proposed ID:** `ch01_sc18_the_role_still_active`  
**Characters:** Player; optional character callback according to actual contact history  
**Primary Surface:** Records Viewer / Case Board  
**Narrative Type:** Chapter Finale / Cliffhanger

### Opening

The Player examines the historical record's correction-related metadata.

### Final Discovery

A correction-related role associated with the historical workflow remains marked active in 2026.

### Critical Distinctions

An active role is not necessarily an active user session.

An active role does not establish that the original operator still controls it.

It does not prove that someone is altering records today.

It does not identify the person responsible for Daniel's disappearance.

### Narrative Objective

The Player realizes that they have uncovered an important documentary inconsistency, but the larger question remains unresolved.

### Ending Requirements

The ending must:

- Reward actual investigative progress.
- Avoid a random supernatural or threatening message.
- Avoid naming the culprit.
- Avoid revealing Daniel's fate.
- Avoid solving `7-14`.
- Preserve unanswered questions for Chapter 2.
- Feel unsettling because of verified facts and incomplete explanations.

### Chapter Completion

Display:

`CHAPTER 1 COMPLETE`

`THE MISSING ENTRY`

Then present the next chapter:

`CHAPTER 2`

`THE PEOPLE HE LEFT BEHIND`

Chapter 2 must not automatically start.

The Player should have an explicit Continue action when Chapter 2 content is available.

### Emotional Ending

The Player has begun to understand the records.

But the missing person at the center of them remains missing.

---


## Runtime boundary

New games use `narrativePlan: ch01-master-18`. After Scene 03 they remain on the ordinary phone. Scene 04 requires a future approved public-search script; no placeholder story is exposed. Existing saves with `chapter2Access` retain their old controller, timestamps, messages and knowledge. Earlier saves without a plan remain readable; an existing access state resumes, but no new access state is automatically created. No E01-Sxx ID is renamed.
