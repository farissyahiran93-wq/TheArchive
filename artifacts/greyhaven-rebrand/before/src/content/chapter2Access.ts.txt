// Imported from the owner's Access Arc v1.0. Claims remain unverified.
export type AccessOption = { id: string; text: string; next: string }
export type AccessNode = { kind: 'npc'; text: string; next: string } | { kind: 'choice'; options: AccessOption[] } | { kind: 'reference'; yes: string; no: string } | { kind: 'package' | 'declined' | 'offline' }
export const accessNodes: Record<string, AccessNode> = {
  "U01-COMMON-0": {
    "kind": "npc",
    "text": "I know you're going to ask whether I have him hidden somewhere.",
    "next": "U01-COMMON-1"
  },
  "U01-COMMON-1": {
    "kind": "npc",
    "text": "I don't know where Daniel is.",
    "next": "U01-COMMON-2"
  },
  "U01-COMMON-2": {
    "kind": "npc",
    "text": "And I'm not going to pretend I do.",
    "next": "U02"
  },
  "U01_A_FOLLOWUP_A-0": {
    "kind": "npc",
    "text": "I wasn't trying to answer that yet.",
    "next": "U01-COMMON-0"
  },
  "U01_A_FOLLOWUP_B-0": {
    "kind": "npc",
    "text": "Fair. You have no reason to like this conversation.",
    "next": "U01-COMMON-0"
  },
  "U01_A_FOLLOWUP": {
    "kind": "choice",
    "options": [
      {
        "id": "U01_A_FOLLOWUP_A",
        "text": "That doesn't answer anything.",
        "next": "U01_A_FOLLOWUP_A-0"
      },
      {
        "id": "U01_A_FOLLOWUP_B",
        "text": "Then stop hiding behind an unknown number.",
        "next": "U01_A_FOLLOWUP_B-0"
      }
    ]
  },
  "U01_A-0": {
    "kind": "npc",
    "text": "Someone who knows you've been asking questions.",
    "next": "U01_A_FOLLOWUP"
  },
  "U01_B_FOLLOWUP_A-0": {
    "kind": "npc",
    "text": "There's a limit to what I can explain over this number.",
    "next": "U01-COMMON-0"
  },
  "U01_B_FOLLOWUP_B-0": {
    "kind": "npc",
    "text": "To show you where you might be missing something.",
    "next": "U01-COMMON-0"
  },
  "U01_B_FOLLOWUP": {
    "kind": "choice",
    "options": [
      {
        "id": "U01_B_FOLLOWUP_A",
        "text": "How do you know what I've been doing?",
        "next": "U01_B_FOLLOWUP_A-0"
      },
      {
        "id": "U01_B_FOLLOWUP_B",
        "text": "What do you want from me?",
        "next": "U01_B_FOLLOWUP_B-0"
      }
    ]
  },
  "U01_B-0": {
    "kind": "npc",
    "text": "Daniel. And the way you've been trying to piece together what happened to him.",
    "next": "U01_B_FOLLOWUP"
  },
  "U01_C-0": {
    "kind": "npc",
    "text": "Yes.",
    "next": "U01_C-1"
  },
  "U01_C-1": {
    "kind": "npc",
    "text": "And I know what you're going to ask next.",
    "next": "U01-COMMON-0"
  },
  "U01": {
    "kind": "choice",
    "options": [
      {
        "id": "U01_A",
        "text": "Who is this?",
        "next": "U01_A-0"
      },
      {
        "id": "U01_B",
        "text": "What are you talking about?",
        "next": "U01_B-0"
      },
      {
        "id": "U01_C",
        "text": "Is this about Daniel?",
        "next": "U01_C-0"
      }
    ]
  },
  "U02-COMMON-0": {
    "kind": "npc",
    "text": "Let me ask you something.",
    "next": "U02-COMMON-1"
  },
  "U02-COMMON-1": {
    "kind": "npc",
    "text": "You've spoken to the people around him, haven't you?",
    "next": "U02-COMMON-2"
  },
  "U02-COMMON-2": {
    "kind": "npc",
    "text": "Maya remembers the man she was going to marry.",
    "next": "U02-COMMON-3"
  },
  "U02-COMMON-3": {
    "kind": "npc",
    "text": "Sophie remembers her brother.",
    "next": "U02-COMMON-4"
  },
  "U02-COMMON-4": {
    "kind": "npc",
    "text": "Lucas remembers a friend he thought he knew.",
    "next": "U02-COMMON-5"
  },
  "U02-COMMON-5": {
    "kind": "npc",
    "text": "Eli may have known a side of Daniel the others didn't see.",
    "next": "U02-COMMON-6"
  },
  "U02-COMMON-6": {
    "kind": "npc",
    "text": "None of that means anyone's lying.",
    "next": "U02-COMMON-7"
  },
  "U02-COMMON-7": {
    "kind": "npc",
    "text": "But they can't all have seen the whole picture.",
    "next": "U03"
  },
  "U02_A-0": {
    "kind": "npc",
    "text": "Because he tried to keep a set of records from being overwritten.",
    "next": "U02_A-1"
  },
  "U02_A-1": {
    "kind": "npc",
    "text": "I know the attempt happened. I don't know what happened after.",
    "next": "U02-COMMON-0"
  },
  "U02_B-0": {
    "kind": "npc",
    "text": "You're right.",
    "next": "U02_B-1"
  },
  "U02_B-1": {
    "kind": "npc",
    "text": "It sounds convenient. I'd think the same thing in your position.",
    "next": "U02_B-2"
  },
  "U02_B-2": {
    "kind": "npc",
    "text": "All I can say is I know about a preservation attempt. Not Daniel's location.",
    "next": "U02-COMMON-0"
  },
  "U02_C-0": {
    "kind": "npc",
    "text": "You can.",
    "next": "U02_C-1"
  },
  "U02_C-1": {
    "kind": "npc",
    "text": "Save the messages first. Whoever receives the report should be able to see what I actually said.",
    "next": "U02_C-2"
  },
  "U02_C-2": {
    "kind": "npc",
    "text": "For what it's worth, I can't tell you where Daniel is. I know about an attempt to preserve his records.",
    "next": "U02-COMMON-0"
  },
  "U02": {
    "kind": "choice",
    "options": [
      {
        "id": "U02_A",
        "text": "Then how do you know about him?",
        "next": "U02_A-0"
      },
      {
        "id": "U02_B",
        "text": "That's exactly what someone involved would say.",
        "next": "U02_B-0"
      },
      {
        "id": "U02_C",
        "text": "I should report this number.",
        "next": "U02_C-0"
      }
    ]
  },
  "U03-COMMON-0": {
    "kind": "npc",
    "text": "Imagine somebody opening your phone tomorrow.",
    "next": "U03-COMMON-1"
  },
  "U03-COMMON-1": {
    "kind": "npc",
    "text": "They'd find conversations that end in the middle. Photos without explanations.",
    "next": "U03-COMMON-2"
  },
  "U03-COMMON-2": {
    "kind": "npc",
    "text": "Notes you'd forgotten you wrote.",
    "next": "U03-COMMON-3"
  },
  "U03-COMMON-3": {
    "kind": "npc",
    "text": "They could build a story about you from all of it.",
    "next": "U03-COMMON-4"
  },
  "U03-COMMON-4": {
    "kind": "npc",
    "text": "They'd probably get parts of it wrong.",
    "next": "U03-COMMON-5"
  },
  "U03-COMMON-5": {
    "kind": "npc",
    "text": "Daniel left behind something like that.",
    "next": "U03-COMMON-6"
  },
  "U03-COMMON-6": {
    "kind": "npc",
    "text": "Not his actual phone.",
    "next": "U03-COMMON-7"
  },
  "U03-COMMON-7": {
    "kind": "npc",
    "text": "A mirror. An incomplete copy of certain records.",
    "next": "U03-COMMON-8"
  },
  "U03-COMMON-8": {
    "kind": "npc",
    "text": "Some older than others. Some possibly changed.",
    "next": "U04"
  },
  "U03_A_FOLLOWUP_A-0": {
    "kind": "npc",
    "text": "More than you should be comfortable with. I know.",
    "next": "U03-COMMON-0"
  },
  "U03_A_FOLLOWUP_B-0": {
    "kind": "npc",
    "text": "About some things, yes. I won't dress a guess up as a fact.",
    "next": "U03-COMMON-0"
  },
  "U03_A_FOLLOWUP": {
    "kind": "choice",
    "options": [
      {
        "id": "U03_A_FOLLOWUP_A",
        "text": "That's still a lot of information.",
        "next": "U03_A_FOLLOWUP_A-0"
      },
      {
        "id": "U03_A_FOLLOWUP_B",
        "text": "So you're guessing about us.",
        "next": "U03_A_FOLLOWUP_B-0"
      }
    ]
  },
  "U03_A-0": {
    "kind": "npc",
    "text": "Some of those names exist in the recovered conversation indexes.",
    "next": "U03_A-1"
  },
  "U03_A-1": {
    "kind": "npc",
    "text": "That tells me who was connected to Daniel. Not everything you've said to them.",
    "next": "U03_A_FOLLOWUP"
  },
  "U03_B-0": {
    "kind": "npc",
    "text": "I can see some names and connections in the recovered data.",
    "next": "U03_B-1"
  },
  "U03_B-1": {
    "kind": "npc",
    "text": "I can't prove to you what else I have or haven't seen.",
    "next": "U03_B-2"
  },
  "U03_B-2": {
    "kind": "npc",
    "text": "You should treat that as a reason not to trust me blindly.",
    "next": "U03-COMMON-0"
  },
  "U03_C-0": {
    "kind": "npc",
    "text": "A person isn't just the version their friends remember.",
    "next": "U03_C-1"
  },
  "U03_C-1": {
    "kind": "npc",
    "text": "And a missing person doesn't stop having a private life.",
    "next": "U03-COMMON-0"
  },
  "U03": {
    "kind": "choice",
    "options": [
      {
        "id": "U03_A",
        "text": "How do you know who I've been talking to?",
        "next": "U03_A-0"
      },
      {
        "id": "U03_B",
        "text": "Have you been reading my messages?",
        "next": "U03_B-0"
      },
      {
        "id": "U03_C",
        "text": "What's your point?",
        "next": "U03_C-0"
      }
    ]
  },
  "U04-COMMON-0": {
    "kind": "npc",
    "text": "The point isn't that I can hand you the truth.",
    "next": "U04-COMMON-1"
  },
  "U04-COMMON-1": {
    "kind": "npc",
    "text": "It's that you could compare what people remember with what was written down.",
    "next": "U04-COMMON-2"
  },
  "U04-COMMON-2": {
    "kind": "npc",
    "text": "Daniel didn't keep everything in one place.",
    "next": "U04-COMMON-3"
  },
  "U04-COMMON-3": {
    "kind": "npc",
    "text": "The records he was worried about weren't all in one place either.",
    "next": "U04-COMMON-4"
  },
  "U04-COMMON-4": {
    "kind": "npc",
    "text": "This mirror won't give you an answer by itself.",
    "next": "U04-COMMON-5"
  },
  "U04-COMMON-5": {
    "kind": "npc",
    "text": "But it may give you better questions.",
    "next": "U04-COMMON-6"
  },
  "U04-COMMON-6": {
    "kind": "npc",
    "text": "I can give you access.",
    "next": "U05"
  },
  "U04_A-0": {
    "kind": "npc",
    "text": "Parts of the data. Not the device itself.",
    "next": "U04_A-1"
  },
  "U04_A-1": {
    "kind": "npc",
    "text": "Message indexes. Mail. Notes. Media records.",
    "next": "U04-COMMON-0"
  },
  "U04_B-0": {
    "kind": "npc",
    "text": "I can't give you a source you can verify.",
    "next": "U04_B-1"
  },
  "U04_B-1": {
    "kind": "npc",
    "text": "You should assume there are things about this access I haven't told you.",
    "next": "U04_B-2"
  },
  "U04_B-2": {
    "kind": "npc",
    "text": "The copy contains message indexes, mail, notes and media records. That much you can inspect yourself.",
    "next": "U04-COMMON-0"
  },
  "U04-YES-0": {
    "kind": "npc",
    "text": "One reference in the surviving index is marked 7-14.",
    "next": "U04-YES-1"
  },
  "U04-YES-1": {
    "kind": "npc",
    "text": "But anyone with the same records could know that. It doesn't prove who I am.",
    "next": "U04-YES-2"
  },
  "U04-YES-2": {
    "kind": "npc",
    "text": "If you inspect the copy, you'll see what it contains. That still won't prove where it came from.",
    "next": "U04-COMMON-0"
  },
  "U04-NO-0": {
    "kind": "npc",
    "text": "I could send you a screenshot. I could also have made it.",
    "next": "U04-NO-1"
  },
  "U04-NO-1": {
    "kind": "npc",
    "text": "If you inspect the copy, you'll see what it contains. That still won't prove where it came from.",
    "next": "U04-COMMON-0"
  },
  "U04-REFERENCE": {
    "kind": "reference",
    "yes": "U04-YES-0",
    "no": "U04-NO-0"
  },
  "U04_C-0": {
    "kind": "npc",
    "text": "A good demand.",
    "next": "U04-REFERENCE"
  },
  "U04": {
    "kind": "choice",
    "options": [
      {
        "id": "U04_A",
        "text": "You have a copy of Daniel's phone?",
        "next": "U04_A-0"
      },
      {
        "id": "U04_B",
        "text": "Did you steal his data?",
        "next": "U04_B-0"
      },
      {
        "id": "U04_C",
        "text": "Prove it.",
        "next": "U04_C-0"
      }
    ]
  },
  "U05-COMMON-0": {
    "kind": "npc",
    "text": "One warning before you decide.",
    "next": "U05-COMMON-1"
  },
  "U05-COMMON-1": {
    "kind": "npc",
    "text": "Some of what you'll see was never meant for you.",
    "next": "U05-COMMON-2"
  },
  "U05-COMMON-2": {
    "kind": "npc",
    "text": "Old arguments. Unsent messages. Things Daniel may have regretted writing.",
    "next": "U05-COMMON-3"
  },
  "U05-COMMON-3": {
    "kind": "npc",
    "text": "And fragments that might make innocent people look guilty when they're taken out of context.",
    "next": "U05-COMMON-4"
  },
  "U05-COMMON-4": {
    "kind": "npc",
    "text": "You decide what to open. You decide what to share.",
    "next": "U06"
  },
  "U05_A-0": {
    "kind": "npc",
    "text": "Daniel contacted you.",
    "next": "U05_A-1"
  },
  "U05_A-1": {
    "kind": "npc",
    "text": "I don't know why he chose you. You probably don't, either.",
    "next": "U05_A-2"
  },
  "U05_A-2": {
    "kind": "npc",
    "text": "But you answered him.",
    "next": "U05-COMMON-0"
  },
  "U05_B-0": {
    "kind": "npc",
    "text": "You don't know that I haven't tried.",
    "next": "U05_B-1"
  },
  "U05_B-1": {
    "kind": "npc",
    "text": "I'm not asking you to finish something on my behalf.",
    "next": "U05_B-2"
  },
  "U05_B-2": {
    "kind": "npc",
    "text": "I'm offering you access I can't make useful for you from here.",
    "next": "U05-COMMON-0"
  },
  "U05_C-0": {
    "kind": "npc",
    "text": "Right now? Nothing you can send me.",
    "next": "U05_C-1"
  },
  "U05_C-1": {
    "kind": "npc",
    "text": "Later, you might find something I want to know.",
    "next": "U05_C-2"
  },
  "U05_C-2": {
    "kind": "npc",
    "text": "Don't promise me anything. Especially not before you see it.",
    "next": "U05-COMMON-0"
  },
  "U05": {
    "kind": "choice",
    "options": [
      {
        "id": "U05_A",
        "text": "Why give it to me?",
        "next": "U05_A-0"
      },
      {
        "id": "U05_B",
        "text": "Why don't you investigate it yourself?",
        "next": "U05_B-0"
      },
      {
        "id": "U05_C",
        "text": "What do you want in return?",
        "next": "U05_C-0"
      }
    ]
  },
  "U06-COMMON-0": {
    "kind": "npc",
    "text": "There's something else you need to understand.",
    "next": "U06-COMMON-1"
  },
  "U06-COMMON-1": {
    "kind": "npc",
    "text": "A copy can be incomplete. It can also be arranged to mislead you.",
    "next": "U06B"
  },
  "U06_A-0": {
    "kind": "npc",
    "text": "It is.",
    "next": "U06_A-1"
  },
  "U06_A-1": {
    "kind": "npc",
    "text": "I'm not going to pretend otherwise.",
    "next": "U06_A-2"
  },
  "U06_A-2": {
    "kind": "npc",
    "text": "If you open it, be prepared to question your own reasons, too.",
    "next": "U06-COMMON-0"
  },
  "U06_B-0": {
    "kind": "npc",
    "text": "Then remember that finding something isn't the same as understanding it.",
    "next": "U06_B-1"
  },
  "U06_B-1": {
    "kind": "npc",
    "text": "And it doesn't mean you have to show it to everyone.",
    "next": "U06-COMMON-0"
  },
  "U06_C-0": {
    "kind": "npc",
    "text": "I can't promise they won't.",
    "next": "U06_C-1"
  },
  "U06_C-1": {
    "kind": "npc",
    "text": "I also can't tell you what they'll think when they do.",
    "next": "U06_C-2"
  },
  "U06_C-2": {
    "kind": "npc",
    "text": "That's a risk you should decide whether to take.",
    "next": "U06-COMMON-0"
  },
  "U06": {
    "kind": "choice",
    "options": [
      {
        "id": "U06_A",
        "text": "That sounds like a serious invasion of privacy.",
        "next": "U06_A-0"
      },
      {
        "id": "U06_B",
        "text": "If it helps find Daniel, I'll look.",
        "next": "U06_B-0"
      },
      {
        "id": "U06_C",
        "text": "What if someone finds out I'm using it?",
        "next": "U06_C-0"
      }
    ]
  },
  "U06B-COMMON-0": {
    "kind": "npc",
    "text": "And when two copies disagree, don't automatically trust the newer one.",
    "next": "U06B-COMMON-1"
  },
  "U06B-COMMON-1": {
    "kind": "npc",
    "text": "The Archive is already installed on your device.",
    "next": "U06B-COMMON-2"
  },
  "U06B-COMMON-2": {
    "kind": "npc",
    "text": "It was never fully activated.",
    "next": "U06B-COMMON-3"
  },
  "U06B-COMMON-3": {
    "kind": "npc",
    "text": "I can send the missing access package.",
    "next": "U06B-COMMON-4"
  },
  "U06B-COMMON-4": {
    "kind": "npc",
    "text": "After that, it's your decision what to do with it.",
    "next": "PACKAGE"
  },
  "U06B_A-0": {
    "kind": "npc",
    "text": "You don't.",
    "next": "U06B_A-1"
  },
  "U06B_A-1": {
    "kind": "npc",
    "text": "Check dates and context. Compare things from different sources.",
    "next": "U06B-COMMON-0"
  },
  "U06B_B-0": {
    "kind": "npc",
    "text": "Sometimes you can't.",
    "next": "U06B_B-1"
  },
  "U06B_B-1": {
    "kind": "npc",
    "text": "Look for gaps. Timestamps that don't line up. Two copies of the same thing.",
    "next": "U06B-COMMON-0"
  },
  "U06B_C-0": {
    "kind": "npc",
    "text": "Not enough to treat it as a witness.",
    "next": "U06B_C-1"
  },
  "U06B_C-1": {
    "kind": "npc",
    "text": "It's material. You still have to work out what it means.",
    "next": "U06B-COMMON-0"
  },
  "U06B": {
    "kind": "choice",
    "options": [
      {
        "id": "U06B_A",
        "text": "How do I know you're not manipulating what I see?",
        "next": "U06B_A-0"
      },
      {
        "id": "U06B_B",
        "text": "How can I tell if a record was changed?",
        "next": "U06B_B-0"
      },
      {
        "id": "U06B_C",
        "text": "So you don't trust the mirror either?",
        "next": "U06B_C-0"
      }
    ]
  },
  "PACKAGE": {
    "kind": "package"
  },
  "U07Q_A-0": {
    "kind": "npc",
    "text": "I can't give you a name you can verify.",
    "next": "U07Q_A-1"
  },
  "U07Q_A-1": {
    "kind": "npc",
    "text": "If that's a deal-breaker, don't open it.",
    "next": "PACKAGE"
  },
  "U07Q_B-0": {
    "kind": "npc",
    "text": "The interface will say you can revoke this session.",
    "next": "U07Q_B-1"
  },
  "U07Q_B-1": {
    "kind": "npc",
    "text": "I can't promise revoking it would erase every trace it left.",
    "next": "PACKAGE"
  },
  "U07Q_C-0": {
    "kind": "npc",
    "text": "The Archive gains a device mirror.",
    "next": "U07Q_C-1"
  },
  "U07Q_C-1": {
    "kind": "npc",
    "text": "Messages gets a passive relay component. It won't have anything to display until a relay is available.",
    "next": "PACKAGE"
  },
  "DECLINE-0": {
    "kind": "npc",
    "text": "That's a reasonable decision.",
    "next": "DECLINE-1"
  },
  "DECLINE-1": {
    "kind": "npc",
    "text": "I'm leaving the package in this thread. You can inspect it again later.",
    "next": "DECLINE-2"
  },
  "DECLINE-2": {
    "kind": "npc",
    "text": "I won't install it for you.",
    "next": "DECLINED"
  },
  "DECLINED": {
    "kind": "declined"
  },
  "ACCEPT-0": {
    "kind": "npc",
    "text": "You don't sound convinced.",
    "next": "U07_ACK"
  },
  "U07_ACK_A-0": {
    "kind": "npc",
    "text": "Good. Stay that way until you can verify something.",
    "next": "U08-INTRO-0"
  },
  "U07_ACK_B-0": {
    "kind": "npc",
    "text": "That's more than fair.",
    "next": "U08-INTRO-0"
  },
  "U07_ACK_C-0": {
    "kind": "npc",
    "text": "I won't.",
    "next": "U08-INTRO-0"
  },
  "U07_ACK": {
    "kind": "choice",
    "options": [
      {
        "id": "U07_ACK_A",
        "text": "I'm not.",
        "next": "U07_ACK_A-0"
      },
      {
        "id": "U07_ACK_B",
        "text": "I'll decide after I see it.",
        "next": "U07_ACK_B-0"
      },
      {
        "id": "U07_ACK_C",
        "text": "Don't mistake this for trust.",
        "next": "U07_ACK_C-0"
      }
    ]
  },
  "U08-INTRO-0": {
    "kind": "npc",
    "text": "One more thing.",
    "next": "U08-INTRO-1"
  },
  "U08-INTRO-1": {
    "kind": "npc",
    "text": "Don't mistake access for proof.",
    "next": "U08-INTRO-2"
  },
  "U08-INTRO-2": {
    "kind": "npc",
    "text": "Some records are incomplete. Some may have been changed.",
    "next": "U08-INTRO-3"
  },
  "U08-INTRO-3": {
    "kind": "npc",
    "text": "And the hardest ones to read will probably be the ones about people you know.",
    "next": "U08"
  },
  "U08-COMMON-0": {
    "kind": "npc",
    "text": "Start with his phone.",
    "next": "U08-COMMON-1"
  },
  "U08-COMMON-1": {
    "kind": "npc",
    "text": "Don't look for the strangest thing first.",
    "next": "U08-COMMON-2"
  },
  "U08-COMMON-2": {
    "kind": "npc",
    "text": "Look for the thing that doesn't belong.",
    "next": "U08-COMMON-3"
  },
  "U08-COMMON-3": {
    "kind": "npc",
    "text": "Sometimes that's harder to notice.",
    "next": "U08-COMMON-4"
  },
  "U08-COMMON-4": {
    "kind": "npc",
    "text": "And if you find something...",
    "next": "U08-COMMON-5"
  },
  "U08-COMMON-5": {
    "kind": "npc",
    "text": "Think before you tell the others.",
    "next": "U08-COMMON-6"
  },
  "U08-COMMON-6": {
    "kind": "npc",
    "text": "They knew Daniel. That doesn't mean they knew everything.",
    "next": "OFFLINE"
  },
  "U08_A_FOLLOWUP_A-0": {
    "kind": "npc",
    "text": "You'll find that happens a lot with me.",
    "next": "U08-COMMON-0"
  },
  "U08_A_FOLLOWUP_B-0": {
    "kind": "npc",
    "text": "If I can. I won't promise a time.",
    "next": "U08-COMMON-0"
  },
  "U08_A_FOLLOWUP": {
    "kind": "choice",
    "options": [
      {
        "id": "U08_A_FOLLOWUP_A",
        "text": "That's not very helpful.",
        "next": "U08_A_FOLLOWUP_A-0"
      },
      {
        "id": "U08_A_FOLLOWUP_B",
        "text": "Will you actually answer?",
        "next": "U08_A_FOLLOWUP_B-0"
      }
    ]
  },
  "U08_A-0": {
    "kind": "npc",
    "text": "You can try.",
    "next": "U08_A_FOLLOWUP"
  },
  "U08_B-0": {
    "kind": "npc",
    "text": "Daniel knew some records could be preserved.",
    "next": "U08_B-1"
  },
  "U08_B-1": {
    "kind": "npc",
    "text": "I can't tell you how much he knew about this interface.",
    "next": "U08_B-2"
  },
  "U08_B-2": {
    "kind": "npc",
    "text": "Don't turn that gap into an answer.",
    "next": "U08-COMMON-0"
  },
  "U08_C-0": {
    "kind": "npc",
    "text": "You shouldn't. Not yet.",
    "next": "U08_C-1"
  },
  "U08_C-1": {
    "kind": "npc",
    "text": "Not me, and not a copy you can't authenticate.",
    "next": "U08_C-2"
  },
  "U08_C-2": {
    "kind": "npc",
    "text": "Use it to find questions you can verify somewhere else.",
    "next": "U08-COMMON-0"
  },
  "U08": {
    "kind": "choice",
    "options": [
      {
        "id": "U08_A",
        "text": "Can I contact you again?",
        "next": "U08_A-0"
      },
      {
        "id": "U08_B",
        "text": "Did Daniel know about The Archive?",
        "next": "U08_B-0"
      },
      {
        "id": "U08_C",
        "text": "Why should I trust any of this?",
        "next": "U08_C-0"
      }
    ]
  },
  "OFFLINE": {
    "kind": "offline"
  }
}
export const accessGroupLines = [
  {
    "sender": "maya",
    "text": "I think we need to get everyone on the same page."
  },
  {
    "sender": "maya",
    "text": "Not another argument. Just what we actually know."
  },
  {
    "sender": "lucas",
    "text": "I'm here."
  },
  {
    "sender": "lucas",
    "text": "That's not a promise I won't argue, though."
  },
  {
    "sender": "eli",
    "text": "I'm around."
  },
  {
    "sender": "eli",
    "text": "If we're comparing anything technical, send the exact wording. Not screenshots of screenshots."
  },
  {
    "sender": "sophie",
    "text": "I can stay for a bit."
  },
  {
    "sender": "sophie",
    "text": "I'd rather we talk together than keep guessing separately."
  },
  {
    "sender": "nora",
    "text": "Here."
  },
  {
    "sender": "nora",
    "text": "One thing at a time. Source first, conclusion second."
  },
  {
    "sender": "maya",
    "text": "Okay. Everyone's here."
  },
  {
    "sender": "maya",
    "text": "Can we start?"
  }
] as const

export const accessPackageQuestions: Record<string, string> = {
  "U07Q_A": "Who made this package?",
  "U07Q_B": "Can I uninstall it afterward?",
  "U07Q_C": "What exactly will change on my phone?"
}
export const accessPlayerLines = {
  "reject": "No. I'm not opening an unverified package.",
  "accept": "Fine. I'll open it.",
  "R_A": "Wait. Who are you?",
  "R_B": "What aren't you telling me?"
} as const
