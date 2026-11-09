/** Revised Scene 4: a tool preview, not a Daniel archive or verified source. */
export const traceFirstBeats=[
 {choices:['Who is this?','How do you know that?','Why are you messaging me?'],replies:["Someone who knows Daniel. I'm not ready to give you my name.",'Sophie asked me about the number she found and said she had contacted you.',"I think there may be a way to examine a lead, but you should decide whether to listen."]},
 {choices:['How did you get my number?','Did Sophie give you my number?','Have you been watching me?'],replies:['Sophie asked me about the number. I checked it against a record I could access.','She asked whether I recognised that entry. I used the number to contact you.',"No. I haven't seen your conversations or your location."]},
 {choices:['What do you know about Daniel?','How do you know him?','Why should I believe you know him?'],replies:["I knew him before he disappeared. I don't know where he is now.","We knew each other through work. I can't say more without identifying myself.","You shouldn't accept my claim without evidence. Ask what you need to ask."]},
 {choices:['What do you want from me?','Why contact me at all?','I have not agreed to help you.'],replies:['I want to show you a way to examine digital records without taking my account on trust.','Sophie said she had contacted you. You deserve to know what I can offer before deciding.','You have not. Listening does not commit you to anything.']},
 {choices:['Why not tell Sophie?','Why not go straight to the police?','Are you saying someone is unsafe?'],replies:["I don't want to add to Sophie's burden with claims I can't yet support.","I'm afraid of exposing my involvement. That doesn't mean you shouldn't contact them.","No. I'm being cautious, but I can't tell you who is safe."]},
 {choices:['What is the tool?','How could I examine a digital record?','Are you asking for access to my phone?'],replies:['It is called TRACE. It is a tool for reviewing and recovering available fragments from a selected source.','TRACE can organise accessible fragments and preserve their source limitations.','No. TRACE is presented as a local tool; you decide whether to use it.']},
 {choices:['Who developed TRACE?','Did you build it?','Why should I trust a tool from an unknown sender?'],replies:["I helped develop its viewer. My saying that doesn't make it trustworthy.","I worked on the viewer, but I'm not ready to identify myself.","You shouldn't trust it just because I say so. Review the information and decide for yourself."]},
 {choices:['Is TRACE safe?','What permissions does it need?','Could it access my private messages?'],replies:["I can't guarantee that by assertion. Its source and safety remain unverified.","It's intended to use a source you select and local results. It doesn't need your contacts or location.","It is designed for a selected source, not your personal messages. You don't have to take my word for that."]},
 {choices:['Can TRACE prove what a record means?','Will it recover everything?','Could its results be misleading?'],replies:["No. A readable fragment isn't proof of its origin or truth.","No. It can only show fragments available to it; missing material stays missing.","Yes. A partial or altered source can mislead you, so preserve the uncertainty."]},
 {choices:['Show me the TRACE information.','I will review the tool before deciding.','I may stop here, but I want to see the details.'],replies:['I can show you a preview of the tool. Nothing will be installed by inspecting it.','That is the right decision to make for yourself. The preview describes its stated limits.','You can stop or return later. The preview is only information about TRACE.']},
] as const

export const unknownSenderRevisedOpening = "I know you're looking for Daniel."

