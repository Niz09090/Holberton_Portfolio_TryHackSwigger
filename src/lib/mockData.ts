import { 
  User, 
  Lab, 
  LearningPath, 
  Badge, 
  LeaderboardEntry, 
  Race, 
  ForumThread, 
  Activity,
  LabCategory,
  Difficulty,
  BadgeRarity,
  BadgeCategory,
  RaceType,
  RaceStatus,
  ForumCategory,
  ActivityType,
  SubscriptionPlan,
  SubscriptionStatus,
  VpnStatus,
  BlueLab,
  BlueLabCategory,
  LabType,
  BlueModule,
  LabTeamType
} from './types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'cyber_ninja',
    displayName: 'Cyber Ninja',
    email: 'ninja@tryhackswigger.io',
    avatar: '/avatars/ninja.png',
    rank: 'Elite Hacker',
    points: 15420,
    level: 42,
    xp: 3150,
    xpToNextLevel: 5000,
    streak: 15,
    joinDate: '2023-01-15',
    country: 'US',
    isVip: true,
    badges: {
      earned: ['badge1', 'badge2', 'badge3', 'badge4'],
      locked: ['badge5', 'badge6']
    }
  },
  {
    id: '2',
    username: 'byte_warrior',
    displayName: 'Byte Warrior',
    email: 'warrior@tryhackswigger.io',
    avatar: '/avatars/warrior.png',
    rank: 'Master Exploiter',
    points: 12350,
    level: 38,
    xp: 2800,
    xpToNextLevel: 4500,
    streak: 7,
    joinDate: '2023-03-22',
    country: 'UK',
    isVip: true,
    badges: {
      earned: ['badge1', 'badge2', 'badge3'],
      locked: ['badge4', 'badge5', 'badge6']
    }
  },
  {
    id: '3',
    username: 'pixel_hacker',
    displayName: 'Pixel Hacker',
    email: 'pixel@tryhackswigger.io',
    avatar: '/avatars/pixel.png',
    rank: 'Security Expert',
    points: 8900,
    level: 31,
    xp: 1200,
    xpToNextLevel: 3500,
    streak: 3,
    joinDate: '2023-06-10',
    country: 'CA',
    badges: {
      earned: ['badge1', 'badge2'],
      locked: ['badge3', 'badge4', 'badge5', 'badge6']
    },
    isVip: false
  },
  {
    id: '4',
    username: 'code_breaker',
    displayName: 'Code Breaker',
    email: 'breaker@tryhackswigger.io',
    avatar: '/avatars/breaker.png',
    rank: 'Penetration Tester',
    points: 6750,
    level: 25,
    xp: 800,
    xpToNextLevel: 2500,
    streak: 21,
    joinDate: '2023-08-05',
    country: 'DE',
    isVip: false,
    badges: {
      earned: ['badge1'],
      locked: ['badge2', 'badge3', 'badge4', 'badge5', 'badge6']
    }
  },
  {
    id: '5',
    username: 'root_admin',
    displayName: 'Root Admin',
    email: 'admin@tryhackswigger.io',
    avatar: '/avatars/admin.png',
    rank: 'System Administrator',
    points: 5200,
    level: 20,
    xp: 400,
    xpToNextLevel: 2000,
    streak: 1,
    joinDate: '2023-09-18',
    country: 'AU',
    badges: {
      earned: [],
      locked: ['badge1', 'badge2', 'badge3', 'badge4', 'badge5', 'badge6']
    },
    isVip: false
  }
];

