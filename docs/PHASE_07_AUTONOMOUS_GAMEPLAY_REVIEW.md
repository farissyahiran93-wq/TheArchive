# Phase 07 — Autonomous gameplay playtest and editorial review

19 October 2026. Episode 01: **The Missing Entry**. Review only; no game source, story, choice, password, media or save-schema changes were made.

**Actual UI completion: PASS. Editorial acceptance for a polished public release: FAIL. Release recommendation: BLOCKED pending improvements, author decisions and human/device evidence.** The central missing-record mystery is promising, the evidence boundaries are unusually careful, and two real UI routes reached S30. Much of the middle currently feels like a source-verification tutorial rather than a missing-person investigation. This is a judgment about the experience, not a claim that its evidence safeguards should be removed.

## Method, evidence and limitations

I launched the actual React/Vite app with `npm run dev -- --host 127.0.0.1 --port 4174` and operated its visible interface using the computer-use browser tool and semantic Playwright locators. I selected replies, pressed Send, opened records, entered passwords, used hints, compared documents, submitted the fictional GCRO request and pressed End episode. There was no direct store access, save injection, developer completion shortcut, IndexedDB inspection or engine invocation during either UI route.

The primary route used a fresh browser-origin save at `http://localhost:4174/`, player Rowan. The secondary route used the separate origin `http://127.0.0.1:4174/`, player Alex. Neither required clearing an existing save. This is a development-server playtest, not a production Android playtest. Source and test implementation were inspected only after primary S30 completion, to map scene IDs and diagnose observed findings. Startup scripts were inspected before launch.

**Important contamination:** previous phases in this conversation had already exposed the passwords and story. The password attempts used clues read in the UI before entry, but cannot truthfully be called blind. First-time discovery difficulty, emotional response and comprehension remain **NOT TESTED with human participants**. Fast AI reading and semantic clicks cannot establish a person's reading speed, touch comfort or enjoyment.

Four requested evaluator roles are reported as four distinct editorial lenses below. They are correlated judgments by one AI reviewer, not four independent people or an independent panel.

Evidence types used throughout:

- **UI:** actual interface actions and observations, recorded in [UI log](../qa/phase07/ui-play-log.jsonl), with screenshots under [qa/phase07](../qa/phase07).
- **AUTO:** newly executed tests, separate from UI play. Some automated scenarios seed fixtures; their success is not a claim they were played manually.
- **SOURCE:** post-play implementation inspection; useful for diagnosis, not a substitute for gameplay.
- **EDITORIAL:** reasoned interpretation of the observed experience; scores and predicted impact are AI assessments.
- **HUMAN:** unverified player-experience assumptions, explicitly NOT TESTED.

The [evidence summary](../qa/phase07/evidence-summary.json) contains exact timestamps, PNG dimensions and recording corrections. The original primary logger captured its initial `phase: lock` binding throughout; phase durations below are reconstructed from timestamped observation labels, not that field. One alternate-lock observation accidentally captured the primary tab and is excluded. Screenshot 48 was replaced with the correct fresh lock. Files 57-home-430 and 58-protected-status-430 are actually **390px**; verified 430px captures begin with 59-home-430-actual. These naming/logging errors do not alter game state or evidence contents.

## Actual acceptance and checks

| Verification item | Status | Evidence / practical limit |
| --- | --- | --- |
| Standard route, opening through S30 | PASS | UI: completed with all four locks, text-only public-row share, separate connections, optional S25/S26, checked GCRO release and selected final disclosures; screenshot 47 |
| Alternate public research → late anonymous tip → S30 | PASS | UI: all four locks remained locked; no early tip, private finding retained, deliberate late tip and editor check, completion without extra final disclosures; screenshots 52–56 |
| Cooperative and skeptical Sophie responses | PASS | UI: cooperative first response, skeptical note question, bounded help and cautious recovery response; exact reactions recorded |
| Recovery postponement | PASS | UI: Not yet returned to retained Sophie conversation; Review recovery offer resumed explicitly; screenshot 49 |
| Pending-message save/resume | PASS | UI: reload immediately after setup while Sophie was typing; lock → conversation restored with one visible copy of each opening line |
| Completion save/resume | PASS | UI: secondary completed save reloaded through lock and home; Bulletin reopened completion, screenshot 56 |
| Four optional passwords and independent locked route | PASS | UI: all four opened on primary; secondary completed without unlocking any |
| Private/recipient boundaries on played routes | PASS | UI: private connection did not finish the story; explicit Send required; no mirror facts appeared as Maya knowledge; alternate Case Board showed only R01 disclosure |
| All 56 choice IDs through UI | NOT TESTED | Representative routes only; current unit suite supplies additional branch coverage |
| Fresh typecheck / lint / production build | PASS | `npm run typecheck`, `npm run lint`, `npm run build`; logs in qa/phase07; existing 500 kB advisory remains |
| Fresh unit/component suite | PASS | 161/161; 0 failed/pending; [unit JSON](../qa/phase07/unit-results.json) |
| Restricted browser-suite attempt | BLOCKED | Node worker `spawn EPERM` before scenario execution; [output](../qa/phase07/browser-output.log) |
| Approved browser-suite retry | PASS | 43/43, no skips/failures/flaky results; unchanged tests and security settings; see verification addendum |
| Automatic execution approval | PASS | Approved retry launched unchanged tests; this is permission to execute, not code/editorial approval |
| Independent external code/design/canon sign-off | NOT TESTED | No independent reviewer result; no service response is being treated as approval or rejection |
| Emulator pass | BLOCKED | Installed emulator executable returned no configured AVDs, exit 0; [discovery](../qa/phase07/emulator-avds.log). No emulator was created or represented as played |
| Physical Android UAT / native keyboard / OS interruption | NOT TESTED | No actual Android device evidence |
| Signed release / store acceptance | NOT TESTED | Existing debug APK is not production release evidence |
| Final author chronology/source reconciliation | BLOCKED | Decisions below remain unresolved |

