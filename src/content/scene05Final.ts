// Generated from docs/sources/scene05-final/FULL_SCRIPT.txt.
import type { Scene01Node } from './scene01'
export const scene05Nodes: Record<string, Scene01Node> = {
  "OPEN-S05-SOPHIE-END": {
    "id": "OPEN-S05-SOPHIE-END",
    "kind": "event",
    "event": "s05-thread-end",
    "actor": "sophie"
  },
  "OPEN-S05-GROUP-END": {
    "id": "OPEN-S05-GROUP-END",
    "kind": "event",
    "event": "s05-thread-end",
    "actor": "maya"
  },
  "OPEN-S05-AFTER-05-4": {
    "id": "OPEN-S05-AFTER-05-4",
    "kind": "npc",
    "sender": "sophie",
    "text": "I don't even know why I'm telling you that.",
    "channel": "sophie",
    "next": "OPEN-S05-C06",
    "heardFacts": [
      "OPEN-S05-AFTER-05-4:reported"
    ]
  },
  "OPEN-S05-AFTER-05-4-WAIT": {
    "id": "OPEN-S05-AFTER-05-4-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-AFTER-05-4"
  },
  "OPEN-S05-AFTER-05-3": {
    "id": "OPEN-S05-AFTER-05-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "I used to give him such a hard time about it.",
    "channel": "sophie",
    "next": "OPEN-S05-AFTER-05-4-WAIT",
    "heardFacts": [
      "OPEN-S05-AFTER-05-3:reported"
    ]
  },
  "OPEN-S05-AFTER-05-3-WAIT": {
    "id": "OPEN-S05-AFTER-05-3-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-AFTER-05-3"
  },
  "OPEN-S05-AFTER-05-2": {
    "id": "OPEN-S05-AFTER-05-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "A bus ticket in a cookbook. A coffee receipt behind the TV.",
    "channel": "sophie",
    "next": "OPEN-S05-AFTER-05-3-WAIT",
    "heardFacts": [
      "OPEN-S05-AFTER-05-2:reported"
    ]
  },
  "OPEN-S05-AFTER-05-2-WAIT": {
    "id": "OPEN-S05-AFTER-05-2-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-AFTER-05-2"
  },
  "OPEN-S05-AFTER-05-1": {
    "id": "OPEN-S05-AFTER-05-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Daniel used to keep receipts in the strangest places.",
    "channel": "sophie",
    "next": "OPEN-S05-AFTER-05-2-WAIT",
    "heardFacts": [
      "OPEN-S05-AFTER-05-1:reported"
    ]
  },
  "OPEN-S05-AFTER-05-1-WAIT": {
    "id": "OPEN-S05-AFTER-05-1-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-AFTER-05-1"
  },
  "OPEN-S05-C05-A-EFFECT": {
    "id": "OPEN-S05-C05-A-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "trust": 2
      }
    },
    "next": "OPEN-S05-AFTER-05-1-WAIT"
  },
  "OPEN-S05-C05-A-3": {
    "id": "OPEN-S05-C05-A-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "I think I just wanted one thing to be simple.",
    "channel": "sophie",
    "next": "OPEN-S05-C05-A-EFFECT",
    "heardFacts": [
      "OPEN-S05-C05-A-3:reported"
    ]
  },
  "OPEN-S05-C05-A-3-WAIT": {
    "id": "OPEN-S05-C05-A-3-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-C05-A-3"
  },
  "OPEN-S05-C05-A-2": {
    "id": "OPEN-S05-C05-A-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Sorry. Not at you.",
    "channel": "sophie",
    "next": "OPEN-S05-C05-A-3-WAIT",
    "heardFacts": [
      "OPEN-S05-C05-A-2:reported"
    ]
  },
  "OPEN-S05-C05-A-2-WAIT": {
    "id": "OPEN-S05-C05-A-2-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-C05-A-2"
  },
  "OPEN-S05-C05-A-1": {
    "id": "OPEN-S05-C05-A-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "That's such an annoying answer.",
    "channel": "sophie",
    "next": "OPEN-S05-C05-A-2-WAIT",
    "heardFacts": [
      "OPEN-S05-C05-A-1:reported"
    ]
  },
  "OPEN-S05-C05-A-1-WAIT": {
    "id": "OPEN-S05-C05-A-1-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-C05-A-1"
  },
  "OPEN-S05-C05-B-EFFECT": {
    "id": "OPEN-S05-C05-B-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "affinity": 2
      }
    },
    "next": "OPEN-S05-AFTER-05-1-WAIT"
  },
  "OPEN-S05-C05-B-3": {
    "id": "OPEN-S05-C05-B-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "Which is ridiculous. I know.",
    "channel": "sophie",
    "next": "OPEN-S05-C05-B-EFFECT",
    "heardFacts": [
      "OPEN-S05-C05-B-3:reported"
    ]
  },
  "OPEN-S05-C05-B-3-WAIT": {
    "id": "OPEN-S05-C05-B-3-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-C05-B-3"
  },
  "OPEN-S05-C05-B-2": {
    "id": "OPEN-S05-C05-B-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "I keep reading the same sentence like it'll turn into a different one.",
    "channel": "sophie",
    "next": "OPEN-S05-C05-B-3-WAIT",
    "heardFacts": [
      "OPEN-S05-C05-B-2:reported"
    ]
  },
  "OPEN-S05-C05-B-2-WAIT": {
    "id": "OPEN-S05-C05-B-2-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-C05-B-2"
  },
  "OPEN-S05-C05-B-1": {
    "id": "OPEN-S05-C05-B-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "It does.",
    "channel": "sophie",
    "next": "OPEN-S05-C05-B-2-WAIT",
    "heardFacts": [
      "OPEN-S05-C05-B-1:reported"
    ]
  },
  "OPEN-S05-C05-B-1-WAIT": {
    "id": "OPEN-S05-C05-B-1-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-C05-B-1"
  },
  "OPEN-S05-C05-C-EFFECT": {
    "id": "OPEN-S05-C05-C-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "trust": 1,
        "affinity": 1
      }
    },
    "next": "OPEN-S05-AFTER-05-1-WAIT"
  },
  "OPEN-S05-C05-C-2": {
    "id": "OPEN-S05-C05-C-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Weirdly, that helps more than another theory.",
    "channel": "sophie",
    "next": "OPEN-S05-C05-C-EFFECT",
    "heardFacts": [
      "OPEN-S05-C05-C-2:reported"
    ]
  },
  "OPEN-S05-C05-C-2-WAIT": {
    "id": "OPEN-S05-C05-C-2-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-C05-C-2"
  },
  "OPEN-S05-C05-C-1": {
    "id": "OPEN-S05-C05-C-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Okay.",
    "channel": "sophie",
    "next": "OPEN-S05-C05-C-2-WAIT",
    "heardFacts": [
      "OPEN-S05-C05-C-1:reported"
    ]
  },
  "OPEN-S05-C05-C-1-WAIT": {
    "id": "OPEN-S05-C05-C-1-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-C05-C-1"
  },
  "OPEN-S05-C05": {
    "id": "OPEN-S05-C05",
    "kind": "choice",
    "number": "V05",
    "channel": "sophie",
    "choices": [
      {
        "id": "a",
        "text": "It means the page says it was updated. We still don't know what changed.",
        "next": "OPEN-S05-C05-A-1-WAIT"
      },
      {
        "id": "b",
        "text": "I can see why that would bother you.",
        "next": "OPEN-S05-C05-B-1-WAIT"
      },
      {
        "id": "c",
        "text": "I haven't figured it out either.",
        "next": "OPEN-S05-C05-C-1-WAIT"
      }
    ]
  },
  "OPEN-S05-AFTER-06-3": {
    "id": "OPEN-S05-AFTER-06-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "Just tell me what it actually says. Even if it's nothing.",
    "channel": "sophie",
    "next": "OPEN-S05-C07",
    "heardFacts": [
      "OPEN-S05-AFTER-06-3:reported"
    ]
  },
  "OPEN-S05-AFTER-06-3-WAIT": {
    "id": "OPEN-S05-AFTER-06-3-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-AFTER-06-3"
  },
  "OPEN-S05-AFTER-06-2": {
    "id": "OPEN-S05-AFTER-06-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "If you find a real record of what happened to that article...",
    "channel": "sophie",
    "next": "OPEN-S05-AFTER-06-3-WAIT",
    "heardFacts": [
      "OPEN-S05-AFTER-06-2:reported"
    ]
  },
  "OPEN-S05-AFTER-06-2-WAIT": {
    "id": "OPEN-S05-AFTER-06-2-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-AFTER-06-2"
  },
  "OPEN-S05-AFTER-06-1": {
    "id": "OPEN-S05-AFTER-06-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Can I ask one favour?",
    "channel": "sophie",
    "next": "OPEN-S05-AFTER-06-2-WAIT",
    "heardFacts": [
      "OPEN-S05-AFTER-06-1:reported"
    ]
  },
  "OPEN-S05-AFTER-06-1-WAIT": {
    "id": "OPEN-S05-AFTER-06-1-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-AFTER-06-1"
  },
  "OPEN-S05-C06-A-EFFECT": {
    "id": "OPEN-S05-C06-A-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "affinity": 2
      }
    },
    "next": "OPEN-S05-BONUS-OFFER"
  },
  "OPEN-S05-C06-A-3": {
    "id": "OPEN-S05-C06-A-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "Sorry. That came out harsher than I meant.",
    "channel": "sophie",
    "next": "OPEN-S05-C06-A-EFFECT",
    "heardFacts": [
      "OPEN-S05-C06-A-3:reported"
    ]
  },
  "OPEN-S05-C06-A-3-WAIT": {
    "id": "OPEN-S05-C06-A-3-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-C06-A-3"
  },
  "OPEN-S05-C06-A-2": {
    "id": "OPEN-S05-C06-A-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "More than the big speeches people keep giving me.",
    "channel": "sophie",
    "next": "OPEN-S05-C06-A-3-WAIT",
    "heardFacts": [
      "OPEN-S05-C06-A-2:reported"
    ]
  },
  "OPEN-S05-C06-A-2-WAIT": {
    "id": "OPEN-S05-C06-A-2-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-C06-A-2"
  },
  "OPEN-S05-C06-A-1": {
    "id": "OPEN-S05-C06-A-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Yeah.",
    "channel": "sophie",
    "next": "OPEN-S05-C06-A-2-WAIT",
    "heardFacts": [
      "OPEN-S05-C06-A-1:reported"
    ]
  },
  "OPEN-S05-C06-A-1-WAIT": {
    "id": "OPEN-S05-C06-A-1-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-C06-A-1"
  },
  "OPEN-S05-C06-B-EFFECT": {
    "id": "OPEN-S05-C06-B-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "trust": 1
      }
    },
    "next": "OPEN-S05-AFTER-06-1-WAIT"
  },
  "OPEN-S05-C06-B-3": {
    "id": "OPEN-S05-C06-B-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "I don't want to turn that into a clue unless it is one.",
    "channel": "sophie",
    "next": "OPEN-S05-C06-B-EFFECT",
    "heardFacts": [
      "OPEN-S05-C06-B-3:reported"
    ]
  },
  "OPEN-S05-C06-B-3-WAIT": {
    "id": "OPEN-S05-C06-B-3-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-C06-B-3"
  },
  "OPEN-S05-C06-B-2": {
    "id": "OPEN-S05-C06-B-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "The receipts were just Daniel being Daniel.",
    "channel": "sophie",
    "next": "OPEN-S05-C06-B-3-WAIT",
    "heardFacts": [
      "OPEN-S05-C06-B-2:reported"
    ]
  },
  "OPEN-S05-C06-B-2-WAIT": {
    "id": "OPEN-S05-C06-B-2-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-C06-B-2"
  },
  "OPEN-S05-C06-B-1": {
    "id": "OPEN-S05-C06-B-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "I honestly don't know.",
    "channel": "sophie",
    "next": "OPEN-S05-C06-B-2-WAIT",
    "heardFacts": [
      "OPEN-S05-C06-B-1:reported"
    ]
  },
  "OPEN-S05-C06-B-1-WAIT": {
    "id": "OPEN-S05-C06-B-1-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-C06-B-1"
  },
  "OPEN-S05-C06-C-EFFECT": {
    "id": "OPEN-S05-C06-C-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "affinity": 2
      }
    },
    "next": "OPEN-S05-AFTER-06-1-WAIT"
  },
  "OPEN-S05-C06-C-3": {
    "id": "OPEN-S05-C06-C-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "Some days I just want to remember him without everybody taking notes.",
    "channel": "sophie",
    "next": "OPEN-S05-C06-C-EFFECT",
    "heardFacts": [
      "OPEN-S05-C06-C-3:reported"
    ]
  },
  "OPEN-S05-C06-C-3-WAIT": {
    "id": "OPEN-S05-C06-C-3-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-C06-C-3"
  },
  "OPEN-S05-C06-C-2": {
    "id": "OPEN-S05-C06-C-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "It's not that I don't want to.",
    "channel": "sophie",
    "next": "OPEN-S05-C06-C-3-WAIT",
    "heardFacts": [
      "OPEN-S05-C06-C-2:reported"
    ]
  },
  "OPEN-S05-C06-C-2-WAIT": {
    "id": "OPEN-S05-C06-C-2-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-C06-C-2"
  },
  "OPEN-S05-C06-C-1": {
    "id": "OPEN-S05-C06-C-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Thanks.",
    "channel": "sophie",
    "next": "OPEN-S05-C06-C-2-WAIT",
    "heardFacts": [
      "OPEN-S05-C06-C-1:reported"
    ]
  },
  "OPEN-S05-C06-C-1-WAIT": {
    "id": "OPEN-S05-C06-C-1-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-C06-C-1"
  },
  "OPEN-S05-C06": {
    "id": "OPEN-S05-C06",
    "kind": "choice",
    "number": "V06",
    "channel": "sophie",
    "choices": [
      {
        "id": "a",
        "text": "Maybe you just miss the little things.",
        "next": "OPEN-S05-C06-A-1-WAIT"
      },
      {
        "id": "b",
        "text": "Did he keep old versions of things too?",
        "next": "OPEN-S05-C06-B-1-WAIT"
      },
      {
        "id": "c",
        "text": "We don't have to talk about him if you don't want to.",
        "next": "OPEN-S05-C06-C-1-WAIT"
      }
    ]
  },
  "OPEN-S05-AFTER-07-2": {
    "id": "OPEN-S05-AFTER-07-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Talk later?",
    "channel": "sophie",
    "next": "OPEN-S05-C08",
    "heardFacts": [
      "OPEN-S05-AFTER-07-2:reported"
    ]
  },
  "OPEN-S05-AFTER-07-2-WAIT": {
    "id": "OPEN-S05-AFTER-07-2-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-AFTER-07-2"
  },
  "OPEN-S05-AFTER-07-1": {
    "id": "OPEN-S05-AFTER-07-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "I should go. I've got things to do before I disappear into my phone all day.",
    "channel": "sophie",
    "next": "OPEN-S05-AFTER-07-2-WAIT",
    "heardFacts": [
      "OPEN-S05-AFTER-07-1:reported"
    ]
  },
  "OPEN-S05-AFTER-07-1-WAIT": {
    "id": "OPEN-S05-AFTER-07-1-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-AFTER-07-1"
  },
  "OPEN-S05-C07-A-EFFECT": {
    "id": "OPEN-S05-C07-A-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "trust": 2
      }
    },
    "next": "OPEN-S05-AFTER-07-1-WAIT"
  },
  "OPEN-S05-C07-A-2": {
    "id": "OPEN-S05-C07-A-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "That's all I needed.",
    "channel": "sophie",
    "next": "OPEN-S05-C07-A-EFFECT",
    "heardFacts": [
      "OPEN-S05-C07-A-2:reported"
    ]
  },
  "OPEN-S05-C07-A-2-WAIT": {
    "id": "OPEN-S05-C07-A-2-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-C07-A-2"
  },
  "OPEN-S05-C07-A-1": {
    "id": "OPEN-S05-C07-A-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Thank you.",
    "channel": "sophie",
    "next": "OPEN-S05-C07-A-2-WAIT",
    "heardFacts": [
      "OPEN-S05-C07-A-1:reported"
    ]
  },
  "OPEN-S05-C07-A-1-WAIT": {
    "id": "OPEN-S05-C07-A-1-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-C07-A-1"
  },
  "OPEN-S05-C07-B-EFFECT": {
    "id": "OPEN-S05-C07-B-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "trust": 1
      }
    },
    "next": "OPEN-S05-AFTER-07-1-WAIT"
  },
  "OPEN-S05-C07-B-2": {
    "id": "OPEN-S05-C07-B-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "I'd rather wait than do this all over again tomorrow.",
    "channel": "sophie",
    "next": "OPEN-S05-C07-B-EFFECT",
    "heardFacts": [
      "OPEN-S05-C07-B-2:reported"
    ]
  },
  "OPEN-S05-C07-B-2-WAIT": {
    "id": "OPEN-S05-C07-B-2-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-C07-B-2"
  },
  "OPEN-S05-C07-B-1": {
    "id": "OPEN-S05-C07-B-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Fair.",
    "channel": "sophie",
    "next": "OPEN-S05-C07-B-2-WAIT",
    "heardFacts": [
      "OPEN-S05-C07-B-1:reported"
    ]
  },
  "OPEN-S05-C07-B-1-WAIT": {
    "id": "OPEN-S05-C07-B-1-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-C07-B-1"
  },
  "OPEN-S05-C07-C-EFFECT": {
    "id": "OPEN-S05-C07-C-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "affinity": 1,
        "trust": 1
      }
    },
    "next": "OPEN-S05-AFTER-07-1-WAIT"
  },
  "OPEN-S05-C07-C-2": {
    "id": "OPEN-S05-C07-C-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Just don't make something up to make me feel better.",
    "channel": "sophie",
    "next": "OPEN-S05-C07-C-EFFECT",
    "heardFacts": [
      "OPEN-S05-C07-C-2:reported"
    ]
  },
  "OPEN-S05-C07-C-2-WAIT": {
    "id": "OPEN-S05-C07-C-2-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-C07-C-2"
  },
  "OPEN-S05-C07-C-1": {
    "id": "OPEN-S05-C07-C-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "I'm not asking you to.",
    "channel": "sophie",
    "next": "OPEN-S05-C07-C-2-WAIT",
    "heardFacts": [
      "OPEN-S05-C07-C-1:reported"
    ]
  },
  "OPEN-S05-C07-C-1-WAIT": {
    "id": "OPEN-S05-C07-C-1-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-C07-C-1"
  },
  "OPEN-S05-C07": {
    "id": "OPEN-S05-C07",
    "kind": "choice",
    "number": "V07",
    "channel": "sophie",
    "choices": [
      {
        "id": "a",
        "text": "I will. I won't guess for you.",
        "next": "OPEN-S05-C07-A-1-WAIT"
      },
      {
        "id": "b",
        "text": "I'll tell you when there's something we can verify.",
        "next": "OPEN-S05-C07-B-1-WAIT"
      },
      {
        "id": "c",
        "text": "I can't promise I'll find it.",
        "next": "OPEN-S05-C07-C-1-WAIT"
      }
    ]
  },
  "OPEN-S05-C08-A-1": {
    "id": "OPEN-S05-C08-A-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Okay :)",
    "channel": "sophie",
    "next": "OPEN-S05-SOPHIE-END",
    "heardFacts": [
      "OPEN-S05-C08-A-1:reported"
    ]
  },
  "OPEN-S05-C08-A-1-WAIT": {
    "id": "OPEN-S05-C08-A-1-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-C08-A-1"
  },
  "OPEN-S05-C08-B-1": {
    "id": "OPEN-S05-C08-B-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "I will.",
    "channel": "sophie",
    "next": "OPEN-S05-SOPHIE-END",
    "heardFacts": [
      "OPEN-S05-C08-B-1:reported"
    ]
  },
  "OPEN-S05-C08-B-1-WAIT": {
    "id": "OPEN-S05-C08-B-1-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-C08-B-1"
  },
  "OPEN-S05-C08-C-1": {
    "id": "OPEN-S05-C08-C-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Thanks.",
    "channel": "sophie",
    "next": "OPEN-S05-SOPHIE-END",
    "heardFacts": [
      "OPEN-S05-C08-C-1:reported"
    ]
  },
  "OPEN-S05-C08-C-1-WAIT": {
    "id": "OPEN-S05-C08-C-1-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-C08-C-1"
  },
  "OPEN-S05-C08": {
    "id": "OPEN-S05-C08",
    "kind": "choice",
    "number": "V08",
    "channel": "sophie",
    "choices": [
      {
        "id": "a",
        "text": "Talk later.",
        "next": "OPEN-S05-C08-A-1-WAIT"
      },
      {
        "id": "b",
        "text": "Take your time.",
        "next": "OPEN-S05-C08-B-1-WAIT"
      },
      {
        "id": "c",
        "text": "I'll be here.",
        "next": "OPEN-S05-C08-C-1-WAIT"
      }
    ]
  },
  "OPEN-S05-C09-A-EFFECT": {
    "id": "OPEN-S05-C09-A-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "maya": {
        "trust": 2
      }
    },
    "next": "OPEN-S05-C10"
  },
  "OPEN-S05-C09-A-4": {
    "id": "OPEN-S05-C09-A-4",
    "kind": "npc",
    "sender": "maya",
    "text": "Same, honestly.",
    "channel": "group",
    "next": "OPEN-S05-C09-A-EFFECT",
    "heardFacts": [
      "OPEN-S05-C09-A-4:reported"
    ]
  },
  "OPEN-S05-C09-A-4-WAIT": {
    "id": "OPEN-S05-C09-A-4-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S05-C09-A-4"
  },
  "OPEN-S05-C09-A-3": {
    "id": "OPEN-S05-C09-A-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "I hate that you're both right.",
    "channel": "group",
    "next": "OPEN-S05-C09-A-4-WAIT",
    "heardFacts": [
      "OPEN-S05-C09-A-3:reported"
    ]
  },
  "OPEN-S05-C09-A-3-WAIT": {
    "id": "OPEN-S05-C09-A-3-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-C09-A-3"
  },
  "OPEN-S05-C09-A-3-MEMBER": {
    "id": "OPEN-S05-C09-A-3-MEMBER",
    "kind": "condition",
    "test": "s05-sophie-member",
    "next": "OPEN-S05-C09-A-3-WAIT",
    "otherwise": "OPEN-S05-C09-A-4-WAIT"
  },
  "OPEN-S05-C09-A-2": {
    "id": "OPEN-S05-C09-A-2",
    "kind": "npc",
    "sender": "maya",
    "text": "A label isn't a copy of whatever was there before.",
    "channel": "group",
    "next": "OPEN-S05-C09-A-3-MEMBER",
    "heardFacts": [
      "OPEN-S05-C09-A-2:reported"
    ]
  },
  "OPEN-S05-C09-A-2-WAIT": {
    "id": "OPEN-S05-C09-A-2-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S05-C09-A-2"
  },
  "OPEN-S05-C09-A-1": {
    "id": "OPEN-S05-C09-A-1",
    "kind": "npc",
    "sender": "maya",
    "text": "Good distinction.",
    "channel": "group",
    "next": "OPEN-S05-C09-A-2-WAIT",
    "heardFacts": [
      "OPEN-S05-C09-A-1:reported"
    ]
  },
  "OPEN-S05-C09-A-1-WAIT": {
    "id": "OPEN-S05-C09-A-1-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S05-C09-A-1"
  },
  "OPEN-S05-C09-B-EFFECT": {
    "id": "OPEN-S05-C09-B-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "maya": {
        "trust": 1
      }
    },
    "next": "OPEN-S05-C10"
  },
  "OPEN-S05-C09-B-3": {
    "id": "OPEN-S05-C09-B-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "I don't have one.",
    "channel": "group",
    "next": "OPEN-S05-C09-B-EFFECT",
    "heardFacts": [
      "OPEN-S05-C09-B-3:reported"
    ]
  },
  "OPEN-S05-C09-B-3-WAIT": {
    "id": "OPEN-S05-C09-B-3-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-C09-B-3"
  },
  "OPEN-S05-C09-B-3-MEMBER": {
    "id": "OPEN-S05-C09-B-3-MEMBER",
    "kind": "condition",
    "test": "s05-sophie-member",
    "next": "OPEN-S05-C09-B-3-WAIT",
    "otherwise": "OPEN-S05-C09-B-EFFECT"
  },
  "OPEN-S05-C09-B-2": {
    "id": "OPEN-S05-C09-B-2",
    "kind": "npc",
    "sender": "maya",
    "text": "If someone sends one, we need to know where they got it.",
    "channel": "group",
    "next": "OPEN-S05-C09-B-3-MEMBER",
    "heardFacts": [
      "OPEN-S05-C09-B-2:reported"
    ]
  },
  "OPEN-S05-C09-B-2-WAIT": {
    "id": "OPEN-S05-C09-B-2-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S05-C09-B-2"
  },
  "OPEN-S05-C09-B-1": {
    "id": "OPEN-S05-C09-B-1",
    "kind": "npc",
    "sender": "maya",
    "text": "Not one I can verify.",
    "channel": "group",
    "next": "OPEN-S05-C09-B-2-WAIT",
    "heardFacts": [
      "OPEN-S05-C09-B-1:reported"
    ]
  },
  "OPEN-S05-C09-B-1-WAIT": {
    "id": "OPEN-S05-C09-B-1-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S05-C09-B-1"
  },
  "OPEN-S05-C09-C-EFFECT": {
    "id": "OPEN-S05-C09-C-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "maya": {
        "suspicion": 1
      }
    },
    "next": "OPEN-S05-C10"
  },
  "OPEN-S05-C09-C-4": {
    "id": "OPEN-S05-C09-C-4",
    "kind": "npc",
    "sender": "maya",
    "text": "I know.",
    "channel": "group",
    "next": "OPEN-S05-C09-C-EFFECT",
    "heardFacts": [
      "OPEN-S05-C09-C-4:reported"
    ]
  },
  "OPEN-S05-C09-C-4-WAIT": {
    "id": "OPEN-S05-C09-C-4-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S05-C09-C-4"
  },
  "OPEN-S05-C09-C-3": {
    "id": "OPEN-S05-C09-C-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "It's the \"yet\" that gets me.",
    "channel": "group",
    "next": "OPEN-S05-C09-C-4-WAIT",
    "heardFacts": [
      "OPEN-S05-C09-C-3:reported"
    ]
  },
  "OPEN-S05-C09-C-3-WAIT": {
    "id": "OPEN-S05-C09-C-3-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-C09-C-3"
  },
  "OPEN-S05-C09-C-3-MEMBER": {
    "id": "OPEN-S05-C09-C-3-MEMBER",
    "kind": "condition",
    "test": "s05-sophie-member",
    "next": "OPEN-S05-C09-C-3-WAIT",
    "otherwise": "OPEN-S05-C09-C-4-WAIT"
  },
  "OPEN-S05-C09-C-2": {
    "id": "OPEN-S05-C09-C-2",
    "kind": "npc",
    "sender": "maya",
    "text": "But we shouldn't call it evidence of a rewrite yet.",
    "channel": "group",
    "next": "OPEN-S05-C09-C-3-MEMBER",
    "heardFacts": [
      "OPEN-S05-C09-C-2:reported"
    ]
  },
  "OPEN-S05-C09-C-2-WAIT": {
    "id": "OPEN-S05-C09-C-2-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S05-C09-C-2"
  },
  "OPEN-S05-C09-C-1": {
    "id": "OPEN-S05-C09-C-1",
    "kind": "npc",
    "sender": "maya",
    "text": "I understand why.",
    "channel": "group",
    "next": "OPEN-S05-C09-C-2-WAIT",
    "heardFacts": [
      "OPEN-S05-C09-C-1:reported"
    ]
  },
  "OPEN-S05-C09-C-1-WAIT": {
    "id": "OPEN-S05-C09-C-1-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S05-C09-C-1"
  },
  "OPEN-S05-C09": {
    "id": "OPEN-S05-C09",
    "kind": "choice",
    "number": "V09",
    "channel": "group",
    "choices": [
      {
        "id": "a",
        "text": "I checked the update label. We still don't have a verified history of the article.",
        "next": "OPEN-S05-C09-A-1-WAIT"
      },
      {
        "id": "b",
        "text": "Does anyone have an actual older copy of that Greyhaven Bulletin article?",
        "next": "OPEN-S05-C09-B-1-WAIT"
      },
      {
        "id": "c",
        "text": "That 'Updated: Yesterday' label is making me suspicious.",
        "next": "OPEN-S05-C09-C-1-WAIT"
      }
    ]
  },
  "OPEN-S05-C10-A-2": {
    "id": "OPEN-S05-C10-A-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Okay.",
    "channel": "group",
    "next": "OPEN-S05-GROUP-END",
    "heardFacts": [
      "OPEN-S05-C10-A-2:reported"
    ]
  },
  "OPEN-S05-C10-A-2-WAIT": {
    "id": "OPEN-S05-C10-A-2-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-C10-A-2"
  },
  "OPEN-S05-C10-A-2-MEMBER": {
    "id": "OPEN-S05-C10-A-2-MEMBER",
    "kind": "condition",
    "test": "s05-sophie-member",
    "next": "OPEN-S05-C10-A-2-WAIT",
    "otherwise": "OPEN-S05-GROUP-END"
  },
  "OPEN-S05-C10-A-1": {
    "id": "OPEN-S05-C10-A-1",
    "kind": "npc",
    "sender": "maya",
    "text": "Agreed.",
    "channel": "group",
    "next": "OPEN-S05-C10-A-2-MEMBER",
    "heardFacts": [
      "OPEN-S05-C10-A-1:reported"
    ]
  },
  "OPEN-S05-C10-A-1-WAIT": {
    "id": "OPEN-S05-C10-A-1-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S05-C10-A-1"
  },
  "OPEN-S05-C10-B-1": {
    "id": "OPEN-S05-C10-B-1",
    "kind": "npc",
    "sender": "maya",
    "text": "That's fine. We'll still have the links.",
    "channel": "group",
    "next": "OPEN-S05-GROUP-END",
    "heardFacts": [
      "OPEN-S05-C10-B-1:reported"
    ]
  },
  "OPEN-S05-C10-B-1-WAIT": {
    "id": "OPEN-S05-C10-B-1-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S05-C10-B-1"
  },
  "OPEN-S05-C10-C-1": {
    "id": "OPEN-S05-C10-C-1",
    "kind": "npc",
    "sender": "maya",
    "text": "Exactly.",
    "channel": "group",
    "next": "OPEN-S05-GROUP-END",
    "heardFacts": [
      "OPEN-S05-C10-C-1:reported"
    ]
  },
  "OPEN-S05-C10-C-1-WAIT": {
    "id": "OPEN-S05-C10-C-1-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S05-C10-C-1"
  },
  "OPEN-S05-C10": {
    "id": "OPEN-S05-C10",
    "kind": "choice",
    "number": "V10",
    "channel": "group",
    "choices": [
      {
        "id": "a",
        "text": "Let's keep it to what we can actually check.",
        "next": "OPEN-S05-C10-A-1-WAIT"
      },
      {
        "id": "b",
        "text": "I'm going to leave this here for now.",
        "next": "OPEN-S05-C10-B-1-WAIT"
      },
      {
        "id": "c",
        "text": "If someone finds a copy, ask where it came from first.",
        "next": "OPEN-S05-C10-C-1-WAIT"
      }
    ]
  },
  "OPEN-S05-BONUS-END-1": {
    "id": "OPEN-S05-BONUS-END-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "It really does.",
    "channel": "sophie",
    "next": "OPEN-S05-AFTER-06-1-WAIT",
    "heardFacts": [
      "OPEN-S05-BONUS-END-1:reported"
    ]
  },
  "OPEN-S05-BONUS-END-1-WAIT": {
    "id": "OPEN-S05-BONUS-END-1-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-BONUS-END-1"
  },
  "OPEN-S05-BONUS-EFFECT": {
    "id": "OPEN-S05-BONUS-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "affinity": 1
      }
    },
    "next": "OPEN-S05-BONUS-END-1-WAIT"
  },
  "OPEN-S05-BONUS-REPLY-1": {
    "id": "OPEN-S05-BONUS-REPLY-1",
    "kind": "choice",
    "channel": "sophie",
    "choices": [
      {
        "id": "continue",
        "text": "That sounds like him.",
        "next": "OPEN-S05-BONUS-EFFECT"
      }
    ]
  },
  "OPEN-S05-BONUS-1": {
    "id": "OPEN-S05-BONUS-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "A takeaway slip from a place he swore he hated. I found it in a birthday card two years late.",
    "channel": "sophie",
    "next": "OPEN-S05-BONUS-REPLY-1",
    "heardFacts": [
      "OPEN-S05-BONUS-1:reported"
    ]
  },
  "OPEN-S05-BONUS-1-WAIT": {
    "id": "OPEN-S05-BONUS-1-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-BONUS-1"
  },
  "OPEN-S05-BONUS-OFFER": {
    "id": "OPEN-S05-BONUS-OFFER",
    "kind": "gate",
    "action": "s05-bonus",
    "next": "OPEN-S05-AFTER-06-1-WAIT"
  },
  "OPEN-S05-BONUS-CHOICE": {
    "id": "OPEN-S05-BONUS-CHOICE",
    "kind": "choice",
    "channel": "sophie",
    "choices": [
      {
        "id": "bonus",
        "text": "What was the oddest receipt?",
        "premiumChoice": true,
        "next": "OPEN-S05-BONUS-1-WAIT"
      }
    ]
  },
  "OPEN-S05-SOPHIE-OPENING-6": {
    "id": "OPEN-S05-SOPHIE-OPENING-6",
    "kind": "npc",
    "sender": "sophie",
    "text": "Is it supposed to mean something changed?",
    "channel": "sophie",
    "next": "OPEN-S05-C05",
    "heardFacts": [
      "OPEN-S05-SOPHIE-OPENING-6:reported"
    ]
  },
  "OPEN-S05-SOPHIE-OPENING-6-WAIT": {
    "id": "OPEN-S05-SOPHIE-OPENING-6-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-SOPHIE-OPENING-6"
  },
  "OPEN-S05-SOPHIE-OPENING-5": {
    "id": "OPEN-S05-SOPHIE-OPENING-5",
    "kind": "npc",
    "sender": "sophie",
    "text": "That little \"Updated: Yesterday\" thing is driving me mad.",
    "channel": "sophie",
    "next": "OPEN-S05-SOPHIE-OPENING-6-WAIT",
    "heardFacts": [
      "OPEN-S05-SOPHIE-OPENING-5:reported"
    ]
  },
  "OPEN-S05-SOPHIE-OPENING-5-WAIT": {
    "id": "OPEN-S05-SOPHIE-OPENING-5-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-SOPHIE-OPENING-5"
  },
  "OPEN-S05-SOPHIE-OPENING-4": {
    "id": "OPEN-S05-SOPHIE-OPENING-4",
    "kind": "npc",
    "sender": "sophie",
    "text": "Lasted about five minutes.",
    "channel": "sophie",
    "next": "OPEN-S05-SOPHIE-OPENING-5-WAIT",
    "heardFacts": [
      "OPEN-S05-SOPHIE-OPENING-4:reported"
    ]
  },
  "OPEN-S05-SOPHIE-OPENING-4-WAIT": {
    "id": "OPEN-S05-SOPHIE-OPENING-4-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-SOPHIE-OPENING-4"
  },
  "OPEN-S05-SOPHIE-OPENING-3": {
    "id": "OPEN-S05-SOPHIE-OPENING-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "I tried not to open that article again this morning.",
    "channel": "sophie",
    "next": "OPEN-S05-SOPHIE-OPENING-4-WAIT",
    "heardFacts": [
      "OPEN-S05-SOPHIE-OPENING-3:reported"
    ]
  },
  "OPEN-S05-SOPHIE-OPENING-3-WAIT": {
    "id": "OPEN-S05-SOPHIE-OPENING-3-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-SOPHIE-OPENING-3"
  },
  "OPEN-S05-SOPHIE-OPENING-2": {
    "id": "OPEN-S05-SOPHIE-OPENING-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "I know I said goodnight.",
    "channel": "sophie",
    "next": "OPEN-S05-SOPHIE-OPENING-3-WAIT",
    "heardFacts": [
      "OPEN-S05-SOPHIE-OPENING-2:reported"
    ]
  },
  "OPEN-S05-SOPHIE-OPENING-2-WAIT": {
    "id": "OPEN-S05-SOPHIE-OPENING-2-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-SOPHIE-OPENING-2"
  },
  "OPEN-S05-SOPHIE-OPENING-1": {
    "id": "OPEN-S05-SOPHIE-OPENING-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Hey.",
    "channel": "sophie",
    "next": "OPEN-S05-SOPHIE-OPENING-2-WAIT",
    "heardFacts": [
      "OPEN-S05-SOPHIE-OPENING-1:reported"
    ]
  },
  "OPEN-S05-SOPHIE-OPENING-1-WAIT": {
    "id": "OPEN-S05-SOPHIE-OPENING-1-WAIT",
    "kind": "wait",
    "duration": 1400,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S05-SOPHIE-OPENING-1"
  }
}
export const scene05Entrances = {
  "sophie": "OPEN-S05-SOPHIE-OPENING-1-WAIT",
  "group": "OPEN-S05-C09"
} as const
export const scene05Local = {
  "S05-C01": [
    {
      "id": "a",
      "text": "Put them next to each other.",
      "feedback": "Comparison limited to known metadata. No matching article body is available for the index record."
    },
    {
      "id": "b",
      "text": "Which one is the original?",
      "feedback": "Not established. The public article is readable; the index reference has no authenticated content."
    },
    {
      "id": "c",
      "text": "What does 'Updated: Yesterday' prove?",
      "feedback": "Only that the public page displays those words. It does not identify the changed field or give a verifiable timestamp."
    }
  ],
  "S05-C02": [
    {
      "id": "a",
      "text": "The article definitely changed yesterday.",
      "feedback": "Not established. A relative page label does not prove what, if anything, changed in the article body. Try again."
    },
    {
      "id": "b",
      "text": "The page displays an update label, but there is no verified diff.",
      "feedback": "Supported. A visible label is not a revision log."
    },
    {
      "id": "c",
      "text": "The index record is the missing first edition.",
      "feedback": "Not established. Its source and content are unavailable. Try again."
    }
  ],
  "S05-C03": [
    {
      "id": "a",
      "text": "Ask the publisher what changed.",
      "feedback": "A narrow question is possible. A reply would still need independent checking."
    },
    {
      "id": "b",
      "text": "Wait until an older copy can be verified.",
      "feedback": "Reasonable. Save the question without converting it into a finding."
    },
    {
      "id": "c",
      "text": "Tell the others this is proof of tampering.",
      "feedback": "That claim is not supported. You can discuss the uncertainty, but this panel cannot certify tampering."
    }
  ],
  "S05-C04": [
    {
      "id": "a",
      "text": "Could you confirm whether the body of this article changed after it was published on 7 October? If so, which passage and on what date?",
      "feedback": ""
    },
    {
      "id": "b",
      "text": "The article currently displays 'Updated: Yesterday'. Does that label reflect an editorial change, a correction, or a page-only update?",
      "feedback": ""
    },
    {
      "id": "c",
      "text": "Is there a public correction note or a version history for article GB-ARTICLE-001 that readers can verify?",
      "feedback": ""
    }
  ],
  "S05-C11": [
    {
      "id": "a",
      "text": "The Bulletin page displays an update label, but I can't verify a text revision.",
      "feedback": "Saved as an observed limitation."
    },
    {
      "id": "b",
      "text": "I need an authenticated earlier copy or a publisher's dated change record.",
      "feedback": "Saved as a verification plan, not evidence of tampering."
    },
    {
      "id": "c",
      "text": "I won't speculate until the sources can be checked.",
      "feedback": "Saved as a hold decision. The investigation remains open."
    }
  ]
} as const
export const scene05Policy = [
  "A page can be updated after publication for several reasons, including corrections, layout changes, links, captions or editorial additions.",
  "The relative label shown on an article is a display label. It is not a publicly accessible record of every saved revision.",
  "Readers who need to know what changed may send a specific question to our corrections desk. We may be unable to provide internal drafts or information that could identify confidential sources."
] as const
export const scene05Checklist = [
  [
    "Earlier article copy",
    "NOT HELD. The index record cannot stand in for readable text."
  ],
  [
    "Timestamped change entry",
    "NOT HELD. 'Yesterday' is relative and not an authenticated timestamp."
  ],
  [
    "Comparison of the changed content",
    "NOT AVAILABLE. No before/after text is verified."
  ],
  [
    "Who issued the record",
    "NOT ESTABLISHED for ARC-IDX-GB-041."
  ]
] as const
export const scene05Manifest = [
  {
    "id": "S05-C01",
    "branches": 3,
    "channel": "local"
  },
  {
    "id": "S05-C02",
    "branches": 3,
    "channel": "local"
  },
  {
    "id": "S05-C03",
    "branches": 3,
    "channel": "local"
  },
  {
    "id": "S05-C04",
    "branches": 3,
    "channel": "form"
  },
  {
    "id": "S05-C05",
    "branches": 3,
    "channel": "sophie"
  },
  {
    "id": "S05-C06",
    "branches": 3,
    "channel": "sophie"
  },
  {
    "id": "S05-C07",
    "branches": 3,
    "channel": "sophie"
  },
  {
    "id": "S05-C08",
    "branches": 3,
    "channel": "sophie"
  },
  {
    "id": "S05-C09",
    "branches": 3,
    "channel": "group"
  },
  {
    "id": "S05-C10",
    "branches": 3,
    "channel": "group"
  },
  {
    "id": "S05-C11",
    "branches": 3,
    "channel": "local"
  }
] as const
