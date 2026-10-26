// Generated from the pinned Scene 08 manuscript. AUTHORED ONLY; not in the live graph.
export type Scene08StagedChoice = { readonly id: `S08-C${string}`; readonly mode: 'local'|'civic-inquiry'|'civic-followup'|'nora-professional'|'sophie-private'|'group'; readonly heading:string; readonly options:readonly {readonly id:'a'|'b'|'c';readonly text:string}[] }
export const scene08StagedMetadata = {
  "authoringId": "chapter_01_scene_08_the_missing_issuer",
  "planningId": "ch01_sc08_the_page_she_kept",
  "status": "authored-staged",
  "playable": false,
  "sourceSha256": "5c7a8e4faafd96eab411fe6a1da4bed5ac91bc708e0a38cfd2bf5cfc19c3d746",
  "prerequisite": {
    "scene": "THE BYLINE",
    "completionChoice": "S07-C15",
    "actualSavedCompletionRequired": true,
    "manualEntryRequired": true
  },
  "choiceSets": 16,
  "alternatives": 48,
  "targetQaScenarios": 52,
  "nextLead": "THE TRANSFER REGISTER",
  "nextLeadPlayable": false
} as const
export const scene08StagedChoices = [
  {
    "id": "S08-C01",
    "mode": "local",
    "heading": "LOCAL ARCHIVE NAVIGATION, NO SEND",
    "options": [
      {
        "id": "a",
        "text": "Review the publisher's reference again."
      },
      {
        "id": "b",
        "text": "What happened to the Bulletin requests?"
      },
      {
        "id": "c",
        "text": "Show me what an issuer would mean."
      }
    ]
  },
  {
    "id": "S08-C02",
    "mode": "local",
    "heading": "WHICH OFFICE IS A REASONABLE FIRST STOP? LOCAL NO SEND",
    "options": [
      {
        "id": "a",
        "text": "Municipal Communications must have approved the article."
      },
      {
        "id": "b",
        "text": "The General Public Notices Routing Desk can advise which office might hold a notice, without asserting it issued GB-REF-017."
      },
      {
        "id": "c",
        "text": "Records Custody automatically proves the notice exists."
      }
    ]
  },
  {
    "id": "S08-C03",
    "mode": "local",
    "heading": "THREE-ROLE MATCH, LOCAL NO SEND",
    "options": [
      {
        "id": "a",
        "text": "A route can direct me to a custodian; only a linked original can establish who issued the notice."
      },
      {
        "id": "b",
        "text": "The desk that answers must also have written the notice."
      },
      {
        "id": "c",
        "text": "A publisher's reference is the custodian's official ID."
      }
    ]
  },
  {
    "id": "S08-C04",
    "mode": "local",
    "heading": "LOCAL SEARCH MEANING, NO SEND",
    "options": [
      {
        "id": "a",
        "text": "No match for GB-REF-017 means someone deleted the notice."
      },
      {
        "id": "b",
        "text": "The article's updated label is better evidence of the issuer."
      },
      {
        "id": "c",
        "text": "I need an official identifier or a reliable descriptor before treating a catalogue result as relevant."
      }
    ]
  },
  {
    "id": "S08-C05",
    "mode": "local",
    "heading": "PREPARE A LIMITED QUESTION, LOCAL STRATEGY, NO SEND",
    "options": [
      {
        "id": "a",
        "text": "I want the likely records custodian, not the article author's name."
      },
      {
        "id": "b",
        "text": "I want to know which public office handles the category."
      },
      {
        "id": "c",
        "text": "I want to preserve uncertainty until a document can be located."
      }
    ]
  },
  {
    "id": "S08-C06",
    "mode": "local",
    "heading": "WHAT SHOULD A LOCATING REQUEST SAY? LOCAL NO SEND",
    "options": [
      {
        "id": "a",
        "text": "Please confirm this notice was revised after publication."
      },
      {
        "id": "b",
        "text": "I have a publisher-labelled public-notice lead with no original number. Which public service route could identify its custodian?"
      },
      {
        "id": "c",
        "text": "Which staff member concealed GB-REF-017?"
      }
    ]
  },
  {
    "id": "S08-C07",
    "mode": "local",
    "heading": "CAN THE TRANSFER GUIDE IDENTIFY THIS FILE? LOCAL NO SEND",
    "options": [
      {
        "id": "a",
        "text": "Yes, it proves the original notice moved to a successor office."
      },
      {
        "id": "b",
        "text": "No public notice exists because none is shown on this page."
      },
      {
        "id": "c",
        "text": "No. A specific transfer entry and record series would still have to link the original notice to an issuer or custodian."
      }
    ]
  },
  {
    "id": "S08-C08",
    "mode": "civic-inquiry",
    "heading": "OPTIONAL QUESTION (SELECT -> EDIT -> REVIEW -> SEND)",
    "options": [
      {
        "id": "a",
        "text": "I am trying to identify the proper public records route for a notice cited only by a publisher. Which desk handles locating a notice when the issuing office is unknown?"
      },
      {
        "id": "b",
        "text": "A public publisher note uses the reference GB-REF-017 for a possible public notice. This is not an official record number. Which public office can help identify a custodian?"
      },
      {
        "id": "c",
        "text": "Does the service directory have guidance on former office names or transfer series for public notices without known dates or official identifiers?"
      }
    ]
  },
  {
    "id": "S08-C09",
    "mode": "civic-followup",
    "heading": "OPTIONAL FOLLOW-UP TO CIVIC INBOX, REAL CHAT SEND",
    "options": [
      {
        "id": "a",
        "text": "So the first useful step is finding a record series, not assuming the publisher's reference is a file number?"
      },
      {
        "id": "b",
        "text": "Can you tell me which person last edited the Bulletin?"
      },
      {
        "id": "c",
        "text": "Thank you. I'll keep the difference between a request and a record clear."
      }
    ]
  },
  {
    "id": "S08-C10",
    "mode": "local",
    "heading": "CHOOSE THE EVIDENTIARY NEXT STEP, LOCAL NO SEND",
    "options": [
      {
        "id": "a",
        "text": "Treat the city's route code as the missing notice number."
      },
      {
        "id": "b",
        "text": "Look for an identified issuer/series and an actual original record with attributable provenance before making a content claim."
      },
      {
        "id": "c",
        "text": "Assume the notice was transferred and therefore altered."
      }
    ]
  },
  {
    "id": "S08-C11",
    "mode": "local",
    "heading": "PRIVATE INVESTIGATION PRIORITY, ALL THREE ADVANCE",
    "options": [
      {
        "id": "a",
        "text": "Try to identify a public record series in the transfer register."
      },
      {
        "id": "b",
        "text": "Check former-office names before searching a custodian index."
      },
      {
        "id": "c",
        "text": "Keep correspondence separate until I have a source I can verify."
      }
    ]
  },
  {
    "id": "S08-C12",
    "mode": "nora-professional",
    "heading": "OPTIONAL NORA PROFESSIONAL QUESTION, COMPOSER + REAL SEND",
    "options": [
      {
        "id": "a",
        "text": "I found an official public routing desk. That tells me where to ask, not which office created your reference. Right?"
      },
      {
        "id": "b",
        "text": "Did your reporting note tell you which office created GB-REF-017?"
      },
      {
        "id": "c",
        "text": "I won't quote the missing notice. I'll look for the official record before drawing conclusions."
      }
    ]
  },
  {
    "id": "S08-C13",
    "mode": "sophie-private",
    "heading": "OPTIONAL PRIVATE REPLY, COMPOSER + SEND",
    "options": [
      {
        "id": "a",
        "text": "That sounds like something he'd say."
      },
      {
        "id": "b",
        "text": "You don't have to apologise for mentioning him."
      },
      {
        "id": "c",
        "text": "Want to talk about literally anything else?"
      }
    ]
  },
  {
    "id": "S08-C14",
    "mode": "sophie-private",
    "heading": "OPTIONAL PRIVATE REPLY, COMPOSER + SEND",
    "options": [
      {
        "id": "a",
        "text": "I'm okay. I'm trying to keep the public facts separate from guesses."
      },
      {
        "id": "b",
        "text": "I'm tired of staring at documents."
      },
      {
        "id": "c",
        "text": "Can I tell you one small public update? Only if you want."
      }
    ]
  },
  {
    "id": "S08-C15",
    "mode": "group",
    "heading": "OPTIONAL GROUP PUBLIC MESSAGE, COMPOSER + REAL SEND",
    "options": [
      {
        "id": "a",
        "text": "There's a public civic desk for locating notice records, but that doesn't identify who issued the document in the article."
      },
      {
        "id": "b",
        "text": "The publisher's reference still has no verified issuer or document. I don't want us treating the label as proof."
      },
      {
        "id": "c",
        "text": "I'm going to check public transfer headings before sharing another theory about Daniel."
      }
    ]
  },
  {
    "id": "S08-C16",
    "mode": "local",
    "heading": "FINAL PRIVATE STANCE, NO SEND",
    "options": [
      {
        "id": "a",
        "text": "The civic desk is a way to ask, not proof of which office issued the notice."
      },
      {
        "id": "b",
        "text": "I need the record series or issuer's official number before I treat GB-REF-017 as a source document."
      },
      {
        "id": "c",
        "text": "I won't attach Daniel, Nora or another person to an unseen notice."
      }
    ]
  }
] as const satisfies readonly Scene08StagedChoice[]
export const scene08StagedPages = {
  "GH-CIVIC-DIRECTORY-001": {
    "route": "browser://greyhaven/civic-records/service-directory",
    "paragraphs": [
      "GREYHAVEN CIVIC SERVICES PUBLIC RECORDS — WHERE TO START",
      "This directory describes the public service routes for records questions. It does not certify that an individual document exists.",
      "GENERAL PUBLIC NOTICES ROUTING DESK Route code: GH-PN-ROUTE Purpose: Help a reader identify the likely custodian or issuing body for a public notice when the official record number is not known. This is an intake and referral service, not the source of every notice.",
      "MUNICIPAL COMMUNICATIONS COUNTER Purpose: Questions about press statements and municipal websites. This counter does not supply an independent publisher edit history.",
      "RECORDS CUSTODY / REQUESTS Purpose: Accept a request for records held under an identified custodian, subject to that custodian's rules. A request alone is not a record, and a custodian is not necessarily its creator.",
      "Before sending a routing question, include the public category and what identifying details are missing. Do not submit another person's private messages or assume a publisher's reference is a civic number.",
      "This directory can direct a question. It cannot verify a notice from an unauthenticated external label."
    ]
  },
  "GH-CIVIC-INDEX-HELP-001": {
    "route": "browser://greyhaven/civic-records/index/search-help",
    "paragraphs": [
      "GREYHAVEN CIVIC SERVICES — INDEX HELP SEARCHING PUBLIC NOTICES",
      "The public notices index accepts an issuing body, an official record number, or a sufficiently specific public descriptor when available.",
      "A publisher's private reference string is not automatically an issuing body's number. Searching it alone can return no results even when records exist in a separate collection.",
      "If you lack an official identifier, a locating inquiry can ask which public office handles that category. The answer may be procedural only. It is not a certificate that a requested record exists.",
      "A source should be checked against an official copy when one is located. A directory route, a public search error and a receipt for an inquiry are not substitutes for the underlying notice."
    ]
  },
  "GH-FORMER-OFFICE-GUIDE-001": {
    "route": "browser://greyhaven/civic-records/guidance/former-offices",
    "paragraphs": [
      "GREYHAVEN CIVIC SERVICES RECORDS GUIDANCE — FORMER OFFICES AND TRANSFERS",
      "When a public office changes its name or transfers older records, searching only the current office name may miss the correct catalogue heading. Some files can be held by a successor custodian without having been created by that custodian.",
      "A transfer listing, if located, should be read for the record series, transfer dates and named offices. A service directory alone does not prove that a particular notice was part of a transfer.",
      "There is no original notice, issuer name, series number or transfer entry identified for the publisher reference GB-REF-017 on this page. The general guidance is not evidence of a transfer for that reference.",
      "Public guide sections: IDENTIFY FORMER OFFICE / CHECK SERIES RANGE / REQUEST A CUSTODIAN ROUTE"
    ]
  }
} as const
