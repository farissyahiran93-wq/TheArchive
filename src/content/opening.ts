/** Canonical opening of Chapter 1. The source and identity of the mirror sender stay unverified. */
export const recoveryToken = 'ECHO-7/14'
export const sophieOpening = [
  "Hi. I'm sorry for messaging out of nowhere.",
  "Sorry. I know you don't know me. Is this a bad time?",
  'My name is Sophie Mercer.',
  'My brother Daniel gave me this number before he disappeared.',
  'He said if anything happened to him, I should contact you.',
  "He hasn't come home in three days.",
] as const

export const sophieExpansion = {
  quiet: [
    { id: 'why', text: 'Did he tell you why?', answer: 'No. I tried asking. He just said to keep the number somewhere safe.' },
    { id: 'listen', text: "I will listen, but I cannot promise anything.", answer: "That's more than I expected. Thank you." },
    { id: 'originals', text: 'What are the originals?', answer: "He wouldn't tell me. He said it was safer if I knew as little as possible." },
    { id: 'last', text: 'When did you last see him?', answer: 'Three days ago. We argued about something stupid before he left.' },
    { id: 'police', text: 'Have you called the police?', answer: "Yes. And everyone I can think of. Nobody knows where he is." },
  ],
  offer: [
    { id: 'no', text: "No. I haven't requested anything.", answer: 'Then who did?' },
    { id: 'what', text: 'What does it say?', answer: 'Just a reference to Daniel. Nothing that tells me where it came from.' },
    { id: 'wait', text: "Don't open it yet.", answer: "I'm not touching it." },
  ],
  disclosure: [
    { id: 'counts', text: 'The signed count is 14, but only 13 entries are visible. No deletion is logged.', answer: 'What records? Was he working on this before he disappeared? I know you cannot tell me why yet.' },
    { id: 'uncertain', text: 'I found something, but I cannot verify it.', answer: "Okay. Please don't guess just to make me feel better." },
    { id: 'withhold', text: 'I need some time before I share anything.', answer: "I understand. I won't keep messaging. Just tell me if there's something I should know." },
  ],
  bridge: [
    { id: 'public', text: 'Where can I find the public record?', answer: 'Greyhaven Bulletin. Maya kept an older Bus 4 public preview there. You can read it and decide whether to contact her.' },
    { id: 'aware', text: 'Does Maya know you contacted me?', answer: "No. I won't give her your number or tell her what you found without checking with you first. Her older Bus 4 preview is on Greyhaven Bulletin." },
    { id: 'later', text: 'Let me decide when I am ready.', answer: 'Of course. The older Bus 4 preview on Greyhaven Bulletin is public. You can start there when you want.' },
  ],
} as const

export const sophieChoices = {
  first: [
    { id: 'identity', text: 'Can you tell me a little about yourself?', answer: "I'm Daniel's younger sister. I don't know why he gave me your number." },
    { id: 'about', text: 'What do you need from me?', answer: "Just a look at what he left. I don't know what it means." },
    { id: 'minute', text: 'I can talk for a minute.', answer: "Thanks. I'll try not to take long." },
    { id: 'who', text: 'Who is Daniel Mercer?', answer: "My older brother. He worked with old civic records." },
    { id: 'missing', text: 'What do you mean, disappeared?', answer: "Nobody has heard from him in three days. The police are looking. He seemed to know this might happen." },
    { id: 'number', text: 'Why would he give you my number?', answer: "I asked him exactly that. He wouldn't tell me. Just made me promise I'd keep it safe." },
  ],
  second: [
    { id: 'originals', text: 'What are the originals?', answer: "He wouldn't tell me. He said it was safer if I knew as little as possible." },
    { id: 'take', text: "Why didn't he take it with him?", answer: "I wish I'd asked." },
    { id: 'token', text: 'Did he explain the recovery token?', answer: "No. He told me not to say it over a call. I thought it was just another of his passwords." },
    { id: 'photo', text: 'Can you prove this note is his?', answer: "I can only say I watched him write it. I know that isn't proof to you." },
    { id: 'help', text: "I'll see what I can find.", answer: "Thank you. Please be careful. I don't know who else has this number." },
  ],
} as const

export const danielNote = [
  'Sophie — if I stop answering, use the number I gave you.',
  'Show them this page, not the originals.',
  `RECOVERY: ${recoveryToken}`,
  'Index: 7–14. Check the revisions before you trust a deletion.',
  'D.',
] as const