No fixes were implemented during this review. Six files recorded in the prior verified-source hash manifest still match exactly: [comparison](../qa/phase07/previous-verified-hash-check.json). This is a limited hash comparison, not a claim to have a prior hash for every project file. The current source still contains 30 canonical scene IDs and the existing authored choice inventory; nothing was renumbered or removed by this task. Legacy compatibility is covered by current automated fixtures; a real user's old Android installation was **NOT TESTED**.

## Routes and scene coverage

**Primary:** number skepticism → note → originals question → last-seen question → unrequested recovery → inspect/restore → all mirror apps → four unlocks → retain/link ordinary note and index → share counts with Sophie → ask whether Maya knows → full Bulletin → public comparison → handle CanalReader → editor verification → source location → text-only row → both connections → source/date research → note and personal check-in → cautious claim → narrow GCRO request → validate/cite/save → selected public finding and status → S30.

**Secondary:** “I can talk for a minute” → pending reload → skeptical note question → bounded cooperation → “Don't open it yet” → postpone/resume → ordinary note/index only → withhold findings → choose timing → public comparison → no tip → public research → unavailable optional note → GCRO → private checked finding → finale hold → late anonymous public-observation tip → editor check → return to saved finding → End episode without extra disclosure → reload completion.

Scene mapping was checked **after** play against the canonical inventory and UI source. S01 is setup/identity, not a second unseen cinematic. Sophie’s OPEN-B labels describe the added prologue and do not replace or inflate E01-S01–S30. Primary encountered all 30 functional scene equivalents, including optional S25/S26. This is scene coverage, not every dialogue permutation.

| Scene / authored title | Primary UI | Secondary UI | Gameplay review |
| --- | --- | --- | --- |
| S01 A name on the screen | PASS | PASS | Name setup works; reason Daniel chose player remains an effective unanswered hook |
| S02 A quiet morning | PASS | PASS | Attractive cover, but another entry layer after already opening the brief |
| S03 Daniel's empty chair | PASS | PASS | Primary read full article; old-label habit humanizes Daniel. Secondary took Older preview directly, so full article reading was intentionally skipped |
| S04 The older preview | PASS | PASS | Legible redacted record; Pin June button supplies the observation before the player makes it |
| S05 The current copy | PASS | PASS | Blank field readable and comparable; source distinctions clear |
| S06 One line apart | PASS | PASS | Fair, accessible comparison, but answer extremely explicit |
| S07 A sentence you can defend | PASS | PASS | Useful distinction between observation and accusation; explicit private save |
| S08 The shape of a tip | PASS | PASS | Handle and no-tip choices work; forced future contact not yet apparent here |
| S09 Press Send | PASS | PASS, late | Recipient review gives real control; late draft has stale knowledge wording |
| S10 The return route | PASS | PASS, late | Receipt and reply arrive; screen's disabled wait affords little sense of ongoing world |
| S11 Someone answers | PASS | PASS, late | Maya responds to skepticism; primary anecdote adds warmth, then arrives as a large burst |
| S12 A name is not a channel | PASS | PASS, late | Verification works; identical caveat repeated by status, card and Maya |
| S13 The exact row | PASS | NOT TESTED | Primary source-location answer fits; secondary skips social source discussion through normal public route |
| S14 What to share | PASS | NOT TESTED | Text-only share gives scoped response; secondary does not enter sharing route |
| S15 The thing Maya chose to post | PASS | NOT TESTED | Receipt and transfer context are useful; personal material needs room between instructions |
| S16 Two invitations | PASS | NOT TESTED | Independent choices good; awkward folder metaphor and two Archive contexts confuse ownership |
| S17 The permission sheet | PASS | NOT TESTED | Accepted each connection deliberately; no forced combined acceptance |
| S18 What a workspace holds | PASS | PASS, public variant | Public path works without access to Memory Project folder |
| S19 The date printed on an image | PASS | PASS | Date roles are printed above their own dropdown questions; feels like copying labels |
| S20 A notice about change | PASS | PASS | Approval/publication distinction good; Daniel publisher distractor primes an unsupported actor theory |
| S21 Put the cards in order | PASS | PASS | Ordering works; immediately repeats date classification rather than deepening deduction |
| S22 The boring explanation | PASS | PASS | “Uncertain” respected and offers an actionable next check |
| S23 Search without a secret door | PASS | PASS | False 2024 timetable inspected on primary; source-map exercise overly guided but understandable |
| S24 A note with a closed door | PASS | PASS, unavailable variant | Primary chose frightened question: “He sounded careful… I wish I'd asked him.” Strong restraint. Secondary correctly lacks private fragment |
| S25 A question that isn't about the file | PASS | NOT TESTED | Optional primary coffee memory/resentment exchange is among the best scenes; entering it reverses displayed time |
| S26 What to say aloud | PASS | NOT TESTED | Primary cautious frame received fitting reply and typing indicator; public alternate skips it |
| S27 Ask the office that holds the past | PASS | PASS | Scope/review/submit understandable; technical receipts dominate fiction |
| S28 Four pages, one claim | PASS | PASS | All four pages opened, directory/status/checks completed; reading looks like checklist certification |
| S29 After verification | PASS | PASS | Three citations and explicit save preserve boundaries; K02/player implementation language breaks immersion |
| S30 The part that is still open | PASS | PASS | Honest bounded answer and explicit ending. No-tip hold works; hook about queue capability feels less personal than opening |

