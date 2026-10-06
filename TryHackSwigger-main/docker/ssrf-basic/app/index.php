<?php
$url = $_GET['url'] ?? '';
$result = '';
$error = '';

if ($url) {
    // VULNERABLE: SSRF - no URL validation
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($response !== false) {
        $result = "HTTP $httpCode: " . htmlspecialchars(substr($response, 0, 1000));
        
        if (strpos($response, 'hackforge') !== false) {
            $result .= " - Flag: hackforge{ssrf_flag_found}";
        }
    } else {
        $error = 'Failed to fetch URL';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebChecker - Website Availability Checker</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            min-height: 100vh;
            color: #e0e0e0;
        }
        .header {
            background: rgba(30, 30, 50, 0.95);
            padding: 20px 40px;
            border-bottom: 1px solid #333;
        }
        .logo h1 {
            color: #f39c12;
            font-size: 28px;
        }
        .logo p {
            color: #888;
            font-size: 14px;
        }
        .container {
            max-width: 900px;
            margin: 40px auto;
            padding: 0 20px;
        }
        .tool {
            background: rgba(30, 30, 50, 0.9);
            border-radius: 10px;
            padding: 30px;
        }
        .tool h2 {
            color: #f39c12;
            margin-bottom: 20px;
        }
        .search-box {
            display: flex;
            gap: 10px;
            margin-bottom: 30px;
        }
        .search-box input {
            flex: 1;
            padding: 15px 20px;
            background: rgba(20, 20, 40, 0.9);
            border: 2px solid #333;
            border-radius: 30px;
            color: #fff;
            font-size: 16px;
        }
        .search-box input:focus {
            outline: none;
            border-color: #f39c12;
        }
        .search-box button {
            padding: 15px 30px;
            background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
            border: none;
            border-radius: 30px;
            color: #fff;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
        }
        .output {
            background: rgba(20, 20, 40, 0.8);
            border: 1px solid #333;
            border-radius: 5px;
            padding: 20px;
            min-height: 200px;
        }
        .output pre {
            color: #aaa;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            line-height: 1.6;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        .error {
            background: rgba(255, 82, 82, 0.2);
            border: 1px solid #ff5252;
            color: #ff5252;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .flag {
            background: rgba(255, 215, 0, 0.1);
            border: 1px solid #ffd700;
            padding: 15px;
            border-radius: 5px;
            margin-top: 20px;
            color: #ffd700;
        }
        .footer {
            text-align: center;
            padding: 30px;
            color: #666;
            font-size: 14px;
        }
        .footer a {
            color: #f39c12;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">
            <h1>🌐 WebChecker</h1>
            <p>Website Availability Checker</p>
        </div>
    </div>
    
    <div class="container">
        <div class="tool">
            <h2>Check Website Status</h2>
            
            <?php if ($error): ?>
                <div class="error"><?php echo htmlspecialchars($error); ?></div>
            <?php endif; ?>
            
            <form class="search-box" method="GET">
                <input type="text" name="url" placeholder="Enter URL to check..." value="<?php echo htmlspecialchars($url); ?>">
                <button type="submit">Check</button>
            </form>
            
            <?php if ($result): ?>
                <div class="output">
                    <pre><?php echo $result; ?></pre>
                </div>
            <?php endif; ?>
        </div>
    </div>
    
    <div class="footer">
        <a href="hint.php">Need help with this lab?</a>
    </div>
</body>
</html>
