# Scene 10 media rebuild — partial acceptance

New Scene 10 starts use the supplied twelve recordings and a separate persisted `media` revision. Already-started Scene 10 saves retain the prior text route. Inventory gating and 20% TRACE remain unchanged. The new route contains ten decisions, each with three responses and explicit Send. The sixth decision records hesitation or refusal without enabling video; explicit option A is required to connect. The two final clips advance without a player decision, then hold, fade and complete the chapter. A reload during a clip requires the player to resume playback. A separate unverified warning evidence record is created after the warning clip. No microphone, camera, contacts or real number are accessed.

## Audio map

All original filenames are retained under `public/media/audio/scene10-owner/`: `SOP10_VC_01.mp3` through `SOP10_VC_06.mp3`, followed by `SOP10_VD_01.mp3` through `SOP10_VD_06.mp3`. Actual playback end events, not assumed durations, advance the state machine. The subtitle text and screenplay are based on automatic transcription: listening and wording acceptance are pending. Embedded audio in the supplied videos is muted.

## Video map and limitations

The six supplied videos are portrait (9:16), about eight seconds each, and have embedded audio. Video `1.mp4` is used for VD_01, `2.mp4` for VD_02, and `6.mp4` for VD_06. They loop muted while the corresponding MP3 plays. Their lip movements and duration have not been human-verified against the recorded speech; they are not claimed to be synchronized performances.

The supplied videos `3.mp4`, `4.mp4` and `5.mp4` show a different starred number ending in 09 and a different warning; a separate supplied image also shows the GH-DSC-03-A archive card. These conflict with the established masked number ending in 41 and exact warning, and cannot be used as the warning card. VD_03–VD_05 therefore display a clearly labelled text-based representation of the separate card. This fallback is not recorded footage or a verified photograph. Corrected rear-camera footage and human audio/video acceptance are required before the cinematic media can be declared final.

## Testing

See the final agent report for current test results. Browser automation simulates the HTML audio `ended` event; it validates state progression, but does not prove that a human heard the clips or that lips and sounds match. A complete Chapter 1 fresh-game UI playthrough is not represented by the Scene 9–10 acceptance test, which constructs the earlier route using the actual scene reducers.
