<?php
$page = $_GET['page'] ?? 'home';
$content = '';
$error = '';

// VULNERABLE: Basic path traversal filtering that can be bypassed
$allowed_pages = ['home', 'about', 'services'];
$pages_dir = __DIR__ . '/pages/';

// Filter obvious path traversal sequences
$filteredPage = str_replace(['../', '..\\'], '', $page);

if (in_array($page, $allowed_pages)) {
    $filepath = $pages_dir . $page . '.txt';
    if (file_exists($filepath)) {
        $content = file_get_contents($filepath);
    } else {
        $error = 'Page not found';
    }
} else {
    // Try to load the page directly (vulnerable to LFI with bypass)
    $filepath = $filteredPage;
    if (file_exists($filepath) && is_readable($filepath)) {
        $content = file_get_contents($filepath);
    } else {
        $error = 'Page not found or not accessible';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FileServer Pro - Document Viewer</title>
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
            color: #ff6b6b;
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
        .file-browser {
            background: rgba(30, 30, 50, 0.9);
            border-radius: 10px;
            padding: 30px;
        }
        .file-browser h2 {
            color: #ff6b6b;
            margin-bottom: 20px;
        }
        .file-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 30px;
        }
        .file-item {
            background: rgba(20, 20, 40, 0.8);
            border: 1px solid #333;
            border-radius: 5px;
            padding: 15px;
            cursor: pointer;
            transition: border-color 0.2s;
        }
        .file-item:hover {
            border-color: #ff6b6b;
        }
        .file-item h3 {
            color: #ff6b6b;
            font-size: 16px;
            margin-bottom: 5px;
        }
        .file-item p {
            color: #888;
            font-size: 12px;
        }
        .content-viewer {
            background: rgba(20, 20, 40, 0.8);
            border: 1px solid #333;
            border-radius: 5px;
            padding: 20px;
            min-height: 200px;
        }
        .content-viewer pre {
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
            color: #ff6b6b;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">
            <h1>📁 FileServer Pro</h1>
            <p>Secure Document Management System</p>
        </div>
    </div>
    
    <div class="container">
        <div class="file-browser">
            <h2>Document Viewer</h2>
            
            <?php if ($error): ?>
                <div class="error"><?php echo htmlspecialchars($error); ?></div>
            <?php endif; ?>
            
            <div class="file-list">
                <div class="file-item" onclick="location.href='?page=home'">
                    <h3>📄 Home</h3>
                    <p>Welcome page</p>
                </div>
                <div class="file-item" onclick="location.href='?page=about'">
                    <h3>📄 About</h3>
                    <p>About us</p>
                </div>
                <div class="file-item" onclick="location.href='?page=services'">
                    <h3>📄 Services</h3>
                    <p>Our services</p>
                </div>
            </div>
            
            <div class="content-viewer">
                <pre><?php echo htmlspecialchars($content); ?></pre>
            </div>
            
            <?php if (strpos($content, 'flag') !== false || strpos($content, 'tryhackswigger') !== false): ?>
                <div class="flag">
                    🏆 Flag found: tryhackswigger{lfi_file_reader_flag}
                </div>
            <?php endif; ?>
        </div>
    </div>
    
    <div class="footer">
        <a href="hint.php">Need help with this lab?</a>
    </div>
</body>
</html>
