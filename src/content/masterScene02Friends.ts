import type { Scene01Node } from './scene01'
import { masterScene02Nodes } from './masterScene02'
import type { GroupSpeaker } from '../game/types'

type Line = readonly [GroupSpeaker | 'pause' | 'system', string]
type Beat = { choices: readonly [string, string, string]; replies: readonly [readonly Line[], readonly Line[], readonly Line[]]; after: readonly Line[] }

const opening: readonly Line[] = [
  ["sophie", "Okay. They're here."],
  ["noah", "Who's here?"],
  ["ana", "The person Sophie was talking about?"],
  ["sophie", "Yes."],
  ["noah", "Oh."],
  ["noah", "Hi, stranger."],
  ["ana", "Noah. Don't make it weird."],
  ["noah", "I said hi 😭"],
  ["maya", "Hello."],
  ["maya", "I'm Maya."],
  ["lucas", "Sophie."],
  ["sophie", "What?"],
  ["lucas", "You said you were going to message someone."],
  ["lucas", "You didn't say you were adding them to the group."],
  ["sophie", "Can we please not do this immediately?"],
]
const beats: readonly Beat[] = [
  {
    choices: [
      "Hi, everyone. Sophie invited me. I didn't realise this would cause a problem.",
      "I don't know any of you. I'm just trying to understand why Sophie contacted me.",
      "If having me here makes people uncomfortable, I can leave.",
    ],
    replies: [
      [["noah", "I'm glad you said hi."], ["lucas", "I'd still like to know why you're here."]],
      [["ana", "Thanks for saying that straight out."], ["maya", "Can we let them finish?"]],
      [["sophie", "Please stay. I invited you. Nobody gets to make you feel unwelcome for saying yes."]],
    ],
    after: [
      ["ana", "Maybe we should hear them out before deciding anything."],
      ["noah", "That would be a refreshing change for this group."],
      ["lucas", "This isn't funny, Noah."],
      ["noah", "I know."],
      ["noah", "I'm trying to stop everyone from fighting in the first thirty seconds."],
      ["maya", "Sophie told us she found a number in one of Daniel's files."],
      ["maya", "Yours, apparently."],
      ["lucas", "Without a name."],
      ["sophie", "Lucas."],
      ["lucas", "I'm stating what we know."],
      ["ana", "Do you have any reason to think Daniel knew this person?"],
      ["sophie", "No."],
      ["sophie", "That's why I contacted them."],
    ],
  },
  {
    choices: [
      "Daniel and I never met.",
      "I don't remember having any contact with him.",
      "I wish I had an explanation, but I don't.",
    ],
    replies: [
      [["maya", "Okay. Thanks for telling us."]],
      [["ana", "A number in a file isn't the same as a conversation."]],
      [["sophie", "I know. I wish I could explain it to you, too."]],
    ],
    after: [
      ["noah", "Okay."],
      ["noah", "That's one thing we can stop assuming, then."],
      ["lucas", "Assuming they're telling the truth."],
      ["maya", "Lucas, please."],
      ["ana", "Sophie, where did you find the number?"],
      ["sophie", "In a contact export."],
      ["sophie", "Daniel had a digital folder he shared with me."],
      ["sophie", "I found the file there."],
      ["noah", "So it came from Daniel's folder?"],
      ["sophie", "The copy did."],
      ["sophie", "I don't know who originally made it."],
      ["lucas", "And somebody starred the number."],
      ["sophie", "Yes."],
    ],
  },
  {
    choices: [
      "Do you know who starred it?",
      "Could somebody else have changed the file?",
      "Is there anything else written beside the number?",
    ],
    replies: [
      [["sophie", "I looked. There wasn't a name next to the star."]],
      [["ana", "A copy only tells us what was in it when Sophie opened it."]],
      [["sophie", "There's a little space for a remark. Parts of it are hard to read."]],
    ],
    after: [
      ["sophie", "I don't know who put the star there."],
      ["sophie", "I haven't been able to make sense of the rest of the entry."],
      ["ana", "Then let's not treat it like an answer."],
      ["lucas", "Exactly."],
      ["noah", "Can I ask something?"],
      ["noah", "Has anyone actually heard from Daniel?"],
      ["maya", "No."],
      ["sophie", "I've called him more times than I can count."],
      ["ana", "I checked with a few people who know him."],
      ["ana", "Nothing definite."],
      ["lucas", "And that is what we should be focusing on."],
    ],
  },
  {
    choices: [
      "When was his last confirmed contact?",
      "Did anything seem different before he disappeared?",
      "Has Detective Hayes been told about the contact export?",
    ],
    replies: [
      [["maya", "I can tell you about my own messages. I don't know who heard from him last."]],
      [["sophie", "I keep going over our last conversations. It all feels different when I do that."]],
      [["sophie", "I couldn't tell you what's made it into Detective Hayes's file."]],
    ],
    after: [
      ["maya", "The police are looking into what we can give them."],
      ["maya", "But right now, we have more questions than answers."],
      ["noah", "It doesn't feel real."],
      ["noah", "Last time I saw him, he was arguing with me over a stupid takeaway order."],
      ["ana", "You ordered pineapple on his pizza."],
      ["noah", "It was my pizza."],
      ["ana", "You made him pay for half."],
      ["sophie", "He complained about that for days 😂"],
      ["maya", "He really did."],
      ["maya", "He brought it up again when we were having dinner."],
      ["pause", ""],
      ["maya", "I miss that."],
    ],
  },
  {
    choices: [
      "He sounds like someone who made ordinary moments memorable.",
      "You all clearly knew him very well.",
      "I'm sorry. I didn't mean to bring up something painful.",
    ],
    replies: [
      [["maya", "He did. Even dinner could turn into a whole story."]],
      [["noah", "Long enough to know he was never letting that pizza go."]],
      [["maya", "You didn't. I like hearing people remember him."]],
    ],
    after: [
      ["ana", "Sophie, have you shown everyone the export?"],
      ["sophie", "No."],
      ["lucas", "Good."],
      ["sophie", "I don't think posting the whole thing here would help."],
      ["noah", "There are probably other people's numbers in it."],
      ["maya", "Then we shouldn't pass it around."],
      ["sophie", "That's what I was thinking."],
    ],
  },
  {
    choices: [
      "We can discuss what you found without posting everyone's details.",
      "The starred entry might be important, but the rest of the file is private.",
      "Maybe we should understand the document before drawing conclusions.",
    ],
    replies: [
      [["ana", "That's fair. People in that file didn't ask to be brought into this."]],
      [["noah", "I'd want someone to do the same for my number."]],
      [["maya", "I'd rather wait than guess wrong about him."]],
    ],
    after: [
      ["sophie", "Exactly."],
      ["sophie", "I'll deal with the copy I have."],
      ["lucas", "I still think we should have talked about all of this before inviting someone."],
      ["sophie", "You keep saying that."],
      ["lucas", "Because you keep acting like it doesn't matter."],
      ["noah", "Both of you."],
      ["lucas", "Daniel trusted us."],
      ["lucas", "He didn't give us permission to share every part of his life with a stranger."],
      ["maya", "Nobody's asking for every part of his life."],
      ["lucas", "Not yet."],
    ],
  },
  {
    choices: [
      "I understand why you'd want to protect Daniel's privacy.",
      "You don't have to trust me, Lucas.",
      "I came because Sophie asked for help. Nothing more.",
    ],
    replies: [
      [["lucas", "Would you feel that way if it meant we kept things from you?"]],
      [["lucas", "Good. Because trust takes a bit longer than a group invite."]],
      [["lucas", "I heard you. She wasn't the only one in this chat, though."]],
    ],
    after: [
      ["lucas", "I don't know you."],
      ["lucas", "And right now, I don't know what to make of any of this."],
      ["ana", "Then say that."],
      ["ana", "You don't have to turn it into an accusation."],
      ["maya", "We're all scared."],
      ["maya", "Can we stop taking that out on each other?"],
      ["sophie", "I'm trying to do something!"],
      ["lucas", "And I'm asking you to be careful."],
      ["sophie", "You think I don't care about being careful?"],
      ["lucas", "That's not what I said."],
      ["sophie", "It's what it sounds like."],
      ["noah", "Sophie."],
      ["noah", "Nobody here thinks you don't care about Daniel."],
    ],
  },
  {
    choices: [
      "Both of you want the same thing, even if you disagree about how.",
      "Lucas has a point about boundaries.",
      "Sophie was trying to find a lead, not hurt anyone.",
    ],
    replies: [
      [["maya", "They're both scared he'll never come back. So am I."]],
      [["sophie", "I heard him. It still hurts, coming from him."]],
      [["lucas", "I get why she did it. I wish she'd called me first."]],
    ],
    after: [
      ["ana", "We can disagree without making somebody the enemy."],
      ["lucas", "Maybe."],
      ["lucas", "But I need some space from this."],
      ["maya", "Lucas, don't."],
      ["lucas", "I'm not leaving Daniel."],
      ["lucas", "I'm leaving this conversation."],
      ["sophie", "Lucas..."],
      ["lucas", "I can't keep arguing about this."],
      ["lucas", "Not today."],
      ["system", "Lucas left the group."],
    ],
  },
  {
    choices: [
      "I didn't want him to leave.",
      "Maybe he just needs some time.",
      "Do you think he'll come back?",
    ],
    replies: [
      [["sophie", "He didn't leave because of one thing you said."]],
      [["maya", "I think that's what he's asking us for."]],
      [["ana", "That's up to him. I wouldn't chase him right now."]],
    ],
    after: [
      ["noah", "He will when he's ready."],
      ["ana", "Give him space."],
      ["maya", "He's angry."],
      ["maya", "But he loves Daniel."],
      ["sophie", "I really didn't think this would happen."],
      ["ana", "You didn't cause all of this."],
      ["noah", "None of us is handling it particularly well."],
      ["maya", "Can we just agree on something?"],
      ["maya", "We need to stop guessing about what happened to Daniel."],
      ["ana", "Agreed."],
    ],
  },
  {
    choices: [
      "Let's focus on what we can actually establish.",
      "I want to help, but I won't pressure anyone to share something private.",
      "If there's anything you want me to know, you can tell me directly.",
    ],
    replies: [
      [["ana", "We can start by saying when we don't know something."]],
      [["maya", "I appreciate that. Some of this still feels like it's just his."]],
      [["sophie", "I'd like that. It's hard to say everything in here."]],
    ],
    after: [
      ["maya", "Thank you."],
      ["noah", "That's probably a good place to start."],
      ["ana", "I'll let you know if I hear anything useful."],
      ["sophie", "I'm going to message you separately."],
      ["sophie", "There's something I want to explain without everyone watching."],
    ],
  },
]

