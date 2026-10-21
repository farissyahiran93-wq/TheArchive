> Runtime entry precedence (Phase 04, 19 October 2026): the approved 2026 Sophie-first opening occurs after S01 identity and before S02 Home/Bulletin. The older S02 statements excluding recovery and a workspace describe the pre-reboot entrance and are superseded only for that entrance. All canonical S01–S30 ids and later evidence/permission gates remain. The original screenplay below is preserved as a source record; it does not remove the current prologue.

# Episode 01 screenplay — Act 01: Ordinary attention

**Fictional date:** 8 October 2026, Greyhaven local time, beginning near 09:00. **Active pacing:** unmeasured; see the [route estimate](07_EPISODE_01_TIMING_AND_PACING_MODEL.md). **Cast in direct contact:** none. Public bylines are mentions, not relationship contact. **General checkpoint:** save each viewed panel, draft comparison and board mark under one stable scene event; re-entry shows the already viewed copy, never a second notice. Back always returns to the prior surface. A screen-reader text view is equivalent to zoom. T01/T03/T09/T10.

## E01-S01 — A name on the screen

**Surface/entry:** Setup, new E01 start. **Purpose/turn:** A normal civilian chooses how to appear; no detective assignment. **Exit:** valid display name → S02. **Checkpoint:** `S01.identity_saved`; does not initialize character relationships.

UI: “THE ARCHIVE”

UI: “A fictional story set in Greyhaven. You decide what to read, send and share.”

UI: “Display name”

UI: “This name appears in your own case notes. People you contact see only what you choose to send.”

UI: “Pronouns (optional)”

UI: “Continue”

If name is blank, UI: “Enter a display name to continue.” If over 24 characters, UI: “Use 24 characters or fewer.” If pronouns are skipped, UI: “You can change this later.” No NPC receives either field. The optional pronoun choice has no relationship delta or evidence effect. No message is sent. Designer note: the first action establishes control over self-disclosure.

## E01-S02 — A quiet morning

**Surface/entry:** Phone Home after S01. **Purpose/turn:** The player finds a public brief without a mysterious install. **Exit:** tap Bulletin → S03. **Checkpoint:** `S02.home_seen`; other icons can be examined and backed out of.

UI home card: “Thursday, 8 October”

UI notification: “Bulletin · Greyhaven Memory Project: Daniel Mercer, missing since 4 October”

UI app labels: “Bulletin”, “Messages”, “Photos”, “Files”, “Search”, “Maps”, “Case Board”, “Settings”.

If Messages is opened before opt-in, UI: “No case conversations yet.” If Archive is searched for, UI: “No workspace has been opened.” If Maps is opened, UI: “No case locations saved.” These are empty states, not obstacles; “Back to Home” is always visible. On tapping the Bulletin notification, UI: “Open public case brief.” The player may dismiss the notification and enter Bulletin from the icon. No timer forces either. Designer note: the case enters through a community post, not an invasive app.

## E01-S03 — Daniel's empty chair

