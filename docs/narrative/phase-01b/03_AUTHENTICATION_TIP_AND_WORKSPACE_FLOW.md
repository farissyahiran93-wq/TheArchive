# 03 — E01 authentication, tip return and workspace

**Design contract, not an implemented route.** Source: SB2 §§2.2, 3, 6–8; [P01 E01](../phase-01/10_EPISODE_01_SCENE_BLUEPRINT.md), [evidence ledger](../phase-01/07_EVIDENCE_LEDGER_AND_PROVENANCE.md); directives B/C/G. D03 and D04 remain conditional/choice as [01](01_OWNER_DECISION_REGISTER_D01_D21.md) records.

## Separate record owners

1. **Public Greyhaven Civic Portal** serves redacted current v2 (`E002`) and a public revision-summary row (`E003`). A link or screenshot can change; capture URL, record ID, retrieval time and version label. This is not THE ARCHIVE.
2. **Greyhaven Civic Records Office (GCRO, proposed)** operates a separate, append-only civic audit export service. Its authorized records officer can release a redacted *certified view*, not the sensitive full manifest. The municipal service agreement permitting same-day civilian redacted export, the independent audit holder, and request fee/eligibility need D03/D04 approval. A records consultant should confirm this fictional process is internally workable.
3. **Crestline** may request a correction, but its precise 2019 portal privileges remain D04. Neither Vivian nor Maya can edit the GCRO audit snapshot by possessing a portal link. E015 later identifies individual approval/publication actors.
4. **Memory Project / THE ARCHIVE** is a read-only collaborative workspace controlled by Maya's project. Permission to enter it does not authenticate every file inside or give the project access to the player's device.

## Minimum E012 export envelope (proposed sample)

| Field | Required value and check |
|---|---|
| Stable record | `GH-NQ-BUS4-2019-11-23`, version `v1`, verified `2019-11-24 15:20 Greyhaven local`. E001 preview must cite this record/version. |
| Request | `REQ-2026-10-08-...`, civilian redacted-view request submitted E01-S25–S27; requestor is player via portal's one-use return receipt, without claiming public access to resident names. |
| Issuer | GCRO records officer name/role and departmental seal or verifiable signature. Issuer must be independently identifiable through a fictional public directory, not Maya's assurance. |
| Issue/transfer | Proposed 8 Oct 2026 issue time in E01-S28, request receipt, export-generation time, download/transfer log and page count. Chronology cannot precede request. |
| Lineage | v1 source snapshot ID, verification event ID, v2 publication/correction reference, no silent replacement of the original. A public summary may omit actor identity. |
| Redaction | Resident names/medical/private fields suppressed; June's volunteering/escort entry retained as public-relevant text. Redaction certificate states what was removed and why. |
| Integrity | File digest/signature validates bytes since issue; a modern hash is **not** proof that the 2019 facts were true. Compare independent audit event, request log and E002/E003 version data. |
| Limits | E012 proves a verified v1 existed and that the released copy corresponds to it; it does not establish Vivian's motive, Depot 02 diversion or the present role's operator. |

**Proof ladder:** E01-S04/S05/S06 observes an E001/E002 difference (**LEAD**). E01-S19/S21 public metadata makes an after-verification edit plausible (**INFERRED**). Only after request and independent validation at S28/S29 does K02 become **CORROBORATED/PROVED as a version sequence**. E015/E019/E009 later establish people and cause. A skeptical player can reject Maya's preview and still obtain the custodian export; if the export is missing or unverifiable, E01 cannot mark K02 proved and Phase 02 cannot implement its ending as written.

## Tip and opt-in sequence

| Step | Action and recorded receipt | Privacy and gate |
|---|---|
| E01-S08 | Player drafts observed June difference and selects `anonymous` or `handle`. | Selection alone sends nothing; preview states exact recipient and facts. |
| E01-S09 / R01 | Explicit **Send** creates `tipId`, opaque random return token, timestamp and disclosure scope. | Anonymous token permits a Bulletin inbox reply without legal name, phone number, contacts or location. Handle permission sends only entered display handle. |
| E01-S10–S12 | Maya replies in the Bulletin return inbox, then player verifies Memory Project/editor listing independently. | She sees only submitted tip fields; she cannot open the player's private messages. Her first reply asks what changed. |
| E01-S13–S14 / R02 | Player may send scoped detail. | Crop/text/defer choices cause different receipts and later callbacks; no automatic file metadata share. |
| E01-S15–S17 / R03 | Maya offers **separate** messaging connection and read-only Archive workspace invitation. Player inspects scope and explicitly accepts either, both or neither. | Declining messaging does not block Bulletin replies. Declining workspace does not block public/custodial E012 request. No installation or background device access. |
| E01-S25–S29 / R04 | Player submits authorized redacted export request and validates response. | GCRO sends E012 to requester. Maya receives it only by an explicit scoped share; a narrow factual summary can be sent separately. |

**Branch test:** anonymous and handle paths each yield E001/E002 observation and the same E012 request channel. Anonymous Maya says “the person who sent this tip”; handle Maya uses the permitted handle. R01 stores the mode and E03 recalls it. Neither path creates an unearned `contacts` entry, group membership, source identity, or phone permission. UI-01 must render whatever the game state actually grants; its icon art is never the access gate.
