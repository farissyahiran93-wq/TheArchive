import type { ArchiveTopic } from '../game/digitalArchiveFlow'

export interface DiscussionTurn { choices: readonly [string, string, string]; replies: readonly [readonly string[], readonly string[], readonly string[]] }
export interface DiscussionTopic { label: string; turns: readonly DiscussionTurn[] }

/** Only material the player can actually open may be exposed as a topic. */
export const archiveDiscussions: Record<ArchiveTopic, DiscussionTopic> = {
  maya: { label: "Maya's messages", turns: [
    { choices: ['Maya was worried about him.', 'He kept putting off dinner with Maya.', 'I think Daniel was hiding something from Maya.'], replies: [
      ['She noticed something was wrong, then.', 'Did he tell her what was going on?'],
      ['That sounds like it had been happening for a while.', 'Did he ever explain why?'],
      ['Maybe. Or he was trying to keep her from worrying.', 'What did he actually say?'],
    ] },
    { choices: ["His explanation is missing.", "There's an unavailable message.", "We can't tell from what's left."], replies: [
      ['Then we should leave it there for now.', 'The missing part could change how that exchange reads.'],
      ['All right. At least we know where the gap is.', 'We can look for context somewhere else.'],
      ["You're right.", "Maya's concern is clear, but the reason isn't."],
    ] },
  ] },
  sophie: { label: "Sophie's conversation", turns: [
    { choices: ['I found messages between Daniel and Sophie.', 'Sophie knew something was bothering him.', 'Daniel kept brushing Sophie off. Why?'], replies: [
      ['What were they talking about?', 'Was there anything he told her?'],
      ['It sounds like she knew him well.', 'Did he explain what was wrong?'],
      ["I don't know why.", 'Can you see what he said after she asked?'],
    ] },
    { choices: ['He said he was fine, but the rest is damaged.', 'He was joking with her first.', "There's no complete answer."], replies: [
      ["That's frustrating.", "It doesn't tell us what he was dealing with."],
      ['That sounds like an ordinary conversation between them.', 'Then something changed, but we still need context.'],
      ['All right.', "Let's not put words in his mouth."],
    ] },
  ] },
  lucas: { label: "Lucas's messages", turns: [
    { choices: ['Lucas offered to help Daniel.', "Daniel turned him down, but said 'not yet.'", "That conversation with Lucas doesn't sit right with me."], replies: [
      ['Did Daniel accept?', 'Or did he keep Lucas out of it?'],
      ["'Not yet'?", 'That could mean a lot of things. What came after?'],
      ['What part bothers you?', "We should be careful not to read too much into a gap."],
    ] },
    { choices: ['The next part is missing.', 'Daniel said he would explain later.', "I can't tell what Daniel meant."], replies: [
      ['Then we only have part of the exchange.', 'Lucas might remember more, if you decide to ask him.'],
      ['So he intended to tell him something.', "We don't know if he ever did."],
      ['Neither can I.', "Let's leave it as a question."],
    ] },
  ] },
  june: { label: 'June and the record copies', turns: [
    { choices: ['I found a conversation with June Ellis.', 'June mentioned more than one copy.', 'Daniel seemed surprised there was another copy.'], replies: [
      ['What were they discussing?', 'Can you see which copy she meant?'], ['More than one copy?', 'Did she say what was different?'], ['Did she explain?', 'Or is that part missing?'],
    ] },
    { choices: ['The important part is missing.', 'I can only see part of the exchange.', "It doesn't identify the copy."], replies: [
      ["Of course that's the part we lost.", "All right. Don't guess at it."], ['Keep the gap in mind.', 'We might find another source.'], ["Then we don't know which one.", "Let's not assume they're the same."],
    ] },
  ] },
  dinner: { label: 'The dinner reminder', turns: [
    { choices: ["There's a reminder about dinner with Maya.", 'Most of this note is ordinary stuff.', 'He was still making plans. That bothers me.'], replies: [
      ['A reminder?', 'Is there a date on it?'], ["People don't stop having ordinary lives because something is wrong.", 'Can you tell when he wrote it?'], ['Yeah.', 'I wonder how close to his disappearance he wrote it.'],
    ] },
    { choices: ["The date isn't available.", "There's no usable timestamp.", 'I only have the note itself.'], replies: [
      ['Another thing the recovery left behind.', 'Maybe another source can give it context.'], ["Then we can't place it yet.", 'But it is still a piece of his life.'], ['All right.', "We shouldn't guess when it was written."],
    ] },
  ] },
  records: { label: 'The Greyhaven Records note', turns: [
    { choices: ['Daniel wrote a note about Greyhaven Records.', 'He mentioned two copies with different reference numbers.', "There's a note telling him to ask June about a copy."], replies: [
      ['What does it say?', 'Can you tell which record he meant?'], ['Two copies?', 'Does he say which document he was looking at?'], ['June again.', 'Does the note identify the copy?'],
    ] },
    { choices: ['The relevant section is missing.', "It doesn't identify the document.", 'Only the question about the copy survived.'], replies: [
      ["Then we don't know yet.", 'At least we have something specific to look for.'], ["All right. It's a question, not an answer.", 'We can look for another source.'], ['Keep the wording in mind.', "It doesn't establish what the copies contained."],
    ] },
  ] },
  activity: { label: 'The activity records', turns: [
    { choices: ['There is a gap in the activity records.', 'Something is missing from the timeline.', "The activity log doesn't show the whole picture."], replies: [
      ['A gap?', 'Can you tell what the records show on either side?'], ['How much of it can you actually read?', "A missing entry doesn't necessarily mean nothing happened."], ['That makes two of us.', 'What does the log actually show?'],
    ] },
    { choices: ['Only incomplete device records.', "I can't identify who used the phone.", 'The timestamps need more context.'], replies: [
      ['Then we should work with what is there.', 'We can look at the times more closely.'], ["That's important to keep separate.", 'A device event is not the same as a person being there.'], ["Agreed.", "We don't know whether the device clock was accurate."],
    ] },
  ] },
}
