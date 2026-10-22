# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: scene02-handoff.spec.ts >> an older save stopped after 08D receives only its missing reaction and continues at choice 09
- Location: tests\e2e\scene02-handoff.spec.ts:130:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: 'What happened that night?', exact: true })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('button', { name: 'What happened that night?', exact: true }) with timeout 5000ms
  - waiting for getByRole('button', { name: 'What happened that night?', exact: true })

```

```yaml
- heading "Save needs attention" [level=1]
- paragraph: A previous write was interrupted after some progress was stored. Download the pending local backup before choosing which version to keep.
- paragraph: Your stored progress has not been overwritten. Download a copy before choosing to reload; any unsaved changes in this tab may be lost.
- button "Download local backup"
- button "Reload stored save"
```

# Test source

```ts
  41  |   for (const beat of scene01Script.choices) {
  42  |     await expect(page.locator('.scene01-chat')).toHaveAttribute('data-scene-node', `OPEN-S01-C${beat.id}`)
  43  |     const before = await page.locator('.opening-bubble.player').count()
  44  |     await page.locator('.scene01-options .opening-choice').first().click()
  45  |     if (beat.id === '08') await page.getByLabel('Your codename', { exact: true }).fill('Rae')
  46  |     await expect(page.locator('.opening-bubble.player')).toHaveCount(before)
  47  |     await page.getByRole('button', { name: 'Send', exact: true }).click()
  48  |     await page.clock.runFor(60_000)
  49  |   }
  50  |   await page.getByRole('button', { name: 'JOIN GROUP', exact: true }).click()
  51  |   await page.clock.runFor(180_000)
  52  |   const group = page.getByRole('region', { name: 'FIND DANIEL group conversation' })
  53  |   for (let number = 1; number <= 12; number++) {
  54  |     await expect(group).toHaveAttribute('data-scene-node', `OPEN-S02-C${String(number).padStart(2,'0')}`)
  55  |     expect(await page.locator('.scene01-options .opening-choice').count()).toBeGreaterThanOrEqual(4)
  56  |     await page.locator('.scene01-options .opening-choice').first().click()
  57  |     await page.getByRole('button', { name: 'Send', exact: true }).click()
  58  |     await page.clock.runFor(180_000)
  59  |     // Embedded player lines are still individually selected and sent.
  60  |     while (await page.locator('.scene01-options .opening-choice').count() === 1) {
  61  |       const before = await group.locator('.opening-bubble.player').count()
  62  |       await page.clock.runFor(1000)
  63  |       await expect(group.locator('.opening-bubble.player')).toHaveCount(before)
  64  |       await page.locator('.scene01-options .opening-choice').first().click()
  65  |       await page.getByRole('button', { name: 'Send', exact: true }).click()
  66  |       await page.clock.runFor(180_000)
  67  |     }
  68  |   }
  69  |   await expect(group).toHaveAttribute('data-scene-node', 'OPEN-S02-C13')
  70  |   await expect(page.getByLabel('Group participants')).toContainText('3 members')
  71  |   await expect(page.getByLabel('Group participants')).not.toContainText('Lucas')
  72  |   await expect(group.getByText('Lucas left the group.', { exact: true })).toHaveCount(1)
  73  |   await expect(group.getByText('Maya deleted a message.', { exact: true })).toHaveCount(2)
  74  |   await expect(group.getByText('Can we talk privately?', { exact: true })).toBeVisible()
  75  |   await expect(group).not.toHaveAttribute('data-group-complete', 'true')
  76  |   await reply(page, 'Sure.', false)
  77  |   await group.locator('.opening-thread').evaluate(node => { node.scrollTop = 0; node.dispatchEvent(new Event('scroll', { bubbles: true })) })
  78  |   await reachPending(page)
  79  |   expect(await group.locator('.opening-thread').evaluate(node => node.scrollTop)).toBe(0)
  80  |   const pending = (await stored(page)).prologue!.scene01!.privateHandoff!
  81  |   const remaining = pending.dueAt - await page.evaluate(() => Date.now())
  82  |   expect(remaining).toBeGreaterThan(4500)
  83  |   expect(remaining).toBeLessThanOrEqual(5500)
  84  |   await page.clock.runFor(remaining - 1)
  85  |   expect((await stored(page)).prologue!.scene01!.messages.some(line => line.id === 'OPEN-S03-FIRST-MESSAGE')).toBe(false)
  86  |   await page.clock.runFor(1)
  87  |   const banner = page.getByLabel('Incoming notification', { exact: true })
  88  |   await expect(banner).toContainText('Sophie')
  89  |   await expect(banner).toContainText('Hey.')
  90  |   await expect(banner).toContainText('Tap to open conversation')
  91  |   await expect(group).toBeVisible()
  92  |   expect(await group.locator('.opening-thread').evaluate(node => node.scrollTop)).toBe(0)
  93  |   expect((await stored(page)).deliveredEvents).not.toContain('OPEN-S03-ACTIVATED')
  94  |   await page.screenshot({ path: test.info().outputPath('private-handoff-banner.png'), animations: 'disabled' })
  95  |   await page.getByRole('button', { name: 'Open notification from Sophie', exact: true }).click()
  96  |   await expect(page.getByRole('region', { name: 'Sophie private conversation', exact: true })).toBeVisible()
  97  |   await expect(page.locator('.opening-bubble').filter({ hasText: /^Hey\.$/ })).toHaveCount(1)
  98  |   expect((await stored(page)).deliveredEvents.filter(id => id === 'OPEN-S03-ACTIVATED')).toHaveLength(1)
  99  |   await expect(page.getByRole('button', { name: 'Send', exact: true })).toHaveCount(0)
  100 | })
  101 | 
  102 | test('refresh during the 5.5-second handoff retains the deadline and delivers the private message once, with manual chat opening', async ({ page }) => {
  103 |   await seedScene(page, sceneAt('G13'))
  104 |   await openGroup(page)
  105 |   await reply(page, 'Sure.', false)
  106 |   await reachPending(page)
  107 |   const pending = (await stored(page)).prologue!.scene01!.privateHandoff!
  108 |   await page.clock.runFor(1000)
  109 |   await page.reload()
  110 |   await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  111 |   await openGroup(page)
  112 |   expect((await stored(page)).prologue!.scene01!.privateHandoff!.dueAt).toBe(pending.dueAt)
  113 |   const remaining = pending.dueAt - await page.evaluate(() => Date.now())
  114 |   await page.clock.runFor(remaining - 1)
  115 |   expect((await stored(page)).prologue!.scene01!.privateHandoff!.deliveredAt).toBeUndefined()
  116 |   await page.clock.runFor(1)
  117 |   await expect(page.getByLabel('Incoming notification', { exact: true })).toContainText('Hey.')
  118 |   await expect(page.getByRole('region', { name: 'FIND DANIEL group conversation' })).toBeVisible()
  119 |   await page.reload()
  120 |   await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  121 |   await page.clock.runFor(20_000)
  122 |   expect((await stored(page)).prologue!.scene01!.messages.filter(line => line.id === 'OPEN-S03-FIRST-MESSAGE')).toHaveLength(1)
  123 |   expect((await stored(page)).deliveredEvents).not.toContain('OPEN-S03-ACTIVATED')
  124 |   await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  125 |   await page.getByRole('button', { name: 'Open Sophie conversation', exact: true }).click()
  126 |   await expect(page.getByRole('region', { name: 'Sophie private conversation', exact: true })).toBeVisible()
  127 |   expect((await stored(page)).deliveredEvents.filter(id => id === 'OPEN-S03-ACTIVATED')).toHaveLength(1)
  128 | })
  129 | 
  130 | test('an older save stopped after 08D receives only its missing reaction and continues at choice 09', async ({ page }) => {
  131 |   const save = sceneAt('G09', { G08: 'd' }), scene = save.prologue!.scene01!
  132 |   const keep = (id: string) => !id.startsWith('OPEN-S02-AFTER-08-') && !id.startsWith('OPEN-S02-C08-d-')
  133 |   scene.nodeId = 'OPEN-S02-SOURCE-BOUNDARY'; scene.groupSourceBoundary = true; scene.queue = []
  134 |   scene.groupMessages = scene.groupMessages.filter(line => keep(line.id))
  135 |   scene.groupReceipts = scene.groupReceipts?.filter(receipt => keep(receipt.eventId))
  136 |   save.deliveredEvents = save.deliveredEvents.filter(keep)
  137 |   const beforeRelationships = save.relationships
  138 |   await seedScene(page, save)
  139 |   await openGroup(page)
  140 |   await page.clock.runFor(180_000)
> 141 |   await expect(page.getByRole('button', { name: 'What happened that night?', exact: true })).toBeVisible()
      |                                                                                              ^ Error: expect(locator).toBeVisible() failed
  142 |   await expect(page.locator('.opening-bubble.player').filter({ hasText: /^Maybe you should discuss this without me\.$/ })).toHaveCount(1)
  143 |   await expect(page.locator('.opening-bubble').filter({ hasText: /^We probably should have done that earlier\.$/ })).toHaveCount(1)
  144 |   expect((await stored(page)).relationships).toEqual(beforeRelationships)
  145 | })
  146 | 
  147 | test('premium last words and support retain each embedded Send and Lucas still leaves', async ({ page }) => {
  148 |   await seedScene(page, sceneAt('G11'))
  149 |   await openGroup(page)
  150 |   await reply(page, /You don't know me. I don't know you. But I don't think Daniel would be helped/)
  151 |   await expect(page.getByRole('button', { name: "You haven't exactly ruled it out.", exact: true })).toBeVisible()
  152 |   await expect(page.getByText('Lucas left the group.', { exact: true })).toHaveCount(0)
  153 |   await reply(page, "You haven't exactly ruled it out.")
  154 |   await expect(page.getByText('Lucas left the group.', { exact: true })).toHaveCount(1)
  155 |   await expect(page.getByRole('button', { name: "I didn't mean to cause trouble.", exact: true })).toBeVisible()
  156 |   await reply(page, /You don't have to fix everything tonight, Sophie/)
  157 |   await expect(page.getByRole('button', { name: "You're trying to help someone you care about.", exact: true })).toBeVisible()
  158 |   await reply(page, "You're trying to help someone you care about.")
  159 |   await expect(page.getByRole('button', { name: 'Sure.', exact: true })).toBeVisible()
  160 |   expect((await stored(page)).prologue!.scene01!.groupComplete).not.toBe(true)
  161 | })
  162 | 
```