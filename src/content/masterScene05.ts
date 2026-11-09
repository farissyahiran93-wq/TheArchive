export const masterScene05Beats = [
  {
    "choices": [
      "Do you have a way to examine it?",
      "What are you asking me to do next?",
      "I'm not installing something just because you say so."
    ],
    "replies": [
      "A tool called TRACE. It can work on a copy of the container and show which fragments become readable.",
      "Review a tool called TRACE. You can decide whether to use it after you see what it does.",
      "You shouldn't. I can offer the package details first. Installing it is your decision."
    ]
  },
  {
    "choices": [
      "Who developed TRACE?",
      "Is this your software?",
      "If you won't identify yourself, why should I trust your tool?"
    ],
    "replies": [
      "I worked on the viewer. That doesn't establish that every part of it is trustworthy.",
      "I helped build the viewer. I'm withholding my name, so you have a reason to be cautious about that claim.",
      "You don't have to take my word for it. Review the package and its stated limits before deciding."
    ]
  },
  {
    "choices": [
      "What would it actually do with the archive?",
      "Why can't I just open the archive?",
      "Can it unlock everything at once?"
    ],
    "replies": [
      "It checks the container's manifest and processes designated segments. It doesn't need to change the original file.",
      "The container is protected, and some segments need separate keys or source material. TRACE can present what is currently recoverable.",
      "No. It may expose a small part now. Missing content stays missing until there's a supported way to recover it."
    ]
  },
  {
    "choices": [
      "What permissions does it need?",
      "Can it read my personal messages?",
      "I don't want you watching what I do."
    ],
    "replies": [
      "Within this phone interface, it needs access to the archive you select and a place to save its local results. It doesn't need your contacts or location.",
      "The offered tool is meant to work on the selected archive. You shouldn't grant access to your personal messages or accounts.",
      "I won't receive your private findings automatically. If you choose to tell me something, send only what you want me to hear."
    ]
  },
  {
    "choices": [
      "Could installing it compromise my privacy?",
      "Will it alter the original archive?",
      "What happens if the copy is damaged?"
    ],
    "replies": [
      "I can't prove it's completely safe just by saying it is. Review the stated capabilities and risks, and don't install it if you aren't comfortable.",
      "It's designed to keep the accepted archive unchanged and work on a local copy. The package review should show that claim separately from verification.",
      "TRACE should label damaged or missing segments. It can't honestly fill them in for you."
    ]
  },
  {
    "choices": [
      "How can I check whether the backup is genuine?",
      "Can TRACE tell me whether the archive was altered?",
      "You could have changed what you're sending me."
    ],
    "replies": [
      "Compare individual fragments with independent sources where you can. A readable file isn't proof that every statement inside it is true.",
      "Not conclusively from this first pass. It can show available metadata and preserve what it reads; provenance needs more evidence.",
      "That's possible from your point of view. Keep the source marked unverified, and don't treat my account as authentication."
    ]
  },
  {
    "choices": [
      "Show me the package details.",
      "I want to review the risks first.",
      "I may decide not to use it."
    ],
    "replies": [
      "I'll offer them here. Inspection doesn't install anything.",
      "You can inspect the package and read the capabilities and risks before deciding.",
      "That's your choice. You can defer or decline and return to the offer later."
    ]
  },
  {
    "choices": [
      "If I install it, what should I look at first?",
      "Does installation start recovery automatically?",
      "I want to control each step."
    ],
    "replies": [
      "Open TRACE yourself, select the archive, and start the first recovery only when you're ready.",
      "No. Installation, opening the app, selecting the archive and starting recovery are separate actions.",
      "You should. TRACE won't read a record for you or send me your findings."
    ]
  },
  {
    "choices": [
      "Some fragments mention June Ellis. Who is she?",
      "Parts of the archive are still missing.",
      "I still can't verify the source of this backup."
    ],
    "replies": [
      "You've found her name in the archive. I can tell you Daniel was looking at material connected to her, but a name in a fragment doesn't establish what happened.",
      "Then keep those gaps visible. Missing text isn't a reason to guess what Daniel wrote.",
      "That's fair. Treat it as unverified until you can compare specific records with independent sources."
    ]
  },
  {
    "choices": [
      "I found partial messages and notes. June Ellis is mentioned, but the context is missing.",
      "The archive has readable fragments, but I won't draw conclusions from the gaps.",
      "I found some partial material. I'm keeping my interpretation private."
    ],
    "replies": [
      "Thank you. That's a limited finding, and it's worth keeping the missing context clear.",
      "That's sensible. We need sources we can actually inspect.",
      "Understood. You don't owe me your private notes."
    ]
  }
] as const

