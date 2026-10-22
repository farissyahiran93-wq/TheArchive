# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: scene02-handoff.spec.ts >> whole Scene 01 → all 13 group choices → Lucas leaves → delayed Hey, with no automatic chat opening or forced scroll
- Location: tests\e2e\scene02-handoff.spec.ts:33:1

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByRole('region', { name: 'FIND DANIEL group conversation' })
Expected: "OPEN-S02-C07"
Received: "OPEN-S02-C06-a-3"
Timeout:  5000ms

Call log:
  - Expect "toHaveAttribute" getByRole('region', { name: 'FIND DANIEL group conversation' }) with timeout 5000ms
  - waiting for getByRole('region', { name: 'FIND DANIEL group conversation' })
    13 × locator resolved to <section data-scene-node="OPEN-S02-C06-a-3" aria-label="FIND DANIEL group conversation" class="opening-screen opening-v4 scene01-chat">…</section>
       - unexpected value "OPEN-S02-C06-a-3"

```

```yaml
- region "FIND DANIEL group conversation":
  - button "Back to inbox"
  - text: FD
  - strong: FIND DANIEL
  - text: 4 members · You, Sophie, Maya, Lucas Thursday, October 22 · 08:00 PM You joined FIND DANIEL.
  - strong: Sophie
  - text: Hey, everyone.
  - strong: Sophie
  - text: Before anyone says anything...
  - strong: Sophie
  - text: I added someone.
  - strong: Maya
  - text: You added someone?
  - strong: Sophie
  - text: Yes.
  - strong: Maya
  - text: Sophie.
  - strong: Maya
  - text: We literally talked about this.
  - strong: Sophie
  - text: I know.
  - strong: Lucas
  - text: Who?
  - strong: Lucas
  - text: Who did you add?
  - strong: Sophie
  - text: The number I told you about.
  - strong: Maya
  - text: Wait.
  - strong: Maya
  - text: You actually contacted it?
  - strong: Sophie
  - text: Yeah.
  - strong: Lucas
  - text: You've got to be kidding me.
  - strong: Sophie
  - text: Lucas, please.
  - strong: Lucas
  - text: Please what?
  - strong: Lucas
  - text: We don't even know who this is.
  - strong: Maya
  - text: Can we just calm down for a second?
  - strong: Lucas
  - text: I'm calm.
  - strong: Maya
  - text: You're really not.
  - strong: Lucas
  - text: Fine.
  - strong: Lucas
  - text: Then maybe our new guest would like to explain why they're here. Hi. I'm just as confused as you are.
  - strong: Lucas
  - text: Great.
  - strong: Lucas
  - text: That makes two of us.
  - strong: Maya
  - text: At least they're being honest.
  - strong: Lucas
  - text: Or they know how to sound honest.
  - strong: Sophie
  - text: Lucas.
  - strong: Lucas
  - text: What?
  - strong: Lucas
  - text: I'm allowed to have questions.
  - strong: Lucas
  - text: Alright.
  - strong: Lucas
  - text: Let's start with something simple.
  - strong: Lucas
  - text: Do you know Daniel? No. I've never met him.
  - strong: Lucas
  - text: Then why was your number saved? That's what I'd like to know.
  - strong: Maya
  - text: Fair enough.
  - strong: Sophie
  - text: See? That's why I added them.
  - strong: Lucas
  - text: That doesn't answer anything.
  - strong: Lucas
  - text: So let me get this straight.
  - strong: Lucas
  - text: Daniel had your number.
  - strong: Lucas
  - text: You don't know Daniel.
  - strong: Lucas
  - text: And you have absolutely no idea why he saved it.
  - strong: Sophie
  - text: That's what we're trying to figure out.
  - strong: Lucas
  - text: Doesn't that seem a little convenient to anyone else?
  - strong: Maya
  - text: Convenient for who?
  - strong: Lucas
  - text: I don't know, Maya.
  - strong: Lucas
  - text: That's the problem.
  - strong: Sophie
  - text: Maybe he saved the wrong number.
  - strong: Maya
  - text: Possible.
  - strong: Lucas
  - text: Sure.
  - strong: Lucas
  - text: And maybe this is all one big misunderstanding.
  - strong: Maya
  - text: It could be.
  - strong: Lucas
  - text: You don't actually believe that.
  - strong: Maya
  - text: I believe we don't have enough information.
  - strong: Lucas
  - text: Fine.
  - strong: Lucas
  - text: Let's ask something else.
  - strong: Sophie
  - text: Lucas, don't start.
  - strong: Lucas
  - text: It's a question, Sophie.
  - strong: Lucas
  - text: Where were you three nights ago?
  - strong: Maya
  - text: Oh, come on.
  - strong: Sophie
  - text: Lucas!
  - strong: Lucas
  - text: What?
  - strong: Lucas
  - text: We don't know anything about this person.
  - strong: Maya
  - text: And you think asking for an alibi is going to help?
  - strong: Lucas
  - text: It might. That's none of your business.
  - strong: Lucas
  - text: See?
  - strong: Lucas
  - text: Already being difficult.
  - strong: Maya
  - text: No, they're setting a boundary.
  - strong: Sophie
  - text: I wouldn't answer that either.
  - strong: Lucas
  - text: Of course you wouldn't.
  - strong: Maya
  - text: Okay.
  - strong: Maya
  - text: Enough with the questions about where people were.
  - strong: Maya
  - text: We barely know who's on the other side of the screen.
  - strong: Lucas
  - text: Exactly my point.
  - strong: Maya
  - text: No. Your point was to accuse them before we know anything.
  - strong: Lucas
  - text: I'm trying to be careful.
  - strong: Maya
  - text: Then be careful.
  - strong: Maya
  - text: Not cruel.
  - strong: Sophie
  - text: Can I explain why I thought adding them was a good idea?
  - strong: Lucas
  - text: You could try.
  - strong: Maya
  - text: Go ahead, Soph.
  - strong: Sophie
  - text: There was a contact list.
  - strong: Sophie
  - text: Daniel's.
  - strong: Sophie
  - text: I already told you about it.
  - strong: Maya
  - text: Right.
  - strong: Sophie
  - text: And the number didn't have a name.
  - strong: Lucas
  - text: We know.
  - strong: Sophie
  - text: I'm getting there.
  - strong: Sophie
  - text: There was something beside it.
  - strong: Sophie
  - text: Some kind of note.
  - strong: Maya
  - text: You said you couldn't read it.
  - strong: Sophie
  - text: I couldn't.
  - strong: Sophie
  - text: Not properly.
  - strong: Lucas
  - text: So we have a number and a note you can't read.
  - strong: Lucas
  - text: Fantastic.
  - strong: Sophie
  - text: Could you not?
  - strong: Maya
  - text: Did you find anything new in the note?
  - strong: Sophie
  - text: No.
  - strong: Maya
  - text: Then why bring it up?
  - strong: Sophie
  - text: Because Daniel didn't usually keep numbers like that.
  - strong: Lucas
  - text: ...
  - strong: Lucas
  - text: What do you mean?
  - strong: Sophie
  - text: Just that.
  - strong: Sophie
  - text: It stood out.
  - strong: Maya
  - text: You've been going through a lot of his things.
  - strong: Maya
  - text: Maybe you're seeing patterns that aren't there.
  - strong: Sophie
  - text: Maybe.
  - strong: Sophie
  - text: But what if I'm not? Can I see the note?
  - strong: Sophie
  - text: I don't have a clear copy.
  - strong: Sophie
  - text: And I don't want to send you something I haven't checked.
  - strong: Lucas
  - text: For once, I agree with Sophie.
  - strong: Maya
  - text: Could you at least keep the original?
  - strong: Sophie
  - text: Of course.
  - strong: Maya
  - text: Sophie, can you check something for me?
  - strong: Sophie
  - text: Yeah?
  - strong: Maya
  - text: Was the note already damaged when you found it?
  - strong: Sophie
  - text: I think so.
  - strong: Maya
  - text: You think?
  - strong: Sophie
  - text: I'm pretty sure.
  - strong: Lucas
  - text: Pretty sure isn't exactly reassuring.
  - strong: Sophie
  - text: Lucas, I am trying.
  - strong: Lucas
  - text: I know.
  - strong: Lucas
  - text: But we can't keep building theories around things nobody's verified.
  - strong: Maya
  - text: For once, that part is fair.
  - strong: Sophie
  - text: Okay.
  - strong: Sophie
  - text: I'll look at it again.
  - strong: Maya
  - text: Can we talk about something else for a second?
  - strong: Lucas
  - text: Like what?
  - strong: Maya
  - text: Whether anyone's actually eaten today.
  - strong: Sophie
  - text: Maya...
  - strong: Maya
  - text: I'm serious.
  - strong: Maya
  - text: You were still awake when I went to bed.
  - strong: Sophie
  - text: I slept.
  - strong: Maya
  - text: For how long?
  - strong: Sophie
  - text: Enough.
  - strong: Maya
  - text: That's not a number.
  - strong: Sophie
  - text: You're starting to sound like my mother.
  - strong: Maya
  - text: Someone has to.
  - strong: Lucas
  - text: I ate.
  - strong: Maya
  - text: Congratulations, Lucas.
  - strong: Lucas
  - text: You asked.
  - strong: Maya
  - text: I did.
  - strong: Sophie
  - text: 😂
  - strong: Maya
  - text: There. See?
  - strong: Maya
  - text: She still remembers how to laugh.
  - strong: Sophie
  - text: Barely.
  - strong: Lucas
  - text: It isn't funny.
  - strong: Maya
  - text: Nobody said the situation was funny.
  - strong: Lucas
  - text: Then can we stay focused?
  - strong: Maya
  - text: We can be worried and still act like human beings. Maya has a point. You all sound exhausted.
  - strong: Maya
  - text: Thank you.
  - strong: Sophie
  - text: I probably am.
  - strong: Lucas
  - text: I'm fine.
  - strong: Maya
  - text: That's exactly what an exhausted person would say.
  - strong: Sophie
  - text: Okay.
  - strong: Sophie
  - text: I'm getting some water.
  - strong: Maya
  - text: Finally.
  - strong: Sophie
  - text: Don't celebrate yet.
  - strong: Sophie
  - text: I'll be back in like two minutes.
  - strong: Maya
  - text: Progress is progress. Sophie is offline.
  - strong: Lucas
  - text: Maya.
  - strong: Maya
  - text: What?
  - strong: Lucas
  - text: You're being awfully relaxed about this.
  - strong: Maya
  - text: About what?
  - strong: Lucas
  - text: This person.
  - strong: Maya
  - text: I'm not relaxed.
  - strong: Lucas
  - text: You're joking with them.
  - strong: Maya
  - text: That doesn't mean I trust them.
  - strong: Lucas
  - text: Good.
  - strong: Lucas
  - text: Because I don't.
  - strong: Maya
  - text: You made that pretty clear.
  - strong: Lucas
  - text: I don't understand why Sophie is doing this.
  - strong: Maya
  - text: She's scared.
  - strong: Lucas
  - text: We're all scared.
  - strong: Maya
  - text: I know.
  - strong: Lucas
  - text: And that doesn't mean we invite strangers into everything.
  - strong: Maya
  - text: You're still here, by the way.
  - strong: Lucas
  - text: What?
  - strong: Maya
  - text: The person you're talking about.
  - strong: Maya
  - text: They're still in the group.
  - strong: Lucas
  - text: I know.
  - strong: Maya
  - text: Then maybe stop talking about them like they aren't. I can read everything you're saying, you know.
  - strong: Maya
  - text: Exactly.
  - strong: Lucas
  - text: I wasn't trying to hide it. Choose a reply
  - button "Clearly."
  - button "Send" [disabled]
