# Chapter 1 Scene 9 — The Secondary Card implementation

Status: implemented; automated validation complete. Human acceptance and physical-device checks are separate. No APK.

## Entry and dialogue

The master route requires actual Scene 8 completion, its saved capture finding and `TA-S08-SCENE09-UNLOCKED`. The player manually returns to Maya's existing private conversation and selects START SCENE 9. Previously delivered Scene 8 text and its capture remain available; the new state appends its own messages and never autoplays. The opening varies with existing Maya trust. Ten decisions each have three player choices and corresponding Maya replies, with selection and explicit Send separate. Maya reports what she knows, rather than being granted private TRACE knowledge.

## Supplied image and provenance

The owner-supplied PNG is copied unchanged to `public/media/evidence/secondary-reference-card.png`; SHA-256 `1E5F2C14ED215A37A8EEC28C33D74D37B5B9523648B51112E05CDB05F40FE978` matches the attached source. Maya says she found this image in an old shared folder she could access. She thought Daniel might have taken it, but was not present and cannot verify photographer, date, original file, physical card custody or authenticity. This is Maya's account, not independent authentication.

The player opens the image manually, then independently inspects the Greyhaven Records heading, Secondary Reference Card title, reference GH-DSC-03-A, Reference Only stamp, Contents Unverified marking, photographed frame/appearance and source limitations. The existing full-phone photo viewer supplies zoom controls and keyboard/touch navigation. If the image fails to load, inspection controls remain disabled and a retry is offered. The supplied image is not redrawn or substituted. Its secondary reference card is not the separate starred-number warning card.

The owner mentioned GH-4172, M.C. and GH-ARCH REF-02 as potential incidental marks; they are not established canon or interpreted as record/person identifiers. The reference glyph preceding 3 is visually round in the supplied image; the owner-specified in-game lookup string is `GH-DSC-03-A`. This visual reading should be included in human image acceptance.

## TRACE and progression

The player imports `TA-EX-REFERENCE-CARD` as external evidence, reviews source-limited visible text and compares it separately with the earlier message capture and contact export. A phone timeline comparison is optional. TRACE distinguishes observable text from the unknown record, photographer, custody and any proposed relationship; none of the comparisons establishes that the card is the other copy, links it to June, identifies a culprit or proves a document's contents. The player chooses one of three provisional interpretations, explicitly reviews and saves it privately. All routes remain open.

After the saved finding, the final two dialogue decisions establish GH-DSC-03-A as a possible public inventory search target, without producing a result. Completion records `TA-S09-COMPLETE` and `TA-S09-SCENE10-UNLOCKED`; Scene 10 and its separate physical warning card/call are not implemented or opened. The external photo adds zero units; phone recovery remains 200/1,000 (20%).

## Persistence and proposed canon

Optional `masterScene09` state persists dialogue and draft, attachment receipt/open, individually inspected regions, import/analysis, source comparisons, selected/reviewed hypothesis, saved finding and completion. Messages and explicit Send receipts remain scoped; reopening does not duplicate progress. Existing scene and legacy states are retained.

The owner's detailed Harbor Renewal, Warehouse 3 and item-level GH-DSC-03-A proposals are documented separately in `THEARCHIVE_HARBOR_RENEWAL_PROPOSAL.md` and linked from the Story Bible and gap register as **not yet canon**. They are not player-visible Scene 9 facts. A future source chain and explicit canon decision remain needed.

## Validation

Typecheck and lint passed. The full unit suite passed 1,493/1,493 using four workers; the production build passed with its existing large-chunk warning. Focused Scene 8–9 browser tests passed 3/3, including image-load failure/retry, zoom, inspection persistence and reload. The first complete browser run finished 198 passed / 5 failed after an extended interruption; one failure explicitly reported `ERR_NETWORK_IO_SUSPENDED` and the others included 90-second timeouts. The complete suite was rerun unchanged with a temporary keep-awake request and passed 203/203 in 18.8 minutes; log: `artifacts/master-story-2026-11-05/scene9-final-regression-rerun.log`. Human review must still check the supplied image, its displayed lookup string and real-device interaction.
