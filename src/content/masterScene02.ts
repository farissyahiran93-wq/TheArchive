import type { Scene01Node } from './scene01'

type Actor = 'sophie' | 'maya' | 'lucas'
type Line = readonly [Actor, string]
type Beat = { choices: readonly [string, string, string]; replies: readonly [readonly Line[], readonly Line[], readonly Line[]]; after: readonly Line[] }
const beats: readonly Beat[] = [
  { choices: ["Hi. I'm here because Sophie asked me to join.", "I don't know Daniel. I'm trying to understand why my number was in his contacts.", "Before we start, I'd like to know who can see this chat."], replies: [[['maya', 'Okay. I appreciate you telling us.']], [['maya', "That's what Sophie said. I'm trying to understand it too."]], [['sophie', 'Only the four of us in this group.'], ['maya', 'And you can decide what you want to share.']]], after: [['maya', "I'm Maya. Daniel and I are engaged."], ['lucas', "Lucas. Daniel's my best friend."], ['lucas', 'Sophie, can we talk about why a stranger is here?']] },
  { choices: ["I understand why you'd ask. I'll answer what I can.", "I didn't ask Sophie to add me without talking to you.", "If you need to discuss this first, I can wait."], replies: [[['lucas', 'All right. I do want an answer.']], [['sophie', "That's true. Inviting you was my decision."]], [['maya', "Let's hear each other out while everyone's here."]]], after: [['sophie', 'I found their number in a contact export in the family folder Daniel shared with me.'], ['sophie', 'There was no name. I hoped they might know him.'], ['lucas', 'A number in a file is enough for an invitation now?']] },
  { choices: ["She asked if I knew him. I said I didn't.", "I'd like to know why my number was there too.", "I can't explain a file I haven't seen."], replies: [[['maya', 'Sophie told us you said that.']], [['lucas', 'Then we have the same question.']], [['lucas', "Fair. Neither can I, until I've seen it properly."]]], after: [['sophie', 'There was a star beside the number.'], ['lucas', 'A star? Did Daniel put it there?'], ['sophie', "I don't know. The copy doesn't say who marked it."]] },
  { choices: ['Could the star mean anything specific?', "We shouldn't assume Daniel marked it.", "A star doesn't tell us who added the number."], replies: [[['sophie', "I don't know. It could mean something, or nothing at all."]], [['maya', "Right. We don't know who marked it."]], [['lucas', "No. It doesn't."]]], after: [['maya', 'Can you show us the export later, Sophie? Not just the number.'], ['sophie', "Yes. I'll check what I actually have before I say any more."], ['lucas', 'And until then, what are we sharing in here?']] },
  { choices: ['Privacy matters. You should decide what stays private.', "I'm not asking anyone to share Daniel's private information.", "I can stay, but I need my own privacy respected too."], replies: [[['lucas', "Exactly. That's what I'm trying to say."]], [['lucas', "Maybe not. But someone has to ask before it happens."]], [['maya', 'That applies to everyone here.']]], after: [['maya', "Lucas, I don't want his private life passed around either."], ['maya', "But I also don't want to dismiss someone who might help us understand the number."], ['lucas', 'We already told them more than we agreed to.']] },
  { choices: ["You can leave me out of anything private.", "I didn't come here to take information from anyone.", "What would make this conversation feel safer?"], replies: [[['lucas', 'That helps. It still means deciding what counts as private.']], [['lucas', "I'm not saying you did. I'm saying we need limits."]], [['lucas', 'Ask before sharing. And let people say no.']]], after: [['sophie', "I should have asked both of you before inviting anyone. I'm sorry."], ['maya', "You were trying to find Daniel. I understand that."], ['maya', 'But Lucas has a point about asking first.']] },
  { choices: ["Sophie was worried. We can set boundaries now.", "Lucas is right to want consent before anything is shared.", "I don't want my presence to make this harder for any of you."], replies: [[['maya', 'We can try.']], [['lucas', 'Thank you.']], [['sophie', "You haven't done anything wrong by answering me."]]], after: [['lucas', "I can't keep watching us make decisions about Daniel for him."], ['lucas', 'He trusted us with things that were never ours to give away.'], ['maya', 'No one has to give anything away.']] },
  { choices: ["I'll respect that. I won't ask for those things.", "I understand if you need some space.", "You're allowed to set that boundary, Lucas."], replies: [[['lucas', 'I hear you. This is about more than one person.']], [['lucas', 'I do.']], [['lucas', 'I wish we had set it before this.']]], after: [['lucas', "Maya, I'm still going to look for him. You can call me."], ['lucas', "But I can't stay in this group right now."], ['sophie', 'Lucas, please—'], ['lucas', "I'm sorry, Soph. I need to step away."]] },
  { choices: ["I'm sorry that became so difficult.", "He made his boundary clear. We should respect it.", "Is there anything you need from me right now?"], replies: [[['sophie', "I'm sorry too. I didn't want to put you in the middle."]], [['maya', 'We will. Leaving the chat doesn\'t mean he has stopped caring.']], [['sophie', "No. You don't need to fix this for us."]]], after: [['maya', "I'm going to give him some time."], ['maya', "Sophie, we'll talk later. And you—thank you for being honest with us."], ['sophie', "Thank you for staying through that."], ['sophie', "I'll message you separately in a little while, if that's okay."]] },
]

export const masterScene02Nodes: Record<string, Scene01Node> = {}
export const masterScene02Start = 'TA-S02-OPEN-1'
const end = 'TA-S02-COMPLETE'
masterScene02Nodes[end] = { id: end, kind: 'event', event: 'group-complete' }
masterScene02Nodes['TA-S03-FIRST-MESSAGE'] = { id: 'TA-S03-FIRST-MESSAGE', kind: 'npc', channel: 'sophie', sender: 'sophie', text: 'Hey. Are you okay after all of that?', next: 'TA-S03-AWAIT-OPEN' }
masterScene02Nodes['TA-S03-AWAIT-OPEN'] = { id: 'TA-S03-AWAIT-OPEN', kind: 'event', event: 'private-ready' }
function chain(prefix: string, lines: readonly Line[], next: string): string {
  for (let i = lines.length - 1; i >= 0; i--) {
    const id = `${prefix}-${i + 1}`, [sender, text] = lines[i]
    masterScene02Nodes[id] = { id, kind: 'npc', channel: 'group', sender, text, next }
    next = id
  }
  return next
}
for (let index = beats.length - 1; index >= 0; index--) {
  const beat = beats[index], number = String(index + 1).padStart(2, '0'), id = `TA-S02-C${number}`
  let target = index === 8 ? end : `TA-S02-C${String(index + 2).padStart(2, '0')}`
  if (index === 7) { const leave = 'TA-S02-LUCAS-LEAVES'; masterScene02Nodes[leave] = { id: leave, kind: 'event', event: 'leave', actor: 'lucas', next: target }; target = leave }
  const after = chain(`TA-S02-AFTER-${number}`, beat.after, target)
  masterScene02Nodes[id] = { id, kind: 'choice', number, channel: 'group', choices: beat.choices.map((text, option) => ({ id: String.fromCharCode(97 + option), text, next: chain(`TA-S02-C${number}-${option}`, beat.replies[option], after) })) }
}
chain('TA-S02-OPEN', [['sophie', 'Hi. I invited someone to join us.'], ['sophie', "I found their number in Daniel's shared folder, and I asked if they could help."], ['maya', 'Hi. Who are you?']], 'TA-S02-C01')
