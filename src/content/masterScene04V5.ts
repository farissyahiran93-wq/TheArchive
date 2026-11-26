export const scene04V5 = [
  {
    choices: ["Who is this?", "What did you find?", "How do you know I'm looking for Daniel?"],
    replies: [
      ["Someone who wants to find him.", "You can call me whatever you like for now."],
      ["A discrepancy in one of his records.", "Something that shouldn't be there."],
      ["I've been looking into some of Daniel's records.", "One of them led me to your number."],
    ],
    common: ["Before I explain...", "There's something I'd like to clear up."],
  },
  {
    choices: ["How did you get my number?", "What does my number have to do with Daniel?", "Why should I answer questions from a stranger?"],
    replies: [
      ["It appeared in a contact export connected to Daniel.", "I've been comparing that export with an older copy."],
      ["That's what I'm trying to establish.", "There are two versions of a contact list.", "They aren't identical."],
      ["You shouldn't have to.", "Let me explain what I found first."],
    ],
    common: ["I came across two copies of what appeared to be the same contact list.", "Most of the entries matched.", "But not all of them.", "Your number appears in one copy.", "I couldn't find the same entry in the other."],
  },
  {
    choices: ["Are you saying someone added my number?", "Could the other copy simply be older?", "How do I know these records are real?"],
    replies: [
      ["Possibly.", "Or the copies were created differently.", "I don't know enough to say which yet."],
      ["That's possible.", "But I haven't established exactly when both copies were created."],
      ["You don't.", "Not from a message I've sent you.", "You'll need to see more than that."],
    ],
    common: ["There's another detail.", "The number wasn't saved under a name.", "It was marked with a star."],
  },
  {
    choices: ["I already know about the star.", "Do you know who marked it?", "Why is that important?"],
    replies: [
      ["Then I'll skip that part.", "The question is why it appears in one copy and not the other."],
      ["No.", "That's one of the things I haven't been able to establish."],
      ["On its own, it might not be.", "But combined with the difference between the copies...", "It gives us something worth looking into."],
    ],
    common: ["I've been trying to work out whether the number was connected to Daniel personally.", "Or whether it came from somewhere else.", "Have you ever had any connection to Greyhaven?"],
  },
  {
    choices: ["Nothing that would connect me to Daniel.", "What kind of connection are you looking for?", "Why are you so interested in me?"],
    replies: [
      ["It doesn't necessarily have to involve Daniel directly.", "A form. An enquiry. Something you've forgotten about.", "There are other ways for a number to end up in a record."],
      ["Anything ordinary.", "A business enquiry. A public service. An online registration.", "Something that wouldn't mean much to you at the time."],
      ["I'm interested in the entry.", "Your number happens to be part of it.", "That doesn't mean I'm accusing you of anything."],
    ],
    common: ["There are too many possible explanations.", "I'd rather not settle on one without something to support it."],
  },
  {
    choices: ["Did you know Daniel personally?", "Why won't you tell me who you are?", "Are you someone I've already spoken to?"],
    replies: [
      ["Yes.", "I knew him before he disappeared.", "I wish I'd paid more attention to certain things."],
      ["I'd rather keep my name out of this for now.", "I know that makes this harder for you.", "I'm sorry."],
      ["I'd rather not answer that.", "You have every reason to find that suspicious.", "But I'm not asking you to believe me without evidence."],
    ],
    common: ["I know how this looks.", "A stranger messaging you about a missing person.", "I'd have questions too."],
  },
  {
    choices: ["Why not take this to the police?", "Why are you investigating Daniel's disappearance?", "What exactly do you want from me?"],
    replies: [
      ["They need information they can act on.", "Right now, I have more questions than answers.", "That doesn't mean you should keep anything from them."],
      ["Because something doesn't feel right.", "And I can't just leave it alone."],
      ["A fresh pair of eyes.", "I've been staring at the same fragments for too long.", "Maybe you'll notice something I haven't."],
    ],
    common: ["There might be another way to look into this.", "Something more useful than exchanging theories over messages."],
  },
  {
    choices: ["What do you have in mind?", "Do you have something I can actually examine?", "I'm still not sure I can trust you."],
    replies: [
      ["A recovery tool.", "I've been using it to work with incomplete digital records."],
      ["Yes.", "But some of the data isn't readable in its current state."],
      ["That's understandable.", "I'm not asking you to take my word for anything.", "I'd rather let you look for yourself."],
    ],
    common: ["It's called TRACE.", "It was designed to recover fragments from damaged or encrypted archives.", "Messages. Notes. Activity records.", "Whatever can still be recovered."],
  },
  {
    choices: ["What exactly would TRACE recover?", "Did you develop TRACE yourself?", "You're asking me to install something from an anonymous number?"],
    replies: [
      ["Parts of a digital archive.", "If the data is still there, TRACE might be able to reconstruct it.", "Not everything, though."],
      ["I've worked with it for a while.", "Long enough to know its limitations."],
      ["I know.", "Not exactly a convincing sales pitch, is it?", "You can look at what it does before you decide."],
    ],
    common: ["I have access to an encrypted archive associated with Daniel's phone.", "I've only been able to make sense of parts of it.", "If you're willing, we could work through the remaining data together.", "TRACE comes first.", "Then we can see whether the archive is recoverable."],
  },
  {
    choices: ["Okay. Send me TRACE.", "I need some time to think about this.", "I'm not comfortable installing something from you."],
    replies: [
      ["Alright.", "I'll make it available.", "Let me know when it's ready.", "Actually...", "One more thing.", "If something in the recovered data doesn't make sense, don't ignore it.", "Even if everything around it looks normal.", "Sometimes that's the part that matters."],
      ["Fair enough.", "Take your time.", "I'll be here when you've decided."],
      ["I understand.", "I'd probably have my doubts too.", "If you change your mind, you know how to reach me."],
    ],
    common: [],
  },
] as const
