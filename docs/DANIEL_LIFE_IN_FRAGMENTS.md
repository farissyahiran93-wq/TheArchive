# Daniel Mercer's Phone — Life in Fragments

Owner sources supplied 22 October 2026:

- `33e63be1-afa5-4d74-ba1a-b27933de74d4/Pasted text.txt`: Scene 06/07 narrative and UX specification v1.0.
- `a39edcfb-6194-4386-8516-1d71709990e2/Pasted text.txt`: accompanying Unknown outline and first mirror entry.
- Direct instruction: recovery should open immediately for testing, rather than requiring a 25-minute wait.

## Audit, scope and canon decisions

The existing Chapter 2 access arc already provided the complete branching Unknown conversation, package consent/rejection, one installation takeover, passive Messages integration, saved recovery timestamps and the delayed existing FIND DANIEL thread. Its twelve group readiness lines remain unchanged. `chapter2Access` in the existing Zustand GameSave remains the sole state domain; this feature adds optional `details` fields rather than a second store, schema migration or save reset.

The accompanying Unknown outline differs from the earlier complete screenplay and supplies reactions for only selected routes. The complete U01–U08 branches therefore remain in use; no missing replacement reactions are invented. The new mirror specification explicitly asks to preserve that dialogue and graph. The alternative Maya notification wording in the mirror proposal is likewise not substituted over the already approved group readiness script.

The existing fixed Greyhaven story calendar is 8 October 2026. October entries in the proposed 19 October content set are shifted back fourteen days, preserving weekdays and the relationship between the historical Nora chat, Friday appointment and dinner reservation. The dataset's adjusted content anchor is 5 October; this is not a claimed last synchronization or disappearance time. The dry-cleaning entry is now 6 October and remains a scheduled snapshot entry with unverified attendance, not proof of an event. September's annual birthday/gift entries stay 18/16 September. Maya's Calendar birthday, Contacts field and DDMM lock answer derive from one configuration. No current device date is used for historical record dates or the nested static 9:41 display.

The source's premise about earlier verified evidence is not used to award missing Chapter 1 flags. Index provenance, 7-14, Session 02, E—I, Participant B, Daniel's location and Unknown's identity remain unresolved. Historical readings never add live NPC knowledge or change relationships.

## Implemented content

`scripts/import-daniel-life.py` imports the supplied prose and applies the calendar adjustment into `src/content/danielLife.ts`.

| App | New authored content |
| --- | --- |
| Messages | 6 historical threads; 48 authored chat bubbles across five conversations, plus one unavailable attachment thread |
| Mail | 4 complete entries, including Storage Notification |
| Photos | 6 metadata entries: five intentional graphic placeholders and one unavailable preview |
| Notes | 7 complete notes; N7 is individually locked and optional |
| Maps | 6 fictional saved/recent/search-history places and a local schematic |
| Browser | 7 historical searches and 1 complete cached fictional Nora article |
| Calls | 5 historical call records; calling disabled |
| Contacts | 8 entries, including birthday and ordinary family metadata |
| Files | 4 read-only entries/summaries; no real PDF generated |
| Calendar | 8 scheduled entries with September/October month, week and day views |
| Voice | 5 exact accessible transcripts; audio unavailable |
| Deleted | Six type/count slots (3 Messages, 2 Photos, 1 File), with no invented recovered bodies |

There are **67 new catalog records** outside Deleted. The prior ten access-arc fragments remain in `src/content/chapter2AccessMirror.ts`, accessible as earlier fragments in their corresponding apps. The old legacy MIR catalog, four original independent locks and supplied six-image Gallery remain untouched.

## Integration and interaction

- `src/game/danielLife.ts`: pure navigation/back/forward, per-app list state, saved query/month/day/view and scroll positions, optional note lock/attempts, read receipts and independent observations.
- `src/game/chapter2Access.ts`: optional detail state, guarded recovery eligibility, production completion deadline and authorized development-test completion. Existing Unknown/package/group transitions are reused.
- `src/ui/DanielLifePhone.tsx` and `daniel-life.css`: nested phone, twelve app tiles, historical speaker alignment, local calendar, offline browser/map, keypad, transcript disclosure, full-phone photo placeholder viewer with X and zoom, persistent outer Archive exit and inner Home.
- `src/ui/Chapter2Access.tsx`: existing Archive entry now opens the expanded mirror while retaining the unverified-source/device-not-connected explanation and Messages relay sheet.
- `src/game/store.ts`: development preview explicitly permits the owner's immediate recovery testing instruction; no system GPS, real calls, contacts, external browsing or uploads are introduced.

