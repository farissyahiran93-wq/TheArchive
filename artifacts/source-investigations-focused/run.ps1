Set-Location -LiteralPath 'D:\Web app\TheArchive'
$env:PLAYWRIGHT_PORT='4221'
$started=(Get-Date).ToString('o')
& npm.cmd run test:e2e -- tests/e2e/source-investigations.spec.ts --workers=1 --timeout=180000 --output=artifacts/source-investigations-focused/results
$code=$LASTEXITCODE
@{exitCode=$code;startedAt=$started;finishedAt=(Get-Date).ToString('o')} | ConvertTo-Json | Set-Content -LiteralPath 'artifacts/source-investigations-focused/completion.json'
exit $code
