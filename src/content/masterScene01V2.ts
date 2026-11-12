import type { Scene01Node } from './scene01'

export const masterScene01V2Start = 'TA-S01-V2-OPEN-1'
export const masterScene01V2Nodes: Record<string, Scene01Node> = {}
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
        "No. There's no explanation beside it."
      ],
      [
        "You're right. I shouldn't treat it as proof."
      ],
      [
        "Maybe. I have no way to tell who added it."
      ]
    ],
    "after": [
      "I almost didn't send you this message.",
      "I kept typing it, then deleting it.",
      "I was afraid of bothering the wrong person. But I was more afraid of missing something.  "
    ]
  },
  {
    "choices": [
      "I can listen. I can't promise anything more.",
      "Please don't share my number or this conversation.",
      "I'd prefer to keep my distance from all of this."
    ],
    "replies": [
      [
        "That's more than fair. Thank you for hearing me out."
      ],
      [
        "I won't share either without asking you first."
      ],
      [
        "I understand. I won't pressure you."
      ]
    ],
    "after": [
      "I know you don't owe me anything.",
      "I just wish I had one thing I could be certain of.  "
    ]
  },
  {
    "choices": [
      "Who else is looking for him?",
      "Have you told his friends or family about this?",
      "Are you trying to find him on your own?"
    ],
    "replies": [
      [
        "Maya and Lucas. Maya's his fiancée, and Lucas is his best friend."
      ],
      [
        "Yes. Maya is his fiancée. Lucas is his closest friend. We're trying to work out what we actually know."
      ],
      [
        "No. Maya and Lucas are helping. We're just people who care about him."
      ]
    ],
    "after": [
      "We made a private group called FIND DANIEL.",
      "It's mostly questions, and the small things we can confirm.",
      "If you'd like, I could send you an invitation. No pressure.  "
    ]
  },
  {
    "choices": [
      "Send the invitation. I'll take a look.",
      "I need some time before I decide.",
      "I'd rather not join right now."
    ],
    "replies": [
      [
        "Okay. You'll still get to choose whether to join."
      ],
      [
        "Of course. You can decide later."
      ],
      [
        "I understand. I won't add you."
      ]
    ],
    "after": [
      "Whatever you decide, thank you for answering.",
      "I didn't know whether anyone would.  "
    ]
  }
]
function chain(prefix: string, lines: readonly string[], target: string): string {
  for (let i = lines.length - 1; i >= 0; i--) {
    const id = `${prefix}-${i + 1}`
    masterScene01V2Nodes[id] = { id, kind: 'npc', channel: 'sophie', sender: 'sophie', text: lines[i], next: target, introducesSophie: lines[i] === "I'm Sophie." }
    target = id
  }
  return target
}
masterScene01V2Nodes['TA-S01-INVITATION'] = { id: 'TA-S01-INVITATION', kind: 'event', event: 'invitation' }
masterScene01V2Nodes['TA-S01-FAMILY-PHOTO'] = { id: 'TA-S01-FAMILY-PHOTO', kind: 'npc', channel: 'sophie', sender: 'sophie', text: '', photo: '/media/chat/sophie-birthday-owner.png', next: 'TA-S01-V2-PHOTO-CAPTION' }
masterScene01V2Nodes['TA-S01-V2-PHOTO-CAPTION'] = { id: 'TA-S01-V2-PHOTO-CAPTION', kind: 'npc', channel: 'sophie', sender: 'sophie', text: "That's Daniel on the left. It was my birthday. Does his face look familiar?", next: 'TA-S01-V2-C03' }
for (let i = beats.length - 1; i >= 0; i--) {
  const beat = beats[i], number = String(i + 1).padStart(2, '0'), id = `TA-S01-V2-C${number}`
  const target = i === 8 ? 'TA-S01-INVITATION' : i === 1 ? 'TA-S01-FAMILY-PHOTO' : `TA-S01-V2-C${String(i + 2).padStart(2, '0')}`
  const after = chain(`TA-S01-V2-AFTER-${number}`, beat.after, target)
  masterScene01V2Nodes[id] = { id, kind: 'choice', number, channel: 'sophie', choices: beat.choices.map((text, j) => ({ id: String.fromCharCode(97 + j), text, next: chain(`TA-S01-V2-C${number}-${j}`, beat.replies[j], after) })) }
}
chain('TA-S01-V2-OPEN', ['Hi. Sorry to message you out of nowhere.', "I'm Sophie.", 'I know this is strange.', 'Could I ask you something?'], 'TA-S01-V2-C01')
