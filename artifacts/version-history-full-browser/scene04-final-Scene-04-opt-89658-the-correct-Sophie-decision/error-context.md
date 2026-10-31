# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: scene04-final.spec.ts >> Scene 04 optional group plays once and returns to the correct Sophie decision
- Location: tests\e2e\scene04-final.spec.ts:81:1

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByText('Sorry about the group.', { exact: true })
Expected: 1
Received: 0
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" getByText('Sorry about the group.', { exact: true }) with timeout 5000ms
  - waiting for getByText('Sorry about the group.', { exact: true })
    14 × locator resolved to 0 elements
       - unexpected value "0"

```

# Page snapshot

```yaml
- generic [ref=f1e4]:
  - generic "Local time 04:37 PM" [ref=f1e5]: 4:37 PM
  - region "Sophie private conversation" [ref=f1e22]:
    - generic [ref=f1e23]:
      - button "Back to inbox" [ref=f1e24] [cursor=pointer]
      - generic "Online" [ref=f1e29]
      - generic [ref=f1e30]:
        - strong [ref=f1e31]: Sophie
        - generic [ref=f1e32]: Online
      - button "View Sophie Mercer profile" [ref=f1e33] [cursor=pointer]
    - generic [ref=f1e34]:
      - generic [ref=f1e35]: Friday, January 15 · 04:00 PM
      - generic [ref=f1e37]:
        - generic [ref=f1e38]: NEW MESSAGE · Sophie
        - generic [ref=f1e39]: Hi.
      - generic [ref=f1e40]: Sorry. This is going to sound odd.
      - generic [ref=f1e43]: Is this still your number?
      - generic [ref=f1e48]: Who's asking?
      - generic [ref=f1e51]: Fair question.
      - generic [ref=f1e54]: I'm Sophie.
      - generic [ref=f1e57]: And that probably doesn't help much.
      - generic [ref=f1e60]: I don't expect you to know me.
      - generic [ref=f1e63]: I found this number saved somewhere.
      - generic [ref=f1e66]: Can I explain?
      - generic [ref=f1e71]: Go ahead.
      - generic [ref=f1e74]: Thank you.
      - generic [ref=f1e77]: It's a saved copy of someone's contacts.
      - generic [ref=f1e80]: The file says it belongs to Daniel Mercer.
      - generic [ref=f1e83]: I was looking through it earlier.
      - generic [ref=f1e86]: Your number is in there.
      - generic [ref=f1e89]: No name beside it.
      - generic [ref=f1e92]: Just a star.
      - generic [ref=f1e97]: A star?
      - generic [ref=f1e100]: Yeah. Like a favourite, maybe.
      - generic [ref=f1e103]: But I don't know what that symbol means in this file.
      - generic [ref=f1e106]: Do you know Daniel?
      - generic [ref=f1e109]: Daniel Mercer?
      - generic [ref=f1e114]: No. Never heard the name.
      - generic [ref=f1e117]: Okay.
      - generic [ref=f1e120]: That was the most likely answer, I suppose.
      - generic [ref=f1e123]: Could you think back a little?
      - generic [ref=f1e126]: Even an old online chat. A work message. Anything.
      - generic [ref=f1e129]: I'm not asking you to guess.
      - generic [ref=f1e134]: I'm sure I haven't spoken to him.
      - generic [ref=f1e137]: Then that's useful to know.
      - generic [ref=f1e140]: I thought if I asked, the answer might be simple.
      - generic [ref=f1e143]: “Oh, yeah. Daniel and I used to work together.”
      - generic [ref=f1e146]: Something like that.
      - generic [ref=f1e149]: Sorry. I'm talking as if you already know what's happened.
      - generic [ref=f1e154]: Then tell me.
      - generic [ref=f1e157]: Right.
      - generic [ref=f1e160]: Daniel stopped replying.
      - generic [ref=f1e163]: Messages. Calls.
      - generic [ref=f1e166]: For days now.
      - generic [ref=f1e169]: At first we thought he was busy.
      - generic [ref=f1e172]: Then we thought maybe he wanted space.
      - generic [ref=f1e175]: I don't know what to think anymore.
      - generic [ref=f1e180]: Have you tried checking on him in person?
      - generic [ref=f1e183]: We have tried to check he's safe.
      - generic [ref=f1e186]: I don't want to give you a version of events I'm not sure about.
      - generic [ref=f1e189]: I'm sorry. I should've said that sooner.
      - generic [ref=f1e192]: You don't owe me your time.
      - generic [ref=f1e195]: I haven't even asked what to call you.
      - generic [ref=f1e200]: You can call me Alex.
      - generic [ref=f1e203]: Alex. Got it.
      - generic [ref=f1e206]: Nice to meet you. In a very odd way.
      - generic [ref=f1e209]: You know what's strange?
      - generic [ref=f1e212]: I nearly deleted this number.
      - generic [ref=f1e215]: I had my finger over it and everything.
      - generic [ref=f1e220]: What changed your mind?
      - generic [ref=f1e223]: "I kept thinking: what if this is the one person who can tell us something ordinary and useful?"
      - generic [ref=f1e226]: I didn't want to start believing the star meant something just because I was scared.
      - generic [ref=f1e229]: But I didn't want to delete the question either.
      - generic [ref=f1e232]: There are other people trying to find him.
      - generic [ref=f1e235]: Some of us are talking in a group.
      - generic [ref=f1e238]: Well, arguing in a group, lately.
      - generic [ref=f1e243]: Who's in it?
      - generic [ref=f1e246]: People close to him.
      - generic [ref=f1e249]: I can introduce you properly if you decide to join.
      - generic [ref=f1e252]: I haven't told them I've been messaging you.
      - generic [ref=f1e255]: They knew about the number. Not that I would actually contact it.
      - generic [ref=f1e258]: I'm going to get an earful.
      - generic [ref=f1e263]: Then maybe talk to them first.
      - generic [ref=f1e266]: That's probably the sensible thing.
      - generic [ref=f1e269]: Sensible hasn't been my strongest quality this week.
      - generic [ref=f1e272]: Could I ask you something slightly unreasonable?
      - generic [ref=f1e275]: Would you consider joining the chat?
      - generic [ref=f1e278]: Only to listen at first. If you want.
      - generic [ref=f1e281]: I don't need you to promise you'll solve anything.
      - generic [ref=f1e286]: Why would I be any use?
      - generic [ref=f1e289]: You can tell us what you do and don't recognise.
      - generic [ref=f1e292]: That alone might stop us making up stories around your number.
      - generic [ref=f1e295]: Look, you can say no.
      - generic [ref=f1e298]: I won't turn it into some kind of test.
      - generic [ref=f1e301]: But if you join, there are people who'll want to ask you questions.
      - generic [ref=f1e304]: One in particular.
      - generic [ref=f1e309]: Alright. Send it.
      - generic [ref=f1e312]: Okay.
      - generic [ref=f1e315]: Thank you.
      - generic [ref=f1e318]: Fair warning.
      - generic [ref=f1e321]: The group isn't exactly having its finest week.
      - generic [ref=f1e324]: If someone comes across as rude, please don't assume everyone feels the same way.
      - generic [ref=f1e329]: I can handle a rude person.
      - generic [ref=f1e332]: I hope so.
      - generic [ref=f1e335]: I know one who could give lessons.
      - generic [ref=f1e338]: I should tell them first.
      - generic [ref=f1e341]: Actually, if I overthink this I'll never do it.
      - generic [ref=f1e345]:
        - generic [ref=f1e346]: NEW MESSAGE · Sophie
        - generic [ref=f1e347]: Hey. You got a minute?
      - generic [ref=f1e348]: Hey.
      - generic [ref=f1e351]: I'm sorry about earlier.
      - generic [ref=f1e354]: Not because Lucas disagreed with me.
      - generic [ref=f1e357]: I knew he would.
      - generic [ref=f1e360]: Because I put you in the middle of it.
      - generic [ref=f1e363]: I could actually feel myself making it worse and somehow kept talking.
      - generic [ref=f1e366]: Impressive, really.
      - generic [ref=f1e371]: That was a lot for a first meeting.
      - generic [ref=f1e374]: Yeah.
      - generic [ref=f1e377]: We usually try to save the group meltdown for the second meeting.
      - generic [ref=f1e380]: Sorry. Bad joke.
      - generic [ref=f1e383]: There's something I should've told you before I invited you.
      - generic [ref=f1e386]: Daniel isn't just someone I'm trying to find.
      - generic [ref=f1e389]: He's my brother.
      - generic [ref=f1e392]: My older brother.
      - generic [ref=f1e395]: That's why I couldn't leave the contact list alone.
      - generic [ref=f1e398]: I wasn't trying to trick you into joining us.
      - generic [ref=f1e401]: "I just kept thinking: what if this is the one person I don't ask?"
      - generic [ref=f1e406]: Daniel is your brother?
      - generic [ref=f1e409]: Yeah.
      - generic [ref=f1e412]: I should've led with that.
      - generic [ref=f1e415]: It's funny.
      - generic [ref=f1e418]: I've spent so much time saying his name lately.
      - generic [ref=f1e421]: Daniel did this. Daniel said that. Has anyone heard from Daniel?
      - generic [ref=f1e424]: I haven't told you what he's actually like.
      - generic [ref=f1e427]: Which is a strange thing to realise when he's the person I've known longest.
      - generic [ref=f1e432]: Tell me about him.
      - generic [ref=f1e435]: That's a harder question than it should be.
      - generic [ref=f1e438]: He's thoughtful. And unbelievably annoying.
      - generic [ref=f1e441]: He'll spend an entire afternoon fixing something that would've been cheaper to replace.
      - generic [ref=f1e444]: Then he'll act offended if you suggest it was a waste of time.
      - generic [ref=f1e447]: It's not always easy being his sister.
      - generic [ref=f1e450]: But it is very rarely boring.
      - generic [ref=f1e455]: He sounds stubborn.
      - generic [ref=f1e458]: Incredibly.
      - generic [ref=f1e461]: He'd give you a twenty-minute lecture on why he isn't.
      - generic [ref=f1e464]: And whenever he gets busy, he says the same thing.
      - generic [ref=f1e467]: “I'll explain later.”
      - generic [ref=f1e470]: It's become a joke between us.
      - generic [ref=f1e473]: It used to be funny.
      - generic [ref=f1e476]: Sorry. That sounds more dramatic than I meant it to.
      - generic [ref=f1e479]: I was going to tell you a better story.
      - generic [ref=f1e482]: One year he told me he couldn't make it to my birthday.
      - generic [ref=f1e485]: He said he was working late.
      - generic [ref=f1e488]: I was furious.
      - generic [ref=f1e491]: Then he turned up after dinner with a cake.
      - generic [ref=f1e494]: The icing had slid to one side.
      - generic [ref=f1e497]: Half of “Happy Birthday” was stuck to the inside of the box.
      - generic [ref=f1e500]: He looked so proud of it. 😭
      - generic [ref=f1e503]: The cake was leaning. Somehow he was the one acting offended when I laughed.
      - generic [ref=f1e508]: It's the thought that counts.
      - generic [ref=f1e511]: That's exactly what he said!
      - generic [ref=f1e514]: I swear he practised that line in the car.
      - generic [ref=f1e517]: That's the part I keep thinking about.
      - generic [ref=f1e520]: Daniel always turned up eventually.
      - generic [ref=f1e523]: Late, usually. With a terrible excuse.
      - generic [ref=f1e526]: But he turned up.
      - generic [ref=f1e529]: And now I can't get him to answer one message.
      - generic [ref=f1e532]: Sorry.
      - generic [ref=f1e535]: You didn't come here to be sad with me.
      - generic [ref=f1e540]: How long has it been?
      - generic [ref=f1e543]: A few days without a proper answer.
      - generic [ref=f1e546]: I keep counting them like it'll change something.
      - generic [ref=f1e549]: I've been rereading our last chat.
      - generic [ref=f1e552]: I know it isn't going to grow a new message if I stare long enough.
      - generic [ref=f1e555]: Doesn't stop me.
      - generic [ref=f1e558]: I still know where the conversation ends. Every time I open it.
      - generic [ref=f1e561]: I keep expecting to be wrong.
      - generic [ref=f1e566]: What did he say?
      - generic [ref=f1e569]: Nothing dramatic.
      - generic [ref=f1e572]: Normal things. That's almost worse.
      - generic [ref=f1e575]: There's somebody else I worry about just as much.
      - generic [ref=f1e578]: Maya.
      - generic [ref=f1e581]: You met her at a pretty terrible moment.
      - generic [ref=f1e584]: She's usually the one with a plan.
      - generic [ref=f1e587]: And a backup plan if the plan goes wrong.
      - generic [ref=f1e590]: She also remembers to feed the rest of us.
      - generic [ref=f1e593]: Which probably sounds like a small thing.
      - generic [ref=f1e596]: Lately it's not.
      - generic [ref=f1e601]: Why is this so personal for her?
      - generic [ref=f1e604]: She's Daniel's fiancée.
      - generic [ref=f1e607]: They were planning a wedding.
      - generic [ref=f1e610]: Maya Chen.
      - generic [ref=f1e613]: That's her full name, by the way.
      - generic [ref=f1e616]: She's frighteningly good at spreadsheets.
      - generic [ref=f1e619]: Daniel once said dating her was like having an extremely attractive project manager.
      - generic [ref=f1e622]: He said that in front of her.
      - generic [ref=f1e625]: He was lucky to survive dinner.
      - generic [ref=f1e628]: I can still hear her saying, "I am not managing you as a project, Daniel."
      - generic [ref=f1e631]: He said, "Well, the results speak for themselves."
      - generic [ref=f1e634]: And she threw a napkin at him.
      - generic [ref=f1e639]: Did they seem happy together?
      - generic [ref=f1e642]: As far as I could tell, yes.
      - generic [ref=f1e645]: I wasn't there for every private conversation, though.
      - generic [ref=f1e648]: You probably noticed she deleted a message.
      - generic [ref=f1e651]: In the group.
      - generic [ref=f1e654]: She's been very strict about not calling guesses facts.
      - generic [ref=f1e657]: She said she was trying to put a guess into words and couldn't stand behind it.
      - generic [ref=f1e660]: I only know that because she said it in the chat.
      - generic [ref=f1e663]: I didn't see what she'd deleted.
      - generic [ref=f1e668]: Did you see what it said?
      - generic [ref=f1e671]: No.
      - generic [ref=f1e674]: And I won't pretend I did.
      - generic [ref=f1e677]: And Lucas...
      - generic [ref=f1e680]: Where do I even start with Lucas?
      - generic [ref=f1e683]: He and Daniel have known each other since they were kids.
      - generic [ref=f1e686]: Lucas used to come over so often my mum stopped asking if he was staying for dinner.
      - generic [ref=f1e689]: She just put out another plate.
      - generic [ref=f1e692]: He'd complain about being treated like family.
      - generic [ref=f1e695]: Then turn up the next day anyway.
      - generic [ref=f1e698]: I don't know when the arguing stopped being the fun kind.
      - generic [ref=f1e703]: He sounded very protective.
      - generic [ref=f1e706]: He is.
      - generic [ref=f1e709]: His timing needs work. So does his delivery.
      - generic [ref=f1e712]: He and Daniel used to fight about music.
      - generic [ref=f1e715]: And football.
      - generic [ref=f1e718]: And things neither of them had the slightest idea about.
      - generic [ref=f1e721]: Then they'd share a pizza an hour later.
      - generic [ref=f1e724]: I think what's hurting Lucas is that Daniel isn't here for them to argue with.
      - generic [ref=f1e729]: Do you think he'll come back?
      - generic [ref=f1e732]: I hope so.
      - generic [ref=f1e735]: He left a chat. I don't think he stopped caring.
      - generic [ref=f1e738]: There is someone you haven't really met yet.
      - generic [ref=f1e741]: Eli.
      - generic [ref=f1e744]: She doesn't usually say much in the group.
      - generic [ref=f1e747]: Then she'll respond to a question from six hours ago like it was posted five seconds ago.
      - generic [ref=f1e750]: It's oddly impressive.
      - generic [ref=f1e753]: She once answered a question two days late with "Technically, no," and nothing else.
      - generic [ref=f1e756]: We had to ask her which question she meant.
      - generic [ref=f1e761]: Who is she?
      - generic [ref=f1e764]: Eli Ward.
      - generic [ref=f1e767]: She works with Daniel at Axiom Recovery.
      - generic [ref=f1e770]: She knows much more about Daniel's work than I do.
      - generic [ref=f1e773]: I'm the person who calls tech support and says, “the thing won't do the thing.”
      - generic [ref=f1e778]: What's Axiom Recovery?
      - generic [ref=f1e781]: Where Daniel works.
      - generic [ref=f1e784]: They do data recovery and related technical work.
      - generic [ref=f1e787]: That's about as far as my expertise goes.
      - generic [ref=f1e790]: So that's Maya, Lucas and Eli.
      - generic [ref=f1e793]: In the least useful introduction tour imaginable.
      - generic [ref=f1e796]: They have one thing in common.
      - generic [ref=f1e799]: They want Daniel back.
      - generic [ref=f1e802]: And they disagree about almost everything else.
      - generic [ref=f1e805]: I guess that's what happens when you ask five people to be scared in exactly the same way.
      - generic [ref=f1e810]: Maya seems the easiest to talk to.
      - generic [ref=f1e813]: She's good at making people feel heard.
      - generic [ref=f1e816]: Unless she's very tired. Then the sarcasm comes out.
      - generic [ref=f1e819]: Including what I say about myself.
      - generic [ref=f1e822]: I'm not some impartial narrator here.
      - generic [ref=f1e825]: I'm his sister.
      - generic [ref=f1e828]: And right now I want anything that might bring him home to mean something.
      - generic [ref=f1e831]: I'm glad you stayed, Alex.
      - generic [ref=f1e834]: I keep coming back to the number I found.
      - generic [ref=f1e837]: Your number.
      - generic [ref=f1e840]: I don't want to turn it into something it isn't.
      - generic [ref=f1e843]: But I can't make myself ignore it either.
      - generic [ref=f1e848]: Could've been saved by mistake.
      - generic [ref=f1e851]: It could.
      - generic [ref=f1e854]: I hope there turns out to be a boring answer.
      - generic [ref=f1e857]: I didn't bring you here because I thought you were a detective.
      - generic [ref=f1e860]: I don't know what you do. You don't have to tell me.
      - generic [ref=f1e863]: I just thought somebody outside all of this might notice when we're getting ahead of ourselves.
      - generic [ref=f1e866]: Maybe you've noticed already.
      - generic [ref=f1e871]: I can try to help.
      - generic [ref=f1e874]: Thank you.
      - generic [ref=f1e877]: Just don't feel like you have to promise more than that.
      - generic [ref=f1e880]: There's something I haven't shown you yet.
      - generic [ref=f1e883]: Not a private file or anything.
      - generic [ref=f1e886]: A public article.
      - generic [ref=f1e889]: People have been sharing it since Daniel stopped answering.
      - generic [ref=f1e892]: It talks about him as if it explains everything.
      - generic [ref=f1e895]: Maybe it does to some people.
      - generic [ref=f1e898]: It doesn't to me.
      - generic [ref=f1e901]: I'll find the link when I've had a chance to rest.
      - generic [ref=f1e904]: I don't think I can talk about it properly tonight.
      - generic [ref=f1e907]: And I want you to read it without me telling you what to think first.
      - generic [ref=f1e912]: That's fine. No rush.
      - generic [ref=f1e915]: Thanks.
      - generic [ref=f1e918]: I'm going to make tea.
      - generic [ref=f1e921]: Maybe find something to eat before Maya stages an intervention.
      - generic [ref=f1e924]: You've been really patient.
      - generic [ref=f1e927]: You can tell me to stop messaging, by the way.
      - generic [ref=f1e930]: I'm not always very good at knowing when to leave people alone.
      - generic [ref=f1e935]: Talk later, Sophie.
      - generic [ref=f1e938]: Talk later.
      - generic [ref=f1e941]: Hey.
      - generic [ref=f1e944]: I'm glad you stayed.
      - generic [ref=f1e947]: Goodnight.
      - generic [ref=f1e951]:
        - generic [ref=f1e952]: NEW MESSAGE · Sophie
        - generic [ref=f1e953]: I found that article. The one I mentioned.
      - generic [ref=f1e954]: Hey.
      - generic [ref=f1e957]: I found the link.
      - generic [ref=f1e960]: The one I said I'd send you.
      - generic [ref=f1e963]: I was going to send it earlier, but I kept opening it and closing it.
      - generic [ref=f1e966]: Which probably sounds ridiculous.
      - generic [ref=f1e971]: It doesn't. Send it when you're ready.
      - generic [ref=f1e974]: Thanks.
      - generic [ref=f1e977]: I don't know why a web page feels so difficult to send.
      - generic [ref=f1e980]: Do you know what the worst part is?
      - generic [ref=f1e983]: My brother has a whole life.
      - generic [ref=f1e986]: People who love him. Things he hates. A stupid mug he refuses to throw away.
      - generic [ref=f1e989]: And somehow it all fits into one article.
      - generic [ref=f1e992]: Sorry. I'm doing that thing again.
      - generic [ref=f1e997]: What thing?
      - generic [ref=f1e1000]: Talking around something instead of just showing it to you.
      - generic [ref=f1e1003]: Give me a second.
      - generic [ref=f1e1006]: Here.
      - generic [ref=f1e1009]: Please read the whole thing if you can.
      - generic [ref=f1e1012]: Not just the headline.
      - article "Public article link" [ref=f1e1017]:
        - generic [ref=f1e1018]: GREYHAVEN BULLETIN · LOCAL NEWS
        - strong [ref=f1e1019]: Questions Remain After Greyhaven Data Specialist Stops Responding
        - generic [ref=f1e1020]: Nora Vance
        - button "READ ARTICLE" [ref=f1e1021] [cursor=pointer]
      - generic [ref=f1e1022]: You read it?
      - generic [ref=f1e1025]: I know it doesn't say anything particularly dramatic.
      - generic [ref=f1e1028]: Maybe that's why everyone keeps sharing it.
      - generic [ref=f1e1033]: It says less than the headline makes you expect.
      - generic [ref=f1e1036]: That's how I felt.
      - generic [ref=f1e1039]: It sounds like someone knows what happened until you actually read it.
      - generic [ref=f1e1042]: When it first started going around, people kept sending it to me.
      - generic [ref=f1e1045]: As if I hadn't seen it.
      - generic [ref=f1e1048]: My phone would light up and I'd think—
      - generic [ref=f1e1051]: Sorry.
      - generic [ref=f1e1054]: For half a second I'd think it might be Daniel.
      - generic [ref=f1e1059]: That must be exhausting.
      - generic [ref=f1e1062]: It is.
      - generic [ref=f1e1065]: I don't remember the last time I heard a notification and wasn't disappointed.
      - generic [ref=f1e1068]: Daniel used to make fun of newspaper headlines.
      - generic [ref=f1e1071]: Not in a mean way.
      - generic [ref=f1e1074]: He'd read one out and then go, "Well, that's not what the article says."
      - generic [ref=f1e1077]: He'd have a field day with this one.
      - generic [ref=f1e1080]: And then he'd insist I read the whole thing while I was trying to eat breakfast.
      - generic [ref=f1e1085]: The article confirms people are worried. Not what happened.
      - generic [ref=f1e1088]: Yeah.
      - generic [ref=f1e1091]: That's fair.
      - generic [ref=f1e1094]: There's one small thing about the page that bothers me.
      - generic [ref=f1e1097]: Not because I think it's some giant secret.
      - generic [ref=f1e1100]: I just keep noticing it.
      - generic [ref=f1e1103]: "It says \"Updated: Yesterday.\""
      - generic [ref=f1e1106]: I don't remember exactly what it said before.
      - generic [ref=f1e1111]: That could be a normal correction.
      - generic [ref=f1e1114]: I know.
      - generic [ref=f1e1117]: News sites correct things all the time.
      - generic [ref=f1e1120]: I'm not asking you to investigate the newspaper.
      - generic [ref=f1e1123]: That would be a pretty strange thing to ask someone I met through a contact list.
      - generic [ref=f1e1126]: Actually, this whole conversation is a pretty strange thing to ask someone I met through a contact list.
      - generic [ref=f1e1129]: I'm setting new personal records here.
      - generic [ref=f1e1132]: Maya's had a rough day.
      - generic [ref=f1e1135]: She's been fielding a lot of messages.
      - generic [ref=f1e1138]: She's trying to keep people from getting carried away.
      - generic [ref=f1e1141]: Sometimes I think she forgets she gets to be upset too.
      - generic [ref=f1e1144]: I've been staring at that update label again.
      - generic [ref=f1e1147]: Which is exactly what she would tell me not to do.
    - generic [ref=f1e1152]:
      - generic [ref=f1e1153]: Choose a reply
      - generic [ref=f1e1154]:
        - button "Do you have a screenshot from when it was published?" [ref=f1e1155] [cursor=pointer]
        - button "What do you remember about the earlier article?" [ref=f1e1156] [cursor=pointer]
        - button "Maybe the update was just spelling." [ref=f1e1157] [cursor=pointer]
        - button "We should keep the current article separate from what you remember." [ref=f1e1158] [cursor=pointer]
      - button "Send" [disabled] [ref=f1e1159]
  - navigation "Phone navigation" [ref=f1e1163]:
    - button "Go home" [ref=f1e1164] [cursor=pointer]
