# GREYHAVEN / TRACE rebranding — 31 October 2026

The owner supplied the rebranding request in the attached Pasted text.txt, retained verbatim at `docs/sources/GREYHAVEN_TRACE_REBRANDING_2026-10-31.txt`. GREYHAVEN is the game; TRACE is the fictional investigation app delivered through the existing anonymous-contact flow. Tagline: **Every secret leaves a trace.**

## Scope and compatibility

- Updated the game menu, session heading, loading messages, document title/description, favicon, Android labels and splash resources. The responsive wordmark fits the phone frame, including narrow landscape layouts.
- Updated the in-game app tile, investigation headers, package card (`TRACE.pkg`), security/install UI, navigation, notifications and app-name references. Dialogue changes substitute the application name only; there are no new lines, branches, outcomes or facts. The suggested replacement Unknown Sender speech and additional conspiracy were not added.
- Installation remains voluntary through the existing security prompt and saved stages. The sender stays anonymous. Initial access remains PARTIAL. The first workspace now explicitly distinguishes **0 recovered document records** from the **1 metadata-only reference** already supplied by the existing story. ARC-IDX-GB-041 is unchanged; it still has no recovered body, verified capture time or authenticated original.
- `com.thearchive.game`, custom URL scheme, WebView origin settings, debug signing configuration, Android version/code, internal `archive` navigation keys, event/choice/evidence IDs, chapter graphs and schema v1 are unchanged. No save migration is needed or added. IndexedDB `the-archive-reboot`, the pending-save journal, menu/audio preferences and the legacy `the-archive:game-save:v1` store retain their identifiers. Already-delivered old-brand messages are not rewritten during load.
- Relationship effects, recipient-specific receipts, explicit selection + Send, source inspections, Chapter 1/2 entry gates and production recovery deadlines remain intact. All pre-existing workspace edits were retained. No commit, push, APK packaging, device installation or published release was performed.

## TRACE tool architecture

`src/content/traceTools.ts` supplies the eight-module catalog. Pure selectors in `src/game/traceTools.ts` project capabilities from existing saved story conditions; they create no evidence, receipts or unlock flags. `TraceTools.tsx` is a collapsible access overview inside the existing origin, Version History and Chapter 2 workspaces. Actual actions stay in their existing guarded views/reducers.

| Module | Availability in this implementation |
| --- | --- |
| Evidence Vault | Existing app installation/access guard. Existing source-specific reads and saves remain separately guarded. |
| File Recovery | Existing Chapter 2 mirror + inspected Storage Notification gate, or an already-started saved recovery job. Shared `canStartAccessRecovery` guard; production remains 25 minutes. |
| Record Comparison | Existing Version History state with both public and index inspection flags. Reference comparison only; no recovered text/diff is manufactured. |
| Metadata Scanner | Locked; future authored implementation required. Existing visible metadata remains manually readable. |
| Connection Map | Locked; future authored implementation required. Existing private matching/board actions are unaffected. |
| Timeline Reconstruction | Locked; future authored implementation required. |
| Audio Analyzer | Locked; future authored implementation required. |
| Image Inspector | Locked; future authored implementation required. Existing image viewing is unaffected. |

No new sender-triggered unlock messages or hypothetical chapter thresholds were invented.

## Visible-reference audit

- Game branding: GREYHAVEN, including the legacy episode-completion game caption.
- In-game application branding: TRACE. Name-only substitutions also apply to newly delivered authored app-name lines and their corresponding choice tone strings. Persisted historical transcripts keep their original wording.
- **Archive Index**, **ARCHIVE INDEX — GB-041**, `ARC-IDX-GB-041`, source field labels and the recovered **Archive Index — integrity report** remain record/catalog terminology. The latter is also part of a legacy title-based inspection key and must not be renamed.
- The historical Bulletin route's **Greyhaven Memory Project / read-only Archive** in `e01Phase03b.ts`, `Phase03bScenes.tsx` and the corresponding historical Messages permission caption remains a distinct named source workspace. Relabelling its owner as the anonymous sender's TRACE would alter provenance.
- Generic references to archive rooms, institutional archives, archived records and chapter archives remain ordinary story/navigation language.
- Internal function/type/CSS names, package/storage IDs, the fictional historical `archive://session/access-02` locator, source manifests, pinned author manuscripts, historical reports, screenshots and delivered APK filenames remain unchanged unless the file is a newly generated QA capture.
- The previous favicon and Capacitor raster assets are retained as historical files. The web favicon and native launch splash now reference new GREYHAVEN resources. Android launcher icons were not replaced in this display-name/splash pass.