NOT TESTED in secondary rows means that scene's social content was deliberately not entered, not that the route failed. No-tip research does not itself permit episode completion; the UI states that a tip and channel check are still required. That is intentional progression, with a signposting concern rather than an observed softlock.

## Measured pacing

Primary observations run **05:46:07.531–06:00:02.163 UTC: 13m 54.632s wall time**. These are browser-review timings, not a game's human playtime estimate. A roughly 151-second resumption/tool-context gap occurred during Bulletin detours. No reading timer, attention tracker or human active-play clock was used. **Active reading/interaction duration: NOT TESTED.** Logged API-call time below is only the sum of timed successful click/fill calls, not total interaction or reading time.

| Timestamp-bounded segment | Wall seconds | Logged API seconds |
| --- | ---: | ---: |
| Opening Sophie conversation | 60.227 | 5.022 |
| Recovery and installation | 10.466 | 0.578 |
| Initial mirror investigation | 43.736 | 9.173 |
| Optional locks, interleaved Gallery | 45.433 | 11.924 |
| Further mirror apps and Index | 81.785 | 19.165 |
| Sophie follow-up / bridge | 43.612 | 3.692 |
| Bulletin, public-app detours and optional scenes | 497.642 | 25.530 |
| GCRO verification and citations | 33.859 | 4.776 |
| Ending | 17.872 | 1.948 |

Secondary measured from setup observation 06:00:29.815 to End episode observation 06:04:35.816: **4m 06.001s**, including targeted replay rather than exhaustive rereading. The starting lock preceded that bound. Its speed is not evidence that the episode is only four minutes long.

The primary Restore action leads straight into a usable mirror; it has little experiential sense of assembling an incomplete recovery. Give the existing transition a brief, skippable staged presentation and a moment to absorb the unknown origin, without fake real-device permissions or invented recovered data. Sophie’s “Then who did?” is easily displaced by the recovery screen; let the final response remain readable before the player opens the notification.

Maya's longer replies arrive in rapid groups. Post-play source inspection shows later reply scheduling uses a fixed 320ms start and 260ms per line; this explains the UI impression but is not a measured reading time. Use length-sensitive pacing with a skip/reduced-motion option; do not simply add long mandatory waits. Put the strongest personal moments, especially S24/S25, between research decisions rather than after several pages of instructions. Reduce repeated caveats, entry screens and duplicate date exercises before adding content or artificial puzzle time.

## Four evaluator lenses

**First-time mystery-player lens — editorial FAIL for sustained immersion.** The unfamiliar number and handwritten instruction make immediate sense as a hook; the player is involved because Daniel selected their number, with the reason held back appropriately. Sophie's uncertainty is believable, but the duplicate apology, reoffered answered question and unanswered questions after count disclosure make her feel scripted. The unknown recovery source creates tension, then the word “fictional” and immediate restored app deflate it. The Bulletin follows a plausible public lead from Sophie, yet the personal phone mystery recedes into a long record-provenance lesson. First-time human confusion or boredom remains a hypothesis requiring playtest, not an observed emotion.

**Narrative-director lens — editorial FAIL for pacing/voice consistency.** Daniel becomes a person through tea, biscuits, the tap, library renewal and his insistence on keeping old labels. Maya's “I wish I'd asked him,” bad coffee and resentment toward the missing Daniel are stronger than generic suspense. Preserve them. Too many characters/documents use the same protective evidence-language register. The opening number/sender/14–13 questions remain unresolved, correctly, but S30's public queue-capability hook supplies less immediate emotional pressure than the opening. Strengthen presentation of the existing unanswered question and selected character response; a new threat, culprit or fake current login would invent canon.

