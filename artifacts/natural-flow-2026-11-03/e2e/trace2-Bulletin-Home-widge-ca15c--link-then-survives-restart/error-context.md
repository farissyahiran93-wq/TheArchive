# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: trace2.spec.ts >> Bulletin Home widget stays empty until Sophie delivers the authored link, then survives restart
- Location: tests\e2e\trace2.spec.ts:12:1

# Error details

```
Test timeout of 90000ms exceeded.
```

```
Error: locator.click: Test timeout of 90000ms exceeded.
Call log:
  - waiting for locator('.scene01-options button').first()

```

# Page snapshot

```yaml
- generic [ref=f3e4]:
  - generic "Local time 04:34 PM" [ref=f3e5]: 4:34 PM
  - generic [ref=f3e21]:
    - generic [ref=f3e22]:
      - generic [ref=f3e23]: GREYHAVEN
      - button "Main Menu" [ref=f3e24] [cursor=pointer]
    - region "Sophie private conversation" [ref=f3e25]:
      - generic [ref=f3e26]:
        - button "Back to inbox" [ref=f3e27] [cursor=pointer]
        - generic "Online" [ref=f3e32]
        - generic [ref=f3e33]:
          - strong [ref=f3e34]: Sophie
          - generic [ref=f3e35]: Online
        - button "View Sophie Mercer profile" [ref=f3e36] [cursor=pointer]
      - generic [ref=f3e37]:
        - generic [ref=f3e38]: Friday, January 15 · 04:00 PM
        - generic [ref=f3e40]:
          - generic [ref=f3e41]: NEW MESSAGE · Sophie
          - generic [ref=f3e42]: Hi.
        - generic [ref=f3e43]: Sorry. This is going to sound odd.
        - generic [ref=f3e46]: Is this still your number?
        - generic [ref=f3e51]: Who's asking?
        - generic [ref=f3e54]: Fair question.
        - generic [ref=f3e57]: I'm Sophie.
        - generic [ref=f3e60]: And that probably doesn't help much.
        - generic [ref=f3e63]: I don't expect you to know me.
        - generic [ref=f3e66]: I found this number saved somewhere.
        - generic [ref=f3e69]: Can I explain?
        - generic [ref=f3e74]: Go ahead.
        - generic [ref=f3e77]: Thank you.
        - generic [ref=f3e80]: It's a saved copy of someone's contacts.
        - generic [ref=f3e83]: The file says it belongs to Daniel Mercer.
        - generic [ref=f3e86]: I was looking through it earlier.
        - generic [ref=f3e89]: Your number is in there.
        - generic [ref=f3e92]: No name beside it.
        - generic [ref=f3e95]: Just a star.
        - generic [ref=f3e100]: A star?
        - generic [ref=f3e103]: Yeah. Like a favourite, maybe.
        - generic [ref=f3e106]: But I don't know what that symbol means in this file.
        - generic [ref=f3e109]: Do you know Daniel?
        - generic [ref=f3e112]: Daniel Mercer?
        - generic [ref=f3e117]: No. Never heard the name.
        - generic [ref=f3e120]: Okay.
        - generic [ref=f3e123]: That was the most likely answer, I suppose.
        - generic [ref=f3e126]: Could you think back a little?
        - generic [ref=f3e129]: Even an old online chat. A work message. Anything.
        - generic [ref=f3e132]: I'm not asking you to guess.
        - generic [ref=f3e137]: I'm sure I haven't spoken to him.
        - generic [ref=f3e140]: Then that's useful to know.
        - generic [ref=f3e143]: I thought if I asked, the answer might be simple.
        - generic [ref=f3e146]: “Oh, yeah. Daniel and I used to work together.”
        - generic [ref=f3e149]: Something like that.
        - generic [ref=f3e152]: Sorry. I'm talking as if you already know what's happened.
        - generic [ref=f3e157]: Then tell me.
        - generic [ref=f3e160]: Right.
        - generic [ref=f3e163]: Daniel stopped replying.
        - generic [ref=f3e166]: Messages. Calls.
        - generic [ref=f3e169]: For days now.
        - generic [ref=f3e172]: At first we thought he was busy.
        - generic [ref=f3e175]: Then we thought maybe he wanted space.
        - generic [ref=f3e178]: I don't know what to think anymore.
        - generic [ref=f3e183]: Have you tried checking on him in person?
        - generic [ref=f3e186]: We have tried to check he's safe.
        - generic [ref=f3e189]: I don't want to give you a version of events I'm not sure about.
        - generic [ref=f3e192]: I'm sorry. I should've said that sooner.
        - generic [ref=f3e195]: You don't owe me your time.
        - generic [ref=f3e198]: I haven't even asked what to call you.
        - generic [ref=f3e203]: You can call me Alex.
        - generic [ref=f3e206]: Alex. Got it.
        - generic [ref=f3e209]: Nice to meet you. In a very odd way.
        - generic [ref=f3e212]: You know what's strange?
        - generic [ref=f3e215]: I nearly deleted this number.
        - generic [ref=f3e218]: I had my finger over it and everything.
        - generic [ref=f3e223]: What changed your mind?
        - generic [ref=f3e226]: "I kept thinking: what if this is the one person who can tell us something ordinary and useful?"
        - generic [ref=f3e229]: I didn't want to start believing the star meant something just because I was scared.
        - generic [ref=f3e232]: But I didn't want to delete the question either.
        - generic [ref=f3e235]: There are other people trying to find him.
        - generic [ref=f3e238]: Some of us are talking in a group.
        - generic [ref=f3e241]: Well, arguing in a group, lately.
        - generic [ref=f3e246]: Who's in it?
        - generic [ref=f3e249]: People close to him.
        - generic [ref=f3e252]: I can introduce you properly if you decide to join.
        - generic [ref=f3e255]: I haven't told them I've been messaging you.
        - generic [ref=f3e258]: They knew about the number. Not that I would actually contact it.
        - generic [ref=f3e261]: I'm going to get an earful.
        - generic [ref=f3e266]: Then maybe talk to them first.
        - generic [ref=f3e269]: That's probably the sensible thing.
        - generic [ref=f3e272]: Sensible hasn't been my strongest quality this week.
        - generic [ref=f3e275]: Could I ask you something slightly unreasonable?
        - generic [ref=f3e278]: Would you consider joining the chat?
        - generic [ref=f3e281]: Only to listen at first. If you want.
        - generic [ref=f3e284]: I don't need you to promise you'll solve anything.
        - generic [ref=f3e289]: Why would I be any use?
        - generic [ref=f3e292]: You can tell us what you do and don't recognise.
        - generic [ref=f3e295]: That alone might stop us making up stories around your number.
        - generic [ref=f3e298]: Look, you can say no.
        - generic [ref=f3e301]: I won't turn it into some kind of test.
        - generic [ref=f3e304]: But if you join, there are people who'll want to ask you questions.
        - generic [ref=f3e307]: One in particular.
        - generic [ref=f3e312]: Alright. Send it.
        - generic [ref=f3e315]: Okay.
        - generic [ref=f3e318]: Thank you.
        - generic [ref=f3e321]: Fair warning.
        - generic [ref=f3e324]: The group isn't exactly having its finest week.
        - generic [ref=f3e327]: If someone comes across as rude, please don't assume everyone feels the same way.
        - generic [ref=f3e332]: I can handle a rude person.
        - generic [ref=f3e335]: I hope so.
        - generic [ref=f3e338]: I know one who could give lessons.
        - generic [ref=f3e341]: I should tell them first.
        - generic [ref=f3e344]: Actually, if I overthink this I'll never do it.
        - generic [ref=f3e348]:
          - generic [ref=f3e349]: NEW MESSAGE · Sophie
          - generic [ref=f3e350]: Hey. You got a minute?
        - generic [ref=f3e351]: Hey.
        - generic [ref=f3e354]: I'm sorry about earlier.
        - generic [ref=f3e357]: Not because Lucas disagreed with me.
        - generic [ref=f3e360]: I knew he would.
        - generic [ref=f3e363]: Because I put you in the middle of it.
        - generic [ref=f3e366]: I could actually feel myself making it worse and somehow kept talking.
        - generic [ref=f3e369]: Impressive, really.
        - generic [ref=f3e374]: That was a lot for a first meeting.
        - generic [ref=f3e377]: Yeah.
        - generic [ref=f3e380]: We usually try to save the group meltdown for the second meeting.
        - generic [ref=f3e383]: Sorry. Bad joke.
        - generic [ref=f3e386]: There's something I should've told you before I invited you.
        - generic [ref=f3e389]: Daniel isn't just someone I'm trying to find.
        - generic [ref=f3e392]: He's my brother.
        - generic [ref=f3e395]: My older brother.
        - generic [ref=f3e398]: That's why I couldn't leave the contact list alone.
        - generic [ref=f3e401]: I wasn't trying to trick you into joining us.
        - generic [ref=f3e404]: "I just kept thinking: what if this is the one person I don't ask?"
        - generic [ref=f3e409]: Daniel is your brother?
        - generic [ref=f3e412]: Yeah.
        - generic [ref=f3e415]: I should've led with that.
        - generic [ref=f3e418]: It's funny.
        - generic [ref=f3e421]: I've spent so much time saying his name lately.
        - generic [ref=f3e424]: Daniel did this. Daniel said that. Has anyone heard from Daniel?
        - generic [ref=f3e427]: I haven't told you what he's actually like.
        - generic [ref=f3e430]: Which is a strange thing to realise when he's the person I've known longest.
        - generic [ref=f3e435]: Tell me about him.
        - generic [ref=f3e438]: That's a harder question than it should be.
        - generic [ref=f3e441]: He's thoughtful. And unbelievably annoying.
        - generic [ref=f3e444]: He'll spend an entire afternoon fixing something that would've been cheaper to replace.
        - generic [ref=f3e447]: Then he'll act offended if you suggest it was a waste of time.
        - generic [ref=f3e450]: It's not always easy being his sister.
        - generic [ref=f3e453]: But it is very rarely boring.
        - generic [ref=f3e458]: He sounds stubborn.
        - generic [ref=f3e461]: Incredibly.
        - generic [ref=f3e464]: He'd give you a twenty-minute lecture on why he isn't.
        - generic [ref=f3e467]: And whenever he gets busy, he says the same thing.
        - generic [ref=f3e470]: “I'll explain later.”
        - generic [ref=f3e473]: It's become a joke between us.
        - generic [ref=f3e476]: It used to be funny.
        - generic [ref=f3e479]: Sorry. That sounds more dramatic than I meant it to.
        - generic [ref=f3e482]: I was going to tell you a better story.
        - generic [ref=f3e485]: One year he told me he couldn't make it to my birthday.
        - generic [ref=f3e488]: He said he was working late.
        - generic [ref=f3e491]: I was furious.
        - generic [ref=f3e494]: Then he turned up after dinner with a cake.
        - generic [ref=f3e497]: The icing had slid to one side.
        - generic [ref=f3e500]: Half of “Happy Birthday” was stuck to the inside of the box.
        - generic [ref=f3e503]: He looked so proud of it. 😭
        - generic [ref=f3e506]: The cake was leaning. Somehow he was the one acting offended when I laughed.
        - generic [ref=f3e511]: It's the thought that counts.
        - generic [ref=f3e514]: That's exactly what he said!
        - generic [ref=f3e517]: I swear he practised that line in the car.
        - generic [ref=f3e520]: That's the part I keep thinking about.
        - generic [ref=f3e523]: Daniel always turned up eventually.
        - generic [ref=f3e526]: Late, usually. With a terrible excuse.
        - generic [ref=f3e529]: But he turned up.
        - generic [ref=f3e532]: And now I can't get him to answer one message.
        - generic [ref=f3e535]: Sorry.
        - generic [ref=f3e538]: You didn't come here to be sad with me.
        - generic [ref=f3e543]: How long has it been?
        - generic [ref=f3e546]: A few days without a proper answer.
        - generic [ref=f3e549]: I keep counting them like it'll change something.
        - generic [ref=f3e552]: I've been rereading our last chat.
        - generic [ref=f3e555]: I know it isn't going to grow a new message if I stare long enough.
        - generic [ref=f3e558]: Doesn't stop me.
        - generic [ref=f3e561]: I still know where the conversation ends. Every time I open it.
        - generic [ref=f3e564]: I keep expecting to be wrong.
        - generic [ref=f3e569]: What did he say?
        - generic [ref=f3e572]: Nothing dramatic.
        - generic [ref=f3e575]: Normal things. That's almost worse.
        - generic [ref=f3e578]: There's somebody else I worry about just as much.
        - generic [ref=f3e581]: Maya.
        - generic [ref=f3e584]: You met her at a pretty terrible moment.
        - generic [ref=f3e587]: She's usually the one with a plan.
        - generic [ref=f3e590]: And a backup plan if the plan goes wrong.
        - generic [ref=f3e593]: She also remembers to feed the rest of us.
        - generic [ref=f3e596]: Which probably sounds like a small thing.
        - generic [ref=f3e599]: Lately it's not.
        - generic [ref=f3e604]: Why is this so personal for her?
        - generic [ref=f3e607]: She's Daniel's fiancée.
        - generic [ref=f3e610]: They were planning a wedding.
        - generic [ref=f3e613]: Maya Chen.
        - generic [ref=f3e616]: That's her full name, by the way.
        - generic [ref=f3e619]: She's frighteningly good at spreadsheets.
        - generic [ref=f3e622]: Daniel once said dating her was like having an extremely attractive project manager.
        - generic [ref=f3e625]: He said that in front of her.
        - generic [ref=f3e628]: He was lucky to survive dinner.
        - generic [ref=f3e631]: I can still hear her saying, "I am not managing you as a project, Daniel."
        - generic [ref=f3e634]: He said, "Well, the results speak for themselves."
        - generic [ref=f3e637]: And she threw a napkin at him.
        - generic [ref=f3e642]: Did they seem happy together?
        - generic [ref=f3e645]: As far as I could tell, yes.
        - generic [ref=f3e648]: I wasn't there for every private conversation, though.
        - generic [ref=f3e651]: You probably noticed she deleted a message.
        - generic [ref=f3e654]: In the group.
        - generic [ref=f3e657]: She's been very strict about not calling guesses facts.
        - generic [ref=f3e660]: She said she was trying to put a guess into words and couldn't stand behind it.
        - generic [ref=f3e663]: I only know that because she said it in the chat.
        - generic [ref=f3e666]: I didn't see what she'd deleted.
        - generic [ref=f3e671]: Did you see what it said?
        - generic [ref=f3e674]: No.
        - generic [ref=f3e677]: And I won't pretend I did.
        - generic [ref=f3e680]: And Lucas...
        - generic [ref=f3e683]: Where do I even start with Lucas?
        - generic [ref=f3e686]: He and Daniel have known each other since they were kids.
        - generic [ref=f3e689]: Lucas used to come over so often my mum stopped asking if he was staying for dinner.
        - generic [ref=f3e692]: She just put out another plate.
        - generic [ref=f3e695]: He'd complain about being treated like family.
        - generic [ref=f3e698]: Then turn up the next day anyway.
        - generic [ref=f3e701]: I don't know when the arguing stopped being the fun kind.
        - generic [ref=f3e706]: He sounded very protective.
        - generic [ref=f3e709]: He is.
        - generic [ref=f3e712]: His timing needs work. So does his delivery.
        - generic [ref=f3e715]: He and Daniel used to fight about music.
        - generic [ref=f3e718]: And football.
        - generic [ref=f3e721]: And things neither of them had the slightest idea about.
        - generic [ref=f3e724]: Then they'd share a pizza an hour later.
        - generic [ref=f3e727]: I think what's hurting Lucas is that Daniel isn't here for them to argue with.
        - generic [ref=f3e732]: Do you think he'll come back?
        - generic [ref=f3e735]: I hope so.
        - generic [ref=f3e738]: He left a chat. I don't think he stopped caring.
        - generic [ref=f3e741]: There is someone you haven't really met yet.
        - generic [ref=f3e744]: Eli.
        - generic [ref=f3e747]: She doesn't usually say much in the group.
        - generic [ref=f3e750]: Then she'll respond to a question from six hours ago like it was posted five seconds ago.
        - generic [ref=f3e753]: It's oddly impressive.
        - generic [ref=f3e756]: She once answered a question two days late with "Technically, no," and nothing else.
        - generic [ref=f3e759]: We had to ask her which question she meant.
        - generic [ref=f3e764]: Who is she?
        - generic [ref=f3e767]: Eli Ward.
        - generic [ref=f3e770]: She works with Daniel at Axiom Recovery.
        - generic [ref=f3e773]: She knows much more about Daniel's work than I do.
        - generic [ref=f3e776]: I'm the person who calls tech support and says, “the thing won't do the thing.”
        - generic [ref=f3e781]: What's Axiom Recovery?
        - generic [ref=f3e784]: Where Daniel works.
        - generic [ref=f3e787]: They do data recovery and related technical work.
        - generic [ref=f3e790]: That's about as far as my expertise goes.
        - generic [ref=f3e793]: So that's Maya, Lucas and Eli.
        - generic [ref=f3e796]: In the least useful introduction tour imaginable.
        - generic [ref=f3e799]: They have one thing in common.
        - generic [ref=f3e802]: They want Daniel back.
        - generic [ref=f3e805]: And they disagree about almost everything else.
        - generic [ref=f3e808]: I guess that's what happens when you ask five people to be scared in exactly the same way.
        - generic [ref=f3e813]: Maya seems the easiest to talk to.
        - generic [ref=f3e816]: She's good at making people feel heard.
        - generic [ref=f3e819]: Unless she's very tired. Then the sarcasm comes out.
        - generic [ref=f3e822]: Including what I say about myself.
        - generic [ref=f3e825]: I'm not some impartial narrator here.
        - generic [ref=f3e828]: I'm his sister.
        - generic [ref=f3e831]: And right now I want anything that might bring him home to mean something.
        - generic [ref=f3e834]: I'm glad you stayed, Alex.
        - generic [ref=f3e837]: I keep coming back to the number I found.
        - generic [ref=f3e840]: Your number.
        - generic [ref=f3e843]: I don't want to turn it into something it isn't.
        - generic [ref=f3e846]: But I can't make myself ignore it either.
        - generic [ref=f3e851]: Could've been saved by mistake.
        - generic [ref=f3e854]: It could.
        - generic [ref=f3e857]: I hope there turns out to be a boring answer.
        - generic [ref=f3e860]: I didn't bring you here because I thought you were a detective.
        - generic [ref=f3e863]: I don't know what you do. You don't have to tell me.
        - generic [ref=f3e866]: I just thought somebody outside all of this might notice when we're getting ahead of ourselves.
        - generic [ref=f3e869]: Maybe you've noticed already.
        - generic [ref=f3e874]: I can try to help.
        - generic [ref=f3e877]: Thank you.
        - generic [ref=f3e880]: Just don't feel like you have to promise more than that.
        - generic [ref=f3e883]: There's something I haven't shown you yet.
        - generic [ref=f3e886]: Not a private file or anything.
        - generic [ref=f3e889]: A public article.
        - generic [ref=f3e892]: People have been sharing it since Daniel stopped answering.
        - generic [ref=f3e895]: It talks about him as if it explains everything.
        - generic [ref=f3e898]: Maybe it does to some people.
        - generic [ref=f3e901]: It doesn't to me.
        - generic [ref=f3e904]: I'll find the link when I've had a chance to rest.
        - generic [ref=f3e907]: I don't think I can talk about it properly tonight.
        - generic [ref=f3e910]: And I want you to read it without me telling you what to think first.
        - generic [ref=f3e915]: That's fine. No rush.
        - generic [ref=f3e918]: Thanks.
        - generic [ref=f3e921]: I'm going to make tea.
        - generic [ref=f3e924]: Maybe find something to eat before Maya stages an intervention.
        - generic [ref=f3e927]: You've been really patient.
        - generic [ref=f3e930]: You can tell me to stop messaging, by the way.
        - generic [ref=f3e933]: I'm not always very good at knowing when to leave people alone.
        - generic [ref=f3e938]: Talk later, Sophie.
        - generic [ref=f3e941]: Talk later.
        - generic [ref=f3e944]: Hey.
        - generic [ref=f3e947]: I'm glad you stayed.
        - generic [ref=f3e950]: Goodbye.
        - generic [ref=f3e954]:
          - generic [ref=f3e955]: NEW MESSAGE · Sophie
          - generic [ref=f3e956]: I found that article. The one I mentioned.
        - generic [ref=f3e957]: Hey.
        - generic [ref=f3e960]: I found the article I mentioned.
        - generic [ref=f3e963]: It's from Greyhaven Bulletin.
        - generic [ref=f3e966]: I was going to send it earlier, but I kept opening it and closing it.
        - generic [ref=f3e969]: Which probably sounds ridiculous.
        - generic [ref=f3e974]: It doesn't. Send it when you're ready.
        - generic [ref=f3e977]: Thanks.
        - generic [ref=f3e980]: I don't know why a web page feels so difficult to send.
        - generic [ref=f3e983]: Do you know what the worst part is?
        - generic [ref=f3e986]: My brother has a whole life.
        - generic [ref=f3e989]: People who love him. Things he hates. A stupid mug he refuses to throw away.
        - generic [ref=f3e992]: And somehow it all fits into one article.
        - generic [ref=f3e995]: Sorry. I'm doing that thing again.
        - generic [ref=f3e1000]: What thing?
        - generic [ref=f3e1003]: Talking around something instead of just showing it to you.
        - generic [ref=f3e1006]: Give me a second.
        - generic [ref=f3e1009]: Here.
        - generic [ref=f3e1012]: Please read the whole thing if you can.
        - generic [ref=f3e1015]: Not just the headline.
        - article "Public article link" [ref=f3e1022]:
          - generic [ref=f3e1023]: GREYHAVEN BULLETIN · LOCAL NEWS
          - strong [ref=f3e1024]: Questions Remain After Greyhaven Data Specialist Stops Responding
          - generic [ref=f3e1025]: Nora Vance
          - button "READ ARTICLE" [ref=f3e1026] [cursor=pointer]
  - navigation "Phone navigation" [ref=f3e1028]:
    - button "Go home" [ref=f3e1029] [cursor=pointer]
```

