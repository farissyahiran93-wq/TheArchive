# Episode 01 event, knowledge and receipt contract

**Authoring state only; not implemented.** An event/receipt ID below is stable within the Episode 01 script and must be persisted/idempotent in Gate B. New local events use `EV-E01-...` and are **PROPOSED**. Approved K/R/E/C IDs retain their meanings. The player's Case Board is private unless a selected-fact Send occurs. No group broadcast, automatic player line or new character contact occurs in E01.

| Event / source scene | Actor → permitted recipient | Payload/status after commit | Must not grant |
| --- | --- | --- | --- |
| `EV-E01-S03-READ` S03 | Bulletin public brief → player | K03: Daniel missing since 4 Oct, report 5 Oct, public brief 7 Oct. | Survival, abduction, location. |
| `EV-E01-S07-LEAD` S07 | Player's own E001/E002 comparison → private Board | K01 as observed discrepancy, `LEAD`. | E001 authenticity or Maya knowledge. |
| `R01` S09 | Player **Send tip** → Maya's Bulletin case inbox | Exact selected tip, two public links, anonymity/handle mode, return token, delivery state. | Legal identity, phone, GPS, private board, image. |
| `EV-E01-S11-MAYA-REPLY` S11 | Maya's delivered token reply → player | Maya first direct exchange; activate Maya D21 tuple `50/45/20/0` once, then C01 delta. | Messages connection, R03, E012 validation. |
| `EV-E01-S12-EDITOR-CHECK` S12 | Public directory → player | Editor **channel** verified by MP-DM-07 match. | Certification of the crop or Maya's every statement. |
| `R02` S14, conditional | Player explicit selected content **Send** → Maya | Cropped public row image+caption OR text-only exact detail. Absent on silence/deferral. | Resident fields, full file metadata, other private files. |
| `EV-E01-S15-EDITOR-NOTE` S15 | Maya's public Bulletin amendment → any reader | Visible distinction: family portrait permission versus Maya's own choice to publish the crop; crop not certified original. | Family approval of the crop, E012 authenticity, a new contact with the player. |
| `CONN-E01-01` S17, conditional | Player accepts Messages → Maya/player channel | New Messages connection. | Backfill of Bulletin thread, Archive permission, R03. |
| `R03` S17, conditional | Memory Project read-only folder grant → player | Owner, folder, scope and acceptance order. | Evidence authenticity, player file read, Messages access. |
| `EV-E01-S21-ORDER` S21 | E001/E003 public/source-limited → private Board | Tentative dated ordering, K02 false. | Motive or named actor. |
| `EV-E01-S27-REQUEST` S27 | Player Submit → GCRO request desk | Scoped one-use request and REVIEWING/refusal/delay receipt, no export yet. | R04 or K02. |
| `R04` S28, conditional | GCRO valid E012 transfer → originating player session | Four-page redacted lineage, eligible one-use recipient, issuer/lineage/pages/redaction/integrity checked. | Automatic Maya/group disclosure, motive, operator, 2019 order author. |
| `EV-E01-S29-K02` S29 | Player cites E012/R04 + E003 + E002 and taps **Save corroborated finding** → private Board | K02 **corroborated**: public manifest changed after v1 verification. The citation draft alone is not K02. | Guilt or reason for change. |
| `EV-E01-S29-SHARE` S29, conditional | Player explicit selected-fact Send → Maya | Exact narrow finding from P-S29-A or B. No E012 file transfer unless separately scoped later. | Maya's possession of E012 or unshared board notes. |
| `EV-E01-S30-ROLE` S30, conditional | Valid public GH-PV-02 card → player | Current **role-class capability enabled** only. | Current person, recent submission, Vivian accusation. |
| `EV-E01-S30-FALLBACK` S30, conditional | Public service notice → player | Correction process publicly available; individual role status unknown. | Enabled-role fact. |
| `EV-E01-S30-SHARE` S30, conditional | Player explicit selected-fact Send → Maya | Exact valid role-class status or fallback uncertainty; no operator claim. | E012 file, private login, inferred culpability. |
| `EV-E01-COMPLETE` S30 | Player “End episode” → local story state | E01 completion once after R01, S12, valid R04/K02 and one S30 variant. | E02 auto-start, new NPC fact. |

**First contact:** Maya is merely `introduced` by B01 byline. R01 is one-way, so she is still not `contacted`. Her delivered S11 reply changes to `contacted` and applies D21 tuple **once**. Lucas, Sophie, Eli, Nora and Daniel remain uncontacted and retain pending first-contact tuples only. Romance is 0 and no E01 choice changes it. Relationship scores never create receipts.

**Disclosure edge:** Maya can know her own posted preview and Daniel's transfer from her prior history. She learns the player's observed difference only from R01/R02, the player's S13/S20/S26 messages if actually sent, or her own independently opened public pages. She does **not** know the player's private S21 ordering or validated E012/R04 because those are requester-only. The optional S29 selected-fact Send can tell her a narrow conclusion; a future E02 recap must check whether this occurred. No other main character receives K01/K02 in this episode.

**Phase 02C optional-scene guard:** S11/S13/S25 continuation lines follow only their stated outgoing Send; a silent or boundary-setting choice does not create Maya disclosure or a reply. S15 direct transfer explanation requires an actual C02-A/B or `P-S14-DEFER` Send; its public correction card stands alone. S16/S17 need the player's offer-review tap; S25/S26 need the earlier direct conversation and their own open/discuss taps. Quiet S18/S27 does not mint `CONN-E01-01`, R03 or a relationship delta. S24 `7-14` dialogue requires R03 plus note view. In the no-tip-first return, saved R04/K02 stay private and S30 completion still waits for R01 and S12; revisiting S27–S29 must not duplicate their receipts.

**Receipt fields for future integration:** `id`, `sceneId`, `sourceId`, `actor`, `recipientSessionOrCharacter`, `selectedFactIds`, `selectedAttachmentIds`, `consentScope`, `storyTime`, `deliveryState`, `sourceRevision`, `idempotencyKey`. Drafts store separately from committed receipts. Returning to a scene must show the prior delivered event rather than create a duplicate.

**E012 authoring versus issue:** [the finalized fictional text master](assets/GCRO-EXP-20261008-041.txt) is 2,012 UTF-8 bytes with SHA-256 `887c59c42ea8b375737b78a3e79ae0d8d57da7c8698e7e21adea955136d730de`. This hash protects the repository prop text. `R04` must instead bind the particular in-fiction issue, recipient session and final bytes delivered in gameplay. A matching repository hash by itself cannot create R04 or let Maya read the export.
