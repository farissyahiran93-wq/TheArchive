# Phase 06G — Exact local Windows QA commands

Use an ordinary local Windows PowerShell terminal in a process-capable environment. These commands do not change Windows security, reinstall Chrome, clear game saves or skip browser tests. The repository's Playwright configuration uses installed Google Chrome, the Pixel 7 browser profile and a local Vite server at 127.0.0.1:4174. Close a previous project test server normally before the run so it cannot serve stale source. Do not edit game files during a run.

```powershell
Set-Location -LiteralPath 'D:\Web app\Detective games'
New-Item -ItemType Directory -Path '.\artifacts\phase06g' -Force | Out-Null
npm run typecheck
if ($LASTEXITCODE -ne 0) { throw 'Typecheck failed' }
npm run lint
if ($LASTEXITCODE -ne 0) { throw 'Lint failed' }
npm test -- --reporter=json --outputFile=artifacts/phase06g/unit-results.json
if ($LASTEXITCODE -ne 0) { throw 'Unit tests failed' }
npm run build
if ($LASTEXITCODE -ne 0) { throw 'Production build failed' }
$env:PLAYWRIGHT_JSON_OUTPUT_FILE = 'artifacts/phase06g/browser-results.json'
npm run test:e2e -- --workers=4 --reporter=list,json 2>&1 | Tee-Object -FilePath '.\artifacts\phase06g\browser-output.log'
$taskBrowserExit = $LASTEXITCODE
Remove-Item Env:PLAYWRIGHT_JSON_OUTPUT_FILE
if ($taskBrowserExit -ne 0) { throw "Browser suite failed or was blocked (exit $taskBrowserExit); retain the log and JSON." }
npx cap doctor
if ($LASTEXITCODE -ne 0) { throw 'Capacitor Doctor failed' }
npx cap sync android
if ($LASTEXITCODE -ne 0) { throw 'Capacitor sync failed' }
.\scripts\build-android-debug.ps1 -Offline
```

The exact requested default browser command is also `npm run test:e2e`; the added workers/reporters above execute all the same 43 scenarios and retain machine-readable results. Reporter selection is not filtering. `npm run test:e2e -- --list` verifies discovery only and cannot establish gameplay acceptance.

Retain browser-output.log, browser-results.json, unit-results.json and any `test-results/*/error-context.md`, screenshots or traces. Share their actual contents for analysis; do not report test discovery or a process launch failure as a passed scenario. A JSON run with skipped, failed, unexpected or flaky tests needs explicit investigation. Native OS keyboard/touch, phone calls and actual Android lifecycle still require the physical-device worksheet.

If Node process spawning still fails with EPERM in a sandbox, report BLOCKED and run the commands from the permitted local terminal. Do not add `--no-sandbox`, skip scenarios, change ACLs globally or discard user caches to force a pass. A busy approval service supplies no code-review result.