export const unknownSenderRevisedBeats = [
  {
    choices: ['How do you know that?', 'Who is this?', 'What do you want?'],
    replies: [
      'Sophie asked me about a number she found and said she had contacted you.',
      "Someone who knew Daniel. Sophie asked me about a number she'd found and told me she had contacted you.",
      'To show you something that might help. Sophie asked me about a number she found and said she had contacted you.',
    ],
  },
  {
    choices: ['Did Sophie give you my number?', 'What number did she show you?', 'Why were you talking to Sophie?'],
    replies: [
      'She asked if I recognised the entry. I used the number from it to contact you.',
      'The number in the contact entry she asked me about. It’s the one I used to reach you.',
      "She came to me to ask if I recognised an entry. I used the number she asked about to reach you.",
    ],
  },
  {
    choices: ['What do you know about Daniel?', 'Did you know him personally?', 'Do you know where he is?'],
    replies: [
      'I knew him before he disappeared. I don’t know where he is now.',
      'Yes. We knew each other before he went missing.',
      'No. I knew him before he disappeared, but I haven’t found him.',
    ],
  },
  {
    choices: ['Then why contact me?', 'What kind of connection did you have with him?', 'Why should I trust you?'],
    replies: [
      'Sophie had already reached out to you. I wanted you to hear what I could offer before you decided whether to get involved.',
      'We knew each other through work. I reached out because Sophie had already brought you into this.',
      'You can judge what I offer for yourself. I came to you because Sophie had already asked for your help.',
    ],
  },
  {
    choices: ['Why not go straight to the police?', 'Have you taken this to the police?', 'Are you worried the police will ask where it came from?'],
    replies: [
      'Because it would expose my involvement. You can still speak to them if you think it would help.',
      'No. Going to them would put my involvement on record, and I’m not ready for that.',
      'I’m worried they’d ask how I was involved. That’s why I’ve stayed away from them.',
    ],
  },
  {
    choices: ['Then tell me what this is really about.', 'What are you trying to show me?', 'What can you actually offer?'],
    replies: [
      'I want to see what can still be recovered from Daniel’s digital trail. It may give us somewhere to look.',
      'A trace of Daniel’s digital activity. I think some of it survived.',
      'A way to look for fragments of Daniel’s digital activity. I can’t promise what will turn up.',
    ],
  },
  {
    choices: ['What kind of digital activity?', 'How do you know anything survived?', 'What might it tell us about Daniel?'],
    replies: [
      'Messages and notes, possibly activity records. We’d have to see how much of each is readable.',
      'There are signs that parts of the data survived. How much can be read is still open.',
      'A message or note could give us another place to look. There may be activity records we can compare them with later.',
    ],
  },
  {
    choices: ['Can I examine it myself?', 'How reliable would it be?', 'Why haven’t you shown Sophie?'],
    replies: [
      'Yes. I can show you how to examine what’s available and let you draw your own conclusions.',
      'I can’t vouch for an incomplete record. I’d rather you look at it directly and see what it supports.',
      'I don’t have a finding I can give Sophie yet. Since she’d already asked for your help, I thought you could look at the source.',
    ],
  },
  {
    choices: ['How would I look at it?', 'What do you need from me?', 'Can I look without risking my own data?'],
    replies: [
      'There’s a tool that lets you examine whatever can be recovered, one piece at a time.',
      'Only a decision about whether to look. I can show you the tool and explain what it uses.',
      'The tool is designed to work on a copy you choose. I can explain its limits before you decide.',
    ],
  },
  {
    choices: ['What kind of tool?', 'Are you asking for access to my phone?', 'Why use a tool instead of sending the files?'],
    replies: [
      'A recovery interface. It keeps readable fragments with the source they came from.',
      'No. You choose what the interface opens, and it works on that source.',
      'The interface keeps each fragment with its source. A loose excerpt is easier to misread.',
    ],
  },
  {
    choices: ['So I’d be reviewing Daniel’s data myself?', 'Would I see the whole thing?', 'What happens if I refuse?'],
    replies: [
      'You’d review what the interface can recover. You’d decide what the fragments mean.',
      'Only the parts the interface can read. Anything missing would stay marked as missing.',
      'Then we stop here. You can come back to it if you change your mind.',
    ],
  },
  {
    choices: ['I want to know what’s in it.', 'What’s the risk if I go ahead?', 'Why trust me with this?'],
    replies: [
      'When you’re ready, I can show you the interface and explain what you’d be agreeing to.',
      'A partial record can give you the wrong impression. When you’re ready, I’ll walk you through the limits before you decide.',
      'Sophie already asked for your help, and you’re asking careful questions. When you’re ready, I can show you the interface.',
    ],
  },
] as const
