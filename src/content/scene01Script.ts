/** Owner-supplied Scene 01 screenplay, 21 October 2026. No image attachment is sent. */
export const scene01Script = {
  "opening": [
    {
      "speaker": "sophie",
      "text": "Hey"
    },
    {
      "speaker": "wait",
      "duration": 2000,
      "typing": false
    },
    {
      "speaker": "sophie",
      "text": "Sorry, is this a bad time?"
    },
    {
      "speaker": "wait",
      "duration": 2000,
      "typing": true
    },
    {
      "speaker": "sophie",
      "text": "Actually"
    },
    {
      "speaker": "sophie",
      "text": "I'm not even sure I have the right number 😅"
    },
    {
      "speaker": "wait",
      "duration": 2000,
      "typing": false
    },
    {
      "speaker": "sophie",
      "text": "Could you just reply when you see this?"
    }
  ],
  "choices": [
    {
      "id": "01",
      "choices": [
        {
          "id": "a",
          "text": "Who's this?"
        },
        {
          "id": "b",
          "text": "I think you've got the wrong number."
        },
        {
          "id": "c",
          "text": "Depends. Who's asking?"
        },
        {
          "id": "d",
          "text": "You usually text strangers like this?"
        }
      ],
      "responses": {
        "a": [
          {
            "speaker": "sophie",
            "text": "Oh, right."
          },
          {
            "speaker": "sophie",
            "text": "Sorry."
          },
          {
            "speaker": "sophie",
            "text": "I'm Sophie."
          },
          {
            "speaker": "sophie",
            "text": "I probably should've started with that."
          }
        ],
        "b": [
          {
            "speaker": "sophie",
            "text": "That's what I'm trying to figure out."
          },
          {
            "speaker": "sophie",
            "text": "Sorry, I know this is weird."
          },
          {
            "speaker": "sophie",
            "text": "I'm Sophie, by the way."
          }
        ],
        "c": [
          {
            "speaker": "sophie",
            "text": "Someone who's already regretting how she started this conversation."
          },
          {
            "speaker": "sophie",
            "text": "😅"
          },
          {
            "speaker": "sophie",
            "text": "Sophie."
          },
          {
            "speaker": "sophie",
            "text": "My name's Sophie."
          }
        ],
        "d": [
          {
            "speaker": "sophie",
            "text": "God, no."
          },
          {
            "speaker": "sophie",
            "text": "I'm usually much better at embarrassing myself in person."
          },
          {
            "speaker": "sophie",
            "text": "I'm Sophie."
          },
          {
            "speaker": "sophie",
            "text": "Sorry for the random message."
          }
        ]
      },
      "after": [
        {
          "speaker": "sophie",
          "text": "Can I ask you something?"
        },
        {
          "speaker": "sophie",
          "text": "And I promise I'm not selling anything."
        }
      ]
    },
    {
      "id": "02",
      "choices": [
        {
          "id": "a",
          "text": "Sure. Go ahead."
        },
        {
          "id": "b",
          "text": "Make it quick."
        },
        {
          "id": "c",
          "text": "How did you get my number?"
        },
        {
          "id": "d",
          "text": "You sound nervous. Did something happen?",
          "premiumChoice": true
        }
      ],
      "responses": {
        "a": [
          {
            "speaker": "sophie",
            "text": "Thanks."
          },
          {
            "speaker": "sophie",
            "text": "Okay, this might sound strange."
          }
        ],
        "b": [
          {
            "speaker": "sophie",
            "text": "I'll try."
          },
          {
            "speaker": "sophie",
            "text": "I'm sorry to bother you."
          },
          {
            "speaker": "sophie",
            "text": "I just need to check something."
          }
        ],
        "c": [
          {
            "speaker": "sophie",
            "text": "That's actually what I wanted to ask you about."
          },
          {
            "speaker": "sophie",
            "text": "I found it in something I was going through earlier."
          },
          {
            "speaker": "player",
            "text": "Something?"
          },
          {
            "speaker": "sophie",
            "text": "A saved contact list."
          },
          {
            "speaker": "sophie",
            "text": "It wasn't mine."
          }
        ],
        "d": [
          {
            "speaker": "wait",
            "duration": 3000,
            "typing": false
          },
          {
            "speaker": "sophie",
            "text": "Is it that obvious?"
          },
          {
            "speaker": "player",
            "text": "A little."
          },
          {
            "speaker": "sophie",
            "text": "Great."
          },
          {
            "speaker": "sophie",
            "text": "And here I was thinking I sounded completely normal."
          },
          {
            "speaker": "player",
            "text": "You don't have to explain everything at once."
          },
          {
            "speaker": "wait",
            "duration": 3000,
            "typing": true
          },
          {
            "speaker": "sophie",
            "text": "Thank you."
          },
          {
            "speaker": "sophie",
            "text": "That's actually really nice of you."
          },
          {
            "speaker": "sophie",
            "text": "Something did happen."
          },
          {
            "speaker": "sophie",
            "text": "I'm just having trouble figuring out how to talk about it."
          },
          {
            "speaker": "sophie",
            "text": "Especially to someone I don't know."
          }
        ]
      },
      "after": [
        {
          "speaker": "sophie",
          "text": "Okay."
        },
        {
          "speaker": "sophie",
          "text": "I found this number in a contact list."
        },
        {
          "speaker": "sophie",
          "text": "There wasn't a name attached to it."
        },
        {
          "speaker": "sophie",
          "text": "Just the number."
        },
        {
          "speaker": "sophie",
          "text": "And a note."
        }
      ]
    },
    {
      "id": "03",
      "choices": [
        {
          "id": "a",
          "text": "What kind of note?"
        },
        {
          "id": "b",
          "text": "A note about me?"
        },
        {
          "id": "c",
          "text": "That doesn't explain why you're texting me."
        },
        {
          "id": "d",
          "text": "Could've been someone's old number."
        }
      ],
      "responses": {
        "a": [
          {
            "speaker": "sophie",
            "text": "That's the frustrating part."
          },
          {
            "speaker": "sophie",
            "text": "Most of it wasn't readable."
          },
          {
            "speaker": "sophie",
            "text": "I could make out the number. That was about it."
          }
        ],
        "b": [
          {
            "speaker": "sophie",
            "text": "I don't know if it was about you."
          },
          {
            "speaker": "sophie",
            "text": "There wasn't a name."
          },
          {
            "speaker": "sophie",
            "text": "I only know the number matches."
          }
        ],
        "c": [
          {
            "speaker": "sophie",
            "text": "You're right."
          },
          {
            "speaker": "sophie",
            "text": "I was hoping you might recognize where it came from."
          },
          {
            "speaker": "sophie",
            "text": "Or recognize the person who saved it."
          }
        ],
        "d": [
          {
            "speaker": "sophie",
            "text": "I thought of that."
          },
          {
            "speaker": "sophie",
            "text": "It could still be."
          },
          {
            "speaker": "sophie",
            "text": "I guess I wanted to check before I gave up on it."
          }
        ]
      },
      "after": [
        {
          "speaker": "sophie",
          "text": "The contact list belonged to someone named Daniel."
        },
        {
          "speaker": "wait",
          "duration": 2000,
          "typing": false
        },
        {
          "speaker": "sophie",
          "text": "Daniel Mercer."
        }
      ]
    },
    {
      "id": "04",
      "choices": [
        {
          "id": "a",
          "text": "Never heard of him."
        },
        {
          "id": "b",
          "text": "Should I know who that is?"
        },
        {
          "id": "c",
          "text": "Why would he have my number?"
        },
        {
          "id": "d",
          "text": "What happened to Daniel?"
        }
      ],
      "responses": {
        "a": [
          {
            "speaker": "sophie",
            "text": "Okay."
          },
          {
            "speaker": "sophie",
            "text": "That's what I was afraid you'd say."
          },
          {
            "speaker": "sophie",
            "text": "Not that it's your fault."
          }
        ],
        "b": [
          {
            "speaker": "sophie",
            "text": "Honestly?"
          },
          {
            "speaker": "sophie",
            "text": "I was hoping you'd tell me."
          },
          {
            "speaker": "sophie",
            "text": "I don't know why your number was there."
          }
        ],
        "c": [
          {
            "speaker": "sophie",
            "text": "I don't know."
          },
          {
            "speaker": "sophie",
            "text": "I've been asking myself the same thing."
          },
          {
            "speaker": "sophie",
            "text": "Maybe there's a perfectly ordinary explanation."
          }
        ],
        "d": [
          {
            "speaker": "sophie",
            "text": "..."
          },
          {
            "speaker": "wait",
            "duration": 3000,
            "typing": true
          },
          {
            "speaker": "sophie",
            "text": "It's complicated."
          },
          {
            "speaker": "sophie",
            "text": "I'm not trying to be mysterious."
          },
          {
            "speaker": "sophie",
            "text": "I just don't know where to start."
          }
        ]
      },
      "after": [
        {
          "speaker": "sophie",
          "text": "Can I ask if you've ever spoken to anyone called Daniel?"
        },
        {
          "speaker": "sophie",
          "text": "Even online?"
        },
        {
          "speaker": "sophie",
          "text": "Maybe a long time ago?"
        }
      ]
    },
    {
      "id": "05",
      "choices": [
        {
          "id": "a",
          "text": "No. Definitely not."
        },
        {
          "id": "b",
          "text": "I talk to a lot of people online. I wouldn't remember everyone."
        },
        {
          "id": "c",
          "text": "Maybe? I really don't know."
        },
        {
          "id": "d",
          "text": "If you tell me a little about him, maybe I can figure out whether we've crossed paths.",
          "premiumChoice": true
        }
      ],
      "responses": {
        "a": [
          {
            "speaker": "sophie",
            "text": "Okay."
          },
          {
            "speaker": "sophie",
            "text": "Thanks for being clear."
          },
          {
            "speaker": "sophie",
            "text": "That makes this even stranger, though."
          }
        ],
        "b": [
          {
            "speaker": "sophie",
            "text": "Fair."
          },
          {
            "speaker": "sophie",
            "text": "I guess there's no way to remember every conversation."
          },
          {
            "speaker": "sophie",
            "text": "Especially if it was years ago."
          }
        ],
        "c": [
          {
            "speaker": "sophie",
            "text": "That's okay."
          },
          {
            "speaker": "sophie",
            "text": "I'd rather you say that than pretend you remember something."
          }
        ],
        "d": [
          {
            "speaker": "sophie",
            "text": "You'd do that?"
          },
          {
            "speaker": "player",
            "text": "Doesn't hurt to check."
          },
          {
            "speaker": "sophie",
            "text": "Okay."
          },
          {
            "speaker": "wait",
            "duration": 2000,
            "typing": false
          },
          {
            "speaker": "sophie",
            "text": "He can be pretty quiet when he first meets someone."
          },
          {
            "speaker": "sophie",
            "text": "But then he'll randomly send you something at two in the morning because he remembered a conversation you had weeks ago."
          },
          {
            "speaker": "sophie",
            "text": "And he has this annoying habit of saying \"I'll explain later.\""
          },
          {
            "speaker": "sophie",
            "text": "Usually, he does."
          },
          {
            "speaker": "wait",
            "duration": 3000,
            "typing": false
          },
          {
            "speaker": "sophie",
            "text": "Sorry."
          },
          {
            "speaker": "sophie",
            "text": "That probably doesn't help."
          },
          {
            "speaker": "player",
            "text": "It tells me a little about him."
          },
          {
            "speaker": "sophie",
            "text": "Yeah."
          },
          {
            "speaker": "sophie",
            "text": "I suppose it does."
          }
        ]
      },
      "after": [
        {
          "speaker": "sophie",
          "text": "Anyway."
        },
        {
          "speaker": "sophie",
          "text": "If you don't know him, then I guess that answers one question."
        },
        {
          "speaker": "wait",
          "duration": 2000,
          "typing": false
        },
        {
          "speaker": "sophie",
          "text": "Just not the one I really wanted answered."
        },
        {
          "speaker": "sophie",
          "text": "Sorry."
        },
        {
          "speaker": "sophie",
          "text": "I keep making this awkward."
        },
        {
          "speaker": "sophie",
          "text": "You probably have better things to do than talk to a stranger."
        }
      ]
    },
    {
      "id": "06",
      "choices": [
        {
          "id": "a",
          "text": "It's fine. What were you hoping to find out?"
        },
        {
          "id": "b",
          "text": "You're making me curious now."
        },
        {
          "id": "c",
          "text": "I'm still not convinced this isn't some kind of scam."
        },
        {
          "id": "d",
          "text": "If something's wrong, just tell me."
        }
      ],
      "responses": {
        "a": [
          {
            "speaker": "sophie",
            "text": "Why your number was saved."
          },
          {
            "speaker": "sophie",
            "text": "Whether Daniel knew you."
          },
          {
            "speaker": "sophie",
            "text": "Whether you'd heard from him recently."
          }
        ],
        "b": [
          {
            "speaker": "sophie",
            "text": "That's probably my fault."
          },
          {
            "speaker": "sophie",
            "text": "I didn't mean to turn this into some weird mystery."
          },
          {
            "speaker": "sophie",
            "text": "I just wanted one thing to make sense."
          }
        ],
        "c": [
          {
            "speaker": "sophie",
            "text": "I get that."
          },
          {
            "speaker": "sophie",
            "text": "I'd probably think the same thing."
          },
          {
            "speaker": "sophie",
            "text": "I'm not asking for money or anything personal."
          },
          {
            "speaker": "sophie",
            "text": "You don't even have to tell me your name."
          }
        ],
        "d": [
          {
            "speaker": "wait",
            "duration": 4000,
            "typing": true
          },
          {
            "speaker": "sophie",
            "text": "Something is wrong."
          },
          {
            "speaker": "sophie",
            "text": "I just don't know how much I should tell you."
          },
          {
            "speaker": "sophie",
            "text": "I barely know you."
          }
        ]
      },
      "after": [
        {
          "speaker": "wait",
          "duration": 3000,
          "typing": false
        },
        {
          "speaker": "sophie",
          "text": "Daniel hasn't been answering anyone."
        },
        {
          "speaker": "sophie",
          "text": "Calls, messages..."
        },
        {
          "speaker": "sophie",
          "text": "Nothing."
        },
        {
          "speaker": "wait",
          "duration": 2000,
          "typing": true
        },
        {
          "speaker": "sophie",
          "text": "For days."
        }
      ]
    },
    {
      "id": "07",
      "choices": [
        {
          "id": "a",
          "text": "Maybe he needs some time alone?"
        },
        {
          "id": "b",
          "text": "Have you checked whether he's okay?"
        },
        {
          "id": "c",
          "text": "That's worrying."
        },
        {
          "id": "d",
          "text": "And you think I know where he is?"
        }
      ],
      "responses": {
        "a": [
          {
            "speaker": "sophie",
            "text": "I thought that too."
          },
          {
            "speaker": "sophie",
            "text": "At first."
          },
          {
            "speaker": "sophie",
            "text": "But it's gone on longer than anyone expected."
          }
        ],
        "b": [
          {
            "speaker": "sophie",
            "text": "We've tried."
          },
          {
            "speaker": "sophie",
            "text": "More than once."
          },
          {
            "speaker": "sophie",
            "text": "I wouldn't be messaging random numbers if we hadn't."
          }
        ],
        "c": [
          {
            "speaker": "sophie",
            "text": "Yeah."
          },
          {
            "speaker": "sophie",
            "text": "It is."
          },
          {
            "speaker": "sophie",
            "text": "And it's getting harder to pretend I'm not worried."
          }
        ],
        "d": [
          {
            "speaker": "sophie",
            "text": "No."
          },
          {
            "speaker": "sophie",
            "text": "Or... I don't know."
          },
          {
            "speaker": "sophie",
            "text": "I thought you might've talked to him."
          },
          {
            "speaker": "sophie",
            "text": "Maybe he mentioned something."
          }
        ]
      },
      "after": [
        {
          "speaker": "sophie",
          "text": "Sorry."
        },
        {
          "speaker": "sophie",
          "text": "I shouldn't have dropped all that on you."
        },
        {
          "speaker": "sophie",
          "text": "We don't even know each other."
        }
      ]
    },
    {
      "id": "08",
      "choices": [
        {
          "id": "a",
          "text": "You can call me [PLAYER_NAME]."
        },
        {
          "id": "b",
          "text": "You haven't earned my name yet."
        },
        {
          "id": "c",
          "text": "Does my name really matter?"
        },
        {
          "id": "d",
          "text": "Maybe we should start over. Hi, Sophie. I'm [PLAYER_NAME].",
          "premiumChoice": true
        }
      ],
      "responses": {
        "a": [
          {
            "speaker": "sophie",
            "text": "[PLAYER_NAME]."
          },
          {
            "speaker": "sophie",
            "text": "Okay. Nice to meet you."
          },
          {
            "speaker": "sophie",
            "text": "Under very strange circumstances. 😅"
          }
        ],
        "b": [
          {
            "speaker": "sophie",
            "text": "Fair enough."
          },
          {
            "speaker": "sophie",
            "text": "I probably wouldn't give mine out either."
          },
          {
            "speaker": "sophie",
            "text": "Which is ironic, considering I already did."
          }
        ],
        "c": [
          {
            "speaker": "sophie",
            "text": "Not really."
          },
          {
            "speaker": "sophie",
            "text": "I guess I just felt weird calling you \"the person with the number.\""
          },
          {
            "speaker": "sophie",
            "text": "You don't have to tell me."
          }
        ],
        "d": [
          {
            "speaker": "sophie",
            "text": "..."
          },
          {
            "speaker": "sophie",
            "text": "Okay, that actually made me smile."
          },
          {
            "speaker": "sophie",
            "text": "Hi, [PLAYER_NAME]."
          },
          {
            "speaker": "sophie",
            "text": "I'm Sophie."
          },
          {
            "speaker": "sophie",
            "text": "And I promise I don't normally introduce myself by talking about missing people."
          },
          {
            "speaker": "player",
            "text": "Good to know."
          },
          {
            "speaker": "sophie",
            "text": "Usually I wait until at least the second conversation."
          },
          {
            "speaker": "player",
            "text": "That's reassuring."
          },
          {
            "speaker": "sophie",
            "text": "😂"
          },
          {
            "speaker": "sophie",
            "text": "Sorry."
          },
          {
            "speaker": "sophie",
            "text": "I haven't laughed much lately."
          },
          {
            "speaker": "sophie",
            "text": "Thank you."
          }
        ]
      },
      "after": [
        {
          "speaker": "sophie",
          "text": "Can I be honest about something?"
        },
        {
          "speaker": "sophie",
          "text": "I almost deleted your number before messaging you."
        }
      ]
    },
    {
      "id": "09",
      "choices": [
        {
          "id": "a",
          "text": "Why didn't you?"
        },
        {
          "id": "b",
          "text": "Probably would've saved us both some confusion."
        },
        {
          "id": "c",
          "text": "Are you glad you didn't?"
        },
        {
          "id": "d",
          "text": "What changed your mind?"
        }
      ],
      "responses": {
        "a": [
          {
            "speaker": "sophie",
            "text": "I kept thinking about the fact that it had been saved."
          },
          {
            "speaker": "sophie",
            "text": "There had to be a reason."
          },
          {
            "speaker": "sophie",
            "text": "Or at least I hoped there was."
          }
        ],
        "b": [
          {
            "speaker": "sophie",
            "text": "You're not wrong."
          },
          {
            "speaker": "sophie",
            "text": "I really didn't think this through."
          },
          {
            "speaker": "sophie",
            "text": "Sorry."
          }
        ],
        "c": [
          {
            "speaker": "wait",
            "duration": 2000,
            "typing": true
          },
          {
            "speaker": "sophie",
            "text": "I think so."
          },
          {
            "speaker": "sophie",
            "text": "You haven't blocked me yet."
          },
          {
            "speaker": "sophie",
            "text": "So that's something. 😅"
          }
        ],
        "d": [
          {
            "speaker": "sophie",
            "text": "Nothing dramatic."
          },
          {
            "speaker": "sophie",
            "text": "I was staring at the number."
          },
          {
            "speaker": "sophie",
            "text": "And I realized I was more afraid of never knowing than of getting it wrong."
          }
        ]
      },
      "after": [
        {
          "speaker": "sophie",
          "text": "Anyway."
        },
        {
          "speaker": "sophie",
          "text": "I should probably let you go."
        },
        {
          "speaker": "sophie",
          "text": "You've already been more patient than I expected."
        },
        {
          "speaker": "wait",
          "duration": 3000,
          "typing": false
        },
        {
          "speaker": "wait",
          "duration": 3000,
          "typing": true
        },
        {
          "speaker": "wait",
          "duration": 2000,
          "typing": false
        },
        {
          "speaker": "sophie",
          "text": "Actually, wait."
        },
        {
          "speaker": "sophie",
          "text": "There's something else."
        },
        {
          "speaker": "sophie",
          "text": "I wasn't sure if I should mention it."
        }
      ]
    },
    {
      "id": "10",
      "choices": [
        {
          "id": "a",
          "text": "I'm listening."
        },
        {
          "id": "b",
          "text": "You keep saying that."
        },
        {
          "id": "c",
          "text": "Is this about Daniel again?"
        },
        {
          "id": "d",
          "text": "You've been trying to say something since you first messaged me. What is it?",
          "premiumChoice": true
        }
      ],
      "responses": {
        "a": [
          {
            "speaker": "sophie",
            "text": "Okay."
          },
          {
            "speaker": "sophie",
            "text": "Just give me a second."
          }
        ],
        "b": [
          {
            "speaker": "sophie",
            "text": "I know."
          },
          {
            "speaker": "sophie",
            "text": "I'm terrible at this."
          },
          {
            "speaker": "sophie",
            "text": "Sorry."
          }
        ],
        "c": [
          {
            "speaker": "sophie",
            "text": "Yeah."
          },
          {
            "speaker": "sophie",
            "text": "It is."
          },
          {
            "speaker": "sophie",
            "text": "I promise I'm getting to the point."
          }
        ],
        "d": [
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
            "text": "You're pretty observant."
          },
          {
            "speaker": "player",
            "text": "You've started typing and stopped a few times."
          },
          {
            "speaker": "sophie",
            "text": "I didn't realize you could tell."
          },
          {
            "speaker": "player",
            "text": "I could."
          },
          {
            "speaker": "sophie",
            "text": "I keep rewriting the same message."
          },
          {
            "speaker": "sophie",
            "text": "Every version sounds worse than the last."
          },
          {
            "speaker": "player",
            "text": "Then don't try to make it perfect."
          },
          {
            "speaker": "wait",
            "duration": 3000,
            "typing": true
          },
          {
            "speaker": "sophie",
            "text": "Okay."
          },
          {
            "speaker": "sophie",
            "text": "I'll try."
          }
        ]
      },
      "after": [
        {
          "speaker": "sophie",
          "text": "I'm not the only one trying to understand what happened."
        },
        {
          "speaker": "sophie",
          "text": "There are a few other people."
        },
        {
          "speaker": "sophie",
          "text": "People who know Daniel."
        },
        {
          "speaker": "sophie",
          "text": "We've been talking."
        },
        {
          "speaker": "sophie",
          "text": "Although \"talking\" might be a generous way of putting it lately."
        }
      ]
    },
    {
      "id": "11",
      "choices": [
        {
          "id": "a",
          "text": "What do you mean?"
        },
        {
          "id": "b",
          "text": "Are they arguing?"
        },
        {
          "id": "c",
          "text": "Then why are you asking me instead of them?"
        },
        {
          "id": "d",
          "text": "Maybe they know something you don't."
        }
      ],
      "responses": {
        "a": [
          {
            "speaker": "sophie",
            "text": "Everyone has their own idea of what we should do."
          },
          {
            "speaker": "sophie",
            "text": "And no one seems to agree."
          }
        ],
        "b": [
          {
            "speaker": "sophie",
            "text": "A little."
          },
          {
            "speaker": "sophie",
            "text": "Okay, maybe more than a little."
          },
          {
            "speaker": "sophie",
            "text": "People are stressed."
          }
        ],
        "c": [
          {
            "speaker": "sophie",
            "text": "I've asked them."
          },
          {
            "speaker": "sophie",
            "text": "A lot."
          },
          {
            "speaker": "sophie",
            "text": "But none of them recognize the number either."
          }
        ],
        "d": [
          {
            "speaker": "sophie",
            "text": "Maybe."
          },
          {
            "speaker": "sophie",
            "text": "That's one of the things that scares me."
          },
          {
            "speaker": "sophie",
            "text": "I don't know if we're all working with the same information."
          }
        ]
      },
      "after": [
        {
          "speaker": "sophie",
          "text": "There's a group chat."
        },
        {
          "speaker": "sophie",
          "text": "We've been using it to keep track of things."
        },
        {
          "speaker": "sophie",
          "text": "Well..."
        },
        {
          "speaker": "sophie",
          "text": "Trying to."
        },
        {
          "speaker": "sophie",
          "text": "I was thinking..."
        },
        {
          "speaker": "wait",
          "duration": 2000,
          "typing": false
        },
        {
          "speaker": "sophie",
          "text": "Maybe you could join us?"
        },
        {
          "speaker": "sophie",
          "text": "Just for a little while."
        },
        {
          "speaker": "sophie",
          "text": "You don't have to do anything."
        },
        {
          "speaker": "sophie",
          "text": "You could just listen."
        }
      ]
    },
    {
      "id": "12",
      "choices": [
        {
          "id": "a",
          "text": "Why would I join a group of strangers?"
        },
        {
          "id": "b",
          "text": "You haven't told them about me, have you?"
        },
        {
          "id": "c",
          "text": "I don't even know Daniel."
        },
        {
          "id": "d",
          "text": "Would they be okay with that?"
        }
      ],
      "responses": {
        "a": [
          {
            "speaker": "sophie",
            "text": "That's a very good question."
          },
          {
            "speaker": "sophie",
            "text": "And I don't have a very convincing answer."
          },
          {
            "speaker": "sophie",
            "text": "I just thought maybe you'd notice something we missed."
          }
        ],
        "b": [
          {
            "speaker": "sophie",
            "text": "I mentioned the number."
          },
          {
            "speaker": "sophie",
            "text": "But I haven't told them we're talking."
          },
          {
            "speaker": "sophie",
            "text": "Not yet."
          }
        ],
        "c": [
          {
            "speaker": "sophie",
            "text": "I know."
          },
          {
            "speaker": "sophie",
            "text": "That's part of why it's strange."
          },
          {
            "speaker": "sophie",
            "text": "Your number was there anyway."
          }
        ],
        "d": [
          {
            "speaker": "wait",
            "duration": 3000,
            "typing": false
          },
          {
            "speaker": "sophie",
            "text": "Honestly?"
          },
          {
            "speaker": "sophie",
            "text": "Some of them probably won't be happy."
          },
          {
            "speaker": "sophie",
            "text": "But I think it's worth asking."
          }
        ]
      },
      "after": [
        {
          "speaker": "sophie",
          "text": "Look."
        },
        {
          "speaker": "sophie",
          "text": "I'm not asking you to solve anything."
        },
        {
          "speaker": "sophie",
          "text": "And I don't expect you to believe everything I'm saying."
        },
        {
          "speaker": "sophie",
          "text": "I'd be suspicious too."
        },
        {
          "speaker": "sophie",
          "text": "But if there's even a small chance your number means something..."
        },
        {
          "speaker": "sophie",
          "text": "I don't want to ignore it."
        }
      ]
    },
    {
      "id": "13",
      "choices": [
        {
          "id": "a",
          "text": "Alright. Add me."
        },
        {
          "id": "b",
          "text": "Only if I can leave whenever I want."
        },
        {
          "id": "c",
          "text": "I'm not promising anything."
        },
        {
          "id": "d",
          "text": "No. This is getting too weird."
        }
      ],
      "responses": {
        "a": [
          {
            "speaker": "sophie",
            "text": "Really?"
          },
          {
            "speaker": "sophie",
            "text": "Okay."
          },
          {
            "speaker": "sophie",
            "text": "Thank you."
          },
          {
            "speaker": "sophie",
            "text": "I'll send you an invite."
          }
        ],
        "b": [
          {
            "speaker": "sophie",
            "text": "Of course."
          },
          {
            "speaker": "sophie",
            "text": "I'm not going to trap you in a group chat. 😅"
          },
          {
            "speaker": "sophie",
            "text": "You can leave whenever."
          }
        ],
        "c": [
          {
            "speaker": "sophie",
            "text": "I wouldn't ask you to."
          },
          {
            "speaker": "sophie",
            "text": "Just being there would help."
          },
          {
            "speaker": "sophie",
            "text": "Even if it's only for a few minutes."
          }
        ],
        "d": [
          {
            "speaker": "wait",
            "duration": 3000,
            "typing": false
          },
          {
            "speaker": "sophie",
            "text": "Yeah."
          },
          {
            "speaker": "sophie",
            "text": "I understand."
          },
          {
            "speaker": "sophie",
            "text": "I'm sorry for putting you in this position."
          },
          {
            "speaker": "sophie",
            "text": "I won't bother you again."
          },
          {
            "speaker": "wait",
            "duration": 5000,
            "typing": false
          },
          {
            "speaker": "sophie",
            "text": "Sorry. One last thing."
          },
          {
            "speaker": "sophie",
            "text": "I know I said I wouldn't bother you again."
          },
          {
            "speaker": "sophie",
            "text": "But I'm going to leave the invitation here."
          },
          {
            "speaker": "sophie",
            "text": "You don't have to accept it."
          },
          {
            "speaker": "sophie",
            "text": "If you change your mind, it'll be there."
          }
        ]
      },
      "after": []
    },
    {
      "id": "14",
      "choices": [
        {
          "id": "a",
          "text": "I can handle it."
        },
        {
          "id": "b",
          "text": "That sounds promising."
        },
        {
          "id": "c",
          "text": "Is there someone I should avoid?"
        },
        {
          "id": "d",
          "text": "If anyone gives me trouble, I'm blaming you. 😉",
          "premiumChoice": true
        }
      ],
      "responses": {
        "a": [
          {
            "speaker": "sophie",
            "text": "Good."
          },
          {
            "speaker": "sophie",
            "text": "Because I can't guarantee a warm welcome."
          }
        ],
        "b": [
          {
            "speaker": "sophie",
            "text": "I know, right?"
          },
          {
            "speaker": "sophie",
            "text": "Really selling this group chat. 😅"
          }
        ],
        "c": [
          {
            "speaker": "sophie",
            "text": "I wouldn't say avoid."
          },
          {
            "speaker": "sophie",
            "text": "Just don't take everything personally."
          },
          {
            "speaker": "sophie",
            "text": "That's probably the best advice I can give you."
          }
        ],
        "d": [
          {
            "speaker": "sophie",
            "text": "Wow."
          },
          {
            "speaker": "sophie",
            "text": "We haven't even met and you're already making threats."
          },
          {
            "speaker": "player",
            "text": "Just establishing the rules."
          },
          {
            "speaker": "sophie",
            "text": "😂"
          },
          {
            "speaker": "sophie",
            "text": "Okay, okay."
          },
          {
            "speaker": "sophie",
            "text": "I'll take responsibility."
          },
          {
            "speaker": "sophie",
            "text": "But if someone starts an argument, you're on your own."
          },
          {
            "speaker": "player",
            "text": "What happened to being friendly?"
          },
          {
            "speaker": "sophie",
            "text": "I said I was friendly."
          },
          {
            "speaker": "sophie",
            "text": "Not brave."
          }
        ]
      },
      "after": [
        {
          "speaker": "sophie",
          "text": "Anyway."
        },
        {
          "speaker": "sophie",
          "text": "Here goes nothing."
        },
        {
          "speaker": "wait",
          "duration": 2000,
          "typing": false
        }
      ]
    }
  ],
  "standardWarning": [
    {
      "speaker": "sophie",
      "text": "Okay, before you join..."
    },
    {
      "speaker": "sophie",
      "text": "Just so you know."
    },
    {
      "speaker": "sophie",
      "text": "Not everyone in there is as friendly as me."
    },
    {
      "speaker": "wait",
      "duration": 2000,
      "typing": false
    },
    {
      "speaker": "sophie",
      "text": "Wow. That sounded incredibly arrogant."
    },
    {
      "speaker": "sophie",
      "text": "You know what I mean. 😅"
    }
  ],
  "delayedWarning": [
    {
      "speaker": "sophie",
      "text": "Hey."
    },
    {
      "speaker": "sophie",
      "text": "I saw you accepted."
    },
    {
      "speaker": "sophie",
      "text": "Thanks for giving this a chance."
    },
    {
      "speaker": "sophie",
      "text": "Just so you know, things have been a little tense in there."
    }
  ]
} as const
