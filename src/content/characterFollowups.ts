export type FollowupContact = 'lucas' | 'eli' | 'nora'

/** These exchanges use public observations only; no recovered file is shared. */
export const followupContacts = {
  lucas: {
    source: 'Existing FIND DANIEL group thread',
    intro: 'You left FIND DANIEL. Can I ask about the public Bus 4 record without posting a theory in the group?',
    reply: "Yes. I left because a cropped page was starting to sound like a verdict. Ask about the field, not a person.",
    choices: [
      { id: 'careful', text: 'What could the public crop fail to show?', answer: "The dispatch original and the page edge. I can't call the blank a deletion from that crop." },
      { id: 'defensive', text: "I didn't accuse anyone. Why treat my question that way?", answer: "Fair. I was reacting to the group, not what you actually sent. The two public fields still need checking." },
      { id: 'evidence', text: 'Can you verify either full version?', answer: "Not from here. A duty sheet isn't the dispatch original either. Keep the sources separate." },
    ],
  },
  eli: {
    source: 'Maya’s public case-contact referral',
    intro: 'Maya referred me for a technical question. What can an incomplete copy establish?',
    reply: "I'm Eli Ward. A damaged copy can show which parts are readable and where data is missing. It can't recreate the missing bytes.",
    choices: [
      { id: 'limits', text: 'How should I label a gap in the copy?', answer: "Call it unavailable. Don't fill the gap with a guess, even if nearby text looks familiar." },
      { id: 'initials', text: 'Does a damaged E—I field identify a person?', answer: "No. Check the complete field and its source before attaching a name to it." },
      { id: 'provenance', text: 'What would make a technical comparison stronger?', answer: 'A source copy, its transfer history, and a repeatable check. My reading alone is not authentication.' },
    ],
  },
  nora: {
    source: 'Maya’s public case-contact referral',
    intro: 'Maya referred me for an independent view. How should I describe the two public Bus 4 versions?',
    reply: "I'm Nora Vance. Start with what each source actually shows. Then say what you infer. A conclusion needs another check.",
    choices: [
      { id: 'source', text: 'What is the source-level statement?', answer: 'The older public crop names an escort. The current public view has a blank in that field. That is what those two views show.' },
      { id: 'interpretation', text: 'What can I infer from that difference?', answer: 'Only that the public views differ. The change history may explain why; the crop cannot authenticate the whole file.' },
      { id: 'privacy', text: 'Should I name someone while asking for a correction?', answer: 'Keep private identities out of it. A correction can identify the field and source without publishing a person.' },
    ],
  },
} as const
