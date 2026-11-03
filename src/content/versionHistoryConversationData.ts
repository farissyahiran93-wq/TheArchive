// Authored dialogue pinned in docs/sources/version-history-2026-10-28/NARRATIVE.md.
// Origin wording revised in docs/sources/trace-origin-2026-11-02/NARRATIVE.md.
export const versionHistoryDialogue = [
  {
    "id": "s05_c01_investigation_order",
    "prelude": [
      "The reference matches the title.",
      "But a matching title isn't a version history.",
      "If you want to understand the difference, there are two things to look at.",
      "The article people can read.",
      "And the reference that survived.",
      "Where would you start?"
    ],
    "branches": [
      {
        "id": "a",
        "text": "I'll start with the article everyone can see.",
        "replies": [
          "Good.",
          "At least that gives you something readable.",
          "Pay attention to what the page actually says.",
          "Not what you think happened to it."
        ]
      },
      {
        "id": "b",
        "text": "I want to understand the index first.",
        "replies": [
          "Then start with what it contains.",
          "And notice what it doesn't.",
          "A reference can point to something without preserving the thing itself."
        ]
      },
      {
        "id": "c",
        "text": "The update label caught my attention.",
        "replies": [
          "Mine too.",
          "But that's exactly why you need to be careful.",
          "A label is information.",
          "It isn't a confession."
        ]
      }
    ],
    "convergence": []
  },
  {
    "id": "s05_c02_update_label",
    "prelude": [
      "There's an update label on the public page.",
      "What did you make of it?"
    ],
    "branches": [
      {
        "id": "a",
        "text": "It says the article was updated. It doesn't say what changed.",
        "replies": [
          "Exactly.",
          "That's something we can establish.",
          "The page displays an update label.",
          "Anything beyond that needs another source."
        ]
      },
      {
        "id": "b",
        "text": "So someone rewrote the article?",
        "replies": [
          "Maybe.",
          "Or maybe the update was something smaller.",
          "A correction.",
          "A formatting change.",
          "Something else entirely.",
          "We don't have a record telling us which."
        ]
      },
      {
        "id": "c",
        "text": "Could it just be a normal update?",
        "replies": [
          "Of course.",
          "That's one possibility.",
          "But calling it routine without a record would be another guess.",
          "The label gives you a reason to ask.",
          "Not an answer."
        ]
      }
    ],
    "convergence": [
      "An update label tells us the page carries an update marker.",
      "It doesn't show us an earlier copy.",
      "Keep that distinction."
    ]
  },
  {
    "id": "s05_c03_index_meaning",
    "prelude": [
      "Now compare it with the Archive record.",
      "Same title.",
      "But no article text.",
      "What does that tell you?"
    ],
    "branches": [
      {
        "id": "a",
        "text": "There's a matching reference, but the article itself isn't there.",
        "replies": [
          "Yes.",
          "That's the part we can actually verify from this view.",
          "The reference is visible.",
          "The original content isn't."
        ]
      },
      {
        "id": "b",
        "text": "Could it be an older version?",
        "replies": [
          "Could be.",
          "But don't call it one yet.",
          "There's no verified capture time.",
          "And no earlier text to read."
        ]
      },
      {
        "id": "c",
        "text": "Are you saying someone changed the article?",
        "replies": [
          "I'm saying the records don't match in what they contain.",
          "One has a readable article.",
          "The other has a reference.",
          "That's not proof anyone changed the article."
        ]
      }
    ],
    "convergence": [
      "You can have two records connected to the same title.",
      "And still know almost nothing about their history.",
      "That's the problem here."
    ]
  },
  {
    "id": "s05_c04_policy_meaning",
    "prelude": [
      "Greyhaven has a page explaining its update labels.",
      "Did it tell you anything useful?"
    ],
    "branches": [
      {
        "id": "a",
        "text": "It explains the labels, but not what happened to Daniel's article.",
        "replies": [
          "Right.",
          "A policy describes a process.",
          "It doesn't prove what happened in one particular case."
        ]
      },
      {
        "id": "b",
        "text": "Doesn't that mean they have a record of the changes?",
        "replies": [
          "Not necessarily.",
          "The policy may explain how updates are labelled.",
          "That doesn't tell us whether a detailed history for this article is available."
        ]
      },
      {
        "id": "c",
        "text": "Why not show readers exactly what changed?",
        "replies": [
          "That's a fair question.",
          "But I can't answer it for them.",
          "If you want the publisher's explanation, ask the publisher."
        ]
      }
    ],
    "convergence": [
      "The policy tells us how to interpret the label in general.",
      "It doesn't supply the missing version."
    ]
  },
  {
    "id": "s05_c05_comparison",
    "prelude": [
      "Then tell me something.",
      "If you put the public article next to the Archive reference...",
      "What can you actually compare?"
    ],
    "branches": [
      {
        "id": "a",
        "text": "Not the wording. We don't have an earlier copy.",
        "replies": [
          "Exactly.",
          "You can't compare two versions when only one is readable."
        ]
      },
      {
        "id": "b",
        "text": "The matching title makes me think the text was different.",
        "replies": [
          "I understand why.",
          "But the title is the part that matches.",
          "We haven't seen a second body of text.",
          "There's no difference we can demonstrate."
        ]
      },
      {
        "id": "c",
        "text": "What if someone deliberately removed the older version?",
        "replies": [
          "That's possible to imagine.",
          "But we can't establish it from this record.",
          "Missing content doesn't tell you why it's missing."
        ]
      }
    ],
    "convergence": [
      "Here's what we're missing.",
      "An earlier copy we can read.",
      "A change log with verified times.",
      "A before-and-after comparison.",
      "And someone who can authenticate where that index came from."
    ]
  },
  {
    "id": "s05_c06_next_strategy",
    "prelude": [
      "So now you know what you don't have.",
      "What are you going to do about it?"
    ],
    "branches": [
      {
        "id": "a",
        "text": "I'll ask the Bulletin about its update records.",
        "replies": [
          "Then ask for something specific.",
          "A date.",
          "A copy.",
          "A documented correction.",
          "Something you can check."
        ]
      },
      {
        "id": "b",
        "text": "I'd rather find another copy of the article.",
        "replies": [
          "That might help.",
          "If you find one, verify where it came from.",
          "And when it was captured.",
          "Otherwise you'll just have another record you can't place."
        ]
      },
      {
        "id": "c",
        "text": "I'll keep what we have without making an accusation.",
        "replies": [
          "That's reasonable.",
          "Save what you can verify.",
          "Leave the rest open.",
          "An unanswered question is still a question."
        ]
      }
    ],
    "convergence": [
      "Whatever you choose...",
      "Don't make the evidence say more than it does."
    ]
  },
  {
    "id": "s05_c07_private_conclusion",
    "prelude": [
      "You've seen the article.",
      "The reference.",
      "And the publisher's explanation of its update labels.",
      "So what do you think?"
    ],
    "branches": [
      {
        "id": "a",
        "text": "I think there's a reference, but not enough to prove a revision.",
        "replies": [
          "Then that's where the record stands.",
          "At least for now."
        ]
      },
      {
        "id": "b",
        "text": "I think the update deserves another look. I just don't know what changed.",
        "replies": [
          "That's a question worth keeping.",
          "Just don't mistake it for an answer."
        ]
      },
      {
        "id": "c",
        "text": "The public report and the Archive index need to stay separate.",
        "replies": [
          "Good.",
          "They can point you toward the same question.",
          "That doesn't make them the same kind of evidence."
        ]
      }
    ],
    "convergence": []
  },
  {
    "id": "s05_c08_corrections_question",
    "prelude": [
      "Questions about published articles and update records may be submitted here."
    ],
    "branches": [
      {
        "id": "a",
        "text": "Does Greyhaven Bulletin maintain publicly accessible article revision records?",
        "replies": []
      },
      {
        "id": "b",
        "text": "Can you clarify what the Updated label means for this article?",
        "replies": []
      },
      {
        "id": "c",
        "text": "Is a previous published copy of this article available for comparison?",
        "replies": []
      }
    ],
    "convergence": []
  },
  {
    "id": "s05_c09_sophie_update",
    "prelude": [
      "I kept thinking about that article.",
      "The update label, especially.",
      "I don't really know what to make of it."
    ],
    "branches": [
      {
        "id": "a",
        "text": "The label doesn't tell us what actually changed.",
        "replies": [
          "Right.",
          "I think that's what was bothering me.",
          "I wanted it to mean more than it did."
        ]
      },
      {
        "id": "b",
        "text": "Did something about the article feel wrong to you?",
        "replies": [
          "Maybe.",
          "But I don't know if that's because of the article.",
          "Or because it's about Daniel."
        ]
      },
      {
        "id": "c",
        "text": "You don't have to decide what it means yet.",
        "replies": [
          "Thanks.",
          "I think I needed to hear that.",
          "Not everything has to make sense immediately."
        ]
      }
    ],
    "convergence": [
      "I just wanted something that made it clearer.",
      "And it didn't."
    ]
  },
  {
    "id": "s05_c10_sophie_boundary",
    "prelude": [],
    "branches": [
      {
        "id": "a",
        "text": "We can keep looking without jumping to conclusions.",
        "replies": [
          "That sounds better than guessing.",
          "At least we'd know what we were actually looking for."
        ]
      },
      {
        "id": "b",
        "text": "Sometimes the honest answer is that we don't know.",
        "replies": [
          "I hate that answer.",
          "But I know you're right."
        ]
      },
      {
        "id": "c",
        "text": "We should separate what the article says from what we feel about Daniel.",
        "replies": [
          "Yeah.",
          "That's difficult for me.",
          "But I don't want to get it wrong."
        ]
      }
    ],
    "convergence": [
      "Thanks for checking instead of guessing."
    ]
  },
  {
    "id": "s05_c11_group_disclosure",
    "prelude": [
      "Does anyone actually know what changed in that article?",
      "Or are we just looking at the update label?"
    ],
    "branches": [
      {
        "id": "a",
        "text": "I checked. We don't have a confirmed before-and-after copy.",
        "replies": [
          "Okay.",
          "That's an important distinction.",
          "So we're still missing the comparison itself."
        ]
      },
      {
        "id": "b",
        "text": "There is an index reference, but it doesn't contain the original text.",
        "replies": [
          "An index reference?",
          "Can you show us what it contains?",
          "That doesn't make it an earlier version."
        ]
      },
      {
        "id": "c",
        "text": "I don't think we should speculate until we have more.",
        "replies": [
          "Fair.",
          "Then let's stick to what we can verify.",
          "Agreed."
        ]
      }
    ],
    "convergence": []
  }
] as const
export const archiveOriginDialogue = [
  {
    "speaker": "player",
    "text": "What record?"
  },
  {
    "speaker": "unknown",
    "text": "A reference to the Bulletin article about Daniel."
  },
  {
    "speaker": "unknown",
    "text": "You can view it in an app called TRACE."
  },
  {
    "speaker": "player",
    "text": "What is TRACE?"
  },
  {
    "speaker": "unknown",
    "text": "It lets you look through a collection of recovered references."
  },
  {
    "speaker": "unknown",
    "text": "Some entries point to documents."
  },
  {
    "speaker": "unknown",
    "text": "Others only have a title or reference number."
  },
  {
    "speaker": "unknown",
    "text": "An entry can be there even when the document itself is missing."
  },
  {
    "speaker": "unknown",
    "text": "Sometimes a copy of the document is included."
  },
  {
    "speaker": "unknown",
    "text": "Sometimes only the reference is left."
  },
  {
    "speaker": "player",
    "text": "So it's a backup?"
  },
  {
    "speaker": "unknown",
    "text": "Not exactly."
  },
  {
    "speaker": "unknown",
    "text": "A backup should contain a copy of the actual document."
  },
  {
    "speaker": "unknown",
    "text": "This collection doesn't always have that copy."
  },
  {
    "speaker": "unknown",
    "text": "An entry might list a title."
  },
  {
    "speaker": "unknown",
    "text": "Or a reference number."
  },
  {
    "speaker": "unknown",
    "text": "That doesn't mean the document itself is there."
  },
  {
    "speaker": "player",
    "text": "Where did it come from?"
  },
  {
    "speaker": "unknown",
    "text": "It was already incomplete when I got it."
  },
  {
    "speaker": "unknown",
    "text": "It was described as a collection of recovered indexes."
  },
  {
    "speaker": "unknown",
    "text": "I don't know who first put it together."
  },
  {
    "speaker": "unknown",
    "text": "Or where each entry came from."
  },
  {
    "speaker": "player",
    "text": "And I'm supposed to believe that?"
  },
  {
    "speaker": "unknown",
    "text": "You don't have to."
  },
  {
    "speaker": "unknown",
    "text": "Check what you can see. Don't take my explanation as proof."
  },
  {
    "speaker": "player",
    "text": "Why send it to me?"
  },
  {
    "speaker": "unknown",
    "text": "It points to the article about Daniel."
  },
  {
    "speaker": "unknown",
    "text": "You can compare the reference with the public page yourself."
  },
  {
    "speaker": "player",
    "text": "What's in the reference?"
  },
  {
    "speaker": "unknown",
    "text": "The article title and a reference number."
  },
  {
    "speaker": "unknown",
    "text": "There's no original article text in that entry."
  }
] as const
export const versionHistoryClosing = [
  "There's one thing I want you to remember.",
  "Not having a record isn't the same as proving someone destroyed it.",
  "And finding a reference isn't the same as finding what it refers to.",
  "You're looking at the edge of what's available.",
  "Not the whole picture.",
  "If you want to know more about the update...",
  "Try the people who published it.",
  "The Corrections Desk.",
  "Ask for the record.",
  "Not a theory.",
  "And if they answer...",
  "Read what they actually give you.",
  "Not what you hoped they'd say."
] as const
