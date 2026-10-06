<?php
session_start();

// Simulated user login
$_SESSION['user_id'] = 'user123';
$_SESSION['username'] = 'john_doe';
$_SESSION['balance'] = 5000;

// Generate fake CSRF token (not actually validated)
$_SESSION['csrf_token'] = bin2hex(random_bytes(32));

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $transfer_to = $_POST['to_account'] ?? '';
    $amount = $_POST['amount'] ?? 0;
    $csrf_token = $_POST['csrf_token'] ?? '';
    
    // VULNERABLE: CSRF token exists but is not actually validated
    if ($amount > 0 && $amount <= $_SESSION['balance']) {
        $_SESSION['balance'] -= $amount;
        $success = "Successfully transferred $$amount to account $transfer_to";
        
        if ($transfer_to === 'admin' && $amount >= 1000) {
            $success .= " - Flag: tryhackswigger{csrf_bypass_flag_found}";
        }
    } else {
        $error = "Invalid transfer amount";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SecureBank - Transfer Funds</title>
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
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .logo h1 {
            color: #4a90d9;
            font-size: 28px;
        }
        .user-info {
            color: #888;
            font-size: 14px;
        }
        .container {
            max-width: 800px;
            margin: 60px auto;
            padding: 0 20px;
        }
        .balance-card {
            background: rgba(30, 30, 50, 0.9);
            border-radius: 10px;
            padding: 30px;
            margin-bottom: 30px;
            border: 1px solid #4a90d9;
        }
        .balance-card h2 {
            color: #4a90d9;
            margin-bottom: 10px;
        }
        .balance-amount {
            font-size: 48px;
            color: #4a90d9;
            font-weight: bold;
        }
        .transfer-form {
            background: rgba(30, 30, 50, 0.9);
            border-radius: 10px;
            padding: 30px;
        }
        .transfer-form h2 {
            color: #4a90d9;
            margin-bottom: 20px;
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
            font-size: 16px;
        }
        .form-group input:focus {
            outline: none;
            border-color: #4a90d9;
        }
        .btn {
            width: 100%;
            padding: 15px;
            background: linear-gradient(135deg, #4a90d9 0%, #357abd 100%);
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
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .success {
            background: rgba(76, 175, 80, 0.2);
            border: 1px solid #4caf50;
            color: #4caf50;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .footer {
            text-align: center;
            padding: 30px;
            color: #666;
            font-size: 14px;
        }
        .footer a {
            color: #4a90d9;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">
            <h1>🏦 SecureBank</h1>
        </div>
        <div class="user-info">
            Welcome, <?php echo htmlspecialchars($_SESSION['username']); ?> | Balance: $<?php echo number_format($_SESSION['balance']); ?>
        </div>
    </div>
    
    <div class="container">
        <div class="balance-card">
            <h2>Available Balance</h2>
            <div class="balance-amount">$<?php echo number_format($_SESSION['balance']); ?></div>
        </div>
        
        <div class="transfer-form">
            <h2>Transfer Funds</h2>
            
            <?php if (isset($error)): ?>
                <div class="error"><?php echo htmlspecialchars($error); ?></div>
            <?php endif; ?>
            
            <?php if (isset($success)): ?>
                <div class="success"><?php echo htmlspecialchars($success); ?></div>
            <?php endif; ?>
            
            <form method="POST">
                <div class="form-group">
                    <label>Recipient Account Number</label>
                    <input type="text" name="to_account" placeholder="Enter account number" required>
                </div>
                <div class="form-group">
                    <label>Amount ($)</label>
                    <input type="number" name="amount" placeholder="Enter amount" min="1" required>
                </div>
                <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($_SESSION['csrf_token']); ?>">
                <button type="submit" class="btn">Transfer Funds</button>
            </form>
        </div>
    </div>
    
    <div class="footer">
        <a href="hint.php">Need help with this lab?</a>
    </div>
</body>
</html>
