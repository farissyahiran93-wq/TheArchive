# Phase 03A verdict and Phase 03B handoff

**Verdict: PASS for the bounded playable opening slice; full Episode 01 integration remains PARTIAL.** New players can reach the S12 editor-channel checkpoint from S01, use I01 with recoverable mistakes, explicitly send R01, receive a gated Maya reply, and restore progress. Cooperative/handle and skeptical/anonymous browser routes passed. S12's next dialogue turn is deliberately outside this slice; no complete E01 or complete I02 claim follows.

| Gate | Status | Basis |
| --- | --- | --- |
| Gate A — script authoring | **READY (unchanged)** | Existing 21/21 policy record and Gate-A-01; Phase 03A did not reopen approvals. |
| Phase 02C screenplay | **SCRIPT COMPLETE / INTERNALLY QA-READY (unchanged)** | Source for implementation, not a measured gameplay rating. |
| Phase 03A opening | **PASS, scoped S01–S12 checkpoint** | Build, unit tests, 9 browser tests and actual screenshots. |
| Gate B — full Episode 01 gameplay/runtime acceptance | **IN PROGRESS** | S12 remainder and S13–S30, I02 completion and I03–I07 are absent; physical Android and full QA unrun. |

## Specific work for Phase 03B

1. Resume from `EV-E01-S12-EDITOR-CHECK`: implement `P-S12-A/B/C` with explicit Send and the authored quiet/social continuations into S13–S14. Complete I02, including image/text/defer/refusal with actual recipient scopes and R02 only on an authorized disclosure.
2. Integrate S15–S30 in coherent tranches from the accepted six Acts. Implement the public S18 route, permission-bound Archive, local Search/Maps investigations, Evidence Board interactions, E012/R04/K02 provenance and the role-only S30 cliffhanger. Keep source failure and no-tip recovery routes reachable.
3. Replace text-first source cards with final, accessible in-world media where needed; retain equivalent text. Use the finalized E012 bytes and compute its real digest at integration time, then separately test in-world issuance, recipient delivery and R04. A file hash alone never grants K02.
4. Expand pure-state and browser tests for every new branch, source refusal, repeated Send, notification/receipt order, save interruption, long text/font sizing and no soft-lock. Run actual Android device UAT and meaningful player timing only after a complete playable episode exists.

**Known 03A limitations:** I01 currently appears inside Bulletin, while the screenplay names Photos/Browser/Files/Board surfaces; those media handoffs and a complete Board app remain to be built. S12's hint ladder and post-check choices are not available. Leaving the unsent tip is safe and resumable, but the later no-tip public-research route is not playable. The installed older debug APK predates this implementation. Phone/chat reference videos were unavailable for direct visual matching. No runtime code outside the isolated reboot was changed, and no production deployment, save migration or Phase 03A APK occurred.

Launch: `cd 'D:\Web app\The Archive\reboot'; npm run dev`, open the displayed local Vite URL, then **Enter the archive → Set up phone → Bulletin → Read public brief**. Automated verification and screenshots: [runtime report](02_RUNTIME_TEST_AND_SCREENSHOT_REPORT.md). Scene-by-scene boundaries: [matrix](01_IMPLEMENTED_SCENE_AND_BRANCH_MATRIX.md).
