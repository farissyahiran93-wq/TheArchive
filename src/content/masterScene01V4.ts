import type { Scene01Node } from './scene01'

export const masterScene01V4Start = 'TA-S01-V4-OPEN-1'
export const masterScene01V4Nodes: Record<string, Scene01Node> = {}
type Beat = { choices: readonly string[]; replies: readonly (readonly string[])[]; after: readonly string[] }
const beats: readonly Beat[] = [
  {
    "choices": [
      "Sure. What's this about?",
      "Who are you trying to reach?",
      "Before I answer, how did you get this number?"
    ],
    "replies": [
      [
        "Thank you. I wasn't sure you'd answer."
      ],
      [
        "You, I think. I may have the wrong number."
      ],
      [
        "That's a fair question. I found it in some paperwork. I'll explain."
      ]
    ],
    "after": [
      "It's about my older brother.",
      "His name is Daniel Mercer.",
      "Does that name mean anything to you?  "
    ]
  },
  {
    "choices": [
      "No, I don't think I know him.",
      "Daniel Mercer? That doesn't ring a bell.",
      "Who is Daniel, and why would I know him?"
    ],
    "replies": [
      [
        "Okay. Thank you for being honest."
      ],
      [
        "I thought it might not. I'm sorry to put you on the spot."
      ],
      [
        "He's my brother. I found your number among some records connected to him. I don't know why it's there."
      ]
    ],
    "after": [
      "A name might not mean much on its own.",
      "Would you mind looking at a photo?"
    ]
  },
  {
    "choices": [
      "I'm sorry, Sophie. I don't recognise him.",
      "Is Daniel the one on the left? He doesn't look familiar.",
      "I don't know him, but that looks like a happy memory."
    ],
    "replies": [
      [
        "Thank you for looking. I know it was a lot to ask."
      ],
      [
        "Yes. That's Daniel. Thank you for checking."
      ],
      [
        "It was. I nearly forgot how happy he looked that night."
      ]
    ],
    "after": [
      "He made some ridiculous joke right before that picture.",
      "I wish I could remember exactly what he said.",
      "No one close to him has heard from him in three days.  "
    ]
  },
  {
    "choices": [
      "Three days? Has anyone heard from him at all?",
      "What do you mean, no one's heard from him?",
      "Is that why you're contacting strangers?"
    ],
    "replies": [
      [
        "Not anyone I've spoken to. I've asked the people closest to him."
      ],
      [
        "He stopped answering calls and messages. Then nobody knew where he'd gone."
      ],
      [
        "Yes. I know how desperate it must look."
      ]
    ],
    "after": [
      "At first I told myself he'd just lost his phone.",
      "Then I kept telling myself that.",
      "Now I don't know what to think.  "
    ]
  },
  {
    "choices": [
      "How did you get my number, Sophie?",
      "Did Daniel give you my contact details?",
      "Why would his disappearance lead you to me?"
    ],
    "replies": [
      [
        "I found it in a saved contact export among the family files we could access."
      ],
      [
        "I can't say that he did. The number was in a saved contact export, but I don't know who added it."
      ],
      [
        "Your number was in a contact export among Daniel's family files. I thought I should at least ask."
      ]
    ],
    "after": [
      "Most of the entries had names.",
      "Yours didn't.",
      "Just a number, with a little star beside it.  "
    ]
  },
  {
    "choices": [
      "A star? Do you know what it means?",
      "That doesn't prove Daniel knew me.",
      "Could someone else have put my number there?"
    ],
    "replies": [
      [
        "No. There's nothing beside it that explains what the star means."
      ],
      [
        "You're right. I shouldn't treat it as proof."
      ],
      [
        "Maybe. I have no way to tell who added it."
      ]
    ],
    "after": [
      "I stared at that entry for ages before deciding to message you.",
      "I know this sounds strange. I just couldn't ignore it."
    ]
  },
  {
    "choices": [
      "You didn't bother me. I just want to understand why my number is there.",
      "Did Daniel actually save my number, or was it just in that file?",
      "I don't recognize Daniel, Sophie. I don't want to give you false hope."
    ],
    "replies": [
      [
        "I wish I knew. I found it in a saved contact export in our family folder. That's all I can tell you."
      ],
      [
        "I don't know if he saved it himself. The file doesn't say who added that entry."
      ],
      [
        "I know. And I appreciate you being honest. I wasn't expecting you to have all the answers."
      ]
    ],
    "after": [
      "I keep wondering if I've overlooked something.",
      "There are two other people trying to find him.",
      "His fiancée, Maya. And his best friend, Lucas.",
      "They've been asking questions too."
    ]
  },
  {
    "choices": [
      "Are Maya and Lucas looking for him too?",
      "Have they found anything I should know about?",
      "That must be difficult for all of you."
    ],
    "replies": [
      [
        "Yes. We've all been trying to make sense of what happened."
      ],
      [
        "We've been comparing what we know, but there are still so many questions."
      ],
      [
        "It has been. We've been trying to support each other through it."
      ]
    ],
    "after": [
      "There's a group chat. Just me, Daniel, Maya and Lucas.",
      "We've had it for years. It's called Same Old Chaos.",
      "Daniel's still in there. We haven't changed anything.",
      "Would you be comfortable joining us?"
    ]
  },
  {
    "choices": [
      "You can send me an invitation.",
      "I can take a look, if everyone is comfortable with it.",
      "I'd like to hear what Maya and Lucas have to say."
    ],
    "replies": [
      [
        "Okay. You'll still get to choose whether to join."
      ],
      [
        "Okay. I'll send you the invitation so you can decide."
      ],
      [
        "Okay. I'll send you the invitation. It's up to you whether to join."
      ]
    ],
    "after": [
      "Thank you for hearing me out.",
      "I didn't know whether anyone would.  "
    ]
  }
]
function chain(prefix: string, lines: readonly string[], target: string): string {
  for (let i = lines.length - 1; i >= 0; i--) {
    const id = `${prefix}-${i + 1}`
    masterScene01V4Nodes[id] = { id, kind: 'npc', channel: 'sophie', sender: 'sophie', text: lines[i], next: target, introducesSophie: lines[i] === "I'm Sophie." }
    target = id
  }
  return target
}
masterScene01V4Nodes['TA-S01-INVITATION'] = { id: 'TA-S01-INVITATION', kind: 'event', event: 'invitation' }
masterScene01V4Nodes['TA-S01-FAMILY-PHOTO'] = { id: 'TA-S01-FAMILY-PHOTO', kind: 'npc', channel: 'sophie', sender: 'sophie', text: '', photo: '/media/chat/sophie-birthday-owner.png', next: 'TA-S01-V4-PHOTO-CAPTION' }
masterScene01V4Nodes['TA-S01-V4-PHOTO-CAPTION'] = { id: 'TA-S01-V4-PHOTO-CAPTION', kind: 'npc', channel: 'sophie', sender: 'sophie', text: "That's Daniel on the left. It was my birthday. Does his face look familiar?", next: 'TA-S01-V4-C03' }
for (let i = beats.length - 1; i >= 0; i--) {
  const beat = beats[i], number = String(i + 1).padStart(2, '0'), id = `TA-S01-V4-C${number}`
  const target = i === 8 ? 'TA-S01-INVITATION' : i === 1 ? 'TA-S01-FAMILY-PHOTO' : `TA-S01-V4-C${String(i + 2).padStart(2, '0')}`
  const after = chain(`TA-S01-V4-AFTER-${number}`, beat.after, target)
  const responseTarget = i === 5 ? 'TA-S01-V4-REFLECTIVE-PAUSE' : after
  if (i === 5) masterScene01V4Nodes[responseTarget] = { id: responseTarget, kind: 'wait', duration: 1200, typing: true, actor: 'sophie', next: after }
  masterScene01V4Nodes[id] = { id, kind: 'choice', number, channel: 'sophie', choices: beat.choices.map((text, j) => ({ id: String.fromCharCode(97 + j), text, next: chain(`TA-S01-V4-C${number}-${j}`, beat.replies[j], responseTarget) })) }
}
chain('TA-S01-V4-OPEN', ['Hi. Sorry to message you out of nowhere.', "I'm Sophie.", 'I know this is strange.', 'Could I ask you something?'], 'TA-S01-V4-C01')
