// Owner-authored Life in Fragments v1.0. October entries shifted back 14 days.
export const mirrorStoryPresent = '2026-10-08'
export const mayaBirthday = { day: 18, month: 9 } as const
export const mirrorApps = ['Messages','Mail','Photos','Notes','Maps','Browser','Calls','Contacts','Files','Calendar','Voice','Deleted'] as const
export type LifeApp = typeof mirrorApps[number]
export type LifeRecord = { id: string; app: LifeApp; title: string; date: string; body: string; chat?: { sender: string; text: string }[]; stamp?: string; unavailable?: boolean; locked?: boolean; observation?: string; place?: string; category?: string; duration?: number; related?: string; byline?: string; deck?: string; subject?: string }
const authoredLifeRecords: LifeRecord[] = [
  {
    "id": "LIFE-M1",
    "app": "Messages",
    "title": "Maya ❤️",
    "date": "2026-10-01",
    "body": "",
    "chat": [
      {
        "sender": "maya",
        "text": "Don't forget we're having dinner tonight."
      },
      {
        "sender": "daniel",
        "text": "I haven't forgotten."
      },
      {
        "sender": "maya",
        "text": "You said that last time 😂"
      },
      {
        "sender": "daniel",
        "text": "And I showed up, didn't I?"
      },
      {
        "sender": "maya",
        "text": "Forty minutes late."
      },
      {
        "sender": "daniel",
        "text": "Traffic."
      },
      {
        "sender": "maya",
        "text": "You were working from home."
      },
      {
        "sender": "daniel",
        "text": "Very aggressive traffic in the hallway."
      },
      {
        "sender": "maya",
        "text": "You're impossible."
      },
      {
        "sender": "daniel",
        "text": "But you love me."
      },
      {
        "sender": "maya",
        "text": "Unfortunately."
      },
      {
        "sender": "daniel",
        "text": "I'll be there."
      },
      {
        "sender": "maya",
        "text": "Promise?"
      },
      {
        "sender": "daniel",
        "text": "Promise."
      }
    ],
    "stamp": "18:17",
    "unavailable": false
  },
  {
    "id": "LIFE-M2",
    "app": "Messages",
    "title": "Lucas",
    "date": "2026-09-30",
    "body": "",
    "chat": [
      {
        "sender": "lucas",
        "text": "You coming Saturday or are you disappearing on us again?"
      },
      {
        "sender": "daniel",
        "text": "Depends. Is this another 'quick' game night?"
      },
      {
        "sender": "lucas",
        "text": "Three hours. Maximum."
      },
      {
        "sender": "daniel",
        "text": "You said that before sunrise last time."
      },
      {
        "sender": "lucas",
        "text": "Different circumstances."
      },
      {
        "sender": "daniel",
        "text": "You fell asleep holding the controller."
      },
      {
        "sender": "lucas",
        "text": "Tactical rest."
      },
      {
        "sender": "daniel",
        "text": "Sure, mate."
      },
      {
        "sender": "lucas",
        "text": "I'll count that as a yes."
      },
      {
        "sender": "daniel",
        "text": "Count it as a maybe."
      }
    ],
    "stamp": "21:09",
    "unavailable": false
  },
  {
    "id": "LIFE-M3",
    "app": "Messages",
    "title": "Soph",
    "date": "2026-09-29",
    "body": "",
    "chat": [
      {
        "sender": "sophie",
        "text": "Mum wants everyone there on Sunday."
      },
      {
        "sender": "daniel",
        "text": "Define everyone."
      },
      {
        "sender": "sophie",
        "text": "You. Me. The people who pretend they don't want seconds."
      },
      {
        "sender": "daniel",
        "text": "So... everyone."
      },
      {
        "sender": "sophie",
        "text": "And you still owe me coffee btw."
      },
      {
        "sender": "daniel",
        "text": "I bought you one last week."
      },
      {
        "sender": "sophie",
        "text": "You drank half of it."
      },
      {
        "sender": "daniel",
        "text": "Quality control."
      },
      {
        "sender": "sophie",
        "text": "You're a terrible brother."
      },
      {
        "sender": "daniel",
        "text": "See you Sunday, Soph."
      }
    ],
    "stamp": "12:48",
    "unavailable": false
  },
  {
    "id": "LIFE-M4",
    "app": "Messages",
    "title": "Eli",
    "date": "2026-09-28",
    "body": "",
    "chat": [
      {
        "sender": "eli",
        "text": "Did you take my blue mug?"
      },
      {
        "sender": "daniel",
        "text": "I don't even like that mug."
      },
      {
        "sender": "eli",
        "text": "That's not a no."
      },
      {
        "sender": "daniel",
        "text": "Check the meeting room."
      },
      {
        "sender": "eli",
        "text": "Found it. Someone put a plant in it."
      },
      {
        "sender": "daniel",
        "text": "A promotion."
      },
      {
        "sender": "eli",
        "text": "I'm going to pretend you weren't involved."
      },
      {
        "sender": "daniel",
        "text": "Appreciated."
      }
    ],
    "stamp": "10:06",
    "unavailable": false
  },
  {
    "id": "LIFE-M5",
    "app": "Messages",
    "title": "Nora Vance",
    "date": "2026-09-28",
    "body": "",
    "chat": [
      {
        "sender": "daniel",
        "text": "Is Friday at four still good?"
      },
      {
        "sender": "nora",
        "text": "It should be. I'll confirm after my morning call."
      },
      {
        "sender": "daniel",
        "text": "Same place?"
      },
      {
        "sender": "nora",
        "text": "Morrow Café. Back tables are usually quieter."
      },
      {
        "sender": "daniel",
        "text": "Thanks. Coffee's on me."
      },
      {
        "sender": "nora",
        "text": "Then I'm definitely showing up."
      }
    ],
    "stamp": "16:28",
    "unavailable": false
  },
  {
    "id": "LIFE-M6",
    "app": "Messages",
    "title": "Unknown Contact",
    "date": "2026-10-01",
    "body": "This item is not present in the mirrored snapshot.",
    "chat": [],
    "stamp": "22:14",
    "unavailable": true
  },
  {
    "id": "LIFE-N1",
    "app": "Notes",
    "title": "Things to check",
    "date": "2026-10-01",
    "body": "- Call Lucas back\n- Pick up dry cleaning\n- Dinner with Maya\n- Check index history\n- Ask Eli about message timestamps\n- Buy Soph coffee\nMaintain the deliberately mixed personal/investigation wording; do not add explanatory footnotes in player UI.",
    "locked": false
  },
  {
    "id": "LIFE-N2",
    "app": "Notes",
    "title": "Groceries",
    "date": "2026-09-27",
    "body": "Eggs\nCoffee\nPasta\nDish soap\nSomething sweet for Maya",
    "locked": false
  },
  {
    "id": "LIFE-N3",
    "app": "Notes",
    "title": "Sunday lunch",
    "date": "2026-09-26",
    "body": "Get there before Mum starts calling.\nBring drinks.\nAsk Soph which dessert she wants.\nDon't leave the containers behind again.",
    "locked": false
  },
  {
    "id": "LIFE-N4",
    "app": "Notes",
    "title": "The old copy",
    "date": "2026-09-25",
    "body": "I could be misremembering the order.\nTwo versions looked almost the same.\nNeed a quieter hour to compare them properly.\nNo conclusions yet.",
    "locked": false
  },
  {
    "id": "LIFE-N5",
    "app": "Notes",
    "title": "Questions for later",
    "date": "2026-09-30",
    "body": "Where did the first version come from?\nWho kept the earlier one?\nCould the timestamps be out of order?\nTalk to someone who knows how to verify a source.",
    "locked": false
  },
  {
    "id": "LIFE-N6",
    "app": "Notes",
    "title": "Maya",
    "date": "2026-09-16",
    "body": "Book table.\nPick up flowers.\nDon't ask her what she wants again — she already told me.",
    "locked": false
  },
  {
    "id": "LIFE-N7",
    "app": "Notes",
    "title": "For when I can think clearly",
    "date": "2026-10-01",
    "body": "I keep reading the same pages and feeling as if I've skipped something.\nIt might be nothing. That's what worries me.\nA newer copy isn't automatically a better one.\nBefore I ask anyone else, I need to compare what was there first — not just what's there now.\nIf I am wrong, I can live with that.\nIf I'm not, I need to be careful about what I say.",
    "locked": true,
    "observation": "OBS_DANIEL_PRIVATE_NOTE_UNLOCKED"
  },
  {
    "id": "LIFE-CAL1",
    "app": "Calendar",
    "title": "Maya's birthday 🎂",
    "date": "2026-09-18",
    "body": "Flowers. Dinner reservation. Don't be late again.",
    "stamp": "All day",
    "place": "personal",
    "observation": "OBS_MAYA_BIRTHDAY_READ"
  },
  {
    "id": "LIFE-CAL2",
    "app": "Calendar",
    "title": "Dinner with Maya",
    "date": "2026-09-26",
    "body": "She picked the place. My turn to be on time.",
    "stamp": "18:30",
    "place": "The Corner Table"
  },
  {
    "id": "LIFE-CAL3",
    "app": "Calendar",
    "title": "Family lunch",
    "date": "2026-09-27",
    "body": "Bring drinks. Ask Soph about dessert.",
    "stamp": "13:00",
    "place": "Family home"
  },
  {
    "id": "LIFE-CAL4",
    "app": "Calendar",
    "title": "Coffee with Soph",
    "date": "2026-09-29",
    "body": "If I cancel again, she'll never let me forget it.",
    "stamp": "17:30",
    "place": "Morrow Café"
  },
  {
    "id": "LIFE-CAL5",
    "app": "Calendar",
    "title": "Lucas — game night?' / Lucas",
    "date": "2026-09-30",
    "body": "Tentative. Ask whether he's ordering food.",
    "stamp": "20:00",
    "place": "Lucas's place"
  },
  {
    "id": "LIFE-CAL6",
    "app": "Calendar",
    "title": "Dinner with Maya ❤️",
    "date": "2026-10-01",
    "body": "Reservation for two. No work excuses.",
    "stamp": "19:30",
    "place": "The Corner Table"
  },
  {
    "id": "LIFE-CAL7",
    "app": "Calendar",
    "title": "Nora Vance — coffee",
    "date": "2026-10-02",
    "body": "Tentative. Wait for confirmation.",
    "stamp": "16:00",
    "place": "Morrow Café",
    "observation": "OBS_NORA_APPOINTMENT_READ"
  },
  {
    "id": "LIFE-CAL8",
    "app": "Calendar",
    "title": "Pick up dry cleaning",
    "date": "2026-10-06",
    "body": "Receipt in coat pocket, probably.",
    "stamp": "12:30",
    "place": "Westside Cleaners"
  },
  {
    "id": "LIFE-V1",
    "app": "Voice",
    "title": "Shopping",
    "date": "2026-09-26",
    "body": "Coffee. Milk. Pasta... Why am I recording this instead of writing it down? Oh, and flowers. Don't forget the flowers.",
    "duration": 13
  },
  {
    "id": "LIFE-V2",
    "app": "Voice",
    "title": "Late idea",
    "date": "2026-09-25",
    "body": "I should compare the older version when I have a proper minute. Maybe I just read it too quickly. I don't want to make a whole thing out of nothing.",
    "duration": 19
  },
  {
    "id": "LIFE-V3",
    "app": "Voice",
    "title": "For Soph",
    "date": "2026-09-27",
    "body": "Soph, if I forget the coffee again, this is your official permission to annoy me about it forever. There. Evidence. [small laugh]",
    "duration": 12
  },
  {
    "id": "LIFE-V4",
    "app": "Voice",
    "title": "Reminder",
    "date": "2026-09-30",
    "body": "Ask Eli if there's a normal explanation for the timestamps. Write it down this time. And... sleep. Definitely sleep.",
    "duration": 17
  },
  {
    "id": "LIFE-V5",
    "app": "Voice",
    "title": "Unsent thought",
    "date": "2026-10-01",
    "body": "People hear a question and think you're accusing someone. I'm not. I just want to understand why things don't line up the way I remember.",
    "duration": 20,
    "observation": "OBS_VOICE_UNSENT_READ"
  },
  {
    "id": "LIFE-B1",
    "app": "Browser",
    "title": "easy pasta sauce no cream",
    "date": "2026-09-22",
    "body": "No page cached for this search."
  },
  {
    "id": "LIFE-B2",
    "app": "Browser",
    "title": "how to view earlier document version",
    "date": "2026-09-24",
    "body": "No page cached for this search."
  },
  {
    "id": "LIFE-B3",
    "app": "Browser",
    "title": "dinner reservation for two",
    "date": "2026-09-26",
    "body": "No page cached for this search."
  },
  {
    "id": "LIFE-B4",
    "app": "Browser",
    "title": "Nora Vance The City Ledger",
    "date": "2026-09-27",
    "body": "No page cached for this search.",
    "related": "LIFE-ARTICLE"
  },
  {
    "id": "LIFE-B5",
    "app": "Browser",
    "title": "how journalists verify source documents",
    "date": "2026-09-27",
    "body": "No page cached for this search.",
    "related": "LIFE-ARTICLE"
  },
  {
    "id": "LIFE-B6",
    "app": "Browser",
    "title": "can file timestamps change after sync",
    "date": "2026-09-29",
    "body": "No page cached for this search."
  },
  {
    "id": "LIFE-B7",
    "app": "Browser",
    "title": "Westside Cleaners opening hours",
    "date": "2026-10-01",
    "body": "No page cached for this search."
  },
  {
    "id": "LIFE-ARTICLE",
    "app": "Browser",
    "title": "When Public Records Get Updated, What's Left Behind?",
    "date": "2026-09-26",
    "body": "When a public document changes online, the revised copy is usually the only version most readers ever see. That doesn't automatically mean anything improper happened. Corrections, formatting and administrative updates are part of ordinary record-keeping.\n\nBut people who rely on those documents still need to know which version they have. An archived link, an old email attachment or a dated screenshot can help reconstruct a sequence — although none should be treated as proof on its own.\n\n“Start with what you can verify,” said one records specialist interviewed for this report. “Then separate what you know from what you assume.”",
    "byline": "Nora Vance · The City Ledger · Local Affairs",
    "deck": "A routine local filing dispute has revived a simple question: how can readers tell which version they are looking at?",
    "observation": "OBS_NORA_ARTICLE_READ"
  },
  {
    "id": "LIFE-P1",
    "app": "Maps",
    "title": "The Corner Table",
    "date": "",
    "body": "Maya likes the window seats.",
    "category": "Saved"
  },
  {
    "id": "LIFE-P2",
    "app": "Maps",
    "title": "Morrow Café",
    "date": "",
    "body": "Quiet back tables.",
    "category": "Recent"
  },
  {
    "id": "LIFE-P3",
    "app": "Maps",
    "title": "Westside Cleaners",
    "date": "",
    "body": "Pick-up reminder.",
    "category": "Recent"
  },
  {
    "id": "LIFE-P4",
    "app": "Maps",
    "title": "Greenbank Park",
    "date": "",
    "body": "Morning walks.",
    "category": "Saved"
  },
  {
    "id": "LIFE-P5",
    "app": "Maps",
    "title": "Ridgeway Annex",
    "date": "",
    "body": "No saved description.",
    "category": "Search history",
    "observation": "OBS_RIDGEWAY_SEARCH_VIEWED"
  },
  {
    "id": "LIFE-P6",
    "app": "Maps",
    "title": "Canal Footbridge",
    "date": "",
    "body": "Search metadata incomplete.",
    "category": "Search history"
  },
  {
    "id": "LIFE-PH1",
    "app": "Photos",
    "title": "Dinner",
    "date": "2026-09-26",
    "body": "A couple at a restaurant.",
    "unavailable": false
  },
  {
    "id": "LIFE-PH2",
    "app": "Photos",
    "title": "Coffee",
    "date": "2026-09-29",
    "body": "Mug, notebook and pastries.",
    "unavailable": false
  },
  {
    "id": "LIFE-PH3",
    "app": "Photos",
    "title": "Sunday lunch",
    "date": "2026-09-27",
    "body": "A table prepared for lunch.",
    "unavailable": false
  },
  {
    "id": "LIFE-PH4",
    "app": "Photos",
    "title": "On the way home",
    "date": "2026-09-24",
    "body": "Wet pavement and streetlights.",
    "unavailable": false
  },
  {
    "id": "LIFE-PH5",
    "app": "Photos",
    "title": "IMG_0714",
    "date": "",
    "body": "Preview unavailable.",
    "unavailable": true
  },
  {
    "id": "LIFE-PH6",
    "app": "Photos",
    "title": "Desk",
    "date": "2026-09-30",
    "body": "Ordinary desk clutter.",
    "unavailable": false
  },
  {
    "id": "LIFE-E1",
    "app": "Mail",
    "title": "Order Confirmation",
    "date": "2026-09-26",
    "body": "Thanks for your order. Your confirmation has been saved for your records.",
    "byline": "orders@fictional-shop.invalid",
    "subject": "Order confirmation"
  },
  {
    "id": "LIFE-E2",
    "app": "Mail",
    "title": "Reservation Reminder",
    "date": "2026-10-01",
    "body": "Reservation for two. Thursday, 1 October, 7:30 PM. The Corner Table.",
    "byline": "bookings@corner-table.invalid",
    "subject": "Your table is reserved"
  },
  {
    "id": "LIFE-E3",
    "app": "Mail",
    "title": "Document Review",
    "date": "2026-09-30",
    "body": "Please check the attached version before proceeding.\n\nAttachment: Unavailable in mirrored snapshot.",
    "byline": "internal@offline.invalid",
    "subject": "Document review"
  },
  {
    "id": "LIFE-E4",
    "app": "Mail",
    "title": "Storage Notification",
    "date": "2026-10-02",
    "body": "Some recently removed items could not\nbe included in the latest backup.\n\nItems affected:\nMessages\nPhotos\nFiles\n\nRecovery option:\nAVAILABLE\n\nRecovery time:\n25 MINUTES",
    "byline": "System",
    "subject": "Storage synchronization incomplete",
    "observation": "OBS_STORAGE_NOTICE_READ"
  },
  {
    "id": "LIFE-CALL1",
    "app": "Calls",
    "title": "Lucas",
    "date": "2026-09-30",
    "body": "Outgoing · 01:24",
    "stamp": "18:23"
  },
  {
    "id": "LIFE-CALL2",
    "app": "Calls",
    "title": "Soph",
    "date": "2026-09-29",
    "body": "Missed incoming",
    "stamp": "13:10"
  },
  {
    "id": "LIFE-CALL3",
    "app": "Calls",
    "title": "Nora Vance",
    "date": "2026-09-28",
    "body": "Outgoing · 00:48",
    "stamp": "16:19"
  },
  {
    "id": "LIFE-CALL4",
    "app": "Calls",
    "title": "Mum",
    "date": "2026-09-27",
    "body": "Incoming · 02:11",
    "stamp": "10:02"
  },
  {
    "id": "LIFE-CALL5",
    "app": "Calls",
    "title": "Maya ❤️",
    "date": "2026-09-26",
    "body": "Outgoing · 00:29",
    "stamp": "19:01"
  },
  {
    "id": "LIFE-CONTACT1",
    "app": "Contacts",
    "title": "Daniel Mercer",
    "date": "",
    "body": "Device owner"
  },
  {
    "id": "LIFE-CONTACT2",
    "app": "Contacts",
    "title": "Maya ❤️",
    "date": "",
    "body": "Maya Chen\nFiancée\nBirthday: 18 September\nFavourite",
    "observation": "OBS_MAYA_BIRTHDAY_READ"
  },
  {
    "id": "LIFE-CONTACT3",
    "app": "Contacts",
    "title": "Lucas Grey",
    "date": "",
    "body": "Friend"
  },
  {
    "id": "LIFE-CONTACT4",
    "app": "Contacts",
    "title": "Soph",
    "date": "",
    "body": "Sophie Mercer\nSister"
  },
  {
    "id": "LIFE-CONTACT5",
    "app": "Contacts",
    "title": "Eli Ward",
    "date": "",
    "body": "Axiom Recovery · Colleague"
  },
  {
    "id": "LIFE-CONTACT6",
    "app": "Contacts",
    "title": "Nora Vance",
    "date": "",
    "body": "The City Ledger · Reporter"
  },
  {
    "id": "LIFE-CONTACT7",
    "app": "Contacts",
    "title": "Mum",
    "date": "",
    "body": "Family"
  },
  {
    "id": "LIFE-CONTACT8",
    "app": "Contacts",
    "title": "Unknown Contact",
    "date": "",
    "body": "Missing data"
  },
  {
    "id": "LIFE-F1",
    "app": "Files",
    "title": "Dinner_Reservation.pdf",
    "date": "",
    "body": "Reservation for two · Thursday, 1 October · 19:30\nThe Corner Table.\nCached summary only."
  },
  {
    "id": "LIFE-F2",
    "app": "Files",
    "title": "Shopping_List.txt",
    "date": "",
    "body": "Eggs\nCoffee\nPasta\nDish soap\nSomething sweet for Maya"
  },
  {
    "id": "LIFE-F3",
    "app": "Files",
    "title": "Meeting_Notes.txt",
    "date": "",
    "body": "Need to review the older material later. Don't rely on memory alone."
  },
  {
    "id": "LIFE-F4",
    "app": "Files",
    "title": "Unresolved Attachment",
    "date": "",
    "body": "Unavailable in mirrored snapshot."
  }
]
const birthdayISO = `2026-${String(mayaBirthday.month).padStart(2,'0')}-${String(mayaBirthday.day).padStart(2,'0')}`
const birthdayLabel = new Date(birthdayISO+'T12:00:00Z').toLocaleDateString('en-GB',{day:'numeric',month:'long',timeZone:'UTC'})
export const lifeRecords: LifeRecord[] = authoredLifeRecords.map(record => record.id === 'LIFE-CAL1' ? {...record,date:birthdayISO} : record.id === 'LIFE-CONTACT2' ? {...record,body:record.body.replace(/Birthday: [^\n]+/,`Birthday: ${birthdayLabel}`)} : record)
