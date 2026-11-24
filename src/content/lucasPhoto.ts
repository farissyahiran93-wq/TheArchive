export const lucasPhotoBeats=[
 {choices:["I know leaving the group didn't mean you stopped caring.","I understand you want Daniel's private messages kept private.","We don't have to discuss anything you're not ready to share."],replies:["Thank you. I needed space, but I never stopped looking for him.","I do. I can talk about what I choose to share, not hand over his conversations.","I appreciate that. I want to help, but I need to set my own limits."]},
 {choices:["What was Daniel like when it was just the two of you?","Do you have a memory of him you would be comfortable sharing?","Only if you want to: is there something ordinary you remember about him?"],replies:["He could make a completely ordinary afternoon feel like an adventure.","There's an old picture of us I don't mind showing you. It isn't part of his investigation.","He always had a way of finding time for a friend, even when he was busy."]},
 {choices:["Thank you for trusting me with that. I'll keep it private.","Do you remember when the photo was taken?","I won't share this photo without asking you first."],replies:["Thank you. I wanted you to see my friend, not just a missing person's name.","Not precisely. It's an old memory, not a way to establish where he was recently.","I appreciate that. Please don't pass it around without asking me."]},
] as const

export const lucasIntroduction = ['Hey.', "I know I didn't exactly make a good first impression."]

export const lucasConversation = [
  {
    choices: ["I didn't expect you to message me.", "It's okay. I understand things were tense.", "Did something happen?"],
    lines: ['No. Nothing new.', "I've just been thinking about what happened in the group.", "I shouldn't have taken all of that out on you."],
  },
  {
    choices: ['You were worried about Daniel.', 'I can understand being cautious about a stranger.', 'We can start over if you want.'],
    lines: ['Thanks.', 'Sophie and I have known each other forever.', 'Daniel, too.', "I guess I don't deal with things very well when they're about him."],
  },
  {
    choices: ['You two were close?'],
    lines: ['Yeah.', 'Since we were kids.', 'He was the one who talked me into doing stupid things.', 'Then somehow he was always the one getting me out of trouble.'],
  },
  {
    choices: ['That sounds like a good friendship.', 'He must mean a lot to you.', 'Do you have a favourite memory of him?'],
    lines: ['There are too many.', 'Actually...', 'Hold on.', 'Found it.', '[photo]', "That's us.", 'We were supposed to be doing something productive that afternoon.', 'We ended up talking for hours instead.'],
  },
  {
    choices: ['You both look happy.', 'When was that taken?', 'Thank you for showing me this.'],
    lines: ["I don't remember the exact date.", 'It was a while ago.', 'I keep looking at that picture lately.', 'It reminds me of him before all of this.'],
  },
  {
    choices: ["I'm sorry, Lucas."],
    lines: ['Yeah.', 'Me too.', 'And, hey...', 'Please keep the photo between us for now.', 'I just wanted you to see who my friend was.'],
  },
] as const
