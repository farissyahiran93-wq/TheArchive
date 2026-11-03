export const secondaryCardV2Id='ch01v2_sc09_secondary_card' as const
export const secondaryCardChoices=[
  {id:'evidence',text:'Let me see the reference before we connect it to anything.',reply:"That's why I sent it. I want a place to start, not an answer we invent.",trust:1,affinity:0,suspicion:0},
  {id:'care',text:'Maya, how are you holding up?',reply:"I keep finding pieces of him in other people's copies. I need a minute. Then I want to know what this one actually says.",trust:0,affinity:1,suspicion:0},
  {id:'cautious',text:'How do you know this card is connected to Daniel?',reply:"I don't. It was photographed with material said to be his. I can't establish who put it there, or whether it belongs with the rest.",trust:0,affinity:0,suspicion:1},
  {id:'source',text:'Can we verify who photographed it?',reply:"Not from what I have. I can share the image I received, but the photographer, date and original card are still unknown.",trust:1,affinity:0,suspicion:0},
] as const
export const secondaryCardQuestions=[
  {id:'link',text:"Do you think this card and Lucas's message point to the same record?",reply:"I want them to. But he talked about another copy, and this is only a reference on a card. We can't make them the same thing yet."},
  {id:'descriptor',text:'Do we know what GH-DSC-03-A describes?',reply:"No. It's a reference on the card, not the descriptor itself."},
  {id:'daniel',text:'Did Daniel ever mention this card?',reply:"Not to me. I won't put those words in his mouth."},
  {id:'next',text:'What can we check next?',reply:"A public inventory might tell us whether the reference is listed. It still wouldn't tell us what the descriptor says."},
] as const
export const secondaryCardConclusions=[
  {id:'target',text:'GH-DSC-03-A is a concrete lookup target; the photograph does not establish its contents or origin.'},
  {id:'separate',text:'The card, Lucas’s message and the public records are separate leads until their provenance is linked.'},
  {id:'caution',text:'Maya’s association with Daniel is a claim about context, not proof that the pictured card was his.'},
] as const
