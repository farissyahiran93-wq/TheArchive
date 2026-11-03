export const inventoryFinaleV2Id='ch01v2_sc10_inventory_sheet' as const
export const finaleFirstChoices=[
  {id:'find',text:'What did you find?',reply:"I went through Daniel's belongings again. There was a card tucked inside an old folder. I almost put it back."},
  {id:'care',text:'Sophie, are you okay?',reply:"I'm here. My hands are shaking a little. I went through Daniel's belongings again and found a card in an old folder."},
  {id:'listen',text:"I'm listening.",reply:"I went through Daniel's belongings again. There was a card tucked inside an old folder. I need to tell you what it says."},
] as const
export const finaleSecondChoices=[
  {id:'writer',text:'Do you know who wrote it?',reply:"No. I don't know whose handwriting this is. I don't want to guess."},
  {id:'seen',text:'Has anyone else seen it?',reply:"I haven't shown anyone else. I called you first. That doesn't tell us who handled it before I found it."},
  {id:'picture',text:'Can you send me a picture?',reply:"I can keep the card safe and photograph it, but I don't want a picture to stand in for knowing who wrote it."},
] as const
export const finaleConclusions=[
  {id:'limit',text:'The public box index points to GH-DSC-03-A; it does not supply the descriptor body or an item match.'},
  {id:'separate',text:'The secondary reference card and the public inventory share a descriptor reference. Their origin and any link to GB-REF-017 remain unverified.'},
  {id:'next',text:'GH-DSC-03-A is a concrete next request, not an answer to Daniel’s disappearance.'},
] as const