// Mock Labs
export const mockLabs: Lab[] = [
  {
    id: '1',
    slug: 'sql-injection-basics',
    title: 'SQL Injection Fundamentals',
    description: 'Learn the basics of SQL injection vulnerabilities and how to exploit them in web applications.',
    category: LabCategory.SQL_INJECTION,
    difficulty: Difficulty.EASY,
    points: 100,
    estimatedTime: 45,
    learningObjectives: [
      'Understand SQL injection concepts',
      'Identify vulnerable parameters',
      'Extract data using UNION-based injection',
      'Bypass basic filters'
    ],
    prerequisites: ['Basic SQL knowledge'],
    flag: 'tryhackswigger{sqli_1_union_select_rocks}',
    hints: [
      { text: 'Try injecting quotes to see if the application is vulnerable', cost: 10 },
      { text: 'Use ORDER BY to determine the number of columns', cost: 20 },
      { text: 'UNION SELECT can help you extract data from other tables', cost: 30 }
    ],
    solution: 'The vulnerability exists in the search parameter. By injecting `\' UNION SELECT username, password FROM users--` you can extract user credentials.',
    completedBy: 234,
    rating: 4.5,
    completions: 234,
    createdAt: '2024-01-15T10:00:00Z',
    dockerImage: 'tryhackswigger/sqli-basic:latest',
    terminalEnabled: false,
    ports: [80]
  },
  {
    id: '2',
    slug: 'xss-reflected-attack',
    title: 'Reflected XSS Attack',
    description: 'Exploit a reflected cross-site scripting vulnerability to steal cookies.',
    category: LabCategory.XSS,
    difficulty: Difficulty.EASY,
    points: 150,
    estimatedTime: 30,
    learningObjectives: [
      'Identify XSS vulnerabilities',
      'Craft malicious payloads',
      'Understand CSP bypasses',
      'Exploit reflected XSS'
    ],
    flag: 'tryhackswigger{xss_reflected_flag_found}',
    hints: [
      { text: 'Check the search functionality for reflection', cost: 10 },
      { text: 'Try different event handlers', cost: 20 },
      { text: 'Consider encoding bypasses', cost: 30 }
    ],
    solution: 'The search parameter reflects user input without sanitization. Inject `<script>alert(document.cookie)</script>` to execute JavaScript.',
    completedBy: 189,
    rating: 4.2,
    completions: 189,
    createdAt: '2024-01-20T10:00:00Z',
    dockerImage: 'tryhackswigger/xss-reflected:latest',
    terminalEnabled: false,
    ports: [80]
  },
  {
    id: '3',
    slug: 'csrf-token-bypass',
    title: 'CSRF Token Bypass',
    description: 'Bypass CSRF protection mechanisms to perform unauthorized actions.',
    category: LabCategory.CSRF,
    difficulty: Difficulty.MEDIUM,
    points: 200,
    estimatedTime: 60,
    learningObjectives: [
      'Understand CSRF attacks',
      'Identify weak CSRF implementations',
      'Bypass token validation',
      'Craft CSRF exploits'
    ],
    flag: 'tryhackswigger{csrf_bypass_flag_found}',
    hints: [
      { text: 'Analyze the token generation mechanism', cost: 15 },
      { text: 'Check if tokens are predictable', cost: 25 },
      { text: 'Look for token validation bypasses', cost: 35 }
    ],
    solution: 'The CSRF token is based on timestamp and predictable. Generate valid tokens and use them in forged requests.',
    completedBy: 98,
    rating: 4.7,
    completions: 98,
    createdAt: '2024-01-25T10:00:00Z',
    dockerImage: 'tryhackswigger/csrf-bypass:latest',
    terminalEnabled: false,
    ports: [80]
  },
  {
    id: '4',
    slug: 'ssrf-cloud-metadata',
    title: 'SSRF Cloud Metadata Attack',
    description: 'Exploit Server-Side Request Forgery to access cloud metadata.',
    category: LabCategory.SSRF,
    difficulty: Difficulty.HARD,
    points: 300,
    estimatedTime: 90,
    learningObjectives: [
      'Identify SSRF vulnerabilities',
      'Access cloud metadata endpoints',
      'Extract sensitive credentials',
      'Understand DNS rebinding'
    ],
    flag: 'tryhackswigger{ssrf_flag_found}',
    hints: [
      { text: 'Cloud providers have metadata endpoints', cost: 10 },
      { text: 'AWS: 169.254.169.254', cost: 15 },
      { text: 'GCP: metadata.google.internal', cost: 15 }
    ],
    solution: 'Use SSRF to access cloud metadata endpoints and extract temporary credentials.',
    completedBy: 67,
    rating: 4.8,
    completions: 67,
    createdAt: '2024-02-01T10:00:00Z',
    dockerImage: 'tryhackswigger/ssrf-basic:latest',
    terminalEnabled: false,
    ports: [80]
  },
  {
    id: '5',
    slug: 'xxe-external-entity',
    title: 'XXE External Entity Injection',
    description: 'Exploit XML External Entity vulnerabilities to read local files.',
    category: LabCategory.XXE,
    difficulty: Difficulty.MEDIUM,
    points: 250,
    estimatedTime: 75,
    learningObjectives: [
      'Identify XXE vulnerabilities',
      'Craft malicious XML payloads',
      'Read local files via XXE',
      'Perform blind XXE attacks'
    ],
    flag: 'tryhackswigger{xxe_injection_flag}',
    hints: [
      { text: 'Look for XML parsing functionality', cost: 10 },
      { text: 'Try external entity declarations', cost: 15 },
      { text: 'Use file:// protocol for local files', cost: 20 }
    ],
    solution: 'Inject external entity declaration to read /etc/passwd file through XML parser.',
    completedBy: 112,
    rating: 4.4,
    completions: 112,
    createdAt: '2024-02-10T10:00:00Z',
    dockerImage: 'tryhackswigger/xxe-injection:latest',
    terminalEnabled: false,
    ports: [80]
  },
  {
    id: '6',
    slug: 'idor-user-escalation',
    title: 'IDOR User Escalation',
    description: 'Exploit Insecure Direct Object Reference to access other users\' data.',
    category: LabCategory.IDOR,
    difficulty: Difficulty.EASY,
    points: 120,
    estimatedTime: 40,
    learningObjectives: [
      'Identify IDOR vulnerabilities',
      'Manipulate object references',
      'Access unauthorized data',
      'Understand access control flaws'
    ],
    flag: 'tryhackswigger{idor_flag_found}',
    hints: [
      { text: 'Check URL parameters for object IDs', cost: 10 },
      { text: 'Try changing user IDs in requests', cost: 15 },
      { text: 'Look for predictable ID patterns', cost: 20 }
    ],
    solution: 'Change user ID in profile endpoint from your ID to admin ID to access admin data.',
    completedBy: 156,
    rating: 4.1,
    completions: 156,
    createdAt: '2024-02-15T10:00:00Z',
    dockerImage: 'tryhackswigger/idor-basic:latest',
    terminalEnabled: false,
    ports: [80]
  },
  {
    id: '7',
    slug: 'auth-bypass-jwt',
    title: 'JWT Authentication Bypass',
    description: 'Bypass JWT authentication to gain admin access.',
    category: LabCategory.AUTH_BYPASS,
    difficulty: Difficulty.HARD,
    points: 350,
    estimatedTime: 120,
    learningObjectives: [
      'Understand JWT structure',
      'Identify weak JWT secrets',
      'Forge malicious tokens',
      'Bypass authentication mechanisms'
    ],
    flag: 'tryhackswigger{jwt_bypass_flag}',
    hints: [
      { text: 'Analyze the JWT algorithm', cost: 15 },
      { text: 'Try brute-forcing the secret', cost: 25 },
      { text: 'Look for algorithm confusion vulnerabilities', cost: 30 }
    ],
    solution: 'Use weak JWT secret to forge admin tokens and gain unauthorized access.',
    completedBy: 45,
    rating: 4.9,
    completions: 45,
    createdAt: '2024-02-20T10:00:00Z',
    dockerImage: 'tryhackswigger/jwt-bypass:latest',
    terminalEnabled: false,
    ports: [80]
  },
  {
    id: '8',
    slug: 'privilege-escalation-linux',
    title: 'Linux Privilege Escalation',
    description: 'Escalate privileges from regular user to root on Linux system.',
    category: LabCategory.PRIVILEGE_ESCALATION,
    difficulty: Difficulty.HARD,
    points: 400,
    estimatedTime: 150,
    learningObjectives: [
      'Identify privilege escalation vectors',
      'Exploit SUID binaries',
      'Abuse cron jobs',
      'Escalate to root access'
    ],
    flag: 'tryhackswigger{privesc_linux_root_flag}',
    hints: [
      { text: 'Check for SUID binaries with find / -perm -4000', cost: 15 },
      { text: 'Look for world-writable cron jobs', cost: 20 },
      { text: 'Check for kernel exploits', cost: 25 }
    ],
    solution: 'Exploit SUID binary vulnerability to gain root shell.',
    completedBy: 78,
    rating: 4.6,
    completions: 78,
    createdAt: '2024-02-25T10:00:00Z',
    dockerImage: 'tryhackswigger/privesc-linux:latest',
    terminalEnabled: true,
    ports: [7681]
  },
  {
    id: '9',
    slug: 'file-upload-shell',
    title: 'File Upload to Shell',
    description: 'Upload malicious file to gain web shell access.',
    category: LabCategory.FILE_UPLOAD,
    difficulty: Difficulty.MEDIUM,
    points: 280,
    estimatedTime: 80,
    learningObjectives: [
      'Bypass file upload restrictions',
      'Upload web shells',
      'Execute system commands',
      'Maintain persistence'
    ],
    flag: 'tryhackswigger{file_upload_flag_found}',
    hints: [
      { text: 'Try different file extensions', cost: 10 },
      { text: 'Use double extensions', cost: 15 },
      { text: 'Check MIME type validation', cost: 20 }
    ],
    solution: 'Upload PHP web shell with .php extension and bypass filters to gain RCE.',
    completedBy: 134,
    rating: 4.3,
    completions: 134,
    createdAt: '2024-03-01T10:00:00Z',
    dockerImage: 'tryhackswigger/file-upload:latest',
    terminalEnabled: false,
    ports: [80]
  },
  {
    id: '10',
    slug: 'command-injection-rce',
    title: 'Command Injection RCE',
    description: 'Achieve Remote Code Execution through command injection.',
    category: LabCategory.COMMAND_INJECTION,
    difficulty: Difficulty.MEDIUM,
    points: 260,
    estimatedTime: 70,
    learningObjectives: [
      'Identify command injection points',
      'Bypass input filters',
      'Execute system commands',
      'Chain commands for complex attacks'
    ],
    flag: 'tryhackswigger{cmd_injection_flag}',
    hints: [
      { text: 'Look for system() calls in backend', cost: 10 },
      { text: 'Try command chaining with ; && ||', cost: 15 },
      { text: 'Use encoding to bypass filters', cost: 20 }
    ],
    solution: 'Inject `; cat /etc/passwd` into ping parameter to execute arbitrary commands.',
    completedBy: 145,
    rating: 4.5,
    completions: 145,
    createdAt: '2024-03-05T10:00:00Z',
    dockerImage: 'tryhackswigger/cmd-injection:latest',
    terminalEnabled: false,
    ports: [80]
  },
  {
    id: '11',
    slug: 'lfi-path-traversal',
    title: 'Local File Inclusion',
    description: 'Exploit LFI to read sensitive files on the server.',
    category: LabCategory.LFI,
    difficulty: Difficulty.EASY,
    points: 110,
    estimatedTime: 35,
    learningObjectives: [
      'Identify LFI vulnerabilities',
      'Perform path traversal attacks',
      'Read sensitive files',
      'Bypass file inclusion filters'
    ],
    flag: 'tryhackswigger{lfi_file_reader_flag}',
    hints: [
      { text: 'Look for file inclusion in parameters', cost: 10 },
      { text: 'Use ../ for path traversal', cost: 15 },
      { text: 'Try null byte injection', cost: 20 }
    ],
    solution: 'Use `../../etc/passwd` to read system files through LFI vulnerability.',
    completedBy: 178,
    rating: 4.0,
    completions: 178,
    createdAt: '2024-03-10T10:00:00Z',
    dockerImage: 'tryhackswigger/lfi-basic:latest',
    terminalEnabled: false,
    ports: [80]
  },
  {
    id: '12',
    slug: 'buffer-overflow-basic',
    title: 'Basic Buffer Overflow',
    description: 'Exploit buffer overflow to gain control of program execution.',
    category: LabCategory.BUFFER_OVERFLOW,
    difficulty: Difficulty.INSANE,
    points: 500,
    estimatedTime: 180,
    learningObjectives: [
      'Understand buffer overflow concepts',
      'Identify vulnerable functions',
      'Craft exploit payloads',
      'Gain shell access'
    ],
    flag: 'tryhackswigger{bof_exploit_success}',
    hints: [
      { text: 'Use pattern_create.rb to find offset', cost: 20 },
      { text: 'Check for stack canaries', cost: 25 },
      { text: 'Look for ASLR bypass techniques', cost: 30 }
    ],
    solution: 'Overflow buffer to overwrite return address and execute shellcode.',
    completedBy: 23,
    rating: 4.9,
    completions: 23,
    createdAt: '2024-03-15T10:00:00Z',
    dockerImage: 'tryhackswigger/bof-basic:latest',
    terminalEnabled: true,
    ports: [7681]
  },
  {
    id: '13',
    slug: 'log-analysis-sqli-attack',
    title: 'Log Analysis: SQL Injection Attack',
    description: 'Analyze web server logs to identify and investigate a SQL injection attack.',
    category: LabCategory.FORENSICS,
    difficulty: Difficulty.MEDIUM,
    points: 250,
    estimatedTime: 60,
    learningObjectives: [
      'Analyze web server access logs',
      'Identify SQL injection patterns',
      'Extract attacker IP addresses',
      'Determine attack vectors'
    ],
    prerequisites: ['Basic log analysis knowledge'],
    flag: 'tryhackswigger{log_analysis_sqli_detected}',
    hints: [
      { text: 'Look for unusual patterns in the access logs', cost: 15 },
      { text: 'SQL injection often contains UNION or OR statements', cost: 20 },
      { text: 'Check for repeated requests from the same IP', cost: 25 }
    ],
    solution: 'The attacker IP is 192.168.1.100. They used UNION-based SQL injection to extract user data.',
    completedBy: 89,
    rating: 4.4,
    completions: 89,
    createdAt: '2024-03-20T10:00:00Z',
    dockerImage: 'tryhackswigger/sqli-basic:latest',
    terminalEnabled: false,
    ports: [80],
    type: LabTeamType.BLUE_TEAM,
    incidentScenario: 'Your organization\'s web application has been experiencing unusual traffic patterns. The security team has detected potential SQL injection attempts in the web server logs. As a Blue Team analyst, you need to analyze the access logs to identify the attacker\'s IP address, determine the attack vector, and understand what data was being targeted.',
    investigativeQuestions: [
      {
        id: 'q1',
        question: 'What is the attacker\'s IP address?',
        flag: '192.168.1.100',
        hint: 'Look for IP addresses with suspicious request patterns'
      },
      {
        id: 'q2',
        question: 'What type of SQL injection technique was used?',
        flag: 'UNION-based',
        hint: 'The attacker used a specific SQL keyword to combine results'
      },
      {
        id: 'q3',
        question: 'What table was the attacker trying to access?',
        flag: 'users',
        hint: 'Look for table names in the injected SQL payload'
      }
    ]
  },
  {
    id: '14',
    slug: 'ssh-brute-force-analysis',
    title: 'SSH Brute Force Log Analysis',
    description: 'Analyze SSH authentication logs to identify a brute force attack and determine the attacker\'s methods.',
    category: LabCategory.FORENSICS,
    difficulty: Difficulty.EASY,
    points: 200,
    estimatedTime: 45,
    learningObjectives: [
      'Analyze SSH auth logs',
      'Identify brute force patterns',
      'Extract attacker IP and username targets',
      'Determine attack timeline'
    ],
    prerequisites: ['Basic Linux log analysis'],
    flag: 'tryhackswigger{ssh_brute_force_detected}',
    hints: [
      { text: 'Look for repeated failed authentication attempts', cost: 10 },
      { text: 'Check /var/log/auth.log or /var/log/secure', cost: 15 },
      { text: 'Count failed attempts per IP address', cost: 20 }
    ],
    solution: 'Attacker IP 10.0.0.55 performed 847 failed SSH attempts targeting root and admin users.',
    completedBy: 0,
    rating: 0,
    completions: 0,
    createdAt: '2024-03-25T10:00:00Z',
    dockerImage: 'tryhackswigger/sqli-basic:latest',
    terminalEnabled: false,
    ports: [80],
    type: LabTeamType.BLUE_TEAM,
    incidentScenario: 'Your organization\'s SSH server has been receiving an unusually high volume of failed authentication attempts. The SOC team has flagged this as a potential brute force attack. As a security analyst, you need to analyze the SSH authentication logs to identify the source IP, determine which usernames were targeted, and assess the scale of the attack.',
    investigativeQuestions: [
      {
        id: 'q1',
        question: 'What is the attacker\'s IP address?',
        flag: '10.0.0.55',
        hint: 'Look for the IP with the most failed authentication attempts'
      },
      {
        id: 'q2',
        question: 'How many failed login attempts were made?',
        flag: '847',
        hint: 'Count the total number of "Failed password" entries'
      },
      {
        id: 'q3',
        question: 'Which username was targeted most frequently?',
        flag: 'root',
        hint: 'Check which account appears most often in failed attempts'
      }
    ]
  },
  {
    id: '15',
    slug: 'web-shell-investigation',
    title: 'Web Shell Upload Investigation',
    description: 'Investigate nginx and PHP logs to detect and analyze a web shell upload attack.',
    category: LabCategory.FORENSICS,
    difficulty: Difficulty.MEDIUM,
    points: 300,
    estimatedTime: 75,
    learningObjectives: [
      'Analyze nginx access and error logs',
      'Identify web shell upload patterns',
      'Detect PHP backdoor execution',
      'Trace attacker post-exploitation activity'
    ],
    prerequisites: ['Web server log analysis', 'PHP basics'],
    flag: 'tryhackswigger{web_shell_detected}',
    hints: [
      { text: 'Look for unusual file upload requests', cost: 15 },
      { text: 'Check for POST requests to upload endpoints', cost: 20 },
      { text: 'Search for suspicious PHP file accesses after upload', cost: 25 }
    ],
    solution: 'Attacker uploaded shell.php via /upload endpoint, then executed it to run system commands.',
    completedBy: 0,
    rating: 0,
    completions: 0,
    createdAt: '2024-03-26T10:00:00Z',
    dockerImage: 'tryhackswigger/file-upload:latest',
    terminalEnabled: false,
    ports: [80],
    type: LabTeamType.BLUE_TEAM,
    incidentScenario: 'Your web application\'s file upload functionality has been exploited. The security team suspects a web shell was uploaded and is being used for remote command execution. You need to analyze the nginx access logs and PHP error logs to identify the uploaded file, determine when it was uploaded, and trace the attacker\'s subsequent activities.',
    investigativeQuestions: [
      {
        id: 'q1',
        question: 'What is the name of the uploaded web shell file?',
        flag: 'shell.php',
        hint: 'Look for POST requests to upload endpoints with .php extensions'
      },
      {
        id: 'q2',
        question: 'What endpoint was used to upload the file?',
        flag: '/upload',
        hint: 'Check the URL path in the upload POST request'
      },
      {
        id: 'q3',
        question: 'What system command did the attacker execute first?',
        flag: 'whoami',
        hint: 'Look for GET requests with command parameters in the web shell URL'
      },
      {
        id: 'q4',
        question: 'What was the attacker\'s source IP address?',
        flag: '203.0.113.42',
        hint: 'Find the IP that made both the upload and subsequent web shell requests'
      }
    ]
  },
  {
    id: '16',
    slug: 'ransomware-ioc-hunting',
    title: 'Ransomware IOC Hunting',
    description: 'Hunt for Indicators of Compromise in Windows Event Logs during a ransomware incident.',
    category: LabCategory.FORENSICS,
    difficulty: Difficulty.HARD,
    points: 400,
    estimatedTime: 120,
    learningObjectives: [
      'Analyze Windows Event Logs',
      'Identify ransomware IOCs',
      'Detect suspicious process execution',
      'Track file encryption activities'
    ],
    prerequisites: ['Windows Event Log analysis', 'Malware analysis basics'],
    flag: 'tryhackswigger{ransomware_iocs_found}',
    hints: [
      { text: 'Check Security Event Log for process creation', cost: 20 },
      { text: 'Look for unusual PowerShell execution', cost: 25 },
      { text: 'Search for mass file modification events', cost: 30 }
    ],
    solution: 'Ransomware executed via PowerShell, encrypted .docx files, and dropped ransom note.',
    completedBy: 0,
    rating: 0,
    completions: 0,
    createdAt: '2024-03-27T10:00:00Z',
    dockerImage: 'tryhackswigger/cmd-injection:latest',
    terminalEnabled: false,
    ports: [80],
    type: LabTeamType.BLUE_TEAM,
    incidentScenario: 'A workstation in your organization has been infected with ransomware. The user reported files being encrypted and a ransom note appearing. You need to analyze the Windows Event Logs to identify the initial infection vector, determine what processes were executed, and find indicators of compromise that can help contain the spread and prevent future infections.',
    investigativeQuestions: [
      {
        id: 'q1',
        question: 'What was the name of the malicious PowerShell script executed?',
        flag: 'encrypt.ps1',
        hint: 'Look for PowerShell process creation with suspicious script names'
      },
      {
        id: 'q2',
        question: 'What file extension was primarily targeted for encryption?',
        flag: '.docx',
        hint: 'Check for mass file modification events with specific extensions'
      },
      {
        id: 'q3',
        question: 'What was the name of the ransom note file dropped?',
        flag: 'README_DECRYPT.txt',
        hint: 'Look for file creation events with ransom-related names'
      },
      {
        id: 'q4',
        question: 'Which Event ID indicates the suspicious process execution?',
        flag: '4688',
        hint: 'Security Event Log uses Event ID 4688 for process creation'
      }
    ]
  },
  {
    id: '17',
    slug: 'lateral-movement-detection',
    title: 'Lateral Movement Detection',
    description: 'Detect lateral movement by analyzing failed login attempts across multiple systems.',
    category: LabCategory.FORENSICS,
    difficulty: Difficulty.MEDIUM,
    points: 280,
    estimatedTime: 60,
    learningObjectives: [
      'Analyze authentication logs across systems',
      'Identify lateral movement patterns',
      'Detect credential spraying attacks',
      'Map attacker movement through network'
    ],
    prerequisites: ['Active Directory log analysis', 'Windows security basics'],
    flag: 'tryhackswigger{lateral_movement_detected}',
    hints: [
      { text: 'Look for failed logins from the same account across multiple hosts', cost: 15 },
      { text: 'Check Event ID 4625 for failed logons', cost: 20 },
      { text: 'Identify the source workstation of the attacker', cost: 25 }
    ],
    solution: 'Attacker compromised workstation WS-01, then attempted lateral movement to 5 other systems using svc_account.',
    completedBy: 0,
    rating: 0,
    completions: 0,
    createdAt: '2024-03-28T10:00:00Z',
    dockerImage: 'tryhackswigger/jwt-bypass:latest',
    terminalEnabled: false,
    ports: [80],
    type: LabTeamType.BLUE_TEAM,
    incidentScenario: 'Your security monitoring has detected suspicious failed login attempts across multiple systems in your network. This pattern suggests an attacker may be attempting lateral movement after compromising an initial system. You need to analyze the authentication logs from various systems to identify the source of the attack, determine which account is being used, and map the attacker\'s attempted movement through your network.',
    investigativeQuestions: [
      {
        id: 'q1',
        question: 'Which account is being used for lateral movement?',
        flag: 'svc_account',
        hint: 'Look for the same username appearing in failed logins across different hosts'
      },
      {
        id: 'q2',
        question: 'What is the hostname of the initially compromised workstation?',
        flag: 'WS-01',
        hint: 'Find the host where this account first had successful logins before failures elsewhere'
      },
      {
        id: 'q3',
        question: 'How many different systems were targeted for lateral movement?',
        flag: '5',
        hint: 'Count the unique target hostnames in the failed login attempts'
      },
      {
        id: 'q4',
        question: 'What is the source IP address of the attacker?',
        flag: '192.168.10.50',
        hint: 'Look for the external IP address in the initial compromise logs'
      }
    ]
  },
  {
    id: '18',
    slug: 'phishing-header-analysis',
    title: 'Phishing Email Header Analysis',
    description: 'Analyze email headers to trace the origin of a phishing campaign and identify spoofing techniques.',
    category: LabCategory.FORENSICS,
    difficulty: Difficulty.EASY,
    points: 180,
    estimatedTime: 40,
    learningObjectives: [
      'Parse email headers',
      'Identify email spoofing',
      'Trace email routing path',
      'Detect phishing indicators'
    ],
    prerequisites: ['Email protocol basics', 'Header analysis'],
    flag: 'tryhackswigger{phishing_headers_analyzed}',
    hints: [
      { text: 'Check the Received headers to trace the email path', cost: 10 },
      { text: 'Look for SPF/DKIM/DMARC authentication results', cost: 15 },
      { text: 'Compare From header with actual sending server', cost: 20 }
    ],
    solution: 'Email was spoofed using compromised server, SPF failed, originated from malicious IP.',
    completedBy: 0,
    rating: 0,
    completions: 0,
    createdAt: '2024-03-29T10:00:00Z',
    dockerImage: 'tryhackswigger/csrf-bypass:latest',
    terminalEnabled: false,
    ports: [80],
    type: LabTeamType.BLUE_TEAM,
    incidentScenario: 'Your organization has received reports of a phishing email targeting employees. The email appears to come from your CEO requesting urgent wire transfers. You need to analyze the full email headers to determine if this is a legitimate email or a spoofed phishing attempt, trace the actual origin of the email, and identify technical indicators that can help block similar attacks.',
    investigativeQuestions: [
      {
        id: 'q1',
        question: 'What is the actual sending IP address of the email?',
        flag: '185.220.101.10',
        hint: 'Look at the bottom-most Received header for the true origin'
      },
      {
        id: 'q2',
        question: 'Did the SPF authentication pass or fail?',
        flag: 'fail',
        hint: 'Check the Authentication-Results header for SPF status'
      },
      {
        id: 'q3',
        question: 'What domain was spoofed in the From header?',
        flag: 'yourcompany.com',
        hint: 'Compare the From domain with the actual sending server domain'
      },
      {
        id: 'q4',
        question: 'What mail server was abused to send the email?',
        flag: 'mail.victim-server.com',
        hint: 'Look for the server name in the Received headers'
      }
    ]
  },
  {
    id: '19',
    slug: 'privilege-escalation-forensics',
    title: 'Privilege Escalation Forensics',
    description: 'Analyze Linux auditd logs to detect privilege escalation techniques and suspicious sudo activity.',
    category: LabCategory.FORENSICS,
    difficulty: Difficulty.HARD,
    points: 350,
    estimatedTime: 90,
    learningObjectives: [
      'Analyze Linux auditd logs',
      'Detect privilege escalation attempts',
      'Identify sudo abuse patterns',
      'Track suspicious command execution'
    ],
    prerequisites: ['Linux system administration', 'Auditd log analysis'],
    flag: 'tryhackswigger{privilege_escalation_detected}',
    hints: [
      { text: 'Look for sudo commands in audit logs', cost: 20 },
      { text: 'Check for execution of shell commands with elevated privileges', cost: 25 },
      { text: 'Identify unusual user account activity', cost: 30 }
    ],
    solution: 'Attacker used sudo to run bash shell, then added backdoor user and modified sudoers.',
    completedBy: 0,
    rating: 0,
    completions: 0,
    createdAt: '2024-03-30T10:00:00Z',
    dockerImage: 'tryhackswigger/privesc-linux:latest',
    terminalEnabled: false,
    ports: [80],
    type: LabTeamType.BLUE_TEAM,
    incidentScenario: 'A Linux server in your infrastructure has shown signs of suspicious activity. The system logs indicate potential privilege escalation attempts. You need to analyze the auditd logs to determine if an attacker has gained elevated privileges, identify what commands were executed with sudo, and assess whether any persistence mechanisms were established.',
    investigativeQuestions: [
      {
        id: 'q1',
        question: 'What command was executed with sudo to escalate privileges?',
        flag: 'sudo -i',
        hint: 'Look for sudo EXECVE events with shell commands'
      },
      {
        id: 'q2',
        question: 'What backdoor user account was created?',
        flag: 'hacker2',
        hint: 'Search for useradd or adduser commands in the audit logs'
      },
      {
        id: 'q3',
        question: 'Which configuration file was modified to maintain access?',
        flag: '/etc/sudoers',
        hint: 'Look for file modification events on sudo-related configuration files'
      },
      {
        id: 'q4',
        question: 'What was the original user account that was compromised?',
        flag: 'appuser',
        hint: 'Find the user account that initiated the sudo commands'
      }
    ]
  },
  {
    id: '20',
    slug: 'network-forensics-dns',
    title: 'Network Forensics: DNS C2 Traffic',
    description: 'Analyze PCAP data to identify DNS-based command and control (C2) communication.',
    category: LabCategory.FORENSICS,
    difficulty: Difficulty.INSANE,
    points: 500,
    estimatedTime: 150,
    learningObjectives: [
      'Analyze PCAP network captures',
      'Identify DNS tunneling techniques',
      'Detect C2 communication patterns',
      'Extract malware beacon intervals'
    ],
    prerequisites: ['Network protocols', 'PCAP analysis', 'DNS fundamentals'],
    flag: 'tryhackswigger{dns_c2_traffic_analyzed}',
    hints: [
      { text: 'Look for unusually long DNS query names', cost: 25 },
      { text: 'Check for high-frequency DNS requests to the same domain', cost: 30 },
      { text: 'Analyze the subdomain patterns for encoded data', cost: 35 }
    ],
    solution: 'Malware used DNS tunneling with base32-encoded subdomains, beaconing every 30 seconds.',
    completedBy: 0,
    rating: 0,
    completions: 0,
    createdAt: '2024-03-31T10:00:00Z',
    dockerImage: 'tryhackswigger/ssrf-basic:latest',
    terminalEnabled: false,
    ports: [80],
    type: LabTeamType.BLUE_TEAM,
    incidentScenario: 'Network monitoring has detected suspicious DNS traffic patterns from a workstation in your environment. The patterns suggest potential DNS tunneling used for command and control communication. You need to analyze the PCAP capture to identify the malicious domain, determine the beaconing interval, decode any data being exfiltrated via DNS, and characterize the C2 infrastructure.',
    investigativeQuestions: [
      {
        id: 'q1',
        question: 'What is the malicious domain used for C2 communication?',
        flag: 'evil-c2.example.com',
        hint: 'Look for the domain receiving the high-frequency DNS queries'
      },
      {
        id: 'q2',
        question: 'What encoding method is used in the DNS subdomains?',
        flag: 'base32',
        hint: 'Analyze the character set used in the subdomain names'
      },
      {
        id: 'q3',
        question: 'What is the beaconing interval in seconds?',
        flag: '30',
        hint: 'Calculate the time between consecutive DNS queries from the same source'
      },
      {
        id: 'q4',
        question: 'How many unique subdomains were queried in the capture?',
        flag: '247',
        hint: 'Count the distinct subdomain names in the DNS queries'
      }
    ]
  }
];

