# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: act-i-final.spec.ts >> all nineteen FINAL Sophie decisions finish on Goodnight and the later article conversation waits for a manual action
- Location: tests\e2e\act-i-final.spec.ts:6:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-scene-node="OPEN-S03-FINAL-COMPLETE"]')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('[data-scene-node="OPEN-S03-FINAL-COMPLETE"]') with timeout 5000ms
  - waiting for locator('[data-scene-node="OPEN-S03-FINAL-COMPLETE"]')

```

```yaml
- text: 5:19 PM
- region "Sophie private conversation":
  - button "Back to inbox"
  - strong: Sophie
  - text: Online
  - button "View Sophie Mercer profile"
  - text: "Friday, January 15 · 04:00 PM NEW MESSAGE · Sophie Hi. Sorry. This is going to sound odd. Is this still your number? Who's asking? Fair question. I'm Sophie. And that probably doesn't help much. I don't expect you to know me. I found this number saved somewhere. Can I explain? Go ahead. Thank you. It's a saved copy of someone's contacts. The file says it belongs to Daniel Mercer. I was looking through it earlier. Your number is in there. No name beside it. Just a star. A star? Yeah. Like a favourite, maybe. But I don't know what that symbol means in this file. Do you know Daniel? Daniel Mercer? No. Never heard the name. Okay. That was the most likely answer, I suppose. Could you think back a little? Even an old online chat. A work message. Anything. I'm not asking you to guess. I'm sure I haven't spoken to him. Then that's useful to know. I thought if I asked, the answer might be simple. “Oh, yeah. Daniel and I used to work together.” Something like that. Sorry. I'm talking as if you already know what's happened. Then tell me. Right. Daniel stopped replying. Messages. Calls. For days now. At first we thought he was busy. Then we thought maybe he wanted space. I don't know what to think anymore. Have you tried checking on him in person? We have tried to check he's safe. I don't want to give you a version of events I'm not sure about. I'm sorry. I should've said that sooner. You don't owe me your time. I haven't even asked what to call you. You can call me Alex. Alex. Got it. Nice to meet you. In a very odd way. You know what's strange? I nearly deleted this number. I had my finger over it and everything. What changed your mind? I kept thinking: what if this is the one person who can tell us something ordinary and useful? I didn't want to start believing the star meant something just because I was scared. But I didn't want to delete the question either. There are other people trying to find him. Some of us are talking in a group. Well, arguing in a group, lately. Who's in it? People close to him. I can introduce you properly if you decide to join. I haven't told them I've been messaging you. They knew about the number. Not that I would actually contact it. I'm going to get an earful. Then maybe talk to them first. That's probably the sensible thing. Sensible hasn't been my strongest quality this week. Could I ask you something slightly unreasonable? Would you consider joining the chat? Only to listen at first. If you want. I don't need you to promise you'll solve anything. Why would I be any use? You can tell us what you do and don't recognise. That alone might stop us making up stories around your number. Look, you can say no. I won't turn it into some kind of test. But if you join, there are people who'll want to ask you questions. One in particular. Alright. Send it. Okay. Thank you. Fair warning. The group isn't exactly having its finest week. If someone comes across as rude, please don't assume everyone feels the same way. I can handle a rude person. I hope so. I know one who could give lessons. I should tell them first. Actually, if I overthink this I'll never do it. NEW MESSAGE · Sophie Hey. You got a minute? Hey. I'm sorry about earlier. Not because Lucas disagreed with me. I knew he would. Because I put you in the middle of it. I could actually feel myself making it worse and somehow kept talking. Impressive, really. That was a lot for a first meeting. Yeah. We usually try to save the group meltdown for the second meeting. Sorry. Bad joke. There's something I should've told you before I invited you. Daniel isn't just someone I'm trying to find. He's my brother. My older brother. That's why I couldn't leave the contact list alone. I wasn't trying to trick you into joining us. I just kept thinking: what if this is the one person I don't ask? Daniel is your brother? Yeah. I should've led with that. It's funny. I've spent so much time saying his name lately. Daniel did this. Daniel said that. Has anyone heard from Daniel? I haven't told you what he's actually like. Which is a strange thing to realise when he's the person I've known longest. Tell me about him. That's a harder question than it should be. He's thoughtful. And unbelievably annoying. He'll spend an entire afternoon fixing something that would've been cheaper to replace. Then he'll act offended if you suggest it was a waste of time. It's not always easy being his sister. But it is very rarely boring. He sounds stubborn. Incredibly. He'd give you a twenty-minute lecture on why he isn't. And whenever he gets busy, he says the same thing. “I'll explain later.” It's become a joke between us. It used to be funny. Sorry. That sounds more dramatic than I meant it to. I was going to tell you a better story. One year he told me he couldn't make it to my birthday. He said he was working late. I was furious. Then he turned up after dinner with a cake. The icing had slid to one side. Half of “Happy Birthday” was stuck to the inside of the box. He looked so proud of it. 😭 The cake was leaning. Somehow he was the one acting offended when I laughed. It's the thought that counts. That's exactly what he said! I swear he practised that line in the car. That's the part I keep thinking about. Daniel always turned up eventually. Late, usually. With a terrible excuse. But he turned up. And now I can't get him to answer one message. Sorry. You didn't come here to be sad with me. How long has it been? A few days without a proper answer. I keep counting them like it'll change something. I've been rereading our last chat. I know it isn't going to grow a new message if I stare long enough. Doesn't stop me. I still know where the conversation ends. Every time I open it. I keep expecting to be wrong. What did he say? Nothing dramatic. Normal things. That's almost worse. There's somebody else I worry about just as much. Maya. You met her at a pretty terrible moment. She's usually the one with a plan. And a backup plan if the plan goes wrong. She also remembers to feed the rest of us. Which probably sounds like a small thing. Lately it's not. Why is this so personal for her? She's Daniel's fiancée. They were planning a wedding. Maya Chen. That's her full name, by the way. She's frighteningly good at spreadsheets. Daniel once said dating her was like having an extremely attractive project manager. He said that in front of her. He was lucky to survive dinner. I can still hear her saying, \"I am not managing you as a project, Daniel.\" He said, \"Well, the results speak for themselves.\" And she threw a napkin at him. Did they seem happy together? As far as I could tell, yes. I wasn't there for every private conversation, though. You probably noticed she deleted a message. In the group. She's been very strict about not calling guesses facts. She said she was trying to put a guess into words and couldn't stand behind it. I only know that because she said it in the chat. I didn't see what she'd deleted. Did you see what it said? No. And I won't pretend I did. And Lucas... Where do I even start with Lucas? He and Daniel have known each other since they were kids. Lucas used to come over so often my mum stopped asking if he was staying for dinner. She just put out another plate. He'd complain about being treated like family. Then turn up the next day anyway. I don't know when the arguing stopped being the fun kind. He sounded very protective. He is. His timing needs work. So does his delivery. He and Daniel used to fight about music. And football. And things neither of them had the slightest idea about. Then they'd share a pizza an hour later. I think what's hurting Lucas is that Daniel isn't here for them to argue with. Do you think he'll come back? I hope so. He left a chat. I don't think he stopped caring. There is someone you haven't really met yet. Eli. She doesn't usually say much in the group. Then she'll respond to a question from six hours ago like it was posted five seconds ago. It's oddly impressive. She once answered a question two days late with \"Technically, no,\" and nothing else. We had to ask her which question she meant. Who is she? Eli Ward. She works with Daniel at Axiom Recovery. She knows much more about Daniel's work than I do. I'm the person who calls tech support and says, “the thing won't do the thing.” What's Axiom Recovery? Where Daniel works. They do data recovery and related technical work. That's about as far as my expertise goes. So that's Maya, Lucas and Eli. In the least useful introduction tour imaginable. They have one thing in common. They want Daniel back. And they disagree about almost everything else. I guess that's what happens when you ask five people to be scared in exactly the same way. Maya seems the easiest to talk to. She's good at making people feel heard. Unless she's very tired. Then the sarcasm comes out. Including what I say about myself. I'm not some impartial narrator here. I'm his sister. And right now I want anything that might bring him home to mean something. I'm glad you stayed, Alex. I keep coming back to the number I found. Your number. I don't want to turn it into something it isn't. But I can't make myself ignore it either. Could've been saved by mistake. It could. I hope there turns out to be a boring answer. I didn't bring you here because I thought you were a detective. I don't know what you do. You don't have to tell me. I just thought somebody outside all of this might notice when we're getting ahead of ourselves. Maybe you've noticed already. I can try to help. Thank you. Just don't feel like you have to promise more than that. There's something I haven't shown you yet. Not a private file or anything. A public article. People have been sharing it since Daniel stopped answering. It talks about him as if it explains everything. Maybe it does to some people. It doesn't to me. I'll find the link when I've had a chance to rest. I don't think I can talk about it properly tonight. And I want you to read it without me telling you what to think first. That's fine. No rush. Thanks. I'm going to make tea. Maybe find something to eat before Maya stages an intervention. You've been really patient. You can tell me to stop messaging, by the way. I'm not always very good at knowing when to leave people alone. Talk later, Sophie. Talk later. Hey. I'm glad you stayed. Goodnight. NEW MESSAGE · Sophie I found that article. The one I mentioned. Hey. I found the link. The one I said I'd send you. I was going to send it earlier, but I kept opening it and closing it. Which probably sounds ridiculous. Choose a reply"
  - button "It doesn't. Send it when you're ready."
  - button "Is everything okay?"
  - button "You don't have to send it."
  - button "Did you manage to get any sleep?"
  - button "Starred replyYesterday you said you wanted me to read it without telling me what to think. Does that still stand?":
    - img "Starred reply"
    - text: Yesterday you said you wanted me to read it without telling me what to think. Does that still stand?
  - button "Send" [disabled]
