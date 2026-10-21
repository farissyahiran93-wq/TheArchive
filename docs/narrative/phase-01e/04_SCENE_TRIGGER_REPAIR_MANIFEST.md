# Scene and trigger repair manifest — Gate-A-01 editorially adopted

**Status: editorial design ADOPTED under owner-approved `Gate-A-01`, 14 October 2026; not implemented code or issued in-world evidence.** This is the controlling scene/trigger amendment for affected rows in P01 [E01](../phase-01/10_EPISODE_01_SCENE_BLUEPRINT.md) and [E02–E10](../phase-01/09_SEASON_01_TEN_EPISODE_OUTLINE.md), read with [final A–C source and E/F/H contracts](../phase-01g/GATE_A_SOURCE_AND_EDITORIAL_CLOSURE.md). Existing scene IDs remain stable; `{accepted|denied|pending}` suffixes are **variants of the same scene**, not new IDs. Conflicting P01 success-only rows remain audit history. D03/D06/D09/D16/D21 retain their separate `01G-RC1` owner-policy approval; this adoption does not issue fictional props or pass gameplay.

## State and receipt vocabulary

| Field (design only) | Allowed values and invariant |
| --- | --- |
| `tip.mode` | `none`, `draft_anonymous`, `draft_handle`, `sent_anonymous`, `sent_handle`. Only explicit Send creates R01 and return token. |
| `channel.bulletin` / `channel.messages` | Bulletin token inbox may carry Maya replies after R01; Messages opens only after independent `CONN-E01-01` opt-in. A handle does not grant phone/contact access. |
| `archive.offer` / `archive.access` | `unseen/offered/declined/accepted` is separate from `none/read_only`. R03 means **accepted scoped read-only grant** only. Offer/decline is not R03. |
| `proof.version` | `lead → requested → issued_unverified → lineage_verified`. K02 only on verified independent E012/R04 plus E003 order; a hash alone is insufficient. |
| `folder.locator` / `e009.status` | R11 can verify Box 7/Folder 14 and deadline without opening it. E009 is `unavailable`, `certified_derivative`, or `lost_original`; `lost_original` never upgrades to derivative without a pre-existing lawful copy receipt. |
| `preservation.status` | `none`, `challenge_pending`, `pause_active`, `pause_denied`, `direction_pending`, `direction_issued_unacknowledged`, `effective`, `denied`, `expired`, `disposal_unknown`, `destroyed_confirmed`. `effective` requires valid GIRRO direction, verified service and CRCU acknowledgment **before actual disposal**; only it emits E020/R15/K14. A late ACK cannot restore a disposed original. |
| `welfare.status` | `lead`, `inquiry_pending`, `attested_limited`, `failed`, `nonconsenting`. K11/R12 to Sophie only after signed live-plus-second-channel attestation, Daniel's consent and explicit delivery. Pending/failed/nonconsenting grants no alive claim. No address field. |
| `case.proof` | Independent records may establish version/route/CO/false-correction claims. `diversion_authorizer_established` requires E009 or equivalent **pre-existing independently authenticated direct order** plus role match; loss route defaults to `authorizer_unresolved_publicly`. |

**General transition rule:** an incoming artifact, screen view, draft reply or optional relationship score cannot add a fact to an NPC. A fact moves only by that NPC's initial knowledge, actual independent acquisition, or a recipient-scoped R/distribution event. No player-authored outgoing message exists until the player previews and presses Send. Event IDs must be stable and idempotent on resume; this is a future implementation test, not an implemented guarantee.

## Calendar and episode entry contract

