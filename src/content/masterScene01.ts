import type { Scene01Node } from './scene01'

/** The new opening has its own namespace; historical transcript IDs remain unchanged. */
export const masterScene01Start = 'TA-S01-OPEN-1'
export const masterScene01Nodes: Record<string, Scene01Node> = {}

type Beat = { choices: readonly [string, string, string]; replies: readonly [readonly string[], readonly string[], readonly string[]]; after: readonly string[] }

const beats: readonly Beat[] = [
  { choices: ["I don't think so. Is everything okay?", "No. I don't know anyone by that name.", 'Who is Daniel, and why are you asking me?'], replies: [["Honestly, I'm not sure. But thank you for answering."], ["Okay. I didn't want to assume you did."], ["That's fair. I should explain before asking anything else."]], after: ["He's my brother. My older brother.", "I'm trying to reach people who might know where he is."] },
  { choices: ['Has something happened to him?', 'What do you mean, where he is?', "I'm sorry, but I really don't know him."], replies: [["I don't know. That's the part I can't stop thinking about."], ["He's gone quiet, and no one close to him has been able to reach him."], ["I understand. I'm not asking you to pretend otherwise."]], after: ["He hasn't answered my messages or picked up when I've called.", "That's not enough to tell me what's happened. I know that.", 'But the people who know him are worried too.'] },
  { choices: ['How did you get my number?', 'Why is a stranger asking me about her brother?', 'I want to understand. Where did you find my number?'], replies: [['From a contact export in a family folder Daniel shared with me.'], ["Because I found your number in a contact export in Daniel's shared family folder."], ['In a contact export inside a family folder Daniel shared with me.']], after: ["It didn't have a name beside it. Just the number and a little star.", 'I thought it might belong to someone he knew.', "I can't tell you who put it there. I shouldn't have made it sound like I could."] },
  { choices: ["I've never met Daniel.", "I don't recognise his name or have any connection to him.", "A number in a file doesn't mean I know him."], replies: [["All right. I'll take your word for it."], ["Then the number being there doesn't make much sense. But I believe you."], ["You're right. It doesn't. I'm sorry I put that on you."]], after: ["I've been looking at that folder for so long that every little thing starts to feel important.", "That doesn't make it your responsibility."] },
  { choices: ["I can listen, but I can't promise I'll be able to help.", "Please don't share my number or anything I say without asking.", 'I need you to respect that I might not want to be involved.'], replies: [["That's more than fair. I won't ask you for promises."], ["I won't share either without asking you first."], ["I will. You can tell me to stop, and I'll listen."]], after: ["I know you're a stranger, too. You have every reason to be careful."] },
  { choices: ['How are you holding up?', 'What do you actually know so far?', 'Are you sure you want to tell me more?'], replies: [["Not very well, if I'm honest. I keep checking my phone even when I know it hasn't made a sound."], ["That I can't reach him, and the people close to him can't either. Beyond that, I don't want to guess."], ["Only what I can say without putting words in anyone else's mouth."]], after: ["Daniel usually tells me when he's going to be unavailable.", "He doesn't always remember to call when he says he will. But he comes back with an apology and some terrible excuse.", 'I would give anything for one of those excuses right now.'] },
  { choices: ['He sounds like someone you care about a lot.', 'I can see why the silence worries you.', "Silence doesn't tell us where he is."], replies: [['I do. Even when he\'s being impossible.'], ["Thank you. I'm trying to keep worry from turning into assumptions."], ["No. It doesn't. That's why we're trying to put together what we actually know."]], after: ['A few of us have a group chat called FIND DANIEL.', "It's for sharing what we've heard and keeping track of questions. Nothing more official than that."] },
  { choices: ["Who's in the group?", 'Would everyone there see what I write?', 'What would you need from me?'], replies: [["Me, Maya and Lucas. Maya is Daniel's fiancée. Lucas is his best friend."], ["Yes. It's a group chat with me, Maya and Lucas. Please don't post anything you wouldn't want all of us to read."], ["Mostly, an honest answer if anything looks familiar. And it's okay if nothing does.", "The others are Maya and Lucas. Maya is Daniel's fiancée; Lucas is his best friend."]], after: ['I can invite you, if you want.', "You don't have to join just because I asked."] },
  { choices: ["All right. I'd like to see the invitation.", 'I need a little time before I decide.', "I'd rather not join right now."], replies: [["Okay. I'll send it. You'll still get to decide whether to join."], ["Of course. I'll leave the invitation here so you can look at it whenever you're ready."], ["I understand. I won't add you. If you change your mind, the invitation will still be here."]], after: ["And thank you for replying, even if this is where we leave it."] },
]

function messages(prefix: string, lines: readonly string[], next: string): string {
  for (let i = lines.length - 1; i >= 0; i--) {
    const id = `${prefix}-${i + 1}`
    masterScene01Nodes[id] = { id, kind: 'npc', channel: 'sophie', sender: 'sophie', text: lines[i], next, introducesSophie: lines[i] === 'My name is Sophie Mercer.' }
    next = id
  }
  return next
}

const invitation = 'TA-S01-INVITATION'
masterScene01Nodes[invitation] = { id: invitation, kind: 'event', event: 'invitation' }
for (let index = beats.length - 1; index >= 0; index--) {
  const beat = beats[index], number = String(index + 1).padStart(2, '0'), id = `TA-S01-C${number}`
  const after = messages(`TA-S01-AFTER-${number}`, beat.after, index === beats.length - 1 ? invitation : `TA-S01-C${String(index + 2).padStart(2, '0')}`)
  masterScene01Nodes[id] = { id, kind: 'choice', number, channel: 'sophie', choices: beat.choices.map((text, option) => ({ id: String.fromCharCode(97 + option), text, next: messages(`TA-S01-C${number}-${option}`, beat.replies[option], after) })) }
}
messages('TA-S01-OPEN', ['Hi. Sorry to message you out of nowhere.', 'My name is Sophie Mercer.', 'Can I ask if you know someone called Daniel Mercer?'], 'TA-S01-C01')
