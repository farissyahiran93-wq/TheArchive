/** Episode 01 expansion. These are attributed, unverified claims, never canonical proof. */
export type PrivateBeat = 'apology' | 'questions' | 'checking' | 'stay'
type Reply = { id: string; text: string; lines: string[]; trust?: number }
export const secondPrivateV4 = [
  "Hey. I'm sorry about that. Can we talk here for a moment?",
  "I have the rest of Daniel's page. Before I send it, I should probably ask how you're doing with all this.",
]
export const recoveredDisclosureLines = {
  full: ["D.M.? Those are his initials. I know that doesn't prove it's him.", 'Can you send me the actual messages? I want to see what they say.'],
  clue: ['An entry in what?', "Sorry. If you knew that, you'd have said.", "I only have your summary, then. Please tell me if you find a way to check it."],
  counts: ['Fourteen signed, thirteen visible?', "I don't know what would cause that. Please keep the original copy of what you're looking at."],
  question: ["Not in a way I understood. He worked with records, but I can't tell you which index he meant.", "I don't want to turn a half-remembered conversation into an answer."],
  withhold: ["Okay. You don't have to send me something just because I'm worried.", "I'll wait until you're ready."],
  sent: ['I have the copy. Thank you.', '“After verification.” I keep reading that line.', "I want it to explain something. But I understand we don't know whether it's true yet."],
  unsent: ["All right. I haven't seen the messages, then. Just what you've told me about them.", 'Check what you need to check.'],
  later: ["Of course. I won't keep you.", 'The recovered records will still be there when you want to look.'],
  joke: ['Apparently. Sorry. 😅'],
  personalQuestion: ['Do you think you can know someone really well and still have no idea what they are going through?'],
  daniel: ['Yeah. I keep thinking about little things he said.', "Nothing I can make sense of yet. I need to think before I tell you it's important."],
  uncertain: ["That's fair. I don't know either.", 'I miss being able to just ask him.'],
  hide: ['I suppose so.', "I just wish he'd felt he could tell me."],
  close: ['Thanks for listening. Put the phone down for a bit if you need to. I will too.'],
  ask: ['Can I ask you something else? It can wait if you need a break.'],
}
export const recoveredCopyWarning = 'Recovered conversation · Source and author unverified'
export const mirrorContinuationChoices = [
  { id: 'mirror', text: 'I want to check the recovered records before I ask anyone else.', answer: "Okay. I'll leave you to it. Tell me when you've found something you want to discuss." },
  { id: 'privacy', text: 'Please keep this between us for now.', answer: "I will. I won't forward your messages to Maya or the group." },
  { id: 'pause', text: 'I need a break. I will come back to the records.', answer: 'Take one. You can come back without promising me an answer.' },
]
export const referenceConversation = {
  prompt: ['Hold on. There is a revision reference attached to the fragment: 7–14.', "It matches the range on the handwritten page. That isn't enough to tell us which record they mean."],
  choices: [
    { id: 'meaning', text: 'What does 7–14 actually refer to?', lines: ["A range in the supplied material. We haven't established what it indexes.", 'Read the ordinary Untitled note and the Archive Index. Compare what each actually says.'] },
    { id: 'link', text: 'Does that prove the note and conversation came from the same person?', lines: ['No. A matching reference can be copied.', 'Check the index yourself. Keep the source question open.'] },
    { id: 'check', text: 'I want to check the index myself.', lines: ['Good. Notes and Archive Index are readable without a password.', 'Look at the signed count, visible entries and deletion log. Then decide what you can support.'] },
  ],
}
export const connectionQuestion = {
  prompt: ['Wait. Fourteen signed, thirteen visible?', "And there isn't a deletion in the log.", 'That last message keeps bothering me. Do you think it could be about this?'],
  choices: [
    { id: 'proven', text: 'It has to be. They deleted the missing entry.', answer: "Could be. But the message doesn't say which entry. We need one more thing tying it to this index." },
    { id: 'tentative', text: "Maybe. We don't know if they're talking about this index.", answer: "Yeah. I keep catching myself filling in that gap. Let's keep both copies and find the revision history." },
    { id: 'culprit', text: 'Someone in the group knows what happened.', answer: "You might want to ask them. Just don't go in calling it proof. We still don't know what was removed, or who wrote that message." },
  ],
}
export const privateConversation: Record<PrivateBeat, { prompt: string[]; choices: Reply[] }> = {
  apology: { prompt: ['Hey. Are you still there?', "I'm sorry about Lucas. And about putting you in the middle of that.", "I thought if everyone talked, we'd get somewhere. That went well."], choices: [
    { id: 'understand', text: "I get why he's upset. This is strange for all of us.", lines: ['Yeah. He has a point.', "I just wish he'd stayed long enough to let me explain."], trust: 3 },
    { id: 'boundary', text: 'You should have asked everyone first.', lines: ["I should have. You included.", "Being worried doesn't give me the right to decide for everyone."], trust: 1 },
    { id: 'angry', text: 'He took it out on the wrong person.', lines: ["He did. I'm sorry.", "He's scared too. That doesn't make it okay."] },
  ] },
  questions: { prompt: ["You said you don't know Daniel. I'm trying to accept that.", "Part of me wanted you to say there'd been a mistake. That you'd heard from him."], choices: [
    { id: 'last', text: 'What was the last thing he said to you?', lines: ["Something ordinary. That's what I keep coming back to.", "I keep wondering if I missed something. But I can't turn everything he said into a clue."] },
    { id: 'police', text: 'Have the police told you anything?', lines: ["It's been reported. They're looking.", "I don't have an update. I wish I did."] },
    { id: 'number', text: 'I wish I could help, but I still have no idea why he chose my number.', lines: ["I know. You don't owe me an explanation you haven't got.", "I need to remember that."] },
  ] },
  checking: { prompt: ["I keep opening our conversation.", "Even though I know there's nothing new. I just check again.", 'Sorry. That probably sounds weird.'], choices: [
    { id: 'kind', text: "It doesn't sound weird. You miss your brother.", lines: ['Yeah. I do.', 'Thanks for saying that.'], trust: 1 },
    { id: 'space', text: "You don't have to apologise for being worried.", lines: ["I've been doing that a lot today, haven't I?", "I'll try. No promises."], trust: 1 },
    { id: 'rest', text: 'Have you had a chance to rest?', lines: ["Not much. Every time the phone lights up, I think it's him.", "I'll put it down for a bit. After this."] },
  ] },
  stay: { prompt: ["I don't expect you to trust me yet.", "Could you stay in the group for a little while? You don't have to promise to fix anything."], choices: [
    { id: 'yes', text: "Okay. I'll stay and listen.", lines: ['Thank you. Really.', "There's something else on the page he left. You can decide whether to look."], trust: 2 },
    { id: 'temporary', text: 'For now. Please ask me before involving anyone else.', lines: ["I will. That's fair.", "There's something else on the page. Looking at it doesn't commit you to anything."], trust: 1 },
    { id: 'no', text: "I don't want to promise I'll get involved.", lines: ["Okay. I won't ask you to promise.", "I'll leave the page here if you ever want to look. You don't have to answer now."] },
  ] },
}
export const privateBeatOrder: PrivateBeat[] = ['apology', 'questions', 'checking', 'stay']

