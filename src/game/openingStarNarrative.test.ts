import { describe, expect, it } from 'vitest'
import { scene01Nodes } from '../content/scene01'
import { scene01Script } from '../content/scene01Script'
import { scene03Script } from '../content/scene03Script'
import { scene02Nodes } from '../content/scene02'
import { beginLegacyScene01 as beginScene01, deliverScene01, sendScene01Choice } from './scene01'
import { newGame } from './types'

describe('starred export opening revision', () => {
  it('contains no note reveal or note receipt anywhere in the active first three scenes', () => {
    for (const node of Object.values(scene01Nodes)) {
      const texts = node.kind === 'npc' ? [node.text] : node.kind === 'choice' ? node.choices.map(c => c.text) : []
      for (const text of texts) expect(text, node.id).not.toMatch(/\b(note|handwritten|handwriting|damaged page)\b/iu)
      if (node.kind === 'npc') expect(node.heardFacts?.some(f => /NOTE|NO-CLEAR-COPY/u.test(f)), node.id).not.toBe(true)
    }
  })
  it('retains decision counts, branch IDs, premiums and explicit Send nodes', () => {
    expect(scene01Script.choices).toHaveLength(14)
    expect(scene03Script.choices).toHaveLength(19)
    expect(scene03Script.choices.reduce((n, beat) => n + beat.choices.length, 0)).toBe(86)
    expect(Object.values(scene02Nodes).filter(n => n.kind === 'choice' && n.number?.startsWith('G'))).toHaveLength(13)
    expect(scene01Nodes['OPEN-S01-C03'].kind).toBe('choice')
    expect(scene01Script.choices[2].choices.map(c => c.id)).toEqual(['a', 'b', 'c', 'd'])
    const messages = Object.values(scene02Nodes).filter(n => n.kind === 'npc').map(n => n.text)
    expect(messages).toContain('Do we even know Daniel was the one who marked it?')
    expect(messages).toContain('We can ask questions without treating the star as proof.')
  })
  it('awards the star report only when its own bubble is delivered, not on selection or scene entry', () => {
    let save = beginScene01(newGame(), 1000)
    const settle = () => { for (let i = 0; i < 100 && save.prologue!.scene01!.queue.length; i++) save = deliverScene01(save, save.prologue!.scene01!.queue[0].dueAt) }
    settle()
    expect(save.knowledge.player).not.toContain('OPEN-CONTACT-STAR-REPORTED')
    save = sendScene01Choice(save, 'a', '', true, 100000)
    settle()
    save = sendScene01Choice(save, 'a', '', true, 200000)
    expect(save.knowledge.player).not.toContain('OPEN-CONTACT-STAR-REPORTED')
    settle()
    expect(save.knowledge.player).toContain('OPEN-CONTACT-STAR-REPORTED')
    expect(save.knowledge.player).not.toContain('OPEN-CONTACT-AUTHOR-UNKNOWN')
    expect(save.evidence).toEqual({})
    save = sendScene01Choice(save, 'b', '', true, 300000)
    settle()
    expect(save.knowledge.player).toContain('OPEN-CONTACT-AUTHOR-UNKNOWN')
    expect(save.knowledge.characters.maya).not.toContain('OPEN-CONTACT-STAR-REPORTED')
  })
})
