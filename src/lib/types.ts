// User types
export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatar?: string;
  rank: string;
  points: number;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  joinDate: string;
  country: string;
  isVip: boolean;
  isOnline?: boolean;
  isVerified?: boolean;
  bio?: string;
  social?: {
    github?: string;
    twitter?: string;
    website?: string;
    linkedin?: string;
  };
  badges: {
    earned: string[];
    locked?: string[];
  };
}

// Lab types
export interface Lab {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: LabCategory;
  difficulty: Difficulty;
  points: number;
  estimatedTime: number;
  learningObjectives: string[];
  prerequisites?: string[];
  flag: string;
  hints: { text: string; cost: number }[];
  solution: string;
  completedBy: number;
  rating: number;
  completions: number;
  createdAt: string;
  dockerImage: string;
  terminalEnabled: boolean;
  ports: number[];
  type?: LabTeamType;
  incidentScenario?: string;
  investigativeQuestions?: InvestigativeQuestion[];
}

export interface InvestigativeQuestion {
  id: string;
  question: string;
  flag: string;
  hint?: string;
}

export enum LabTeamType {
  RED_TEAM = 'RED_TEAM',
  BLUE_TEAM = 'BLUE_TEAM'
}

export interface BlueLab {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: BlueLabCategory;
  difficulty: Difficulty;
  points: number;
  estimatedTime: number;
  learningObjectives: string[];
  prerequisites?: string[];
  flag: string;
  hints: { text: string; cost: number }[];
  solution?: string;
  completedBy: number;
  rating: number;
  dockerImage?: string;
  terminalEnabled: boolean;
  ports: number[];
  labType: LabType;
  tools: string[];
  pairedRedLabId?: string;
}

export interface BlueModule {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: BlueLabCategory;
  icon: string;
  estimatedHours: number;
  totalLabs: number;
  labs: string[];
}

export enum LabCategory {
  SQL_INJECTION = 'SQL Injection',
  XSS = 'Cross-Site Scripting',
  CSRF = 'Cross-Site Request Forgery',
  SSRF = 'Server-Side Request Forgery',
  XXE = 'XML External Entity',
  IDOR = 'Insecure Direct Object Reference',
  AUTH_BYPASS = 'Authentication Bypass',
  PRIVILEGE_ESCALATION = 'Privilege Escalation',
  FILE_UPLOAD = 'File Upload Vulnerabilities',
  COMMAND_INJECTION = 'Command Injection',
  LFI = 'Local File Inclusion',
  RFI = 'Remote File Inclusion',
  BUFFER_OVERFLOW = 'Buffer Overflow',
  CRYPTO = 'Cryptography',
  FORENSICS = 'Digital Forensics',
  REVERSE_ENGINEERING = 'Reverse Engineering',
  OSINT = 'Open Source Intelligence',
  NETWORKING = 'Networking',
  WEB_CACHE = 'Web Cache Poisoning',
  RACE_CONDITION = 'Race Condition'
}

export enum BlueLabCategory {
  LOG_ANALYSIS = 'Log Analysis / SIEM',
  INCIDENT_RESPONSE = 'Incident Response',
  DIGITAL_FORENSICS = 'Digital Forensics',
  THREAT_HUNTING = 'Threat Hunting',
  NETWORK_DEFENSE = 'Network Defense',
  MALWARE_ANALYSIS = 'Malware Analysis'
}

export enum LabType {
  GUIDED = 'Guided',
  SCENARIO = 'Scenario'
}

export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
  INSANE = 'Insane'
}

// Learning Path types
export interface LearningPath {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  estimatedHours: number;
  labs: string[]; // Lab IDs
  progress: number; // 0-100
  enrolledCount: number;
  completedCount: number;
  icon: string;
  tags: string[];
  points?: number;
  completedLabs?: number;
  topics?: string[];
}

// Badge types
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: BadgeRarity;
  category: BadgeCategory;
  unlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
  requirement: string;
}

export enum BadgeRarity {
  COMMON = 'Common',
  RARE = 'Rare',
  EPIC = 'Epic',
  LEGENDARY = 'Legendary',
  MYTHIC = 'Mythic'
}

export enum BadgeCategory {
  ACHIEVEMENT = 'achievement',
  SKILL = 'skill',
  COMPETITION = 'competition',
  COMMUNITY = 'community',
  SPECIAL = 'special'
}

// Leaderboard types
export interface LeaderboardEntry {
  rank: number;
  user: {
    id: string;
    username: string;
    displayName?: string;
    avatar?: string;
    country: string;
    rank: string;
  };
  points: number;
  badgesCount: number;
  labsCompleted: number;
  level?: number;
  streak?: number;
  change?: number; // Rank change from previous period
  trend?: 'up' | 'down' | 'stable' | 'new';
  pointsGained?: number; // Points gained in the last 7 days
}

export enum LeaderboardType {
  GLOBAL = 'Global',
  MONTHLY = 'Monthly',
  FRIENDS = 'Friends',
  COUNTRY = 'Country'
}

