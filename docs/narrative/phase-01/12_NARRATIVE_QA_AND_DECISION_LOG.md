# 12 — Narrative QA, risks and owner decision log

**Private spoilers.** All v3 repairs are proposals. This document records the decision needed to promote them; writing a recommended option in [03](03_CANON_V3_PROPOSAL.md) is **not approval**. SB2 is unchanged. The target 10/10 remains aspirational.

## 100-point written-design rubric — provisional assessment

Only the documents in this Phase 01 packet were reviewed. No Episode 01 gameplay, 2.5–4-hour duration, dialogue performance, accessibility outcome, Android behavior or player emotion was measured. Scores therefore express **design confidence**, not play quality.

| Criterion | Max | Score | Reviewed evidence and deduction |
|---|---:|---:|---|
| Narrative causality | 20 | **17** | SB2 truth traced through timeline and H01–H19 audit; remaining audit/export and hold approvals block a perfect score. |
| Episode structure/pacing | 15 | **11** | Ten distinct arcs, 20/30 scene beats, active-play budgets and dated boundaries; durations are estimates without human playtest. |
| Character voice/emotional realism | 15 | **11** | Six voice cards, boundaries and three short E01 samples; full scenes, acting/audio and Sophie/Daniel reaction have not been tested. |
| Investigation agency/provenance | 20 | **16** | E001–E020 source ledger, negative proof rules, low-trust route, mechanics and fail-softs; custodian permissions pending approval. |
| Branch consequence/knowledge consistency | 15 | **11** | Fact/receipt matrix and choice callbacks; group membership, consent and neutral value migration are not implemented or fully approved. |
| Production feasibility/QA clarity | 15 | **10** | Runtime gap matrix, acceptance gates and risk owners; no playable slice, full dialogue, real device or duration study. |
| **Total** | **100** | **76** | Written-design proposal is coherent but **not production-ready**. |

## Risk log, sorted by severity

| Risk / severity | Observable failure | Mitigation | Owner / decision |
|---|---|---|---|
| RISK-01 **BLOCKER** audit authenticity | Thumbnail treated as verified original, making E01 “proof” false | Approve E012 source, requestor, receipt and same-day release; test alternative explanation | Narrative owner + records consultant; D03/D04 |
| RISK-02 **BLOCKER** deadline procedure | E07 sees folder with no authority or E10 hold arrives after 15 Oct | Approve 13 Oct short pause, supervised inspection and 14 Oct formal hold, both timestamped | Narrative owner + legal/process reviewer; D05/D06 |
| RISK-03 **BLOCKER** witness consent | Ana identity or voice leaks in group/public branch | Named consent scope, anonymous route, redaction test for every ending | Narrative owner + sensitivity reviewer; D07/D10/D17 |
| RISK-04 **HIGH** long-episode padding | 30.8-hour estimate achieved by idle waits/repeated document puzzles | Prototype first 20 min and representative 60 min; track active verbs and actual playtime | Game design lead; D02/D15 |
| RISK-05 **HIGH** Daniel disappearance | Hiding appears heroic and Sophie's distress is dismissed | Counsel welfare chain, Sophie boundary scenes, confession of harm independent of romance | Narrative owner; D09 |
| RISK-06 **HIGH** evidence omniscience | Maya/Eli/group suddenly know private clues | Require fact receipts and recipient membership ledger per scene; negative QA assertions | Narrative systems lead; D18/D19 |
| RISK-07 **HIGH** fake technical powers | Seven-year CCTV/GPS, instant archive access or hacked accounts solve clues | Mandatory paper/dispatch/shelter routes; provenance cards; no real-device permissions | Design + technical review; D08 |
| RISK-08 **HIGH** save/relationship mismatch | Phase 00 zero values interpreted as “all hostile”; narrative state lost | Versioned migration, new neutral baseline, backup-first tests | Technical lead in Phase 02; D21 |
| RISK-09 **MEDIUM** role guilt confusion | Daniel's v2 publication either excuses Vivian or erases his culpability | Separate order/approval/publication cards and emotional consequence | Continuity editor; D14 |
| RISK-10 **MEDIUM** unfair Eli red herring | `E—I` persuades player to accuse without a fair verification path | Label fragment as unconfirmed, full form key E007, apology callback | Puzzle lead; D12 |
| RISK-11 **MEDIUM** public spoiler leakage | Spoiler Bible or private packet enters public Git/build | Private repository/access control, staged-diff review, separate player content | Producer; publication decision |
| RISK-12 **MEDIUM** date/age drift | 14 Oct called Day 6 or exact birthdays invented | Use calendar dates, automated ID/date scan, no unsupported birthdays | Continuity editor; D01 |
| RISK-13 **LOW** optional content overload | Every character sends case-relevant chat at once | Voice/pacing QA; optional ordinary-life beats with no proof gate | Narrative editor |

