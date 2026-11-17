# Playwright failure audit — 17 November 2026

This audit covers the 16 failures in the preceding 193/209 run. Targeted tests were rerun with an isolated Playwright server. Passing targeted tests do not replace a full-suite run.

| Previous failing test | Category and observed cause | Correction and targeted result |
| --- | --- | --- |
| `main-menu.spec.ts` — starting v2 archives a historical save | D: helper expected a Home navigation button when already on Home | Conditional navigation in the same test; passed. |
| `master-case-file.spec.ts` — Case File 001 opens at install | A: expected `SET UP TRACE`, 12% recovery, and a removed working-timeline interface | Replaced with v3 recovered-source, labelled-connection and moved-position persistence across Missing Hour; passed. The former pre-Scene-6 Case Files/private-hypothesis UI is unavailable in v3, so that specific earlier-route UI assertion has no direct equivalent there. |
| `master-scene01.spec.ts` — master opening persists choices | A: expected old reconsider-invitation interface; current Same Old Chaos invitation has member view and direct join | Test member view, reload, and explicit join; passed. |
| `master-scene03.spec.ts` — private handoff and offline | A: expected a removed unlock banner | Assert persisted `TA-S03-SCENE04-UNLOCKED` receipt and offline state; passed. |
| `master-scene04.spec.ts` — fresh game reaches Unknown | A: expected FIND DANIEL group label for Same Old Chaos | Corrected group label and sent the separate name choice plus nine group decisions; asserted group completion before opening Sophie. Passed on targeted rerun. |
| `master-scene04.spec.ts` — cinematic conversation and installation | A/C: previous intro wording and pending typing delivery | Corrected authored wording and advanced the installed fake clock; passed. |
| `master-scene05-archive-conversation.spec.ts` — reversible archive offer | A/D: old archive-v1 attachment expected in archive-v3 direct transfer | Exercise v3 transfer, decline/reconsider, persisted draft and manual recovery; passed. |
| `master-scene05.spec.ts` — consent and recovery | A: expected `START SCENE 5` and an older 12% fragment/report flow | Replaced with v3 manual recovery, all five recovered sources, reload and four explicit post-recovery Sends; passed. Companion archive-v3 browser test covers consent, refusal and reconsideration. |
| `master-scene06.spec.ts` — earlier timeline | A: expected removed working-timeline controls | Assert actual recovered bounds, missing interval, contextual discussion and continuation after reload; passed. |
| `master-scene08.spec.ts` — Maya crop, shared false | A: expected removed manual conversation-open button and completion banner | Assert automatic Scene 9 transition after actual Scene 8 choices and finding; passed. |
| `master-scene08.spec.ts` — Maya crop, shared true | A: same outdated controls | Same correction, including shared branch; passed. |
| `master-scene09.spec.ts` — Maya card and Scene 10 | A: expected nonexistent completion banner | Assert exact authored final reply, then actual inventory unlock and Scene 10 call, video acceptance, warning and fade; passed. |
| `phone-continuity.spec.ts` — Home and first reply | A: expected old opening choice | Select authored V4 choice and retain Home/navigation assertions; passed. |
| `phone-first-v4.spec.ts` — fresh opening | A: expected older screenplay choices and photo timing | Assert V4 first and second decisions, explicit Send and photo arrival; passed. |
| `scene4-replay.spec.ts` — replay checkpoint | D: helper attempted Go home while already on Home | Conditional Home navigation; passed. |
| `trace-installation.spec.ts` — installation resumes | A/C: old introductory wording and delayed message | Assert current dialogue after fake-clock delivery and refresh; passed. |

All 16 targeted failures now have passing targeted reruns. The current v3 route exposes Investigation Board rather than the prior pre-Scene-6 Case Files/private-hypothesis interface; the older route’s exact interface is not asserted by the v3 replacement. Other historical/compatibility routes remain separate. The full suite was rerun after those changes: 210 passed, 0 failed (Playwright, 6 workers).
