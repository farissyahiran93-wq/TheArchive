// Generated solely from the pinned Scene 09 manuscript.
import type { Scene01Node } from './scene01'
export const scene09Nodes: Record<string,Scene01Node> = {
  "OPEN-S09-civic-END": {
    "id": "OPEN-S09-civic-END",
    "kind": "event",
    "event": "source-thread-end"
  },
  "OPEN-S09-professional-END": {
    "id": "OPEN-S09-professional-END",
    "kind": "event",
    "event": "source-thread-end"
  },
  "OPEN-S09-sophie-END": {
    "id": "OPEN-S09-sophie-END",
    "kind": "event",
    "event": "source-thread-end"
  },
  "OPEN-S09-group-END": {
    "id": "OPEN-S09-group-END",
    "kind": "event",
    "event": "source-thread-end"
  },
  "OPEN-S09-AFTER-12-1": {
    "id": "OPEN-S09-AFTER-12-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Take care.",
    "channel": "sophie",
    "next": "OPEN-S09-civic-END",
    "heardFacts": [
      "OPEN-S09-AFTER-12-1:reported"
    ]
  },
  "OPEN-S09-AFTER-12-1-WAIT": {
    "id": "OPEN-S09-AFTER-12-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-AFTER-12-1"
  },
  "OPEN-S09-C12-A-1": {
    "id": "OPEN-S09-C12-A-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "That's right. We'd need a matching item description or other identifying details.",
    "channel": "sophie",
    "next": "OPEN-S09-AFTER-12-1-WAIT",
    "heardFacts": [
      "OPEN-S09-C12-A-1:reported"
    ]
  },
  "OPEN-S09-C12-A-1-WAIT": {
    "id": "OPEN-S09-C12-A-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-C12-A-1"
  },
  "OPEN-S09-C12-B-1": {
    "id": "OPEN-S09-C12-B-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "No. We don't maintain the Greyhaven Bulletin's site.",
    "channel": "sophie",
    "next": "OPEN-S09-AFTER-12-1-WAIT",
    "heardFacts": [
      "OPEN-S09-C12-B-1:reported"
    ]
  },
  "OPEN-S09-C12-B-1-WAIT": {
    "id": "OPEN-S09-C12-B-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-C12-B-1"
  },
  "OPEN-S09-C12-C-1": {
    "id": "OPEN-S09-C12-C-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Thank you. That's an accurate way to describe it.",
    "channel": "sophie",
    "next": "OPEN-S09-AFTER-12-1-WAIT",
    "heardFacts": [
      "OPEN-S09-C12-C-1:reported"
    ]
  },
  "OPEN-S09-C12-C-1-WAIT": {
    "id": "OPEN-S09-C12-C-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-C12-C-1"
  },
  "OPEN-S09-C12": {
    "id": "OPEN-S09-C12",
    "kind": "choice",
    "number": "S09-C12",
    "channel": "sophie",
    "choices": [
      {
        "id": "a",
        "text": "So a series-level transfer doesn't tell me whether a particular notice is in it?",
        "next": "OPEN-S09-C12-A-1-WAIT"
      },
      {
        "id": "b",
        "text": "Can you tell me who changed the published article?",
        "next": "OPEN-S09-C12-B-1-WAIT"
      },
      {
        "id": "c",
        "text": "Thanks. I'll keep this as a possible place to search, not a confirmed document.",
        "next": "OPEN-S09-C12-C-1-WAIT"
      }
    ]
  },
  "OPEN-S09-AFTER-13-1": {
    "id": "OPEN-S09-AFTER-13-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "I have to get back to a deadline. Take care.",
    "channel": "sophie",
    "next": "OPEN-S09-professional-END",
    "heardFacts": [
      "OPEN-S09-AFTER-13-1:reported"
    ]
  },
  "OPEN-S09-AFTER-13-1-WAIT": {
    "id": "OPEN-S09-AFTER-13-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-AFTER-13-1"
  },
  "OPEN-S09-C13-A-2": {
    "id": "OPEN-S09-C13-A-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "I wouldn't ask you to treat my label as that series number.",
    "channel": "sophie",
    "next": "OPEN-S09-AFTER-13-1-WAIT",
    "heardFacts": [
      "OPEN-S09-C13-A-2:reported"
    ]
  },
  "OPEN-S09-C13-A-2-WAIT": {
    "id": "OPEN-S09-C13-A-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-C13-A-2"
  },
  "OPEN-S09-C13-A-1": {
    "id": "OPEN-S09-C13-A-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Not in the public note I published.",
    "channel": "sophie",
    "next": "OPEN-S09-C13-A-2-WAIT",
    "heardFacts": [
      "OPEN-S09-C13-A-1:reported"
    ]
  },
  "OPEN-S09-C13-A-1-WAIT": {
    "id": "OPEN-S09-C13-A-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-C13-A-1"
  },
  "OPEN-S09-C13-B-2": {
    "id": "OPEN-S09-C13-B-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "And I haven't linked the notice in my note to that row.",
    "channel": "sophie",
    "next": "OPEN-S09-AFTER-13-1-WAIT",
    "heardFacts": [
      "OPEN-S09-C13-B-2:reported"
    ]
  },
  "OPEN-S09-C13-B-2-WAIT": {
    "id": "OPEN-S09-C13-B-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-C13-B-2"
  },
  "OPEN-S09-C13-B-1": {
    "id": "OPEN-S09-C13-B-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "No. A receiving office isn't automatically the issuer.",
    "channel": "sophie",
    "next": "OPEN-S09-C13-B-2-WAIT",
    "heardFacts": [
      "OPEN-S09-C13-B-1:reported"
    ]
  },
  "OPEN-S09-C13-B-1-WAIT": {
    "id": "OPEN-S09-C13-B-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-C13-B-1"
  },
  "OPEN-S09-C13-C-2": {
    "id": "OPEN-S09-C13-C-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "If I can substantiate that source publicly, you'll be able to check what I actually publish.",
    "channel": "sophie",
    "next": "OPEN-S09-AFTER-13-1-WAIT",
    "heardFacts": [
      "OPEN-S09-C13-C-2:reported"
    ]
  },
  "OPEN-S09-C13-C-2-WAIT": {
    "id": "OPEN-S09-C13-C-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-C13-C-2"
  },
  "OPEN-S09-C13-C-1": {
    "id": "OPEN-S09-C13-C-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Fair.",
    "channel": "sophie",
    "next": "OPEN-S09-C13-C-2-WAIT",
    "heardFacts": [
      "OPEN-S09-C13-C-1:reported"
    ]
  },
  "OPEN-S09-C13-C-1-WAIT": {
    "id": "OPEN-S09-C13-C-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-C13-C-1"
  },
  "OPEN-S09-C13": {
    "id": "OPEN-S09-C13",
    "kind": "choice",
    "number": "S09-C13",
    "channel": "sophie",
    "choices": [
      {
        "id": "a",
        "text": "A public transfer row lists a broad notices series. Did your source note include that official series number?",
        "next": "OPEN-S09-C13-A-1-WAIT"
      },
      {
        "id": "b",
        "text": "The register lists Greyhaven Records Centre as a receiving custodian for one series. Does that tell us who originally issued the notice you mentioned?",
        "next": "OPEN-S09-C13-B-1-WAIT"
      },
      {
        "id": "c",
        "text": "I found an inventory summary, but not the item. I'd rather ask for the item before quoting your reference.",
        "next": "OPEN-S09-C13-C-1-WAIT"
      }
    ]
  },
  "OPEN-S09-AFTER-14-2": {
    "id": "OPEN-S09-AFTER-14-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "You don't have to give me the investigation version.",
    "channel": "sophie",
    "next": "OPEN-S09-C15",
    "heardFacts": [
      "OPEN-S09-AFTER-14-2:reported"
    ]
  },
  "OPEN-S09-AFTER-14-2-WAIT": {
    "id": "OPEN-S09-AFTER-14-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-AFTER-14-2"
  },
  "OPEN-S09-AFTER-14-1": {
    "id": "OPEN-S09-AFTER-14-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Anyway, how are you doing?",
    "channel": "sophie",
    "next": "OPEN-S09-AFTER-14-2-WAIT",
    "heardFacts": [
      "OPEN-S09-AFTER-14-1:reported"
    ]
  },
  "OPEN-S09-AFTER-14-1-WAIT": {
    "id": "OPEN-S09-AFTER-14-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-AFTER-14-1"
  },
  "OPEN-S09-C14-A-2": {
    "id": "OPEN-S09-C14-A-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "I can hear him complaining that no pen in the house ever works.",
    "channel": "sophie",
    "next": "OPEN-S09-AFTER-14-1-WAIT",
    "heardFacts": [
      "OPEN-S09-C14-A-2:reported"
    ]
  },
  "OPEN-S09-C14-A-2-WAIT": {
    "id": "OPEN-S09-C14-A-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-C14-A-2"
  },
  "OPEN-S09-C14-A-1": {
    "id": "OPEN-S09-C14-A-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Yeah.",
    "channel": "sophie",
    "next": "OPEN-S09-C14-A-2-WAIT",
    "heardFacts": [
      "OPEN-S09-C14-A-1:reported"
    ]
  },
  "OPEN-S09-C14-A-1-WAIT": {
    "id": "OPEN-S09-C14-A-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-C14-A-1"
  },
  "OPEN-S09-C14-A-EFFECT": {
    "id": "OPEN-S09-C14-A-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "affinity": 2
      }
    },
    "next": "OPEN-S09-C14-A-1-WAIT"
  },
  "OPEN-S09-C14-B-2": {
    "id": "OPEN-S09-C14-B-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Maybe something else for a bit.",
    "channel": "sophie",
    "next": "OPEN-S09-AFTER-14-1-WAIT",
    "heardFacts": [
      "OPEN-S09-C14-B-2:reported"
    ]
  },
  "OPEN-S09-C14-B-2-WAIT": {
    "id": "OPEN-S09-C14-B-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-C14-B-2"
  },
  "OPEN-S09-C14-B-1": {
    "id": "OPEN-S09-C14-B-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Thank you for asking.",
    "channel": "sophie",
    "next": "OPEN-S09-C14-B-2-WAIT",
    "heardFacts": [
      "OPEN-S09-C14-B-1:reported"
    ]
  },
  "OPEN-S09-C14-B-1-WAIT": {
    "id": "OPEN-S09-C14-B-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-C14-B-1"
  },
  "OPEN-S09-C14-B-EFFECT": {
    "id": "OPEN-S09-C14-B-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "trust": 1,
        "affinity": 1
      }
    },
    "next": "OPEN-S09-C14-B-1-WAIT"
  },
  "OPEN-S09-C14-C-2": {
    "id": "OPEN-S09-C14-C-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "I was starting to look for a message in everything.",
    "channel": "sophie",
    "next": "OPEN-S09-AFTER-14-1-WAIT",
    "heardFacts": [
      "OPEN-S09-C14-C-2:reported"
    ]
  },
  "OPEN-S09-C14-C-2-WAIT": {
    "id": "OPEN-S09-C14-C-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-C14-C-2"
  },
  "OPEN-S09-C14-C-1": {
    "id": "OPEN-S09-C14-C-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "I think I needed to hear that.",
    "channel": "sophie",
    "next": "OPEN-S09-C14-C-2-WAIT",
    "heardFacts": [
      "OPEN-S09-C14-C-1:reported"
    ]
  },
  "OPEN-S09-C14-C-1-WAIT": {
    "id": "OPEN-S09-C14-C-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-C14-C-1"
  },
  "OPEN-S09-C14-C-EFFECT": {
    "id": "OPEN-S09-C14-C-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "trust": 1,
        "affinity": 1
      }
    },
    "next": "OPEN-S09-C14-C-1-WAIT"
  },
  "OPEN-S09-C14": {
    "id": "OPEN-S09-C14",
    "kind": "choice",
    "number": "S09-C14",
    "channel": "sophie",
    "choices": [
      {
        "id": "a",
        "text": "It's the small things that make someone feel real.",
        "next": "OPEN-S09-C14-A-EFFECT"
      },
      {
        "id": "b",
        "text": "Do you want to tell me about him, or should we talk about something else?",
        "next": "OPEN-S09-C14-B-EFFECT"
      },
      {
        "id": "c",
        "text": "You can keep that list without it having to mean more.",
        "next": "OPEN-S09-C14-C-EFFECT"
      }
    ]
  },
  "OPEN-S09-AFTER-15-2": {
    "id": "OPEN-S09-AFTER-15-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Goodnight.",
    "channel": "sophie",
    "next": "OPEN-S09-sophie-END",
    "heardFacts": [
      "OPEN-S09-AFTER-15-2:reported"
    ]
  },
  "OPEN-S09-AFTER-15-2-WAIT": {
    "id": "OPEN-S09-AFTER-15-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-AFTER-15-2"
  },
  "OPEN-S09-AFTER-15-1": {
    "id": "OPEN-S09-AFTER-15-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "I'm going to put that list back in its drawer.",
    "channel": "sophie",
    "next": "OPEN-S09-AFTER-15-2-WAIT",
    "heardFacts": [
      "OPEN-S09-AFTER-15-1:reported"
    ]
  },
  "OPEN-S09-AFTER-15-1-WAIT": {
    "id": "OPEN-S09-AFTER-15-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-AFTER-15-1"
  },
  "OPEN-S09-C15-A-2": {
    "id": "OPEN-S09-C15-A-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "I'd rather just know how you're doing.",
    "channel": "sophie",
    "next": "OPEN-S09-AFTER-15-1-WAIT",
    "heardFacts": [
      "OPEN-S09-C15-A-2:reported"
    ]
  },
  "OPEN-S09-C15-A-2-WAIT": {
    "id": "OPEN-S09-C15-A-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-C15-A-2"
  },
  "OPEN-S09-C15-A-1": {
    "id": "OPEN-S09-C15-A-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Okay. Thanks for saying the uncertain bit too.",
    "channel": "sophie",
    "next": "OPEN-S09-C15-A-2-WAIT",
    "heardFacts": [
      "OPEN-S09-C15-A-1:reported"
    ]
  },
  "OPEN-S09-C15-A-1-WAIT": {
    "id": "OPEN-S09-C15-A-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-C15-A-1"
  },
  "OPEN-S09-C15-B-2": {
    "id": "OPEN-S09-C15-B-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Maybe we should both take the evening off.",
    "channel": "sophie",
    "next": "OPEN-S09-AFTER-15-1-WAIT",
    "heardFacts": [
      "OPEN-S09-C15-B-2:reported"
    ]
  },
  "OPEN-S09-C15-B-2-WAIT": {
    "id": "OPEN-S09-C15-B-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-C15-B-2"
  },
  "OPEN-S09-C15-B-1": {
    "id": "OPEN-S09-C15-B-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "You and me both.",
    "channel": "sophie",
    "next": "OPEN-S09-C15-B-2-WAIT",
    "heardFacts": [
      "OPEN-S09-C15-B-1:reported"
    ]
  },
  "OPEN-S09-C15-B-1-WAIT": {
    "id": "OPEN-S09-C15-B-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-C15-B-1"
  },
  "OPEN-S09-C15-B-EFFECT": {
    "id": "OPEN-S09-C15-B-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "affinity": 2
      }
    },
    "next": "OPEN-S09-C15-B-1-WAIT"
  },
  "OPEN-S09-C15-C-2": {
    "id": "OPEN-S09-C15-C-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "That's enough for tonight.",
    "channel": "sophie",
    "next": "OPEN-S09-AFTER-15-1-WAIT",
    "heardFacts": [
      "OPEN-S09-C15-C-2:reported"
    ]
  },
  "OPEN-S09-C15-C-2-WAIT": {
    "id": "OPEN-S09-C15-C-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-C15-C-2"
  },
  "OPEN-S09-C15-C-1": {
    "id": "OPEN-S09-C15-C-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Good.",
    "channel": "sophie",
    "next": "OPEN-S09-C15-C-2-WAIT",
    "heardFacts": [
      "OPEN-S09-C15-C-1:reported"
    ]
  },
  "OPEN-S09-C15-C-1-WAIT": {
    "id": "OPEN-S09-C15-C-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-C15-C-1"
  },
  "OPEN-S09-C15-C-EFFECT": {
    "id": "OPEN-S09-C15-C-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "trust": 1,
        "affinity": 1
      }
    },
    "next": "OPEN-S09-C15-C-1-WAIT"
  },
  "OPEN-S09-C15": {
    "id": "OPEN-S09-C15",
    "kind": "choice",
    "number": "S09-C15",
    "channel": "sophie",
    "choices": [
      {
        "id": "a",
        "text": "I'm okay. I found a public record series, but I don't know whether it has anything to do with Daniel.",
        "next": "OPEN-S09-C15-A-1-WAIT"
      },
      {
        "id": "b",
        "text": "I could use a night without staring at records.",
        "next": "OPEN-S09-C15-B-EFFECT"
      },
      {
        "id": "c",
        "text": "I'm here. We don't have to talk about the case.",
        "next": "OPEN-S09-C15-C-EFFECT"
      }
    ]
  },
  "OPEN-S09-GROUP-C16-A-3": {
    "id": "OPEN-S09-GROUP-C16-A-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "Okay. Thanks for being careful.",
    "channel": "group",
    "next": "OPEN-S09-group-END",
    "heardFacts": [
      "OPEN-S09-GROUP-C16-A-3:reported"
    ]
  },
  "OPEN-S09-GROUP-C16-A-3-WAIT": {
    "id": "OPEN-S09-GROUP-C16-A-3-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-GROUP-C16-A-3"
  },
  "OPEN-S09-GROUP-C16-A-2": {
    "id": "OPEN-S09-GROUP-C16-A-2",
    "kind": "npc",
    "sender": "maya",
    "text": "A series entry helps us ask better questions, not name a culprit.",
    "channel": "group",
    "next": "OPEN-S09-GROUP-C16-A-3-WAIT",
    "heardFacts": [
      "OPEN-S09-GROUP-C16-A-2:reported"
    ]
  },
  "OPEN-S09-GROUP-C16-A-2-WAIT": {
    "id": "OPEN-S09-GROUP-C16-A-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S09-GROUP-C16-A-2"
  },
  "OPEN-S09-GROUP-C16-A-1": {
    "id": "OPEN-S09-GROUP-C16-A-1",
    "kind": "npc",
    "sender": "maya",
    "text": "That's the distinction we needed.",
    "channel": "group",
    "next": "OPEN-S09-GROUP-C16-A-2-WAIT",
    "heardFacts": [
      "OPEN-S09-GROUP-C16-A-1:reported"
    ]
  },
  "OPEN-S09-GROUP-C16-A-1-WAIT": {
    "id": "OPEN-S09-GROUP-C16-A-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S09-GROUP-C16-A-1"
  },
  "OPEN-S09-GROUP-C16-B-2": {
    "id": "OPEN-S09-GROUP-C16-B-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Understood.",
    "channel": "group",
    "next": "OPEN-S09-group-END",
    "heardFacts": [
      "OPEN-S09-GROUP-C16-B-2:reported"
    ]
  },
  "OPEN-S09-GROUP-C16-B-2-WAIT": {
    "id": "OPEN-S09-GROUP-C16-B-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-GROUP-C16-B-2"
  },
  "OPEN-S09-GROUP-C16-B-1": {
    "id": "OPEN-S09-GROUP-C16-B-1",
    "kind": "npc",
    "sender": "maya",
    "text": "Agreed. A shared category isn't a verified file.",
    "channel": "group",
    "next": "OPEN-S09-GROUP-C16-B-2-WAIT",
    "heardFacts": [
      "OPEN-S09-GROUP-C16-B-1:reported"
    ]
  },
  "OPEN-S09-GROUP-C16-B-1-WAIT": {
    "id": "OPEN-S09-GROUP-C16-B-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S09-GROUP-C16-B-1"
  },
  "OPEN-S09-GROUP-C16-C-2": {
    "id": "OPEN-S09-GROUP-C16-C-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Thanks.",
    "channel": "group",
    "next": "OPEN-S09-group-END",
    "heardFacts": [
      "OPEN-S09-GROUP-C16-C-2:reported"
    ]
  },
  "OPEN-S09-GROUP-C16-C-2-WAIT": {
    "id": "OPEN-S09-GROUP-C16-C-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-GROUP-C16-C-2"
  },
  "OPEN-S09-GROUP-C16-C-1": {
    "id": "OPEN-S09-GROUP-C16-C-1",
    "kind": "npc",
    "sender": "maya",
    "text": "Good plan. Let the source set the pace.",
    "channel": "group",
    "next": "OPEN-S09-GROUP-C16-C-2-WAIT",
    "heardFacts": [
      "OPEN-S09-GROUP-C16-C-1:reported"
    ]
  },
  "OPEN-S09-GROUP-C16-C-1-WAIT": {
    "id": "OPEN-S09-GROUP-C16-C-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S09-GROUP-C16-C-1"
  },
  "OPEN-S09-C16": {
    "id": "OPEN-S09-C16",
    "kind": "choice",
    "number": "S09-C16",
    "channel": "group",
    "choices": [
      {
        "id": "a",
        "text": "The public register lists a notices series moving to a records centre, but I haven't matched the article's reference to any item in that collection.",
        "next": "OPEN-S09-GROUP-C16-A-1-WAIT"
      },
      {
        "id": "b",
        "text": "There is a public series number now, but no original notice, issuer or item match. Please don't call it proof.",
        "next": "OPEN-S09-GROUP-C16-B-1-WAIT"
      },
      {
        "id": "c",
        "text": "I'm checking the public catalogue carefully. I'll share a source only when I can actually tie it to the claim.",
        "next": "OPEN-S09-GROUP-C16-C-1-WAIT"
      }
    ]
  },
  "OPEN-S09-SERIES-REPLY-A-7": {
    "id": "OPEN-S09-SERIES-REPLY-A-7",
    "kind": "npc",
    "sender": "sophie",
    "text": "But I don't want to name a file we haven't identified.",
    "channel": "sophie",
    "next": "OPEN-S09-C12",
    "heardFacts": [
      "OPEN-S09-SERIES-REPLY-A-7:reported"
    ]
  },
  "OPEN-S09-SERIES-REPLY-A-7-WAIT": {
    "id": "OPEN-S09-SERIES-REPLY-A-7-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-A-7"
  },
  "OPEN-S09-SERIES-REPLY-A-6": {
    "id": "OPEN-S09-SERIES-REPLY-A-6",
    "kind": "npc",
    "sender": "sophie",
    "text": "I know it can sound as though every answer sends you to a new form. I'm sorry about that.",
    "channel": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-A-7-WAIT",
    "heardFacts": [
      "OPEN-S09-SERIES-REPLY-A-6:reported"
    ]
  },
  "OPEN-S09-SERIES-REPLY-A-6-WAIT": {
    "id": "OPEN-S09-SERIES-REPLY-A-6-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-A-6"
  },
  "OPEN-S09-SERIES-REPLY-A-5": {
    "id": "OPEN-S09-SERIES-REPLY-A-5",
    "kind": "npc",
    "sender": "sophie",
    "text": "A more specific locating question needs an item title, office or descriptor, if one is available. That is not the same as an item being confirmed.",
    "channel": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-A-6-WAIT",
    "heardFacts": [
      "OPEN-S09-SERIES-REPLY-A-5:reported"
    ]
  },
  "OPEN-S09-SERIES-REPLY-A-5-WAIT": {
    "id": "OPEN-S09-SERIES-REPLY-A-5-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-A-5"
  },
  "OPEN-S09-SERIES-REPLY-A-4": {
    "id": "OPEN-S09-SERIES-REPLY-A-4",
    "kind": "npc",
    "sender": "sophie",
    "text": "The public summary is what is currently listed for that series.",
    "channel": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-A-5-WAIT",
    "heardFacts": [
      "OPEN-S09-SERIES-REPLY-A-4:reported"
    ]
  },
  "OPEN-S09-SERIES-REPLY-A-4-WAIT": {
    "id": "OPEN-S09-SERIES-REPLY-A-4-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-A-4"
  },
  "OPEN-S09-SERIES-REPLY-A-3": {
    "id": "OPEN-S09-SERIES-REPLY-A-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "I'll keep the answer to what our public finding aid can support.",
    "channel": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-A-4-WAIT",
    "heardFacts": [
      "OPEN-S09-SERIES-REPLY-A-3:reported"
    ]
  },
  "OPEN-S09-SERIES-REPLY-A-3-WAIT": {
    "id": "OPEN-S09-SERIES-REPLY-A-3-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-A-3"
  },
  "OPEN-S09-SERIES-REPLY-A-2": {
    "id": "OPEN-S09-SERIES-REPLY-A-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "I've looked at the series information in your message.",
    "channel": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-A-3-WAIT",
    "heardFacts": [
      "OPEN-S09-SERIES-REPLY-A-2:reported"
    ]
  },
  "OPEN-S09-SERIES-REPLY-A-2-WAIT": {
    "id": "OPEN-S09-SERIES-REPLY-A-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-A-2"
  },
  "OPEN-S09-SERIES-REPLY-A-1": {
    "id": "OPEN-S09-SERIES-REPLY-A-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Hello. This is the Public Series Enquiries inbox.",
    "channel": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-A-2-WAIT",
    "heardFacts": [
      "OPEN-S09-SERIES-REPLY-A-1:reported"
    ]
  },
  "OPEN-S09-SERIES-REPLY-A-1-WAIT": {
    "id": "OPEN-S09-SERIES-REPLY-A-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-A-1"
  },
  "OPEN-S09-SERIES-REPLY-B-7": {
    "id": "OPEN-S09-SERIES-REPLY-B-7",
    "kind": "npc",
    "sender": "sophie",
    "text": "But I don't want to name a file we haven't identified.",
    "channel": "sophie",
    "next": "OPEN-S09-C12",
    "heardFacts": [
      "OPEN-S09-SERIES-REPLY-B-7:reported"
    ]
  },
  "OPEN-S09-SERIES-REPLY-B-7-WAIT": {
    "id": "OPEN-S09-SERIES-REPLY-B-7-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-B-7"
  },
  "OPEN-S09-SERIES-REPLY-B-6": {
    "id": "OPEN-S09-SERIES-REPLY-B-6",
    "kind": "npc",
    "sender": "sophie",
    "text": "I know it can sound as though every answer sends you to a new form. I'm sorry about that.",
    "channel": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-B-7-WAIT",
    "heardFacts": [
      "OPEN-S09-SERIES-REPLY-B-6:reported"
    ]
  },
  "OPEN-S09-SERIES-REPLY-B-6-WAIT": {
    "id": "OPEN-S09-SERIES-REPLY-B-6-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-B-6"
  },
  "OPEN-S09-SERIES-REPLY-B-5": {
    "id": "OPEN-S09-SERIES-REPLY-B-5",
    "kind": "npc",
    "sender": "sophie",
    "text": "We can't match that code to an individual notice from your question alone.",
    "channel": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-B-6-WAIT",
    "heardFacts": [
      "OPEN-S09-SERIES-REPLY-B-5:reported"
    ]
  },
  "OPEN-S09-SERIES-REPLY-B-5-WAIT": {
    "id": "OPEN-S09-SERIES-REPLY-B-5-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-B-5"
  },
  "OPEN-S09-SERIES-REPLY-B-4": {
    "id": "OPEN-S09-SERIES-REPLY-B-4",
    "kind": "npc",
    "sender": "sophie",
    "text": "The publisher code you included is not shown as an official identifier in the public series summary.",
    "channel": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-B-5-WAIT",
    "heardFacts": [
      "OPEN-S09-SERIES-REPLY-B-4:reported"
    ]
  },
  "OPEN-S09-SERIES-REPLY-B-4-WAIT": {
    "id": "OPEN-S09-SERIES-REPLY-B-4-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-B-4"
  },
  "OPEN-S09-SERIES-REPLY-B-3": {
    "id": "OPEN-S09-SERIES-REPLY-B-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "I'll keep the answer to what our public finding aid can support.",
    "channel": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-B-4-WAIT",
    "heardFacts": [
      "OPEN-S09-SERIES-REPLY-B-3:reported"
    ]
  },
  "OPEN-S09-SERIES-REPLY-B-3-WAIT": {
    "id": "OPEN-S09-SERIES-REPLY-B-3-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-B-3"
  },
  "OPEN-S09-SERIES-REPLY-B-2": {
    "id": "OPEN-S09-SERIES-REPLY-B-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "I've looked at the series information in your message.",
    "channel": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-B-3-WAIT",
    "heardFacts": [
      "OPEN-S09-SERIES-REPLY-B-2:reported"
    ]
  },
  "OPEN-S09-SERIES-REPLY-B-2-WAIT": {
    "id": "OPEN-S09-SERIES-REPLY-B-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-B-2"
  },
  "OPEN-S09-SERIES-REPLY-B-1": {
    "id": "OPEN-S09-SERIES-REPLY-B-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Hello. This is the Public Series Enquiries inbox.",
    "channel": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-B-2-WAIT",
    "heardFacts": [
      "OPEN-S09-SERIES-REPLY-B-1:reported"
    ]
  },
  "OPEN-S09-SERIES-REPLY-B-1-WAIT": {
    "id": "OPEN-S09-SERIES-REPLY-B-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-B-1"
  },
  "OPEN-S09-SERIES-REPLY-C-7": {
    "id": "OPEN-S09-SERIES-REPLY-C-7",
    "kind": "npc",
    "sender": "sophie",
    "text": "But I don't want to name a file we haven't identified.",
    "channel": "sophie",
    "next": "OPEN-S09-C12",
    "heardFacts": [
      "OPEN-S09-SERIES-REPLY-C-7:reported"
    ]
  },
  "OPEN-S09-SERIES-REPLY-C-7-WAIT": {
    "id": "OPEN-S09-SERIES-REPLY-C-7-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-C-7"
  },
  "OPEN-S09-SERIES-REPLY-C-6": {
    "id": "OPEN-S09-SERIES-REPLY-C-6",
    "kind": "npc",
    "sender": "sophie",
    "text": "I know it can sound as though every answer sends you to a new form. I'm sorry about that.",
    "channel": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-C-7-WAIT",
    "heardFacts": [
      "OPEN-S09-SERIES-REPLY-C-6:reported"
    ]
  },
  "OPEN-S09-SERIES-REPLY-C-6-WAIT": {
    "id": "OPEN-S09-SERIES-REPLY-C-6-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-C-6"
  },
  "OPEN-S09-SERIES-REPLY-C-5": {
    "id": "OPEN-S09-SERIES-REPLY-C-5",
    "kind": "npc",
    "sender": "sophie",
    "text": "It does not tell you which individual notice was part of it.",
    "channel": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-C-6-WAIT",
    "heardFacts": [
      "OPEN-S09-SERIES-REPLY-C-5:reported"
    ]
  },
  "OPEN-S09-SERIES-REPLY-C-5-WAIT": {
    "id": "OPEN-S09-SERIES-REPLY-C-5-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-C-5"
  },
  "OPEN-S09-SERIES-REPLY-C-4": {
    "id": "OPEN-S09-SERIES-REPLY-C-4",
    "kind": "npc",
    "sender": "sophie",
    "text": "The public series page is the right starting point for access requirements concerning this transferred collection.",
    "channel": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-C-5-WAIT",
    "heardFacts": [
      "OPEN-S09-SERIES-REPLY-C-4:reported"
    ]
  },
  "OPEN-S09-SERIES-REPLY-C-4-WAIT": {
    "id": "OPEN-S09-SERIES-REPLY-C-4-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-C-4"
  },
  "OPEN-S09-SERIES-REPLY-C-3": {
    "id": "OPEN-S09-SERIES-REPLY-C-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "I'll keep the answer to what our public finding aid can support.",
    "channel": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-C-4-WAIT",
    "heardFacts": [
      "OPEN-S09-SERIES-REPLY-C-3:reported"
    ]
  },
  "OPEN-S09-SERIES-REPLY-C-3-WAIT": {
    "id": "OPEN-S09-SERIES-REPLY-C-3-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-C-3"
  },
  "OPEN-S09-SERIES-REPLY-C-2": {
    "id": "OPEN-S09-SERIES-REPLY-C-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "I've looked at the series information in your message.",
    "channel": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-C-3-WAIT",
    "heardFacts": [
      "OPEN-S09-SERIES-REPLY-C-2:reported"
    ]
  },
  "OPEN-S09-SERIES-REPLY-C-2-WAIT": {
    "id": "OPEN-S09-SERIES-REPLY-C-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-C-2"
  },
  "OPEN-S09-SERIES-REPLY-C-1": {
    "id": "OPEN-S09-SERIES-REPLY-C-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Hello. This is the Public Series Enquiries inbox.",
    "channel": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-C-2-WAIT",
    "heardFacts": [
      "OPEN-S09-SERIES-REPLY-C-1:reported"
    ]
  },
  "OPEN-S09-SERIES-REPLY-C-1-WAIT": {
    "id": "OPEN-S09-SERIES-REPLY-C-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-SERIES-REPLY-C-1"
  },
  "OPEN-S09-PRO-OPEN-2": {
    "id": "OPEN-S09-PRO-OPEN-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "If this is about what the public register lists, I can talk about what the published source says. I can't verify a file I haven't seen.",
    "channel": "sophie",
    "next": "OPEN-S09-C13",
    "heardFacts": [
      "OPEN-S09-PRO-OPEN-2:reported"
    ]
  },
  "OPEN-S09-PRO-OPEN-2-WAIT": {
    "id": "OPEN-S09-PRO-OPEN-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-PRO-OPEN-2"
  },
  "OPEN-S09-PRO-OPEN-1": {
    "id": "OPEN-S09-PRO-OPEN-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Hello again.",
    "channel": "sophie",
    "next": "OPEN-S09-PRO-OPEN-2-WAIT",
    "heardFacts": [
      "OPEN-S09-PRO-OPEN-1:reported"
    ]
  },
  "OPEN-S09-PRO-OPEN-1-WAIT": {
    "id": "OPEN-S09-PRO-OPEN-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-PRO-OPEN-1"
  },
  "OPEN-S09-SOPHIE-OPEN-5": {
    "id": "OPEN-S09-SOPHIE-OPEN-5",
    "kind": "npc",
    "sender": "sophie",
    "text": "It's just so normal.",
    "channel": "sophie",
    "next": "OPEN-S09-C14",
    "heardFacts": [
      "OPEN-S09-SOPHIE-OPEN-5:reported"
    ]
  },
  "OPEN-S09-SOPHIE-OPEN-5-WAIT": {
    "id": "OPEN-S09-SOPHIE-OPEN-5-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-SOPHIE-OPEN-5"
  },
  "OPEN-S09-SOPHIE-OPEN-4": {
    "id": "OPEN-S09-SOPHIE-OPEN-4",
    "kind": "npc",
    "sender": "sophie",
    "text": "I don't know why that one got to me.",
    "channel": "sophie",
    "next": "OPEN-S09-SOPHIE-OPEN-5-WAIT",
    "heardFacts": [
      "OPEN-S09-SOPHIE-OPEN-4:reported"
    ]
  },
  "OPEN-S09-SOPHIE-OPEN-4-WAIT": {
    "id": "OPEN-S09-SOPHIE-OPEN-4-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-SOPHIE-OPEN-4"
  },
  "OPEN-S09-SOPHIE-OPEN-3": {
    "id": "OPEN-S09-SOPHIE-OPEN-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "Bread. Eggs. Batteries. Another pen, underlined twice.",
    "channel": "sophie",
    "next": "OPEN-S09-SOPHIE-OPEN-4-WAIT",
    "heardFacts": [
      "OPEN-S09-SOPHIE-OPEN-3:reported"
    ]
  },
  "OPEN-S09-SOPHIE-OPEN-3-WAIT": {
    "id": "OPEN-S09-SOPHIE-OPEN-3-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-SOPHIE-OPEN-3"
  },
  "OPEN-S09-SOPHIE-OPEN-2": {
    "id": "OPEN-S09-SOPHIE-OPEN-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "I found one of Daniel's old shopping lists.",
    "channel": "sophie",
    "next": "OPEN-S09-SOPHIE-OPEN-3-WAIT",
    "heardFacts": [
      "OPEN-S09-SOPHIE-OPEN-2:reported"
    ]
  },
  "OPEN-S09-SOPHIE-OPEN-2-WAIT": {
    "id": "OPEN-S09-SOPHIE-OPEN-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-SOPHIE-OPEN-2"
  },
  "OPEN-S09-SOPHIE-OPEN-1": {
    "id": "OPEN-S09-SOPHIE-OPEN-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Hey.",
    "channel": "sophie",
    "next": "OPEN-S09-SOPHIE-OPEN-2-WAIT",
    "heardFacts": [
      "OPEN-S09-SOPHIE-OPEN-1:reported"
    ]
  },
  "OPEN-S09-SOPHIE-OPEN-1-WAIT": {
    "id": "OPEN-S09-SOPHIE-OPEN-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S09-SOPHIE-OPEN-1"
  }
}
export const scene09Investigation = {
  "authoringId": "chapter_01_scene_09_the_transfer_register",
  "planningId": "ch01_sc09_unknown_source",
  "sources": {
    "GH-TRANSFER-REGISTER-001": {
      "kind": "CIVIC_PUBLIC_TRANSFER_LISTING",
      "scope": "series-only",
      "route": "browser://greyhaven/civic-records/transfers/public-register"
    },
    "GH-TRANSFER-FINDING-AID-001": {
      "kind": "CIVIC_PUBLIC_INVENTORY_SUMMARY",
      "scope": "collection-summary",
      "route": "browser://greyhaven/civic-records/transfers/GH-TR-2022-063/finding-aid"
    },
    "GH-TR-2022-063": {
      "kind": "PUBLIC_LISTED_SERIES_TRANSFER",
      "series": "GH-PN-GEN-2017-2021",
      "inventory": "GH-INV-2022-063",
      "formerCustodian": "Civic Secretariat",
      "receivingCustodian": "Greyhaven Records Centre",
      "coverage": "2017–2021",
      "transferYear": 2022,
      "specificNoticeIdentified": false
    },
    "GH-PN-GEN-2017-2021": {
      "kind": "PUBLIC_RECORD_SERIES",
      "itemMatch": false
    },
    "GH-INV-2022-063": {
      "kind": "PUBLIC_SERIES_SUMMARY",
      "originalAttached": false
    }
  },
  "choices": {
    "S09-C01": {
      "heading": "OPTIONAL LOCAL ORIENTATION; NO SEND, REPEATABLE",
      "mode": "local",
      "options": [
        {
          "id": "a",
          "text": "Show the limit on the publisher reference.",
          "feedback": "GB-REF-017 remains a publisher's label without a linked official record number, original notice or confirmed issuer."
        },
        {
          "id": "b",
          "text": "Does the previous routing reply identify a custodian?",
          "feedback": ""
        },
        {
          "id": "c",
          "text": "What is a transfer entry supposed to describe?",
          "feedback": "It may identify the movement of a record SERIES between custodians. Individual contents require their own identification."
        }
      ]
    },
    "S09-C02": {
      "heading": "WHICH CLAIM DOES THIS PAGE SUPPORT? LOCAL NO SEND",
      "mode": "local",
      "options": [
        {
          "id": "a",
          "text": "GB-REF-017 was stored in the transferred boxes.",
          "feedback": "That label is not listed on this page. The row names a series, not a verified matching notice. Try again."
        },
        {
          "id": "b",
          "text": "A public register lists a transfer of this broad record series; it does not show a notice matching GB-REF-017.",
          "feedback": "Supported. The series transfer is listed. Membership of the missing notice remains unestablished."
        },
        {
          "id": "c",
          "text": "The receiving centre must have written the missing notice.",
          "feedback": "Receiving custody and original authorship are separate questions. Try again."
        }
      ]
    },
    "S09-C03": {
      "heading": "WHAT ARE THESE THREE FIELDS? LOCAL NO SEND",
      "mode": "local",
      "options": [
        {
          "id": "a",
          "text": "Entry number identifies this transfer row; series identifier names its collection; inventory reference points to a summary.",
          "feedback": "Supported. None is an item-level notice number."
        },
        {
          "id": "b",
          "text": "GH-TR-2022-063 is the revised Bulletin article ID.",
          "feedback": "No. This is a civic register entry. The publisher's article remains a different source."
        },
        {
          "id": "c",
          "text": "GH-INV-2022-063 proves exactly one notice was archived.",
          "feedback": "An inventory-summary reference does not specify the number or content of items here. Try again."
        }
      ]
    },
    "S09-C04": {
      "heading": "DATE-RANGE CHECK, LOCAL NO SEND",
      "mode": "local",
      "options": [
        {
          "id": "a",
          "text": "The series contains every public notice issued in 2019.",
          "feedback": "The listing does not state completeness for that year. Broad coverage is not an exhaustive item index."
        },
        {
          "id": "b",
          "text": "The 2022 transfer date proves the article was changed in 2022.",
          "feedback": "The register has no Bulletin editing information."
        },
        {
          "id": "c",
          "text": "The years describe the series; an individual notice still needs its own date, identifier and attributable copy.",
          "feedback": "Supported. A possible range is not a source match."
        }
      ]
    },
    "S09-C05": {
      "heading": "WHICH OFFICE CAN BE NAMED? LOCAL NO SEND",
      "mode": "local",
      "options": [
        {
          "id": "a",
          "text": "Civic Secretariat is now proved to have issued GB-REF-017.",
          "feedback": "The register gives its series-level custodial role, not this notice's authorship."
        },
        {
          "id": "b",
          "text": "Greyhaven Records Centre is the listed receiving custodian for the SERIES. The notice's issuer and item custody are unverified.",
          "feedback": "Supported. A candidate series custodian is not a confirmed holder of the missing notice."
        },
        {
          "id": "c",
          "text": "Nora must have sent the article through the receiving centre.",
          "feedback": "There is no sourced contact between the journalist and this transfer entry. Retry."
        }
      ]
    },
    "S09-C06": {
      "heading": "WHAT CAN THIS FINDING AID PROVE? LOCAL NO SEND",
      "mode": "local",
      "options": [
        {
          "id": "a",
          "text": "This public list proves the missing notice was destroyed.",
          "feedback": "No destruction is recorded or inferred. Missing from a public summary is not destruction."
        },
        {
          "id": "b",
          "text": "The finding aid supplies the notice text and its issuing body.",
          "feedback": "It lists neither. The notice is not attached."
        },
        {
          "id": "c",
          "text": "The summary locates a collection and limits, but gives no item-level match for GB-REF-017.",
          "feedback": "Supported. It can guide the next question, not answer what the missing notice said."
        }
      ]
    },
    "S09-C07": {
      "heading": "WHICH REQUEST IS GROUNDED? LOCAL NO SEND",
      "mode": "local",
      "options": [
        {
          "id": "a",
          "text": "Ask the listed custodian about item-level finding aids for GH-PN-GEN-2017-2021 and what identifying details they require.",
          "feedback": "Supported. It targets a documented series with a limited, auditable question."
        },
        {
          "id": "b",
          "text": "Order the centre to provide Daniel's private files.",
          "feedback": "The public register authorizes no such access."
        },
        {
          "id": "c",
          "text": "Ask the centre to confirm who altered the Bulletin article.",
          "feedback": "The city records centre does not administer the publisher's website history."
        }
      ]
    },
    "S09-C08": {
      "heading": "INTERPRET NO ITEM MATCH, LOCAL NO SEND",
      "mode": "local",
      "options": [
        {
          "id": "a",
          "text": "No hit confirms the issuing office secretly removed it.",
          "feedback": "No removal is recorded. Searching a publisher string in a series inventory is not a provenance test."
        },
        {
          "id": "b",
          "text": "The search's scope is too broad or uses the wrong identifier; a non-match cannot establish existence or deletion.",
          "feedback": "Supported. A more attributable item key is needed."
        },
        {
          "id": "c",
          "text": "The receiving centre edited the article to hide it.",
          "feedback": "The register describes custody, not publication edits."
        }
      ]
    },
    "S09-C09": {
      "heading": "IS THIS A MATCH YET? LOCAL NO SEND",
      "mode": "local",
      "options": [
        {
          "id": "a",
          "text": "Yes. Both sources mention public notices, so they are identical.",
          "feedback": "A shared category is not a matching title, number, original, date or issuing body. Try again."
        },
        {
          "id": "b",
          "text": "Yes. The range includes 2019, so the source is the Bus 4 item.",
          "feedback": "This would invent a link to an unrelated investigation strand. Try again."
        },
        {
          "id": "c",
          "text": "No. The publisher reference and the transfer series have no demonstrated common item identifier or original notice.",
          "feedback": "Supported. This is a promising SEARCH LOCATION, not a matched source."
        }
      ]
    },
    "S09-C10": {
      "heading": "WHAT TO PRIORITIZE, PRIVATE STRATEGY; NO SEND",
      "mode": "local",
      "options": [
        {
          "id": "a",
          "text": "Ask for access conditions to the listed series.",
          "feedback": "Private priority saved: access-first. No request sent."
        },
        {
          "id": "b",
          "text": "Try to obtain a public item-level inventory or description.",
          "feedback": "Private priority saved: inventory-first. No request sent."
        },
        {
          "id": "c",
          "text": "Keep the publisher's string out of correspondence for now.",
          "feedback": "Private priority saved: privacy-first. No request sent."
        }
      ]
    },
    "S09-C11": {
      "heading": "OPTIONAL SERIES QUESTION: SELECT -> DRAFT -> REVIEW -> SEND",
      "mode": "form",
      "options": [
        {
          "id": "a",
          "text": "The public transfer register lists GH-PN-GEN-2017-2021 under GH-TR-2022-063. Is there an item-level public finding aid for this series, and what details would a locating request need?",
          "feedback": ""
        },
        {
          "id": "b",
          "text": "I found the public series summary GH-INV-2022-063. A publisher separately labels a possible notice GB-REF-017; I do not have an official item number or original. Can you advise a permissible item-level locating procedure?",
          "feedback": ""
        },
        {
          "id": "c",
          "text": "Does the receiving records centre publish an access guide for transferred administrative postings from 2017–2021? I am not asking you to certify that a particular notice was transferred.",
          "feedback": ""
        }
      ]
    },
    "S09-C12": {
      "heading": "OPTIONAL ROLE INBOX FOLLOW-UP (COMPOSER + REAL SEND)",
      "mode": "civic",
      "options": [
        {
          "id": "a",
          "text": "So a series-level transfer doesn't tell me whether a particular notice is in it?",
          "feedback": "",
          "next": "OPEN-S09-C12-A-1-WAIT"
        },
        {
          "id": "b",
          "text": "Can you tell me who changed the published article?",
          "feedback": "",
          "next": "OPEN-S09-C12-B-1-WAIT"
        },
        {
          "id": "c",
          "text": "Thanks. I'll keep this as a possible place to search, not a confirmed document.",
          "feedback": "",
          "next": "OPEN-S09-C12-C-1-WAIT"
        }
      ]
    },
    "S09-C13": {
      "heading": "OPTIONAL NORA QUESTION; SELECT -> DRAFT -> SEND",
      "mode": "professional",
      "options": [
        {
          "id": "a",
          "text": "A public transfer row lists a broad notices series. Did your source note include that official series number?",
          "feedback": "",
          "next": "OPEN-S09-C13-A-1-WAIT"
        },
        {
          "id": "b",
          "text": "The register lists Greyhaven Records Centre as a receiving custodian for one series. Does that tell us who originally issued the notice you mentioned?",
          "feedback": "",
          "next": "OPEN-S09-C13-B-1-WAIT"
        },
        {
          "id": "c",
          "text": "I found an inventory summary, but not the item. I'd rather ask for the item before quoting your reference.",
          "feedback": "",
          "next": "OPEN-S09-C13-C-1-WAIT"
        }
      ]
    },
    "S09-C14": {
      "heading": "OPTIONAL PRIVATE RESPONSE, SELECT -> DRAFT -> SEND",
      "mode": "sophie",
      "options": [
        {
          "id": "a",
          "text": "It's the small things that make someone feel real.",
          "feedback": "",
          "next": "OPEN-S09-C14-A-EFFECT"
        },
        {
          "id": "b",
          "text": "Do you want to tell me about him, or should we talk about something else?",
          "feedback": "",
          "next": "OPEN-S09-C14-B-EFFECT"
        },
        {
          "id": "c",
          "text": "You can keep that list without it having to mean more.",
          "feedback": "",
          "next": "OPEN-S09-C14-C-EFFECT"
        }
      ]
    },
    "S09-C15": {
      "heading": "OPTIONAL PRIVATE RESPONSE, SELECT -> DRAFT -> SEND",
      "mode": "sophie",
      "options": [
        {
          "id": "a",
          "text": "I'm okay. I found a public record series, but I don't know whether it has anything to do with Daniel.",
          "feedback": "",
          "next": "OPEN-S09-C15-A-1-WAIT"
        },
        {
          "id": "b",
          "text": "I could use a night without staring at records.",
          "feedback": "",
          "next": "OPEN-S09-C15-B-EFFECT"
        },
        {
          "id": "c",
          "text": "I'm here. We don't have to talk about the case.",
          "feedback": "",
          "next": "OPEN-S09-C15-C-EFFECT"
        }
      ]
    },
    "S09-C16": {
      "heading": "OPTIONAL GROUP MESSAGE, SELECT -> DRAFT -> SEND",
      "mode": "group",
      "options": [
        {
          "id": "a",
          "text": "The public register lists a notices series moving to a records centre, but I haven't matched the article's reference to any item in that collection.",
          "feedback": "",
          "next": "OPEN-S09-GROUP-C16-A-1-WAIT"
        },
        {
          "id": "b",
          "text": "There is a public series number now, but no original notice, issuer or item match. Please don't call it proof.",
          "feedback": "",
          "next": "OPEN-S09-GROUP-C16-B-1-WAIT"
        },
        {
          "id": "c",
          "text": "I'm checking the public catalogue carefully. I'll share a source only when I can actually tie it to the claim.",
          "feedback": "",
          "next": "OPEN-S09-GROUP-C16-C-1-WAIT"
        }
      ]
    },
    "S09-C17": {
      "heading": "REQUIRED PRIVATE PUZZLE; LOCAL NO SEND",
      "mode": "local",
      "options": [
        {
          "id": "a",
          "text": "An identified original notice or item-level listing must link the publisher's reference to this specific transferred series.",
          "feedback": "Supported. The register makes a custodian for the series visible; it does not place this notice in the series."
        },
        {
          "id": "b",
          "text": "The 2022 transfer entry proves the article was altered.",
          "feedback": "A custodian move is not an article revision log."
        },
        {
          "id": "c",
          "text": "A journalist's byline links the notice to the records centre.",
          "feedback": "Authorship of the story does not identify a city's original file or issuing office."
        }
      ]
    },
    "S09-C18": {
      "heading": "FINAL PRIVATE STANCE; LOCAL NO SEND",
      "mode": "local",
      "options": [
        {
          "id": "a",
          "text": "The register identifies a transferred collection, not the missing notice within it.",
          "feedback": "Saved: collection-level lead, item-level match pending."
        },
        {
          "id": "b",
          "text": "I have a possible records-centre route, but still need an identifiable item before asking what it says.",
          "feedback": "Saved: limited records route, no inferred document."
        },
        {
          "id": "c",
          "text": "I won't tell Sophie or the group that this is Daniel's file until a source actually makes that connection.",
          "feedback": "Saved: attribution withheld; no disclosure sent."
        }
      ]
    }
  },
  "pages": {
    "register": {
      "route": "browser://greyhaven/civic-records/transfers/public-register",
      "paragraphs": [
        "GREYHAVEN CIVIC SERVICES PUBLIC RECORDS TRANSFER REGISTER Public listing / Selected series transfers",
        "This public register lists selected movements of record SERIES between custodians. It does not list every individual paper held in a series. An entry does not certify the contents of a record that has not been identified and independently inspected.",
        "ENTRY: GH-TR-2022-063 Series title: General Public Notices — Administrative Postings Series identifier: GH-PN-GEN-2017-2021 Series coverage: 2017–2021 (broad filing range) Transfer recorded: 2022 Former listed custodian: Civic Secretariat Receiving listed custodian: Greyhaven Records Centre Public inventory summary: GH-INV-2022-063 Item-level inventory in public register: NOT PROVIDED Original issuing bodies: VARIED / NOT ITEMIZED HERE",
        "STATUS NOTE This entry records a listed custodial transfer for the named SERIES. It does not establish that a publisher-cited reference belongs to it. A record's date, title and issuing body must be matched separately.",
        "OTHER REGISTER ENTRY (UNRELATED CONTROL EXAMPLE) GH-TR-2023-019 — Municipal Tree-Planting Event Permits, 2020–2022 Receiving custodian: Greyhaven Parks Records Unit Item-level list: NOT SHOWN IN THIS PUBLIC EXTRACT",
        "Public register fields describe custody and series coverage. They must not be treated as publisher website-edit logs or original notices."
      ]
    },
    "finding-aid": {
      "route": "browser://greyhaven/civic-records/transfers/GH-TR-2022-063/finding-aid",
      "paragraphs": [
        "GREYHAVEN RECORDS CENTRE PUBLIC FINDING AID — SERIES SUMMARY",
        "Inventory summary: GH-INV-2022-063 Associated transfer register entry: GH-TR-2022-063 Series: GH-PN-GEN-2017-2021 Title: General Public Notices — Administrative Postings Listed receiving custodian: Greyhaven Records Centre",
        "SUMMARY COVERAGE General administrative public notices in the transferred filing series, 2017–2021. This summary describes the COLLECTION, not the text, issuing office or existence of a particular notice.",
        "PUBLIC ACCESS STATUS Series-level summary: AVAILABLE Public item-level list: NOT PRESENT IN THIS SUMMARY Original notices: NOT ATTACHED HERE Item-level search: requires an original title, issuer, or a sufficiently specific descriptor; a series request may be routed for further review.",
        "IMPORTANT LIMIT This finding aid does not identify individual notices. A missing public item list cannot establish whether a particular notice exists.",
        "The following are not provided by the public finding aid: item-level file inventory, the text of an original notice, a verified issuer, and a link to any published article revision."
      ]
    }
  },
  "entrances": {
    "civic_a": "OPEN-S09-SERIES-REPLY-A-1-WAIT",
    "civic_b": "OPEN-S09-SERIES-REPLY-B-1-WAIT",
    "civic_c": "OPEN-S09-SERIES-REPLY-C-1-WAIT",
    "professional": "OPEN-S09-PRO-OPEN-1-WAIT",
    "sophie": "OPEN-S09-SOPHIE-OPEN-1-WAIT",
    "group": "OPEN-S09-C16"
  },
  "sourceSha256": "7276c69f9fcacd9cfa92391f2cbf751c1c870b3d1df30eb5b688f59f6feabe38"
} as const
