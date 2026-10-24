// Exact owner screenplay imported by scripts/import-scene03.py.
export const scene03Script = {
  "opening": [
    {
      "speaker": "wait",
      "duration": 1500,
      "typing": false
    },
    {
      "speaker": "sophie",
      "text": "It's me."
    },
    {
      "speaker": "sophie",
      "text": "Obviously."
    },
    {
      "speaker": "sophie",
      "text": "Not sure why I felt the need to clarify that 😅"
    },
    {
      "speaker": "wait",
      "duration": 2000,
      "typing": false
    },
    {
      "speaker": "sophie",
      "text": "Sorry about what happened back there."
    },
    {
      "speaker": "sophie",
      "text": "That was..."
    },
    {
      "speaker": "wait",
      "duration": 2000,
      "typing": true
    },
    {
      "speaker": "sophie",
      "text": "Well, you've seen it."
    }
  ],
  "choices": [
    {
      "id": "01",
      "choices": [
        {
          "id": "a",
          "text": "Yeah. That was pretty intense.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "That's one word for it."
            },
            {
              "speaker": "sophie",
              "text": "And you caught us on a relatively good day."
            },
            {
              "speaker": "wait",
              "duration": 2000,
              "typing": false
            },
            {
              "speaker": "sophie",
              "text": "Kidding."
            },
            {
              "speaker": "sophie",
              "text": "Mostly."
            }
          ]
        },
        {
          "id": "b",
          "text": "It's okay. Everyone's stressed.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "Yeah."
            },
            {
              "speaker": "sophie",
              "text": "I think we're all getting worse at handling it."
            },
            {
              "speaker": "sophie",
              "text": "Still doesn't make what happened fair to you."
            }
          ],
          "effects": {
            "trust": 2
          }
        },
        {
          "id": "c",
          "text": "Lucas really doesn't like me, does he?",
          "turns": [
            {
              "speaker": "sophie",
              "text": "I wouldn't take it personally."
            },
            {
              "speaker": "sophie",
              "text": "I know that's easy for me to say."
            },
            {
              "speaker": "sophie",
              "text": "But I don't think it's about you specifically."
            },
            {
              "speaker": "sophie",
              "text": "He doesn't deal well with things he can't control."
            }
          ]
        },
        {
          "id": "d",
          "text": "I still don't understand why you added me.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "I know."
            },
            {
              "speaker": "sophie",
              "text": "And I haven't done a great job explaining it."
            },
            {
              "speaker": "sophie",
              "text": "I thought I'd have time to explain before things got messy."
            },
            {
              "speaker": "sophie",
              "text": "Clearly, that didn't happen."
            }
          ]
        },
        {
          "id": "e",
          "text": "You don't need to apologize for everyone. But I think you owe me an explanation.",
          "turns": [
            {
              "speaker": "wait",
              "duration": 3000,
              "typing": false
            },
            {
              "speaker": "sophie",
              "text": "..."
            },
            {
              "speaker": "sophie",
              "text": "Yeah."
            },
            {
              "speaker": "sophie",
              "text": "You're right."
            },
            {
              "speaker": "sophie",
              "text": "You came here because I asked you to."
            },
            {
              "speaker": "sophie",
              "text": "Then you had to sit through all of that without even knowing what was going on."
            },
            {
              "speaker": "wait",
              "duration": 2000,
              "typing": false
            },
            {
              "speaker": "sophie",
              "text": "Honestly?"
            },
            {
              "speaker": "sophie",
              "text": "I would've left."
            },
            {
              "speaker": "sophie",
              "text": "Probably after Lucas's first message."
            },
            {
              "speaker": "sophie",
              "text": "So... thank you for staying."
            }
          ],
          "premiumChoice": true,
          "effects": {
            "trust": 3
          }
        }
      ],
      "after": [
        {
          "speaker": "sophie",
          "text": "Okay."
        },
        {
          "speaker": "sophie",
          "text": "Let's start over."
        },
        {
          "speaker": "sophie",
          "text": "Properly this time."
        },
        {
          "speaker": "sophie",
          "text": "There's something I should've told you before I added you."
        },
        {
          "speaker": "sophie",
          "text": "Daniel isn't just someone I know."
        },
        {
          "speaker": "wait",
          "duration": 2000,
          "typing": false
        },
        {
          "speaker": "sophie",
          "text": "He's my brother."
        },
        {
          "speaker": "sophie",
          "text": "My older brother, actually."
        },
        {
          "speaker": "wait",
          "duration": 2000,
          "typing": true
        },
        {
          "speaker": "sophie",
          "text": "Daniel Mercer."
        },
        {
          "speaker": "sophie",
          "text": "I guess I should've mentioned that earlier."
        }
      ]
    },
    {
      "id": "02",
      "choices": [
        {
          "id": "a",
          "text": "Wait. Daniel's your brother?",
          "turns": [
            {
              "speaker": "sophie",
              "text": "Yeah."
            },
            {
              "speaker": "sophie",
              "text": "Sorry."
            },
            {
              "speaker": "sophie",
              "text": "I keep forgetting you don't know anything about us."
            },
            {
              "speaker": "sophie",
              "text": "I've spent days talking to people who already know him."
            }
          ]
        },
        {
          "id": "b",
          "text": "That explains why you're so worried.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "I suppose it does."
            },
            {
              "speaker": "sophie",
              "text": "Though I don't think you have to be family to worry about someone."
            },
            {
              "speaker": "sophie",
              "text": "I just can't switch it off."
            }
          ]
        },
        {
          "id": "c",
          "text": "Why didn't you tell me that before?",
          "turns": [
            {
              "speaker": "sophie",
              "text": "Honestly?"
            },
            {
              "speaker": "sophie",
              "text": "I wasn't sure how much I should tell you."
            },
            {
              "speaker": "sophie",
              "text": "Then I got caught up explaining the number."
            },
            {
              "speaker": "sophie",
              "text": "Somehow I skipped the part that actually explains why I'm doing this."
            }
          ]
        },
        {
          "id": "d",
          "text": "So this is really personal for you.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "Very."
            },
            {
              "speaker": "sophie",
              "text": "I know I shouldn't let that affect every decision I make."
            },
            {
              "speaker": "sophie",
              "text": "But sometimes it does."
            },
            {
              "speaker": "sophie",
              "text": "You've already seen that."
            }
          ]
        }
      ],
      "after": [
        {
          "speaker": "wait",
          "duration": 2000,
          "typing": false
        },
        {
          "speaker": "sophie",
          "text": "It's strange."
        },
        {
          "speaker": "sophie",
          "text": "I've spent all day talking about Daniel."
        },
        {
          "speaker": "sophie",
          "text": "Where he might be."
        },
        {
          "speaker": "sophie",
          "text": "Who he last spoke to."
        },
        {
          "speaker": "sophie",
          "text": "Whether anyone remembers something useful."
        },
        {
          "speaker": "wait",
          "duration": 2000,
          "typing": false
        },
        {
          "speaker": "sophie",
          "text": "But I haven't really told you what he's like."
        }
      ]
    },
    {
      "id": "03",
      "choices": [
        {
          "id": "a",
          "text": "What's he like?",
          "turns": [
            {
              "speaker": "sophie",
              "text": "That's harder than I expected."
            },
            {
              "speaker": "sophie",
              "text": "He's a good person."
            },
            {
              "speaker": "sophie",
              "text": "Which is what everybody says about someone they love."
            },
            {
              "speaker": "sophie",
              "text": "Not very helpful, is it?"
            }
          ]
        },
        {
          "id": "b",
          "text": "Are you two close?",
          "turns": [
            {
              "speaker": "sophie",
              "text": "Yeah."
            },
            {
              "speaker": "sophie",
              "text": "We have our moments."
            },
            {
              "speaker": "sophie",
              "text": "We're siblings. Arguing is practically a family tradition."
            },
            {
              "speaker": "sophie",
              "text": "But we look out for each other."
            }
          ]
        },
        {
          "id": "c",
          "text": "Does he usually go quiet like this?",
          "turns": [
            {
              "speaker": "sophie",
              "text": "Not like this."
            },
            {
              "speaker": "sophie",
              "text": "He needs space sometimes."
            },
            {
              "speaker": "sophie",
              "text": "And when he's working on something, he can forget everything else exists."
            },
            {
              "speaker": "sophie",
              "text": "But he normally lets somebody know he's okay."
            }
          ]
        },
        {
          "id": "d",
          "text": "I'm listening.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "Okay."
            },
            {
              "speaker": "sophie",
              "text": "Let me think."
            },
            {
              "speaker": "sophie",
              "text": "How do you describe someone you've known your whole life?"
            }
          ]
        },
        {
          "id": "e",
          "text": "Forget the missing-person questions for a second. Tell me something that would actually make me recognize Daniel.",
          "turns": [
            {
              "speaker": "wait",
              "duration": 3000,
              "typing": false
            },
            {
              "speaker": "sophie",
              "text": "Huh."
            },
            {
              "speaker": "sophie",
              "text": "That's actually a good question."
            },
            {
              "speaker": "sophie",
              "text": "Okay."
            },
            {
              "speaker": "sophie",
              "text": "He remembers the smallest things."
            },
            {
              "speaker": "sophie",
              "text": "You could mention something once, completely casually, and he'd bring it up weeks later."
            },
            {
              "speaker": "sophie",
              "text": "But ask him where he left his keys?"
            },
            {
              "speaker": "sophie",
              "text": "Suddenly the man's memory is completely gone."
            },
            {
              "speaker": "sophie",
              "text": "😂"
            },
            {
              "speaker": "wait",
              "duration": 2000,
              "typing": false
            },
            {
              "speaker": "sophie",
              "text": "Sorry."
            },
            {
              "speaker": "sophie",
              "text": "I just remembered something funny."
            }
          ],
          "premiumChoice": true,
          "effects": {
            "affinity": 3,
            "trust": 2
          }
        }
      ],
      "after": [
        {
          "speaker": "sophie",
          "text": "He's patient with things."
        },
        {
          "speaker": "sophie",
          "text": "Not always with people."
        },
        {
          "speaker": "sophie",
          "text": "If something breaks, he'll spend hours trying to fix it."
        },
        {
          "speaker": "sophie",
          "text": "Even if replacing it would take five minutes."
        },
        {
          "speaker": "sophie",
          "text": "And he'll be absolutely convinced he's being clever about it."
        }
      ]
    },
    {
      "id": "04",
      "choices": [
        {
          "id": "a",
          "text": "He sounds stubborn.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "Oh, incredibly."
            },
            {
              "speaker": "sophie",
              "text": "Don't ever tell him that."
            },
            {
              "speaker": "sophie",
              "text": "He'll spend the next twenty minutes explaining why he's not stubborn."
            }
          ]
        },
        {
          "id": "b",
          "text": "That actually sounds kind of funny.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "It is."
            },
            {
              "speaker": "sophie",
              "text": "Unless you're the person waiting for him to finish fixing something."
            },
            {
              "speaker": "sophie",
              "text": "Then it's considerably less funny."
            }
          ]
        },
        {
          "id": "c",
          "text": "So he's good with technology?",
          "turns": [
            {
              "speaker": "sophie",
              "text": "He's good at figuring things out."
            },
            {
              "speaker": "sophie",
              "text": "Computers, broken appliances, weird instructions..."
            },
            {
              "speaker": "sophie",
              "text": "He likes understanding how things work."
            },
            {
              "speaker": "sophie",
              "text": "Doesn't mean he always knows what he's doing, though."
            }
          ]
        },
        {
          "id": "d",
          "text": "You sound like you miss talking to him.",
          "turns": [
            {
              "speaker": "wait",
              "duration": 2000,
              "typing": false
            },
            {
              "speaker": "sophie",
              "text": "Yeah."
            },
            {
              "speaker": "sophie",
              "text": "I do."
            },
            {
              "speaker": "sophie",
              "text": "Even the annoying conversations."
            },
            {
              "speaker": "sophie",
              "text": "Especially those, actually."
            }
          ],
          "effects": {
            "trust": 2
          }
        }
      ],
      "after": [
        {
          "speaker": "sophie",
          "text": "And he has this habit."
        },
        {
          "speaker": "sophie",
          "text": "Whenever something gets complicated, he'll say..."
        },
        {
          "speaker": "sophie",
          "text": "\"I'll explain later.\""
        },
        {
          "speaker": "wait",
          "duration": 2000,
          "typing": false
        },
        {
          "speaker": "sophie",
          "text": "I hate that sentence."
        },
        {
          "speaker": "sophie",
          "text": "Because he normally does explain later."
        },
        {
          "speaker": "sophie",
          "text": "You just have to wait until he's ready."
        },
        {
          "speaker": "wait",
          "duration": 3000,
          "typing": false
        },
        {
          "speaker": "sophie",
          "text": "This time..."
        },
        {
          "speaker": "wait",
          "duration": 1500,
          "typing": true
        },
        {
          "speaker": "wait",
          "duration": 0,
          "typing": false
        },
        {
          "speaker": "wait",
          "duration": 2000,
          "typing": false
        },
        {
          "speaker": "sophie",
          "text": "Never mind."
        },
        {
          "speaker": "sophie",
          "text": "You know what I remembered earlier?"
        },
        {
          "speaker": "sophie",
          "text": "My birthday."
        },
        {
          "speaker": "sophie",
          "text": "Not this year."
        },
        {
          "speaker": "sophie",
          "text": "A while ago."
        },
        {
          "speaker": "sophie",
          "text": "Daniel told me he couldn't make it."
        },
        {
          "speaker": "sophie",
          "text": "Said he was busy."
        },
        {
          "speaker": "sophie",
          "text": "I was so annoyed with him."
        },
        {
          "speaker": "sophie",
          "text": "Didn't speak to him all afternoon."
        },
        {
          "speaker": "wait",
          "duration": 2000,
          "typing": false
        },
        {
          "speaker": "sophie",
          "text": "Then he showed up that evening."
        },
        {
          "speaker": "sophie",
          "text": "With a cake."
        },
        {
          "speaker": "sophie",
          "text": "A completely ruined cake."
        },
        {
          "speaker": "sophie",
          "text": "It had slid sideways in the box."
        },
        {
          "speaker": "sophie",
          "text": "Half the writing was stuck to the lid."
        }
      ]
    },
    {
      "id": "05",
      "choices": [
        {
          "id": "a",
          "text": "It's the thought that counts.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "That's exactly what he said!"
            },
            {
              "speaker": "sophie",
              "text": "Word for word."
            },
            {
              "speaker": "sophie",
              "text": "Very convenient, considering the state of that cake."
            }
          ]
        },
        {
          "id": "b",
          "text": "Please tell me you took a picture.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "I did."
            },
            {
              "speaker": "sophie",
              "text": "Somewhere."
            },
            {
              "speaker": "sophie",
              "text": "I'll have to find it."
            },
            {
              "speaker": "sophie",
              "text": "It honestly looked like someone had sat on it."
            }
          ]
        },
        {
          "id": "c",
          "text": "That's actually really sweet.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "It was."
            },
            {
              "speaker": "sophie",
              "text": "I tried very hard not to let him know that."
            },
            {
              "speaker": "sophie",
              "text": "He looked far too pleased with himself already."
            }
          ]
        },
        {
          "id": "d",
          "text": "So he wasn't too busy after all?",
          "turns": [
            {
              "speaker": "sophie",
              "text": "Apparently not."
            },
            {
              "speaker": "sophie",
              "text": "Or he decided he'd rather be late than not show up."
            },
            {
              "speaker": "sophie",
              "text": "That's Daniel."
            },
            {
              "speaker": "sophie",
              "text": "He'll complain about the effort, then do it anyway."
            }
          ]
        }
      ],
      "after": [
        {
          "speaker": "wait",
          "duration": 2000,
          "typing": false
        },
        {
          "speaker": "sophie",
          "text": "Sorry."
        },
        {
          "speaker": "sophie",
          "text": "I'm rambling."
        },
        {
          "speaker": "sophie",
          "text": "You asked about Daniel and now I'm telling you about a cake."
        },
        {
          "speaker": "wait",
          "duration": 2000,
          "typing": false
        },
        {
          "speaker": "sophie",
          "text": "But that's the kind of thing I think about when I think of him."
        },
        {
          "speaker": "sophie",
          "text": "Not the arguments."
        },
        {
          "speaker": "sophie",
          "text": "Not whatever is happening right now."
        },
        {
          "speaker": "sophie",
          "text": "That's why I know something isn't right."
        },
        {
          "speaker": "sophie",
          "text": "He might forget an appointment."
        },
        {
          "speaker": "sophie",
          "text": "He might ignore a call because he's busy."
        },
        {
          "speaker": "sophie",
          "text": "But if he knows people are worried..."
        },
        {
          "speaker": "sophie",
          "text": "He doesn't usually leave them like that."
        }
      ]
    },
    {
      "id": "06",
      "choices": [
        {
          "id": "a",
          "text": "How long has he been gone?",
          "turns": [
            {
              "speaker": "sophie",
              "text": "A few days without a proper answer."
            },
            {
              "speaker": "sophie",
              "text": "It feels longer."
            },
            {
              "speaker": "sophie",
              "text": "I keep counting the hours."
            },
            {
              "speaker": "sophie",
              "text": "Which doesn't help at all."
            }
          ]
        },
        {
          "id": "b",
          "text": "Have you contacted the police?",
          "turns": [
            {
              "speaker": "sophie",
              "text": "Yes."
            },
            {
              "speaker": "sophie",
              "text": "We've reported it."
            },
            {
              "speaker": "sophie",
              "text": "I know talking to strangers isn't a substitute for that."
            },
            {
              "speaker": "sophie",
              "text": "I just can't stand sitting here waiting for answers."
            }
          ]
        },
        {
          "id": "c",
          "text": "Could he have left on purpose?",
          "turns": [
            {
              "speaker": "wait",
              "duration": 2000,
              "typing": false
            },
            {
              "speaker": "sophie",
              "text": "I've thought about that."
            },
            {
              "speaker": "sophie",
              "text": "More than I want to admit."
            },
            {
              "speaker": "sophie",
              "text": "I don't know why he would."
            },
            {
              "speaker": "sophie",
              "text": "But I can't honestly tell you it's impossible."
            }
          ]
        },
        {
          "id": "d",
          "text": "What was the last thing you heard from him?",
          "turns": [
            {
              "speaker": "sophie",
              "text": "I have a message from him."
            },
            {
              "speaker": "sophie",
              "text": "Just something ordinary."
            },
            {
              "speaker": "sophie",
              "text": "But I don't know if it was the last message he sent anyone."
            },
            {
              "speaker": "sophie",
              "text": "That's part of what we're trying to figure out."
            }
          ]
        },
        {
          "id": "e",
          "text": "What was the first thing that made you realize this wasn't just Daniel being Daniel?",
          "turns": [
            {
              "speaker": "wait",
              "duration": 3000,
              "typing": false
            },
            {
              "speaker": "sophie",
              "text": "..."
            },
            {
              "speaker": "sophie",
              "text": "It wasn't one big thing."
            },
            {
              "speaker": "sophie",
              "text": "I called him."
            },
            {
              "speaker": "sophie",
              "text": "He didn't answer."
            },
            {
              "speaker": "sophie",
              "text": "That happens sometimes."
            },
            {
              "speaker": "sophie",
              "text": "Then I sent a message."
            },
            {
              "speaker": "sophie",
              "text": "Nothing."
            },
            {
              "speaker": "sophie",
              "text": "The next day, still nothing."
            },
            {
              "speaker": "wait",
              "duration": 2000,
              "typing": false
            },
            {
              "speaker": "sophie",
              "text": "I kept telling myself I was overreacting."
            },
            {
              "speaker": "sophie",
              "text": "Then I realized I was checking my phone every few minutes."
            },
            {
              "speaker": "sophie",
              "text": "Every time it buzzed, I expected it to be him."
            },
            {
              "speaker": "wait",
              "duration": 3000,
              "typing": false
            },
            {
              "speaker": "sophie",
              "text": "It never was."
            }
          ],
          "premiumChoice": true,
          "effects": {
            "trust": 3
          }
        }
      ],
      "after": [
        {
          "speaker": "sophie",
          "text": "And before you ask..."
        },
        {
          "speaker": "sophie",
          "text": "No, we haven't figured out exactly what happened."
        },
        {
          "speaker": "sophie",
          "text": "We don't even agree on parts of the timeline."
        },
        {
          "speaker": "sophie",
          "text": "That's why things got so tense in the group."
        },
        {
          "speaker": "sophie",
          "text": "Can I tell you something?"
        },
        {
          "speaker": "sophie",
          "text": "I keep opening my last conversation with him."
        },
        {
          "speaker": "sophie",
          "text": "I know it isn't going to change."
        },
        {
          "speaker": "sophie",
          "text": "But I keep looking anyway."
        }
      ]
    },
    {
      "id": "07",
      "choices": [
        {
          "id": "a",
          "text": "What did he say?",
          "turns": [
            {
              "speaker": "sophie",
              "text": "Nothing dramatic."
            },
            {
              "speaker": "sophie",
              "text": "That's the frustrating part."
            },
            {
              "speaker": "sophie",
              "text": "Just normal things."
            },
            {
              "speaker": "sophie",
              "text": "Like we were going to talk again the next day."
            }
          ]
        },
        {
          "id": "b",
          "text": "Maybe there's something in it you missed.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "Maybe."
            },
            {
              "speaker": "sophie",
              "text": "I've read it so many times, though."
            },
            {
              "speaker": "sophie",
              "text": "Every sentence starts looking important after a while."
            },
            {
              "speaker": "sophie",
              "text": "Even the ones that probably aren't."
            }
          ]
        },
        {
          "id": "c",
          "text": "I think I understand why you keep looking.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "Yeah?"
            },
            {
              "speaker": "wait",
              "duration": 2000,
              "typing": false
            },
            {
              "speaker": "sophie",
              "text": "It's like..."
            },
            {
              "speaker": "sophie",
              "text": "As long as I'm reading the conversation, it still feels like we were just talking."
            },
            {
              "speaker": "sophie",
              "text": "Does that make sense?"
            }
          ]
        },
        {
          "id": "d",
          "text": "You shouldn't torture yourself over it.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "I know."
            },
            {
              "speaker": "sophie",
              "text": "Maya keeps telling me the same thing."
            },
            {
              "speaker": "sophie",
              "text": "It's easier advice to give than to follow."
            },
            {
              "speaker": "sophie",
              "text": "But I know you're not wrong."
            }
          ]
        }
      ],
      "after": [
        {
          "speaker": "sophie",
          "text": "Anyway."
        },
        {
          "speaker": "sophie",
          "text": "I don't want you thinking I already know what happened."
        },
        {
          "speaker": "sophie",
          "text": "I don't."
        },
        {
          "speaker": "sophie",
          "text": "I just know this silence doesn't feel like him."
        },
        {
          "speaker": "wait",
          "duration": 3000,
          "typing": false
        },
        {
          "speaker": "sophie",
          "text": "Wow."
        },
        {
          "speaker": "sophie",
          "text": "This conversation got depressing fast."
        },
        {
          "speaker": "sophie",
          "text": "Sorry 😅"
        },
        {
          "speaker": "sophie",
          "text": "I should probably tell you a little about the others."
        },
        {
          "speaker": "sophie",
          "text": "Since you've already met them at their absolute best."
        },
        {
          "speaker": "sophie",
          "text": "That was sarcasm, by the way."
        },
        {
          "speaker": "sophie",
          "text": "In case it wasn't obvious."
        },
        {
          "speaker": "wait",
          "duration": 2000,
          "typing": false
        },
        {
          "speaker": "sophie",
          "text": "Maya first."
        },
        {
          "speaker": "sophie",
          "text": "She's been having a really hard time."
        },
        {
          "speaker": "sophie",
          "text": "She barely sleeps."
        },
        {
          "speaker": "sophie",
          "text": "Keeps saying she's fine."
        },
        {
          "speaker": "sophie",
          "text": "Which is usually how I know she's not."
        }
      ]
    },
    {
      "id": "08",
      "choices": [
        {
          "id": "a",
          "text": "Why is this affecting her so much?",
          "turns": [
            {
              "speaker": "sophie",
              "text": "..."
            },
            {
              "speaker": "sophie",
              "text": "Because she's Daniel's fiancée."
            },
            {
              "speaker": "wait",
              "duration": 2000,
              "typing": false
            },
            {
              "speaker": "sophie",
              "text": "They were planning a wedding."
            }
          ]
        },
        {
          "id": "b",
          "text": "She seemed pretty composed in the group.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "That's Maya."
            },
            {
              "speaker": "sophie",
              "text": "She could be falling apart inside and still be the person reminding everyone else to eat."
            },
            {
              "speaker": "wait",
              "duration": 2000,
              "typing": false
            },
            {
              "speaker": "sophie",
              "text": "She's Daniel's fiancée."
            },
            {
              "speaker": "sophie",
              "text": "This has been awful for her."
            }
          ]
        },
        {
          "id": "c",
          "text": "Is she close to Daniel?",
          "turns": [
            {
              "speaker": "sophie",
              "text": "Close?"
            },
            {
              "speaker": "wait",
              "duration": 2000,
              "typing": false
            },
            {
              "speaker": "sophie",
              "text": "She's his fiancée."
            },
            {
              "speaker": "sophie",
              "text": "They were supposed to get married."
            }
          ]
        },
        {
          "id": "d",
          "text": "You sound worried about her.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "I am."
            },
            {
              "speaker": "sophie",
              "text": "She's trying to hold everything together."
            },
            {
              "speaker": "sophie",
              "text": "And it's not exactly easy when the person you're supposed to marry has disappeared."
            },
            {
              "speaker": "wait",
              "duration": 2000,
              "typing": false
            },
            {
              "speaker": "sophie",
              "text": "Yeah."
            },
            {
              "speaker": "sophie",
              "text": "Maya's Daniel's fiancée."
            }
          ]
        },
        {
          "id": "e",
          "text": "She was trying to keep everyone together while dealing with something herself, wasn't she?",
          "turns": [
            {
              "speaker": "wait",
              "duration": 3000,
              "typing": false
            },
            {
              "speaker": "sophie",
              "text": "..."
            },
            {
              "speaker": "sophie",
              "text": "Yeah."
            },
            {
              "speaker": "sophie",
              "text": "She was."
            },
            {
              "speaker": "sophie",
              "text": "I guess it's not obvious unless you know."
            },
            {
              "speaker": "sophie",
              "text": "Maya's Daniel's fiancée."
            },
            {
              "speaker": "sophie",
              "text": "They were planning their wedding."
            },
            {
              "speaker": "wait",
              "duration": 2000,
              "typing": false
            },
            {
              "speaker": "sophie",
              "text": "And now she doesn't even know where he is."
            },
            {
              "speaker": "sophie",
              "text": "She keeps helping everyone else."
            },
            {
              "speaker": "sophie",
              "text": "I don't think she's leaving much room for herself."
            }
          ],
          "premiumChoice": true,
          "effects": {
            "trust": 3
          }
        }
      ],
      "after": [
        {
          "speaker": "sophie",
          "text": "Maya Chen."
        },
        {
          "speaker": "sophie",
          "text": "That's her full name, by the way."
        },
        {
          "speaker": "sophie",
          "text": "She's usually the organized one."
        },
        {
          "speaker": "sophie",
          "text": "Lists."
        },
        {
          "speaker": "sophie",
          "text": "Plans."
        },
        {
          "speaker": "sophie",
          "text": "Reminders."
        },
        {
          "speaker": "sophie",
          "text": "Sometimes I think she has a spreadsheet for everything."
        },
        {
          "speaker": "sophie",
          "text": "Which is probably why Daniel needed her."
        }
      ]
    },
    {
      "id": "09",
      "choices": [
        {
          "id": "a",
          "text": "Were they happy together?",
          "turns": [
            {
              "speaker": "wait",
              "duration": 2000,
              "typing": false
            },
            {
              "speaker": "sophie",
              "text": "As far as I knew, yes."
            },
            {
              "speaker": "sophie",
              "text": "Every couple has disagreements."
            },
            {
              "speaker": "sophie",
              "text": "But they were making plans for the future."
            },
            {
              "speaker": "sophie",
              "text": "Real plans."
            },
            {
              "speaker": "sophie",
              "text": "I don't want to pretend I know every detail of their relationship, though."
            }
          ]
        },
        {
          "id": "b",
          "text": "Does she think something happened to him?",
          "turns": [
            {
              "speaker": "sophie",
              "text": "She's worried."
            },
            {
              "speaker": "sophie",
              "text": "But she's careful about what she says."
            },
            {
              "speaker": "sophie",
              "text": "She doesn't want us treating guesses like facts."
            },
            {
              "speaker": "sophie",
              "text": "That's one of the reasons she and Lucas keep arguing."
            }
          ]
        },
        {
          "id": "c",
          "text": "No wonder she's so stressed.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "Yeah."
            },
            {
              "speaker": "sophie",
              "text": "Imagine planning a life with someone..."
            },
            {
              "speaker": "sophie",
              "text": "Then suddenly not knowing where they are."
            },
            {
              "speaker": "wait",
              "duration": 2000,
              "typing": false
            },
            {
              "speaker": "sophie",
              "text": "I don't even know what I'd do."
            }
          ]
        },
        {
          "id": "d",
          "text": "She doesn't seem to trust me either.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "She doesn't know you."
            },
            {
              "speaker": "sophie",
              "text": "And right now she's being careful about everyone."
            },
            {
              "speaker": "sophie",
              "text": "I wouldn't take that as a personal judgment."
            },
            {
              "speaker": "sophie",
              "text": "Give her some time."
            }
          ]
        }
      ],
      "after": [
        {
          "speaker": "sophie",
          "text": "Maya can be sarcastic."
        },
        {
          "speaker": "sophie",
          "text": "Very sarcastic."
        },
        {
          "speaker": "sophie",
          "text": "But she usually means well."
        },
        {
          "speaker": "sophie",
          "text": "She also won't pretend to agree with you just to make you feel better."
        },
        {
          "speaker": "sophie",
          "text": "Trust me."
        },
        {
          "speaker": "sophie",
          "text": "I've been on the receiving end of that plenty of times."
        }
      ]
    },
    {
      "id": "10",
      "choices": [
        {
          "id": "a",
          "text": "What about that message she deleted?",
          "turns": [
            {
              "speaker": "sophie",
              "text": "I noticed."
            },
            {
              "speaker": "sophie",
              "text": "I didn't see what it said."
            },
            {
              "speaker": "sophie",
              "text": "I don't know if it was important."
            },
            {
              "speaker": "sophie",
              "text": "We can ask her later."
            },
            {
              "speaker": "sophie",
              "text": "I just don't want to turn every little thing into an accusation."
            }
          ]
        },
        {
          "id": "b",
          "text": "Maybe she was just stressed.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "Maybe."
            },
            {
              "speaker": "sophie",
              "text": "We've all said things we wished we could take back."
            },
            {
              "speaker": "sophie",
              "text": "Especially lately."
            }
          ]
        },
        {
          "id": "c",
          "text": "Do you think she's hiding something?",
          "turns": [
            {
              "speaker": "wait",
              "duration": 2000,
              "typing": false
            },
            {
              "speaker": "sophie",
              "text": "I don't know."
            },
            {
              "speaker": "sophie",
              "text": "She's a private person."
            },
            {
              "speaker": "sophie",
              "text": "And there are things about her relationship with Daniel that aren't mine to share."
            },
            {
              "speaker": "sophie",
              "text": "That doesn't mean she's done anything wrong."
            }
          ]
        },
        {
          "id": "d",
          "text": "I'd rather judge her for myself.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "Good."
            },
            {
              "speaker": "sophie",
              "text": "I think she'd respect that."
            },
            {
              "speaker": "sophie",
              "text": "And honestly, so do I."
            }
          ],
          "effects": {
            "trust": 2
          }
        }
      ],
      "after": [
        {
          "speaker": "sophie",
          "text": "Just..."
        },
        {
          "speaker": "sophie",
          "text": "Be patient with her, okay?"
        },
        {
          "speaker": "sophie",
          "text": "She's dealing with more than she lets on."
        },
        {
          "speaker": "sophie",
          "text": "And then there's Lucas."
        },
        {
          "speaker": "wait",
          "duration": 2000,
          "typing": false
        },
        {
          "speaker": "sophie",
          "text": "Oh boy."
        },
        {
          "speaker": "sophie",
          "text": "Where do I even start?"
        },
        {
          "speaker": "sophie",
          "text": "He's known Daniel since they were kids."
        },
        {
          "speaker": "sophie",
          "text": "They practically grew up together."
        },
        {
          "speaker": "sophie",
          "text": "Which means he's had years to perfect the art of being impossible."
        },
        {
          "speaker": "sophie",
          "text": "😅"
        }
      ]
    },
    {
      "id": "11",
      "choices": [
        {
          "id": "a",
          "text": "He seems very protective.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "Yeah."
            },
            {
              "speaker": "sophie",
              "text": "That's a good word for him."
            },
            {
              "speaker": "sophie",
              "text": "He doesn't always show it in the nicest way."
            },
            {
              "speaker": "sophie",
              "text": "But he cares."
            }
          ]
        },
        {
          "id": "b",
          "text": "He treated me like a criminal.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "I know."
            },
            {
              "speaker": "sophie",
              "text": "And I'm sorry."
            },
            {
              "speaker": "sophie",
              "text": "You didn't deserve that."
            },
            {
              "speaker": "sophie",
              "text": "I'm not asking you to like him."
            }
          ]
        },
        {
          "id": "c",
          "text": "I think he had some valid concerns.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "He did."
            },
            {
              "speaker": "sophie",
              "text": "That's the annoying part."
            },
            {
              "speaker": "sophie",
              "text": "Sometimes he makes good points in the worst possible way."
            },
            {
              "speaker": "sophie",
              "text": "Then nobody wants to listen."
            }
          ]
        },
        {
          "id": "d",
          "text": "Why did he leave instead of staying?",
          "turns": [
            {
              "speaker": "sophie",
              "text": "I think he'd had enough."
            },
            {
              "speaker": "sophie",
              "text": "He hates feeling like nobody's listening."
            },
            {
              "speaker": "sophie",
              "text": "Which is ironic, because he can be terrible at listening himself."
            },
            {
              "speaker": "sophie",
              "text": "I don't know when he'll be ready to come back."
            }
          ]
        },
        {
          "id": "e",
          "text": "I don't think he hates me. I think he's afraid of making the wrong decision.",
          "turns": [
            {
              "speaker": "wait",
              "duration": 3000,
              "typing": false
            },
            {
              "speaker": "sophie",
              "text": "..."
            },
            {
              "speaker": "sophie",
              "text": "That's actually a pretty fair way of looking at it."
            },
            {
              "speaker": "sophie",
              "text": "Lucas has known Daniel almost his whole life."
            },
            {
              "speaker": "sophie",
              "text": "He feels responsible for him in his own way."
            },
            {
              "speaker": "sophie",
              "text": "And when he's scared, he gets angry."
            },
            {
              "speaker": "sophie",
              "text": "It doesn't make how he treated you okay."
            },
            {
              "speaker": "sophie",
              "text": "But I think you're right."
            }
          ],
          "premiumChoice": true,
          "effects": {
            "trust": 3
          }
        }
      ],
      "after": [
        {
          "speaker": "sophie",
          "text": "He and Daniel used to argue about the stupidest things."
        },
        {
          "speaker": "sophie",
          "text": "Music."
        },
        {
          "speaker": "sophie",
          "text": "Football."
        },
        {
          "speaker": "sophie",
          "text": "Who was right about something neither of them actually understood."
        },
        {
          "speaker": "sophie",
          "text": "And then five minutes later they'd be laughing again."
        },
        {
          "speaker": "sophie",
          "text": "That's just how they were."
        },
        {
          "speaker": "wait",
          "duration": 2000,
          "typing": false
        },
        {
          "speaker": "sophie",
          "text": "I think he's having a hard time accepting that he can't just call Daniel and argue with him about this."
        }
      ]
    },
    {
      "id": "12",
      "choices": [
        {
          "id": "a",
          "text": "Do you think he'll come back?",
          "turns": [
            {
              "speaker": "sophie",
              "text": "I hope so."
            },
            {
              "speaker": "sophie",
              "text": "He's angry, not heartless."
            },
            {
              "speaker": "sophie",
              "text": "I don't think he wants to walk away from Daniel."
            },
            {
              "speaker": "sophie",
              "text": "He just doesn't want to do things this way."
            }
          ]
        },
        {
          "id": "b",
          "text": "Maybe you should give him some time.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "Probably."
            },
            {
              "speaker": "sophie",
              "text": "If I message him right now, we'll probably just start arguing again."
            },
            {
              "speaker": "sophie",
              "text": "Maybe tomorrow."
            }
          ]
        },
        {
          "id": "c",
          "text": "He could've handled things better.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "Absolutely."
            },
            {
              "speaker": "sophie",
              "text": "And I'll tell him that."
            },
            {
              "speaker": "sophie",
              "text": "Eventually."
            },
            {
              "speaker": "sophie",
              "text": "Preferably when we're not both angry."
            }
          ]
        },
        {
          "id": "d",
          "text": "Do you trust him?",
          "turns": [
            {
              "speaker": "sophie",
              "text": "Yes."
            },
            {
              "speaker": "sophie",
              "text": "But trusting someone doesn't mean agreeing with everything they do."
            },
            {
              "speaker": "sophie",
              "text": "And I don't expect you to trust him just because I do."
            }
          ]
        }
      ],
      "after": [
        {
          "speaker": "sophie",
          "text": "Whatever you think of Lucas..."
        },
        {
          "speaker": "sophie",
          "text": "Please don't assume he's your enemy."
        },
        {
          "speaker": "sophie",
          "text": "I don't think he is."
        },
        {
          "speaker": "wait",
          "duration": 2000,
          "typing": false
        },
        {
          "speaker": "sophie",
          "text": "Oh!"
        },
        {
          "speaker": "sophie",
          "text": "And there's Eli."
        },
        {
          "speaker": "sophie",
          "text": "I almost forgot you haven't actually spoken to her."
        },
        {
          "speaker": "sophie",
          "text": "She's much quieter in group chats."
        },
        {
          "speaker": "sophie",
          "text": "Sometimes I wonder whether she even reads half the messages."
        },
        {
          "speaker": "sophie",
          "text": "Then she'll reply to something from six hours ago."
        },
        {
          "speaker": "sophie",
          "text": "Like the conversation never moved on."
        },
        {
          "speaker": "sophie",
          "text": "😅"
        }
      ]
    },
    {
      "id": "13",
      "choices": [
        {
          "id": "a",
          "text": "Who's Eli?",
          "turns": [
            {
              "speaker": "sophie",
              "text": "Eli Ward."
            },
            {
              "speaker": "sophie",
              "text": "She works with Daniel."
            },
            {
              "speaker": "sophie",
              "text": "At Axiom Recovery."
            },
            {
              "speaker": "sophie",
              "text": "She's not exactly the loudest person in the room."
            },
            {
              "speaker": "sophie",
              "text": "But she's pretty smart."
            }
          ]
        },
        {
          "id": "b",
          "text": "Why hasn't she said anything?",
          "turns": [
            {
              "speaker": "sophie",
              "text": "I'm not sure."
            },
            {
              "speaker": "sophie",
              "text": "She gets caught up in her own stuff."
            },
            {
              "speaker": "sophie",
              "text": "Sometimes she's just busy."
            },
            {
              "speaker": "sophie",
              "text": "I wouldn't read too much into it yet."
            }
          ]
        },
        {
          "id": "c",
          "text": "Does she know Daniel too?",
          "turns": [
            {
              "speaker": "sophie",
              "text": "Yeah."
            },
            {
              "speaker": "sophie",
              "text": "They work together."
            },
            {
              "speaker": "sophie",
              "text": "At Axiom Recovery."
            },
            {
              "speaker": "sophie",
              "text": "She's good with computers and technical things."
            },
            {
              "speaker": "sophie",
              "text": "Daniel appreciates people who can keep up with him."
            }
          ]
        },
        {
          "id": "d",
          "text": "What's she like?",
          "turns": [
            {
              "speaker": "sophie",
              "text": "Quiet."
            },
            {
              "speaker": "sophie",
              "text": "Smart."
            },
            {
              "speaker": "sophie",
              "text": "Sometimes a little hard to read."
            },
            {
              "speaker": "sophie",
              "text": "She works with Daniel at Axiom Recovery."
            },
            {
              "speaker": "sophie",
              "text": "And if you ask her a question she knows the answer to, she'll usually try to help."
            }
          ]
        },
        {
          "id": "e",
          "text": "Quiet people sometimes notice things everyone else misses. Maybe I should talk to her.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "That's probably true."
            },
            {
              "speaker": "sophie",
              "text": "Especially with Eli."
            },
            {
              "speaker": "sophie",
              "text": "She doesn't say much unless she feels she has something useful to add."
            },
            {
              "speaker": "sophie",
              "text": "Although sometimes what she thinks is useful is a five-paragraph explanation of something nobody asked about."
            },
            {
              "speaker": "sophie",
              "text": "😂"
            },
            {
              "speaker": "sophie",
              "text": "But yeah."
            },
            {
              "speaker": "sophie",
              "text": "I think you two might get along."
            }
          ],
          "premiumChoice": true,
          "effects": {
            "affinity": 2
          }
        }
      ],
      "after": [
        {
          "speaker": "sophie",
          "text": "Eli's usually better with technical things than the rest of us."
        },
        {
          "speaker": "sophie",
          "text": "Which isn't saying much in my case."
        },
        {
          "speaker": "sophie",
          "text": "I once managed to delete an entire folder while trying to rename it."
        },
        {
          "speaker": "sophie",
          "text": "Don't ask."
        },
        {
          "speaker": "wait",
          "duration": 2000,
          "typing": false
        },
        {
          "speaker": "sophie",
          "text": "Anyway."
        },
        {
          "speaker": "sophie",
          "text": "She's not some magician who can just pull answers out of nowhere."
        },
        {
          "speaker": "sophie",
          "text": "But she might be able to help us understand some things later."
        }
      ]
    },
    {
      "id": "14",
      "choices": [
        {
          "id": "a",
          "text": "What's Axiom Recovery?",
          "turns": [
            {
              "speaker": "sophie",
              "text": "It's where Daniel works."
            },
            {
              "speaker": "sophie",
              "text": "They deal with data and recovery-related work."
            },
            {
              "speaker": "sophie",
              "text": "That's about the extent of my technical understanding."
            },
            {
              "speaker": "sophie",
              "text": "Eli would explain it better than I could."
            }
          ]
        },
        {
          "id": "b",
          "text": "Did Daniel enjoy working there?",
          "turns": [
            {
              "speaker": "sophie",
              "text": "I think he liked having problems to solve."
            },
            {
              "speaker": "sophie",
              "text": "He complained about work sometimes."
            },
            {
              "speaker": "sophie",
              "text": "But who doesn't?"
            },
            {
              "speaker": "sophie",
              "text": "I don't want to pretend I know everything about his job."
            }
          ]
        },
        {
          "id": "c",
          "text": "Could his work have something to do with his disappearance?",
          "turns": [
            {
              "speaker": "wait",
              "duration": 2000,
              "typing": false
            },
            {
              "speaker": "sophie",
              "text": "Maybe."
            },
            {
              "speaker": "sophie",
              "text": "I don't know."
            },
            {
              "speaker": "sophie",
              "text": "It's one of the possibilities I've thought about."
            },
            {
              "speaker": "sophie",
              "text": "But thinking about something isn't the same as having evidence."
            }
          ]
        },
        {
          "id": "d",
          "text": "Maybe Eli knows something about the contact list.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "Maybe."
            },
            {
              "speaker": "sophie",
              "text": "I haven't asked her that specifically."
            },
            {
              "speaker": "sophie",
              "text": "I can bring it up when we speak."
            },
            {
              "speaker": "sophie",
              "text": "But I don't want to assume she'll know just because she works with Daniel."
            }
          ]
        }
      ],
      "after": [
        {
          "speaker": "sophie",
          "text": "So yeah."
        },
        {
          "speaker": "sophie",
          "text": "That's Eli."
        },
        {
          "speaker": "sophie",
          "text": "She's easier to talk to when she isn't trying to explain something complicated."
        },
        {
          "speaker": "sophie",
          "text": "Which, now that I think about it, might not be very often."
        },
        {
          "speaker": "sophie",
          "text": "😅"
        },
        {
          "speaker": "sophie",
          "text": "So..."
        },
        {
          "speaker": "sophie",
          "text": "That's Maya, Lucas and Eli."
        },
        {
          "speaker": "sophie",
          "text": "In the world's least useful introduction."
        },
        {
          "speaker": "sophie",
          "text": "They're all different."
        },
        {
          "speaker": "sophie",
          "text": "Very different."
        },
        {
          "speaker": "sophie",
          "text": "But they all care about Daniel."
        },
        {
          "speaker": "sophie",
          "text": "In their own ways."
        }
      ]
    },
    {
      "id": "15",
      "choices": [
        {
          "id": "a",
          "text": "I feel bad for Maya.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "Me too."
            },
            {
              "speaker": "sophie",
              "text": "She's trying so hard to stay strong."
            },
            {
              "speaker": "sophie",
              "text": "I wish she didn't feel like she had to."
            }
          ]
        },
        {
          "id": "b",
          "text": "I still don't trust Lucas.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "That's okay."
            },
            {
              "speaker": "sophie",
              "text": "You don't have to."
            },
            {
              "speaker": "sophie",
              "text": "I'm not going to ask you to trust someone who just spent twenty minutes questioning you."
            }
          ]
        },
        {
          "id": "c",
          "text": "Eli sounds interesting.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "She can be."
            },
            {
              "speaker": "sophie",
              "text": "Though you might have to get used to waiting for replies."
            },
            {
              "speaker": "sophie",
              "text": "She's not always glued to her phone like the rest of us."
            }
          ]
        },
        {
          "id": "d",
          "text": "Honestly, I don't know what to think of any of you.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "Good."
            },
            {
              "speaker": "sophie",
              "text": "I mean..."
            },
            {
              "speaker": "sophie",
              "text": "Not good that we're all confusing."
            },
            {
              "speaker": "sophie",
              "text": "But good that you're not blindly trusting people you've just met."
            }
          ]
        }
      ],
      "after": [
        {
          "speaker": "sophie",
          "text": "Including me, by the way."
        },
        {
          "speaker": "wait",
          "duration": 2000,
          "typing": false
        },
        {
          "speaker": "sophie",
          "text": "I know I've told you a lot."
        },
        {
          "speaker": "sophie",
          "text": "But it's still just my side of things."
        },
        {
          "speaker": "sophie",
          "text": "You should remember that."
        },
        {
          "speaker": "sophie",
          "text": "There's still something I can't stop thinking about."
        },
        {
          "speaker": "sophie",
          "text": "Your number."
        },
        {
          "speaker": "sophie",
          "text": "I know."
        },
        {
          "speaker": "sophie",
          "text": "We keep coming back to it."
        },
        {
          "speaker": "sophie",
          "text": "But it doesn't make sense."
        },
        {
          "speaker": "sophie",
          "text": "I've checked that saved contact export more than once."
        },
        {
          "speaker": "sophie",
          "text": "And there it was."
        },
        {
          "speaker": "sophie",
          "text": "No name."
        },
        {
          "speaker": "sophie",
          "text": "Just your number, with the star still beside it."
        }
      ]
    },
    {
      "id": "16",
      "choices": [
        {
          "id": "a",
          "text": "Maybe Daniel saved the wrong number.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "Maybe."
            },
            {
              "speaker": "sophie",
              "text": "I really hope there's a simple explanation."
            },
            {
              "speaker": "sophie",
              "text": "It would be nice if something about this turned out to be simple."
            }
          ]
        },
        {
          "id": "b",
          "text": "Can you tell me exactly where you found it?",
          "turns": [
            {
              "speaker": "sophie",
              "text": "It was in a saved copy labelled as Daniel's contacts."
            },
            {
              "speaker": "sophie",
              "text": "We were checking through some of his things."
            },
            {
              "speaker": "sophie",
              "text": "It wasn't a live conversation."
            },
            {
              "speaker": "sophie",
              "text": "Just a saved record."
            }
          ]
        },
        {
          "id": "c",
          "text": "What if someone else added it?",
          "turns": [
            {
              "speaker": "wait",
              "duration": 2000,
              "typing": false
            },
            {
              "speaker": "sophie",
              "text": "I haven't ruled that out."
            },
            {
              "speaker": "sophie",
              "text": "The copy doesn't tell me who saved or marked the number."
            },
            {
              "speaker": "sophie",
              "text": "I don't want to start accusing people without knowing."
            }
          ]
        },
        {
          "id": "d",
          "text": "Do the others know about the star?",
          "turns": [
            {
              "speaker": "sophie",
              "text": "They know the number was marked with a star."
            },
            {
              "speaker": "sophie",
              "text": "I mentioned it in the group."
            },
            {
              "speaker": "sophie",
              "text": "But none of us knows who marked it, or why."
            },
            {
              "speaker": "sophie",
              "text": "I don't want to turn that into a promise that you can help."
            }
          ]
        },
        {
          "id": "e",
          "text": "Tell me only what you actually saw. Not what you think it means.",
          "turns": [
            {
              "speaker": "wait",
              "duration": 3000,
              "typing": false
            },
            {
              "speaker": "sophie",
              "text": "Okay."
            },
            {
              "speaker": "sophie",
              "text": "A saved contact export."
            },
            {
              "speaker": "sophie",
              "text": "Your number."
            },
            {
              "speaker": "sophie",
              "text": "No name attached."
            },
            {
              "speaker": "sophie",
              "text": "The export marks it as starred."
            },
            {
              "speaker": "wait",
              "duration": 2000,
              "typing": false
            },
            {
              "speaker": "sophie",
              "text": "That's it."
            },
            {
              "speaker": "sophie",
              "text": "Everything else is me trying to connect things."
            },
            {
              "speaker": "sophie",
              "text": "And maybe I'm connecting the wrong things."
            },
            {
              "speaker": "sophie",
              "text": "Thank you."
            },
            {
              "speaker": "sophie",
              "text": "I think I needed someone to help me separate those two things."
            }
          ],
          "premiumChoice": true,
          "effects": {
            "trust": 4
          }
        }
      ],
      "after": [
        {
          "speaker": "sophie",
          "text": "I wish I could give you something more useful."
        },
        {
          "speaker": "sophie",
          "text": "I really do."
        },
        {
          "speaker": "sophie",
          "text": "But I don't want to make up answers just because I don't like having questions."
        },
        {
          "speaker": "wait",
          "duration": 2000,
          "typing": false
        },
        {
          "speaker": "sophie",
          "text": "There's something else I should say."
        },
        {
          "speaker": "sophie",
          "text": "I know you've ended up in a really strange situation."
        },
        {
          "speaker": "sophie",
          "text": "And it's mostly because of me."
        },
        {
          "speaker": "sophie",
          "text": "You didn't ask to get involved."
        },
        {
          "speaker": "sophie",
          "text": "I know that."
        },
        {
          "speaker": "wait",
          "duration": 2000,
          "typing": false
        },
        {
          "speaker": "sophie",
          "text": "I don't actually expect you to find Daniel."
        },
        {
          "speaker": "sophie",
          "text": "That's not fair to put on you."
        },
        {
          "speaker": "sophie",
          "text": "I just thought..."
        },
        {
          "speaker": "sophie",
          "text": "Maybe there's something we're missing."
        },
        {
          "speaker": "sophie",
          "text": "Something someone outside all of this might notice."
        }
      ]
    },
    {
      "id": "17",
      "choices": [
        {
          "id": "a",
          "text": "I can try to help.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "Really?"
            },
            {
              "speaker": "sophie",
              "text": "Thank you."
            },
            {
              "speaker": "sophie",
              "text": "I mean it."
            },
            {
              "speaker": "sophie",
              "text": "Even just talking things through might help."
            }
          ]
        },
        {
          "id": "b",
          "text": "I'm not a detective, Sophie.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "Neither am I."
            },
            {
              "speaker": "sophie",
              "text": "Trust me, that has become painfully obvious."
            },
            {
              "speaker": "sophie",
              "text": "😅"
            },
            {
              "speaker": "sophie",
              "text": "I'm not asking you to become one."
            }
          ]
        },
        {
          "id": "c",
          "text": "I still don't know if I can trust you.",
          "turns": [
            {
              "speaker": "wait",
              "duration": 2000,
              "typing": false
            },
            {
              "speaker": "sophie",
              "text": "That's okay."
            },
            {
              "speaker": "sophie",
              "text": "Really."
            },
            {
              "speaker": "sophie",
              "text": "I'd be more worried if you trusted me completely already."
            },
            {
              "speaker": "sophie",
              "text": "You should take your time."
            }
          ]
        },
        {
          "id": "d",
          "text": "What exactly would you want me to do?",
          "turns": [
            {
              "speaker": "sophie",
              "text": "For now?"
            },
            {
              "speaker": "sophie",
              "text": "Nothing complicated."
            },
            {
              "speaker": "sophie",
              "text": "Stay in the conversation if you're comfortable."
            },
            {
              "speaker": "sophie",
              "text": "Ask questions when something doesn't make sense."
            },
            {
              "speaker": "sophie",
              "text": "And tell me if you ever remember anything about Daniel or the number."
            }
          ]
        },
        {
          "id": "e",
          "text": "I can't promise I'll find him. But I can listen, ask questions, and tell you when something doesn't add up.",
          "turns": [
            {
              "speaker": "wait",
              "duration": 3000,
              "typing": false
            },
            {
              "speaker": "sophie",
              "text": "..."
            },
            {
              "speaker": "sophie",
              "text": "That's more than I was expecting."
            },
            {
              "speaker": "sophie",
              "text": "And honestly, it's probably exactly what we need."
            },
            {
              "speaker": "sophie",
              "text": "Someone who isn't already caught up in everyone's opinions."
            },
            {
              "speaker": "sophie",
              "text": "Someone who can look at things without immediately picking a side."
            },
            {
              "speaker": "wait",
              "duration": 2000,
              "typing": false
            },
            {
              "speaker": "sophie",
              "text": "I can't tell you how much that means to me right now."
            }
          ],
          "premiumChoice": true,
          "effects": {
            "trust": 4,
            "affinity": 2
          }
        }
      ],
      "after": [
        {
          "speaker": "sophie",
          "text": "Just promise me one thing."
        },
        {
          "speaker": "wait",
          "duration": 2000,
          "typing": false
        },
        {
          "speaker": "sophie",
          "text": "If something feels wrong, don't ignore it."
        },
        {
          "speaker": "sophie",
          "text": "And don't put yourself in danger over any of this."
        },
        {
          "speaker": "sophie",
          "text": "I don't want someone else getting hurt."
        },
        {
          "speaker": "wait",
          "duration": 3000,
          "typing": false
        },
        {
          "speaker": "sophie",
          "text": "Wow."
        },
        {
          "speaker": "sophie",
          "text": "I've been talking for ages."
        },
        {
          "speaker": "sophie",
          "text": "Sorry."
        },
        {
          "speaker": "sophie",
          "text": "You probably didn't expect to get my entire life story in one conversation."
        },
        {
          "speaker": "sophie",
          "text": "Although, to be fair, you only got the very confusing version."
        }
      ]
    },
    {
      "id": "18",
      "choices": [
        {
          "id": "a",
          "text": "I don't mind.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "Good."
            },
            {
              "speaker": "sophie",
              "text": "Because apparently I have no idea when to stop talking."
            },
            {
              "speaker": "sophie",
              "text": "Maya reminds me of that constantly."
            }
          ]
        },
        {
          "id": "b",
          "text": "You seem like you needed someone to talk to.",
          "turns": [
            {
              "speaker": "wait",
              "duration": 2000,
              "typing": false
            },
            {
              "speaker": "sophie",
              "text": "Yeah."
            },
            {
              "speaker": "sophie",
              "text": "Maybe I did."
            },
            {
              "speaker": "sophie",
              "text": "I didn't really realize it until now."
            }
          ]
        },
        {
          "id": "c",
          "text": "You should probably get some rest.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "You're starting to sound like Maya."
            },
            {
              "speaker": "sophie",
              "text": "Which is probably a good thing."
            },
            {
              "speaker": "sophie",
              "text": "She's been telling me the same thing all day."
            }
          ]
        },
        {
          "id": "d",
          "text": "I've definitely had stranger conversations.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "Oh?"
            },
            {
              "speaker": "sophie",
              "text": "Now I'm curious."
            },
            {
              "speaker": "sophie",
              "text": "Actually, no."
            },
            {
              "speaker": "sophie",
              "text": "Save that story for another day."
            }
          ]
        },
        {
          "id": "e",
          "text": "For what it's worth, Daniel's lucky to have someone who cares about him this much.",
          "turns": [
            {
              "speaker": "wait",
              "duration": 3000,
              "typing": false
            },
            {
              "speaker": "sophie",
              "text": "..."
            },
            {
              "speaker": "sophie",
              "text": "That's really sweet of you to say."
            },
            {
              "speaker": "sophie",
              "text": "I just hope he knows that."
            },
            {
              "speaker": "wait",
              "duration": 2000,
              "typing": false
            },
            {
              "speaker": "sophie",
              "text": "Actually, he probably does."
            },
            {
              "speaker": "sophie",
              "text": "I annoy him often enough to make it obvious."
            },
            {
              "speaker": "sophie",
              "text": "😅"
            },
            {
              "speaker": "sophie",
              "text": "Thank you."
            }
          ],
          "premiumChoice": true,
          "effects": {
            "affinity": 3,
            "trust": 2
          }
        }
      ],
      "after": [
        {
          "speaker": "sophie",
          "text": "I think I'm going to put my phone down for a little while."
        },
        {
          "speaker": "sophie",
          "text": "Maybe make some tea."
        },
        {
          "speaker": "sophie",
          "text": "Or at least try to take a break."
        },
        {
          "speaker": "sophie",
          "text": "Maya would be proud."
        },
        {
          "speaker": "sophie",
          "text": "Oh."
        },
        {
          "speaker": "sophie",
          "text": "One more thing."
        },
        {
          "speaker": "sophie",
          "text": "If anyone in the group gives you a hard time again..."
        },
        {
          "speaker": "sophie",
          "text": "Just tell me, okay?"
        },
        {
          "speaker": "sophie",
          "text": "I'll try to handle it better next time."
        }
      ]
    },
    {
      "id": "19",
      "choices": [
        {
          "id": "a",
          "text": "Okay. Talk later.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "Talk later."
            },
            {
              "speaker": "sophie",
              "text": "And thanks again."
            }
          ]
        },
        {
          "id": "b",
          "text": "Thanks, Sophie.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "For what?"
            },
            {
              "speaker": "player",
              "text": "Explaining everything."
            },
            {
              "speaker": "sophie",
              "text": "Oh."
            },
            {
              "speaker": "sophie",
              "text": "You're welcome."
            },
            {
              "speaker": "sophie",
              "text": "I should've done it sooner."
            }
          ]
        },
        {
          "id": "c",
          "text": "I'll be fine. Don't worry.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "I'll try not to."
            },
            {
              "speaker": "sophie",
              "text": "Although worrying seems to be my main hobby lately."
            },
            {
              "speaker": "sophie",
              "text": "😅"
            }
          ]
        },
        {
          "id": "d",
          "text": "Goodbye, Sophie.",
          "turns": [
            {
              "speaker": "sophie",
              "text": "Goodbye."
            },
            {
              "speaker": "sophie",
              "text": "Take care of yourself, okay?"
            }
          ]
        },
        {
          "id": "e",
          "text": "Only if you promise to get some rest too. Deal?",
          "turns": [
            {
              "speaker": "sophie",
              "text": "..."
            },
            {
              "speaker": "sophie",
              "text": "You're negotiating with me now?"
            },
            {
              "speaker": "player",
              "text": "Seems fair."
            },
            {
              "speaker": "sophie",
              "text": "Hmm."
            },
            {
              "speaker": "sophie",
              "text": "Fine."
            },
            {
              "speaker": "sophie",
              "text": "Deal."
            },
            {
              "speaker": "sophie",
              "text": "But I'm not promising I'll actually fall asleep."
            },
            {
              "speaker": "player",
              "text": "That's your problem."
            },
            {
              "speaker": "sophie",
              "text": "😂"
            },
            {
              "speaker": "sophie",
              "text": "Fair enough."
            },
            {
              "speaker": "sophie",
              "text": "Goodbye."
            }
          ],
          "premiumChoice": true,
          "effects": {
            "affinity": 3
          }
        }
      ],
      "after": [
        {
          "speaker": "wait",
          "duration": 2000,
          "typing": false
        },
        {
          "speaker": "sophie",
          "text": "And hey..."
        },
        {
          "speaker": "wait",
          "duration": 2000,
          "typing": false
        },
        {
          "speaker": "sophie",
          "text": "I'm glad you didn't leave."
        },
        {
          "speaker": "wait",
          "duration": 2000,
          "typing": false
        },
        {
          "speaker": "sophie",
          "text": "Goodbye."
        }
      ]
    }
  ]
} as const
