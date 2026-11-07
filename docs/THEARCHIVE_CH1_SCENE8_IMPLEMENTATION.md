# Chapter 1 Scene 8 — The Last Check-In implementation

Status: implemented; automated validation complete. Human acceptance, listening review and physical-device testing are separate. No APK.

## Route and dialogue

Scene 8 starts only after the master Scene 7 is complete, its private finding exists and `TA-S07-SCENE08-UNLOCKED` is recorded. Maya's inbox entry is manually opened, then the player explicitly starts the conversation. It is available independently of the Scene 7 optional group share. Maya is pursuing her own old messages; no private TRACE findings are supplied to her. Her opening varies with existing Maya trust. Ten decision points have three distinct player options and matching Maya responses; each selection needs Send. Lucas is not re-added to FIND DANIEL or treated as the culprit.

## CAP_LAST_CHECKIN_01

The fictional on-screen cropped message capture represents an authored image-like exhibit, rendered in HTML/CSS rather than claiming pre-existing photographic pixels. Maya says she made this crop from her own conversation with Daniel, so the route does not assume permission to forward Lucas's private chat. Her account is source testimony, not authentication of the original. The original conversation is unavailable in the scene.

The visible labels are Maya and Daniel. Daniel's line is “Lucas checked in. He said there was another copy.” A reply asks what copy, and Daniel's visible response defers explanation. A 21:14 time appears without date, time zone or clock verification; the cropped upper and lower boundaries explicitly leave surrounding content missing. This newly authored time is only a source display detail, not a confirmed story date or link to the provisional Scene 6 times.

The player explicitly opens the capture, then inspects sender labels, text, displayed time, crop boundaries and provenance. Source questions cover how Maya obtained it, original availability, missing context, why she did not share it earlier, and the uncertain meaning. TRACE imports it as external evidence, separates observed content, testimony and unverified metadata, and compares it to the separately sourced contact export without asserting a connection. The player chooses a provisional interpretation, reviews it and explicitly saves unverified `CAP_LAST_CHECKIN_01`. The capture does not authenticate itself, establish the subject of “another copy”, identify a custodian or grant any character private TRACE knowledge.

## Recovery, handoff and persistence

External evidence adds no phone recovery units; the existing phone manifest remains at 200/1,000 (20%). After the saved finding, two closing decisions lead to Maya recalling a photograph of a small card; she does not show it or identify its contents. Completion records `TA-S08-COMPLETE` and `TA-S08-SCENE09-UNLOCKED`; Scene 9 is not launched.

Optional `masterScene08` state persists dialogue and draft, receipt/opened status, inspected fields, import/analysis/comparison, hypothesis and review, saved finding and completion. Outgoing messages use explicit Send and recipient-scoped receipts. Existing Scene 7, historical graphs and group membership are retained. Reopening does not repeat the capture or message events.

## Scene 7 audio audit

See `THEARCHIVE_CH1_SCENE7_AUDIO_AUDIT.md`. Automated word timings suggest no split crosses a recognised word, but transcription of one clip is uncertain; human listening remains pending. A turn-3 player question that could be misread as receiving “yes” was replaced only for newly started Scene 7 calls. Existing started calls retain their previous graph and draft through `conversationRevision`; audio clips were not replaced.

## Validation

Typecheck, lint and production build passed; build retains its large-chunk warning. Focused Scene 7–8 browser checks passed 3/3. An initial unit run, launched concurrently with build and browser tests, had four 5-second timeouts (1,487 passed); the complete unit suite was rerun separately with four workers and passed 1,491/1,491. The full final browser regression passed 202/202 in 18.3 minutes on stable final code: `artifacts/master-story-2026-11-05/scene8-final-regression.log`. Automated checks do not replace human listening or real-device acceptance.
