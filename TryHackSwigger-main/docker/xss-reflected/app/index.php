<?php
$search = $_GET['q'] ?? '';
$results = [];

if ($search) {
    // VULNERABLE: No output encoding - reflected XSS
    $results = [
        "Search results for: $search",
        "Found 3 matching documents",
        "Document 1: Contains '$search'",
        "Document 2: Related to '$search'",
        "Document 3: About '$search'"
    ];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EchoSearch - Search Engine</title>
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
        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .logo h1 {
            color: #00ff88;
            font-size: 32px;
        }
        .logo span {
            color: #888;
            font-size: 14px;
        }
        .search-container {
            max-width: 800px;
            margin: 60px auto;
            padding: 0 20px;
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
            border-color: #00ff88;
        }
        .search-box button {
            padding: 15px 30px;
            background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
            border: none;
            border-radius: 30px;
            color: #1a1a2e;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
        }
        .results {
            background: rgba(30, 30, 50, 0.9);
            border-radius: 10px;
            padding: 30px;
        }
        .results h2 {
            color: #00ff88;
            margin-bottom: 20px;
        }
        .result-item {
            padding: 15px;
            margin-bottom: 10px;
            background: rgba(20, 20, 40, 0.8);
            border-radius: 5px;
            border-left: 3px solid #00ff88;
        }
        .result-item:last-child {
            margin-bottom: 0;
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
            color: #00ff88;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">
            <h1>🔍 EchoSearch</h1>
            <span>Fast. Accurate. Secure.</span>
        </div>
    </div>
    
    <div class="search-container">
        <form class="search-box" method="GET">
            <input type="text" name="q" placeholder="Search the web..." value="<?php echo htmlspecialchars($search); ?>">
            <button type="submit">Search</button>
        </form>
        
        <?php if ($search): ?>
            <div class="results">
                <h2>Search Results</h2>
                <?php foreach ($results as $result): ?>
                    <div class="result-item">
                        <?php echo $result; ?>
                    </div>
                <?php endforeach; ?>
                
                <?php if (strpos($search, 'flag') !== false || strpos($search, 'hackforge') !== false): ?>
                    <div class="flag">
                        🏆 Congratulations! You found the flag: hackforge{xss_reflected_flag_found}
                    </div>
                <?php endif; ?>
            </div>
        <?php endif; ?>
    </div>
    
    <div class="footer">
        <a href="hint.php">Need help with this lab?</a>
    </div>
</body>
</html>
