import { describe, expect, it } from 'vitest'
import { digitalArchiveFlow as act, newDigitalArchiveFlow } from './digitalArchiveFlow'

describe('new digital archive transitions', () => {
  it('keeps installation, import and recovery separate and caps recovery at 20%', () => {
    let state = newDigitalArchiveFlow()
    expect(act(state, { type: 'accept' })).toBe(state)
    state = act(state, { type: 'install' })
    state = act(state, { type: 'advance', amount: 100 })
    expect(state).toMatchObject({ phase: 'setup', progress: 100 })
    state = act(state, { type: 'open-workspace' })
    state = act(state, { type: 'reject' })
    expect(act(state, { type: 'accept' })).toBe(state)
    state = act(state, { type: 'reconsider' })
    state = act(state, { type: 'accept' })
    state = act(state, { type: 'advance', amount: 100 })
    expect(state.phase).toBe('ready')
    expect(act(state, { type: 'discover', topic: 'maya' })).toBe(state)
    state = act(state, { type: 'recover' })
    state = act(state, { type: 'advance', amount: 500 })
    expect(state).toMatchObject({ phase: 'interrupted', progress: 20 })
  })
  it('requires discovery, topic selection and a deliberate draft before sending', () => {
    let state = { ...newDigitalArchiveFlow(), phase: 'interrupted' as const, progress: 20 }
    expect(act(state, { type: 'topic', topic: 'maya' })).toBe(state)
    state = act(state, { type: 'discover', topic: 'maya' }) as typeof state
    state = act(state, { type: 'topic', topic: 'maya' }) as typeof state
    expect(act(state, { type: 'send' })).toBe(state)
    state = act(state, { type: 'draft', index: 1 }) as typeof state
    state = act(state, { type: 'send' }) as typeof state
    expect(state.discussed).toEqual(['maya'])
  })
})