## Explicit owner decisions (none approved in this document)

`A/B` below are viable alternatives. A recommendation can be accepted, revised or rejected. Record owner, date, source revision and impact when closing a row; until then status is `OPEN`.

| ID / impact | Decision: options and recommendation | Current status / required owner |
|---|---|---|
| **D01 high** | A redefine relative day count; **B use calendar dates, 14 Oct = Day 7**. Recommend B. | OPEN — narrative owner; affects timeline/episode labels. |
| **D02 high** | A keep E01 end at 20 min; **B first 20-min turn, full episode after source work**. Recommend B. | OPEN — design owner; affects pacing. |
| **D03 blocker** | **A redacted civic self-service authenticated audit export** same day; B Daniel's signed transfer package, later custodian confirmation. Recommend A with B corroboration. | OPEN — records/process owner; E01 proof and E012. |
| **D04 blocker** | **A Crestline correction request → independent portal approval/audit**; B Vivian direct portal admin plus external snapshots. Recommend A. | OPEN — narrative owner; Vivian limits. |
| **D05 high** | **A Daniel's 2 Oct report was incomplete intake**; B valid hold ignored. Recommend A. | OPEN — narrative owner; urgency. |
| **D06 blocker** | **A 13 Oct short disposal pause/supervised inspection, 14 Oct formal hold**; B direct access with only final hold. Recommend A. | OPEN — legal/process reviewer; E07/E10. |
| **D07 blocker** | **A source-protected transcript first, consented excerpt later**; B full audio immediately with Ana's blanket consent. Recommend A. | OPEN — witness ethics reviewer; E05/E06. |
| **D08 high** | **A historic dispatch/intake mandatory; telematics only with explicit preserved source**; B seven-year GPS archive as core. Recommend A. | OPEN — technical realism reviewer; E04. |
| **D09 blocker** | **A independent counsel welfare check, limited status then Daniel contact**; B direct Daniel→Sophie phrase verification. Recommend A. | OPEN — narrative owner; E08 emotional logic. |
| **D10 blocker** | **A identity disclosure by Ana's named, revocable scope**; B no identity disclosure, proxy testimony only. Recommend A+B as player-safe alternatives. | OPEN — ethics owner; K07. |
| **D11 medium** | **A public preview redacts residents, names June as escort; full sensitive file permissioned**; B fully public passenger list. Recommend A. | OPEN — privacy owner; E001/E002. |
| **D12 medium** | **A retain damaged E—I with full-field check**; B remove red herring. Recommend A. | OPEN — narrative owner; Eli arc. |
| **D13 high** | **A defer route roster and Sophie romance until consent review**; B approve every adult route now. Recommend A. | OPEN — product/narrative owner. |
| **D14 medium** | **A `V.H.` lead until matched E015/E019**; B initials count as culprit proof. Recommend A. | OPEN — evidence editor. |
| **D15 high** | **A distinct ten-episode split as [09](09_SEASON_01_TEN_EPISODE_OUTLINE.md)**; B renumber old chapters and pad. Recommend A. | OPEN — product owner. |
| **D16 medium** | **A redacted shelter/dispatch custodian records for Rowan/Ana movement**; B family diary route. Recommend A. | OPEN — records owner. |
| **D17 high** | **A limited redacted public facts plus protected private packet**; B embargo all publication until Ana appears. Recommend A. | OPEN — publication/ethics owner. |
| **D18 high** | **A Bulletin tip return token, anonymous or handle**; B require account signup. Recommend A. | OPEN — product owner; E01 agency. |
| **D19 high** | **A Memory Project read-only invitation, explicit consent**; B public Archive with no scope. Recommend A. | OPEN — product owner; source ownership. |
| **D20 high** | **A active correction *role/queue*, operator unknown**; B old personal login still active. Recommend A. | OPEN — technical narrative owner; E01 cliffhanger. |
| **D21 high** | **A new canonical neutral relationship baseline with safe Phase 00 migration**; B interpret old zero as in-story hostility. Recommend A. | OPEN — narrative systems + technical owner; Phase 02. |

