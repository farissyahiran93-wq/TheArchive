// Generated from the pinned Scene 10 manuscript only.
import type { Scene01Node } from './scene01'
export const scene10Nodes: Record<string,Scene01Node> = {
  "OPEN-S10-civic-END": {
    "id": "OPEN-S10-civic-END",
    "kind": "event",
    "event": "source-thread-end"
  },
  "OPEN-S10-professional-END": {
    "id": "OPEN-S10-professional-END",
    "kind": "event",
    "event": "source-thread-end"
  },
  "OPEN-S10-sophie-END": {
    "id": "OPEN-S10-sophie-END",
    "kind": "event",
    "event": "source-thread-end"
  },
  "OPEN-S10-group-END": {
    "id": "OPEN-S10-group-END",
    "kind": "event",
    "event": "source-thread-end"
  },
  "OPEN-S10-C13-A-2": {
    "id": "OPEN-S10-C13-A-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "The code is a way to ask, not the answer.",
    "channel": "sophie",
    "next": "OPEN-S10-civic-END",
    "heardFacts": [
      "OPEN-S10-C13-A-2:reported"
    ]
  },
  "OPEN-S10-C13-A-2-WAIT": {
    "id": "OPEN-S10-C13-A-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-C13-A-2"
  },
  "OPEN-S10-C13-A-1": {
    "id": "OPEN-S10-C13-A-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "That's right. We need the description itself before assigning meaning to it.",
    "channel": "sophie",
    "next": "OPEN-S10-C13-A-2-WAIT",
    "heardFacts": [
      "OPEN-S10-C13-A-1:reported"
    ]
  },
  "OPEN-S10-C13-A-1-WAIT": {
    "id": "OPEN-S10-C13-A-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-C13-A-1"
  },
  "OPEN-S10-C13-B-2": {
    "id": "OPEN-S10-C13-B-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "We'd need another attributable record to address that.",
    "channel": "sophie",
    "next": "OPEN-S10-civic-END",
    "heardFacts": [
      "OPEN-S10-C13-B-2:reported"
    ]
  },
  "OPEN-S10-C13-B-2-WAIT": {
    "id": "OPEN-S10-C13-B-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-C13-B-2"
  },
  "OPEN-S10-C13-B-1": {
    "id": "OPEN-S10-C13-B-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Not from this extract. A page that omits text is not a disposition report.",
    "channel": "sophie",
    "next": "OPEN-S10-C13-B-2-WAIT",
    "heardFacts": [
      "OPEN-S10-C13-B-1:reported"
    ]
  },
  "OPEN-S10-C13-B-1-WAIT": {
    "id": "OPEN-S10-C13-B-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-C13-B-1"
  },
  "OPEN-S10-C13-C-5": {
    "id": "OPEN-S10-C13-C-5",
    "kind": "npc",
    "sender": "sophie",
    "text": "Just tell me what kind of sheet. I don't need the whole file.",
    "channel": "sophie",
    "next": "OPEN-S10-civic-END",
    "heardFacts": [
      "OPEN-S10-C13-C-5:reported"
    ]
  },
  "OPEN-S10-C13-C-5-WAIT": {
    "id": "OPEN-S10-C13-C-5-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-C13-C-5"
  },
  "OPEN-S10-C13-C-4": {
    "id": "OPEN-S10-C13-C-4",
    "kind": "npc",
    "sender": "sophie",
    "text": "You mentioned an inventory sheet?",
    "channel": "sophie",
    "next": "OPEN-S10-C13-C-5-WAIT",
    "heardFacts": [
      "OPEN-S10-C13-C-4:reported"
    ]
  },
  "OPEN-S10-C13-C-4-WAIT": {
    "id": "OPEN-S10-C13-C-4-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-C13-C-4"
  },
  "OPEN-S10-C13-C-3": {
    "id": "OPEN-S10-C13-C-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "Hi again.",
    "channel": "sophie",
    "next": "OPEN-S10-C13-C-4-WAIT",
    "heardFacts": [
      "OPEN-S10-C13-C-3:reported"
    ]
  },
  "OPEN-S10-C13-C-3-WAIT": {
    "id": "OPEN-S10-C13-C-3-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-C13-C-3"
  },
  "OPEN-S10-C13-C-2": {
    "id": "OPEN-S10-C13-C-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Take care.",
    "channel": "sophie",
    "next": "OPEN-S10-C13-C-3-WAIT",
    "heardFacts": [
      "OPEN-S10-C13-C-2:reported"
    ]
  },
  "OPEN-S10-C13-C-2-WAIT": {
    "id": "OPEN-S10-C13-C-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-C13-C-2"
  },
  "OPEN-S10-C13-C-1": {
    "id": "OPEN-S10-C13-C-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "That is a sound way to record what you currently have.",
    "channel": "sophie",
    "next": "OPEN-S10-C13-C-2-WAIT",
    "heardFacts": [
      "OPEN-S10-C13-C-1:reported"
    ]
  },
  "OPEN-S10-C13-C-1-WAIT": {
    "id": "OPEN-S10-C13-C-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-C13-C-1"
  },
  "OPEN-S10-C13": {
    "id": "OPEN-S10-C13",
    "kind": "choice",
    "number": "S10-C13",
    "channel": "sophie",
    "choices": [
      {
        "id": "a",
        "text": "So the public reference is not the same thing as a verified catalogue description?",
        "next": "OPEN-S10-C13-A-1-WAIT"
      },
      {
        "id": "b",
        "text": "Could the missing public text prove a notice was removed or concealed?",
        "next": "OPEN-S10-C13-B-1-WAIT"
      },
      {
        "id": "c",
        "text": "Thanks. I'll keep the box reference separate from the publisher label.",
        "next": "OPEN-S10-C13-C-1-WAIT"
      }
    ]
  },
  "OPEN-S10-AFTER-14-2": {
    "id": "OPEN-S10-AFTER-14-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Please don't say a file vanished just because the public version doesn't show it.",
    "channel": "sophie",
    "next": "OPEN-S10-professional-END",
    "heardFacts": [
      "OPEN-S10-AFTER-14-2:reported"
    ]
  },
  "OPEN-S10-AFTER-14-2-WAIT": {
    "id": "OPEN-S10-AFTER-14-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-AFTER-14-2"
  },
  "OPEN-S10-AFTER-14-1": {
    "id": "OPEN-S10-AFTER-14-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "I've got to go back to work.",
    "channel": "sophie",
    "next": "OPEN-S10-AFTER-14-2-WAIT",
    "heardFacts": [
      "OPEN-S10-AFTER-14-1:reported"
    ]
  },
  "OPEN-S10-AFTER-14-1-WAIT": {
    "id": "OPEN-S10-AFTER-14-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-AFTER-14-1"
  },
  "OPEN-S10-C14-A-2": {
    "id": "OPEN-S10-C14-A-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "If I used it as an original, you'd be right to question me.",
    "channel": "sophie",
    "next": "OPEN-S10-AFTER-14-1-WAIT",
    "heardFacts": [
      "OPEN-S10-C14-A-2:reported"
    ]
  },
  "OPEN-S10-C14-A-2-WAIT": {
    "id": "OPEN-S10-C14-A-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-C14-A-2"
  },
  "OPEN-S10-C14-A-1": {
    "id": "OPEN-S10-C14-A-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "No. A description of a box isn't the underlying notice.",
    "channel": "sophie",
    "next": "OPEN-S10-C14-A-2-WAIT",
    "heardFacts": [
      "OPEN-S10-C14-A-1:reported"
    ]
  },
  "OPEN-S10-C14-A-1-WAIT": {
    "id": "OPEN-S10-C14-A-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-C14-A-1"
  },
  "OPEN-S10-C14-B-2": {
    "id": "OPEN-S10-C14-B-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "I can explain what I publish and what I can substantiate; I won't invent a document number to give you an answer.",
    "channel": "sophie",
    "next": "OPEN-S10-AFTER-14-1-WAIT",
    "heardFacts": [
      "OPEN-S10-C14-B-2:reported"
    ]
  },
  "OPEN-S10-C14-B-2-WAIT": {
    "id": "OPEN-S10-C14-B-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-C14-B-2"
  },
  "OPEN-S10-C14-B-1": {
    "id": "OPEN-S10-C14-B-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "I understand why you're asking.",
    "channel": "sophie",
    "next": "OPEN-S10-C14-B-2-WAIT",
    "heardFacts": [
      "OPEN-S10-C14-B-1:reported"
    ]
  },
  "OPEN-S10-C14-B-1-WAIT": {
    "id": "OPEN-S10-C14-B-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-C14-B-1"
  },
  "OPEN-S10-C14-C-2": {
    "id": "OPEN-S10-C14-C-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "If something can be made public and checked, I would rather give readers that than ask for blind trust.",
    "channel": "sophie",
    "next": "OPEN-S10-AFTER-14-1-WAIT",
    "heardFacts": [
      "OPEN-S10-C14-C-2:reported"
    ]
  },
  "OPEN-S10-C14-C-2-WAIT": {
    "id": "OPEN-S10-C14-C-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-C14-C-2"
  },
  "OPEN-S10-C14-C-1": {
    "id": "OPEN-S10-C14-C-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "That's a fair distinction.",
    "channel": "sophie",
    "next": "OPEN-S10-C14-C-2-WAIT",
    "heardFacts": [
      "OPEN-S10-C14-C-1:reported"
    ]
  },
  "OPEN-S10-C14-C-1-WAIT": {
    "id": "OPEN-S10-C14-C-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-C14-C-1"
  },
  "OPEN-S10-C14": {
    "id": "OPEN-S10-C14",
    "kind": "choice",
    "number": "S10-C14",
    "channel": "sophie",
    "choices": [
      {
        "id": "a",
        "text": "It's a public box index. It refers to another descriptor card, but doesn't show that card's text. Does that count as an original source for your article?",
        "next": "OPEN-S10-C14-A-1-WAIT"
      },
      {
        "id": "b",
        "text": "The label GB-REF-017 still doesn't match any official item number I've seen. Can you publish what that label means?",
        "next": "OPEN-S10-C14-B-1-WAIT"
      },
      {
        "id": "c",
        "text": "I'm not asking you to identify a source who didn't consent. I only want a verifiable public citation if one exists.",
        "next": "OPEN-S10-C14-C-1-WAIT"
      }
    ]
  },
  "OPEN-S10-AFTER-15-2": {
    "id": "OPEN-S10-AFTER-15-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "And don't feel like you have to give me a progress report.",
    "channel": "sophie",
    "next": "OPEN-S10-C16",
    "heardFacts": [
      "OPEN-S10-AFTER-15-2:reported"
    ]
  },
  "OPEN-S10-AFTER-15-2-WAIT": {
    "id": "OPEN-S10-AFTER-15-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-AFTER-15-2"
  },
  "OPEN-S10-AFTER-15-1": {
    "id": "OPEN-S10-AFTER-15-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Anyway... how's your evening?",
    "channel": "sophie",
    "next": "OPEN-S10-AFTER-15-2-WAIT",
    "heardFacts": [
      "OPEN-S10-AFTER-15-1:reported"
    ]
  },
  "OPEN-S10-AFTER-15-1-WAIT": {
    "id": "OPEN-S10-AFTER-15-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-AFTER-15-1"
  },
  "OPEN-S10-C15-A-2": {
    "id": "OPEN-S10-C15-A-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "I keep expecting it at the dramatic moments, not in the stationery aisle.",
    "channel": "sophie",
    "next": "OPEN-S10-AFTER-15-1-WAIT",
    "heardFacts": [
      "OPEN-S10-C15-A-2:reported"
    ]
  },
  "OPEN-S10-C15-A-2-WAIT": {
    "id": "OPEN-S10-C15-A-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-C15-A-2"
  },
  "OPEN-S10-C15-A-1": {
    "id": "OPEN-S10-C15-A-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Yeah.",
    "channel": "sophie",
    "next": "OPEN-S10-C15-A-2-WAIT",
    "heardFacts": [
      "OPEN-S10-C15-A-1:reported"
    ]
  },
  "OPEN-S10-C15-A-1-WAIT": {
    "id": "OPEN-S10-C15-A-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-C15-A-1"
  },
  "OPEN-S10-C15-A-EFFECT": {
    "id": "OPEN-S10-C15-A-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "affinity": 2
      }
    },
    "next": "OPEN-S10-C15-A-1-WAIT"
  },
  "OPEN-S10-C15-B-3": {
    "id": "OPEN-S10-C15-B-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "But some days it just is.",
    "channel": "sophie",
    "next": "OPEN-S10-AFTER-15-1-WAIT",
    "heardFacts": [
      "OPEN-S10-C15-B-3:reported"
    ]
  },
  "OPEN-S10-C15-B-3-WAIT": {
    "id": "OPEN-S10-C15-B-3-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-C15-B-3"
  },
  "OPEN-S10-C15-B-2": {
    "id": "OPEN-S10-C15-B-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "I'm trying not to make every conversation about this.",
    "channel": "sophie",
    "next": "OPEN-S10-C15-B-3-WAIT",
    "heardFacts": [
      "OPEN-S10-C15-B-2:reported"
    ]
  },
  "OPEN-S10-C15-B-2-WAIT": {
    "id": "OPEN-S10-C15-B-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-C15-B-2"
  },
  "OPEN-S10-C15-B-1": {
    "id": "OPEN-S10-C15-B-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Thanks.",
    "channel": "sophie",
    "next": "OPEN-S10-C15-B-2-WAIT",
    "heardFacts": [
      "OPEN-S10-C15-B-1:reported"
    ]
  },
  "OPEN-S10-C15-B-1-WAIT": {
    "id": "OPEN-S10-C15-B-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-C15-B-1"
  },
  "OPEN-S10-C15-B-EFFECT": {
    "id": "OPEN-S10-C15-B-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "trust": 1,
        "affinity": 1
      }
    },
    "next": "OPEN-S10-C15-B-1-WAIT"
  },
  "OPEN-S10-C15-C-2": {
    "id": "OPEN-S10-C15-C-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Tell me you had a more exciting shopping trip than I did.",
    "channel": "sophie",
    "next": "OPEN-S10-AFTER-15-1-WAIT",
    "heardFacts": [
      "OPEN-S10-C15-C-2:reported"
    ]
  },
  "OPEN-S10-C15-C-2-WAIT": {
    "id": "OPEN-S10-C15-C-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-C15-C-2"
  },
  "OPEN-S10-C15-C-1": {
    "id": "OPEN-S10-C15-C-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Actually, yeah. For a minute.",
    "channel": "sophie",
    "next": "OPEN-S10-C15-C-2-WAIT",
    "heardFacts": [
      "OPEN-S10-C15-C-1:reported"
    ]
  },
  "OPEN-S10-C15-C-1-WAIT": {
    "id": "OPEN-S10-C15-C-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-C15-C-1"
  },
  "OPEN-S10-C15-C-EFFECT": {
    "id": "OPEN-S10-C15-C-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "trust": 1,
        "affinity": 1
      }
    },
    "next": "OPEN-S10-C15-C-1-WAIT"
  },
  "OPEN-S10-C15": {
    "id": "OPEN-S10-C15",
    "kind": "choice",
    "number": "S10-C15",
    "channel": "sophie",
    "choices": [
      {
        "id": "a",
        "text": "It's not stupid. Missing someone comes up in ordinary moments.",
        "next": "OPEN-S10-C15-A-EFFECT"
      },
      {
        "id": "b",
        "text": "You don't have to apologise for mentioning him.",
        "next": "OPEN-S10-C15-B-EFFECT"
      },
      {
        "id": "c",
        "text": "We can talk about something else if you'd rather.",
        "next": "OPEN-S10-C15-C-EFFECT"
      }
    ]
  },
  "OPEN-S10-AFTER-16-2": {
    "id": "OPEN-S10-AFTER-16-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Goodnight.",
    "channel": "sophie",
    "next": "OPEN-S10-sophie-END",
    "heardFacts": [
      "OPEN-S10-AFTER-16-2:reported"
    ]
  },
  "OPEN-S10-AFTER-16-2-WAIT": {
    "id": "OPEN-S10-AFTER-16-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-AFTER-16-2"
  },
  "OPEN-S10-AFTER-16-1": {
    "id": "OPEN-S10-AFTER-16-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Okay. I'm going to make some tea.",
    "channel": "sophie",
    "next": "OPEN-S10-AFTER-16-2-WAIT",
    "heardFacts": [
      "OPEN-S10-AFTER-16-1:reported"
    ]
  },
  "OPEN-S10-AFTER-16-1-WAIT": {
    "id": "OPEN-S10-AFTER-16-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-AFTER-16-1"
  },
  "OPEN-S10-C16-A-2": {
    "id": "OPEN-S10-C16-A-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "I think I can deal with uncertainty better than false certainty.",
    "channel": "sophie",
    "next": "OPEN-S10-AFTER-16-1-WAIT",
    "heardFacts": [
      "OPEN-S10-C16-A-2:reported"
    ]
  },
  "OPEN-S10-C16-A-2-WAIT": {
    "id": "OPEN-S10-C16-A-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-C16-A-2"
  },
  "OPEN-S10-C16-A-1": {
    "id": "OPEN-S10-C16-A-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Okay. I'm glad you said what you don't know.",
    "channel": "sophie",
    "next": "OPEN-S10-C16-A-2-WAIT",
    "heardFacts": [
      "OPEN-S10-C16-A-1:reported"
    ]
  },
  "OPEN-S10-C16-A-1-WAIT": {
    "id": "OPEN-S10-C16-A-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-C16-A-1"
  },
  "OPEN-S10-C16-B-2": {
    "id": "OPEN-S10-C16-B-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Maybe I'll do the same. After I find the pen I just put down, obviously.",
    "channel": "sophie",
    "next": "OPEN-S10-AFTER-16-1-WAIT",
    "heardFacts": [
      "OPEN-S10-C16-B-2:reported"
    ]
  },
  "OPEN-S10-C16-B-2-WAIT": {
    "id": "OPEN-S10-C16-B-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-C16-B-2"
  },
  "OPEN-S10-C16-B-1": {
    "id": "OPEN-S10-C16-B-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "That sounds like a good plan.",
    "channel": "sophie",
    "next": "OPEN-S10-C16-B-2-WAIT",
    "heardFacts": [
      "OPEN-S10-C16-B-1:reported"
    ]
  },
  "OPEN-S10-C16-B-1-WAIT": {
    "id": "OPEN-S10-C16-B-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-C16-B-1"
  },
  "OPEN-S10-C16-B-EFFECT": {
    "id": "OPEN-S10-C16-B-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "affinity": 2
      }
    },
    "next": "OPEN-S10-C16-B-1-WAIT"
  },
  "OPEN-S10-C16-C-2": {
    "id": "OPEN-S10-C16-C-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "I might actually try that.",
    "channel": "sophie",
    "next": "OPEN-S10-AFTER-16-1-WAIT",
    "heardFacts": [
      "OPEN-S10-C16-C-2:reported"
    ]
  },
  "OPEN-S10-C16-C-2-WAIT": {
    "id": "OPEN-S10-C16-C-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-C16-C-2"
  },
  "OPEN-S10-C16-C-1": {
    "id": "OPEN-S10-C16-C-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Ten whole minutes? Show-off.",
    "channel": "sophie",
    "next": "OPEN-S10-C16-C-2-WAIT",
    "heardFacts": [
      "OPEN-S10-C16-C-1:reported"
    ]
  },
  "OPEN-S10-C16-C-1-WAIT": {
    "id": "OPEN-S10-C16-C-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-C16-C-1"
  },
  "OPEN-S10-C16-C-EFFECT": {
    "id": "OPEN-S10-C16-C-EFFECT",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "affinity": 1
      }
    },
    "next": "OPEN-S10-C16-C-1-WAIT"
  },
  "OPEN-S10-C16": {
    "id": "OPEN-S10-C16",
    "kind": "choice",
    "number": "S10-C16",
    "channel": "sophie",
    "choices": [
      {
        "id": "a",
        "text": "I found another public catalogue reference. Still no proof it has anything to do with Daniel.",
        "next": "OPEN-S10-C16-A-1-WAIT"
      },
      {
        "id": "b",
        "text": "A bit tired. Might put the phone away for a while.",
        "next": "OPEN-S10-C16-B-EFFECT"
      },
      {
        "id": "c",
        "text": "I ate something and forgot about the world for ten minutes. I recommend it.",
        "next": "OPEN-S10-C16-C-EFFECT"
      }
    ]
  },
  "OPEN-S10-GROUP-AFTER-17-2": {
    "id": "OPEN-S10-GROUP-AFTER-17-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "I'd really like that.",
    "channel": "group",
    "next": "OPEN-S10-C18",
    "heardFacts": [
      "OPEN-S10-GROUP-AFTER-17-2:reported"
    ]
  },
  "OPEN-S10-GROUP-AFTER-17-2-WAIT": {
    "id": "OPEN-S10-GROUP-AFTER-17-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-GROUP-AFTER-17-2"
  },
  "OPEN-S10-GROUP-AFTER-17-1": {
    "id": "OPEN-S10-GROUP-AFTER-17-1",
    "kind": "npc",
    "sender": "maya",
    "text": "Can we agree to call anything from that index a lead until an individual item can be identified?",
    "channel": "group",
    "next": "OPEN-S10-GROUP-AFTER-17-2-WAIT",
    "heardFacts": [
      "OPEN-S10-GROUP-AFTER-17-1:reported"
    ]
  },
  "OPEN-S10-GROUP-AFTER-17-1-WAIT": {
    "id": "OPEN-S10-GROUP-AFTER-17-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S10-GROUP-AFTER-17-1"
  },
  "OPEN-S10-GROUP-C17-A-3": {
    "id": "OPEN-S10-GROUP-C17-A-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "Thanks for keeping it that clear.",
    "channel": "group",
    "next": "OPEN-S10-GROUP-AFTER-17-1-WAIT",
    "heardFacts": [
      "OPEN-S10-GROUP-C17-A-3:reported"
    ]
  },
  "OPEN-S10-GROUP-C17-A-3-WAIT": {
    "id": "OPEN-S10-GROUP-C17-A-3-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-GROUP-C17-A-3"
  },
  "OPEN-S10-GROUP-C17-A-2": {
    "id": "OPEN-S10-GROUP-C17-A-2",
    "kind": "npc",
    "sender": "maya",
    "text": "It's a direction for a search, not a found document.",
    "channel": "group",
    "next": "OPEN-S10-GROUP-C17-A-3-WAIT",
    "heardFacts": [
      "OPEN-S10-GROUP-C17-A-2:reported"
    ]
  },
  "OPEN-S10-GROUP-C17-A-2-WAIT": {
    "id": "OPEN-S10-GROUP-C17-A-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S10-GROUP-C17-A-2"
  },
  "OPEN-S10-GROUP-C17-A-1": {
    "id": "OPEN-S10-GROUP-C17-A-1",
    "kind": "npc",
    "sender": "maya",
    "text": "That's a useful difference.",
    "channel": "group",
    "next": "OPEN-S10-GROUP-C17-A-2-WAIT",
    "heardFacts": [
      "OPEN-S10-GROUP-C17-A-1:reported"
    ]
  },
  "OPEN-S10-GROUP-C17-A-1-WAIT": {
    "id": "OPEN-S10-GROUP-C17-A-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S10-GROUP-C17-A-1"
  },
  "OPEN-S10-GROUP-C17-B-2": {
    "id": "OPEN-S10-GROUP-C17-B-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Understood.",
    "channel": "group",
    "next": "OPEN-S10-GROUP-AFTER-17-1-WAIT",
    "heardFacts": [
      "OPEN-S10-GROUP-C17-B-2:reported"
    ]
  },
  "OPEN-S10-GROUP-C17-B-2-WAIT": {
    "id": "OPEN-S10-GROUP-C17-B-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-GROUP-C17-B-2"
  },
  "OPEN-S10-GROUP-C17-B-1": {
    "id": "OPEN-S10-GROUP-C17-B-1",
    "kind": "npc",
    "sender": "maya",
    "text": "Right. Please don't circulate the box number without the limitation beside it.",
    "channel": "group",
    "next": "OPEN-S10-GROUP-C17-B-2-WAIT",
    "heardFacts": [
      "OPEN-S10-GROUP-C17-B-1:reported"
    ]
  },
  "OPEN-S10-GROUP-C17-B-1-WAIT": {
    "id": "OPEN-S10-GROUP-C17-B-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S10-GROUP-C17-B-1"
  },
  "OPEN-S10-GROUP-C17-C-2": {
    "id": "OPEN-S10-GROUP-C17-C-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Yeah. I appreciate that.",
    "channel": "group",
    "next": "OPEN-S10-GROUP-AFTER-17-1-WAIT",
    "heardFacts": [
      "OPEN-S10-GROUP-C17-C-2:reported"
    ]
  },
  "OPEN-S10-GROUP-C17-C-2-WAIT": {
    "id": "OPEN-S10-GROUP-C17-C-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-GROUP-C17-C-2"
  },
  "OPEN-S10-GROUP-C17-C-1": {
    "id": "OPEN-S10-GROUP-C17-C-1",
    "kind": "npc",
    "sender": "maya",
    "text": "Thank you. A guess travels fast.",
    "channel": "group",
    "next": "OPEN-S10-GROUP-C17-C-2-WAIT",
    "heardFacts": [
      "OPEN-S10-GROUP-C17-C-1:reported"
    ]
  },
  "OPEN-S10-GROUP-C17-C-1-WAIT": {
    "id": "OPEN-S10-GROUP-C17-C-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S10-GROUP-C17-C-1"
  },
  "OPEN-S10-C17": {
    "id": "OPEN-S10-C17",
    "kind": "choice",
    "number": "S10-C17",
    "channel": "group",
    "choices": [
      {
        "id": "a",
        "text": "The public catalogue lists boxes and refers to a description card, but I can't see the card text or connect it to the Bulletin reference.",
        "next": "OPEN-S10-GROUP-C17-A-1-WAIT"
      },
      {
        "id": "b",
        "text": "There's a box description referencing a separate card. Nothing says it's Daniel's file, or even the notice we need.",
        "next": "OPEN-S10-GROUP-C17-B-1-WAIT"
      },
      {
        "id": "c",
        "text": "I'm checking the public sources before sharing a conclusion. I'd rather not put a guess into this chat.",
        "next": "OPEN-S10-GROUP-C17-C-1-WAIT"
      }
    ]
  },
  "OPEN-S10-GROUP-C18-A-2": {
    "id": "OPEN-S10-GROUP-C18-A-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Thanks.",
    "channel": "group",
    "next": "OPEN-S10-group-END",
    "heardFacts": [
      "OPEN-S10-GROUP-C18-A-2:reported"
    ]
  },
  "OPEN-S10-GROUP-C18-A-2-WAIT": {
    "id": "OPEN-S10-GROUP-C18-A-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-GROUP-C18-A-2"
  },
  "OPEN-S10-GROUP-C18-A-1": {
    "id": "OPEN-S10-GROUP-C18-A-1",
    "kind": "npc",
    "sender": "maya",
    "text": "Good. That's how I'll describe it too.",
    "channel": "group",
    "next": "OPEN-S10-GROUP-C18-A-2-WAIT",
    "heardFacts": [
      "OPEN-S10-GROUP-C18-A-1:reported"
    ]
  },
  "OPEN-S10-GROUP-C18-A-1-WAIT": {
    "id": "OPEN-S10-GROUP-C18-A-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S10-GROUP-C18-A-1"
  },
  "OPEN-S10-GROUP-C18-B-2": {
    "id": "OPEN-S10-GROUP-C18-B-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "That sounds safer.",
    "channel": "group",
    "next": "OPEN-S10-group-END",
    "heardFacts": [
      "OPEN-S10-GROUP-C18-B-2:reported"
    ]
  },
  "OPEN-S10-GROUP-C18-B-2-WAIT": {
    "id": "OPEN-S10-GROUP-C18-B-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-GROUP-C18-B-2"
  },
  "OPEN-S10-GROUP-C18-B-1": {
    "id": "OPEN-S10-GROUP-C18-B-1",
    "kind": "npc",
    "sender": "maya",
    "text": "Yes. Keep the request narrow and public.",
    "channel": "group",
    "next": "OPEN-S10-GROUP-C18-B-2-WAIT",
    "heardFacts": [
      "OPEN-S10-GROUP-C18-B-1:reported"
    ]
  },
  "OPEN-S10-GROUP-C18-B-1-WAIT": {
    "id": "OPEN-S10-GROUP-C18-B-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S10-GROUP-C18-B-1"
  },
  "OPEN-S10-GROUP-C18-C-2": {
    "id": "OPEN-S10-GROUP-C18-C-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Appreciate it.",
    "channel": "group",
    "next": "OPEN-S10-group-END",
    "heardFacts": [
      "OPEN-S10-GROUP-C18-C-2:reported"
    ]
  },
  "OPEN-S10-GROUP-C18-C-2-WAIT": {
    "id": "OPEN-S10-GROUP-C18-C-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-GROUP-C18-C-2"
  },
  "OPEN-S10-GROUP-C18-C-1": {
    "id": "OPEN-S10-GROUP-C18-C-1",
    "kind": "npc",
    "sender": "maya",
    "text": "Fair enough.",
    "channel": "group",
    "next": "OPEN-S10-GROUP-C18-C-2-WAIT",
    "heardFacts": [
      "OPEN-S10-GROUP-C18-C-1:reported"
    ]
  },
  "OPEN-S10-GROUP-C18-C-1-WAIT": {
    "id": "OPEN-S10-GROUP-C18-C-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "maya",
    "next": "OPEN-S10-GROUP-C18-C-1"
  },
  "OPEN-S10-C18": {
    "id": "OPEN-S10-C18",
    "kind": "choice",
    "number": "S10-C18",
    "channel": "group",
    "choices": [
      {
        "id": "a",
        "text": "Agreed. The box code stays a catalogue lead, not evidence of what happened to Daniel.",
        "next": "OPEN-S10-GROUP-C18-A-1-WAIT"
      },
      {
        "id": "b",
        "text": "We can ask about the descriptor card without sharing any private messages or naming a culprit.",
        "next": "OPEN-S10-GROUP-C18-B-1-WAIT"
      },
      {
        "id": "c",
        "text": "I'm not sending any further details here until we know what the document actually is.",
        "next": "OPEN-S10-GROUP-C18-C-1-WAIT"
      }
    ]
  },
  "OPEN-S10-CATALOGUE-REPLY-A-7": {
    "id": "OPEN-S10-CATALOGUE-REPLY-A-7",
    "kind": "npc",
    "sender": "sophie",
    "text": "Naming the right record is usually the hardest part of asking.",
    "channel": "sophie",
    "next": "OPEN-S10-C13",
    "heardFacts": [
      "OPEN-S10-CATALOGUE-REPLY-A-7:reported"
    ]
  },
  "OPEN-S10-CATALOGUE-REPLY-A-7-WAIT": {
    "id": "OPEN-S10-CATALOGUE-REPLY-A-7-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-A-7"
  },
  "OPEN-S10-CATALOGUE-REPLY-A-6": {
    "id": "OPEN-S10-CATALOGUE-REPLY-A-6",
    "kind": "npc",
    "sender": "sophie",
    "text": "Sorry this is a narrow answer.",
    "channel": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-A-7-WAIT",
    "heardFacts": [
      "OPEN-S10-CATALOGUE-REPLY-A-6:reported"
    ]
  },
  "OPEN-S10-CATALOGUE-REPLY-A-6-WAIT": {
    "id": "OPEN-S10-CATALOGUE-REPLY-A-6-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-A-6"
  },
  "OPEN-S10-CATALOGUE-REPLY-A-5": {
    "id": "OPEN-S10-CATALOGUE-REPLY-A-5",
    "kind": "npc",
    "sender": "sophie",
    "text": "The extract doesn't reproduce that text. A request for the catalogue description can be reviewed, but this reply does not confirm its content or availability.",
    "channel": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-A-6-WAIT",
    "heardFacts": [
      "OPEN-S10-CATALOGUE-REPLY-A-5:reported"
    ]
  },
  "OPEN-S10-CATALOGUE-REPLY-A-5-WAIT": {
    "id": "OPEN-S10-CATALOGUE-REPLY-A-5-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-A-5"
  },
  "OPEN-S10-CATALOGUE-REPLY-A-4": {
    "id": "OPEN-S10-CATALOGUE-REPLY-A-4",
    "kind": "npc",
    "sender": "sophie",
    "text": "GH-DSC-03-A is a description reference printed in the public extract you quoted.",
    "channel": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-A-5-WAIT",
    "heardFacts": [
      "OPEN-S10-CATALOGUE-REPLY-A-4:reported"
    ]
  },
  "OPEN-S10-CATALOGUE-REPLY-A-4-WAIT": {
    "id": "OPEN-S10-CATALOGUE-REPLY-A-4-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-A-4"
  },
  "OPEN-S10-CATALOGUE-REPLY-A-3": {
    "id": "OPEN-S10-CATALOGUE-REPLY-A-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "I don't want to imply we've located an individual record.",
    "channel": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-A-4-WAIT",
    "heardFacts": [
      "OPEN-S10-CATALOGUE-REPLY-A-3:reported"
    ]
  },
  "OPEN-S10-CATALOGUE-REPLY-A-3-WAIT": {
    "id": "OPEN-S10-CATALOGUE-REPLY-A-3-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-A-3"
  },
  "OPEN-S10-CATALOGUE-REPLY-A-2": {
    "id": "OPEN-S10-CATALOGUE-REPLY-A-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "I can answer the catalogue part of your question.",
    "channel": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-A-3-WAIT",
    "heardFacts": [
      "OPEN-S10-CATALOGUE-REPLY-A-2:reported"
    ]
  },
  "OPEN-S10-CATALOGUE-REPLY-A-2-WAIT": {
    "id": "OPEN-S10-CATALOGUE-REPLY-A-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-A-2"
  },
  "OPEN-S10-CATALOGUE-REPLY-A-1": {
    "id": "OPEN-S10-CATALOGUE-REPLY-A-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Hello. Public Catalogue Enquiries here.",
    "channel": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-A-2-WAIT",
    "heardFacts": [
      "OPEN-S10-CATALOGUE-REPLY-A-1:reported"
    ]
  },
  "OPEN-S10-CATALOGUE-REPLY-A-1-WAIT": {
    "id": "OPEN-S10-CATALOGUE-REPLY-A-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-A-1"
  },
  "OPEN-S10-CATALOGUE-REPLY-B-7": {
    "id": "OPEN-S10-CATALOGUE-REPLY-B-7",
    "kind": "npc",
    "sender": "sophie",
    "text": "Naming the right record is usually the hardest part of asking.",
    "channel": "sophie",
    "next": "OPEN-S10-C13",
    "heardFacts": [
      "OPEN-S10-CATALOGUE-REPLY-B-7:reported"
    ]
  },
  "OPEN-S10-CATALOGUE-REPLY-B-7-WAIT": {
    "id": "OPEN-S10-CATALOGUE-REPLY-B-7-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-B-7"
  },
  "OPEN-S10-CATALOGUE-REPLY-B-6": {
    "id": "OPEN-S10-CATALOGUE-REPLY-B-6",
    "kind": "npc",
    "sender": "sophie",
    "text": "Sorry this is a narrow answer.",
    "channel": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-B-7-WAIT",
    "heardFacts": [
      "OPEN-S10-CATALOGUE-REPLY-B-6:reported"
    ]
  },
  "OPEN-S10-CATALOGUE-REPLY-B-6-WAIT": {
    "id": "OPEN-S10-CATALOGUE-REPLY-B-6-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-B-6"
  },
  "OPEN-S10-CATALOGUE-REPLY-B-5": {
    "id": "OPEN-S10-CATALOGUE-REPLY-B-5",
    "kind": "npc",
    "sender": "sophie",
    "text": "We can't tell whether those refer to the same original notice from the identifiers in your message.",
    "channel": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-B-6-WAIT",
    "heardFacts": [
      "OPEN-S10-CATALOGUE-REPLY-B-5:reported"
    ]
  },
  "OPEN-S10-CATALOGUE-REPLY-B-5-WAIT": {
    "id": "OPEN-S10-CATALOGUE-REPLY-B-5-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-B-5"
  },
  "OPEN-S10-CATALOGUE-REPLY-B-4": {
    "id": "OPEN-S10-CATALOGUE-REPLY-B-4",
    "kind": "npc",
    "sender": "sophie",
    "text": "The publisher's label is separate from our catalogue reference.",
    "channel": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-B-5-WAIT",
    "heardFacts": [
      "OPEN-S10-CATALOGUE-REPLY-B-4:reported"
    ]
  },
  "OPEN-S10-CATALOGUE-REPLY-B-4-WAIT": {
    "id": "OPEN-S10-CATALOGUE-REPLY-B-4-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-B-4"
  },
  "OPEN-S10-CATALOGUE-REPLY-B-3": {
    "id": "OPEN-S10-CATALOGUE-REPLY-B-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "I don't want to imply we've located an individual record.",
    "channel": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-B-4-WAIT",
    "heardFacts": [
      "OPEN-S10-CATALOGUE-REPLY-B-3:reported"
    ]
  },
  "OPEN-S10-CATALOGUE-REPLY-B-3-WAIT": {
    "id": "OPEN-S10-CATALOGUE-REPLY-B-3-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-B-3"
  },
  "OPEN-S10-CATALOGUE-REPLY-B-2": {
    "id": "OPEN-S10-CATALOGUE-REPLY-B-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "I can answer the catalogue part of your question.",
    "channel": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-B-3-WAIT",
    "heardFacts": [
      "OPEN-S10-CATALOGUE-REPLY-B-2:reported"
    ]
  },
  "OPEN-S10-CATALOGUE-REPLY-B-2-WAIT": {
    "id": "OPEN-S10-CATALOGUE-REPLY-B-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-B-2"
  },
  "OPEN-S10-CATALOGUE-REPLY-B-1": {
    "id": "OPEN-S10-CATALOGUE-REPLY-B-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Hello. Public Catalogue Enquiries here.",
    "channel": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-B-2-WAIT",
    "heardFacts": [
      "OPEN-S10-CATALOGUE-REPLY-B-1:reported"
    ]
  },
  "OPEN-S10-CATALOGUE-REPLY-B-1-WAIT": {
    "id": "OPEN-S10-CATALOGUE-REPLY-B-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-B-1"
  },
  "OPEN-S10-CATALOGUE-REPLY-C-7": {
    "id": "OPEN-S10-CATALOGUE-REPLY-C-7",
    "kind": "npc",
    "sender": "sophie",
    "text": "Naming the right record is usually the hardest part of asking.",
    "channel": "sophie",
    "next": "OPEN-S10-C13",
    "heardFacts": [
      "OPEN-S10-CATALOGUE-REPLY-C-7:reported"
    ]
  },
  "OPEN-S10-CATALOGUE-REPLY-C-7-WAIT": {
    "id": "OPEN-S10-CATALOGUE-REPLY-C-7-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-C-7"
  },
  "OPEN-S10-CATALOGUE-REPLY-C-6": {
    "id": "OPEN-S10-CATALOGUE-REPLY-C-6",
    "kind": "npc",
    "sender": "sophie",
    "text": "Sorry this is a narrow answer.",
    "channel": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-C-7-WAIT",
    "heardFacts": [
      "OPEN-S10-CATALOGUE-REPLY-C-6:reported"
    ]
  },
  "OPEN-S10-CATALOGUE-REPLY-C-6-WAIT": {
    "id": "OPEN-S10-CATALOGUE-REPLY-C-6-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-C-6"
  },
  "OPEN-S10-CATALOGUE-REPLY-C-5": {
    "id": "OPEN-S10-CATALOGUE-REPLY-C-5",
    "kind": "npc",
    "sender": "sophie",
    "text": "The answer would depend on the actual holding and access conditions. This message isn't a confirmation of an item.",
    "channel": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-C-6-WAIT",
    "heardFacts": [
      "OPEN-S10-CATALOGUE-REPLY-C-5:reported"
    ]
  },
  "OPEN-S10-CATALOGUE-REPLY-C-5-WAIT": {
    "id": "OPEN-S10-CATALOGUE-REPLY-C-5-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-C-5"
  },
  "OPEN-S10-CATALOGUE-REPLY-C-4": {
    "id": "OPEN-S10-CATALOGUE-REPLY-C-4",
    "kind": "npc",
    "sender": "sophie",
    "text": "Public catalogue enquiries can ask whether an additional description is available for inspection.",
    "channel": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-C-5-WAIT",
    "heardFacts": [
      "OPEN-S10-CATALOGUE-REPLY-C-4:reported"
    ]
  },
  "OPEN-S10-CATALOGUE-REPLY-C-4-WAIT": {
    "id": "OPEN-S10-CATALOGUE-REPLY-C-4-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-C-4"
  },
  "OPEN-S10-CATALOGUE-REPLY-C-3": {
    "id": "OPEN-S10-CATALOGUE-REPLY-C-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "I don't want to imply we've located an individual record.",
    "channel": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-C-4-WAIT",
    "heardFacts": [
      "OPEN-S10-CATALOGUE-REPLY-C-3:reported"
    ]
  },
  "OPEN-S10-CATALOGUE-REPLY-C-3-WAIT": {
    "id": "OPEN-S10-CATALOGUE-REPLY-C-3-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-C-3"
  },
  "OPEN-S10-CATALOGUE-REPLY-C-2": {
    "id": "OPEN-S10-CATALOGUE-REPLY-C-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "I can answer the catalogue part of your question.",
    "channel": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-C-3-WAIT",
    "heardFacts": [
      "OPEN-S10-CATALOGUE-REPLY-C-2:reported"
    ]
  },
  "OPEN-S10-CATALOGUE-REPLY-C-2-WAIT": {
    "id": "OPEN-S10-CATALOGUE-REPLY-C-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-C-2"
  },
  "OPEN-S10-CATALOGUE-REPLY-C-1": {
    "id": "OPEN-S10-CATALOGUE-REPLY-C-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Hello. Public Catalogue Enquiries here.",
    "channel": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-C-2-WAIT",
    "heardFacts": [
      "OPEN-S10-CATALOGUE-REPLY-C-1:reported"
    ]
  },
  "OPEN-S10-CATALOGUE-REPLY-C-1-WAIT": {
    "id": "OPEN-S10-CATALOGUE-REPLY-C-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-CATALOGUE-REPLY-C-1"
  },
  "OPEN-S10-PRO-OPEN-3": {
    "id": "OPEN-S10-PRO-OPEN-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "Just tell me what kind of sheet. I don't need the whole file.",
    "channel": "sophie",
    "next": "OPEN-S10-C14",
    "heardFacts": [
      "OPEN-S10-PRO-OPEN-3:reported"
    ]
  },
  "OPEN-S10-PRO-OPEN-3-WAIT": {
    "id": "OPEN-S10-PRO-OPEN-3-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-PRO-OPEN-3"
  },
  "OPEN-S10-PRO-OPEN-2": {
    "id": "OPEN-S10-PRO-OPEN-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "You mentioned an inventory sheet?",
    "channel": "sophie",
    "next": "OPEN-S10-PRO-OPEN-3-WAIT",
    "heardFacts": [
      "OPEN-S10-PRO-OPEN-2:reported"
    ]
  },
  "OPEN-S10-PRO-OPEN-2-WAIT": {
    "id": "OPEN-S10-PRO-OPEN-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-PRO-OPEN-2"
  },
  "OPEN-S10-PRO-OPEN-1": {
    "id": "OPEN-S10-PRO-OPEN-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Hi again.",
    "channel": "sophie",
    "next": "OPEN-S10-PRO-OPEN-2-WAIT",
    "heardFacts": [
      "OPEN-S10-PRO-OPEN-1:reported"
    ]
  },
  "OPEN-S10-PRO-OPEN-1-WAIT": {
    "id": "OPEN-S10-PRO-OPEN-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-PRO-OPEN-1"
  },
  "OPEN-S10-SOPHIE-OPEN-8": {
    "id": "OPEN-S10-SOPHIE-OPEN-8",
    "kind": "npc",
    "sender": "sophie",
    "text": "Sorry. That got weird fast.",
    "channel": "sophie",
    "next": "OPEN-S10-C15",
    "heardFacts": [
      "OPEN-S10-SOPHIE-OPEN-8:reported"
    ]
  },
  "OPEN-S10-SOPHIE-OPEN-8-WAIT": {
    "id": "OPEN-S10-SOPHIE-OPEN-8-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-SOPHIE-OPEN-8"
  },
  "OPEN-S10-SOPHIE-OPEN-7": {
    "id": "OPEN-S10-SOPHIE-OPEN-7",
    "kind": "npc",
    "sender": "sophie",
    "text": "...",
    "channel": "sophie",
    "next": "OPEN-S10-SOPHIE-OPEN-8-WAIT",
    "heardFacts": [
      "OPEN-S10-SOPHIE-OPEN-7:reported"
    ]
  },
  "OPEN-S10-SOPHIE-OPEN-7-WAIT": {
    "id": "OPEN-S10-SOPHIE-OPEN-7-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-SOPHIE-OPEN-7"
  },
  "OPEN-S10-SOPHIE-OPEN-6": {
    "id": "OPEN-S10-SOPHIE-OPEN-6",
    "kind": "npc",
    "sender": "sophie",
    "text": "I nearly texted him a picture.",
    "channel": "sophie",
    "next": "OPEN-S10-SOPHIE-OPEN-7-WAIT",
    "heardFacts": [
      "OPEN-S10-SOPHIE-OPEN-6:reported"
    ]
  },
  "OPEN-S10-SOPHIE-OPEN-6-WAIT": {
    "id": "OPEN-S10-SOPHIE-OPEN-6-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-SOPHIE-OPEN-6"
  },
  "OPEN-S10-SOPHIE-OPEN-5": {
    "id": "OPEN-S10-SOPHIE-OPEN-5",
    "kind": "npc",
    "sender": "sophie",
    "text": "Daniel would have made some horrible joke about it.",
    "channel": "sophie",
    "next": "OPEN-S10-SOPHIE-OPEN-6-WAIT",
    "heardFacts": [
      "OPEN-S10-SOPHIE-OPEN-5:reported"
    ]
  },
  "OPEN-S10-SOPHIE-OPEN-5-WAIT": {
    "id": "OPEN-S10-SOPHIE-OPEN-5-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-SOPHIE-OPEN-5"
  },
  "OPEN-S10-SOPHIE-OPEN-4": {
    "id": "OPEN-S10-SOPHIE-OPEN-4",
    "kind": "npc",
    "sender": "sophie",
    "text": "Six of them. Like an entire adult who knows how to plan ahead.",
    "channel": "sophie",
    "next": "OPEN-S10-SOPHIE-OPEN-5-WAIT",
    "heardFacts": [
      "OPEN-S10-SOPHIE-OPEN-4:reported"
    ]
  },
  "OPEN-S10-SOPHIE-OPEN-4-WAIT": {
    "id": "OPEN-S10-SOPHIE-OPEN-4-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-SOPHIE-OPEN-4"
  },
  "OPEN-S10-SOPHIE-OPEN-3": {
    "id": "OPEN-S10-SOPHIE-OPEN-3",
    "kind": "npc",
    "sender": "sophie",
    "text": "I bought a pack of pens today.",
    "channel": "sophie",
    "next": "OPEN-S10-SOPHIE-OPEN-4-WAIT",
    "heardFacts": [
      "OPEN-S10-SOPHIE-OPEN-3:reported"
    ]
  },
  "OPEN-S10-SOPHIE-OPEN-3-WAIT": {
    "id": "OPEN-S10-SOPHIE-OPEN-3-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-SOPHIE-OPEN-3"
  },
  "OPEN-S10-SOPHIE-OPEN-2": {
    "id": "OPEN-S10-SOPHIE-OPEN-2",
    "kind": "npc",
    "sender": "sophie",
    "text": "Can I tell you something stupid?",
    "channel": "sophie",
    "next": "OPEN-S10-SOPHIE-OPEN-3-WAIT",
    "heardFacts": [
      "OPEN-S10-SOPHIE-OPEN-2:reported"
    ]
  },
  "OPEN-S10-SOPHIE-OPEN-2-WAIT": {
    "id": "OPEN-S10-SOPHIE-OPEN-2-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-SOPHIE-OPEN-2"
  },
  "OPEN-S10-SOPHIE-OPEN-1": {
    "id": "OPEN-S10-SOPHIE-OPEN-1",
    "kind": "npc",
    "sender": "sophie",
    "text": "Hey.",
    "channel": "sophie",
    "next": "OPEN-S10-SOPHIE-OPEN-2-WAIT",
    "heardFacts": [
      "OPEN-S10-SOPHIE-OPEN-1:reported"
    ]
  },
  "OPEN-S10-SOPHIE-OPEN-1-WAIT": {
    "id": "OPEN-S10-SOPHIE-OPEN-1-WAIT",
    "kind": "wait",
    "duration": 1200,
    "typing": true,
    "actor": "sophie",
    "next": "OPEN-S10-SOPHIE-OPEN-1"
  }
}
export const scene10Investigation = {
  "authoringId": "chapter_01_scene_10_the_inventory_sheet",
  "planningId": "ch01_sc10_a_life_in_fragments",
  "sourceSha256": "b680e5aed86533d277bf936548409bcf2399843575b85384f9fa55f9e3cd9367",
  "choices": {
    "S10-C01": {
      "heading": "OPTIONAL RECAP PRIORITY (LOCAL, REPLAYABLE; NO SEND)",
      "mode": "local",
      "options": [
        {
          "id": "a",
          "text": "Start with what this new page actually describes.",
          "feedback": "Good. A title and source type come before a conclusion."
        },
        {
          "id": "b",
          "text": "Keep the publisher's reference separate while I search.",
          "feedback": "Your comparison will show the reference as unlinked."
        },
        {
          "id": "c",
          "text": "Check whether I'm looking at an inventory or original record.",
          "feedback": "The source header and coverage note will tell you."
        }
      ]
    },
    "S10-C02": {
      "heading": "SOURCE CLASS (LOCAL, NO SEND)",
      "mode": "local",
      "options": [
        {
          "id": "a",
          "text": "This replaces the original public notice.",
          "feedback": "It describes boxes. No original notice text appears."
        },
        {
          "id": "b",
          "text": "This is a separate partial box-level index associated with the same public inventory summary.",
          "feedback": "Supported. Association between catalogue pages is listed; membership of the publisher's notice is not."
        },
        {
          "id": "c",
          "text": "This is the Greyhaven Bulletin's older saved article.",
          "feedback": "The civic catalogue is not the publisher's website history or the Archive's metadata-only article index."
        }
      ]
    },
    "S10-C03": {
      "heading": "COVERAGE OF FOUR ROWS (LOCAL, NO SEND)",
      "mode": "local",
      "options": [
        {
          "id": "a",
          "text": "Every item in this series is named in the four rows.",
          "feedback": "The extract expressly lists boxes, not all item names."
        },
        {
          "id": "b",
          "text": "The four rows prove no fifth box or other page ever existed.",
          "feedback": "Selected extract is not an exhaustive holdings audit."
        },
        {
          "id": "c",
          "text": "Four box-level descriptions are visible; completeness and actual items remain unknown.",
          "feedback": "Supported. The boundaries are part of the finding."
        }
      ]
    },
    "S10-C04": {
      "heading": "READ THE LEVEL (LOCAL, NO SEND)",
      "mode": "local",
      "options": [
        {
          "id": "a",
          "text": "GH-PN-BOX-03 identifies a box-level catalogue heading, not a single original notice.",
          "feedback": "Supported. Keep the description level visible."
        },
        {
          "id": "b",
          "text": "GH-PN-BOX-03 is the formal municipal equivalent of GB-REF-017.",
          "feedback": "No cross-reference equates those labels."
        },
        {
          "id": "c",
          "text": "Four boxes mean the original missing document was copied four times.",
          "feedback": "A box count says nothing about copies of one record."
        }
      ]
    },
    "S10-C05": {
      "heading": "THE DESCRIPTOR REFERENCE (LOCAL, NO SEND)",
      "mode": "local",
      "options": [
        {
          "id": "a",
          "text": "GH-DSC-03-A is an identified original notice from 2019.",
          "feedback": "It is a descriptor reference, not an original notice."
        },
        {
          "id": "b",
          "text": "No displayed text proves the card was destroyed.",
          "feedback": "Correct concern, but that alone doesn't classify the reference. Identify what the code actually points toward."
        },
        {
          "id": "c",
          "text": "GH-DSC-03-A is a catalogue-description reference; its content and availability outside this extract are not verified.",
          "feedback": "Supported. The label is observable; the descriptor's contents remain unexamined."
        }
      ]
    },
    "S10-C06": {
      "heading": "WHAT DOES THE DATE PROVE? (LOCAL, NO SEND)",
      "mode": "local",
      "options": [
        {
          "id": "a",
          "text": "The article was edited in 2019 because the box span includes it.",
          "feedback": "This catalogue gives no article revision history."
        },
        {
          "id": "b",
          "text": "The span is a broad filing range; no individual item date or matching event is established.",
          "feedback": "Supported. Do not convert overlapping years into a case-specific chain of custody."
        },
        {
          "id": "c",
          "text": "GH-PN-BOX-03 must contain June Ellis's evacuation record.",
          "feedback": "No title, issuing body or original was matched."
        }
      ]
    },
    "S10-C07": {
      "heading": "WHAT LINK IS REAL? (LOCAL, NO SEND)",
      "mode": "local",
      "options": [
        {
          "id": "a",
          "text": "The transfer entry, finding-aid summary and new extract publicly cite the same SERIES and associated summary reference; no item match with the publisher reference is shown.",
          "feedback": "Supported. The catalogue-to-catalogue link is visible; a catalogue-to-notice link is not."
        },
        {
          "id": "b",
          "text": "The publisher reference is proved official because the three civic pages describe public notices.",
          "feedback": "A subject category cannot authenticate a separate publisher's string."
        },
        {
          "id": "c",
          "text": "Nora's byline authenticates the descriptor card.",
          "feedback": "An author's byline is not a civic catalogue signature."
        }
      ]
    },
    "S10-C08": {
      "heading": "WHAT DOES “NOT INCLUDED” MEAN? (LOCAL, NO SEND)",
      "mode": "local",
      "options": [
        {
          "id": "a",
          "text": "The Records Centre has deleted the descriptor card.",
          "feedback": "There is no deletion or destruction certification."
        },
        {
          "id": "b",
          "text": "The card is definitely in a locked private file.",
          "feedback": "The public note doesn't assert where the card is."
        },
        {
          "id": "c",
          "text": "The text is absent from this extract; its existence, accessibility and subject require an attributable follow-up.",
          "feedback": "Supported. ‘Not included here’ is not ‘proved lost’."
        }
      ]
    },
    "S10-C09": {
      "heading": "INTERPRET THE NON-HIT (LOCAL, NO SEND)",
      "mode": "local",
      "options": [
        {
          "id": "a",
          "text": "The absence of a web snippet proves the descriptor never existed.",
          "feedback": "This view is scoped and cannot certify nonexistence."
        },
        {
          "id": "b",
          "text": "The demo only shows this selected public extract; a non-hit cannot answer what the descriptor contains or whether it survives.",
          "feedback": "Supported. Scope comes before speculation."
        },
        {
          "id": "c",
          "text": "Someone removed it because it was about Daniel.",
          "feedback": "No person, cause or connection is established."
        }
      ]
    },
    "S10-C10": {
      "heading": "REQUEST SCOPE (LOCAL, NO SEND)",
      "mode": "local",
      "options": [
        {
          "id": "a",
          "text": "Ask whether the public description GH-DSC-03-A can be located or whether an access procedure exists, quoting the public series and box identifiers.",
          "feedback": "Supported. This is a catalogue-description request, not a claim about a missing notice."
        },
        {
          "id": "b",
          "text": "Demand confirmation that the descriptor proves GB-REF-017.",
          "feedback": "The public extract supplies no link to certify."
        },
        {
          "id": "c",
          "text": "Ask the journalist to release Daniel's private phone archive.",
          "feedback": "The byline conveys no authorization for private files."
        }
      ]
    },
    "S10-C11": {
      "heading": "OPTIONAL PRIVATE PRIORITY (LOCAL NO SEND; ALL VALID)",
      "mode": "local",
      "options": [
        {
          "id": "a",
          "text": "Find out what the descriptor card describes first.",
          "feedback": "Private priority: descriptor-first. No message sent."
        },
        {
          "id": "b",
          "text": "Check access rules before making assumptions.",
          "feedback": "Private priority: access-first. No message sent."
        },
        {
          "id": "c",
          "text": "Keep the publisher label out of the first question.",
          "feedback": "Private priority: scope-first. No message sent."
        }
      ]
    },
    "S10-C12": {
      "heading": "OPTIONAL CIVIC ENQUIRY (SELECT -> DRAFT -> REVIEW -> SEND)",
      "mode": "form",
      "options": [
        {
          "id": "a",
          "text": "Your public box index GH-INV-2022-063-EX1 references descriptor GH-DSC-03-A for GH-PN-BOX-03 in series GH-PN-GEN-2017-2021. Is there a public way to locate that descriptor or its access information? I am not asking you to identify an individual notice.",
          "feedback": ""
        },
        {
          "id": "b",
          "text": "I found descriptor reference GH-DSC-03-A in the public box index. I also have a separate publisher label, GB-REF-017, but cannot link it to any official item. Could you tell me how public catalogue descriptions are checked without assuming a match?",
          "feedback": ""
        },
        {
          "id": "c",
          "text": "Is there a public procedure for requesting supplementary box descriptions when the selected online extract does not show the description text? I have no item-level document to provide.",
          "feedback": ""
        }
      ]
    },
    "S10-C13": {
      "heading": "OPTIONAL INBOX FOLLOW-UP; REQUIRES ACTUALLY READ REPLY;",
      "mode": "civic",
      "options": [
        {
          "id": "a",
          "text": "So the public reference is not the same thing as a verified catalogue description?",
          "feedback": "",
          "next": "OPEN-S10-C13-A-1-WAIT"
        },
        {
          "id": "b",
          "text": "Could the missing public text prove a notice was removed or concealed?",
          "feedback": "",
          "next": "OPEN-S10-C13-B-1-WAIT"
        },
        {
          "id": "c",
          "text": "Thanks. I'll keep the box reference separate from the publisher label.",
          "feedback": "",
          "next": "OPEN-S10-C13-C-1-WAIT"
        }
      ]
    },
    "S10-C14": {
      "heading": "OPTIONAL PROFESSIONAL REPLY; SELECT -> DRAFT -> REAL SEND",
      "mode": "professional",
      "options": [
        {
          "id": "a",
          "text": "It's a public box index. It refers to another descriptor card, but doesn't show that card's text. Does that count as an original source for your article?",
          "feedback": "",
          "next": "OPEN-S10-C14-A-1-WAIT"
        },
        {
          "id": "b",
          "text": "The label GB-REF-017 still doesn't match any official item number I've seen. Can you publish what that label means?",
          "feedback": "",
          "next": "OPEN-S10-C14-B-1-WAIT"
        },
        {
          "id": "c",
          "text": "I'm not asking you to identify a source who didn't consent. I only want a verifiable public citation if one exists.",
          "feedback": "",
          "next": "OPEN-S10-C14-C-1-WAIT"
        }
      ]
    },
    "S10-C15": {
      "heading": "OPTIONAL PERSONAL RESPONSE; SELECT -> DRAFT -> REAL SEND",
      "mode": "sophie",
      "options": [
        {
          "id": "a",
          "text": "It's not stupid. Missing someone comes up in ordinary moments.",
          "feedback": "",
          "next": "OPEN-S10-C15-A-EFFECT"
        },
        {
          "id": "b",
          "text": "You don't have to apologise for mentioning him.",
          "feedback": "",
          "next": "OPEN-S10-C15-B-EFFECT"
        },
        {
          "id": "c",
          "text": "We can talk about something else if you'd rather.",
          "feedback": "",
          "next": "OPEN-S10-C15-C-EFFECT"
        }
      ]
    },
    "S10-C16": {
      "heading": "OPTIONAL FOLLOW-UP; SELECT -> DRAFT -> REAL SEND",
      "mode": "sophie",
      "options": [
        {
          "id": "a",
          "text": "I found another public catalogue reference. Still no proof it has anything to do with Daniel.",
          "feedback": "",
          "next": "OPEN-S10-C16-A-1-WAIT"
        },
        {
          "id": "b",
          "text": "A bit tired. Might put the phone away for a while.",
          "feedback": "",
          "next": "OPEN-S10-C16-B-EFFECT"
        },
        {
          "id": "c",
          "text": "I ate something and forgot about the world for ten minutes. I recommend it.",
          "feedback": "Only these current members will receive what you Send.",
          "next": "OPEN-S10-C16-C-EFFECT"
        }
      ]
    },
    "S10-C17": {
      "heading": "OPTIONAL GROUP MESSAGE; SELECT -> DRAFT -> REAL SEND",
      "mode": "group",
      "options": [
        {
          "id": "a",
          "text": "The public catalogue lists boxes and refers to a description card, but I can't see the card text or connect it to the Bulletin reference.",
          "feedback": "",
          "next": "OPEN-S10-GROUP-C17-A-1-WAIT"
        },
        {
          "id": "b",
          "text": "There's a box description referencing a separate card. Nothing says it's Daniel's file, or even the notice we need.",
          "feedback": "",
          "next": "OPEN-S10-GROUP-C17-B-1-WAIT"
        },
        {
          "id": "c",
          "text": "I'm checking the public sources before sharing a conclusion. I'd rather not put a guess into this chat.",
          "feedback": "",
          "next": "OPEN-S10-GROUP-C17-C-1-WAIT"
        }
      ]
    },
    "S10-C18": {
      "heading": "OPTIONAL GROUP FOLLOW-UP; SELECT -> DRAFT -> REAL SEND",
      "mode": "group",
      "options": [
        {
          "id": "a",
          "text": "Agreed. The box code stays a catalogue lead, not evidence of what happened to Daniel.",
          "feedback": "",
          "next": "OPEN-S10-GROUP-C18-A-1-WAIT"
        },
        {
          "id": "b",
          "text": "We can ask about the descriptor card without sharing any private messages or naming a culprit.",
          "feedback": "",
          "next": "OPEN-S10-GROUP-C18-B-1-WAIT"
        },
        {
          "id": "c",
          "text": "I'm not sending any further details here until we know what the document actually is.",
          "feedback": "",
          "next": "OPEN-S10-GROUP-C18-C-1-WAIT"
        }
      ]
    },
    "S10-C19": {
      "heading": "FINAL CONNECTION QUESTION (REQUIRED; LOCAL, NO SEND)",
      "mode": "local",
      "options": [
        {
          "id": "a",
          "text": "The descriptor reference proves the Bulletin article used the same original notice as the civic index.",
          "feedback": "There is no original notice or direct cross-reference. Similar subject headings cannot close this gap."
        },
        {
          "id": "b",
          "text": "The register, summary, extract and descriptor LABEL make a traceable catalogue path, but no item or publisher-code match is verified.",
          "feedback": "Supported. You have a path to ask for a description, not the text of a specific notice."
        },
        {
          "id": "c",
          "text": "The absent descriptor text proves someone removed Daniel's record after the series was transferred.",
          "feedback": "The page contains no deletion event, Daniel match, date of removal, or actor."
        }
      ]
    },
    "S10-C20": {
      "heading": "FINAL PRIVATE STANCE (LOCAL, NO SEND; ALL ACCEPTED)",
      "mode": "local",
      "options": [
        {
          "id": "a",
          "text": "The public catalogue identifies a path to a descriptor card, not a notice tied to the Bulletin article.",
          "feedback": "Saved: bounded catalogue lead; publisher link unverified."
        },
        {
          "id": "b",
          "text": "I can name the public series, box and descriptor reference without pretending to know what the descriptor contains.",
          "feedback": "Saved: catalogue citation without inferred contents."
        },
        {
          "id": "c",
          "text": "Until the source itself connects the records, I won't treat this as Daniel's document or share it as a solved clue.",
          "feedback": "Saved: case attribution withheld; no message sent."
        }
      ]
    }
  },
  "entrances": {
    "civic_a": "OPEN-S10-CATALOGUE-REPLY-A-1-WAIT",
    "civic_b": "OPEN-S10-CATALOGUE-REPLY-B-1-WAIT",
    "civic_c": "OPEN-S10-CATALOGUE-REPLY-C-1-WAIT",
    "professional": "OPEN-S10-PRO-OPEN-1-WAIT",
    "sophie": "OPEN-S10-SOPHIE-OPEN-1-WAIT",
    "group": "OPEN-S10-C17"
  },
  "pages": {
    "box-index": {
      "route": "browser://greyhaven/civic-records/catalogue/GH-INV-2022-063/box-index",
      "paragraphs": [
        "GREYHAVEN RECORDS CENTRE PUBLIC BOX INDEX — SELECTED EXTRACT",
        "Extract ID: GH-INV-2022-063-EX1 Related public inventory summary: GH-INV-2022-063 Related transfer entry: GH-TR-2022-063 Series identifier: GH-PN-GEN-2017-2021 Description level: STORAGE BOX / BROAD SUBJECT Extract scope: Selected public catalogue descriptions only",
        "This is a separate, limited catalogue extract. The summary linked in the transfer register did not include individual items. Neither this extract nor its absence from that summary certifies the completeness of the whole series.",
        "BOX REGISTER — PUBLIC SELECTION",
        "BOX 01 | GH-PN-BOX-01 | Public counter information | 2017–2018 Public description: broad subjects only Item-level notices: NOT LISTED IN THIS EXTRACT",
        "BOX 02 | GH-PN-BOX-02 | Office access and service postings | 2018–2019 Public description: broad subjects only Item-level notices: NOT LISTED IN THIS EXTRACT",
        "BOX 03 | GH-PN-BOX-03 | General administrative postings | 2019–2020 Public description: refer to descriptor GH-DSC-03-A Descriptor text: NOT INCLUDED IN THIS PUBLIC EXTRACT Item-level notices: NOT LISTED IN THIS EXTRACT",
        "BOX 04 | GH-PN-BOX-04 | Community information postings | 2020–2021 Public description: broad subjects only Item-level notices: NOT LISTED IN THIS EXTRACT",
        "PUBLIC CATALOGUE NOTE The box headings and date spans assist with finding-aid enquiries. They are not a list of every original notice, a record of disposition, or a certification that all boxes are immediately available.",
        "A descriptor reference means that a separate catalogue description may need to be checked through the listed access process. Its text is not reproduced here. The reference alone does not establish what individual records, if any, a box contains.",
        "ORIGINAL INDIVIDUAL NOTICE TEXT: NOT INCLUDED IN THIS EXTRACT"
      ]
    },
    "access": {
      "route": "GH-CATALOGUE-ACCESS-NOTE-001",
      "paragraphs": [
        "GREYHAVEN RECORDS CENTRE — CATALOGUE ACCESS NOTE",
        "An online extract may omit supplementary descriptions. For public catalogue questions, quote the extract, series, box and descriptor reference. An omission from the extract is not a disposition note. Access or additional description, if available, is assessed under the usual public enquiry process."
      ]
    }
  },
  "queries": [
    {
      "term": "GH-TR-2022-063",
      "result": "Listed transfer row; no items in this result."
    },
    {
      "term": "GH-INV-2022-063",
      "result": "Series summary; not the complete item list."
    },
    {
      "term": "GH-PN-BOX-03",
      "result": "Box-level heading found; notices not itemized."
    },
    {
      "term": "GH-DSC-03-A",
      "result": "Descriptor code referenced in EX1; descriptor text not shown here. This is not a negative official search."
    },
    {
      "term": "GB-REF-017",
      "result": "No direct cross-reference found in THESE displayed public pages. This does not establish existence or deletion."
    },
    {
      "term": "7-14",
      "result": "Not a recognized catalogue query in THIS demonstration. No interpretation or case association is provided."
    }
  ],
  "sources": {
    "GH-BOX-INDEX-EXTRACT-001": {
      "printedId": "GH-INV-2022-063-EX1",
      "kind": "CIVIC_PUBLIC_PARTIAL_BOX_INDEX",
      "boxes": [
        "GH-PN-BOX-01",
        "GH-PN-BOX-02",
        "GH-PN-BOX-03",
        "GH-PN-BOX-04"
      ],
      "descriptorReference": "GH-DSC-03-A",
      "descriptorTextIncluded": false
    },
    "GH-CATALOGUE-ACCESS-NOTE-001": {
      "kind": "CIVIC_GENERAL_ACCESS_GUIDANCE",
      "caseReply": false
    }
  }
} as const