- navigation "Phone navigation":
  - button "Go home"
```

# Test source

```ts
  1  | import { test,expect } from '@playwright/test'
  2  | import { ActIFinalFixture } from '../helpers/actIFinal'
  3  | import { seedScene,openSophie,sceneReply } from './scene01-helper'
  4  | test.use({ reducedMotion:'reduce' })
  5  | 
  6  | test('all nineteen FINAL Sophie decisions finish on Goodnight and the later article conversation waits for a manual action',async({page})=>{
  7  |   test.setTimeout(150000)
  8  |   await seedScene(page,new ActIFinalFixture().until('OPEN-S03-C01').save)
  9  |   await openSophie(page)
  10 |   for(let number=1;number<=19;number++){
  11 |     await expect(page.locator('.scene01-chat')).toHaveAttribute('data-scene-node',`OPEN-S03-C${String(number).padStart(2,'0')}`)
  12 |     const count=await page.locator('.opening-bubble.player').count()
  13 |     await page.locator('.scene01-options .opening-choice').first().click()
  14 |     await expect(page.locator('.opening-bubble.player')).toHaveCount(count)
  15 |     await page.getByRole('button',{name:'Send',exact:true}).click()
  16 |     await page.clock.runFor(180000)
  17 |   }
  18 |   await expect(page.getByText('Goodnight.',{exact:true})).toHaveCount(1)
  19 |   await expect(page.getByText('I found that article. The one I mentioned.',{exact:true})).toHaveCount(1)
> 20 |   await expect(page.locator('[data-scene-node="OPEN-S03-FINAL-COMPLETE"]')).toBeVisible()
     |                                                                             ^ Error: expect(locator).toBeVisible() failed
  21 |   await page.getByRole('button',{name:'Continue conversation →',exact:true}).click()
  22 |   await page.clock.runFor(120000)
  23 |   await expect(page.locator('[data-scene-node="OPEN-S04-C01"]')).toBeVisible()
  24 |   await expect(page.getByRole('article',{name:'Public article link'})).toHaveCount(0)
  25 | })
  26 | 
  27 | test('final Scene 01: defer, resume, explicit Continue, JOIN and manual group opening on a small phone',async({page})=>{
  28 |   await page.setViewportSize({width:320,height:720})
  29 |   await seedScene(page,new ActIFinalFixture().until('OPEN-S01-C13').save)
  30 |   await openSophie(page)
  31 |   await sceneReply(page,'Not right now.')
  32 |   await expect(page.getByRole('button',{name:'Accept invitation',exact:true})).toBeVisible()
  33 |   await page.getByRole('button',{name:'Accept invitation',exact:true}).click()
  34 |   await page.clock.runFor(120000)
  35 |   await page.getByRole('button',{name:'Continue',exact:true}).click()
  36 |   await page.clock.runFor(120000)
  37 |   await sceneReply(page,'I can handle a rude person.')
  38 |   await page.getByRole('button',{name:'JOIN GROUP',exact:true}).click()
  39 |   await page.getByRole('button',{name:'Back to inbox'}).click()
  40 |   await page.getByRole('button',{name:'Open FIND DANIEL group conversation'}).click()
  41 |   await page.clock.runFor(120000)
  42 |   await expect(page.locator('[data-scene-node="OPEN-S02-C01"]')).toBeVisible()
  43 |   await expect(page.getByText('You joined FIND DANIEL.',{exact:true})).toHaveCount(1)
  44 |   expect(await page.locator('.opening-thread').evaluate(el=>el.scrollWidth<=el.clientWidth)).toBe(true)
  45 | })
  46 | 
  47 | test('final Scene 02: private sender request preserves group, navigation and reload, then manual return',async({page})=>{
  48 |   await seedScene(page,new ActIFinalFixture().until('OPEN-S02-C09').save)
  49 |   await page.getByRole('button',{name:'Open Messages',exact:true}).first().click()
  50 |   await page.getByRole('button',{name:'Open FIND DANIEL group conversation',exact:true}).click()
  51 |   await sceneReply(page,'What happened that night?')
  52 |   await expect(page.getByRole('button',{name:'OPEN MESSAGE',exact:true})).toBeVisible()
  53 |   await page.getByRole('button',{name:'OPEN MESSAGE',exact:true}).click()
  54 |   await expect(page.getByText("You shouldn't be talking to her.",{exact:true})).toHaveCount(1)
  55 |   await page.getByRole('button',{name:'Who is this?',exact:true}).click()
  56 |   await page.getByRole('button',{name:'Send',exact:true}).click()
  57 |   await expect(page.getByRole('button',{name:'BLOCK NUMBER',exact:true})).toHaveCount(0)
  58 |   await page.getByRole('button',{name:'Back from conversation'}).click()
  59 |   await page.getByRole('button',{name:'Open FIND DANIEL group conversation'}).click()
  60 |   await page.clock.runFor(120000)
  61 |   await expect(page.locator('[data-scene-node="OPEN-S02-C10"]')).toBeVisible()
  62 |   await expect(page.getByText('Maya deleted a message.',{exact:true})).toHaveCount(1)
  63 |   await expect(page.getByText("You shouldn't be talking to her.",{exact:true})).toHaveCount(0)
  64 |   await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
  65 |   await page.reload()
  66 |   await page.getByRole('button',{name:'Enter the archive',exact:true}).click()
  67 |   await page.getByRole('button',{name:'Open Messages',exact:true}).first().click()
  68 |   await page.getByRole('button',{name:'Open Chapter 1 Unknown Sender conversation',exact:true}).click()
  69 |   await expect(page.getByText('Number blocked.',{exact:true})).toHaveCount(0)
  70 |   await expect(page.getByText('Who is this?',{exact:true})).toHaveCount(1)
  71 | })
  72 | 
  73 | test('final Scene 03: disclosure and secondary choices each require Send and survive reload',async({page})=>{
  74 |   const f=new ActIFinalFixture().until('OPEN-S02-C09').send('a').sender().act('open-group').until('OPEN-S03-FINAL-DISCLOSURE-OFFER')
  75 |   await seedScene(page,f.save)
  76 |   await openSophie(page)
  77 |   await page.getByRole('button',{name:'TELL SOPHIE ABOUT THE MESSAGE',exact:true}).click()
  78 |   await sceneReply(page,'Something strange happened while we were in the group.')
  79 |   // Authored apostrophes are literal; selection must not send the continuation automatically.
  80 |   const continuation=page.getByRole('button',{name:/A number I don't know sent me/})
  81 |   await expect(continuation).toBeVisible()
  82 |   await continuation.click()
  83 |   expect(await page.locator('.opening-bubble.player').filter({hasText:/A number I don't know/}).count()).toBe(0)
  84 |   await page.getByRole('button',{name:'Send',exact:true}).click()
  85 |   await page.clock.runFor(120000)
  86 |   await sceneReply(page,'During the group chat.')
  87 |   await expect(page.getByRole('button',{name:"I replied, but they haven't answered.",exact:true})).toHaveCount(0)
  88 |   await page.getByRole('button',{name:"I didn't reply.",exact:true}).click()
  89 |   await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
  90 |   await page.reload()
  91 |   await page.getByRole('button',{name:'Enter the archive',exact:true}).click()
  92 |   await openSophie(page)
  93 |   await expect(page.getByRole('button',{name:"I didn't reply.",exact:true})).toHaveAttribute('aria-pressed','true')
  94 |   await page.getByRole('button',{name:'Send',exact:true}).click()
  95 |   await page.clock.runFor(120000)
  96 |   await expect(page.locator('[data-scene-node="OPEN-S03-C16"]')).toBeVisible()
  97 |   await expect(page.getByText('Thanks for telling me.',{exact:true})).toHaveCount(1)
  98 | })
  99 | 
```