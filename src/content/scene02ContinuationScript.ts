// Exact owner-supplied continuation, imported by scripts/import-scene02-continuation.py.
export const scene02Continuation = {
  "missing08D": "M Honestly?\nM We probably should have done that earlier.\nS Maya...\nM I'm not blaming you.\nM I'm saying we should've agreed on what to do before involving someone else.\nL Finally.",
  "before09": "W 3\nS Fine.\nS What do you want me to do?\nL I want us to stop sharing things until we know who we're sharing them with.\nM That seems reasonable.\nS So what?\nS We just ignore the number?\nL No.\nL We verify it.\nS How?\nL I don't know yet.\nS Exactly.\nL Not knowing how to do something doesn't mean we should do the first thing that comes to mind.\nS And waiting doesn't guarantee we'll learn anything!\nW 3\nM Can both of you stop for a second?\nS Sorry.\nL I'm listening.\nM Nobody here knows what happened to Daniel.\nM We keep going in circles.\nM We don't even agree about what happened that night.\nS Maya.\nM What?\nS Don't.\nW 2\nL She's right.\nM ...\nL We keep acting like we have all these answers.\nL But we don't.\nS Can we please not do this right now?\nM I'm not trying to start anything.\nM I'm just saying we need to stop mixing up what we know and what we think we know.\nL Exactly.\nW 2\nS Okay.\nS You're right.\nS Both of you.",
  "choices": [
    {
      "id": "09",
      "branches": [
        {
          "text": "What happened that night?",
          "script": "M That's what we're trying to establish.\nL Which is why we shouldn't be discussing it with someone we just met.\nS Lucas has a point.\nW 2\nS Sorry.\nS I know that's frustrating."
        },
        {
          "text": "You don't agree about Daniel's disappearance?",
          "script": "M We agree he hasn't been in contact.\nM The details are where things get complicated.\nL And we don't know what to make of them yet."
        },
        {
          "text": "Sounds like there's something you're not telling me.",
          "script": "S There are things we haven't figured out ourselves.\nL And some things aren't yours to know.\nM Lucas, enough.\nM They asked a reasonable question."
        },
        {
          "text": "You don't have to discuss that with me here.",
          "script": "W 2\nM Thanks.\nS Yeah.\nS Thank you.\nL At least someone understands.",
          "effects": {
            "sophie": {
              "trust": 2
            },
            "maya": {
              "trust": 2
            }
          }
        },
        {
          "text": "Maybe start with one thing you're all certain of. Not theories. Just something you can actually confirm.",
          "script": "W 3\nM Okay.\nM Daniel hasn't answered anyone here.\nS Right.\nL As far as we know.\nM That's an important distinction.\nP Good. Then that's what you know.\nP Everything else still needs checking.\nW 2\nS I wish we'd done this yesterday.\nL We've been trying.\nM Then maybe we need to try differently.",
          "premium": true,
          "effects": {
            "maya": {
              "trust": 3
            },
            "sophie": {
              "trust": 2
            }
          }
        }
      ],
      "after": "W 3\nD maya\nS Maya?\nM Sorry.\nM Wrong chat.\nL What did you delete?\nM A message meant for someone else.\nL About what?\nM Something unrelated.\nL Right.\nM Lucas.\nL What?\nM Please don't make something out of nothing.\nW 3\nL You know what bothers me the most?\nS What?\nL We keep saying we trust each other.\nL But the moment something goes wrong, suddenly everyone has something they don't want to explain.\nM That's not fair.\nL Isn't it?\nS What are you trying to say?\nL I'm saying maybe we should stop pretending everything's fine.\nM Nobody's pretending everything's fine.\nL Then why does it feel like I'm the only one asking the obvious questions?\nS You're not.\nL Really?\nS Really.\nL Then answer this.\nW 2\nL Why does Daniel have a stranger's number saved without a name?\nS I don't know.\nL Who marked it with a star?\nS I don't know!\nL Why has nobody heard from him?\nS LUCAS!\nW 4\nM Stop.\nM Both of you.\nW 3"
    },
    {
      "id": "10",
      "branches": [
        {
          "text": "None of you has enough information to answer those questions.",
          "script": "M Exactly.\nL Then maybe we shouldn't be acting like we do.\nS I'm not!\nL Then stop making decisions for everyone."
        },
        {
          "text": "Lucas, you're not helping.",
          "script": "L I wasn't aware I needed your approval.\nS Lucas, please.\nM Can we stop turning every sentence into a fight?\nL Apparently not.",
          "effects": {
            "lucas": {
              "suspicion": 3
            }
          }
        },
        {
          "text": "I understand why you're frustrated.",
          "script": "L Do you?\nP I understand why you'd want answers.\nL Good.\nL Then you understand why I don't want to keep guessing.\nM We all want answers.",
          "effects": {
            "lucas": {
              "suspicion": -2
            }
          }
        },
        {
          "text": "I didn't ask to be dragged into this.",
          "script": "S I know.\nS I'm sorry.\nL Then maybe this was a mistake from the beginning.\nM Lucas.\nL What?\nL Somebody had to say it."
        }
      ],
      "after": "W 3\nS Fine.\nS Maybe adding someone was a mistake.\nS But I still think ignoring the number would've been worse.\nL That's your opinion.\nS Yes.\nS It is.\nW 2\nM Nobody has to decide everything right now.\nL No.\nL But we do have to decide what we're willing to risk.\nS What does that mean?\nL It means I'm not comfortable with this anymore.\nM With what?\nL With how we're handling everything.\nS Lucas...\nL No, Sophie.\nL I've been trying to say this for days.\nL Every time I question something, you act like I'm making things harder.\nS Because sometimes you are!\nW 3\nL ...\nM Sophie.\nS I'm sorry.\nS I didn't mean—\nL No.\nL You did.\nW 3\nS Lucas, please.\nL I'm not doing this.\nM Don't be dramatic.\nL I'm not being dramatic.\nL I'm stepping away before I say something I regret.\nS We're all upset.\nL That's not the point.\nS Then what is?\nL The point is that none of us knows who we're supposed to trust right now.\nW 2\nL And apparently I'm the only one willing to admit it."
    },
    {
      "id": "11",
      "branches": [
        {
          "text": "You don't have to trust me.",
          "script": "L Good.\nL Because I don't.\nM Nobody's asking you to.\nL Then we're clear."
        },
        {
          "text": "Leaving won't help Daniel.",
          "script": "L Neither will sitting here arguing with strangers.\nS Lucas...\nL I need some space."
        },
        {
          "text": "Maybe taking a break is a good idea.",
          "script": "W 2\nL Yeah.\nL Maybe it is.\nM Just don't disappear on us.\nL I'm not disappearing.\nL I'm turning off a group chat.\nL There's a difference."
        },
        {
          "text": "You haven't given me a reason to trust you either.",
          "script": "L Then don't.\nL At least we understand each other.\nS That's enough.\nL For once, I agree.",
          "effects": {
            "lucas": {
              "suspicion": 3
            }
          }
        },
        {
          "text": "You don't know me. I don't know you. But I don't think Daniel would be helped by any of us deciding who's guilty before we know what happened.",
          "script": "W 3\nL ...\nL I never said you were guilty.\nP You haven't exactly ruled it out.\nL No.\nL I haven't.\nW 2\nL But you're right about one thing.\nL We don't know what happened.\nM Then stay. We can figure it out.\nL Not like this.\nS Lucas...\nL I need to think.",
          "premium": true,
          "effects": {
            "lucas": {
              "suspicion": -3
            },
            "maya": {
              "trust": 2
            }
          }
        }
      ],
      "after": "W 3\nL Sophie.\nS Yeah?\nL Please be careful.\nS I am being careful.\nL I know you think you are.\nW 2\nL That's what worries me.\nT lucas\nW 4\nX lucas\nW 4\nS Lucas, seriously?\nW 2\nM He's gone, Soph.\nS I can see that.\nW 3\nM You should've told us before adding someone.\nS Would you have said yes?\nM That's not the point.\nD maya\nW 2\nS Can we not do this here?\nM Fine.\nM But we need to talk about this.\nS I know.\nW 2\nM Later, then.\nO maya\nW 4\nS ...\nS Well.\nS That went brilliantly."
    },
    {
      "id": "12",
      "branches": [
        {
          "text": "I didn't mean to cause trouble.",
          "script": "S I know.\nS You didn't.\nS This started long before you joined.\nS I'm sorry you had to see it."
        },
        {
          "text": "Are they always like this?",
          "script": "S No.\nS Well...\nS Not usually this bad.\nS Things have just been tense lately."
        },
        {
          "text": "Maybe Lucas just needs some time.",
          "script": "S Maybe.\nS He doesn't usually walk away like that.\nS I hope he's okay."
        },
        {
          "text": "If you want me to leave, just say so.",
          "script": "S No.\nS I don't want that.\nS But I understand if you want to.\nS I haven't exactly made a great first impression."
        },
        {
          "text": "You don't have to fix everything tonight, Sophie. And you don't have to apologize for everyone's feelings.",
          "script": "W 3\nS ...\nS That's a really kind thing to say.\nS I just feel like everything I do makes things worse.\nP You're trying to help someone you care about.\nS Yeah.\nS I am.\nW 2\nS Thanks.\nS Really.",
          "premium": true,
          "effects": {
            "sophie": {
              "trust": 3,
              "affinity": 2
            }
          }
        }
      ],
      "after": "W 3\nS Listen.\nS I think I owe you an explanation.\nS But I'd rather not have this conversation in front of everyone.\nW 2\nS Can we talk privately?"
    },
    {
      "id": "13",
      "branches": [
        {
          "text": "Sure.",
          "script": "S Thank you.\nS I'll message you."
        },
        {
          "text": "Okay. I'm listening.",
          "script": "S Not here.\nS Give me a second."
        },
        {
          "text": "About time.",
          "script": "S Fair. 😅\nS I'll explain what I can."
        },
        {
          "text": "I'd rather know what I'm getting into first.",
          "script": "S That's understandable.\nS I just don't want the group arguing over every word.\nS We can talk one-on-one, if you're okay with that."
        }
      ],
      "after": "W 2\nS I'll send you a message.\nW 2\nS And...\nS I'm sorry about all of this.\nO sophie"
    }
  ]
} as const