**UX/UI lens — functional sample PASS; phone realism editorial FAIL.** Lock screen, blue/grey message bubbles, portraits, image viewer and main home are coherent. Mirror apps often share one list/detail template and explanatory cards. Daniel's Maps is text-only while the player's public Maps has a visual map; Browser is a history description rather than a recovered page; Files feels like document summaries. The mirror resembles an evidence reader housed in a phone more than a person's recovered iPhone. Distinct offline app presentation can improve this without recovering everything or adding mandatory clues.

**QA lens — played progression PASS; release BLOCKED.** Two routes finish, wrong password is recoverable, source verification and explicit disclosure boundaries hold on those routes, and reload works in the sampled states. Story-clock regression, stale late-tip text and contradictory lock badges are observed defects. No P0 softlock, impossible password or lost save was observed. That is not exhaustive absence proof. Human engagement, native Android lifecycle and independent author sign-off remain outstanding.

## Dialogue review and proposed copy

These are **unimplemented proposals for author review**. Preserve existing option/event IDs and receipt semantics. A rewrite must not silently change a character's knowledge.

| Exchange actually encountered | Problem | Proposed replacement / treatment |
| --- | --- | --- |
| Sophie opens “Hi. I'm sorry for messaging out of nowhere.” then “Sorry. I know you don't know me. Is this a bad time?” | Two apologies before identity feel mechanically expanded | Keep first as “Hi. I'm sorry for messaging out of nowhere.” Make second “Is this a bad time?” Keep subsequent identity/urgency |
| After “What are the originals?” and its answer, the quiet choices offer exactly the same question | Selection appears not remembered; repeated answer would add no information | Prefer suppressing the already answered topic while retaining stable IDs. If preserving visibility, label “You said he wouldn't explain the originals?” and answer “He wouldn't. That's all I know.” No new originals defined |
| Sophie after count disclosure: “What records? Was he working on this before he disappeared? I know you cannot tell me why yet.” followed by Maya introduction | Asks questions player cannot answer, then assumes player cannot explain why | “I don't know what those records are. Maya might. She's Daniel's fiancée. I don't know how much he told her.” Retain player-controlled next question and do not imply Maya received findings |
| Sophie asks if player requested recovery, answers “Then who did?”, then package screen takes over | Strong reaction gets displaced before it can land | Keep “Then who did?” visible; surface a notification the player opens. No sender explanation added |
| Maya repeats editor-channel versus file authentication in status, confirmation card and “The listing is mine. The file still needs its own check.” | Same point three times; voice becomes instructional | Keep one UI confirmation “Editor channel checked.” Maya: “That's my inbox. The crop still needs checking.” Retain technical detail in expandable source metadata |
| S11 tea story includes “That's not your problem; I'm just explaining the dramatic pause” and several quick anecdote bubbles | Self-explains timing while interface barely pauses; warmth crowded by exposition | “I was making tea when your tip came in. It's gone cold.” Let the existing mistaken-photo story follow only after a response, with its factual content unchanged |
| S16 “come into the folder… a room with people in it. It isn't. You'd be reading cards…” | Explains an awkward metaphor instead of making a natural invitation | “I can show you the case folder. Source cards and Daniel's crop—read-only. Messages is a separate choice.” Keep owner clarification available |
| S16 optional “safe workspace” explanation follows ownership response | Repeats a warning just explained in invitation and permission UI | “Each card says where our copy came from and what we're allowed to show.” Keep detailed scope on the permission sheet, not another defensive monologue |
| Late tip after saved K02: “I can't tell which full version was verified.” | Player has just authenticated lineage; drafted self-description is stale | State-dependent draft: “I compared your older public preview with the current civic copy. June Ellis appears in the preview; the current escort field is blank.” This is the same selected public observation; do not add the private export or verification finding to R01 automatically |
| S20 distractor “The instant Daniel published v2.” | Introduces an unsupported named actor even as an incorrect answer | “The instant v2 was published.” Preserve wrong-answer feedback and distinction between approval and publication |

Sophie’s cooperative “Thanks. I'll try not to take long,” skeptical “I can only say I watched him write it,” and withholding “I understand…” fit the selections. Maya's correction after momentarily overreading the role card is coherent and human; retain it while tightening surrounding repeated explanation. Her familial relationship with Daniel is underexpressed during many office scenes, but reserved professional behavior is plausible; this is an author tone decision, not proof of a canon violation.

Daniel's ordinary records show a consistent careful, domestic voice. Lucas's recovered exchange is too short to establish a rich separate voice; no knowledge violation was observed in it. **Eli and Nora dialogue: NOT TESTED / not introduced in the played content.** Do not add contacts merely to satisfy a review checklist. Portraits did not identify the unknown caller.

## Recovered iPhone review

All listed apps were actually opened; record bodies were read through the interface. This evaluates the available partial recovery, not a demand for a complete phone.

