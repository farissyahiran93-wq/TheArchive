# THE ARCHIVE — Story Bible v2 ruling and Episode 01 contact map

> **21 October 2026 authorial update:** The supplied Story Bible V6 supersedes this document's proposed *new-game* character canon. V6 makes Eli an initial FIND DANIEL member, requires Lucas then Maya to leave while Sophie remains, and assigns independent Bulletin authorship to Nora. The group membership and departure order have been implemented; the Bulletin and Evidence 002 restructuring remain open. See [the V6 implementation audit](EPISODE_01_FINAL_V6_IMPLEMENTATION_REPORT.md). This historical v2 record remains for save-compatibility and decision provenance; it is not current acceptance evidence.

20 October 2026. This document records the author's supplied ruling for **new phone-first games**. It supersedes older notes that place Maya's first player-visible introduction after the recovered mirror. Existing v2/v3 saves keep their actual history and are not rewritten.

## Chronology and stable events

| Order | Event / scene | Player-visible action and knowledge limit |
| --- | --- | --- |
| 1 | `OPEN-V4-FIRST-CONTACT` / E01-S01 | Sophie first contacts an unlocked, freely usable phone as an unknown number. No other NPC speaks to the player first. |
| 2 | `OPEN-V4-FIRST-REPLY`, name and address Sends | The player chooses a reply, types a name and selects an address preference. Sophie learns only these sent answers. |
| 3 | `OPEN-V4-FIRST-PAGE`, `OPEN-V4-SOPHIE-OFFLINE` | Inline partial-page image; no recovery token or index mismatch. Sophie pauses; pending connection is not mirror access. |
| 4 | `OPEN-V4-GROUP-CREATE`, `OPEN-GROUP-*` | Sophie creates FIND DANIEL and adds the player, Maya and Lucas. Maya's **first direct on-screen message** is here. Group claims have recipient-specific receipts and are not authenticated mirror facts. |
| 5 | Group conflict, departures, `OPEN-SECOND-*` | Lucas then Sophie leave. Sophie returns privately; full note and recovered-device authorization follow only after the player's second private Send. |
| 6 | E01-S02–S10 | Existing Bulletin and Bus 4 public comparison continue. The 14/13 mirror mismatch and Bus 4 escort mismatch stay distinct until provenance is checked. |
| 7 | E01-S11, `EV-E01-S11-MAYA-REPLY:*` | Maya answers the public tip as a **follow-up** with someone already encountered in FIND DANIEL. She receives only the sent public tip, not private mirror evidence. |
| 8 | E01-S12–S17, `CONN-E01-01` | Existing editor check and optional Messages connection. Acceptance permits Maya's later Messages channel; declining leaves the public investigation intact. |
| 9 | `ARC-E01-MAYA-REFERRAL` | Maya offers public-fact case contacts after editor-channel verification, group history and K01. It arrives in the Bulletin return-token channel unless Messages was separately accepted. This new referral is an authored bridge, not proof of any source. |
| 10 | `ARC-E01-LUCAS-*`, `ARC-E01-ELI-*`, `ARC-E01-NORA-*` | Distinct optional two-way private exchanges. Each requires a player Send and delivered NPC reply; no private recovered record is automatically shared. |
| 11 | `ARC-E01-GROUP-PROPOSAL`, `ARC-E01-GROUP-LUCAS-REJOIN`, `ARC-E01-GROUP-LUCAS-SOURCE` | After a Lucas private answer, Maya proposes a public-only comparison in the old group. The player can defer or consent. Lucas rejoins through a saved system event before speaking. Sophie is not silently restored. |
| 12 | E01-S18–S30 | The existing public/custodian investigation, optional locks, source gates and S30 conclusion retain their scene IDs and semantics. The added social exchanges do not award K01/K02/R04 or gate S30. |

The existing [`EP01_SOPHIE_FIRST_SCENE_BIBLE.md`](EP01_SOPHIE_FIRST_SCENE_BIBLE.md) remains useful for the 30-scene evidence sequence; its later-first-Maya chronology is superseded for new games. The original `mayaOpening[0]` line remains for old v2/v3 saves and is replaced at delivery for a v4 save with a recorded Maya group message. No existing canonical scene identifier was renumbered. That Maya line is the only existing dialogue adjusted for continuity; the new referral and contact exchanges use new `ARC-E01-*` event IDs.

## Contact and disclosure matrix

| Character | First player-visible appearance / channel | Unlock and first meaningful exchange | Knows / does not know | Exit and recovery |
| --- | --- | --- | --- | --- |
| Sophie Mercer | Unknown private message, E01-S01 | Player's explicit first reply, name/address Sends | Knows her own contact claim and what the player sends; no unshared mirror discoveries | Goes offline, then returns privately after group fallout; old thread persists. |
| Maya Chen | FIND DANIEL group, `OPEN-GROUP-*` | Group dialogue; later public Bulletin tip R01 and reply | Group claims and delivered public tip only; never automatically receives the player's mirror copy | Bulletin and optional Messages connection; referral after editor check, on the authorized channel. |
| Lucas Grey | FIND DANIEL group | `ARC-E01-LUCAS-INTRO` after Maya referral, K01 and the preserved group exchange | Public Bus 4 observation and his own limited fleet perspective; cannot authenticate a full dispatch original or infer guilt | Leaves initial group; may rejoin after private answer, Maya proposal and player Send. |
| Eli Ward | Maya's case-contact referral | `ARC-E01-ELI-INTRO` player Send and delivered reply | General limits of damaged data; no private file is transferred; `E—I` does not identify Eli | Optional thread remains accessible after opening; no mandatory clue is withheld. |
| Nora Vance | Maya's case-contact referral | `ARC-E01-NORA-INTRO` player Send and delivered reply | Public source comparison and verification method; no private identity or full audio is disclosed | Optional thread remains accessible; source, interpretation and conclusion remain separate. |
| Daniel Mercer | Recovered device records, not a live direct exchange | No live contact is implemented or inferred from device access | Recovered records are unverified until individually checked; device access is not a Daniel relationship receipt | Existing mirror and S30 path unchanged. |

The Lucas, Eli and Nora exchanges offer three replies each. Eli's technical explanation follows the established [character voice guide](narrative/phase-01/05_CHARACTER_BIBLE_AND_VOICE_GUIDE.md); it gives no magic reconstruction. Nora describes the public field difference without identifying a private source. The new contact bridge asserts that Maya can provide case-contact routes; this specific referral wording should receive author voice review before narrative acceptance.

## Save compatibility and unresolved acceptance

The reboot keeps schema version 1 and uses optional new event IDs/fields. v2/v3 openings are not assigned a v4 group or contact history. The legacy `the-archive:game-save:v1` localStorage key is never imported or altered. Existing relationship values are preserved; Maya's Bulletin reply now applies a floor for her first-contact baseline rather than overwriting prior v4 group changes. Direct follow-up baselines apply once when a two-way exchange is delivered. The original group transcript, creator, timestamps, departures and member list remain in the same saved object.

The new public-only contact and group exchanges are optional; a player who declines Maya Messages can receive the referral in the verified Bulletin return-token inbox, contact the other characters separately and still follow the existing S30 public route. Physical Android UAT, final author voice approval and signed-release validation remain separate acceptance tasks.
