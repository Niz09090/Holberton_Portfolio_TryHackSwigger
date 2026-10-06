<?php
$result = '';
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['xml_data'])) {
    $xmlData = $_POST['xml_data'];
    
    // VULNERABLE: XXE - loads external entities
    libxml_disable_entity_loader(false);
    
    try {
        $dom = new DOMDocument();
        $dom->loadXML($xmlData, LIBXML_NOENT | LIBXML_DTDLOAD);
        
        $products = $dom->getElementsByTagName('product');
        $result = '<div class="results">';
        foreach ($products as $product) {
            $name = $product->getElementsByTagName('name')->item(0)->nodeValue;
            $price = $product->getElementsByTagName('price')->item(0)->nodeValue;
            $result .= "<div class='result-item'><strong>$name</strong> - $$price</div>";
        }
        $result .= '</div>';
        
        // Check for flag in XML
        if (strpos($xmlData, 'flag') !== false || strpos($xmlData, 'tryhackswigger') !== false) {
            $result .= '<div class="flag">🏆 Flag: tryhackswigger{xxe_injection_flag}</div>';
        }
    } catch (Exception $e) {
        $error = 'Error parsing XML: ' . $e->getMessage();
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DataSync - XML Data Import</title>
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
            color: #e74c3c;
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
            color: #e74c3c;
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
        .form-group textarea {
            width: 100%;
            padding: 15px;
            background: rgba(20, 20, 40, 0.9);
            border: 2px solid #333;
            border-radius: 5px;
            color: #fff;
            font-size: 14px;
            font-family: 'Courier New', monospace;
            min-height: 200px;
        }
        .form-group textarea:focus {
            outline: none;
            border-color: #e74c3c;
        }
        .btn {
            padding: 15px 30px;
            background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
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
        .results {
            background: rgba(20, 20, 40, 0.8);
            border: 1px solid #333;
            border-radius: 5px;
            padding: 20px;
            margin-top: 20px;
        }
        .result-item {
            padding: 10px;
            margin-bottom: 10px;
            background: rgba(231, 76, 60, 0.1);
            border-left: 3px solid #e74c3c;
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
            color: #e74c3c;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">
            <h1>🔄 DataSync</h1>
            <p>XML Data Import System</p>
        </div>
    </div>
    
    <div class="container">
        <div class="tool">
            <h2>Import Product Data</h2>
            
            <?php if ($error): ?>
                <div class="error"><?php echo htmlspecialchars($error); ?></div>
            <?php endif; ?>
            
            <form method="POST">
                <div class="form-group">
                    <label>Data Import (JSON, XML, CSV supported)</label>
                    <textarea name="xml_data" placeholder="Paste your data here..."><?php echo htmlspecialchars($_POST['xml_data'] ?? ''); ?></textarea>
                </div>
                <button type="submit" class="btn">Import Data</button>
            </form>
            
            <?php echo $result; ?>
        </div>
    </div>
    
    <div class="footer">
        <a href="hint.php">Need help with this lab?</a>
    </div>
</body>
</html>
