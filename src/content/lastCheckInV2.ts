export const lastCheckInV2Id='ch01v2_sc08_last_check_in' as const
export const lastCheckInChoices=[
  {id:'cautious',text:'Why are you telling me this now?',reply:"Because I heard you were looking at the contact export. I still don't know why your number is there. I kept this because it was his last ordinary message to me. I didn't think it mattered until you started asking who made which copy.",trust:0,affinity:0,suspicion:0},
  {id:'cooperative',text:'Thank you for sharing it.',reply:"I'm sharing the copy, not changing my mind about you. He was my friend. I should have brought it forward sooner.",trust:1,affinity:1,suspicion:0},
  {id:'evidence',text:'Can you prove Daniel sent it?',reply:"No. I can show you the capture from my chat, but a capture isn't the original conversation. I don't have a verified export of the thread.",trust:1,affinity:0,suspicion:0},
  {id:'defensive',text:"You still think I'm involved, don't you?",reply:"I don't know what you are involved in. That's the part I can't let go of. But withholding this wasn't fair to Daniel either.",trust:0,affinity:0,suspicion:1},
] as const
export const lastCheckInQuestions=[
  {id:'date',text:'When did this exchange happen?',reply:"My chat displayed it before he disappeared. The capture doesn't show an independently checked date or clock."},
  {id:'other',text:'What was the other copy?',reply:"He didn't say. I never saw the copy he meant."},
  {id:'why',text:'Why did you leave the group?',reply:"You arrived with a starred number nobody could explain. People started talking as if a mark could tell us who you were to him. I was angry, and I didn't trust myself to keep that out of the conversation."},
] as const
export const lastCheckInConclusions=[
  {id:'lead',text:'Lucas’s capture gives us a lead about another copy, not proof that Daniel wrote the message.'},
  {id:'limits',text:'The date, source conversation, completeness and sender of the capture remain unverified.'},
  {id:'personal',text:'Lucas chose to share this while still doubting me. I will investigate the other copy without treating his suspicion as evidence.'},
] as const
export const capturedExchange=[
  {sender:'Lucas',text:'Did you get what you needed from that record?'},
  {sender:'Daniel (displayed contact)',text:'Not yet. I want to look at another copy before I decide what it says.'},
] as const
