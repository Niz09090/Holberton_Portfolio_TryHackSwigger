#!/bin/bash

# Build all Docker images for TryHackSwigger labs

echo "Building TryHackSwigger lab Docker images..."

docker build -t tryhackswigger/sqli-basic:latest ./sqli-basic
if [ $? -eq 0 ]; then
    echo "✓ Built tryhackswigger/sqli-basic:latest"
else
    echo "✗ Failed to build tryhackswigger/sqli-basic:latest"
fi

docker build -t tryhackswigger/xss-reflected:latest ./xss-reflected
if [ $? -eq 0 ]; then
    echo "✓ Built tryhackswigger/xss-reflected:latest"
else
    echo "✗ Failed to build tryhackswigger/xss-reflected:latest"
fi

docker build -t tryhackswigger/csrf-bypass:latest ./csrf-bypass
if [ $? -eq 0 ]; then
    echo "✓ Built tryhackswigger/csrf-bypass:latest"
else
    echo "✗ Failed to build tryhackswigger/csrf-bypass:latest"
fi

docker build -t tryhackswigger/lfi-basic:latest ./lfi-basic
if [ $? -eq 0 ]; then
    echo "✓ Built tryhackswigger/lfi-basic:latest"
else
    echo "✗ Failed to build tryhackswigger/lfi-basic:latest"
fi

docker build -t tryhackswigger/cmd-injection:latest ./cmd-injection
if [ $? -eq 0 ]; then
    echo "✓ Built tryhackswigger/cmd-injection:latest"
else
    echo "✗ Failed to build tryhackswigger/cmd-injection:latest"
fi

docker build -t tryhackswigger/file-upload:latest ./file-upload
if [ $? -eq 0 ]; then
    echo "✓ Built tryhackswigger/file-upload:latest"
else
    echo "✗ Failed to build tryhackswigger/file-upload:latest"
fi

docker build -t tryhackswigger/xxe-injection:latest ./xxe-injection
if [ $? -eq 0 ]; then
    echo "✓ Built tryhackswigger/xxe-injection:latest"
else
    echo "✗ Failed to build tryhackswigger/xxe-injection:latest"
fi

docker build -t tryhackswigger/ssrf-basic:latest ./ssrf-basic
if [ $? -eq 0 ]; then
    echo "✓ Built tryhackswigger/ssrf-basic:latest"
else
    echo "✗ Failed to build tryhackswigger/ssrf-basic:latest"
fi

docker build -t tryhackswigger/jwt-bypass:latest ./jwt-bypass
if [ $? -eq 0 ]; then
    echo "✓ Built tryhackswigger/jwt-bypass:latest"
else
    echo "✗ Failed to build tryhackswigger/jwt-bypass:latest"
fi

docker build -t tryhackswigger/idor-basic:latest ./idor-basic
if [ $? -eq 0 ]; then
    echo "✓ Built tryhackswigger/idor-basic:latest"
else
    echo "✗ Failed to build tryhackswigger/idor-basic:latest"
fi

docker build -t tryhackswigger/privesc-linux:latest ./privesc-linux
if [ $? -eq 0 ]; then
    echo "✓ Built tryhackswigger/privesc-linux:latest"
else
    echo "✗ Failed to build tryhackswigger/privesc-linux:latest"
fi

docker build -t tryhackswigger/bof-basic:latest ./bof-basic
if [ $? -eq 0 ]; then
    echo "✓ Built tryhackswigger/bof-basic:latest"
else
    echo "✗ Failed to build tryhackswigger/bof-basic:latest"
fi

echo ""
echo "All images built successfully!"
