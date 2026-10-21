/** Opening group exchange. No recovered record or private Sophie disclosure is shared here. */
export const groupInvitation = {
  prompt: "There is a small chat with people close to Daniel. I could add you, if you're comfortable. They don't know why he left your number either.",
  choices: [
    { id: 'join', text: 'You can add me. I will listen first.' },
    { id: 'wait', text: 'Give me a moment before you add me.' },
  ],
} as const

export const groupArrival = [
  { id: 'OPEN-GROUP-ADD', sender: 'system', text: 'Sophie added you to FIND DANIEL.' },
  { id: 'OPEN-GROUP-SOPHIE-1', sender: 'sophie', text: "This is the number Daniel left me. I asked before adding them. I know it's sudden." },
  { id: 'OPEN-GROUP-MAYA-1', sender: 'maya', text: 'Sophie, I thought you were checking the number first.' },
  { id: 'OPEN-GROUP-LUCAS-1', sender: 'lucas', text: 'Who is this? What did Daniel actually tell you?' },
] as const

export const groupFirstChoices = [
  { id: 'calm', text: "I don't know Daniel. Sophie contacted me, and I'm trying to understand why." },
  { id: 'confused', text: "I'm as confused as you are. I didn't expect to be added here." },
  { id: 'defensive', text: "I didn't ask for this. Please stop talking as if I did." },
  { id: 'skeptical', text: 'How do I know any of you knew Daniel?' },
  { id: 'direct', text: 'If you have a question, ask me directly.' },
] as const

export const groupFirstReplies: Record<string, { sender: 'maya' | 'lucas' | 'sophie'; text: string }[]> = {
  calm: [
    { sender: 'maya', text: 'All right. That is an answer. Sophie, can you explain why you chose today?' },
    { sender: 'sophie', text: 'Because I kept putting it off. Daniel gave me the number for a reason, even if he never told me what it was.' },
  ],
  confused: [
    { sender: 'maya', text: 'I can see that. Sophie, did you warn them about the group?' },
    { sender: 'sophie', text: 'No. I should have.' },
  ],
  defensive: [
    { sender: 'maya', text: "You're right that you didn't ask. Lucas, give them a second." },
    { sender: 'lucas', text: "I'm asking Sophie. She brought a stranger into a private chat." },
  ],
  skeptical: [
    { sender: 'maya', text: "You don't have a reason to trust us. We don't have one to trust you yet, either." },
    { sender: 'sophie', text: 'I know. I made this harder.' },
  ],
  direct: [
    { sender: 'lucas', text: 'Fine. Did Daniel ever speak to you?' },
    { sender: 'maya', text: 'Lucas. One question at a time.' },
  ],
}

export const groupConflict = [
  { id: 'OPEN-GROUP-LUCAS-2', sender: 'lucas', text: "We were careful about what went into this chat. I don't want to start guessing in front of someone we just met." },
  { id: 'OPEN-GROUP-MAYA-2', sender: 'maya', text: "Nobody needs to guess. We can stop here until everyone has had time to think." },
] as const

export const groupConflictChoices = [
  { id: 'apologize', text: "I'm sorry this has upset everyone. I can leave the chat." },
  { id: 'boundary', text: "I won't ask anyone to share private information here." },
  { id: 'challenge', text: "You're blaming me for a decision Sophie made." },
] as const

export const groupConflictReplies: Record<string, { sender: 'maya' | 'lucas'; text: string }> = {
  apologize: { sender: 'maya', text: "You don't have to leave because we handled this badly. But I think we all need a pause." },
  boundary: { sender: 'maya', text: 'Thank you. That is a fair boundary. We should have said it ourselves.' },
  challenge: { sender: 'lucas', text: "You're right. I'm angry at Sophie, and I took it out on you." },
}

export const groupDeparture = [
  { id: 'OPEN-GROUP-MAYA-3', sender: 'maya', text: "Let's stop. Sophie, call me when you're ready." },
  { id: 'OPEN-GROUP-LUCAS-3', sender: 'lucas', text: 'I need some space.' },
  { id: 'OPEN-GROUP-LUCAS-LEFT', sender: 'system', text: 'Lucas left the group.' },
  { id: 'OPEN-GROUP-SOPHIE-2', sender: 'sophie', text: 'I should have spoken to you all separately.' },
  { id: 'OPEN-GROUP-SOPHIE-LEFT', sender: 'system', text: 'Sophie left the group.' },
] as const

export const secondPrivate = [
  "I'm sorry about the group. I thought it would help to explain why Daniel gave me your number.",
  "I didn't tell them everything he left me. He made me keep a page. I can send you a photo, if you still want to see it.",
] as const

export const secondPrivateChoices = [
  { id: 'see', text: 'Send it. I will look, but I cannot promise what it means.', answer: "That's fair. I don't know what it means either." },
  { id: 'why', text: "Why didn't you show the group?", answer: "Daniel told me to show the page to this number. I was afraid of making another choice for everyone." },
  { id: 'hesitate', text: 'I need to know where it came from first.', answer: 'I watched him write it. That is all I can honestly say about where it came from.' },
] as const
