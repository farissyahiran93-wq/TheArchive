[CmdletBinding()]
param([switch]$Offline)

$ErrorActionPreference = 'Stop'
$taskRoot = Split-Path -Parent $PSScriptRoot
$taskCache = Join-Path $taskRoot '.gradle-user-home'
$taskAndroidHome = Join-Path $taskCache 'android-user-home'
$taskOriginalGradleHome = $env:GRADLE_USER_HOME
$taskOriginalAndroidHome = $env:ANDROID_USER_HOME
$taskOriginalSdk = $env:ANDROID_HOME
try {
    New-Item -ItemType Directory -Path $taskCache, $taskAndroidHome -Force | Out-Null
    # Retain the existing debug signer so device upgrades need not discard app saves.
    $taskExistingDebugKey = Join-Path $env:USERPROFILE '.android\debug.keystore'
    $taskLocalDebugKey = Join-Path $taskAndroidHome 'debug.keystore'
    if ((Test-Path -LiteralPath $taskExistingDebugKey) -and !(Test-Path -LiteralPath $taskLocalDebugKey)) {
        Copy-Item -LiteralPath $taskExistingDebugKey -Destination $taskLocalDebugKey
    }
    $env:GRADLE_USER_HOME = $taskCache
    $env:ANDROID_USER_HOME = $taskAndroidHome
    if (!$env:ANDROID_HOME -and !$env:ANDROID_SDK_ROOT) {
        $taskSdk = Join-Path $env:LOCALAPPDATA 'Android\Sdk'
        if (Test-Path -LiteralPath $taskSdk) { $env:ANDROID_HOME = $taskSdk }
    }
    $taskArguments = @('-p', (Join-Path $taskRoot 'android'), '--no-daemon', 'assembleDebug')
    if ($Offline) { $taskArguments += '--offline' }
    & (Join-Path $taskRoot 'android\gradlew.bat') @taskArguments
    if ($LASTEXITCODE -ne 0) { throw "Android debug build failed (exit $LASTEXITCODE)." }
} finally {
    $env:GRADLE_USER_HOME = $taskOriginalGradleHome
    $env:ANDROID_USER_HOME = $taskOriginalAndroidHome
    $env:ANDROID_HOME = $taskOriginalSdk
}
