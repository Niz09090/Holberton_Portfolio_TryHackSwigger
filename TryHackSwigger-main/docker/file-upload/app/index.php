<?php
$message = '';
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $uploadDir = __DIR__ . '/uploads/';
    
    // Create uploads directory if it doesn't exist
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }
    
    $file = $_FILES['file'];
    $filename = $file['name'];
    $tmpName = $file['tmp_name'];
    $fileSize = $file['size'];
    $fileError = $file['error'];
    
    // VULNERABLE: No file type validation, no extension checking
    if ($fileError === 0) {
        $fileDestination = $uploadDir . $filename;
        
        if (move_uploaded_file($tmpName, $fileDestination)) {
            $message = "File uploaded successfully: $filename";
            
            // Check if uploaded file contains flag
            if (pathinfo($filename, PATHINFO_EXTENSION) === 'php') {
                $message .= " - Flag: hackforge{file_upload_flag_found}";
            }
        } else {
            $error = "Failed to upload file";
        }
    } else {
        $error = "Error uploading file";
    }
}

// List uploaded files
$uploadDir = __DIR__ . '/uploads/';
$uploadedFiles = [];
if (is_dir($uploadDir)) {
    $uploadedFiles = scandir($uploadDir);
    $uploadedFiles = array_diff($uploadedFiles, ['.', '..']);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CloudStore - File Storage</title>
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
            color: #3498db;
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
        .upload-section {
            background: rgba(30, 30, 50, 0.9);
            border-radius: 10px;
            padding: 30px;
            margin-bottom: 30px;
        }
        .upload-section h2 {
            color: #3498db;
            margin-bottom: 20px;
        }
        .upload-form {
            border: 2px dashed #333;
            border-radius: 10px;
            padding: 40px;
            text-align: center;
        }
        .upload-form input[type="file"] {
            display: none;
        }
        .upload-label {
            display: inline-block;
            padding: 15px 30px;
            background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
            border-radius: 5px;
            color: #fff;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            margin-bottom: 15px;
        }
        .upload-label:hover {
            opacity: 0.9;
        }
        .btn {
            padding: 12px 25px;
            background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
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
        .files-section {
            background: rgba(30, 30, 50, 0.9);
            border-radius: 10px;
            padding: 30px;
        }
        .files-section h2 {
            color: #3498db;
            margin-bottom: 20px;
        }
        .file-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 15px;
        }
        .file-item {
            background: rgba(20, 20, 40, 0.8);
            border: 1px solid #333;
            border-radius: 5px;
            padding: 15px;
        }
        .file-item h3 {
            color: #3498db;
            font-size: 14px;
            margin-bottom: 5px;
            word-break: break-all;
        }
        .file-item p {
            color: #888;
            font-size: 12px;
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
            color: #3498db;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">
            <h1>☁️ CloudStore</h1>
            <p>Secure Cloud File Storage</p>
        </div>
    </div>
    
    <div class="container">
        <div class="upload-section">
            <h2>Upload Files</h2>
            
            <?php if ($error): ?>
                <div class="error"><?php echo htmlspecialchars($error); ?></div>
            <?php endif; ?>
            
            <?php if ($message): ?>
                <div class="success"><?php echo htmlspecialchars($message); ?></div>
            <?php endif; ?>
            
            <form class="upload-form" method="POST" enctype="multipart/form-data">
                <input type="file" name="file" id="fileInput">
                <label for="fileInput" class="upload-label">Choose File</label>
                <p id="fileName" style="color: #888; margin-bottom: 15px;"></p>
                <button type="submit" class="btn">Upload</button>
            </form>
        </div>
        
        <div class="files-section">
            <h2>Uploaded Files</h2>
            <div class="file-list">
                <?php foreach ($uploadedFiles as $file): ?>
                    <div class="file-item">
                        <h3><?php echo htmlspecialchars($file); ?></h3>
                        <p><?php echo date('Y-m-d H:i:s', filemtime($uploadDir . $file)); ?></p>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
    
    <div class="footer">
        <a href="hint.php">Need help with this lab?</a>
    </div>
    
    <script>
        document.getElementById('fileInput').addEventListener('change', function(e) {
            document.getElementById('fileName').textContent = e.target.files[0] ? e.target.files[0].name : '';
        });
    </script>
</body>
</html>
