<?php
// Simulated user database
$users = [
    '1' => [
        'id' => '1',
        'username' => 'john_doe',
        'email' => 'john@example.com',
        'role' => 'user',
        'bio' => 'Passionate developer and tech enthusiast. Love building things!',
        'posts' => ['Just finished a great project!', 'Learning new frameworks every day.'],
        'private_data' => ['api_key' => 'user_123_key', 'secret' => 'user_secret']
    ],
    '2' => [
        'id' => '2',
        'username' => 'jane_smith',
        'email' => 'jane@example.com',
        'role' => 'user',
        'bio' => 'Designer and creative thinker. Always exploring new ideas.',
        'posts' => ['Working on a new design system.', 'Coffee and code - perfect combo.'],
        'private_data' => ['api_key' => 'user_456_key', 'secret' => 'user_secret2']
    ],
    '3' => [
        'id' => '3',
        'username' => 'admin',
        'email' => 'admin@socialapp.com',
        'role' => 'admin',
        'bio' => 'System administrator. Keeping things secure and running smoothly.',
        'posts' => ['System maintenance scheduled.', 'Security audit completed.'],
        'private_data' => ['api_key' => 'admin_master_key', 'secret' => 'admin_secret', 'flag' => 'tryhackswigger{idor_flag_found}']
    ]
];

$userId = $_GET['user_id'] ?? '1';
$showPrivate = $_GET['show_private'] ?? 'false';
$user = $users[$userId] ?? null;

