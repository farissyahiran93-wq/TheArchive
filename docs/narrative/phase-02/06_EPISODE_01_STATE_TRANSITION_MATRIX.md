# Episode 01 state transitions and recovery

**Design graph, not runtime behavior.** `Sxx` abbreviates accepted `E01-Sxx` only inside this table. Every row's displayed text and decisions are in the six Act files. All scene exits are action/state gates, never elapsed wall time. `Resume` means return to stored scene, open panels and composer draft; it cannot emit Send or a source receipt by itself.

| Scene | Entry / required state | Exit and permitted next | Recoverable hold or skip |
| --- | --- | --- | --- |
| S01 | New E01 | valid display name → S02 | invalid field stays S01. |
| S02 | setup saved | open Bulletin → S03 | other empty apps/back harmless. |
| S03 | Bulletin brief | open E001 → S04; K03 public read | timeline optional. |
| S04 | brief/E001 | inspect June row → S05 | zoom/text equivalent, reopen. |
| S05 | public E002 | compare → S06 | source drawer/reopen. |
| S06 | E001/E002 viewed | correct visible field → S07 | wrong mark undone/hinted. |
| S07 | visible difference | private lead saved → S08 | all three expression choices converge. |
| S08 | lead; tip form | privacy choice + preview → S09 | unsent draft can wait; public S18/S23/S27 accessible. |
| S09 | reviewed draft | **Send** accepted/R01 → S10 | fail/draft stays; no Maya reply. |
| S10 | R01 | inspect receipt, Maya delivered → S11 | public research playable during delay. |
| S11 | Maya token reply | editor listing → S12 | outgoing option optional, baseline once. |
| S12 | public directory | match MP-DM-07 → S13, or → saved S30 entry if K02 was independently completed earlier | wrong match retry, no trust shortcut; late tip does not disclose E012. |
| S13 | checked channel | selected Send, privacy deferral or public path → S14 | no Send means Maya knows no new fact. |
| S14 | optional share sheet after S13 | cropped image/text R02 or decline/silence → S15 | Maya's ask appears only after S13-A/B; after C/silence sheet is player-initiated. |
| S15 | transfer explanation card | direct source conversation after R02 or `P-S14-DEFER` → optional S16; public/no-share card → S18 | no unsolicited Maya confession or offer; amendment never certifies crop. |
| S16 | player taps “Review optional connections” after direct S15 | Maya explains offers → S17, or stay public → S18 | no-tip/no-share path skips; no receipt on viewing offer. |
| S17 | offer | each permission independently handled → S18 | both decline accepted; reopen later. |
| S18 | public or Archive | inspect source status → S19 | R03 not required. |
| S19 | E001 metadata | stamp carrier understood → S20 | no proof upgrade. |
| S20 | E003 public notice | notice read → S21 | actor query returns unavailable. |
| S21 | three dated cards | tentative correct order → S22 | reorder/undo. |
| S22 | ordinary-correction test | independent-source question → S23 | alternative remains open. |
| S23 | fictional Search | SR-01 source chosen → S24 | SR-03 false match and arbitrary query recover. |
| S24 | SR-01 | note view/skip → S25 only if prior direct Maya source conversation and player opens check-in; else S27 | R03 fragment optional. |
| S25 | player opens optional Maya check-in | selected Send; discuss notice → S26 or continue request → S27 | no emotion gate; quiet player receives no forced check-in. |
| S26 | player taps “Discuss revision notice” after S25 | C03 Send or private → S27 | skipped check-in goes straight S27; score never gates request. |
| S27 | GCRO public request | Submit eligible → S28 | pending/refused token or scope: explicit repair/review; no R04. |
| S28 | eligible issue | four checks pass on the **actual issue** → requester R04/S29 | missing/invalid/late: correction request, remains S28/S27; a visible Page 2 field alone cannot grant R04. |
| S29 | valid R04 + E003/E002 | correct citations plus explicit **Save corroborated finding** → K02; S30 if R01/S12 exist, else public card or S08 voluntary tip | wrong proof/motive or unsaved draft: hint/retry; no K02. |
| S30 | K02 + R01 + S12 editor check | valid role card or honest fallback; End episode → complete | no-tip K02 may inspect public service page but finale waits for explicit tip and editor check; invalid card cannot grant role fact; no early E02. |

## Reachability and negative edges

`S08 draft → S09 no Send` never reaches Maya. `S09 Send → S11` is the only first contact in E01. `S14 silence → S15 public card → S18 public → S24 → S27` is valid without S16/S17/S25/S26. `S17 Messages decline + Archive decline → S18 public → S27` remains valid when the offer was voluntarily opened. `S27 request submitted → S28 pending` is **not** success; an actual eligible valid issue and check is needed. `S28 invalid/late/refused → S29` is forbidden. `S29 K02 → S30 card invalid` uses the narrower process hook only after R01/S12. `S30 role card valid → operator known` is forbidden.

The no-tip route can research public material and even request GCRO independently, but E01 completion is held until R01 and S12 are genuinely completed. A player who already saved K02 keeps E012/R04 and the Board card. S30 offers a **draft** containing only the public E001/E002 observation and links. Only an explicit S09 Send creates R01; after Maya's reply and S12 directory check, “Return to saved finding” enters S30 without redoing S27–S29 or opening S13–S17. No private audit is disclosed. This is an intentional, recoverable narrative gate rather than a no-tip alternate completion.

**Resume/idempotence contract:** persist source view/annotation state, composer draft, selected recipient preview, actual sent receipt, permissions, export revision/check outcome and board citations independently. On reload, show the last screen without generating player text. Replayed Maya notification is read-only if already delivered. A new source revision invalidates only check results tied to old bytes, not the player's public comparisons. Gate B must test these rules; none are claimed implemented here.
