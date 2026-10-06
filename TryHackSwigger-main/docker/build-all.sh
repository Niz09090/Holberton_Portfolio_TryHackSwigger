#!/bin/bash

# Build all Docker images for HackForge labs

echo "Building HackForge lab Docker images..."

docker build -t hackforge/sqli-basic:latest ./sqli-basic
if [ $? -eq 0 ]; then
    echo "✓ Built hackforge/sqli-basic:latest"
else
    echo "✗ Failed to build hackforge/sqli-basic:latest"
fi

docker build -t hackforge/xss-reflected:latest ./xss-reflected
if [ $? -eq 0 ]; then
    echo "✓ Built hackforge/xss-reflected:latest"
else
    echo "✗ Failed to build hackforge/xss-reflected:latest"
fi

docker build -t hackforge/csrf-bypass:latest ./csrf-bypass
if [ $? -eq 0 ]; then
    echo "✓ Built hackforge/csrf-bypass:latest"
else
    echo "✗ Failed to build hackforge/csrf-bypass:latest"
fi

docker build -t hackforge/lfi-basic:latest ./lfi-basic
if [ $? -eq 0 ]; then
    echo "✓ Built hackforge/lfi-basic:latest"
else
    echo "✗ Failed to build hackforge/lfi-basic:latest"
fi

docker build -t hackforge/cmd-injection:latest ./cmd-injection
if [ $? -eq 0 ]; then
    echo "✓ Built hackforge/cmd-injection:latest"
else
    echo "✗ Failed to build hackforge/cmd-injection:latest"
fi

docker build -t hackforge/file-upload:latest ./file-upload
if [ $? -eq 0 ]; then
    echo "✓ Built hackforge/file-upload:latest"
else
    echo "✗ Failed to build hackforge/file-upload:latest"
fi

docker build -t hackforge/xxe-injection:latest ./xxe-injection
if [ $? -eq 0 ]; then
    echo "✓ Built hackforge/xxe-injection:latest"
else
    echo "✗ Failed to build hackforge/xxe-injection:latest"
fi

docker build -t hackforge/ssrf-basic:latest ./ssrf-basic
if [ $? -eq 0 ]; then
    echo "✓ Built hackforge/ssrf-basic:latest"
else
    echo "✗ Failed to build hackforge/ssrf-basic:latest"
fi

docker build -t hackforge/jwt-bypass:latest ./jwt-bypass
if [ $? -eq 0 ]; then
    echo "✓ Built hackforge/jwt-bypass:latest"
else
    echo "✗ Failed to build hackforge/jwt-bypass:latest"
fi

docker build -t hackforge/idor-basic:latest ./idor-basic
if [ $? -eq 0 ]; then
    echo "✓ Built hackforge/idor-basic:latest"
else
    echo "✗ Failed to build hackforge/idor-basic:latest"
fi

docker build -t hackforge/privesc-linux:latest ./privesc-linux
if [ $? -eq 0 ]; then
    echo "✓ Built hackforge/privesc-linux:latest"
else
    echo "✗ Failed to build hackforge/privesc-linux:latest"
fi

docker build -t hackforge/bof-basic:latest ./bof-basic
if [ $? -eq 0 ]; then
    echo "✓ Built hackforge/bof-basic:latest"
else
    echo "✗ Failed to build hackforge/bof-basic:latest"
fi

echo ""
echo "All images built successfully!"
