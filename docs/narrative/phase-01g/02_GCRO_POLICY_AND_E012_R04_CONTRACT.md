# D03 — `GH-CR-01 v1` GCRO lineage release, 01G-RC1

**Owner-approved design scope `01G-RC1` on 14 October 2026; D03 `APPROVED` at policy level.** This is a fictional records-service design. It adopts P01's [D03 Option A](../phase-01/12_NARRATIVE_QA_AND_DECISION_LOG.md), keeps [D11](../phase-01f/01_CROSS_PHASE_DECISION_MATRIX.md) resident redaction and [D18/D19](../phase-01f/01_CROSS_PHASE_DECISION_MATRIX.md) separate tip/Archive rules. It refines the [01E sample](../phase-01e/03_CONDITIONAL_POLICIES_AND_RECEIPTS.md); sample identifiers/times below are neither issued evidence nor verified institutional facts.

## Proposed release rule

- **Office and independence:** Greyhaven Civic Records Office (GCRO) keeps a separately controlled, append-only snapshot of the 2019 civic record and its version events. Its officer is outside Crestline's correction-request chain, the civic portal publication desk and Maya's Bulletin/Archive. A separately seeded public directory/registry `GCRO-REG-01` lists the office, rostered role, callback and verification key. If that separation cannot be demonstrated in the final authored asset, E012 cannot be called independent.
- **Applicant:** any adult civilian holding a one-use, case-scoped request token may request the *public-interest redacted lineage view* of Bus 4. The token is a return route, not a legal-name account, newsroom credential, Archive membership or authority to inspect the full archive. The request asks for record/version ID and purpose. The policy permits same-day review on 8 October only after a duty officer checks scope and redaction; it promises no automatic issue merely because a button was pressed. A counsel requester may use the same rule with a distinct named receipt.
- **Token:** portal creates random, non-transferable request reference tied to a local applicant session and a specific record/scope. On successful issue it marks the retrieval capability spent atomically, exposes one receipt and only the redacted response to that requester, and rejects replay, altered scope and cross-session claims. A lost token requires a separately logged reissue/revocation; it never grants another person's R04. Anonymous Bulletin tip tokens and GCRO request tokens are distinct namespaces.
- **Release:** four-page proposed v1 lineage view retains record ID, snapshot verification **24 Nov 2019 15:20**, v2 correction reference/approval **25 Nov 08:40**, June's publicly relevant escort field, and redaction/page/version metadata. Resident names, addresses, care details, private destinations and unrelated contacts are masked. It shows *that* a verified v1 preceded changed v2 fields; it does not authenticate all 2019 events as true or identify the 21:48 order author.

## Asset and receipt contract

| Stage | Required field / state | Evidence limit |
| --- | --- | --- |
| Request | Template `REQ-20261008-041`, **8 Oct 15:06** proposed; requester token ID, Bus 4/version scope, time, eligibility result, privacy mode and rejection/review route. | `REQUESTED` does not give E012 or K02. |
| Snapshot lineage | `SNAP-20191124-1520` links the original `GH-NQ-BUS4-2019-11-23/v1` to `COR-20191125-B4` and the current E002/E003 v2 reference. A source index and event chain name GCRO's ingest/custody and distinguish approval from later Daniel publication (hour TBD). | The 2019 timestamp is fixed; the invented snapshot ID and ingest details still need records review. |
| Export | Template `GCRO-EXP-20261008-041`; proposed 15:40 generation, **15:42 issue/transfer**, v1 source revision, four-page count, `RED-041` field-by-field suppression reason, `CERT-041` officer certification, `GCRO-DUTY-08` role. | An unsigned sample is not `ISSUED_VALID`. A signature must verify against the independent roster, not merely itself. |
| Integrity | Final byte length, algorithm, content digest, signature/certificate ID, canonicalization/format, generation time and digest verification result. Calculate only from the **final in-world exported bytes**; record re-export as new revision/receipt. | A digest shows those bytes have not changed since issue. It cannot prove the underlying events or redaction completeness alone. No digest is invented in RC1. |
| Transfer | `XFER-041` names sender, recipient token/session, issue/delivery time, protected channel, view scope, retrieval use and receipt state. `R04` is issued only to the requester after valid delivery and validation. | Maya/group receives nothing by default. A later explicit selected share needs a new recipient-specific disclosure event. |

**Chronology:** [P01 timeline](../phase-01/04_MASTER_TIMELINE_2019_2026.md) gives E01 on 8 Oct 09:00–18:00, so 15:06 request and 15:42 issue are chronologically possible. They are still *proposed story hours*. E01-S27–S29 must visibly sequence request → issuance → player verification; no reply can precede request.

**K02 threshold:** E001 thumbnail is an `OBSERVED` lead. E002 current v2 and E003 public revision notice establish a comparison question. Only a correctly scoped E012 with separately validated GCRO issuer, complete lineage/page/redaction/transfer checks, final-byte integrity and requester-only R04 can make `proof.version=lineage_verified` and grant K02: *the public manifest changed after v1 verification*. K02 does not prove motive, Vivian's diversion order, Ana's identity, Daniel's location or who currently uses the correction role. E01-S30's capability card cannot repair missing E012.

## T03 skeptical/invalid routes (paper acceptance, not executed)

| Input | Expected state and next action |
| --- | --- |
| Skeptical player, valid anonymous GCRO request and independently checked E012 | `lineage_verified`; one requester R04; K02 only after E003 comparison. No Archive or Maya trust requirement. |
| Handle tip or no tip, valid GCRO request | Same proof route; Bulletin handle does not disclose legal name or create a GCRO entitlement by itself. No tip means Maya's social reply waits for Send. |
| Maya E001 alone, E002/E003 without E012, request pending, or digest-only badge | `lead/requested/issued_unverified`; K02 false. Source-repair prompt identifies missing independent check. |
| Bad token/replay, mismatched issuer, wrong version, incomplete pages/redactions or altered final bytes | Deny release or mark `ISSUED_UNVERIFIED`; no R04 as valid proof and no K02; record reason and correction/review channel. |
| Issue arrives after E01 proof scene or is refused | Preserve chronology and lower claim; reopen E012 check when valid asset arrives, or hold K02 and rewrite the E01-S29 conclusion. Do not make Maya's thumbnail an emergency substitute. |

**Acceptance dependencies after owner approval:** fictional records/process review of civilian entitlement, office separation, source/issuer chain and field-level redaction; a final issued in-world asset with actual digest and receipt; narrative editor E01 adoption; executable T03 including invalid/late branches. These are separate evidence states, not conditions on the recorded owner-policy approval.
