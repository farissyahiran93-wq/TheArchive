# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chapter1-official.spec.ts >> warning disclosure is optional, selected before Send and acknowledged by Sophie only afterwards
- Location: tests\e2e\chapter1-official.spec.ts:78:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Thank you for telling me. I don\'t know who sent that.', { exact: true })
Expected: visible
Error: strict mode violation: getByText('Thank you for telling me. I don\'t know who sent that.', { exact: true }) resolved to 2 elements:
    1) <div class="opening-bubble sophie">Thank you for telling me. I don't know who sent t…</div> aka getByRole('region', { name: 'Sophie private conversation' }).getByText('Thank you for telling me. I')
    2) <span>Thank you for telling me. I don't know who sent t…</span> aka getByRole('button', { name: 'Open notification from Sophie' })

Call log:
  - Expect "toBeVisible" getByText('Thank you for telling me. I don\'t know who sent that.', { exact: true }) with timeout 5000ms
  - waiting for getByText('Thank you for telling me. I don\'t know who sent that.', { exact: true })

```

# Page snapshot

```yaml
- generic [ref=f1e4]:
  - generic "Local time 04:33 PM" [ref=f1e5]: 4:33 PM
  - region "Sophie private conversation" [ref=f1e22]:
    - generic [ref=f1e23]:
      - button "Back to inbox" [ref=f1e24] [cursor=pointer]
      - generic [ref=f1e29]:
        - strong [ref=f1e30]: Sophie
        - generic [ref=f1e31]: Offline
      - button "View Sophie Mercer profile" [ref=f1e32] [cursor=pointer]
    - generic [ref=f1e33]:
      - generic [ref=f1e34]: Friday, January 15 · 04:00 PM
      - generic [ref=f1e35]: Hey
      - generic [ref=f1e38]: Sorry, is this a bad time?
      - generic [ref=f1e41]: Actually
      - generic [ref=f1e44]: I'm not even sure I have the right number 😅
      - generic [ref=f1e47]: Could you just reply when you see this?
      - generic [ref=f1e52]: Who's this?
      - generic [ref=f1e55]: Oh, right.
      - generic [ref=f1e58]: Sorry.
      - generic [ref=f1e61]: I'm Sophie.
      - generic [ref=f1e64]: I probably should've started with that.
      - generic [ref=f1e67]: Can I ask you something?
      - generic [ref=f1e70]: And I promise I'm not selling anything.
      - generic [ref=f1e75]: Sure. Go ahead.
      - generic [ref=f1e78]: Thanks.
      - generic [ref=f1e81]: Okay, this might sound strange.
      - generic [ref=f1e84]: Okay.
      - generic [ref=f1e87]: I found your number in a saved copy of someone's contacts.
      - generic [ref=f1e90]: There wasn't a name attached to it.
      - generic [ref=f1e93]: Just the number.
      - generic [ref=f1e96]: And a star next to it.
      - generic [ref=f1e101]: A star?
      - generic [ref=f1e104]: Yeah. That's what caught my eye.
      - generic [ref=f1e107]: I don't know what it means.
      - generic [ref=f1e110]: I was hoping you might.
      - generic [ref=f1e113]: The copy is labelled as Daniel's contact export.
      - generic [ref=f1e116]: Daniel Mercer.
      - generic [ref=f1e121]: Never heard of him.
      - generic [ref=f1e124]: Okay.
      - generic [ref=f1e127]: That's what I was afraid you'd say.
      - generic [ref=f1e130]: Not that it's your fault.
      - generic [ref=f1e133]: Can I ask if you've ever spoken to anyone called Daniel?
      - generic [ref=f1e136]: Even online?
      - generic [ref=f1e139]: Maybe a long time ago?
      - generic [ref=f1e144]: No. Definitely not.
      - generic [ref=f1e147]: Okay.
      - generic [ref=f1e150]: Thanks for being clear.
      - generic [ref=f1e153]: That makes this even stranger, though.
      - generic [ref=f1e156]: Anyway.
      - generic [ref=f1e159]: If you don't know him, then I guess that answers one question.
      - generic [ref=f1e162]: Just not the one I really wanted answered.
      - generic [ref=f1e165]: Sorry.
      - generic [ref=f1e168]: I keep making this awkward.
      - generic [ref=f1e171]: You probably have better things to do than talk to a stranger.
      - generic [ref=f1e176]: It's fine. What were you hoping to find out?
      - generic [ref=f1e179]: Why your number was saved.
      - generic [ref=f1e182]: Whether Daniel knew you.
      - generic [ref=f1e185]: Whether you'd heard from him recently.
      - generic [ref=f1e188]: Daniel hasn't been answering anyone.
      - generic [ref=f1e191]: Calls, messages...
      - generic [ref=f1e194]: Nothing.
      - generic [ref=f1e197]: For days.
      - generic [ref=f1e202]: Maybe he needs some time alone?
      - generic [ref=f1e205]: I thought that too.
      - generic [ref=f1e208]: At first.
      - generic [ref=f1e211]: But it's gone on longer than anyone expected.
      - generic [ref=f1e214]: Sorry.
      - generic [ref=f1e217]: I shouldn't have dropped all that on you.
      - generic [ref=f1e220]: We don't even know each other.
      - generic [ref=f1e225]: You can call me Alex.
      - generic [ref=f1e228]: Alex.
      - generic [ref=f1e231]: Okay. Nice to meet you.
      - generic [ref=f1e234]: Under very strange circumstances. 😅
      - generic [ref=f1e237]: Can I be honest about something?
      - generic [ref=f1e240]: I almost deleted your number before messaging you.
      - generic [ref=f1e245]: Why didn't you?
      - generic [ref=f1e248]: I kept thinking about the fact that it had been saved.
      - generic [ref=f1e251]: There had to be a reason.
      - generic [ref=f1e254]: Or at least I hoped there was.
      - generic [ref=f1e257]: Anyway.
      - generic [ref=f1e260]: I should probably let you go.
      - generic [ref=f1e263]: You've already been more patient than I expected.
      - generic [ref=f1e266]: Actually, wait.
      - generic [ref=f1e269]: There's something else.
      - generic [ref=f1e272]: I wasn't sure if I should mention it.
      - generic [ref=f1e277]: I'm listening.
      - generic [ref=f1e280]: Okay.
      - generic [ref=f1e283]: Just give me a second.
      - generic [ref=f1e286]: I'm not the only one trying to understand what happened.
      - generic [ref=f1e289]: There are a few other people.
      - generic [ref=f1e292]: People who know Daniel.
      - generic [ref=f1e295]: We've been talking.
      - generic [ref=f1e298]: Although "talking" might be a generous way of putting it lately.
      - generic [ref=f1e303]: What do you mean?
      - generic [ref=f1e306]: Everyone has their own idea of what we should do.
      - generic [ref=f1e309]: And no one seems to agree.
      - generic [ref=f1e312]: There's a group chat.
      - generic [ref=f1e315]: We've been using it to keep track of things.
      - generic [ref=f1e318]: Well...
      - generic [ref=f1e321]: Trying to.
      - generic [ref=f1e324]: I was thinking...
      - generic [ref=f1e327]: Maybe you could join us?
      - generic [ref=f1e330]: Just for a little while.
      - generic [ref=f1e333]: You don't have to do anything.
      - generic [ref=f1e336]: You could just listen.
      - generic [ref=f1e341]: Why would I join a group of strangers?
      - generic [ref=f1e344]: That's a very good question.
      - generic [ref=f1e347]: And I don't have a very convincing answer.
      - generic [ref=f1e350]: I just thought maybe you'd notice something we missed.
      - generic [ref=f1e353]: Look.
      - generic [ref=f1e356]: I'm not asking you to solve anything.
      - generic [ref=f1e359]: And I don't expect you to believe everything I'm saying.
      - generic [ref=f1e362]: I'd be suspicious too.
      - generic [ref=f1e365]: But if there's even a small chance your number means something...
      - generic [ref=f1e368]: I don't want to ignore it.
      - generic [ref=f1e373]: Alright. Add me.
      - generic [ref=f1e376]: Really?
      - generic [ref=f1e379]: Okay.
      - generic [ref=f1e382]: Thank you.
      - generic [ref=f1e385]: I'll send you an invite.
      - generic [ref=f1e388]: Okay, before you join...
      - generic [ref=f1e391]: Just so you know.
      - generic [ref=f1e394]: Not everyone in there is as friendly as me.
      - generic [ref=f1e397]: Wow. That sounded incredibly arrogant.
      - generic [ref=f1e400]: You know what I mean. 😅
      - generic [ref=f1e405]: I can handle it.
      - generic [ref=f1e408]: Good.
      - generic [ref=f1e411]: Because I can't guarantee a warm welcome.
      - generic [ref=f1e414]: Anyway.
      - generic [ref=f1e417]: Here goes nothing.
      - generic [ref=f1e420]: Hey.
      - generic [ref=f1e423]: It's me.
      - generic [ref=f1e426]: Obviously.
      - generic [ref=f1e429]: Not sure why I felt the need to clarify that 😅
      - generic [ref=f1e432]: Sorry about what happened back there.
      - generic [ref=f1e435]: That was...
      - generic [ref=f1e438]: Well, you've seen it.
      - generic [ref=f1e443]: Yeah. That was pretty intense.
      - generic [ref=f1e446]: That's one word for it.
      - generic [ref=f1e449]: And you caught us on a relatively good day.
      - generic [ref=f1e452]: Kidding.
      - generic [ref=f1e455]: Mostly.
      - generic [ref=f1e458]: Okay.
      - generic [ref=f1e461]: Let's start over.
      - generic [ref=f1e464]: Properly this time.
      - generic [ref=f1e467]: There's something I should've told you before I added you.
      - generic [ref=f1e470]: Daniel isn't just someone I know.
      - generic [ref=f1e473]: He's my brother.
      - generic [ref=f1e476]: My older brother, actually.
      - generic [ref=f1e479]: Daniel Mercer.
      - generic [ref=f1e482]: I guess I should've mentioned that earlier.
      - generic [ref=f1e487]: Wait. Daniel's your brother?
      - generic [ref=f1e490]: Yeah.
      - generic [ref=f1e493]: Sorry.
      - generic [ref=f1e496]: I keep forgetting you don't know anything about us.
      - generic [ref=f1e499]: I've spent days talking to people who already know him.
      - generic [ref=f1e502]: It's strange.
      - generic [ref=f1e505]: I've spent all day talking about Daniel.
      - generic [ref=f1e508]: Where he might be.
      - generic [ref=f1e511]: Who he last spoke to.
      - generic [ref=f1e514]: Whether anyone remembers something useful.
      - generic [ref=f1e517]: But I haven't really told you what he's like.
      - generic [ref=f1e522]: What's he like?
      - generic [ref=f1e525]: That's harder than I expected.
      - generic [ref=f1e528]: He's a good person.
      - generic [ref=f1e531]: Which is what everybody says about someone they love.
      - generic [ref=f1e534]: Not very helpful, is it?
      - generic [ref=f1e537]: He's patient with things.
      - generic [ref=f1e540]: Not always with people.
      - generic [ref=f1e543]: If something breaks, he'll spend hours trying to fix it.
      - generic [ref=f1e546]: Even if replacing it would take five minutes.
      - generic [ref=f1e549]: And he'll be absolutely convinced he's being clever about it.
      - generic [ref=f1e554]: He sounds stubborn.
      - generic [ref=f1e557]: Oh, incredibly.
      - generic [ref=f1e560]: Don't ever tell him that.
      - generic [ref=f1e563]: He'll spend the next twenty minutes explaining why he's not stubborn.
      - generic [ref=f1e566]: And he has this habit.
      - generic [ref=f1e569]: Whenever something gets complicated, he'll say...
      - generic [ref=f1e572]: "\"I'll explain later.\""
      - generic [ref=f1e575]: I hate that sentence.
      - generic [ref=f1e578]: Because he normally does explain later.
      - generic [ref=f1e581]: You just have to wait until he's ready.
      - generic [ref=f1e584]: This time...
      - generic [ref=f1e587]: Never mind.
      - generic [ref=f1e590]: You know what I remembered earlier?
      - generic [ref=f1e593]: My birthday.
      - generic [ref=f1e596]: Not this year.
      - generic [ref=f1e599]: A while ago.
      - generic [ref=f1e602]: Daniel told me he couldn't make it.
      - generic [ref=f1e605]: Said he was busy.
      - generic [ref=f1e608]: I was so annoyed with him.
      - generic [ref=f1e611]: Didn't speak to him all afternoon.
      - generic [ref=f1e614]: Then he showed up that evening.
      - generic [ref=f1e617]: With a cake.
      - generic [ref=f1e620]: A completely ruined cake.
      - generic [ref=f1e623]: It had slid sideways in the box.
      - generic [ref=f1e626]: Half the writing was stuck to the lid.
      - generic [ref=f1e631]: It's the thought that counts.
      - generic [ref=f1e634]: That's exactly what he said!
      - generic [ref=f1e637]: Word for word.
      - generic [ref=f1e640]: Very convenient, considering the state of that cake.
      - generic [ref=f1e643]: Sorry.
      - generic [ref=f1e646]: I'm rambling.
      - generic [ref=f1e649]: You asked about Daniel and now I'm telling you about a cake.
      - generic [ref=f1e652]: But that's the kind of thing I think about when I think of him.
      - generic [ref=f1e655]: Not the arguments.
      - generic [ref=f1e658]: Not whatever is happening right now.
      - generic [ref=f1e661]: That's why I know something isn't right.
      - generic [ref=f1e664]: He might forget an appointment.
      - generic [ref=f1e667]: He might ignore a call because he's busy.
      - generic [ref=f1e670]: But if he knows people are worried...
      - generic [ref=f1e673]: He doesn't usually leave them like that.
      - generic [ref=f1e678]: How long has he been gone?
      - generic [ref=f1e681]: A few days without a proper answer.
      - generic [ref=f1e684]: It feels longer.
      - generic [ref=f1e687]: I keep counting the hours.
      - generic [ref=f1e690]: Which doesn't help at all.
      - generic [ref=f1e693]: And before you ask...
      - generic [ref=f1e696]: No, we haven't figured out exactly what happened.
      - generic [ref=f1e699]: We don't even agree on parts of the timeline.
      - generic [ref=f1e702]: That's why things got so tense in the group.
      - generic [ref=f1e705]: Can I tell you something?
      - generic [ref=f1e708]: I keep opening my last conversation with him.
      - generic [ref=f1e711]: I know it isn't going to change.
      - generic [ref=f1e714]: But I keep looking anyway.
      - generic [ref=f1e719]: What did he say?
      - generic [ref=f1e722]: Nothing dramatic.
      - generic [ref=f1e725]: That's the frustrating part.
      - generic [ref=f1e728]: Just normal things.
      - generic [ref=f1e731]: Like we were going to talk again the next day.
      - generic [ref=f1e734]: Anyway.
      - generic [ref=f1e737]: I don't want you thinking I already know what happened.
      - generic [ref=f1e740]: I don't.
      - generic [ref=f1e743]: I just know this silence doesn't feel like him.
      - generic [ref=f1e746]: Wow.
      - generic [ref=f1e749]: This conversation got depressing fast.
      - generic [ref=f1e752]: Sorry 😅
      - generic [ref=f1e755]: I should probably tell you a little about the others.
      - generic [ref=f1e758]: Since you've already met them at their absolute best.
      - generic [ref=f1e761]: That was sarcasm, by the way.
      - generic [ref=f1e764]: In case it wasn't obvious.
      - generic [ref=f1e767]: Maya first.
      - generic [ref=f1e770]: She's been having a really hard time.
      - generic [ref=f1e773]: She barely sleeps.
      - generic [ref=f1e776]: Keeps saying she's fine.
      - generic [ref=f1e779]: Which is usually how I know she's not.
      - generic [ref=f1e784]: Why is this affecting her so much?
      - generic [ref=f1e787]: ...
      - generic [ref=f1e790]: Because she's Daniel's fiancée.
      - generic [ref=f1e793]: They were planning a wedding.
      - generic [ref=f1e796]: Maya Chen.
      - generic [ref=f1e799]: That's her full name, by the way.
      - generic [ref=f1e802]: She's usually the organized one.
      - generic [ref=f1e805]: Lists.
      - generic [ref=f1e808]: Plans.
      - generic [ref=f1e811]: Reminders.
      - generic [ref=f1e814]: Sometimes I think she has a spreadsheet for everything.
      - generic [ref=f1e817]: Which is probably why Daniel needed her.
      - generic [ref=f1e822]: Were they happy together?
      - generic [ref=f1e825]: As far as I knew, yes.
      - generic [ref=f1e828]: Every couple has disagreements.
      - generic [ref=f1e831]: But they were making plans for the future.
      - generic [ref=f1e834]: Real plans.
      - generic [ref=f1e837]: I don't want to pretend I know every detail of their relationship, though.
      - generic [ref=f1e840]: Maya can be sarcastic.
      - generic [ref=f1e843]: Very sarcastic.
      - generic [ref=f1e846]: But she usually means well.
      - generic [ref=f1e849]: She also won't pretend to agree with you just to make you feel better.
      - generic [ref=f1e852]: Trust me.
      - generic [ref=f1e855]: I've been on the receiving end of that plenty of times.
      - generic [ref=f1e860]: What about that message she deleted?
      - generic [ref=f1e863]: I noticed.
      - generic [ref=f1e866]: I didn't see what it said.
      - generic [ref=f1e869]: I don't know if it was important.
      - generic [ref=f1e872]: We can ask her later.
      - generic [ref=f1e875]: I just don't want to turn every little thing into an accusation.
      - generic [ref=f1e878]: Just...
      - generic [ref=f1e881]: Be patient with her, okay?
      - generic [ref=f1e884]: She's dealing with more than she lets on.
      - generic [ref=f1e887]: And then there's Lucas.
      - generic [ref=f1e890]: Oh boy.
      - generic [ref=f1e893]: Where do I even start?
      - generic [ref=f1e896]: He's known Daniel since they were kids.
      - generic [ref=f1e899]: They practically grew up together.
      - generic [ref=f1e902]: Which means he's had years to perfect the art of being impossible.
      - generic [ref=f1e905]: 😅
      - generic [ref=f1e910]: He seems very protective.
      - generic [ref=f1e913]: Yeah.
      - generic [ref=f1e916]: That's a good word for him.
      - generic [ref=f1e919]: He doesn't always show it in the nicest way.
      - generic [ref=f1e922]: But he cares.
      - generic [ref=f1e925]: He and Daniel used to argue about the stupidest things.
      - generic [ref=f1e928]: Music.
      - generic [ref=f1e931]: Football.
      - generic [ref=f1e934]: Who was right about something neither of them actually understood.
      - generic [ref=f1e937]: And then five minutes later they'd be laughing again.
      - generic [ref=f1e940]: That's just how they were.
      - generic [ref=f1e943]: I think he's having a hard time accepting that he can't just call Daniel and argue with him about this.
      - generic [ref=f1e948]: Do you think he'll come back?
      - generic [ref=f1e951]: I hope so.
      - generic [ref=f1e954]: He's angry, not heartless.
      - generic [ref=f1e957]: I don't think he wants to walk away from Daniel.
      - generic [ref=f1e960]: He just doesn't want to do things this way.
      - generic [ref=f1e963]: Whatever you think of Lucas...
      - generic [ref=f1e966]: Please don't assume he's your enemy.
      - generic [ref=f1e969]: I don't think he is.
      - generic [ref=f1e972]: Oh!
      - generic [ref=f1e975]: And there's Eli.
      - generic [ref=f1e978]: I almost forgot you haven't actually spoken to her.
      - generic [ref=f1e981]: She's much quieter in group chats.
      - generic [ref=f1e984]: Sometimes I wonder whether she even reads half the messages.
      - generic [ref=f1e987]: Then she'll reply to something from six hours ago.
      - generic [ref=f1e990]: Like the conversation never moved on.
      - generic [ref=f1e993]: 😅
      - generic [ref=f1e998]: Who's Eli?
      - generic [ref=f1e1001]: Eli Ward.
      - generic [ref=f1e1004]: She works with Daniel.
      - generic [ref=f1e1007]: At Axiom Recovery.
      - generic [ref=f1e1010]: She's not exactly the loudest person in the room.
      - generic [ref=f1e1013]: But she's pretty smart.
      - generic [ref=f1e1016]: Eli's usually better with technical things than the rest of us.
      - generic [ref=f1e1019]: Which isn't saying much in my case.
      - generic [ref=f1e1022]: I once managed to delete an entire folder while trying to rename it.
      - generic [ref=f1e1025]: Don't ask.
      - generic [ref=f1e1028]: Anyway.
      - generic [ref=f1e1031]: She's not some magician who can just pull answers out of nowhere.
      - generic [ref=f1e1034]: But she might be able to help us understand some things later.
      - generic [ref=f1e1039]: What's Axiom Recovery?
      - generic [ref=f1e1042]: It's where Daniel works.
      - generic [ref=f1e1045]: They deal with data and recovery-related work.
      - generic [ref=f1e1048]: That's about the extent of my technical understanding.
      - generic [ref=f1e1051]: Eli would explain it better than I could.
      - generic [ref=f1e1054]: So yeah.
      - generic [ref=f1e1057]: That's Eli.
      - generic [ref=f1e1060]: She's easier to talk to when she isn't trying to explain something complicated.
      - generic [ref=f1e1063]: Which, now that I think about it, might not be very often.
      - generic [ref=f1e1066]: 😅
      - generic [ref=f1e1069]: So...
      - generic [ref=f1e1072]: That's Maya, Lucas and Eli.
      - generic [ref=f1e1075]: In the world's least useful introduction.
      - generic [ref=f1e1078]: They're all different.
      - generic [ref=f1e1081]: Very different.
      - generic [ref=f1e1084]: But they all care about Daniel.
      - generic [ref=f1e1087]: In their own ways.
      - generic [ref=f1e1092]: I feel bad for Maya.
      - generic [ref=f1e1095]: Me too.
      - generic [ref=f1e1098]: She's trying so hard to stay strong.
      - generic [ref=f1e1101]: I wish she didn't feel like she had to.
      - generic [ref=f1e1104]: Including me, by the way.
      - generic [ref=f1e1107]: I know I've told you a lot.
      - generic [ref=f1e1110]: But it's still just my side of things.
      - generic [ref=f1e1113]: You should remember that.
      - generic [ref=f1e1116]: There's still something I can't stop thinking about.
      - generic [ref=f1e1119]: Your number.
      - generic [ref=f1e1122]: I know.
      - generic [ref=f1e1125]: We keep coming back to it.
      - generic [ref=f1e1128]: But it doesn't make sense.
      - generic [ref=f1e1131]: I've checked that saved contact export more than once.
      - generic [ref=f1e1134]: And there it was.
      - generic [ref=f1e1137]: No name.
      - generic [ref=f1e1140]: Just your number, with the star still beside it.
      - generic [ref=f1e1145]: Maybe Daniel saved the wrong number.
      - generic [ref=f1e1148]: Maybe.
      - generic [ref=f1e1151]: I really hope there's a simple explanation.
      - generic [ref=f1e1154]: It would be nice if something about this turned out to be simple.
      - generic [ref=f1e1157]: I wish I could give you something more useful.
      - generic [ref=f1e1160]: I really do.
      - generic [ref=f1e1163]: But I don't want to make up answers just because I don't like having questions.
      - generic [ref=f1e1166]: There's something else I should say.
      - generic [ref=f1e1169]: I know you've ended up in a really strange situation.
      - generic [ref=f1e1172]: And it's mostly because of me.
      - generic [ref=f1e1175]: You didn't ask to get involved.
      - generic [ref=f1e1178]: I know that.
      - generic [ref=f1e1181]: I don't actually expect you to find Daniel.
      - generic [ref=f1e1184]: That's not fair to put on you.
      - generic [ref=f1e1187]: I just thought...
      - generic [ref=f1e1190]: Maybe there's something we're missing.
      - generic [ref=f1e1193]: Something someone outside all of this might notice.
      - generic [ref=f1e1198]: I can try to help.
      - generic [ref=f1e1201]: Really?
      - generic [ref=f1e1204]: Thank you.
      - generic [ref=f1e1207]: I mean it.
      - generic [ref=f1e1210]: Even just talking things through might help.
      - generic [ref=f1e1213]: Just promise me one thing.
      - generic [ref=f1e1216]: If something feels wrong, don't ignore it.
      - generic [ref=f1e1219]: And don't put yourself in danger over any of this.
      - generic [ref=f1e1222]: I don't want someone else getting hurt.
      - generic [ref=f1e1225]: Wow.
      - generic [ref=f1e1228]: I've been talking for ages.
      - generic [ref=f1e1231]: Sorry.
      - generic [ref=f1e1234]: You probably didn't expect to get my entire life story in one conversation.
      - generic [ref=f1e1237]: Although, to be fair, you only got the very confusing version.
      - generic [ref=f1e1242]: I don't mind.
      - generic [ref=f1e1245]: Good.
      - generic [ref=f1e1248]: Because apparently I have no idea when to stop talking.
      - generic [ref=f1e1251]: Maya reminds me of that constantly.
      - generic [ref=f1e1254]: I think I'm going to put my phone down for a little while.
      - generic [ref=f1e1257]: Maybe make some tea.
      - generic [ref=f1e1260]: Or at least try to take a break.
      - generic [ref=f1e1263]: Maya would be proud.
      - generic [ref=f1e1266]: Oh.
      - generic [ref=f1e1269]: One more thing.
      - generic [ref=f1e1272]: If anyone in the group gives you a hard time again...
      - generic [ref=f1e1275]: Just tell me, okay?
      - generic [ref=f1e1278]: I'll try to handle it better next time.
      - generic [ref=f1e1283]: Okay. Talk later.
      - generic [ref=f1e1286]: Talk later.
      - generic [ref=f1e1289]: And thanks again.
      - generic [ref=f1e1292]: And hey...
      - generic [ref=f1e1295]: I'm glad you didn't leave.
      - generic [ref=f1e1298]: Goodbye.
      - generic [ref=f1e1303]: An unknown sender warned me to be careful who I trust in the group.
      - generic [ref=f1e1306]: Thank you for telling me. I don't know who sent that.
      - generic [ref=f1e1311]: Sophie is offline.
      - button "Open FIND DANIEL →" [ref=f1e1312] [cursor=pointer]
  - complementary "Incoming notification":
    - generic [ref=f1e1313]:
      - button "Open notification from Sophie" [ref=f1e1314] [cursor=pointer]:
        - generic [ref=f1e1316]:
          - generic [ref=f1e1317]:
            - text: MESSAGES
            - time [ref=f1e1318]: now
          - strong [ref=f1e1319]: Sophie
          - generic [ref=f1e1320]: Thank you for telling me. I don't know who sent that.
      - button "Dismiss notification" [ref=f1e1321] [cursor=pointer]
  - navigation "Phone navigation" [ref=f1e1325]:
    - button "Go home" [ref=f1e1326] [cursor=pointer]
