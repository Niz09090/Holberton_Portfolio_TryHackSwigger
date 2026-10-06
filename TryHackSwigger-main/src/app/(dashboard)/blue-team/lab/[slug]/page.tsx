'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/shared/Navbar';
import { 
  Shield, 
  Clock, 
  Trophy, 
  Star,
  Users,
  ArrowLeft,
  Play,
  Square,
  Lightbulb,
  BookOpen,
  Wrench,
  CheckCircle,
  XCircle,
  AlertCircle,
  Award,
  Terminal,
  ExternalLink
} from 'lucide-react';
import { mockBlueLabs, mockLabs } from '@/lib/mockData';
import { BlueLabCategory, Difficulty, LabType } from '@/lib/types';

export default function BlueLabDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const lab = mockBlueLabs.find(lab => lab.slug === slug);

  if (!lab) {
    return (
      <div className="min-h-screen bg-deep-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Lab Not Found</h1>
          <p className="text-gray-300 mb-8">The lab you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/blue-team">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blue Team
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const [machineStatus, setMachineStatus] = useState<'stopped' | 'starting' | 'running' | 'stopping'>('stopped');
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [flag, setFlag] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [hintsUnlocked, setHintsUnlocked] = useState(false);
  const [solutionUnlocked, setSolutionUnlocked] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'correct' | 'incorrect'>('idle');
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [points, setPoints] = useState(1000);
  const [isSolved, setIsSolved] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (machineStatus === 'running' && timeRemaining !== null) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev !== null && prev > 0) {
            return prev - 1;
          }
          return 0;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [machineStatus, timeRemaining]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const startMachine = () => {
    if (!lab.dockerImage) return;
    setMachineStatus('starting');
    setTimeout(() => {
      setMachineStatus('running');
      setTimeRemaining(1800);
    }, 3000);
  };

  const stopMachine = () => {
    setMachineStatus('stopping');
    setTimeout(() => {
      setMachineStatus('stopped');
      setTimeRemaining(null);
    }, 2000);
  };

  const submitFlag = async () => {
    if (flag.trim() && !isSolved) {
      setSubmissionStatus('loading');
      
      setTimeout(() => {
        if (flag.trim() === lab.flag) {
          setSubmissionStatus('correct');
          setSubmissionMessage('Correct flag! Well done!');
          setPoints(prev => prev + lab.points);
          setIsSolved(true);
          setFlag('');
          setTimeout(() => {
            setSubmissionStatus('idle');
          }, 5000);
        } else {
          setWrongAttempts(prev => prev + 1);
          const penalty = wrongAttempts >= 2 ? -5 : 0;
          if (penalty < 0) {
            setPoints(prev => prev + penalty);
            setSubmissionStatus('incorrect');
            setSubmissionMessage(`Incorrect flag. -5 points penalty (attempt ${wrongAttempts + 1})`);
          } else {
            setSubmissionStatus('incorrect');
            setSubmissionMessage(`Incorrect flag. Try again! (attempt ${wrongAttempts + 1})`);
          }
          setTimeout(() => {
            setSubmissionStatus('idle');
          }, 3000);
        }
      }, 1000);
    }
  };

  const unlockHints = () => {
    const hintCost = Math.floor(lab.points * 0.1);
    if (points >= hintCost) {
      setPoints(prev => prev - hintCost);
      setHintsUnlocked(true);
      setShowHints(true);
    }
  };

  const unlockSolution = () => {
    const solutionCost = Math.floor(lab.points * 0.3);
    if (points >= solutionCost) {
      setPoints(prev => prev - solutionCost);
      setSolutionUnlocked(true);
      setShowSolution(true);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'Medium':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Hard':
        return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
      case 'Insane':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getLabTypeColor = (type: LabType) => {
    return type === LabType.GUIDED 
      ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      : 'bg-purple-500/20 text-purple-400 border-purple-500/30';
  };

  const hintCost = Math.floor(lab.points * 0.1);
  const solutionCost = Math.floor(lab.points * 0.3);

  // Find paired RED lab if exists
  const pairedRedLab = lab.pairedRedLabId ? mockLabs.find(l => l.id === lab.pairedRedLabId) : null;

  return (
    <div className="min-h-screen bg-deep-black text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="outline" asChild className="mb-4">
            <Link href={`/blue-team/${lab.category.toLowerCase().replace(/\s+/g, '-').replace('/', '-')}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Module
            </Link>
          </Button>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <Badge className={`${getDifficultyColor(lab.difficulty)} border`}>
                  {lab.difficulty}
                </Badge>
                <Badge className={`${getLabTypeColor(lab.labType)} border`}>
                  {lab.labType}
                </Badge>
                <div className="flex items-center space-x-1 text-blue-400">
                  <Trophy className="h-4 w-4" />
                  <span className="text-sm font-bold">{lab.points} pts</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {lab.title}
              </h1>
              <p className="text-xl text-gray-300">
                {lab.description}
              </p>
            </div>
          </div>
        </div>

        {/* Purple Team Badge */}
        {pairedRedLab && (
          <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 mb-8">
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center">
                <Award className="h-5 w-5 mr-2 text-purple-400" />
                Purple Team Lab
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 mb-2">
                    This lab is paired with a RED Team lab. Complete both to earn the Purple Team badge!
                  </p>
                  <Link href={`/labs/${pairedRedLab.slug}`}>
                    <Button variant="outline" size="sm" className="text-purple-400 border-purple-500/30">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Paired RED Lab: {pairedRedLab.title}
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Machine Control */}
            {lab.dockerImage && (
              <Card className="bg-surface-black border-border-dark">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Terminal className="h-5 w-5 mr-2 text-blue-400" />
                    Lab Environment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          machineStatus === 'running' ? 'bg-green-500 animate-pulse' :
                          machineStatus === 'starting' ? 'bg-yellow-500 animate-pulse' :
                          machineStatus === 'stopping' ? 'bg-orange-500 animate-pulse' :
                          'bg-gray-500'
                        }`} />
                        <span className="text-gray-300">
                          Status: <span className="font-medium text-white">{machineStatus.toUpperCase()}</span>
                        </span>
                      </div>
                      {timeRemaining !== null && (
                        <div className="flex items-center space-x-2 text-gray-300">
                          <Clock className="h-4 w-4" />
                          <span className="font-mono">{formatTime(timeRemaining)}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex space-x-3">
                      {machineStatus === 'stopped' ? (
                        <Button 
                          onClick={startMachine}
                          className="bg-blue-500 hover:bg-blue-600"
                          disabled={!lab.dockerImage}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Start Machine
                        </Button>
                      ) : machineStatus === 'running' ? (
                        <Button 
                          onClick={stopMachine}
                          variant="destructive"
                        >
                          <Square className="h-4 w-4 mr-2" />
                          Stop Machine
                        </Button>
                      ) : (
                        <Button disabled>
                          {machineStatus === 'starting' ? 'Starting...' : 'Stopping...'}
                        </Button>
                      )}
                      
                      {lab.ports.length > 0 && machineStatus === 'running' && (
                        <Button variant="outline">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Open in Browser
                        </Button>
                      )}
                    </div>

                    {lab.dockerImage && (
                      <div className="text-sm text-gray-400">
                        <span className="font-medium">Docker Image:</span> {lab.dockerImage}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Learning Objectives */}
            <Card className="bg-surface-black border-border-dark">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-blue-400" />
                  Learning Objectives
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {lab.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start space-x-2 text-gray-300">
                      <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Tools */}
            <Card className="bg-surface-black border-border-dark">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Wrench className="h-5 w-5 mr-2 text-blue-400" />
                  Tools Required
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {lab.tools.map((tool, index) => (
                    <Badge key={index} variant="outline" className="text-gray-300 border-gray-600">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Prerequisites */}
            {lab.prerequisites && lab.prerequisites.length > 0 && (
              <Card className="bg-surface-black border-border-dark">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-yellow-400" />
                    Prerequisites
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {lab.prerequisites.map((prereq, index) => (
                      <li key={index} className="text-gray-300">
                        • {prereq}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Hints */}
            <Card className="bg-surface-black border-border-dark">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2 text-yellow-400" />
                    Hints
                  </CardTitle>
                  {!hintsUnlocked && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={unlockHints}
                      disabled={points < hintCost}
                    >
                      Unlock ({hintCost} pts)
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {hintsUnlocked ? (
                  <div className="space-y-3">
                    {lab.hints.map((hint, index) => (
                      <div key={index} className="bg-deep-black border border-border-dark rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-blue-400">Hint {index + 1}</span>
                          <Badge variant="outline" className="text-xs text-gray-400">
                            -{hint.cost} pts
                          </Badge>
                        </div>
                        <p className="text-gray-300 text-sm">{hint.text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">
                    Unlock hints to get help with this lab. Each hint costs points.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Solution */}
            {lab.solution && (
              <Card className="bg-surface-black border-border-dark">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-purple-400" />
                      Solution
                    </CardTitle>
                    {!solutionUnlocked && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={unlockSolution}
                        disabled={points < solutionCost}
                      >
                        Unlock ({solutionCost} pts)
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {solutionUnlocked ? (
                    <div className="bg-deep-black border border-border-dark rounded-lg p-4">
                      <p className="text-gray-300">{lab.solution}</p>
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm">
                      Unlock the solution to see the step-by-step walkthrough.
                    </p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card className="bg-surface-black border-border-dark">
              <CardHeader>
                <CardTitle className="text-white">Lab Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Difficulty</span>
                  <Badge className={`${getDifficultyColor(lab.difficulty)} border`}>
                    {lab.difficulty}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Points</span>
                  <span className="text-white font-medium">{lab.points}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Est. Time</span>
                  <span className="text-white font-medium">{lab.estimatedTime} min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Completed By</span>
                  <span className="text-white font-medium">{lab.completedBy}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-medium">{lab.rating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Flag Submission */}
            {lab.flag && (
              <Card className="bg-surface-black border-border-dark">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
                    Submit Flag
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Enter flag here..."
                      value={flag}
                      onChange={(e) => setFlag(e.target.value)}
                      disabled={isSolved}
                      className="w-full px-4 py-3 bg-deep-black border border-border-dark rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all font-mono"
                    />
                  </div>
                  
                  {submissionStatus !== 'idle' && (
                    <div className={`p-3 rounded-lg border ${
                      submissionStatus === 'correct' 
                        ? 'bg-green-500/20 border-green-500/30 text-green-400' 
                        : 'bg-red-500/20 border-red-500/30 text-red-400'
                    }`}>
                      <div className="flex items-center space-x-2">
                        {submissionStatus === 'correct' ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <XCircle className="h-5 w-5" />
                        )}
                        <span className="text-sm font-medium">{submissionMessage}</span>
                      </div>
                    </div>
                  )}

                  <Button 
                    className="w-full bg-blue-500 hover:bg-blue-600"
                    onClick={submitFlag}
                    disabled={!flag.trim() || isSolved || submissionStatus === 'loading'}
                  >
                    {isSolved ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Solved
                      </>
                    ) : submissionStatus === 'loading' ? (
                      'Submitting...'
                    ) : (
                      'Submit Flag'
                    )}
                  </Button>

                  {isSolved && (
                    <div className="text-center text-green-400 text-sm">
                      +{lab.points} points earned!
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* User Points */}
            <Card className="bg-surface-black border-border-dark">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
                  Your Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">{points}</div>
                  <p className="text-gray-400 text-sm">Total Blue Team Points</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
