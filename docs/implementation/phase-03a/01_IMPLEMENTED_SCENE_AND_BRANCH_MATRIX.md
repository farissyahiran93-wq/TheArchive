# Implemented scene and branch matrix

Source is the Phase 02C six-Act screenplay, its B01/P01/P02 props and I01/I02 contracts. The text in `src/content/e01Slice.ts` carries the accepted public brief, source rows, tip and Maya's S11 turns. UI labels, source cards and setup instructions are small presentation adaptations. Records are **fictional Greyhaven assets**, not real agency documents. All implemented narrative transitions and rewards are in `src/game/slice.ts`; `src/ui/BulletinSlice.tsx` renders and requests actions.

| Canonical scene | Runtime action and exit | Status |
| --- | --- | --- |
| `E01-S01` | Player supplies a 2–24 character display name in setup; `EV-E01-S01-IDENTITY` is stored once. No character relationship activates. | Playable |
| `E01-S02` | Home shows Greyhaven date and public Bulletin card; tap Bulletin, then the brief, for S03. Other phone apps can be opened and left. | Playable |
| `E01-S03` | B01 teaser, portrait description and complete public article. `K03`/brief-read event only on **Read full brief**. Older preview opens S04. Final portrait art is absent. | Playable, text-first |
| `E01-S04` | E001 cropped v1 preview states its source limit. Player explicitly pins the June row as an observation before S05. It is not an authenticated original. | Playable, text-first |
| `E01-S05` | E002 public redacted v2, source details and same record identity. Compare moves to S06. | Playable, text-first |
| `E01-S06` | I01 asks which visible field differs. Three wrong/uncertain options give specific feedback, attempts persist and three nonpunitive hints are available. Only escort-row selection moves to S07; the player can recheck before saving the lead. | Playable |
| `E01-S07` | `P-S07-A/B/C` select three distinct interpretations. Explicit Board-save action stores `K01` as **LEAD**, never certified evidence; then S08. The Board card is represented in saved state and this screen, not a full Board app. | Playable; Board UI partial |
| `E01-S08` | `C01-TIP.A/B`: anonymous return token or chosen handle. Draft and handle survive app switching/reload. Reader and privacy scope is displayed. Player may leave without sending. | Playable |
| `E01-S09` | Review recipient, return route and exact public observation. **Send tip** creates `R01` once; Back to draft sends nothing. No number, contacts, GPS, private Board or original crop is shared. | Playable |
| `E01-S10` | Displays `R01` delivery and anonymous/handle route. Maya's first reply is scheduled only after Send; an unopened/no-reply state remains available until delivery. | Playable |
| `E01-S11` | Maya's authored reply appears in a Bulletin case inbox, separate from Messages. Player may select then explicitly Send `P-S11-A/B/C`; `D/E/F` are optional only after A/B. The quiet C route omits Maya's personal continuation. First delivered reply applies D21 baseline once: handle `52/45/20/0`, anonymous `50/45/21/0`. | Playable |
| `E01-S12` | Public listing `MP-DM-07`: code **and** return route validate the editor channel. Name/photo or receipt-time answers receive corrective feedback. Check event persists. The authored three-step hint ladder, `P-S12-A/B/C`, subsequent Send and S13 are not integrated. | **Partial, valid 03A checkpoint** |

## Contract and receipt boundaries

| ID | Runtime condition | Limit |
| --- | --- | --- |
| `E001` | S04 row inspection | Cropped public preview; `verified=false`. |
| `E002` | S05 public copy opened | Current redacted v2; `verified=false` as historical proof. |
| `K03` | Full B01 article opened | Public-brief knowledge only. |
| `EV-E01-S06-COMPARE` | Correct I01 escort answer | Visible difference, not motive or authenticity. |
| `K01` / `EV-E01-S07-LEAD` | Correct I01 and explicit S07 Board Save | Player-only source-limited lead. |
| `R01` | Explicit S09 Send once | Maya receives only the authored public observation and public links; her knowledge is recipient-specific. |
| `EV-E01-S11-MAYA-REPLY` | First due reply after R01 | First-contact relationship values and notification once. |
| `EV-E01-S12-EDITOR-CHECK` | Case code plus return route | Checks channel only, not the image, issuer or full file. |

No `R02`, `R03`, `R04`, `E012` or `K02` is issued in this slice. In particular, merely viewing E001 cannot authenticate the image or reveal Daniel's welfare. Search and Maps remain the earlier fictional sample apps; they are not Episode 01 evidence routes. I01 source comparison is presented within Bulletin instead of fully realized Photos/Browser/Files/Board apps; cross-app media handoff is a Phase 03B presentation task.

**Deferred scene content:** `P-S12-A/B/C` and S13–S30; S13/S14 optional source sharing and refusal; I02 image/text/defer end, I03–I07; E012/GCRO export and later receipts; S30 role-only cliffhanger. A player who declines the S08 tip may safely leave and return to the saved draft, but the authored later no-tip research path is not playable in 03A.
