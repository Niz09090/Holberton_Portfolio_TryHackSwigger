'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/shared/Navbar';
import { 
  Trophy, 
  Users, 
  Clock, 
  Target, 
  Star,
  Zap,
  Play,
  Calendar,
  TrendingUp,
  Award,
  Crown,
  Medal,
  Timer,
  Flag,
  Lock,
  Eye,
  CheckCircle,
  Search,
  User
} from 'lucide-react';
import { mockRaces } from '@/lib/mockData';

export default function CompetePage() {
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'active' | 'completed'>('upcoming');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter races
  const filteredRaces = useMemo(() => {
    let races = mockRaces;

    // Filter by search term
    if (searchTerm) {
      races = races.filter(race => 
        race.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        race.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by tab
    if (selectedTab === 'upcoming') {
      races = races.filter(race => race.status === 'upcoming');
    } else if (selectedTab === 'active') {
      races = races.filter(race => race.status === 'active');
    } else if (selectedTab === 'completed') {
      races = races.filter(race => race.status === 'completed');
    }

    return races;
  }, [searchTerm, selectedTab]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'completed':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'solo':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'team':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'tournament':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getPrizePool = (prizePool: number) => {
    if (prizePool >= 1000) {
      return `${(prizePool / 1000).toFixed(1)}k`;
    }
    return prizePool.toString();
  };

  return (
    <div className="min-h-screen bg-deep-black text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Competitions
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Join live competitions and race against hackers worldwide
          </p>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-surface-black border border-border-dark rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-neon-green mb-1">
                {mockRaces.filter(r => r.status === 'active').length}
              </div>
              <div className="text-sm text-gray-400">Active Races</div>
            </div>
            <div className="bg-surface-black border border-border-dark rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-neon-cyan mb-1">
                {mockRaces.filter(r => r.status === 'upcoming').length}
              </div>
              <div className="text-sm text-gray-400">Upcoming</div>
            </div>
            <div className="bg-surface-black border border-border-dark rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-1">
                {mockRaces.reduce((sum, r) => sum + (r.prizePool || 0), 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Total Prize Pool</div>
            </div>
            <div className="bg-surface-black border border-border-dark rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">
                {mockRaces.filter(r => r.participants.length > 0).reduce((sum, r) => sum + r.participants.length, 0)}
              </div>
              <div className="text-sm text-gray-400">Total Participants</div>
            </div>
          </div>

          {/* Search and Tabs */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search competitions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-surface-black border border-border-dark rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/20 transition-all"
              />
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant={selectedTab === 'upcoming' ? 'neon' : 'outline'}
                onClick={() => setSelectedTab('upcoming')}
                className="btn-neon"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Upcoming
              </Button>
              
              <Button
                variant={selectedTab === 'active' ? 'neon' : 'outline'}
                onClick={() => setSelectedTab('active')}
                className="btn-neon"
              >
                <Zap className="mr-2 h-4 w-4" />
                Active
              </Button>
              
              <Button
                variant={selectedTab === 'completed' ? 'neon' : 'outline'}
                onClick={() => setSelectedTab('completed')}
                className="btn-neon"
              >
                <Trophy className="mr-2 h-4 w-4" />
                Completed
              </Button>
            </div>
          </div>
        </div>

        {/* Races Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRaces.map((race) => (
            <Card key={race.id} className="bg-surface-black border-border-dark card-hover">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <Badge className={`${getStatusColor(race.status)} border`}>
                    {race.status === 'upcoming' && 'Starts Soon'}
                    {race.status === 'active' && 'Live Now'}
                    {race.status === 'completed' && 'Completed'}
                  </Badge>
                  
                  <div className="flex items-center space-x-2">
                    <Badge className={`${getTypeColor(race.type)} border text-xs`}>
                      {race.type}
                    </Badge>
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                      {getPrizePool(race.prizePool || 0)} pts
                    </Badge>
                  </div>
                </div>
                
                <CardTitle className="text-white text-lg">
                  {race.title}
                </CardTitle>
                <CardDescription className="text-gray-300">
                  {race.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Race Info */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-400">
                        {formatTime(race.duration || 0)}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-400">
                        {race.participants.length} participants
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-400">
                        {race.challenges.length} challenges
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-neon-cyan font-bold">
                      {new Date(race.startTime).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {race.status === 'upcoming' && 'Starts'}
                      {race.status === 'active' && 'Started'}
                      {race.status === 'completed' && 'Ended'}
                    </div>
                  </div>
                </div>

                {/* Top Participants */}
                {race.participants.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-white font-medium mb-2">Top Participants</h4>
                    <div className="space-y-2">
                      {race.participants.slice(0, 3).map((participant, index) => (
                        <div key={participant.userId} className="flex items-center justify-between p-2 bg-deep-black rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <div className="w-8 h-8 bg-deep-black rounded-full flex items-center justify-center border-2">
                                <User className="h-4 w-4 text-gray-400" />
                              </div>
                              {index === 0 && (
                                <Crown className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400" />
                              )}
                              {index === 1 && (
                                <Medal className="absolute -top-1 -right-1 h-4 w-4 text-gray-300" />
                              )}
                              {index === 2 && (
                                <Medal className="absolute -top-1 -right-1 h-4 w-4 text-orange-600" />
                              )}
                            </div>
                            <div>
                              <div className="text-white font-medium">{participant.username}</div>
                              <div className="text-sm text-gray-400">{participant.points} pts</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-neon-green font-bold">{participant.rank}</div>
                            <div className="text-xs text-gray-500">#{participant.rank}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    {race.status === 'upcoming' && (() => {
                      const daysUntil = Math.ceil((new Date(race.startTime).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                      return daysUntil > 0 ? `Starts in ${daysUntil} days` : 'Registration Closed';
                    })()}
                    {race.status === 'active' && `${Math.floor((new Date().getTime() - new Date(race.startTime).getTime()) / (1000 * 60))} min elapsed`}
                    {race.status === 'completed' && 'Race finished'}
                  </div>
                  
                  <Button 
                    variant="neon"
                    className="btn-neon"
                    asChild
                  >
                    <Link href={`/compete/${race.id}`}>
                      {race.status === 'upcoming' && (
                        <>
                          <Lock className="mr-2 h-4 w-4" />
                          Register
                        </>
                      )}
                      {race.status === 'active' && (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Join Race
                        </>
                      )}
                      {race.status === 'completed' && (
                        <>
                          <Eye className="mr-2 h-4 w-4" />
                          View Results
                        </>
                      )}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredRaces.length === 0 && (
          <div className="text-center py-16">
            <Trophy className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No competitions found
            </h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedTab('upcoming');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Competition Tips */}
        <div className="mt-16">
          <Card className="bg-surface-black border-border-dark">
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center">
                <Award className="h-5 w-5 mr-2 text-neon-green" />
                Competition Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="text-white font-semibold flex items-center">
                    <Target className="h-4 w-4 mr-2 text-neon-cyan" />
                    Practice First
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Complete practice labs and challenges before joining competitions to improve your skills and reaction time.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-white font-semibold flex items-center">
                    <Timer className="h-4 w-4 mr-2 text-neon-cyan" />
                    Time Management
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Read all challenges carefully and plan your approach. Don't rush through problems without understanding them.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-white font-semibold flex items-center">
                    <Users className="h-4 w-4 mr-2 text-neon-cyan" />
                    Learn Strategies
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Study common attack patterns and defense strategies. Watch replays from top performers to learn new techniques.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-white font-semibold flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-neon-cyan" />
                    Stay Calm
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Competitions can be intense. Stay focused and calm under pressure. Take breaks when needed.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-white font-semibold flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-neon-cyan" />
                    Learn from Losses
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Review your mistakes and understand what went wrong. Every loss is a learning opportunity.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-white font-semibold flex items-center">
                    <Flag className="h-4 w-4 mr-2 text-neon-cyan" />
                    Join Community
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Connect with other hackers in our forum and Discord. Share tips and learn from experienced competitors.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-white font-semibold flex items-center">
                    <Crown className="h-4 w-4 mr-2 text-neon-cyan" />
                    Have Fun
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Remember that competitions are about learning and growth. Enjoy the process and celebrate small wins.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
