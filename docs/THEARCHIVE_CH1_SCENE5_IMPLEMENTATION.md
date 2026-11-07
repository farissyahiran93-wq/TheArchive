# Chapter 1 Scene 5 — implementation report

Status: implemented; automated validation complete. Human acceptance and physical-device testing remain separate. No APK was built.

## Route and consent

The master route requires the completed, accepted and inspected Scene 4 archive. Scene 5 begins only when the player opens Unknown and selects START SCENE 5. Eight introductory decisions and two post-recovery decisions each have three authored alternatives and require selection plus Send. Replies reveal only what the chosen player message actually says; neither opening a fragment nor privately saving it sends it to Unknown. Scene 4 history is retained.

TRACE package metadata and risk review are separate from explicit INSTALL. Decline and defer persist and can be reconsidered. Installation adds the virtual TRACE app to Home; no external software or real phone data is accessed. Opening TRACE, selecting the accepted encrypted archive and starting recovery are separate actions. The accepted original is also shown in Files. The historical TRACE and saves keep their existing route.

## Recovery and evidence

TA-R01 is a deterministic first batch of four unique fragments, 30 authored units each, from a versioned 1,000-unit denominator: 120/1,000 = 12%. The unit is a narrative manifest weight, not a physical byte count. Recovery is idempotent and cannot process the batch twice. The four IDs and their full fragment text are in the screenplay and `src/content/masterScene05.ts`. Each is partial, source-unverified, and has an unavailable timestamp and unrecovered gap. Activity Logs and all other future categories remain unavailable.

Opening a fragment records its read status. SAVE FINDING is separate and creates a private unverified evidence record. Summary entries derive only from fragments the player opened, cite their IDs and offer INSPECT SOURCE. They distinguish source text from the tool's supported observation and make no claim about Daniel's fate. A player must open all four, save at least one finding and explicitly Send both concluding choices; the second is the required scoped report. Completion records `TA-S05-COMPLETE` and `TA-S05-SCENE06-UNLOCKED`; it neither starts Scene 6 nor recovers activity logs.

## Persistence and verification

The optional `masterScene05` state stores conversation, draft, package decision, install, manual opening, selection, first batch, reads, saved findings and completion. Existing save state and Scene 4 conversation are retained. Reload validation and guarded pure reducer actions reject or ignore invalid sequences; unique IDs prevent repeated progress.

Before implementation, the unchanged Scene 4 suite passed 197/197 browser tests in 17.6 minutes. Scene 4 content SHA-256: `7D1EE452520B5CB5AF3A8DE2B65D410807E7F10D12A3CAA52E60CACC42887E7A`; reducer SHA-256: `0AA1F1C0E7BCB4817FCEA737C96B961909BA4D16EB35897830A04631263970FD`. The focused post-change Scene 4–5 browser tests passed 3/3; unit tests passed 1,484/1,484; typecheck and lint passed. Final production build passed (Vite reported its existing large-chunk warning). Final full browser regression passed 198/198 in 17.4 minutes on the stable final code. Log: `artifacts/master-story-2026-11-05/scene5-final-regression.log`.
