import { describe, expect, it } from 'vitest'
import { accessNodes } from '../content/chapter2Access'
import { accessChoices, accessMirrorItems, accessNextDue, chapter2Access, validateAccessState } from './chapter2Access'
import { beginScene01 } from './scene01'
import { normalizeSave } from './engine'
import { newGame, type GameSave } from './types'
import { phoneNotices } from './phonePresentation'

const time = 1800000000000
function completed() {
  const s = beginScene01(newGame(), time)
  s.prologue!.scene01 = { ...s.prologue!.scene01!, queue: [], groupComplete: true, lucasLeftGroup: true, privateScene03: { version: 1, startedAt: time, reading: false, complete: true, completedAt: time, nextEventReady: true, receipts: [] } }
  return s
}
function start() { return chapter2Access(completed(), { type: 'tick' }, time+7000) }
function drain(s: GameSave): GameSave {
  for (let i = 0; i < 100; i++) {
    const q = s.chapter2Access?.queue
    if (!q) return s
    s = chapter2Access(s, { type: 'tick' }, q.dueAt)
  }
  throw new Error('Stalled access queue')
}
function reply(s: GameSave, id: string) {
  const now = Math.max(time+10000, ...s.chapter2Access!.messages.map(m => m.at))+100
  return drain(chapter2Access(chapter2Access(s, { type: 'draft', id }, now), { type: 'send', id }, now))
}
function atPackage() {
  let s = start()
  for (let i = 0; i < 20; i++) {
    if (s.chapter2Access!.node === 'PACKAGE') return s
    s = reply(s, accessChoices(s)[0].id)
  }
  throw new Error('No package')
}
function installed() {
  let s = drain(chapter2Access(atPackage(), { type: 'confirm-install' }, time+500000))
  s = reply(s, 'U07_ACK_A')
  s = reply(s, 'U08_C')
  return s
}