Only title and accessible metadata enter search for a locked note. Its body is absent from DOM, saved state and search until the correct code is entered. A wrong code preserves all other progress and never starts recovery. Reading Calendar/Contacts supplies the birthday observation; entering the valid code and opening N7 supplies its separate observation. Voice observation requires the explicit Transcript action, not merely launching Voice or opening its row. Reading Nora's article, appointment and Ridgeway detail creates independent player-only receipts.

## Immediate recovery for testing

New jobs require opening Mail → Storage Notification. Other apps remain freely explorable in any order. Existing running jobs are preserved and are not retroactively blocked by this new eligibility receipt.

In the current **development preview**, START RECOVERY → START — OPEN NOW marks the six metadata slots ready immediately. An older running job has **Open recovery now · test**. Both retain the original `startedAt` and `dueAt` and persist `testOpened`/`readyAt`; repeated activation cannot duplicate a job or completion event. This testing exception follows the direct user instruction and supersedes the attachment's no-skip requirement for preview only.

Production builds keep the real persisted 25-minute deadline and contain no test-open control. At the deadline, a single stable readiness event enables only the six neutral type/count slots. It does not invent their messages, photos or file. The existing live Maya notification remains eighteen seconds after the original recovery start, independently of immediate test opening or production completion. It never opens the live group automatically or tells NPCs what the player inspected.

## Assets and practical limits

No new photo or voice recordings were supplied. Five photo entries deliberately use neutral local graphic placeholders; IMG_0714 is explicitly unavailable. All five voice memos expose the authored transcripts on request with a disabled, honestly unavailable audio control. No silent playback, generated voice, unrelated Gallery prop or remote photo is substituted. Six deleted content bodies remain unspecified, with a development explanation and neutral production fallback. These media/content portions are **not fully delivered assets**.

Keyboard Escape and the explicit inner/outer back controls are implemented. Android hardware-back behavior and OS-kill recovery on a physical APK device are **NOT RUN**; browser responsiveness is not claimed as native-device certification. Existing save interruption protection remains intact. Browser tests that intentionally reload after synchronous fake-clock batches now wait for the durable save queue; the separate interrupted-write regression cases continue to test that protection.

## Validation

- Typecheck: PASS.
- Lint: PASS, no warnings.
- Unit tests: **521 PASS / 29 files**, including 14 new mirror tests and the updated production recovery prerequisite/completion test.
- Production build: PASS; existing chunk-size advisory remains (790.80 kB main JS, 227.66 kB gzip).
- Focused browser suite: **12 PASS**, 34.5 seconds, under `artifacts/daniel-life/checked-focused`. Includes the full Unknown → decline/reload → consent → storage mail → immediate recovery → existing group route; all twelve apps at 320px; lock/no-search-leak/reload; independent source observations; no external requests; old jobs; photo X/zoom; and remembered calendar month.
- The first focused run found ambiguous underlying/modal NOT NOW locators; tests now scope the confirmation dialog. A later full-route reload interrupted an artificial fast-forward save batch; normal reload assertions now wait for the existing journal to drain. Application persistence safety was not bypassed.
- Full browser regression: **82 PASS / 0 FAIL**, 5.8 minutes. Command: `npm run test:e2e -- --workers=8 --output=artifacts/daniel-life/full-browser-results`. Covers Chapter 1's complete 14/13/19-choice sequence, unchanged Unknown/package flow, legacy save regression, the expanded mirror and immediate preview recovery. No source changes occurred during this full run.
- Visual checks: PASS for 320px historical Maya dialogue, September calendar/date cells, unlocked note and immediate-recovery view with the existing shell-level group notification. Intentional photo placeholders and absent audio remain the limitations stated above; native APK device behavior remains NOT RUN.
