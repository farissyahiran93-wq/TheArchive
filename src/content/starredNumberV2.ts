export const starredNumberV2Id = 'ch01v2_sc07_starred_number' as const
/** Fictional in-game identity, never read from device contacts. */
export const fictionalPlayerNumber = '555-0147' as const

export const starredOpening = [
  "I've been thinking about the number in that contact export.",
  "I can show you what the copy says. I don't want to tell you what it means.",
] as const

export const starredRequest = [
  { id:'original', text:'Can I see the original entry?', reply:"I can show you the saved copy. It doesn't verify what was on Daniel's phone." },
  { id:'exact', text:'Before we guess, can I see exactly what you have?', reply:"Yes. The copy is here. Let's read it without adding anything to it." },
  { id:'direct', text:'I need to know what it really says.', reply:"You deserve that. I'll show you the entry itself." },
] as const

export const starredQuestions = [
  { id:'why', text:'Why would Daniel save my number?', reply:"I don't know whether he did. The copy is labelled as his, but I can't prove who made the entry.", trust:0, affinity:0, suspicion:1 },
  { id:'verify', text:'Can we verify where that export came from?', reply:"Not from the label alone. We'd need to trace where the copy came from before trusting it.", trust:1, affinity:0, suspicion:0 },
  { id:'access', text:'Who else had access to his contacts?', reply:"I don't know. I don't want to put a name to this without a record.", trust:0, affinity:0, suspicion:1 },
  { id:'memory', text:"I don't remember knowing Daniel.", reply:"You don't have to remember him for me. I'm sorry this has been put on you.", trust:0, affinity:1, suspicion:0 },
] as const

export const starredFollowups = [
  { id:'name', text:'Does the export give my number a saved name?', reply:"No. There's no saved name on that entry." },
  { id:'marker', text:'Does it say who added the star?', reply:"No. The star is there, but the copy doesn't tell me who put it there." },
  { id:'source', text:'Can you prove Daniel made this export?', reply:"I can't. The label is what we have, not proof of who created it." },
] as const

export const starredConclusions = [
  { id:'limit', text:'The copy shows my unnamed number and a star. It does not identify who marked it.' },
  { id:'question', text:'I want to know why my number is there, but the copy cannot answer that.' },
  { id:'boundary', text:'I will keep the entry and leave Daniel’s connection to me unresolved.' },
] as const
