# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: scene10-final.spec.ts >> Scene 10 human threads: Sophie draft/decline, group two-step Send, actual boundary 320px
- Location: tests\e2e\scene10-final.spec.ts:31:34

# Error details

```
Test timeout of 180000ms exceeded.
```

```
Error: page.screenshot: Test timeout of 180000ms exceeded.
Call log:
  - taking page screenshot
  - waiting for fonts to load...
  - fonts loaded

```

# Page snapshot

```yaml
- generic [ref=f2e4]:
  - generic "Local time 04:34 PM" [ref=f2e5]: 4:34 PM
  - region "Sophie private conversation" [ref=f2e22]:
    - generic [ref=f2e23]:
      - button "Back to inbox" [ref=f2e24] [cursor=pointer]
      - generic [ref=f2e29]:
        - strong [ref=f2e30]: Sophie
        - generic [ref=f2e31]: Offline
      - button "View Sophie Mercer profile" [ref=f2e32] [cursor=pointer]
    - generic [ref=f2e33]:
      - generic [ref=f2e34]: Friday, January 15 · 04:00 PM
      - generic [ref=f2e35]: Hi.
      - generic [ref=f2e38]: Sorry. This is going to sound odd.
      - generic [ref=f2e41]: Is this still your number?
      - generic [ref=f2e46]: Who's asking?
      - generic [ref=f2e49]: Fair question.
      - generic [ref=f2e52]: I'm Sophie.
      - generic [ref=f2e55]: And that probably doesn't help much.
      - generic [ref=f2e58]: I don't expect you to know me.
      - generic [ref=f2e61]: I found this number saved somewhere.
      - generic [ref=f2e64]: Can I explain?
      - generic [ref=f2e69]: Go ahead.
      - generic [ref=f2e72]: Thank you.
      - generic [ref=f2e75]: It's a saved copy of someone's contacts.
      - generic [ref=f2e78]: The file says it belongs to Daniel Mercer.
      - generic [ref=f2e81]: I was looking through it earlier.
      - generic [ref=f2e84]: Your number is in there.
      - generic [ref=f2e87]: No name beside it.
      - generic [ref=f2e90]: Just a star.
      - generic [ref=f2e95]: A star?
      - generic [ref=f2e98]: Yeah. Like a favourite, maybe.
      - generic [ref=f2e101]: But I don't know what that symbol means in this file.
      - generic [ref=f2e104]: Do you know Daniel?
      - generic [ref=f2e107]: Daniel Mercer?
      - generic [ref=f2e112]: No. Never heard the name.
      - generic [ref=f2e115]: Okay.
      - generic [ref=f2e118]: That was the most likely answer, I suppose.
      - generic [ref=f2e121]: Could you think back a little?
      - generic [ref=f2e124]: Even an old online chat. A work message. Anything.
      - generic [ref=f2e127]: I'm not asking you to guess.
      - generic [ref=f2e132]: I'm sure I haven't spoken to him.
      - generic [ref=f2e135]: Then that's useful to know.
      - generic [ref=f2e138]: I thought if I asked, the answer might be simple.
      - generic [ref=f2e141]: “Oh, yeah. Daniel and I used to work together.”
      - generic [ref=f2e144]: Something like that.
      - generic [ref=f2e147]: Sorry. I'm talking as if you already know what's happened.
      - generic [ref=f2e152]: Then tell me.
      - generic [ref=f2e155]: Right.
      - generic [ref=f2e158]: Daniel stopped replying.
      - generic [ref=f2e161]: Messages. Calls.
      - generic [ref=f2e164]: For days now.
      - generic [ref=f2e167]: At first we thought he was busy.
      - generic [ref=f2e170]: Then we thought maybe he wanted space.
      - generic [ref=f2e173]: I don't know what to think anymore.
      - generic [ref=f2e178]: Have you tried checking on him in person?
      - generic [ref=f2e181]: We have tried to check he's safe.
      - generic [ref=f2e184]: I don't want to give you a version of events I'm not sure about.
      - generic [ref=f2e187]: I'm sorry. I should've said that sooner.
      - generic [ref=f2e190]: You don't owe me your time.
      - generic [ref=f2e193]: I haven't even asked what to call you.
      - generic [ref=f2e198]: You can call me Alex.
      - generic [ref=f2e201]: Alex. Got it.
      - generic [ref=f2e204]: Nice to meet you. In a very odd way.
      - generic [ref=f2e207]: You know what's strange?
      - generic [ref=f2e210]: I nearly deleted this number.
      - generic [ref=f2e213]: I had my finger over it and everything.
      - generic [ref=f2e218]: What changed your mind?
      - generic [ref=f2e221]: "I kept thinking: what if this is the one person who can tell us something ordinary and useful?"
      - generic [ref=f2e224]: I didn't want to start believing the star meant something just because I was scared.
      - generic [ref=f2e227]: But I didn't want to delete the question either.
      - generic [ref=f2e230]: There are other people trying to find him.
      - generic [ref=f2e233]: Some of us are talking in a group.
      - generic [ref=f2e236]: Well, arguing in a group, lately.
      - generic [ref=f2e241]: Who's in it?
      - generic [ref=f2e244]: People close to him.
      - generic [ref=f2e247]: I can introduce you properly if you decide to join.
      - generic [ref=f2e250]: I haven't told them I've been messaging you.
      - generic [ref=f2e253]: They knew about the number. Not that I would actually contact it.
      - generic [ref=f2e256]: I'm going to get an earful.
      - generic [ref=f2e261]: Then maybe talk to them first.
      - generic [ref=f2e264]: That's probably the sensible thing.
      - generic [ref=f2e267]: Sensible hasn't been my strongest quality this week.
      - generic [ref=f2e270]: Could I ask you something slightly unreasonable?
      - generic [ref=f2e273]: Would you consider joining the chat?
      - generic [ref=f2e276]: Only to listen at first. If you want.
      - generic [ref=f2e279]: I don't need you to promise you'll solve anything.
      - generic [ref=f2e284]: Why would I be any use?
      - generic [ref=f2e287]: You can tell us what you do and don't recognise.
      - generic [ref=f2e290]: That alone might stop us making up stories around your number.
      - generic [ref=f2e293]: Look, you can say no.
      - generic [ref=f2e296]: I won't turn it into some kind of test.
      - generic [ref=f2e299]: But if you join, there are people who'll want to ask you questions.
      - generic [ref=f2e302]: One in particular.
      - generic [ref=f2e307]: Alright. Send it.
      - generic [ref=f2e310]: Okay.
      - generic [ref=f2e313]: Thank you.
      - generic [ref=f2e316]: Fair warning.
      - generic [ref=f2e319]: The group isn't exactly having its finest week.
      - generic [ref=f2e322]: If someone comes across as rude, please don't assume everyone feels the same way.
      - generic [ref=f2e327]: I can handle a rude person.
      - generic [ref=f2e330]: I hope so.
      - generic [ref=f2e333]: I know one who could give lessons.
      - generic [ref=f2e336]: I should tell them first.
      - generic [ref=f2e339]: Actually, if I overthink this I'll never do it.
      - generic [ref=f2e342]: Hey. You got a minute?
      - generic [ref=f2e345]: Hey.
      - generic [ref=f2e348]: I'm sorry about earlier.
      - generic [ref=f2e351]: Not because Lucas disagreed with me.
      - generic [ref=f2e354]: I knew he would.
      - generic [ref=f2e357]: Because I put you in the middle of it.
      - generic [ref=f2e360]: I could actually feel myself making it worse and somehow kept talking.
      - generic [ref=f2e363]: Impressive, really.
      - generic [ref=f2e368]: That was a lot for a first meeting.
      - generic [ref=f2e371]: Yeah.
      - generic [ref=f2e374]: We usually try to save the group meltdown for the second meeting.
      - generic [ref=f2e377]: Sorry. Bad joke.
      - generic [ref=f2e380]: There's something I should've told you before I invited you.
      - generic [ref=f2e383]: Daniel isn't just someone I'm trying to find.
      - generic [ref=f2e386]: He's my brother.
      - generic [ref=f2e389]: My older brother.
      - generic [ref=f2e392]: That's why I couldn't leave the contact list alone.
      - generic [ref=f2e395]: I wasn't trying to trick you into joining us.
      - generic [ref=f2e398]: "I just kept thinking: what if this is the one person I don't ask?"
      - generic [ref=f2e403]: Daniel is your brother?
      - generic [ref=f2e406]: Yeah.
      - generic [ref=f2e409]: I should've led with that.
      - generic [ref=f2e412]: It's funny.
      - generic [ref=f2e415]: I've spent so much time saying his name lately.
      - generic [ref=f2e418]: Daniel did this. Daniel said that. Has anyone heard from Daniel?
      - generic [ref=f2e421]: I haven't told you what he's actually like.
      - generic [ref=f2e424]: Which is a strange thing to realise when he's the person I've known longest.
      - generic [ref=f2e429]: Tell me about him.
      - generic [ref=f2e432]: That's a harder question than it should be.
      - generic [ref=f2e435]: He's thoughtful. And unbelievably annoying.
      - generic [ref=f2e438]: He'll spend an entire afternoon fixing something that would've been cheaper to replace.
      - generic [ref=f2e441]: Then he'll act offended if you suggest it was a waste of time.
      - generic [ref=f2e444]: It's not always easy being his sister.
      - generic [ref=f2e447]: But it is very rarely boring.
      - generic [ref=f2e452]: He sounds stubborn.
      - generic [ref=f2e455]: Incredibly.
      - generic [ref=f2e458]: He'd give you a twenty-minute lecture on why he isn't.
      - generic [ref=f2e461]: And whenever he gets busy, he says the same thing.
      - generic [ref=f2e464]: “I'll explain later.”
      - generic [ref=f2e467]: It's become a joke between us.
      - generic [ref=f2e470]: It used to be funny.
      - generic [ref=f2e473]: Sorry. That sounds more dramatic than I meant it to.
      - generic [ref=f2e476]: I was going to tell you a better story.
      - generic [ref=f2e479]: One year he told me he couldn't make it to my birthday.
      - generic [ref=f2e482]: He said he was working late.
      - generic [ref=f2e485]: I was furious.
      - generic [ref=f2e488]: Then he turned up after dinner with a cake.
      - generic [ref=f2e491]: The icing had slid to one side.
      - generic [ref=f2e494]: Half of “Happy Birthday” was stuck to the inside of the box.
      - generic [ref=f2e497]: He looked so proud of it. 😭
      - generic [ref=f2e500]: The cake was leaning. Somehow he was the one acting offended when I laughed.
      - generic [ref=f2e505]: It's the thought that counts.
      - generic [ref=f2e508]: That's exactly what he said!
      - generic [ref=f2e511]: I swear he practised that line in the car.
      - generic [ref=f2e514]: That's the part I keep thinking about.
      - generic [ref=f2e517]: Daniel always turned up eventually.
      - generic [ref=f2e520]: Late, usually. With a terrible excuse.
      - generic [ref=f2e523]: But he turned up.
      - generic [ref=f2e526]: And now I can't get him to answer one message.
      - generic [ref=f2e529]: Sorry.
      - generic [ref=f2e532]: You didn't come here to be sad with me.
      - generic [ref=f2e537]: How long has it been?
      - generic [ref=f2e540]: A few days without a proper answer.
      - generic [ref=f2e543]: I keep counting them like it'll change something.
      - generic [ref=f2e546]: I've been rereading our last chat.
      - generic [ref=f2e549]: I know it isn't going to grow a new message if I stare long enough.
      - generic [ref=f2e552]: Doesn't stop me.
      - generic [ref=f2e555]: I still know where the conversation ends. Every time I open it.
      - generic [ref=f2e558]: I keep expecting to be wrong.
      - generic [ref=f2e563]: What did he say?
      - generic [ref=f2e566]: Nothing dramatic.
      - generic [ref=f2e569]: Normal things. That's almost worse.
      - generic [ref=f2e572]: There's somebody else I worry about just as much.
      - generic [ref=f2e575]: Maya.
      - generic [ref=f2e578]: You met her at a pretty terrible moment.
      - generic [ref=f2e581]: She's usually the one with a plan.
      - generic [ref=f2e584]: And a backup plan if the plan goes wrong.
      - generic [ref=f2e587]: She also remembers to feed the rest of us.
      - generic [ref=f2e590]: Which probably sounds like a small thing.
      - generic [ref=f2e593]: Lately it's not.
      - generic [ref=f2e598]: Why is this so personal for her?
      - generic [ref=f2e601]: She's Daniel's fiancée.
      - generic [ref=f2e604]: They were planning a wedding.
      - generic [ref=f2e607]: Maya Chen.
      - generic [ref=f2e610]: That's her full name, by the way.
      - generic [ref=f2e613]: She's frighteningly good at spreadsheets.
      - generic [ref=f2e616]: Daniel once said dating her was like having an extremely attractive project manager.
      - generic [ref=f2e619]: He said that in front of her.
      - generic [ref=f2e622]: He was lucky to survive dinner.
      - generic [ref=f2e625]: I can still hear her saying, "I am not managing you as a project, Daniel."
      - generic [ref=f2e628]: He said, "Well, the results speak for themselves."
      - generic [ref=f2e631]: And she threw a napkin at him.
      - generic [ref=f2e636]: Did they seem happy together?
      - generic [ref=f2e639]: As far as I could tell, yes.
      - generic [ref=f2e642]: I wasn't there for every private conversation, though.
      - generic [ref=f2e645]: You probably noticed she deleted a message.
      - generic [ref=f2e648]: In the group.
      - generic [ref=f2e651]: She's been very strict about not calling guesses facts.
      - generic [ref=f2e654]: She said she was trying to put a guess into words and couldn't stand behind it.
      - generic [ref=f2e657]: I only know that because she said it in the chat.
      - generic [ref=f2e660]: I didn't see what she'd deleted.
      - generic [ref=f2e665]: Did you see what it said?
      - generic [ref=f2e668]: No.
      - generic [ref=f2e671]: And I won't pretend I did.
      - generic [ref=f2e674]: And Lucas...
      - generic [ref=f2e677]: Where do I even start with Lucas?
      - generic [ref=f2e680]: He and Daniel have known each other since they were kids.
      - generic [ref=f2e683]: Lucas used to come over so often my mum stopped asking if he was staying for dinner.
      - generic [ref=f2e686]: She just put out another plate.
      - generic [ref=f2e689]: He'd complain about being treated like family.
      - generic [ref=f2e692]: Then turn up the next day anyway.
      - generic [ref=f2e695]: I don't know when the arguing stopped being the fun kind.
      - generic [ref=f2e700]: He sounded very protective.
      - generic [ref=f2e703]: He is.
      - generic [ref=f2e706]: His timing needs work. So does his delivery.
      - generic [ref=f2e709]: He and Daniel used to fight about music.
      - generic [ref=f2e712]: And football.
      - generic [ref=f2e715]: And things neither of them had the slightest idea about.
      - generic [ref=f2e718]: Then they'd share a pizza an hour later.
      - generic [ref=f2e721]: I think what's hurting Lucas is that Daniel isn't here for them to argue with.
      - generic [ref=f2e726]: Do you think he'll come back?
      - generic [ref=f2e729]: I hope so.
      - generic [ref=f2e732]: He left a chat. I don't think he stopped caring.
      - generic [ref=f2e735]: There is someone you haven't really met yet.
      - generic [ref=f2e738]: Eli.
      - generic [ref=f2e741]: She doesn't usually say much in the group.
      - generic [ref=f2e744]: Then she'll respond to a question from six hours ago like it was posted five seconds ago.
      - generic [ref=f2e747]: It's oddly impressive.
      - generic [ref=f2e750]: She once answered a question two days late with "Technically, no," and nothing else.
      - generic [ref=f2e753]: We had to ask her which question she meant.
      - generic [ref=f2e758]: Who is she?
      - generic [ref=f2e761]: Eli Ward.
      - generic [ref=f2e764]: She works with Daniel at Axiom Recovery.
      - generic [ref=f2e767]: She knows much more about Daniel's work than I do.
      - generic [ref=f2e770]: I'm the person who calls tech support and says, “the thing won't do the thing.”
      - generic [ref=f2e775]: What's Axiom Recovery?
      - generic [ref=f2e778]: Where Daniel works.
      - generic [ref=f2e781]: They do data recovery and related technical work.
      - generic [ref=f2e784]: That's about as far as my expertise goes.
      - generic [ref=f2e787]: So that's Maya, Lucas and Eli.
      - generic [ref=f2e790]: In the least useful introduction tour imaginable.
      - generic [ref=f2e793]: They have one thing in common.
      - generic [ref=f2e796]: They want Daniel back.
      - generic [ref=f2e799]: And they disagree about almost everything else.
      - generic [ref=f2e802]: I guess that's what happens when you ask five people to be scared in exactly the same way.
      - generic [ref=f2e807]: Maya seems the easiest to talk to.
      - generic [ref=f2e810]: She's good at making people feel heard.
      - generic [ref=f2e813]: Unless she's very tired. Then the sarcasm comes out.
      - generic [ref=f2e816]: Including what I say about myself.
      - generic [ref=f2e819]: I'm not some impartial narrator here.
      - generic [ref=f2e822]: I'm his sister.
      - generic [ref=f2e825]: And right now I want anything that might bring him home to mean something.
      - generic [ref=f2e828]: I'm glad you stayed, Alex.
      - generic [ref=f2e831]: I keep coming back to the number I found.
      - generic [ref=f2e834]: Your number.
      - generic [ref=f2e837]: I don't want to turn it into something it isn't.
      - generic [ref=f2e840]: But I can't make myself ignore it either.
      - generic [ref=f2e845]: Could've been saved by mistake.
      - generic [ref=f2e848]: It could.
      - generic [ref=f2e851]: I hope there turns out to be a boring answer.
      - generic [ref=f2e854]: I didn't bring you here because I thought you were a detective.
      - generic [ref=f2e857]: I don't know what you do. You don't have to tell me.
      - generic [ref=f2e860]: I just thought somebody outside all of this might notice when we're getting ahead of ourselves.
      - generic [ref=f2e863]: Maybe you've noticed already.
      - generic [ref=f2e868]: I can try to help.
      - generic [ref=f2e871]: Thank you.
      - generic [ref=f2e874]: Just don't feel like you have to promise more than that.
      - generic [ref=f2e877]: There's something I haven't shown you yet.
      - generic [ref=f2e880]: Not a private file or anything.
      - generic [ref=f2e883]: A public article.
      - generic [ref=f2e886]: People have been sharing it since Daniel stopped answering.
      - generic [ref=f2e889]: It talks about him as if it explains everything.
      - generic [ref=f2e892]: Maybe it does to some people.
      - generic [ref=f2e895]: It doesn't to me.
      - generic [ref=f2e898]: I'll find the link when I've had a chance to rest.
      - generic [ref=f2e901]: I don't think I can talk about it properly tonight.
      - generic [ref=f2e904]: And I want you to read it without me telling you what to think first.
      - generic [ref=f2e909]: That's fine. No rush.
      - generic [ref=f2e912]: Thanks.
      - generic [ref=f2e915]: I'm going to make tea.
      - generic [ref=f2e918]: Maybe find something to eat before Maya stages an intervention.
      - generic [ref=f2e921]: You've been really patient.
      - generic [ref=f2e924]: You can tell me to stop messaging, by the way.
      - generic [ref=f2e927]: I'm not always very good at knowing when to leave people alone.
      - generic [ref=f2e932]: Talk later, Sophie.
      - generic [ref=f2e935]: Talk later.
      - generic [ref=f2e938]: Hey.
      - generic [ref=f2e941]: I'm glad you stayed.
      - generic [ref=f2e944]: Goodnight.
      - generic [ref=f2e947]: I found that article. The one I mentioned.
      - generic [ref=f2e950]: Hey.
      - generic [ref=f2e953]: I found the link.
      - generic [ref=f2e956]: The one I said I'd send you.
      - generic [ref=f2e959]: I was going to send it earlier, but I kept opening it and closing it.
      - generic [ref=f2e962]: Which probably sounds ridiculous.
      - generic [ref=f2e967]: It doesn't. Send it when you're ready.
      - generic [ref=f2e970]: Thanks.
      - generic [ref=f2e973]: I don't know why a web page feels so difficult to send.
      - generic [ref=f2e976]: Do you know what the worst part is?
      - generic [ref=f2e979]: My brother has a whole life.
      - generic [ref=f2e982]: People who love him. Things he hates. A stupid mug he refuses to throw away.
      - generic [ref=f2e985]: And somehow it all fits into one article.
      - generic [ref=f2e988]: Sorry. I'm doing that thing again.
      - generic [ref=f2e993]: What thing?
      - generic [ref=f2e996]: Talking around something instead of just showing it to you.
      - generic [ref=f2e999]: Give me a second.
      - generic [ref=f2e1002]: Here.
      - generic [ref=f2e1005]: Please read the whole thing if you can.
      - generic [ref=f2e1008]: Not just the headline.
      - generic [ref=f2e1011]: You read it?
      - generic [ref=f2e1014]: I know it doesn't say anything particularly dramatic.
      - generic [ref=f2e1017]: Maybe that's why everyone keeps sharing it.
      - generic [ref=f2e1022]: It says less than the headline makes you expect.
      - generic [ref=f2e1025]: That's how I felt.
      - generic [ref=f2e1028]: It sounds like someone knows what happened until you actually read it.
      - generic [ref=f2e1031]: When it first started going around, people kept sending it to me.
      - generic [ref=f2e1034]: As if I hadn't seen it.
      - generic [ref=f2e1037]: My phone would light up and I'd think—
      - generic [ref=f2e1040]: Sorry.
      - generic [ref=f2e1043]: For half a second I'd think it might be Daniel.
      - generic [ref=f2e1048]: That must be exhausting.
      - generic [ref=f2e1051]: It is.
      - generic [ref=f2e1054]: I don't remember the last time I heard a notification and wasn't disappointed.
      - generic [ref=f2e1057]: Daniel used to make fun of newspaper headlines.
      - generic [ref=f2e1060]: Not in a mean way.
      - generic [ref=f2e1063]: He'd read one out and then go, "Well, that's not what the article says."
      - generic [ref=f2e1066]: He'd have a field day with this one.
      - generic [ref=f2e1069]: And then he'd insist I read the whole thing while I was trying to eat breakfast.
      - generic [ref=f2e1074]: The article confirms people are worried. Not what happened.
      - generic [ref=f2e1077]: Yeah.
      - generic [ref=f2e1080]: That's fair.
      - generic [ref=f2e1083]: There's one small thing about the page that bothers me.
      - generic [ref=f2e1086]: Not because I think it's some giant secret.
      - generic [ref=f2e1089]: I just keep noticing it.
      - generic [ref=f2e1092]: "It says \"Updated: Yesterday.\""
      - generic [ref=f2e1095]: I don't remember exactly what it said before.
      - generic [ref=f2e1100]: That could be a normal correction.
      - generic [ref=f2e1103]: I know.
      - generic [ref=f2e1106]: News sites correct things all the time.
      - generic [ref=f2e1109]: I'm not asking you to investigate the newspaper.
      - generic [ref=f2e1112]: That would be a pretty strange thing to ask someone I met through a contact list.
      - generic [ref=f2e1115]: Actually, this whole conversation is a pretty strange thing to ask someone I met through a contact list.
      - generic [ref=f2e1118]: I'm setting new personal records here.
      - generic [ref=f2e1121]: Maya's had a rough day.
      - generic [ref=f2e1124]: She's been fielding a lot of messages.
      - generic [ref=f2e1127]: She's trying to keep people from getting carried away.
      - generic [ref=f2e1130]: Sometimes I think she forgets she gets to be upset too.
      - generic [ref=f2e1133]: I've been staring at that update label again.
      - generic [ref=f2e1136]: Which is exactly what she would tell me not to do.
      - generic [ref=f2e1141]: Do you have a screenshot from when it was published?
      - generic [ref=f2e1144]: Not that I know of.
      - generic [ref=f2e1147]: I never thought to save one.
      - generic [ref=f2e1150]: I almost wish I hadn't brought up the update.
      - generic [ref=f2e1153]: Now it sounds like I'm accusing a newspaper of something.
      - generic [ref=f2e1156]: I'm not.
      - generic [ref=f2e1159]: I just wish I had a way to stop guessing.
      - generic [ref=f2e1162]: It's strange how quickly you start wishing you'd saved every little thing.
      - generic [ref=f2e1165]: Even the things you were sure you'd never need again.
      - generic [ref=f2e1170]: That's understandable.
      - generic [ref=f2e1173]: Yeah.
      - generic [ref=f2e1176]: I just don't want to make my own memories into evidence.
      - generic [ref=f2e1179]: I'm going to get something to eat.
      - generic [ref=f2e1182]: Before Maya decides to supervise me personally.
      - generic [ref=f2e1185]: We can talk later.
      - generic [ref=f2e1188]: And hey...
      - generic [ref=f2e1191]: Thanks for actually reading it.
      - generic [ref=f2e1194]: One more thing, if you're still awake.
      - generic [ref=f2e1197]: Hey.
      - generic [ref=f2e1200]: I promise I don't plan to send you a new article every hour.
      - generic [ref=f2e1203]: That would be a pretty terrible way to make friends.
      - generic [ref=f2e1206]: I've just been thinking about something you said.
      - generic [ref=f2e1209]: About how hard it is to know what to believe.
      - generic [ref=f2e1214]: Has it helped to talk about the article?
      - generic [ref=f2e1217]: A bit.
      - generic [ref=f2e1220]: At least I can read it without feeling like every sentence is aimed at me.
      - generic [ref=f2e1223]: I'm not expecting you to come back with answers.
      - generic [ref=f2e1226]: I hope you know that.
      - generic [ref=f2e1229]: People hear "help" and think they have to fix everything.
      - generic [ref=f2e1232]: I don't even know what fixing this would look like.
      - generic [ref=f2e1237]: I found a saved reference that may relate to the article.
      - generic [ref=f2e1240]: A reference where?
      - generic [ref=f2e1245]: In a recovered index on this device. I haven't verified its source.
      - generic [ref=f2e1248]: Okay.
      - generic [ref=f2e1251]: So we don't really know what it is yet.
      - generic [ref=f2e1254]: Thanks for telling me without making it sound like proof.
      - generic [ref=f2e1257]: I used to hate it when Daniel said, "I'll explain later."
      - generic [ref=f2e1260]: I told you about that, didn't I?
      - generic [ref=f2e1263]: I always thought he was just avoiding the conversation.
      - generic [ref=f2e1266]: Maybe sometimes he was.
      - generic [ref=f2e1269]: But sometimes...
      - generic [ref=f2e1272]: Never mind.
      - generic [ref=f2e1275]: I'm not even sure what I was trying to say.
      - generic [ref=f2e1280]: You miss him.
      - generic [ref=f2e1283]: Yeah.
      - generic [ref=f2e1286]: I really do.
      - generic [ref=f2e1289]: Sorry. That got a little heavy.
      - generic [ref=f2e1292]: Again.
      - generic [ref=f2e1295]: I swear I used to be fun at parties.
      - generic [ref=f2e1298]: At least I think I was.
      - generic [ref=f2e1303]: I'm sure you still are.
      - generic [ref=f2e1306]: You haven't seen me try to dance.
      - generic [ref=f2e1309]: Let's not get ahead of ourselves.
      - generic [ref=f2e1312]: Okay.
      - generic [ref=f2e1315]: I really am going this time.
      - generic [ref=f2e1318]: If I don't, Maya will start threatening to come over with leftovers.
      - generic [ref=f2e1321]: Actually, that might not be so bad.
      - generic [ref=f2e1324]: Don't tell her I said that.
      - generic [ref=f2e1329]: I won't. Talk later.
      - generic [ref=f2e1332]: Talk later.
      - generic [ref=f2e1335]: Thank you.
      - generic [ref=f2e1338]: For reading the whole thing.
      - generic [ref=f2e1341]: Goodnight.
      - generic [ref=f2e1345]:
        - generic [ref=f2e1346]: The following morning
        - generic [ref=f2e1347]: Hey. You around?
      - generic [ref=f2e1348]: Hey.
      - generic [ref=f2e1351]: Can I tell you something stupid?
      - generic [ref=f2e1354]: I bought a pack of pens today.
      - generic [ref=f2e1357]: Six of them. Like an entire adult who knows how to plan ahead.
      - generic [ref=f2e1360]: Daniel would have made some horrible joke about it.
      - generic [ref=f2e1363]: I nearly texted him a picture.
      - generic [ref=f2e1366]: ...
      - generic [ref=f2e1369]: Sorry. That got weird fast.
      - generic [ref=f2e1374]: You don't have to apologise for mentioning him.
      - generic [ref=f2e1377]: Thanks.
      - generic [ref=f2e1380]: I'm trying not to make every conversation about this.
      - generic [ref=f2e1383]: But some days it just is.
      - generic [ref=f2e1386]: Anyway... how's your evening?
      - generic [ref=f2e1389]: And don't feel like you have to give me a progress report.
      - generic [ref=f2e1394]: I found another public catalogue reference. Still no proof it has anything to do with Daniel.
      - generic [ref=f2e1397]: I asked you not to make this a case update tonight.
      - generic [ref=f2e1400]: I know you meant well. I just can't do it right now.
      - generic [ref=f2e1403]: Okay. I'm going to make some tea.
      - generic [ref=f2e1406]: Goodnight.
      - article "Public article link" [ref=f2e1411]:
        - generic [ref=f2e1412]: GREYHAVEN BULLETIN · LOCAL NEWS
        - strong [ref=f2e1413]: Questions Remain After Greyhaven Data Specialist Stops Responding
        - generic [ref=f2e1414]: Nora Vance
        - button "READ ARTICLE" [ref=f2e1415] [cursor=pointer]
      - generic [ref=f2e1416]: Sophie is offline.
      - button "Open FIND DANIEL →" [ref=f2e1417] [cursor=pointer]
  - navigation "Phone navigation" [ref=f2e1418]:
    - button "Go home" [ref=f2e1419] [cursor=pointer]
```

