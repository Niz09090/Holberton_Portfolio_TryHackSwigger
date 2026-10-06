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
  BlueModule,
  BlueLabCategory,
  LabType
} from './types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'cyber_ninja',
    displayName: 'Cyber Ninja',
    email: 'ninja@hackforge.io',
    avatar: '/avatars/ninja.png',
    rank: 'Elite Hacker',
    points: 15420,
    redPoints: 9200,
    bluePoints: 6220,
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
    },
    completedRedLabs: ['1', '2', '3', '6'],
    completedBlueLabs: ['bl1', 'bl2']
  },
  {
    id: '2',
    username: 'byte_warrior',
    displayName: 'Byte Warrior',
    email: 'warrior@hackforge.io',
    avatar: '/avatars/warrior.png',
    rank: 'Master Exploiter',
    points: 12350,
    redPoints: 8500,
    bluePoints: 3850,
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
    },
    completedRedLabs: ['1', '2', '6'],
    completedBlueLabs: ['bl1']
  },
  {
    id: '3',
    username: 'pixel_hacker',
    displayName: 'Pixel Hacker',
    email: 'pixel@hackforge.io',
    avatar: '/avatars/pixel.png',
    rank: 'Security Expert',
    points: 8900,
    redPoints: 6500,
    bluePoints: 2400,
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
    isVip: false,
    completedRedLabs: ['1', '6'],
    completedBlueLabs: ['bl1']
  },
  {
    id: '4',
    username: 'code_breaker',
    displayName: 'Code Breaker',
    email: 'breaker@hackforge.io',
    avatar: '/avatars/breaker.png',
    rank: 'Penetration Tester',
    points: 6750,
    redPoints: 5200,
    bluePoints: 1550,
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
    },
    completedRedLabs: ['1'],
    completedBlueLabs: []
  },
  {
    id: '5',
    username: 'root_admin',
    displayName: 'Root Admin',
    email: 'admin@hackforge.io',
    avatar: '/avatars/admin.png',
    rank: 'System Administrator',
    points: 5200,
    redPoints: 3800,
    bluePoints: 1400,
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
    isVip: false,
    completedRedLabs: ['1'],
    completedBlueLabs: []
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
    flag: 'hackforge{sqli_1_union_select_rocks}',
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
    dockerImage: 'hackforge/sqli-basic:latest',
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
    flag: 'hackforge{xss_alert_executed}',
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
    dockerImage: 'hackforge/xss-reflected:latest',
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
    flag: 'hackforge{csrf_token_bypass}',
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
    dockerImage: 'hackforge/csrf-bypass:latest',
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
    flag: 'hackforge{ssrf_metadata_accessed}',
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
    dockerImage: 'hackforge/ssrf-basic:latest',
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
    flag: 'hackforge{xxe_file_read}',
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
    dockerImage: 'hackforge/xxe-injection:latest',
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
    flag: 'hackforge{idor_user_escalation}',
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
    dockerImage: 'hackforge/idor-basic:latest',
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
    flag: 'hackforge{jwt_none_algorithm}',
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
    dockerImage: 'hackforge/jwt-bypass:latest',
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
    flag: 'hackforge{privesc_linux_root_flag}',
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
    dockerImage: 'hackforge/privesc-linux:latest',
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
    flag: 'hackforge{file_upload_webshell}',
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
    dockerImage: 'hackforge/file-upload:latest',
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
    flag: 'hackforge{cmd_injection_rce}',
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
    dockerImage: 'hackforge/cmd-injection:latest',
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
    flag: 'hackforge{lfi_etc_passwd}',
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
    dockerImage: 'hackforge/lfi-basic:latest',
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
    flag: 'hackforge{bof_exploit_success}',
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
    dockerImage: 'hackforge/bof-basic:latest',
    terminalEnabled: true,
    ports: [7681]
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
      avatar: '/avatars/zero-cool.png',
      country: 'US',
      rank: 'Legendary Hacker'
    },
    points: 28450,
    redPoints: 16200,
    bluePoints: 12250,
    badgesCount: 45,
    labsCompleted: 156,
    redLabsCompleted: 98,
    blueLabsCompleted: 58,
    change: 0
  },
  {
    rank: 2,
    user: {
      id: '102',
      username: 'acid_burn',
      avatar: '/avatars/acid-burn.png',
      country: 'UK',
      rank: 'Elite Hacker'
    },
    points: 26780,
    redPoints: 15800,
    bluePoints: 10980,
    badgesCount: 42,
    labsCompleted: 148,
    redLabsCompleted: 92,
    blueLabsCompleted: 56,
    change: 1
  },
  {
    rank: 3,
    user: {
      id: '103',
      username: 'crash_override',
      avatar: '/avatars/crash-override.png',
      country: 'CA',
      rank: 'Master Exploiter'
    },
    points: 25120,
    redPoints: 14500,
    bluePoints: 10620,
    badgesCount: 38,
    labsCompleted: 142,
    redLabsCompleted: 88,
    blueLabsCompleted: 54,
    change: -1
  },
  {
    rank: 4,
    user: {
      id: '104',
      username: 'lord_nikon',
      avatar: '/avatars/lord-nikon.png',
      country: 'DE',
      rank: 'Security Expert'
    },
    points: 23890,
    redPoints: 13900,
    bluePoints: 9990,
    badgesCount: 35,
    labsCompleted: 135,
    redLabsCompleted: 85,
    blueLabsCompleted: 50,
    change: 2
  },
  {
    rank: 5,
    user: {
      id: '105',
      username: 'cereal_killer',
      avatar: '/avatars/cereal-killer.png',
      country: 'AU',
      rank: 'Penetration Tester'
    },
    points: 22340,
    redPoints: 13100,
    bluePoints: 9240,
    badgesCount: 32,
    labsCompleted: 128,
    redLabsCompleted: 80,
    blueLabsCompleted: 48,
    change: -2
  },
  {
    rank: 6,
    user: {
      id: '106',
      username: 'the_plague',
      avatar: '/avatars/the-plague.png',
      country: 'FR',
      rank: 'Security Expert'
    },
    points: 21560,
    redPoints: 12400,
    bluePoints: 9160,
    badgesCount: 30,
    labsCompleted: 124,
    redLabsCompleted: 76,
    blueLabsCompleted: 48,
    change: 0
  },
  {
    rank: 7,
    user: {
      id: '107',
      username: 'phantom_phreak',
      avatar: '/avatars/phantom-phreak.png',
      country: 'JP',
      rank: 'System Administrator'
    },
    points: 20890,
    redPoints: 11800,
    bluePoints: 9090,
    badgesCount: 28,
    labsCompleted: 119,
    redLabsCompleted: 72,
    blueLabsCompleted: 47,
    change: 3
  },
  {
    rank: 8,
    user: {
      id: '108',
      username: 'razor_blade',
      avatar: '/avatars/razor-blade.png',
      country: 'BR',
      rank: 'Penetration Tester'
    },
    points: 19230,
    redPoints: 11200,
    bluePoints: 8030,
    badgesCount: 26,
    labsCompleted: 112,
    redLabsCompleted: 68,
    blueLabsCompleted: 44,
    change: -1
  },
  {
    rank: 9,
    user: {
      id: '109',
      username: 'gadget_hackwrench',
      avatar: '/avatars/gadget.png',
      country: 'IN',
      rank: 'Security Expert'
    },
    points: 18670,
    redPoints: 10800,
    bluePoints: 7870,
    badgesCount: 24,
    labsCompleted: 108,
    redLabsCompleted: 65,
    blueLabsCompleted: 43,
    change: 1
  },
  {
    rank: 10,
    user: {
      id: '110',
      username: 'tamper_proof',
      avatar: '/avatars/tamper.png',
      country: 'MX',
      rank: 'System Administrator'
    },
    points: 17450,
    redPoints: 9900,
    bluePoints: 7550,
    badgesCount: 22,
    labsCompleted: 102,
    redLabsCompleted: 60,
    blueLabsCompleted: 42,
    change: -2
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
    startTime: '2024-05-10T20:00:00Z',
    endTime: '2024-05-10T23:00:00Z',
    maxParticipants: 50,
    currentParticipants: 12,
    prizePool: 2000,
    rules: [
      'Capture and hold flags',
      'Defend your own systems',
      'Attack other participants',
      'No DoS attacks'
    ],
    challenges: [],
    participants: []
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
    title: 'Welcome to HackForge - Read This First!',
    content: 'Welcome to HackForge community! Please read our community guidelines and introduce yourself here. We\'re excited to have you join us on your cybersecurity learning journey!',
    author: {
      id: 'admin',
      username: 'hackforge_admin',
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

// Mock Blue Team Labs
export const mockBlueLabs: BlueLab[] = [
  // Log Analysis / SIEM Labs
  {
    id: 'bl1',
    slug: 'splunk-query-basics',
    title: 'Splunk Query Fundamentals',
    description: 'Learn the basics of Splunk SPL (Search Processing Language) to analyze security logs and detect suspicious activities.',
    category: BlueLabCategory.LOG_ANALYSIS,
    difficulty: Difficulty.EASY,
    points: 75,
    estimatedTime: 45,
    labType: LabType.GUIDED,
    learningObjectives: [
      'Understand Splunk SPL syntax',
      'Write basic search queries',
      'Filter and transform log data',
      'Create simple visualizations'
    ],
    prerequisites: ['Basic Linux command line'],
    tools: ['Splunk Enterprise', 'SSH Client'],
    flag: 'blue{splunk_spl_master}',
    hints: [
      { text: 'Start with basic search commands like "index=main"', cost: 8 },
      { text: 'Use | stats count by to aggregate data', cost: 8 },
      { text: 'Try filtering with where clause for specific conditions', cost: 7 }
    ],
    solution: 'Use index=main | stats count by source_ip to identify top source IPs, then filter for suspicious patterns.',
    completedBy: 156,
    rating: 4.3,
    completions: 156,
    createdAt: '2024-03-20T10:00:00Z',
    dockerImage: 'hackforge/splunk-basic:latest',
    terminalEnabled: true,
    ports: [8000, 8089]
  },
  {
    id: 'bl2',
    slug: 'suspicious-login-detection',
    title: 'Suspicious Login Detection',
    description: 'Detect and analyze suspicious login patterns in authentication logs to identify potential brute force attacks.',
    category: BlueLabCategory.LOG_ANALYSIS,
    difficulty: Difficulty.MEDIUM,
    points: 100,
    estimatedTime: 60,
    labType: LabType.SCENARIO,
    learningObjectives: [
      'Analyze authentication logs',
      'Identify brute force patterns',
      'Detect login anomalies',
      'Create detection rules'
    ],
    prerequisites: ['Splunk Query Fundamentals'],
    tools: ['Splunk Enterprise', 'Log Files'],
    flag: 'blue{brute_force_detected}',
    hints: [
      { text: 'Look for multiple failed login attempts from same IP', cost: 10 },
      { text: 'Check for successful logins after many failures', cost: 10 },
      { text: 'Use timechart to visualize login patterns over time', cost: 10 }
    ],
    solution: 'Search for failed logins grouped by IP, identify IPs with >10 failures, then check for successful logins from those IPs.',
    completedBy: 98,
    rating: 4.5,
    completions: 98,
    createdAt: '2024-03-25T10:00:00Z',
    dockerImage: 'hackforge/log-analysis:latest',
    terminalEnabled: true,
    ports: [8000]
  },
  {
    id: 'bl3',
    slug: 'web-access-log-triage',
    title: 'Web Access Log Triage',
    description: 'Perform triage on Apache access logs to identify web attacks including SQL injection, XSS, and directory traversal.',
    category: BlueLabCategory.LOG_ANALYSIS,
    difficulty: Difficulty.MEDIUM,
    points: 100,
    estimatedTime: 75,
    labType: LabType.SCENARIO,
    learningObjectives: [
      'Parse Apache access logs',
      'Identify SQL injection patterns',
      'Detect XSS attack attempts',
      'Find directory traversal attempts'
    ],
    prerequisites: ['Regular Expressions', 'HTTP Basics'],
    tools: ['Apache Logs', 'grep/awk', 'Splunk'],
    flag: 'blue{web_attack_triaged}',
    hints: [
      { text: 'Look for SQL keywords in URL parameters', cost: 10 },
      { text: 'Search for script tags and common XSS patterns', cost: 10 },
      { text: 'Check for ../ patterns indicating path traversal', cost: 10 }
    ],
    solution: 'Use regex to search for SQLi patterns (UNION, OR 1=1), XSS (<script>), and path traversal (../) in access logs.',
    completedBy: 87,
    rating: 4.6,
    completions: 87,
    createdAt: '2024-03-30T10:00:00Z',
    dockerImage: 'hackforge/web-logs:latest',
    terminalEnabled: true,
    ports: [8000],
    pairedRedLabId: '1' // Paired with SQL Injection Fundamentals
  },
  // Incident Response Labs
  {
    id: 'bl4',
    slug: 'nist-ir-lifecycle',
    title: 'NIST Incident Response Lifecycle',
    description: 'Learn and apply the NIST Incident Response lifecycle (Preparation, Detection/Analysis, Containment, Eradication, Recovery).',
    category: BlueLabCategory.INCIDENT_RESPONSE,
    difficulty: Difficulty.EASY,
    points: 50,
    estimatedTime: 30,
    labType: LabType.GUIDED,
    learningObjectives: [
      'Understand NIST IR phases',
      'Document incident response procedures',
      'Create incident response playbooks',
      'Practice IR communication'
    ],
    prerequisites: [],
    tools: ['Documentation Tools', 'IR Templates'],
    flag: 'blue{nist_lifecycle_complete}',
    hints: [
      { text: 'Review the 4 main phases of NIST IR', cost: 5 },
      { text: 'Focus on the Preparation phase first', cost: 5 },
      { text: 'Documentation is key in every phase', cost: 5 }
    ],
    solution: 'Complete the documentation for all NIST IR phases with proper procedures and communication plans.',
    completedBy: 234,
    rating: 4.2,
    completions: 234,
    createdAt: '2024-04-01T10:00:00Z',
    dockerImage: undefined,
    terminalEnabled: false,
    ports: []
  },
  {
    id: 'bl5',
    slug: 'ransomware-scenario',
    title: 'Ransomware Incident Response',
    description: 'Respond to a simulated ransomware attack following incident response best practices.',
    category: BlueLabCategory.INCIDENT_RESPONSE,
    difficulty: Difficulty.HARD,
    points: 125,
    estimatedTime: 120,
    labType: LabType.SCENARIO,
    learningObjectives: [
      'Identify ransomware indicators',
      'Contain the infection',
      'Preserve evidence for forensics',
      'Document the incident response'
    ],
    prerequisites: ['NIST IR Lifecycle', 'Windows Administration'],
    tools: ['Windows Server', 'Forensics Tools', 'IR Documentation'],
    flag: 'blue{ransomware_contained}',
    hints: [
      { text: 'Isolate affected systems immediately', cost: 12 },
      { text: 'Look for encryption processes and file changes', cost: 13 },
      { text: 'Preserve memory and disk images before cleanup', cost: 12 }
    ],
    solution: 'Isolate infected host, preserve RAM and disk images, identify ransomware strain, document all actions taken.',
    completedBy: 45,
    rating: 4.8,
    completions: 45,
    createdAt: '2024-04-05T10:00:00Z',
    dockerImage: 'hackforge/ransomware-ir:latest',
    terminalEnabled: true,
    ports: [3389]
  },
  // Digital Forensics Labs
  {
    id: 'bl6',
    slug: 'disk-image-autopsy',
    title: 'Disk Image Analysis with Autopsy',
    description: 'Analyze a disk image using Autopsy to recover deleted files and extract evidence.',
    category: BlueLabCategory.DIGITAL_FORENSICS,
    difficulty: Difficulty.MEDIUM,
    points: 100,
    estimatedTime: 90,
    labType: LabType.GUIDED,
    learningObjectives: [
      'Create and analyze disk images',
      'Recover deleted files',
      'Extract metadata',
      'Identify file system artifacts'
    ],
    prerequisites: ['Basic Forensics Concepts'],
    tools: ['Autopsy', 'Disk Image'],
    flag: 'blue{autopsy_evidence_found}',
    hints: [
      { text: 'Use Autopsy to ingest the disk image', cost: 10 },
      { text: 'Check the deleted files section', cost: 10 },
      { text: 'Look for file metadata and timeline data', cost: 10 }
    ],
    solution: 'Ingest disk image in Autopsy, navigate to deleted files, recover the flag.txt file from unallocated space.',
    completedBy: 112,
    rating: 4.4,
    completions: 112,
    createdAt: '2024-04-10T10:00:00Z',
    dockerImage: 'hackforge/autopsy-forensics:latest',
    terminalEnabled: true,
    ports: [8000]
  },
  {
    id: 'bl7',
    slug: 'memory-forensics-volatility',
    title: 'Memory Forensics with Volatility',
    description: 'Analyze a memory dump using Volatility to find running processes, network connections, and injected code.',
    category: BlueLabCategory.DIGITAL_FORENSICS,
    difficulty: Difficulty.HARD,
    points: 125,
    estimatedTime: 120,
    labType: LabType.SCENARIO,
    learningObjectives: [
      'Analyze memory dumps with Volatility',
      'Identify suspicious processes',
      'Detect process injection',
      'Extract malware from memory'
    ],
    prerequisites: ['Windows Internals', 'Python'],
    tools: ['Volatility', 'Memory Dump'],
    flag: 'blue{memory_malware_found}',
    hints: [
      { text: 'Start with imageinfo to determine profile', cost: 12 },
      { text: 'Use pslist to see running processes', cost: 13 },
      { text: 'Check for hidden processes with psscan', cost: 12 }
    ],
    solution: 'Use Volatility to analyze memory dump, identify suspicious process, extract injected code to find flag.',
    completedBy: 67,
    rating: 4.7,
    completions: 67,
    createdAt: '2024-04-15T10:00:00Z',
    dockerImage: 'hackforge/volatility-forensics:latest',
    terminalEnabled: true,
    ports: []
  },
  {
    id: 'bl8',
    slug: 'pcap-analysis-wireshark',
    title: 'PCAP Analysis with Wireshark',
    description: 'Analyze a network capture file to identify malicious traffic, extract files, and find the flag.',
    category: BlueLabCategory.DIGITAL_FORENSICS,
    difficulty: Difficulty.MEDIUM,
    points: 100,
    estimatedTime: 75,
    labType: LabType.SCENARIO,
    learningObjectives: [
      'Analyze PCAP files in Wireshark',
      'Filter network traffic',
      'Extract files from streams',
      'Identify malicious protocols'
    ],
    prerequisites: ['Networking Basics', 'TCP/IP'],
    tools: ['Wireshark', 'PCAP File'],
    flag: 'blue{pcap_flag_extracted}',
    hints: [
      { text: 'Use display filters to narrow down traffic', cost: 10 },
      { text: 'Look for HTTP POST requests with file uploads', cost: 10 },
      { text: 'Follow TCP streams to reconstruct data', cost: 10 }
    ],
    solution: 'Filter for HTTP traffic, follow suspicious stream, extract uploaded file containing the flag.',
    completedBy: 134,
    rating: 4.5,
    completions: 134,
    createdAt: '2024-04-20T10:00:00Z',
    dockerImage: 'hackforge/pcap-analysis:latest',
    terminalEnabled: true,
    ports: []
  },
  // Threat Hunting Labs
  {
    id: 'bl9',
    slug: 'mitre-attack-mapping',
    title: 'MITRE ATT&CK Mapping',
    description: 'Map observed attack techniques to MITRE ATT&CK framework to understand adversary behavior.',
    category: BlueLabCategory.THREAT_HUNTING,
    difficulty: Difficulty.EASY,
    points: 50,
    estimatedTime: 45,
    labType: LabType.GUIDED,
    learningObjectives: [
      'Understand MITRE ATT&CK framework',
      'Map techniques to T-IDs',
      'Identify attack patterns',
      'Create threat hunting hypotheses'
    ],
    prerequisites: [],
    tools: ['MITRE ATT&CK Navigator', 'Log Data'],
    flag: 'blue{attack_mapped}',
    hints: [
      { text: 'Review the MITRE ATT&CK matrix', cost: 5 },
      { text: 'Match observed behaviors to techniques', cost: 5 },
      { text: 'Use ATT&CK Navigator for visualization', cost: 5 }
    ],
    solution: 'Map the provided log events to appropriate MITRE ATT&CK techniques and T-IDs.',
    completedBy: 189,
    rating: 4.3,
    completions: 189,
    createdAt: '2024-04-25T10:00:00Z',
    dockerImage: undefined,
    terminalEnabled: false,
    ports: []
  },
  {
    id: 'bl10',
    slug: 'lateral-movement-hunting',
    title: 'Lateral Movement Hunting',
    description: 'Hunt for lateral movement techniques in Windows event logs to detect attacker propagation.',
    category: BlueLabCategory.THREAT_HUNTING,
    difficulty: Difficulty.HARD,
    points: 125,
    estimatedTime: 120,
    labType: LabType.SCENARIO,
    learningObjectives: [
      'Identify lateral movement indicators',
      'Analyze Windows event logs',
      'Detect remote service execution',
      'Find pass-the-hash attempts'
    ],
    prerequisites: ['Windows Event Logs', 'MITRE ATT&CK'],
    tools: ['Windows Event Viewer', 'PowerShell', 'Splunk'],
    flag: 'blue{lateral_movement_detected}',
    hints: [
      { text: 'Look for event ID 4624 with logon type 3', cost: 12 },
      { text: 'Check for scheduled task creation (event 4698)', cost: 13 },
      { text: 'Search for remote service execution events', cost: 12 }
    ],
    solution: 'Query Windows security logs for unusual authentication patterns, remote service execution, and scheduled tasks.',
    completedBy: 56,
    rating: 4.6,
    completions: 56,
    createdAt: '2024-04-30T10:00:00Z',
    dockerImage: 'hackforge/threat-hunt:latest',
    terminalEnabled: true,
    ports: []
  },
  // Network Defense / SOC Labs
  {
    id: 'bl11',
    slug: 'snort-rule-writing',
    title: 'Snort Rule Writing',
    description: 'Write custom Snort IDS rules to detect specific attack patterns in network traffic.',
    category: BlueLabCategory.NETWORK_DEFENSE,
    difficulty: Difficulty.MEDIUM,
    points: 100,
    estimatedTime: 75,
    labType: LabType.GUIDED,
    learningObjectives: [
      'Understand Snort rule syntax',
      'Write detection rules',
      'Test rule effectiveness',
      'Tune rule performance'
    ],
    prerequisites: ['TCP/IP', 'Regular Expressions'],
    tools: ['Snort', 'PCAP Files'],
    flag: 'blue{snort_rule_written}',
    hints: [
      { text: 'Snort rules have action, protocol, source, destination, and options', cost: 10 },
      { text: 'Use content matches to detect specific patterns', cost: 10 },
      { text: 'Test your rule against the provided PCAP', cost: 10 }
    ],
    solution: 'Write a Snort rule to detect the specific attack pattern in the provided PCAP file.',
    completedBy: 98,
    rating: 4.4,
    completions: 98,
    createdAt: '2024-05-01T10:00:00Z',
    dockerImage: 'hackforge/snort-ids:latest',
    terminalEnabled: true,
    ports: []
  },
  {
    id: 'bl12',
    slug: 'soc-alert-triage',
    title: 'SOC Alert Triage',
    description: 'Triage and prioritize SOC alerts from various security tools to identify real threats.',
    category: BlueLabCategory.NETWORK_DEFENSE,
    difficulty: Difficulty.MEDIUM,
    points: 100,
    estimatedTime: 90,
    labType: LabType.SCENARIO,
    learningObjectives: [
      'Analyze security alerts',
      'Prioritize by severity',
      'Correlate multiple alerts',
      'Determine false positives'
    ],
    prerequisites: ['Security Tools Basics'],
    tools: ['SIEM Console', 'Alert Data'],
    flag: 'blue{alert_triaged}',
    hints: [
      { text: 'Review alert severity and confidence scores', cost: 10 },
      { text: 'Correlate alerts from different sources', cost: 10 },
      { text: 'Check for context around the alert', cost: 10 }
    ],
    solution: 'Review all alerts, prioritize by risk, identify the real threat among false positives.',
    completedBy: 87,
    rating: 4.5,
    completions: 87,
    createdAt: '2024-05-05T10:00:00Z',
    dockerImage: 'hackforge/soc-triage:latest',
    terminalEnabled: true,
    ports: [8000]
  },
  {
    id: 'bl13',
    slug: 'firewall-hardening',
    title: 'Firewall Hardening',
    description: 'Harden a firewall configuration to block unauthorized access while allowing legitimate traffic.',
    category: BlueLabCategory.NETWORK_DEFENSE,
    difficulty: Difficulty.EASY,
    points: 75,
    estimatedTime: 60,
    labType: LabType.GUIDED,
    learningObjectives: [
      'Understand firewall rules',
      'Implement deny-by-default',
      'Configure proper logging',
      'Test firewall effectiveness'
    ],
    prerequisites: ['Networking Basics'],
    tools: ['iptables', 'firewalld', 'nmap'],
    flag: 'blue{firewall_hardened}',
    hints: [
      { text: 'Start with a deny-all default policy', cost: 8 },
      { text: 'Only allow necessary services', cost: 7 },
      { text: 'Enable logging for dropped packets', cost: 7 }
    ],
    solution: 'Configure firewall with deny-all default, allow only SSH and HTTP, enable logging.',
    completedBy: 145,
    rating: 4.2,
    completions: 145,
    createdAt: '2024-05-10T10:00:00Z',
    dockerImage: 'hackforge/firewall-lab:latest',
    terminalEnabled: true,
    ports: [22, 80]
  },
  // Malware Analysis Labs
  {
    id: 'bl14',
    slug: 'static-malware-analysis',
    title: 'Static Malware Analysis',
    description: 'Perform static analysis on a malware sample to understand its functionality without execution.',
    category: BlueLabCategory.MALWARE_ANALYSIS,
    difficulty: Difficulty.MEDIUM,
    points: 100,
    estimatedTime: 90,
    labType: LabType.GUIDED,
    learningObjectives: [
      'Extract file metadata',
      'Analyze PE file structure',
      'Identify imported functions',
      'Extract strings and indicators'
    ],
    prerequisites: ['Windows Internals', 'Assembly Basics'],
    tools: ['PE Studio', 'Strings', 'Dependency Walker'],
    flag: 'blue{static_analysis_complete}',
    hints: [
      { text: 'Use PE Studio to analyze the file structure', cost: 10 },
      { text: 'Check the import table for suspicious APIs', cost: 10 },
      { text: 'Extract strings to find URLs and IPs', cost: 10 }
    ],
    solution: 'Analyze the PE file, identify suspicious imports, extract strings and URLs to understand malware behavior.',
    completedBy: 78,
    rating: 4.5,
    completions: 78,
    createdAt: '2024-05-15T10:00:00Z',
    dockerImage: 'hackforge/malware-static:latest',
    terminalEnabled: true,
    ports: []
  },
  {
    id: 'bl15',
    slug: 'dynamic-sandbox-analysis',
    title: 'Dynamic Sandbox Analysis',
    description: 'Execute malware in a controlled sandbox environment to observe its runtime behavior.',
    category: BlueLabCategory.MALWARE_ANALYSIS,
    difficulty: Difficulty.HARD,
    points: 125,
    estimatedTime: 120,
    labType: LabType.SCENARIO,
    learningObjectives: [
      'Set up analysis sandbox',
      'Monitor file system changes',
      'Track network connections',
      'Analyze process behavior'
    ],
    prerequisites: ['Static Malware Analysis', 'Virtualization'],
    tools: ['Cuckoo Sandbox', 'Procmon', 'Wireshark'],
    flag: 'blue{dynamic_analysis_complete}',
    hints: [
      { text: 'Monitor file system, registry, and network activity', cost: 12 },
      { text: 'Use Procmon to track process behavior', cost: 13 },
      { text: 'Capture network traffic with Wireshark', cost: 12 }
    ],
    solution: 'Run malware in Cuckoo sandbox, analyze the report for file system changes, network connections, and process behavior.',
    completedBy: 45,
    rating: 4.7,
    completions: 45,
    createdAt: '2024-05-20T10:00:00Z',
    dockerImage: 'hackforge/malware-dynamic:latest',
    terminalEnabled: true,
    ports: []
  },
  {
    id: 'bl16',
    slug: 'powershell-deobfuscation',
    title: 'PowerShell Deobfuscation',
    description: 'Deobfuscate malicious PowerShell scripts to understand their true intent.',
    category: BlueLabCategory.MALWARE_ANALYSIS,
    difficulty: Difficulty.MEDIUM,
    points: 100,
    estimatedTime: 75,
    labType: LabType.SCENARIO,
    learningObjectives: [
      'Identify obfuscation techniques',
      'Decode Base64 encoded content',
      'Unwrap string concatenation',
      'Reconstruct the original script'
    ],
    prerequisites: ['PowerShell', 'Encoding Basics'],
    tools: ['PowerShell', 'Decode Tools', 'Text Editor'],
    flag: 'blue{powershell_deobfuscated}',
    hints: [
      { text: 'Look for Base64 encoded strings', cost: 10 },
      { text: 'Check for string concatenation and variable substitution', cost: 10 },
      { text: 'Use PowerShell IEX to decode step by step', cost: 10 }
    ],
    solution: 'Decode the Base64 strings, unwrap the obfuscation layers to reveal the malicious PowerShell command.',
    completedBy: 92,
    rating: 4.4,
    completions: 92,
    createdAt: '2024-05-25T10:00:00Z',
    dockerImage: undefined,
    terminalEnabled: false,
    ports: []
  }
];

// Mock Blue Team Modules
export const mockBlueModules: BlueModule[] = [
  {
    id: 'bm1',
    slug: 'log-analysis-siem',
    title: 'Log Analysis / SIEM',
    description: 'Master log analysis and SIEM operations to detect and respond to security incidents.',
    category: BlueLabCategory.LOG_ANALYSIS,
    icon: '📊',
    totalLabs: 3,
    completedLabs: 0,
    progress: 0,
    estimatedHours: 3,
    labs: ['bl1', 'bl2', 'bl3']
  },
  {
    id: 'bm2',
    slug: 'incident-response',
    title: 'Incident Response',
    description: 'Learn incident response procedures and handle security incidents effectively.',
    category: BlueLabCategory.INCIDENT_RESPONSE,
    icon: '🚨',
    totalLabs: 2,
    completedLabs: 0,
    progress: 0,
    estimatedHours: 2.5,
    labs: ['bl4', 'bl5']
  },
  {
    id: 'bm3',
    slug: 'digital-forensics',
    title: 'Digital Forensics',
    description: 'Perform forensic analysis on disk images, memory dumps, and network captures.',
    category: BlueLabCategory.DIGITAL_FORENSICS,
    icon: '🔍',
    totalLabs: 3,
    completedLabs: 0,
    progress: 0,
    estimatedHours: 5,
    labs: ['bl6', 'bl7', 'bl8']
  },
  {
    id: 'bm4',
    slug: 'threat-hunting',
    title: 'Threat Hunting',
    description: 'Proactively hunt for threats using MITRE ATT&CK framework and advanced techniques.',
    category: BlueLabCategory.THREAT_HUNTING,
    icon: '🎯',
    totalLabs: 2,
    completedLabs: 0,
    progress: 0,
    estimatedHours: 2.5,
    labs: ['bl9', 'bl10']
  },
  {
    id: 'bm5',
    slug: 'network-defense-soc',
    title: 'Network Defense / SOC',
    description: 'Defend networks using IDS/IPS, firewall rules, and SOC operations.',
    category: BlueLabCategory.NETWORK_DEFENSE,
    icon: '🛡️',
    totalLabs: 3,
    completedLabs: 0,
    progress: 0,
    estimatedHours: 3.5,
    labs: ['bl11', 'bl12', 'bl13']
  },
  {
    id: 'bm6',
    slug: 'malware-analysis',
    title: 'Malware Analysis',
    description: 'Analyze malware using static and dynamic analysis techniques.',
    category: BlueLabCategory.MALWARE_ANALYSIS,
    icon: '🦠',
    totalLabs: 3,
    completedLabs: 0,
    progress: 0,
    estimatedHours: 5,
    labs: ['bl14', 'bl15', 'bl16']
  }
];

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
