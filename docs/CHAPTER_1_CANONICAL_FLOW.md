# Chapter 1 — The First Trace

GREYHAVEN is the game, TheArchive is its repository, TRACE is its recovery application, and Same Old Chaos is its group chat. The campaign registry is `src/game/campaign.ts`, which consumes the official titles from `src/content/masterChapterMetadata.ts`. Chapters 2–5 contain planning entries and have no playable chapter selector action. The recovery milestones are 20%, 40%, 60%, 80% and 100%.

| Scene | Official title | Playable transition |
| --- | --- | --- |
| 01 | A Message from Sophie | Sophie describes an unnamed, starred number in a derived export. The invitation shows the seven original friends. Join opens the group directly. |
| 02 | Same Old Chaos | V4 delivers ten decisions with explicit Send. Daniel is offline. The roster grows from seven to eight when the player joins, then drops to seven when Lucas leaves once. His optional private conversation is separate. |
| 03 | Just Between Us | The player opens Sophie's private message manually and sends replies through Goodbye. |
| 04 | The Unknown Sender | V5 introduces the discrepancy between two contact copies and previews TRACE. The player can accept, defer, decline or reconsider, then explicitly install. |
| 05 | The Digital Archive | After installation, the player sends confirmation, accepts the archive and initiates recovery. TRACE interrupts at 20% and retains recovered Messages, Notes and Activity Logs. |
| 06 | The Missing Hour | The player opens Activity Logs and chooses Discuss with Unknown. The 19:00–20:00 gap remains unexplained. |
| 07 | Sophie’s Call | A sent reply precedes the call. Sophie sends Daniel_Contacts_Export and keeps the full document private. The player can submit only its damaged fragment for temporary analysis. |
| 08 | Maya’s Last Check-In | The player opens Maya's screenshot and discusses Daniel's reference to Lucas and “another copy.” |
| 09 | The Secondary Card | Maya shares GH-DSC-03-A in the same conversation. The player may explicitly send a limited clue to Unknown. |
| 10 | The Warning | The public inventory matches the reference. A separate physical handwritten card appears in Sophie's final call. The warning ends Chapter 1 and marks Chapter 2 — The Other Copy as the next chapter. |

The seven original members are Daniel Mercer, Sophie Mercer, Maya Chen, Lucas Grey, Noah Reed, Ana Pierce and Eli Ward. Membership determines group receipts. Presence determines online indicators. Private messages require explicit recipient receipts. The identities of Eli and Unknown remain separate in player-facing Chapter 1 surfaces. Group access does not expose private conversations, and external evidence does not increase TRACE recovery. The Investigation Board is a separate app.

The ending is **DO NOT CONTACT THE STARRED NUMBER**. Scene 10 is the final playable scene in Chapter 1.

## Save compatibility

Continue keeps stored dialogue revisions inside the approved campaign. Play from Scene 2 opens V4 and Play from Scene 4 opens V5 from compatible entry checkpoints. Older campaign saves are available to download. An explicitly confirmed New Game archives the old primary save and retains device preferences. The normal game never converts an older campaign's progress into completed current scenes.

Archived implementation reports and source briefs describe historical decisions. Use this document and the registry for current gameplay instructions. The `compatibility-qa` browser mode is reserved for historical regression fixtures.