| App | UI access | Observation and recommendation |
| --- | --- | --- |
| Messages | PASS | Sophie biscuits, Maya records context, Lucas office contact and empty unknown thread. Ordinary exchange helps; use richer per-thread rhythm and native conversation layout with existing text. Unknown header without body is an honest incomplete record, not a broken button |
| Mail | PASS | Unsent revision audit, Memory Project Bus 4 message, library enquiry/reply. Best ordinary texture outside notes; clearer sender/date/subject hierarchy would distinguish it from Files |
| Notes | PASS | Two public notes plus two individual locks. Domestic list valuable. Duplicate revision instruction and unlocked AVAILABLE/LOCKED labels weaken reward/state clarity |
| Gallery / Photos | PASS | Shelf, message crop, two index fragments and two quay references. Full viewer, next/previous and 150% zoom used. Later revisit confirmed loaded quay/map/message images where initial rapid snapshots sometimes showed loading. Duplicate tile/list/detail layers and repeated provenance crowd discovery |
| Maps | PASS | Saved North Quay, Annex search and unavailable route are text cards. Correctly proves no journey. Show available saved pin using an offline visual map; do not fabricate historical GPS or route |
| Calls | PASS | Sophie outgoing, blocked missed, library incoming. No audio available; do not infer an audio player is broken. Distinguish call log from document reader visually |
| Contacts | PASS | Sophie/Maya profiles and identity portraits. Sparse by design; do not demand new contacts. Move artwork-production disclosure out of in-fiction contact body while preserving provenance in credits/metadata |
| Files | PASS | North Quay folder reference, index.audit, shopping text, unavailable encrypted container. Shopping list good; folders should feel navigable within the same recovered scope, rather than imply missing UI functionality |
| Browser | PASS | Civic Portal history and revision-help bookmark. Address chrome exists, but mostly a description of what Daniel opened. A saved offline page view, where existing content permits, would feel more investigative |
| Archive Index | PASS | Clear 14 signed /13 visible /0 deletion entries. Preserves uncertainty and separate Bus 4 observation. UI explicitly tells player the note/index comparison, reducing discovery |
| Protected (extra area) | FAIL | Non-openable by design is correct, but detail says RECOVERED / UNLOCKED above LOCKED/key unavailable. Screenshot 58, actually390px. Correct state badge; do not unlock container |

Recovered versus verified distinction is clear, sometimes excessively repeated. Inspecting a record, saving it, linking it and telling a recipient remain separate. The solution is concise contextual presentation, not removing those distinctions. Ordinary material already exists; improve its presentation before adding author-dependent new facts. Do not make every app yield a major clue.

## Optional puzzle fairness

**Functional UI results PASS; blind difficulty and number of hints a real newcomer needs NOT TESTED.** Prior answer exposure prevents an unbiased solvability claim. The logged counts below describe this attempt only.

| Item | Actual attempt / clue read in UI | Hints used on primary | Reward / editorial assessment |
| --- | --- | ---: | --- |
| Revision Note | `7-14` wrong; then `ECHO-7/14` accepted. Handwritten photo had complete RECOVERY token | 1 | Clear no-progress-lost feedback. First hint points to Sophie's physical item. Reward restates14/13 and revisions already central to public route; weak payoff |
| Public Comparison Note | `Bus 4` accepted after Memory Project email | 0 | Vehicle label discoverable, space normalization forgiving. Reward tells player to compare public escort fields and ask custody; largely another instruction |
| Index Album | `7–14` accepted after ordinary Untitled note | 0 | Range clue clear and en dash accepted. Images offer visual reward, but incomplete timestamp/count repeats mystery rather than supplying a strong new observation |
| Quay Album | `North Quay` accepted after saved Maps pin | 0 | Place clue fair, spaces accepted, saved pin never becomes visit proof. Images add atmosphere; could be more satisfying through existing visual detail emphasis |

On the locked secondary route I read **all three Revision Note hint tiers** through the UI without unlocking: physical item → reopen photo → enter full RECOVERY token. The escalation is useful and the final hint is deliberately direct. Other three puzzles' full hint ladders were inspected only in source after play: public record → email/vehicle → compact label; range → ordinary note → hyphen endpoints; saved place → Maps pins → compact place name. Their hints are logically grounded, though the final “without spaces” instructions overstate the actual accepted format. Do not punish accepted human formatting.

Wrong feedback does not disclose the answer, erase progress or suggest a real account/password. Optional status is real: the second route finished with all four locked. Reward improvements should remain optional and use approved nonmandatory texture, not gate S30 or reveal an unknown sender, fate or culprit. No arbitrary extra passwords or invented answer lore recommended.

## Visual and interaction audit

Screens were captured at requested widths; this is a sampled responsive review, not every screen at every width. Full matrix of actual PNG dimensions is in evidence-summary.json. All viewports used844px height. Existing automated tests also cover320x568 and other sizes separately.

