Set-Location -LiteralPath 'D:\Web app\TheArchive'
$env:PLAYWRIGHT_PORT='4225'
$started=(Get-Date).ToString('o')
& npm.cmd run test:e2e -- --workers=3 --timeout=180000 --output=artifacts/source-investigations-frozen-final/results
$code=$LASTEXITCODE
@{exitCode=$code;startedAt=$started;finishedAt=(Get-Date).ToString('o');command='PLAYWRIGHT_PORT=4225 npm run test:e2e -- --workers=3 --timeout=180000 --output=artifacts/source-investigations-frozen-final/results'} | ConvertTo-Json | Set-Content -LiteralPath 'artifacts/source-investigations-frozen-final/completion.json'
exit $code
