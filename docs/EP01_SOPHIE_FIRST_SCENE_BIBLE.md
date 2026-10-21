> Runtime integration update (19 Oct 2026): see [the current integration audit and scene crosswalk](EP01_FULL_INTEGRATION_REPORT_2026-10-19.md). Paced Sophie messages, explicit recovery dialogue, disclosure branches and the public Bulletin handoff now run in code. Earlier implementation/QA limitations below are historical; use the new report for executed results. The 14 OPEN-B outline beats do not add canonical scenes. Phase 04 resolves the label and count-status conflicts; see [the mirror/media report](PHASE_04_MIRROR_AND_MEDIA_REPORT.md).

# THE ARCHIVE — Episode 1: THE MISSING ENTRY

Implementation-aligned scene bible · Sophie-first reboot · English gameplay dialogue · 19 Oct 2026

## Non-negotiable canon
- The player is an ordinary person, not a predefined cybersecurity expert. Their phone number was given to Sophie by Daniel before he vanished. Why remains unanswered.
- Sophie Mercer is Daniel's younger sister and the **first speaking contact**. Maya Chen is Daniel's fiancée and must not displace Sophie in the opening.
- Daniel has disappeared. Do not claim he is dead, abducted, innocent, or guilty.
- THE ARCHIVE is a *fictional, player-authorised read-only recovered snapshot* of Daniel's device. The origin and sender are not authenticated. Nothing accesses the player's real device.
- The index mismatch is 14 signed / 13 visible / zero recorded deletions. A mismatch is not proof of deletion or culpability.
- `ECHO-7/14` is the recovery token shown on the note. `7-14` is the range clue. Don't merge their meanings or reveal who issued the package.
- Gameplay must be playable at a calm pace without forcing real-time waits or penalising time away from the game.

## Act I — Human contact (target ~10–15 minutes; choices and optional reading affect duration)

### OPEN-B01 — Lock screen / unknown caller
- Visual: iPhone-inspired lock screen at 08:41, quiet ambience, **one** notification, no Archive app yet.
- Incoming text: `Hi. I'm sorry for messaging out of nowhere.`
- On opening Messages: messages arrive as individual bubbles, preserving scroll and accessibility. No automatic player responses.
- Beat: `My name is Sophie Mercer.` Then `My brother Daniel gave me this number before he disappeared.`
- Objective: the player decides to engage, not solve the case immediately.

### OPEN-B02 — Who is Sophie?
- Three player choices: Who is Daniel? What does missing mean? Why my number?
- Sophie admits what she does not know; tells the player the last three days have been terrible. Resist exposition dumps.
- Branches converge with the same *facts*, not identical emotional responses.
- Daniel's identity remains inferred from Sophie's testimony, **unverified**.

### OPEN-B03 — Photo of Daniel's note
- Sophie sends a handwritten note as a photo attachment (image asset to be created/curated separately). Text fallback is mandatory.
- Note: `Sophie — if I stop answering, use the number I gave you.` / `Show them this page, not the originals.` / `RECOVERY: ECHO-7/14` / `Index: 7–14. Check the revisions before you trust a deletion.` / `D.`
- Player must inspect it and deliberately save it as evidence; retaining it does not prove authenticity.

### OPEN-B04 — Quiet exchange / disclosure choice
- Sophie: `Does any of this mean anything to you?`
- Player can ask about token, challenge the note's provenance or agree to look.
- Sophie says an unexplained recovery request has reached the number. No instant trust; she didn't authorise it.
- Optional short hesitation and normal interpersonal chat before the system interruption.

## Act II — The recovery (target ~5–8 minutes)

### OPEN-B05 — Unverified recovery offer
- Owner: Daniel Mercer; role: EXTERNAL WITNESS; sender: UNVERIFIED; claimed token: ECHO-7/14.
- The player may **inspect** permissions before accepting. Cancel/postpone must not cause story failure; show offer again when ready.
- Explicitly state it is an in-game simulation, not an APK sideload or real phone cloning.

### OPEN-B06 — Recovery montage / new app icon
- Verifying reference → validating local snapshot → restoring read-only files → completed.
- No real system-permission request. Soft UI sounds may be enabled with reduced-motion/audio settings respected.
- Archive icon appears on the *player's* iPhone-inspired home screen. The Archive opens to a read-only Daniel device mirror.

## Act III — Investigating Daniel's iPhone (target ~20–35 minutes)

### OPEN-B07 — Daniel mirror home
- iPhone-inspired status bar, lock/home indicator, four-column app grid, real app transitions and navigation.
- Apps: Messages, Mail, Photos/Gallery, Calls, Notes, Files, Browser, Contacts, Maps, Archive Index and Protected.
- Realism: not every item is a clue; some ordinary family, work and search context.
- Restrictions: recovered snapshot may be partial, manipulated, or stale. No direct outgoing calls or messages from Daniel's identity.

