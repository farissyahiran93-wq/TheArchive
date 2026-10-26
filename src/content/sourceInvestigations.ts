// Generated from the pinned Scene 07 and 08 manuscripts.
import type { Scene01Node } from './scene01'
import { scene09Nodes, scene09Investigation } from './scene09Final'
import { scene10Nodes, scene10Investigation } from './scene10Final'
const sourceInvestigationBaseNodes: Record<string,Scene01Node> = {
  "OPEN-S07-professional-END": {
    "id": "OPEN-S07-professional-END",
    "kind": "event",
    "event": "source-thread-end"
  },
  "OPEN-S07-sophie-END": {
    "id": "OPEN-S07-sophie-END",
    "kind": "event",
    "event": "source-thread-end"
  },
  "OPEN-S07-group-END": {
    "id": "OPEN-S07-group-END",
    "kind": "event",
    "event": "source-thread-end"
  },
  "OPEN-S07-AFTER-09-2": {
    "id": "OPEN-S07-AFTER-09-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "If I have something I can put on the public record, I'll use this inbox. I can't promise there will be anything.",
    "channel": "sophie",
    "next": "OPEN-S07-professional-END",
    "heardFacts": [
      "OPEN-S07-AFTER-09-2:reported"
    ]
  },
  "OPEN-S07-AFTER-09-2-WAIT": {
    "id": "OPEN-S07-AFTER-09-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-AFTER-09-2"
  },
  "OPEN-S07-AFTER-09-1": {
    "id": "OPEN-S07-AFTER-09-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "I have to get back to work.",
    "channel": "sophie",
    "next": "OPEN-S07-AFTER-09-2-WAIT",
    "heardFacts": [
      "OPEN-S07-AFTER-09-1:reported"
    ]
  },
  "OPEN-S07-AFTER-09-1-WAIT": {
    "id": "OPEN-S07-AFTER-09-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-AFTER-09-1"
  },
  "OPEN-S07-C09-A-2": {
    "id": "OPEN-S07-C09-A-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "We haven't made that easy here. That's a fair criticism.",
    "channel": "sophie",
    "next": "OPEN-S07-AFTER-09-1-WAIT",
    "heardFacts": [
      "OPEN-S07-C09-A-2:reported"
    ]
  },
  "OPEN-S07-C09-A-2-WAIT": {
    "id": "OPEN-S07-C09-A-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-C09-A-2"
  },
  "OPEN-S07-C09-A-1": {
    "id": "OPEN-S07-C09-A-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Because it should be possible to ask where something came from.",
    "channel": "sophie",
    "next": "OPEN-S07-C09-A-2-WAIT",
    "heardFacts": [
      "OPEN-S07-C09-A-1:reported"
    ]
  },
  "OPEN-S07-C09-A-1-WAIT": {
    "id": "OPEN-S07-C09-A-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-C09-A-1"
  },
  "OPEN-S07-C09-B-2": {
    "id": "OPEN-S07-C09-B-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Please don't attach Daniel's name to a record we haven't seen.",
    "channel": "sophie",
    "next": "OPEN-S07-AFTER-09-1-WAIT",
    "heardFacts": [
      "OPEN-S07-C09-B-2:reported"
    ]
  },
  "OPEN-S07-C09-B-2-WAIT": {
    "id": "OPEN-S07-C09-B-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-C09-B-2"
  },
  "OPEN-S07-C09-B-1": {
    "id": "OPEN-S07-C09-B-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "No. I haven't said that.",
    "channel": "sophie",
    "next": "OPEN-S07-C09-B-2-WAIT",
    "heardFacts": [
      "OPEN-S07-C09-B-1:reported"
    ]
  },
  "OPEN-S07-C09-B-1-WAIT": {
    "id": "OPEN-S07-C09-B-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-C09-B-1"
  },
  "OPEN-S07-C09-C-2": {
    "id": "OPEN-S07-C09-C-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "And if the trail goes cold, say so. That matters too.",
    "channel": "sophie",
    "next": "OPEN-S07-AFTER-09-1-WAIT",
    "heardFacts": [
      "OPEN-S07-C09-C-2:reported"
    ]
  },
  "OPEN-S07-C09-C-2-WAIT": {
    "id": "OPEN-S07-C09-C-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-C09-C-2"
  },
  "OPEN-S07-C09-C-1": {
    "id": "OPEN-S07-C09-C-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "That makes sense.",
    "channel": "sophie",
    "next": "OPEN-S07-C09-C-2-WAIT",
    "heardFacts": [
      "OPEN-S07-C09-C-1:reported"
    ]
  },
  "OPEN-S07-C09-C-1-WAIT": {
    "id": "OPEN-S07-C09-C-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-C09-C-1"
  },
  "OPEN-S07-C09": {
    "id": "OPEN-S07-C09",
    "kind": "choice",
    "number": "S07-C09",
    "channel": "sophie",
    "choices": [
      {
        "id": "a",
        "text": "Why publish a reference readers can't actually open?",
        "next": "OPEN-S07-C09-A-1-WAIT"
      },
      {
        "id": "b",
        "text": "Are you saying Daniel gave you that reference?",
        "next": "OPEN-S07-C09-B-1-WAIT"
      },
      {
        "id": "c",
        "text": "I'll look for an issuing office instead of guessing.",
        "next": "OPEN-S07-C09-C-1-WAIT"
      }
    ]
  },
  "OPEN-S07-AFTER-10-2": {
    "id": "OPEN-S07-AFTER-10-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "I just don't want to repeat someone's theory like it's fact.",
    "channel": "sophie",
    "next": "OPEN-S07-C11",
    "heardFacts": [
      "OPEN-S07-AFTER-10-2:reported"
    ]
  },
  "OPEN-S07-AFTER-10-2-WAIT": {
    "id": "OPEN-S07-AFTER-10-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-AFTER-10-2"
  },
  "OPEN-S07-AFTER-10-1": {
    "id": "OPEN-S07-AFTER-10-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Sorry if I'm being difficult.",
    "channel": "sophie",
    "next": "OPEN-S07-AFTER-10-2-WAIT",
    "heardFacts": [
      "OPEN-S07-AFTER-10-1:reported"
    ]
  },
  "OPEN-S07-AFTER-10-1-WAIT": {
    "id": "OPEN-S07-AFTER-10-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-AFTER-10-1"
  },
  "OPEN-S07-C10-A-2": {
    "id": "OPEN-S07-C10-A-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "I can handle a sentence.",
    "channel": "sophie",
    "next": "OPEN-S07-AFTER-10-1-WAIT",
    "heardFacts": [
      "OPEN-S07-C10-A-2:reported"
    ]
  },
  "OPEN-S07-C10-A-2-WAIT": {
    "id": "OPEN-S07-C10-A-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-C10-A-2"
  },
  "OPEN-S07-C10-A-1": {
    "id": "OPEN-S07-C10-A-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Yeah. One sentence.",
    "channel": "sophie",
    "next": "OPEN-S07-C10-A-2-WAIT",
    "heardFacts": [
      "OPEN-S07-C10-A-1:reported"
    ]
  },
  "OPEN-S07-C10-A-1-WAIT": {
    "id": "OPEN-S07-C10-A-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-C10-A-1"
  },
  "OPEN-S07-C10-A-EFFECT": {
    "id": "OPEN-S07-C10-A-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "trust": 2
      }
    },
    "next": "OPEN-S07-C10-A-1-WAIT"
  },
  "OPEN-S07-C10-B-2": {
    "id": "OPEN-S07-C10-B-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "My head is full. That's all.",
    "channel": "sophie",
    "next": "OPEN-S07-AFTER-10-1-WAIT",
    "heardFacts": [
      "OPEN-S07-C10-B-2:reported"
    ]
  },
  "OPEN-S07-C10-B-2-WAIT": {
    "id": "OPEN-S07-C10-B-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-C10-B-2"
  },
  "OPEN-S07-C10-B-1": {
    "id": "OPEN-S07-C10-B-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Maybe we could talk about something else first.",
    "channel": "sophie",
    "next": "OPEN-S07-C10-B-2-WAIT",
    "heardFacts": [
      "OPEN-S07-C10-B-1:reported"
    ]
  },
  "OPEN-S07-C10-B-1-WAIT": {
    "id": "OPEN-S07-C10-B-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-C10-B-1"
  },
  "OPEN-S07-C10-B-EFFECT": {
    "id": "OPEN-S07-C10-B-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "affinity": 2
      }
    },
    "next": "OPEN-S07-C10-B-1-WAIT"
  },
  "OPEN-S07-C10-C-2": {
    "id": "OPEN-S07-C10-C-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "That's about the highest achievement I can report.",
    "channel": "sophie",
    "next": "OPEN-S07-AFTER-10-1-WAIT",
    "heardFacts": [
      "OPEN-S07-C10-C-2:reported"
    ]
  },
  "OPEN-S07-C10-C-2-WAIT": {
    "id": "OPEN-S07-C10-C-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-C10-C-2"
  },
  "OPEN-S07-C10-C-1": {
    "id": "OPEN-S07-C10-C-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Honestly? I did laundry today.",
    "channel": "sophie",
    "next": "OPEN-S07-C10-C-2-WAIT",
    "heardFacts": [
      "OPEN-S07-C10-C-1:reported"
    ]
  },
  "OPEN-S07-C10-C-1-WAIT": {
    "id": "OPEN-S07-C10-C-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-C10-C-1"
  },
  "OPEN-S07-C10-C-EFFECT": {
    "id": "OPEN-S07-C10-C-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "affinity": 1,
        "trust": 1
      }
    },
    "next": "OPEN-S07-C10-C-1-WAIT"
  },
  "OPEN-S07-C10": {
    "id": "OPEN-S07-C10",
    "kind": "choice",
    "number": "S07-C10",
    "channel": "sophie",
    "choices": [
      {
        "id": "a",
        "text": "Can I share one public lead? Nothing private.",
        "next": "OPEN-S07-C10-A-EFFECT"
      },
      {
        "id": "b",
        "text": "I can hold off if today isn't a good day.",
        "next": "OPEN-S07-C10-B-EFFECT"
      },
      {
        "id": "c",
        "text": "How are you doing, actually?",
        "next": "OPEN-S07-C10-C-EFFECT"
      }
    ]
  },
  "OPEN-S07-AFTER-11-3": {
    "id": "OPEN-S07-AFTER-11-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "Talk later.",
    "channel": "sophie",
    "next": "OPEN-S07-sophie-END",
    "heardFacts": [
      "OPEN-S07-AFTER-11-3:reported"
    ]
  },
  "OPEN-S07-AFTER-11-3-WAIT": {
    "id": "OPEN-S07-AFTER-11-3-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-AFTER-11-3"
  },
  "OPEN-S07-AFTER-11-2": {
    "id": "OPEN-S07-AFTER-11-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Thanks for asking first.",
    "channel": "sophie",
    "next": "OPEN-S07-AFTER-11-3-WAIT",
    "heardFacts": [
      "OPEN-S07-AFTER-11-2:reported"
    ]
  },
  "OPEN-S07-AFTER-11-2-WAIT": {
    "id": "OPEN-S07-AFTER-11-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-AFTER-11-2"
  },
  "OPEN-S07-AFTER-11-1": {
    "id": "OPEN-S07-AFTER-11-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "I'm going to put my phone down for a bit.",
    "channel": "sophie",
    "next": "OPEN-S07-AFTER-11-2-WAIT",
    "heardFacts": [
      "OPEN-S07-AFTER-11-1:reported"
    ]
  },
  "OPEN-S07-AFTER-11-1-WAIT": {
    "id": "OPEN-S07-AFTER-11-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-AFTER-11-1"
  },
  "OPEN-S07-C11-A-NO-CONSENT-1": {
    "id": "OPEN-S07-C11-A-NO-CONSENT-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Then that's enough of an update for today.",
    "channel": "sophie",
    "next": "OPEN-S07-AFTER-11-1-WAIT",
    "heardFacts": [
      "OPEN-S07-C11-A-NO-CONSENT-1:reported"
    ]
  },
  "OPEN-S07-C11-A-NO-CONSENT-1-WAIT": {
    "id": "OPEN-S07-C11-A-NO-CONSENT-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-C11-A-NO-CONSENT-1"
  },
  "OPEN-S07-C11-A-NO-EFFECT": {
    "id": "OPEN-S07-C11-A-NO-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "trust": 1
      }
    },
    "next": "OPEN-S07-C11-A-NO-CONSENT-1-WAIT"
  },
  "OPEN-S07-C11-A-2": {
    "id": "OPEN-S07-C11-A-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Thanks for keeping it to what you've actually seen.",
    "channel": "sophie",
    "next": "OPEN-S07-AFTER-11-1-WAIT",
    "heardFacts": [
      "OPEN-S07-C11-A-2:reported"
    ]
  },
  "OPEN-S07-C11-A-2-WAIT": {
    "id": "OPEN-S07-C11-A-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-C11-A-2"
  },
  "OPEN-S07-C11-A-1": {
    "id": "OPEN-S07-C11-A-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Okay. I understand that.",
    "channel": "sophie",
    "next": "OPEN-S07-C11-A-2-WAIT",
    "heardFacts": [
      "OPEN-S07-C11-A-1:reported"
    ]
  },
  "OPEN-S07-C11-A-1-WAIT": {
    "id": "OPEN-S07-C11-A-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-C11-A-1"
  },
  "OPEN-S07-C11-A-EFFECT": {
    "id": "OPEN-S07-C11-A-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "trust": 2
      }
    },
    "next": "OPEN-S07-C11-A-1-WAIT"
  },
  "OPEN-S07-C11-B-2": {
    "id": "OPEN-S07-C11-B-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Maybe just someone not asking me to be hopeful on command.",
    "channel": "sophie",
    "next": "OPEN-S07-AFTER-11-1-WAIT",
    "heardFacts": [
      "OPEN-S07-C11-B-2:reported"
    ]
  },
  "OPEN-S07-C11-B-2-WAIT": {
    "id": "OPEN-S07-C11-B-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-C11-B-2"
  },
  "OPEN-S07-C11-B-1": {
    "id": "OPEN-S07-C11-B-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Not sure.",
    "channel": "sophie",
    "next": "OPEN-S07-C11-B-2-WAIT",
    "heardFacts": [
      "OPEN-S07-C11-B-1:reported"
    ]
  },
  "OPEN-S07-C11-B-1-WAIT": {
    "id": "OPEN-S07-C11-B-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-C11-B-1"
  },
  "OPEN-S07-C11-B-EFFECT": {
    "id": "OPEN-S07-C11-B-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "affinity": 2
      }
    },
    "next": "OPEN-S07-C11-B-1-WAIT"
  },
  "OPEN-S07-C11-C-3": {
    "id": "OPEN-S07-C11-C-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "Sorry. That wasn't very normal, was it?",
    "channel": "sophie",
    "next": "OPEN-S07-AFTER-11-1-WAIT",
    "heardFacts": [
      "OPEN-S07-C11-C-3:reported"
    ]
  },
  "OPEN-S07-C11-C-3-WAIT": {
    "id": "OPEN-S07-C11-C-3-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-C11-C-3"
  },
  "OPEN-S07-C11-C-2": {
    "id": "OPEN-S07-C11-C-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Daniel would have laughed at me for about a week.",
    "channel": "sophie",
    "next": "OPEN-S07-C11-C-3-WAIT",
    "heardFacts": [
      "OPEN-S07-C11-C-2:reported"
    ]
  },
  "OPEN-S07-C11-C-2-WAIT": {
    "id": "OPEN-S07-C11-C-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-C11-C-2"
  },
  "OPEN-S07-C11-C-1": {
    "id": "OPEN-S07-C11-C-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "I bought the wrong kind of tea again.",
    "channel": "sophie",
    "next": "OPEN-S07-C11-C-2-WAIT",
    "heardFacts": [
      "OPEN-S07-C11-C-1:reported"
    ]
  },
  "OPEN-S07-C11-C-1-WAIT": {
    "id": "OPEN-S07-C11-C-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-C11-C-1"
  },
  "OPEN-S07-C11-C-EFFECT": {
    "id": "OPEN-S07-C11-C-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "affinity": 1,
        "trust": 1
      }
    },
    "next": "OPEN-S07-C11-C-1-WAIT"
  },
  "OPEN-S07-C11": {
    "id": "OPEN-S07-C11",
    "kind": "choice",
    "number": "S07-C11",
    "channel": "sophie",
    "choices": [
      {
        "id": "a",
        "text": "The reporter's public note has a reference label, but no original document. That's all I can verify from it.",
        "withoutConsent": {
          "text": "I don't have a new fact I can stand behind yet.",
          "next": "OPEN-S07-C11-A-NO-EFFECT"
        },
        "next": "OPEN-S07-C11-A-EFFECT"
      },
      {
        "id": "b",
        "text": "What would help right now?",
        "next": "OPEN-S07-C11-B-EFFECT"
      },
      {
        "id": "c",
        "text": "Let's talk about something completely normal.",
        "next": "OPEN-S07-C11-C-EFFECT"
      }
    ]
  },
  "OPEN-S07-GROUP-C12-A-2": {
    "id": "OPEN-S07-GROUP-C12-A-2",
    "kind": "npc",
    "sender": "maya",
    "text": "A reference isn't a record. At least we know what to look for next.",
    "channel": "group",
    "next": "OPEN-S07-group-END",
    "heardFacts": [
      "OPEN-S07-GROUP-C12-A-2:reported"
    ]
  },
  "OPEN-S07-GROUP-C12-A-2-WAIT": {
    "id": "OPEN-S07-GROUP-C12-A-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S07-GROUP-C12-A-2"
  },
  "OPEN-S07-GROUP-C12-A-1": {
    "id": "OPEN-S07-GROUP-C12-A-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Okay. So we still need the real source.",
    "channel": "group",
    "next": "OPEN-S07-GROUP-C12-A-2-WAIT",
    "heardFacts": [
      "OPEN-S07-GROUP-C12-A-1:reported"
    ]
  },
  "OPEN-S07-GROUP-C12-A-1-WAIT": {
    "id": "OPEN-S07-GROUP-C12-A-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-GROUP-C12-A-1"
  },
  "OPEN-S07-GROUP-C12-B-2": {
    "id": "OPEN-S07-GROUP-C12-B-2",
    "kind": "npc",
    "sender": "maya",
    "text": "Agreed. We should keep credit and site changes separate.",
    "channel": "group",
    "next": "OPEN-S07-group-END",
    "heardFacts": [
      "OPEN-S07-GROUP-C12-B-2:reported"
    ]
  },
  "OPEN-S07-GROUP-C12-B-2-WAIT": {
    "id": "OPEN-S07-GROUP-C12-B-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S07-GROUP-C12-B-2"
  },
  "OPEN-S07-GROUP-C12-B-1": {
    "id": "OPEN-S07-GROUP-C12-B-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Yeah. I don't want us accusing people either.",
    "channel": "group",
    "next": "OPEN-S07-GROUP-C12-B-2-WAIT",
    "heardFacts": [
      "OPEN-S07-GROUP-C12-B-1:reported"
    ]
  },
  "OPEN-S07-GROUP-C12-B-1-WAIT": {
    "id": "OPEN-S07-GROUP-C12-B-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-GROUP-C12-B-1"
  },
  "OPEN-S07-GROUP-C12-C-2": {
    "id": "OPEN-S07-GROUP-C12-C-2",
    "kind": "npc",
    "sender": "maya",
    "text": "That's a better question to ask.",
    "channel": "group",
    "next": "OPEN-S07-group-END",
    "heardFacts": [
      "OPEN-S07-GROUP-C12-C-2:reported"
    ]
  },
  "OPEN-S07-GROUP-C12-C-2-WAIT": {
    "id": "OPEN-S07-GROUP-C12-C-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S07-GROUP-C12-C-2"
  },
  "OPEN-S07-GROUP-C12-C-1": {
    "id": "OPEN-S07-GROUP-C12-C-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Okay. Thanks.",
    "channel": "group",
    "next": "OPEN-S07-GROUP-C12-C-2-WAIT",
    "heardFacts": [
      "OPEN-S07-GROUP-C12-C-1:reported"
    ]
  },
  "OPEN-S07-GROUP-C12-C-1-WAIT": {
    "id": "OPEN-S07-GROUP-C12-C-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-GROUP-C12-C-1"
  },
  "OPEN-S07-C12": {
    "id": "OPEN-S07-C12",
    "kind": "choice",
    "number": "S07-C12",
    "channel": "group",
    "choices": [
      {
        "id": "a",
        "text": "The Bulletin posted a reporting note with an unlinked reference. It doesn't include an original document.",
        "next": "OPEN-S07-GROUP-C12-A-1-WAIT"
      },
      {
        "id": "b",
        "text": "Please don't treat Nora's byline as proof she changed the site. We don't have an edit log.",
        "next": "OPEN-S07-GROUP-C12-B-1-WAIT"
      },
      {
        "id": "c",
        "text": "I'm going to try to find a public record issued by the proper office before I share another theory.",
        "next": "OPEN-S07-GROUP-C12-C-1-WAIT"
      }
    ]
  },
  "OPEN-S07-PRO-REPLY-A-10": {
    "id": "OPEN-S07-PRO-REPLY-A-10",
    "kind": "npc",
    "sender": "sophie",
    "text": "I know that's not the answer you wanted.",
    "channel": "sophie",
    "next": "OPEN-S07-C09",
    "heardFacts": [
      "OPEN-S07-PRO-REPLY-A-10:reported"
    ]
  },
  "OPEN-S07-PRO-REPLY-A-10-WAIT": {
    "id": "OPEN-S07-PRO-REPLY-A-10-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-PRO-REPLY-A-10"
  },
  "OPEN-S07-PRO-REPLY-A-9": {
    "id": "OPEN-S07-PRO-REPLY-A-9",
    "kind": "npc",
    "sender": "sophie",
    "text": "And please don't turn the absence of a link into an accusation.",
    "channel": "sophie",
    "next": "OPEN-S07-PRO-REPLY-A-10-WAIT",
    "heardFacts": [
      "OPEN-S07-PRO-REPLY-A-9:reported"
    ]
  },
  "OPEN-S07-PRO-REPLY-A-9-WAIT": {
    "id": "OPEN-S07-PRO-REPLY-A-9-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-PRO-REPLY-A-9"
  },
  "OPEN-S07-PRO-REPLY-A-8": {
    "id": "OPEN-S07-PRO-REPLY-A-8",
    "kind": "npc",
    "sender": "sophie",
    "text": "I don't have a confirmed issuer to give you through this thread.",
    "channel": "sophie",
    "next": "OPEN-S07-PRO-REPLY-A-9-WAIT",
    "heardFacts": [
      "OPEN-S07-PRO-REPLY-A-8:reported"
    ]
  },
  "OPEN-S07-PRO-REPLY-A-8-WAIT": {
    "id": "OPEN-S07-PRO-REPLY-A-8-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-PRO-REPLY-A-8"
  },
  "OPEN-S07-PRO-REPLY-A-7": {
    "id": "OPEN-S07-PRO-REPLY-A-7",
    "kind": "npc",
    "sender": "sophie",
    "text": "If you want the original, the sensible next step is finding out which office issued it.",
    "channel": "sophie",
    "next": "OPEN-S07-PRO-REPLY-A-8-WAIT",
    "heardFacts": [
      "OPEN-S07-PRO-REPLY-A-7:reported"
    ]
  },
  "OPEN-S07-PRO-REPLY-A-7-WAIT": {
    "id": "OPEN-S07-PRO-REPLY-A-7-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-PRO-REPLY-A-7"
  },
  "OPEN-S07-PRO-REPLY-A-6": {
    "id": "OPEN-S07-PRO-REPLY-A-6",
    "kind": "npc",
    "sender": "sophie",
    "text": "I should have made that distinction easier to see.",
    "channel": "sophie",
    "next": "OPEN-S07-PRO-REPLY-A-7-WAIT",
    "heardFacts": [
      "OPEN-S07-PRO-REPLY-A-6:reported"
    ]
  },
  "OPEN-S07-PRO-REPLY-A-6-WAIT": {
    "id": "OPEN-S07-PRO-REPLY-A-6-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-PRO-REPLY-A-6"
  },
  "OPEN-S07-PRO-REPLY-A-5": {
    "id": "OPEN-S07-PRO-REPLY-A-5",
    "kind": "npc",
    "sender": "sophie",
    "text": "I can't give you a document from that reference card. It doesn't contain one.",
    "channel": "sophie",
    "next": "OPEN-S07-PRO-REPLY-A-6-WAIT",
    "heardFacts": [
      "OPEN-S07-PRO-REPLY-A-5:reported"
    ]
  },
  "OPEN-S07-PRO-REPLY-A-5-WAIT": {
    "id": "OPEN-S07-PRO-REPLY-A-5-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-PRO-REPLY-A-5"
  },
  "OPEN-S07-PRO-REPLY-A-4": {
    "id": "OPEN-S07-PRO-REPLY-A-4",
    "kind": "npc",
    "sender": "sophie",
    "text": "You're asking where the underlying public record can be checked.",
    "channel": "sophie",
    "next": "OPEN-S07-PRO-REPLY-A-5-WAIT",
    "heardFacts": [
      "OPEN-S07-PRO-REPLY-A-4:reported"
    ]
  },
  "OPEN-S07-PRO-REPLY-A-4-WAIT": {
    "id": "OPEN-S07-PRO-REPLY-A-4-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-PRO-REPLY-A-4"
  },
  "OPEN-S07-PRO-REPLY-A-3": {
    "id": "OPEN-S07-PRO-REPLY-A-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "Give me a second. I don't want to answer a different question.",
    "channel": "sophie",
    "next": "OPEN-S07-PRO-REPLY-A-4-WAIT",
    "heardFacts": [
      "OPEN-S07-PRO-REPLY-A-3:reported"
    ]
  },
  "OPEN-S07-PRO-REPLY-A-3-WAIT": {
    "id": "OPEN-S07-PRO-REPLY-A-3-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-PRO-REPLY-A-3"
  },
  "OPEN-S07-PRO-REPLY-A-2": {
    "id": "OPEN-S07-PRO-REPLY-A-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "I saw your question about the Daniel Mercer article.",
    "channel": "sophie",
    "next": "OPEN-S07-PRO-REPLY-A-3-WAIT",
    "heardFacts": [
      "OPEN-S07-PRO-REPLY-A-2:reported"
    ]
  },
  "OPEN-S07-PRO-REPLY-A-2-WAIT": {
    "id": "OPEN-S07-PRO-REPLY-A-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-PRO-REPLY-A-2"
  },
  "OPEN-S07-PRO-REPLY-A-1": {
    "id": "OPEN-S07-PRO-REPLY-A-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Hi. Nora here.",
    "channel": "sophie",
    "next": "OPEN-S07-PRO-REPLY-A-2-WAIT",
    "heardFacts": [
      "OPEN-S07-PRO-REPLY-A-1:reported"
    ]
  },
  "OPEN-S07-PRO-REPLY-A-1-WAIT": {
    "id": "OPEN-S07-PRO-REPLY-A-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-PRO-REPLY-A-1"
  },
  "OPEN-S07-PRO-REPLY-B-10": {
    "id": "OPEN-S07-PRO-REPLY-B-10",
    "kind": "npc",
    "sender": "sophie",
    "text": "I know that's not the answer you wanted.",
    "channel": "sophie",
    "next": "OPEN-S07-C09",
    "heardFacts": [
      "OPEN-S07-PRO-REPLY-B-10:reported"
    ]
  },
  "OPEN-S07-PRO-REPLY-B-10-WAIT": {
    "id": "OPEN-S07-PRO-REPLY-B-10-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-PRO-REPLY-B-10"
  },
  "OPEN-S07-PRO-REPLY-B-9": {
    "id": "OPEN-S07-PRO-REPLY-B-9",
    "kind": "npc",
    "sender": "sophie",
    "text": "And please don't turn the absence of a link into an accusation.",
    "channel": "sophie",
    "next": "OPEN-S07-PRO-REPLY-B-10-WAIT",
    "heardFacts": [
      "OPEN-S07-PRO-REPLY-B-9:reported"
    ]
  },
  "OPEN-S07-PRO-REPLY-B-9-WAIT": {
    "id": "OPEN-S07-PRO-REPLY-B-9-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-PRO-REPLY-B-9"
  },
  "OPEN-S07-PRO-REPLY-B-8": {
    "id": "OPEN-S07-PRO-REPLY-B-8",
    "kind": "npc",
    "sender": "sophie",
    "text": "I don't have a confirmed issuer to give you through this thread.",
    "channel": "sophie",
    "next": "OPEN-S07-PRO-REPLY-B-9-WAIT",
    "heardFacts": [
      "OPEN-S07-PRO-REPLY-B-8:reported"
    ]
  },
  "OPEN-S07-PRO-REPLY-B-8-WAIT": {
    "id": "OPEN-S07-PRO-REPLY-B-8-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-PRO-REPLY-B-8"
  },
  "OPEN-S07-PRO-REPLY-B-7": {
    "id": "OPEN-S07-PRO-REPLY-B-7",
    "kind": "npc",
    "sender": "sophie",
    "text": "If you want the original, the sensible next step is finding out which office issued it.",
    "channel": "sophie",
    "next": "OPEN-S07-PRO-REPLY-B-8-WAIT",
    "heardFacts": [
      "OPEN-S07-PRO-REPLY-B-7:reported"
    ]
  },
  "OPEN-S07-PRO-REPLY-B-7-WAIT": {
    "id": "OPEN-S07-PRO-REPLY-B-7-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-PRO-REPLY-B-7"
  },
  "OPEN-S07-PRO-REPLY-B-6": {
    "id": "OPEN-S07-PRO-REPLY-B-6",
    "kind": "npc",
    "sender": "sophie",
    "text": "I should have made that distinction easier to see.",
    "channel": "sophie",
    "next": "OPEN-S07-PRO-REPLY-B-7-WAIT",
    "heardFacts": [
      "OPEN-S07-PRO-REPLY-B-6:reported"
    ]
  },
  "OPEN-S07-PRO-REPLY-B-6-WAIT": {
    "id": "OPEN-S07-PRO-REPLY-B-6-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-PRO-REPLY-B-6"
  },
  "OPEN-S07-PRO-REPLY-B-5": {
    "id": "OPEN-S07-PRO-REPLY-B-5",
    "kind": "npc",
    "sender": "sophie",
    "text": "It doesn't. I wrote the report, but a byline is not the website's edit history.",
    "channel": "sophie",
    "next": "OPEN-S07-PRO-REPLY-B-6-WAIT",
    "heardFacts": [
      "OPEN-S07-PRO-REPLY-B-5:reported"
    ]
  },
  "OPEN-S07-PRO-REPLY-B-5-WAIT": {
    "id": "OPEN-S07-PRO-REPLY-B-5-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-PRO-REPLY-B-5"
  },
  "OPEN-S07-PRO-REPLY-B-4": {
    "id": "OPEN-S07-PRO-REPLY-B-4",
    "kind": "npc",
    "sender": "sophie",
    "text": "You're asking whether my name tells you who updated the page.",
    "channel": "sophie",
    "next": "OPEN-S07-PRO-REPLY-B-5-WAIT",
    "heardFacts": [
      "OPEN-S07-PRO-REPLY-B-4:reported"
    ]
  },
  "OPEN-S07-PRO-REPLY-B-4-WAIT": {
    "id": "OPEN-S07-PRO-REPLY-B-4-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-PRO-REPLY-B-4"
  },
  "OPEN-S07-PRO-REPLY-B-3": {
    "id": "OPEN-S07-PRO-REPLY-B-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "Give me a second. I don't want to answer a different question.",
    "channel": "sophie",
    "next": "OPEN-S07-PRO-REPLY-B-4-WAIT",
    "heardFacts": [
      "OPEN-S07-PRO-REPLY-B-3:reported"
    ]
  },
  "OPEN-S07-PRO-REPLY-B-3-WAIT": {
    "id": "OPEN-S07-PRO-REPLY-B-3-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-PRO-REPLY-B-3"
  },
  "OPEN-S07-PRO-REPLY-B-2": {
    "id": "OPEN-S07-PRO-REPLY-B-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "I saw your question about the Daniel Mercer article.",
    "channel": "sophie",
    "next": "OPEN-S07-PRO-REPLY-B-3-WAIT",
    "heardFacts": [
      "OPEN-S07-PRO-REPLY-B-2:reported"
    ]
  },
  "OPEN-S07-PRO-REPLY-B-2-WAIT": {
    "id": "OPEN-S07-PRO-REPLY-B-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-PRO-REPLY-B-2"
  },
  "OPEN-S07-PRO-REPLY-B-1": {
    "id": "OPEN-S07-PRO-REPLY-B-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Hi. Nora here.",
    "channel": "sophie",
    "next": "OPEN-S07-PRO-REPLY-B-2-WAIT",
    "heardFacts": [
      "OPEN-S07-PRO-REPLY-B-1:reported"
    ]
  },
  "OPEN-S07-PRO-REPLY-B-1-WAIT": {
    "id": "OPEN-S07-PRO-REPLY-B-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-PRO-REPLY-B-1"
  },
  "OPEN-S07-PRO-REPLY-C-10": {
    "id": "OPEN-S07-PRO-REPLY-C-10",
    "kind": "npc",
    "sender": "sophie",
    "text": "I know that's not the answer you wanted.",
    "channel": "sophie",
    "next": "OPEN-S07-C09",
    "heardFacts": [
      "OPEN-S07-PRO-REPLY-C-10:reported"
    ]
  },
  "OPEN-S07-PRO-REPLY-C-10-WAIT": {
    "id": "OPEN-S07-PRO-REPLY-C-10-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-PRO-REPLY-C-10"
  },
  "OPEN-S07-PRO-REPLY-C-9": {
    "id": "OPEN-S07-PRO-REPLY-C-9",
    "kind": "npc",
    "sender": "sophie",
    "text": "And please don't turn the absence of a link into an accusation.",
    "channel": "sophie",
    "next": "OPEN-S07-PRO-REPLY-C-10-WAIT",
    "heardFacts": [
      "OPEN-S07-PRO-REPLY-C-9:reported"
    ]
  },
  "OPEN-S07-PRO-REPLY-C-9-WAIT": {
    "id": "OPEN-S07-PRO-REPLY-C-9-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-PRO-REPLY-C-9"
  },
  "OPEN-S07-PRO-REPLY-C-8": {
    "id": "OPEN-S07-PRO-REPLY-C-8",
    "kind": "npc",
    "sender": "sophie",
    "text": "I don't have a confirmed issuer to give you through this thread.",
    "channel": "sophie",
    "next": "OPEN-S07-PRO-REPLY-C-9-WAIT",
    "heardFacts": [
      "OPEN-S07-PRO-REPLY-C-8:reported"
    ]
  },
  "OPEN-S07-PRO-REPLY-C-8-WAIT": {
    "id": "OPEN-S07-PRO-REPLY-C-8-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-PRO-REPLY-C-8"
  },
  "OPEN-S07-PRO-REPLY-C-7": {
    "id": "OPEN-S07-PRO-REPLY-C-7",
    "kind": "npc",
    "sender": "sophie",
    "text": "If you want the original, the sensible next step is finding out which office issued it.",
    "channel": "sophie",
    "next": "OPEN-S07-PRO-REPLY-C-8-WAIT",
    "heardFacts": [
      "OPEN-S07-PRO-REPLY-C-7:reported"
    ]
  },
  "OPEN-S07-PRO-REPLY-C-7-WAIT": {
    "id": "OPEN-S07-PRO-REPLY-C-7-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-PRO-REPLY-C-7"
  },
  "OPEN-S07-PRO-REPLY-C-6": {
    "id": "OPEN-S07-PRO-REPLY-C-6",
    "kind": "npc",
    "sender": "sophie",
    "text": "I should have made that distinction easier to see.",
    "channel": "sophie",
    "next": "OPEN-S07-PRO-REPLY-C-7-WAIT",
    "heardFacts": [
      "OPEN-S07-PRO-REPLY-C-6:reported"
    ]
  },
  "OPEN-S07-PRO-REPLY-C-6-WAIT": {
    "id": "OPEN-S07-PRO-REPLY-C-6-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-PRO-REPLY-C-6"
  },
  "OPEN-S07-PRO-REPLY-C-5": {
    "id": "OPEN-S07-PRO-REPLY-C-5",
    "kind": "npc",
    "sender": "sophie",
    "text": "The public note gives you a label. It doesn't publish the original document.",
    "channel": "sophie",
    "next": "OPEN-S07-PRO-REPLY-C-6-WAIT",
    "heardFacts": [
      "OPEN-S07-PRO-REPLY-C-5:reported"
    ]
  },
  "OPEN-S07-PRO-REPLY-C-5-WAIT": {
    "id": "OPEN-S07-PRO-REPLY-C-5-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-PRO-REPLY-C-5"
  },
  "OPEN-S07-PRO-REPLY-C-4": {
    "id": "OPEN-S07-PRO-REPLY-C-4",
    "kind": "npc",
    "sender": "sophie",
    "text": "You're asking whether that reference is something you can verify.",
    "channel": "sophie",
    "next": "OPEN-S07-PRO-REPLY-C-5-WAIT",
    "heardFacts": [
      "OPEN-S07-PRO-REPLY-C-4:reported"
    ]
  },
  "OPEN-S07-PRO-REPLY-C-4-WAIT": {
    "id": "OPEN-S07-PRO-REPLY-C-4-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-PRO-REPLY-C-4"
  },
  "OPEN-S07-PRO-REPLY-C-3": {
    "id": "OPEN-S07-PRO-REPLY-C-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "Give me a second. I don't want to answer a different question.",
    "channel": "sophie",
    "next": "OPEN-S07-PRO-REPLY-C-4-WAIT",
    "heardFacts": [
      "OPEN-S07-PRO-REPLY-C-3:reported"
    ]
  },
  "OPEN-S07-PRO-REPLY-C-3-WAIT": {
    "id": "OPEN-S07-PRO-REPLY-C-3-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-PRO-REPLY-C-3"
  },
  "OPEN-S07-PRO-REPLY-C-2": {
    "id": "OPEN-S07-PRO-REPLY-C-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "I saw your question about the Daniel Mercer article.",
    "channel": "sophie",
    "next": "OPEN-S07-PRO-REPLY-C-3-WAIT",
    "heardFacts": [
      "OPEN-S07-PRO-REPLY-C-2:reported"
    ]
  },
  "OPEN-S07-PRO-REPLY-C-2-WAIT": {
    "id": "OPEN-S07-PRO-REPLY-C-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-PRO-REPLY-C-2"
  },
  "OPEN-S07-PRO-REPLY-C-1": {
    "id": "OPEN-S07-PRO-REPLY-C-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Hi. Nora here.",
    "channel": "sophie",
    "next": "OPEN-S07-PRO-REPLY-C-2-WAIT",
    "heardFacts": [
      "OPEN-S07-PRO-REPLY-C-1:reported"
    ]
  },
  "OPEN-S07-PRO-REPLY-C-1-WAIT": {
    "id": "OPEN-S07-PRO-REPLY-C-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-PRO-REPLY-C-1"
  },
  "OPEN-S07-SOPHIE-OPEN-4": {
    "id": "OPEN-S07-SOPHIE-OPEN-4",
    "kind": "npc",
    "sender": "sophie",
    "text": "Did you find anything? You can say no.",
    "channel": "sophie",
    "next": "OPEN-S07-C10",
    "heardFacts": [
      "OPEN-S07-SOPHIE-OPEN-4:reported"
    ]
  },
  "OPEN-S07-SOPHIE-OPEN-4-WAIT": {
    "id": "OPEN-S07-SOPHIE-OPEN-4-WAIT",
    "kind": "wait",
    "duration": 2000,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-SOPHIE-OPEN-4"
  },
  "OPEN-S07-SOPHIE-OPEN-3": {
    "id": "OPEN-S07-SOPHIE-OPEN-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "I don't think I'm even reading the words anymore.",
    "channel": "sophie",
    "next": "OPEN-S07-SOPHIE-OPEN-4-WAIT",
    "heardFacts": [
      "OPEN-S07-SOPHIE-OPEN-3:reported"
    ]
  },
  "OPEN-S07-SOPHIE-OPEN-3-WAIT": {
    "id": "OPEN-S07-SOPHIE-OPEN-3-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-SOPHIE-OPEN-3"
  },
  "OPEN-S07-SOPHIE-OPEN-2": {
    "id": "OPEN-S07-SOPHIE-OPEN-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "I've read the same paragraph about Daniel so many times.",
    "channel": "sophie",
    "next": "OPEN-S07-SOPHIE-OPEN-3-WAIT",
    "heardFacts": [
      "OPEN-S07-SOPHIE-OPEN-2:reported"
    ]
  },
  "OPEN-S07-SOPHIE-OPEN-2-WAIT": {
    "id": "OPEN-S07-SOPHIE-OPEN-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-SOPHIE-OPEN-2"
  },
  "OPEN-S07-SOPHIE-OPEN-1": {
    "id": "OPEN-S07-SOPHIE-OPEN-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Hey.",
    "channel": "sophie",
    "next": "OPEN-S07-SOPHIE-OPEN-2-WAIT",
    "heardFacts": [
      "OPEN-S07-SOPHIE-OPEN-1:reported"
    ]
  },
  "OPEN-S07-SOPHIE-OPEN-1-WAIT": {
    "id": "OPEN-S07-SOPHIE-OPEN-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S07-SOPHIE-OPEN-1"
  },
  "OPEN-S08-civic-END": {
    "id": "OPEN-S08-civic-END",
    "kind": "event",
    "event": "source-thread-end"
  },
  "OPEN-S08-professional-END": {
    "id": "OPEN-S08-professional-END",
    "kind": "event",
    "event": "source-thread-end"
  },
  "OPEN-S08-sophie-END": {
    "id": "OPEN-S08-sophie-END",
    "kind": "event",
    "event": "source-thread-end"
  },
  "OPEN-S08-group-END": {
    "id": "OPEN-S08-group-END",
    "kind": "event",
    "event": "source-thread-end"
  },
  "OPEN-S08-AFTER-09-1": {
    "id": "OPEN-S08-AFTER-09-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Take care.",
    "channel": "sophie",
    "next": "OPEN-S08-civic-END",
    "heardFacts": [
      "OPEN-S08-AFTER-09-1:reported"
    ]
  },
  "OPEN-S08-AFTER-09-1-WAIT": {
    "id": "OPEN-S08-AFTER-09-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-AFTER-09-1"
  },
  "OPEN-S08-C09-A-2": {
    "id": "OPEN-S08-C09-A-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "It still won't tell you what the notice said.",
    "channel": "sophie",
    "next": "OPEN-S08-AFTER-09-1-WAIT",
    "heardFacts": [
      "OPEN-S08-C09-A-2:reported"
    ]
  },
  "OPEN-S08-C09-A-2-WAIT": {
    "id": "OPEN-S08-C09-A-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-C09-A-2"
  },
  "OPEN-S08-C09-A-1": {
    "id": "OPEN-S08-C09-A-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Yes. That gives a custodian something they can check.",
    "channel": "sophie",
    "next": "OPEN-S08-C09-A-2-WAIT",
    "heardFacts": [
      "OPEN-S08-C09-A-1:reported"
    ]
  },
  "OPEN-S08-C09-A-1-WAIT": {
    "id": "OPEN-S08-C09-A-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-C09-A-1"
  },
  "OPEN-S08-C09-B-1": {
    "id": "OPEN-S08-C09-B-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "No. That's a private publisher's site. We don't administer its article history.",
    "channel": "sophie",
    "next": "OPEN-S08-AFTER-09-1-WAIT",
    "heardFacts": [
      "OPEN-S08-C09-B-1:reported"
    ]
  },
  "OPEN-S08-C09-B-1-WAIT": {
    "id": "OPEN-S08-C09-B-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-C09-B-1"
  },
  "OPEN-S08-C09-C-1": {
    "id": "OPEN-S08-C09-C-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "I appreciate that. It saves a lot of confusion.",
    "channel": "sophie",
    "next": "OPEN-S08-AFTER-09-1-WAIT",
    "heardFacts": [
      "OPEN-S08-C09-C-1:reported"
    ]
  },
  "OPEN-S08-C09-C-1-WAIT": {
    "id": "OPEN-S08-C09-C-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-C09-C-1"
  },
  "OPEN-S08-C09": {
    "id": "OPEN-S08-C09",
    "kind": "choice",
    "number": "S08-C09",
    "channel": "sophie",
    "choices": [
      {
        "id": "a",
        "text": "So the first useful step is finding a record series, not assuming the publisher's reference is a file number?",
        "next": "OPEN-S08-C09-A-1-WAIT"
      },
      {
        "id": "b",
        "text": "Can you tell me which person last edited the Bulletin?",
        "next": "OPEN-S08-C09-B-1-WAIT"
      },
      {
        "id": "c",
        "text": "Thank you. I'll keep the difference between a request and a record clear.",
        "next": "OPEN-S08-C09-C-1-WAIT"
      }
    ]
  },
  "OPEN-S08-AFTER-12-1": {
    "id": "OPEN-S08-AFTER-12-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "I need to go. If I can publish something verifiable, it belongs in the public record—not in a guess here.",
    "channel": "sophie",
    "next": "OPEN-S08-professional-END",
    "heardFacts": [
      "OPEN-S08-AFTER-12-1:reported"
    ]
  },
  "OPEN-S08-AFTER-12-1-WAIT": {
    "id": "OPEN-S08-AFTER-12-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-AFTER-12-1"
  },
  "OPEN-S08-C12-A-2": {
    "id": "OPEN-S08-C12-A-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "And I don't want a route name to be mistaken for a source.",
    "channel": "sophie",
    "next": "OPEN-S08-AFTER-12-1-WAIT",
    "heardFacts": [
      "OPEN-S08-C12-A-2:reported"
    ]
  },
  "OPEN-S08-C12-A-2-WAIT": {
    "id": "OPEN-S08-C12-A-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-C12-A-2"
  },
  "OPEN-S08-C12-A-1": {
    "id": "OPEN-S08-C12-A-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Right.",
    "channel": "sophie",
    "next": "OPEN-S08-C12-A-2-WAIT",
    "heardFacts": [
      "OPEN-S08-C12-A-1:reported"
    ]
  },
  "OPEN-S08-C12-A-1-WAIT": {
    "id": "OPEN-S08-C12-A-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-C12-A-1"
  },
  "OPEN-S08-C12-B-2": {
    "id": "OPEN-S08-C12-B-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "I can't turn that label into an issuing body for you.",
    "channel": "sophie",
    "next": "OPEN-S08-AFTER-12-1-WAIT",
    "heardFacts": [
      "OPEN-S08-C12-B-2:reported"
    ]
  },
  "OPEN-S08-C12-B-2-WAIT": {
    "id": "OPEN-S08-C12-B-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-C12-B-2"
  },
  "OPEN-S08-C12-B-1": {
    "id": "OPEN-S08-C12-B-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Not from the public note, no.",
    "channel": "sophie",
    "next": "OPEN-S08-C12-B-2-WAIT",
    "heardFacts": [
      "OPEN-S08-C12-B-1:reported"
    ]
  },
  "OPEN-S08-C12-B-1-WAIT": {
    "id": "OPEN-S08-C12-B-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-C12-B-1"
  },
  "OPEN-S08-C12-C-2": {
    "id": "OPEN-S08-C12-C-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "That's a much stronger way to handle it.",
    "channel": "sophie",
    "next": "OPEN-S08-AFTER-12-1-WAIT",
    "heardFacts": [
      "OPEN-S08-C12-C-2:reported"
    ]
  },
  "OPEN-S08-C12-C-2-WAIT": {
    "id": "OPEN-S08-C12-C-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-C12-C-2"
  },
  "OPEN-S08-C12-C-1": {
    "id": "OPEN-S08-C12-C-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Thank you.",
    "channel": "sophie",
    "next": "OPEN-S08-C12-C-2-WAIT",
    "heardFacts": [
      "OPEN-S08-C12-C-1:reported"
    ]
  },
  "OPEN-S08-C12-C-1-WAIT": {
    "id": "OPEN-S08-C12-C-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-C12-C-1"
  },
  "OPEN-S08-C12": {
    "id": "OPEN-S08-C12",
    "kind": "choice",
    "number": "S08-C12",
    "channel": "sophie",
    "choices": [
      {
        "id": "a",
        "text": "I found an official public routing desk. That tells me where to ask, not which office created your reference. Right?",
        "next": "OPEN-S08-C12-A-1-WAIT"
      },
      {
        "id": "b",
        "text": "Did your reporting note tell you which office created GB-REF-017?",
        "next": "OPEN-S08-C12-B-1-WAIT"
      },
      {
        "id": "c",
        "text": "I won't quote the missing notice. I'll look for the official record before drawing conclusions.",
        "next": "OPEN-S08-C12-C-1-WAIT"
      }
    ]
  },
  "OPEN-S08-AFTER-13-2": {
    "id": "OPEN-S08-AFTER-13-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "You can just say you're tired. That counts.",
    "channel": "sophie",
    "next": "OPEN-S08-C14",
    "heardFacts": [
      "OPEN-S08-AFTER-13-2:reported"
    ]
  },
  "OPEN-S08-AFTER-13-2-WAIT": {
    "id": "OPEN-S08-AFTER-13-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-AFTER-13-2"
  },
  "OPEN-S08-AFTER-13-1": {
    "id": "OPEN-S08-AFTER-13-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Have you been doing okay with all this?",
    "channel": "sophie",
    "next": "OPEN-S08-AFTER-13-2-WAIT",
    "heardFacts": [
      "OPEN-S08-AFTER-13-1:reported"
    ]
  },
  "OPEN-S08-AFTER-13-1-WAIT": {
    "id": "OPEN-S08-AFTER-13-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-AFTER-13-1"
  },
  "OPEN-S08-C13-A-2": {
    "id": "OPEN-S08-C13-A-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Most of the time, he was.",
    "channel": "sophie",
    "next": "OPEN-S08-AFTER-13-1-WAIT",
    "heardFacts": [
      "OPEN-S08-C13-A-2:reported"
    ]
  },
  "OPEN-S08-C13-A-2-WAIT": {
    "id": "OPEN-S08-C13-A-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-C13-A-2"
  },
  "OPEN-S08-C13-A-1": {
    "id": "OPEN-S08-C13-A-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "It is. He thought he was very funny.",
    "channel": "sophie",
    "next": "OPEN-S08-C13-A-2-WAIT",
    "heardFacts": [
      "OPEN-S08-C13-A-1:reported"
    ]
  },
  "OPEN-S08-C13-A-1-WAIT": {
    "id": "OPEN-S08-C13-A-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-C13-A-1"
  },
  "OPEN-S08-C13-A-EFFECT": {
    "id": "OPEN-S08-C13-A-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "affinity": 2
      }
    },
    "next": "OPEN-S08-C13-A-1-WAIT"
  },
  "OPEN-S08-C13-B-2": {
    "id": "OPEN-S08-C13-B-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "People get quiet when I do. It makes me feel like I should stop talking.",
    "channel": "sophie",
    "next": "OPEN-S08-AFTER-13-1-WAIT",
    "heardFacts": [
      "OPEN-S08-C13-B-2:reported"
    ]
  },
  "OPEN-S08-C13-B-2-WAIT": {
    "id": "OPEN-S08-C13-B-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-C13-B-2"
  },
  "OPEN-S08-C13-B-1": {
    "id": "OPEN-S08-C13-B-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Thanks.",
    "channel": "sophie",
    "next": "OPEN-S08-C13-B-2-WAIT",
    "heardFacts": [
      "OPEN-S08-C13-B-1:reported"
    ]
  },
  "OPEN-S08-C13-B-1-WAIT": {
    "id": "OPEN-S08-C13-B-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-C13-B-1"
  },
  "OPEN-S08-C13-B-EFFECT": {
    "id": "OPEN-S08-C13-B-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "trust": 1,
        "affinity": 1
      }
    },
    "next": "OPEN-S08-C13-B-1-WAIT"
  },
  "OPEN-S08-C13-C-2": {
    "id": "OPEN-S08-C13-C-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Actually, don't. I'll get hungry again.",
    "channel": "sophie",
    "next": "OPEN-S08-AFTER-13-1-WAIT",
    "heardFacts": [
      "OPEN-S08-C13-C-2:reported"
    ]
  },
  "OPEN-S08-C13-C-2-WAIT": {
    "id": "OPEN-S08-C13-C-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-C13-C-2"
  },
  "OPEN-S08-C13-C-1": {
    "id": "OPEN-S08-C13-C-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Please. Tell me what you had for dinner.",
    "channel": "sophie",
    "next": "OPEN-S08-C13-C-2-WAIT",
    "heardFacts": [
      "OPEN-S08-C13-C-1:reported"
    ]
  },
  "OPEN-S08-C13-C-1-WAIT": {
    "id": "OPEN-S08-C13-C-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-C13-C-1"
  },
  "OPEN-S08-C13-C-EFFECT": {
    "id": "OPEN-S08-C13-C-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "affinity": 1
      }
    },
    "next": "OPEN-S08-C13-C-1-WAIT"
  },
  "OPEN-S08-C13": {
    "id": "OPEN-S08-C13",
    "kind": "choice",
    "number": "S08-C13",
    "channel": "sophie",
    "choices": [
      {
        "id": "a",
        "text": "That sounds like something he'd say.",
        "next": "OPEN-S08-C13-A-EFFECT"
      },
      {
        "id": "b",
        "text": "You don't have to apologise for mentioning him.",
        "next": "OPEN-S08-C13-B-EFFECT"
      },
      {
        "id": "c",
        "text": "Want to talk about literally anything else?",
        "next": "OPEN-S08-C13-C-EFFECT"
      }
    ]
  },
  "OPEN-S08-AFTER-14-3": {
    "id": "OPEN-S08-AFTER-14-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "Goodnight.",
    "channel": "sophie",
    "next": "OPEN-S08-sophie-END",
    "heardFacts": [
      "OPEN-S08-AFTER-14-3:reported"
    ]
  },
  "OPEN-S08-AFTER-14-3-WAIT": {
    "id": "OPEN-S08-AFTER-14-3-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-AFTER-14-3"
  },
  "OPEN-S08-AFTER-14-2": {
    "id": "OPEN-S08-AFTER-14-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Thank you for not turning every message into a case update.",
    "channel": "sophie",
    "next": "OPEN-S08-AFTER-14-3-WAIT",
    "heardFacts": [
      "OPEN-S08-AFTER-14-2:reported"
    ]
  },
  "OPEN-S08-AFTER-14-2-WAIT": {
    "id": "OPEN-S08-AFTER-14-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-AFTER-14-2"
  },
  "OPEN-S08-AFTER-14-1": {
    "id": "OPEN-S08-AFTER-14-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "I'm going to clean up the kitchen.",
    "channel": "sophie",
    "next": "OPEN-S08-AFTER-14-2-WAIT",
    "heardFacts": [
      "OPEN-S08-AFTER-14-1:reported"
    ]
  },
  "OPEN-S08-AFTER-14-1-WAIT": {
    "id": "OPEN-S08-AFTER-14-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-AFTER-14-1"
  },
  "OPEN-S08-C14-A-2": {
    "id": "OPEN-S08-C14-A-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Not every question needs a theory attached.",
    "channel": "sophie",
    "next": "OPEN-S08-AFTER-14-1-WAIT",
    "heardFacts": [
      "OPEN-S08-C14-A-2:reported"
    ]
  },
  "OPEN-S08-C14-A-2-WAIT": {
    "id": "OPEN-S08-C14-A-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-C14-A-2"
  },
  "OPEN-S08-C14-A-1": {
    "id": "OPEN-S08-C14-A-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "I think that's the only way I can bear hearing about it.",
    "channel": "sophie",
    "next": "OPEN-S08-C14-A-2-WAIT",
    "heardFacts": [
      "OPEN-S08-C14-A-1:reported"
    ]
  },
  "OPEN-S08-C14-A-1-WAIT": {
    "id": "OPEN-S08-C14-A-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-C14-A-1"
  },
  "OPEN-S08-C14-A-EFFECT": {
    "id": "OPEN-S08-C14-A-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "trust": 2
      }
    },
    "next": "OPEN-S08-C14-A-1-WAIT"
  },
  "OPEN-S08-C14-B-2": {
    "id": "OPEN-S08-C14-B-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "The pages will still be there later.",
    "channel": "sophie",
    "next": "OPEN-S08-AFTER-14-1-WAIT",
    "heardFacts": [
      "OPEN-S08-C14-B-2:reported"
    ]
  },
  "OPEN-S08-C14-B-2-WAIT": {
    "id": "OPEN-S08-C14-B-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-C14-B-2"
  },
  "OPEN-S08-C14-B-1": {
    "id": "OPEN-S08-C14-B-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Then stop for tonight, seriously.",
    "channel": "sophie",
    "next": "OPEN-S08-C14-B-2-WAIT",
    "heardFacts": [
      "OPEN-S08-C14-B-1:reported"
    ]
  },
  "OPEN-S08-C14-B-1-WAIT": {
    "id": "OPEN-S08-C14-B-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-C14-B-1"
  },
  "OPEN-S08-C14-B-EFFECT": {
    "id": "OPEN-S08-C14-B-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "affinity": 2
      }
    },
    "next": "OPEN-S08-C14-B-1-WAIT"
  },
  "OPEN-S08-C14-C-2": {
    "id": "OPEN-S08-C14-C-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Can you just stay here for another minute?",
    "channel": "sophie",
    "next": "OPEN-S08-AFTER-14-1-WAIT",
    "heardFacts": [
      "OPEN-S08-C14-C-2:reported"
    ]
  },
  "OPEN-S08-C14-C-2-WAIT": {
    "id": "OPEN-S08-C14-C-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-C14-C-2"
  },
  "OPEN-S08-C14-C-1": {
    "id": "OPEN-S08-C14-C-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Not right now. I'm sorry.",
    "channel": "sophie",
    "next": "OPEN-S08-C14-C-2-WAIT",
    "heardFacts": [
      "OPEN-S08-C14-C-1:reported"
    ]
  },
  "OPEN-S08-C14-C-1-WAIT": {
    "id": "OPEN-S08-C14-C-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-C14-C-1"
  },
  "OPEN-S08-C14-C-EFFECT": {
    "id": "OPEN-S08-C14-C-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "trust": 1,
        "affinity": 1
      }
    },
    "next": "OPEN-S08-C14-C-1-WAIT"
  },
  "OPEN-S08-C14": {
    "id": "OPEN-S08-C14",
    "kind": "choice",
    "number": "S08-C14",
    "channel": "sophie",
    "choices": [
      {
        "id": "a",
        "text": "I'm okay. I'm trying to keep the public facts separate from guesses.",
        "next": "OPEN-S08-C14-A-EFFECT"
      },
      {
        "id": "b",
        "text": "I'm tired of staring at documents.",
        "next": "OPEN-S08-C14-B-EFFECT"
      },
      {
        "id": "c",
        "text": "Can I tell you one small public update? Only if you want.",
        "next": "OPEN-S08-C14-C-EFFECT"
      }
    ]
  },
  "OPEN-S08-GROUP-C15-A-2": {
    "id": "OPEN-S08-GROUP-C15-A-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Okay.",
    "channel": "group",
    "next": "OPEN-S08-group-END",
    "heardFacts": [
      "OPEN-S08-GROUP-C15-A-2:reported"
    ]
  },
  "OPEN-S08-GROUP-C15-A-2-WAIT": {
    "id": "OPEN-S08-GROUP-C15-A-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-GROUP-C15-A-2"
  },
  "OPEN-S08-GROUP-C15-A-1": {
    "id": "OPEN-S08-GROUP-C15-A-1",
    "kind": "npc",
    "sender": "maya",
    "text": "That's a useful distinction. We need the original before we can compare anything.",
    "channel": "group",
    "next": "OPEN-S08-GROUP-C15-A-2-WAIT",
    "heardFacts": [
      "OPEN-S08-GROUP-C15-A-1:reported"
    ]
  },
  "OPEN-S08-GROUP-C15-A-1-WAIT": {
    "id": "OPEN-S08-GROUP-C15-A-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S08-GROUP-C15-A-1"
  },
  "OPEN-S08-GROUP-C15-B-2": {
    "id": "OPEN-S08-GROUP-C15-B-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Thanks for keeping it clear.",
    "channel": "group",
    "next": "OPEN-S08-group-END",
    "heardFacts": [
      "OPEN-S08-GROUP-C15-B-2:reported"
    ]
  },
  "OPEN-S08-GROUP-C15-B-2-WAIT": {
    "id": "OPEN-S08-GROUP-C15-B-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-GROUP-C15-B-2"
  },
  "OPEN-S08-GROUP-C15-B-1": {
    "id": "OPEN-S08-GROUP-C15-B-1",
    "kind": "npc",
    "sender": "maya",
    "text": "Agreed. A file name isn't its provenance.",
    "channel": "group",
    "next": "OPEN-S08-GROUP-C15-B-2-WAIT",
    "heardFacts": [
      "OPEN-S08-GROUP-C15-B-1:reported"
    ]
  },
  "OPEN-S08-GROUP-C15-B-1-WAIT": {
    "id": "OPEN-S08-GROUP-C15-B-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S08-GROUP-C15-B-1"
  },
  "OPEN-S08-GROUP-C15-C-2": {
    "id": "OPEN-S08-GROUP-C15-C-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Okay. Thank you.",
    "channel": "group",
    "next": "OPEN-S08-group-END",
    "heardFacts": [
      "OPEN-S08-GROUP-C15-C-2:reported"
    ]
  },
  "OPEN-S08-GROUP-C15-C-2-WAIT": {
    "id": "OPEN-S08-GROUP-C15-C-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-GROUP-C15-C-2"
  },
  "OPEN-S08-GROUP-C15-C-1": {
    "id": "OPEN-S08-GROUP-C15-C-1",
    "kind": "npc",
    "sender": "maya",
    "text": "Makes sense. An actual series ID would tell us more than another guess.",
    "channel": "group",
    "next": "OPEN-S08-GROUP-C15-C-2-WAIT",
    "heardFacts": [
      "OPEN-S08-GROUP-C15-C-1:reported"
    ]
  },
  "OPEN-S08-GROUP-C15-C-1-WAIT": {
    "id": "OPEN-S08-GROUP-C15-C-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S08-GROUP-C15-C-1"
  },
  "OPEN-S08-C15": {
    "id": "OPEN-S08-C15",
    "kind": "choice",
    "number": "S08-C15",
    "channel": "group",
    "choices": [
      {
        "id": "a",
        "text": "There's a public civic desk for locating notice records, but that doesn't identify who issued the document in the article.",
        "next": "OPEN-S08-GROUP-C15-A-1-WAIT"
      },
      {
        "id": "b",
        "text": "The publisher's reference still has no verified issuer or document. I don't want us treating the label as proof.",
        "next": "OPEN-S08-GROUP-C15-B-1-WAIT"
      },
      {
        "id": "c",
        "text": "I'm going to check public transfer headings before sharing another theory about Daniel.",
        "next": "OPEN-S08-GROUP-C15-C-1-WAIT"
      }
    ]
  },
  "OPEN-S08-CIVIC-REPLY-A-7": {
    "id": "OPEN-S08-CIVIC-REPLY-A-7",
    "kind": "npc",
    "sender": "sophie",
    "text": "But I'd rather give you the limit than a name I can't support.",
    "channel": "sophie",
    "next": "OPEN-S08-C09",
    "heardFacts": [
      "OPEN-S08-CIVIC-REPLY-A-7:reported"
    ]
  },
  "OPEN-S08-CIVIC-REPLY-A-7-WAIT": {
    "id": "OPEN-S08-CIVIC-REPLY-A-7-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-A-7"
  },
  "OPEN-S08-CIVIC-REPLY-A-6": {
    "id": "OPEN-S08-CIVIC-REPLY-A-6",
    "kind": "npc",
    "sender": "sophie",
    "text": "I know that's not much to take back.",
    "channel": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-A-7-WAIT",
    "heardFacts": [
      "OPEN-S08-CIVIC-REPLY-A-6:reported"
    ]
  },
  "OPEN-S08-CIVIC-REPLY-A-6-WAIT": {
    "id": "OPEN-S08-CIVIC-REPLY-A-6-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-A-6"
  },
  "OPEN-S08-CIVIC-REPLY-A-5": {
    "id": "OPEN-S08-CIVIC-REPLY-A-5",
    "kind": "npc",
    "sender": "sophie",
    "text": "If you find an original record number, an official title or a specific series, use that in your next question.",
    "channel": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-A-6-WAIT",
    "heardFacts": [
      "OPEN-S08-CIVIC-REPLY-A-5:reported"
    ]
  },
  "OPEN-S08-CIVIC-REPLY-A-5-WAIT": {
    "id": "OPEN-S08-CIVIC-REPLY-A-5-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-A-5"
  },
  "OPEN-S08-CIVIC-REPLY-A-4": {
    "id": "OPEN-S08-CIVIC-REPLY-A-4",
    "kind": "npc",
    "sender": "sophie",
    "text": "That is guidance. We have not found your notice.",
    "channel": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-A-5-WAIT",
    "heardFacts": [
      "OPEN-S08-CIVIC-REPLY-A-4:reported"
    ]
  },
  "OPEN-S08-CIVIC-REPLY-A-4-WAIT": {
    "id": "OPEN-S08-CIVIC-REPLY-A-4-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-A-4"
  },
  "OPEN-S08-CIVIC-REPLY-A-3": {
    "id": "OPEN-S08-CIVIC-REPLY-A-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "Start with the general public-notices route. If the issuing office is identified, a records request can be directed there.",
    "channel": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-A-4-WAIT",
    "heardFacts": [
      "OPEN-S08-CIVIC-REPLY-A-3:reported"
    ]
  },
  "OPEN-S08-CIVIC-REPLY-A-3-WAIT": {
    "id": "OPEN-S08-CIVIC-REPLY-A-3-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-A-3"
  },
  "OPEN-S08-CIVIC-REPLY-A-2": {
    "id": "OPEN-S08-CIVIC-REPLY-A-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "We can tell you where a locating question starts. We cannot certify a document you haven't identified.",
    "channel": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-A-3-WAIT",
    "heardFacts": [
      "OPEN-S08-CIVIC-REPLY-A-2:reported"
    ]
  },
  "OPEN-S08-CIVIC-REPLY-A-2-WAIT": {
    "id": "OPEN-S08-CIVIC-REPLY-A-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-A-2"
  },
  "OPEN-S08-CIVIC-REPLY-A-1": {
    "id": "OPEN-S08-CIVIC-REPLY-A-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Hello. This is the public-notices routing inbox.",
    "channel": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-A-2-WAIT",
    "heardFacts": [
      "OPEN-S08-CIVIC-REPLY-A-1:reported"
    ]
  },
  "OPEN-S08-CIVIC-REPLY-A-1-WAIT": {
    "id": "OPEN-S08-CIVIC-REPLY-A-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-A-1"
  },
  "OPEN-S08-CIVIC-REPLY-B-7": {
    "id": "OPEN-S08-CIVIC-REPLY-B-7",
    "kind": "npc",
    "sender": "sophie",
    "text": "But I'd rather give you the limit than a name I can't support.",
    "channel": "sophie",
    "next": "OPEN-S08-C09",
    "heardFacts": [
      "OPEN-S08-CIVIC-REPLY-B-7:reported"
    ]
  },
  "OPEN-S08-CIVIC-REPLY-B-7-WAIT": {
    "id": "OPEN-S08-CIVIC-REPLY-B-7-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-B-7"
  },
  "OPEN-S08-CIVIC-REPLY-B-6": {
    "id": "OPEN-S08-CIVIC-REPLY-B-6",
    "kind": "npc",
    "sender": "sophie",
    "text": "I know that's not much to take back.",
    "channel": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-B-7-WAIT",
    "heardFacts": [
      "OPEN-S08-CIVIC-REPLY-B-6:reported"
    ]
  },
  "OPEN-S08-CIVIC-REPLY-B-6-WAIT": {
    "id": "OPEN-S08-CIVIC-REPLY-B-6-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-B-6"
  },
  "OPEN-S08-CIVIC-REPLY-B-5": {
    "id": "OPEN-S08-CIVIC-REPLY-B-5",
    "kind": "npc",
    "sender": "sophie",
    "text": "If you find an original record number, an official title or a specific series, use that in your next question.",
    "channel": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-B-6-WAIT",
    "heardFacts": [
      "OPEN-S08-CIVIC-REPLY-B-5:reported"
    ]
  },
  "OPEN-S08-CIVIC-REPLY-B-5-WAIT": {
    "id": "OPEN-S08-CIVIC-REPLY-B-5-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-B-5"
  },
  "OPEN-S08-CIVIC-REPLY-B-4": {
    "id": "OPEN-S08-CIVIC-REPLY-B-4",
    "kind": "npc",
    "sender": "sophie",
    "text": "We have not identified an original notice or its issuer.",
    "channel": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-B-5-WAIT",
    "heardFacts": [
      "OPEN-S08-CIVIC-REPLY-B-4:reported"
    ]
  },
  "OPEN-S08-CIVIC-REPLY-B-4-WAIT": {
    "id": "OPEN-S08-CIVIC-REPLY-B-4-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-B-4"
  },
  "OPEN-S08-CIVIC-REPLY-B-3": {
    "id": "OPEN-S08-CIVIC-REPLY-B-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "The reference you supplied appears to be a publisher's label, not a civic record number we can match from that message.",
    "channel": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-B-4-WAIT",
    "heardFacts": [
      "OPEN-S08-CIVIC-REPLY-B-3:reported"
    ]
  },
  "OPEN-S08-CIVIC-REPLY-B-3-WAIT": {
    "id": "OPEN-S08-CIVIC-REPLY-B-3-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-B-3"
  },
  "OPEN-S08-CIVIC-REPLY-B-2": {
    "id": "OPEN-S08-CIVIC-REPLY-B-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "We can tell you where a locating question starts. We cannot certify a document you haven't identified.",
    "channel": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-B-3-WAIT",
    "heardFacts": [
      "OPEN-S08-CIVIC-REPLY-B-2:reported"
    ]
  },
  "OPEN-S08-CIVIC-REPLY-B-2-WAIT": {
    "id": "OPEN-S08-CIVIC-REPLY-B-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-B-2"
  },
  "OPEN-S08-CIVIC-REPLY-B-1": {
    "id": "OPEN-S08-CIVIC-REPLY-B-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Hello. This is the public-notices routing inbox.",
    "channel": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-B-2-WAIT",
    "heardFacts": [
      "OPEN-S08-CIVIC-REPLY-B-1:reported"
    ]
  },
  "OPEN-S08-CIVIC-REPLY-B-1-WAIT": {
    "id": "OPEN-S08-CIVIC-REPLY-B-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-B-1"
  },
  "OPEN-S08-CIVIC-REPLY-C-7": {
    "id": "OPEN-S08-CIVIC-REPLY-C-7",
    "kind": "npc",
    "sender": "sophie",
    "text": "But I'd rather give you the limit than a name I can't support.",
    "channel": "sophie",
    "next": "OPEN-S08-C09",
    "heardFacts": [
      "OPEN-S08-CIVIC-REPLY-C-7:reported"
    ]
  },
  "OPEN-S08-CIVIC-REPLY-C-7-WAIT": {
    "id": "OPEN-S08-CIVIC-REPLY-C-7-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-C-7"
  },
  "OPEN-S08-CIVIC-REPLY-C-6": {
    "id": "OPEN-S08-CIVIC-REPLY-C-6",
    "kind": "npc",
    "sender": "sophie",
    "text": "I know that's not much to take back.",
    "channel": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-C-7-WAIT",
    "heardFacts": [
      "OPEN-S08-CIVIC-REPLY-C-6:reported"
    ]
  },
  "OPEN-S08-CIVIC-REPLY-C-6-WAIT": {
    "id": "OPEN-S08-CIVIC-REPLY-C-6-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-C-6"
  },
  "OPEN-S08-CIVIC-REPLY-C-5": {
    "id": "OPEN-S08-CIVIC-REPLY-C-5",
    "kind": "npc",
    "sender": "sophie",
    "text": "If you find an original record number, an official title or a specific series, use that in your next question.",
    "channel": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-C-6-WAIT",
    "heardFacts": [
      "OPEN-S08-CIVIC-REPLY-C-5:reported"
    ]
  },
  "OPEN-S08-CIVIC-REPLY-C-5-WAIT": {
    "id": "OPEN-S08-CIVIC-REPLY-C-5-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-C-5"
  },
  "OPEN-S08-CIVIC-REPLY-C-4": {
    "id": "OPEN-S08-CIVIC-REPLY-C-4",
    "kind": "npc",
    "sender": "sophie",
    "text": "We cannot say a particular notice transferred without an identified series or document.",
    "channel": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-C-5-WAIT",
    "heardFacts": [
      "OPEN-S08-CIVIC-REPLY-C-4:reported"
    ]
  },
  "OPEN-S08-CIVIC-REPLY-C-4-WAIT": {
    "id": "OPEN-S08-CIVIC-REPLY-C-4-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-C-4"
  },
  "OPEN-S08-CIVIC-REPLY-C-3": {
    "id": "OPEN-S08-CIVIC-REPLY-C-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "For older material, the former-office guide describes how a record series can move between custodians.",
    "channel": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-C-4-WAIT",
    "heardFacts": [
      "OPEN-S08-CIVIC-REPLY-C-3:reported"
    ]
  },
  "OPEN-S08-CIVIC-REPLY-C-3-WAIT": {
    "id": "OPEN-S08-CIVIC-REPLY-C-3-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-C-3"
  },
  "OPEN-S08-CIVIC-REPLY-C-2": {
    "id": "OPEN-S08-CIVIC-REPLY-C-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "We can tell you where a locating question starts. We cannot certify a document you haven't identified.",
    "channel": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-C-3-WAIT",
    "heardFacts": [
      "OPEN-S08-CIVIC-REPLY-C-2:reported"
    ]
  },
  "OPEN-S08-CIVIC-REPLY-C-2-WAIT": {
    "id": "OPEN-S08-CIVIC-REPLY-C-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-C-2"
  },
  "OPEN-S08-CIVIC-REPLY-C-1": {
    "id": "OPEN-S08-CIVIC-REPLY-C-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Hello. This is the public-notices routing inbox.",
    "channel": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-C-2-WAIT",
    "heardFacts": [
      "OPEN-S08-CIVIC-REPLY-C-1:reported"
    ]
  },
  "OPEN-S08-CIVIC-REPLY-C-1-WAIT": {
    "id": "OPEN-S08-CIVIC-REPLY-C-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-CIVIC-REPLY-C-1"
  },
  "OPEN-S08-PRO-OPEN-2": {
    "id": "OPEN-S08-PRO-OPEN-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "If this is about the public record, I can answer what I actually know from our published note. Not an office's private file.",
    "channel": "sophie",
    "next": "OPEN-S08-C12",
    "heardFacts": [
      "OPEN-S08-PRO-OPEN-2:reported"
    ]
  },
  "OPEN-S08-PRO-OPEN-2-WAIT": {
    "id": "OPEN-S08-PRO-OPEN-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-PRO-OPEN-2"
  },
  "OPEN-S08-PRO-OPEN-1": {
    "id": "OPEN-S08-PRO-OPEN-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Hey.",
    "channel": "sophie",
    "next": "OPEN-S08-PRO-OPEN-2-WAIT",
    "heardFacts": [
      "OPEN-S08-PRO-OPEN-1:reported"
    ]
  },
  "OPEN-S08-PRO-OPEN-1-WAIT": {
    "id": "OPEN-S08-PRO-OPEN-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-PRO-OPEN-1"
  },
  "OPEN-S08-SOPHIE-OPEN-5": {
    "id": "OPEN-S08-SOPHIE-OPEN-5",
    "kind": "npc",
    "sender": "sophie",
    "text": "Sorry. I didn't mean to make that sad.",
    "channel": "sophie",
    "next": "OPEN-S08-C13",
    "heardFacts": [
      "OPEN-S08-SOPHIE-OPEN-5:reported"
    ]
  },
  "OPEN-S08-SOPHIE-OPEN-5-WAIT": {
    "id": "OPEN-S08-SOPHIE-OPEN-5-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-SOPHIE-OPEN-5"
  },
  "OPEN-S08-SOPHIE-OPEN-4": {
    "id": "OPEN-S08-SOPHIE-OPEN-4",
    "kind": "npc",
    "sender": "sophie",
    "text": "He ate it anyway.",
    "channel": "sophie",
    "next": "OPEN-S08-SOPHIE-OPEN-5-WAIT",
    "heardFacts": [
      "OPEN-S08-SOPHIE-OPEN-4:reported"
    ]
  },
  "OPEN-S08-SOPHIE-OPEN-4-WAIT": {
    "id": "OPEN-S08-SOPHIE-OPEN-4-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-SOPHIE-OPEN-4"
  },
  "OPEN-S08-SOPHIE-OPEN-3": {
    "id": "OPEN-S08-SOPHIE-OPEN-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "Daniel used to stand there and say it was 'just crispy'.",
    "channel": "sophie",
    "next": "OPEN-S08-SOPHIE-OPEN-4-WAIT",
    "heardFacts": [
      "OPEN-S08-SOPHIE-OPEN-3:reported"
    ]
  },
  "OPEN-S08-SOPHIE-OPEN-3-WAIT": {
    "id": "OPEN-S08-SOPHIE-OPEN-3-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-SOPHIE-OPEN-3"
  },
  "OPEN-S08-SOPHIE-OPEN-2": {
    "id": "OPEN-S08-SOPHIE-OPEN-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "I burned the rice. Again.",
    "channel": "sophie",
    "next": "OPEN-S08-SOPHIE-OPEN-3-WAIT",
    "heardFacts": [
      "OPEN-S08-SOPHIE-OPEN-2:reported"
    ]
  },
  "OPEN-S08-SOPHIE-OPEN-2-WAIT": {
    "id": "OPEN-S08-SOPHIE-OPEN-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-SOPHIE-OPEN-2"
  },
  "OPEN-S08-SOPHIE-OPEN-1": {
    "id": "OPEN-S08-SOPHIE-OPEN-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Hey. Sorry. I was making dinner.",
    "channel": "sophie",
    "next": "OPEN-S08-SOPHIE-OPEN-2-WAIT",
    "heardFacts": [
      "OPEN-S08-SOPHIE-OPEN-1:reported"
    ]
  },
  "OPEN-S08-SOPHIE-OPEN-1-WAIT": {
    "id": "OPEN-S08-SOPHIE-OPEN-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S08-SOPHIE-OPEN-1"
  }
}
const sourceInvestigationBase = {
  "7": {
    "choices": {
      "S07-C01": {
        "heading": "LOCAL INFO/NAVIGATION (NO SEND):",
        "mode": "local",
        "options": [
          {
            "id": "a",
            "text": "Show the name printed on the article.",
            "feedback": "The public byline reads Nora Vance. It is an article credit, not a record of every later page operation."
          },
          {
            "id": "b",
            "text": "Does the Corrections Desk speak for Nora?",
            "feedback": "The desk is a role inbox. It has not provided a private Nora message, nor a certified revision log."
          },
          {
            "id": "c",
            "text": "Can I revisit the older index first?",
            "feedback": "ARC-IDX-GB-041 remains metadata only. No readable earlier article is available there."
          }
        ]
      },
      "S07-C02": {
        "heading": "LOCAL BYLINE CLASSIFICATION (NO SEND):",
        "mode": "local",
        "options": [
          {
            "id": "a",
            "text": "Nora is credited for reporting; the page editor remains unknown.",
            "feedback": "Supported. Being named on a story isn't a change log."
          },
          {
            "id": "b",
            "text": "Nora's name means she changed the web article.",
            "feedback": "Not established. A byline doesn't identify the person who maintained the page. Try again."
          },
          {
            "id": "c",
            "text": "The site directory proves her sources are genuine.",
            "feedback": "It lists the reporter and contact route only. It doesn't authenticate a source. Try again."
          }
        ]
      },
      "S07-C03": {
        "heading": "LOCAL CHANNEL-CHECK (NO SEND, NO CONTACT):",
        "mode": "local",
        "options": [
          {
            "id": "a",
            "text": "The portrait and the first name.",
            "feedback": "Names and images can be copied. This is not the directory's case-specific route match. Try again."
          },
          {
            "id": "b",
            "text": "GB-NV-CHANNEL-001 and its listed GB-ARTICLE-001 association.",
            "feedback": "The publisher lists this professional route for the article. This checks the route's published context—not who physically reads or answers any message."
          },
          {
            "id": "c",
            "text": "The timestamp on the public update label.",
            "feedback": "The relative update label doesn't establish channel identity or message handling. Try again."
          }
        ]
      },
      "S07-C04": {
        "heading": "LOCAL INTERPRETIVE INSPECTION (NO SEND):",
        "mode": "local",
        "options": [
          {
            "id": "a",
            "text": "Why would a publisher keep a reference without a document?",
            "feedback": "The page does not state why the link is missing. A workflow reason would be a guess."
          },
          {
            "id": "b",
            "text": "Does the term public notice mean I can open one here?",
            "feedback": "No. It is a category assigned on this publisher page. The original notice is not attached."
          },
          {
            "id": "c",
            "text": "Does this note tell me who Daniel spoke to?",
            "feedback": "No people, transcripts or verified source identities are provided in the new note."
          }
        ]
      },
      "S07-C05": {
        "heading": "LOCAL EVIDENCE CLASSIFICATION (NO SEND):",
        "mode": "local",
        "options": [
          {
            "id": "a",
            "text": "The reference number is the issuing city's original number.",
            "feedback": "Not established. GB-REF-017 is a publisher marker. No public issuer has supplied a matching number. Try again."
          },
          {
            "id": "b",
            "text": "This proves the article was changed after publication.",
            "feedback": "It is a source-reference lead, not an article version or text diff. Try again."
          },
          {
            "id": "c",
            "text": "This establishes that the publisher has listed a lead, not the existence or contents of the original notice.",
            "feedback": "Supported. The published marker is real as page text; the underlying record has not been authenticated."
          }
        ]
      },
      "S07-C06": {
        "heading": "LOCAL INDEPENDENCE TEST (NO SEND):",
        "mode": "local",
        "options": [
          {
            "id": "a",
            "text": "Ask Nora to confirm she wrote the report.",
            "feedback": "That would be testimony about authorship, not independent verification of the notice. Try again."
          },
          {
            "id": "b",
            "text": "Find the issuing office and its own record identifier.",
            "feedback": "A proper custodian could provide a document you can compare. That possibility is a research plan, not yet a find."
          },
          {
            "id": "c",
            "text": "Search GB-REF-017 in the article's updated label.",
            "feedback": "The label does not index source documents. Try again."
          }
        ]
      },
      "S07-C07": {
        "heading": "LOCAL APPROACH CHOICE (NO SEND):",
        "mode": "local",
        "options": [
          {
            "id": "a",
            "text": "Open the published professional question form.",
            "feedback": "You can draft a question through the Bulletin's listed reporter route. Opening the form sends nothing."
          },
          {
            "id": "b",
            "text": "Keep this as a private lead for now.",
            "feedback": "No request sent. Public-source research remains open."
          },
          {
            "id": "c",
            "text": "Is this the same as messaging Nora privately?",
            "feedback": "No. The site lists a professional case-specific inbox, not her phone or private chat. Any reply belongs to that route."
          }
        ]
      },
      "S07-C08": {
        "heading": "OPTIONAL FORM QUESTION (SELECT → EDIT/REVIEW → SEND):",
        "mode": "form",
        "options": [
          {
            "id": "a",
            "text": "Your public reporting note lists GB-REF-017. How can a reader find the original record without asking you to disclose a private source?",
            "feedback": ""
          },
          {
            "id": "b",
            "text": "Does your byline tell us who updated the web page? I am asking about the public credit, not accusing you.",
            "feedback": ""
          },
          {
            "id": "c",
            "text": "Is GB-REF-017 a document readers can verify, or only a reference label in your publisher notes?",
            "feedback": ""
          }
        ]
      },
      "S07-C09": {
        "heading": "OPTIONAL NORA FOLLOW-UP [COMPOSER + REAL SEND]:",
        "mode": "professional",
        "options": [
          {
            "id": "a",
            "text": "Why publish a reference readers can't actually open?",
            "feedback": "",
            "next": "OPEN-S07-C09-A-1-WAIT"
          },
          {
            "id": "b",
            "text": "Are you saying Daniel gave you that reference?",
            "feedback": "",
            "next": "OPEN-S07-C09-B-1-WAIT"
          },
          {
            "id": "c",
            "text": "I'll look for an issuing office instead of guessing.",
            "feedback": "",
            "next": "OPEN-S07-C09-C-1-WAIT"
          }
        ]
      },
      "S07-C10": {
        "heading": "OPTIONAL SOPHIE OPENING [COMPOSER + SEND]:",
        "mode": "sophie",
        "options": [
          {
            "id": "a",
            "text": "Can I share one public lead? Nothing private.",
            "feedback": "",
            "next": "OPEN-S07-C10-A-EFFECT"
          },
          {
            "id": "b",
            "text": "I can hold off if today isn't a good day.",
            "feedback": "",
            "next": "OPEN-S07-C10-B-EFFECT"
          },
          {
            "id": "c",
            "text": "How are you doing, actually?",
            "feedback": "",
            "next": "OPEN-S07-C10-C-EFFECT"
          }
        ]
      },
      "S07-C11": {
        "heading": "OPTIONAL SOPHIE REPLY [COMPOSER + SEND]:",
        "mode": "sophie",
        "options": [
          {
            "id": "a",
            "text": "The reporter's public note has a reference label, but no original document. That's all I can verify from it.",
            "feedback": "",
            "withoutConsent": {
              "text": "I don't have a new fact I can stand behind yet.",
              "next": "OPEN-S07-C11-A-NO-EFFECT"
            },
            "next": "OPEN-S07-C11-A-EFFECT"
          },
          {
            "id": "b",
            "text": "What would help right now?",
            "feedback": "",
            "next": "OPEN-S07-C11-B-EFFECT"
          },
          {
            "id": "c",
            "text": "Let's talk about something completely normal.",
            "feedback": "",
            "next": "OPEN-S07-C11-C-EFFECT"
          }
        ]
      },
      "S07-C12": {
        "heading": "OPTIONAL GROUP PLAYER [COMPOSER + SEND]:",
        "mode": "group",
        "options": [
          {
            "id": "a",
            "text": "The Bulletin posted a reporting note with an unlinked reference. It doesn't include an original document.",
            "feedback": "",
            "next": "OPEN-S07-GROUP-C12-A-1-WAIT"
          },
          {
            "id": "b",
            "text": "Please don't treat Nora's byline as proof she changed the site. We don't have an edit log.",
            "feedback": "",
            "next": "OPEN-S07-GROUP-C12-B-1-WAIT"
          },
          {
            "id": "c",
            "text": "I'm going to try to find a public record issued by the proper office before I share another theory.",
            "feedback": "",
            "next": "OPEN-S07-GROUP-C12-C-1-WAIT"
          }
        ]
      },
      "S07-C13": {
        "heading": "LOCAL CATALOGUE CLASSIFICATION (NO SEND):",
        "mode": "local",
        "options": [
          {
            "id": "a",
            "text": "This catalogue can't resolve the publisher's label; I still need an issuer and an official record identifier.",
            "feedback": "Supported. The search limit is about the label you tried, not a verdict on whether the notice exists."
          },
          {
            "id": "b",
            "text": "The public notice has been deleted.",
            "feedback": "Not supported. A publisher's internal reference isn't necessarily the issuer's identifier. Try again."
          },
          {
            "id": "c",
            "text": "The reporter invented the source because the search failed.",
            "feedback": "No. The failed lookup provides no proof of motive, identity or fabrication. Try again."
          }
        ]
      },
      "S07-C14": {
        "heading": "LOCAL NEXT STEP (NO SEND):",
        "mode": "local",
        "options": [
          {
            "id": "a",
            "text": "Keep the public professional reply open, but don't treat it as an original document.",
            "feedback": "Recorded as a testimony-first research strategy. No reporter contact occurs from choosing a local strategy."
          },
          {
            "id": "b",
            "text": "Look for the actual issuing office and its public notice number.",
            "feedback": "Recorded as an independent-source research strategy. No verified issuer is found yet."
          },
          {
            "id": "c",
            "text": "Stop before giving anyone an unverified interpretation.",
            "feedback": "Recorded as a withholding strategy. The next public research route stays open."
          }
        ]
      },
      "S07-C15": {
        "heading": "FINAL PRIVATE CONCLUSION (NO SEND):",
        "mode": "local",
        "options": [
          {
            "id": "a",
            "text": "Nora is credited, but the person who maintained the site page and the source of GB-REF-017 are unverified.",
            "feedback": "Saved: separate credit, page operation and provenance."
          },
          {
            "id": "b",
            "text": "GB-REF-017 is a publisher reference, not an authenticated public notice. I need an issuer and the original document.",
            "feedback": "Saved: a traceable lead with a source gap."
          },
          {
            "id": "c",
            "text": "I will not accuse anyone or quote a missing document.",
            "feedback": "Saved: a disclosure boundary while the search continues."
          }
        ]
      }
    },
    "pages": {
      "profile": {
        "paragraphs": [
          "GREYHAVEN BULLETIN REPORTER DIRECTORY",
          "Nora Vance Reporting staff | Public byline listing",
          "Article listed in this directory: Daniel Mercer report — GB-ARTICLE-001 Published: 7 October 2026",
          "What a byline tells you The name credits reporting on the published story. It does not show who uploaded, maintained, reformatted or updated the site page.",
          "Article questions For questions about this report, readers can use the published professional reporter channel linked below. This channel is on the Bulletin's site. It is not a personal number or an invitation to contact anyone's family.",
          "Channel listing: GB-NV-CHANNEL-001 Associated article: GB-ARTICLE-001 OPEN PROFESSIONAL QUESTION FORM",
          "A public directory entry does not independently authenticate reporting sources, identify a site editor or verify any previous article version."
        ],
        "route": "browser://greyhaven-bulletin/about/reporters/nora-vance"
      },
      "note": {
        "paragraphs": [
          "GREYHAVEN BULLETIN REPORTING NOTE Article: GB-ARTICLE-001 — Daniel Mercer report",
          "About this note This is a supplementary publisher note about how the story's references were organised. It is NOT an earlier edition of the report and does not amend the article's published text.",
          "Source categories The newsroom's reporting notes refer to public-facing information and reporting conversations. This statement describes the publisher's working categories; it does not provide interview transcripts, identify an unpublished source or independently certify the underlying material.",
          "Unlinked reference GB-REF-017 is a reference marker retained in the publisher's working list. It is tagged here as a 'public notice' lead. No document is attached to this marker on this page.",
          "What is missing The issuing office, the issuer's record number, the original notice text, its date and its verified connection to this story are NOT supplied here. You cannot establish their contents from this note. The reference marker is not an article revision record.",
          "Readers can ask about published attributions through the listed professional route. A question is not permission to receive private interviews or unpublished editorial files."
        ],
        "route": "browser://greyhaven-bulletin/notes/gb-article-001"
      },
      "catalogue": {
        "paragraphs": [
          "GREYHAVEN PUBLIC RECORDS — CATALOGUE HELP",
          "Finding a public notice This catalogue is organised by the issuing public body and that body's own record number. It does not search publishers' private working-reference labels as if they were government identifiers.",
          "Trying a publisher reference Search term: GB-REF-017 Result: NO EXACT CATALOGUE MATCH UNDER THIS PUBLISHER LABEL",
          "A missing match for a publisher label is not a finding that the original public notice does not exist. The issuing body, original number and date have not yet been identified.",
          "To continue, establish a credible issuing office and a custodian record identifier from public material before claiming to have located, rejected or authenticated a notice."
        ],
        "route": "browser://greyhaven/public-records/catalogue/help"
      },
      "reference": {
        "paragraphs": [
          "REFERENCE GB-REF-017 Listed by: Greyhaven Bulletin (public reporting note) Claimed class: PUBLIC NOTICE LEAD Issuer: NOT PROVIDED Issuer record ID: NOT PROVIDED Original text: NOT AVAILABLE Record date: NOT PROVIDED External archive location: NOT PROVIDED Authenticated original: NO Connection to Daniel Mercer article: PUBLISHER REFERENCE ONLY",
          "If you cannot open the original, you cannot quote its contents."
        ],
        "route": "GB-REF-017"
      }
    },
    "entrances": {
      "professional_a": "OPEN-S07-PRO-REPLY-A-1-WAIT",
      "professional_b": "OPEN-S07-PRO-REPLY-B-1-WAIT",
      "professional_c": "OPEN-S07-PRO-REPLY-C-1-WAIT",
      "sophie": "OPEN-S07-SOPHIE-OPEN-1-WAIT",
      "group": "OPEN-S07-C12"
    },
    "sourceSha256": "c877fd8b996fe1279ceed3cde933faf69d38066cc28d23d56d13c588ee07373e"
  },
  "8": {
    "choices": {
      "S08-C01": {
        "heading": "LOCAL ARCHIVE NAVIGATION, NO SEND",
        "mode": "local",
        "options": [
          {
            "id": "a",
            "text": "Review the publisher's reference again.",
            "feedback": "GB-REF-017 has no issuing office, official ID, date or original text. Nothing new has appeared in the card."
          },
          {
            "id": "b",
            "text": "What happened to the Bulletin requests?",
            "feedback": "Each earlier request retains its own saved status and return token. Neither an unsent draft nor a pending reply proves an original notice was identified."
          },
          {
            "id": "c",
            "text": "Show me what an issuer would mean.",
            "feedback": "The issuer is the body that created or formally issued a record. The holder and the person who answers a question may be different people or offices."
          }
        ]
      },
      "S08-C02": {
        "heading": "WHICH OFFICE IS A REASONABLE FIRST STOP? LOCAL NO SEND",
        "mode": "local",
        "options": [
          {
            "id": "a",
            "text": "Municipal Communications must have approved the article.",
            "feedback": "The city communications service cannot establish who edited a private publisher's website. Try again."
          },
          {
            "id": "b",
            "text": "The General Public Notices Routing Desk can advise which office might hold a notice, without asserting it issued GB-REF-017.",
            "feedback": "Supported. You have identified a procedural contact, not the issuer or document."
          },
          {
            "id": "c",
            "text": "Records Custody automatically proves the notice exists.",
            "feedback": "No. Accepting requests is not proof of any particular document or its creator. Try again."
          }
        ]
      },
      "S08-C03": {
        "heading": "THREE-ROLE MATCH, LOCAL NO SEND",
        "mode": "local",
        "options": [
          {
            "id": "a",
            "text": "A route can direct me to a custodian; only a linked original can establish who issued the notice.",
            "feedback": "Correct distinction. Nothing here names the issuer of GB-REF-017."
          },
          {
            "id": "b",
            "text": "The desk that answers must also have written the notice.",
            "feedback": "Not necessarily. Intake and authorship are separate."
          },
          {
            "id": "c",
            "text": "A publisher's reference is the custodian's official ID.",
            "feedback": "No issuing-body ID has been supplied. Retry."
          }
        ]
      },
      "S08-C04": {
        "heading": "LOCAL SEARCH MEANING, NO SEND",
        "mode": "local",
        "options": [
          {
            "id": "a",
            "text": "No match for GB-REF-017 means someone deleted the notice.",
            "feedback": "The label is not an official notice identifier. An unsuccessful lookup does not demonstrate deletion."
          },
          {
            "id": "b",
            "text": "The article's updated label is better evidence of the issuer.",
            "feedback": "A page label is not a record issuer field. Try again."
          },
          {
            "id": "c",
            "text": "I need an official identifier or a reliable descriptor before treating a catalogue result as relevant.",
            "feedback": "Supported. The publisher label alone cannot perform that evidentiary match."
          }
        ]
      },
      "S08-C05": {
        "heading": "PREPARE A LIMITED QUESTION, LOCAL STRATEGY, NO SEND",
        "mode": "local",
        "options": [
          {
            "id": "a",
            "text": "I want the likely records custodian, not the article author's name.",
            "feedback": "Saved as a custodian-first strategy. No request sent."
          },
          {
            "id": "b",
            "text": "I want to know which public office handles the category.",
            "feedback": "Saved as an issuer-routing strategy. No request sent."
          },
          {
            "id": "c",
            "text": "I want to preserve uncertainty until a document can be located.",
            "feedback": "Saved as a hold-first strategy. No request sent."
          }
        ]
      },
      "S08-C06": {
        "heading": "WHAT SHOULD A LOCATING REQUEST SAY? LOCAL NO SEND",
        "mode": "local",
        "options": [
          {
            "id": "a",
            "text": "Please confirm this notice was revised after publication.",
            "feedback": "No notice has been located. Revision language assumes the conclusion. Retry."
          },
          {
            "id": "b",
            "text": "I have a publisher-labelled public-notice lead with no original number. Which public service route could identify its custodian?",
            "feedback": "Supported. This describes the missing details without presenting the publisher label as an official file."
          },
          {
            "id": "c",
            "text": "Which staff member concealed GB-REF-017?",
            "feedback": "No concealment or named person is established. Retry."
          }
        ]
      },
      "S08-C07": {
        "heading": "CAN THE TRANSFER GUIDE IDENTIFY THIS FILE? LOCAL NO SEND",
        "mode": "local",
        "options": [
          {
            "id": "a",
            "text": "Yes, it proves the original notice moved to a successor office.",
            "feedback": "The guide describes possibilities; no matching transfer entry or original file is attached. Try again."
          },
          {
            "id": "b",
            "text": "No public notice exists because none is shown on this page.",
            "feedback": "This is guidance, not an exhaustive records index."
          },
          {
            "id": "c",
            "text": "No. A specific transfer entry and record series would still have to link the original notice to an issuer or custodian.",
            "feedback": "Supported. That is the missing next comparison."
          }
        ]
      },
      "S08-C08": {
        "heading": "OPTIONAL QUESTION (SELECT -> EDIT -> REVIEW -> SEND)",
        "mode": "form",
        "options": [
          {
            "id": "a",
            "text": "I am trying to identify the proper public records route for a notice cited only by a publisher. Which desk handles locating a notice when the issuing office is unknown?",
            "feedback": ""
          },
          {
            "id": "b",
            "text": "A public publisher note uses the reference GB-REF-017 for a possible public notice. This is not an official record number. Which public office can help identify a custodian?",
            "feedback": ""
          },
          {
            "id": "c",
            "text": "Does the service directory have guidance on former office names or transfer series for public notices without known dates or official identifiers?",
            "feedback": ""
          }
        ]
      },
      "S08-C09": {
        "heading": "OPTIONAL FOLLOW-UP TO CIVIC INBOX, REAL CHAT SEND",
        "mode": "civic",
        "options": [
          {
            "id": "a",
            "text": "So the first useful step is finding a record series, not assuming the publisher's reference is a file number?",
            "feedback": "",
            "next": "OPEN-S08-C09-A-1-WAIT"
          },
          {
            "id": "b",
            "text": "Can you tell me which person last edited the Bulletin?",
            "feedback": "",
            "next": "OPEN-S08-C09-B-1-WAIT"
          },
          {
            "id": "c",
            "text": "Thank you. I'll keep the difference between a request and a record clear.",
            "feedback": "",
            "next": "OPEN-S08-C09-C-1-WAIT"
          }
        ]
      },
      "S08-C10": {
        "heading": "CHOOSE THE EVIDENTIARY NEXT STEP, LOCAL NO SEND",
        "mode": "local",
        "options": [
          {
            "id": "a",
            "text": "Treat the city's route code as the missing notice number.",
            "feedback": "GH-PN-ROUTE names an intake service. It does not authenticate the publisher's GB-REF-017."
          },
          {
            "id": "b",
            "text": "Look for an identified issuer/series and an actual original record with attributable provenance before making a content claim.",
            "feedback": "Supported. This is the first step that could establish the notice's contents or custody when genuine material is found."
          },
          {
            "id": "c",
            "text": "Assume the notice was transferred and therefore altered.",
            "feedback": "Neither transfer nor alteration has been shown."
          }
        ]
      },
      "S08-C11": {
        "heading": "PRIVATE INVESTIGATION PRIORITY, ALL THREE ADVANCE",
        "mode": "local",
        "options": [
          {
            "id": "a",
            "text": "Try to identify a public record series in the transfer register.",
            "feedback": "Private priority saved: series-first. No document found."
          },
          {
            "id": "b",
            "text": "Check former-office names before searching a custodian index.",
            "feedback": "Private priority saved: alias-first. No issuer confirmed."
          },
          {
            "id": "c",
            "text": "Keep correspondence separate until I have a source I can verify.",
            "feedback": "Private priority saved: source-first. No inbox is sent."
          }
        ]
      },
      "S08-C12": {
        "heading": "OPTIONAL NORA PROFESSIONAL QUESTION, COMPOSER + REAL SEND",
        "mode": "professional",
        "options": [
          {
            "id": "a",
            "text": "I found an official public routing desk. That tells me where to ask, not which office created your reference. Right?",
            "feedback": "",
            "next": "OPEN-S08-C12-A-1-WAIT"
          },
          {
            "id": "b",
            "text": "Did your reporting note tell you which office created GB-REF-017?",
            "feedback": "",
            "next": "OPEN-S08-C12-B-1-WAIT"
          },
          {
            "id": "c",
            "text": "I won't quote the missing notice. I'll look for the official record before drawing conclusions.",
            "feedback": "",
            "next": "OPEN-S08-C12-C-1-WAIT"
          }
        ]
      },
      "S08-C13": {
        "heading": "OPTIONAL PRIVATE REPLY, COMPOSER + SEND",
        "mode": "sophie",
        "options": [
          {
            "id": "a",
            "text": "That sounds like something he'd say.",
            "feedback": "",
            "next": "OPEN-S08-C13-A-EFFECT"
          },
          {
            "id": "b",
            "text": "You don't have to apologise for mentioning him.",
            "feedback": "",
            "next": "OPEN-S08-C13-B-EFFECT"
          },
          {
            "id": "c",
            "text": "Want to talk about literally anything else?",
            "feedback": "",
            "next": "OPEN-S08-C13-C-EFFECT"
          }
        ]
      },
      "S08-C14": {
        "heading": "OPTIONAL PRIVATE REPLY, COMPOSER + SEND",
        "mode": "sophie",
        "options": [
          {
            "id": "a",
            "text": "I'm okay. I'm trying to keep the public facts separate from guesses.",
            "feedback": "",
            "next": "OPEN-S08-C14-A-EFFECT"
          },
          {
            "id": "b",
            "text": "I'm tired of staring at documents.",
            "feedback": "",
            "next": "OPEN-S08-C14-B-EFFECT"
          },
          {
            "id": "c",
            "text": "Can I tell you one small public update? Only if you want.",
            "feedback": "",
            "next": "OPEN-S08-C14-C-EFFECT"
          }
        ]
      },
      "S08-C15": {
        "heading": "OPTIONAL GROUP PUBLIC MESSAGE, COMPOSER + REAL SEND",
        "mode": "group",
        "options": [
          {
            "id": "a",
            "text": "There's a public civic desk for locating notice records, but that doesn't identify who issued the document in the article.",
            "feedback": "",
            "next": "OPEN-S08-GROUP-C15-A-1-WAIT"
          },
          {
            "id": "b",
            "text": "The publisher's reference still has no verified issuer or document. I don't want us treating the label as proof.",
            "feedback": "",
            "next": "OPEN-S08-GROUP-C15-B-1-WAIT"
          },
          {
            "id": "c",
            "text": "I'm going to check public transfer headings before sharing another theory about Daniel.",
            "feedback": "",
            "next": "OPEN-S08-GROUP-C15-C-1-WAIT"
          }
        ]
      },
      "S08-C16": {
        "heading": "FINAL PRIVATE STANCE, NO SEND",
        "mode": "local",
        "options": [
          {
            "id": "a",
            "text": "The civic desk is a way to ask, not proof of which office issued the notice.",
            "feedback": "Saved: intake route distinguished from provenance."
          },
          {
            "id": "b",
            "text": "I need the record series or issuer's official number before I treat GB-REF-017 as a source document.",
            "feedback": "Saved: independent identifier required."
          },
          {
            "id": "c",
            "text": "I won't attach Daniel, Nora or another person to an unseen notice.",
            "feedback": "Saved: personal attribution withheld."
          }
        ]
      }
    },
    "pages": {
      "directory": {
        "paragraphs": [
          "GREYHAVEN CIVIC SERVICES PUBLIC RECORDS — WHERE TO START",
          "This directory describes the public service routes for records questions. It does not certify that an individual document exists.",
          "GENERAL PUBLIC NOTICES ROUTING DESK Route code: GH-PN-ROUTE Purpose: Help a reader identify the likely custodian or issuing body for a public notice when the official record number is not known. This is an intake and referral service, not the source of every notice.",
          "MUNICIPAL COMMUNICATIONS COUNTER Purpose: Questions about press statements and municipal websites. This counter does not supply an independent publisher edit history.",
          "RECORDS CUSTODY / REQUESTS Purpose: Accept a request for records held under an identified custodian, subject to that custodian's rules. A request alone is not a record, and a custodian is not necessarily its creator.",
          "Before sending a routing question, include the public category and what identifying details are missing. Do not submit another person's private messages or assume a publisher's reference is a civic number.",
          "This directory can direct a question. It cannot verify a notice from an unauthenticated external label."
        ],
        "route": "browser://greyhaven/civic-records/service-directory"
      },
      "index": {
        "paragraphs": [
          "GREYHAVEN CIVIC SERVICES — INDEX HELP SEARCHING PUBLIC NOTICES",
          "The public notices index accepts an issuing body, an official record number, or a sufficiently specific public descriptor when available.",
          "A publisher's private reference string is not automatically an issuing body's number. Searching it alone can return no results even when records exist in a separate collection.",
          "If you lack an official identifier, a locating inquiry can ask which public office handles that category. The answer may be procedural only. It is not a certificate that a requested record exists.",
          "A source should be checked against an official copy when one is located. A directory route, a public search error and a receipt for an inquiry are not substitutes for the underlying notice."
        ],
        "route": "browser://greyhaven/civic-records/index/search-help"
      },
      "guide": {
        "paragraphs": [
          "GREYHAVEN CIVIC SERVICES RECORDS GUIDANCE — FORMER OFFICES AND TRANSFERS",
          "When a public office changes its name or transfers older records, searching only the current office name may miss the correct catalogue heading. Some files can be held by a successor custodian without having been created by that custodian.",
          "A transfer listing, if located, should be read for the record series, transfer dates and named offices. A service directory alone does not prove that a particular notice was part of a transfer.",
          "There is no original notice, issuer name, series number or transfer entry identified for the publisher reference GB-REF-017 on this page. The general guidance is not evidence of a transfer for that reference.",
          "Public guide sections: IDENTIFY FORMER OFFICE / CHECK SERIES RANGE / REQUEST A CUSTODIAN ROUTE"
        ],
        "route": "browser://greyhaven/civic-records/guidance/former-offices"
      }
    },
    "entrances": {
      "civic_a": "OPEN-S08-CIVIC-REPLY-A-1-WAIT",
      "civic_b": "OPEN-S08-CIVIC-REPLY-B-1-WAIT",
      "civic_c": "OPEN-S08-CIVIC-REPLY-C-1-WAIT",
      "professional": "OPEN-S08-PRO-OPEN-1-WAIT",
      "sophie": "OPEN-S08-SOPHIE-OPEN-1-WAIT",
      "group": "OPEN-S08-C15"
    },
    "sourceSha256": "5c7a8e4faafd96eab411fe6a1da4bed5ac91bc708e0a38cfd2bf5cfc19c3d746"
  }
} as const
export const sourceInvestigationNodes: Record<string,Scene01Node> = {...sourceInvestigationBaseNodes,...scene09Nodes,...scene10Nodes}
export const sourceInvestigations = {...sourceInvestigationBase,9:scene09Investigation,10:scene10Investigation} as const