| Episode | Fixed or planned window | Entry and exit guard |
| --- | --- | --- |
| E01 | **8 Oct, Day 1** | E001/E002 comparison; E012 request/release may follow. No compulsory Archive/Messages join. |
| E02–E03 | **9 Oct** | Personal context and source comparison; optional character contacts do not authorize official records. |
| E04 | **10 Oct** | E013/E014 separately requested and issued under D16; no Lucas photo dependency. |
| E05 | **11 Oct** | A consented/custodian-released redacted Session 02 excerpt may appear; on refusal, only catalog and independent public records appear, with no forced protected quote. K07 identity withheld by default. |
| E06 | **12 Oct** | `E-I` full field and Ana's granular consent; any insurer retention-footer view requires its own lawful scope. If inaccessible, E07 opens from the independent 26 Sep public disposal notice. `7-14` remains unverified until R11. |
| E07 | **12 Oct 15:00–13 Oct 14:00** | Exit requires R11 and a recorded pause `active/denied/pending` status. E009 may be absent on denial, pending or delayed-copy variants; whenever present it needs lawful supervised release. |
| E08 | **13 Oct 15:00–14 Oct 08:00** | Enter after E07's recorded outcome even if E009 is unavailable. Exit requires a recorded welfare inquiry result (`attested_limited`, `failed`, `nonconsenting` or `pending`) and the historical work-order lead; K11 is not forged to advance. |
| E09 | **14 Oct 09:00–16:00** | Enter with E08's recorded inquiry result, **not** a mandatory K11 true flag. Historical E015/E019 comparison proceeds; risk-only GIRRO request may run early if pause denied. No automatic K13 on missing E009. |
| E10 | **14 Oct 16:00–15 Oct afternoon** | Enter from E09's submitted packet **or recorded substantive denial**; E009 may be unavailable. Direction/ACK or refusal status, source-cited submission and qualified outcome follow. The 15 Oct **date** is fixed; an exact destruction hour is not. |

## E01 scene repairs — R01, optional channels, R03 and E012

| Existing ID | Trigger / owner action | Receipt, knowledge effect and fallback |
| --- | --- | --- |
| E01-S01–S07 | Player opens case and compares E001/E002/E003 public views; player selects observed differences. | K01 is a lead, not verified history. No NPC receives player's private annotation. |
| E01-S08–S10 | Player chooses anonymous or handle, previews exact text and presses Send at S09. | R01 records tip ID, token, mode, recipient, facts, time. If unsent, draft persists without Maya knowledge; public E012 inspection remains available, but Maya's reply/social E01 sequence waits for an explicit tip. No automatic Send or invented no-tip Maya invitation. |
| E01-S11–S15 | Maya replies **inside Bulletin return-token inbox**; S12 verifies her public editor listing. Player's R02 follow-up needs a separate Send. | No Messages access, legal identity or metadata from an anonymous/handle tip. If no tip was sent, these scenes remain pending while public records may be inspected; do not fabricate Maya's reply or declare E01 complete. |
| E01-S16–S17 | Maya offers two controls: `Connect in Messages` and `Open read-only Archive`. Player may accept either, both or neither. | Offer event ≠ R03. `CONN-E01-01` only on Messages opt-in; R03 only on Archive acceptance, naming owner, folder scope and time. Decline is reopenable. |
| E01-S18–S24 | Accepted path may tour permitted Archive; declined path inspects public Bulletin/Browser/Files E001 provenance and E003 revision notice. S24 personal Daniel fragment is optional/permissioned. | Both paths reach S25/E012. No mandatory evidence locked behind R03 or trust. |
| E01-S25–S26 | Maya check-in uses token inbox or consented Messages; player previews and Sends response if chosen. | Recipient-scoped receipt for selected facts only; no automatic player bubble or group knowledge. |
| E01-S27–S29 | Player explicitly requests GCRO redacted export; custodian issues; player validates request order, issuer, lineage, page/redaction and integrity. | R04 initially to player alone. K02 only if `lineage_verified`; delayed/invalid request returns a specific repair, not a fabricated proof. |
| E01-S30 | Player opens the fictional portal desk's public correction-role **capability** card under [contract A](../phase-01g/GATE_A_SOURCE_AND_EDITORIAL_CLOSURE.md), after E012 verification. | A valid card proves `roleEnabled` only, not current operator, Vivian guilt, Daniel location, Ana identity or `7-14` meaning. If the card is unavailable/invalid, use the narrower public correction-service availability notice and an unresolved process question; grant no enabled-role fact. |