// Mock Learning Paths
export const mockLearningPaths: LearningPath[] = [
  {
    id: '1',
    slug: 'web-fundamentals',
    title: 'Web Security Fundamentals',
    description: 'Master the basics of web application security with hands-on labs covering common vulnerabilities.',
    difficulty: Difficulty.EASY,
    estimatedHours: 20,
    labs: ['1', '2', '6', '11'],
    progress: 75,
    enrolledCount: 1250,
    completedCount: 890,
    icon: '/icons/web-fundamentals.svg',
    tags: ['Beginner', 'Web', 'OWASP Top 10']
  },
  {
    id: '2',
    slug: 'advanced-web-exploitation',
    title: 'Advanced Web Exploitation',
    description: 'Take your web security skills to the next level with complex attack scenarios.',
    difficulty: Difficulty.HARD,
    estimatedHours: 40,
    labs: ['3', '5', '7', '9', '10'],
    progress: 40,
    enrolledCount: 680,
    completedCount: 234,
    icon: '/icons/advanced-web.svg',
    tags: ['Advanced', 'Web', 'Exploitation']
  },
  {
    id: '3',
    slug: 'api-security',
    title: 'API Security Mastery',
    description: 'Learn to secure and attack REST APIs, GraphQL endpoints, and microservices.',
    difficulty: Difficulty.MEDIUM,
    estimatedHours: 25,
    labs: ['3', '6', '10'],
    progress: 20,
    enrolledCount: 520,
    completedCount: 156,
    icon: '/icons/api-security.svg',
    tags: ['API', 'REST', 'GraphQL']
  },
  {
    id: '4',
    slug: 'osint-basics',
    title: 'OSINT Fundamentals',
    description: 'Master Open Source Intelligence gathering techniques and tools.',
    difficulty: Difficulty.EASY,
    estimatedHours: 15,
    labs: [],
    progress: 0,
    enrolledCount: 890,
    completedCount: 445,
    icon: '/icons/osint.svg',
    tags: ['OSINT', 'Reconnaissance', 'Intelligence']
  },
  {
    id: '5',
    slug: 'system-penetration',
    title: 'System Penetration Testing',
    description: 'Complete guide to penetration testing Linux and Windows systems.',
    difficulty: Difficulty.HARD,
    estimatedHours: 50,
    labs: ['8', '12'],
    progress: 10,
    enrolledCount: 340,
    completedCount: 89,
    icon: '/icons/system-pentest.svg',
    tags: ['System', 'Pentesting', 'Privilege Escalation']
  }
];

