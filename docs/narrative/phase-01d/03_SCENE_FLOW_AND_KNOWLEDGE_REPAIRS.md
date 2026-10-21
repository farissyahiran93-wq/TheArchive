# 03 — repaired scene, channel and knowledge contracts

**Documentation-level replacement contracts, not runtime implementation or full dialogue.** Preserve the original P01 [E01 S01–S30](../phase-01/10_EPISODE_01_SCENE_BLUEPRINT.md) and [E02–E10 scene tables](../phase-01/09_SEASON_01_TEN_EPISODE_OUTLINE.md) as audit history. The owner-approved D04/D05/D13 and conditional Option A selections govern these proposed corrections; source samples remain conditional as [02](02_EVIDENCE_AUTHORITY_AND_RECEIPT_DRAFTS.md) states. A versioned content manifest must adopt and test them before Phase 02.

## E01 channel and permission state machine

| State | Entry action and surface | What exists / what does not |
|---|---|---|
| `PUBLIC_OBSERVER` | E01-S03–S07: player reads Bulletin E001 and civic v2 E002, marks June difference. | Player K01 is **LEAD**. Maya knows only her own preview/brief. No player message, contact, Archive permission or K02 proof. |
| `TIP_DRAFT` | S08: player selects anonymous return-token or permitted handle, previews recipient and exact observed field. | Choice is a draft; no R01, outgoing bubble or Maya knowledge yet. |
| `BULLETIN_RETURN` | S09 explicit **Send** creates R01 and a return token. S10 displays receipt. S11 Maya replies **inside Bulletin return inbox**, not Messages. | Maya receives only the sent facts and optional chosen handle; anonymous mode does not disclose name, phone number, location or contact list. S11–S16 may continue through token even if messaging connection is declined. |
| `INVITED` | S16 offer presents two independent controls: optional **Connect in Messages** and optional **Open read-only Archive**. Invitation event `offer.archive.e01` is only a draft content ID. | Seeing/reading invitation grants neither permission. `R03` is reserved for accepted Archive access at S17; separate proposed `CONN-E01-01` records explicit messaging acceptance. No group membership or file authenticity follows either. |
| `WORKSPACE_ACCEPTED` or `WORKSPACE_DECLINED` | S17 player accepts/rejects Archive. Acceptance issues R03 with owner, folder scope and time. Decline records no R03. | Both branches have public/custodial E003/E012 routes. S18 Archive tour and S24 Daniel fragment are optional/permissioned. No surprise installation. |
| `EXPORT_REQUESTED` → `EXPORT_VERIFIED` | S27 player submits redacted request through civic portal; S28 validates independently issued E012/R04. | `REQUESTED`/`PENDING` are not `VERIFIED`. Only player receives R04 initially; Maya learns from a later scoped Send if chosen. S29 may mark K02 only after issuer/lineage checks pass. |
| `E01_COMPLETE` | S30 player inspects a lawfully released role-capability card after S29. | `roleEnabled` only; operator/current misuse unknown. No Vivian allegation, Ana identity, Daniel location, `7-14` meaning or next-episode spoiler. |

### Affected scene IDs and exits

| Scene(s) | Revised trigger/action/exit |
|---|---|
| S08–S10 | Tip mode and scope remain drafts until explicit S09 Send. `R01={tipId, mode, exactFactIds, recipient=Bulletin/Maya, storyTime, returnToken}`. A handle is only the supplied display handle. S10 marks delivered to inbox, not “Maya read” without a later read event. |
| S11–S15 | Maya uses the token inbox. Her editor identity is checked independently at S12. R02 requires a second explicit Send for cropped image/text/defer; no one learns the player's unsent annotation. No Messages contact appears solely from a Bulletin reply. |
| S16–S17 | Offer and accept are distinct. Record `offer.archive.e01`; R03 occurs only on explicit Archive acceptance, `CONN-E01-01` only on explicit messaging acceptance. Either can be accepted without the other. A declined invitation remains reopenable; no gate waits for it. |
| S18–S24 | Accepted path can view permissioned Archive source cards. Declined path uses public Bulletin/Browser/Files views for E001 provenance label and E003 revision notice, with source warnings. Daniel's personal note fragment is optional/reintroduced only under a permitted source; mandatory K02 never depends on it. Both paths test routine correction and reach S25. |
| S25–S26 | Maya check-in and scoped response use the already permitted channel: Bulletin token if messaging declined, Messages if `CONN-E01-01` exists. C03 accusation/caution changes her response and E03 callback, never proof access. Every player line requires Send. |
| S27–S29 | Civic redacted export form available independently of Archive and tip identity mode. S28 checks `REQ → ISSUED → R04`, issuer, v1 lineage, page/redaction and E003 order. Invalid/delayed export returns a specific correction request and leaves S29/K02 unfinished. |
| S30 | Role-status source card must identify its issuer, retrieval time and disclosure authority. If the approved D03/D04 process cannot show capability to a civilian, this scene is a source blocker rather than a fabricated login log. |

