# Episode 01 V6 implementation audit — 21 October 2026

The two supplied V6 prompts are the current authorial direction. This is an implementation audit, not an assertion that the entire V6 screenplay is playable. The existing Episode 01 runtime and 30 scene identifiers remain intact. This pass corrects one portion of the new-game FIND DANIEL chronology and save validation. **V6 acceptance is PARTIAL.**

## Changes made in this pass

- New v4 games persist Sophie creating FIND DANIEL with Sophie, Maya, Lucas, Eli and the player. The saved system event names the three contacts, and Eli speaks before mirror access about working with Daniel at Axiom Recovery. Maya identifies her engagement; Lucas gives his long-standing relationship and privacy concern. These authored lines do not identify `E—I` or give anyone the player's mirror records.
- Lucas leaves before Maya. Sophie and Eli remain members. A delivered message from a departed member is filtered by the existing membership check. Earlier v2/v3 group transcript code is unchanged.
- The optional return proposal is spoken by a current group member: Sophie in new v4 history, or Maya when an already-saved earlier v4 history has her in the group. A consenting new-game player gets saved Maya and Lucas rejoin events before Lucas posts. A legacy v4 history that already contains Maya gets only Lucas's rejoin. No earlier save is silently rewritten.
- The save validator now accepts Eli in the group member list, sender list and pending dialogue. Browser reload originally exposed this defect; save round-trip and browser resume now exercise the correction.

Changed runtime paths: `src/content/groupV4.ts`, `src/game/opening.ts`, `src/game/types.ts`, `src/game/characterFollowups.ts`, `src/game/engine.ts`. Updated assertions: `src/game/openingV4.test.ts`, `src/game/characterFollowups.test.ts`, `tests/e2e/phone-first-v4.spec.ts`. The four password definitions in `src/content/opening.ts`, all existing S01–S30 IDs and the S30 implementation were not edited in this pass. The legacy `the-archive:game-save:v1` localStorage key remains untouched; reboot state stays in IndexedDB.

## Editorial beats versus actual runtime

These are many-to-many relationships. An editorial B-number is never substituted for a canonical `E01-S` ID.

| V6 editorial beat | Existing runtime / event | Present state |
| --- | --- | --- |
| B01–B06, unlocked phone, Sophie, name, first page, pending request | E01-S01; `OPEN-V4-*` | Implemented in the earlier v4 opening. The short first-page SVG is inline. |
| B07–B13, first group, introductions, fallout | E01-S01; `OPEN-V4-GROUP-*`, `OPEN-GROUP-*` | Five-person initial membership and exit order corrected here. Only two substantial player choice barriers exist; the V6 G1–G6 screenplay is not fully integrated. |
| B14–B16, silence, Sophie second contact, mirror ready | E01-S01; `OPEN-SECOND-*`, recovery actions | Existing transition retained. |
| B17–B20, free mirror and reverse-page comparison | E01-S01; mirror record inspections | Four individual locks retained. Existing flow still couples the 14/13 comparison and prologue completion; V6 order-flexible B18 conversation and Evidence 002 `7-14` architecture are incomplete. |
| B21–B22, source comparison | E01-S02–S07, later S18–S24 | Existing public Bus 4 comparison and recovered index remain separate observations. They are not yet rebuilt as one V6 Missing Entry investigation. |
| B23–B25, Maya/Lucas/Eli | E01-S11–S17; optional `ARC-E01-*` | Existing Maya Bulletin channel and optional contact DMs work, but V6's varied private disclosure and referral matrix is incomplete. |
| B26–B27, Nora reporting and independent contact | E01-S02–S12; optional Nora `ARC-E01-*` | **Conflict:** current public brief, tip inbox and editor verification name Maya; V6 makes Nora the sole Bulletin author. A cosmetic byline swap would leave false receipts. Nora's separate reporter channel/SOURCE ROOM is not implemented. |
| B28–B29, regrouping and principal Evidence 002 session | Optional `ARC-E01-GROUP-*`; S18–S29 continue other research | Current return is a short public Bus 4 comparison, not the V6 full Evidence 002 group discussion. |
| B30, canonical ending | E01-S30 | Existing ending path retained; no V6 edit or new cliffhanger. |

The individual runtime scene register is below. Beat links are editorial relationships, not claims that the V6 beat is fully implemented.

