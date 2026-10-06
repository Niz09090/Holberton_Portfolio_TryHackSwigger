'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/shared/Navbar';
import { 
  Trophy, 
  Clock, 
  Users, 
  Target,
  Play,
  Pause,
  Square,
  Check,
  AlertCircle,
  ChevronRight,
  ArrowLeft,
  Star,
  Crown,
  Medal,
  Flame,
  Zap
} from 'lucide-react';
import { mockRaces } from '@/lib/mockData';

export default function RaceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const raceId = params.raceId as string;
  
  const race = mockRaces.find(r => r.id === raceId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!race) {
    return (
      <div className="min-h-screen bg-deep-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Race Not Found</h1>
          <p className="text-gray-300 mb-8">The race you're looking for doesn't exist.</p>
          <Button variant="neon" asChild>
            <Link href="/compete">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Competitions
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const [isRegistered, setIsRegistered] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Calculate days remaining for upcoming races
  const daysRemaining = race.status === 'upcoming' 
    ? Math.ceil((new Date(race.startTime).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  useEffect(() => {
    if (race.status === 'active') {
      const endTime = new Date(race.endTime).getTime();
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const remaining = Math.max(0, endTime - now);
        setTimeRemaining(remaining);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [race]);

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleRegister = () => {
    setIsRegistered(true);
    alert('Registration successful! You will be notified when the race starts.');
  };

  const handleJoinRace = () => {
    alert('Joining race...');
  };

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

  return (
    <div className="min-h-screen bg-deep-black text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="outline" className="mb-6" asChild>
          <Link href="/compete">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Competitions
          </Link>
        </Button>

        {/* Race Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <Badge className={`${getStatusColor(race.status)} border`}>
                  {race.status === 'upcoming' && 'Upcoming'}
                  {race.status === 'active' && 'Live Now'}
                  {race.status === 'completed' && 'Completed'}
                </Badge>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                  {race.type}
                </Badge>
                {race.prizePool && (
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                    {race.prizePool} pts prize pool
                  </Badge>
                )}
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {race.title}
              </h1>
              <p className="text-xl text-gray-300">
                {race.description}
              </p>
            </div>
          </div>

          {/* Race Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-surface-black border border-border-dark rounded-lg p-4 text-center">
              <Clock className="h-6 w-6 text-neon-cyan mx-auto mb-2" />
              <div className="text-2xl font-bold text-white mb-1">
                {race.duration ? `${race.duration}m` : 'N/A'}
              </div>
              <div className="text-sm text-gray-400">Duration</div>
            </div>
            <div className="bg-surface-black border border-border-dark rounded-lg p-4 text-center">
              <Users className="h-6 w-6 text-neon-green mx-auto mb-2" />
              <div className="text-2xl font-bold text-white mb-1">
                {race.participants.length}
              </div>
              <div className="text-sm text-gray-400">Participants</div>
            </div>
            <div className="bg-surface-black border border-border-dark rounded-lg p-4 text-center">
              <Target className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white mb-1">
                {race.challenges.length}
              </div>
              <div className="text-sm text-gray-400">Challenges</div>
            </div>
            <div className="bg-surface-black border border-border-dark rounded-lg p-4 text-center">
              <Trophy className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white mb-1">
                {race.maxParticipants}
              </div>
              <div className="text-sm text-gray-400">Max Players</div>
            </div>
          </div>

          {/* Timer for Active Races */}
          {race.status === 'active' && timeRemaining !== null && (
            <Card className="bg-surface-black border-border-dark mb-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Flame className="h-8 w-8 text-orange-500" />
                    <div>
                      <div className="text-sm text-gray-400">Time Remaining</div>
                      <div className="text-3xl font-bold text-white">{formatTime(timeRemaining)}</div>
                    </div>
                  </div>
                  <Button 
                    variant="neon" 
                    className="btn-neon"
                    onClick={handleJoinRace}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Join Race
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Register Button for Upcoming Races */}
          {race.status === 'upcoming' && !isRegistered && (
            <Card className="bg-surface-black border-border-dark mb-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">
                      Starts on {new Date(race.startTime).toLocaleDateString()}
                    </div>
                    <div className="text-lg font-semibold text-white">
                      {daysRemaining < 0 ? 'Event Ended' : `${daysRemaining} days remaining`}
                    </div>
                  </div>
                  <Button 
                    variant={daysRemaining < 0 ? "outline" : "neon"}
                    className={daysRemaining < 0 ? "" : "btn-neon"}
                    onClick={handleRegister}
                    disabled={daysRemaining < 0}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    {daysRemaining < 0 ? 'Registration Closed' : 'Register Now'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {race.status === 'upcoming' && isRegistered && (
            <Card className="bg-neon-green/10 border-neon-green/30 mb-8">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <Check className="h-6 w-6 text-neon-green" />
                  <div>
                    <div className="text-lg font-semibold text-neon-green">You're Registered!</div>
                    <div className="text-sm text-gray-300">You'll be notified when the race starts.</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Rules */}
            <Card className="bg-surface-black border-border-dark">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-neon-cyan" />
                  Race Rules
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {race.rules.map((rule, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="h-4 w-4 text-neon-green mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{rule}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Challenges */}
            <Card className="bg-surface-black border-border-dark">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center">
                  <Target className="h-5 w-5 mr-2 text-neon-green" />
                  Challenges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {race.challenges.map((challenge, index) => (
                    <div key={challenge.id} className="p-4 bg-deep-black border border-border-dark rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="text-white font-medium mb-1">
                            Challenge {index + 1}: {challenge.title}
                          </h4>
                          <p className="text-sm text-gray-400">{challenge.description}</p>
                        </div>
                        <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
                          {challenge.points} pts
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{challenge.solves} solves</span>
                        </div>
                        {challenge.firstBloodBonus > 0 && (
                          <div className="flex items-center space-x-1">
                            <Flame className="h-3 w-3 text-orange-500" />
                            <span className="text-orange-500">+{challenge.firstBloodBonus} first blood</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Leaderboard */}
            <Card className="bg-surface-black border-border-dark">
              <CardHeader>
                <CardTitle className="text-white text-lg">Leaderboard</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {race.participants.slice(0, 10).map((participant, index) => (
                  <div key={participant.userId} className="flex items-center justify-between p-3 bg-deep-black rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-deep-black rounded-full flex items-center justify-center border-2 border-border-dark">
                        <span className="text-sm font-bold text-gray-400">#{index + 1}</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">{participant.username}</div>
                        <div className="text-sm text-gray-400">{participant.points} pts</div>
                      </div>
                    </div>
                    {index === 0 && <Crown className="h-5 w-5 text-yellow-400" />}
                    {index === 1 && <Medal className="h-5 w-5 text-gray-300" />}
                    {index === 2 && <Medal className="h-5 w-5 text-orange-600" />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="bg-surface-black border-border-dark">
              <CardHeader>
                <CardTitle className="text-white text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/forum">
                    <Users className="mr-2 h-4 w-4" />
                    Discuss in Forum
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/leaderboard">
                    <Trophy className="mr-2 h-4 w-4" />
                    Global Leaderboard
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
