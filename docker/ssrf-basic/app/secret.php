<?php
// Internal secret endpoint - only accessible from localhost
// This simulates an internal service that should not be accessible from external requests
header('Content-Type: text/plain');
echo "INTERNAL_SERVICE_SECRET: tryhackswigger{ssrf_flag_found}";
