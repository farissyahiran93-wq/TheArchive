Set-Location -LiteralPath 'D:\Web app\TheArchive'
$env:PLAYWRIGHT_PORT='4223'
$started=(Get-Date).ToString('o')
& npm.cmd run test:e2e -- --workers=3 --timeout=180000 --output=artifacts/source-investigations-clean-final/results
$code=$LASTEXITCODE
@{exitCode=$code;startedAt=$started;finishedAt=(Get-Date).ToString('o');command='PLAYWRIGHT_PORT=4223 npm run test:e2e -- --workers=3 --timeout=180000 --output=artifacts/source-investigations-clean-final/results'} | ConvertTo-Json | Set-Content -LiteralPath 'artifacts/source-investigations-clean-final/completion.json'
exit $code