// Mock Badges
export const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'First Blood',
    description: 'Complete your first lab',
    icon: '/badges/first-blood.svg',
    rarity: BadgeRarity.COMMON,
    category: BadgeCategory.ACHIEVEMENT,
    unlocked: true,
    unlockedAt: '2023-01-15T10:30:00Z',
    requirement: 'Complete any lab'
  },
  {
    id: '2',
    name: 'Injection Master',
    description: 'Complete all SQL injection labs',
    icon: '/badges/injection-master.svg',
    rarity: BadgeRarity.EPIC,
    category: BadgeCategory.SKILL,
    unlocked: true,
    unlockedAt: '2023-02-20T14:15:00Z',
    requirement: 'Complete all SQL injection labs'
  },
  {
    id: '3',
    name: 'Streak 7',
    description: 'Maintain a 7-day learning streak',
    icon: '/badges/streak-7.svg',
    rarity: BadgeRarity.RARE,
    category: BadgeCategory.ACHIEVEMENT,
    unlocked: true,
    unlockedAt: '2023-01-22T09:00:00Z',
    requirement: '7-day streak'
  },
  {
    id: '4',
    name: 'Top 10 Global',
    description: 'Reach top 10 in global leaderboard',
    icon: '/badges/top-10.svg',
    rarity: BadgeRarity.LEGENDARY,
    category: BadgeCategory.COMPETITION,
    unlocked: false,
    requirement: 'Top 10 global rank'
  },
  {
    id: '5',
    name: 'CTF Champion',
    description: 'Win 5 CTF competitions',
    icon: '/badges/ctf-champion.svg',
    rarity: BadgeRarity.LEGENDARY,
    category: BadgeCategory.COMPETITION,
    unlocked: false,
    progress: 2,
    maxProgress: 5,
    requirement: 'Win 5 competitions'
  },
  {
    id: '6',
    name: 'XSS Expert',
    description: 'Complete all XSS labs',
    icon: '/badges/xss-expert.svg',
    rarity: BadgeRarity.RARE,
    category: BadgeCategory.SKILL,
    unlocked: true,
    unlockedAt: '2023-03-10T16:45:00Z',
    requirement: 'Complete all XSS labs'
  },
  {
    id: '7',
    name: 'Community Helper',
    description: 'Answer 50 forum questions',
    icon: '/badges/community-helper.svg',
    rarity: BadgeRarity.RARE,
    category: BadgeCategory.COMMUNITY,
    unlocked: false,
    progress: 23,
    maxProgress: 50,
    requirement: '50 helpful answers'
  },
  {
    id: '8',
    name: 'Speed Demon',
    description: 'Complete a lab in under 5 minutes',
    icon: '/badges/speed-demon.svg',
    rarity: BadgeRarity.EPIC,
    category: BadgeCategory.ACHIEVEMENT,
    unlocked: true,
    unlockedAt: '2023-04-05T11:20:00Z',
    requirement: 'Complete lab in <5 minutes'
  },
  {
    id: '9',
    name: 'Mythic Hacker',
    description: 'Reach level 100',
    icon: '/badges/mythic-hacker.svg',
    rarity: BadgeRarity.MYTHIC,
    category: BadgeCategory.SPECIAL,
    unlocked: false,
    progress: 42,
    maxProgress: 100,
    requirement: 'Reach level 100'
  },
  {
    id: '10',
    name: 'Early Adopter',
    description: 'Joined in the first month',
    icon: '/badges/early-adopter.svg',
    rarity: BadgeRarity.MYTHIC,
    category: BadgeCategory.SPECIAL,
    unlocked: true,
    unlockedAt: '2023-01-15T00:00:00Z',
    requirement: 'Join in first month'
  }
];

