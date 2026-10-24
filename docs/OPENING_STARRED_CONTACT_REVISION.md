# Opening revision — the starred contact export

Owner direction, 23 October 2026. This is the authorized targeted rewrite of Scenes 01–03, superseding their earlier damaged-note references. All first-three-scene NPC/choice text is scanned by a regression test to exclude note reveals. Story numbers, node positions, waits, branch IDs, effects, departure, explicit Send and the 5.5-second handoff remain stable.

## Dramatic purpose

Sophie has a saved copy labelled as Daniel’s contact export. The player number has no saved name/label and is marked starred. She reports what she saw, not who authored the metadata. The star prompts a question and an emotionally understandable attempt to make contact. Lucas challenges the unsupported assumption of authorship; Maya protects the distinction between asking and accusing. Sophie’s private conversation returns to uncertainty without promising that the player can solve it.

## Scene 01 — affected beats

- SOPHIE: Okay.
- SOPHIE: I found your number in a saved copy of someone's contacts.
- SOPHIE: There wasn't a name attached to it.
- SOPHIE: Just the number.
- SOPHIE: And a star next to it.


### Choice 03A

PLAYER (selection + Send): A star?

- SOPHIE: Yeah. That's what caught my eye.
- SOPHIE: I don't know what it means.
- SOPHIE: I was hoping you might.

### Choice 03B

PLAYER (selection + Send): Did they mark it themselves?

- SOPHIE: I can't tell who marked it.
- SOPHIE: There was no saved name or label.
- SOPHIE: Only that your number is there, with that star.

### Choice 03C

PLAYER (selection + Send): That doesn't explain why you're texting me.

- SOPHIE: You're right.
- SOPHIE: I was hoping you might recognize where it came from.
- SOPHIE: Or know why your number might be there.

### Choice 03D

PLAYER (selection + Send): Could've been someone's old number.

- SOPHIE: I thought of that.
- SOPHIE: It could still be.
- SOPHIE: I guess I wanted to check before I gave up on it.

Shared continuation:

- SOPHIE: The copy is labelled as Daniel's contact export.
- PAUSE: 2000 ms
- SOPHIE: Daniel Mercer.

## Scene 02 — export discussion and four response routes

The following source block preserves one actor line per queued message. P lines remain separate selected Send actions.

```text
S Can I explain why I thought adding them was a good idea?
L You could try.
M Go ahead, Soph.
S I found a saved contact export.
S It's labelled as Daniel's contacts.
S I already told you about it.
M Right.
S And the number didn't have a name.
L We know.
S I'm getting there.
S There was something beside it.
S A star next to the number.
M A favourite contact?
S Maybe. I don't know how that export uses it.
S It just says starred. There's no saved name or label.
L Do we even know Daniel was the one who marked it?
M No. We don't.
S I know. I'm not saying he was.
W 2
M Then what made you contact the number?
S I hoped whoever answered might recognise him.
M Did they?
S No. But I didn't want to shut the door without asking.
W 3
L ...
L So this was a guess?
S A question. I hoped it might lead somewhere.
S That's different from knowing it would.
M You've been going through a lot of his things.
M We can ask questions without treating the star as proof.
S I know.
S I just don't want us to stop looking.
```

```typescript
choice('04', [
  { text: 'Can you tell who marked the number?', script: `S No. The copy doesn't show who did it.
S I shouldn't have assumed it was Daniel.
L That's what I've been trying to say.
M Then we keep that question open.
S Yeah. That's fair.` },
  { text: 'Maybe the number was saved for work.', script: `M That's possible.
L Possible isn't the same as likely.
M I didn't say it was likely.
S I honestly hadn't thought much about that.` },
  { text: "That doesn't necessarily mean anything.", script: `S I know.
S It might be nothing.
L Finally, something we agree on.
M Don't sound so pleased about it.` },
  { text: 'Why do you think the star matters?', script: `S I'm not sure.
S I wish I was.
S It made me stop scrolling. That's all I can honestly say.
M That's different from proving it matters.
S I know, Maya.` },
], `W 2
M Sophie, can you check something for me?
S Yeah?
M Does the export show when the number was starred?
S No. Not in the copy I have.
M Or who changed it?
S No. I checked for that too.
L Then the star doesn't tell us it was his decision.
S Lucas, I am trying.
L I know.
L But we can't keep building theories around things nobody's verified.
M For once, that part is fair.
S Okay.
S I'll look at it again.
T Sophie is typing...
W 3
M Can we talk about something else for a second?
L Like what?
M Whether anyone's actually eaten today.
S Maya...
M I'm serious.
M You were still awake when I went to bed.
S I slept.
M For how long?
S Enough.
M That's not a number.
S You're starting to sound like my mother.
M Someone has to.
W 2
L I ate.
M Congratulations, Lucas.
L You asked.
M I did.
S 😂
M There. See?
M She still remembers how to laugh.
S Barely.
W 2
L It isn't funny.
M Nobody said the situation was funny.
L Then can we stay focused?
M We can be worried and still act like human beings.
W 3`, 'OPEN-S02-C05')

