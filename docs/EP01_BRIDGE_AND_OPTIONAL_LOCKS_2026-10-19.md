> Runtime integration update (19 Oct 2026): see [the current integration audit and scene crosswalk](EP01_FULL_INTEGRATION_REPORT_2026-10-19.md). Paced Sophie messages, explicit recovery dialogue, disclosure branches and the public Bulletin handoff now run in code. Earlier implementation/QA limitations below are historical; use the new report for executed results. The 14 bible beats do not add canonical scenes.

# Episode 01: Sophie → Daniel's iPhone → Bulletin continuity patch

**Implementation date:** 19 Oct 2026. This supplements the existing S01–S30 scripts; it does not rewrite or replace the GCRO/Bulletin investigation.

## User-facing sequence

1. Sophie first contacts the player on their own simulated iPhone. The player explicitly selects a response and presses Send. A handwritten note contains the recovery token `ECHO-7/14` and the number range `7–14`.
2. The player inspects a source-unverified restoration request and authorises a fictional, local, read-only mirror. This is not a real APK installation or a live iPhone clone.
3. The mirrored iPhone includes ordinary Messages, Email, Gallery, Notes, Calls, Files, Browser, Maps, Contacts and Archive Index. Ordinary records are readable without passwords.
4. **Optional locked items:** two Notes and two Hidden Gallery albums each use a separate password. An incorrect password leaves the item locked but causes no penalty. A Help button reveals one hint at a time, pointing to actual *accessible* material in the other apps. Each unlock is saved independently to IndexedDB through the existing save mechanism. Secrets behind locks are never shown by the UI before a correct password.
5. To log the first discrepancy, the player must actually view the **ordinary Untitled Note** and **Archive Index report**, then select Record discrepancy. **14 signed / 13 visible / zero deletion logs** remains only a source-limited observation.
6. Sophie points towards the Greyhaven Bulletin: Maya kept an older **Bus 4 public preview**. Back on the player's home screen the public Bulletin provides the next investigation action. The player must independently compare **Escort: June Ellis** on the older image with the blank Escort field on the current copy. The 14/13 index mismatch and this field difference have not been proven to have the same source or cause.
7. The existing Bulletin/Maya investigation (S02–S30), source checks, GCRO request, `K02` and ending S30 remain in their existing paths. Maya does not automatically learn that the player saw the private recovered mirror.

## Private content design

| Item | Accessible? | Hint source | Password logic | Reveal (not independently verified) |
| --- | --- | --- | --- | --- |
| Ordinary Notes: Untitled, To myself | Yes | — | None | Revision cautions and `7–14` |
| Locked Note: revision copy | Optional | Sophie's physical note | Full recovery phrase | Signed count differs from visible index |
| Locked Note: public comparison | Optional | Mail / Bus 4 | Vehicle label without spaces | Bus 4 comparison pointer, explicitly not proven same cause as 14/13 |
| Ordinary Gallery: North Quay shelf, message crop | Yes | — | None | Partial thumbnails and recovered text |
| Hidden Album: Index fragments | Optional | Untitled Note | Numeric range | Partial index image/timestamp descriptions |
| Hidden Album: Quay references | Optional | Maps saved location | Place name without spaces | Damaged notice board / map screenshot descriptions |
| Protected encrypted container | No, not Episode 01 | None | Unavailable | Nothing |

No password is required to reach the public Bus 4 investigation; the optional locks enrich the mystery only.

## Timeline and epistemic boundaries

- Last confirmed Daniel contact: **4 Oct 2026**; missing report **5 Oct**; Bulletin brief **7 Oct**; prologue/play session **8 Oct**.
- The recovered Maya ↔ Daniel exchange is labelled **3 Oct**, not 6 Oct: it must not imply a verified Daniel reply after the last known contact. The Annex search is likewise dated 3 Oct and is **not** a visit record.
- Ordinary recovered messages, screenshots, notes, and maps are not automatically authentic. No individual perpetrator or sender is identified.
- Sophie has no authenticated knowledge of the mirror's origin; the player retains control of any disclosure to Maya.

## Implementation files

`src/content/opening.ts`, `src/game/opening.ts`, `src/game/store.ts`, `src/game/types.ts`, `src/game/engine.ts`, `src/ui/DanielMirror.tsx`, `src/ui/OpeningPrologue.tsx`, `src/ui/SophieConversation.tsx`, `src/ui/HomeScreen.tsx`, `src/ui/opening.css`, `src/game/opening.test.ts`, `tests/e2e/sophie-opening.spec.ts`, `tests/e2e/sophie-optional-locks.spec.ts`, `AGENTS.md`.

## QA boundary

- TypeScript/TSX **syntax transpilation** passed locally.
- Pure state transition smoke assertions passed for access, independent locks, hints, index gating, Bulletin handoff and migration compatibility.
- `npm ci --offline` failed because the package cache lacks `zustand`; an online install also failed with npm's `Exit handler never called`. Node version 22.16.0 does not meet the minimum for several locked dependency versions. Therefore **typecheck, lint, Vitest, build, Playwright and APK testing are NOT verified** in this patch. A supported runtime and clean dependency installation are needed before release.
- Gallery visuals are placeholders, not fully authored forensic image assets. Natural NPC typing cadence, voice call, detailed Sophie branching and full iMessage clone interactions remain follow-up tasks.
