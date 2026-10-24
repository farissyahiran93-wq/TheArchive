/** Editorial metadata only. Never dispatch this registry into the live dialogue runner.
 * Legacy candidates indicate reusable concepts, not equivalence or migration instructions.
 * Scene 01 retains its existing OPEN-S01 namespace; no runtime IDs are renamed.
 */
export interface Chapter1ScenePlan {
 number: number; id: string; title: string; act: 1 | 2 | 3 | 4 | 5;
 objective: string; characters: string; surface: string;
 requirement: 'required-beat-with-alternatives'; entry: string; exit: string;
 requiredKnowledge: string; possibleKnowledge: string; evidenceDependencies: readonly string[];
 relationshipDependencies: string; implementation: 'implemented' | 'structural-preview';
 approval: 'screenplay-approved' | 'screenplay-integrated' | 'structure-approved-dialogue-provisional'; legacyCandidates: readonly string[]; dependsOn: readonly string[];
}
export const chapter1ScenePlan: readonly Chapter1ScenePlan[] = [
  {
    "number": 1,
    "id": "OPEN-S01",
    "title": "A Message from Sophie",
    "act": 1,
    "objective": "- Establish the Player as an ordinary civilian.\n- Introduce Sophie naturally.\n- Make Daniel's disappearance emotionally relevant.\n- Establish uncertainty about why the Player was contacted.\n- Allow the Player to set personal boundaries.\n- Introduce the concept of a selected codename.\n- Build the first relationship with Sophie.",
    "characters": "Player, Sophie Mercer",
    "surface": "Messages",
    "requirement": "required-beat-with-alternatives",
    "entry": "Phone unlocked; established Sophie first-contact delivery",
    "exit": "Explicit invitation choice; no automatic group entry",
    "requiredKnowledge": "None; ordinary civilian first contact",
    "possibleKnowledge": "Sophie identity/disappearance/contact-number testimony as delivered",
    "evidenceDependencies": [],
    "relationshipDependencies": "No mandatory trust, affinity, romance or premium threshold; preserve authored 01–03 effects.",
    "implementation": "implemented",
    "approval": "screenplay-approved",
    "legacyCandidates": [],
    "dependsOn": []
  },
  {
    "number": 2,
    "id": "ch01_sc02_uninvited_guest",
    "title": "The Uninvited Guest",
    "act": 1,
    "objective": "- Establish group dynamics.\n- Introduce Maya's and Lucas's distinct personalities.\n- Create believable tension concerning privacy.\n- Allow the Player to defend themselves, remain cautious or show empathy.\n- Show Sophie struggling between desperation and responsibility.\n- Demonstrate that not everyone trusts the Player.\nOne deterministic unverified Unknown Sender intrusion uses a separate thread without replacing the confrontation.",
    "characters": "Player, Sophie, Maya, Lucas",
    "surface": "FIND DANIEL group chat",
    "requirement": "required-beat-with-alternatives",
    "entry": "Accepted invitation and explicit JOIN GROUP",
    "exit": "Final group messages then persisted 5.5-second private handoff",
    "requiredKnowledge": "Sophie invitation and chosen JOIN",
    "possibleKnowledge": "Personal reactions and dispute only; no verified suspect",
    "evidenceDependencies": [],
    "relationshipDependencies": "No mandatory trust, affinity, romance or premium threshold; preserve authored 01–03 effects.",
    "implementation": "implemented",
    "approval": "screenplay-approved",
    "legacyCandidates": [],
    "dependsOn": [
      "OPEN-S01"
    ]
  },
  {
    "number": 3,
    "id": "ch01_sc03_just_between_us",
    "title": "Just Between Us",
    "act": 1,
    "objective": "- Explore Sophie's anxiety regarding Daniel.\n- Introduce Daniel's relationship with Sophie.\n- Establish Maya as Daniel's fiancée.\n- Explain Lucas's longstanding friendship.\n- Introduce Eli as a female colleague of Daniel.\n- Establish Axiom Recovery where supported by the actual chosen dialogue.\n- Develop Sophie's trust, affinity and suspicion.\n- Allow the Player to remain emotionally distant without blocking progression.",
    "characters": "Player, Sophie",
    "surface": "Private Messages",
    "requirement": "required-beat-with-alternatives",
    "entry": "Completed group confrontation, Lucas departure, persisted handoff, manual Sophie opening",
    "exit": "Delivered Goodnight.; Sophie offline; later article lead awaits manual opening",
    "requiredKnowledge": "Delivered group conflict and completed private handoff",
    "possibleKnowledge": "Branch-specific family, relationship, employment context",
    "evidenceDependencies": [],
    "relationshipDependencies": "No mandatory trust, affinity, romance or premium threshold; preserve authored 01–03 effects.",
    "implementation": "implemented",
    "approval": "screenplay-approved",
    "legacyCandidates": [],
    "dependsOn": [
      "ch01_sc02_uninvited_guest"
    ]
  },
  {
    "number": 4,
    "id": "ch01_sc04_the_public_story",
    "title": "The Public Story",
    "act": 2,
    "objective": "Authored public article, human response, optional group boundary and recovered index",
    "characters": "Player, Sophie, optional Maya group; Nora through byline only",
    "surface": "Sophie Messages / simulated Browser / optional FIND DANIEL / Archive index",
    "requirement": "required-beat-with-alternatives",
    "entry": "Scene 03 Goodnight; delayed article lead; manual Sophie and article opening",
    "exit": "Article inspected; index opened/acknowledged; final Sophie chat; manual Version History",
    "requiredKnowledge": "Only facts actually heard from Sophie",
    "possibleKnowledge": "Displayed publication/byline/update labels and unverified index; attributed claims remain unproven",
    "evidenceDependencies": [
      "GB-ARTICLE-001 public copy; ARC-IDX-GB-041 unverified index"
    ],
    "relationshipDependencies": "No mandatory trust, affinity, romance or premium threshold; preserve authored 01–03 effects.",
    "implementation": "implemented",
    "approval": "screenplay-integrated",
    "legacyCandidates": [
      "E01-S03"
    ],
    "dependsOn": [
      "ch01_sc03_just_between_us"
    ]
  },
  {
    "number": 5,
    "id": "ch01_sc05_an_older_copy",
    "title": "An Older Copy",
    "act": 2,
    "objective": "Investigation Setup",
    "characters": "Player",
    "surface": "Browser / Documents / Case Board",
    "requirement": "required-beat-with-alternatives",
    "entry": "Public report historical reference inspected",
    "exit": "Both versions available for comparison",
    "requiredKnowledge": "Public report historical source reference",
    "possibleKnowledge": "Two comparable versions, provenance limitations",
    "evidenceDependencies": [
      "E001",
      "E002"
    ],
    "relationshipDependencies": "No mandatory trust, affinity, romance or premium threshold; preserve authored 01–03 effects.",
    "implementation": "structural-preview",
    "approval": "structure-approved-dialogue-provisional",
    "legacyCandidates": [
      "E01-S04",
      "E01-S05"
    ],
    "dependsOn": [
      "ch01_sc04_the_public_story"
    ]
  },
  {
    "number": 6,
    "id": "ch01_sc06_the_missing_line",
    "title": "The Missing Line",
    "act": 2,
    "objective": "First Major Puzzle",
    "characters": "Player",
    "surface": "Document Comparison / Case Board",
    "requirement": "required-beat-with-alternatives",
    "entry": "Both public document versions accessible",
    "exit": "Observed field discrepancy recorded; retry permitted",
    "requiredKnowledge": "Both exact version identities and source limitations",
    "possibleKnowledge": "Observed missing Escort field; no deliberate falsification finding",
    "evidenceDependencies": [
      "E001",
      "E002"
    ],
    "relationshipDependencies": "No mandatory trust, affinity, romance or premium threshold; preserve authored 01–03 effects.",
    "implementation": "structural-preview",
    "approval": "structure-approved-dialogue-provisional",
    "legacyCandidates": [
      "E01-S06",
      "E01-S07"
    ],
    "dependsOn": [
      "ch01_sc05_an_older_copy"
    ]
  },
  {
    "number": 7,
    "id": "ch01_sc07_the_woman_behind_the_byline",
    "title": "The Woman Behind the Byline",
    "act": 2,
    "objective": "- Establish Nora's professional role.\n- Introduce journalism and source verification.\n- Explain why a public document difference requires corroboration.\n- Allow the Player to share a limited observed discrepancy.\n- Preserve Nora's independence from FIND DANIEL.",
    "characters": "Player, Nora Vance",
    "surface": "Bulletin / Messages or verified return inbox",
    "requirement": "required-beat-with-alternatives",
    "entry": "Discrepancy saved; authenticated reporting contact route",
    "exit": "Verified reporting contact established or approved public-only alternative",
    "requiredKnowledge": "Observed Escort field mismatch, not misconduct",
    "possibleKnowledge": "Nora professional route and source caution only if contacted",
    "evidenceDependencies": [
      "observed comparison; authenticated Nora contact route"
    ],
    "relationshipDependencies": "No mandatory trust, affinity, romance or premium threshold; preserve authored 01–03 effects.",
    "implementation": "structural-preview",
    "approval": "structure-approved-dialogue-provisional",
    "legacyCandidates": [
      "E01-S08",
      "E01-S09",
      "E01-S10",
      "E01-S11",
      "E01-S12"
    ],
    "dependsOn": [
      "ch01_sc06_the_missing_line"
    ]
  },
  {
    "number": 8,
    "id": "ch01_sc08_the_page_she_kept",
    "title": "The Page She Kept",
    "act": 3,
    "objective": "Emotional Callback / Evidence Discovery",
    "characters": "Player, Nora Vance",
    "surface": "Messages / Photo Viewer",
    "requirement": "required-beat-with-alternatives",
    "entry": "Nora reporting contact established and page requested",
    "exit": "Retained page viewed and compared; original status not established",
    "requiredKnowledge": "Nora public reporting route and reply actually delivered",
    "possibleKnowledge": "Nora-attributed retained copy; no original authentication",
    "evidenceDependencies": [
      "CH1-NORA-PAGE"
    ],
    "relationshipDependencies": "No mandatory trust, affinity, romance or premium threshold; preserve authored 01–03 effects.",
    "implementation": "structural-preview",
    "approval": "structure-approved-dialogue-provisional",
    "legacyCandidates": [],
    "dependsOn": [
      "ch01_sc07_the_woman_behind_the_byline"
    ]
  },
  {
    "number": 9,
    "id": "ch01_sc09_unknown_source",
    "title": "Unknown Source",
    "act": 3,
    "objective": "- Create uncertainty about the recovered connection.\n- Give the Player a meaningful access decision.\n- Introduce realistic security and privacy concerns.\n- Avoid portraying suspicious access as inherently trustworthy.\n- Establish that the recovery request may not be authentic.",
    "characters": "Player; artifact source unidentified",
    "surface": "Notifications / Unknown Sender / Recovery Request",
    "requirement": "required-beat-with-alternatives",
    "entry": "Retained page comparison acknowledged",
    "exit": "Provenance gaps manually inspected and acknowledged",
    "requiredKnowledge": "Distinct public, recovered and retained source layers",
    "possibleKnowledge": "Unknown acquisition/custody fields; no sender identification",
    "evidenceDependencies": [
      "CH1-PROVENANCE"
    ],
    "relationshipDependencies": "No mandatory trust, affinity, romance or premium threshold; preserve authored 01–03 effects.",
    "implementation": "structural-preview",
    "approval": "structure-approved-dialogue-provisional",
    "legacyCandidates": [],
    "dependsOn": [
      "ch01_sc08_the_page_she_kept"
    ]
  },
  {
    "number": 10,
    "id": "ch01_sc10_a_life_in_fragments",
    "title": "A Life in Fragments",
    "act": 3,
    "objective": "Digital Exploration",
    "characters": "Player; Daniel through recovered records",
    "surface": "THE ARCHIVE / Read-Only Device Mirror",
    "requirement": "required-beat-with-alternatives",
    "entry": "Provenance limitations acknowledged; explicit limited snapshot consent",
    "exit": "Ordinary core fragment inspected; optional sources remain readable",
    "requiredKnowledge": "Explicit scoped recovery consent; source still unverified",
    "possibleKnowledge": "Inspected recovered context; reconstruction remains incomplete",
    "evidenceDependencies": [
      "CH1-LIFE"
    ],
    "relationshipDependencies": "No mandatory trust, affinity, romance or premium threshold; preserve authored 01–03 effects.",
    "implementation": "structural-preview",
    "approval": "structure-approved-dialogue-provisional",
    "legacyCandidates": [
      "E01-S01"
    ],
    "dependsOn": [
      "ch01_sc09_unknown_source"
    ]
  },
  {
    "number": 11,
    "id": "ch01_sc11_fourteen_thirteen",
    "title": "Fourteen / Thirteen",
    "act": 3,
    "objective": "Core Missing Entry Puzzle",
    "characters": "Player",
    "surface": "Archive Index / Notes / Evidence Viewer",
    "requirement": "required-beat-with-alternatives",
    "entry": "Relevant ordinary note and Index report both inspected",
    "exit": "UNVERIFIED INDEX DISCREPANCY recorded",
    "requiredKnowledge": "Definitions of signed and visible counts from inspected note/report",
    "possibleKnowledge": "14/13 mismatch with zero available log entries; no deletion proof",
    "evidenceDependencies": [
      "ordinary note",
      "Index: 14 signed / 13 visible / 0 available deletion entries"
    ],
    "relationshipDependencies": "No mandatory trust, affinity, romance or premium threshold; preserve authored 01–03 effects.",
    "implementation": "structural-preview",
    "approval": "structure-approved-dialogue-provisional",
    "legacyCandidates": [
      "E01-S01"
    ],
    "dependsOn": [
      "ch01_sc10_a_life_in_fragments"
    ]
  },
  {
    "number": 12,
    "id": "ch01_sc12_the_technicians_warning",
    "title": "The Technician's Warning",
    "act": 3,
    "objective": "- Establish Eli's connection to Daniel.\n- Explain incomplete metadata.\n- Distinguish recoverable data from verified records.\n- Establish technical limitations.\n- Allow questions about the missing index entry.",
    "characters": "Player, Eli Ward; Sophie where required for introduction",
    "surface": "Contacts / Private Messages",
    "requirement": "required-beat-with-alternatives",
    "entry": "Unverified 14/13 observation saved; authorized Sophie introduction",
    "exit": "Technical limitations understood; no trust threshold",
    "requiredKnowledge": "Recorded unverified index discrepancy; permitted Eli contact",
    "possibleKnowledge": "Technical limitations based on actual questions and receipts",
    "evidenceDependencies": [
      "explicitly disclosed technical question only"
    ],
    "relationshipDependencies": "No mandatory trust, affinity, romance or premium threshold; preserve authored 01–03 effects.",
    "implementation": "structural-preview",
    "approval": "structure-approved-dialogue-provisional",
    "legacyCandidates": [],
    "dependsOn": [
      "ch01_sc11_fourteen_thirteen"
    ]
  },
  {
    "number": 13,
    "id": "ch01_sc13_the_woman_he_loved",
    "title": "The Woman He Loved",
    "act": 4,
    "objective": "Explore:\n\n- Maya's relationship with Daniel.\n- The effects of Daniel's disappearance.\n- How Maya views the Player.\n- Why people close to Daniel disagree.\n- The distinction between emotional memory and factual evidence.",
    "characters": "Player, Maya Chen",
    "surface": "Private Messages",
    "requirement": "required-beat-with-alternatives",
    "entry": "Essential technical context completed; credible Maya contact",
    "exit": "Personal context received or respectful boundary preserved",
    "requiredKnowledge": "Technical uncertainty; Maya private contact authorized",
    "possibleKnowledge": "Personal testimony or respected refusal; no proof by emotion",
    "evidenceDependencies": [
      "Maya testimony; no automatic proof"
    ],
    "relationshipDependencies": "No mandatory trust, affinity, romance or premium threshold; preserve authored 01–03 effects.",
    "implementation": "structural-preview",
    "approval": "structure-approved-dialogue-provisional",
    "legacyCandidates": [
      "E01-S13",
      "E01-S14",
      "E01-S15"
    ],
    "dependsOn": [
      "ch01_sc12_the_technicians_warning"
    ]
  },
  {
    "number": 14,
    "id": "ch01_sc14_the_friend_who_walked_away",
    "title": "The Friend Who Walked Away",
    "act": 4,
    "objective": "- Explore Lucas's protective attitude.\n- Explain why he distrusts unfamiliar people.\n- Show his long-standing friendship with Daniel.\n- Allow the Player to respond respectfully or defensively.\n- Build tension without making Lucas an obvious suspect.",
    "characters": "Player, Lucas Grey",
    "surface": "Private Messages",
    "requirement": "required-beat-with-alternatives",
    "entry": "Maya personal-context beat or respectful boundary; credible Lucas route",
    "exit": "Cooperation stance retained; no automatic group return",
    "requiredKnowledge": "Lucas departure remembered; private contact authorized",
    "possibleKnowledge": "Lucas boundaries/cooperation; no automatic rejoin",
    "evidenceDependencies": [
      "Lucas testimony; no automatic proof"
    ],
    "relationshipDependencies": "No mandatory trust, affinity, romance or premium threshold; preserve authored 01–03 effects.",
    "implementation": "structural-preview",
    "approval": "structure-approved-dialogue-provisional",
    "legacyCandidates": [],
    "dependsOn": [
      "ch01_sc13_the_woman_he_loved"
    ]
  },
  {
    "number": 15,
    "id": "ch01_sc15_after_verification",
    "title": "After Verification",
    "act": 4,
    "objective": "Historical Timeline Investigation",
    "characters": "Player; optional limited source guidance",
    "surface": "Browser / Revision Viewer / Case Board",
    "requirement": "required-beat-with-alternatives",
    "entry": "Lucas perspective or boundary received; recovered statement available",
    "exit": "Post-verification phrase examined and statement classified as unverified",
    "requiredKnowledge": "Existing Bus 4 observations; no personal cooperation requirement",
    "possibleKnowledge": "Attributed recovered timing claim only; signature unavailable",
    "evidenceDependencies": [
      "CH1-CLAIM",
      "CH1-INDEX"
    ],
    "relationshipDependencies": "No mandatory trust, affinity, romance or premium threshold; preserve authored 01–03 effects.",
    "implementation": "structural-preview",
    "approval": "structure-approved-dialogue-provisional",
    "legacyCandidates": [
      "E01-S18",
      "E01-S19",
      "E01-S20",
      "E01-S21",
      "E01-S22",
      "E01-S23",
      "E01-S24"
    ],
    "dependsOn": [
      "ch01_sc14_the_friend_who_walked_away"
    ]
  },
  {
    "number": 16,
    "id": "ch01_sc16_a_request_for_the_original",
    "title": "A Request for the Original",
    "act": 5,
    "objective": "Authentication / Major Investigative Payoff",
    "characters": "Player; established Nora/Maya/Lucas contact selected by player",
    "surface": "Public Records Portal / Files / Case Board",
    "requirement": "required-beat-with-alternatives",
    "entry": "Recovered timing claim classified with limitations",
    "exit": "Scoped original-copy request sent, with no verified-original award",
    "requiredKnowledge": "Tentative historical chronology and missing source checks",
    "possibleKnowledge": "Limited independently corroborated historical version change",
    "evidenceDependencies": [
      "original request and response status; no authenticated original"
    ],
    "relationshipDependencies": "No mandatory trust, affinity, romance or premium threshold; preserve authored 01–03 effects.",
    "implementation": "structural-preview",
    "approval": "structure-approved-dialogue-provisional",
    "legacyCandidates": [
      "E01-S25",
      "E01-S26",
      "E01-S27",
      "E01-S28",
      "E01-S29"
    ],
    "dependsOn": [
      "ch01_sc15_after_verification"
    ]
  },
  {
    "number": 17,
    "id": "ch01_sc17_what_we_can_prove",
    "title": "What We Can Prove",
    "act": 5,
    "objective": "- Revisit the emotional fallout from Scene 02.\n- Give characters an opportunity to acknowledge earlier disagreements.\n- Allow the Player to share selected verified information.\n- Establish a productive investigative direction.\n- Show that different characters interpret the same evidence differently.",
    "characters": "Player",
    "surface": "Evidence classification board",
    "requirement": "required-beat-with-alternatives",
    "entry": "Original request sent or scoped route exhausted",
    "exit": "All source classes considered and limited summary manually saved",
    "requiredKnowledge": "Documented corroborated conclusion within its actual source scope",
    "possibleKnowledge": "Scoped reviewed findings; NPC knowledge only after actual receipt",
    "evidenceDependencies": [
      "CH1-DIFF-OBS",
      "CH1-COUNT-OBS",
      "CH1-CLAIM",
      "CH1-PROVENANCE"
    ],
    "relationshipDependencies": "No mandatory trust, affinity, romance or premium threshold; preserve authored 01–03 effects.",
    "implementation": "structural-preview",
    "approval": "structure-approved-dialogue-provisional",
    "legacyCandidates": [],
    "dependsOn": [
      "ch01_sc16_a_request_for_the_original"
    ]
  },
  {
    "number": 18,
    "id": "ch01_sc18_the_role_still_active",
    "title": "The Role Still Active",
    "act": 5,
    "objective": "The Player realizes that they have uncovered an important documentary inconsistency, but the larger question remains unresolved.",
    "characters": "Player; optional character callback according to actual contact history",
    "surface": "Records Viewer / Case Board",
    "requirement": "required-beat-with-alternatives",
    "entry": "Limited reasoned summary saved",
    "exit": "Role trace inspected, reaction selected and End Chapter explicitly chosen; Continue remains separate",
    "requiredKnowledge": "Reviewed historical findings; no unresolved clue treated as solved",
    "possibleKnowledge": "Active correction-role listing; no active-session/operator claim",
    "evidenceDependencies": [
      "CH1-ROLE"
    ],
    "relationshipDependencies": "No mandatory trust, affinity, romance or premium threshold; preserve authored 01–03 effects.",
    "implementation": "structural-preview",
    "approval": "structure-approved-dialogue-provisional",
    "legacyCandidates": [
      "E01-S30"
    ],
    "dependsOn": [
      "ch01_sc17_what_we_can_prove"
    ]
  }
]