**First-play pacing:** S01–S12 offers active comparison, tip and Maya source-check as a roughly 20-minute *authoring target*, never a real-time gate. The older P01 A1/A2 minute splits are planning estimates; no measured playable pace is claimed. E01 continues to S30 and the verified export rather than ending at the early hook.

## E04–E06 independent sources and witness boundary

| Existing IDs | Trigger / owner action | Receipt and fallback |
| --- | --- | --- |
| E04 source check and E04-S16 | Player requests E014 from shelter and E013 from transit through separately verified channels. Custodians, not Lucas, decide releases. | Two independent issue/custody records precede R07 named-recipient share. If one fails, K05 stays at its supported level and a certified source-specific summary/review route is needed; no Lucas-photo shortcut. |
| E05-S10/S20 and E06-S02/S07/S10 protected witness scenes | Insurer releases a redacted E006 text derivative only after Ana's A01 **and** custodian approval; A02 is a separate optional audio grant to a named reviewer. Ana controls A00–A05. | R08 never reveals K07. On A01 refusal or failed release, no protected line is quoted, no K06 from an unheard line, and no audio is played. E05's alternate cliffhanger uses the permitted insurer catalog plus E013/E014/E018 question; E06 checks catalog, form key and independent timeline. A custodian summary is **not automatic**; it needs its own accepted rule and weaker `REPORTED` scope. R09 remains Ana-recipient-specific; E017 identity/romance optional. |

## E07–E10 preservation, welfare and attribution variants

