import { describe, expect, it } from 'vitest'
import { sceneStartMarkers } from './sceneMarkers'
import { chatSceneId } from '../content/chatScenes'
import { actINodes } from '../content/actIRegistry'
import { reunionNodes } from '../content/chapter2Reunion'
import { normalizeSave } from '../game/engine'
import { ActIFinalFixture } from '../../tests/helpers/actIFinal'

describe('scene start markers', () => {
  it('marks the first NPC once across consecutive lines, actor changes, player Sends and system events', () => {
    const lines = [
      { id: 'OPEN-S02-JOIN', sender: 'system' },
      { id: 'OPEN-S02-PLAYER', sender: 'player' },
      ...['sophie', 'sophie', 'sophie', 'maya', 'sophie', 'lucas'].map((sender, i) => ({ id: `OPEN-S02-LINE-${i}`, sender })),
      { id: 'OPEN-S02-DONE', sender: 'system' },
    ]
    expect([...sceneStartMarkers(lines)]).toEqual([['OPEN-S02-LINE-0', 'ch01_sc02_uninvited_guest']])
  })

  it('adds one marker for a later genuine scene, even if the first actor is unchanged', () => {
    const lines = [{ id: 'OPEN-S01-FIRST', sender: 'sophie' }, { id: 'OPEN-S03-SYSTEM', sender: 'system' }, { id: 'OPEN-S03-PLAYER', sender: 'player' }, { id: 'OPEN-S03-FIRST-MESSAGE', sender: 'sophie' }, { id: 'OPEN-S03-LATER', sender: 'sophie' }]
    expect([...sceneStartMarkers(lines).keys()]).toEqual(['OPEN-S01-FIRST', 'OPEN-S03-FIRST-MESSAGE'])
  })

  it('preserves placement if an earlier optional thread resumes after a later scene', () => {
    const lines = [{ id: 'OPEN-S04-FIRST', sender: 'maya' }, { id: 'EV-S05-SOPHIE-OPEN', sender: 'sophie' }, { id: 'OPEN-S04-RESUMED', sender: 'sophie' }]
    expect([...sceneStartMarkers(lines).keys()]).toEqual(['OPEN-S04-FIRST', 'EV-S05-SOPHIE-OPEN'])
  })

  it('never guesses a boundary for an unknown event, system event, choice or typing update', () => {
    expect(sceneStartMarkers([{ id: 'unknown', sender: 'maya' }, { id: 'OPEN-S02-TYPING', sender: 'system' }, { id: 'OPEN-S02-CHOICE', sender: 'player' }]).size).toBe(0)
  })

  it('uses explicit narrative metadata when supplied, independently of message identity', () => {
    const lines = [{ id: 'a', sender: 'maya', sceneId: 'canonical-scene' }, { id: 'b', sender: 'lucas', sceneId: 'canonical-scene' }]
    expect([...sceneStartMarkers(lines)]).toEqual([['a', 'canonical-scene']])
  })

  it('restores old final-route history without changing a save, its receipts, dialogue or progression', () => {
    const save = new ActIFinalFixture().until('complete').save
    const before = JSON.stringify(save)
    const scene = save.prologue!.scene01!
    const group = sceneStartMarkers(scene.groupMessages)
    expect(group.size).toBe(1)
    expect(scene.groupMessages.find(line => group.has(line.id))?.sender).toBe('sophie')
    expect(sceneStartMarkers(scene.messages).size).toBe(2)
    const restored = normalizeSave(JSON.parse(before)).prologue!.scene01!
    expect(sceneStartMarkers(restored.groupMessages)).toEqual(group)
    expect(sceneStartMarkers(restored.messages)).toEqual(sceneStartMarkers(scene.messages))
    expect(JSON.stringify(save)).toBe(before)
    expect(sceneStartMarkers(scene.groupMessages)).toEqual(group)
  })

  it('has scene metadata for every NPC node on both Chapter 1 screenplay graphs', () => {
    for (const revision of [undefined, 'final-2026-10-23'] as const) {
      for (const node of Object.values(actINodes({ scriptRevision: revision }))) {
        if (node.kind === 'npc') expect(chatSceneId(node.id), node.id).toBeDefined()
      }
    }
  })

  it('maps Chapter 2 branches to scene entrances, never each dialogue node', () => {
    for (const [id, node] of Object.entries(reunionNodes)) {
      if (node.kind === 'npc') expect(chatSceneId(`C2-STORY-group-${id}`), id).toBeDefined()
    }
    const lines = [{ id: 'C2-GROUP-0', sender: 'maya' }, { id: 'C2-STORY-group-N08_000', sender: 'maya' }, { id: 'C2-STORY-group-C2S10_neutral_000', sender: 'maya' }]
    expect([...sceneStartMarkers(lines).values()]).toEqual(['C2_ACCESS_008', 'ch02_sc10'])
  })
})