export const recoveryCards = [
  { id: 'change', speaker: 'D.M.', text: 'I checked the index. Someone changed it.', trace: 'No reply reference survives. Introduces a reported change.' },
  { id: 'history', speaker: 'UNKNOWN', text: 'You should check the index history.', trace: 'Reply reference points to the reported change.' },
  { id: 'question', speaker: 'D.M.', text: 'Then why does the newest copy show everything is fine?', trace: 'Reply reference points to the instruction about history.' },
  { id: 'answer', speaker: 'UNKNOWN', text: 'Because the entry was removed after verification.', trace: 'Reply reference points to the question about the newest copy.' },
] as const
export const initialRecoveryOrder = ['history', 'question', 'answer', 'change']
export const recoveredDisclosureChoices = [
  { id: 'full', text: 'I reconstructed a conversation labelled D.M. / UNKNOWN. I can send you the copy.' },
  { id: 'clue', text: 'An unverified message claims an entry was removed after verification. I have not checked that claim.' },
  { id: 'counts', text: 'The signed count is 14, but only 13 entries are visible. No deletion is logged.' },
  { id: 'question', text: 'Did Daniel ever mention an index or its revision history?' },
  { id: 'withhold', text: 'I need some time before I share anything.' },
]
export const disclosureFollowups = {
  proof: [
    { id: 'send', text: 'Send the recovered conversation, with its unverified source warning.' },
    { id: 'wait', text: 'Not yet. I want to check the source first.' },
  ],
  human: [
    { id: 'listen', text: 'Sure. What is it?' },
    { id: 'joke', text: 'You really like asking questions, huh?' },
    { id: 'later', text: 'I need a break. Can we talk about this later?' },
  ],
  closing: [
    { id: 'hide', text: 'Yeah. People can keep things to themselves, even with family.' },
    { id: 'daniel', text: 'Are you thinking about Daniel?' },
    { id: 'uncertain', text: "I don't know. I wouldn't want to guess what he was going through." },
  ],
} as const
export const recoveryHints = [
  'Start with the message that reports a change. The other surviving reply references depend on it.',
  'The instruction about index history follows the reported change. Find the question that responds to that instruction.',
  'The direct question about the newest copy comes before the answer beginning “Because”.',
]
export type RelayBeat = 'identity' | 'source' | 'interpretation' | 'keep' | 'reference' | 'connection' | 'done'
export const relayConversation: Record<Exclude<RelayBeat, 'done'>, { prompt: string[]; choices: Reply[] }> = {
  reference: referenceConversation,
  connection: { prompt: connectionQuestion.prompt, choices: connectionQuestion.choices.map(choice => ({ id: choice.id, text: choice.text, lines: [choice.answer] })) },
  identity: { prompt: ['You opened the recovery session.', "Before you ask: I can't authenticate who sent it."], choices: [
    { id: 'who', text: 'Who is this?', lines: ['Call me Relay.', "It's a name to use here. It isn't proof of who I am."] },
    { id: 'access', text: 'What exactly can this session access?', lines: ['Only the supplied snapshot and the fragments inside it. Read only.', "It doesn't give me access to your phone. Call me Relay."] },
    { id: 'suspicious', text: 'A stranger offering me private messages is a pretty big red flag.', lines: ["Yes. Keep asking where things came from.", "You can call me Relay. You don't have to trust me to inspect a record."] },
  ] },
  source: { prompt: ['Four message fragments survived with reply references. The display order did not.', 'D.M. is a recovered label. It does not prove Daniel typed these words.'], choices: [
    { id: 'fake', text: 'How do I know these messages are real?', lines: ["You don't. The references let you reconstruct the supplied conversation, not authenticate its author.", 'Keep that distinction when you read the last line.'] },
    { id: 'why', text: 'Why give this to me?', lines: ["I can see the session you're in. I don't know why your number was chosen.", 'The fragment may give you a question worth asking. That is all I can offer.'] },
    { id: 'limits', text: 'Can you recover the rest?', lines: ['Not from what is available here.', "I'd rather leave a gap than fill it with a guess."] },
  ] },
  interpretation: { prompt: ['The reply sequence fits.', 'Read the last line again. Then separate what it says from what we can prove.'], choices: [
    { id: 'timing', text: 'It says the entry was removed after verification.', lines: ['Yes. That is what the unknown participant claims.', 'We still need an original record or a revision history to test it.'] },
    { id: 'entry', text: 'Which entry are they talking about?', lines: ["The fragment doesn't identify it.", "Don't attach it to another discrepancy just because the wording sounds similar."] },
    { id: 'coverup', text: 'So someone covered it up?', lines: ["That's a possibility, not a finding.", "We haven't authenticated the source, the deletion, or who was involved."] },
  ] },
  keep: { prompt: ['Keep a copy if you want to check it against something later.', 'You decide who sees it. I will not send it to Sophie or the group.'], choices: [
    { id: 'save', text: "I'll keep it as an unverified lead.", lines: ['Good. Keep the uncertainty with the words.'] },
    { id: 'private', text: "I'm keeping this private until I can check it.", lines: ["That's your decision. The snapshot will still be here."] },
    { id: 'check', text: 'I want to inspect the index myself.', lines: ['Start with what the snapshot actually shows.', 'A mismatch can give you a question. It does not name a culprit.'] },
  ] },
}
