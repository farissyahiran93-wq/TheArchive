import type { Scene01Node } from './scene01'
import scene1 from './scene01V7Data'
import scene2 from './scene02V7Data'
import { eliGroupNodes } from './masterScene02Eli'
import type { GroupSpeaker } from '../game/types'

export const v7Nodes: Record<string, Scene01Node> = { ...eliGroupNodes }
const revisedReferences: Record<string, string> = {
  'I invited them because I was trying to find out whether they knew something.': 'I invited [object] because I was trying to find out whether [subject] knew something.',
  "But I don't know them.": "But I don't know [object].",
  "That doesn't automatically make them a threat.": "That doesn't automatically make [object] a threat.",
  "I didn't say they were a threat.": "I didn't say [subject] was a threat.",
  'You could at least give them a chance.': 'You could at least give [object] a chance.',
  "Don't turn the player into the reason for it.": "Don't take it out on [PlayerName].",
  'Was there anything else beside the number?': 'What did the entry say?',
  'A star.': 'There was no name.',
  'The number was marked with a star.': 'The entry was marked with a star.',
}
for (const [id, node] of Object.entries(v7Nodes)) {
  if (node.kind === 'npc' && revisedReferences[node.text]) v7Nodes[id] = { ...node, text: revisedReferences[node.text] }
}
function chain(prefix: string, lines: readonly string[], next: string): string {
  for (let i = lines.length - 1; i >= 0; i--) {
    const id = `${prefix}-${i + 1}`
    v7Nodes[id] = { id, kind: 'npc', channel: 'sophie', sender: 'sophie', text: lines[i], next, introducesSophie: lines[i] === "I'm Sophie." }
    next = id
    if (["Daniel's missing.", 'Daniel Mercer.', 'The entry was marked with a star.'].includes(lines[i])) {
      const pause = `${id}-PAUSE`
      v7Nodes[pause] = { id: pause, kind: 'wait', duration: 1400, typing: true, actor: 'sophie', next }
      next = pause
    }
  }
  return next
}
v7Nodes['TA-S01-V7-JOIN'] = { id: 'TA-S01-V7-JOIN', kind: 'event', event: 'invitation' }
v7Nodes['TA-S01-FAMILY-PHOTO'] = { id: 'TA-S01-FAMILY-PHOTO', kind: 'npc', channel: 'sophie', sender: 'sophie', text: '', photo: '/media/chat/sophie-birthday-owner.png', next: 'TA-S01-V7-PHOTO-AFTER-1' }
chain('TA-S01-V7-PHOTO-AFTER', scene1[1].after.slice(4), 'TA-S01-V7-C03')
for (let i = 8; i >= 0; i--) {
  const beat = scene1[i], number = String(i + 1).padStart(2, '0'), id = `TA-S01-V7-C${number}`
  const next = i === 8 ? 'TA-S01-V7-JOIN' : `TA-S01-V7-C${String(i + 2).padStart(2, '0')}`
  const tail = i === 1 ? chain(`TA-S01-V7-AFTER-${number}`, beat.after.slice(0, 4), 'TA-S01-FAMILY-PHOTO') : chain(`TA-S01-V7-AFTER-${number}`, beat.after, i === 7 ? chain('TA-S01-V7-WARNING', scene1[8].before, next) : next)
  const options = i === 8 ? [beat.choices[0], 'I understand. Please add me to the group.', beat.choices[2]] : beat.choices
  v7Nodes[id] = { id, kind: 'choice', channel: 'sophie', number, choices: options.map((text, j) => ({ id: 'abc'[j], text, next: chain(`${id}-${j}`, beat.replies[j], tail) })) }
}
v7Nodes['TA-S01-V7-TITLE'] = { id: 'TA-S01-V7-TITLE', kind: 'choice', channel: 'sophie', choices: ['Mr.', 'Ms.'].map((text, i) => ({ id: 'ab'[i], text, next: 'TA-S01-V7-TITLE-AFTER-1' })) }
chain('TA-S01-V7-TITLE-AFTER', ['Okay, thanks.', "I wasn't even sure anyone would answer this number.", 'I need to ask you something.', "It's a little difficult to explain."], 'TA-S01-V7-C01')
chain('TA-S01-V7-NAME-AFTER', ['Hi, [PlayerName].', 'And sorry, one more thing.', "Mr. or Ms.? I don't want to get it wrong."], 'TA-S01-V7-TITLE')
v7Nodes['TA-S01-V7-NAME'] = { id: 'TA-S01-V7-NAME', kind: 'choice', channel: 'sophie', choices: [{ id: 'name', text: '[PlayerName]', discloseName: true, next: 'TA-S01-V7-NAME-AFTER-1' }] }
export const v7Start = chain('TA-S01-V7-OPEN', ['Hi.', 'Sorry, I know this is a bit random.', "I'm Sophie.", 'Can I ask your name?'], 'TA-S01-V7-NAME')

function groupChain(prefix: string, lines: string[][], next: string): string {
  for (let i = lines.length - 1; i >= 0; i--) {
    const id = `${prefix}-${i + 1}`, [sender, raw] = lines[i]
    const text = raw.replace("[Subject]'s", '[SubjectIs]').replace("[subject]'s", '[subjectIs]').replace("[subject]'d", '[subject] would')
    v7Nodes[id] = { id, kind: 'npc', channel: 'group', sender: sender as GroupSpeaker, text, next, ...(id === 'TA-S02-V7-OPEN-2' ? { heardFacts: ['OPEN-S01-PLAYER-CODENAME'] } : {}) }
    next = id
  }
  return next
}
const groupAfter = groupChain('TA-S02-V7-AFTER', scene2.after, 'TA-S02-ELI-C02')
v7Nodes['TA-S02-V7-C01'] = { id: 'TA-S02-V7-C01', kind: 'choice', channel: 'group', number: '01', choices: scene2.choices.map((text, i) => ({ id: 'abc'[i], text, next: groupChain(`TA-S02-V7-C01-${i}`, scene2.replies[i], groupAfter) })) }
export const v7GroupStart = groupChain('TA-S02-V7-OPEN', scene2.opening, 'TA-S02-V7-C01')