| Runtime ID | Current scene function | Closest V6 beat(s) |
| --- | --- | --- |
| E01-S01 | Sophie opening, group, recovery and mirror prologue | B01–B20, partially |
| E01-S02 | Daniel missing-person brief cover | B26 |
| E01-S03 | Full public brief | B26 |
| E01-S04 | Older Bus 4 crop | B21–B22, B26 |
| E01-S05 | Current civic copy | B21–B22 |
| E01-S06 | Visible-field comparison | B22 |
| E01-S07 | Save public lead | B22 |
| E01-S08 | Choose tip return route | B26–B27 |
| E01-S09 | Review and send public tip | B26–B27 |
| E01-S10 | Tip receipt | B26–B27 |
| E01-S11 | Maya Bulletin correspondence | B23, B26–B27; V6 role conflict |
| E01-S12 | Public editor-channel verification | B26–B27; V6 role conflict |
| E01-S13 | Exact row / source limits | B21–B22 |
| E01-S14 | Scoped row sharing | B21–B22 |
| E01-S15 | Editor note | B26–B27; V6 role conflict |
| E01-S16 | Permission offer | B23, B27 |
| E01-S17 | Permission sheet | B23, B27 |
| E01-S18 | Source status | B22 |
| E01-S19 | Preview date | B22 |
| E01-S20 | Revision notice | B22 |
| E01-S21 | Timeline | B22 |
| E01-S22 | Correction theory | B22 |
| E01-S23 | Public search | B22 |
| E01-S24 | Daniel note scene | B18–B20 |
| E01-S25 | Maya check-in | B23 |
| E01-S26 | Framing | B22, B29 partially |
| E01-S27 | GCRO request | B22, B29 partially |
| E01-S28 | GCRO release validation | B22, B29 partially |
| E01-S29 | Corroboration | B22, B29 partially |
| E01-S30 | Existing role cliffhanger | B30 |

## Knowledge and membership boundaries

| Recipient | Current route and permissible knowledge | V6 work outstanding |
| --- | --- | --- |
| Sophie | First private contact, physical page and only player-sent disclosures; remains in new-game group after fallout. | Reverse-page disclosure choices before/after note inspection; scoped Eli referral. |
| Maya | Fiancée introduced in group; leaves after Lucas in new games. Existing later Bulletin exchange receives the public Bus 4 tip only. | Remove her author/editor role from **new-game** Bulletin without falsifying old receipts; private emotional follow-up with precise disclosure flags. |
| Lucas | Longtime friend; group departure is persisted. Optional later private public-source discussion and consented return. | V6 full choice sequence and broader evidence discussion. |
| Eli | Coworker at Axiom, initial member in new games; optional later provenance DM. No `E—I` identity assertion. | Recipient-specific mirror/source disclosure and Eli referral branches. |
| Nora | Optional existing public-source DM does not receive private mirror facts automatically. | Independent Bulletin authorship, self-contact route, consent-aware private reporter conversation; optional two-person SOURCE ROOM only with genuine state. |
| FIND DANIEL | New game begins with Sophie, Maya, Lucas, Eli, player; Lucas then Maya leave. On public-only consent Maya and Lucas return through saved events. Older saved membership persists as recorded. | Player exit/re-invite path, supported/partial Evidence 002 group conversation, more authored choice barriers. |

The code must not infer that a character read the mirror or a private DM from a player's inspection. The current V6 branch matrix T01–T55 is **not** fully covered. Current browser runs prove specific authored paths, including one new-game route to S30; they do not prove all disclosure permutations.

## Acceptance limits

The Bulletin authorship conflict is structural: `src/content/e01Slice.ts`, `src/game/slice.ts` and multiple S02–S30 interfaces and receipts describe Maya as editor. V6 expressly changes that to Nora. The V6 prompt also proposes Evidence 002 as the central missing entry, while the implemented scenes chiefly investigate the distinct public Bus 4 escort discrepancy. Both need a coordinated new-game narrative/state pass with explicit old-save treatment. Do not change only visible labels or award evidence from a scene number.

The unified NPC delivery scheduler, complete G1–G6 dialogue, ACT 4 disclosure order, Nora thread/SOURCE ROOM, a substantial group evidence session, audio availability and Android background behaviour remain **PARTIAL or NOT TESTED**. Physical Android UAT, author narrative acceptance, 60–90 minute observed playtime and signed release are **NOT TESTED**. Existing password and S30 preservation are source-level in this pass, with automated regressions recorded separately below. No new evidence media or voice memo was fabricated.

## Actual validation

| Check | Status | Result |
| --- | --- | --- |
| Typecheck | PASS | `npm run typecheck` |
| Lint | PASS | `npm run lint` |
| Unit tests | PASS | `npm test -- --run`: 192/192, 20 files after the save-validator edit. |
| Production build | PASS | `npm run build`; Vite emitted a non-fatal bundle-size advisory. |
| Browser tests, sandboxed | BLOCKED | Playwright worker `spawn EPERM` before test execution. |
| Browser tests, local process permission | PASS | After correcting the old assertions and save validator, the final complete run passed 52/52 in 4.8 minutes. An earlier 50/52 run and then a targeted 2/3 run exposed the stale assertions and a real reload rejection; targeted opening rerun passed 3/3. |
| Capacitor sync | PASS | `npm run cap:sync` copied the final production bundle. |
| Android debug APK | PASS | `./scripts/build-android-debug.ps1 -Offline`: `BUILD SUCCESSFUL in 14s`; 93 tasks. APK: `android/app/build/outputs/apk/debug/app-debug.apk`, 16,814,135 bytes, SHA-256 `38D46DFCE1556C49CAB4B1B7BC6BE300C53544E2BAB90827204318D58E34EAAF`. Non-fatal Android analytics-settings permission warning remains. |
| Physical device / signed release / author review | NOT TESTED | No device or release-signing evidence. |

Do not treat this report or an APK build as Episode 01 V6 acceptance. The recommendation remains **PARTIAL implementation; production acceptance withheld** until the narrative/state conflicts, branch coverage, device test and author review are resolved.
