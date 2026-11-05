import type { Scene01Node } from './scene01'

// Authored dialogue from the pinned 4 November bridge manuscript.
const beats = {
  "1": {
    "intro": [
      "There's something else you can check.",
      "I found an anomaly in a reference tied to the Greyhaven Bulletin article.",
      "Not in the article itself. In a record pointing to it."
    ],
    "choices": [
      "Who is this? And how do you know what I've read?",
      "An anomaly? That sounds conveniently vague.",
      "I'm listening. But start with what you actually found."
    ],
    "replies": [
      [
        "Fair question. I know the public story. I don't have access to your messages.",
        "I assumed you'd seen it. And no, I'm not giving you my name. Not yet."
      ],
      [
        "It is vague. Because the record is incomplete, and I won't fill in what isn't there."
      ],
      [
        "A reference number. And one field that appears to point to the same public article."
      ]
    ],
    "tail": [
      "The reference is ARC-IDX-GB-041.",
      "It points to GB-ARTICLE-001 — Daniel Mercer's Greyhaven Bulletin story.",
      "The public article exists. The reference exists in the copy I have.",
      "But I can't establish who created that index or when this entry was captured."
    ]
  },
  "2": {
    "intro": [],
    "choices": [
      "Why should I trust an anonymous number with a file about Daniel?",
      "You could have made that reference yourself.",
      "If you've found something real, why not just send me a screenshot?"
    ],
    "replies": [
      [
        "You shouldn't trust me just because I contacted you.",
        "You don't know me. That's a good reason to be careful."
      ],
      [
        "I could be wrong. And I can't prove the source of the index from the copy I have.",
        "That's exactly why I don't want you treating it as evidence of a changed article."
      ],
      [
        "A screenshot would show you what I chose to show you.",
        "I want you to inspect the fields yourself, including the ones marked unknown."
      ]
    ],
    "tail": [
      "I am not asking you to believe my explanation.",
      "I'm asking you to check whether the reference says what I claim it says."
    ]
  },
  "3": {
    "intro": [],
    "choices": [
      "Does this mean someone changed the article?",
      "If there's no earlier copy, what's the point of this index?",
      "What makes a reference different from the actual document?"
    ],
    "replies": [
      [
        "No. A matching reference doesn't prove an edit.",
        "We have no verified earlier wording to compare."
      ],
      [
        "It gives us a place to start. It tells us what record the entry points toward.",
        "It doesn't tell us whether the document survived."
      ],
      [
        "A reference can hold an ID, a title, or a pointer without holding the content itself.",
        "Think of a library catalogue entry for a book that's no longer on the shelf."
      ]
    ],
    "tail": [
      "The strange part is that this entry survived without the source material I would need to place it in time.",
      "I want you to see that limitation before you decide what it means."
    ]
  },
  "4": {
    "intro": [
      "You'll need TRACE to inspect the reference properly."
    ],
    "choices": [
      "TRACE? What is that supposed to be?",
      "Another app? Did you make it?",
      "Why can't I just open the reference in the Browser?"
    ],
    "replies": [
      [
        "It's a small forensic viewer. It reads damaged references and separates the fields it can recover from the ones it can't."
      ],
      [
        "I built the viewer. I didn't create the index it reads.",
        "The index came to me incomplete. I still can't authenticate who assembled it."
      ],
      [
        "A public browser can open the article. The reference isn't a public web page.",
        "TRACE reads the local index package and compares the identifiers it contains."
      ]
    ],
    "tail": [
      "It can inspect metadata, follow pointers, and compare available records.",
      "If a file contains an encrypted payload, a separate tool can attempt a local decode or recovery when the story provides a valid input.",
      "But it can't invent a missing document. And it can't turn an unverified record into a verified one."
    ]
  },
  "5": {
    "intro": [],
    "choices": [
      "And I'm supposed to install software from someone who won't even give me a name?",
      "How do I know TRACE isn't altering the results?",
      "What's in it for you? Why do you want me to look?"
    ],
    "replies": [
      [
        "You're right to question it.",
        "The package won't have a verified publisher. The phone should warn you about that.",
        "You can stop here. I won't pretend the risk isn't there."
      ],
      [
        "You don't know that. I can tell you what I built it to do, but that isn't independent proof.",
        "Read the raw fields. Keep the uncertainty visible. Don't accept a result just because TRACE displays it."
      ],
      [
        "Because I found the reference but couldn't resolve it myself.",
        "I want another person to examine the same surviving fields.",
        "That doesn't mean you owe me an answer."
      ]
    ],
    "tail": [
      "If you decide to continue, I can send the in-game package.",
      "Inspect it on your terms."
    ]
  },
  "6": {
    "intro": [],
    "choices": [
      "All right. Send the package. I'll decide after I see the warning.",
      "Not yet. Tell me one more thing: will this access my messages?",
      "I'm not installing an unknown app right now."
    ],
    "replies": [
      [
        "Fair enough. I won't call it safe just because I wrote the viewer.",
        "The package is below. You make the decision."
      ],
      [
        "This viewer is designed to work with its packaged reference data, not your conversations.",
        "But that is still my description, not proof of its origin or integrity.",
        "You should see the device warning before deciding."
      ],
      [
        "Then don't install it yet.",
        "The reference won't become more trustworthy just because you're in a hurry.",
        "If you change your mind, ask me for the package again."
      ]
    ],
    "tail": [
      "Open TRACE when you're ready.",
      "You should see one incoming reference: ARC-IDX-GB-041.",
      "Tap it, then run the scan. Start with the PUBLIC_ARTICLE field.",
      "Don't use the Decryptor yet. We haven't established that there's anything encrypted here.",
      "You don't have to send me anything until you've checked it."
    ]
  },
  "8": {
    "intro": [
      "You opened the reference?",
      "What did TRACE actually show you?"
    ],
    "choices": [
      "The article ID matches. But the original text isn't there.",
      "Your tool can't verify where the index came from. Why did you call it an anomaly?",
      "I thought I was going to decrypt an older article. There's nothing to decrypt."
    ],
    "replies": [
      [
        "That's what I wanted you to see. A reference survived. The document didn't come with it.",
        "That doesn't tell us whether the article was changed."
      ],
      [
        "Because the entry points to a public article, but the provenance and capture details are missing.",
        "It may just be an incomplete extraction. I'm not calling it proof of tampering."
      ],
      [
        "Because the original content isn't encrypted here. It's absent.",
        "Decoding the reference fields isn't the same as decrypting a missing article."
      ]
    ],
    "tail": [
      "So we have a lead. Not an answer.",
      "The public page still gives us one more thing we can examine.",
      "That \"Updated\" label.",
      "Have another look at what the label actually tells the reader.",
      "Save your observation to TRACE when you're ready."
    ]
  }
} as const

