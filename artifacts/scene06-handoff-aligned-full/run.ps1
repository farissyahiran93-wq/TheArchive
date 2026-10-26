$ErrorActionPreference='Continue'
Set-Location -LiteralPath 'D:\Web app\TheArchive'
$env:PLAYWRIGHT_PORT='4211'
$started=[DateTime]::UtcNow.ToString('o')
& npm.cmd run test:e2e -- --workers=1 --output=artifacts/scene06-handoff-aligned-full/results
$testExit=$LASTEXITCODE
[pscustomobject]@{exitCode=$testExit;startedUtc=$started;finishedUtc=[DateTime]::UtcNow.ToString('o');command='PLAYWRIGHT_PORT=4211 npm run test:e2e -- --workers=1 --output=artifacts/scene06-handoff-aligned-full/results';location='D:\Web app\TheArchive'} | ConvertTo-Json | Set-Content -LiteralPath 'D:\Web app\TheArchive\artifacts\scene06-handoff-aligned-full\completion.json' -Encoding utf8
exit $testExit
