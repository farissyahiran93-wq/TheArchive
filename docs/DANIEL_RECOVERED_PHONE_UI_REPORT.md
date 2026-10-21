# Daniel recovered phone UI rebuild — 20 October 2026

Implemented in the existing React application. The attachment is a design brief; the supplied AGENTS.md and existing source catalog remain the authority for canon and evidence access.

- The recovered home now uses an original CSS wallpaper, stable four-column app layout, individual icon colors and a four-app translucent dock. The existing phone shell supplies the only status bar and camera island.
- All eleven recovered apps remain accessible. App lists and record readers are separate screens; opening an app no longer automatically reads its first record. Messages use conversations and read-only bubbles; unrecovered message descriptions remain contextual text. Gallery shows only registered media behind the existing individual access checks. Notes, mail, files, contacts, calls, browser, maps and index retain their source-specific readers and folders.
- Back returns to the app list or the preceding linked record. The bottom gesture button returns to Daniel's home; the explicit Exit action returns to the player's phone. Both prologue and later Archive entry routes use the same recovered interface.
- Integrity, partial coverage and read-only limitations are available through Device information. No invented notification count, contact data, message time, live browser, GPS, calling or sending action was added.
- Catalog IDs, original authored records, pure story transitions, recipient receipts, four passwords and save schema are unchanged. Existing IndexedDB record navigation is reused. Reopening after the prologue offers explicit Resume; an interrupted active investigation retains its record.
- Canonical index comparison is still an explicit action after the player reads both required sources. Password unlocks, viewing, retaining and private associations remain separate. No new mandatory clues or automatic disclosure were introduced.

Scope limits: this remains an incomplete offline snapshot. Original timestamps, missing keys, unavailable route data and original image provenance cannot be supplied by UI work. Character artwork is not recovered photography. The interface uses iOS-inspired CSS and Lucide symbols rather than proprietary Apple assets. Story Bible v2 is still absent; no chronology conflicts were resolved here.

Validation results are recorded after the final test run below.
## Verification on the current workspace

- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm test`: passed, 184/184 tests across 18 files.
- `npm run build`: passed. Vite reports a non-blocking JavaScript chunk size warning (>500 kB).
- `npm run test:e2e -- --workers=4`: 45/48 passed in the full run. The three failures were one stale assertion expecting the removed dashboard title and two 90-second timeouts in unrelated early phone flows. The stale assertion was updated by concurrent work in this shared workspace. `npm run test:e2e -- --last-failed --workers=1` passed 2/3; the remaining phone navigation test passed on a final isolated rerun. Therefore all 48 browser cases passed at least once on the current code, but there was no single clean full-suite run.
- Direct visual QA reviewed the 390px home and Messages screenshots in `qa/phase-04`; the home uses one shell status bar and a four-app dock, and the conversation remains read only.

The full suite ran while another opening reboot was being edited in this shared workspace. Its test files and `src/App.tsx` changed during one attempt, so intermediate failures from that attempt are not representative of this final source state. The final typecheck, lint, unit tests and build were repeated after those changes.
