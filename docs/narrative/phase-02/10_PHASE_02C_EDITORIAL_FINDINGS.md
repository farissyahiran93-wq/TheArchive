# Phase 02C — editorial challenge and applied redlines

**Review basis, 16 October 2026:** actual six Act files, [source/choice/receipt contracts](00_INDEX.md), and two complete internal [paper routes](11_PHASE_02C_PAPER_PLAY_TRACES.md). This is an AI manuscript editorial pass. It is not a blind human read, gameplay UAT, owner policy amendment or independent issuance of any Greyhaven record. The pre-edit six Acts are preserved in [.phase02c_preedit_acts.zip](.phase02c_preedit_acts.zip). Severity describes the *pre-fix* manuscript risk: `BLOCKER` could violate a knowledge/access gate or leave a required route without a player action; `MAJOR` undermined choice consequence or coherent scene entry; `MINOR` was copy or tone.

## Objective defects found and fixed in the Act text

| ID / severity | Exact pre-fix text and scene | Why it failed in a paper route | Applied correction and verification |
| --- | --- | --- | --- |
| EC-01 **BLOCKER** | S15 began `If R01 conversation active, Maya...`, then unguarded “When he went missing, I put the crop in the brief.” | A no-tip or silent player could be shown Maya's private conversation without a received source message. | S15 direct Maya words now require actual `C02-SHARE.A/B` or `P-S14-DEFER` Send. Otherwise the player gets the public B01 editor card and goes to S18. QUIET and no-tip traces exercise this. |
| EC-02 **MAJOR** | S11 had `If S11 A or B was actually sent, Maya: “I was making tea...”` followed by unguarded bus-shelter/sister lines; S13 and S25 had the same pattern. | `P-S11-C`, `P-S13-C` and `P-S25-C` promised distance, yet optional anecdotes could still arrive. | Explicit continuation blocks now gate S11-D–F, S13-D–F and S25-D–H. QUIET receives none; SOCIAL deliberately opens the relevant blocks. |
| EC-03 **MAJOR** | S14 unconditionally began “Could you send me what you're reading?” after S13-C “I'd rather check the public source myself...” | Maya immediately repeated an ask after agreeing to wait. | S14 Maya request now appears only after sent S13-A/B. C/silence gets a player-initiated share sheet and may close it with no R02. |
| EC-04 **MAJOR** | S16 offer followed a sent tip and S25 check-in followed S24 even on a no-share route. | A cautious player received a Messages/Archive pitch and personal family story after setting a boundary. | S16 requires the player's “Review optional connections” tap after direct S15. S25 requires earlier direct source conversation plus a tap to open her check-in; S26 requires “Discuss the revision notice.” QUIET skips these scenes yet reaches S27–S30. |
| EC-05 **MAJOR** | S30 said a no-tip player remained held after K02 but gave no exact return/merge copy; S12 had no saved-finding return. | The player could possess a valid private audit and still have no clear way to complete the human first-contact beat without repeating GCRO. | S29/S30 now offer an unsent E001/E002-only tip draft. After explicit R01 and S12 code match, S12 offers “Return to saved finding” → S30 without repeating R04/K02 or disclosing E012. No-tip-first trace records the path. |
| EC-06 **MAJOR** | S24 offered `P-S24-A` “What does 7-14 mean?” with only “active channel” specified. | A player without R03 could ask about a string they had never lawfully seen. | Both S24 note questions require R03 and actual note view; absent note, continue GCRO route. |
| EC-07 **MINOR** | S03 labeled paraphrased article paragraphs as the body while B01 called different wording its “full article.” | Two apparent published versions of the same Bulletin brief could confuse source comparison. | S03 now shows exact B01 opening excerpts and opens B01's single complete article verbatim; later 8 Oct correction remains at later story order. |
| EC-08 **MINOR** | S25 opened “Can we take ten seconds away from the table? Not a ten-minute break...” | The line sounded written to manage pacing rather than spoken by a worried editor. | Maya now asks “Can I say something that isn't about the table? You can tell me no.” The check-in remains optional. |
| EC-09 **MINOR** | S16 included a Maya line for “C02 deferred or silent,” although a fully silent player cannot reach this direct offer. | It suggested a quiet player might receive an unsolicited conversation despite the S16 entry guard. | S16 line now names only an actually sent `P-S14-DEFER`; full silence remains on the public S18 path. |

No change assigns a correction operator, changes the 2019 culprit, reveals Daniel's location, gives Ana's identity, invents a welfare attestation, grants private residents to a civilian, or turns a development digest into R04. No approved scene, decision, evidence or relationship ID was renumbered.

## Current rubric — internal editorial judgment, not a quality guarantee

| Dimension | /10 | Evidence and remaining limit |
| --- | ---: | --- |
| Human voice/emotional credibility | 8 | S11/S15/S25 give Maya a specific editorial error, correction and bounded worry; social-only continuation prevents forced intimacy. Human table read pending. |
| Player agency and choice reaction | 8 | C01/C02/C03 and conditional P choices have different immediate answers, information scopes and saved deltas. Some local phrasing choices intentionally converge. |
| Civilian motive and permission transition | 8 | B01 humanizes Daniel; public observation → explicit R01 → checked editor → optional permissions. No hacking or mystery install. |
| Suspense and S30 payoff | 8 | Player earns E012/K02 before checking a separate current role-class card. The operator remains unknown; dramatic impact is untested with fresh readers. |
| Meaningful pacing | 6 | Acts alternate chat and source work, but compact puzzles and QUIET's optional skips suggest an episode shorter than 185 minutes. No timed users. |
| Investigation fairness | 8 | Both routes solve I01–I07 with source limits, wrong answers, hints and recovery. I06's actual in-game issue still awaits Gate B. |
| Continuity/knowledge/receipts | 8 | S11 baseline once, R01/R02/R03/R04 separate, K02 behind issue and Save, S24 note gated, no-tip rejoin explicit. Script model only. |
| Accessibility and on-screen clarity | 8 | Exact text/list alternatives, nonprecision answers and reversible mistakes are authored; device/screen-reader execution untested. |
| **Equal-weight mean** | **7.8** | Rounded from 7.75. Subjective manuscript score, **not** owner/human acceptance or measured gameplay quality. |

**Editorial challenge result:** no remaining BLOCKER or MAJOR *manuscript contradiction* was found after the redlines and two route reads. The main open editorial risks are subjective: QUIET has less character texture by design, S19–S24 can still feel quiz-like to a fresh player, and the S30 process clue may land differently in a playable interface. These require a human table read or prototype observation, not more generic policy documentation.
