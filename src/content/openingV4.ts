/** First contact for new saves. The partial page is deliberately distinct from the later recovery note. */
export const firstContactChoices = [
  { id: 'who', text: 'Who is this?', answer: "Sorry. I'm Sophie. I know this is strange." },
  { id: 'why', text: 'Why are you messaging me?', answer: "I'm Sophie. I wish I could give you a better answer. My brother left me this number." },
  { id: 'cautious', text: "I don't usually answer unknown numbers.", answer: "I wouldn't either. I'm Sophie. You can stop replying whenever you want." },
  { id: 'listen', text: 'I can listen for a minute.', answer: "Thank you. I'm Sophie Mercer." },
] as const

export const addressChoices = [
  { id: 'mr', text: 'Mr.' },
  { id: 'ms', text: 'Ms.' },
  { id: 'name', text: 'Just use my name' },
] as const

export const firstQuestionChoices = [
  { id: 'daniel', text: 'Who is Daniel?', answer: "Daniel is my older brother. I haven't heard from him in three days." },
  { id: 'number', text: 'Why did he leave you my number?', answer: "He wouldn't tell me. He only asked me to keep it safe." },
  { id: 'help', text: 'What can I do?', answer: "For now, help me understand why he left your number. I'll show you what I have when you're ready." },
  { id: 'proof', text: 'How do I know this came from him?', answer: "You don't. I watched him write the page, but I can't prove that to you." },
] as const

export const firstPageMessage = "He wrote this for the person at your number. I'll send the first page. Please don't assume it proves anything."
export const readyForGroupChoice = { id: 'ready-group', text: "Okay. You can add me to the group when you're ready." }
export const offlineMessage = "I have to step away for a little while. I'll add you to a small chat so the others know I contacted you. You can decide whether to answer them."

export const recoveryConversationV4 = {
  bridge: "If that protected request appeared on your phone, you can inspect what it asks for. I can't tell you who sent it. Please don't treat the page as proof of its origin.",
  choices: [
    { id: 'inspect', text: "I'll inspect the request, but I won't assume it's Daniel's.", answer: "That sounds careful. I don't know who sent it either." },
    { id: 'scope', text: 'I want to see what it can access first.', answer: 'Yes. Please check the scope before you agree to anything.' },
    { id: 'later', text: "I'll leave it until I'm ready.", answer: "Of course. It's your decision when to look." },
  ],
} as const

export const publicBridgeV4 = [
  { id: 'public', text: 'Where is the older public Bus 4 preview?', answer: 'Greyhaven Bulletin. Maya kept the public crop there; the full original is still a separate question.' },
  { id: 'maya', text: 'Does Maya know what I found on the recovered copy?', answer: "No. The group knows I contacted you. I haven't told Maya what you found or given her your private files." },
  { id: 'later', text: 'I need more time before I talk to anyone.', answer: 'Take it. The Bulletin page is public if you decide to look.' },
] as const