```

# Test source

```ts
  1  | import { expect,test,type Page } from '@playwright/test'
  2  | import { Chapter1Fixture } from '../helpers/chapter1'
  3  | import { sceneAt,seedScene } from './scene01-helper'
  4  | 
  5  | async function click(page:Page,name:string){await page.getByRole('button',{name,exact:true}).first().click()}
  6  | async function inspect(page:Page,title:string){await page.getByRole('button',{name:new RegExp('^'+title.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'))}).first().click();await expect(page.getByRole('article',{name:'Investigation record'})).toBeVisible();await click(page,'Back to investigation')}
  7  | async function advance(page:Page,n:number){await click(page,'Continue investigation');await expect(page.getByRole('region',{name:'Chapter 1 investigation'})).toHaveAttribute('data-chapter1-scene',String(n))}
  8  | async function send(page:Page,text:string){await click(page,text);await click(page,'Send');await page.clock.runFor(2000)}
  9  | async function choose(page:Page,key:string,id:string){await page.getByRole('combobox',{name:`Interpret ${key}`}).selectOption(id);await click(page,'Record interpretation')}
  10 | 
  11 | test('official structure: manual sources, diff, contacts, count, claim, board and role end Chapter 1 without launching Chapter 2',async({page})=>{
  12 |   test.setTimeout(180000)
  13 |   await page.setViewportSize({width:320,height:720})
  14 |   await seedScene(page,new Chapter1Fixture().opening().save)
  15 |   await click(page,'Open The Archive')
  16 |   await expect(page.getByRole('region',{name:'Chapter 1 investigation'})).toHaveAttribute('data-chapter1-scene','4')
  17 |   await expect(page.getByText('Post-verification statement — partial reconstruction',{exact:true})).toHaveCount(0)
  18 |   await expect(page.getByRole('button',{name:'Activate recovered reference'})).toBeDisabled()
  19 |   await inspect(page,'Daniel Mercer — public report')
  20 |   await click(page,'Activate recovered reference')
  21 |   await inspect(page,'Recovered publication reference')
  22 |   await page.reload();await click(page,'Enter the archive');await click(page,'Open The Archive')
  23 |   await advance(page,5)
  24 |   await inspect(page,'Earlier recovered report layer');await click(page,'Open version comparison')
  25 |   await expect(page.getByLabel('Version comparison')).toContainText('JUNE ELLIS')
  26 |   await click(page,'Inspect and save comparison');await advance(page,6)
  27 |   await click(page,'Examine changed Escort field');await choose(page,'missing','insufficient');await advance(page,7)
  28 |   await click(page,'Open Nora reporting inbox');await send(page,'I only want to discuss the public record for now.');await click(page,'Back from conversation');await advance(page,8)
  29 |   await click(page,'Ask Nora about her retained page');await send(page,'Can I examine the page you kept?');await click(page,'Back from conversation')
  30 |   await inspect(page,'Page retained by Nora');await click(page,'Compare retained page with both source layers');await click(page,'Record retained-page comparison');await advance(page,9)
  31 |   await inspect(page,'Source trace — incomplete');await click(page,'Record source uncertainty; sender identity remains unknown');await advance(page,10)
  32 |   await click(page,'Authorize limited snapshot');await inspect(page,'To myself — recovered fragment');await advance(page,11)
  33 |   await inspect(page,'Archive Index — integrity report');await inspect(page,'Index caution — ordinary recovered record')
  34 |   await choose(page,'index','equal');await expect(page.getByRole('button',{name:'Continue investigation'})).toBeDisabled()
  35 |   await choose(page,'index','14-13')
  36 |   await page.screenshot({path:test.info().outputPath('scene11-count.png')})
  37 |   await page.reload();await click(page,'Enter the archive');await click(page,'Open The Archive');await advance(page,12)
  38 |   await send(page,'Sophie, could you put me in touch with Eli for a general recovery question?')
  39 |   await click(page,'Open Eli conversation');await send(page,'Please pass on a general question about incomplete recovery.');await click(page,'Back from conversation')
  40 |   await click(page,'Acknowledge recovery limitations');await advance(page,13)
  41 |   await click(page,'Open Maya conversation');await send(page,'We can keep personal details private.');await click(page,'Back from conversation');await advance(page,14)
  42 |   await click(page,'Open Lucas conversation');await send(page,'We can leave this here if you do not want to talk.');await click(page,'Back from conversation');await advance(page,15)
  43 |   await inspect(page,'Post-verification statement — partial reconstruction');await click(page,'Examine “after verification” against the index');await choose(page,'claim','unverified');await advance(page,16)
  44 |   await send(page,'Nora, can you provide the earliest copy of the public linked record? I am not attaching private recovered files.');await advance(page,17)
  45 |   for(const [key,id] of [['diff','observed'],['claim','reported'],['source','unknown'],['theory','interpretation']])await page.getByRole('combobox',{name:`Classify ${key}`}).selectOption(id)
  46 |   await click(page,'Check classifications');await click(page,'Save conclusion: versions differ; source and actor remain unproven');await advance(page,18)
  47 |   await inspect(page,'Correction workflow — status trace');await choose(page,'ending','cautious')
  48 |   await page.reload();await click(page,'Enter the archive');await click(page,'Open The Archive')
  49 |   await click(page,'End Chapter')
  50 |   await expect(page.getByRole('heading',{name:'CHAPTER 1 COMPLETE'})).toBeVisible()
  51 |   await expect(page.getByRole('button',{name:'Continue to Chapter 2'})).toBeVisible()
  52 |   await page.screenshot({path:test.info().outputPath('chapter-complete.png')})
  53 |   await page.clock.runFor(20000)
  54 |   const pending=await page.evaluate(()=>sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
  55 |   if(pending)expect(JSON.parse(pending).save.chapter2Access).toBeUndefined()
  56 |   await click(page,'Continue to Chapter 2')
  57 |   await expect(page.getByRole('region',{name:'The Archive access extension'})).toBeVisible()
  58 | })
  59 | 
  60 | test('Unknown warning is once-only and leaves Lucas choice intact',async({page})=>{
  61 |   await seedScene(page,sceneAt('G01'))
  62 |   await click(page,'Open Messages');await click(page,'Open FIND DANIEL group conversation')
  63 |   const group=page.getByRole('region',{name:'FIND DANIEL group conversation'})
  64 |   await expect(group).toHaveAttribute('data-scene-node','OPEN-S02-C01')
  65 |   // Waking the app is a scheduler tick; the persisted group pause remains unchanged.
  66 |   await page.evaluate(()=>document.dispatchEvent(new Event('visibilitychange')))
  67 |   await page.clock.runFor(2000)
  68 |   await expect(page.getByLabel('Incoming notification',{exact:true})).toContainText('Unknown Sender')
  69 |   await expect(group).toHaveAttribute('data-scene-node','OPEN-S02-C01')
  70 |   await click(page,'Open notification from Unknown Sender')
  71 |   await click(page,'Read warning and show responses');await click(page,'Who is this?')
  72 |   await expect(page.locator('.c1-contact .opening-bubble.player')).toHaveCount(0)
  73 |   await click(page,'Send');await expect(page.locator('.c1-contact .opening-bubble.player')).toHaveCount(1)
  74 |   await page.reload();await click(page,'Enter the archive');await click(page,'Open Messages');await click(page,'Open Chapter 1 Unknown Sender conversation')
  75 |   await expect(page.getByText('Be careful who you trust in that group.',{exact:true})).toHaveCount(1)
  76 | })
  77 | 
  78 | test('warning disclosure is optional, selected before Send and acknowledged by Sophie only afterwards',async({page})=>{
  79 |   await seedScene(page,new Chapter1Fixture().opening().act({type:'read-sender'}).save)
  80 |   await click(page,'Open Messages');await click(page,'Open Sophie conversation')
  81 |   await page.getByText('Optional: tell Sophie about the warning',{exact:true}).click()
  82 |   const text='An unknown sender warned me to be careful who I trust in the group.'
  83 |   await click(page,text)
  84 |   await expect(page.locator('.opening-bubble.player').filter({hasText:text})).toHaveCount(0)
  85 |   await click(page,'Send')
  86 |   await expect(page.locator('.opening-bubble.player').filter({hasText:text})).toHaveCount(1)
  87 |   await page.clock.runFor(2000)
> 88 |   await expect(page.getByText("Thank you for telling me. I don't know who sent that.",{exact:true})).toBeVisible()
     |                                                                                                      ^ Error: expect(locator).toBeVisible() failed
  89 | })
  90 | 
```