```

The later Lucas escalation now asks who marked the number with a star; Sophie answers that she does not know. Lucas still leaves because of the underlying consent/privacy conflict, across every authored choice-11 branch.

## Scene 03 — private callback and Choice 16

- SOPHIE: Including me, by the way.
- PAUSE: 2000 ms
- SOPHIE: I know I've told you a lot.
- SOPHIE: But it's still just my side of things.
- SOPHIE: You should remember that.
- SOPHIE: There's still something I can't stop thinking about.
- SOPHIE: Your number.
- SOPHIE: I know.
- SOPHIE: We keep coming back to it.
- SOPHIE: But it doesn't make sense.
- SOPHIE: I've checked that saved contact export more than once.
- SOPHIE: And there it was.
- SOPHIE: No name.
- SOPHIE: Just your number, with the star still beside it.

### Choice 16A

PLAYER (selection + Send): Maybe Daniel saved the wrong number.

- SOPHIE: Maybe.
- SOPHIE: I really hope there's a simple explanation.
- SOPHIE: It would be nice if something about this turned out to be simple.

### Choice 16B

PLAYER (selection + Send): Can you tell me exactly where you found it?

- SOPHIE: It was in a saved copy labelled as Daniel's contacts.
- SOPHIE: We were checking through some of his things.
- SOPHIE: It wasn't a live conversation.
- SOPHIE: Just a saved record.

### Choice 16C

PLAYER (selection + Send): What if someone else added it?

- PAUSE: 2000 ms
- SOPHIE: I haven't ruled that out.
- SOPHIE: The copy doesn't tell me who saved or marked the number.
- SOPHIE: I don't want to start accusing people without knowing.

### Choice 16D

PLAYER (selection + Send): Do the others know about the star?

- SOPHIE: They know the number was marked with a star.
- SOPHIE: I mentioned it in the group.
- SOPHIE: But none of us knows who marked it, or why.
- SOPHIE: I don't want to turn that into a promise that you can help.

### Choice 16E

PLAYER (selection + Send): Tell me only what you actually saw. Not what you think it means.

- PAUSE: 3000 ms
- SOPHIE: Okay.
- SOPHIE: A saved contact export.
- SOPHIE: Your number.
- SOPHIE: No name attached.
- SOPHIE: The export marks it as starred.
- PAUSE: 2000 ms
- SOPHIE: That's it.
- SOPHIE: Everything else is me trying to connect things.
- SOPHIE: And maybe I'm connecting the wrong things.
- SOPHIE: Thank you.
- SOPHIE: I think I needed someone to help me separate those two things.

## Contact export display contract

Requested display copy:

```text
DANIEL MERCER — CONTACT EXPORT
CONTACT NAME: Unknown
PHONE NUMBER: ••• ••• ••••
Saved label: None
Export flag: Starred
```

This is the owner’s visual concept for the reported record, not an authenticated recovered artifact. This rewrite adds no export screenshot, attachment, file-download event, phone-number collection, photo unlock or forensic evidence. A future inspectable export must have an authored delivery/source route; masking remains fictional. Starred is a visible flag, not a claim that Daniel marked it or that the number belonged to a favourite person.

## Knowledge and save rules

New delivered bubbles grant OPEN-CONTACT-STAR-REPORTED and, only on explicit authorship-uncertainty lines, OPEN-CONTACT-AUTHOR-UNKNOWN. They do not grant evidence verification, note clues or identity. Retired note receipt strings may remain in historical saves, but no active first-three-scene node awards them. Old delivered transcript, receipts and relationship values are not overwritten. Replaying from New Game shows the fully revised opening; an interrupted old save keeps its history and receives revised future lines at the same node positions.

Scene 08 is the first planned note discovery, from a later approved physical/source route. That scene is not implemented by this rewrite. Existing historical Chapter 2 content is not silently rewritten.

## Verification

Typecheck, lint, 658 unit tests across 35 files and production build passed. All 17 targeted browser tests passed (2.6 minutes): first-contact premium/sub-replies, all 13 group choices, offline beats, departure, 5.5-second handoff, all 19 private choices, old-save continuation, reload/drafts and the post-farewell master-route boundary. The source scan covers every NPC line and selectable reply in the active first three scenes, including unused branches. Build retains the existing JavaScript chunk-size advisory. No APK or physical Android device validation was performed in this dialogue task.
