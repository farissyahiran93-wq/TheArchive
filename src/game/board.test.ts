import { describe, expect, it } from 'vitest'
import { boardPairFeedback, boardSourceStatus, linkBoardPair, unlinkBoardPair } from './board'
import { normalizeSave, registerPlayer } from './engine'
import { newGame, type GameSave } from './types'

function boardState(): GameSave {
  const state = registerPlayer(newGame(),'Rae')
  return { ...state, evidence: {
    E001: { id:'E001', source:'Public crop', collectedAt:1, verified:false },
    E002: { id:'E002', source:'Public current copy', collectedAt:2, verified:false },
  } }
}

describe('private Case Board', () => {
  it('persists source-limited working links without granting a fact or disclosing it', () => {
    const initial = boardState()
    const linked = linkBoardPair(initial,'E001','E002')
    expect(linked.e01?.boardLinks).toEqual(['E001|E002'])
    expect(linked.knowledge.player).not.toContain('K02')
    expect(linked.messages).toEqual([])
    expect(normalizeSave(JSON.parse(JSON.stringify(linked))).e01?.boardLinks).toEqual(['E001|E002'])
    expect(linkBoardPair(linked,'E002','E001')).toBe(linked)
    expect(unlinkBoardPair(linked,'E001|E002').e01?.boardLinks).toEqual([])
  })

  it('blocks an unverified GCRO file and an unsupported pairing', () => {
    const issued = { ...boardState(), e01: { ...boardState().e01!, s27Status: 'issued' as const } }
    expect(boardSourceStatus(issued,'E012')).toBe('collected')
    expect(boardPairFeedback(issued,'E002','E012')).toContain('four checks')
    expect(linkBoardPair(issued,'E002','E012')).toBe(issued)
    expect(linkBoardPair(issued,'E001','E012')).toBe(issued)
    const verified = { ...issued, deliveredEvents: [...issued.deliveredEvents,'R04'] }
    expect(boardSourceStatus(verified,'E012')).toBe('verified')
    expect(linkBoardPair(verified,'E002','E012').e01?.boardLinks).toEqual(['E002|E012'])
  })
})