/** Follow-up for players who already discussed TRACE before receiving the archive. */
export const traceFirstScene05Beats=masterScene05Beats.map((beat,i)=>i===0?{choices:['Can TRACE examine this copy?','What should I do with the archive?','I still need to decide whether to use TRACE.'],replies:["If you choose to install it, TRACE can work on a copy and show which fragments become readable.","Review the archive and TRACE's stated limits first. You control whether either is used.","That is your decision. Inspect the package details before installing anything."]}:beat)

export const masterFragments = [
  { id:'TA-PH-MESSAGE-FAMILY-01', category:'Messages', units:30, body:"Daniel: I found the biscuits you like. Don't tell Sophie I bought two packets.", summary:'Daniel mentioned buying biscuits; the surrounding exchange is missing.' },
  { id:'TA-PH-MESSAGE-JUNE-01', category:'Messages', units:30, body:'Daniel: June Ellis said the old records might be worth another look.', summary:'A partial message mentions June Ellis and old records; its recipient and context are unavailable.' },
  { id:'TA-PH-NOTE-ORDINARY-01', category:'Notes', units:30, body:'Dinner with Maya: remember dessert. Actual dessert, not biscuits.', summary:'A personal note mentions dinner with Maya.' },
  { id:'TA-PH-NOTE-RECORDS-01', category:'Notes', units:30, body:'Greyhaven records — ask June which copy she meant.', summary:'A note mentions Greyhaven records and a copy; the surrounding text is missing.' },
] as const

export const fragmentExamination = {
  'TA-PH-MESSAGE-FAMILY-01': { title: 'Family Thread', detail: 'I bought two packets', observation: 'This fragment records Daniel talking about buying biscuits. Without the timestamp and recipient, it cannot establish who he was with or when.' },
  'TA-PH-MESSAGE-JUNE-01': { title: 'June Thread', detail: 'June Ellis said the old records might be worth another look', observation: 'Daniel mentions June Ellis and old records. The fragment leaves the records, recipient and timing unresolved.' },
  'TA-PH-NOTE-ORDINARY-01': { title: 'Dinner Reminder', detail: 'Dinner with Maya', observation: 'Daniel wrote a dinner reminder involving Maya. The partial note does not establish that they met or when the note was written.' },
  'TA-PH-NOTE-RECORDS-01': { title: 'Greyhaven Records', detail: 'ask June which copy she meant', observation: 'Daniel noted a question about a copy connected to Greyhaven records. The note does not identify the copy or who held it.' },
} satisfies Record<(typeof masterFragments)[number]['id'], {title: string; detail: string; observation: string}>

export function compareRecoveredFragments(left: string, right: string): string | undefined {
  if (left === right || !masterFragments.some(fragment => fragment.id === left) || !masterFragments.some(fragment => fragment.id === right)) return
  const pair = new Set([left, right])
  if (pair.has('TA-PH-MESSAGE-JUNE-01') && pair.has('TA-PH-NOTE-RECORDS-01')) {
    return 'Both fragments mention June and records. The note also mentions a copy, but neither fragment can establish that both refer to the same record or copy.'
  }
  if (pair.has('TA-PH-MESSAGE-FAMILY-01') && pair.has('TA-PH-NOTE-ORDINARY-01')) {
    return 'Both fragments mention biscuits in different contexts. Neither has a usable timestamp, so the overlap cannot connect the purchase to the dinner.'
  }
  return 'The fragments describe different subjects. Their missing timestamps and surrounding text leave their sequence and any connection unresolved.'
}
