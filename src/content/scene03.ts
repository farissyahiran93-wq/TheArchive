import type { Scene01Node } from './scene01'
import { scene03Script } from './scene03Script'

export const scene03Id = 'ch01_sc03_just_between_us'
export const scene03Nodes: Record<string, Scene01Node> = {}
export const scene03Facts = {
  siblings: 'OPEN-S03-SOPHIE-DANIEL-SIBLINGS',
  olderBrother: 'OPEN-S03-DANIEL-OLDER-BROTHER',
  policeReported: 'OPEN-S03-POLICE-REPORT-CLAIM',
  unusualSilence: 'OPEN-S03-SILENCE-UNUSUAL',
  mayaFiancee: 'OPEN-S03-MAYA-DANIEL-ENGAGED',
  weddingPlanned: 'OPEN-S03-MAYA-WEDDING-PLANNED',
  lucasChildhoodFriend: 'OPEN-S03-LUCAS-CHILDHOOD-FRIEND',
  eliPronouns: 'OPEN-S03-ELI-SHE-HER',
  eliCoworker: 'OPEN-S03-ELI-DANIEL-COWORKERS',
  eliAxiom: 'OPEN-S03-ELI-AXIOM-RECOVERY',
  danielAxiom: 'OPEN-S03-DANIEL-AXIOM-RECOVERY',
} as const

/** Facts are attributed to the actual delivered line; neither options nor completion grants them. */
function facts(text: string, context: string): string[] {
  const found: string[] = []
  if (text === "He's my brother.") found.push(scene03Facts.siblings)
  if (text === 'My older brother, actually.') found.push(scene03Facts.siblings, scene03Facts.olderBrother)
  if (text === "We've reported it.") found.push(scene03Facts.policeReported)
  if (text === 'A few days without a proper answer.') found.push('OPEN-S01-DANIEL-UNREACHABLE')
  if (["He doesn't usually leave them like that.", "I just know this silence doesn't feel like him."].includes(text)) found.push(scene03Facts.unusualSilence)
  if (text === "We don't even agree on parts of the timeline.") found.push('OPEN-S02-DISPUTED-TIMELINE')
  if (["Because she's Daniel's fiancée.", "She's Daniel's fiancée.", "She's his fiancée.", "Maya's Daniel's fiancée."].includes(text)) found.push(scene03Facts.mayaFiancee)
  if (['They were planning a wedding.', 'They were planning their wedding.', 'They were supposed to get married.'].includes(text)) found.push(scene03Facts.weddingPlanned)
  if (["He's known Daniel since they were kids.", 'They practically grew up together.'].includes(text)) found.push(scene03Facts.lucasChildhoodFriend)
  if (text === "I almost forgot you haven't actually spoken to her.") found.push(scene03Facts.eliPronouns)
  if (context.startsWith('C13-') && ['She works with Daniel.', 'They work together.'].includes(text) || text === "But I don't want to assume she'll know just because she works with Daniel.") found.push(scene03Facts.eliCoworker)
  if (context.startsWith('C13-') && text === 'At Axiom Recovery.' || text === 'She works with Daniel at Axiom Recovery.') found.push(scene03Facts.eliCoworker, scene03Facts.eliAxiom, scene03Facts.danielAxiom)
  if (context.startsWith('C14-a') && text === "It's where Daniel works.") found.push(scene03Facts.danielAxiom)
  if (text === "It was in a saved copy labelled as Daniel's contacts." || text === 'A saved contact export.') found.push('OPEN-S01-SOPHIE-CONTACT-LIST-CLAIM')
  if (['Just your number, with the star still beside it.', 'The export marks it as starred.'].includes(text)) found.push('OPEN-CONTACT-STAR-REPORTED')
  if (text === "The copy doesn't tell me who saved or marked the number.") found.push('OPEN-CONTACT-AUTHOR-UNKNOWN')
  return [...new Set(found)]
}
type Turn = { speaker: 'sophie' | 'player'; text: string } | { speaker: 'wait'; duration: number; typing: boolean }
function add(node: Scene01Node) { scene03Nodes[node.id] = node; return node.id }
function chain(turns: readonly Turn[], prefix: string, target: string): string {
  for (let i = turns.length - 1; i >= 0; i--) {
    const turn = turns[i], id = `OPEN-S03-${prefix}-${i + 1}`
    if (turn.speaker === 'wait') target = add({ id, kind: 'wait', duration: turn.duration, typing: turn.typing, actor: 'sophie', next: target })
    else if (turn.speaker === 'player') target = add({ id, kind: 'choice', choices: [{ id: 'continue', text: turn.text, next: target }] })
    else target = add({ id, kind: 'npc', channel: 'sophie', sender: 'sophie', text: turn.text, heardFacts: facts(turn.text, prefix), next: target })
  }
  return target
}
const completed = add({ id: 'OPEN-S03-COMPLETE', kind: 'event', event: 'private-complete' })
for (const beat of scene03Script.choices) {
  const after = chain(beat.after, `AFTER-${beat.id}`, beat.id === '19' ? completed : `OPEN-S03-C${String(Number(beat.id) + 1).padStart(2, '0')}`)
  add({ id: `OPEN-S03-C${beat.id}`, kind: 'choice', number: `P${beat.id}`, choices: beat.choices.map(option => {
    let target = after
    if ('effects' in option) target = add({ id: `OPEN-S03-EFFECT-${beat.id}-${option.id}`, kind: 'event', event: 'private-effects', privateEffects: option.effects, next: target })
    return { id: option.id, text: option.text, premiumChoice: 'premiumChoice' in option ? option.premiumChoice : undefined, next: chain(option.turns, `C${beat.id}-${option.id}`, target) }
  }) })
}
export const scene03Opening = chain(scene03Script.opening, 'OPENING', 'OPEN-S03-C01')

/** Readable phone-message pacing; authored pauses and hesitations are additional explicit nodes. */
export function scene03DeliveryDelay(text: string): number {
  return Math.min(3000, Math.max(900, 700 + text.trim().split(/\s+/u).length * 100))
}
