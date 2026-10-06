<?php
session_start();

// Simple JWT implementation (vulnerable)
function createJWT($payload, $secret = 'secret123') {
    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    $header = base64url_encode($header);
    $payload = json_encode($payload);
    $payload = base64url_encode($payload);
    $signature = hash_hmac('sha256', $header . '.' . $payload, $secret, true);
    $signature = base64url_encode($signature);
    return $header . '.' . $payload . '.' . $signature;
}

function verifyJWT($token, $secret = 'secret123') {
    $parts = explode('.', $token);
    if (count($parts) !== 3) return false;
    
    $header = json_decode(base64url_decode($parts[0]), true);
    $payload = $parts[1];
    $signature = $parts[2];
    
    // VULNERABLE: Algorithm confusion - accepts "none" algorithm
    if (isset($header['alg']) && strtolower($header['alg']) === 'none') {
        return json_decode(base64url_decode($payload), true);
    }
    
    $validSignature = hash_hmac('sha256', $parts[0] . '.' . $parts[1], $secret, true);
    $validSignature = base64url_encode($validSignature);
    
    return $signature === $validSignature ? json_decode(base64url_decode($payload), true) : false;
}

function base64url_encode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64url_decode($data) {
    return base64_decode(strtr($data, '-_', '+/'));
}

$error = '';
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    
    // VULNERABLE: Weak JWT secret and algorithm confusion
    if ($username === 'admin' && $password === 'admin123') {
        $payload = [
            'user' => 'admin',
            'role' => 'admin',
            'exp' => time() + 3600
        ];
        $token = createJWT($payload);
        $_SESSION['token'] = $token;
        $success = "Login successful! Token: $token";
    } else if ($username === 'user' && $password === 'user123') {
        // Regular user login - no flag access
        $payload = [
            'user' => 'user',
            'role' => 'user',
            'exp' => time() + 3600
        ];
        $token = createJWT($payload);
        $_SESSION['token'] = $token;
        $success = "Login successful! Token: $token";
    } else {
        $error = 'Invalid credentials';
    }
}

if (isset($_GET['token'])) {
    $token = $_GET['token'];
    $decoded = verifyJWT($token);
    
    if ($decoded && $decoded['role'] === 'admin') {
        $success = "Admin access granted! Flag: tryhackswigger{jwt_bypass_flag}";
    } else if ($decoded && $decoded['role'] === 'user') {
        $error = 'Access denied: User role does not have admin privileges';
    } else {
        $error = 'Invalid or expired token';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AdminPanel - Login</title>
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
        .login-container {
            background: rgba(30, 30, 50, 0.9);
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            width: 100%;
            max-width: 400px;
        }
        .logo {
            text-align: center;
            margin-bottom: 30px;
        }
        .logo h1 {
            color: #e91e63;
            font-size: 28px;
            margin-bottom: 5px;
        }
        .logo p {
            color: #888;
            font-size: 14px;
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group label {
            display: block;
            margin-bottom: 8px;
            color: #aaa;
            font-size: 14px;
        }
        .form-group input {
            width: 100%;
            padding: 12px;
            background: rgba(20, 20, 40, 0.8);
            border: 1px solid #333;
            border-radius: 5px;
            color: #fff;
            font-size: 14px;
        }
        .form-group input:focus {
            outline: none;
            border-color: #e91e63;
        }
        .btn {
            width: 100%;
            padding: 12px;
            background: linear-gradient(135deg, #e91e63 0%, #c2185b 100%);
            border: none;
            border-radius: 5px;
            color: #fff;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
        }
        .btn:hover {
            opacity: 0.9;
        }
        .error {
            background: rgba(255, 82, 82, 0.2);
            border: 1px solid #ff5252;
            color: #ff5252;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 20px;
            font-size: 14px;
        }
        .success {
            background: rgba(76, 175, 80, 0.2);
            border: 1px solid #4caf50;
            color: #4caf50;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 20px;
            font-size: 14px;
            word-break: break-all;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            color: #666;
            font-size: 12px;
        }
        .footer a {
            color: #e91e63;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="logo">
            <h1>🔐 AdminPanel</h1>
            <p>Admin Dashboard Login</p>
        </div>
        
        <?php if ($error): ?>
            <div class="error"><?php echo htmlspecialchars($error); ?></div>
        <?php endif; ?>
        
        <?php if ($success): ?>
            <div class="success"><?php echo htmlspecialchars($success); ?></div>
        <?php endif; ?>
        
        <form method="POST">
            <div class="form-group">
                <label>Username</label>
                <input type="text" name="username" required>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" name="password" required>
            </div>
            <button type="submit" class="btn">Login</button>
        </form>
        
        <div class="footer">
            <a href="hint.php">Need help?</a>
        </div>
    </div>
</body>
</html>