```

# Test source

```ts
  1   | import {scene06Local} from '../../src/content/scene06Final'
  2   | import {scene05Local,scene05Checklist} from '../../src/content/scene05Final'
  3   | import {test,expect,type Page} from '@playwright/test'
  4   | import {Scene05Fixture} from '../helpers/scene05Final'
  5   | import {Scene04Fixture} from '../helpers/scene04Final'
  6   | import {seedScene,openSophie,sceneReply} from './scene01-helper'
  7   | test.use({reducedMotion:'reduce'})
  8   | const click=async(page:Page,name:string)=>page.getByRole('button',{name,exact:true}).first().click()
  9   | const flush=async(page:Page)=>page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
  10  | 
  11  | test('Scene 04 full manual route: article, skipped optional group, index choices, final Sophie and deliberate Scene 05 entry',async({page})=>{
  12  |   test.setTimeout(150000)
  13  |   await page.setViewportSize({width:320,height:720})
  14  |   await seedScene(page,new Scene04Fixture().at('OPEN-S04-C02').save)
  15  |   await openSophie(page)
  16  |   await sceneReply(page,'What thing?')
  17  |   await expect(page.getByRole('article',{name:'Public article link'})).toBeVisible()
  18  |   await click(page,'Back to inbox')
  19  |   await flush(page);await page.reload();await click(page,'Enter the archive');await openSophie(page)
  20  |   await click(page,'READ ARTICLE')
  21  |   await expect(page.getByRole('region',{name:'Greyhaven Bulletin public article'})).toBeVisible()
  22  |   await expect(page.locator('[data-paragraph]')).toHaveCount(6)
  23  |   await page.screenshot({path:test.info().outputPath('public-article-320.png')})
  24  |   await click(page,'By Nora Vance')
  25  |   await expect(page.getByRole('dialog',{name:'Nora Vance public byline'})).toBeVisible()
  26  |   await expect(page.getByText('No private contact information is provided.',{exact:false})).toBeVisible()
  27  |   await click(page,'Close article information')
  28  |   await click(page,'Updated: Yesterday')
  29  |   await expect(page.getByText('This page displays a later update time. A change log is not shown on this page.')).toBeVisible()
  30  |   await click(page,'Close article information')
  31  |   await click(page,'Mark as read');await click(page,'Save article');await click(page,'Close article')
  32  |   await page.clock.runFor(120000)
  33  |   await sceneReply(page,'It says less than the headline makes you expect.')
  34  |   await sceneReply(page,'That must be exhausting.')
  35  |   await sceneReply(page,'The article confirms people are worried. Not what happened.')
  36  |   await sceneReply(page,'That could be a normal correction.')
  37  |   await click(page,'Back to inbox');await click(page,'Open Sophie conversation');await page.clock.runFor(120000)
  38  |   await sceneReply(page,'Do you have a screenshot from when it was published?')
  39  |   await sceneReply(page,"That's understandable.")
  40  |   await click(page,'Open The Archive')
  41  |   await expect(page.getByRole('region',{name:'Scene 04 Archive index'})).toBeVisible()
  42  |   await click(page,'OPEN INDEX')
  43  |   await expect(page.getByText('CONTENT PREVIEW: UNAVAILABLE IN THIS INDEX VIEW',{exact:false})).toBeVisible()
  44  |   await expect(page.getByText('JUNE ELLIS',{exact:false})).toHaveCount(0)
  45  |   await page.screenshot({path:test.info().outputPath('archive-index-320.png')})
  46  |   await click(page,"It's a reference that might be connected.");await click(page,'Record selection')
  47  |   await expect(page.getByRole('status')).toContainText('unverified')
  48  |   await click(page,'ACKNOWLEDGE LIMITATIONS')
  49  |   await click(page,"Don't save either item yet.");await click(page,'Record selection')
  50  |   await expect(page.getByRole('button',{name:'REVIEW VERSION HISTORY',exact:true})).toBeDisabled()
  51  |   await click(page,'RETURN TO DEVICE');await page.clock.runFor(10000)
  52  |   await openSophie(page);await page.clock.runFor(120000)
  53  |   await expect(page.locator('[data-scene-node="OPEN-S04-C12"]')).toBeVisible()
  54  |   await sceneReply(page,'Has it helped to talk about the article?')
  55  |   await sceneReply(page,'I found a saved reference that may relate to the article.')
  56  |   await sceneReply(page,"In a recovered index on this device. I haven't verified its source.")
  57  |   await sceneReply(page,'You miss him.')
  58  |   await sceneReply(page,"I'm sure you still are.")
  59  |   await sceneReply(page,"I won't. Talk later.")
  60  |   await expect(page.locator('.opening-bubble').last()).toHaveText('Goodnight.')
  61  |   await click(page,'Go home');await click(page,'Open The Archive')
  62  |   await expect(page.getByRole('button',{name:'REVIEW VERSION HISTORY',exact:true})).toBeEnabled()
  63  |   await seedScene(page,new Scene05Fixture().save);await click(page,'Open The Archive')
  64  |   await expect(page.getByRole('region',{name:'Chapter 1 investigation'})).toHaveAttribute('data-chapter1-scene','5')
  65  |   await click(page,'OPEN PUBLIC COPY');await click(page,'RETURN TO VERSION HISTORY')
  66  |   await click(page,'INSPECT INDEX');await click(page,'RETURN TO VERSION HISTORY')
  67  |   await click(page,scene05Local['S05-C01'][0].text)
  68  |   await click(page,'HOW THE BULLETIN LABELS UPDATES');await click(page,'READ POLICY');await click(page,'RETURN TO VERSION HISTORY')
  69  |   await click(page,scene05Local['S05-C02'][1].text)
  70  |   for(const [label] of scene05Checklist)await click(page,label)
  71  |   await click(page,scene05Local['S05-C03'][1].text);await click(page,scene05Local['S05-C11'][0].text)
  72  |   await expect(page.getByRole('heading',{name:'VERSION HISTORY — REVIEWED',exact:true})).toBeVisible()
  73  |   await click(page,'OPEN NEXT LEAD');await expect(page.getByRole('heading',{name:'THE CORRECTIONS DESK',exact:true})).toBeVisible()
  74  |   await click(page,'OPEN PUBLIC CORRECTIONS REGISTER');await click(page,'READ REGISTER');await click(page,'RETURN TO DESK')
  75  |   await click(page,'HOW DOES THE DESK HANDLE UPDATES?');await click(page,'READ AND ACKNOWLEDGE');await click(page,'RETURN TO DESK');await click(page,scene06Local['S06-C03'][1].text)
  76  |   for(const name of ['CARD 1 — THE ARTICLE','CARD 2 — THE INDEX','CARD 3 — THE CORRECTIONS REGISTER'])await click(page,name)
  77  |   await click(page,scene06Local['S06-C04'][2].text);await click(page,scene06Local['S06-C07'][0].text);await click(page,scene06Local['S06-C14'][0].text)
  78  |   await click(page,'OPEN NEXT LEAD');await expect(page.getByRole('heading',{name:'THE BYLINE',exact:true})).toBeVisible()
  79  | })
  80  | 
  81  | test('Scene 04 optional group plays once and returns to the correct Sophie decision',async({page})=>{
  82  |   await seedScene(page,new Scene04Fixture().at('OPEN-S04-GROUP-OFFER').save)
  83  |   await openSophie(page)
  84  |   await click(page,'Back to inbox');await click(page,'Open FIND DANIEL group conversation');await page.clock.runFor(120000)
  85  |   await expect(page.locator('[data-scene-node="OPEN-S04-C07"]')).toBeVisible()
  86  |   await expect(page.getByLabel('Maya online',{exact:true}).first()).toBeVisible()
  87  |   await expect(page.getByLabel('Sophie online',{exact:true}).first()).toBeVisible()
  88  |   await sceneReply(page,"I haven't shared it publicly.")
  89  |   await click(page,'Back to inbox');await click(page,'Open Sophie conversation');await page.clock.runFor(120000)
  90  |   await expect(page.locator('[data-scene-node="OPEN-S04-C08"]')).toBeVisible()
> 91  |   await expect(page.getByText('Sorry about the group.',{exact:true})).toHaveCount(1)
      |                                                                       ^ Error: expect(locator).toHaveCount(expected) failed
  92  | })
  93  | 
  94  | test('Scene 04 index selection survives reload; Archive selections create separately labelled sources without player bubbles',async({page})=>{
  95  |   await seedScene(page,new Scene04Fixture().at('OPEN-S04-ARCHIVE-GATE').save)
  96  |   await click(page,'Open The Archive');await click(page,'OPEN INDEX')
  97  |   await click(page,"It's a reference that might be connected.")
  98  |   await flush(page);await page.reload();await click(page,'Enter the archive');await click(page,'Open The Archive')
  99  |   await expect(page.getByRole('button',{name:"It's a reference that might be connected.",exact:true})).toHaveAttribute('aria-pressed','true')
  100 |   await click(page,'Record selection');await click(page,'ACKNOWLEDGE LIMITATIONS')
  101 |   await click(page,'Save the public article and this index entry separately.');await click(page,'Record selection')
  102 |   await flush(page)
  103 |   const recorded=await page.evaluate(async()=>{
  104 |     const db=await new Promise<IDBDatabase>((resolve,reject)=>{const r=indexedDB.open('the-archive-reboot',1);r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})
  105 |     const s=await new Promise<any>((resolve,reject)=>{const r=db.transaction('saves').objectStore('saves').get('primary');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})
  106 |     db.close();return {sources:s.evidence,uiBubbles:s.prologue.scene01.messages.filter((m:{id:string})=>/^OPEN-S04-C1[01]-PLAYER/.test(m.id))}
  107 |   })
  108 |   expect(recorded.sources['EV-PUBLIC-GB-001'].verified).toBe(false)
  109 |   expect(recorded.sources['EV-INDEX-GB-041'].verified).toBe(false)
  110 |   expect(recorded.sources['EV-PUBLIC-GB-001'].source).toContain('public published copy')
  111 |   expect(recorded.sources['EV-INDEX-GB-041'].source).toContain('source UNKNOWN')
  112 |   expect(recorded.uiBubbles).toEqual([])
  113 | })
  114 | 
```