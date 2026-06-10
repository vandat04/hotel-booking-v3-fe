param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("local", "prod")]
    [string]$Mode
)

$LocalUrl = "http://localhost:8080/api"
$ProdUrl = "https://hotel-booking-v3.onrender.com/api"

if ($Mode -eq "local") {
    $Search = $ProdUrl
    $Replace = $LocalUrl
    Write-Host "Switching API endpoints to LOCAL: $LocalUrl..." -ForegroundColor Green
} else {
    $Search = $LocalUrl
    $Replace = $ProdUrl
    Write-Host "Switching API endpoints to PRODUCTION: $ProdUrl..." -ForegroundColor Green
}

# Find all .html and .js files in the current folder
$files = Get-ChildItem -Path . -Include *.html, *.js -File

foreach ($file in $files) {
    # Skip this script file if it matches
    if ($file.Name -eq "switch-env.js") { continue }
    
    $content = Get-Content -Path $file.FullName -Raw
    if ($content -match [regex]::Escape($Search)) {
        # Perform replacement
        $newContent = $content -replace [regex]::Escape($Search), $Replace
        # Force UTF-8 encoding without BOM to prevent browser encoding issues
        [System.IO.File]::WriteAllText($file.FullName, $newContent, (New-Object System.Text.UTF8Encoding $false))
        Write-Host "Updated: $($file.Name)" -ForegroundColor Yellow
    }
}

Write-Host "Completed switching to $Mode!" -ForegroundColor Green
