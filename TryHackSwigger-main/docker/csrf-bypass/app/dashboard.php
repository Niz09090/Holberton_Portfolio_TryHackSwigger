<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header('Location: index.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SecureBank - Dashboard</title>
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
            max-width: 1000px;
            margin: 40px auto;
            padding: 0 20px;
        }
        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
        }
        .card {
            background: rgba(30, 30, 50, 0.9);
            border-radius: 10px;
            padding: 25px;
            border: 1px solid #333;
        }
        .card h3 {
            color: #4a90d9;
            margin-bottom: 15px;
            font-size: 18px;
        }
        .card p {
            color: #aaa;
            font-size: 14px;
            line-height: 1.6;
        }
        .card .value {
            font-size: 32px;
            color: #4a90d9;
            font-weight: bold;
            margin-top: 10px;
        }
        .btn {
            display: inline-block;
            padding: 10px 20px;
            background: linear-gradient(135deg, #4a90d9 0%, #357abd 100%);
            border: none;
            border-radius: 5px;
            color: #fff;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            text-decoration: none;
            margin-top: 15px;
        }
        .btn:hover {
            opacity: 0.9;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">
            <h1>🏦 SecureBank</h1>
        </div>
        <div class="user-info">
            Welcome, <?php echo htmlspecialchars($_SESSION['username']); ?>
        </div>
    </div>
    
    <div class="container">
        <div class="dashboard-grid">
            <div class="card">
                <h3>Account Balance</h3>
                <p>Your current available balance</p>
                <div class="value">$<?php echo number_format($_SESSION['balance']); ?></div>
                <a href="index.php" class="btn">Transfer Funds</a>
            </div>
            
            <div class="card">
                <h3>Account Number</h3>
                <p>Your unique account identifier</p>
                <div class="value"><?php echo htmlspecialchars($_SESSION['user_id']); ?></div>
            </div>
            
            <div class="card">
                <h3>Recent Activity</h3>
                <p>View your recent transactions</p>
                <div class="value">3</div>
                <a href="#" class="btn">View History</a>
            </div>
        </div>
    </div>
</body>
</html>