**First 20 minutes:** retain S01 setup, S03 case motive, S04–S07 genuine comparison, S08–S09 scoped tip and S10–S12 Maya/source check as an **active-play target**, not a timer gate. The old P01 A1 0–22/A2 22–43 minute allocation conflicts with this early target; it is superseded as an estimate only. The full 185-minute E01 estimate remains unmeasured and the late S30 hook still requires E012 work. Slow readers are never advanced by wall time.

## Receipt and character-knowledge guardrails

| Receipt/event | Issuer → recipient; exact fact scope | Forbidden propagation |
|---|---|---|
| R01 | Player S09 tip → Bulletin case inbox/Maya; K01 as **reported observation** only. | No legal identity, private device info, unsent hypothesis or verified K02 to Maya. |
| R02 | Player S14 scoped follow-up → Maya via the chosen token/message channel; only selected text or crop. | A crop does not grant metadata or every file in Case Board. |
| `offer.archive.e01` | Maya's invitation arrives to player. | Offer is not R03, access, download or group membership. |
| R03 | Player S17 acceptance → read-only Memory Project workspace; permitted folder IDs only. | No truth badge, public-portal privilege or NPC access to player device. Decline has no R03. |
| `CONN-E01-01` | Player separate connection acceptance → Maya Messages channel. | No Archive access, prior Bulletin history import or auto-sent player lines. |
| R04 | GCRO E012 export → requesting player only after validated issue. | Maya/other NPCs receive no K02 unless explicitly shared or independently obtained. |
| R07 / R08 / R09 | Separate custodial route record / anonymous insurer content / Ana-named consent. | R07 is named-recipient route scope; R08 does not grant K07; R09 only named recipients Ana authorized. |
| R11 / R12 / R15 | Storage-index mapping / Sophie welfare / acknowledged preservation direction. | R11 does not open physical folder; R12 contains no address; R15 requires E020 `ACKNOWLEDGED`, not submission. |

An NPC line may use a fact only if it appears in that character's SB2 initial-knowledge row, a named received artifact/receipt, or a dated public publication they actually accessed. Recipient list is captured **at Send**, and a later group member does not inherit old private content. If a scene lacks that path, move the line or author a lawful share; never set knowledge silently to satisfy dialogue.

## Later-episode scene corrections for denial and privacy

| Original beat | Repaired paper branch |
|---|---|
| E07-S07 Daniel's 2 Oct report | Show `INT-...` and `DEF-...` as **incomplete intake**, with verified-locator/eligible-signatory deficiency. The owner has approved D05 Option A; exact document/hour remains draft. |
| E07-S13–S16 physical access | Player prepares challenge; an eligible actor submits. If CRCU signs `PAUSE-13`, S15 displays supervised custodian inspection/copy receipt, and S16 shows **released derivative E009** only. Player never enters storage through the Archive app. If pause is denied, S16 remains locked and E07 ends with a sourced pending preservation route; the 14 Oct GIRRO risk-based branch in [02](02_EVIDENCE_AUTHORITY_AND_RECEIPT_DRAFTS.md) must be chosen and validated. |
| E08-S01–S12 welfare | Suspicious relay and phone fix stay UNVERIFIED. Sophie can authorize limited inquiry. S11 shows scope/request status, **not** “alive/safe yes”; only signed live-check plus independent callback at S12/S16 can establish time-bound welfare to an authorized recipient. |
| E08-S13–S18 Sophie disclosure | S13 is a draft. At S17 chosen counsel/player explicitly Sends only the approved R12 statement to Sophie; she may feel relief and anger. No location/strategy reaches group. Failed check cannot advance K11. |
| E08-S19–S20 no direct Daniel contact | Certified work-order lead goes through its custodian; Daniel's direct call/admission is optional. E09 still compares E015 to E009/E019 and retains his moral accountability. |
| E09-S19/S20 and E10-S01–S13 | `PENDING` is shown honestly. Clean route checks `DIR-14` plus CRCU `ACK-14` at E10-S12 before R15/K14. If pause was denied and GIRRO directs protection earlier on 14 Oct, E10-S12 **verifies the existing E020** rather than issuing a duplicate. A deficiency gets a named repair; a substantive refusal has no success epilogue. |

The branch design keeps the 13 Oct pause separate from the 14 Oct direction and 15 Oct scheduled disposal. The denied-pause alternate order and final denial response require D06 process review; this document does not certify a playable no-softlock route.