// Mock Leaderboard
export const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    user: {
      id: '101',
      username: 'zero_cool',
      displayName: 'Zero Cool',
      avatar: '/avatars/zero-cool.png',
      country: 'US',
      rank: 'Legendary Hacker'
    },
    points: 28450,
    badgesCount: 45,
    labsCompleted: 156,
    change: 0,
    trend: 'stable',
    level: 50,
    streak: 25,
    pointsGained: 120
  },
  {
    rank: 2,
    user: {
      id: '102',
      username: 'acid_burn',
      displayName: 'Acid Burn',
      avatar: '/avatars/acid-burn.png',
      country: 'UK',
      rank: 'Elite Hacker'
    },
    points: 26780,
    badgesCount: 42,
    labsCompleted: 148,
    change: 1,
    trend: 'up',
    level: 48,
    streak: 18,
    pointsGained: 450
  },
  {
    rank: 3,
    user: {
      id: '103',
      username: 'crash_override',
      displayName: 'Crash Override',
      avatar: '/avatars/crash-override.png',
      country: 'CA',
      rank: 'Master Exploiter'
    },
    points: 25120,
    badgesCount: 38,
    labsCompleted: 142,
    change: -1,
    trend: 'down',
    level: 45,
    streak: 12,
    pointsGained: 80
  },
  {
    rank: 4,
    user: {
      id: '104',
      username: 'lord_nikon',
      displayName: 'Lord Nikon',
      avatar: '/avatars/lord-nikon.png',
      country: 'DE',
      rank: 'Security Expert'
    },
    points: 23890,
    badgesCount: 35,
    labsCompleted: 135,
    change: 2,
    trend: 'up',
    level: 42,
    streak: 8,
    pointsGained: 320
  },
  {
    rank: 5,
    user: {
      id: '105',
      username: 'cereal_killer',
      displayName: 'Cereal Killer',
      avatar: '/avatars/cereal-killer.png',
      country: 'AU',
      rank: 'Penetration Tester'
    },
    points: 22340,
    badgesCount: 32,
    labsCompleted: 128,
    change: -2,
    trend: 'down',
    level: 40,
    streak: 5,
    pointsGained: 150
  },
  {
    rank: 6,
    user: {
      id: '106',
      username: 'the_plague',
      displayName: 'The Plague',
      avatar: '/avatars/the-plague.png',
      country: 'FR',
      rank: 'Security Expert'
    },
    points: 21560,
    badgesCount: 30,
    labsCompleted: 124,
    change: 0,
    trend: 'stable',
    level: 38,
    streak: 15,
    pointsGained: 200
  },
  {
    rank: 7,
    user: {
      id: '107',
      username: 'phantom_phreak',
      displayName: 'Phantom Phreak',
      avatar: '/avatars/phantom-phreak.png',
      country: 'JP',
      rank: 'System Administrator'
    },
    points: 20890,
    badgesCount: 28,
    labsCompleted: 119,
    change: 3,
    trend: 'up',
    level: 35,
    streak: 22,
    pointsGained: 580
  },
  {
    rank: 8,
    user: {
      id: '108',
      username: 'razor_blade',
      displayName: 'Razor Blade',
      avatar: '/avatars/razor-blade.png',
      country: 'BR',
      rank: 'Penetration Tester'
    },
    points: 19230,
    badgesCount: 26,
    labsCompleted: 112,
    change: -1,
    trend: 'down',
    level: 33,
    streak: 3,
    pointsGained: 90
  },
  {
    rank: 9,
    user: {
      id: '109',
      username: 'gadget_hackwrench',
      displayName: 'Gadget Hackwrench',
      avatar: '/avatars/gadget.png',
      country: 'IN',
      rank: 'Security Expert'
    },
    points: 18670,
    badgesCount: 24,
    labsCompleted: 108,
    change: 1,
    trend: 'up',
    level: 31,
    streak: 10,
    pointsGained: 410
  },
  {
    rank: 10,
    user: {
      id: '110',
      username: 'tamper_proof',
      displayName: 'Tamper Proof',
      avatar: '/avatars/tamper.png',
      country: 'MX',
      rank: 'System Administrator'
    },
    points: 17450,
    badgesCount: 22,
    labsCompleted: 102,
    change: -2,
    trend: 'down',
    level: 28,
    streak: 7,
    pointsGained: 65
  }
];

