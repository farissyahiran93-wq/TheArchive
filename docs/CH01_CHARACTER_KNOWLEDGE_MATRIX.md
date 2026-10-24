> Superseded where it conflicts: the latest official implementation source places Unknown Sender in Scene 02, Nora’s retained page in Scene 08, Archive first investigation record in Scene 04, and the recovered post-verification claim in Scene 15. Scenes 04–18 now have playable structural previews. See [current implementation report](CH01_OFFICIAL_IMPLEMENTATION_REPORT.md). Earlier material below is retained as editorial history.

# Chapter 1 character knowledge matrix

The 23 October master outline supersedes earlier editorial numbering for new games. Mention, artifact appearance, direct introduction and group membership are separate events. Proposed scene gains below require later approved scripts; this document grants none.

| Character | Earliest appearance / direct route | Group membership | Knowledge acquisition and restrictions |
|---|---|---|---|
| Player | 01, Sophie first contact | Explicit JOIN in 02 | Receives delivered testimony only. Optional branches in 03 do not retroactively award every biographical fact. Private inspection does not disclose to anyone. |
| Sophie | 01 / unknown number identifies herself | 02 member; offline is not departure | Knows only player messages actually sent to her. Optional codename requires authored disclosure. Supplies 03 testimony; proposed 08 note source and 12 Eli introduction need future scripts. |
| Maya | 02 | Remains after temporary offline; no invented exit | Group receipts exclude offline recipients according to the existing runner. Private player material is never automatically shared. Proposed 13 conversation and 17 public conclusions require actual receipt. |
| Lucas | 02 | Leaves in 02 on every authored route | Departure blocks group delivery. Proposed 14 DM does not rejoin him. Proposed 17 return requires separate consent and persisted system event. No automatic access to other DMs. |
| Nora | Proposed 04 public byline, 07 reporting contact | Independent in the new Chapter 1 plan | Public reporting identity is not permission to know the player's phone number. Authenticated return route and player-selected Send establish communication. No SPY, Mirror or private note knowledge by default. |
| Eli | Mentioned in selected 03 testimony; proposed 12 direct introduction | Not a member of replacement 02 | Female Daniel colleague; employment details depend on actual 03 branch. Sophie introduction/authorized contact required before new direct messages. General technical help does not imply access to unsent records. E—I remains unresolved. |
| Daniel | 01 testimony; proposed 10 recovered records | No new live participation | Recovered records are artifacts, not current messages or proof of identity. No player action can send as Daniel. |
| Unknown Sender | Proposed 09 grounded request | None | Apparent sender, authority, motive and relationship to Archive remain unverified. Do not equate installation with trust or ownership. No automatic private knowledge. |

## Runtime inspected

`src/game/scene01.ts` handles delivered group/private receipts and the 5.5-second handoff. `src/content/scene03.ts` attaches heard facts to specific authored lines. Scene 03 police-report fact is 06B-only; wedding and employment details vary by branch. `src/game/chapter2Reunion.ts` maintains recipient-limited historical Chapter 2 receipts and member flags. Neither the planning registry nor the profile/bio UI changes knowledge.

## Existing save compatibility

Historical Chapter 2 saves retain their existing Eli membership and authorized Scene 08 Maya invitation/Nora add event. Those events are not transplanted into new Chapter 1 Scene 08, which is now a proposed Sophie note scene. Historical Nora membership adapters remain limited to that historical controller and award no retrospective knowledge. Existing conversations and relationship values are never rewritten to match this matrix.

## Disclosure contracts

Every future disclosure needs source IDs, recipient IDs, selected scope and a delivered event receipt. Refusal preserves the private source. Offline/member status must be checked at delivery time, not inferred from viewing a roster. A chapter completion checklist may summarize earned facts but never grant unheard facts. Romance never increases merely because the player is kind, and evidence never requires premium or romance.

## Opening source revision

The later owner direction replaces early damaged-note claims with a reported unnamed, unlabelled, starred number in a saved export labelled as Daniel’s contacts. The star’s author and meaning remain unknown. No active first-three-scene line awards note knowledge. Existing historical receipts remain retained rather than erased. See OPENING_STARRED_CONTACT_REVISION.md for the revised dialogue and delivery-specific receipt rules.