export const traceBridgePrefix = 'OPEN-ORIGIN-TRACE-INTRO-V3-'
export const traceBridgeNodes: Record<string, Scene01Node> = {}
export const bridgeInstallWait = traceBridgePrefix + 'WAIT-INSTALL'
export const bridgeFindingsWait = traceBridgePrefix + 'WAIT-FINDINGS'
export const bridgeReportChoice = traceBridgePrefix + 'C08'
export const bridgeDeferredChoice = traceBridgePrefix + 'REQUEST-AGAIN'
export const bridgeEnd = traceBridgePrefix + 'HANDOFF'
export const bridgeArticleLine = traceBridgePrefix + 'B08-TAIL-5'

function lines(prefix: string, texts: readonly string[], next: string, attachment?: 'article' | 'archive-package') {
  for (let index = texts.length - 1; index >= 0; index--) {
    const id = traceBridgePrefix + prefix + '-' + (index + 1)
    traceBridgeNodes[id] = {
      id, kind: 'npc', sender: 'unknown', channel: 'unknown', text: texts[index], next,
      ...(attachment && index === texts.length - 1 ? { attachment } : {}),
    }
    next = id
  }
  return next
}

traceBridgeNodes[bridgeEnd] = { id: bridgeEnd, kind: 'event', event: 'archive-thread-end' }
const report = beats[8]
const articleLead = lines('B08-TAIL', report.tail, bridgeEnd, 'article')
traceBridgeNodes[bridgeReportChoice] = {
  id: bridgeReportChoice, kind: 'choice', channel: 'unknown',
  choices: report.choices.map((text, i) => ({
    id: 'abc'[i], text, next: lines('B08-' + 'abc'[i], report.replies[i], articleLead),
  })),
}
traceBridgeNodes[bridgeFindingsWait] = {
  id: bridgeFindingsWait, kind: 'gate', action: 'trace-bridge',
  next: lines('B08-INTRO', report.intro, bridgeReportChoice),
}
traceBridgeNodes[bridgeInstallWait] = {
  id: bridgeInstallWait, kind: 'gate', action: 'trace-bridge',
  next: lines('B07-INSTALLED', beats[6].tail, bridgeFindingsWait),
}
traceBridgeNodes[bridgeDeferredChoice] = {
  id: bridgeDeferredChoice, kind: 'choice', channel: 'unknown',
  choices: [{
    id: 'again', text: 'Send TRACE again. I want to check the reference.',
    next: lines('REOFFER', ['All right. The package is still here. Remember what I said about its source.'], bridgeInstallWait, 'archive-package'),
  }],
}

let next = bridgeInstallWait
for (const number of [6, 5, 4, 3, 2, 1] as const) {
  const beat = beats[number]
  const beatId = '0' + number
  const id = traceBridgePrefix + 'C' + beatId
  const tail = number === 6 ? bridgeInstallWait : lines('B' + beatId + '-TAIL', beat.tail, next)
  traceBridgeNodes[id] = {
    id, kind: 'choice', channel: 'unknown',
    choices: beat.choices.map((text, branch) => ({
      id: 'abc'[branch], text,
      next: lines(
        'B' + beatId + '-' + 'abc'[branch], beat.replies[branch],
        number === 6 && branch === 2 ? bridgeDeferredChoice : tail,
        number === 6 && branch !== 2 ? 'archive-package' : undefined,
      ),
    })),
  }
  next = lines('B' + beatId + '-INTRO', beat.intro, id)
}
export const traceBridgeEntrance = next
