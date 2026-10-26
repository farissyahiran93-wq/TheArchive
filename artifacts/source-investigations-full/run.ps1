Set-Location -LiteralPath 'D:\Web app\TheArchive'
$env:PLAYWRIGHT_PORT='4222'
$started=(Get-Date).ToString('o')
& npm.cmd run test:e2e -- --workers=1 --timeout=180000 --output=artifacts/source-investigations-full/results
$code=$LASTEXITCODE
@{exitCode=$code;startedAt=$started;finishedAt=(Get-Date).ToString('o');command='PLAYWRIGHT_PORT=4222 npm run test:e2e -- --workers=1 --timeout=180000 --output=artifacts/source-investigations-full/results'} | ConvertTo-Json | Set-Content -LiteralPath 'artifacts/source-investigations-full/completion.json'
exit $code
