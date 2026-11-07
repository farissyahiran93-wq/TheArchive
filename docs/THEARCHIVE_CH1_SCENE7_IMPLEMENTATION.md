# Chapter 1 Scene 7 — The Starred Number implementation

Status: implemented; automated validation complete. Human listening acceptance and real-device checks are not yet complete. No APK.

## Call and audio

Scene 7 requires the actual completed Scene 6, its recovered and saved timeline and sent report receipts, installed TRACE and Sophie’s independently delivered Scene 6 export message. The player manually opens Sophie’s chat and opens the incoming-call screen; declining leaves a callback option. The supplied `SOPHIE CALL.mp3` (05:24.36) was transcribed locally for approximate spoken word times and split into 11 separately encoded MP3 clips at sentence pauses, using FFmpeg. Original boundaries in seconds: 0, 13.0, 27.1, 44.35, 80.7, 128.0, 146.9, 188.0, 215.3, 255.5, 309.3, 324.362. Source and player options appear in the screenplay. No generated replacement voice is used.

After each of the first ten clips ends the state waits at a choice: three player alternatives, with selection separate from Send. Only Send advances to the next recording. The eleventh clip closes the call and offers the export. The supplied recording is one fixed Sophie performance; it does not contain separate recordings responding to each alternative. The options are written to fit the following recorded turn. A player may use the controls or continue without audio. Master/effects mute settings are respected. A refresh during playback resumes the current clip from its beginning rather than pretending it finished. Text transcript and selections persist; the original voice file is not altered.

After the call, a separate Sophie text question about any prior connection has three player responses, each requiring Send and receiving a matching text reply. All maintain the established absence of a personal relationship with Daniel. This new text exchange is not represented as recorded voice audio.

The recorded Sophie performance follows the attached screenplay, including an unverified digital remark. Sophie cannot determine which entry it belongs to; neither the remark, star nor copy authenticates authorship or exposes a physical card. The pre-existing call and history are retained. Only the explicitly selected response about the Unknown contact creates a scoped disclosure to Sophie.

## External evidence and progression

After the closing clip, `TA-S07-EXPORT-RECEIVED` records a Sophie-supplied copy. The player opens the attachment and separately inspects metadata, the fictional masked contact entry and star. The number is a fixed fictional masked display; no real device contacts are accessed. The source is Sophie’s copy from Daniel’s shared family folder; the original export date, provenance and any intervening modifications are unknown. A separate digital remark says “Don’t call this number”, but the association with the starred entry is unknown.

TRACE imports the copy as external evidence and gives a source-limited comparison, not an authenticated original or editor. The player explicitly selects and saves one of three private hypotheses under `TA-EX-STARRED-ENTRY`. External evidence contributes no phone recovery units; previous phone fragments and timeline remain at 200/1,000. The optional group send requires its own choice, review and confirmation and contains only the chosen observation. It records only existing Sophie/Maya recipients and never Lucas, the number, file or private timeline. Keeping the finding private does not block completion.

Completion saves `TA-S07-COMPLETE` and `TA-S07-SCENE08-UNLOCKED`; Maya sends a scoped off-screen request to Sophie about an earlier check-in, and Sophie offers that lead to the player. The player does not inspect the capture or automatically start Scene 8. The proposed Scene 6 device times are not repeated or promoted to confirmed facts here.

## Persistence and limitations

Optional `masterScene07` state stores call phase and clip, delivered transcript, pending choice, attachment/metadata/star reads, import, analysis, private hypothesis, sharing review/send and completion. Reducer guards prevent duplicate lines, receipts and sends. Reloading a currently playing voice clip starts that current clip again. Audio playback is browser-dependent; the user can advance without audio if playback is unavailable.

## Tests

Final typecheck, lint and production build passed; build still reports its large-chunk warning. Final unit suite passed 1,488/1,488. Focused Scene 6–7 browser tests passed 2/2; the added reload-during-call test passed. The complete browser regression passed 200/200 in 17.8 minutes on stable final code; log: `artifacts/master-story-2026-11-05/scene7-final-regression.log`. Automatic speech recognition and timing checks do not replace a human listening review of every cut and subtitle, particularly on a physical device.