// Mock Races
export const mockRaces: Race[] = [
  {
    id: '1',
    title: 'Midnight CTF Sprint',
    description: 'Fast-paced CTF competition with 10 challenges. First to solve all wins!',
    type: RaceType.SPEED_CTF,
    status: RaceStatus.LIVE,
    startTime: '2024-05-08T22:00:00Z',
    endTime: '2024-05-09T00:00:00Z',
    maxParticipants: 100,
    currentParticipants: 87,
    prizePool: 1000,
    rules: [
      'No automated tools allowed',
      'First to solve each challenge gets bonus points',
      'Sharing solutions is prohibited',
      'Respect other participants'
    ],
    challenges: [
      {
        id: 'race1-1',
        title: 'Quick SQLi',
        description: 'Find and exploit SQL injection in login form',
        points: 100,
        flag: 'flag{race_sql_master}',
        firstBloodBonus: 50,
        solves: 45
      },
      {
        id: 'race1-2',
        title: 'XSS Blitz',
        description: 'Find XSS vulnerability in comment section',
        points: 150,
        flag: 'flag{race_xs_expert}',
        firstBloodBonus: 75,
        solves: 23
      }
    ],
    participants: [
      {
        userId: '1',
        username: 'cyber_ninja',
        avatar: '/avatars/ninja.png',
        joinTime: '2024-05-08T22:05:00Z',
        score: 250,
        solves: ['race1-1', 'race1-2'],
        lastSolveTime: '2024-05-08T23:15:00Z'
      }
    ]
  },
  {
    id: '2',
    title: 'King of the Hill: Web Security',
    description: 'Defend your position while attacking others. Last hacker standing wins!',
    type: RaceType.KING_OF_THE_HILL,
    status: RaceStatus.UPCOMING,
    startTime: '2026-12-31T20:00:00Z',
    endTime: '2026-12-31T23:00:00Z',
    maxParticipants: 50,
    currentParticipants: 12,
    prizePool: 2000,
    rules: [
      'Capture and hold flags',
      'Defend your own systems',
      'Attack other participants',
      'No DoS attacks'
    ],
    challenges: [
      {
        id: 'race2-1',
        title: 'SQLi 101',
        description: 'Find and exploit SQL injection in login form',
        points: 50,
        flag: 'flag{race2_sql_master}',
        firstBloodBonus: 25,
        solves: 8
      },
      {
        id: 'race2-2',
        title: 'XSS Filter Bypass',
        description: 'Bypass XSS filters to inject malicious script',
        points: 100,
        flag: 'flag{race2_xs_expert}',
        firstBloodBonus: 50,
        solves: 5
      },
      {
        id: 'race2-3',
        title: 'Privilege Escalation',
        description: 'Escalate privileges to root on Linux system',
        points: 150,
        flag: 'flag{race2_privesc_master}',
        firstBloodBonus: 75,
        solves: 3
      },
      {
        id: 'race2-4',
        title: 'SSRF Cloud Metadata',
        description: 'Exploit SSRF to access cloud metadata endpoints',
        points: 200,
        flag: 'flag{race2_ssrf_expert}',
        firstBloodBonus: 100,
        solves: 2
      }
    ],
    participants: [
      {
        userId: '1',
        username: 'CyberNinja',
        avatar: '/avatars/ninja.png',
        joinTime: '2026-12-20T10:00:00Z',
        score: 450,
        solves: ['race2-1', 'race2-2', 'race2-3'],
        lastSolveTime: '2026-12-25T15:30:00Z'
      },
      {
        userId: '2',
        username: 'zero_day',
        avatar: '/avatars/warrior.png',
        joinTime: '2026-12-21T11:00:00Z',
        score: 300,
        solves: ['race2-1', 'race2-2'],
        lastSolveTime: '2026-12-26T14:20:00Z'
      },
      {
        userId: '3',
        username: 'root_access',
        avatar: '/avatars/pixel.png',
        joinTime: '2026-12-22T12:00:00Z',
        score: 150,
        solves: ['race2-1'],
        lastSolveTime: '2026-12-27T16:45:00Z'
      },
      {
        userId: '4',
        username: 'byte_hunter',
        avatar: '/avatars/breaker.png',
        joinTime: '2026-12-23T13:00:00Z',
        score: 100,
        solves: [],
        lastSolveTime: '2026-12-28T10:00:00Z'
      }
    ]
  },
  {
    id: '3',
    title: 'Battle Royale: Forensics',
    description: 'Eliminate competitors by solving forensic challenges faster.',
    type: RaceType.BATTLE_ROYALE,
    status: RaceStatus.COMPLETED,
    startTime: '2024-05-07T19:00:00Z',
    endTime: '2024-05-07T21:00:00Z',
    maxParticipants: 75,
    currentParticipants: 75,
    prizePool: 1500,
    rules: [
      'Slowest solvers eliminated every 15 minutes',
      'Work fast to stay in the game',
      'Last participant wins'
    ],
    challenges: [],
    participants: []
  }
];

