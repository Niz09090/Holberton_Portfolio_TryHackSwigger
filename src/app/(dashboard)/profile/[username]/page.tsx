'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/shared/Navbar';
import { BadgeCard } from '@/components/shared/BadgeCard';
import { 
  User, 
  Trophy, 
  Target, 
  Star,
  Calendar,
  MapPin,
  Shield,
  Zap,
  Clock,
  Award,
  TrendingUp,
  Flag,
  Users,
  Activity,
  Lock,
  Check,
  Crown,
  Medal,
  Github,
  Twitter,
  Globe,
  Mail,
  Edit,
  Settings,
  MessageSquare
} from 'lucide-react';
import { mockUsers, mockBadges, mockLabs, mockActivities } from '@/lib/mockData';

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;

  const [activeTab, setActiveTab] = useState<'overview' | 'badges' | 'activities' | 'stats'>('overview');

  // Find user data
  const user = useMemo(() => {
    return mockUsers.find(u => u.username === username) || mockUsers[0];
  }, [username]);

  if (!user) return null;

  // Get user's earned badges
  const userBadges = useMemo(() => {
    if (!user?.badges?.earned) return [];
    return mockBadges.filter(badge =>
      user.badges.earned.includes(badge.id)
    );
  }, [user]);

  // Get user's completed labs
  const userLabs = useMemo(() => {
    return mockLabs.filter(lab => 
      mockActivities.some(activity => 
        activity.user.id === user.id && 
        activity.type === 'lab_completed' && 
        activity.data.labId === lab.id
      )
    );
  }, [user]);

  // Get user's activities
  const userActivities = useMemo(() => {
    return mockActivities
      .filter(activity => activity.user.id === user.id)
      .slice(0, 20);
  }, [user]);

  // Calculate user stats
  const userStats = useMemo(() => {
    const completedLabs = userLabs.length;
    const totalPoints = user.points;
    const rank = mockUsers.findIndex(u => u.id === user.id) + 1;
    const joinDate = new Date(user.joinDate);
    const daysSinceJoin = Math.floor((new Date().getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24));
    
    return {
      completedLabs,
      totalPoints,
      rank,
      daysSinceJoin,
      badgesEarned: userBadges.length,
      totalBadges: mockBadges.length,
      achievements: userBadges.filter(b => b.category === 'achievement').length,
      skillBadges: userBadges.filter(b => b.category === 'skill').length,
      specialBadges: userBadges.filter(b => b.category === 'special').length
    };
  }, [user, userBadges, userLabs]);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-5 w-5 text-yellow-400" />;
    if (rank <= 3) return <Medal className="h-5 w-5 text-orange-400" />;
    return <div className="text-gray-400 font-bold">#{rank}</div>;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lab_completed':
        return <Target className="h-4 w-4 text-neon-green" />;
      case 'badge_earned':
        return <Award className="h-4 w-4 text-yellow-400" />;
      case 'level_up':
        return <TrendingUp className="h-4 w-4 text-purple-400" />;
      case 'race_completed':
        return <Trophy className="h-4 w-4 text-orange-400" />;
      default:
        return <Activity className="h-4 w-4 text-gray-400" />;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-deep-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">User Not Found</h1>
          <p className="text-gray-400 mb-8">The user you're looking for doesn't exist.</p>
          <Button variant="neon" asChild>
            <Link href="/dashboard">
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-deep-black text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="bg-surface-black border-border-dark">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-neon-green to-neon-cyan rounded-full flex items-center justify-center">
                      <User className="h-12 w-12 text-white" />
                    </div>
                    {user.isOnline && (
                      <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-deep-black"></div>
                    )}
                  </div>
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-4">
                    <h1 className="text-3xl font-bold text-white">
                      {user.displayName}
                    </h1>
                    <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
                      @{user.username}
                    </Badge>
                    {user.isVerified && (
                      <Check className="h-5 w-5 text-blue-400" />
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-6 text-gray-400">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{user.country}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <span>{user.rank}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-300 mt-4">
                    {user.bio || 'No bio available. This hacker prefers to keep their skills mysterious.'}
                  </p>

                  {/* Social Links */}
                  <div className="flex items-center space-x-4 mt-6">
                    {user.social?.github && (
                      <Link href={user.social.github} className="text-gray-400 hover:text-white transition-colors">
                        <Github className="h-5 w-5" />
                      </Link>
                    )}
                    {user.social?.twitter && (
                      <Link href={user.social.twitter} className="text-gray-400 hover:text-white transition-colors">
                        <Twitter className="h-5 w-5" />
                      </Link>
                    )}
                    {user.social?.website && (
                      <Link href={user.social.website} className="text-gray-400 hover:text-white transition-colors">
                        <Globe className="h-5 w-5" />
                      </Link>
                    )}
                    <Link href={`/messages/${user.username}`} className="text-gray-400 hover:text-white transition-colors">
                      <MessageSquare className="h-5 w-5" />
                    </Link>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/messages/${user.username}`}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/settings`}>
                      <Settings className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-surface-black border border-border-dark rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-neon-green mb-1">
              {userStats.rank}
            </div>
            <div className="text-sm text-gray-400">Global Rank</div>
          </div>
          <div className="bg-surface-black border border-border-dark rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-neon-cyan mb-1">
              {userStats.totalPoints.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Total Points</div>
          </div>
          <div className="bg-surface-black border border-border-dark rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-1">
              {userStats.completedLabs}
            </div>
            <div className="text-sm text-gray-400">Labs Completed</div>
          </div>
          <div className="bg-surface-black border border-border-dark rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">
              {userStats.badgesEarned}
            </div>
            <div className="text-sm text-gray-400">Badges Earned</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 border-b border-border-dark">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'overview' 
                ? 'text-neon-green border-b-2 border-neon-green' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'badges' 
                ? 'text-neon-green border-b-2 border-neon-green' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Badges ({userStats.badgesEarned})
          </button>
          <button
            onClick={() => setActiveTab('activities')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'activities' 
                ? 'text-neon-green border-b-2 border-neon-green' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Activities
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'stats' 
                ? 'text-neon-green border-b-2 border-neon-green' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Stats
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activities */}
            <div className="lg:col-span-2">
              <Card className="bg-surface-black border-border-dark">
                <CardHeader>
                  <CardTitle className="text-white text-xl flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-neon-green" />
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userActivities.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-deep-black rounded-lg">
                        <div className="flex-shrink-0">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-medium">{activity.title || 'Activity'}</div>
                          <div className="text-gray-400 text-sm">{activity.description || 'No description'}</div>
                          <div className="text-gray-500 text-xs mt-1">
                            {new Date(activity.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <Card className="bg-surface-black border-border-dark">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Member Since</span>
                    <span className="text-white">{userStats.daysSinceJoin} days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Achievements</span>
                    <span className="text-yellow-400">{userStats.achievements}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Skill Badges</span>
                    <span className="text-purple-400">{userStats.skillBadges}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Special Badges</span>
                    <span className="text-orange-400">{userStats.specialBadges}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-surface-black border-border-dark">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Top Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {['Web Security', 'Network Security', 'Cryptography', 'Forensics'].slice(0, 4).map((skill, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-deep-black rounded-lg">
                      <span className="text-white">{skill}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-neon-green h-2 rounded-full"
                            style={{ width: `${Math.random() * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-neon-green text-xs">{Math.floor(Math.random() * 100)}%</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'badges' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {userBadges.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} earned={true} />
            ))}
          </div>
        )}

        {activeTab === 'activities' && (
          <div className="space-y-4">
            {userActivities.map((activity, index) => (
              <Card key={index} className="bg-surface-black border-border-dark">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-semibold">{activity.title || 'Activity'}</h4>
                        <span className="text-gray-500 text-sm">
                          {new Date(activity.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-300">{activity.description || 'No description'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-surface-black border-border-dark">
              <CardHeader>
                <CardTitle className="text-white text-xl">Performance Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Total Labs</span>
                  <span className="text-white">{userStats.completedLabs}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Success Rate</span>
                  <span className="text-neon-green">87%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Average Time</span>
                  <span className="text-neon-cyan">45 min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Best Streak</span>
                  <span className="text-yellow-400">12 days</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-surface-black border-border-dark">
              <CardHeader>
                <CardTitle className="text-white text-xl">Achievement Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Badges Collected</span>
                  <span className="text-white">{userStats.badgesEarned}/{userStats.totalBadges}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Achievement Unlocked</span>
                  <span className="text-yellow-400">{userStats.achievements}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Points Earned</span>
                  <span className="text-neon-cyan">{userStats.totalPoints.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Global Ranking</span>
                  <span className="text-purple-400">#{userStats.rank}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
