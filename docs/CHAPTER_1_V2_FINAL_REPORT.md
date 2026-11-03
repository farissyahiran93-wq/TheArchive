# Chapter 1 v2 — Phase 08 final audit and release notes

Date: 2 November 2026. Display title: **GREYHAVEN**. In-game investigation app: **TRACE**. This phase changes the web runtime and local save route; it does not package an APK, commit or push.

## Release decision

The ten-scene route is selected for genuinely new investigations by the persisted `chapter1Edition: 'ch01-v2-10'` marker. Untagged investigations retain their historical scene graph and their original contents. Release validation is recorded below; a physical Android playtest and editorial playthrough remain manual checks. Narrative quality is not rated 10/10 without that review.

## Main-scene flow

| No. | Scene | Entry and required exit |
| --- | --- | --- |
| 01 | A Message from Sophie | Existing authored opening; player sends the invitation response. |
| 02 | The Uninvited Guest | Existing FIND DANIEL group script; Lucas departure and group completion retained. |
| 03 | Just Between Us | Existing Sophie private script and manual handoff. |
| 04 | The Public Story | Existing article and metadata-limited index investigation. |
| 05 | Version History | Existing manual article follow-up; no recovered earlier body or diff. |
| 06 | The Corrections Desk | Existing revised desk conclusion. V2 completion emits a once-only Scene 07 lead without entering the historical Byline. |
| 07 | The Starred Number | Manual entry; contact-export inspection, one main reply, optional questions, private conclusion. |
| 08 | The Last Check-In | Manual entry; Lucas or Maya-mediated route, preserved exchange inspection, private conclusion. |
| 09 | The Secondary Card | Manual entry; Maya conversation, reference-card inspection, Case Board comparison, private conclusion. |
| 10 | The Inventory Sheet | Manual entry; five source inspections and private conclusion, Home pause, answer/decline/callback call, two explicit reply choices, chapter ending. |

Optional chats, calls, Browser pages and evidence views are not main scenes. Chapter 2, **THE PEOPLE HE LEFT BEHIND**, unlocks only when the v2 call reaches valid saved completion. The player chooses when to enter Chapter 2.

## Dialogue, evidence and canon audit

Scenes 01–06 use their existing final scripts. Scenes 07–10 have complete authored v2 dialogue and explicit player selection/Send or private Save. Scene 07 respects unknown star authorship and the fictional player number. Scene 08 treats Lucas's preserved exchange as received material with unverified date, provenance, completeness and authenticity. Scene 09's `GH-DSC-03-A` reference card is separate from Scene 10's physical warning card. Scene 10 establishes only a box-inventory reference: descriptor body, item-level list, original notice, `GB-REF-017` connection, Daniel's fate and culprit remain unknown. Sophie is Daniel's sister; Maya his fiancée; Lucas his childhood friend; Eli his colleague; Nora Vance the journalist. The earlier article version and TRACE index provenance remain unverified.

NPC knowledge uses saved recipient receipts or existing story flags. Private conclusions create unverified player evidence only. The combined starred-contact evidence is retained after both the number and star are inspected. The physical warning evidence and player knowledge are awarded only after its subtitle is due and the player continues the call; chapter completion waits for the final line's due time. Optional contact routes change trust, affinity or suspicion in measured increments; no mandatory scene is locked by a relationship score and no v2 path forces romance. New scene dialogue waits at authored timestamps, shows a typing state and scrolls to delivered lines. The call subtitles and manual response controls remain available without audio.

The received Lucas capture and Maya photograph have no supplied original image pixels. The UI presents text-backed evidence views and explicitly states that limitation; it does not fabricate image evidence. The Case Board comparison is a private link, not a verified shared provenance claim.

## Save compatibility and recovery

No existing save is silently converted. The version marker is added only to a blank save on first normal entry or to an explicitly started New Game. Existing saves before Scene 04, during Scenes 04–06, during old Scenes 07–10, at the old Scene 10 boundary and after old completion remain on their historical graph. The old 18-scene planning map remains in `chapter1V2LegacyMap`; Scenes 07–18 cannot be mapped to v2 completion because their choices and evidence differ. Historical Chapter 2 state remains intact.

Starting a new investigation writes the prior primary save to a separate key in the same `the-archive-reboot` IndexedDB transaction, then writes a blank v2 primary save. Settings lists archived investigations and can restore one; restoration archives the current primary first. Save revisions and compare-and-swap prevent overwriting a newer primary. The unrelated `the-archive:game-save:v1` key is untouched. This is an explicit restart route, not a fabricated migration.

## Files changed for Phase 08

`src/content/chapter1V2.ts`; `src/game/{types,engine,store,save,scene06,sceneLibrary,chapter1V2.test,chapter1V2Finale.test,save.test}.ts`; `src/ui/{Chapter1Investigation,Chapter1V2Hub,CorrectionsDesk,MainMenu,StarredNumberV2,LastCheckInV2,SecondaryCardV2}.tsx`; `src/ui/usePacedSceneLines.ts`; `src/GameEntry.tsx`; `tests/e2e/{main-menu,chapter1-v2-finale,phone-polish}.spec.ts`; this report. The v2 scene and call implementation files listed in `docs/CHAPTER_1_V2_SCENES_08_10_IMPLEMENTATION.md` and `docs/CHAPTER_1_V2_PHASE_07_CALL_UX.md` are part of the release baseline.

## Checks and remaining manual tests

Final Phase 08 checks: `npm run typecheck` passed; `npm run lint` passed with no warnings; `npm test` passed, **1,439 tests across 57 files**; `npm run build` passed with the existing large-chunk advisory; `npm run test:e2e -- --workers=4` passed, **176/176 browser tests**. The first full browser run had one legacy desktop viewport assertion fail at 99.68% visibility; a 0.99 threshold for fractional Chromium pixel rounding passed both targeted and in the final full suite. A concurrent eight-worker rerun hit unrelated timeouts while build/unit checks were running; it was stopped and replaced with the isolated four-worker full pass. Targeted browser checks also covered (1) v2 Scene 06 → manual Scene 07 and reload and (2) atomic historical archive/restore. Automated coverage includes all nine first/second call reply combinations, decline/missed callback, no duplicate ring, save/load during call, Chapter 2 gate, evidence uncertainty, Scene 07–10 objectives and the historical registry.

Manual playtest checklist:

- Complete fresh v2 playthroughs with cooperative, defensive and evidence-focused replies. Confirm all ten titles and manual scene entries.
- Repeat with voluntary TRACE/Archive installation accepted and declined; confirm optional activity never awards mandatory evidence.
- Choose low-trust Lucas outcomes and confirm Maya's mediated route preserves the required exchange.
- Inspect the call on a physical Android device: ringtone permission, background/resume, safe areas, timer, touch targets, decline and callback.
- Read each branch aloud for natural tone, pronouns, codename substitution, subtitle timing and no unintended speaker knowledge.
- Load real historical saves from every listed boundary, choose Continue, then archive/start v2 and restore the historical save from Settings.
- Review evidence and Case Board at 320px, common Android widths and desktop for clipped text, correct scroll and distinct card labels.

Known limitations: no physical Android test performed; Lucas capture and Maya card original pixels unavailable; no prerecorded Sophie voice asset. A text-first finale remains playable without audio. The production JS bundle still emits a size warning.

## Readiness assessment

The versioned web route is active for new investigations and **ready for a controlled web playtest**: all required automated gates pass. Historical saves have an explicit, reversible restart path. Public narrative sign-off or a 10/10 rating still requires the manual character, pacing, physical Android and real-save review above. No APK is included in this release.
