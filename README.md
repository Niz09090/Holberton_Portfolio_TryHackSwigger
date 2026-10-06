# 🛡️ TryHackSwigger

A modern cybersecurity learning platform and CTF competition arena built with Next.js 14. TryHackSwigger provides hands-on labs, interactive challenges, competitive events, and a vibrant community for aspiring security professionals.

## 🌟 Key Features

### 🎯 Interactive Labs
- **12+ Vulnerability Labs**: Practice real-world security vulnerabilities including SQL Injection, XSS, CSRF, SSRF, XXE, Command Injection, File Upload, LFI, IDOR, JWT Bypass, Privilege Escalation, and Buffer Overflow
- **Docker-Powered Environments**: Each lab runs in an isolated container for safe, realistic practice
- **Progress Tracking**: Track your completion status, points, and learning progress
- **Hints System**: Get contextual hints when stuck (with point costs)

### 🏆 Competitions
- **Live CTF Events**: Participate in real-time competitions with other hackers
- **King of the Hill**: Defend your position while attacking others
- **Battle Royale**: Elimination-style forensic challenges
- **Leaderboards**: Global rankings and competition-specific standings
- **Prize Pools**: Earn points and recognition for top performances

### 💬 Community Forum
- **Discussion Threads**: Get help from the community on challenging labs
- **Knowledge Sharing**: Share solutions, techniques, and learning resources
- **Categories**: Organized by topic (General, Help, Showcase, Announcements)
- **Thread Management**: Pin, lock, and mark threads as solved

### 👤 User Profiles
- **Progress Dashboard**: Track overall progress, streaks, and achievements
- **Badges System**: Earn badges for completing challenges and milestones
- **Skill Tracking**: Monitor growth across different security domains
- **Social Features**: Connect with other security enthusiasts

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 14.2.3** - React framework with App Router for server-side rendering and optimized performance
- **React 18** - UI library for building interactive interfaces
- **TypeScript 5** - Type-safe development

### Styling & UI
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible component primitives
  - Avatar, Dialog, Dropdown Menu, Label, Progress, Select, Separator, Slot, Switch, Tabs
- **Lucide React** - Beautiful, consistent icon library
- **class-variance-authority** - Component variant management
- **tailwind-merge** - Intelligent Tailwind class merging
- **tailwindcss-animate** - Smooth animations

### Backend & Integrations
- **Dockerode** - Docker API for container management
- **tar-fs** - File system operations for lab deployments

### Development Tools
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS transformation pipeline
- **Autoprefixer** - Automatic vendor prefixing

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- Docker (for running lab containers)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Niz09090/TryHackSwigger_main.git
cd TryHackSwigger_main
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start the development server**
```bash
npm run dev
```

The application will be available at `http://localhost:3075`

### Building for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── (auth)/                   # Authentication routes (login, register)
│   ├── (dashboard)/              # Protected dashboard routes
│   │   ├── badges/              # Badge collection and achievements
│   │   ├── compete/             # Competition listings and details
│   │   │   ├── [raceId]/        # Individual competition page
│   │   ├── dashboard/           # Main user dashboard
│   │   ├── forum/               # Community forum
│   │   │   └── [id]/           # Individual thread page
│   │   ├── labs/                # Lab listings and details
│   │   │   └── [slug]/         # Individual lab page
│   │   ├── leaderboard/         # Global rankings
│   │   ├── learn/               # Learning paths overview
│   │   ├── learning-paths/      # Individual learning path
│   │   ├── profile/             # User profiles
│   │   └── settings/            # User settings
│   ├── (public)/                # Public landing page
│   ├── api/                     # API routes
│   │   ├── auth/                # Authentication endpoints
│   │   ├── labs/                # Lab management endpoints
│   │   └── users/               # User management endpoints
│   ├── globals.css              # Global styles and Tailwind directives
│   └── layout.tsx               # Root layout
├── components/                   # Reusable React components
│   ├── auth/                    # Authentication components
│   ├── labs/                    # Lab-specific components
│   │   └── MachineDeploy.tsx    # Docker container deployment UI
│   ├── shared/                  # Shared UI components
│   │   ├── Navbar.tsx           # Main navigation bar
│   │   └── LabCard.tsx          # Lab preview card
│   └── ui/                      # Base UI components (shadcn/ui)
│       ├── button.tsx
│       ├── card.tsx
│       └── badge.tsx
├── contexts/                    # React Context providers
│   └── AuthContext.tsx          # Authentication state management
├── lib/                         # Utility libraries
│   ├── mockData.ts              # Mock data for development
│   ├── types.ts                 # TypeScript type definitions
│   ├── utils.ts                 # Helper functions
│   └── docker.ts                # Docker container utilities
docker/                          # Docker configurations for labs
├── sqli-basic/                  # SQL Injection lab
├── xss-reflected/               # XSS lab
├── csrf-bypass/                # CSRF lab
├── lfi-basic/                   # Local File Inclusion lab
├── cmd-injection/               # Command Injection lab
├── file-upload/                 # File Upload lab
├── xxe-injection/               # XXE lab
├── ssrf-basic/                  # SSRF lab
├── jwt-bypass/                  # JWT Bypass lab
├── idor-basic/                  # IDOR lab
├── privesc-linux/               # Privilege Escalation lab
└── bof-basic/                   # Buffer Overflow lab
```

## 🎯 Available Routes

### Public Routes
- `/` - Landing page
- `/login` - User login
- `/register` - User registration

### Dashboard Routes (Protected)
- `/dashboard` - Main user dashboard
- `/labs` - Lab catalog
- `/labs/[slug]` - Individual lab details
- `/learn` - Learning paths overview
- `/learning-paths/[slug]` - Individual learning path
- `/compete` - Competitions list
- `/compete/[raceId]` - Competition details
- `/leaderboard` - Global leaderboard
- `/forum` - Community forum
- `/forum/[id]` - Forum thread
- `/badges` - Badge collection
- `/profile/[username]` - User profile
- `/settings` - User settings

## 🔐 Security Labs

The platform includes 12 hands-on security labs covering:

1. **SQL Injection** - Learn UNION-based injection and data extraction
2. **XSS (Reflected)** - Exploit cross-site scripting vulnerabilities
3. **CSRF Bypass** - Bypass CSRF token validation
4. **LFI** - Local file inclusion and path traversal
5. **Command Injection** - Execute arbitrary system commands
6. **File Upload** - Bypass upload restrictions for web shells
7. **XXE** - XML External Entity injection
8. **SSRF** - Server-Side Request Forgery attacks
9. **JWT Bypass** - Exploit weak JWT implementations
10. **IDOR** - Insecure Direct Object Reference
11. **Privilege Escalation** - Linux privilege escalation techniques
12. **Buffer Overflow** - Binary exploitation and memory corruption

See `DEMO_GUIDE.md` for detailed exploitation guides for each lab.

### Feature Highlights

- **Dark Theme UI** - Modern, eye-friendly interface optimized for long hacking sessions
- **Real-time Lab Deployment** - Docker containers spin up instantly for hands-on practice
- **Progress Tracking** - Visual indicators for completed challenges and earned badges
- **Competitive Events** - Live leaderboards and race-style competitions

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Inspired by [PortSwigger Web Security Academy](https://portswigger.net/web-security) and [TryHackMe](https://tryhackme.com/)
