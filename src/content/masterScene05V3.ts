/** Owner-approved Scene 5 dialogue, ch1-s5-s6-v3. */
export const scene05V3 = [
  {
    "intro": [
      "Did you get TRACE open?",
      "You should be looking at an empty workspace. That's normal.",
      "I wanted you to see it before I sent anything."
    ],
    "choices": [
      "It's open. What am I supposed to do with it?",
      "It's empty. Are you sure this thing works?",
      "I still don't know why I'm doing this for someone I don't know."
    ],
    "branches": [
      "For now, nothing. I just need you to understand where the recovered data will go.",
      "It works. The question is whether the file I have will give us anything useful.",
      "You have every reason to be careful. I wouldn't trust a stranger just because he knows Daniel's name."
    ],
    "follow": [
      "I have something that might help us understand what happened to him."
    ]
  },
  {
    "intro": [
      "It's a copy of an encrypted archive from Daniel's phone.",
      "Not the phone itself. And not a complete backup.",
      "I've tried opening it. I haven't been able to get very far."
    ],
    "choices": [
      "Where did you get Daniel's archive?",
      "You've had this all along?",
      "What exactly is inside it?"
    ],
    "branches": [
      "I got access to a copy after he disappeared. I can't verify every step it passed through before it reached me.",
      "I've been trying to make sense of it. Sending you a file I couldn't even read wasn't my first choice.",
      "I can't give you a complete list. That's part of the problem. The archive index is damaged."
    ],
    "follow": [
      "There may still be messages, notes and activity records in there.",
      "Enough to tell us something. Maybe."
    ]
  },
  {
    "intro": [],
    "choices": [
      "How do we know this really came from Daniel?",
      "What if someone changed the file?",
      "If it could help find him, we should try."
    ],
    "branches": [
      "We don't know for certain. Some details match what I know, but that isn't proof of authenticity.",
      "That's possible. Which is why I don't want either of us treating this as unquestionable evidence.",
      "I think so too. But wanting an answer doesn't make the data reliable."
    ],
    "follow": [
      "TRACE will work on a local copy.",
      "Accepting the transfer won't alter the original archive.",
      "And you decide when to start recovery."
    ]
  },
  {
    "intro": [
      "All right. I'm sending the file.",
      "Look at the details before you decide."
    ],
    "choices": [
      "I want to check the file details first.",
      "All right. I'll consider accepting it.",
      "I don't know if I should take a file from you."
    ],
    "branches": [
      "Good. Check what TRACE can tell you. It won't tell us everything, but it's a start.",
      "Make that decision yourself. Don't let me talk you into it.",
      "Then don't accept it yet. The request can stay there while you think."
    ],
    "follow": [
      "I'm not asking you to trust the sender.",
      "I'm asking you to examine what we can verify."
    ]
  },
  {
    "intro": [
      "Okay. You have the file.",
      "That doesn't mean we can read it yet."
    ],
    "choices": [
      "Can TRACE recover Daniel's messages?",
      "What happens if the file is damaged?",
      "How much of the phone do you expect to recover?"
    ],
    "branches": [
      "That's what I'm hoping for. Even one conversation could tell us where to look next.",
      "We might get fragments. Or nothing useful at all. Damaged doesn't always mean completely unreadable.",
      "I don't know. I wouldn't even give you a percentage until we've tried."
    ],
    "follow": [
      "Whatever comes back, remember we're looking at a copy.",
      "Missing information doesn't mean nothing happened."
    ]
  },
  {
    "intro": [],
    "choices": [
      "Let's start the recovery.",
      "Is there a risk of losing the data?",
      "Will I be able to see the results myself?"
    ],
    "branches": [
      "Open the file in TRACE. You'll see the option to start.",
      "TRACE is working on the accepted local copy. It won't rewrite the original file.",
      "Yes. Whatever survives will appear in the recovered sections."
    ],
    "follow": [
      "I'll stay here.",
      "Tell me what happens."
    ]
  },
  {
    "intro": [
      "Something happened?",
      "You're back sooner than I expected."
    ],
    "choices": [
      "It stopped at twenty percent.",
      "Recovery failed. I couldn't get the whole archive.",
      "Why would it stop so early?"
    ],
    "branches": [
      "Twenty percent? That's further than I got.",
      "Not completely. If you've got readable fragments, we still have something to work with.",
      "Could be damage, encryption or something missing from the copy. I can't tell you which."
    ],
    "follow": [
      "I know it's frustrating.",
      "But don't dismiss what survived."
    ]
  },
  {
    "intro": [
      "What can you open?"
    ],
    "choices": [
      "Messages, Notes and Activity Logs.",
      "Only three sections. The rest is locked.",
      "I can open some data, but I don't know what any of it means yet."
    ],
    "branches": [
      "That's good. Messages will tell us what Daniel was saying. Notes might tell us what he wasn't saying.",
      "Three sections are more than we had yesterday.",
      "That's fine. Read first. You don't have to solve anything immediately."
    ],
    "follow": [
      "Don't look for a dramatic confession.",
      "Look for things that don't quite fit."
    ]
  },
  {
    "intro": [],
    "choices": [
      "Should I start with his conversations?",
      "What if everything looks ordinary?",
      "Do you think Daniel knew he was in danger?"
    ],
    "branches": [
      "That's where I'd start. Pay attention to what people were expecting him to do.",
      "Ordinary details can matter. Especially when someone's routine suddenly changes.",
      "I don't know. And I don't want to make you think we have proof of something we don't."
    ],
    "follow": [
      "Read what survived.",
      "Then we can compare it with what Sophie has already told you."
    ]
  },
  {
    "intro": [],
    "choices": [
      "I'll go through the recovered conversations.",
      "I want to find out what Daniel was hiding.",
      "I'll look through it. But I'm still not sure about you."
    ],
    "branches": [
      "Take your time. I want to know what stands out to you, not just what the file says.",
      "Then start with the people closest to him. They may have noticed things he never explained.",
      "Fair enough. You can question me and still examine the evidence."
    ],
    "follow": [
      "Tell me when you've found something worth talking about.",
      "I'll be here."
    ]
  }
] as const