describe('Chapter 2 access arc', () => {
  it('waits for the complete original Sophie scene and does not alter its ending', () => {
    expect(chapter2Access(newGame(), { type: 'tick' }, time)).toEqual(newGame())
    const original = completed(), next = chapter2Access(original, { type: 'tick' }, time+6999)
    expect(next.prologue).toEqual(original.prologue)
    expect(next.chapter2Access?.messages).toEqual([])
    expect(accessNextDue(next)).toBe(time+7000)
    const arrived = chapter2Access(next, { type: 'tick' }, time+7000)
    expect(arrived.chapter2Access?.messages.map(m => m.text)).toEqual(["You're looking in the wrong place."])
    expect(chapter2Access(arrived, { type: 'tick' }, time+10000)).toBe(arrived)
    expect(phoneNotices(arrived).at(-1)?.thread).toBe('unknown')
  })
  it('has valid graph targets, nine main decision points and no automatic player bubble', () => {
    for (const n of Object.values(accessNodes)) {
      const targets = n.kind === 'npc' ? [n.next] : n.kind === 'choice' ? n.options.map(o => o.next) : n.kind === 'reference' ? [n.yes,n.no] : []
      for (const target of targets) expect(accessNodes[target], target).toBeTruthy()
    }
    for (const id of ['U01','U02','U03','U04','U05','U06','U06B','U07_ACK','U08']) expect(accessNodes[id].kind).toBe('choice')
    const s = start()
    expect(chapter2Access(s, { type: 'send', id: 'U01_A' })).toBe(s)
    const draft = chapter2Access(s, { type: 'draft', id: 'U01_A' })
    expect(draft.chapter2Access?.messages).toEqual(s.chapter2Access?.messages)
    expect(normalizeSave(JSON.parse(JSON.stringify(draft)))).toEqual(draft)
    expect(chapter2Access(draft, { type: 'tick' }, time+999999)).toBe(draft)
  })
  for (const [nodeId, node] of Object.entries(accessNodes)) if (node.kind === 'choice') {
    for (const option of node.options) it(`delivers the unique branch ${option.id}, keeping nested decisions behind Send`, () => {
      const base = start(), s = { ...base, chapter2Access: { ...base.chapter2Access!, node: nodeId, ...(nodeId.startsWith('U08') ? { installAuthorized: true, packageStatus: 'accepted' as const } : {}) } }
      const result = reply(s, option.id)
      expect(result.chapter2Access?.messages.filter(m => m.sender === 'player').map(m => m.text)).toEqual([option.text])
      expect(result.chapter2Access?.choices[nodeId]).toBe(option.id)
      expect(result.knowledge.characters).toEqual(s.knowledge.characters)
      expect(result.relationships).toEqual(s.relationships)
      validateAccessState(result.chapter2Access)
    })
  }
  it('rejects without installation and persists a manually reusable package', () => {
    const offered = atPackage(), declined = drain(chapter2Access(offered, { type: 'decline' }, time+500000))
    expect(declined.chapter2Access).toMatchObject({ node: 'DECLINED', phase: 'declined', packageStatus: 'declined', mirrorUnlocked: false, spyInstalled: false, installAuthorized: false })
    const loaded = normalizeSave(JSON.parse(JSON.stringify(declined)))
    expect(chapter2Access(loaded, { type: 'tick' }, time+99999999)).toBe(loaded)
    expect(chapter2Access(loaded, { type: 'start-recovery' })).toBe(loaded)
    const accepted = drain(chapter2Access(loaded, { type: 'confirm-install' }, time+600000))
    expect(accepted.chapter2Access?.node).toBe('U07_ACK')
    expect(chapter2Access(accepted, { type: 'confirm-install' })).toBe(accepted)
  })
  it('answers all three package questions once and returns without installing', () => {
    let s = atPackage()
    for (const id of ['U07Q_A','U07Q_B','U07Q_C']) {
      s = drain(chapter2Access(s, { type: 'question', id }, time+600000))
      expect(s.chapter2Access?.node).toBe('PACKAGE')
      expect(chapter2Access(s, { type: 'question', id })).toBe(s)
    }
    expect(s.chapter2Access?.installAuthorized).toBe(false)
    expect(s.chapter2Access?.questionsAsked).toHaveLength(3)
  })
  it('performs exactly one consented takeover and no live relay or hidden knowledge transfer', () => {
    const s = installed(), c = s.chapter2Access!
    expect(c).toMatchObject({ installAuthorized: true, installCompleted: true, mirrorUnlocked: true, spyInstalled: true, relayAvailable: false, unknownOffline: true })
    expect(s.deliveredEvents.filter(id => id === 'C2-INSTALL-BEGIN')).toHaveLength(1)
    expect(s.deliveredEvents.filter(id => id === 'C2-INSTALL-DONE')).toHaveLength(1)
    expect(s.prologue).toEqual(completed().prologue)
    expect(s.knowledge).toEqual(completed().knowledge)
    const failed = chapter2Access(s, { type: 'failed-reply', id: 'R_A' })
    expect(failed.chapter2Access?.messages.at(-1)?.text).toBe('MESSAGE NOT DELIVERED — RECIPIENT UNAVAILABLE')
    expect(failed.chapter2Access?.receipts.some(r => r.eventId === 'C2-FAILED-REPLY')).toBe(false)
    expect(chapter2Access(failed, { type: 'failed-reply', id: 'R_B' })).toBe(failed)
  })
  it('keeps a real 25-minute deadline and queues the existing group independently, exactly once', () => {
    let s = chapter2Access(installed(), { type: 'open-mirror' }, time+1000000)
    s = chapter2Access(s, { type: 'life-navigate', location:{app:'Mail',item:'LIFE-E4'} }, time+1000000)
    s = chapter2Access(s, { type: 'start-recovery' }, time+1000000)
    expect(s.chapter2Access?.recovery).toEqual({ startedAt: time+1000000, dueAt: time+2500000 })
    expect(chapter2Access(s, { type: 'start-recovery' }, time+1000001)).toBe(s)
    s = normalizeSave(JSON.parse(JSON.stringify(s)))
    s = chapter2Access(s, { type: 'tick' }, time+1018000)
    expect(s.chapter2Access?.groupMessages[0].text).toBe('Eli?')
    expect(s.chapter2Access?.story?.sessions.group?.queue?.dueAt).toBeUndefined()
    expect(s.chapter2Access?.complete).toBe(false)
    s = chapter2Access(s, { type: 'open-group' }, time+1018001)
    expect(s.chapter2Access?.groupOpened).toBe(true)
    expect(s.chapter2Access?.story?.sessions.group?.queue?.dueAt).toBeGreaterThan(time+1018001)
    expect(s.chapter2Access?.groupMessages.some(m => m.sender === 'player')).toBe(false)
    s=chapter2Access(s,{type:'story-close',thread:'group'},time+1018002)
    const later = chapter2Access(s, { type: 'tick' }, time+99999999)
    expect(later.chapter2Access?.recovery).toMatchObject(s.chapter2Access!.recovery!)
    expect(later.chapter2Access?.recovery?.readyAt).toBe(time+99999999)
    expect(later.chapter2Access?.groupMessages).toEqual(s.chapter2Access?.groupMessages)
    expect(later.chapter2Access).not.toHaveProperty('recoveredContents')
  })
  it('allows any mirror inspection order without granting forensic knowledge or NPC receipts', () => {
    let s = chapter2Access(installed(), { type: 'open-mirror' })
    const original = s.knowledge
    for (const item of [...accessMirrorItems].reverse()) s = chapter2Access(s, { type: 'inspect', id: item.id })
    expect(s.chapter2Access?.viewed).toHaveLength(10)
    expect(s.knowledge).toEqual(original)
    expect(chapter2Access(s, { type: 'inspect', id: 'maya' })).toBe(s)
  })
  it('rejects malformed timer, live relay, unauthorized installation and graph state', () => {
    const c = installed().chapter2Access!
    for (const value of [{ ...c, relayAvailable: true }, { ...c, node: 'missing' }, { ...c, installAuthorized: false }, { ...c, recovery: { startedAt: 1, dueAt: 2 } }, { ...c, queue: { id: 'bad', dueAt: 1 } }]) expect(() => validateAccessState(value)).toThrow()
  })
})
