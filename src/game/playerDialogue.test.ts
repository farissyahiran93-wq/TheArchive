import { describe, expect, it } from 'vitest'
import { playerDialogue } from './playerDialogue'

describe('player dialogue interpolation', () => {
  it.each([
    ['he/him' as const, "He's Alex. I showed him his photo. It is his. He did it himself."],
    ['she/her' as const, "She's Alex. I showed her her photo. It is hers. She did it herself."],
    ['they/them' as const, "They're Alex. I showed them their photo. It is theirs. They did it themself."],
  ])('renders %s without altering plural prose', (pronouns, expected) => {
    const text = '[SubjectIs] [PlayerName]. I showed [object] [possessive] photo. It is [possessivePronoun]. [Subject] did it [reflexive].'
    expect(playerDialogue(text, { name: 'Alex', pronouns })).toBe(expected)
    expect(playerDialogue('They are all here.', { name: 'Alex', pronouns })).toBe('They are all here.')
  })
})
