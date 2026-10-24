// Generated from the owner's complete Scene 04; never parse Markdown during play.
import type { Scene01Node } from './scene01'
export const scene04Nodes: Record<string, Scene01Node> = {
  "OPEN-S04-COMPLETE": {
    "id": "OPEN-S04-COMPLETE",
    "kind": "event",
    "event": "s04-complete"
  },
  "OPEN-S04-ARTICLE-GATE": {
    "id": "OPEN-S04-ARTICLE-GATE",
    "kind": "gate",
    "action": "s04-article",
    "next": "OPEN-S04-AFTER-ARTICLE"
  },
  "OPEN-S04-GROUP-OFFER": {
    "id": "OPEN-S04-GROUP-OFFER",
    "kind": "gate",
    "action": "s04-group",
    "next": "OPEN-S04-AFTER-GROUP"
  },
  "OPEN-S04-GROUP-END": {
    "id": "OPEN-S04-GROUP-END",
    "kind": "gate",
    "action": "s04-return-sophie",
    "next": "OPEN-S04-AFTER-GROUP"
  },
  "OPEN-S04-ARCHIVE-GATE": {
    "id": "OPEN-S04-ARCHIVE-GATE",
    "kind": "gate",
    "action": "s04-archive",
    "next": "OPEN-S04-C10"
  },
  "OPEN-S04-INDEX-ACK": {
    "id": "OPEN-S04-INDEX-ACK",
    "kind": "gate",
    "action": "s04-index-ack",
    "next": "OPEN-S04-C11"
  },
  "OPEN-S04-RETURN-DEVICE": {
    "id": "OPEN-S04-RETURN-DEVICE",
    "kind": "gate",
    "action": "s04-device",
    "next": "OPEN-S04-FOLLOWUP"
  },
  "OPEN-S04-FOLLOWUP-WAIT": {
    "id": "OPEN-S04-FOLLOWUP-WAIT",
    "kind": "gate",
    "action": "s04-followup",
    "next": "OPEN-S04-FOLLOWUP"
  },
  "OPEN-S04-FINAL-ARTICLE-RETURN-3": {
    "id": "OPEN-S04-FINAL-ARTICLE-RETURN-3",
    "next": "OPEN-S04-C03",
    "kind": "npc",
    "text": "Maybe that's why everyone keeps sharing it.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-ARTICLE-RETURN-2": {
    "id": "OPEN-S04-FINAL-ARTICLE-RETURN-2",
    "next": "OPEN-S04-FINAL-ARTICLE-RETURN-3",
    "kind": "npc",
    "text": "I know it doesn't say anything particularly dramatic.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-ARTICLE-RETURN-1": {
    "id": "OPEN-S04-FINAL-ARTICLE-RETURN-1",
    "next": "OPEN-S04-FINAL-ARTICLE-RETURN-2",
    "kind": "npc",
    "text": "You read it?",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-AFTER-ARTICLE": {
    "id": "OPEN-S04-AFTER-ARTICLE",
    "kind": "event",
    "event": "route",
    "next": "OPEN-S04-FINAL-ARTICLE-RETURN-1"
  },
  "OPEN-S04-FINAL-GROUP-OPENING-6": {
    "id": "OPEN-S04-FINAL-GROUP-OPENING-6",
    "next": "OPEN-S04-C07",
    "kind": "npc",
    "text": "Just please don't turn it into a debate with strangers.",
    "sender": "maya",
    "channel": "group",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-GROUP-OPENING-5": {
    "id": "OPEN-S04-FINAL-GROUP-OPENING-5",
    "next": "OPEN-S04-FINAL-GROUP-OPENING-6",
    "kind": "npc",
    "text": "That's different from posting it everywhere.",
    "sender": "maya",
    "channel": "group",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-GROUP-OPENING-4": {
    "id": "OPEN-S04-FINAL-GROUP-OPENING-4",
    "next": "OPEN-S04-FINAL-GROUP-OPENING-5",
    "kind": "npc",
    "text": "Sorry. I sent it to someone because I wanted another opinion.",
    "sender": "sophie",
    "channel": "group",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-GROUP-OPENING-3": {
    "id": "OPEN-S04-FINAL-GROUP-OPENING-3",
    "next": "OPEN-S04-FINAL-GROUP-OPENING-4",
    "kind": "npc",
    "text": "I know.",
    "sender": "sophie",
    "channel": "group",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-GROUP-OPENING-2": {
    "id": "OPEN-S04-FINAL-GROUP-OPENING-2",
    "next": "OPEN-S04-FINAL-GROUP-OPENING-3",
    "kind": "npc",
    "text": "I wasn't interviewed for it.",
    "sender": "maya",
    "channel": "group",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-GROUP-OPENING-1": {
    "id": "OPEN-S04-FINAL-GROUP-OPENING-1",
    "next": "OPEN-S04-FINAL-GROUP-OPENING-2",
    "kind": "npc",
    "text": "People keep asking me if every sentence in it is true.",
    "sender": "maya",
    "channel": "group",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-GROUP-RETURN-6": {
    "id": "OPEN-S04-FINAL-GROUP-RETURN-6",
    "next": "OPEN-S04-C08",
    "kind": "npc",
    "text": "Which is exactly what she would tell me not to do.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-GROUP-RETURN-5": {
    "id": "OPEN-S04-FINAL-GROUP-RETURN-5",
    "next": "OPEN-S04-FINAL-GROUP-RETURN-6",
    "kind": "npc",
    "text": "I've been staring at that update label again.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-GROUP-RETURN-4": {
    "id": "OPEN-S04-FINAL-GROUP-RETURN-4",
    "next": "OPEN-S04-FINAL-GROUP-RETURN-5",
    "kind": "wait",
    "duration": 2100,
    "typing": false,
    "actor": "sophie"
  },
  "OPEN-S04-FINAL-GROUP-RETURN-3": {
    "id": "OPEN-S04-FINAL-GROUP-RETURN-3",
    "next": "OPEN-S04-FINAL-GROUP-RETURN-4",
    "kind": "npc",
    "text": "Sometimes I think she forgets she gets to be upset too.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-GROUP-RETURN-2": {
    "id": "OPEN-S04-FINAL-GROUP-RETURN-2",
    "next": "OPEN-S04-FINAL-GROUP-RETURN-3",
    "kind": "npc",
    "text": "She's trying to keep people from getting carried away.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-GROUP-RETURN-1": {
    "id": "OPEN-S04-FINAL-GROUP-RETURN-1",
    "next": "OPEN-S04-FINAL-GROUP-RETURN-2",
    "kind": "npc",
    "text": "She's been fielding a lot of messages.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-GROUP-READ-1": {
    "id": "OPEN-S04-FINAL-GROUP-READ-1",
    "next": "OPEN-S04-FINAL-GROUP-RETURN-1",
    "kind": "npc",
    "text": "Sorry about the group.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-GROUP-SKIPPED-1": {
    "id": "OPEN-S04-FINAL-GROUP-SKIPPED-1",
    "next": "OPEN-S04-FINAL-GROUP-RETURN-1",
    "kind": "npc",
    "text": "Maya's had a rough day.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-AFTER-GROUP": {
    "id": "OPEN-S04-AFTER-GROUP",
    "kind": "condition",
    "test": "s04-group-opened",
    "next": "OPEN-S04-FINAL-GROUP-READ-1",
    "otherwise": "OPEN-S04-FINAL-GROUP-SKIPPED-1"
  },
  "OPEN-S04-FINAL-FOLLOWUP-6": {
    "id": "OPEN-S04-FINAL-FOLLOWUP-6",
    "next": "OPEN-S04-C12",
    "kind": "npc",
    "text": "About how hard it is to know what to believe.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-FOLLOWUP-5": {
    "id": "OPEN-S04-FINAL-FOLLOWUP-5",
    "next": "OPEN-S04-FINAL-FOLLOWUP-6",
    "kind": "npc",
    "text": "I've just been thinking about something you said.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-FOLLOWUP-4": {
    "id": "OPEN-S04-FINAL-FOLLOWUP-4",
    "next": "OPEN-S04-FINAL-FOLLOWUP-5",
    "kind": "wait",
    "duration": 2000,
    "typing": false,
    "actor": "sophie"
  },
  "OPEN-S04-FINAL-FOLLOWUP-3": {
    "id": "OPEN-S04-FINAL-FOLLOWUP-3",
    "next": "OPEN-S04-FINAL-FOLLOWUP-4",
    "kind": "npc",
    "text": "That would be a pretty terrible way to make friends.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-FOLLOWUP-2": {
    "id": "OPEN-S04-FINAL-FOLLOWUP-2",
    "next": "OPEN-S04-FINAL-FOLLOWUP-3",
    "kind": "npc",
    "text": "I promise I don't plan to send you a new article every hour.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-FOLLOWUP-1": {
    "id": "OPEN-S04-FINAL-FOLLOWUP-1",
    "next": "OPEN-S04-FINAL-FOLLOWUP-2",
    "kind": "npc",
    "text": "Hey.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FOLLOWUP": {
    "id": "OPEN-S04-FOLLOWUP",
    "kind": "event",
    "event": "route",
    "next": "OPEN-S04-FINAL-FOLLOWUP-1"
  },
  "OPEN-S04-FINAL-AFTER-16-6": {
    "id": "OPEN-S04-FINAL-AFTER-16-6",
    "next": "OPEN-S04-COMPLETE",
    "kind": "event",
    "event": "presence",
    "actor": "sophie",
    "online": false
  },
  "OPEN-S04-FINAL-AFTER-16-5": {
    "id": "OPEN-S04-FINAL-AFTER-16-5",
    "next": "OPEN-S04-FINAL-AFTER-16-6",
    "kind": "npc",
    "text": "Goodnight.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-16-4": {
    "id": "OPEN-S04-FINAL-AFTER-16-4",
    "next": "OPEN-S04-FINAL-AFTER-16-5",
    "kind": "wait",
    "duration": 2000,
    "typing": false,
    "actor": "sophie"
  },
  "OPEN-S04-FINAL-AFTER-16-3": {
    "id": "OPEN-S04-FINAL-AFTER-16-3",
    "next": "OPEN-S04-FINAL-AFTER-16-4",
    "kind": "npc",
    "text": "For reading the whole thing.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-16-2": {
    "id": "OPEN-S04-FINAL-AFTER-16-2",
    "next": "OPEN-S04-FINAL-AFTER-16-3",
    "kind": "npc",
    "text": "Thank you.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-16-1": {
    "id": "OPEN-S04-FINAL-AFTER-16-1",
    "next": "OPEN-S04-FINAL-AFTER-16-2",
    "kind": "wait",
    "duration": 1500,
    "typing": true,
    "actor": "sophie"
  },
  "OPEN-S04-FINAL-C16-a-1": {
    "id": "OPEN-S04-FINAL-C16-a-1",
    "next": "OPEN-S04-FINAL-AFTER-16-1",
    "kind": "npc",
    "text": "Talk later.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C16-b-1": {
    "id": "OPEN-S04-FINAL-C16-b-1",
    "next": "OPEN-S04-FINAL-AFTER-16-1",
    "kind": "npc",
    "text": "You too.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C16-c-3": {
    "id": "OPEN-S04-FINAL-C16-c-3",
    "next": "OPEN-S04-FINAL-AFTER-16-1",
    "kind": "npc",
    "text": "If you're okay with that.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C16-c-2": {
    "id": "OPEN-S04-FINAL-C16-c-2",
    "next": "OPEN-S04-FINAL-C16-c-3",
    "kind": "npc",
    "text": "You'll be one of the first to know.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C16-c-1": {
    "id": "OPEN-S04-FINAL-C16-c-1",
    "next": "OPEN-S04-FINAL-C16-c-2",
    "kind": "wait",
    "duration": 2300,
    "typing": false,
    "actor": "sophie"
  },
  "OPEN-S04-FINAL-C16-d-2": {
    "id": "OPEN-S04-FINAL-C16-d-2",
    "next": "OPEN-S04-FINAL-AFTER-16-1",
    "kind": "npc",
    "text": "Just don't feel like you have to do everything tonight.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C16-d-1": {
    "id": "OPEN-S04-FINAL-C16-d-1",
    "next": "OPEN-S04-FINAL-C16-d-2",
    "kind": "npc",
    "text": "Okay.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C16-e-6": {
    "id": "OPEN-S04-FINAL-C16-e-6",
    "next": "OPEN-S04-FINAL-AFTER-16-1",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "affinity": 2
      }
    }
  },
  "OPEN-S04-FINAL-C16-e-5": {
    "id": "OPEN-S04-FINAL-C16-e-5",
    "next": "OPEN-S04-FINAL-C16-e-6",
    "kind": "npc",
    "text": "But you can explain that to her when she starts making schedules for us all. 😄",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C16-e-4": {
    "id": "OPEN-S04-FINAL-C16-e-4",
    "next": "OPEN-S04-FINAL-C16-e-5",
    "kind": "npc",
    "text": "Fine.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C16-e-3": {
    "id": "OPEN-S04-FINAL-C16-e-3",
    "kind": "choice",
    "choices": [
      {
        "id": "continue",
        "text": "It's for a good cause.",
        "next": "OPEN-S04-FINAL-C16-e-4"
      }
    ],
    "channel": "sophie"
  },
  "OPEN-S04-FINAL-C16-e-2": {
    "id": "OPEN-S04-FINAL-C16-e-2",
    "next": "OPEN-S04-FINAL-C16-e-3",
    "kind": "npc",
    "text": "Building an alliance with Maya behind my back.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C16-e-1": {
    "id": "OPEN-S04-FINAL-C16-e-1",
    "next": "OPEN-S04-FINAL-C16-e-2",
    "kind": "npc",
    "text": "I see what you're doing.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-C16": {
    "id": "OPEN-S04-C16",
    "kind": "choice",
    "number": "A16",
    "choices": [
      {
        "id": "a",
        "text": "I won't. Talk later.",
        "next": "OPEN-S04-FINAL-C16-a-1"
      },
      {
        "id": "b",
        "text": "Take care of yourself.",
        "next": "OPEN-S04-FINAL-C16-b-1"
      },
      {
        "id": "c",
        "text": "Let me know if you hear from Daniel.",
        "next": "OPEN-S04-FINAL-C16-c-1"
      },
      {
        "id": "d",
        "text": "I may need to check something else about the article.",
        "next": "OPEN-S04-FINAL-C16-d-1"
      },
      {
        "id": "e",
        "text": "If Maya brings leftovers, accept them. And then both of you take a break.",
        "next": "OPEN-S04-FINAL-C16-e-1",
        "premiumChoice": true
      }
    ],
    "channel": "sophie"
  },
  "OPEN-S04-FINAL-AFTER-15-6": {
    "id": "OPEN-S04-FINAL-AFTER-15-6",
    "next": "OPEN-S04-C16",
    "kind": "npc",
    "text": "Don't tell her I said that.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-15-5": {
    "id": "OPEN-S04-FINAL-AFTER-15-5",
    "next": "OPEN-S04-FINAL-AFTER-15-6",
    "kind": "npc",
    "text": "Actually, that might not be so bad.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-15-4": {
    "id": "OPEN-S04-FINAL-AFTER-15-4",
    "next": "OPEN-S04-FINAL-AFTER-15-5",
    "kind": "npc",
    "text": "If I don't, Maya will start threatening to come over with leftovers.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-15-3": {
    "id": "OPEN-S04-FINAL-AFTER-15-3",
    "next": "OPEN-S04-FINAL-AFTER-15-4",
    "kind": "npc",
    "text": "I really am going this time.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-15-2": {
    "id": "OPEN-S04-FINAL-AFTER-15-2",
    "next": "OPEN-S04-FINAL-AFTER-15-3",
    "kind": "npc",
    "text": "Okay.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-15-1": {
    "id": "OPEN-S04-FINAL-AFTER-15-1",
    "next": "OPEN-S04-FINAL-AFTER-15-2",
    "kind": "wait",
    "duration": 2500,
    "typing": false,
    "actor": "sophie"
  },
  "OPEN-S04-FINAL-C15-a-2": {
    "id": "OPEN-S04-FINAL-C15-a-2",
    "next": "OPEN-S04-FINAL-AFTER-15-1",
    "kind": "npc",
    "text": "Let's not get ahead of ourselves.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C15-a-1": {
    "id": "OPEN-S04-FINAL-C15-a-1",
    "next": "OPEN-S04-FINAL-C15-a-2",
    "kind": "npc",
    "text": "You haven't seen me try to dance.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C15-b-2": {
    "id": "OPEN-S04-FINAL-C15-b-2",
    "next": "OPEN-S04-FINAL-AFTER-15-1",
    "kind": "npc",
    "text": "But a laugh would be nice now and then.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C15-b-1": {
    "id": "OPEN-S04-FINAL-C15-b-1",
    "next": "OPEN-S04-FINAL-C15-b-2",
    "kind": "npc",
    "text": "I know.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C15-c-2": {
    "id": "OPEN-S04-FINAL-C15-c-2",
    "next": "OPEN-S04-FINAL-AFTER-15-1",
    "kind": "npc",
    "text": "A delicious tragedy, but still.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C15-c-1": {
    "id": "OPEN-S04-FINAL-C15-c-1",
    "next": "OPEN-S04-FINAL-C15-c-2",
    "kind": "npc",
    "text": "The cake story was a tragedy.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C15-d-2": {
    "id": "OPEN-S04-FINAL-C15-d-2",
    "next": "OPEN-S04-FINAL-AFTER-15-1",
    "kind": "npc",
    "text": "Oh. Sorry. Habit. 😅",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C15-d-1": {
    "id": "OPEN-S04-FINAL-C15-d-1",
    "next": "OPEN-S04-FINAL-C15-d-2",
    "kind": "npc",
    "text": "Yes, Maya.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-C15": {
    "id": "OPEN-S04-C15",
    "kind": "choice",
    "number": "A15",
    "choices": [
      {
        "id": "a",
        "text": "I'm sure you still are.",
        "next": "OPEN-S04-FINAL-C15-a-1"
      },
      {
        "id": "b",
        "text": "You don't have to be entertaining.",
        "next": "OPEN-S04-FINAL-C15-b-1"
      },
      {
        "id": "c",
        "text": "I think the cake story was pretty good.",
        "next": "OPEN-S04-FINAL-C15-c-1"
      },
      {
        "id": "d",
        "text": "You sound like you need to put your phone down.",
        "next": "OPEN-S04-FINAL-C15-d-1"
      }
    ],
    "channel": "sophie"
  },
  "OPEN-S04-FINAL-AFTER-14-4": {
    "id": "OPEN-S04-FINAL-AFTER-14-4",
    "next": "OPEN-S04-C15",
    "kind": "npc",
    "text": "At least I think I was.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-14-3": {
    "id": "OPEN-S04-FINAL-AFTER-14-3",
    "next": "OPEN-S04-FINAL-AFTER-14-4",
    "kind": "npc",
    "text": "I swear I used to be fun at parties.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-14-2": {
    "id": "OPEN-S04-FINAL-AFTER-14-2",
    "next": "OPEN-S04-FINAL-AFTER-14-3",
    "kind": "npc",
    "text": "Again.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-14-1": {
    "id": "OPEN-S04-FINAL-AFTER-14-1",
    "next": "OPEN-S04-FINAL-AFTER-14-2",
    "kind": "npc",
    "text": "Sorry. That got a little heavy.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C14-a-2": {
    "id": "OPEN-S04-FINAL-C14-a-2",
    "next": "OPEN-S04-FINAL-AFTER-14-1",
    "kind": "npc",
    "text": "I really do.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C14-a-1": {
    "id": "OPEN-S04-FINAL-C14-a-1",
    "next": "OPEN-S04-FINAL-C14-a-2",
    "kind": "npc",
    "text": "Yeah.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C14-b-2": {
    "id": "OPEN-S04-FINAL-C14-b-2",
    "next": "OPEN-S04-FINAL-AFTER-14-1",
    "kind": "npc",
    "text": "It might take me a while.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C14-b-1": {
    "id": "OPEN-S04-FINAL-C14-b-1",
    "next": "OPEN-S04-FINAL-C14-b-2",
    "kind": "npc",
    "text": "That's a surprisingly generous offer.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C14-c-3": {
    "id": "OPEN-S04-FINAL-C14-c-3",
    "next": "OPEN-S04-FINAL-AFTER-14-1",
    "kind": "npc",
    "text": "Usually right before I threw a cushion at him.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C14-c-2": {
    "id": "OPEN-S04-FINAL-C14-c-2",
    "next": "OPEN-S04-FINAL-C14-c-3",
    "kind": "npc",
    "text": "Daniel used to tell me that when I rambled.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C14-c-1": {
    "id": "OPEN-S04-FINAL-C14-c-1",
    "next": "OPEN-S04-FINAL-C14-c-2",
    "kind": "npc",
    "text": "Funny.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C14-d-2": {
    "id": "OPEN-S04-FINAL-C14-d-2",
    "next": "OPEN-S04-FINAL-AFTER-14-1",
    "kind": "npc",
    "text": "I think I've used up my brain for today.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C14-d-1": {
    "id": "OPEN-S04-FINAL-C14-d-1",
    "next": "OPEN-S04-FINAL-C14-d-2",
    "kind": "npc",
    "text": "Maybe.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C14-e-9": {
    "id": "OPEN-S04-FINAL-C14-e-9",
    "next": "OPEN-S04-FINAL-AFTER-14-1",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "trust": 2,
        "affinity": 2
      }
    }
  },
  "OPEN-S04-FINAL-C14-e-8": {
    "id": "OPEN-S04-FINAL-C14-e-8",
    "next": "OPEN-S04-FINAL-C14-e-9",
    "kind": "npc",
    "text": "I needed that more than I expected.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C14-e-7": {
    "id": "OPEN-S04-FINAL-C14-e-7",
    "next": "OPEN-S04-FINAL-C14-e-8",
    "kind": "npc",
    "text": "Thank you.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C14-e-6": {
    "id": "OPEN-S04-FINAL-C14-e-6",
    "next": "OPEN-S04-FINAL-C14-e-7",
    "kind": "wait",
    "duration": 3000,
    "typing": false,
    "actor": "sophie"
  },
  "OPEN-S04-FINAL-C14-e-5": {
    "id": "OPEN-S04-FINAL-C14-e-5",
    "kind": "choice",
    "choices": [
      {
        "id": "continue",
        "text": "He's still your brother when there's nothing to investigate.",
        "next": "OPEN-S04-FINAL-C14-e-6"
      }
    ],
    "channel": "sophie"
  },
  "OPEN-S04-FINAL-C14-e-4": {
    "id": "OPEN-S04-FINAL-C14-e-4",
    "next": "OPEN-S04-FINAL-C14-e-5",
    "kind": "npc",
    "text": "I've been turning everything about him into something to check.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C14-e-3": {
    "id": "OPEN-S04-FINAL-C14-e-3",
    "next": "OPEN-S04-FINAL-C14-e-4",
    "kind": "npc",
    "text": "I hadn't really thought about it that way.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C14-e-2": {
    "id": "OPEN-S04-FINAL-C14-e-2",
    "next": "OPEN-S04-FINAL-C14-e-3",
    "kind": "npc",
    "text": "...",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C14-e-1": {
    "id": "OPEN-S04-FINAL-C14-e-1",
    "next": "OPEN-S04-FINAL-C14-e-2",
    "kind": "wait",
    "duration": 3200,
    "typing": false,
    "actor": "sophie"
  },
  "OPEN-S04-C14": {
    "id": "OPEN-S04-C14",
    "kind": "choice",
    "number": "A14",
    "choices": [
      {
        "id": "a",
        "text": "You miss him.",
        "next": "OPEN-S04-FINAL-C14-a-1"
      },
      {
        "id": "b",
        "text": "You can tell me when you've figured out what you meant.",
        "next": "OPEN-S04-FINAL-C14-b-1"
      },
      {
        "id": "c",
        "text": "It's okay if there's no point to the story.",
        "next": "OPEN-S04-FINAL-C14-c-1"
      },
      {
        "id": "d",
        "text": "Maybe you should save that thought for another day.",
        "next": "OPEN-S04-FINAL-C14-d-1"
      },
      {
        "id": "e",
        "text": "You don't have to turn every memory into a clue, Sophie. You can just miss your brother.",
        "next": "OPEN-S04-FINAL-C14-e-1",
        "premiumChoice": true
      }
    ],
    "channel": "sophie"
  },
  "OPEN-S04-FINAL-AFTER-13-9": {
    "id": "OPEN-S04-FINAL-AFTER-13-9",
    "next": "OPEN-S04-C14",
    "kind": "npc",
    "text": "I'm not even sure what I was trying to say.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-13-8": {
    "id": "OPEN-S04-FINAL-AFTER-13-8",
    "next": "OPEN-S04-FINAL-AFTER-13-9",
    "kind": "npc",
    "text": "Never mind.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-13-7": {
    "id": "OPEN-S04-FINAL-AFTER-13-7",
    "next": "OPEN-S04-FINAL-AFTER-13-8",
    "kind": "wait",
    "duration": 3400,
    "typing": true,
    "actor": "sophie"
  },
  "OPEN-S04-FINAL-AFTER-13-6": {
    "id": "OPEN-S04-FINAL-AFTER-13-6",
    "next": "OPEN-S04-FINAL-AFTER-13-7",
    "kind": "npc",
    "text": "But sometimes...",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-13-5": {
    "id": "OPEN-S04-FINAL-AFTER-13-5",
    "next": "OPEN-S04-FINAL-AFTER-13-6",
    "kind": "npc",
    "text": "Maybe sometimes he was.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-13-4": {
    "id": "OPEN-S04-FINAL-AFTER-13-4",
    "next": "OPEN-S04-FINAL-AFTER-13-5",
    "kind": "npc",
    "text": "I always thought he was just avoiding the conversation.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-13-3": {
    "id": "OPEN-S04-FINAL-AFTER-13-3",
    "next": "OPEN-S04-FINAL-AFTER-13-4",
    "kind": "npc",
    "text": "I told you about that, didn't I?",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-13-2": {
    "id": "OPEN-S04-FINAL-AFTER-13-2",
    "next": "OPEN-S04-FINAL-AFTER-13-3",
    "kind": "npc",
    "text": "I used to hate it when Daniel said, \"I'll explain later.\"",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-13-1": {
    "id": "OPEN-S04-FINAL-AFTER-13-1",
    "next": "OPEN-S04-FINAL-AFTER-13-2",
    "kind": "wait",
    "duration": 2500,
    "typing": false,
    "actor": "sophie"
  },
  "OPEN-S04-FINAL-C13-a-7": {
    "id": "OPEN-S04-FINAL-C13-a-7",
    "next": "OPEN-S04-FINAL-AFTER-13-1",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "trust": 1
      }
    }
  },
  "OPEN-S04-FINAL-C13-a-6": {
    "id": "OPEN-S04-FINAL-C13-a-6",
    "next": "OPEN-S04-FINAL-C13-a-7",
    "kind": "npc",
    "text": "Thanks for telling me without making it sound like proof.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C13-a-5": {
    "id": "OPEN-S04-FINAL-C13-a-5",
    "next": "OPEN-S04-FINAL-C13-a-6",
    "kind": "npc",
    "text": "So we don't really know what it is yet.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C13-a-4": {
    "id": "OPEN-S04-FINAL-C13-a-4",
    "next": "OPEN-S04-FINAL-C13-a-5",
    "kind": "npc",
    "text": "Okay.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C13-a-3": {
    "id": "OPEN-S04-FINAL-C13-a-3",
    "next": "OPEN-S04-FINAL-C13-a-4",
    "kind": "wait",
    "duration": 2000,
    "typing": false,
    "actor": "sophie"
  },
  "OPEN-S04-FINAL-C13-a-2": {
    "id": "OPEN-S04-FINAL-C13-a-2",
    "kind": "choice",
    "choices": [
      {
        "id": "continue",
        "text": "In a recovered index on this device. I haven't verified its source.",
        "next": "OPEN-S04-FINAL-C13-a-3"
      }
    ],
    "channel": "sophie"
  },
  "OPEN-S04-FINAL-C13-a-1": {
    "id": "OPEN-S04-FINAL-C13-a-1",
    "next": "OPEN-S04-FINAL-C13-a-2",
    "kind": "npc",
    "text": "A reference where?",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C13-b-2": {
    "id": "OPEN-S04-FINAL-C13-b-2",
    "next": "OPEN-S04-FINAL-AFTER-13-1",
    "kind": "npc",
    "text": "You don't owe me instant updates.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C13-b-1": {
    "id": "OPEN-S04-FINAL-C13-b-1",
    "next": "OPEN-S04-FINAL-C13-b-2",
    "kind": "npc",
    "text": "That's fine.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C13-c-2": {
    "id": "OPEN-S04-FINAL-C13-c-2",
    "next": "OPEN-S04-FINAL-AFTER-13-1",
    "kind": "npc",
    "text": "I wish more people did that.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C13-c-1": {
    "id": "OPEN-S04-FINAL-C13-c-1",
    "next": "OPEN-S04-FINAL-C13-c-2",
    "kind": "npc",
    "text": "Honestly, that sounds sensible.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C13-d-3": {
    "id": "OPEN-S04-FINAL-C13-d-3",
    "next": "OPEN-S04-FINAL-AFTER-13-1",
    "kind": "npc",
    "text": "I'd rather hear \"I don't know\" than something that's certain for five minutes.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C13-d-2": {
    "id": "OPEN-S04-FINAL-C13-d-2",
    "next": "OPEN-S04-FINAL-C13-d-3",
    "kind": "npc",
    "text": "I know you mean well.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C13-d-1": {
    "id": "OPEN-S04-FINAL-C13-d-1",
    "next": "OPEN-S04-FINAL-C13-d-2",
    "kind": "npc",
    "text": "Thank you.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C13-e-8": {
    "id": "OPEN-S04-FINAL-C13-e-8",
    "next": "OPEN-S04-FINAL-AFTER-13-1",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "trust": 2
      }
    }
  },
  "OPEN-S04-FINAL-C13-e-7": {
    "id": "OPEN-S04-FINAL-C13-e-7",
    "next": "OPEN-S04-FINAL-C13-e-8",
    "kind": "npc",
    "text": "Thank you for being careful with me.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C13-e-6": {
    "id": "OPEN-S04-FINAL-C13-e-6",
    "next": "OPEN-S04-FINAL-C13-e-7",
    "kind": "npc",
    "text": "Neither do I.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C13-e-5": {
    "id": "OPEN-S04-FINAL-C13-e-5",
    "kind": "choice",
    "choices": [
      {
        "id": "continue",
        "text": "I don't want to give you a false answer.",
        "next": "OPEN-S04-FINAL-C13-e-6"
      }
    ],
    "channel": "sophie"
  },
  "OPEN-S04-FINAL-C13-e-4": {
    "id": "OPEN-S04-FINAL-C13-e-4",
    "next": "OPEN-S04-FINAL-C13-e-5",
    "kind": "npc",
    "text": "But I understand the last part.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C13-e-3": {
    "id": "OPEN-S04-FINAL-C13-e-3",
    "next": "OPEN-S04-FINAL-C13-e-4",
    "kind": "npc",
    "text": "I won't pretend I understand what a record index is.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C13-e-2": {
    "id": "OPEN-S04-FINAL-C13-e-2",
    "next": "OPEN-S04-FINAL-C13-e-3",
    "kind": "npc",
    "text": "...",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C13-e-1": {
    "id": "OPEN-S04-FINAL-C13-e-1",
    "next": "OPEN-S04-FINAL-C13-e-2",
    "kind": "wait",
    "duration": 3000,
    "typing": false,
    "actor": "sophie"
  },
  "OPEN-S04-C13": {
    "id": "OPEN-S04-C13",
    "kind": "choice",
    "number": "A13",
    "choices": [
      {
        "id": "a",
        "text": "I found a saved reference that may relate to the article.",
        "next": "OPEN-S04-FINAL-C13-a-1"
      },
      {
        "id": "b",
        "text": "There's another lead, but I need to look at it properly first.",
        "next": "OPEN-S04-FINAL-C13-b-1"
      },
      {
        "id": "c",
        "text": "I'd rather not say anything until I know what it means.",
        "next": "OPEN-S04-FINAL-C13-c-1"
      },
      {
        "id": "d",
        "text": "I don't want you getting your hopes up over a file I haven't checked.",
        "next": "OPEN-S04-FINAL-C13-d-1"
      },
      {
        "id": "e",
        "text": "I came across a record index that seems related to that public page. It doesn't prove an earlier article or who saved it. I'd rather verify it before calling it evidence.",
        "next": "OPEN-S04-FINAL-C13-e-1",
        "premiumChoice": true
      }
    ],
    "channel": "sophie"
  },
  "OPEN-S04-FINAL-AFTER-12-4": {
    "id": "OPEN-S04-FINAL-AFTER-12-4",
    "next": "OPEN-S04-C13",
    "kind": "npc",
    "text": "I don't even know what fixing this would look like.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-12-3": {
    "id": "OPEN-S04-FINAL-AFTER-12-3",
    "next": "OPEN-S04-FINAL-AFTER-12-4",
    "kind": "npc",
    "text": "People hear \"help\" and think they have to fix everything.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-12-2": {
    "id": "OPEN-S04-FINAL-AFTER-12-2",
    "next": "OPEN-S04-FINAL-AFTER-12-3",
    "kind": "npc",
    "text": "I hope you know that.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-12-1": {
    "id": "OPEN-S04-FINAL-AFTER-12-1",
    "next": "OPEN-S04-FINAL-AFTER-12-2",
    "kind": "npc",
    "text": "I'm not expecting you to come back with answers.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C12-a-2": {
    "id": "OPEN-S04-FINAL-C12-a-2",
    "next": "OPEN-S04-FINAL-AFTER-12-1",
    "kind": "npc",
    "text": "At least I can read it without feeling like every sentence is aimed at me.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C12-a-1": {
    "id": "OPEN-S04-FINAL-C12-a-1",
    "next": "OPEN-S04-FINAL-C12-a-2",
    "kind": "npc",
    "text": "A bit.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C12-b-2": {
    "id": "OPEN-S04-FINAL-C12-b-2",
    "next": "OPEN-S04-FINAL-AFTER-12-1",
    "kind": "npc",
    "text": "Because I have a feeling I won't.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C12-b-1": {
    "id": "OPEN-S04-FINAL-C12-b-1",
    "next": "OPEN-S04-FINAL-C12-b-2",
    "kind": "npc",
    "text": "Good.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C12-c-2": {
    "id": "OPEN-S04-FINAL-C12-c-2",
    "next": "OPEN-S04-FINAL-AFTER-12-1",
    "kind": "npc",
    "text": "I'm going to ask her when she stops pretending she doesn't need looking after.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C12-c-1": {
    "id": "OPEN-S04-FINAL-C12-c-1",
    "next": "OPEN-S04-FINAL-C12-c-2",
    "kind": "npc",
    "text": "That's the question, isn't it?",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C12-d-3": {
    "id": "OPEN-S04-FINAL-C12-d-3",
    "next": "OPEN-S04-FINAL-AFTER-12-1",
    "kind": "npc",
    "text": "An article hasn't changed that.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C12-d-2": {
    "id": "OPEN-S04-FINAL-C12-d-2",
    "next": "OPEN-S04-FINAL-C12-d-3",
    "kind": "npc",
    "text": "Not knowing where Daniel is.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C12-d-1": {
    "id": "OPEN-S04-FINAL-C12-d-1",
    "next": "OPEN-S04-FINAL-C12-d-2",
    "kind": "npc",
    "text": "The same thing I've been worried about since you first answered.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-C12": {
    "id": "OPEN-S04-C12",
    "kind": "choice",
    "number": "A12",
    "choices": [
      {
        "id": "a",
        "text": "Has it helped to talk about the article?",
        "next": "OPEN-S04-FINAL-C12-a-1"
      },
      {
        "id": "b",
        "text": "You don't have to make sense of it all today.",
        "next": "OPEN-S04-FINAL-C12-b-1"
      },
      {
        "id": "c",
        "text": "Did Maya get something to eat too?",
        "next": "OPEN-S04-FINAL-C12-c-1"
      },
      {
        "id": "d",
        "text": "What are you still worried about?",
        "next": "OPEN-S04-FINAL-C12-d-1"
      }
    ],
    "channel": "sophie"
  },
  "OPEN-S04-FINAL-C11-a-1": {
    "id": "OPEN-S04-FINAL-C11-a-1",
    "next": "OPEN-S04-RETURN-DEVICE",
    "kind": "event",
    "event": "s04-feedback",
    "text": "Two sources recorded with distinct provenance labels."
  },
  "OPEN-S04-FINAL-C11-b-1": {
    "id": "OPEN-S04-FINAL-C11-b-1",
    "next": "OPEN-S04-RETURN-DEVICE",
    "kind": "event",
    "event": "s04-feedback",
    "text": "Index reference saved. Public article remains accessible for later review."
  },
  "OPEN-S04-FINAL-C11-c-1": {
    "id": "OPEN-S04-FINAL-C11-c-1",
    "next": "OPEN-S04-RETURN-DEVICE",
    "kind": "event",
    "event": "s04-feedback",
    "text": "Public article saved. Index remains available; not discarded."
  },
  "OPEN-S04-FINAL-C11-d-1": {
    "id": "OPEN-S04-FINAL-C11-d-1",
    "next": "OPEN-S04-RETURN-DEVICE",
    "kind": "event",
    "event": "s04-feedback",
    "text": "No personal evidence note was created. The inspected reference remains accessible."
  },
  "OPEN-S04-C11": {
    "id": "OPEN-S04-C11",
    "kind": "choice",
    "number": "A11",
    "choices": [
      {
        "id": "a",
        "text": "Save the public article and this index entry separately.",
        "next": "OPEN-S04-FINAL-C11-a-1"
      },
      {
        "id": "b",
        "text": "Save the index entry only. I can return to the article later.",
        "next": "OPEN-S04-FINAL-C11-b-1"
      },
      {
        "id": "c",
        "text": "Save the public article only for now.",
        "next": "OPEN-S04-FINAL-C11-c-1"
      },
      {
        "id": "d",
        "text": "Don't save either item yet.",
        "next": "OPEN-S04-FINAL-C11-d-1"
      }
    ],
    "channel": "archive",
    "uiChoice": true
  },
  "OPEN-S04-FINAL-C10-a-1": {
    "id": "OPEN-S04-FINAL-C10-a-1",
    "next": "OPEN-S04-INDEX-ACK",
    "kind": "event",
    "event": "s04-feedback",
    "text": "Not confirmed. An index entry exists; its referenced content has not been reviewed."
  },
  "OPEN-S04-FINAL-C10-b-1": {
    "id": "OPEN-S04-FINAL-C10-b-1",
    "next": "OPEN-S04-INDEX-ACK",
    "kind": "event",
    "event": "s04-feedback",
    "text": "Consistent with current metadata. Connection and provenance remain unverified."
  },
  "OPEN-S04-FINAL-C10-c-1": {
    "id": "OPEN-S04-FINAL-C10-c-1",
    "next": "OPEN-S04-INDEX-ACK",
    "kind": "event",
    "event": "s04-feedback",
    "text": "Not established. No content comparison is available in this index view."
  },
  "OPEN-S04-FINAL-C10-d-1": {
    "id": "OPEN-S04-FINAL-C10-d-1",
    "next": "OPEN-S04-INDEX-ACK",
    "kind": "event",
    "event": "s04-feedback",
    "text": "Correct. Additional examination is required."
  },
  "OPEN-S04-C10": {
    "id": "OPEN-S04-C10",
    "kind": "choice",
    "number": "A10",
    "choices": [
      {
        "id": "a",
        "text": "It's another copy of the article.",
        "next": "OPEN-S04-FINAL-C10-a-1"
      },
      {
        "id": "b",
        "text": "It's a reference that might be connected.",
        "next": "OPEN-S04-FINAL-C10-b-1"
      },
      {
        "id": "c",
        "text": "Someone changed the news report.",
        "next": "OPEN-S04-FINAL-C10-c-1"
      },
      {
        "id": "d",
        "text": "There isn't enough information yet.",
        "next": "OPEN-S04-FINAL-C10-d-1"
      }
    ],
    "channel": "archive",
    "uiChoice": true
  },
  "OPEN-S04-INDEX-AVAILABLE": {
    "id": "OPEN-S04-INDEX-AVAILABLE",
    "kind": "event",
    "event": "s04-index-available",
    "next": "OPEN-S04-ARCHIVE-GATE"
  },
  "OPEN-S04-FINAL-AFTER-09-6": {
    "id": "OPEN-S04-FINAL-AFTER-09-6",
    "next": "OPEN-S04-INDEX-AVAILABLE",
    "kind": "npc",
    "text": "Thanks for actually reading it.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-09-5": {
    "id": "OPEN-S04-FINAL-AFTER-09-5",
    "next": "OPEN-S04-FINAL-AFTER-09-6",
    "kind": "npc",
    "text": "And hey...",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-09-4": {
    "id": "OPEN-S04-FINAL-AFTER-09-4",
    "next": "OPEN-S04-FINAL-AFTER-09-5",
    "kind": "npc",
    "text": "We can talk later.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-09-3": {
    "id": "OPEN-S04-FINAL-AFTER-09-3",
    "next": "OPEN-S04-FINAL-AFTER-09-4",
    "kind": "npc",
    "text": "Before Maya decides to supervise me personally.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-09-2": {
    "id": "OPEN-S04-FINAL-AFTER-09-2",
    "next": "OPEN-S04-FINAL-AFTER-09-3",
    "kind": "npc",
    "text": "I'm going to get something to eat.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-09-1": {
    "id": "OPEN-S04-FINAL-AFTER-09-1",
    "next": "OPEN-S04-FINAL-AFTER-09-2",
    "kind": "wait",
    "duration": 2500,
    "typing": false,
    "actor": "sophie"
  },
  "OPEN-S04-FINAL-C09-a-2": {
    "id": "OPEN-S04-FINAL-C09-a-2",
    "next": "OPEN-S04-FINAL-AFTER-09-1",
    "kind": "npc",
    "text": "I just don't want to make my own memories into evidence.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C09-a-1": {
    "id": "OPEN-S04-FINAL-C09-a-1",
    "next": "OPEN-S04-FINAL-C09-a-2",
    "kind": "npc",
    "text": "Yeah.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C09-b-2": {
    "id": "OPEN-S04-FINAL-C09-b-2",
    "next": "OPEN-S04-FINAL-AFTER-09-1",
    "kind": "npc",
    "text": "But if we do, we'd still need to know what it actually is.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C09-b-1": {
    "id": "OPEN-S04-FINAL-C09-b-1",
    "next": "OPEN-S04-FINAL-C09-b-2",
    "kind": "npc",
    "text": "Maybe.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C09-c-3": {
    "id": "OPEN-S04-FINAL-C09-c-3",
    "next": "OPEN-S04-FINAL-AFTER-09-1",
    "kind": "npc",
    "text": "Then he'd keep twelve backups of an old shopping list.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C09-c-2": {
    "id": "OPEN-S04-FINAL-C09-c-2",
    "next": "OPEN-S04-FINAL-C09-c-3",
    "kind": "npc",
    "text": "Daniel would tell me the same thing.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C09-c-1": {
    "id": "OPEN-S04-FINAL-C09-c-1",
    "next": "OPEN-S04-FINAL-C09-c-2",
    "kind": "npc",
    "text": "I know.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C09-d-2": {
    "id": "OPEN-S04-FINAL-C09-d-2",
    "next": "OPEN-S04-FINAL-AFTER-09-1",
    "kind": "npc",
    "text": "One thing we can actually point to.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C09-d-1": {
    "id": "OPEN-S04-FINAL-C09-d-1",
    "next": "OPEN-S04-FINAL-C09-d-2",
    "kind": "npc",
    "text": "That's true.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C09-e-6": {
    "id": "OPEN-S04-FINAL-C09-e-6",
    "next": "OPEN-S04-FINAL-AFTER-09-1",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "affinity": 1,
        "trust": 1
      }
    }
  },
  "OPEN-S04-FINAL-C09-e-5": {
    "id": "OPEN-S04-FINAL-C09-e-5",
    "next": "OPEN-S04-FINAL-C09-e-6",
    "kind": "npc",
    "text": "Fair. 😄",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C09-e-4": {
    "id": "OPEN-S04-FINAL-C09-e-4",
    "kind": "choice",
    "choices": [
      {
        "id": "continue",
        "text": "I'd like to survive my second day first.",
        "next": "OPEN-S04-FINAL-C09-e-5"
      }
    ],
    "channel": "sophie"
  },
  "OPEN-S04-FINAL-C09-e-3": {
    "id": "OPEN-S04-FINAL-C09-e-3",
    "next": "OPEN-S04-FINAL-C09-e-4",
    "kind": "npc",
    "text": "Don't tell Maya. She'll want you in charge of the group.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C09-e-2": {
    "id": "OPEN-S04-FINAL-C09-e-2",
    "next": "OPEN-S04-FINAL-C09-e-3",
    "kind": "npc",
    "text": "You sound annoyingly sensible.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C09-e-1": {
    "id": "OPEN-S04-FINAL-C09-e-1",
    "next": "OPEN-S04-FINAL-C09-e-2",
    "kind": "wait",
    "duration": 2700,
    "typing": false,
    "actor": "sophie"
  },
  "OPEN-S04-C09": {
    "id": "OPEN-S04-C09",
    "kind": "choice",
    "number": "A09",
    "choices": [
      {
        "id": "a",
        "text": "That's understandable.",
        "next": "OPEN-S04-FINAL-C09-a-1"
      },
      {
        "id": "b",
        "text": "We might find another copy someday.",
        "next": "OPEN-S04-FINAL-C09-b-1"
      },
      {
        "id": "c",
        "text": "You can't keep everything.",
        "next": "OPEN-S04-FINAL-C09-c-1"
      },
      {
        "id": "d",
        "text": "We at least have the version that's public now.",
        "next": "OPEN-S04-FINAL-C09-d-1"
      },
      {
        "id": "e",
        "text": "You don't need to remember the old wording to know the current wording. Let's start with what exists.",
        "next": "OPEN-S04-FINAL-C09-e-1",
        "premiumChoice": true
      }
    ],
    "channel": "sophie"
  },
  "OPEN-S04-FINAL-AFTER-08-7": {
    "id": "OPEN-S04-FINAL-AFTER-08-7",
    "next": "OPEN-S04-C09",
    "kind": "npc",
    "text": "Even the things you were sure you'd never need again.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-08-6": {
    "id": "OPEN-S04-FINAL-AFTER-08-6",
    "next": "OPEN-S04-FINAL-AFTER-08-7",
    "kind": "npc",
    "text": "It's strange how quickly you start wishing you'd saved every little thing.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-08-5": {
    "id": "OPEN-S04-FINAL-AFTER-08-5",
    "next": "OPEN-S04-FINAL-AFTER-08-6",
    "kind": "wait",
    "duration": 3000,
    "typing": false,
    "actor": "sophie"
  },
  "OPEN-S04-FINAL-AFTER-08-4": {
    "id": "OPEN-S04-FINAL-AFTER-08-4",
    "next": "OPEN-S04-FINAL-AFTER-08-5",
    "kind": "npc",
    "text": "I just wish I had a way to stop guessing.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-08-3": {
    "id": "OPEN-S04-FINAL-AFTER-08-3",
    "next": "OPEN-S04-FINAL-AFTER-08-4",
    "kind": "npc",
    "text": "I'm not.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-08-2": {
    "id": "OPEN-S04-FINAL-AFTER-08-2",
    "next": "OPEN-S04-FINAL-AFTER-08-3",
    "kind": "npc",
    "text": "Now it sounds like I'm accusing a newspaper of something.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-08-1": {
    "id": "OPEN-S04-FINAL-AFTER-08-1",
    "next": "OPEN-S04-FINAL-AFTER-08-2",
    "kind": "npc",
    "text": "I almost wish I hadn't brought up the update.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C08-a-2": {
    "id": "OPEN-S04-FINAL-C08-a-2",
    "next": "OPEN-S04-FINAL-AFTER-08-1",
    "kind": "npc",
    "text": "I never thought to save one.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C08-a-1": {
    "id": "OPEN-S04-FINAL-C08-a-1",
    "next": "OPEN-S04-FINAL-C08-a-2",
    "kind": "npc",
    "text": "Not that I know of.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C08-b-2": {
    "id": "OPEN-S04-FINAL-C08-b-2",
    "next": "OPEN-S04-FINAL-AFTER-08-1",
    "kind": "npc",
    "text": "I don't trust myself to quote it word for word.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C08-b-1": {
    "id": "OPEN-S04-FINAL-C08-b-1",
    "next": "OPEN-S04-FINAL-C08-b-2",
    "kind": "npc",
    "text": "Honestly? Mostly being sick with worry when I read it.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C08-c-2": {
    "id": "OPEN-S04-FINAL-C08-c-2",
    "next": "OPEN-S04-FINAL-AFTER-08-1",
    "kind": "npc",
    "text": "I'd love it if the explanation was boring.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C08-c-1": {
    "id": "OPEN-S04-FINAL-C08-c-1",
    "next": "OPEN-S04-FINAL-C08-c-2",
    "kind": "npc",
    "text": "Could be.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C08-d-3": {
    "id": "OPEN-S04-FINAL-C08-d-3",
    "next": "OPEN-S04-FINAL-AFTER-08-1",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "trust": 1
      }
    }
  },
  "OPEN-S04-FINAL-C08-d-2": {
    "id": "OPEN-S04-FINAL-C08-d-2",
    "next": "OPEN-S04-FINAL-C08-d-3",
    "kind": "npc",
    "text": "The page is the page. My memory is something else.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C08-d-1": {
    "id": "OPEN-S04-FINAL-C08-d-1",
    "next": "OPEN-S04-FINAL-C08-d-2",
    "kind": "npc",
    "text": "Yeah.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-C08": {
    "id": "OPEN-S04-C08",
    "kind": "choice",
    "number": "A08",
    "choices": [
      {
        "id": "a",
        "text": "Do you have a screenshot from when it was published?",
        "next": "OPEN-S04-FINAL-C08-a-1"
      },
      {
        "id": "b",
        "text": "What do you remember about the earlier article?",
        "next": "OPEN-S04-FINAL-C08-b-1"
      },
      {
        "id": "c",
        "text": "Maybe the update was just spelling.",
        "next": "OPEN-S04-FINAL-C08-c-1"
      },
      {
        "id": "d",
        "text": "We should keep the current article separate from what you remember.",
        "next": "OPEN-S04-FINAL-C08-d-1"
      }
    ],
    "channel": "sophie"
  },
  "OPEN-S04-FINAL-AFTER-07-8": {
    "id": "OPEN-S04-FINAL-AFTER-07-8",
    "next": "OPEN-S04-GROUP-END",
    "kind": "wait",
    "duration": 2400,
    "typing": false,
    "actor": "lucas"
  },
  "OPEN-S04-FINAL-AFTER-07-7": {
    "id": "OPEN-S04-FINAL-AFTER-07-7",
    "next": "OPEN-S04-FINAL-AFTER-07-8",
    "kind": "npc",
    "text": "That's concerning.",
    "sender": "maya",
    "channel": "group",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-07-6": {
    "id": "OPEN-S04-FINAL-AFTER-07-6",
    "next": "OPEN-S04-FINAL-AFTER-07-7",
    "kind": "npc",
    "text": "Now you're sounding like me.",
    "sender": "sophie",
    "channel": "group",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-07-5": {
    "id": "OPEN-S04-FINAL-AFTER-07-5",
    "next": "OPEN-S04-FINAL-AFTER-07-6",
    "kind": "npc",
    "text": "I probably do, occasionally.",
    "sender": "maya",
    "channel": "group",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-07-4": {
    "id": "OPEN-S04-FINAL-AFTER-07-4",
    "next": "OPEN-S04-FINAL-AFTER-07-5",
    "kind": "npc",
    "text": "You don't need to explain.",
    "sender": "sophie",
    "channel": "group",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-07-3": {
    "id": "OPEN-S04-FINAL-AFTER-07-3",
    "next": "OPEN-S04-FINAL-AFTER-07-4",
    "kind": "npc",
    "text": "It's been a long couple of days.",
    "sender": "maya",
    "channel": "group",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-07-2": {
    "id": "OPEN-S04-FINAL-AFTER-07-2",
    "next": "OPEN-S04-FINAL-AFTER-07-3",
    "kind": "npc",
    "text": "Sorry if I sounded sharp.",
    "sender": "maya",
    "channel": "group",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-07-1": {
    "id": "OPEN-S04-FINAL-AFTER-07-1",
    "next": "OPEN-S04-FINAL-AFTER-07-2",
    "kind": "wait",
    "duration": 2500,
    "typing": false,
    "actor": "sophie"
  },
  "OPEN-S04-FINAL-C07-a-2": {
    "id": "OPEN-S04-FINAL-C07-a-2",
    "next": "OPEN-S04-FINAL-AFTER-07-1",
    "kind": "npc",
    "text": "People are treating a cautious article like a complete explanation.",
    "sender": "maya",
    "channel": "group",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C07-a-1": {
    "id": "OPEN-S04-FINAL-C07-a-1",
    "next": "OPEN-S04-FINAL-C07-a-2",
    "kind": "npc",
    "text": "That's what worries me.",
    "sender": "maya",
    "channel": "group",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C07-b-4": {
    "id": "OPEN-S04-FINAL-C07-b-4",
    "next": "OPEN-S04-FINAL-AFTER-07-1",
    "kind": "event",
    "event": "effects",
    "effects": {
      "maya": {
        "trust": 1
      }
    }
  },
  "OPEN-S04-FINAL-C07-b-3": {
    "id": "OPEN-S04-FINAL-C07-b-3",
    "next": "OPEN-S04-FINAL-C07-b-4",
    "kind": "npc",
    "text": "This has just been a lot.",
    "sender": "maya",
    "channel": "group",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C07-b-2": {
    "id": "OPEN-S04-FINAL-C07-b-2",
    "next": "OPEN-S04-FINAL-C07-b-3",
    "kind": "npc",
    "text": "I wasn't accusing you, by the way.",
    "sender": "maya",
    "channel": "group",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C07-b-1": {
    "id": "OPEN-S04-FINAL-C07-b-1",
    "next": "OPEN-S04-FINAL-C07-b-2",
    "kind": "npc",
    "text": "Thanks.",
    "sender": "maya",
    "channel": "group",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C07-c-3": {
    "id": "OPEN-S04-FINAL-C07-c-3",
    "next": "OPEN-S04-FINAL-AFTER-07-1",
    "kind": "npc",
    "text": "I'm asking the people in this group to be careful.",
    "sender": "maya",
    "channel": "group",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C07-c-2": {
    "id": "OPEN-S04-FINAL-C07-c-2",
    "next": "OPEN-S04-FINAL-C07-c-3",
    "kind": "npc",
    "text": "I'm not asking the whole internet to stop.",
    "sender": "maya",
    "channel": "group",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C07-c-1": {
    "id": "OPEN-S04-FINAL-C07-c-1",
    "next": "OPEN-S04-FINAL-C07-c-2",
    "kind": "npc",
    "text": "I know.",
    "sender": "maya",
    "channel": "group",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C07-d-3": {
    "id": "OPEN-S04-FINAL-C07-d-3",
    "next": "OPEN-S04-FINAL-AFTER-07-1",
    "kind": "npc",
    "text": "I just don't want another rumour for his family to deal with.",
    "sender": "maya",
    "channel": "group",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C07-d-2": {
    "id": "OPEN-S04-FINAL-C07-d-2",
    "next": "OPEN-S04-FINAL-C07-d-3",
    "kind": "npc",
    "text": "Of course not.",
    "sender": "maya",
    "channel": "group",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C07-d-1": {
    "id": "OPEN-S04-FINAL-C07-d-1",
    "next": "OPEN-S04-FINAL-C07-d-2",
    "kind": "wait",
    "duration": 2200,
    "typing": false,
    "actor": "sophie"
  },
  "OPEN-S04-FINAL-C07-e-5": {
    "id": "OPEN-S04-FINAL-C07-e-5",
    "next": "OPEN-S04-FINAL-AFTER-07-1",
    "kind": "event",
    "event": "effects",
    "effects": {
      "maya": {
        "trust": 2
      },
      "sophie": {
        "trust": 1
      }
    }
  },
  "OPEN-S04-FINAL-C07-e-4": {
    "id": "OPEN-S04-FINAL-C07-e-4",
    "next": "OPEN-S04-FINAL-C07-e-5",
    "kind": "npc",
    "text": "Then maybe we're making progress.",
    "sender": "maya",
    "channel": "group",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C07-e-3": {
    "id": "OPEN-S04-FINAL-C07-e-3",
    "next": "OPEN-S04-FINAL-C07-e-4",
    "kind": "npc",
    "text": "And what I've been trying to remember.",
    "sender": "sophie",
    "channel": "group",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C07-e-2": {
    "id": "OPEN-S04-FINAL-C07-e-2",
    "next": "OPEN-S04-FINAL-C07-e-3",
    "kind": "npc",
    "text": "That's what I was trying to say.",
    "sender": "maya",
    "channel": "group",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C07-e-1": {
    "id": "OPEN-S04-FINAL-C07-e-1",
    "next": "OPEN-S04-FINAL-C07-e-2",
    "kind": "npc",
    "text": "Thank you.",
    "sender": "maya",
    "channel": "group",
    "heardFacts": []
  },
  "OPEN-S04-C07": {
    "id": "OPEN-S04-C07",
    "kind": "choice",
    "number": "A07",
    "choices": [
      {
        "id": "a",
        "text": "I read it. It doesn't actually say they know what happened.",
        "next": "OPEN-S04-FINAL-C07-a-1"
      },
      {
        "id": "b",
        "text": "I haven't shared it publicly.",
        "next": "OPEN-S04-FINAL-C07-b-1"
      },
      {
        "id": "c",
        "text": "It's public. People are going to discuss it.",
        "next": "OPEN-S04-FINAL-C07-c-1"
      },
      {
        "id": "d",
        "text": "Would you rather nobody talked about Daniel?",
        "next": "OPEN-S04-FINAL-C07-d-1"
      },
      {
        "id": "e",
        "text": "The article isn't the same thing as a witness statement. We should be clear about that when we share it.",
        "next": "OPEN-S04-FINAL-C07-e-1",
        "premiumChoice": true
      }
    ],
    "channel": "group"
  },
  "OPEN-S04-GROUP-NOTICE": {
    "id": "OPEN-S04-GROUP-NOTICE",
    "kind": "event",
    "event": "s04-group-notice",
    "next": "OPEN-S04-GROUP-OFFER"
  },
  "OPEN-S04-FINAL-AFTER-06-5": {
    "id": "OPEN-S04-FINAL-AFTER-06-5",
    "next": "OPEN-S04-GROUP-NOTICE",
    "kind": "npc",
    "text": "I'm setting new personal records here.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-06-4": {
    "id": "OPEN-S04-FINAL-AFTER-06-4",
    "next": "OPEN-S04-FINAL-AFTER-06-5",
    "kind": "npc",
    "text": "Actually, this whole conversation is a pretty strange thing to ask someone I met through a contact list.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-06-3": {
    "id": "OPEN-S04-FINAL-AFTER-06-3",
    "next": "OPEN-S04-FINAL-AFTER-06-4",
    "kind": "wait",
    "duration": 2000,
    "typing": false,
    "actor": "sophie"
  },
  "OPEN-S04-FINAL-AFTER-06-2": {
    "id": "OPEN-S04-FINAL-AFTER-06-2",
    "next": "OPEN-S04-FINAL-AFTER-06-3",
    "kind": "npc",
    "text": "That would be a pretty strange thing to ask someone I met through a contact list.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-06-1": {
    "id": "OPEN-S04-FINAL-AFTER-06-1",
    "next": "OPEN-S04-FINAL-AFTER-06-2",
    "kind": "npc",
    "text": "I'm not asking you to investigate the newspaper.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C06-a-2": {
    "id": "OPEN-S04-FINAL-C06-a-2",
    "next": "OPEN-S04-FINAL-AFTER-06-1",
    "kind": "npc",
    "text": "News sites correct things all the time.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C06-a-1": {
    "id": "OPEN-S04-FINAL-C06-a-1",
    "next": "OPEN-S04-FINAL-C06-a-2",
    "kind": "npc",
    "text": "I know.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C06-b-2": {
    "id": "OPEN-S04-FINAL-C06-b-2",
    "next": "OPEN-S04-FINAL-AFTER-06-1",
    "kind": "npc",
    "text": "Maybe there's a note somewhere I missed.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C06-b-1": {
    "id": "OPEN-S04-FINAL-C06-b-1",
    "next": "OPEN-S04-FINAL-C06-b-2",
    "kind": "npc",
    "text": "Not where I could find it.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C06-c-3": {
    "id": "OPEN-S04-FINAL-C06-c-3",
    "next": "OPEN-S04-FINAL-AFTER-06-1",
    "kind": "npc",
    "text": "There's a difference.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C06-c-2": {
    "id": "OPEN-S04-FINAL-C06-c-2",
    "next": "OPEN-S04-FINAL-C06-c-3",
    "kind": "npc",
    "text": "I'm not sure what changed in the text.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C06-c-1": {
    "id": "OPEN-S04-FINAL-C06-c-1",
    "next": "OPEN-S04-FINAL-C06-c-2",
    "kind": "npc",
    "text": "I'm sure the page says it was updated.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C06-d-2": {
    "id": "OPEN-S04-FINAL-C06-d-2",
    "next": "OPEN-S04-FINAL-AFTER-06-1",
    "kind": "npc",
    "text": "But I'm not going to trust my memory over something I can actually check.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C06-d-1": {
    "id": "OPEN-S04-FINAL-C06-d-1",
    "next": "OPEN-S04-FINAL-C06-d-2",
    "kind": "npc",
    "text": "Maybe.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C06-e-5": {
    "id": "OPEN-S04-FINAL-C06-e-5",
    "next": "OPEN-S04-FINAL-AFTER-06-1",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "trust": 2
      }
    }
  },
  "OPEN-S04-FINAL-C06-e-4": {
    "id": "OPEN-S04-FINAL-C06-e-4",
    "next": "OPEN-S04-FINAL-C06-e-5",
    "kind": "npc",
    "text": "Not without something to compare.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C06-e-3": {
    "id": "OPEN-S04-FINAL-C06-e-3",
    "kind": "choice",
    "choices": [
      {
        "id": "continue",
        "text": "So we don't call it suspicious yet.",
        "next": "OPEN-S04-FINAL-C06-e-4"
      }
    ],
    "channel": "sophie"
  },
  "OPEN-S04-FINAL-C06-e-2": {
    "id": "OPEN-S04-FINAL-C06-e-2",
    "next": "OPEN-S04-FINAL-C06-e-3",
    "kind": "npc",
    "text": "That's the bit I keep forgetting when I'm upset.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C06-e-1": {
    "id": "OPEN-S04-FINAL-C06-e-1",
    "next": "OPEN-S04-FINAL-C06-e-2",
    "kind": "npc",
    "text": "Exactly.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-C06": {
    "id": "OPEN-S04-C06",
    "kind": "choice",
    "number": "A06",
    "choices": [
      {
        "id": "a",
        "text": "That could be a normal correction.",
        "next": "OPEN-S04-FINAL-C06-a-1"
      },
      {
        "id": "b",
        "text": "Does it say what was updated?",
        "next": "OPEN-S04-FINAL-C06-b-1"
      },
      {
        "id": "c",
        "text": "Are you sure it changed?",
        "next": "OPEN-S04-FINAL-C06-c-1"
      },
      {
        "id": "d",
        "text": "Maybe you remember an earlier version.",
        "next": "OPEN-S04-FINAL-C06-d-1"
      },
      {
        "id": "e",
        "text": "An update time tells us a revision happened on the site. It doesn't tell us what was edited, or why.",
        "next": "OPEN-S04-FINAL-C06-e-1",
        "premiumChoice": true
      }
    ],
    "channel": "sophie"
  },
  "OPEN-S04-FINAL-AFTER-05-6": {
    "id": "OPEN-S04-FINAL-AFTER-05-6",
    "next": "OPEN-S04-C06",
    "kind": "npc",
    "text": "I don't remember exactly what it said before.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-05-5": {
    "id": "OPEN-S04-FINAL-AFTER-05-5",
    "next": "OPEN-S04-FINAL-AFTER-05-6",
    "kind": "npc",
    "text": "It says \"Updated: Yesterday.\"",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-05-4": {
    "id": "OPEN-S04-FINAL-AFTER-05-4",
    "next": "OPEN-S04-FINAL-AFTER-05-5",
    "kind": "npc",
    "text": "I just keep noticing it.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-05-3": {
    "id": "OPEN-S04-FINAL-AFTER-05-3",
    "next": "OPEN-S04-FINAL-AFTER-05-4",
    "kind": "npc",
    "text": "Not because I think it's some giant secret.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-05-2": {
    "id": "OPEN-S04-FINAL-AFTER-05-2",
    "next": "OPEN-S04-FINAL-AFTER-05-3",
    "kind": "npc",
    "text": "There's one small thing about the page that bothers me.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-05-1": {
    "id": "OPEN-S04-FINAL-AFTER-05-1",
    "next": "OPEN-S04-FINAL-AFTER-05-2",
    "kind": "wait",
    "duration": 2400,
    "typing": false,
    "actor": "sophie"
  },
  "OPEN-S04-FINAL-C05-a-2": {
    "id": "OPEN-S04-FINAL-C05-a-2",
    "next": "OPEN-S04-FINAL-AFTER-05-1",
    "kind": "npc",
    "text": "That's fair.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C05-a-1": {
    "id": "OPEN-S04-FINAL-C05-a-1",
    "next": "OPEN-S04-FINAL-C05-a-2",
    "kind": "npc",
    "text": "Yeah.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C05-b-3": {
    "id": "OPEN-S04-FINAL-C05-b-3",
    "next": "OPEN-S04-FINAL-AFTER-05-1",
    "kind": "npc",
    "text": "Neither do we.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C05-b-2": {
    "id": "OPEN-S04-FINAL-C05-b-2",
    "next": "OPEN-S04-FINAL-C05-b-3",
    "kind": "npc",
    "text": "But the newspaper doesn't know everything from that.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C05-b-1": {
    "id": "OPEN-S04-FINAL-C05-b-1",
    "next": "OPEN-S04-FINAL-C05-b-2",
    "kind": "npc",
    "text": "We did report him missing.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C05-c-3": {
    "id": "OPEN-S04-FINAL-C05-c-3",
    "next": "OPEN-S04-FINAL-AFTER-05-1",
    "kind": "npc",
    "text": "I don't want to pretend that means his job caused any of this.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C05-c-2": {
    "id": "OPEN-S04-FINAL-C05-c-2",
    "next": "OPEN-S04-FINAL-C05-c-3",
    "kind": "npc",
    "text": "Usually when something had annoyed him at work.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C05-c-1": {
    "id": "OPEN-S04-FINAL-C05-c-1",
    "next": "OPEN-S04-FINAL-C05-c-2",
    "kind": "npc",
    "text": "Sometimes.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C05-d-3": {
    "id": "OPEN-S04-FINAL-C05-d-3",
    "next": "OPEN-S04-FINAL-AFTER-05-1",
    "kind": "npc",
    "text": "I won't guess at it for you.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C05-d-2": {
    "id": "OPEN-S04-FINAL-C05-d-2",
    "next": "OPEN-S04-FINAL-C05-d-3",
    "kind": "npc",
    "text": "We're still trying to understand the timeline ourselves.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C05-d-1": {
    "id": "OPEN-S04-FINAL-C05-d-1",
    "next": "OPEN-S04-FINAL-C05-d-2",
    "kind": "npc",
    "text": "Because there isn't a public account everyone agrees on.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C05-e-7": {
    "id": "OPEN-S04-FINAL-C05-e-7",
    "next": "OPEN-S04-FINAL-AFTER-05-1",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "trust": 2
      }
    }
  },
  "OPEN-S04-FINAL-C05-e-6": {
    "id": "OPEN-S04-FINAL-C05-e-6",
    "next": "OPEN-S04-FINAL-C05-e-7",
    "kind": "npc",
    "text": "It really doesn't.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C05-e-5": {
    "id": "OPEN-S04-FINAL-C05-e-5",
    "next": "OPEN-S04-FINAL-C05-e-6",
    "kind": "npc",
    "text": "No.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C05-e-4": {
    "id": "OPEN-S04-FINAL-C05-e-4",
    "kind": "choice",
    "choices": [
      {
        "id": "continue",
        "text": "Obvious doesn't mean easy when it's someone you love.",
        "next": "OPEN-S04-FINAL-C05-e-5"
      }
    ],
    "channel": "sophie"
  },
  "OPEN-S04-FINAL-C05-e-3": {
    "id": "OPEN-S04-FINAL-C05-e-3",
    "next": "OPEN-S04-FINAL-C05-e-4",
    "kind": "npc",
    "text": "That sounds so obvious when you put it like that.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C05-e-2": {
    "id": "OPEN-S04-FINAL-C05-e-2",
    "next": "OPEN-S04-FINAL-C05-e-3",
    "kind": "npc",
    "text": "Three different things.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C05-e-1": {
    "id": "OPEN-S04-FINAL-C05-e-1",
    "next": "OPEN-S04-FINAL-C05-e-2",
    "kind": "wait",
    "duration": 2500,
    "typing": false,
    "actor": "sophie"
  },
  "OPEN-S04-C05": {
    "id": "OPEN-S04-C05",
    "kind": "choice",
    "number": "A05",
    "choices": [
      {
        "id": "a",
        "text": "The article confirms people are worried. Not what happened.",
        "next": "OPEN-S04-FINAL-C05-a-1"
      },
      {
        "id": "b",
        "text": "It mentions a report to the police.",
        "next": "OPEN-S04-FINAL-C05-b-1"
      },
      {
        "id": "c",
        "text": "Did Daniel ever talk about Axiom Recovery?",
        "next": "OPEN-S04-FINAL-C05-c-1"
      },
      {
        "id": "d",
        "text": "Why does it say nobody knows where he was last seen?",
        "next": "OPEN-S04-FINAL-C05-d-1"
      },
      {
        "id": "e",
        "text": "I see three different things: what the article says, what the family has been told, and what we can actually verify.",
        "next": "OPEN-S04-FINAL-C05-e-1",
        "premiumChoice": true
      }
    ],
    "channel": "sophie"
  },
  "OPEN-S04-FINAL-AFTER-04-6": {
    "id": "OPEN-S04-FINAL-AFTER-04-6",
    "next": "OPEN-S04-C05",
    "kind": "npc",
    "text": "And then he'd insist I read the whole thing while I was trying to eat breakfast.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-04-5": {
    "id": "OPEN-S04-FINAL-AFTER-04-5",
    "next": "OPEN-S04-FINAL-AFTER-04-6",
    "kind": "npc",
    "text": "He'd have a field day with this one.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-04-4": {
    "id": "OPEN-S04-FINAL-AFTER-04-4",
    "next": "OPEN-S04-FINAL-AFTER-04-5",
    "kind": "wait",
    "duration": 1800,
    "typing": false,
    "actor": "sophie"
  },
  "OPEN-S04-FINAL-AFTER-04-3": {
    "id": "OPEN-S04-FINAL-AFTER-04-3",
    "next": "OPEN-S04-FINAL-AFTER-04-4",
    "kind": "npc",
    "text": "He'd read one out and then go, \"Well, that's not what the article says.\"",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-04-2": {
    "id": "OPEN-S04-FINAL-AFTER-04-2",
    "next": "OPEN-S04-FINAL-AFTER-04-3",
    "kind": "npc",
    "text": "Not in a mean way.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-04-1": {
    "id": "OPEN-S04-FINAL-AFTER-04-1",
    "next": "OPEN-S04-FINAL-AFTER-04-2",
    "kind": "npc",
    "text": "Daniel used to make fun of newspaper headlines.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C04-a-2": {
    "id": "OPEN-S04-FINAL-C04-a-2",
    "next": "OPEN-S04-FINAL-AFTER-04-1",
    "kind": "npc",
    "text": "I don't remember the last time I heard a notification and wasn't disappointed.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C04-a-1": {
    "id": "OPEN-S04-FINAL-C04-a-1",
    "next": "OPEN-S04-FINAL-C04-a-2",
    "kind": "npc",
    "text": "It is.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C04-b-2": {
    "id": "OPEN-S04-FINAL-C04-b-2",
    "next": "OPEN-S04-FINAL-AFTER-04-1",
    "kind": "npc",
    "text": "I'm doing better than yesterday. I think.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C04-b-1": {
    "id": "OPEN-S04-FINAL-C04-b-1",
    "next": "OPEN-S04-FINAL-C04-b-2",
    "kind": "npc",
    "text": "Maybe after we finish talking.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C04-c-3": {
    "id": "OPEN-S04-FINAL-C04-c-3",
    "next": "OPEN-S04-FINAL-AFTER-04-1",
    "kind": "npc",
    "text": "Sorry. See? 😅",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C04-c-2": {
    "id": "OPEN-S04-FINAL-C04-c-2",
    "next": "OPEN-S04-FINAL-C04-c-3",
    "kind": "npc",
    "text": "Apparently apologizing is my main personality trait now.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C04-c-1": {
    "id": "OPEN-S04-FINAL-C04-c-1",
    "next": "OPEN-S04-FINAL-C04-c-2",
    "kind": "npc",
    "text": "I know.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C04-d-3": {
    "id": "OPEN-S04-FINAL-C04-d-3",
    "next": "OPEN-S04-FINAL-AFTER-04-1",
    "kind": "npc",
    "text": "I haven't contacted her.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C04-d-2": {
    "id": "OPEN-S04-FINAL-C04-d-2",
    "next": "OPEN-S04-FINAL-C04-d-3",
    "kind": "npc",
    "text": "Not that anyone's told me.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C04-d-1": {
    "id": "OPEN-S04-FINAL-C04-d-1",
    "next": "OPEN-S04-FINAL-C04-d-2",
    "kind": "npc",
    "text": "I don't know.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-C04": {
    "id": "OPEN-S04-C04",
    "kind": "choice",
    "number": "A04",
    "choices": [
      {
        "id": "a",
        "text": "That must be exhausting.",
        "next": "OPEN-S04-FINAL-C04-a-1"
      },
      {
        "id": "b",
        "text": "Do you want to take a break from this?",
        "next": "OPEN-S04-FINAL-C04-b-1"
      },
      {
        "id": "c",
        "text": "You don't have to apologize to me.",
        "next": "OPEN-S04-FINAL-C04-c-1"
      },
      {
        "id": "d",
        "text": "Has anyone actually spoken to the reporter?",
        "next": "OPEN-S04-FINAL-C04-d-1"
      }
    ],
    "channel": "sophie"
  },
  "OPEN-S04-FINAL-AFTER-03-7": {
    "id": "OPEN-S04-FINAL-AFTER-03-7",
    "next": "OPEN-S04-C04",
    "kind": "wait",
    "duration": 3000,
    "typing": false,
    "actor": "sophie"
  },
  "OPEN-S04-FINAL-AFTER-03-6": {
    "id": "OPEN-S04-FINAL-AFTER-03-6",
    "next": "OPEN-S04-FINAL-AFTER-03-7",
    "kind": "npc",
    "text": "For half a second I'd think it might be Daniel.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-03-5": {
    "id": "OPEN-S04-FINAL-AFTER-03-5",
    "next": "OPEN-S04-FINAL-AFTER-03-6",
    "kind": "npc",
    "text": "Sorry.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-03-4": {
    "id": "OPEN-S04-FINAL-AFTER-03-4",
    "next": "OPEN-S04-FINAL-AFTER-03-5",
    "kind": "wait",
    "duration": 2900,
    "typing": true,
    "actor": "sophie"
  },
  "OPEN-S04-FINAL-AFTER-03-3": {
    "id": "OPEN-S04-FINAL-AFTER-03-3",
    "next": "OPEN-S04-FINAL-AFTER-03-4",
    "kind": "npc",
    "text": "My phone would light up and I'd think—",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-03-2": {
    "id": "OPEN-S04-FINAL-AFTER-03-2",
    "next": "OPEN-S04-FINAL-AFTER-03-3",
    "kind": "npc",
    "text": "As if I hadn't seen it.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-03-1": {
    "id": "OPEN-S04-FINAL-AFTER-03-1",
    "next": "OPEN-S04-FINAL-AFTER-03-2",
    "kind": "npc",
    "text": "When it first started going around, people kept sending it to me.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C03-a-2": {
    "id": "OPEN-S04-FINAL-C03-a-2",
    "next": "OPEN-S04-FINAL-AFTER-03-1",
    "kind": "npc",
    "text": "It sounds like someone knows what happened until you actually read it.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C03-a-1": {
    "id": "OPEN-S04-FINAL-C03-a-1",
    "next": "OPEN-S04-FINAL-C03-a-2",
    "kind": "npc",
    "text": "That's how I felt.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C03-b-3": {
    "id": "OPEN-S04-FINAL-C03-b-3",
    "next": "OPEN-S04-FINAL-AFTER-03-1",
    "kind": "npc",
    "text": "It could have been much worse.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C03-b-2": {
    "id": "OPEN-S04-FINAL-C03-b-2",
    "next": "OPEN-S04-FINAL-C03-b-3",
    "kind": "npc",
    "text": "I'm relieved about that.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C03-b-1": {
    "id": "OPEN-S04-FINAL-C03-b-1",
    "next": "OPEN-S04-FINAL-C03-b-2",
    "kind": "npc",
    "text": "Yeah.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C03-c-4": {
    "id": "OPEN-S04-FINAL-C03-c-4",
    "next": "OPEN-S04-FINAL-AFTER-03-1",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "trust": 1
      }
    }
  },
  "OPEN-S04-FINAL-C03-c-3": {
    "id": "OPEN-S04-FINAL-C03-c-3",
    "next": "OPEN-S04-FINAL-C03-c-4",
    "kind": "npc",
    "text": "Reading about somebody you know like they're a stranger.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C03-c-2": {
    "id": "OPEN-S04-FINAL-C03-c-2",
    "next": "OPEN-S04-FINAL-C03-c-3",
    "kind": "npc",
    "text": "It's weird, isn't it?",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C03-c-1": {
    "id": "OPEN-S04-FINAL-C03-c-1",
    "next": "OPEN-S04-FINAL-C03-c-2",
    "kind": "wait",
    "duration": 2400,
    "typing": false,
    "actor": "sophie"
  },
  "OPEN-S04-FINAL-C03-d-3": {
    "id": "OPEN-S04-FINAL-C03-d-3",
    "next": "OPEN-S04-FINAL-AFTER-03-1",
    "kind": "npc",
    "text": "I just hate that this is what people know about him.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C03-d-2": {
    "id": "OPEN-S04-FINAL-C03-d-2",
    "next": "OPEN-S04-FINAL-C03-d-3",
    "kind": "npc",
    "text": "I don't think Nora wrote it to hurt us.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C03-d-1": {
    "id": "OPEN-S04-FINAL-C03-d-1",
    "next": "OPEN-S04-FINAL-C03-d-2",
    "kind": "npc",
    "text": "Maybe it is.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C03-e-7": {
    "id": "OPEN-S04-FINAL-C03-e-7",
    "next": "OPEN-S04-FINAL-AFTER-03-1",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "trust": 2
      }
    }
  },
  "OPEN-S04-FINAL-C03-e-6": {
    "id": "OPEN-S04-FINAL-C03-e-6",
    "next": "OPEN-S04-FINAL-C03-e-7",
    "kind": "npc",
    "text": "Preferably where I can see it when I start spiralling.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C03-e-5": {
    "id": "OPEN-S04-FINAL-C03-e-5",
    "next": "OPEN-S04-FINAL-C03-e-6",
    "kind": "npc",
    "text": "I should put that on a sticky note.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C03-e-4": {
    "id": "OPEN-S04-FINAL-C03-e-4",
    "next": "OPEN-S04-FINAL-C03-e-5",
    "kind": "wait",
    "duration": 2500,
    "typing": false,
    "actor": "sophie"
  },
  "OPEN-S04-FINAL-C03-e-3": {
    "id": "OPEN-S04-FINAL-C03-e-3",
    "kind": "choice",
    "choices": [
      {
        "id": "continue",
        "text": "Wanting it to be clearer doesn't make it clearer.",
        "next": "OPEN-S04-FINAL-C03-e-4"
      }
    ],
    "channel": "sophie"
  },
  "OPEN-S04-FINAL-C03-e-2": {
    "id": "OPEN-S04-FINAL-C03-e-2",
    "next": "OPEN-S04-FINAL-C03-e-3",
    "kind": "npc",
    "text": "I keep wanting it to say more than it does.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C03-e-1": {
    "id": "OPEN-S04-FINAL-C03-e-1",
    "next": "OPEN-S04-FINAL-C03-e-2",
    "kind": "npc",
    "text": "Right.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-C03": {
    "id": "OPEN-S04-C03",
    "kind": "choice",
    "number": "A03",
    "choices": [
      {
        "id": "a",
        "text": "It says less than the headline makes you expect.",
        "next": "OPEN-S04-FINAL-C03-a-1"
      },
      {
        "id": "b",
        "text": "At least they're not accusing anyone.",
        "next": "OPEN-S04-FINAL-C03-b-1"
      },
      {
        "id": "c",
        "text": "I can see why it upset you.",
        "next": "OPEN-S04-FINAL-C03-c-1"
      },
      {
        "id": "d",
        "text": "It seems like a fairly careful article.",
        "next": "OPEN-S04-FINAL-C03-d-1"
      },
      {
        "id": "e",
        "text": "The article separates what's reported from what's confirmed. That matters, even if it doesn't give us an answer.",
        "next": "OPEN-S04-FINAL-C03-e-1",
        "premiumChoice": true
      }
    ],
    "channel": "sophie"
  },
  "OPEN-S04-FINAL-AFTER-02-4": {
    "id": "OPEN-S04-FINAL-AFTER-02-4",
    "next": "OPEN-S04-ARTICLE-GATE",
    "kind": "npc",
    "text": "Not just the headline.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-02-3": {
    "id": "OPEN-S04-FINAL-AFTER-02-3",
    "next": "OPEN-S04-FINAL-AFTER-02-4",
    "kind": "npc",
    "text": "Please read the whole thing if you can.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-02-2": {
    "id": "OPEN-S04-FINAL-AFTER-02-2",
    "next": "OPEN-S04-FINAL-AFTER-02-3",
    "kind": "npc",
    "text": "Here.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-02-1": {
    "id": "OPEN-S04-FINAL-AFTER-02-1",
    "next": "OPEN-S04-FINAL-AFTER-02-2",
    "kind": "wait",
    "duration": 1500,
    "typing": true,
    "actor": "sophie"
  },
  "OPEN-S04-FINAL-C02-a-2": {
    "id": "OPEN-S04-FINAL-C02-a-2",
    "next": "OPEN-S04-FINAL-AFTER-02-1",
    "kind": "npc",
    "text": "Give me a second.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C02-a-1": {
    "id": "OPEN-S04-FINAL-C02-a-1",
    "next": "OPEN-S04-FINAL-C02-a-2",
    "kind": "npc",
    "text": "Talking around something instead of just showing it to you.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C02-b-3": {
    "id": "OPEN-S04-FINAL-C02-b-3",
    "next": "OPEN-S04-FINAL-AFTER-02-1",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "affinity": 1
      }
    }
  },
  "OPEN-S04-FINAL-C02-b-2": {
    "id": "OPEN-S04-FINAL-C02-b-2",
    "next": "OPEN-S04-FINAL-C02-b-3",
    "kind": "npc",
    "text": "I just don't want how I feel to tell you what the article says.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C02-b-1": {
    "id": "OPEN-S04-FINAL-C02-b-1",
    "next": "OPEN-S04-FINAL-C02-b-2",
    "kind": "npc",
    "text": "I know.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C02-c-2": {
    "id": "OPEN-S04-FINAL-C02-c-2",
    "next": "OPEN-S04-FINAL-AFTER-02-1",
    "kind": "npc",
    "text": "What people think they know about it, anyway.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C02-c-1": {
    "id": "OPEN-S04-FINAL-C02-c-1",
    "next": "OPEN-S04-FINAL-C02-c-2",
    "kind": "npc",
    "text": "Yes.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C02-d-2": {
    "id": "OPEN-S04-FINAL-C02-d-2",
    "next": "OPEN-S04-FINAL-AFTER-02-1",
    "kind": "npc",
    "text": "But I think it matters that you see it yourself.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C02-d-1": {
    "id": "OPEN-S04-FINAL-C02-d-1",
    "next": "OPEN-S04-FINAL-C02-d-2",
    "kind": "npc",
    "text": "We can take it slowly.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-C02": {
    "id": "OPEN-S04-C02",
    "kind": "choice",
    "number": "A02",
    "choices": [
      {
        "id": "a",
        "text": "What thing?",
        "next": "OPEN-S04-FINAL-C02-a-1"
      },
      {
        "id": "b",
        "text": "It's about Daniel. You're allowed to feel something.",
        "next": "OPEN-S04-FINAL-C02-b-1"
      },
      {
        "id": "c",
        "text": "You said it's public. Is it about his disappearance?",
        "next": "OPEN-S04-FINAL-C02-c-1"
      },
      {
        "id": "d",
        "text": "If it's upsetting you, maybe we should leave it.",
        "next": "OPEN-S04-FINAL-C02-d-1"
      }
    ],
    "channel": "sophie"
  },
  "OPEN-S04-FINAL-AFTER-01-7": {
    "id": "OPEN-S04-FINAL-AFTER-01-7",
    "next": "OPEN-S04-C02",
    "kind": "npc",
    "text": "Sorry. I'm doing that thing again.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-01-6": {
    "id": "OPEN-S04-FINAL-AFTER-01-6",
    "next": "OPEN-S04-FINAL-AFTER-01-7",
    "kind": "wait",
    "duration": 2700,
    "typing": false,
    "actor": "sophie"
  },
  "OPEN-S04-FINAL-AFTER-01-5": {
    "id": "OPEN-S04-FINAL-AFTER-01-5",
    "next": "OPEN-S04-FINAL-AFTER-01-6",
    "kind": "npc",
    "text": "And somehow it all fits into one article.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-01-4": {
    "id": "OPEN-S04-FINAL-AFTER-01-4",
    "next": "OPEN-S04-FINAL-AFTER-01-5",
    "kind": "npc",
    "text": "People who love him. Things he hates. A stupid mug he refuses to throw away.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-01-3": {
    "id": "OPEN-S04-FINAL-AFTER-01-3",
    "next": "OPEN-S04-FINAL-AFTER-01-4",
    "kind": "npc",
    "text": "My brother has a whole life.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-AFTER-01-2": {
    "id": "OPEN-S04-FINAL-AFTER-01-2",
    "next": "OPEN-S04-FINAL-AFTER-01-3",
    "kind": "wait",
    "duration": 1900,
    "typing": false,
    "actor": "sophie"
  },
  "OPEN-S04-FINAL-AFTER-01-1": {
    "id": "OPEN-S04-FINAL-AFTER-01-1",
    "next": "OPEN-S04-FINAL-AFTER-01-2",
    "kind": "npc",
    "text": "Do you know what the worst part is?",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C01-a-2": {
    "id": "OPEN-S04-FINAL-C01-a-2",
    "next": "OPEN-S04-FINAL-AFTER-01-1",
    "kind": "npc",
    "text": "I don't know why a web page feels so difficult to send.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C01-a-1": {
    "id": "OPEN-S04-FINAL-C01-a-1",
    "next": "OPEN-S04-FINAL-C01-a-2",
    "kind": "npc",
    "text": "Thanks.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C01-b-3": {
    "id": "OPEN-S04-FINAL-C01-b-3",
    "next": "OPEN-S04-FINAL-AFTER-01-1",
    "kind": "npc",
    "text": "Maya would call that progress.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C01-b-2": {
    "id": "OPEN-S04-FINAL-C01-b-2",
    "next": "OPEN-S04-FINAL-C01-b-3",
    "kind": "npc",
    "text": "Well. In the very technical sense that I'm sitting here drinking tea.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C01-b-1": {
    "id": "OPEN-S04-FINAL-C01-b-1",
    "next": "OPEN-S04-FINAL-C01-b-2",
    "kind": "npc",
    "text": "I'm okay.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C01-c-3": {
    "id": "OPEN-S04-FINAL-C01-c-3",
    "next": "OPEN-S04-FINAL-AFTER-01-1",
    "kind": "npc",
    "text": "But I said I'd show you. I want you to see what people are reading.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C01-c-2": {
    "id": "OPEN-S04-FINAL-C01-c-2",
    "next": "OPEN-S04-FINAL-C01-c-3",
    "kind": "npc",
    "text": "I know.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C01-c-1": {
    "id": "OPEN-S04-FINAL-C01-c-1",
    "next": "OPEN-S04-FINAL-C01-c-2",
    "kind": "wait",
    "duration": 2300,
    "typing": false,
    "actor": "sophie"
  },
  "OPEN-S04-FINAL-C01-d-3": {
    "id": "OPEN-S04-FINAL-C01-d-3",
    "next": "OPEN-S04-FINAL-AFTER-01-1",
    "kind": "npc",
    "text": "I'm trying.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C01-d-2": {
    "id": "OPEN-S04-FINAL-C01-d-2",
    "next": "OPEN-S04-FINAL-C01-d-3",
    "kind": "npc",
    "text": "Not enough for Maya to stop asking. 😅",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C01-d-1": {
    "id": "OPEN-S04-FINAL-C01-d-1",
    "next": "OPEN-S04-FINAL-C01-d-2",
    "kind": "npc",
    "text": "Some.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C01-e-7": {
    "id": "OPEN-S04-FINAL-C01-e-7",
    "next": "OPEN-S04-FINAL-AFTER-01-1",
    "kind": "event",
    "event": "effects",
    "effects": {
      "sophie": {
        "trust": 2
      }
    }
  },
  "OPEN-S04-FINAL-C01-e-6": {
    "id": "OPEN-S04-FINAL-C01-e-6",
    "next": "OPEN-S04-FINAL-C01-e-7",
    "kind": "npc",
    "text": "Okay. That's all I wanted.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C01-e-5": {
    "id": "OPEN-S04-FINAL-C01-e-5",
    "kind": "choice",
    "choices": [
      {
        "id": "continue",
        "text": "Then I'll read it properly.",
        "next": "OPEN-S04-FINAL-C01-e-6"
      }
    ],
    "channel": "sophie"
  },
  "OPEN-S04-FINAL-C01-e-4": {
    "id": "OPEN-S04-FINAL-C01-e-4",
    "next": "OPEN-S04-FINAL-C01-e-5",
    "kind": "npc",
    "text": "Even if part of me really wants to tell you what I think first.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C01-e-3": {
    "id": "OPEN-S04-FINAL-C01-e-3",
    "next": "OPEN-S04-FINAL-C01-e-4",
    "kind": "npc",
    "text": "It does.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C01-e-2": {
    "id": "OPEN-S04-FINAL-C01-e-2",
    "next": "OPEN-S04-FINAL-C01-e-3",
    "kind": "npc",
    "text": "Yeah.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-C01-e-1": {
    "id": "OPEN-S04-FINAL-C01-e-1",
    "next": "OPEN-S04-FINAL-C01-e-2",
    "kind": "wait",
    "duration": 3000,
    "typing": false,
    "actor": "sophie"
  },
  "OPEN-S04-C01": {
    "id": "OPEN-S04-C01",
    "kind": "choice",
    "number": "A01",
    "choices": [
      {
        "id": "a",
        "text": "It doesn't. Send it when you're ready.",
        "next": "OPEN-S04-FINAL-C01-a-1"
      },
      {
        "id": "b",
        "text": "Is everything okay?",
        "next": "OPEN-S04-FINAL-C01-b-1"
      },
      {
        "id": "c",
        "text": "You don't have to send it.",
        "next": "OPEN-S04-FINAL-C01-c-1"
      },
      {
        "id": "d",
        "text": "Did you manage to get any sleep?",
        "next": "OPEN-S04-FINAL-C01-d-1"
      },
      {
        "id": "e",
        "text": "Yesterday you said you wanted me to read it without telling me what to think. Does that still stand?",
        "next": "OPEN-S04-FINAL-C01-e-1",
        "premiumChoice": true
      }
    ],
    "channel": "sophie"
  },
  "OPEN-S04-FINAL-OPENING-8": {
    "id": "OPEN-S04-FINAL-OPENING-8",
    "next": "OPEN-S04-C01",
    "kind": "npc",
    "text": "Which probably sounds ridiculous.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-OPENING-7": {
    "id": "OPEN-S04-FINAL-OPENING-7",
    "next": "OPEN-S04-FINAL-OPENING-8",
    "kind": "npc",
    "text": "I was going to send it earlier, but I kept opening it and closing it.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-OPENING-6": {
    "id": "OPEN-S04-FINAL-OPENING-6",
    "next": "OPEN-S04-FINAL-OPENING-7",
    "kind": "wait",
    "duration": 2100,
    "typing": false,
    "actor": "sophie"
  },
  "OPEN-S04-FINAL-OPENING-5": {
    "id": "OPEN-S04-FINAL-OPENING-5",
    "next": "OPEN-S04-FINAL-OPENING-6",
    "kind": "npc",
    "text": "The one I said I'd send you.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-OPENING-4": {
    "id": "OPEN-S04-FINAL-OPENING-4",
    "next": "OPEN-S04-FINAL-OPENING-5",
    "kind": "npc",
    "text": "I found the link.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  },
  "OPEN-S04-FINAL-OPENING-3": {
    "id": "OPEN-S04-FINAL-OPENING-3",
    "next": "OPEN-S04-FINAL-OPENING-4",
    "kind": "wait",
    "duration": 1300,
    "typing": false,
    "actor": "sophie"
  },
  "OPEN-S04-FINAL-OPENING-2": {
    "id": "OPEN-S04-FINAL-OPENING-2",
    "next": "OPEN-S04-FINAL-OPENING-3",
    "kind": "wait",
    "duration": 2000,
    "typing": false,
    "actor": "sophie"
  },
  "OPEN-S04-FINAL-OPENING-1": {
    "id": "OPEN-S04-FINAL-OPENING-1",
    "next": "OPEN-S04-FINAL-OPENING-2",
    "kind": "npc",
    "text": "Hey.",
    "sender": "sophie",
    "channel": "sophie",
    "heardFacts": []
  }
}
export const scene04Entrances = {
  "opening": "OPEN-S04-FINAL-OPENING-1",
  "group": "OPEN-S04-FINAL-GROUP-OPENING-1"
} as const
export const scene04Article = {
  "id": "GB-ARTICLE-001",
  "title": "Questions Remain After Greyhaven Data Specialist Stops Responding",
  "subtitle": "Concern grows among those close to Daniel Mercer as basic details remain unclear.",
  "byline": "Nora Vance",
  "publisher": "Greyhaven Bulletin",
  "published": "7 October 2026",
  "updated": "Yesterday",
  "route": "browser://greyhaven-bulletin/article/gb-daniel-mercer-001",
  "paragraphs": [
    "Daniel Mercer, a data specialist employed by Axiom Recovery, has not responded to attempts to contact him in recent days, according to people who know him.",
    "Those close to Mercer describe his silence as unusual. Attempts to reach him by phone and message have reportedly gone unanswered, though no public account has established where he was last seen.",
    "A member of Mercer's family says a missing-person report has been filed. Authorities have not released a public account explaining his whereabouts. The Bulletin has not independently confirmed the circumstances of his absence.",
    "Axiom Recovery has not provided a comment in response to the Bulletin's request. It is not clear whether Mercer's work is relevant to his absence.",
    "Online speculation has offered conflicting explanations. None of those claims has been independently substantiated, and there is currently no verified basis to name a person responsible.",
    "Those with credible information are encouraged to contact the appropriate authorities. This report may be updated as further facts can be verified."
  ]
} as const
export const scene04Manifest = [
  {
    "id": "OPEN-S04-C01",
    "branches": 5,
    "premium": 1
  },
  {
    "id": "OPEN-S04-C02",
    "branches": 4,
    "premium": 0
  },
  {
    "id": "OPEN-S04-C03",
    "branches": 5,
    "premium": 1
  },
  {
    "id": "OPEN-S04-C04",
    "branches": 4,
    "premium": 0
  },
  {
    "id": "OPEN-S04-C05",
    "branches": 5,
    "premium": 1
  },
  {
    "id": "OPEN-S04-C06",
    "branches": 5,
    "premium": 1
  },
  {
    "id": "OPEN-S04-C07",
    "branches": 5,
    "premium": 1
  },
  {
    "id": "OPEN-S04-C08",
    "branches": 4,
    "premium": 0
  },
  {
    "id": "OPEN-S04-C09",
    "branches": 5,
    "premium": 1
  },
  {
    "id": "OPEN-S04-C10",
    "branches": 4,
    "premium": 0
  },
  {
    "id": "OPEN-S04-C11",
    "branches": 4,
    "premium": 0
  },
  {
    "id": "OPEN-S04-C12",
    "branches": 4,
    "premium": 0
  },
  {
    "id": "OPEN-S04-C13",
    "branches": 5,
    "premium": 1
  },
  {
    "id": "OPEN-S04-C14",
    "branches": 5,
    "premium": 1
  },
  {
    "id": "OPEN-S04-C15",
    "branches": 4,
    "premium": 0
  },
  {
    "id": "OPEN-S04-C16",
    "branches": 5,
    "premium": 1
  }
] as const
export const scene04Notices = {
  "group": {
    "id": "scene04_group_article_boundary",
    "text": "Can we please stop sharing the article in other chats for a while?"
  },
  "sender": {
    "id": "scene04_sender_version_hint",
    "text": "The version you're reading isn't the first."
  },
  "archive": {
    "id": "scene04_archive_index_available",
    "text": "1 recovered index reference available."
  },
  "lead": {
    "actor": "sophie",
    "text": "I found that article. The one I mentioned."
  },
  "followup": {
    "actor": "sophie",
    "text": "One more thing, if you're still awake."
  }
} as const
export const scene04Index = {
  "id": "ARC-IDX-GB-041",
  "fields": [
    [
      "TYPE",
      "SNAPSHOT INDEX"
    ],
    [
      "SOURCE",
      "UNKNOWN"
    ],
    [
      "CAPTURE TIME",
      "NOT ESTABLISHED"
    ],
    [
      "AUTHOR",
      "NOT ESTABLISHED"
    ],
    [
      "VERIFIED ORIGINAL",
      "NO"
    ],
    [
      "CONTENT PREVIEW",
      "UNAVAILABLE IN THIS INDEX VIEW"
    ]
  ],
  "limitations": "A saved reference may point to an earlier or different version. This record alone cannot establish sequence, authenticity, or who created it."
} as const