## Verification

All 164 browser scenarios have passing results across the full run and focused reruns; this was not a single clean 164-test run. Logs are in `artifacts/greyhaven-rebrand`.

- Full `npm run test:e2e -- --workers=4`: **151 passed / 13 failed** (15.9 minutes).
- `--last-failed --workers=2`: **12 passed / 1 failed** (5.1 minutes). The only remaining failure was the landscape wordmark width; the final frame-width correction followed this run.
- Final menu/installation checks: **7 passed / 0 failed** (53.2 seconds), covering all six menu viewport sizes, the remaining landscape case, explicit package cancellation/installation, reload, initial zero recovered records and the seven locked tools.
- Visual inspection: the 320px TRACE access overview, portrait GREYHAVEN menu and landscape menu were reviewed. Captures include `artifacts/greyhaven-rebrand/trace-initial-320.png` and `artifacts/main-menu/menu-390x844.png`.

- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm test`: **50 files / 1,368 tests passed**, including installation cancel/in-progress gates, source inspection prerequisites, production recovery timing, immutable capability projection and old-brand transcript/relationship preservation through normalization.
- `npm run build`: passed after the final landscape correction.
- `:app:processDebugResources --offline`: passed (45 tasks); no APK assembly/signing task was invoked.
- Browser verification additionally found older test assumptions that no longer matched the existing shell: the audio serializer now includes master/volume defaults, the 320px legacy Home lead can require scrolling, and explicit conflict recovery returns to the lock screen. Assertions were updated to check the complete persisted audio object and full lead visibility after an explicit scroll; no audio, Home or save-recovery implementation was changed.
- Early browser attempts included test interruptions from the favicon HTML reload, a narrow-landscape title overflow (fixed with container-relative typography and a 320px minimum desktop menu-frame width), stale game-versus-app selectors (corrected), and transient Windows screenshot-write errors. These are tracked for rerun rather than treated as passes.

## Limitations

- Five new analysis tools are architecture/catalog entries only and remain locked; no unapproved forensic capability is presented as implemented.
- Android resource compilation checks the new splash and labels; appearance and in-place save retention on a physical Android device have not been tested. Previously delivered APKs still contain their original branding. Native web assets were not resynced because this task does not package a new APK.
- Existing Vite large-bundle and Gradle flatDir advisories remain. Android analytics settings in the external user directory could not be written; resource compilation still passed.

## Changed source, configuration and test files

The list below is specific to this rebranding task, including updates to existing browser selectors. It does not claim ownership of pre-existing edits in these files. Test screenshots and build outputs are generated evidence, not story changes.

- `AGENTS.md`
- `README.md`
- `android/app/src/main/assets/capacitor.config.json`
- `android/app/src/main/res/drawable/greyhaven_mark.xml`
- `android/app/src/main/res/drawable/greyhaven_splash.xml`
- `android/app/src/main/res/drawable/greyhaven_wordmark.xml`
- `android/app/src/main/res/values/greyhaven.xml`
- `android/app/src/main/res/values/strings.xml`
- `android/app/src/main/res/values/styles.xml`
- `capacitor.config.ts`
- `docs/GREYHAVEN_TRACE_REBRANDING_2026-10-31.md`
- `index.html`
- `public/greyhaven-mark.svg`
- `src/App.tsx`
- `src/GameEntry.tsx`
- `src/content/articleReplyTones.ts`
- `src/content/chapter1Investigation.ts`
- `src/content/chapter1Plan.ts`
- `src/content/chapter2Access.ts`
- `src/content/chapter2Reunion.ts`
- `src/content/phone.ts`
- `src/content/scene10Final.ts`
- `src/content/traceTools.ts`
- `src/content/versionHistoryConversation.ts`
- `src/content/versionHistoryConversationData.ts`
- `src/game/chapter2Access.ts`
- `src/game/opening.ts`
- `src/game/phonePresentation.ts`
- `src/game/traceTools.test.ts`
- `src/game/traceTools.ts`
- `src/ui/Chapter1Investigation.tsx`
- `src/ui/Chapter2Access.tsx`
- `src/ui/CorrectionsDesk.tsx`
- `src/ui/DanielLifePhone.tsx`
- `src/ui/InventorySheet.tsx`
- `src/ui/LockScreen.tsx`
- `src/ui/MainMenu.tsx`
- `src/ui/OpeningPrologue.tsx`
- `src/ui/Phase03bRelease.tsx`
- `src/ui/PublicStory.tsx`
- `src/ui/Scene01Chat.tsx`
- `src/ui/SourceInvestigation.tsx`
- `src/ui/TraceTools.tsx`
- `src/ui/TransferRegister.tsx`
- `src/ui/UtilityApps.tsx`
- `src/ui/VersionHistory.tsx`
- `src/ui/VersionHistoryConversation.tsx`
- `src/ui/main-menu.css`
- `src/ui/trace-tools.css`
- `tests/e2e/act-i-final.spec.ts`
- `tests/e2e/ch01-master-boundary.spec.ts`
- `tests/e2e/chapter1-official.spec.ts`
- `tests/e2e/chapter2-access.spec.ts`
- `tests/e2e/chapter2-continuation.spec.ts`
- `tests/e2e/chapter2-reunion.spec.ts`
- `tests/e2e/character-followups.spec.ts`
- `tests/e2e/daniel-life.spec.ts`
- `tests/e2e/foundation.spec.ts`
- `tests/e2e/life-helper.ts`
- `tests/e2e/main-menu.spec.ts`
- `tests/e2e/maps-bulletin.spec.ts`
- `tests/e2e/mirror-native.spec.ts`
- `tests/e2e/opening-helper.ts`
- `tests/e2e/phase03a.spec.ts`
- `tests/e2e/phase03b-complete-route.spec.ts`
- `tests/e2e/phase03b-late-tip.spec.ts`
- `tests/e2e/phase03b-opening.spec.ts`
- `tests/e2e/phase03b-social-route.spec.ts`
- `tests/e2e/phase03c-recovery.spec.ts`
- `tests/e2e/phase04-mirror.spec.ts`
- `tests/e2e/phase05-media.spec.ts`
- `tests/e2e/phone-continuity.spec.ts`
- `tests/e2e/phone-first-v4.spec.ts`
- `tests/e2e/phone-polish.spec.ts`
- `tests/e2e/phone-settings.spec.ts`
- `tests/e2e/progressive-recovery.spec.ts`
- `tests/e2e/recovery-helper.ts`
- `tests/e2e/scene-message-markers.spec.ts`
- `tests/e2e/scene01-helper.ts`
- `tests/e2e/scene02-group.spec.ts`
- `tests/e2e/scene02-handoff.spec.ts`
- `tests/e2e/scene03-private.spec.ts`
- `tests/e2e/scene04-final.spec.ts`
- `tests/e2e/scene05-final.spec.ts`
- `tests/e2e/scene06-final.spec.ts`
- `tests/e2e/scene09-final.spec.ts`
- `tests/e2e/scene10-final.spec.ts`
- `tests/e2e/social-opening.spec.ts`
- `tests/e2e/sophie-opening.spec.ts`
- `tests/e2e/sophie-optional-locks.spec.ts`
- `tests/e2e/sophie-resume.spec.ts`
- `tests/e2e/source-investigations.spec.ts`
- `tests/e2e/ui01.spec.ts`
- `tests/e2e/ui02.spec.ts`
- `tests/e2e/v4-s30.spec.ts`
- `tests/e2e/version-history-conversation.spec.ts`
- `docs/sources/GREYHAVEN_TRACE_REBRANDING_2026-10-31.txt`