// Mock Forum Threads
export const mockForumThreads: ForumThread[] = [
  {
    id: '1',
    title: 'Help with SQL Injection Lab - Getting Stuck',
    content: 'I\'m working on the SQL Injection Fundamentals lab and I\'m stuck on step 3. I\'ve tried UNION SELECT but keep getting errors. Can someone help me understand what I\'m doing wrong?',
    author: {
      id: '201',
      username: 'learning_hacker',
      avatar: '/avatars/learning.png',
      rank: 'Beginner'
    },
    authorId: '201',
    category: 'help',
    tags: ['sql-injection', 'help', 'lab-1'],
    createdAt: '2024-05-08T10:30:00Z',
    updatedAt: '2024-05-08T10:30:00Z',
    views: 45,
    replies: [
      {
        id: '1-1',
        content: 'Make sure you\'re using the correct number of columns. Try using ORDER BY to determine the column count first.',
        author: {
          id: '202',
          username: 'expert_helper',
          avatar: '/avatars/expert.png',
          rank: 'Security Expert'
        },
        createdAt: '2024-05-08T11:15:00Z',
        updatedAt: '2024-05-08T11:15:00Z',
        likes: 12,
        isAnswer: true,
        replies: []
      }
    ],
    pinned: false,
    locked: false,
    solved: true
  },
  {
    id: '2',
    title: 'New CTF Competition This Weekend - Who\'s Joining?',
    content: 'Excited about upcoming CTF competition! Is anyone else planning to participate? Maybe we can form a team.',
    author: {
      id: '203',
      username: 'ctf_enthusiast',
      avatar: '/avatars/ctf.png',
      rank: 'CTF Player'
    },
    authorId: '203',
    category: 'general',
    tags: ['ctf', 'competition', 'team'],
    createdAt: '2024-05-08T09:00:00Z',
    updatedAt: '2024-05-08T09:00:00Z',
    views: 78,
    replies: [
      {
        id: '2-1',
        content: 'Count me in! I\'ve been practicing all week for this.',
        author: {
          id: '204',
          username: 'ready_player',
          avatar: '/avatars/ready.png',
          rank: 'Penetration Tester'
        },
        createdAt: '2024-05-08T09:30:00Z',
        updatedAt: '2024-05-08T09:30:00Z',
        likes: 8,
        isAnswer: false,
        replies: []
      },
      {
        id: '2-2',
        content: 'I\'d love to join a team! I\'m good at web challenges but need help with crypto.',
        author: {
          id: '205',
          username: 'crypto_noob',
          avatar: '/avatars/crypto.png',
          rank: 'Beginner'
        },
        createdAt: '2024-05-08T10:00:00Z',
        updatedAt: '2024-05-08T10:00:00Z',
        likes: 5,
        isAnswer: false,
        replies: []
      }
    ],
    pinned: false,
    locked: false,
    solved: false
  },
  {
    id: '3',
    title: 'Welcome to TryHackSwigger - Read This First!',
    content: 'Welcome to TryHackSwigger community! Please read our community guidelines and introduce yourself here. We\'re excited to have you join us on your cybersecurity learning journey!',
    author: {
      id: 'admin',
      username: 'tryhackswigger_admin',
      avatar: '/avatars/admin.png',
      rank: 'Administrator'
    },
    authorId: 'admin',
    category: 'announcements',
    tags: ['welcome', 'guidelines', 'introduction'],
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-05-01T12:00:00Z',
    views: 5420,
    replies: [
      {
        id: '3-1',
        content: 'Thanks for the warm welcome! Excited to start learning!',
        author: {
          id: '206',
          username: 'newbie_123',
          avatar: '/avatars/newbie.png',
          rank: 'Beginner'
        },
        createdAt: '2024-05-07T15:30:00Z',
        updatedAt: '2024-05-07T15:30:00Z',
        likes: 3,
        isAnswer: false,
        replies: []
      }
    ],
    pinned: true,
    locked: false,
    solved: false
  }
];

