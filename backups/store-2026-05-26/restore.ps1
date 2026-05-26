# استعادة نسخة المتجر 2026-05-26
$ErrorActionPreference = 'Stop'
$backupRoot = $PSScriptRoot
$projectRoot = Resolve-Path (Join-Path $backupRoot '..\..')

Write-Host "استعادة المتجر من: $backupRoot"
Write-Host "إلى المشروع: $projectRoot"
Write-Host ""

$maps = @(
  @{ From = 'src\data\cheats.ts'; To = 'src\data\cheats.ts' },
  @{ From = 'src\app\store'; To = 'src\app\store' },
  @{ From = 'src\components\OCProductCard.tsx'; To = 'src\components\OCProductCard.tsx' },
  @{ From = 'src\components\OCProductCard.module.css'; To = 'src\components\OCProductCard.module.css' },
  @{ From = 'src\components\OCHeader.tsx'; To = 'src\components\OCHeader.tsx' },
  @{ From = 'src\components\OCHeader.module.css'; To = 'src\components\OCHeader.module.css' },
  @{ From = 'src\components\OCFooter.tsx'; To = 'src\components\OCFooter.tsx' },
  @{ From = 'src\components\OCFooter.module.css'; To = 'src\components\OCFooter.module.css' },
  @{ From = 'src\context\LanguageContext.tsx'; To = 'src\context\LanguageContext.tsx' },
  @{ From = 'public\images\nova-store-logo.png'; To = 'public\images\nova-store-logo.png' }
)

foreach ($m in $maps) {
  $src = Join-Path $backupRoot $m.From
  $dst = Join-Path $projectRoot $m.To
  if (-not (Test-Path $src)) {
    Write-Warning "تخطي (غير موجود): $($m.From)"
    continue
  }
  $dstParent = Split-Path $dst -Parent
  if (-not (Test-Path $dstParent)) { New-Item -ItemType Directory -Force -Path $dstParent | Out-Null }
  if (Test-Path $src -PathType Container) {
    if (Test-Path $dst) { Remove-Item $dst -Recurse -Force }
    Copy-Item $src $dst -Recurse -Force
  } else {
    Copy-Item $src $dst -Force
  }
  Write-Host "  OK $($m.To)"
}

$cheatsBackup = Join-Path $backupRoot 'public\cheats'
$cheatsDest = Join-Path $projectRoot 'public\cheats'
if (Test-Path $cheatsBackup) {
  Get-ChildItem $cheatsBackup -Filter '*.jpeg' | ForEach-Object {
    Copy-Item $_.FullName (Join-Path $cheatsDest $_.Name) -Force
    Write-Host "  OK public/cheats/$($_.Name)"
  }
}

Write-Host ""
Write-Host "تمت الاستعادة. راجع الموقع محلياً ثم git commit && git push إن أردت النشر."
