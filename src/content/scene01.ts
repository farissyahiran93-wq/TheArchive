import { scene01Script } from './scene01Script'
import { scene02Nodes } from './scene02'
import { scene03Nodes } from './scene03'

export type Scene01Choice = { id: string; text: string; next: string; premiumChoice?: boolean; discloseName?: boolean; requires?: 'sender-replied' | 'sender-not-replied' }
export type Scene01Node =
  | { id: string; kind: 'gate'; action: 'sender-request' | 'disclosure' | 'deferred' | 's04-article' | 's04-group' | 's04-return-sophie' | 's04-archive' | 's04-index-ack' | 's04-device' | 's04-followup'; next: string; skip?: string }
  | { id: string; kind: 'condition'; test: 'name-disclosed' | 'sender-seen' | 's04-group-opened'; next: string; otherwise: string }
  | { id: string; kind: 'npc'; text: string; sender?: 'sophie' | 'maya' | 'lucas'; next: string; channel: 'sophie' | 'group'; introducesSophie?: boolean; heardFacts?: string[] }
  | { id: string; kind: 'wait'; duration: number; typing: boolean; actor?: 'sophie' | 'maya' | 'lucas'; next: string }
  | { id: string; kind: 'choice'; choices: Scene01Choice[]; number?: string; channel?: 'sophie' | 'group' | 'archive'; uiChoice?: boolean }
  | { id: string; kind: 'event'; event: 's04-complete' | 's04-feedback' | 's04-group-notice' | 's04-index-available' | 'route' | 'sender-arrival' | 'declined' | 'invitation' | 'complete' | 'reward' | 'effects' | 'presence' | 'source-boundary' | 'deleted' | 'leave' | 'group-complete' | 'private-ready' | 'private-effects' | 'private-complete'; next?: string; text?: string; trust?: number; affinity?: number; actor?: 'sophie' | 'maya' | 'lucas'; online?: boolean; effects?: Partial<Record<'sophie' | 'maya' | 'lucas', { trust?: number; affinity?: number; suspicion?: number }>>; privateEffects?: { trust?: number; affinity?: number; suspicion?: number } }
type Turn = { speaker: 'sophie' | 'player'; text: string } | { speaker: 'wait'; duration: number; typing: boolean }

export const scene01Nodes: Record<string, Scene01Node> = { ...scene02Nodes, ...scene03Nodes }
const add = (node: Scene01Node) => { scene01Nodes[node.id] = node; return node.id }
function chain(turns: readonly Turn[], prefix: string, next: string, channel: 'sophie' | 'group' = 'sophie'): string {
  for (let i = turns.length - 1; i >= 0; i--) {
    const turn = turns[i], id = `OPEN-S01-${prefix}-${i + 1}`
    if (turn.speaker === 'wait') next = add({ id, kind: 'wait', duration: turn.duration, typing: turn.typing, next })
    else if (turn.speaker === 'player') next = add({ id, kind: 'choice', choices: [{ id: 'continue', text: turn.text, next }] })
    else next = add({ id, kind: 'npc', text: turn.text, channel, next, introducesSophie: /I'm Sophie|Sophie\.|My name's Sophie/.test(turn.text), heardFacts: turn.text === 'Daniel Mercer.' ? ['OPEN-S01-DANIEL-NAME'] : turn.text === "Daniel hasn't been answering anyone." ? ['OPEN-S01-DANIEL-UNREACHABLE'] : turn.text === "The copy is labelled as Daniel's contact export." ? ['OPEN-S01-SOPHIE-CONTACT-LIST-CLAIM'] : turn.text === 'And a star next to it.' ? ['OPEN-CONTACT-STAR-REPORTED'] : turn.text === "I can't tell who marked it." ? ['OPEN-CONTACT-AUTHOR-UNKNOWN'] : [] })
  }
  return next
}
const finalInvite = add({ id: 'OPEN-S01-INVITATION', kind: 'event', event: 'invitation' })
const declined = add({ id: 'OPEN-S01-DECLINED', kind: 'event', event: 'declined' })
const complete = add({ id: 'OPEN-S01-COMPLETE', kind: 'event', event: 'complete' })
const bonuses: Record<string, { trust?: number; affinity?: number }> = {
  '02': { trust: 3, affinity: 2 }, '05': { trust: 2, affinity: 2 }, '08': { trust: 2, affinity: 4 }, '10': { trust: 4 }, '14': { affinity: 4 },
}
export const scene01StandardWarning = chain(scene01Script.standardWarning, 'WARNING', 'OPEN-S01-C14')
export const scene01DelayedWarning = chain(scene01Script.delayedWarning, 'DELAYED-WARNING', 'OPEN-S01-C14')
for (const beat of scene01Script.choices) {
  const nextChoice = `OPEN-S01-C${String(Number(beat.id) + 1).padStart(2, '0')}`
  const after = chain(beat.after, `AFTER-${beat.id}`, beat.id === '14' ? finalInvite : nextChoice)
  add({ id: `OPEN-S01-C${beat.id}`, kind: 'choice', number: beat.id, choices: beat.choices.map(option => {
    const premium = 'premiumChoice' in option && option.premiumChoice
    let target = beat.id === '13' ? option.id === 'd' ? declined : scene01StandardWarning : after
    if (premium) target = add({ id: `OPEN-S01-REWARD-${beat.id}`, kind: 'event', event: 'reward', ...bonuses[beat.id], next: target })
    return { id: option.id, text: option.text, next: chain(beat.responses[option.id], `C${beat.id}-${option.id}`, target), premiumChoice: premium || undefined, discloseName: beat.id === '08' && (option.id === 'a' || option.id === 'd') }
  }) })
}
export const scene01Opening = chain(scene01Script.opening, 'OPENING', 'OPEN-S01-C01')
export const scene01GroupOpening = chain([
  { speaker: 'wait', duration: 2000, typing: true },
  { speaker: 'sophie', text: 'Hey, everyone.' },
  { speaker: 'wait', duration: 2000, typing: false },
  { speaker: 'sophie', text: 'Before anyone says anything...' },
  { speaker: 'sophie', text: 'I added someone.' },
], 'GROUP', complete, 'group')
