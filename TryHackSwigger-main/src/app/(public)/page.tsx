'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/shared/Navbar';
import { 
  Shield, 
  Trophy, 
  BookOpen, 
  Users, 
  Target, 
  Zap,
  ChevronRight,
  Flame,
  ArrowRight,
  Clock,
  Star,
  Award,
  CheckCircle,
  Lock,
  Key,
  Terminal,
  Monitor,
  Cpu,
  Database,
  Server,
  Code,
  GitBranch,
  ExternalLink
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-deep-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 matrix-bg opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 glitch">
              Learn Practically.
              <span className="block text-neon-green">Compete Globally.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Master cybersecurity through hands-on labs, intense competitions, and a thriving global community. 
              From beginner to elite hacker - your journey starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="neon" size="lg" className="text-lg btn-neon" asChild>
                <Link href="/register">
                  Sign Up Free
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black" asChild>
                <Link href="/labs">
                  View Labs
                  <Terminal className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-surface-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-neon-cyan">Why HackForge?</h2>
            <p className="text-xl text-gray-300">
              Everything you need to become a cybersecurity expert, all in one platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-deep-black border-border-dark card-hover group">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-neon-green/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-neon-green/30 transition-colors">
                  <Terminal className="h-8 w-8 text-neon-green" />
                </div>
                <CardTitle className="text-white">Hands-on Labs</CardTitle>
                <CardDescription className="text-gray-400">
                  Real-world scenarios with instant feedback and detailed solutions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-deep-black border-border-dark card-hover group">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-neon-cyan/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-neon-cyan/30 transition-colors">
                  <Trophy className="h-8 w-8 text-neon-cyan" />
                </div>
                <CardTitle className="text-white">Competitions</CardTitle>
                <CardDescription className="text-gray-400">
                  Test your skills against hackers worldwide in live CTF events
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-deep-black border-border-dark card-hover group">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors">
                  <Award className="h-8 w-8 text-purple-400" />
                </div>
                <CardTitle className="text-white">Achievements</CardTitle>
                <CardDescription className="text-gray-400">
                  Earn badges and climb the global leaderboard
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-deep-black border-border-dark card-hover group">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-500/30 transition-colors">
                  <Users className="h-8 w-8 text-orange-400" />
                </div>
                <CardTitle className="text-white">Community</CardTitle>
                <CardDescription className="text-gray-400">
                  Learn together with a vibrant community of security enthusiasts
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-neon-green/10 to-neon-cyan/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-neon-green mb-2">50K+</div>
              <div className="text-gray-300">Active Learners</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-neon-cyan mb-2">200+</div>
              <div className="text-gray-300">Hands-on Labs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">100+</div>
              <div className="text-gray-300">Monthly Competitions</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-400 mb-2">150+</div>
              <div className="text-gray-300">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths Preview */}
      <section className="py-20 bg-surface-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Structured Learning Paths</h2>
            <p className="text-xl text-gray-300">
              Follow curated paths from basics to advanced topics
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-deep-black border-border-dark card-hover">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Shield className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <CardTitle className="text-white">Web Fundamentals</CardTitle>
                    <div className="text-sm text-gray-400">Beginner • 20 hours</div>
                  </div>
                </div>
                <CardDescription className="text-gray-300">
                  Master the basics of web application security with OWASP Top 10 vulnerabilities.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '75%'}}></div>
                    </div>
                    <span className="text-sm text-gray-400">75%</span>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/learn/web-fundamentals">Continue</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-deep-black border-border-dark card-hover">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <Lock className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <CardTitle className="text-white">Advanced Web Exploitation</CardTitle>
                    <div className="text-sm text-gray-400">Advanced • 40 hours</div>
                  </div>
                </div>
                <CardDescription className="text-gray-300">
                  Take your web security skills to the next level with complex attack scenarios.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{width: '40%'}}></div>
                    </div>
                    <span className="text-sm text-gray-400">40%</span>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/learn/advanced-web">Continue</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-deep-black border-border-dark card-hover">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-red-400" />
                  </div>
                  <div>
                    <CardTitle className="text-white">System Penetration</CardTitle>
                    <div className="text-sm text-gray-400">Hard • 50 hours</div>
                  </div>
                </div>
                <CardDescription className="text-gray-300">
                  Complete guide to penetration testing Linux and Windows systems.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{width: '10%'}}></div>
                    </div>
                    <span className="text-sm text-gray-400">10%</span>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/learn/system-penetration">Start</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-neon-green/5 to-neon-cyan/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Ready to Start Your Hacking Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of learners mastering cybersecurity skills through practical, hands-on experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="neon" size="lg" className="text-lg btn-neon" asChild>
              <Link href="/register">
                Get Started Free
                <Zap className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg border-white text-white hover:bg-white hover:text-black" asChild>
              <Link href="/labs">
                Browse Labs
                <Code className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-deep-black border-t border-border-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-8 w-8 text-neon-green" />
                <span className="text-xl font-bold text-white">HackForge</span>
              </div>
              <p className="text-gray-400">
                The ultimate platform for learning cybersecurity through hands-on practice and competition.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Learn</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/labs" className="hover:text-neon-green transition-colors">Labs</Link></li>
                <li><Link href="/learn" className="hover:text-neon-green transition-colors">Learning Paths</Link></li>
                <li><Link href="/badges" className="hover:text-neon-green transition-colors">Achievements</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Compete</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/compete" className="hover:text-neon-green transition-colors">Competitions</Link></li>
                <li><Link href="/leaderboard" className="hover:text-neon-green transition-colors">Leaderboard</Link></li>
                <li><Link href="/teams" className="hover:text-neon-green transition-colors">Teams</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/forum" className="hover:text-neon-green transition-colors">Forum</Link></li>
                <li><Link href="/blog" className="hover:text-neon-green transition-colors">Blog</Link></li>
                <li><Link href="/discord" className="hover:text-neon-green transition-colors">Discord</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border-dark mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HackForge. All rights reserved. | 
              <Link href="/privacy" className="hover:text-neon-green transition-colors ml-2">Privacy</Link> | 
              <Link href="/terms" className="hover:text-neon-green transition-colors ml-2">Terms</Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
