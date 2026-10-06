<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SecureBank - Hints</title>
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
            display: flex;
            align-items: center;
            justify-content: center;
            color: #e0e0e0;
        }
        .hint-container {
            background: rgba(30, 30, 50, 0.9);
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            width: 100%;
            max-width: 500px;
        }
        h1 {
            color: #4a90d9;
            margin-bottom: 20px;
        }
        .hint {
            background: rgba(74, 144, 217, 0.1);
            border-left: 3px solid #4a90d9;
            padding: 15px;
            margin-bottom: 15px;
        }
        .hint h3 {
            color: #4a90d9;
            margin-bottom: 10px;
            font-size: 16px;
        }
        .hint p {
            color: #aaa;
            font-size: 14px;
            line-height: 1.6;
        }
        .back {
            text-align: center;
            margin-top: 30px;
        }
        .back a {
            color: #4a90d9;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="hint-container">
        <h1>Lab Hints</h1>
        
        <div class="hint">
            <h3>Hint 1</h3>
            <p>Notice that the transfer form doesn't have any CSRF token validation.</p>
        </div>
        
        <div class="hint">
            <h3>Hint 2</h3>
            <p>You can craft a malicious HTML page that submits the transfer form automatically.</p>
        </div>
        
        <div class="hint">
            <h3>Hint 3</h3>
            <p>Transfer $1000 or more to the 'admin' account to get the flag.</p>
        </div>
        
        <div class="back">
            <a href="index.php">← Back to Transfer</a>
        </div>
    </div>
</body>
</html>
