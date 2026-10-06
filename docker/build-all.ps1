# Build all Docker images for TryHackSwigger labs

Write-Host "Building TryHackSwigger lab Docker images..." -ForegroundColor Cyan

docker build -t tryhackswigger/sqli-basic:latest ./sqli-basic
Write-Host "Built tryhackswigger/sqli-basic:latest" -ForegroundColor Green

docker build -t tryhackswigger/xss-reflected:latest ./xss-reflected
Write-Host "Built tryhackswigger/xss-reflected:latest" -ForegroundColor Green

docker build -t tryhackswigger/csrf-bypass:latest ./csrf-bypass
Write-Host "Built tryhackswigger/csrf-bypass:latest" -ForegroundColor Green

docker build -t tryhackswigger/lfi-basic:latest ./lfi-basic
Write-Host "Built tryhackswigger/lfi-basic:latest" -ForegroundColor Green

docker build -t tryhackswigger/cmd-injection:latest ./cmd-injection
Write-Host "Built tryhackswigger/cmd-injection:latest" -ForegroundColor Green

docker build -t tryhackswigger/file-upload:latest ./file-upload
Write-Host "Built tryhackswigger/file-upload:latest" -ForegroundColor Green

docker build -t tryhackswigger/xxe-injection:latest ./xxe-injection
Write-Host "Built tryhackswigger/xxe-injection:latest" -ForegroundColor Green

docker build -t tryhackswigger/ssrf-basic:latest ./ssrf-basic
Write-Host "Built tryhackswigger/ssrf-basic:latest" -ForegroundColor Green

docker build -t tryhackswigger/jwt-bypass:latest ./jwt-bypass
Write-Host "Built tryhackswigger/jwt-bypass:latest" -ForegroundColor Green

docker build -t tryhackswigger/idor-basic:latest ./idor-basic
Write-Host "Built tryhackswigger/idor-basic:latest" -ForegroundColor Green

docker build -t tryhackswigger/privesc-linux:latest ./privesc-linux
Write-Host "Built tryhackswigger/privesc-linux:latest" -ForegroundColor Green

docker build -t tryhackswigger/bof-basic:latest ./bof-basic
Write-Host "Built tryhackswigger/bof-basic:latest" -ForegroundColor Green

Write-Host ""
Write-Host "All images built successfully!" -ForegroundColor Cyan