/** Passwords are authored fiction and never authenticate real Apple accounts or devices. */
export const mirrorLocks = {
  'note-revision': {
    area: 'notes', answer: 'ECHO-7/14',
    hints: [
      'Daniel did not leave the key in this locked note. Sophie has something physical.',
      'Reopen the photo of Daniel’s handwritten note in the Sophie conversation.',
      'Enter the complete RECOVERY token, including the word and the slash.',
    ],
  },
  'note-bus': {
    area: 'notes', answer: 'BUS4',
    hints: [
      'This draft was filed under a public record, not a person’s birthday.',
      'Daniel’s Email mentions the North Quay evacuation preview and the vehicle number.',
      'Type the vehicle label as one word and numeral, without spaces.',
    ],
  },
  'album-index': {
    area: 'gallery', answer: '7-14',
    hints: [
      'This album uses a range rather than a name.',
      'Read the ordinary Untitled note in Notes for the number range.',
      'Enter the two endpoints separated by a hyphen.',
    ],
  },
  'album-quay': {
    area: 'gallery', answer: 'NORTHQUAY',
    hints: [
      'The album title comes from a saved place, not confirmed GPS.',
      'Look at Daniel’s saved pins in Maps.',
      'Enter the two-word place name without spaces.',
    ],
  },
} as const
export type MirrorLockId = keyof typeof mirrorLocks
export type MirrorRecord = { title: string; stamp: string; body: string; lockId?: MirrorLockId }
export type MirrorArea = 'messages' | 'mail' | 'gallery' | 'calls' | 'notes' | 'files' | 'browser' | 'contacts' | 'protected' | 'maps' | 'index'
export const mirrorAreas: { id: MirrorArea; label: string; summary: string }[] = [
  { id: 'messages', label: 'Messages', summary: 'Recovered threads' },
  { id: 'mail', label: 'Email', summary: 'Drafts & inbox' },
  { id: 'gallery', label: 'Gallery', summary: 'Media snapshots' },
  { id: 'calls', label: 'Calls', summary: 'Recent activity' },
  { id: 'notes', label: 'Notes', summary: 'Private notes' },
  { id: 'files', label: 'Files', summary: 'Recovered folders' },
  { id: 'browser', label: 'Browser', summary: 'Local history' },
  { id: 'contacts', label: 'Contacts', summary: 'Saved numbers' },
  { id: 'protected', label: 'Protected', summary: 'Encrypted content' },
  { id: 'maps', label: 'Maps', summary: 'Saved places & routes' },
  { id: 'index', label: 'Archive Index', summary: 'Integrity comparison' },
]

