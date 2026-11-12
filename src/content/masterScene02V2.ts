import type { Scene01Node } from './scene01'
import { masterScene02Nodes } from './masterScene02'

export const masterScene02V2Start = 'TA-S02-NAME-OPEN-1'
export const masterScene02V2Nodes: Record<string, Scene01Node> = { ...masterScene02Nodes }
const opening = [
  ['sophie', 'Hi. I invited someone to join us.'],
  ['maya', 'Hi. Is this the person from the contact export?'],
  ['lucas', 'Hold on. We have a stranger in here and I don’t even know their name.'],
  ['lucas', 'Who are you?'],
  ['sophie', 'Oh. I’m sorry. I never asked your name when I messaged you.'],
  ['sophie', 'What would you like us to call you? Mr., Ms., or just your name?'],
] as const
for (let i = 0; i < opening.length; i++) {
  const id = `TA-S02-NAME-OPEN-${i + 1}`, [sender, text] = opening[i]
  masterScene02V2Nodes[id] = { id, kind: 'npc', channel: 'group', sender, text, next: i + 1 < opening.length ? `TA-S02-NAME-OPEN-${i + 2}` : 'TA-S02-NAME-CHOICE' }
}
masterScene02V2Nodes['TA-S02-NAME-CHOICE'] = {
  id: 'TA-S02-NAME-CHOICE', kind: 'choice', channel: 'group', choices: [
    { id: 'a', text: "I'm Mr. [PLAYER_NAME].", discloseName: true, next: 'TA-S02-NAME-REPLY-1' },
    { id: 'b', text: "I'm Ms. [PLAYER_NAME].", discloseName: true, next: 'TA-S02-NAME-REPLY-1' },
    { id: 'c', text: 'Just [PLAYER_NAME] is fine.', discloseName: true, next: 'TA-S02-NAME-REPLY-1' },
  ],
}
masterScene02V2Nodes['TA-S02-NAME-REPLY-1'] = { id: 'TA-S02-NAME-REPLY-1', kind: 'npc', channel: 'group', sender: 'sophie', text: 'Thank you, [PLAYER_NAME]. I should have asked before.', next: 'TA-S02-NAME-REPLY-2' }
masterScene02V2Nodes['TA-S02-NAME-REPLY-2'] = { id: 'TA-S02-NAME-REPLY-2', kind: 'npc', channel: 'group', sender: 'lucas', text: 'All right. I still need to know why you’re here.', next: 'TA-S02-C01' }
