/** New-game group history only. Older saved transcripts retain their authored events. */
export const groupArrivalV4 = [
  { id: 'OPEN-GROUP-SOPHIE-1', sender: 'sophie', text: "This is the number on Daniel's page. I spoke to them first, but I should have asked before adding them here." },
  { id: 'OPEN-GROUP-MAYA-1', sender: 'maya', text: "Soph? I'm Maya. Daniel and I are engaged. Who's the new number?" },
  { id: 'OPEN-GROUP-LUCAS-1', sender: 'lucas', text: "Lucas. I've known Daniel since before Axiom. Sophie, why bring a stranger into this chat?" },
  { id: 'OPEN-GROUP-ELI-1', sender: 'eli', text: "I'm Eli. I worked with Daniel at Axiom Recovery. Do they know what this is about?" },
  { id: 'OPEN-GROUP-SOPHIE-2', sender: 'sophie', text: "They know Daniel is missing. They don't know why he left their number. Neither do I." },
] as const

export const groupDepartureV4 = [
  { id: 'OPEN-GROUP-LUCAS-3', sender: 'lucas', text: "I care about Daniel. I need a pause before this turns into guesses." },
  { id: 'OPEN-GROUP-LUCAS-LEFT', sender: 'system', text: 'Lucas left the group.' },
  { id: 'OPEN-GROUP-AFTER-LUCAS-S1', sender: 'sophie', text: 'Lucas, seriously?' },
  { id: 'OPEN-GROUP-AFTER-LUCAS-M1', sender: 'maya', text: "He's gone, Soph." },
  { id: 'OPEN-GROUP-AFTER-LUCAS-S2', sender: 'sophie', text: 'I can see that.' },
  { id: 'OPEN-GROUP-AFTER-LUCAS-M2', sender: 'maya', text: 'You should have talked to us before adding someone.' },
  { id: 'OPEN-GROUP-AFTER-LUCAS-S3', sender: 'sophie', text: 'Would you have said yes?' },
  { id: 'OPEN-GROUP-AFTER-LUCAS-M3', sender: 'maya', text: "That's not the point. We should have had a choice." },
  { id: 'OPEN-GROUP-AFTER-LUCAS-S4', sender: 'sophie', text: "Can we not do this here? I've put them in the middle enough already." },
  { id: 'OPEN-GROUP-MAYA-3', sender: 'maya', text: "I'm worried about him too. Sophie, call me privately when you can." },
  { id: 'OPEN-GROUP-MAYA-LEFT', sender: 'system', text: 'Maya left the group.' },
  { id: 'OPEN-GROUP-SOPHIE-3', sender: 'sophie', text: "I'm sorry. I should have asked everyone separately." },
] as const
