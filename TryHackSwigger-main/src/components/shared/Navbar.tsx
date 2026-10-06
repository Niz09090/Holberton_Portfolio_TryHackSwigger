'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Menu, 
  X, 
  Shield, 
  Trophy, 
  BookOpen, 
  Users, 
  Settings, 
  User,
  Flame,
  Zap,
  LogOut,
  ShieldCheck
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="fixed top-0 w-full bg-deep-black/95 backdrop-blur-sm border-b border-border-dark z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-neon-green" />
            <span className="text-xl font-bold text-white">HackForge</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/labs" className="text-gray-300 hover:text-neon-green transition-colors">
              Labs
            </Link>
            <Link href="/blue-team" className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors font-medium">
              <ShieldCheck className="h-4 w-4" />
              <span>Blue Team</span>
            </Link>
            <Link href="/learn" className="text-gray-300 hover:text-neon-green transition-colors">
              Learning Paths
            </Link>
            <Link href="/compete" className="text-gray-300 hover:text-neon-green transition-colors">
              Compete
            </Link>
            <Link href="/leaderboard" className="text-gray-300 hover:text-neon-green transition-colors">
              Leaderboard
            </Link>
            <Link href="/forum" className="text-gray-300 hover:text-neon-green transition-colors">
              Community
            </Link>
          </div>

          {/* User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && user ? (
              <>
                {/* Streak and Points */}
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1 text-orange-500">
                    <Flame className="h-4 w-4" />
                    <span>{user.streak}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-neon-cyan">
                    <Zap className="h-4 w-4" />
                    <span>{user.points.toLocaleString()}</span>
                  </div>
                </div>

                {/* User Menu */}
                <div className="relative group">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.username} 
                        className="h-6 w-6 rounded-full"
                      />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                    <span className="text-white">{user.displayName || user.username}</span>
                  </Button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-surface-black border border-border-dark rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-300 hover:bg-border-dark hover:text-white">
                      Dashboard
                    </Link>
                    <Link href={`/profile/${user.username}`} className="block px-4 py-2 text-sm text-gray-300 hover:bg-border-dark hover:text-white">
                      Profile
                    </Link>
                    <Link href="/badges" className="block px-4 py-2 text-sm text-gray-300 hover:bg-border-dark hover:text-white">
                      Badges
                    </Link>
                    <Link href="/settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-border-dark hover:text-white">
                      Settings
                    </Link>
                    <hr className="border-border-dark" />
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-border-dark"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button variant="neon" size="sm" asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-surface-black border-t border-border-dark">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/labs" className="block px-3 py-2 text-gray-300 hover:text-neon-green">
                Labs
              </Link>
              <Link href="/blue-team" className="flex items-center space-x-2 px-3 py-2 text-blue-400 hover:text-blue-300 font-medium">
                <ShieldCheck className="h-4 w-4" />
                <span>Blue Team</span>
              </Link>
              <Link href="/learn" className="block px-3 py-2 text-gray-300 hover:text-neon-green">
                Learning Paths
              </Link>
              <Link href="/compete" className="block px-3 py-2 text-gray-300 hover:text-neon-green">
                Compete
              </Link>
              <Link href="/leaderboard" className="block px-3 py-2 text-gray-300 hover:text-neon-green">
                Leaderboard
              </Link>
              <Link href="/forum" className="block px-3 py-2 text-gray-300 hover:text-neon-green">
                Community
              </Link>
              
              {isAuthenticated && user ? (
                <>
                  <hr className="border-border-dark my-2" />
                  <div className="px-3 py-2 text-sm text-gray-400">
                    <div className="flex items-center justify-between">
                      <span>Streak</span>
                      <div className="flex items-center space-x-1 text-orange-500">
                        <Flame className="h-4 w-4" />
                        <span>{user.streak}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span>Points</span>
                      <div className="flex items-center space-x-1 text-neon-cyan">
                        <Zap className="h-4 w-4" />
                        <span>{user.points.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <Link href="/dashboard" className="block px-3 py-2 text-gray-300 hover:text-neon-green">
                    Dashboard
                  </Link>
                  <Link href={`/profile/${user.username}`} className="block px-3 py-2 text-gray-300 hover:text-neon-green">
                    Profile
                  </Link>
                  <Link href="/settings" className="block px-3 py-2 text-gray-300 hover:text-neon-green">
                    Settings
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-red-400"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <hr className="border-border-dark my-2" />
                  <div className="px-3 py-2 space-y-2">
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button variant="neon" size="sm" className="w-full" asChild>
                      <Link href="/register">Sign Up</Link>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
