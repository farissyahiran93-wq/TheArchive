# D21 relationship baseline and first-contact validation appendix

**OWNER-REPORTED DESIGN VALUES / D21 CONDITIONAL.** This appendix reconciles [P01's generic proposed tuple](../phase-01/11_CHOICE_RELATIONSHIP_AND_BRANCH_RULES.md), [01D's six-character contract](../phase-01d/04_RELATIONSHIP_AND_SAVE_SAFETY.md), [01E §D21](../phase-01e/03_CONDITIONAL_POLICIES_AND_RECEIPTS.md) and the 01B-R2 instruction. The six values are documented exactly, but the owner has not approved the final D21 clause. No code or save is changed here. Each axis is independent and ranges 0–100 in **Trust / Affinity / Suspicion / Romance** order.

| Character | First-direct-contact tuple | What can introduce them | Guard for first contact and expected paper result |
| --- | --- | --- | --- |
| Maya Chen | `50 / 45 / 20 / 0` | Verified Bulletin editor byline. | R01 alone is a sent tip. Maya's delivered reply in the Bulletin return-token inbox creates the first two-way channel exchange and applies the tuple **once**. Anonymous mode still hides legal identity and does not open Messages. |
| Lucas Grey | `42 / 40 / 30 / 0` | Public fleet role or verified referral. | Direct exchanged message/call after a verified introduction applies tuple once. A role card or declined photo does not. |
| Sophie Mercer | `38 / 35 / 25 / 0` | Public missing-person report or consented referral. | Her direct consented exchange applies tuple once. Daniel's work order, voice note or welfare inquiry does not contact her on the player's behalf. |
| Eli Ward (female) | `50 / 48 / 15 / 0` | Verified media role or referral. | Her own reply through the verified channel applies tuple once. A file merely queued for her does not grant case knowledge or imply contact. |
| Nora Vance | `40 / 38 / 30 / 0` | Public byline or archive listing. | A direct exchanged message/call applies tuple once. Knowing her byline never exposes Ana or Session 02. |
| Daniel Mercer | `45 / 40 / 25 / 0` | Historical work order, missing report or device lead. | A verified direct live exchange applies tuple once; a device fix, relay, counsel R12 to Sophie or his publication audit does not. Direct Daniel contact can be declined without blocking case records. |

## Conceptual state contract and edge cases

| State | Trigger | Values and access invariant |
| --- | --- | --- |
| `unintroduced` | No verified in-play name/channel encountered. | No expressed opinion. Do not display or infer `0/0/0/0`; no private facts or contact permission. |
| `introduced` | Player inspects a verified public mention or accepts a consented referral. | Keep the character-specific tuple as a **pending template**, not as a scored relationship; no reciprocal exchange has occurred. A search snippet of an unverified name alone is only a lead. |
| `contacted` | Direct, verified, two-way character/player exchange is delivered. | Activate pending tuple exactly once, then record later authored deltas with event provenance. A repeated scene/reload cannot reapply it. Contact is not legal identity disclosure, Archive membership, evidence custody or consent to romance. |

For Maya, the return-token reply counts as a channel exchange **after** the player's explicit tip Send and Maya's delivery. An unsent draft, unclaimed token or one-way tip leaves contact pending. Handle mode conveys only the chosen handle. For all characters, “first mention,” “first document,” “first notification,” “first offer,” and “first direct contact” are different events. A verified counsel statement about Daniel is not a conversation with him. `unintroduced` is not low Trust; an actually contacted character can later have low Trust through explicit choices. Neither condition gates independent required records.

## Paper assertions for eventual state/receipt review

| Check | Input/sequence | Expected result | Present evidence |
| --- | --- | --- | --- |
| D21-01 tuple fidelity | First direct exchange with each of six, no prior deltas. | Exact six rows above; all Romance `0`; no shared default tuple. | Documented in 01D/01E and this appendix; **not executed**. |
| D21-02 timing | View a byline/record, then leave before contacting. | `introduced`, no active numeric opinion, no private knowledge or invitation acceptance. | State contract only. |
| D21-03 anonymous Maya | Draft tip → leave → Send → Maya token reply → reopen. | No R01 before Send; one R01 on Send; Maya `contacted` at delivered reply, tuple applied once; real name/phone remain unknown. | [01E scene manifest](../phase-01e/04_SCENE_TRIGGER_REPAIR_MANIFEST.md) is candidate, not executed. |
| D21-04 handle Maya | Send with handle, reply, decline Messages and Archive. | Same first-contact tuple; handle known only; no Messages consent, no R03; E012 public route remains. | T02/T05 paper route only. |
| D21-05 Daniel device/welfare | Inspect old device position, then receive limited counsel R12, never call Daniel. | Daniel stays at most `introduced`; no player-Daniel tuple activation or hidden location. Sophie receives only named dated welfare if explicitly delivered. | T06 paper route only. |
| D21-06 reopening/idempotence | Enter contact scene, receive reply, reopen scene three times or resume after interruption. | One baseline event and one receipt ID; same values unless a separate authored delta occurred; no duplicate reply. | Future technical test required. |
| D21-07 low trust and no social | Contact all, apply legitimate negative deltas, decline optional chats and romance. | Mandatory E012/E013/E014/E016/E015/E019 and lawful preservation/qualified route remain available through source rules, not scores. | T05 `PARTIAL`; D03/D06/D16 source gates open. |
| D21-08 old v1 ambiguity | Load copied pristine fixture zeros, a history-bearing save with provenance, and ambiguous zeros. | Pristine fixture stays `unintroduced`; authored changes preserved; ambiguous record quarantined for recovery, never silently rebaselined or treated as hostile. | Contract only; actual variants have not been inventoried. |
| D21-09 backup/rollback | Copy v1 raw bytes, propose v2 in separate slot, interrupt/retry, then restore. | Original v1 and legacy key unchanged; repeated migration idempotent; unsupported versions refused without overwrite; rollback byte-equivalent. | Future implementation/reviewer test, not run here. |

**Consent and romance boundary:** D13 approves early romance deferral; it does not approve any later route roster. A future route must be optional, adult, mutual, reversible and separately consent-reviewed. Romance never rises because a character complies with an evidence request, and a score never authorizes private evidence or Ana disclosure. [P00 report](../../../PHASE_00_REPORT.md) confirms reboot IndexedDB `the-archive-reboot` and `GameSave.schemaVersion: 1` fixture zeros; the legacy `the-archive:game-save:v1` localStorage key is outside this contract. D21 closure needs the exact [owner question](02_CONDITIONAL_APPROVAL_TRACKER.md), then tested backup-first compatibility before schema work.
