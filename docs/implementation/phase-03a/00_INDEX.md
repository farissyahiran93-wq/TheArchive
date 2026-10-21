# Phase 03A — playable Episode 01 opening

**16 October 2026.** A bounded, browser-playable vertical slice is integrated in the isolated `reboot` app. The path starts with `E01-S01` setup and reaches the **channel-checked checkpoint inside `E01-S12`**. `E01-S12` dialogue choices and `E01-S13–S30` are not integrated. One investigation (`I01`) is playable; only the editor-channel portion of `I02` is playable. The full episode, seven investigations, measured playtime and Android runtime have not been accepted.

| Record | Purpose |
| --- | --- |
| [Implemented scene and branch matrix](01_IMPLEMENTED_SCENE_AND_BRANCH_MATRIX.md) | Scene exits, choices, evidence, receipts and deferred content. |
| [Runtime test and screenshot report](02_RUNTIME_TEST_AND_SCREENSHOT_REPORT.md) | Executed commands, two browser routes, captures and unrun tests. |
| [Save and event integrity](03_SAVE_AND_EVENT_INTEGRITY_REPORT.md) | Versioned save extension, event scheduling, privacy and restore limits. |
| [Phase 03A handoff](04_PHASE_03A_HANDOFF.md) | Slice decision, Gate B status and Phase 03B entry. |

Authoring source: [Phase 02C index](../../narrative/phase-02/00_INDEX.md), [Act 01](../../narrative/phase-02/01_EPISODE_01_SCREENPLAY_ACT_01.md), [Act 02](../../narrative/phase-02/01_EPISODE_01_SCREENPLAY_ACT_02.md), [investigation contracts](../../narrative/phase-02/03_EPISODE_01_INVESTIGATION_PACK.md) and [Gate-A-01 record](../../narrative/phase-01g/GATE_A_FINAL_VERDICT_AND_HANDOFF.md). Those script and policy files were not edited.

Run locally from `D:\Web app\The Archive\reboot`: `npm run dev`, then open the Vite URL (normally `http://localhost:5173/`). On a fresh browser profile choose **Enter the archive → Set up phone → Bulletin → Read public brief**. This is a fictional local game; it does not access real civic records, device contacts or GPS.
