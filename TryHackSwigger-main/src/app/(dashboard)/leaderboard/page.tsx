'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/shared/Navbar';
import { 
  Trophy, 
  Users, 
  Target, 
  Star,
  Globe,
  Calendar,
  Filter,
  Search,
  TrendingUp,
  Award,
  Crown,
  Medal,
  ChevronRight,
  User,
  Flag
} from 'lucide-react';
import { mockLeaderboard, currentUser } from '@/lib/mockData';
import { LeaderboardFilter } from '@/lib/types';

export default function LeaderboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState<'all' | 'monthly' | 'weekly'>('all');
  const [selectedCategory, setSelectedCategory] = useState<'global' | 'country' | 'labs' | 'points'>('global');
  const [teamFilter, setTeamFilter] = useState<LeaderboardFilter>(LeaderboardFilter.COMBINED);

  // Filter and search leaderboard
  const filteredLeaderboard = useMemo(() => {
    let filtered = mockLeaderboard;

    // Filter by team
    if (teamFilter === LeaderboardFilter.RED_ONLY) {
      filtered = filtered.filter(entry => entry.redPoints > 0);
    } else if (teamFilter === LeaderboardFilter.BLUE_ONLY) {
      filtered = filtered.filter(entry => entry.bluePoints > 0);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(entry => 
        entry.user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (entry.user.displayName?.toLowerCase() || '').includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory === 'country') {
      filtered = filtered.filter(entry => entry.user.country === 'US');
    } else if (selectedCategory === 'labs') {
      filtered = filtered.filter(entry => entry.labsCompleted > 0);
    } else if (selectedCategory === 'points') {
      filtered = filtered.filter(entry => entry.points > 0);
    }

    // Sort by team-specific points
    return filtered.sort((a, b) => {
      const getPoints = (entry: any) => {
        if (teamFilter === LeaderboardFilter.RED_ONLY) return entry.redPoints || 0;
        if (teamFilter === LeaderboardFilter.BLUE_ONLY) return entry.bluePoints || 0;
        return entry.points;
      };
      return getPoints(b) - getPoints(a);
    });
  }, [searchTerm, selectedCategory, teamFilter]);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-5 w-5 text-yellow-400" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-300" />;
    if (rank === 3) return <Medal className="h-5 w-5 text-orange-600" />;
    return <span className="text-gray-400 font-bold">#{rank}</span>;
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    if (rank <= 3) return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    if (rank <= 10) return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    if (rank <= 50) return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const getCountryFlag = (country: string) => {
    switch (country) {
      case 'US': return '🇺🇸';
      case 'UK': return '🇬🇧';
      case 'DE': return '🇩🇪';
      case 'FR': return '🇫🇷';
      case 'JP': return '🇯🇵';
      case 'BR': return '🇧🇷';
      case 'IN': return '🇮🇳';
      default: return '🌍';
    }
  };

  return (
    <div className="min-h-screen bg-deep-black text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Leaderboards
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Compete with hackers worldwide and climb the rankings
          </p>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-surface-black border border-border-dark rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-neon-green mb-1">
                {mockLeaderboard.length}
              </div>
              <div className="text-sm text-gray-400">Total Users</div>
            </div>
            <div className="bg-surface-black border border-border-dark rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-neon-cyan mb-1">
                {mockLeaderboard.filter(u => u.user.country === 'US').length}
              </div>
              <div className="text-sm text-gray-400">US Users</div>
            </div>
            <div className="bg-surface-black border border-border-dark rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-1">
                {mockLeaderboard.filter(u => u.labsCompleted > 0).length}
              </div>
              <div className="text-sm text-gray-400">Active Users</div>
            </div>
            <div className="bg-surface-black border border-border-dark rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">
                {mockLeaderboard.reduce((max, u) => Math.max(max, u.points), 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Highest Score</div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-surface-black border border-border-dark rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/20 transition-all"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <select
                value={teamFilter}
                onChange={(e) => setTeamFilter(e.target.value as LeaderboardFilter)}
                className="pl-10 pr-8 py-3 bg-surface-black border border-border-dark rounded-lg text-white focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/20 transition-all appearance-none cursor-pointer"
              >
                <option value={LeaderboardFilter.COMBINED}>Combined</option>
                <option value={LeaderboardFilter.RED_ONLY}>RED Team</option>
                <option value={LeaderboardFilter.BLUE_ONLY}>BLUE Team</option>
              </select>
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="pl-10 pr-8 py-3 bg-surface-black border border-border-dark rounded-lg text-white focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/20 transition-all appearance-none cursor-pointer"
              >
                <option value="global">Global Rankings</option>
                <option value="country">Country Rankings</option>
                <option value="labs">Lab Masters</option>
                <option value="points">Point Earners</option>
              </select>
            </div>

            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as any)}
                className="pl-10 pr-8 py-3 bg-surface-black border border-border-dark rounded-lg text-white focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/20 transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Time</option>
                <option value="monthly">This Month</option>
                <option value="weekly">This Week</option>
              </select>
            </div>
          </div>
        </div>

        {/* Current User's Position */}
        {currentUser && (
          <Card className="bg-surface-black border-border-dark mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-deep-black rounded-full flex items-center justify-center border-2 border-neon-green">
                    <User className="h-6 w-6 text-neon-green" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Your Global Rank</div>
                    <div className="text-xl font-bold text-neon-green">
                      #{mockLeaderboard.findIndex(entry => entry.user.id === currentUser.id) + 1}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-gray-400 mb-1">Your Stats</div>
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="text-lg font-bold text-neon-cyan">{currentUser.points}</div>
                      <div className="text-xs text-gray-500">Points</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-yellow-400">{currentUser.level}</div>
                      <div className="text-xs text-gray-500">Level</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-orange-400">{currentUser.streak}</div>
                      <div className="text-xs text-gray-500">Streak</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Leaderboard Table */}
        <Card className="bg-surface-black border-border-dark">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-neon-green" />
              {selectedCategory === 'global' && 'Global Rankings'}
              {selectedCategory === 'country' && 'Country Rankings'}
              {selectedCategory === 'labs' && 'Lab Masters'}
              {selectedCategory === 'points' && 'Top Earners'}
            </CardTitle>
            <CardDescription className="text-gray-400">
              {selectedPeriod === 'all' && 'All-time rankings'}
              {selectedPeriod === 'monthly' && 'This month\'s rankings'}
              {selectedPeriod === 'weekly' && 'This week\'s rankings'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-dark">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Rank</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">User</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Country</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Points</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Level</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Labs</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Streak</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeaderboard.map((entry, index) => (
                    <tr 
                      key={entry.user.id}
                      className={`border-b border-border-dark hover:bg-deep-black/50 transition-colors ${
                        entry.user.id === currentUser?.id ? 'bg-neon-green/5' : ''
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          {getRankIcon(index + 1)}
                          {entry.user.id === currentUser?.id && (
                            <Badge className={`${getRankBadgeColor(index + 1)} border text-xs`}>
                              YOU
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-deep-black rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-gray-400" />
                          </div>
                          <div>
                            <div className="font-medium text-white">
                              {entry.user.displayName}
                            </div>
                            <div className="text-sm text-gray-400">
                              @{entry.user.username}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <span>{getCountryFlag(entry.user.country)}</span>
                          <span className="text-gray-400">{entry.user.country}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-neon-cyan font-bold">{entry.points.toLocaleString()}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-yellow-400 font-medium">{entry.level}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Target className="h-4 w-4 text-neon-green" />
                          <span className="text-neon-green font-medium">{entry.labsCompleted}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <div className="text-orange-500 font-medium">{entry.streak}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-1">
                          {entry.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-400" />}
                          {entry.trend === 'down' && <TrendingUp className="h-4 w-4 text-red-400 rotate-180" />}
                          {entry.trend === 'stable' && <div className="h-4 w-4 bg-gray-500 rounded-full"></div>}
                          {entry.trend === 'new' && <Star className="h-4 w-4 text-yellow-400" />}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredLeaderboard.length === 0 && (
              <div className="text-center py-16">
                <Users className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  No users found
                </h3>
                <p className="text-gray-400 mb-6">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('global');
                    setSelectedPeriod('all');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Performers */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-surface-black border-border-dark">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center">
                <Crown className="h-5 w-5 mr-2 text-yellow-400" />
                Top Countries
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {['US', 'UK', 'DE'].map((country, index) => {
                const countryUsers = mockLeaderboard.filter(u => u.user.country === country);
                return (
                  <div key={country} className="flex items-center justify-between p-3 bg-deep-black rounded-lg">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getCountryFlag(country)}</span>
                      <span className="text-white font-medium">{country}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-neon-cyan font-bold">{countryUsers.length}</div>
                      <div className="text-xs text-gray-500">users</div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="bg-surface-black border-border-dark">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center">
                <Award className="h-5 w-5 mr-2 text-neon-green" />
                Lab Masters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockLeaderboard
                .filter(u => u.labsCompleted > 0)
                .sort((a, b) => b.labsCompleted - a.labsCompleted)
                .slice(0, 5)
                .map((entry, index) => (
                  <div key={entry.user.id} className="flex items-center justify-between p-3 bg-deep-black rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Badge className={`${getRankBadgeColor(index + 1)} border text-xs`}>
                        #{index + 1}
                      </Badge>
                      <span className="text-white text-sm">{entry.user.displayName}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-neon-green font-bold">{entry.labsCompleted}</div>
                      <div className="text-xs text-gray-500">labs</div>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>

          <Card className="bg-surface-black border-border-dark">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center">
                <Star className="h-5 w-5 mr-2 text-yellow-400" />
                Rising Stars
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockLeaderboard
                .filter(u => u.trend === 'up')
                .sort((a, b) => b.points - a.points)
                .slice(0, 5)
                .map((entry, index) => (
                  <div key={entry.user.id} className="flex items-center justify-between p-3 bg-deep-black rounded-lg">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-white text-sm">{entry.user.displayName}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-neon-cyan font-bold">+{Math.floor(entry.points * 0.1)}</div>
                      <div className="text-xs text-gray-500">this week</div>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
