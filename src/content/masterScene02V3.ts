import type { Scene01Node } from './scene01'
import { masterScene02Nodes } from './masterScene02'

export const masterScene02V3Start = 'TA-S02-V3-NAME-OPEN-1'
export const masterScene02V3Nodes: Record<string, Scene01Node> = { ...Object.fromEntries(Object.entries(masterScene02Nodes).map(([id, node]) => [id, structuredClone(node)])) }
const opening = [
  ['sophie', 'I invited the person I told you about.'],
  ['maya', 'Hi. Is this the person from the contact export?'],
  ['lucas', 'Sophie, why did you bring a stranger into this chat? Daniel is still in here.'],
  ['lucas', 'This was our private group. Who are you?'],
  ['sophie', 'Oh. I’m sorry. I never asked your name when I messaged you.'],
  ['sophie', 'What would you like us to call you? Mr., Ms., or just your name?'],
] as const
for (let i = 0; i < opening.length; i++) {
  const id = `TA-S02-V3-NAME-OPEN-${i + 1}`, [sender, text] = opening[i]
  masterScene02V3Nodes[id] = { id, kind: 'npc', channel: 'group', sender, text, next: i + 1 < opening.length ? `TA-S02-V3-NAME-OPEN-${i + 2}` : 'TA-S02-V3-NAME-CHOICE' }
}
masterScene02V3Nodes['TA-S02-V3-NAME-CHOICE'] = {
  id: 'TA-S02-V3-NAME-CHOICE', kind: 'choice', channel: 'group', choices: [
    { id: 'a', text: "I'm Mr. [PLAYER_NAME].", discloseName: true, next: 'TA-S02-V3-NAME-REPLY-1' },
    { id: 'b', text: "I'm Ms. [PLAYER_NAME].", discloseName: true, next: 'TA-S02-V3-NAME-REPLY-1' },
    { id: 'c', text: 'Just [PLAYER_NAME] is fine.', discloseName: true, next: 'TA-S02-V3-NAME-REPLY-1' },
  ],
}
masterScene02V3Nodes['TA-S02-V3-NAME-REPLY-1'] = { id: 'TA-S02-V3-NAME-REPLY-1', kind: 'npc', channel: 'group', sender: 'sophie', text: 'Thank you, [PLAYER_NAME]. I should have asked before.', next: 'TA-S02-V3-NAME-REPLY-2' }
masterScene02V3Nodes['TA-S02-V3-NAME-REPLY-2'] = { id: 'TA-S02-V3-NAME-REPLY-2', kind: 'npc', channel: 'group', sender: 'lucas', text: 'All right. I still need to know why you’re here.', next: 'TA-S02-C01' }

// The discussion remains on the same choice IDs, but is authored for the
// private group rather than a newly created search group.
const revisions: Record<string, string> = {
  'TA-S02-AFTER-01-3': 'Sophie, this was our space. Why invite someone Daniel may not even know?',
  'TA-S02-AFTER-02-1': 'I found their number in a saved contact export among the family files.',
  'TA-S02-AFTER-02-2': 'There was no name. I asked if they recognized Daniel, and they said they didn’t.',
  'TA-S02-AFTER-02-3': 'And that was enough to bring them into a chat Daniel is still part of?',
  'TA-S02-AFTER-04-1': 'Can you show us the export later, Sophie? Not just the number.',
  'TA-S02-AFTER-04-3': 'What about everything already in this chat? Daniel never agreed to a stranger seeing it.',
  'TA-S02-AFTER-05-1': 'Lucas, I don’t want his private life passed around either.',
  'TA-S02-AFTER-05-2': 'But we can set limits without blaming someone for accepting an invitation.',
  'TA-S02-AFTER-05-3': 'It isn’t their fault. We still should have been asked.',
  'TA-S02-AFTER-06-1': 'You’re right. I should have asked you both first. I’m sorry.',
  'TA-S02-AFTER-06-2': 'You were worried about Daniel. I understand why you reached out.',
  'TA-S02-AFTER-06-3': 'But this was his space too. Lucas is right to ask.',
  'TA-S02-AFTER-07-1': 'I keep looking at his name in here, waiting for him to say something.',
  'TA-S02-AFTER-07-2': 'He trusted us with things that were never ours to give away.',
  'TA-S02-AFTER-07-3': 'No one has to give anything away.',
}
for (const [id, text] of Object.entries(revisions)) {
  const node = masterScene02V3Nodes[id]
  if (node?.kind === 'npc') masterScene02V3Nodes[id] = { ...node, text }
}
