# Scene 7 subtitle timing QA — 17 November 2026

Status: **automatic alignment only; manual listening is outstanding for every cue**. Do not treat these timestamps as verified against human listening or release-ready.

The unchanged `scene07-ver1/call-01.wav` through `call-11.wav` were analyzed locally using the cached `Systran/faster-whisper-small.en` model with word timestamps. The files were not uploaded for transcription. The model output was compared to the existing authored subtitle text; matching first and last words supply each cue's estimated interval. Waveform energy was used to estimate the start of each clip's first spoken cue. The source recording, script, and call decisions were not altered. The cue structure and audio duration bounds pass `src/game/masterScene07Cues.test.ts`.

The automatic transcript matched all normalized script words in clips 01–03, 05–09 and 11. Two machine transcription mismatches need particular attention when listening:

- Clip 04, cue 7: script “I don't want to pretend I know what it says.”; model produced “I don't wanna pretend I know what it says.”
- Clip 10, cue 4: script “You could look at the starred entry yourself and see”; model produced “You could look at the start entry yourself and see”. The following cue continues the sentence.

The exact manual-review scope is every cue in clips 01–11, respectively: 01/1–8, 02/1–8, 03/1–6, 04/1–7, 05/1–8, 06/1–10, 07/1–9, 08/1–10, 09/1–7, 10/1–9, 11/1–16. Review speech onset, phrase boundary and subtitle disappearance at each cue, especially the two discrepancies above. Machine recognition and waveform estimates cannot validate listening accuracy; accurate audiovisual sync remains unresolved until checked against playback.