# Test source

```ts
  1   | import { expect, test, type Page } from '@playwright/test'
  2   | import { ConversationFixture } from '../helpers/versionHistoryConversation'
  3   | import { Scene04Fixture } from '../helpers/scene04Final'
  4   | import { ActIFinalFixture } from '../helpers/actIFinal'
  5   | import { beginScene01 } from '../../src/game/scene01'
  6   | import { newGame, type GameSave } from '../../src/game/types'
  7   | import { seedScene, openSophie } from './scene01-helper'
  8   | const click=(p:Page,name:string)=>p.getByRole('button',{name,exact:true}).first().click()
  9   | const flush=(p:Page)=>p.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
  10  | const runtime=(p:Page):Promise<GameSave>=>p.evaluate(async()=>{const path='/src/game/store.ts';const m=await import(path);return m.useGameStore.getState().save})
  11  | 
  12  | test('Bulletin Home widget stays empty until Sophie delivers the authored link, then survives restart',async({page})=>{
  13  |   await page.setViewportSize({width:375,height:812})
  14  |   await seedScene(page,beginScene01(newGame(),1800000000000))
  15  |   const widget=page.getByRole('region',{name:'Greyhaven Bulletin widget'})
  16  |   await expect(widget).toHaveText('GREYHAVEN BULLETIN')
  17  |   expect((await widget.boundingBox())!.height).toBeLessThan(100)
  18  |   await expect(widget.getByRole('button')).toHaveCount(0)
  19  |   await expect(page.getByRole('button',{name:'Open Bulletin',exact:true})).toHaveCount(0)
  20  |   await expect(page.getByRole('button',{name:'Open Greyhaven Bulletin article',exact:true})).toHaveCount(0)
  21  |   await page.screenshot({animations:'disabled',scale:'css',path:test.info().outputPath('home-empty-375.png')})
  22  |   const f=new Scene04Fixture(new ActIFinalFixture(beginScene01(newGame(),1800000000000)).until('complete').save)
  23  |   await seedScene(page,f.save)
  24  |   await expect(page.getByRole('region',{name:'Greyhaven Bulletin widget'})).toHaveText('GREYHAVEN BULLETIN')
  25  |   await openSophie(page);await page.clock.runFor(120000)
  26  |   for(let i=0;i<10;i++){
  27  |     if((await runtime(page)).deliveredEvents.includes('OPEN-S04-ARTICLE-ATTACHMENT'))break
> 28  |     await page.locator('.scene01-options button').first().click();await click(page,'Send');await page.clock.runFor(120000)
      |                                                           ^ Error: locator.click: Test timeout of 90000ms exceeded.
  29  |   }
  30  |   const linked=await runtime(page)
  31  |   expect(linked.deliveredEvents.filter(id=>id==='OPEN-S04-ARTICLE-ATTACHMENT')).toHaveLength(1)
  32  |   await click(page,'Go home');await expect(page.getByRole('button',{name:'Open Greyhaven Bulletin article'})).toBeVisible()
  33  |   await page.screenshot({animations:'disabled',scale:'css',path:test.info().outputPath('home-link-375.png')})
  34  |   await flush(page);await page.reload();await click(page,'Unlock phone')
  35  |   await click(page,'Open Greyhaven Bulletin article')
  36  |   await expect(page.locator('[data-paragraph]')).toHaveCount(6)
  37  |   expect((await runtime(page)).chapter1!.publicStory!.flags).not.toContain('article-inspected')
  38  |   await expect(page.locator('.device')).toHaveClass(/surface-app/)
  39  |   await click(page,'Go home')
  40  |   await expect(page.getByRole('button',{name:'Open Greyhaven Bulletin article'})).toBeVisible()
  41  | })
  42  | 
  43  | for(const width of [320,430])test(`TRACE scan, findings, vault, replay and chapter boundaries at ${width}px`,async({page})=>{
  44  |   test.setTimeout(120000)
  45  |   await page.setViewportSize({width,height:850})
  46  |   await page.emulateMedia({reducedMotion:'no-preference',colorScheme:width===320?'light':'dark'})
  47  |   const f=new ConversationFixture().bridge().install()
  48  |   f.save.settings.reduceMotion=false
  49  |   await seedScene(page,f.save,{pauseClock:true})
  50  |   await page.evaluate(()=>{localStorage.setItem('the-archive:game-save:v1','trace2-legacy-sentinel');localStorage.removeItem('the-archive-reboot:menu-preferences:v1')})
  51  |   const before=await runtime(page)
  52  |   await click(page,'Open TRACE')
  53  |   await expect(page.locator('.trace-app')).toBeVisible()
  54  |   await page.screenshot({animations:'disabled',scale:'css',path:test.info().outputPath(`workspace-${width}.png`)})
  55  |   await click(page,'START REFERENCE TRACE')
  56  |   await page.clock.runFor(2100)
  57  |   const progress=Number(await page.getByRole('progressbar',{name:'Reference trace progress'}).getAttribute('value'))
  58  |   expect(progress).toBeGreaterThan(15);expect(progress).toBeLessThan(65)
  59  |   await page.screenshot({animations:'disabled',scale:'css',path:test.info().outputPath(`tracker-running-${width}.png`)})
  60  |   await page.evaluate(()=>{Object.defineProperty(document,'visibilityState',{configurable:true,value:'hidden'});document.dispatchEvent(new Event('visibilitychange'))})
  61  |   const paused=await runtime(page)
  62  |   expect(paused.chapter1!.trace!.scan.status).toBe('paused')
  63  |   await page.clock.runFor(20000)
  64  |   expect((await runtime(page)).chapter1!.trace!.scan.elapsedMs).toBe(paused.chapter1!.trace!.scan.elapsedMs)
  65  |   await page.evaluate(()=>{Object.defineProperty(document,'visibilityState',{configurable:true,value:'visible'});document.dispatchEvent(new Event('visibilitychange'))})
  66  |   await page.clock.runFor(1000)
  67  |   await page.keyboard.press('Escape')
  68  |   expect((await runtime(page)).chapter1!.trace!.tab).toBe('workspace')
  69  |   await click(page,'Go home');await flush(page);await page.reload();await click(page,'Unlock phone');await click(page,'Open TRACE')
  70  |   await click(page,'RESUME REFERENCE TRACE');await page.clock.runFor(6000)
  71  |   await expect(page.getByRole('button',{name:'VIEW FINDINGS',exact:true})).toBeVisible()
  72  |   const completed=await runtime(page)
  73  |   expect(completed.evidence).toEqual(before.evidence)
  74  |   expect(completed.chapter1!.archiveOrigin!.initialInspected).toBe(false)
  75  |   expect(completed.chapter1!.completed).toEqual(before.chapter1!.completed)
  76  |   await click(page,'VIEW FINDINGS')
  77  |   const inspected=await runtime(page)
  78  |   expect(inspected.evidence['EV-TRACE-REF-001'].verified).toBe(false)
  79  |   for(const [label,text] of [['Origin / capture time','Who assembled the index'],['Original body','No earlier readable article text'],['Revision comparison','a wording change cannot be established']] as const){
  80  |     await page.getByRole('button',{name:new RegExp(label)}).click()
  81  |     await expect(page.locator('.finding-detail')).toContainText(text)
  82  |   }
  83  |   await page.getByText('Inspect recovered index fields',{exact:true}).click()
  84  |   await expect(page.locator('.trace-fields')).toContainText('AUTHENTICITY: UNVERIFIED')
  85  |   await page.screenshot({animations:'disabled',scale:'css',path:test.info().outputPath(`findings-${width}.png`)})
  86  |   await click(page,'OPEN EVIDENCE VAULT')
  87  |   await expect(page.locator('.vault-record')).toHaveCount(2)
  88  |   await expect(page.locator('.trace-app [data-paragraph]')).toHaveCount(0)
  89  |   await click(page,'Decryptor')
  90  |   await expect(page.getByText('NO ENCRYPTED PAYLOAD',{exact:true})).toBeVisible()
  91  |   await expect(page.getByRole('button',{name:'DECRYPT UNAVAILABLE'})).toBeDisabled()
  92  |   await page.screenshot({animations:'disabled',scale:'css',path:test.info().outputPath(`decryptor-${width}.png`)})
  93  |   await click(page,'Activity');await expect(page.locator('.trace-activity')).toContainText('Local analysis saved')
  94  |   await click(page,'Tracker');await click(page,'Replay animation');await page.clock.runFor(1000);await click(page,'SKIP ANIMATION');await click(page,'VIEW FINDINGS')
  95  |   const replay=await runtime(page)
  96  |   expect(replay.evidence).toEqual(inspected.evidence)
  97  |   expect(replay.knowledge).toEqual(before.knowledge)
  98  |   expect(replay.relationships).toEqual(before.relationships)
  99  |   expect(replay.chapter2Access).toBeUndefined()
  100 |   expect(await page.locator('.trace-app').evaluate(el=>el.scrollWidth<=el.clientWidth)).toBe(true)
  101 |   expect(await page.evaluate(()=>localStorage.getItem('the-archive:game-save:v1'))).toBe('trace2-legacy-sentinel')
  102 |   await page.clock.runFor(2500)
  103 |   await click(page,'RETURN TO UNKNOWN NUMBER')
  104 |   await expect(page.getByRole('region',{name:'Unknown Number conversation'})).toBeVisible()
  105 |   expect((await runtime(page)).chapter1!.sender.messages.filter(m=>m.sender==='player')).toHaveLength(before.chapter1!.sender.messages.filter(m=>m.sender==='player').length)
  106 | })
  107 | 
  108 | test('already-read entry opens Tracker from its attachment, reduced motion keeps Send and source gates',async({page})=>{
  109 |   await page.emulateMedia({reducedMotion:'reduce'})
  110 |   const f=new ConversationFixture().bridge().install().origin('inspect').do({type:'enter'}).unknown()
  111 |   await seedScene(page,f.save)
  112 |   await click(page,'Open Messages');await page.getByRole('button',{name:/Open Chapter 1 Unknown Sender conversation/}).click();await page.clock.runFor(120000)
  113 |   await expect(page.getByText("Good. You don't need to read it again.",{exact:true})).toBeVisible()
  114 |   const choices=page.locator('.scene01-options button')
  115 |   await expect(choices).toHaveCount(3)
  116 |   await expect(choices.nth(1)).toHaveText('Why should I trust a reference you added?')
  117 |   await expect(page.getByRole('button',{name:'Send',exact:true})).toBeDisabled()
  118 |   const before=await runtime(page)
  119 |   await click(page,'OPEN TRACE');await expect(page.getByRole('button',{name:'RUN LOCAL TRACE'})).toBeVisible()
  120 |   await click(page,'RUN LOCAL TRACE');await expect(page.getByRole('button',{name:'VIEW FINDINGS',exact:true})).toBeVisible()
  121 |   await click(page,'VIEW FINDINGS');await click(page,'RETURN TO UNKNOWN NUMBER')
  122 |   const after=await runtime(page)
  123 |   expect(after.chapter1!.versionHistory!.flags).toContain('public')
  124 |   expect(after.chapter1!.versionHistory!.flags).not.toContain('policy')
  125 |   expect(after.chapter1!.versionHistory!.complete).toBe(false)
  126 |   expect(after.chapter1!.sender.messages.filter(m=>m.sender==='player')).toEqual(before.chapter1!.sender.messages.filter(m=>m.sender==='player'))
  127 |   await choices.nth(1).click();await flush(page);await page.reload();await click(page,'Unlock phone');await click(page,'Open Messages');await page.getByRole('button',{name:/Open Chapter 1 Unknown Sender conversation/}).click()
  128 |   await expect(choices.nth(1)).toHaveAttribute('aria-pressed','true')
```