import { describe, expect, it } from 'vitest'
import { masterScene01Nodes, masterScene01Start } from '../content/masterScene01'
import { newGame, type GameSave } from './types'
import { normalizeSave } from './engine'
import { beginScene01, beginScene02, deliverScene01, scene01Choices, scene01Invitation, sendScene01Choice } from './scene01'

function drain(state: GameSave): GameSave {
  for (let n = 0; n < 100; n++) {
    const next = state.prologue?.scene01?.queue[0]
    if (!next) return state
    state = deliverScene01(state, next.dueAt)
  }
  throw Error('Queue failed to settle')
}

describe('new Scene 1 authored graph', () => {
  it('has nine choices with three distinct responses and valid branch targets', () => {
    expect(masterScene01Nodes[masterScene01Start]?.kind).toBe('npc')
    for (let i = 1; i <= 9; i++) {
      const node = masterScene01Nodes[`TA-S01-C${String(i).padStart(2, '0')}`]
      expect(node?.kind).toBe('choice')
      if (node?.kind !== 'choice') throw Error('Missing choice')
      expect(node.choices).toHaveLength(3)
      expect(new Set(node.choices.map(choice => choice.text)).size).toBe(3)
      for (const choice of node.choices) expect(masterScene01Nodes[choice.next]?.kind).toBe('npc')
    }
    for (const node of Object.values(masterScene01Nodes)) {
      if ('next' in node && node.next) expect(masterScene01Nodes[node.next]).toBeDefined()
    }
  })

  it('plays every alternative, persists its matching reply and requires joining', () => {
    for (let beat = 1; beat <= 9; beat++) for (const choice of ['a', 'b', 'c']) {
      let state = drain(beginScene01({ ...newGame(), masterOpening: true }, 1000))
      for (let i = 1; i <= 9; i++) {
        const id = i === beat ? choice : 'a'
        expect(scene01Choices(state)).toHaveLength(3)
        const selected = scene01Choices(state).find(option => option.id === id)!
        const response = masterScene01Nodes[selected.next]
        const affinity = state.relationships.sophie.affinity
        state = drain(sendScene01Choice(state, id, '', true, 100000 + i * 1000))
        expect(state.relationships.sophie.affinity).toBe(Math.min(100, affinity + (id === 'a' && [2, 5, 6, 7].includes(i) ? 1 : 0)))
        if (response.kind === 'npc') expect(state.prologue!.scene01!.messages.some(line => line.id === response.id && line.text === response.text)).toBe(true)
        state = normalizeSave(JSON.parse(JSON.stringify(state)))
      }
      expect(state.prologue!.scene01!.complete).toBe(false)
      expect(state.deliveredEvents).not.toContain('TA-S01-SCENE02-UNLOCKED')
      if (state.prologue!.scene01!.invitation === 'declined') state = scene01Invitation(state, 'accept')
      state = scene01Invitation(state, 'dismiss')
      state = normalizeSave(JSON.parse(JSON.stringify(state)))
      expect(state.prologue!.scene01!.invitationDismissed).toBe(true)
      state = scene01Invitation(state, 'show')
      state = scene01Invitation(state, 'join')
      expect(state.prologue!.scene01!.complete).toBe(true)
      expect(state.deliveredEvents).toContain('TA-S01-SCENE02-UNLOCKED')
      expect(beginScene02(state)).toBe(state)
      expect(normalizeSave(JSON.parse(JSON.stringify(state))).prologue!.scene01!.groupScript).toBeUndefined()
    }
  })
})