| Surface | Width / evidence | Status and limit |
| --- | --- | --- |
| Lock / notification | 320 screenshot48;390 screenshot01 | PASS: readable image/notification, no observed overlap hiding the action |
| iMessage / portrait / retained transcript | 320/375/390/430 screenshots65-* | PASS sampled: bubbles wrap; document width equals viewport in all four DOM checks. Secondary identity subtitle truncates at320, minor information loss |
| Choice composer / typing | Primary390, secondary320; screenshots02/49 and log | PASS for selecting/sending and visible typing. No physical keyboard/touch evidence |
| Recovery / installation | Primary390 screenshots06/07; secondary320 recovery logs | PASS controls; editorial FAIL for instantaneous transition/metatext. Not captured at every width |
| Home / mirror | Primary390 screenshot08/27; alternate430 screenshots59/60 | PASS sampled navigation; mirror's very small secondary labels and many headers weaken hierarchy |
| Password / hints |375 screenshots50/51 | PASS typed/hints; nested scrollbars visible. Native IME occlusion NOT TESTED |
| Locked albums / full viewer / zoom |430 screenshot61;390 screenshots16–19,62–64, 150% screenshot17 | PASS sampled loading/navigation/zoom. Initial loading-only captures are not image-rendering failures |
| Case Board |320/375/390/430 screenshots66-*; primary44 | PASS wrapping and scrolling. Large introductory copy pushes useful sources downward; technical spoiler text remains FAIL |

Typography is strong on the main Bulletin and lock screen; smaller mirror metadata is less comfortable and low-emphasis grey compounds density. Blue Send/Unlock actions and dark/light surface hierarchy are recognizable. Buttons look substantial in screenshots, and source CSS sets many mirror targets to44px minimum, but actual finger accuracy and a formal contrast/accessibility audit are **NOT TESTED**. Multiple simultaneous scrollbars are visible in mirror/password views; consolidate the active scroll area and reduce chrome. Do not assert a hidden button or broken scroll when semantic navigation succeeded.

Animations/notification timing were observed functionally, not frame-profiled. OS calls, haptics, sound, keyboard resizing, safe areas under Android WebView and device back behavior remain **NOT TESTED**. No live incoming story-call scene was encountered; absence of one is not an audio failure.

## Scores — AI editorial assessment

Not human playtest results, statistical measurements or independent reviewer approval. Benchmark references inform the desired messaging intimacy and phone exploration depth; this report does not claim to have tested or researched the benchmark games here.

| Dimension | /10 | Reason |
| --- | ---: | --- |
| Story originality | 7.0 | Version lineage and a missing index form a distinctive civil-record mystery |
| Opening hook | 7.0 | Selected stranger, missing brother and handwritten token intrigue; recovery arrives too neatly |
| Character realism | 6.0 | Domestic detail and Maya's regret work; shared instructional register flattens voices |
| Dialogue quality | 6.0 | Responsive boundaries and some excellent small lines; repetition/overexplanation interrupt flow |
| Emotional engagement | 6.0 | S24/S25 connect; long procedural sections distance Daniel and Sophie |
| Pacing | 5.0 | Immediate recovery, fast message bursts, layered brief entry and repeated lessons |
| Player agency | 8.0 | Separate permissions, private research, optional locks, deliberate disclosures; finale contact requirement needs earlier clarity |
| Investigation gameplay | 6.0 | Sound comparison/citation loop, but several tasks display their own answer |
| Puzzle design | 5.5 | Grounded optional clues and helpful normalization; mainly copied labels, modest rewards |
| iPhone interface realism | 5.5 | Strong shell/messaging; recovered apps often generic document panels |
| Mystery and suspense | 7.0 | Unanswered sender/player connection and two separate discrepancies remain intriguing |
| Episode ending | 6.5 | Bounded real answer, no false culprit; enabled queue is a relatively abstract cliffhanger |

**Overall arithmetic mean:75.5 /12 =6.29, rounded6.3/10.** This is a promising controlled-playtest build, not a polished release acceptance score.

## Top10 improvements and complete prioritized backlog

Order below is expected player impact, not permission to implement. PASS/FAIL describes the reviewed criterion; a recommendation is untested until implemented and re-played. All issue evidence is UI unless explicitly marked SOURCE/EDITORIAL.

