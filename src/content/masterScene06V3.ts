/** Owner-approved Scene 6 dialogue, ch1-s5-s6-v3. */
export const scene06V3 = [
  {
    "intro": [],
    "choices": [
      "Maya sent him a picture of the dinner she'd made.",
      "Daniel was supposed to have dinner with Maya that night.",
      "Everything looks normal until Daniel starts making excuses."
    ],
    "branches": [
      [
        "She'd already cooked for him.",
        "Looks like she was expecting a quiet evening together."
      ],
      [
        "So he had somewhere he was expected to be.",
        "And someone who would notice if he didn't show up."
      ],
      [
        "That's what makes it interesting.",
        "Nothing unusual about the dinner. It's his answer that stands out."
      ]
    ],
    "follow": [
      "She asked when he'd be home.",
      "He told her he was caught up with something.",
      "That sounds harmless enough. Until you read what she said next."
    ]
  },
  {
    "intro": [],
    "choices": [
      "She said it was the third time that week.",
      "Daniel was hiding something from her.",
      "Maybe he really was busy with work."
    ],
    "branches": [
      [
        "Three times in one week.",
        "So this wasn't an isolated evening."
      ],
      [
        "Maybe. But we don't know what he was hiding, or whether it had anything to do with his disappearance."
      ],
      [
        "He could have been.",
        "But Maya clearly thought something had changed."
      ]
    ],
    "follow": [
      "Whatever had Daniel's attention, it was affecting his normal life.",
      "Maya noticed it before he disappeared.",
      "And she wasn't the only one."
    ]
  },
  {
    "intro": [],
    "choices": [
      "Sophie asked if Daniel was okay.",
      "She seemed genuinely worried about him.",
      "Some of their conversation is missing."
    ],
    "branches": [
      [
        "That's not usually a question you ask for no reason.",
        "Something must have made her worry."
      ],
      [
        "She's his younger sister.",
        "She probably noticed things other people wouldn't."
      ],
      [
        "Then we can't assume the surviving messages tell the whole story.",
        "Whatever's missing could change the context."
      ]
    ],
    "follow": [
      "He told her he was fine.",
      "Maybe he believed it.",
      "Or maybe he just didn't want her asking any more questions."
    ]
  },
  {
    "intro": [],
    "choices": [
      "Maybe he was trying to protect Sophie.",
      "He wasn't telling her the truth.",
      "I should ask Sophie what she remembers."
    ],
    "branches": [
      [
        "That's possible.",
        "People sometimes keep things to themselves because they think it protects someone they care about."
      ],
      [
        "Perhaps. But we still don't know what he was keeping from her."
      ],
      [
        "That's worth doing.",
        "She might remember what was happening around the time of those messages."
      ]
    ],
    "follow": [
      "For now, we know Sophie noticed a change.",
      "Maya noticed it too.",
      "Two people close to Daniel were worried before he disappeared."
    ]
  },
  {
    "intro": [],
    "choices": [
      "Lucas offered to help Daniel with something.",
      "Daniel told Lucas 'not yet'.",
      "Lucas sounded like he already knew something was happening."
    ],
    "branches": [
      [
        "Then Lucas must have had some reason to think Daniel needed help."
      ],
      [
        "Not yet.",
        "That's a strange answer if there's nothing going on."
      ],
      [
        "Possibly.",
        "At least there was something between them that didn't need explaining."
      ]
    ],
    "follow": [
      "Daniel didn't tell Lucas to forget about it.",
      "He didn't say there was no problem.",
      "He said 'not yet'."
    ]
  },
  {
    "intro": [],
    "choices": [
      "Why wouldn't Daniel accept help from his best friend?",
      "Lucas might know more than he's telling us.",
      "We should ask Lucas about that conversation."
    ],
    "branches": [
      [
        "Maybe he thought he could handle things himself.",
        "Or maybe he didn't want Lucas getting involved."
      ],
      [
        "He might.",
        "But we shouldn't confuse an offer to help with proof he knew everything."
      ],
      [
        "I agree.",
        "Just make sure we ask about the conversation, not about a conclusion we've already decided on."
      ]
    ],
    "follow": [
      "Lucas may be able to tell us what Daniel was dealing with.",
      "But we have to let him answer that himself.",
      "Keep this message. I think it's worth coming back to."
    ]
  },
  {
    "intro": [],
    "choices": [
      "There's a note telling Daniel to ask June about a copy.",
      "Do you know anyone called June?",
      "Most of Daniel's notes are ordinary. But this one mentions a copy."
    ],
    "branches": [
      [
        "Ask June about a copy?",
        "That's all that survived?"
      ],
      [
        "June...",
        "Does the note say anything else?"
      ],
      [
        "A copy of what?",
        "Did he write anything else?"
      ]
    ],
    "follow": [
      "Wait.",
      "June Ellis?",
      "Is that who the note is referring to?"
    ]
  },
  {
    "intro": [],
    "choices": [
      "I never said Ellis. How did you know her last name?",
      "You know June Ellis?",
      "What aren't you telling me about Daniel?"
    ],
    "branches": [
      [
        "You're right. You didn't.",
        "I should've explained why I recognized the name."
      ],
      [
        "I know the name.",
        "Daniel mentioned her before he disappeared."
      ],
      [
        "Daniel had been asking questions about June Ellis.",
        "That's why I recognized it."
      ]
    ],
    "follow": [
      "He was trying to check something.",
      "I knew her name came up. I didn't know this note was on his phone.",
      "And I don't know what that copy refers to.",
      "I should have told you I recognized the name.",
      "But I didn't want to send you chasing a connection I couldn't confirm.",
      "Keep that note.",
      "If Daniel thought June could help him verify something, we need to find out what.",
      "Just don't assume he ever got the copy."
    ]
  },
  {
    "intro": [],
    "choices": [
      "There's a gap in Daniel's activity logs. Between the last file access and the backup.",
      "Something's wrong with the activity logs. There's a period TRACE can't account for.",
      "These timestamps don't line up. We don't know what happened between them."
    ],
    "branches": [[], [], []],
    "follow": [
      "A gap?", "Between which entries?", "The last recorded file access and the backup?",
      "That's strange.", "It doesn't mean nothing happened during that time.",
      "It means we don't have a record of what happened."
    ]
  },
  {
    "intro": [],
    "choices": [
      "Could something have been deleted?",
      "Could TRACE have missed that data?",
      "Or was the phone being used without leaving a record?"
    ],
    "branches": [[], [], []],
    "follow": [
      "Any of those could be possible.", "But we don't have enough to say which.",
      "What matters is that we have an entire stretch of time we can't account for.",
      "And it happens right where Daniel's trail starts falling apart.",
      "Keep that hour on the board.", "Ask Sophie when you are ready. I will keep your timeline private."
    ]
  }
] as const