// Mock Activities
export const mockActivities: Activity[] = [
  {
    id: '1',
    type: ActivityType.LAB_COMPLETED,
    user: {
      id: '1',
      username: 'cyber_ninja',
      avatar: '/avatars/ninja.png'
    },
    target: {
      type: 'lab',
      id: '1',
      name: 'SQL Injection Fundamentals'
    },
    data: {
      points: 100,
      time: '45 minutes',
      difficulty: 'Easy'
    },
    timestamp: '2024-05-08T14:30:00Z'
  },
  {
    id: '2',
    type: ActivityType.BADGE_EARNED,
    user: {
      id: '2',
      username: 'byte_warrior',
      avatar: '/avatars/warrior.png'
    },
    target: {
      type: 'badge',
      id: '2',
      name: 'Injection Master'
    },
    data: {
      rarity: 'Epic',
      category: 'Skill'
    },
    timestamp: '2024-05-08T13:15:00Z'
  },
  {
    id: '3',
    type: ActivityType.LEVEL_UP,
    user: {
      id: '3',
      username: 'pixel_hacker',
      avatar: '/avatars/pixel.png'
    },
    data: {
      newLevel: 31,
      totalPoints: 8900
    },
    timestamp: '2024-05-08T12:00:00Z'
  },
  {
    id: '4',
    type: ActivityType.STREAK_ACHIEVED,
    user: {
      id: '4',
      username: 'code_breaker',
      avatar: '/avatars/breaker.png'
    },
    data: {
      streakDays: 21,
      bonusPoints: 210
    },
    timestamp: '2024-05-08T11:45:00Z'
  },
  {
    id: '5',
    type: ActivityType.RACE_JOINED,
    user: {
      id: '5',
      username: 'root_admin',
      avatar: '/avatars/admin.png'
    },
    target: {
      type: 'race',
      id: '1',
      name: 'Midnight CTF Sprint'
    },
    data: {
      prizePool: 1000,
      participants: 87
    },
    timestamp: '2024-05-08T22:05:00Z'
  }
];

// Current user (for demo purposes)
export const currentUser: User = mockUsers[0];

// Mock user settings
export const mockUserSettings = {
  profile: {
    displayName: 'Cyber Ninja',
    bio: 'Passionate about cybersecurity and ethical hacking. Always learning, always growing.',
    avatar: '/avatars/ninja.png',
    country: 'US',
    timezone: 'UTC-5',
    language: 'en'
  },
  security: {
    twoFactorEnabled: true,
    emailNotifications: true,
    sessionTimeout: 3600,
    activeSessions: [
      {
        id: 'session1',
        device: 'Windows PC',
        browser: 'Chrome 124',
        ip: '192.168.1.100',
        location: 'New York, US',
        createdAt: '2024-05-08T10:00:00Z',
        lastActive: '2024-05-08T14:30:00Z',
        current: true
      },
      {
        id: 'session2',
        device: 'iPhone 14',
        browser: 'Safari 17',
        ip: '192.168.1.101',
        location: 'New York, US',
        createdAt: '2024-05-07T18:00:00Z',
        lastActive: '2024-05-08T09:15:00Z',
        current: false
      }
    ]
  },
  vpn: {
    enabled: true,
    config: '# OpenVPN config would be here',
    status: VpnStatus.CONNECTED,
    lastConnected: '2024-05-08T14:00:00Z'
  },
  billing: {
    plan: SubscriptionPlan.VIP,
    status: SubscriptionStatus.ACTIVE,
    currentPeriodStart: '2024-05-01T00:00:00Z',
    currentPeriodEnd: '2024-06-01T00:00:00Z',
    cancelAtPeriodEnd: false
  },
  preferences: {
    theme: 'dark' as const,
    notifications: {
      email: true,
      push: true,
      labCompleted: true,
      badgeEarned: true,
      raceStarting: true,
      friendActivity: false,
      forumReplies: true
    },
    privacy: {
      profilePublic: true,
      showCountry: true,
      showStats: true,
      showActivity: true,
      allowFriendRequests: true
    }
  }
};