**Surface/entry:** Bulletin public case brief, S02 Bulletin open. **Purpose/turn:** A missing person is a person before he is a puzzle. **Exit:** open “Older preview” → S04. **Evidence/knowledge:** public brief gives player K03; Maya already knows its contents. **Checkpoint:** `S03.brief_read` only after article body or accessible text opened. Full article in [prop B01](04_EPISODE_01_IN_WORLD_ASSETS.md#b01--public-bulletin-brief).

UI: “Daniel Mercer is missing”

UI: “Posted 7 October · Greyhaven Memory Project · Edited by Maya Chen”

UI article preview lead: “Daniel Mercer was last confirmed in contact on 4 October. His sister reported him missing on 5 October. The search is active; we do not know where he is or what happened after that confirmed contact.”

UI article preview excerpt: “On records days, Daniel sat at the far end of our table with a pencil and a stack of labels.”

UI button: “Read full brief”. On tap, display [B01's complete authored article](04_EPISODE_01_IN_WORLD_ASSETS.md#b01--public-bulletin-brief) **verbatim**, including its source warning, family portrait scope, tip wording and public links. The excerpt above is the same opening text, not a second edition. `S03.brief_read`/K03 occurs on opening that full article or its identical accessible text, not from glancing at the teaser. The 8 October correction note becomes visible only at its authored later story order; it is not retroactively present in the 7 October initial read.

UI image caption: “Daniel at a community records day, undated. Used with family permission for this missing-person brief.”

UI expandable context: “He worked on civic records and cared about keeping older copies available. A document he sent to the Memory Project on 3 October is shown here as a cropped preview. We cannot certify the whole file from this image.”

UI buttons: “Read case timeline”, “Older preview”, “Current civic copy”, “Submit a tip”.

If the player opens timeline: UI “4 Oct · Last confirmed contact. 5 Oct · Missing-person report. 7 Oct · This brief posted.” UI “There is no verified public account of where Daniel went.” On “Submit a tip” before comparing, UI: “You can send a general tip, but the document comparison may help you say exactly what you saw.” The player can return to the article. No tip is auto-drafted. Designer note: the public uncertainty about Daniel remains visible.

If the player opens the portrait description: UI “Daniel sits beside a table of paper folders. His coat is still on; a cup is balanced on one unopened folder. The image does not show where he went after it was taken.” If the player opens “Why is a document here?”: UI “The Project made an editorial decision to post a crop Daniel had transferred. Its original source is not in the Project's possession. A source note is attached to the preview.” On Back, the brief returns at the same reading position. The name, human context and source warning are available in linear text as well as the visual article.

## E01-S04 — The older preview

**Surface/entry:** Bulletin → Photos, older preview E001. **Purpose/turn:** The first clue is readable but limited. **Exit:** inspect June's row, then “View current copy” → S05. **Evidence:** E001 `OBSERVED LEAD`, not authenticated v1. **Checkpoint:** `S04.row_inspected` persists; zoom state optional. Source caption and image text in [prop P01](04_EPISODE_01_IN_WORLD_ASSETS.md#p01--older-preview-e001).

UI: “Older preview · shared by Daniel with the Memory Project on 3 October · cropped image”

UI: “Source note: Maya received this preview. The original audit file is not attached.”

UI visible crop: “NORTH QUAY EVACUATION · BUS 4 · 23 NOV 2019 / Escort: JUNE ELLIS / Resident fields: [REDACTED]”

UI controls: “Zoom”, “Read image text”, “Pin June row”, “What is missing from this view?”, “View current copy”.

On “What is missing from this view?”, UI: “The top and bottom of the page are outside the crop. A crop cannot show whether the complete source was later corrected or how it was certified.” On “Pin June row”, UI: “Pinned as an observation from a preview.” On attempted “Mark as verified”, UI: “This is a preview, not a certified audit copy. Keep it as a lead.” A mistaken tap has no penalty. Accessible image text contains the exact same June row. Designer note: visual discovery gives a clue while teaching the copy's limit.

## E01-S05 — The current copy

**Surface/entry:** Browser via S04 or S03 current-copy link. **Purpose/turn:** Same record, different public version. **Exit:** “Compare copies” → S06. **Evidence:** E002 public v2 observed, source URL and capture saved; no historical truth granted. **Checkpoint:** `S05.v2_viewed`. Full public page in [prop P02](04_EPISODE_01_IN_WORLD_ASSETS.md#p02--current-civic-copy-e002).

UI browser address: “records.greyhaven.local/public/evacuation/bus-4”

UI badge: “Greyhaven civic portal · public redacted view”

UI title: “North Quay evacuation · Bus 4 · Current copy · v2”

UI excerpt: “23 Nov 2019 / Escort: — / Resident fields: [REDACTED]”

UI note: “This is the current public view. Use Revision history for version events.”

UI controls: “Source details”, “Revision history”, “Compare copies”.

On Source details, UI: “Publisher: Greyhaven civic portal. View: public redacted. Captured for your case notes on 8 October. Publication time is not the 2019 event time.” On a premature inference tap, UI: “This view tells you what the portal shows now. It does not tell you why the row changed.” If player returns to S04, both tabs persist. Designer note: the official page is concrete, but official status does not answer motive.

## E01-S06 — One line apart

**Surface/entry:** Files comparison, E001 and E002 viewed. **Purpose/turn:** Player performs the first actual comparison. **Exit:** mark the June field on both → S07. **Investigation:** I01. **Checkpoint:** `S06.selection` supports undo. No message is sent.

UI: “Compare the same record, not two similar headlines.”

UI source labels: “Older preview · partial image” and “Current civic copy · v2 public view”.

UI row labels: “Record: North Quay / Bus 4 / 23 Nov 2019”, “Escort”, “Resident details [REDACTED]”.

UI prompt: “Which field can you actually see change?”

Selectable answers: “Escort: June Ellis → blank”, “The resident names”, “The bus number”, “I can't tell yet”.

If “Escort: June Ellis → blank”: UI “Visible difference saved. It is an observation, not proof that either full file is authentic.” If “The resident names”: UI “Those fields are redacted in both public views. Try a field whose text is visible.” If “The bus number”: UI “Both headers say Bus 4. Look below the header.” If “I can't tell yet”: UI “Open text comparison; the escort row is the only fully readable changed field here.”

Hint 1: “Match the record title and date first.” Hint 2: “Read the escort field on each copy.” Hint 3: “Preview: June Ellis. Current view: blank.” Zoom and linear text comparison have identical answer semantics. Designer note: the puzzle rewards observation without a wild theory.

## E01-S07 — A sentence you can defend

**Surface/entry:** Case Board after S06 correct visible difference. **Purpose/turn:** Choose language for K01 and preserve uncertainty. **Exit:** save a lead card → S08. **Evidence/knowledge:** player K01 at `LEAD` only; no NPC receives it. **Checkpoint:** `S07.lead_saved` idempotent. T03/T09.

UI board card: “Two public views of the Bus 4 record show different escort fields.”

UI: “Observed: the older preview shows June Ellis. The current public copy leaves Escort blank.”

UI: “Not yet established: which complete version was certified, why it changed, or who changed it.”

UI prompt: “How would you describe this to another person?”

`P-S07-A` “The visible escort field changed.” → UI “Saved as a source-limited observation.”

`P-S07-B` “Maybe the older image was cropped or mislabeled.” → UI “Saved as an alternative to test. The visible field still differs.”

`P-S07-C` “I don't know what happened.” → UI “Saved with uncertainty. You can still report exactly what the two views show.”

Merge UI: “Lead card saved · Source: E001 preview + E002 public view · Proof level: LEAD.” If the player tries to choose “They erased June” from a hypothesis drawer, UI: “That claim needs a certified version record. Keep it as a question for now.” Board Save is a local action, never an outgoing tip. Designer note: the player learns the core distinction between a discrepancy and an accusation.
