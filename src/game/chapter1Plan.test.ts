import { describe, expect, it } from 'vitest'
import { chapter1ScenePlan } from '../content/chapter1Plan'
import { scene01Nodes } from '../content/scene01'
import { scene02Id } from '../content/scene02'
import { scene03Id } from '../content/scene03'
import { newGame } from './types'
import { beginLegacyScene01 as beginScene01 } from './scene01'
import { accessNextDue, chapter2Access } from './chapter2Access'
import { normalizeSave } from './engine'

describe('18-scene editorial boundary', () => {
  it('has a complete five-act dependency chain without remapping runtime nodes', () => {
    expect(chapter1ScenePlan).toHaveLength(18)
    expect(new Set(chapter1ScenePlan.map(s => s.id)).size).toBe(18)
    expect(chapter1ScenePlan.filter(s => s.implementation === 'implemented')).toHaveLength(4)
    expect([...new Set(chapter1ScenePlan.map(s => s.act))]).toEqual([1, 2, 3, 4, 5])
    expect(chapter1ScenePlan[1].id).toBe(scene02Id)
    expect(chapter1ScenePlan[2].id).toBe(scene03Id)
    for (const [i, scene] of chapter1ScenePlan.entries()) {
      expect(scene.number).toBe(i + 1)
      expect(scene.dependsOn).toEqual(i ? [chapter1ScenePlan[i - 1].id] : [])
      expect(scene.id.startsWith('E01-S')).toBe(false)
      if (i === 3) expect(scene.approval).toBe('screenplay-integrated')
      if (i >= 4) { expect(scene.approval).toBe('structure-approved-dialogue-provisional'); expect(scene01Nodes[scene.id]).toBeUndefined() }
    }
  })
  it('keeps a completed historical opening on the phone without Unknown, installation or evidence awards', () => {
    const save = beginScene01(newGame(), 100)
    save.prologue!.scene01 = { ...save.prologue!.scene01!, queue: [], groupComplete: true, lucasLeftGroup: true, privateScene03: { version: 1, startedAt: 100, complete: true, completedAt: 200, reading: false, nextEventReady: true, receipts: [] } }
    const restored = normalizeSave(JSON.parse(JSON.stringify(save)))
    expect(accessNextDue(restored)).toBe(Infinity)
    for (const time of [201, 7200, 9999999999999]) expect(chapter2Access(restored, { type: 'tick' }, time)).toBe(restored)
    const untagged = { ...restored }
    delete untagged.narrativePlan
    expect(accessNextDue(untagged)).toBe(Infinity)
    expect(chapter2Access(untagged, { type: 'tick' }, 99999999)).toBe(untagged)
    expect(restored.chapter2Access).toBeUndefined()
    expect(restored.knowledge).toEqual(save.knowledge)
    expect(restored.evidence).toEqual(save.evidence)
    const historical = chapter2Access({ ...save, narrativePlan: 'legacy-access' }, { type: 'tick' }, 7200)
    delete historical.narrativePlan
    const oldAccess = normalizeSave(JSON.parse(JSON.stringify(historical)))
    expect(oldAccess.chapter2Access?.unknownCreated).toBe(true)
    expect(chapter2Access(oldAccess, { type: 'tick' }, 99999999)).toBe(oldAccess)
  })
  it('preserves an absent plan in historical saves instead of silently migrating it', () => {
    const save = newGame()
    delete save.narrativePlan
    expect(normalizeSave(JSON.parse(JSON.stringify(save))).narrativePlan).toBeUndefined()
    expect(() => normalizeSave({ ...save, narrativePlan: 'unapproved' })).toThrow('Invalid narrative plan')
  })
})