```

# Test source

```ts
  1   | import { expect, test, type Page } from '@playwright/test'
  2   | import { scene01Script } from '../../src/content/scene01Script'
  3   | import { sceneAt, seedScene } from './scene01-helper'
  4   | import type { GameSave } from '../../src/game/types'
  5   | 
  6   | async function stored(page: Page): Promise<GameSave> {
  7   |   return page.evaluate(async () => {
  8   |     const journal = sessionStorage.getItem('the-archive-reboot:pending-save:v1')
  9   |     if (journal) return JSON.parse(journal).save
  10  |     const db = await new Promise<IDBDatabase>(resolve => { const request = indexedDB.open('the-archive-reboot', 1); request.onsuccess = () => resolve(request.result) })
  11  |     const value = await new Promise<GameSave>(resolve => { const request = db.transaction('saves').objectStore('saves').get('primary'); request.onsuccess = () => resolve(request.result) })
  12  |     db.close(); return value
  13  |   })
  14  | }
  15  | async function openGroup(page: Page) {
  16  |   await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  17  |   await page.getByRole('button', { name: 'Open FIND DANIEL group conversation', exact: true }).click()
  18  | }
  19  | async function reply(page: Page, text: string | RegExp, advance = true) {
  20  |   await page.getByRole('button', { name: text, exact: typeof text === 'string' }).click()
  21  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  22  |   if (advance) await page.clock.runFor(240_000)
  23  | }
  24  | async function reachPending(page: Page) {
  25  |   const group = page.getByRole('region', { name: 'FIND DANIEL group conversation' })
  26  |   for (let i = 0; i < 120; i++) {
  27  |     if (await group.getAttribute('data-group-complete') === 'true') return
  28  |     await page.clock.runFor(500)
  29  |   }
  30  |   throw new Error('Final group messages did not complete')
  31  | }
  32  | 
  33  | test('whole Scene 01 → all 13 group choices → Lucas leaves → delayed Hey, with no automatic chat opening or forced scroll', async ({ page }) => {
  34  |   test.setTimeout(120_000)
  35  |   await page.clock.install({ time: new Date('2026-10-22T12:00:00Z') })
  36  |   await page.goto('/')
  37  |   await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  38  |   await page.clock.runFor(20_000)
  39  |   await page.getByRole('button', { name: 'Open unknown message', exact: true }).click()
  40  |   await page.clock.runFor(120_000)
  41  |   for (const beat of scene01Script.choices) {
  42  |     await expect(page.locator('.scene01-chat')).toHaveAttribute('data-scene-node', `OPEN-S01-C${beat.id}`)
  43  |     const before = await page.locator('.opening-bubble.player').count()
  44  |     await page.locator('.scene01-options .opening-choice').first().click()
  45  |     if (beat.id === '08') await page.getByLabel('Your codename', { exact: true }).fill('Rae')
  46  |     await expect(page.locator('.opening-bubble.player')).toHaveCount(before)
  47  |     await page.getByRole('button', { name: 'Send', exact: true }).click()
  48  |     await page.clock.runFor(240_000)
  49  |   }
  50  |   await page.getByRole('button', { name: 'JOIN GROUP', exact: true }).click()
  51  |   await page.clock.runFor(180_000)
  52  |   const group = page.getByRole('region', { name: 'FIND DANIEL group conversation' })
  53  |   for (let number = 1; number <= 12; number++) {
> 54  |     await expect(group).toHaveAttribute('data-scene-node', `OPEN-S02-C${String(number).padStart(2,'0')}`)
      |                         ^ Error: expect(locator).toHaveAttribute(expected) failed
  55  |     expect(await page.locator('.scene01-options .opening-choice').count()).toBeGreaterThanOrEqual(4)
  56  |     await page.locator('.scene01-options .opening-choice').first().click()
  57  |     await page.getByRole('button', { name: 'Send', exact: true }).click()
  58  |     await page.clock.runFor(240_000)
  59  |     // Choice 02A has a separately authored player follow-up, still requiring Send.
  60  |     if (number === 2) await reply(page, "That's what I'd like to know.")
  61  |   }
  62  |   await expect(group).toHaveAttribute('data-scene-node', 'OPEN-S02-C13')
  63  |   await expect(page.getByLabel('Group participants')).toContainText('3 members')
  64  |   await expect(page.getByLabel('Group participants')).not.toContainText('Lucas')
  65  |   await expect(group.getByText('Lucas left the group.', { exact: true })).toHaveCount(1)
  66  |   await expect(group.getByText('Maya deleted a message.', { exact: true })).toHaveCount(2)
  67  |   await expect(group.getByText('Can we talk privately?', { exact: true })).toBeVisible()
  68  |   await expect(group).not.toHaveAttribute('data-group-complete', 'true')
  69  |   await reply(page, 'Sure.', false)
  70  |   await group.locator('.opening-thread').evaluate(node => { node.scrollTop = 0; node.dispatchEvent(new Event('scroll', { bubbles: true })) })
  71  |   await reachPending(page)
  72  |   expect(await group.locator('.opening-thread').evaluate(node => node.scrollTop)).toBe(0)
  73  |   const pending = (await stored(page)).prologue!.scene01!.privateHandoff!
  74  |   const remaining = pending.dueAt - await page.evaluate(() => Date.now())
  75  |   expect(remaining).toBeGreaterThan(4500)
  76  |   expect(remaining).toBeLessThanOrEqual(5500)
  77  |   await page.clock.runFor(remaining - 1)
  78  |   expect((await stored(page)).prologue!.scene01!.messages.some(line => line.id === 'OPEN-S03-FIRST-MESSAGE')).toBe(false)
  79  |   await page.clock.runFor(1)
  80  |   const banner = page.getByLabel('Incoming notification', { exact: true })
  81  |   await expect(banner).toContainText('Sophie')
  82  |   await expect(banner).toContainText('Hey.')
  83  |   await expect(banner).toContainText('Tap to open conversation')
  84  |   await expect(group).toBeVisible()
  85  |   expect(await group.locator('.opening-thread').evaluate(node => node.scrollTop)).toBe(0)
  86  |   expect((await stored(page)).deliveredEvents).not.toContain('OPEN-S03-ACTIVATED')
  87  |   await page.screenshot({ path: test.info().outputPath('private-handoff-banner.png'), animations: 'disabled' })
  88  |   await page.getByRole('button', { name: 'Open notification from Sophie', exact: true }).click()
  89  |   await expect(page.getByRole('region', { name: 'Sophie private conversation', exact: true })).toBeVisible()
  90  |   await expect(page.locator('.opening-bubble').filter({ hasText: /^Hey\.$/ })).toHaveCount(1)
  91  |   expect((await stored(page)).deliveredEvents.filter(id => id === 'OPEN-S03-ACTIVATED')).toHaveLength(1)
  92  |   await expect(page.getByRole('button', { name: 'Send', exact: true })).toHaveCount(0)
  93  | })
  94  | 
  95  | test('refresh during the 5.5-second handoff retains the deadline and delivers the private message once, with manual chat opening', async ({ page }) => {
  96  |   await seedScene(page, sceneAt('G13'))
  97  |   await openGroup(page)
  98  |   await reply(page, 'Sure.', false)
  99  |   await reachPending(page)
  100 |   const pending = (await stored(page)).prologue!.scene01!.privateHandoff!
  101 |   await page.clock.runFor(1000)
  102 |   await page.reload()
  103 |   await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  104 |   await openGroup(page)
  105 |   expect((await stored(page)).prologue!.scene01!.privateHandoff!.dueAt).toBe(pending.dueAt)
  106 |   const remaining = pending.dueAt - await page.evaluate(() => Date.now())
  107 |   await page.clock.runFor(remaining - 1)
  108 |   expect((await stored(page)).prologue!.scene01!.privateHandoff!.deliveredAt).toBeUndefined()
  109 |   await page.clock.runFor(1)
  110 |   await expect(page.getByLabel('Incoming notification', { exact: true })).toContainText('Hey.')
  111 |   await expect(page.getByRole('region', { name: 'FIND DANIEL group conversation' })).toBeVisible()
  112 |   await page.reload()
  113 |   await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  114 |   await page.clock.runFor(20_000)
  115 |   expect((await stored(page)).prologue!.scene01!.messages.filter(line => line.id === 'OPEN-S03-FIRST-MESSAGE')).toHaveLength(1)
  116 |   expect((await stored(page)).deliveredEvents).not.toContain('OPEN-S03-ACTIVATED')
  117 |   await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  118 |   await page.getByRole('button', { name: 'Open Sophie conversation', exact: true }).click()
  119 |   await expect(page.getByRole('region', { name: 'Sophie private conversation', exact: true })).toBeVisible()
  120 |   expect((await stored(page)).deliveredEvents.filter(id => id === 'OPEN-S03-ACTIVATED')).toHaveLength(1)
  121 | })
  122 | 
  123 | test('an older save stopped after 08D receives only its missing reaction and continues at choice 09', async ({ page }) => {
  124 |   const save = sceneAt('G09', { G08: 'd' }), scene = save.prologue!.scene01!
  125 |   const keep = (id: string) => !id.startsWith('OPEN-S02-AFTER-08-') && !id.startsWith('OPEN-S02-C08-d-')
  126 |   scene.nodeId = 'OPEN-S02-SOURCE-BOUNDARY'; scene.groupSourceBoundary = true; scene.queue = []
  127 |   scene.groupMessages = scene.groupMessages.filter(line => keep(line.id))
  128 |   scene.groupReceipts = scene.groupReceipts?.filter(receipt => keep(receipt.eventId))
  129 |   save.deliveredEvents = save.deliveredEvents.filter(keep)
  130 |   const beforeRelationships = save.relationships
  131 |   await seedScene(page, save)
  132 |   await openGroup(page)
  133 |   await page.clock.runFor(240_000)
  134 |   await expect(page.getByRole('button', { name: 'What happened that night?', exact: true })).toBeVisible()
  135 |   await expect(page.locator('.opening-bubble.player').filter({ hasText: /^Maybe you should discuss this without me\.$/ })).toHaveCount(1)
  136 |   await expect(page.locator('.opening-bubble').filter({ hasText: /^We probably should have done that earlier\.$/ })).toHaveCount(1)
  137 |   expect((await stored(page)).relationships).toEqual(beforeRelationships)
  138 | })
  139 | 
  140 | test('premium last words and support retain each embedded Send and Lucas still leaves', async ({ page }) => {
  141 |   await seedScene(page, sceneAt('G11'))
  142 |   await openGroup(page)
  143 |   await reply(page, /You don't know me. I don't know you. But I don't think Daniel would be helped/)
  144 |   await expect(page.getByRole('button', { name: "You haven't exactly ruled it out.", exact: true })).toBeVisible()
  145 |   await expect(page.getByText('Lucas left the group.', { exact: true })).toHaveCount(0)
  146 |   await reply(page, "You haven't exactly ruled it out.")
  147 |   await expect(page.getByText('Lucas left the group.', { exact: true })).toHaveCount(1)
  148 |   await expect(page.getByRole('button', { name: "I didn't mean to cause trouble.", exact: true })).toBeVisible()
  149 |   await reply(page, /You don't have to fix everything tonight, Sophie/)
  150 |   await expect(page.getByRole('button', { name: "You're trying to help someone you care about.", exact: true })).toBeVisible()
  151 |   await reply(page, "You're trying to help someone you care about.")
  152 |   await expect(page.getByRole('button', { name: 'Sure.', exact: true })).toBeVisible()
  153 |   expect((await stored(page)).prologue!.scene01!.groupComplete).not.toBe(true)
  154 | })
```