| Existing ID | Variant trigger / actor | Receipt, gate and consequence |
| --- | --- | --- |
| E07-S01 | Player opens the insurer retention footer **only if lawfully released**; otherwise opens the independent 26 Sep public disposal notice/index listing. | Either route poses the `7-14` records question without disclosing Session 02 private content. E07-S05 and R11 still verify the Box/Folder mapping and 15 Oct risk; no relationship or A01 permission gate on preservation. |
| E07-S07 | Player reads Daniel's 2 Oct intake/deficiency. | `INT/DEF` show incomplete filing **without a hold**; Daniel still knew the folder risk. |
| E07-S11–S12 | Custodian issues R11 storage-index extract. | Verifies K10/locator and 15 Oct date only, never folder content. |
| E07-S13–S14 `{pause_active}` | Eligible counsel Sends challenge; CRCU duty officer signs pause. | `PAUSE-13-02` with expiry/scope; `COPY-13-02` may follow. `challenge_pending` cannot unlock E009. |
| E07-S13–S14 `{denied|delayed}` | CRCU names deficiency/denial; player reads it. | `DEN-13-02` or pending receipt. No pause badge. Player may prepare proposed GIRRO risk packet; not a promise of approval. |
| E07-S15–S17 `{copy}` | CRCU supervises and releases certified E009 derivative. | Player inspects permitted copy; `V.H.` is only a lead until E015/E019. No simulated player entry into storage. |
| E07-S15–S17 `{no_copy}` | No lawful access or supervised copy delayed on 13 Oct. | Scenes show the **absence of a copy**, not a claim that the original was destroyed before 15 Oct. Independent E013/E014 comparison remains; E009 is unavailable and E07 exits through a **pending risk route**, not a fake carbon reveal. |
| E07-S19–S20 | Player saves packet draft, then inspects suspicious welfare signal. | Packet draft is not sent. Relay is unverified, not K11. |
| E08-S01–S10 | Player distinguishes device/relay from person and selects independent counsel channel; Sophie may authorize limited inquiry. | No Daniel location. Counsel directory/callback is independent of suspicious message. |
| E08-S11–S17 `{attested}` | S11 shows scope/pending inquiry; counsel performs live plus second-channel check; S12/S16 validate; S17 chosen messenger explicitly Sends. | Signed `ATT-R12-14-01` and R12 give Sophie only time-bound alive/able-to-respond statement. No “safe yes” at S11. |
| E08-S11–S17 `{failed|nonconsenting|pending}` | Challenge, callback, second review, consent or delivery fails or remains incomplete. | Welfare remains unresolved, no K11/R12; Sophie receives only a truthful permitted update after explicit Send. E08-S18–S20 still passes the historical work-order lead to E09. The former mandatory welfare reveal is superseded under `Gate-A-01`. |
| E08-S18–S20 | Daniel direct contact optional; historical work-order route still opens E09. | No forced reply from Daniel; his location never transfers. |
| E09-S01–S10 | Player may seek Daniel contact or certified work order; custodian E015 proves publication event. | R13 is optional admission; K12 factual route from E015 survives silence/low trust. |
| E09-S11–S17 `{e009_available}` | Compare carbon order/safety notice, E015 correction audit and E019 role roster. | R14/K13 may reach corroborated/established only after source and role checks. No current credential operator inference. |
| E09-S11–S17 `{e009_unavailable}` | Player compares only lawfully available E013/E014/E006/E018/E015/E019 and records the missing direct order. | E015 public event sequence and counsel/oversight-only E015/E019 actor review stay distinct. False-correction actor can be supported to the degree checked; the individual 21:48 diversion order is **not publicly established** without a pre-existing authenticated direct order. R14 names recipient and exact proved/unknown facts. |
| E09-S19–S20 | Eligible actor sends normal or risk-only GIRRO packet; player receives pending receipt. | `PENDING` never E020. If denial is already substantive, prepare independent-copy packet, not a second invented power. |
| E10-S01–S05 | Player checks deficiency, locator, signer and Ana scope; missing item has sourced repair or stated unresolved result. | Counsel/authority fields cannot be filled by a civilian relationship choice. |
| E10-S07–S09 | Player cross-checks available E009 (if any), E003/E012/E015 and E013/E014/E018. | Case Board records `source_missing` and claim-specific proof thresholds. No skipped E009 scene grants E009 fact. |
| E10-S11–S13 `{effective}` | Eligible actor Sends repaired request; GIRRO issues a valid direction; CRCU receives/verifies service and ACKs **before actual disposal**; player inspects signed pair. | E020/R15/K14 only after valid DIR, service and timely ACK. S13 shows limited scope/expiry, not a solved-case banner. |
| E10-S11–S13 `{denied|unserved|unacknowledged|late_ack}` | Named denial, failed service, absent ACK or ACK after disposal is recorded. | No E020/R15/K14 or retroactive preservation. Player can prepare independent-copy submission. If original status is uncertain, display uncertainty; no automatic destruction. |
| E10-S14–S15 | Player selects Protect & Verify / Public Pressure / Legal First and previews recipient/fact/redaction set; explicit Send. | `DISTR-E10-...` scoped event; `IND-SUB-14-01` is receipt for independent-copy lodging only, **not** a preservation direction. Ana identity cannot be disclosed by strategy alone. |
| E10-S16–S18 | Case Board validates each claim at its available proof threshold; Vivian response is logged as a claim; human callbacks reflect player conduct. | On loss route, no full K13/automatic correction. Daniel publication remains accountable. |
| E10-S19–S20 `{preserved|loss_confirmed|status_unknown}` | CRCU status/custody log checked on 15 Oct; epilogue reports the actual state. | Preserved: original remains subject to direction. Loss: original unavailable, sourced challenge/review lodged, individualized diversion order unresolved absent independent direct copy. Unknown: say pending; no success/failure fabrication. Formal correction or conviction never automatic. |

## Publication and spoiler guards

The private author truth (Vivian's unsafe order, Ana = Participant B, Daniel alive and his undisclosed location, `E-I`, `7-14`) does not appear in home screen, public metadata, initial notifications or character speech before its evidence/consent gate. An E01 capability card says **enabled role, operator unknown**. The denial outcome never turns a lower-grade inference into a named public accusation to simulate closure. Every public/oversight packet passes explicit Ana redaction and recipient preview.

**Acceptance boundary:** the owner approved `Gate-A-01` editorial adoption and the 21 design policies remain approved. [Final Gate A verdict](../phase-01g/GATE_A_FINAL_VERDICT_AND_HANDOFF.md) records the narrow design recheck. Final fictional asset issuance/transfer, full dialogue, executable graph, receipt idempotence, save/restore, measured timing and physical-device tests are later work; no such gameplay result is claimed here.
