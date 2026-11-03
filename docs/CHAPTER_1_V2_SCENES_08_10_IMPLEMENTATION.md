# Chapter 1 v2 — Scenes 08–10

## Runtime route

Scene 07 completion permits manual entry to **The Last Check-In**. Scene 08 completion permits manual entry to **The Secondary Card**. Scene 09 completion permits manual entry to **The Inventory Sheet**. The v2 states are optional fields under `chapter1`; old Byline, Missing Issuer, Transfer Register, Inventory Sheet and historical saves are not migrated or reset.

Scene 08 delivers Lucas's preserved text capture directly unless his relationship suspicion is high or trust is very low. Then Maya mediates the same mandatory lead without inventing a direct Lucas conversation or awarding Lucas knowledge of the player's response. The captured line about looking at another copy is treated as received, unauthenticated evidence. Date, source, completeness and authenticity are separately inspected. The original screenshot pixels are not available; the UI states this explicitly.

Scene 09 gives Maya a private contact route and a separate photographed reference card carrying `GH-DSC-03-A`. The original photo pixels are not available. The player inspects its visible reference and unknown origin, then compares the Lucas capture, relevant public references, and the starred entry if retained. Case Board connections remain private theories. The secondary reference card is distinct from the warning card discovered in Scene 10.

Scene 10 requires inspection of the public series transfer, finding aid, box index, publisher reference limits and board comparison. The public `GH-INV-2022-063-EX1` lists Box 03 `GH-PN-BOX-03` with descriptor reference `GH-DSC-03-A`; descriptor body and item list are absent. No `GB-REF-017` match or issuer is awarded. A private conclusion leads to Home, then a persisted short delay schedules Sophie's incoming call. Answer, decline, missed call and callback routes are explicit. Mandatory information appears on the call; decline and missed routes retain voicemail and callback. The warning card's writer, date and authenticity remain unknown. The player's number `555-0147` is fictional in-game data and is never read from the device.

The chapter ending uses separate `CH1-V2-COMPLETE` and optional `inventoryFinaleV2.complete` markers. Chapter 2 continuation accepts either the existing complete Chapter 1 route or the v2 finale and still requires the player to press Continue. Replays and repeated completion actions do not award duplicate events. The old `chapter1.completed` sequence is unchanged.

## Verification

Automated tests cover both Scene 08 contact routes, Scene 09 provenance and prerequisite gates, all nine combinations of the two call choices, decline, missed and callback routes, save normalization, idempotent completion, and the Chapter 2 gate. A browser test covers the Home pause, incoming call, explicit choices, warning and ending. Actual command results are reported in the delivery response.
