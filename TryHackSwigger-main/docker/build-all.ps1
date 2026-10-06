# Build all Docker images for HackForge labs

Write-Host "Building HackForge lab Docker images..." -ForegroundColor Cyan

docker build -t hackforge/sqli-basic:latest ./sqli-basic
Write-Host "Built hackforge/sqli-basic:latest" -ForegroundColor Green

docker build -t hackforge/xss-reflected:latest ./xss-reflected
Write-Host "Built hackforge/xss-reflected:latest" -ForegroundColor Green

docker build -t hackforge/csrf-bypass:latest ./csrf-bypass
Write-Host "Built hackforge/csrf-bypass:latest" -ForegroundColor Green

docker build -t hackforge/lfi-basic:latest ./lfi-basic
Write-Host "Built hackforge/lfi-basic:latest" -ForegroundColor Green

docker build -t hackforge/cmd-injection:latest ./cmd-injection
Write-Host "Built hackforge/cmd-injection:latest" -ForegroundColor Green

docker build -t hackforge/file-upload:latest ./file-upload
Write-Host "Built hackforge/file-upload:latest" -ForegroundColor Green

docker build -t hackforge/xxe-injection:latest ./xxe-injection
Write-Host "Built hackforge/xxe-injection:latest" -ForegroundColor Green

docker build -t hackforge/ssrf-basic:latest ./ssrf-basic
Write-Host "Built hackforge/ssrf-basic:latest" -ForegroundColor Green

docker build -t hackforge/jwt-bypass:latest ./jwt-bypass
Write-Host "Built hackforge/jwt-bypass:latest" -ForegroundColor Green

docker build -t hackforge/idor-basic:latest ./idor-basic
Write-Host "Built hackforge/idor-basic:latest" -ForegroundColor Green

docker build -t hackforge/privesc-linux:latest ./privesc-linux
Write-Host "Built hackforge/privesc-linux:latest" -ForegroundColor Green

docker build -t hackforge/bof-basic:latest ./bof-basic
Write-Host "Built hackforge/bof-basic:latest" -ForegroundColor Green

Write-Host ""
Write-Host "All images built successfully!" -ForegroundColor Cyan

