import { expect, it } from 'vitest'
import { newGame, type GameSave } from './types'
import { beginScene01, deliverScene01, draftGroupName, openScene03, scene01Choices, sendScene01Choice } from './scene01'
import { normalizeSave } from './engine'
import { actINodes } from '../content/actIRegistry'
import { prepareReplay } from './sceneLibrary'
import { masterScene04Action } from './masterScene04'

function drain(s: GameSave): GameSave {
  for (let n = 0; n < 300 && s.prologue?.scene01?.queue.length; n++) s = deliverScene01(s, s.prologue.scene01.queue[0].dueAt)
  return s
}
it.each(['a', 'b', 'c'].flatMap(branch => ['a', 'b'].map(title => [branch, title])))('plays V7 branch %s with title %s', (branch, title) => {
  let s = drain(beginScene01({ ...newGame(), masterOpening: true }, 1000))
  expect(s.prologue?.scene01?.nodeId).toBe('TA-S01-V7-NAME')
  s = normalizeSave(JSON.parse(JSON.stringify(draftGroupName(s, 'Alex'))))
  expect(s.prologue?.scene01?.groupNameDraft).toBe('Alex')
  s = drain(sendScene01Choice(s, 'name', 'Alex', true, 2000))
  s = normalizeSave(JSON.parse(JSON.stringify(s)))
  s = drain(sendScene01Choice(s, title, '', true, 3000))
  expect(s.player).toEqual({ name: 'Alex', pronouns: title === 'a' ? 'he/him' : 'she/her' })
  for (let i = 1; i <= 9; i++) {
    expect(scene01Choices(s)).toHaveLength(3)
    s = drain(sendScene01Choice(s, branch, '', true, 4000 + i * 1000))
  }
  const sophieLines = s.prologue!.scene01!.messages.filter(message => message.sender === 'sophie').map(message => message.text)
  expect(sophieLines.some(text => /my birthday|my birthday cake|\bMaya\b|\bLucas\b/i.test(text))).toBe(false)
  expect(sophieLines).toContain('He almost dropped the cake that night, actually.')
  expect(sophieLines).toContain('His fiancée and some close friends.')
  expect(sophieLines).toContain('Your number had no name.')
  expect(sophieLines).toContain('The entry was marked with a star.')
  expect(sophieLines.some(text => /the remark was a star|a little star beside it/i.test(text))).toBe(false)
  expect(s.prologue?.scene01?.groupMembers?.daniel).toBe(true)
  s = normalizeSave(JSON.parse(JSON.stringify(s)))
  expect(s.prologue?.scene01?.nodeId).toBe('TA-S02-V7-C01')
  expect(s.prologue?.scene01?.groupMessages.some(m => m.text === `${title === 'a' ? "He's" : "She's"} the person I told you about earlier.`)).toBe(true)
  expect(s.prologue?.scene01?.groupMessages.some(m => /\[(?:subject|object|possessive|PlayerName)/i.test(m.text))).toBe(false)
  expect(s.knowledge.characters.maya).toContain('OPEN-S01-PLAYER-CODENAME')
  expect(s.prologue?.scene01?.groupReceipts?.some(r => r.eventId === 'TA-S02-V7-OPEN-2' && r.recipient === 'maya')).toBe(true)
  s = drain(sendScene01Choice(s, branch, '', true, 15000))
  expect(s.prologue?.scene01?.nodeId).toBe('TA-S02-ELI-C02')
  for (let i = 0; i < 30 && !s.prologue?.scene01?.groupComplete; i++) {
    const option = scene01Choices(s)[0]
    if (!option) break
    s = drain(sendScene01Choice(s, option.id, '', true, 20000 + i * 1000))
  }
  expect(s.prologue?.scene01?.groupMessages.some(m => m.text === 'The entry was marked with a star.')).toBe(true)
  expect(s.prologue?.scene01?.groupComplete).toBe(true)
  expect(s.prologue?.scene01?.groupMessages.some(m => /\[(?:subject|object|possessive|PlayerName)/i.test(m.text))).toBe(false)
  expect(s.prologue?.scene01?.lucasLeftGroup).toBe(true)
  expect(s.prologue?.scene01?.privateHandoff).toBeDefined()
  s = drain(openScene03(s, 100000))
  for (let i = 0; i < 10; i++) s = drain(sendScene01Choice(s, 'a', '', true, 110000 + i * 10000))
  expect(s.prologue?.scene01?.privateScene03?.complete).toBe(true)
  expect(masterScene04Action(s, { type: 'start' }, 300000).masterScene04).toBeDefined()
})

it('keeps a saved V4 cursor on the original graph', () => {
  const fresh = drain(beginScene01({ ...newGame(), masterOpening: true }, 1000))
  const scene = { ...fresh.prologue!.scene01!, masterScene01Revision: 4 as const, nodeId: 'TA-S01-V4-C01' }
  const restored = normalizeSave(JSON.parse(JSON.stringify({ ...fresh, prologue: { ...fresh.prologue!, scene01: scene } })))
  expect(actINodes(restored.prologue!.scene01!)['TA-S01-V4-C01']).toMatchObject({ kind: 'choice' })
  expect(restored.prologue!.scene01!.nodeId).toBe('TA-S01-V4-C01')
})

it('preserves a name with punctuation and non-ASCII characters', () => {
  let s = drain(beginScene01({ ...newGame(), masterOpening: true }, 1000))
  s = drain(sendScene01Choice(s, 'name', 'Álya O’Neil', true, 2000))
  expect(s.player?.name).toBe('Álya O’Neil')
  expect(s.prologue?.scene01?.messages.some(m => m.text === 'Hi, Álya O’Neil.')).toBe(true)
})

it('restarts Scene 2 with the latest dialogue and a complete test identity', () => {
  let s = drain(beginScene01({ ...newGame(), masterOpening: true }, 1000))
  s = drain(sendScene01Choice(s, 'name', 'Nadia', true, 2000))
  s = drain(sendScene01Choice(s, 'b', '', true, 3000))
  for (let i = 0; i < 9; i++) s = drain(sendScene01Choice(s, 'a', '', true, 4000 + i * 1000))
  const replay = drain(prepareReplay({ save: s, capturedAt: 15000 }, 16000, 2))
  expect(replay.prologue?.scene01?.nodeId).toBe('TA-S02-V7-C01')
  expect(replay.player).toEqual({ name: 'Nadia', pronouns: 'she/her' })
  expect(replay.prologue?.scene01?.groupMessages.filter(m => m.id === 'TA-S02-PLAYER-JOINED')).toHaveLength(1)
})