| Rank / ID / severity / status | Scene or location; actual problem | Expected experience / why it matters | Recommended improvement and predicted impact | Evidence; post-play source reference |
| --- | --- | --- | --- | --- |
| 1 —07-01 P1 FAIL | Recovered board reveals “canonical Case Board: K02…GCRO…R04” before public investigation; later UI says “The player must save it before K02 exists” | Player should discover sources through fiction; implementation instructions reveal the solution structure and break viewpoint | Replace visible engine terms with brief diegetic states; keep full guards and optional provenance metadata. Highest immersion gain |25,44; MirrorEvidenceBoard.tsx:40, CaseBoardApp.tsx, Phase03bRelease.tsx:97 |
| 2 —07-02 P1 FAIL | Sophie duplicate apology, answered-originals option, count-disclosure questions with no answer affordance | A remembered, responsive conversation should carry urgency rather than expose a fixed queue | Apply proposed dialogue/treatment above using unchanged IDs/receipts. Better trust and opening continuity |03/05/26, log; content/opening.ts:3,16,25,47; game/opening.ts:32 |
| 3 —07-03 P1 FAIL | Repeated source caveats in S11–S17, board and GCRO dominate voice and pace | One clear caution should support investigation; people should sound like people | Consolidate caveats into contextual badges/details; pace existing personal exchanges and concise revised lines. Restores emotional rhythm |33–37,46; content/e01Slice.ts, e01Phase03b.ts, ui/Phase03bScenes.tsx, Phase03bRelease.tsx |
| 4 —07-04 P1 FAIL | Mirror Maps/Browser/Files largely list-description cards with shared chrome | Recovered apps should feel distinct and invite observation without pretending complete recovery | Use existing record content in app-specific offline views, especially pin map/mail headers/file hierarchy. Better phone-investigation depth |09–11,20–23; DanielMirror.tsx, MirrorRecordView.tsx, mirror.css |
| 5 —07-05 P1 FAIL | Untitled→Index instruction, Pin June answer, S19 printed date-role answers, S21 repeated sorting | Player should notice and test a relationship rather than copy labels | Neutralize clue-revealing action labels and reserve hints for requests; retain accessible transcription and source boundaries. More satisfying deductions |08/29/39; DanielMirror.tsx, BulletinSlice.tsx, Phase03bResearch.tsx:20 |
| 6 —07-06 P1 FAIL | Game clock15:06→13:00 on optional check-in;17:45→09:21 on late tip | Time should move forward or clearly signal a retrospective screen | Separate current story clock from scene-authored anchor, or clearly label retrospective views; preserve stable events/old messages. Fixes observable continuity |45,53–54 plus timestamped DOM; App.tsx:76, content/e01Slice.ts:2, game/phase03b.ts:314 |
| 7 —07-07 P1 FAIL | Late-tip draft says full version unverified after player saved corroborated finding | Draft should reflect existing player knowledge without auto-sharing it | Use neutral public observation draft proposed above; retain R01 fact scope, explicit Send and private export. Avoids self-contradiction |54 and secondary log; content/e01Slice.ts:61, game/slice.ts:82, BulletinSlice.tsx |
| 8 —07-08 P1 FAIL | Maya offers “the Archive” workspace after anonymous recovery already installed “The Archive” | Player should distinguish data contexts and ownership without identifying sender | Label “Daniel snapshot” and “Memory Project case folder” consistently in navigation; ownership stays unknown for recovery. Maya must not mention a phone she was never told about |07/08/35–37; content/e01Phase03b.ts:113, UtilityApps.tsx, DanielMirror.tsx |
| 9 —07-09 P1 FAIL | S20 incorrect option names Daniel as publisher with no supporting source | Wrong choices should test inference without priming unauthorized actor facts | Use actor-neutral publication distractor. No canon answer or feedback rule change |40; Phase03bResearch.tsx:29 |
| 10 —07-10 P1 FAIL (editorial) | Final hook centers an enabled role class; opening personal questions fade during research | Finishing should make the same missing-person mystery feel newly urgent without false accusation | Reframe existing verified question visually around retained Daniel/Sophie thread and, only within current recipient scope, existing character reaction. Author approval for any new wording/fact. Stronger continuity into the unresolved future |47; ui/Phase03bRelease.tsx, content/e01Phase03b.ts:221 |
| 11 —07-11 P2 FAIL | Unlocked note/albums show AVAILABLE/LOCKED; Protected says RECOVERED/UNLOCKED above LOCKED | Status labels should describe current availability consistently | Render state badge independently of immutable recovered stamp/title. Preserve legacy keys and container lock |13/58(actual390); DanielMirror.tsx:37,96 |
| 12 —07-12 P2 FAIL (editorial) | Optional unlock rewards mostly repeat counts, instructions and metadata limits | Optional effort should reward attention without mandatory proof | Emphasize existing visual detail; propose approved domestic/relationship texture only if author wants more. Keep four answers/flags optional and independent |13/14/17–19/62–64; content/opening.ts:131–143, galleryMedia.ts, MirrorMediaViewer.tsx |
| 13 —07-13 P2 FAIL (editorial) | Mirror reveal is immediate; final Sophie reaction displaced by recovery screen | Suspicious unknown package deserves a readable reaction and deliberate transition | Show existing reply before notification/open, add short skippable recovery presentation; move simulation explanation to appropriate outside-fiction help while staying truthful |06–08/49; OpeningPrologue.tsx:60, game/opening.ts |
| 14 —07-14 P2 FAIL | Connected Maya Messages is empty at that point; continuation lives in Bulletin and instruction is plain text | Changing apps should preserve context and expose an obvious return | Provide explicit context card/deep link to current Bulletin case; do not auto-copy private facts or forge past Messages delivery |38 and “empty connected thread” log; Messenger.tsx, Phase03bScenes.tsx |
| 15 —07-15 P2 FAIL | Nested mirror scrollbars, small app subtitles, duplicated Gallery tiles/list/detail | One active reading area and clearer hierarchy reduce navigation burden | Consolidate scrollers, simplify Gallery selection layer, enlarge useful secondary labels. Verify at320 and with native IME |51/61/66-*; mirror.css, ios-overhaul.css, PhoneShell.tsx |
| 16 —07-16 P2 FAIL (editorial) | Three brief-entry layers; no-tip choice only reveals contact-required finale much later | Player should understand scope of refusal and reach readable content efficiently | Streamline entry affordances while retaining scenes; explain no-tip as “research privately for now,” with final contact needed before finale. Preserve meaningful refusal, no auto-send |27–28/52–54; BulletinSlice.tsx, Phase03bRelease.tsx, game/phase03b.ts:425 |
| 17 —07-17 P1 BLOCKED | Sophie three-day testimony vs Oct4 contact/Oct5 report/Oct8 play | Chronology needs an approved interpretation, not reviewer invention | Author reconcile supplied chronology and missing Story Bible v2. Prevent later rewrites from resolving protected facts accidentally |03/28; content/opening.ts:9, e01Slice.ts:12; prior06G report |
| 18 —07-18 P3 FAIL (editorial) | Correct strong visual props are repeatedly called “supplied artwork/visual props” in player view | Player can understand missing provenance without production vocabulary | “Recovered image; original source unverified.” Keep exact availability and honest error fallback; retain artwork provenance in credits/details |16/62/64; MirrorRecordView.tsx, MirrorMediaViewer.tsx |