export const friendsGroupNodes: Record<string, Scene01Node> = {
  'TA-S02-COMPLETE': masterScene02Nodes['TA-S02-COMPLETE'],
  'TA-S03-FIRST-MESSAGE': masterScene02Nodes['TA-S03-FIRST-MESSAGE'],
  'TA-S03-AWAIT-OPEN': masterScene02Nodes['TA-S03-AWAIT-OPEN'],
}

function chain(prefix: string, lines: readonly Line[], next: string): string {
  for (let i = lines.length - 1; i >= 0; i--) {
    const [sender, text] = lines[i]
    const id = `${prefix}-${i + 1}`
    if (sender === 'system') friendsGroupNodes[id] = { id, kind: 'event', event: 'leave', actor: 'lucas', text, next }
    else if (sender === 'pause') friendsGroupNodes[id] = { id, kind: 'wait', duration: 1100, typing: false, next }
    else {
      friendsGroupNodes[id] = { id, kind: 'npc', channel: 'group', sender, text, next }
      const gap = `${id}-GAP`
      friendsGroupNodes[gap] = { id: gap, kind: 'wait', duration: 220, typing: false, next: id }
      next = gap
      continue
    }
    next = id
  }
  return next
}
const decisionId = (index: number) => `TA-S02-FRIENDS-C${String(index + 1).padStart(2, '0')}`
const reactions: Record<string, Partial<Record<GroupSpeaker, { trust?: number; affinity?: number }>>> = {
  '1-a': { noah: { affinity: 1 } },
  '1-b': { ana: { trust: 1 } },
  '5-a': { maya: { affinity: 1 } },
  '6-b': { noah: { trust: 1 } },
  '7-a': { lucas: { trust: 1 } },
  '8-c': { sophie: { trust: 1 } },
}
beats.forEach((beat, index) => {
  const id = decisionId(index)
  const after = chain(`${id}-AFTER`, beat.after, index === beats.length - 1 ? 'TA-S02-COMPLETE' : decisionId(index + 1))
  friendsGroupNodes[id] = { id, kind: 'choice', number: String(index + 1).padStart(2, '0'), channel: 'group', choices: beat.choices.map((text, i) => {
    const option = ['a', 'b', 'c'][i]
    const effects = reactions[`${index + 1}-${option}`]
    const target = effects ? `${id}-${option}-REACTION` : after
    if (effects) friendsGroupNodes[target] = { id: target, kind: 'event', event: 'effects', effects, next: after }
    return { id: option, text, next: chain(`${id}-${option}`, beat.replies[i], target) }
  }) }
})
export const friendsGroupStart = chain('TA-S02-FRIENDS-OPEN', opening, decisionId(0))