// Race/Competition types
export interface Race {
  id: string;
  title: string;
  description: string;
  type: RaceType;
  status: RaceStatus;
  startTime: string;
  endTime: string;
  maxParticipants: number;
  currentParticipants: number;
  prizePool?: number;
  duration?: number;
  rules: string[];
  challenges: RaceChallenge[];
  participants: RaceParticipant[];
}

export enum RaceType {
  SPEED_CTF = 'Speed CTF',
  KING_OF_THE_HILL = 'King of the Hill',
  BATTLE_ROYALE = 'Battle Royale',
  ESCAPE_ROOM = 'Escape Room',
  TREASURE_HUNT = 'Treasure Hunt'
}

export enum RaceStatus {
  UPCOMING = 'upcoming',
  LIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface RaceChallenge {
  id: string;
  title: string;
  description: string;
  points: number;
  flag: string;
  firstBloodBonus: number;
  solves: number;
}

export interface RaceParticipant {
  userId: string;
  username: string;
  avatar?: string;
  joinTime: string;
  score: number;
  points?: number;
  rank?: number;
  solves: string[]; // Challenge IDs
  lastSolveTime?: string;
}

// Forum types
export interface ForumThread {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: {
    id: string;
    username: string;
    avatar?: string;
    rank: string;
  };
  category: 'general' | 'help' | 'showcase' | 'announcements';
  tags: string[];
  createdAt: string;
  updatedAt: string;
  views: number;
  replies: ForumReply[];
  pinned: boolean;
  locked: boolean;
  solved: boolean;
  likes?: number;
  isHot?: boolean;
}

export interface ForumReply {
  id: string;
  content: string;
  author: {
    id: string;
    username: string;
    avatar?: string;
    rank: string;
  };
  createdAt: string;
  updatedAt: string;
  likes: number;
  isAnswer: boolean;
  replies: ForumReply[]; // Nested replies
}

export enum ForumCategory {
  GENERAL = 'General',
  LAB_HELP = 'Lab Help',
  CTF_DISCUSSION = 'CTF Discussion',
  ANNOUNCEMENTS = 'Announcements',
  TUTORIALS = 'Tutorials',
  TOOLS = 'Tools',
  CAREER = 'Career',
  OFF_TOPIC = 'Off Topic'
}

// Activity types
export interface Activity {
  id: string;
  type: ActivityType;
  title?: string;
  description?: string;
  user: {
    id: string;
    username: string;
    avatar?: string;
  };
  target?: {
    type: string;
    id: string;
    name: string;
  };
  data: Record<string, any>;
  timestamp: string;
}

export enum ActivityType {
  LAB_COMPLETED = 'lab_completed',
  BADGE_EARNED = 'badge_earned',
  LEVEL_UP = 'level_up',
  STREAK_ACHIEVED = 'streak_achieved',
  RACE_JOINED = 'race_joined',
  RACE_WON = 'race_won',
  FORUM_POST = 'forum_post',
  FORUM_REPLY = 'forum_reply',
  FRIEND_ADDED = 'friend_added'
}

// Settings types
export interface UserSettings {
  profile: {
    displayName: string;
    bio: string;
    avatar?: string;
    country: string;
    timezone: string;
    language: string;
  };
  security: {
    twoFactorEnabled: boolean;
    emailNotifications: boolean;
    sessionTimeout: number;
    activeSessions: ActiveSession[];
  };
  vpn: {
    enabled: boolean;
    config?: string;
    status: VpnStatus;
    lastConnected?: string;
  };
  billing: {
    plan: SubscriptionPlan;
    status: SubscriptionStatus;
    currentPeriodStart: string;
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
  };
  preferences: {
    theme: 'dark';
    notifications: NotificationPreferences;
    privacy: PrivacyPreferences;
  };
}

export interface ActiveSession {
  id: string;
  device: string;
  browser: string;
  ip: string;
  location: string;
  createdAt: string;
  lastActive: string;
  current: boolean;
}

export enum VpnStatus {
  DISCONNECTED = 'Disconnected',
  CONNECTING = 'Connecting',
  CONNECTED = 'Connected',
  ERROR = 'Error'
}

export enum SubscriptionPlan {
  FREE = 'Free',
  VIP = 'VIP',
  PREMIUM = 'Premium'
}

export enum SubscriptionStatus {
  ACTIVE = 'Active',
  CANCELLED = 'Cancelled',
  PAST_DUE = 'Past Due',
  UNPAID = 'Unpaid'
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  labCompleted: boolean;
  badgeEarned: boolean;
  raceStarting: boolean;
  friendActivity: boolean;
  forumReplies: boolean;
}

export interface PrivacyPreferences {
  profilePublic: boolean;
  showCountry: boolean;
  showStats: boolean;
  showActivity: boolean;
  allowFriendRequests: boolean;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface FlagSubmission {
  flag: string;
  labId: string;
}

// UI State types
export interface LabState {
  isRunning: boolean;
  timeRemaining: number;
  hintsUnlocked: number;
  solutionUnlocked: boolean;
  attempts: number;
  startTime?: string;
}

export interface RaceState {
  currentRace?: Race;
  timeRemaining: number;
  currentChallenge?: RaceChallenge;
  solves: string[];
  score: number;
}