// Access denied for admin user without private flag
$accessDenied = false;
if ($user && $user['role'] === 'admin' && $showPrivate !== 'true') {
    $accessDenied = true;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SocialApp - User Profile</title>
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
            align-items: center;
            justify-content: space-between;
        }
        .logo h1 {
            color: #1abc9c;
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
        .profile {
            background: rgba(30, 30, 50, 0.9);
            border-radius: 10px;
            padding: 30px;
        }
        .profile-header {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-bottom: 30px;
        }
        .avatar {
            width: 100px;
            height: 100px;
            background: linear-gradient(135deg, #1abc9c 0%, #16a085 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 40px;
        }
        .profile-info h2 {
            color: #1abc9c;
            margin-bottom: 10px;
        }
        .profile-info p {
            color: #888;
            font-size: 14px;
        }
        .profile-details {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }
        .detail-card {
            background: rgba(20, 20, 40, 0.8);
            border: 1px solid #333;
            border-radius: 5px;
            padding: 20px;
        }
        .detail-card h3 {
            color: #1abc9c;
            margin-bottom: 10px;
            font-size: 14px;
        }
        .detail-card p {
            color: #aaa;
            font-size: 16px;
        }
        .bio-section {
            background: rgba(20, 20, 40, 0.8);
            border: 1px solid #333;
            border-radius: 5px;
            padding: 20px;
            margin-top: 20px;
        }
        .bio-section h3 {
            color: #1abc9c;
            margin-bottom: 10px;
            font-size: 16px;
        }
        .bio-section p {
            color: #e0e0e0;
            line-height: 1.6;
        }
        .posts-section {
            background: rgba(20, 20, 40, 0.8);
            border: 1px solid #333;
            border-radius: 5px;
            padding: 20px;
            margin-top: 20px;
        }
        .posts-section h3 {
            color: #1abc9c;
            margin-bottom: 15px;
            font-size: 16px;
        }
        .post-item {
            background: rgba(30, 30, 50, 0.5);
            padding: 12px;
            margin-bottom: 10px;
            border-radius: 5px;
            border-left: 3px solid #1abc9c;
        }
        .post-item:last-child {
            margin-bottom: 0;
        }
        .private-section {
            background: rgba(255, 82, 82, 0.1);
            border: 1px solid #ff5252;
            border-radius: 5px;
            padding: 20px;
            margin-top: 20px;
        }
        .private-section h3 {
            color: #ff5252;
            margin-bottom: 15px;
            font-size: 16px;
        }
        .private-data-item {
            background: rgba(20, 20, 40, 0.8);
            padding: 12px;
            margin-bottom: 10px;
            border-radius: 5px;
            border-left: 3px solid #ff5252;
        }
        .private-data-item:last-child {
            margin-bottom: 0;
        }
        .private-data-item strong {
            color: #ff5252;
        }
        .flag {
            background: rgba(255, 215, 0, 0.1);
            border: 1px solid #ffd700;
            padding: 15px;
            border-radius: 5px;
            margin-top: 20px;
            color: #ffd700;
        }
        .access-denied {
            background: rgba(255, 82, 82, 0.2);
            border: 1px solid #ff5252;
            padding: 20px;
            border-radius: 5px;
            margin-top: 20px;
        }
        .access-denied h3 {
            color: #ff5252;
            margin-bottom: 10px;
        }
        .access-denied p {
            color: #e0e0e0;
        }
        .user-list {
            margin-top: 30px;
        }
        .user-list h3 {
            color: #1abc9c;
            margin-bottom: 15px;
        }
        .user-list a {
            display: inline-block;
            padding: 8px 15px;
            background: rgba(20, 20, 40, 0.8);
            border: 1px solid #333;
            border-radius: 5px;
            color: #aaa;
            text-decoration: none;
            margin-right: 10px;
            margin-bottom: 10px;
        }
        .user-list a:hover {
            border-color: #1abc9c;
            color: #1abc9c;
        }
        .btn {
            display: inline-block;
            padding: 12px 24px;
            background: linear-gradient(135deg, #1abc9c 0%, #16a085 100%);
            border: none;
            border-radius: 5px;
            color: #1a1a2e;
            text-decoration: none;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s;
        }
        .btn:hover {
            transform: translateY(-2px);
        }
        .footer {
            text-align: center;
            padding: 30px;
            color: #666;
            font-size: 14px;
        }
        .footer a {
            color: #1abc9c;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">
            <h1>👥 SocialApp</h1>
            <p>Connect with friends</p>
        </div>
        <div style="margin-left: auto;">
            <a href="?user_id=1" class="btn">View Your Profile</a>
        </div>
    </div>
    
    <div class="container">
        <?php if (!$user): ?>
            <div class="profile">
                <h2>User not found</h2>
            </div>
        <?php elseif ($accessDenied): ?>
            <div class="profile">
                <div class="profile-header">
                    <div class="avatar">
                        <?php echo strtoupper(substr($user['username'], 0, 1)); ?>
                    </div>
                    <div class="profile-info">
                        <h2><?php echo htmlspecialchars($user['username']); ?></h2>
                        <p><?php echo htmlspecialchars($user['email']); ?></p>
                        <p>Role: <?php echo htmlspecialchars($user['role']); ?></p>
                    </div>
                </div>
                
                <div class="bio-section">
                    <h3>About</h3>
                    <p><?php echo htmlspecialchars($user['bio']); ?></p>
                </div>
                
                <div class="posts-section">
                    <h3>Recent Posts</h3>
                    <?php foreach ($user['posts'] as $post): ?>
                        <div class="post-item">
                            <?php echo htmlspecialchars($post); ?>
                        </div>
                    <?php endforeach; ?>
                </div>
                
                <div class="access-denied">
                    <h3>⚠️ Access Denied</h3>
                    <p>This user's profile contains restricted information. You do not have permission to view private data.</p>
                </div>
                
                <div class="user-list">
                    <h3>View Other Profiles</h3>
                    <a href="?user_id=1">User 1</a>
                    <a href="?user_id=2">User 2</a>
                    <a href="?user_id=3">User 3</a>
                </div>
            </div>
        <?php else: ?>
            <div class="profile">
                <div class="profile-header">
                    <div class="avatar">
                        <?php echo strtoupper(substr($user['username'], 0, 1)); ?>
                    </div>
                    <div class="profile-info">
                        <h2><?php echo htmlspecialchars($user['username']); ?></h2>
                        <p><?php echo htmlspecialchars($user['email']); ?></p>
                        <p>Role: <?php echo htmlspecialchars($user['role']); ?></p>
                    </div>
                </div>
                
                <div class="profile-details">
                    <div class="detail-card">
                        <h3>User ID</h3>
                        <p><?php echo htmlspecialchars($user['id']); ?></p>
                    </div>
                    <div class="detail-card">
                        <h3>Email</h3>
                        <p><?php echo htmlspecialchars($user['email']); ?></p>
                    </div>
                    <div class="detail-card">
                        <h3>Role</h3>
                        <p><?php echo htmlspecialchars($user['role']); ?></p>
                    </div>
                </div>
                
                <div class="bio-section">
                    <h3>About</h3>
                    <p><?php echo htmlspecialchars($user['bio']); ?></p>
                </div>
                
                <div class="posts-section">
                    <h3>Recent Posts</h3>
                    <?php foreach ($user['posts'] as $post): ?>
                        <div class="post-item">
                            <?php echo htmlspecialchars($post); ?>
                        </div>
                    <?php endforeach; ?>
                </div>
                
                <?php if ($showPrivate === 'true' && isset($user['private_data'])): ?>
                    <div class="private-section">
                        <h3>🔓 Private Data</h3>
                        <?php foreach ($user['private_data'] as $key => $value): ?>
                            <div class="private-data-item">
                                <strong><?php echo htmlspecialchars(ucfirst(str_replace('_', ' ', $key))); ?>:</strong> 
                                <?php echo htmlspecialchars($value); ?>
                            </div>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
                
                <div class="user-list">
                    <h3>View Other Profiles</h3>
                    <a href="?user_id=1">User 1</a>
                    <a href="?user_id=2">User 2</a>
                    <a href="?user_id=3">User 3</a>
                </div>
            </div>
        <?php endif; ?>
    </div>
    
    <div class="footer">
        <a href="hint.php">Need help with this lab?</a>
    </div>
</body>
</html>
