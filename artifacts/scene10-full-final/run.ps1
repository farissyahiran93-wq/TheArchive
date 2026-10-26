Set-Location -LiteralPath 'D:\Web app\TheArchive'
$env:PLAYWRIGHT_PORT='4243'
$started=(Get-Date).ToString('o')
& python artifacts/scene10-full-final/snapshot.py before
if($LASTEXITCODE -ne 0){exit $LASTEXITCODE}
& npm.cmd run test:e2e -- --workers=1 --timeout=180000 --output=artifacts/scene10-full-final/results
$code=$LASTEXITCODE
& python artifacts/scene10-full-final/snapshot.py after
$integrity=$LASTEXITCODE
@{exitCode=$code;sourceIntegrityExitCode=$integrity;startedAt=$started;finishedAt=(Get-Date).ToString('o');command='PLAYWRIGHT_PORT=4243 npm run test:e2e -- --workers=1 --timeout=180000 --output=artifacts/scene10-full-final/results'} | ConvertTo-Json | Set-Content artifacts/scene10-full-final/completion.json
if($code -ne 0){exit $code}
exit $integrity