All source paths in this table are under `src/`; references are diagnostic locations, not edits. No confirmed P0 issue was observed. 07-09 is unsupported priming by a wrong-answer option, not a claim that Daniel actually published v2 or that a culprit was revealed.

**Excluded / unconfirmed:** Test channel was visible in the dev inbox (38), but SOURCE shows `import.meta.env.DEV` gating in Messenger.tsx:121; it is not listed as a production defect. A note modal unexpectedly reappeared once during the primary opening; no reliable reproduction was established, so no broken-modal claim or fix is proposed. Some early image captures contained loading states; later loaded views and automated media coverage distinguish those from missing assets.

## Human playtesting and author decisions

Use new participants without prior password/story knowledge. Ask for actions and explanations before providing hints; record consented timestamps and route choices separately from observed frustration. Questions to answer:

1. After five opening messages, can the player explain who Sophie is, why she contacted them and what remains unknown?
2. Does the recovery feel intriguing or implausibly convenient? Do they understand it is an in-game snapshot without reading production terminology?
3. Can they distinguish Daniel's snapshot from the Memory Project folder, and say who owns each without guessing the unknown sender?
4. Which app do they voluntarily explore? Do ordinary records feel lived-in or like padding? What do they expect a selected folder/map/history row to do?
5. Can they find each password clue unaided; how many hints, wrong attempts and minutes are needed? Is each reward worth the detour?
6. Can they explain why14/13 and the Bus4 difference are still separate observations, and why a saved photo is not verified evidence?
7. Does Maya feel like Daniel's fiancée as well as an editor? Which personal line is remembered after the procedural section?
8. Are disclosure choices understood before Send? Does no-tip ending contact feel fairly signposted?
9. After S30, what answer do they believe they proved, and what question makes them want to continue? Do they falsely think someone logged in today?
10. On physical Android: keyboard/scroll visibility, touch targets, app back/navigation, DND/audio/haptics where supported, interruptions, background/restart and old-save upgrade; retain screenshots and device/build details.

Author approval is required before adopting proposed dialogue or adding texture. Existing unresolved decisions remain: testimony chronology; unsupplied Story Bible v2; provisional8/10-episode planning and older Sophie-introduction conflict; final confirmation of the compatible six-PNG source choice. This review does not choose those answers. Original incompatible collage facts remain outside runtime.

Android handoff remains [Phase06G device worksheet](PHASE_06G_ANDROID_UAT_CHECKLIST.md). Existing debug APK: `D:/Web app/Detective games/android/app/build/outputs/apk/debug/app-debug.apk`. Phase07 did not rebuild or install it. Its prior successful build/package evidence is historical06G evidence, not new physical UAT.

## Final recommendation

Accept **PASS** for the two played routes and preserved progression/evidence architecture. Do not grant polished-release acceptance: **BLOCKED** pending author decisions, focused improvements and human/device validation. Start with07-01 through07-09, then replay their affected branches; preserve the stronger S24/S25 moments and deliberate disclosure controls. Assess07-10 with the author without inventing Episode02 or new answers.

Implementation is awaiting author authorization. This phase changes only review/evidence artifacts and generated verification outputs; all30 scenes,56 authored choices, four passwords, media, save architecture and S30 are preserved.

## Verification addendum

**PASS — freshly executed browser suite:43/43, 0 unexpected,0 skipped,0 flaky; process exit0, approximately4.0 minutes.** The first restricted attempt failed before running scenarios at Node worker spawning; the approved retry completed. No test was weakened, filtered or skipped, and no system security setting was changed. [Approved output](../qa/phase07/browser-approved-output.log), [browser JSON](../qa/phase07/browser-results.json).

Fresh typecheck, lint,161/161 unit/component tests and production build also passed. These checks validate the unchanged implementation's automated requirements, not the editorial defects' absence. The primary UI completed before post-play source audit and before these automated reruns. Earlier06G results are used only for historical Android/package context; current browser/unit acceptance above comes from this phase's retained outputs.
