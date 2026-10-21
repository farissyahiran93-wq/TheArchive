import { describe, expect, it } from 'vitest'
import { newGame } from './types'
import { registerPlayer, normalizeSave } from './engine'
import { deliverOpening, groupChoices, markOpeningRead, readDanielNote, replyToSophie, sendGroupChoice } from './opening'

const drain = <T extends ReturnType<typeof newGame>>(save: T) => deliverOpening(save, Number.MAX_SAFE_INTEGER)

describe('new Sophie → FIND DANIEL → Sophie opening', () => {
  it.each(['calm','confused','defensive','skeptical','direct'])('keeps first group choice %s explicit and changes Maya response', choice => {
    let save = drain(registerPlayer(newGame(), 'Rae'))
    save = drain(replyToSophie(save, 'who', 100))
    expect(save.prologue?.social?.phase).toBe('invitation')
    expect(readDanielNote(save)).toBe(save)
    save = drain(replyToSophie(save, 'join', 200))
    expect(save.prologue?.stage).toBe('group')
    expect(save.prologue?.social?.members).toEqual(['sophie','maya','lucas','player'])
    expect(save.notifications.some(item => item.id === 'OPEN-GROUP-ADD' && !item.read)).toBe(true)
    const group = sendGroupChoice(save, choice, 300)
    expect(group.choices['OPEN-GROUP-FIRST']).toBe(choice)
    expect(group.prologue?.social?.messages.filter(item => item.sender === 'player')).toHaveLength(1)
    expect(sendGroupChoice(group, choice)).toBe(group)
    save = drain(group)
    expect(groupChoices(save.prologue!)).toHaveLength(3)
    expect(save.prologue?.social?.messages.some(item => item.id === 'OPEN-GROUP-LUCAS-2')).toBe(true)
  })

  it('persists staggered departures, then delivers the private second contact before the note', () => {
    let save = drain(registerPlayer(newGame(), 'Rae'))
    save = drain(replyToSophie(save, 'number', 100))
    save = drain(replyToSophie(save, 'join', 200))
    save = drain(sendGroupChoice(save, 'calm', 300))
    save = drain(sendGroupChoice(save, 'boundary', 400))
    expect(save.prologue?.stage).toBe('chat')
    expect(save.prologue?.social?.members).toEqual(['maya','player'])
    expect(save.prologue?.social?.messages.filter(item => item.id.endsWith('-LEFT')).map(item => item.text)).toEqual(['Lucas left the group.','Sophie left the group.'])
    save = drain(save)
    expect(save.prologue?.messages.at(-1)?.text).toContain('photo')
    expect(save.notifications.some(item => item.id === 'OPEN-SECOND-SOPHIE-1' && !item.read)).toBe(true)
    save = markOpeningRead(save, 'sophie')
    expect(markOpeningRead(save, 'sophie')).toBe(save)
    expect(save.notifications.some(item => item.id === 'OPEN-SECOND-SOPHIE-1' && item.read)).toBe(true)
    expect(readDanielNote(save)).toBe(save)
    save = drain(replyToSophie(save, 'see', 500))
    expect(save.prologue?.social?.phase).toBe('done')
    expect(save.prologue?.messages.at(-1)?.id).toBe('OPEN-SOPHIE-NOTE')
    expect(readDanielNote(save).evidence['OPEN-NOTE'].verified).toBe(false)
    expect(save.knowledge.characters.maya).toEqual(['OPEN.NUMBER_CLAIM_FROM_SOPHIE'])
    expect(save.knowledge.characters.lucas).toEqual(['OPEN.NUMBER_CLAIM_FROM_SOPHIE'])
    expect(save.deliveredEvents).toContain('OPEN-GROUP-SOPHIE-1:maya')
    expect(save.deliveredEvents).toContain('OPEN-GROUP-SOPHIE-1:lucas')
    expect(normalizeSave(structuredClone(save)).prologue).toEqual(save.prologue)
  })

  it.each(['apologize','boundary','challenge'])('gives conflict reply %s a distinct reaction while preserving the same departures', choice => {
    let save = drain(registerPlayer(newGame(), 'Rae'))
    save = drain(replyToSophie(save, 'who', 100))
    save = drain(replyToSophie(save, 'join', 200))
    save = drain(sendGroupChoice(save, 'calm', 300))
    const sent = sendGroupChoice(save, choice, 400)
    save = drain(sent)
    expect(save.prologue?.social?.messages.some(item => item.id === `OPEN-GROUP-${choice.toUpperCase()}-REPLY`)).toBe(true)
    expect(save.prologue?.social?.members).toEqual(['maya','player'])
    expect(save.choices['OPEN-GROUP-CONFLICT']).toBe(choice)
    expect(sendGroupChoice(save, choice)).toBe(save)
  })

  it('lets the player delay the invitation without starting or fabricating group messages', () => {
    let save = drain(registerPlayer(newGame(), 'Rae'))
    save = drain(replyToSophie(save, 'who', 100))
    save = replyToSophie(save, 'wait', 200)
    expect(save.prologue?.social?.messages).toEqual([])
    expect(replyToSophie(save, 'wait')).toBe(save)
    save = replyToSophie(save, 'join', 300)
    expect(save.prologue?.social?.messages[0].text).toBe('Sophie added you to FIND DANIEL.')
  })

  it('does not retrofit a group into an existing version-two opening save', () => {
    let save = drain(registerPlayer(newGame(), 'Earlier Player'))
    save = { ...save, prologue: { ...save.prologue!, dialogueVersion: 2 } }
    save = drain(replyToSophie(save, 'who', 100))
    expect(save.prologue?.social).toBeUndefined()
    expect(save.prologue?.messages.some(item => item.id === 'OPEN-SOPHIE-NOTE')).toBe(true)
  })
})
