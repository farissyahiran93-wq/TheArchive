# Phase 03B verification and Gate B handoff

## Independent verdicts

| Gate / milestone | Verdict | Evidence |
| --- | --- | --- |
| Gate A — script authoring | **READY, unchanged** | Prior 21/21 owner policies and Gate-A-01; not reopened here |
| Phase 03B — Episode 01 core browser route | **PLAYABLE CANDIDATE / INTERNAL QA** | S01–S30 reachable through social, skeptical and no-tip recovery routes; I01–I07 core tasks run in browser |
| Gate B — full gameplay/runtime acceptance | **IN PROGRESS; NOT ACCEPTED** | Real Android, human playtest, broad failure/recovery and save stress tests remain |

## Actual checks run on 17 October 2026

- `npm run typecheck` — passed.
- `npm run lint` (`oxlint src tests`) — passed. The script is scoped to authored source/tests so unrelated generated output is not linted.
- `npm run test -- --reporter=dot` — **25/25** unit tests passed, including original Phase 03A tests, GCRO finalized bytes/SHA-256, wrong scope, mismatched digest, one-session R04, K02 citation, unavailable-role fallback and private Case Board link guards.
- `npm run build` — passed; Vite production bundle generated.
- `npm run test:e2e -- --reporter=line` — **22/22** Playwright browser tests passed on the final Case Board revision. The suite includes three complete narrative routes, explicit Send, separate permissions, cross-app Search/Maps/Case Board, Messages channel separation and IndexedDB reload.
- Screenshots captured and visually inspected: `qa/phase-03b/editor-note-quiet-390x844.png`, `qa/phase-03b/e012-review-390x844.png`, `qa/phase-03b/s30-quiet-390x844.png`, `qa/phase-03b/case-board-390x844.png`. These are Chromium browser captures, not Android device captures.
- The serialized E012 master has **2,012 actual UTF-8 bytes** and SHA-256 `887c59c42ea8b375737b78a3e79ae0d8d57da7c8698e7e21adea955136d730de`; the app compares actual delivered bytes against the fictional issue envelope at runtime. A mismatched digest grants no R04. This development digest is not a real-world agency signature.

## Runtime controls and remaining work

The story uses the existing IndexedDB v1 store and legacy save key remains untouched. All new E01 fields are optional in the v1 save shape; reload was exercised on full and early routes. `R01`, `R02`, `R03`, `R04`, `K02`, `CONN-E01-01` and ending receipts are guarded separately. E012 stays with the request session; Maya gains only explicitly Sent selected facts. No Daniel welfare claim, culprit identity, decoded `7-14`, GPS trace or conviction is introduced.

**For Gate B acceptance:**

1. Exercise every required wrong-answer, refused/delayed/reissued GCRO release and stale/missing role-card branch in a production fault harness; add a visible corrected-release recovery action if the issue is incomplete. The current normal fictional issue path and negative state tests do not prove all recovery UX.
2. Run physical Android tests for scroll, keyboard, safe areas, app interruption/relaunch, event idempotence, save rollback/backup, memory and performance. No physical-device result is claimed.
3. Have a human Narrative Director or independent editor play/read both social and low-disclosure routes and assess pacing, Maya's voice and S30 payoff. Actual active duration and the 185-minute design target have **not** been measured.
4. Review Case Board, Files and Archive accessibility at 200% text scale, including focus order, contrast and narrow-device scrolling. The separate Case Board is now functional but has not had physical-device or human acceptance.

**Next exact task:** Phase 04 player/device QA on this integrated candidate, with targeted fixes for defects found there. Keep Gate B `IN PROGRESS` until those checks pass; do not turn this browser result into an Android or 10/10 quality claim.
