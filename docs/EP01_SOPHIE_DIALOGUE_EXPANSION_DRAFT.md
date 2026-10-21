> Runtime integration update (19 Oct 2026): see [the current integration audit and scene crosswalk](EP01_FULL_INTEGRATION_REPORT_2026-10-19.md). Paced Sophie messages, explicit recovery dialogue, disclosure branches and the public Bulletin handoff now run in code. Earlier implementation/QA limitations below are historical; use the new report for executed results. The 14 bible beats do not add canonical scenes.

# Episode 1 — Sophie conversation expansion (D)

Authoring draft, not yet wired into dialogue engine. Preserve explicit player-send actions and evidence-gated triggers.

## Beat 1 — Unknown number
SOPHIE: Hi.
[delay]
SOPHIE: Sorry. I know you don't know me.
SOPHIE: Is this a bad time?
PLAYER: Who is this? / What is this about? / I can talk for a minute.
SOPHIE (who): My name's Sophie. Sophie Mercer.
SOPHIE (about): I'm looking for someone. My brother, actually.
SOPHIE (minute): Thanks. I'll try not to take long.
SOPHIE: My brother gave me your number.
SOPHIE: He said that if anything happened to him, I had to use it.
[small silence]
SOPHIE: Something happened.

## Beat 2 — Personal stakes
PLAYER: Did he tell you why? / When did you last see him? / Have you called the police?
SOPHIE (why): No. I tried asking. He just said to keep the number somewhere safe.
SOPHIE (last): Three days ago. We argued about something stupid before he left.
SOPHIE (police): Yes. And I've spoken to everyone I can think of. Nobody knows where he is.
SOPHIE: I don't want to make this your problem.
SOPHIE: But I don't know why he chose you. And I can't ignore that.
PLAYER: Show me what he left. / I don't know him. / I'll listen, but I can't promise anything.
SOPHIE (show): Okay. Just give me a second.
SOPHIE (unknown): I believe you. That's part of why this scares me.
SOPHIE (listen): That's more than I expected. Thank you.

## Beat 3 — Evidence photo
[Sophie sends note photo; player must open image; text alternative available]
SOPHIE: He wrote it himself. I watched him do it.
SOPHIE: I know you have no reason to believe that.
PLAYER: What are the originals? / What's ECHO-7/14? / Why didn't he take it with him?
SOPHIE (originals): He wouldn't tell me. He said it was safer if I knew as little as possible.
SOPHIE (token): No idea. He was very specific about not reading it out over the phone.
SOPHIE (take): I wish I'd asked.
[soft pause; no Archive pop-up until the player saves or finishes inspecting note]
SOPHIE: Does any of it mean something to you?

## Beat 4 — Unrequested recovery
SOPHIE: Wait.
SOPHIE: A message just came through asking about a recovery request.
SOPHIE: Did you do that?
PLAYER: No. I haven't requested anything. / What does it say? / Don't open it yet.
SOPHIE (no): Then who did?
SOPHIE (what): Just a reference to Daniel. Nothing that tells me where it came from.
SOPHIE (wait): I'm not touching it.
[On player's device a fictional recovery offer appears, sender UNVERIFIED]

## Beat 5 — After mirror discovery
SOPHIE: Hey. Are you there?
SOPHIE: I almost deleted your number. That's how frightened I was when Daniel handed it to me.
SOPHIE: Did you find anything?
PLAYER: The records don't match. / I found something but can't verify it. / I need some time.
SOPHIE (match): What records? Was he working on this when he disappeared?
SOPHIE (verify): Okay. Please don't guess just to make me feel better.
SOPHIE (time): I understand. I won't keep messaging. Just... tell me if there's something I should know.
[Branch recorded as player disclosure; Sophie should never gain knowledge of specific contents the player withheld]

## Ending bridge
SOPHIE: There is someone else you should probably talk to.
SOPHIE: Maya. She and Daniel were together.
SOPHIE: I don't know how much he told her.
PLAYER: Can you introduce us? / Does she know you contacted me? / Let me decide when I'm ready.
SOPHIE: I can ask. I won't give her your number without checking with you first.
[Future playable Maya onboarding; no forced disclosure and no automatic text sent from the player]

## Implementation notes
Each bracketed pause is a paced, resumable event; do not use non-resumable setTimeout-only narrative progression. The initial two player choice sets remain wired in code, while expanded branching beats here are awaiting data-driven integration and tests.
