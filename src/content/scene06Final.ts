// Generated from the pinned Scene 06 screenplay.
import type { Scene01Node } from './scene01'
export const scene06Identity = {
  "id": "chapter_01_scene_06_corrections_desk",
  "planningId": "ch01_sc06_the_missing_line"
} as const
export const scene06Nodes: Record<string, Scene01Node> = {
  "OPEN-S06-desk-END": {
    "id": "OPEN-S06-desk-END",
    "kind": "event",
    "event": "s06-thread-end"
  },
  "OPEN-S06-sophie-END": {
    "id": "OPEN-S06-sophie-END",
    "kind": "event",
    "event": "s06-thread-end"
  },
  "OPEN-S06-maya-END": {
    "id": "OPEN-S06-maya-END",
    "kind": "event",
    "event": "s06-thread-end"
  },
  "OPEN-S06-group-END": {
    "id": "OPEN-S06-group-END",
    "kind": "event",
    "event": "s06-thread-end"
  },
  "OPEN-S06-C05-A-3": {
    "id": "OPEN-S06-C05-A-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "We'll use this return inbox if there's an update.",
    "channel": "sophie",
    "next": "OPEN-S06-desk-END",
    "heardFacts": [
      "OPEN-S06-C05-A-3:reported"
    ]
  },
  "OPEN-S06-C05-A-3-WAIT": {
    "id": "OPEN-S06-C05-A-3-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-C05-A-3"
  },
  "OPEN-S06-C05-A-2": {
    "id": "OPEN-S06-C05-A-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Please don't treat the referral as confirmation that a change happened.",
    "channel": "sophie",
    "next": "OPEN-S06-C05-A-3-WAIT",
    "heardFacts": [
      "OPEN-S06-C05-A-2:reported"
    ]
  },
  "OPEN-S06-C05-A-2-WAIT": {
    "id": "OPEN-S06-C05-A-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-C05-A-2"
  },
  "OPEN-S06-C05-A-1": {
    "id": "OPEN-S06-C05-A-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "I can log that as the specific question.",
    "channel": "sophie",
    "next": "OPEN-S06-C05-A-2-WAIT",
    "heardFacts": [
      "OPEN-S06-C05-A-1:reported"
    ]
  },
  "OPEN-S06-C05-A-1-WAIT": {
    "id": "OPEN-S06-C05-A-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-C05-A-1"
  },
  "OPEN-S06-C05-B-3": {
    "id": "OPEN-S06-C05-B-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "I can't provide a staff edit history from this inbox.",
    "channel": "sophie",
    "next": "OPEN-S06-desk-END",
    "heardFacts": [
      "OPEN-S06-C05-B-3:reported"
    ]
  },
  "OPEN-S06-C05-B-3-WAIT": {
    "id": "OPEN-S06-C05-B-3-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-C05-B-3"
  },
  "OPEN-S06-C05-B-2": {
    "id": "OPEN-S06-C05-B-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "It doesn't identify the person who last touched the web page.",
    "channel": "sophie",
    "next": "OPEN-S06-C05-B-3-WAIT",
    "heardFacts": [
      "OPEN-S06-C05-B-2:reported"
    ]
  },
  "OPEN-S06-C05-B-2-WAIT": {
    "id": "OPEN-S06-C05-B-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-C05-B-2"
  },
  "OPEN-S06-C05-B-1": {
    "id": "OPEN-S06-C05-B-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "No. A byline identifies the reporter credited on the story.",
    "channel": "sophie",
    "next": "OPEN-S06-C05-B-2-WAIT",
    "heardFacts": [
      "OPEN-S06-C05-B-1:reported"
    ]
  },
  "OPEN-S06-C05-B-1-WAIT": {
    "id": "OPEN-S06-C05-B-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-C05-B-1"
  },
  "OPEN-S06-C05-C-2": {
    "id": "OPEN-S06-C05-C-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Sorry I can't give you something more definite.",
    "channel": "sophie",
    "next": "OPEN-S06-desk-END",
    "heardFacts": [
      "OPEN-S06-C05-C-2:reported"
    ]
  },
  "OPEN-S06-C05-C-2-WAIT": {
    "id": "OPEN-S06-C05-C-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-C05-C-2"
  },
  "OPEN-S06-C05-C-1": {
    "id": "OPEN-S06-C05-C-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "That's the right distinction.",
    "channel": "sophie",
    "next": "OPEN-S06-C05-C-2-WAIT",
    "heardFacts": [
      "OPEN-S06-C05-C-1:reported"
    ]
  },
  "OPEN-S06-C05-C-1-WAIT": {
    "id": "OPEN-S06-C05-C-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-C05-C-1"
  },
  "OPEN-S06-C05": {
    "id": "OPEN-S06-C05",
    "kind": "choice",
    "number": "D05",
    "channel": "sophie",
    "choices": [
      {
        "id": "a",
        "text": "Could you refer a question about the article body to the editorial team? I only need to know whether any passage changed.",
        "next": "OPEN-S06-C05-A-1-WAIT"
      },
      {
        "id": "b",
        "text": "Does Nora Vance's byline mean she made the update?",
        "next": "OPEN-S06-C05-B-1-WAIT"
      },
      {
        "id": "c",
        "text": "Thanks. I'll keep the public register separate from a verified revision history.",
        "next": "OPEN-S06-C05-C-1-WAIT"
      }
    ]
  },
  "OPEN-S06-AFTER-08-3": {
    "id": "OPEN-S06-AFTER-08-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "Like it's a task I forgot to do.",
    "channel": "sophie",
    "next": "OPEN-S06-C09",
    "heardFacts": [
      "OPEN-S06-AFTER-08-3:reported"
    ]
  },
  "OPEN-S06-AFTER-08-3-WAIT": {
    "id": "OPEN-S06-AFTER-08-3-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-AFTER-08-3"
  },
  "OPEN-S06-AFTER-08-2": {
    "id": "OPEN-S06-AFTER-08-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Everyone keeps telling me to stay positive.",
    "channel": "sophie",
    "next": "OPEN-S06-AFTER-08-3-WAIT",
    "heardFacts": [
      "OPEN-S06-AFTER-08-2:reported"
    ]
  },
  "OPEN-S06-AFTER-08-2-WAIT": {
    "id": "OPEN-S06-AFTER-08-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-AFTER-08-2"
  },
  "OPEN-S06-AFTER-08-1": {
    "id": "OPEN-S06-AFTER-08-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "It's the waiting I can't stand.",
    "channel": "sophie",
    "next": "OPEN-S06-AFTER-08-2-WAIT",
    "heardFacts": [
      "OPEN-S06-AFTER-08-1:reported"
    ]
  },
  "OPEN-S06-AFTER-08-1-WAIT": {
    "id": "OPEN-S06-AFTER-08-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-AFTER-08-1"
  },
  "OPEN-S06-C08-A-2": {
    "id": "OPEN-S06-C08-A-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Sorry. You don't have to give me an update every time I ask.",
    "channel": "sophie",
    "next": "OPEN-S06-AFTER-08-1-WAIT",
    "heardFacts": [
      "OPEN-S06-C08-A-2:reported"
    ]
  },
  "OPEN-S06-C08-A-2-WAIT": {
    "id": "OPEN-S06-C08-A-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-C08-A-2"
  },
  "OPEN-S06-C08-A-1": {
    "id": "OPEN-S06-C08-A-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Is there anything actually there about Daniel?",
    "channel": "sophie",
    "next": "OPEN-S06-C08-A-2-WAIT",
    "heardFacts": [
      "OPEN-S06-C08-A-1:reported"
    ]
  },
  "OPEN-S06-C08-A-1-WAIT": {
    "id": "OPEN-S06-C08-A-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-C08-A-1"
  },
  "OPEN-S06-C08-A-EFFECT": {
    "id": "OPEN-S06-C08-A-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "trust": 1
      }
    },
    "next": "OPEN-S06-C08-A-1-WAIT"
  },
  "OPEN-S06-C08-B-3": {
    "id": "OPEN-S06-C08-B-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "Which made me feel guilty, so that's fun.",
    "channel": "sophie",
    "next": "OPEN-S06-AFTER-08-1-WAIT",
    "heardFacts": [
      "OPEN-S06-C08-B-3:reported"
    ]
  },
  "OPEN-S06-C08-B-3-WAIT": {
    "id": "OPEN-S06-C08-B-3-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-C08-B-3"
  },
  "OPEN-S06-C08-B-2": {
    "id": "OPEN-S06-C08-B-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Almost forgot what I was worried about for two minutes.",
    "channel": "sophie",
    "next": "OPEN-S06-C08-B-3-WAIT",
    "heardFacts": [
      "OPEN-S06-C08-B-2:reported"
    ]
  },
  "OPEN-S06-C08-B-2-WAIT": {
    "id": "OPEN-S06-C08-B-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-C08-B-2"
  },
  "OPEN-S06-C08-B-1": {
    "id": "OPEN-S06-C08-B-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "It was.",
    "channel": "sophie",
    "next": "OPEN-S06-C08-B-2-WAIT",
    "heardFacts": [
      "OPEN-S06-C08-B-1:reported"
    ]
  },
  "OPEN-S06-C08-B-1-WAIT": {
    "id": "OPEN-S06-C08-B-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-C08-B-1"
  },
  "OPEN-S06-C08-B-EFFECT": {
    "id": "OPEN-S06-C08-B-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "affinity": 2
      }
    },
    "next": "OPEN-S06-C08-B-1-WAIT"
  },
  "OPEN-S06-C08-C-2": {
    "id": "OPEN-S06-C08-C-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "But thanks for saying that instead of trying to make it sound better than it is.",
    "channel": "sophie",
    "next": "OPEN-S06-AFTER-08-1-WAIT",
    "heardFacts": [
      "OPEN-S06-C08-C-2:reported"
    ]
  },
  "OPEN-S06-C08-C-2-WAIT": {
    "id": "OPEN-S06-C08-C-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-C08-C-2"
  },
  "OPEN-S06-C08-C-1": {
    "id": "OPEN-S06-C08-C-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Neither do I.",
    "channel": "sophie",
    "next": "OPEN-S06-C08-C-2-WAIT",
    "heardFacts": [
      "OPEN-S06-C08-C-1:reported"
    ]
  },
  "OPEN-S06-C08-C-1-WAIT": {
    "id": "OPEN-S06-C08-C-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-C08-C-1"
  },
  "OPEN-S06-C08-C-EFFECT": {
    "id": "OPEN-S06-C08-C-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "trust": 1,
        "affinity": 1
      }
    },
    "next": "OPEN-S06-C08-C-1-WAIT"
  },
  "OPEN-S06-C08": {
    "id": "OPEN-S06-C08",
    "kind": "choice",
    "number": "D08",
    "channel": "sophie",
    "choices": [
      {
        "id": "a",
        "text": "Mostly looking at the Bulletin's public corrections page.",
        "next": "OPEN-S06-C08-A-EFFECT"
      },
      {
        "id": "b",
        "text": "Pretty ordinary, actually. Coffee sounds nice.",
        "next": "OPEN-S06-C08-B-EFFECT"
      },
      {
        "id": "c",
        "text": "I don't really have an answer yet.",
        "next": "OPEN-S06-C08-C-EFFECT"
      }
    ]
  },
  "OPEN-S06-AFTER-09-2": {
    "id": "OPEN-S06-AFTER-09-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Please tell me you've at least eaten something today.",
    "channel": "sophie",
    "next": "OPEN-S06-C10",
    "heardFacts": [
      "OPEN-S06-AFTER-09-2:reported"
    ]
  },
  "OPEN-S06-AFTER-09-2-WAIT": {
    "id": "OPEN-S06-AFTER-09-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-AFTER-09-2"
  },
  "OPEN-S06-AFTER-09-1": {
    "id": "OPEN-S06-AFTER-09-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Okay. I've talked about myself enough.",
    "channel": "sophie",
    "next": "OPEN-S06-AFTER-09-2-WAIT",
    "heardFacts": [
      "OPEN-S06-AFTER-09-1:reported"
    ]
  },
  "OPEN-S06-AFTER-09-1-WAIT": {
    "id": "OPEN-S06-AFTER-09-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-AFTER-09-1"
  },
  "OPEN-S06-C09-A-2": {
    "id": "OPEN-S06-C09-A-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "I think I needed someone to say that plainly.",
    "channel": "sophie",
    "next": "OPEN-S06-AFTER-09-1-WAIT",
    "heardFacts": [
      "OPEN-S06-C09-A-2:reported"
    ]
  },
  "OPEN-S06-C09-A-2-WAIT": {
    "id": "OPEN-S06-C09-A-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-C09-A-2"
  },
  "OPEN-S06-C09-A-1": {
    "id": "OPEN-S06-C09-A-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Thank you.",
    "channel": "sophie",
    "next": "OPEN-S06-C09-A-2-WAIT",
    "heardFacts": [
      "OPEN-S06-C09-A-1:reported"
    ]
  },
  "OPEN-S06-C09-A-1-WAIT": {
    "id": "OPEN-S06-C09-A-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-C09-A-1"
  },
  "OPEN-S06-C09-A-EFFECT": {
    "id": "OPEN-S06-C09-A-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "affinity": 2
      }
    },
    "next": "OPEN-S06-C09-A-1-WAIT"
  },
  "OPEN-S06-C09-B-2": {
    "id": "OPEN-S06-C09-B-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Even if that means hearing ‘we don't know’ a lot.",
    "channel": "sophie",
    "next": "OPEN-S06-AFTER-09-1-WAIT",
    "heardFacts": [
      "OPEN-S06-C09-B-2:reported"
    ]
  },
  "OPEN-S06-C09-B-2-WAIT": {
    "id": "OPEN-S06-C09-B-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-C09-B-2"
  },
  "OPEN-S06-C09-B-1": {
    "id": "OPEN-S06-C09-B-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Yes.",
    "channel": "sophie",
    "next": "OPEN-S06-C09-B-2-WAIT",
    "heardFacts": [
      "OPEN-S06-C09-B-1:reported"
    ]
  },
  "OPEN-S06-C09-B-1-WAIT": {
    "id": "OPEN-S06-C09-B-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-C09-B-1"
  },
  "OPEN-S06-C09-B-EFFECT": {
    "id": "OPEN-S06-C09-B-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "trust": 2
      }
    },
    "next": "OPEN-S06-C09-B-1-WAIT"
  },
  "OPEN-S06-C09-C-2": {
    "id": "OPEN-S06-C09-C-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Just ask me first. Some days I'll want to know.",
    "channel": "sophie",
    "next": "OPEN-S06-AFTER-09-1-WAIT",
    "heardFacts": [
      "OPEN-S06-C09-C-2:reported"
    ]
  },
  "OPEN-S06-C09-C-2-WAIT": {
    "id": "OPEN-S06-C09-C-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-C09-C-2"
  },
  "OPEN-S06-C09-C-1": {
    "id": "OPEN-S06-C09-C-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Don't make it a rule.",
    "channel": "sophie",
    "next": "OPEN-S06-C09-C-2-WAIT",
    "heardFacts": [
      "OPEN-S06-C09-C-1:reported"
    ]
  },
  "OPEN-S06-C09-C-1-WAIT": {
    "id": "OPEN-S06-C09-C-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-C09-C-1"
  },
  "OPEN-S06-C09-C-EFFECT": {
    "id": "OPEN-S06-C09-C-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "trust": 1,
        "affinity": 1
      }
    },
    "next": "OPEN-S06-C09-C-1-WAIT"
  },
  "OPEN-S06-C09": {
    "id": "OPEN-S06-C09",
    "kind": "choice",
    "number": "D09",
    "channel": "sophie",
    "choices": [
      {
        "id": "a",
        "text": "You don't have to be positive for anyone.",
        "next": "OPEN-S06-C09-A-EFFECT"
      },
      {
        "id": "b",
        "text": "Would you rather I only tell you things we can verify?",
        "next": "OPEN-S06-C09-B-EFFECT"
      },
      {
        "id": "c",
        "text": "I can stop bringing the article up if you want.",
        "next": "OPEN-S06-C09-C-EFFECT"
      }
    ]
  },
  "OPEN-S06-AFTER-10-3": {
    "id": "OPEN-S06-AFTER-10-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "Talk later.",
    "channel": "sophie",
    "next": "OPEN-S06-sophie-END",
    "heardFacts": [
      "OPEN-S06-AFTER-10-3:reported"
    ]
  },
  "OPEN-S06-AFTER-10-3-WAIT": {
    "id": "OPEN-S06-AFTER-10-3-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-AFTER-10-3"
  },
  "OPEN-S06-AFTER-10-2": {
    "id": "OPEN-S06-AFTER-10-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Thanks for letting me be a normal person for a minute.",
    "channel": "sophie",
    "next": "OPEN-S06-AFTER-10-3-WAIT",
    "heardFacts": [
      "OPEN-S06-AFTER-10-2:reported"
    ]
  },
  "OPEN-S06-AFTER-10-2-WAIT": {
    "id": "OPEN-S06-AFTER-10-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-AFTER-10-2"
  },
  "OPEN-S06-AFTER-10-1": {
    "id": "OPEN-S06-AFTER-10-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "I've got to go.",
    "channel": "sophie",
    "next": "OPEN-S06-AFTER-10-2-WAIT",
    "heardFacts": [
      "OPEN-S06-AFTER-10-1:reported"
    ]
  },
  "OPEN-S06-AFTER-10-1-WAIT": {
    "id": "OPEN-S06-AFTER-10-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-AFTER-10-1"
  },
  "OPEN-S06-C10-A-2": {
    "id": "OPEN-S06-C10-A-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "I'm going to say yes.",
    "channel": "sophie",
    "next": "OPEN-S06-AFTER-10-1-WAIT",
    "heardFacts": [
      "OPEN-S06-C10-A-2:reported"
    ]
  },
  "OPEN-S06-C10-A-2-WAIT": {
    "id": "OPEN-S06-C10-A-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-C10-A-2"
  },
  "OPEN-S06-C10-A-1": {
    "id": "OPEN-S06-C10-A-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Half a sandwich counts, right?",
    "channel": "sophie",
    "next": "OPEN-S06-C10-A-2-WAIT",
    "heardFacts": [
      "OPEN-S06-C10-A-1:reported"
    ]
  },
  "OPEN-S06-C10-A-1-WAIT": {
    "id": "OPEN-S06-C10-A-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-C10-A-1"
  },
  "OPEN-S06-C10-A-EFFECT": {
    "id": "OPEN-S06-C10-A-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "affinity": 1
      }
    },
    "next": "OPEN-S06-C10-A-1-WAIT"
  },
  "OPEN-S06-C10-B-2": {
    "id": "OPEN-S06-C10-B-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "And I mean actual food. Not three coffees.",
    "channel": "sophie",
    "next": "OPEN-S06-AFTER-10-1-WAIT",
    "heardFacts": [
      "OPEN-S06-C10-B-2:reported"
    ]
  },
  "OPEN-S06-C10-B-2-WAIT": {
    "id": "OPEN-S06-C10-B-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-C10-B-2"
  },
  "OPEN-S06-C10-B-1": {
    "id": "OPEN-S06-C10-B-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Good.",
    "channel": "sophie",
    "next": "OPEN-S06-C10-B-2-WAIT",
    "heardFacts": [
      "OPEN-S06-C10-B-1:reported"
    ]
  },
  "OPEN-S06-C10-B-1-WAIT": {
    "id": "OPEN-S06-C10-B-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-C10-B-1"
  },
  "OPEN-S06-C10-B-EFFECT": {
    "id": "OPEN-S06-C10-B-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "affinity": 1
      }
    },
    "next": "OPEN-S06-C10-B-1-WAIT"
  },
  "OPEN-S06-C10-C-2": {
    "id": "OPEN-S06-C10-C-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "I thought I was being subtle.",
    "channel": "sophie",
    "next": "OPEN-S06-AFTER-10-1-WAIT",
    "heardFacts": [
      "OPEN-S06-C10-C-2:reported"
    ]
  },
  "OPEN-S06-C10-C-2-WAIT": {
    "id": "OPEN-S06-C10-C-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-C10-C-2"
  },
  "OPEN-S06-C10-C-1": {
    "id": "OPEN-S06-C10-C-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Completely.",
    "channel": "sophie",
    "next": "OPEN-S06-C10-C-2-WAIT",
    "heardFacts": [
      "OPEN-S06-C10-C-1:reported"
    ]
  },
  "OPEN-S06-C10-C-1-WAIT": {
    "id": "OPEN-S06-C10-C-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-C10-C-1"
  },
  "OPEN-S06-C10-C-EFFECT": {
    "id": "OPEN-S06-C10-C-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "affinity": 1
      }
    },
    "next": "OPEN-S06-C10-C-1-WAIT"
  },
  "OPEN-S06-C10": {
    "id": "OPEN-S06-C10",
    "kind": "choice",
    "number": "D10",
    "channel": "sophie",
    "choices": [
      {
        "id": "a",
        "text": "I have. Have you?",
        "next": "OPEN-S06-C10-A-EFFECT"
      },
      {
        "id": "b",
        "text": "I'll get something after this.",
        "next": "OPEN-S06-C10-B-EFFECT"
      },
      {
        "id": "c",
        "text": "You're changing the subject.",
        "next": "OPEN-S06-C10-C-EFFECT"
      }
    ]
  },
  "OPEN-S06-AFTER-11-3": {
    "id": "OPEN-S06-AFTER-11-3",
    "kind": "npc",
    "sender": "maya",
    "text": "If there's something real, we tell her what it is. Carefully.",
    "channel": "sophie",
    "next": "OPEN-S06-C12",
    "heardFacts": [
      "OPEN-S06-AFTER-11-3:reported"
    ]
  },
  "OPEN-S06-AFTER-11-3-WAIT": {
    "id": "OPEN-S06-AFTER-11-3-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S06-AFTER-11-3"
  },
  "OPEN-S06-AFTER-11-2": {
    "id": "OPEN-S06-AFTER-11-2",
    "kind": "npc",
    "sender": "maya",
    "text": "But I don't want us deciding what she can handle, either.",
    "channel": "sophie",
    "next": "OPEN-S06-AFTER-11-3-WAIT",
    "heardFacts": [
      "OPEN-S06-AFTER-11-2:reported"
    ]
  },
  "OPEN-S06-AFTER-11-2-WAIT": {
    "id": "OPEN-S06-AFTER-11-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S06-AFTER-11-2"
  },
  "OPEN-S06-AFTER-11-1": {
    "id": "OPEN-S06-AFTER-11-1",
    "kind": "npc",
    "sender": "maya",
    "text": "I don't want Sophie reading ten different theories before breakfast.",
    "channel": "sophie",
    "next": "OPEN-S06-AFTER-11-2-WAIT",
    "heardFacts": [
      "OPEN-S06-AFTER-11-1:reported"
    ]
  },
  "OPEN-S06-AFTER-11-1-WAIT": {
    "id": "OPEN-S06-AFTER-11-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S06-AFTER-11-1"
  },
  "OPEN-S06-C11-A-2": {
    "id": "OPEN-S06-C11-A-2",
    "kind": "npc",
    "sender": "maya",
    "text": "It doesn't tell us whether the page was edited, though.",
    "channel": "sophie",
    "next": "OPEN-S06-AFTER-11-1-WAIT",
    "heardFacts": [
      "OPEN-S06-C11-A-2:reported"
    ]
  },
  "OPEN-S06-C11-A-2-WAIT": {
    "id": "OPEN-S06-C11-A-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S06-C11-A-2"
  },
  "OPEN-S06-C11-A-1": {
    "id": "OPEN-S06-C11-A-1",
    "kind": "npc",
    "sender": "maya",
    "text": "Okay. That's something we can both look at.",
    "channel": "sophie",
    "next": "OPEN-S06-C11-A-2-WAIT",
    "heardFacts": [
      "OPEN-S06-C11-A-1:reported"
    ]
  },
  "OPEN-S06-C11-A-1-WAIT": {
    "id": "OPEN-S06-C11-A-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S06-C11-A-1"
  },
  "OPEN-S06-C11-A-EFFECT": {
    "id": "OPEN-S06-C11-A-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "maya": {
        "trust": 2
      }
    },
    "next": "OPEN-S06-C11-A-1-WAIT"
  },
  "OPEN-S06-C11-B-2": {
    "id": "OPEN-S06-C11-B-2",
    "kind": "npc",
    "sender": "maya",
    "text": "The missing earlier copy is the part we keep tripping over.",
    "channel": "sophie",
    "next": "OPEN-S06-AFTER-11-1-WAIT",
    "heardFacts": [
      "OPEN-S06-C11-B-2:reported"
    ]
  },
  "OPEN-S06-C11-B-2-WAIT": {
    "id": "OPEN-S06-C11-B-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S06-C11-B-2"
  },
  "OPEN-S06-C11-B-1": {
    "id": "OPEN-S06-C11-B-1",
    "kind": "npc",
    "sender": "maya",
    "text": "Right.",
    "channel": "sophie",
    "next": "OPEN-S06-C11-B-2-WAIT",
    "heardFacts": [
      "OPEN-S06-C11-B-1:reported"
    ]
  },
  "OPEN-S06-C11-B-1-WAIT": {
    "id": "OPEN-S06-C11-B-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S06-C11-B-1"
  },
  "OPEN-S06-C11-B-EFFECT": {
    "id": "OPEN-S06-C11-B-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "maya": {
        "trust": 1
      }
    },
    "next": "OPEN-S06-C11-B-1-WAIT"
  },
  "OPEN-S06-C11-C-2": {
    "id": "OPEN-S06-C11-C-2",
    "kind": "npc",
    "sender": "maya",
    "text": "Doesn't make the question stupid. Just means we need a better source.",
    "channel": "sophie",
    "next": "OPEN-S06-AFTER-11-1-WAIT",
    "heardFacts": [
      "OPEN-S06-C11-C-2:reported"
    ]
  },
  "OPEN-S06-C11-C-2-WAIT": {
    "id": "OPEN-S06-C11-C-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S06-C11-C-2"
  },
  "OPEN-S06-C11-C-1": {
    "id": "OPEN-S06-C11-C-1",
    "kind": "npc",
    "sender": "maya",
    "text": "Maybe.",
    "channel": "sophie",
    "next": "OPEN-S06-C11-C-2-WAIT",
    "heardFacts": [
      "OPEN-S06-C11-C-1:reported"
    ]
  },
  "OPEN-S06-C11-C-1-WAIT": {
    "id": "OPEN-S06-C11-C-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S06-C11-C-1"
  },
  "OPEN-S06-C11-C-EFFECT": {
    "id": "OPEN-S06-C11-C-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "maya": {
        "affinity": 1
      }
    },
    "next": "OPEN-S06-C11-C-1-WAIT"
  },
  "OPEN-S06-C11": {
    "id": "OPEN-S06-C11",
    "kind": "choice",
    "number": "D11",
    "channel": "sophie",
    "choices": [
      {
        "id": "a",
        "text": "The public register lists no correction notice for Daniel's article.",
        "next": "OPEN-S06-C11-A-EFFECT"
      },
      {
        "id": "b",
        "text": "The article has an update label, but I still don't have an earlier copy.",
        "next": "OPEN-S06-C11-B-EFFECT"
      },
      {
        "id": "c",
        "text": "I'm worried we're chasing a label instead of a fact.",
        "next": "OPEN-S06-C11-C-EFFECT"
      }
    ]
  },
  "OPEN-S06-AFTER-12-1": {
    "id": "OPEN-S06-AFTER-12-1",
    "kind": "npc",
    "sender": "maya",
    "text": "I've got to head out. Message me here if you find a proper source.",
    "channel": "sophie",
    "next": "OPEN-S06-maya-END",
    "heardFacts": [
      "OPEN-S06-AFTER-12-1:reported"
    ]
  },
  "OPEN-S06-AFTER-12-1-WAIT": {
    "id": "OPEN-S06-AFTER-12-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S06-AFTER-12-1"
  },
  "OPEN-S06-C12-A-2": {
    "id": "OPEN-S06-C12-A-2",
    "kind": "npc",
    "sender": "maya",
    "text": "I'll ask, not assume.",
    "channel": "sophie",
    "next": "OPEN-S06-AFTER-12-1-WAIT",
    "heardFacts": [
      "OPEN-S06-C12-A-2:reported"
    ]
  },
  "OPEN-S06-C12-A-2-WAIT": {
    "id": "OPEN-S06-C12-A-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S06-C12-A-2"
  },
  "OPEN-S06-C12-A-1": {
    "id": "OPEN-S06-C12-A-1",
    "kind": "npc",
    "sender": "maya",
    "text": "Agreed. She's not a case file.",
    "channel": "sophie",
    "next": "OPEN-S06-C12-A-2-WAIT",
    "heardFacts": [
      "OPEN-S06-C12-A-1:reported"
    ]
  },
  "OPEN-S06-C12-A-1-WAIT": {
    "id": "OPEN-S06-C12-A-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S06-C12-A-1"
  },
  "OPEN-S06-C12-A-EFFECT": {
    "id": "OPEN-S06-C12-A-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "maya": {
        "trust": 2
      }
    },
    "next": "OPEN-S06-C12-A-1-WAIT"
  },
  "OPEN-S06-C12-B-2": {
    "id": "OPEN-S06-C12-B-2",
    "kind": "npc",
    "sender": "maya",
    "text": "I wish everyone else would do that.",
    "channel": "sophie",
    "next": "OPEN-S06-AFTER-12-1-WAIT",
    "heardFacts": [
      "OPEN-S06-C12-B-2:reported"
    ]
  },
  "OPEN-S06-C12-B-2-WAIT": {
    "id": "OPEN-S06-C12-B-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S06-C12-B-2"
  },
  "OPEN-S06-C12-B-1": {
    "id": "OPEN-S06-C12-B-1",
    "kind": "npc",
    "sender": "maya",
    "text": "That's fair.",
    "channel": "sophie",
    "next": "OPEN-S06-C12-B-2-WAIT",
    "heardFacts": [
      "OPEN-S06-C12-B-1:reported"
    ]
  },
  "OPEN-S06-C12-B-1-WAIT": {
    "id": "OPEN-S06-C12-B-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S06-C12-B-1"
  },
  "OPEN-S06-C12-B-EFFECT": {
    "id": "OPEN-S06-C12-B-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "maya": {
        "trust": 1
      }
    },
    "next": "OPEN-S06-C12-B-1-WAIT"
  },
  "OPEN-S06-C12-C-1": {
    "id": "OPEN-S06-C12-C-1",
    "kind": "npc",
    "sender": "maya",
    "text": "Yes. And even then, we should say what we actually checked.",
    "channel": "sophie",
    "next": "OPEN-S06-AFTER-12-1-WAIT",
    "heardFacts": [
      "OPEN-S06-C12-C-1:reported"
    ]
  },
  "OPEN-S06-C12-C-1-WAIT": {
    "id": "OPEN-S06-C12-C-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S06-C12-C-1"
  },
  "OPEN-S06-C12-C-EFFECT": {
    "id": "OPEN-S06-C12-C-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "maya": {
        "trust": 1
      }
    },
    "next": "OPEN-S06-C12-C-1-WAIT"
  },
  "OPEN-S06-C12": {
    "id": "OPEN-S06-C12",
    "kind": "choice",
    "number": "D12",
    "channel": "sophie",
    "choices": [
      {
        "id": "a",
        "text": "We should ask her before sharing case updates.",
        "next": "OPEN-S06-C12-A-EFFECT"
      },
      {
        "id": "b",
        "text": "If she asks me, I'll tell her the limits as well as the facts.",
        "next": "OPEN-S06-C12-B-EFFECT"
      },
      {
        "id": "c",
        "text": "Let's keep the group to public sources.",
        "next": "OPEN-S06-C12-C-EFFECT"
      }
    ]
  },
  "OPEN-S06-C13-A-2": {
    "id": "OPEN-S06-C13-A-2",
    "kind": "npc",
    "sender": "maya",
    "text": "It tells us what they've published, not what they've edited.",
    "channel": "group",
    "next": "OPEN-S06-group-END",
    "heardFacts": [
      "OPEN-S06-C13-A-2:reported"
    ]
  },
  "OPEN-S06-C13-A-2-WAIT": {
    "id": "OPEN-S06-C13-A-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S06-C13-A-2"
  },
  "OPEN-S06-C13-A-1": {
    "id": "OPEN-S06-C13-A-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "I saw that. I still wish it were clearer.",
    "channel": "group",
    "next": "OPEN-S06-C13-A-2-WAIT",
    "heardFacts": [
      "OPEN-S06-C13-A-1:reported"
    ]
  },
  "OPEN-S06-C13-A-1-WAIT": {
    "id": "OPEN-S06-C13-A-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-C13-A-1"
  },
  "OPEN-S06-C13-B-2": {
    "id": "OPEN-S06-C13-B-2",
    "kind": "npc",
    "sender": "maya",
    "text": "Agreed.",
    "channel": "group",
    "next": "OPEN-S06-group-END",
    "heardFacts": [
      "OPEN-S06-C13-B-2:reported"
    ]
  },
  "OPEN-S06-C13-B-2-WAIT": {
    "id": "OPEN-S06-C13-B-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S06-C13-B-2"
  },
  "OPEN-S06-C13-B-1": {
    "id": "OPEN-S06-C13-B-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Yeah. That's fair.",
    "channel": "group",
    "next": "OPEN-S06-C13-B-2-WAIT",
    "heardFacts": [
      "OPEN-S06-C13-B-1:reported"
    ]
  },
  "OPEN-S06-C13-B-1-WAIT": {
    "id": "OPEN-S06-C13-B-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-C13-B-1"
  },
  "OPEN-S06-C13-C-2": {
    "id": "OPEN-S06-C13-C-2",
    "kind": "npc",
    "sender": "maya",
    "text": "Sounds good.",
    "channel": "group",
    "next": "OPEN-S06-group-END",
    "heardFacts": [
      "OPEN-S06-C13-C-2:reported"
    ]
  },
  "OPEN-S06-C13-C-2-WAIT": {
    "id": "OPEN-S06-C13-C-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S06-C13-C-2"
  },
  "OPEN-S06-C13-C-1": {
    "id": "OPEN-S06-C13-C-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Okay. Let me know if you get something solid.",
    "channel": "group",
    "next": "OPEN-S06-C13-C-2-WAIT",
    "heardFacts": [
      "OPEN-S06-C13-C-1:reported"
    ]
  },
  "OPEN-S06-C13-C-1-WAIT": {
    "id": "OPEN-S06-C13-C-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-C13-C-1"
  },
  "OPEN-S06-C13": {
    "id": "OPEN-S06-C13",
    "kind": "choice",
    "number": "D13",
    "channel": "group",
    "choices": [
      {
        "id": "a",
        "text": "I found the publisher's public correction register. It doesn't list a notice for the article.",
        "next": "OPEN-S06-C13-A-1-WAIT"
      },
      {
        "id": "b",
        "text": "Can we avoid treating the update label as proof of a rewrite?",
        "next": "OPEN-S06-C13-B-1-WAIT"
      },
      {
        "id": "c",
        "text": "I'm going to keep checking the public source before I share a theory.",
        "next": "OPEN-S06-C13-C-1-WAIT"
      }
    ]
  },
  "OPEN-S06-DESK-a-10": {
    "id": "OPEN-S06-DESK-a-10",
    "kind": "npc",
    "sender": "sophie",
    "text": "I can't promise what they'll be able to confirm.",
    "channel": "sophie",
    "next": "OPEN-S06-C05",
    "heardFacts": [
      "OPEN-S06-DESK-a-10:reported"
    ]
  },
  "OPEN-S06-DESK-a-10-WAIT": {
    "id": "OPEN-S06-DESK-a-10-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-DESK-a-10"
  },
  "OPEN-S06-DESK-a-9": {
    "id": "OPEN-S06-DESK-a-9",
    "kind": "npc",
    "sender": "sophie",
    "text": "If you have a specific sentence in question, you can ask us to refer that question to the editorial team.",
    "channel": "sophie",
    "next": "OPEN-S06-DESK-a-10-WAIT",
    "heardFacts": [
      "OPEN-S06-DESK-a-9:reported"
    ]
  },
  "OPEN-S06-DESK-a-9-WAIT": {
    "id": "OPEN-S06-DESK-a-9-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-DESK-a-9"
  },
  "OPEN-S06-DESK-a-8": {
    "id": "OPEN-S06-DESK-a-8",
    "kind": "npc",
    "sender": "sophie",
    "text": "We can't provide an internal draft or private source information through this inbox.",
    "channel": "sophie",
    "next": "OPEN-S06-DESK-a-9-WAIT",
    "heardFacts": [
      "OPEN-S06-DESK-a-8:reported"
    ]
  },
  "OPEN-S06-DESK-a-8-WAIT": {
    "id": "OPEN-S06-DESK-a-8-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-DESK-a-8"
  },
  "OPEN-S06-DESK-a-7": {
    "id": "OPEN-S06-DESK-a-7",
    "kind": "npc",
    "sender": "sophie",
    "text": "The label you're seeing isn't a substitute for a dated change log.",
    "channel": "sophie",
    "next": "OPEN-S06-DESK-a-8-WAIT",
    "heardFacts": [
      "OPEN-S06-DESK-a-7:reported"
    ]
  },
  "OPEN-S06-DESK-a-7-WAIT": {
    "id": "OPEN-S06-DESK-a-7-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-DESK-a-7"
  },
  "OPEN-S06-DESK-a-6": {
    "id": "OPEN-S06-DESK-a-6",
    "kind": "npc",
    "sender": "sophie",
    "text": "That doesn't tell you whether its body was edited.",
    "channel": "sophie",
    "next": "OPEN-S06-DESK-a-7-WAIT",
    "heardFacts": [
      "OPEN-S06-DESK-a-6:reported"
    ]
  },
  "OPEN-S06-DESK-a-6-WAIT": {
    "id": "OPEN-S06-DESK-a-6-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-DESK-a-6"
  },
  "OPEN-S06-DESK-a-5": {
    "id": "OPEN-S06-DESK-a-5",
    "kind": "npc",
    "sender": "sophie",
    "text": "Our public register doesn't list a formal correction notice for this article at the moment.",
    "channel": "sophie",
    "next": "OPEN-S06-DESK-a-6-WAIT",
    "heardFacts": [
      "OPEN-S06-DESK-a-5:reported"
    ]
  },
  "OPEN-S06-DESK-a-5-WAIT": {
    "id": "OPEN-S06-DESK-a-5-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-DESK-a-5"
  },
  "OPEN-S06-DESK-a-4": {
    "id": "OPEN-S06-DESK-a-4",
    "kind": "npc",
    "sender": "sophie",
    "text": "You asked whether the article body changed after publication.",
    "channel": "sophie",
    "next": "OPEN-S06-DESK-a-5-WAIT",
    "heardFacts": [
      "OPEN-S06-DESK-a-4:reported"
    ]
  },
  "OPEN-S06-DESK-a-4-WAIT": {
    "id": "OPEN-S06-DESK-a-4-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-DESK-a-4"
  },
  "OPEN-S06-DESK-a-3": {
    "id": "OPEN-S06-DESK-a-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "I can see the question you sent about the Daniel Mercer article.",
    "channel": "sophie",
    "next": "OPEN-S06-DESK-a-4-WAIT",
    "heardFacts": [
      "OPEN-S06-DESK-a-3:reported"
    ]
  },
  "OPEN-S06-DESK-a-3-WAIT": {
    "id": "OPEN-S06-DESK-a-3-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-DESK-a-3"
  },
  "OPEN-S06-DESK-a-2": {
    "id": "OPEN-S06-DESK-a-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Sorry this isn't a straightforward answer.",
    "channel": "sophie",
    "next": "OPEN-S06-DESK-a-3-WAIT",
    "heardFacts": [
      "OPEN-S06-DESK-a-2:reported"
    ]
  },
  "OPEN-S06-DESK-a-2-WAIT": {
    "id": "OPEN-S06-DESK-a-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-DESK-a-2"
  },
  "OPEN-S06-DESK-a-1": {
    "id": "OPEN-S06-DESK-a-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Hello.",
    "channel": "sophie",
    "next": "OPEN-S06-DESK-a-2-WAIT",
    "heardFacts": [
      "OPEN-S06-DESK-a-1:reported"
    ]
  },
  "OPEN-S06-DESK-a-1-WAIT": {
    "id": "OPEN-S06-DESK-a-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-DESK-a-1"
  },
  "OPEN-S06-DESK-b-10": {
    "id": "OPEN-S06-DESK-b-10",
    "kind": "npc",
    "sender": "sophie",
    "text": "I can't promise what they'll be able to confirm.",
    "channel": "sophie",
    "next": "OPEN-S06-C05",
    "heardFacts": [
      "OPEN-S06-DESK-b-10:reported"
    ]
  },
  "OPEN-S06-DESK-b-10-WAIT": {
    "id": "OPEN-S06-DESK-b-10-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-DESK-b-10"
  },
  "OPEN-S06-DESK-b-9": {
    "id": "OPEN-S06-DESK-b-9",
    "kind": "npc",
    "sender": "sophie",
    "text": "If you have a specific sentence in question, you can ask us to refer that question to the editorial team.",
    "channel": "sophie",
    "next": "OPEN-S06-DESK-b-10-WAIT",
    "heardFacts": [
      "OPEN-S06-DESK-b-9:reported"
    ]
  },
  "OPEN-S06-DESK-b-9-WAIT": {
    "id": "OPEN-S06-DESK-b-9-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-DESK-b-9"
  },
  "OPEN-S06-DESK-b-8": {
    "id": "OPEN-S06-DESK-b-8",
    "kind": "npc",
    "sender": "sophie",
    "text": "We can't provide an internal draft or private source information through this inbox.",
    "channel": "sophie",
    "next": "OPEN-S06-DESK-b-9-WAIT",
    "heardFacts": [
      "OPEN-S06-DESK-b-8:reported"
    ]
  },
  "OPEN-S06-DESK-b-8-WAIT": {
    "id": "OPEN-S06-DESK-b-8-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-DESK-b-8"
  },
  "OPEN-S06-DESK-b-7": {
    "id": "OPEN-S06-DESK-b-7",
    "kind": "npc",
    "sender": "sophie",
    "text": "The label you're seeing isn't a substitute for a dated change log.",
    "channel": "sophie",
    "next": "OPEN-S06-DESK-b-8-WAIT",
    "heardFacts": [
      "OPEN-S06-DESK-b-7:reported"
    ]
  },
  "OPEN-S06-DESK-b-7-WAIT": {
    "id": "OPEN-S06-DESK-b-7-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-DESK-b-7"
  },
  "OPEN-S06-DESK-b-6": {
    "id": "OPEN-S06-DESK-b-6",
    "kind": "npc",
    "sender": "sophie",
    "text": "That doesn't tell you whether its body was edited.",
    "channel": "sophie",
    "next": "OPEN-S06-DESK-b-7-WAIT",
    "heardFacts": [
      "OPEN-S06-DESK-b-6:reported"
    ]
  },
  "OPEN-S06-DESK-b-6-WAIT": {
    "id": "OPEN-S06-DESK-b-6-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-DESK-b-6"
  },
  "OPEN-S06-DESK-b-5": {
    "id": "OPEN-S06-DESK-b-5",
    "kind": "npc",
    "sender": "sophie",
    "text": "Our public register doesn't list a formal correction notice for this article at the moment.",
    "channel": "sophie",
    "next": "OPEN-S06-DESK-b-6-WAIT",
    "heardFacts": [
      "OPEN-S06-DESK-b-5:reported"
    ]
  },
  "OPEN-S06-DESK-b-5-WAIT": {
    "id": "OPEN-S06-DESK-b-5-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-DESK-b-5"
  },
  "OPEN-S06-DESK-b-4": {
    "id": "OPEN-S06-DESK-b-4",
    "kind": "npc",
    "sender": "sophie",
    "text": "You asked what the “Updated: Yesterday” label refers to.",
    "channel": "sophie",
    "next": "OPEN-S06-DESK-b-5-WAIT",
    "heardFacts": [
      "OPEN-S06-DESK-b-4:reported"
    ]
  },
  "OPEN-S06-DESK-b-4-WAIT": {
    "id": "OPEN-S06-DESK-b-4-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-DESK-b-4"
  },
  "OPEN-S06-DESK-b-3": {
    "id": "OPEN-S06-DESK-b-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "I can see the question you sent about the Daniel Mercer article.",
    "channel": "sophie",
    "next": "OPEN-S06-DESK-b-4-WAIT",
    "heardFacts": [
      "OPEN-S06-DESK-b-3:reported"
    ]
  },
  "OPEN-S06-DESK-b-3-WAIT": {
    "id": "OPEN-S06-DESK-b-3-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-DESK-b-3"
  },
  "OPEN-S06-DESK-b-2": {
    "id": "OPEN-S06-DESK-b-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Sorry this isn't a straightforward answer.",
    "channel": "sophie",
    "next": "OPEN-S06-DESK-b-3-WAIT",
    "heardFacts": [
      "OPEN-S06-DESK-b-2:reported"
    ]
  },
  "OPEN-S06-DESK-b-2-WAIT": {
    "id": "OPEN-S06-DESK-b-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-DESK-b-2"
  },
  "OPEN-S06-DESK-b-1": {
    "id": "OPEN-S06-DESK-b-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Hello.",
    "channel": "sophie",
    "next": "OPEN-S06-DESK-b-2-WAIT",
    "heardFacts": [
      "OPEN-S06-DESK-b-1:reported"
    ]
  },
  "OPEN-S06-DESK-b-1-WAIT": {
    "id": "OPEN-S06-DESK-b-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-DESK-b-1"
  },
  "OPEN-S06-DESK-c-10": {
    "id": "OPEN-S06-DESK-c-10",
    "kind": "npc",
    "sender": "sophie",
    "text": "I can't promise what they'll be able to confirm.",
    "channel": "sophie",
    "next": "OPEN-S06-C05",
    "heardFacts": [
      "OPEN-S06-DESK-c-10:reported"
    ]
  },
  "OPEN-S06-DESK-c-10-WAIT": {
    "id": "OPEN-S06-DESK-c-10-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-DESK-c-10"
  },
  "OPEN-S06-DESK-c-9": {
    "id": "OPEN-S06-DESK-c-9",
    "kind": "npc",
    "sender": "sophie",
    "text": "If you have a specific sentence in question, you can ask us to refer that question to the editorial team.",
    "channel": "sophie",
    "next": "OPEN-S06-DESK-c-10-WAIT",
    "heardFacts": [
      "OPEN-S06-DESK-c-9:reported"
    ]
  },
  "OPEN-S06-DESK-c-9-WAIT": {
    "id": "OPEN-S06-DESK-c-9-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-DESK-c-9"
  },
  "OPEN-S06-DESK-c-8": {
    "id": "OPEN-S06-DESK-c-8",
    "kind": "npc",
    "sender": "sophie",
    "text": "We can't provide an internal draft or private source information through this inbox.",
    "channel": "sophie",
    "next": "OPEN-S06-DESK-c-9-WAIT",
    "heardFacts": [
      "OPEN-S06-DESK-c-8:reported"
    ]
  },
  "OPEN-S06-DESK-c-8-WAIT": {
    "id": "OPEN-S06-DESK-c-8-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-DESK-c-8"
  },
  "OPEN-S06-DESK-c-7": {
    "id": "OPEN-S06-DESK-c-7",
    "kind": "npc",
    "sender": "sophie",
    "text": "The label you're seeing isn't a substitute for a dated change log.",
    "channel": "sophie",
    "next": "OPEN-S06-DESK-c-8-WAIT",
    "heardFacts": [
      "OPEN-S06-DESK-c-7:reported"
    ]
  },
  "OPEN-S06-DESK-c-7-WAIT": {
    "id": "OPEN-S06-DESK-c-7-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-DESK-c-7"
  },
  "OPEN-S06-DESK-c-6": {
    "id": "OPEN-S06-DESK-c-6",
    "kind": "npc",
    "sender": "sophie",
    "text": "That doesn't tell you whether its body was edited.",
    "channel": "sophie",
    "next": "OPEN-S06-DESK-c-7-WAIT",
    "heardFacts": [
      "OPEN-S06-DESK-c-6:reported"
    ]
  },
  "OPEN-S06-DESK-c-6-WAIT": {
    "id": "OPEN-S06-DESK-c-6-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-DESK-c-6"
  },
  "OPEN-S06-DESK-c-5": {
    "id": "OPEN-S06-DESK-c-5",
    "kind": "npc",
    "sender": "sophie",
    "text": "Our public register doesn't list a formal correction notice for this article at the moment.",
    "channel": "sophie",
    "next": "OPEN-S06-DESK-c-6-WAIT",
    "heardFacts": [
      "OPEN-S06-DESK-c-5:reported"
    ]
  },
  "OPEN-S06-DESK-c-5-WAIT": {
    "id": "OPEN-S06-DESK-c-5-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-DESK-c-5"
  },
  "OPEN-S06-DESK-c-4": {
    "id": "OPEN-S06-DESK-c-4",
    "kind": "npc",
    "sender": "sophie",
    "text": "You asked whether readers can inspect a correction note or version history for this article.",
    "channel": "sophie",
    "next": "OPEN-S06-DESK-c-5-WAIT",
    "heardFacts": [
      "OPEN-S06-DESK-c-4:reported"
    ]
  },
  "OPEN-S06-DESK-c-4-WAIT": {
    "id": "OPEN-S06-DESK-c-4-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-DESK-c-4"
  },
  "OPEN-S06-DESK-c-3": {
    "id": "OPEN-S06-DESK-c-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "I can see the question you sent about the Daniel Mercer article.",
    "channel": "sophie",
    "next": "OPEN-S06-DESK-c-4-WAIT",
    "heardFacts": [
      "OPEN-S06-DESK-c-3:reported"
    ]
  },
  "OPEN-S06-DESK-c-3-WAIT": {
    "id": "OPEN-S06-DESK-c-3-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-DESK-c-3"
  },
  "OPEN-S06-DESK-c-2": {
    "id": "OPEN-S06-DESK-c-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Sorry this isn't a straightforward answer.",
    "channel": "sophie",
    "next": "OPEN-S06-DESK-c-3-WAIT",
    "heardFacts": [
      "OPEN-S06-DESK-c-2:reported"
    ]
  },
  "OPEN-S06-DESK-c-2-WAIT": {
    "id": "OPEN-S06-DESK-c-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-DESK-c-2"
  },
  "OPEN-S06-DESK-c-1": {
    "id": "OPEN-S06-DESK-c-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Hello.",
    "channel": "sophie",
    "next": "OPEN-S06-DESK-c-2-WAIT",
    "heardFacts": [
      "OPEN-S06-DESK-c-1:reported"
    ]
  },
  "OPEN-S06-DESK-c-1-WAIT": {
    "id": "OPEN-S06-DESK-c-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-DESK-c-1"
  },
  "OPEN-S06-SOPHIE-OPEN-5": {
    "id": "OPEN-S06-SOPHIE-OPEN-5",
    "kind": "npc",
    "sender": "sophie",
    "text": "Anyway. Sorry. How's your day going?",
    "channel": "sophie",
    "next": "OPEN-S06-C08",
    "heardFacts": [
      "OPEN-S06-SOPHIE-OPEN-5:reported"
    ]
  },
  "OPEN-S06-SOPHIE-OPEN-5-WAIT": {
    "id": "OPEN-S06-SOPHIE-OPEN-5-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-SOPHIE-OPEN-5"
  },
  "OPEN-S06-SOPHIE-OPEN-4": {
    "id": "OPEN-S06-SOPHIE-OPEN-4",
    "kind": "npc",
    "sender": "sophie",
    "text": "I didn't know I had a usual.",
    "channel": "sophie",
    "next": "OPEN-S06-SOPHIE-OPEN-5-WAIT",
    "heardFacts": [
      "OPEN-S06-SOPHIE-OPEN-4:reported"
    ]
  },
  "OPEN-S06-SOPHIE-OPEN-4-WAIT": {
    "id": "OPEN-S06-SOPHIE-OPEN-4-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-SOPHIE-OPEN-4"
  },
  "OPEN-S06-SOPHIE-OPEN-3": {
    "id": "OPEN-S06-SOPHIE-OPEN-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "The woman at the counter asked if I wanted the usual.",
    "channel": "sophie",
    "next": "OPEN-S06-SOPHIE-OPEN-4-WAIT",
    "heardFacts": [
      "OPEN-S06-SOPHIE-OPEN-3:reported"
    ]
  },
  "OPEN-S06-SOPHIE-OPEN-3-WAIT": {
    "id": "OPEN-S06-SOPHIE-OPEN-3-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-SOPHIE-OPEN-3"
  },
  "OPEN-S06-SOPHIE-OPEN-2": {
    "id": "OPEN-S06-SOPHIE-OPEN-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "I went out for coffee.",
    "channel": "sophie",
    "next": "OPEN-S06-SOPHIE-OPEN-3-WAIT",
    "heardFacts": [
      "OPEN-S06-SOPHIE-OPEN-2:reported"
    ]
  },
  "OPEN-S06-SOPHIE-OPEN-2-WAIT": {
    "id": "OPEN-S06-SOPHIE-OPEN-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-SOPHIE-OPEN-2"
  },
  "OPEN-S06-SOPHIE-OPEN-1": {
    "id": "OPEN-S06-SOPHIE-OPEN-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Hey.",
    "channel": "sophie",
    "next": "OPEN-S06-SOPHIE-OPEN-2-WAIT",
    "heardFacts": [
      "OPEN-S06-SOPHIE-OPEN-1:reported"
    ]
  },
  "OPEN-S06-SOPHIE-OPEN-1-WAIT": {
    "id": "OPEN-S06-SOPHIE-OPEN-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S06-SOPHIE-OPEN-1"
  },
  "OPEN-S06-MAYA-OPEN-3": {
    "id": "OPEN-S06-MAYA-OPEN-3",
    "kind": "npc",
    "sender": "maya",
    "text": "What have you got?",
    "channel": "sophie",
    "next": "OPEN-S06-C11",
    "heardFacts": [
      "OPEN-S06-MAYA-OPEN-3:reported"
    ]
  },
  "OPEN-S06-MAYA-OPEN-3-WAIT": {
    "id": "OPEN-S06-MAYA-OPEN-3-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S06-MAYA-OPEN-3"
  },
  "OPEN-S06-MAYA-OPEN-2": {
    "id": "OPEN-S06-MAYA-OPEN-2",
    "kind": "npc",
    "sender": "maya",
    "text": "I can talk, but I haven't seen a proper version history for it.",
    "channel": "sophie",
    "next": "OPEN-S06-MAYA-OPEN-3-WAIT",
    "heardFacts": [
      "OPEN-S06-MAYA-OPEN-2:reported"
    ]
  },
  "OPEN-S06-MAYA-OPEN-2-WAIT": {
    "id": "OPEN-S06-MAYA-OPEN-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S06-MAYA-OPEN-2"
  },
  "OPEN-S06-MAYA-OPEN-1": {
    "id": "OPEN-S06-MAYA-OPEN-1",
    "kind": "npc",
    "sender": "maya",
    "text": "Hey. You wanted to ask about the public Bulletin page?",
    "channel": "sophie",
    "next": "OPEN-S06-MAYA-OPEN-2-WAIT",
    "heardFacts": [
      "OPEN-S06-MAYA-OPEN-1:reported"
    ]
  },
  "OPEN-S06-MAYA-OPEN-1-WAIT": {
    "id": "OPEN-S06-MAYA-OPEN-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S06-MAYA-OPEN-1"
  }
}
export const scene06Local = {
  "S06-C01": [
    {
      "id": "a",
      "text": "Show me what the publisher has made public.",
      "feedback": "Open the public register. Its listed notices are not a full record of every edit."
    },
    {
      "id": "b",
      "text": "Show me my earlier request.",
      "feedback": "Your exact sent question and delivery receipt are available. Delivery alone does not establish that it was read."
    },
    {
      "id": "c",
      "text": "Can we speak to Nora?",
      "feedback": "A published byline identifies the reported author. It does not grant private contact, identify a site editor or authenticate any change. No message to Nora will be sent."
    }
  ],
  "S06-C02": [
    {
      "id": "a",
      "text": "Does ‘NONE’ mean the article was never edited?",
      "feedback": "No. It refers to notices listed in this public register, not all possible changes to the article."
    },
    {
      "id": "b",
      "text": "Can I see the text before the supposed update?",
      "feedback": "Not from this page. No earlier body or text diff is shown."
    },
    {
      "id": "c",
      "text": "Who maintains this page?",
      "feedback": "It is presented as a publisher page. The register does not identify the operator of GB-ARTICLE-001 or certify its revision data."
    }
  ],
  "S06-C03": [
    {
      "id": "a",
      "text": "The article has not changed since 7 October.",
      "feedback": "Too broad. A register of public notices does not track every page or body revision. Try again."
    },
    {
      "id": "b",
      "text": "No formal public correction notice for this article is listed there.",
      "feedback": "Supported as a statement about the public register at the time inspected. It is NOT a statement that the article was unchanged."
    },
    {
      "id": "c",
      "text": "Nora Vance removed a correction.",
      "feedback": "There is no evidence for that. A byline is not a revision audit trail. Try again."
    }
  ],
  "S06-C04": [
    {
      "id": "a",
      "text": "The shared article reference proves they are three editions.",
      "feedback": "No. One is an article, one is an unverified index entry, and one is a public notices register. They are different record types."
    },
    {
      "id": "b",
      "text": "The register proves the index is authentic.",
      "feedback": "No. The register makes no statement authenticating the index's issuer, capture time or content."
    },
    {
      "id": "c",
      "text": "There is still no authenticated before-and-after article record.",
      "feedback": "Supported. You can describe the public notices listing and page label, but not a changed passage, editor or motive."
    }
  ],
  "S06-C06": [
    {
      "id": "a",
      "text": "Is there a formal public correction notice for GB-ARTICLE-001, or a case-specific public notice planned?",
      "feedback": ""
    },
    {
      "id": "b",
      "text": "Can the newsroom confirm whether a passage in GB-ARTICLE-001 has changed since publication, without sharing private sources?",
      "feedback": ""
    },
    {
      "id": "c",
      "text": "Does the page's ‘Updated: Yesterday’ label refer to a correction, an editorial note, or routine page maintenance?",
      "feedback": ""
    }
  ],
  "S06-C07": [
    {
      "id": "a",
      "text": "Nora is credited on the published article; I don't know who edited the page.",
      "feedback": "Supported as a distinction between public credit and unknown site operations."
    },
    {
      "id": "b",
      "text": "Nora must have changed the article because her name is on it.",
      "feedback": "A byline is not an edit log. Try again."
    },
    {
      "id": "c",
      "text": "The desk response is an anonymous message from Nora.",
      "feedback": "No. It is a role inbox and does not identify its staff operator or forward the message privately to Nora."
    }
  ],
  "S06-C14": [
    {
      "id": "a",
      "text": "There is no public correction notice listed; that is not a full edit history.",
      "feedback": "Saved: narrow observation and its limits."
    },
    {
      "id": "b",
      "text": "The byline credits Nora, but the site editor is unidentified.",
      "feedback": "Saved: attribution and revision responsibility remain distinct."
    },
    {
      "id": "c",
      "text": "I need an authenticated earlier article copy or publisher change record.",
      "feedback": "Saved: source-verification plan, not proof of alteration."
    }
  ]
} as const
export const scene06Entrances = {
  "sophie": "OPEN-S06-SOPHIE-OPEN-1-WAIT",
  "maya": "OPEN-S06-MAYA-OPEN-1-WAIT",
  "group": "OPEN-S06-C13",
  "desk_a": "OPEN-S06-DESK-a-1-WAIT",
  "desk_b": "OPEN-S06-DESK-b-1-WAIT",
  "desk_c": "OPEN-S06-DESK-c-1-WAIT"
} as const
export const scene06Pages = {
  "GB-CORR-REGISTER-001": {
    "title": "PUBLIC CORRECTIONS REGISTER",
    "paragraphs": [
      "GREYHAVEN BULLETIN PUBLIC CORRECTIONS REGISTER",
      "What this page lists We publish notices here when the newsroom issues a formal, public correction. Not every page update creates a correction notice.",
      "Article lookup Article reference: GB-ARTICLE-001 Article title: Daniel Mercer report Published article date: 7 October 2026 Public correction notice currently listed for this article: NONE",
      "Important limitations The absence of a public correction notice does not confirm that a page has remained unchanged. This register is not the site's full change log. It does not display earlier drafts, private editorial decisions, source identities or a before-and-after text comparison.",
      "Questions about a specific article may be submitted to the public corrections inbox. We do not promise access to private drafts.",
      "A public register entry describes the notices listed here at the time of viewing. It is not independent evidence of the contents of an earlier article version."
    ]
  },
  "GB-CORR-SCOPE-001": {
    "title": "CORRECTIONS, NOTES AND PAGE UPDATES",
    "paragraphs": [
      "GREYHAVEN BULLETIN CORRECTIONS, NOTES AND PAGE UPDATES",
      "A correction notice is a public statement that an error was corrected. A posted notice may identify what the publisher says was wrong.",
      "An editor's note may add context or explain editorial handling. Its presence is not itself a complete change history.",
      "Page maintenance may affect links, captions or presentation. A page's relative update label does not tell the reader which category occurred.",
      "No public notice listed does not mean no edit happened.",
      "For a case-specific question, use the corrections form. The sender will receive a receipt only after choosing Send.",
      "These are the Bulletin's descriptions of its processes. The public page alone does not establish what happened to a particular article."
    ]
  }
} as const
export const scene06Manifest = [
  {
    "id": "S06-C01",
    "branches": 3,
    "channel": "local"
  },
  {
    "id": "S06-C02",
    "branches": 3,
    "channel": "local"
  },
  {
    "id": "S06-C03",
    "branches": 3,
    "channel": "local"
  },
  {
    "id": "S06-C04",
    "branches": 3,
    "channel": "local"
  },
  {
    "id": "S06-C05",
    "branches": 3,
    "channel": "desk"
  },
  {
    "id": "S06-C06",
    "branches": 3,
    "channel": "form"
  },
  {
    "id": "S06-C07",
    "branches": 3,
    "channel": "local"
  },
  {
    "id": "S06-C08",
    "branches": 3,
    "channel": "sophie"
  },
  {
    "id": "S06-C09",
    "branches": 3,
    "channel": "sophie"
  },
  {
    "id": "S06-C10",
    "branches": 3,
    "channel": "sophie"
  },
  {
    "id": "S06-C11",
    "branches": 3,
    "channel": "maya"
  },
  {
    "id": "S06-C12",
    "branches": 3,
    "channel": "maya"
  },
  {
    "id": "S06-C13",
    "branches": 3,
    "channel": "group"
  },
  {
    "id": "S06-C14",
    "branches": 3,
    "channel": "local"
  }
] as const
