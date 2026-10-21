# Runtime test and screenshot report

**Executed 16 October 2026 in `D:\Web app\The Archive\reboot`**, on the local Vite/Chrome Playwright setup. These are browser/runtime checks for the implemented opening, not an Android device test, complete E01 playtest or measurement of 75–120/185 minutes.

| Command | Result | Evidence |
| --- | --- | --- |
| `npm run typecheck` | PASS | TypeScript `tsc -b`, exit 0. |
| `npm run lint` | PASS | `oxlint`, exit 0. |
| `npm test` | PASS | Vitest: 3 files, 12 tests. `src/game/slice.test.ts` covers source and knowledge gates, wrong attempt/hint, recheck without duplicate receipt, anonymous/handle Send, first-contact tuples, duplicate-send prevention, quiet reply, S12 channel check and v1 IndexedDB round-trip. |
| `npm run build` | PASS | `tsc -b && vite build`; Vite 8.3.4 produced `dist/`. |
| `npm run test:e2e` | PASS | Playwright Chrome: **9/9** tests, including 2 Phase 03A route tests and 7 existing foundation/UI tests. |

Vitest and Playwright required unsandboxed child-process execution after `spawn EPERM` in the sandbox; the approved local rerun passed. No test result was inferred from that failed environment attempt.

## Browser routes actually played

1. **Cooperative/handle at 390×844:** S01–S12 checkpoint. Open B01, pin E001, open E002, choose wrong redacted-name answer, request hint, then correct comparison, recheck it, and save the lead. Choose `P-S07-A` and handle `QuayReader`; refresh at the S09 unsent review and confirm the draft survived; press Send and observe R01. Switch home/Bulletin, read Maya's reply, select `P-S11-A` without sending, then Send; scroll upward during new messages and use New Messages. Check wrong name/photo answer then code + return route; inspect IndexedDB for **one R01 receipt and one sent tip**, refresh and confirm channel-check checkpoint. At 390×560, the focused handle view was scrolled to demonstrate the review control remained reachable.
2. **Skeptical/anonymous at 320×720:** same evidence sources with wrong attempts, choose `P-S07-C`, use anonymous token and explicit Send. Select `P-S11-C`; no player message appears until Send, and Maya's personal tea continuation does not appear. Refresh after reply; channel check remains reachable without personal disclosure or a Messages connection. Both routes checked for horizontal overflow.

Captured browser images, then visually inspected:

| View | Capture |
| --- | --- |
| Home and Bulletin alert, 390×844 | [home-390x844.png](../../../qa/phase-03a/home-390x844.png) |
| I01 comparison and wrong-answer feedback, 390×844 | [investigation-390x844.png](../../../qa/phase-03a/investigation-390x844.png) |
| Handle entry after focus at 390×560 | [handle-focused-390x560.png](../../../qa/phase-03a/handle-focused-390x560.png) |
| Maya's Bulletin chat and optional composer, 390×844 | [maya-chat-390x844.png](../../../qa/phase-03a/maya-chat-390x844.png) |
| S12 after reload, 390×844 | [after-reload-390x844.png](../../../qa/phase-03a/after-reload-390x844.png) |

**Limits:** Playwright browser focus/viewport checks are not a physical Android software-keyboard test. Touch, TalkBack, device safe areas, performance, audio, font-scaling and a real-phone UAT remain unrun. The provided phone/chat reference videos were not available locally for direct comparison; visual inspection was against the implemented UI and browser captures. No APK was built for this slice. The opening currently uses authored text and source cards; final portrait/photo/record art and deeper media interactions remain production work. Search/Maps sample screens were preserved, not validated as canonical E01 investigations. No measured active playtime or external player/editorial test was produced.
