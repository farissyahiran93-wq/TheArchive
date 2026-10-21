# Phase 02B — editorial change and acceptance record

**Historical baseline:** this records the 02B verdict before the Phase 02C revisions. The current manuscript verdict is in [02C acceptance](14_PHASE_02C_ACCEPTANCE_REPORT.md); the 02B `PARTIAL` and “do not start Phase 03” statements below describe that earlier snapshot.

**Date:** 16 October 2026. **Scope:** Episode 01 screenplay and narrative support files only. **Authority:** Gate-A-01 and D01–D21 remain unchanged. **Verdict:** Phase 02B manuscript deepening performed; Episode 01 screenplay **PARTIAL**, pending independent editorial table read and meaningful-duration evidence. Gate B is **NOT IMPLEMENTED / NOT TESTED**. No new owner policy acceptance is requested or implied.

## Baseline and direct edits

The six original Act files were preserved before editing in [the pre-edit backup](.phase02b_preedit_acts.zip). Their baseline SHA-256 values, in Act order, were `4c64e8dca1a58b6e4dfeab34c9569e617d040738cbf8a7e84345ada1d5e19bb6`, `fc1ab6ca801a98bc2c6c943884790ec597cbcd8bd8912363493361a7d0b98dbf`, `d6612133b8b6acad24b5cde8d3051bb485a2e61eec21ec9a1088d75ba79708a6`, `8b05479d5c15a3154d34f580651b66e45359a547bc98e9f`, `bac1e192c5d976e360b998d7c516a8a11626c392d3c026784a1d46fcd8135e9f`, and `d2ce7ddfd7745423b92daafe4baad3e5ea854e0d077ea6670b48c349149d6e41`. They contained 11,521 whitespace-delimited words. New Act total is **14,160** (+2,639), across the same 30 sequential scenes. Count is an inventory, not a quality or timing claim.

| Act | Original words | Revised words | Change |
| --- | ---: | ---: | ---: |
| 01 | 1,496 | 1,801 | +305 |
| 02 | 3,048 | 3,515 | +467 |
| 03 | 1,220 | 1,488 | +268 |
| 04 | 2,324 | 2,869 | +545 |
| 05 | 1,519 | 1,949 | +430 |
| 06 | 1,914 | 2,538 | +624 |
| **Total** | **11,521** | **14,160** | **+2,639** |

| Act / scenes | Substantive text change | Preserved boundary |
| --- | --- | --- |
| 01 / S03 | Daniel's ordinary habit of retaining old correction labels, a more personal missing-person notice, family permission distinguished from the document decision, and a readable portrait description. B01 now carries the matching full article and visible editor amendment. | No location, welfare or case-truth revelation. |
| 02 / S11–S15 | Maya admits she almost overclaimed the blank field; her replies differ for verification, skepticism, restraint and selected sharing. The S11-C route does not force the optional personal anecdote. S15 criticism/permission questions receive a visible public-note consequence. | No automatic player Send, no file authentication by Maya, no invented family approval of the crop. |
| 03 / S16–S18 | Maya explains two separate offers in human terms; question/refusal replies are scoped. Archive and public paths each state why a repeated crop is still one source, then converge on the same GCRO route. | Messages consent, R03 and evidence validity remain independent. |
| 04 / S19–S24 | Added a carrier-date interpretation, cautious Board headline, ordinary-correction example, false Search-match check and honest optional `7-14` handling. | E001 is a lead; E003 is a public notice; no K02 or decoded clue before E012. |
| 05 / S25–S27 | Maya's check-in now includes a specific truthful answer to Daniel's sister; boundary responses and criticism callbacks vary. The player distinguishes request receipt from issued evidence, including redaction-revision and refusal states. | No emotional/romantic requirement; GCRO eligibility is independent of trust. |
| 06 / S28–S30 | Page 2 reveal now gives the player a reason to finish source checks; invalid issue routes have distinct truthful copy. K02 requires explicit Board save. The finale juxtaposes verified lineage with role capability while forbidding an operator inference. No-tip research cannot end the episode until R01/S12. | R04 is requester-only; role class is not an operator; no runtime verification is claimed. |

## E012 fictional asset disposition

[The four-page text master](assets/GCRO-EXP-20261008-041.txt) is a complete authored in-world document, separate from the Markdown quotation in [P04](04_EPISODE_01_IN_WORLD_ASSETS.md#p04--gcro-redacted-lineage-view-e012). It is serialized as UTF-8 without BOM, LF line endings, one final LF and page separators `PAGE n OF 4`. Actual file length: **2,012 bytes**. Actual SHA-256: `887c59c42ea8b375737b78a3e79ae0d8d57da7c8698e7e21adea955136d730de`. This is the repository master integrity value. It is not a fictional officer signature, an issued transfer or proof that runtime checked anything. S27 eligibility, a recipient-bound S28 issue envelope and checks against the *delivered* bytes remain mandatory before R04/K02.

## Validation actually run

- `python docs/narrative/phase-02/manuscript_audit.py` — **PASS**: six Acts, 30 ordered unique scenes, 56 unique option IDs under its pattern, asset size/page/encoding/digest checks, Act word inventory. This is structural, not prose quality or route execution.
- Read-only local Markdown scan — **PASS**: 73 file references with zero missing targets and 15 heading anchors with zero slug mismatches.
- `rg` over the six Acts and E012 text asset found **zero** `TODO`, `TBD`, `[reacts]`, `[Maya explains]`, `lorem` or `placeholder` markers. This does not certify every line is production-ready.
- `node docs/narrative/phase-01g/static_route_model.mjs` — **PASS** on its pre-existing design model: 15 E01 mock paths / 30 S30 checks, 29 T07 mock paths, eight consent, 16 low-trust/record and four welfare checks. It does **not** execute revised Act text or a runtime build.
- Manual targeted manuscript read covered eight route classes at the 02B baseline. It was internal review, not independent editorial acceptance or a human playtest; the fuller [02C scene-by-scene traces](11_PHASE_02C_PAPER_PLAY_TRACES.md) supersede that route note.

## Acceptance decision and exact next work

**Internal editorial finding:** source permissions, knowledge gates, story chronology and the selected branch responses remain coherent in the reviewed text. The new material improves specificity without changing canon. **Acceptance still pending:** an independent Narrative Director/editor table read of the six Acts, a blind paper play of I01–I07 on both social and quiet routes, and a meaningful active-time sample. These checks may require targeted line revisions, but not another general policy phase. The [handoff](09_PHASE_02_HANDOFF_AND_REVIEW.md) lists the exact work. Do not label Phase 02 COMPLETE or start Phase 03 solely because all scene IDs and a digest are present.

**Historical 02B internal quality rubric:** ten dimensions averaged **7.3/10** with equal weight; long-form pacing was the weakest at 4/10. This was a provisional manuscript judgment, not a blind-player score, owner acceptance or claim of premium 10/10 quality. The [02C findings and current rubric](10_PHASE_02C_EDITORIAL_FINDINGS.md) supersede it for the revised text.
