'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/shared/Navbar';
import { LabCard } from '@/components/shared/LabCard';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Trophy, 
  Flame, 
  Zap, 
  Target,
  BookOpen,
  Users,
  Star,
  TrendingUp,
  Clock,
  Award,
  Activity,
  ChevronRight,
  Terminal,
  Shield
} from 'lucide-react';
import { mockLabs, mockActivities } from '@/lib/mockData';

// Helper function for difficulty colors (same as LabCard)
function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case 'Easy':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'Medium':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'Hard':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 'Insane':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
}

export default function DashboardPage() {
  const { user } = useAuth();
  const continueLearningLab = mockLabs.find(lab => lab.id === '1');

  if (!user) return null;

  return (
    <div className="min-h-screen bg-deep-black text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Stats Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Rank and Level */}
          <Card className="bg-surface-black border-border-dark">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg flex items-center">
                <Shield className="h-5 w-5 mr-2 text-neon-green" />
                {user.rank}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-neon-cyan mb-1">
                  Level {user.level}
                </div>
                <div className="text-sm text-gray-400">
                  {user.points.toLocaleString()} total points
                </div>
              </div>
            </CardContent>
          </Card>

          {/* XP Progress */}
          <Card className="bg-surface-black border-border-dark">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg">Experience Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Level {user.level}</span>
                  <span className="text-gray-400">Level {user.level + 1}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-neon-green to-neon-cyan h-3 rounded-full progress-bar"
                    style={{ width: `${(user.xp / user.xpToNextLevel) * 100}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{user.xp} XP</span>
                  <span>{user.xpToNextLevel} XP</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Daily Streak */}
          <Card className="bg-surface-black border-border-dark">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg">Daily Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Flame className="h-8 w-8 text-orange-500 pulse-glow" />
                  <span className="text-4xl font-bold text-orange-500">
                    {user.streak}
                  </span>
                </div>
                <div className="text-sm text-gray-400">
                  Days in a row
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Keep it going! 🔥
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Continue Learning */}
          <div className="lg:col-span-2">
            <Card className="bg-surface-black border-border-dark h-full">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-neon-green" />
                  Continue Learning
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Pick up where you left off
                </CardDescription>
              </CardHeader>
              <CardContent>
                {continueLearningLab ? (
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {continueLearningLab.title}
                        </h3>
                        <p className="text-sm text-gray-400 line-clamp-2">
                          {continueLearningLab.description}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{continueLearningLab.estimatedTime}m</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Target className="h-3 w-3" />
                            <span>{continueLearningLab.difficulty}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Trophy className="h-3 w-3" />
                            <span>{continueLearningLab.points} pts</span>
                          </div>
                        </div>
                      </div>
                      <Badge className={`${getDifficultyColor(continueLearningLab.difficulty)} border`}>
                        {continueLearningLab.difficulty}
                      </Badge>
                    </div>
                    <Button 
                      variant="neon" 
                      className="w-full btn-neon"
                      asChild
                    >
                      <Link href={`/labs/${continueLearningLab.slug}`}>
                        Resume Lab
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Terminal className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">No labs in progress</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      asChild
                    >
                      <Link href="/labs">
                        Browse Labs
                        <BookOpen className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Stats Cards */}
          <div className="space-y-6">
            <Card className="bg-surface-black border-border-dark">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-lg">Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-neon-green" />
                    <span className="text-gray-300">Labs Completed</span>
                  </div>
                  <span className="text-xl font-bold text-neon-green">12</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-neon-cyan" />
                    <span className="text-gray-300">Badges Earned</span>
                  </div>
                  <span className="text-xl font-bold text-neon-cyan">8</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-4 w-4 text-yellow-400" />
                    <span className="text-gray-300">Global Rank</span>
                  </div>
                  <span className="text-xl font-bold text-yellow-400">#42</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-surface-black border-border-dark">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/learn">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Learning Paths
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/compete">
                    <Trophy className="mr-2 h-4 w-4" />
                    Competitions
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/badges">
                    <Award className="mr-2 h-4 w-4" />
                    My Badges
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Friend Activity Feed */}
        <div className="mt-8">
          <Card className="bg-surface-black border-border-dark">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Activity className="h-5 w-5 mr-2 text-neon-green" />
                Friend Activity
              </CardTitle>
              <CardDescription className="text-gray-400">
                See what your friends are accomplishing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockActivities.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 bg-deep-black/50 rounded-lg">
                    <div className="flex-shrink-0">
                      {activity.type === 'lab_completed' && <Target className="h-5 w-5 text-neon-green" />}
                      {activity.type === 'badge_earned' && <Award className="h-5 w-5 text-neon-cyan" />}
                      {activity.type === 'level_up' && <TrendingUp className="h-5 w-5 text-yellow-400" />}
                      {activity.type === 'streak_achieved' && <Flame className="h-5 w-5 text-orange-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-white">
                          {activity.user.username}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(activity.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300">
                        {activity.type === 'lab_completed' && (
                          <>Completed <span className="text-neon-green font-medium">{activity.data.target?.name}</span></>
                        )}
                        {activity.type === 'badge_earned' && (
                          <>Earned <span className="text-neon-cyan font-medium">{activity.data.target?.name}</span> badge</>
                        )}
                        {activity.type === 'level_up' && (
                          <>Reached <span className="text-yellow-400 font-medium">Level {activity.data.newLevel}</span></>
                        )}
                        {activity.type === 'streak_achieved' && (
                          <>Achieved <span className="text-orange-500 font-medium">{activity.data.streakDays} day streak</span></>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-6">
                <Button 
                  variant="outline" 
                  asChild
                >
                  <Link href="/friends">
                    <Users className="mr-2 h-4 w-4" />
                    View All Activity
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