# Test source

```ts
  1  | import {test,expect,type Page} from '@playwright/test'
  2  | import {SourceFixture} from '../helpers/sourceInvestigation'
  3  | import {scene10Investigation as content} from '../../src/content/scene10Final'
  4  | import {scene10Matches} from '../../src/game/scene10Config'
  5  | import {sourceTick} from '../../src/game/sourceInvestigation'
  6  | import {seedScene,sceneReply} from './scene01-helper'
  7  | test.use({reducedMotion:'reduce'})
  8  | const click=(p:Page,name:string)=>p.getByRole('button',{name,exact:true}).first().click()
  9  | const local=(p:Page,i:number,j=0)=>click(p,(content.choices as Record<string,{options:readonly {text:string}[]}>)[`S10-C${String(i).padStart(2,'0')}`].options[j].text)
  10 | const flush=(p:Page)=>p.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
  11 | async function reload(p:Page){await flush(p);await p.reload();await click(p,'Enter the archive');await click(p,'Open The Archive')}
  12 | const base=()=>new SourceFixture().core7().enter8().core8().enter9().core9().enter10()
  13 | async function shot(p:Page,name:string){expect(await p.locator('[data-chapter1-scene="10"]').evaluate(el=>el.scrollWidth<=el.clientWidth+1)).toBe(true);await p.screenshot({path:test.info().outputPath(name+'.png')})}
  14 | async function back(p:Page){await click(p,'RETURN TO ARCHIVE WORKSPACE')}
  15 | async function core(p:Page,width:number){
  16 |  await click(p,'OPEN PUBLIC BOX INDEX');await expect(p.getByRole('article',{name:'Public box index extract'})).not.toContainText('GB-REF-017');await expect(p.getByRole('button',{name:'MARK BOX INDEX READ',exact:true})).toBeDisabled();for(const t of ['SOURCE','BOX 03','PUBLIC COVERAGE'])await click(p,'INSPECT '+t);await shot(p,`box-index-${width}`);await click(p,'MARK BOX INDEX READ');await back(p);await local(p,2,1);await local(p,3,2)
  17 |  await click(p,'FIELD GUIDE');for(const t of ['SERIES','BOX','ITEM'])await click(p,'INSPECT '+t);await local(p,4);await back(p)
  18 |  await click(p,'BOX 03 — DESCRIPTOR REFERENCE');await expect(p.getByRole('button',{name:'MARK REFERENCE INSPECTED',exact:true})).toBeDisabled();await click(p,'INSPECT DESCRIPTOR ROW');await local(p,5,2);await click(p,'MARK REFERENCE INSPECTED');await shot(p,`descriptor-${width}`);await reload(p);await back(p)
  19 |  await click(p,'BOX DATE FIELD');await click(p,'INSPECT BOX DATE FIELD');await local(p,6,1);await back(p)
  20 |  await click(p,'SOURCE-PROVENANCE COMPARISON');await expect(p.getByLabel('Private Archive comparison')).toContainText('No evidence currently links GB-REF-017');await click(p,'MARK COMPARISON READ');await local(p,7);await shot(p,`comparison-${width}`);await back(p)
  21 |  await click(p,'PUBLIC ACCESS LIMITS');await expect(p.getByRole('article',{name:'Public catalogue access note'})).not.toContainText('GB-REF-017');await click(p,'INSPECT ACCESS NOTE');await click(p,'MARK LIMITS READ');await back(p);await local(p,8,2)
  22 |  await click(p,'LOCAL CATALOGUE QUERY EXAMPLES');await expect(p.getByRole('button',{name:'INSPECT SEARCH LIMIT',exact:true})).toBeDisabled();await click(p,'GH-DSC-03-A');await expect(p.getByRole('status')).toContainText('not a negative official search');await click(p,'INSPECT SEARCH LIMIT');await back(p);await local(p,9,1);await local(p,10)
  23 |  await click(p,'ASSESS THE INVENTORY LINK');await p.getByLabel('Match publisher-unlinked',{exact:true}).selectOption('VERIFIED ORIGINAL NOTICE');await click(p,'MATCH GB-REF-017');await expect(p.getByRole('status')).toContainText('do not establish that link');for(const [from,m] of Object.entries(scene10Matches)){await p.getByLabel(`Match ${from}`,{exact:true}).selectOption(m.to);await click(p,'MATCH '+m.label)}await local(p,19,1);await shot(p,`puzzle-${width}`);await back(p)
  24 | }
  25 | for(const width of [320,375,430])test(`Scene 10 zero-Send journey: explicit sources, reference, tap puzzle, private Save and reload ${width}px`,async({page})=>{
  26 |  const f=new SourceFixture().core7().enter8().core8().enter9().core9().local(18);f.save.chapter1!.sender.blocked=true;await page.setViewportSize({width,height:800});await page.emulateMedia({colorScheme:width===375?'dark':'light'});await seedScene(page,f.save,{pauseClock:true});await click(page,'Open The Archive');await expect(page.locator('[data-chapter1-scene="9"]')).toBeVisible();await click(page,'OPEN NEXT LEAD');await expect(page.getByRole('heading',{name:'THE INVENTORY SHEET',exact:true})).toBeVisible();await expect(page.getByRole('button',{name:'OPEN CASE BOARD',exact:true})).toBeDisabled();await core(page,width);await click(page,'OPEN CASE BOARD');await expect(page.getByRole('button',{name:'SAVE PRIVATE CONCLUSION',exact:true})).toBeDisabled();await local(page,20,width===320?0:width===375?1:2);await reload(page);await click(page,'SAVE PRIVATE CONCLUSION');await back(page);await expect(page.getByRole('heading',{name:'THE INVENTORY SHEET — REVIEWED',exact:true})).toBeVisible();await click(page,'OPEN NEXT LEAD');await expect(page.getByRole('status')).toHaveText('Next lead not yet available');await shot(page,`conclusion-${width}`)
  27 | })
  28 | for(const [choice,width] of [[0,320],[1,375],[2,430]] as const)test(`Scene 10 C12 ${choice}: exact draft/review, independent receipt, delayed notice and manual inbox ${width}px`,async({page})=>{
  29 |  await page.setViewportSize({width,height:800});await seedScene(page,base().core10().save,{pauseClock:true});await click(page,'Open The Archive');await back(page);await click(page,'ASK ABOUT DESCRIPTION GH-DSC-03-A');await local(page,12,choice);await expect(page.getByRole('button',{name:'SEND ENQUIRY',exact:true})).toBeDisabled();await click(page,'REVIEW RECIPIENT AND SCOPE');await click(page,'EDIT');await expect(page.getByRole('button',{name:'SEND ENQUIRY',exact:true})).toBeDisabled();await shot(page,`form-${width}`);await click(page,'SAVE DRAFT');await reload(page);await click(page,'ASK ABOUT DESCRIPTION GH-DSC-03-A');await click(page,'REVIEW RECIPIENT AND SCOPE');await click(page,'SEND ENQUIRY');await page.clock.runFor(2000);await expect(page.getByRole('button',{name:'Open notification from Records Centre',exact:true})).toBeVisible();await click(page,'Dismiss notification');await back(page);await click(page,'OPEN CATALOGUE INBOX');await page.clock.runFor(120000);await expect(page.getByText(choice===0?'GH-DSC-03-A is a description reference printed in the public extract you quoted.':choice===1?"The publisher's label is separate from our catalogue reference.":'Public catalogue enquiries can ask whether an additional description is available for inspection.',{exact:true})).toBeVisible();await local(page,13,choice);await reload(page);await click(page,'Send');await page.clock.runFor(120000);await shot(page,`inbox-${width}`)
  30 | })
  31 | for(const width of [320,375,430])test(`Scene 10 human threads: Sophie draft/decline, group two-step Send, actual boundary ${width}px`,async({page})=>{
> 32 |  const f=base().core10(),d=f.save.chapter1!.correctionsDesk!;d.choices['S06-C09']='c';d.receipts.push({eventId:'OPEN-S06-C09-PLAYER-c',recipient:'sophie',factIds:[]});await page.setViewportSize({width,height:800});await seedScene(page,f.save,{pauseClock:true});await click(page,'Open The Archive');await back(page);await expect(page.getByRole('button',{name:'ASK NORA — EXISTING PROFESSIONAL INBOX',exact:true})).toHaveCount(0);await click(page,'CHECK ON SOPHIE');await page.clock.runFor(120000);await local(page,15,1);await flush(page);await page.reload();await click(page,'Enter the archive');await click(page,'Open Messages');await click(page,'Open Sophie conversation');await click(page,'Send');await page.clock.runFor(120000);await sceneReply(page,content.choices['S10-C16'].options[0].text);await expect(page.getByText('I asked you not to make this a case update tonight.',{exact:true})).toBeVisible();await expect(page.locator('.opening-bubble').last()).toHaveText('Goodnight.');await page.screenshot({path:test.info().outputPath(`sophie-${width}.png`)});await click(page,'Go home');await click(page,'Open The Archive');await click(page,'OPEN FIND DANIEL');await expect(page.getByText('Only these current members will receive what you Send.',{exact:false})).toBeVisible();await sceneReply(page,content.choices['S10-C17'].options[0].text);await expect(page.getByText('Could you please ask before posting more case material?',{exact:true})).toBeVisible();await sceneReply(page,content.choices['S10-C18'].options[1].text);await expect(page.getByText('Please leave me out of the detailed requests for now.',{exact:true})).toBeVisible();await page.screenshot({path:test.info().outputPath(`group-${width}.png`)})
     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ^ Error: page.screenshot: Test timeout of 180000ms exceeded.
  33 | })
  34 | test('Scene 10 prior professional Nora route opens scoped callback with no phone contact',async({page})=>{
  35 |  const f=new SourceFixture().core7();f.source({type:'panel',panel:'form'}).local(8).source({type:'review'}).source({type:'send-request'});f.save=sourceTick(f.save,f.now+=2000);f.source({type:'thread',thread:'professional'}).enter8().core8().enter9().core9().enter10().core10();await seedScene(page,f.save,{pauseClock:true});await click(page,'Open The Archive');await back(page);await click(page,'ASK NORA — EXISTING PROFESSIONAL INBOX');await page.clock.runFor(120000);await local(page,14,1);await click(page,'Send');await page.clock.runFor(120000);await expect(page.getByText("I can explain what I publish and what I can substantiate; I won't invent a document number to give you an answer.",{exact:true})).toBeVisible()
  36 | })
  37 | test.describe('optional desktop drag alternative',()=>{
  38 |  test.use({isMobile:false,hasTouch:false,viewport:{width:1000,height:900}})
  39 |  test('Scene 10 native drag records only the supported link; keyboard/tap remains available',async({page})=>{
  40 |   await seedScene(page,base().core10().save,{pauseClock:true});await click(page,'Open The Archive');await back(page);await click(page,'ASSESS THE INVENTORY LINK');await click(page,'RESET PRIVATE LINKS');const source=page.getByText('SOURCE: TRANSFER ROW → SERIES SUMMARY',{exact:true});await source.dragTo(page.getByLabel('Drop target transfer-summary',{exact:true}));await expect(page.locator('.inventory-match').first()).toContainText('RECORDED');await page.getByLabel('Match publisher-unlinked',{exact:true}).focus();await expect(page.getByLabel('Match publisher-unlinked',{exact:true})).toBeFocused();await page.getByLabel('Match publisher-unlinked',{exact:true}).selectOption('UNLINKED');await click(page,'MATCH GB-REF-017');await expect(page.locator('.inventory-match').nth(3)).toContainText('RECORDED')
  41 |  })
  42 | })
  43 | 
```