### OPEN-B08 — Messages: ordinary history first
- Maya: older North Quay preview differs from civic copy; Daniel asks her to keep both and accuse no one.
- Lucas: normal office concern; Daniel mentions checking the index.
- Unknown thread: header only, no verified sender. Clicking opens original timestamp and surviving fragment, not a manufactured confession.
- Sophie and Daniel's familial conversation should have ordinary human moments in expansion; no timeline contradictions.

### OPEN-B09 — Mail and Notes: cautious corroboration
- Unsent audit email: compare signed count with visible entries.
- Daniel's note: `If the index doesn't match the records, don't assume something was deleted. Check the source. Check the revisions. 7–14.`
- **Two optional Locked Notes**: `revision copy` uses the recovery token Sophie shared; `public comparison` uses the vehicle identifier in Email. Ordinary notes stay readable.
- Unlock reward: statement that signed count is fourteen and newest index shows thirteen; not proof of responsibility. Wrong password does not erase progress; hint points back to the note.

### OPEN-B10 — Photos and Maps: corroboration, not GPS certainty
- Two ordinary Gallery items remain visible; two independent Hidden Albums use clues from the plain Untitled Note (index range) and Maps saved place name.
- Unlock rewards: incomplete index fragments and a location-themed screenshot; neither verifies provenance. Three optional staged hints per lock, no penalty for a wrong password.
- Maps displays one saved North Quay pin, a Civic Records Annex **search** and an incomplete cached route. None is framed as confirmed geolocation of Daniel.
- Six Gallery source images are not supplied. The runtime shows unavailable-media states and surviving descriptions, with no fabricated photos or metadata; the exact asset list is in PHASE_04_MIRROR_AND_MEDIA_REPORT.md.

### OPEN-B11 — Archive Index: first deduction
- UI: Reported signed count = 14 (source unverified); Visible count = 13; Deletion history entries = 0.
- Hard gate: player must inspect the ordinary Untitled Note and Index report before pressing **Record discrepancy**. Optional scrutiny of Mail/Photos/Maps rewards story texture, not mandatory knowledge.
- Evidence flag stored as OPEN-INDEX with verified=false.
- Do not label one person a perpetrator.

## Act IV — Return to the human story (target ~7–12 minutes)

### OPEN-B12 — Sophie follows up
- Sophie: `Did you find something? Daniel told me Maya kept an older public record at Greyhaven Bulletin. Could it help?`
- Offer disclosure: tell only about mismatch / explain the uncertainty / say you need more time.
- Runtime offers counts-only, uncertainty and withholding branches, each with explicit Send and recipient-specific scope, followed by a separate public-lead/privacy exchange.

### OPEN-B13 — Bridge to Maya / Greyhaven Bulletin
- Maya appears *after* the player has investigated the mirrored data. She doesn't automatically know Sophie has shared a note or what player found.
- Player controls what to disclose. NPC knowledge tracks explicit disclosures only.
- Bridge explicitly to older Bus 4 public preview and current Escort row, without asserting that this discrepancy and the 14/13 mismatch are the same event. Preserve original Bulletin → Maya S02–S30 investigation and its provenance gates.

### OPEN-B14 — Questions carried into the canonical S30 ending
- Keep the opening question unresolved: a reported signed count contradicts the visible index. Both come from an unverified snapshot. The later GCRO chain authenticates the Bus 4 version lineage, not this mirror count. Episode completion stays at canonical E01-S30.
- Three hooks carried forward: Why the number? Who authorised the mirror? What happened to the missing entry?
- Do not reveal identity of the sender, culprit, or Daniel's fate in Episode 1.

## Implementation and pacing checklist
- Every scripted NPC bubble has a stable ID and reveal order; typing indicator before believable delays; timers must be resumable and skippable with reduced motion.
- Player always explicitly taps a choice then Send; no auto-choice.
- Chat scroller follows new messages only if player is near bottom; provide jump-to-latest otherwise.
- Locked Notes/Albums never expose body text until valid password. Unlock flags and hint tier persist within the existing IndexedDB save; older saves lack the optional keys and remain readable.
- Locked areas are optional, not hard gates, and leave clear clues so the player isn't stuck.
- iPhone visuals are inspired by iOS; all brands/names must fit the fiction, no real operating-system access implied.
- Tests: new save, migrated save, note gating, install consent, index gating, bad password, correct password, refresh, reduced motion, return navigation, e2e screenshots.
