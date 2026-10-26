Set-Location -LiteralPath 'D:\Web app\TheArchive'
$env:PLAYWRIGHT_PORT='4240'
$started=(Get-Date).ToString('o')
& npm.cmd run test:e2e -- tests/e2e/scene10-final.spec.ts --workers=1 --timeout=180000 --output=artifacts/scene10-focused/results
$code=$LASTEXITCODE
@{exitCode=$code;startedAt=$started;finishedAt=(Get-Date).ToString('o')} | ConvertTo-Json | Set-Content artifacts/scene10-focused/completion.json
exit $code
