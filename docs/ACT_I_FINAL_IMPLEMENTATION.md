# Act I final screenplay integration — 23 October 2026

## Authority and exact scope

Owner request: replace the conversations with the three supplied manuscripts. Scene 01 uses `sources/act-i-final/ACT_I_FULL_REWRITE.txt`; standalone `SCENE_02_FINAL.txt` and `SCENE_03_FINAL.txt` supersede the combined manuscript for those scenes. All three originals are pinned verbatim. This direct request supersedes the historical instruction to preserve the former first-three-scene dialogue and the provisional early warning.

`scripts/import-act-i-final.py` compiles the manuscripts offline into typed `src/content/actIFinal.ts`. No Markdown is interpreted by the game. All **46 main IDs** remain stable: 14 / 13 / 19 choices, **201 branches**, 5 / 7 / 10 optional premium responses. NPC lines, branch-specific reactions, authored effects and pauses are preserved. Every embedded player line is another selectable Send step. Typographical emphasis in plain message text is rendered as plain words. The optional personalized Sophie sentence is conditional on actual name disclosure.

## Runtime and compatibility

The existing `game/scene01.ts` runner, store, notifications, relationships, recipient receipts and chat renderer are extended. `content/actIRegistry.ts` resolves the pinned graph. New master-route starts carry `scene01.scriptRevision = final-2026-10-23`; historical saves without that optional flag keep the old graph, cursor, queue, delivered text and effects. Internal final nodes have distinct `FINAL` IDs while main choice IDs remain unchanged. Existing legacy-access fixtures explicitly use `beginLegacyScene01` so their assertions continue to verify the historical screenplay. No database reset, destructive transcript rewrite or legacy localStorage migration occurs.

New joins require JOIN GROUP and a separate manual group opening. C13 refusal retains an invitation; accepting it later plays the authored resume and waits for Continue before C14. Lucas leaves once on every C11 route. The private handoff remains 5.5 seconds, delivers `Hey. You got a minute?` once, and does not open Sophie automatically. Her following `Hey.` is the distinct authored opening line.

The private warning is exactly `You shouldn't be talking to her.` and arrives only after C09 and its branch/convergence finish. One message object supplies preview, notification and bubble. OPEN, LATER, explicit swipe dismissal, late inbox opening, one optional reply, silence and persistent block are supported. No anonymous response is generated. Returning to FIND DANIEL resumes the saved RETURN node once; neither C09 nor its effects replay. Natural banner timeout hides the banner but does not make a player decision.

The Scene 03 disclosure is offered at its authored safe beat only if the warning was opened. Keep creates no outgoing bubble. The first introduction sentence does not disclose the quote; Sophie receives the scoped knowledge and +1 trust only when the quote-bearing continuation is actually sent. Timing and response menus require Send; a prior reply controls which claims are available. No group member receives the warning. Late opening after the safe beat does not fabricate an additional interlude; future explicit disclosure remains an authoring dependency.

Knowledge facts are attached to delivered lines, not scene checklists. In particular, police-report testimony can now occur on Scene 01 C07-B as authored, and Scene 03 C06-B; some wedding and Axiom details remain branch-specific. The C01-B Scene 01 source omits Sophie's self-introduction; no extra line is invented. On that route her visible group sender name establishes her name when her first group bubble is delivered. It never discloses the player's name to her. The optional personalized sentence still requires the actual C08-A/D name Send.

The first incoming notification keeps the existing onboarding first-contact timer. Its introductory notification direction is not another fake message or an additional screen. Later message-specific pauses and typing turns are compiled into the existing runner.

## Verification at the Act I boundary

- Typecheck and lint passed.
- Unit suite: **898/898 passed**, 37 files, including **215 new final-script tests** with all 201 main branches exercised and save normalization after resolution.
- Focused browser: **3/3 passed** (`artifacts/act-i-final/recheck`): 320px invitation defer/join, private request/block/manual return and reload, conditional disclosure with saved draft and separate Send.
- Initial browser diagnostics: one reload raced the existing asynchronous save journal; another stopped at a frozen animation under the virtual clock. Tests now wait for the journal to flush and use reduced motion. Product recovery safeguards and dialogue assertions were retained.
- The final combined results, including the later scheduler guard and production build, are in `SCENE_04_PUBLIC_STORY_IMPLEMENTATION.md`.

The owner's subsequently supplied full Scene 04 is a separate continuation. Its article, delayed lead and index replace the former provisional Scene 04 route only for the final-script route; historical structural and Chapter 2 saves remain compatible.