export const mirrorRecords: Record<MirrorArea, MirrorRecord[]> = {
  messages: [
    { title: 'Sophie Mercer · 2 Oct', stamp: 'RECOVERED / 18:12', body: 'Sophie: Did you eat the last of the biscuits?\nDaniel: I plead the fifth.\nSophie: Buy more on your way back.' },
    { title: 'Maya Chen · 3 Oct', stamp: 'RECOVERED / INCOMPLETE', body: 'Maya: The older North Quay preview is different from the civic copy.\nDaniel: Keep both versions. Do not name anyone yet.\nMaya: I kept the cropped Bus 4 preview for the Greyhaven Bulletin. We can compare what is publicly visible.' },
    { title: 'Lucas Grey · 4 Oct', stamp: 'RECOVERED / PARTIAL', body: 'Lucas: Are you coming to the office tomorrow?\nDaniel: I need to check the index first.' },
    { title: 'Unknown number', stamp: 'SOURCE UNVERIFIED', body: 'A message header was recovered, but not its sender. No reliable text survived.' },
  ],
  mail: [
    { title: 'Draft — Revision audit', stamp: 'NOT SENT', body: 'Subject: Discrepancy in record versions\nBefore claiming a record was deleted, compare the signed index with every visible entry.' },
    { title: 'Greyhaven Memory Project', stamp: 'RECOVERED / REDACTED', body: 'Subject: North Quay / Bus 4 preview\nMaya: I kept the older public-facing preview of the North Quay evacuation / Bus 4 record for the Greyhaven Bulletin. Please compare its escort field with the current civic copy. The full document is not authenticated here. Personal resident information is masked.' },
    { title: 'Sent - Library enquiry', stamp: 'SENT / DATE NOT RECOVERED', body: 'Subject: Book renewal\nCould I renew the local history volume? I can return it on Friday.\nAttachment: none retained.' },
    { title: 'Library desk', stamp: 'INBOX / DATE NOT RECOVERED', body: 'Subject: Renewal received\nYour enquiry is with the desk. Please keep your loan slip.' },
  ],
  gallery: [
    { title: 'IMG_0410 — North Quay', stamp: 'THUMBNAIL RECOVERED', body: 'A photograph of a document shelf. The right edge is outside the snapshot. Location metadata was not recovered.' },
    { title: 'Screenshot — message fragment', stamp: 'RECOVERED / PARTIAL', body: 'A cropped screenshot contains the words: compare the originals. The sender and date are outside the recovered frame.' },
    { title: 'Hidden Album · Index fragments', stamp: 'LOCKED', lockId: 'album-index', body: 'Two cropped images: the first shows fourteen numbered row markers; the second is a partial timestamp with its source cut off. They do not establish who altered any record.' },
    { title: 'Hidden Album · Quay references', stamp: 'LOCKED', lockId: 'album-quay', body: 'An offline photo of a notice board labelled NORTH QUAY and a map screenshot with no reliable timestamp. The image metadata is incomplete; this is not location proof.' },
  ],
  calls: [
    { title: 'Sophie Mercer', stamp: '4 OCT · OUTGOING', body: 'Call connected. Audio content is not available.' },
    { title: 'Blocked caller', stamp: '4 OCT · MISSED', body: 'Caller identity and source were not recovered.' },
    { title: 'Library desk', stamp: 'DATE NOT RECOVERED / INCOMING', body: 'Incoming call. No audio or duration recovered.' },
  ],
  notes: [
    { title: 'Untitled — last saved 22:30', stamp: 'RECOVERED NOTE', body: "If the index doesn't match the records, don't assume something was deleted.\nCheck the source. Check the revisions.\n7–14." },
    { title: 'To myself', stamp: 'RECOVERED NOTE', body: 'Milk. Tea for Sophie. Return the library book on Friday. Call about the kitchen tap.' },
    { title: 'Locked Note — revision copy', stamp: 'LOCKED', lockId: 'note-revision', body: 'The signed index says fourteen. The latest visible index lists thirteen. Do not treat an absent deletion log as proof of no revision. Preserve both source versions. — D.' },
    { title: 'Locked Note — public comparison', stamp: 'LOCKED', lockId: 'note-bus', body: 'Bus 4: open the older public preview and the current public record. Compare their visible Escort fields yourself. Do not assume this discrepancy and the recovered 14/13 mismatch have the same cause. Ask Maya for the original chain of custody. — D.' },
  ],
  files: [
    { title: 'records/2019/north-quay', stamp: 'READ-ONLY', body: 'Reference images and partial metadata. Personal resident data has not been recovered.' },
    { title: 'index.audit', stamp: 'INTEGRITY AVAILABLE', body: 'The signed record count and visible index can be compared in Archive Index.' },
    { title: 'personal/shopping.txt', stamp: 'RECOVERED TEXT', body: 'Tea. Milk. Biscuits. Check the cupboard before buying more.' },
    { title: 'protected/container.enc', stamp: 'ENCRYPTED / UNAVAILABLE', body: 'Encrypted container reference only. No key or contents were recovered.' },
  ],
  browser: [
    { title: 'Greyhaven Civic Portal', stamp: 'HISTORY ENTRY', body: 'Daniel opened the public North Quay evacuation record. Contents may have changed after the snapshot.' },
    { title: 'Revision history help', stamp: 'BOOKMARK', body: 'A revision log can be incomplete without proving a deletion. Preserve conflicting versions.' },
  ],
  contacts: [
    { title: 'Sophie Mercer', stamp: 'SAVED CONTACT', body: 'Sister. Telephone number withheld from the fictional mirror.' },
    { title: 'Maya Chen', stamp: 'SAVED CONTACT', body: 'Greyhaven Memory Project. No personal contact details are exposed.' },
  ],
  maps: [
    { title: 'North Quay · saved place', stamp: '4 OCT · SAVED PIN', body: 'An offline pin named North Quay. This recovery did not retain GPS proof that Daniel visited this location.' },
    { title: 'Civic Records Annex · search', stamp: '3 OCT · SEARCH HISTORY', body: 'A search for the Civic Records Annex. Search history is not a confirmed journey.' },
    { title: 'Route preview · unavailable', stamp: 'PARTIAL DATA', body: 'A route cache exists, but origin and destination timestamps are missing. Do not treat this as Daniel’s last-known location.' },
  ],
  protected: [
    { title: 'Encrypted container', stamp: 'LOCKED', body: 'The key for this container is not included in the recovery package. It cannot be opened in Chapter 1.' },
  ],
  index: [
    { title: 'Archive Index — integrity report', stamp: 'VERIFY / READ ONLY', body: 'Signed record count: 14\nVisible indexed records: 13\nDeletion history entries: 0\nOrigin of this mismatch: UNDETERMINED' },
  ],
}

/** Authored continuation lines; state functions only select and schedule these records. */
export const openingLines = {
  note: "He left me a handwritten note. I'll send you a photo. Please read it.",
  witness: 'He wrote it himself. I watched him do it. I know you have no reason to believe that.',
  quiet: "I don't want to make this your problem. But I don't know why he chose you, and I can't ignore that.",
  legacyOffer: 'Someone just sent a recovery request to this number. Was that you?',
  recovery: ['Does any of it mean something to you?', 'Wait. A message just came through asking about a recovery request. Did you do that?'],
  bridge: ['There is someone else you should probably talk to.', "Maya Chen. Daniel's fianc\u00e9e. I don't know how much he told her."],
  followup: ['Hey. Are you there?', "I almost deleted your number. That's how frightened I was when Daniel handed it to me.", 'Did you find something?'],
} as const
