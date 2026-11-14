/** Recovered conversations and notes for the new Scene 5 route.
 * Dates are intentionally absent: no usable source date is established. */
export type RecoveredLine = { speaker: 'contact' | 'daniel'; text: string; incomplete?: boolean }
export interface RecoveredConversation { id: 'maya' | 'sophie' | 'lucas'; name: string; preview: string; lines: RecoveredLine[] }
export const recoveredConversations: RecoveredConversation[] = [
  { id: 'maya', name: 'Maya Chen', preview: 'Just come home, Dan.', lines: [
    { speaker: 'contact', text: 'Are we still on for tonight?' }, { speaker: 'daniel', text: 'Yeah. Sorry. Got caught up with something.' },
    { speaker: 'contact', text: "You've said that three times this week." }, { speaker: 'daniel', text: "I know. I'll make it up to you." },
    { speaker: 'contact', text: "I don't need you to make it up to me. I just want to have dinner with you without you checking your phone every five minutes." },
    { speaker: 'daniel', text: 'I promise. I just need to check [unrecovered]', incomplete: true }, { speaker: 'contact', text: 'Daniel?' },
    { speaker: 'daniel', text: 'Message unavailable', incomplete: true }, { speaker: 'contact', text: 'Just come home, Dan.' },
  ] },
  { id: 'sophie', name: 'Sophie Mercer', preview: "That's not an answer.", lines: [
    { speaker: 'contact', text: 'Did you see the photo I sent?' }, { speaker: 'daniel', text: 'Yeah. You look ridiculous in the second one 😂' },
    { speaker: 'contact', text: 'YOU took that photo.' }, { speaker: 'daniel', text: 'Exactly. Excellent photography.' },
    { speaker: 'contact', text: 'Idiot 😂 Anyway, Maya said you’ve been busy. Everything okay?' },
    { speaker: 'daniel', text: "Yeah, I'm fine. Just got a lot going on." }, { speaker: 'contact', text: "You always say that when something's wrong." },
    { speaker: 'daniel', text: "It's nothing you need to worry about." }, { speaker: 'contact', text: "That's not an answer." },
    { speaker: 'daniel', text: '[Message partially unavailable] …talk when I see you.', incomplete: true },
  ] },
  { id: 'lucas', name: 'Lucas Grey', preview: 'Need a hand?', lines: [
    { speaker: 'contact', text: 'You coming tonight or what?' }, { speaker: 'daniel', text: "Can't. Sorry." },
    { speaker: 'contact', text: 'Seriously? Since when do you cancel food?' }, { speaker: 'daniel', text: 'Something came up.' },
    { speaker: 'contact', text: "You've been saying that a lot lately. Need a hand with whatever it is?" },
    { speaker: 'daniel', text: "I don't think so. Not yet." }, { speaker: 'contact', text: 'Not yet? Mate, what does that even mean?' },
    { speaker: 'daniel', text: '[Unrecovered segment]', incomplete: true }, { speaker: 'contact', text: 'Dan?' }, { speaker: 'daniel', text: "I'll explain later." },
  ] },
]

export const recoveredNotes = [
  { id: 'dinner' as const, title: 'Dinner Reminder', body: "Dinner with Maya.\n\n7:30 — don't be late again.\n\nPick something up on the way home.\n\nCall Sophie back.\n\nNeed to stop taking work home every night.\n\n[Unrecovered text]" },
  { id: 'records' as const, title: 'Greyhaven Records', body: 'Greyhaven Records\n\nTwo copies?\n\nThe reference numbers don’t line up.\n\nNeed to check which one I was given.\n\nAsk June which copy she meant.\n\n[Unrecovered text]\n\nCheck the dates again.' },
]
