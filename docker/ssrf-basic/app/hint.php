<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebChecker - Hints</title>
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
            color: #f39c12;
            margin-bottom: 20px;
        }
        .hint {
            background: rgba(243, 156, 18, 0.1);
            border-left: 3px solid #f39c12;
            padding: 15px;
            margin-bottom: 15px;
        }
        .hint h3 {
            color: #f39c12;
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
            color: #f39c12;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="hint-container">
        <h1>Lab Hints</h1>
        
        <div class="hint">
            <h3>Hint 1</h3>
            <p>The URL parameter is passed directly to curl without any validation.</p>
        </div>
        
        <div class="hint">
            <h3>Hint 2</h3>
            <p>Try accessing internal network resources or cloud metadata endpoints.</p>
        </div>
        
        <div class="hint">
            <h3>Hint 3</h3>
            <p>AWS metadata endpoint: http://169.254.169.254/latest/meta-data/</p>
        </div>
        
        <div class="hint">
            <h3>Hint 4</h3>
            <p>There is a secret internal endpoint at /secret.php that contains the flag.</p>
        </div>
        
        <div class="hint">
            <h3>Hint 5</h3>
            <p>The filter blocks 127.0.0.1 and localhost, but can be bypassed using 0.0.0.0, 127.0.0.2, or [::1] (IPv6).</p>
        </div>
        
        <div class="hint">
            <h3>Hint 6</h3>
            <p>Try: http://0.0.0.0/secret.php to access the internal secret endpoint.</p>
        </div>
        
        <div class="back">
            <a href="index.php">← Back to Checker</a>
        </div>
    </div>
</body>
</html>
