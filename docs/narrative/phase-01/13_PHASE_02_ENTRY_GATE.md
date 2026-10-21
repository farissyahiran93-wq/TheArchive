# 13 — Phase 02 entrance gate and production handoff

**Current verdict: NOT READY FOR PRODUCTION IMPLEMENTATION.** Phase 01 design documents exist, but several high-impact procedural repairs need owner approval and no first-play usability test has occurred. This is an actionable gate, not a request to start code now. The owner may approve a specific option in [12](12_NARRATIVE_QA_AND_DECISION_LOG.md); Phase 02 then freezes a versioned content manifest and begins a vertical slice.

## Required approvals before Phase 02 coding or final dialogue

| Gate | Evidence required | Current state |
|---|---|---|
| G01 Canon authority | Approve SB2 fingerprint and v3 change log CL01–CL10, including D01/D02 chronology and 10-episode split | **OPEN** |
| G02 Source/custody | Choose D03/D04: authenticated v1 export, portal correction workflow, surviving audit | **BLOCKER** |
| G03 Deadline procedure | Choose D05/D06: 2 Oct intake insufficiency, 13 Oct short pause, 14 Oct formal hold and custodian | **BLOCKER** |
| G04 Witness/audio/privacy | Choose D07/D10/D11/D17: Ana consent scopes, insurer release, public redaction and endgame publication | **BLOCKER** |
| G05 Daniel/welfare | Choose D09: counsel channel, verified welfare vs exact location, Sophie communication cost | **BLOCKER** |
| G06 Episode 01 beat lock | Approve all `E01-S01..S30` triggers, source cards, R01–R04 receipts and E001/E002/E003/E012 acquisition | **PARTIAL** design complete, not approved |
| G07 Relationships | Decide D13/D21: romance roster, neutral baseline, migration from Phase 00's zero values | **OPEN** |
| G08 Runtime/content integration | Review matrix below, plan versioned save migration and test criteria; preserve legacy saves | **OPEN** |
| G09 First-play usability | Test 0–20 min with first-time adults: identity/agency, who Maya is, what changed, what remains unproved | **NOT TESTED** |

## Narrative requirement vs Phase 00 runtime: document-only integration matrix

| Future requirement | Existing Phase 00 capability inspected | Gap / Phase 02 dependency |
|---|---|---|
| Episode scene graph and 10 episode gates | `GameSave.episodeId` is literally `'phase-00'`; `sceneId` only home/fixture; episode requirements empty | New authored scene schema, unlock rules, save migration and no early content leakage. |
| Explicit player Send | Fixture choice selection and `sendFixtureChoice` gate, with unit/browser tests reported | General conversation authoring, drafts, recipients, scoped disclosures; do not hard-code player messages in timed events. |
| Character-specific knowledge | Per-character arrays; `grantKnowledge` checks addressed player message/fact; public path closed | Receipt schema with source/date/consent, group membership, NPC-to-NPC and public events; persistence and tests. |
| Independent relationship dimensions | Four numeric fields per core character, all start at 0 | Approved neutral baseline, clamping, consent/romance eligibility, callback rules, safe migration. |
| Evidence provenance and case board | `evidence` has id/source/collectedAt/verified; no authored evidence | Add custodian, original/transfer time, release scope, confidence, citation, redaction and case claim graph. |
| Notifications/timers | Fixture pending/delivered IDs and 160-ms tick; idempotence tests reported | Story clock independent of real clock, offline resume, per-episode event gates, no duplicate notifications, no artificial waiting. |
| Save/load/recovery | IndexedDB v1 and blocked recovery for malformed saves; serialized writes | Migration to canonical schema, backup-first import, durability indicator, abrupt-kill QA and legacy-key isolation. |
| Chat history/scroll | Fixture near-bottom scroll and New Messages indicator; mobile E2E reported | Long branching transcripts, read/delivery per recipient, accessibility/hardware verification. |
| Bulletin/tip return | Bulletin placeholder only | Case brief, anonymous token/handle reply, Send receipt and source/version capture. |
| Search/Browser | Search has three fictional fixtures; no Browser app | Authored index with reveal gates, public portal/news pages, citation/version capture, plausible dead ends. |
| Maps/Locations | Three fictional pins; no route or device semantics | Historic dispatch route/map list; accuracy/consent model, no real GPS. |
| Calls/voice/photos/video/mail | Mostly placeholders | Media provenance, consent, captions/transcripts, optional/missed-call recovery, no unexplained 2019 CCTV. |
| Archive/Files/Case Board | Archive locked; Files sample only; no case board | Permissioned source workspace distinct from reasoning board, E001/E002 compare and E012 audit export. |
| Android release | Capacitor config present, no Android project | Later device QA, safe areas, storage persistence and platform back gestures; out of Phase 02 narrative scope until vertical slice stable. |

This matrix is based on direct inspection of `src/game/types.ts`, `engine.ts`, `save.ts`, `store.ts`, `src/content/phone.ts`, package/config files and P00 documentation. P00's reported tests were not rerun in Phase 01, and no runtime source was modified.

## Phase 02 opening slice definition (after approvals)

1. Freeze private content version `s1-e01-design-accepted` with approved E01 IDs and disclosure ledger. Keep public-facing asset files spoiler-free.
2. Author a small *playable* E01 slice around S01–S14 only; script one conversation at a time with voice review, not a 350-message dump.
3. Implement E001/E002 accessible comparison and tip-return path, using approved redaction/identity rules; then validate source/provenance state before S19–S30.
4. Add authored receipt tests: no player message without Send; no Maya knowledge of unshared content; anonymous mode protects legal identity; no duplicate reply after reload.
5. Test comprehension with at least five first-time adult players as a proposed minimum, using observation rather than leading questions. Targets: ≥80% can explain the two versions and Maya's contact route; 100% can identify what remains unproved; no participant mistakes screenshot for authenticated audit proof after the source card. Thresholds are proposed acceptance criteria, not measured results.
6. Only after a successful slice should full E01 dialogue, remaining episode content, native packaging and performance optimization be scheduled.

## Manual decision packet for the owner

Approve or revise D01/D02/D03/D04/D05/D06/D07/D09/D10/D13/D18/D19/D20/D21 in [12](12_NARRATIVE_QA_AND_DECISION_LOG.md). The two most urgent choices are **the authenticated v1/civic audit route** and **the 13–14 Oct preservation procedure**; they determine the first and last episode's logic. Until they are decided, the design score is provisional and Phase 02 should not start.