## Cross-document QA assertions

1. **Chronology:** 2019 exact moments in [04](04_MASTER_TIMELINE_2019_2026.md) match SB2 §§2–3. 8 Oct is first playable day; 14 Oct is seventh inclusive day; formal hold precedes 15 Oct disposal. No episode uses a future fact too early.
2. **Evidence dependency:** E01's proof needs E012; E04 route needs E013/E014; E06 full E-I needs E007; E07 folder order needs authorized pause; E09 Vivian proof needs E009/E015/E019; E10 hold needs E020. Optional photo/voice/romance never carries a sole required edge.
3. **Low-trust path:** [06](06_KNOWLEDGE_AND_DISCLOSURE_MATRIX.md) and [07](07_EVIDENCE_LEDGER_AND_PROVENANCE.md) show custodian alternatives for Maya/Lucas/Nora/Eli/Daniel refusals. A reviewer must walk every scene gate with all optional social scenes declined before production lock.
4. **Knowledge:** R01–R15 name recipients; Ana identity, Daniel location and private tip mode never propagate through group membership. No NPC references a fact absent an initial condition or receipt.
5. **Agency:** a draft is not a player message; all disclosure, accusation and final distribution requires explicit Send/Submit. Timed NPC events are idempotent and recoverable.
6. **Ethics:** June's medical cause is public but authorization was hidden. Ana controls identity. Device fix is not human presence. No unexplained 2019 CCTV or full private inbox access.
7. **Spoilers:** E01 hook names no Vivian, Ana, Box 7/Folder 14 interpretation, Daniel hiding location or ending strategy.

## Deliverable status register

`PASS` means the document exists and its requested design content is present; it does **not** mean owner-approved, playable or empirically validated. `PARTIAL` means a needed approval/source/prototype remains. No numbered document is falsely labeled production-ready.

| # | Deliverable | Status | Reason |
|---|---|---|---|
| 01 | Executive report | PASS | Handoff, scope, score and limits recorded. |
| 02 | Canon audit | PASS | Full SB2 sections audited, source table and two-option hole log; approvals open. |
| 03 | V3 proposal | PARTIAL | Explicit change log and fixed/proposed/open separation; cannot promote until owner decisions. |
| 04 | Master timeline | PARTIAL | Exact SB2 times preserved and 2026 hour windows proposed; procedural timestamps await D06. |
| 05 | Character/voice guide | PASS | Six core and supporting constraints, voice examples and emotional boundaries. |
| 06 | Knowledge matrix | PARTIAL | Fact/receipt schema and low-trust route designed; consent/recipient rules await D10/D19. |
| 07 | Evidence ledger | PARTIAL | E001–E020 acquisition/proof graph designed; E012/E020 procedures await approval. |
| 08 | Digital systems | PASS | App/mechanic contracts and technical dependencies specified as proposals. |
| 09 | Ten-episode outline | PARTIAL | Ten distinct outlines with scene beats and estimates; no playtest/approval. |
| 10 | Episode 01 blueprint | PARTIAL | 30 scene contracts and short sample dialogue; E012 route and pacing untested. |
| 11 | Choice/branch rules | PARTIAL | Real callbacks and convergence designed; numeric baselines/romance roster open. |
| 12 | QA/decision log | PASS | Rubric, risks, decisions and negative assertions present. |
| 13 | Phase 02 entry gate | PASS | Explicit blockers, runtime gaps and proposed first-play measures documented. |

## Verification scope

Phase 01 verification is a **documentation review**: source-section tracing, exact-date comparison, ID/scene count checks, low-trust proof path and cross-file links. A local document-only check found **14 Markdown files**, no broken relative Markdown links, **30 sequential unique E01 scene IDs**, **20 sequential unique IDs in each E02–E10**, **58 E02–E10 investigation contracts** (seven more in E01), and a **1,850-minute** sum of the stated episode estimates. This checks structure, not playability or the accuracy of the estimates. Phase 00's reported TypeScript, lint, unit, build and E2E results were read in P00, **not rerun here**. No gameplay source code or legacy save was modified by this phase. Evidence-based score remains 76/100 until owner approval and player testing provide new data.
