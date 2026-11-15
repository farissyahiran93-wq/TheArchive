import { describe, expect, it } from 'vitest'
import { archiveDiscussions } from '../content/digitalArchiveDiscussion'
import { discussionAction as act, newDiscussion } from './digitalArchiveDiscussion'
import type { ArchiveTopic } from './digitalArchiveFlow'

describe('archive discussions', () => {
  it('requires discovery and a manual send, then delivers bubbles separately', () => {
    let s = newDiscussion()
    expect(act(s, { type: 'select', topic: 'maya' })).toBe(s)
    s = act(s, { type: 'discover', topic: 'maya' })
    s = act(s, { type: 'select', topic: 'maya' })
    expect(act(s, { type: 'send' })).toBe(s)
    s = act(s, { type: 'draft', index: 1 })
    expect(s.messages).toHaveLength(0)
    s = act(s, { type: 'send' })
    expect(s.messages).toHaveLength(1)
    expect(s.pending).toHaveLength(2)
    s = act(s, { type: 'deliver' })
    expect(s.messages).toHaveLength(2)
    expect(s.pending).toHaveLength(1)
  })
  it('completes each topic after its last bubble and prevents repeating it', () => {
    let s = newDiscussion()
    expect(act(s, { type: 'finish' }).finished).toBe(false)
    for (const topic of Object.keys(archiveDiscussions) as ArchiveTopic[]) {
      s = act(s, { type: 'discover', topic })
      s = act(s, { type: 'select', topic })
      for (const _turn of archiveDiscussions[topic].turns) {
        s = act(s, { type: 'draft', index: 0 })
        s = act(s, { type: 'send' })
        while (s.pending.length) s = act(s, { type: 'deliver' })
      }
      expect(s.discussed).toContain(topic)
      expect(act(s, { type: 'select', topic })).toBe(s)
    }
    expect(s.finished).toBe(false)
    expect(act(s, { type: 'finish' }).finished).toBe(true)
  })
})
