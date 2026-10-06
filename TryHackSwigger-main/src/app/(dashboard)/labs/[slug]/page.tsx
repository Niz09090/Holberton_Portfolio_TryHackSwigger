'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/shared/Navbar';
import MachineDeploy from '@/components/labs/MachineDeploy';
import { 
  Terminal, 
  Clock, 
  Target, 
  Star,
  Play,
  Pause,
  Square,
  Check,
  AlertCircle,
  Lightbulb,
  Users,
  Eye,
  EyeOff,
  Zap,
  Shield,
  Lock,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { mockLabs } from '@/lib/mockData';

export default function LabDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const lab = mockLabs.find(lab => lab.slug === slug);

  if (!lab) {
    return (
      <div className="min-h-screen bg-deep-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Lab Not Found</h1>
          <p className="text-gray-300 mb-8">The lab you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/labs">
              <Terminal className="mr-2 h-4 w-4" />
              Back to Labs
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
  const [points, setPoints] = useState(1000); // Mock user points
  const [isSolved, setIsSolved] = useState(false);

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
    setMachineStatus('starting');
    setTimeout(() => {
      setMachineStatus('running');
      setTimeRemaining(1800); // 30 minutes
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
      
      try {
        const response = await fetch('/api/labs/flag', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            labId: lab.id,
            flag: flag.trim(),
            userId: '1', // Mock user ID
          }),
        });

        const data = await response.json();

        if (data.correct) {
          setSubmissionStatus('correct');
          setSubmissionMessage(data.message);
          setPoints(prev => prev + data.points);
          setIsSolved(true);
          setFlag('');
          
          // Confetti effect could be added here
          setTimeout(() => {
            setSubmissionStatus('idle');
          }, 5000);
        } else {
          setSubmissionStatus('incorrect');
          setSubmissionMessage(data.message);
          setTimeout(() => {
            setSubmissionStatus('idle');
          }, 3000);
        }
      } catch (error) {
        console.error('Flag submission error:', error);
        setSubmissionStatus('incorrect');
        setSubmissionMessage('Error submitting flag. Please try again.');
        setTimeout(() => {
          setSubmissionStatus('idle');
        }, 3000);
      }
    }
  };

  const unlockHints = () => {
    if (points >= 50) {
      setPoints(prev => prev - 50);
      setHintsUnlocked(true);
      setShowHints(true);
    }
  };

  const unlockSolution = () => {
    if (points >= 150) {
      setPoints(prev => prev - 150);
      setSolutionUnlocked(true);
      setShowSolution(true);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
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
  };

  if (!lab) {
    return (
      <div className="min-h-screen bg-deep-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Lab Not Found</h1>
          <p className="text-gray-400 mb-8">The lab you're looking for doesn't exist.</p>
          <Button variant="neon" asChild>
            <Link href="/labs">
              Back to Labs
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-deep-black text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Lab Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <Badge className={`${getDifficultyColor(lab.difficulty)} border`}>
                  {lab.difficulty}
                </Badge>
                <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
                  {lab.points} pts
                </Badge>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  {lab.category}
                </Badge>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {lab.title}
              </h1>
              <p className="text-xl text-gray-300">
                {lab.description}
              </p>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-400 mb-2">Your Points</div>
              <div className="text-2xl font-bold text-neon-cyan">{points}</div>
            </div>
          </div>

          {/* Machine Controls */}
          <MachineDeploy 
            labId={lab.id}
            dockerImage={lab.dockerImage}
            ports={lab.ports}
            terminalEnabled={lab.terminalEnabled}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Learning Objectives */}
            <Card className="bg-surface-black border-border-dark">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center">
                  <Target className="h-5 w-5 mr-2 text-neon-green" />
                  Learning Objectives
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {lab.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="h-4 w-4 text-neon-green mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Flag Submission */}
            <Card className="bg-surface-black border-border-dark">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-neon-cyan" />
                  Submit Flag
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="flag" className="text-sm font-medium text-gray-300">
                    Enter the flag you found:
                  </label>
                  <div className="flex space-x-3">
                    <input
                      id="flag"
                      type="text"
                      value={flag}
                      onChange={(e) => setFlag(e.target.value)}
                      placeholder="flag{format}"
                      disabled={isSolved || submissionStatus === 'loading'}
                      className="flex-1 px-4 py-3 bg-deep-black border border-border-dark rounded-lg text-white placeholder-gray-500 font-mono focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/20 transition-all disabled:opacity-50"
                    />
                    <Button 
                      type="button"
                      variant="neon"
                      onClick={submitFlag}
                      disabled={isSolved || submissionStatus === 'loading' || !flag.trim()}
                      className="btn-neon min-w-[100px]"
                    >
                      {submissionStatus === 'loading' ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-neon-green border-t-transparent rounded-full animate-spin mr-2"></div>
                          Submitting
                        </div>
                      ) : isSolved ? (
                        'Solved'
                      ) : (
                        'Submit'
                      )}
                    </Button>
                  </div>
                </div>

                {submissionStatus === 'correct' && (
                  <div className="flex items-center space-x-2 text-neon-green bg-neon-green/10 border border-neon-green/30 rounded-lg p-3">
                    <Check className="h-5 w-5" />
                    <span className="font-medium">{submissionMessage}</span>
                  </div>
                )}

                {submissionStatus === 'incorrect' && (
                  <div className="flex items-center space-x-2 text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <AlertCircle className="h-5 w-5" />
                    <span className="font-medium">{submissionMessage}</span>
                  </div>
                )}

                {isSolved && (
                  <div className="flex items-center space-x-2 text-neon-cyan bg-neon-cyan/10 border border-neon-cyan/30 rounded-lg p-3">
                    <Star className="h-5 w-5" />
                    <span className="font-medium">Lab completed! You earned {lab.points} points.</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Hints Section */}
            <Card className="bg-surface-black border-border-dark">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center justify-between">
                  <div className="flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2 text-yellow-400" />
                    Hints
                  </div>
                  {!hintsUnlocked && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={unlockHints}
                      disabled={points < 50}
                      className="text-xs"
                    >
                      Unlock (50 pts)
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {hintsUnlocked ? (
                  <div className="space-y-4">
                    {lab.hints.map((hint, index) => (
                      <div key={index} className="p-4 bg-deep-black border border-border-dark rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-neon-green font-medium">Hint {index + 1}</span>
                          <span className="text-gray-500 text-sm">Cost: {hint.cost} pts</span>
                        </div>
                        <p className="text-gray-300">{hint.text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Lock className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400 mb-4">
                      Unlock hints for 50 points to get help when you're stuck.
                    </p>
                    <Button 
                      variant="neon"
                      onClick={unlockHints}
                      disabled={points < 50}
                      className="btn-neon"
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      Unlock Hints (50 pts)
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Solution Section */}
            <Card className="bg-surface-black border-border-dark">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center justify-between">
                  <div className="flex items-center">
                    <Eye className="h-5 w-5 mr-2 text-purple-400" />
                    Solution
                  </div>
                  {!solutionUnlocked && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={unlockSolution}
                      disabled={points < 150}
                      className="text-xs"
                    >
                      Unlock (150 pts)
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {solutionUnlocked ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-deep-black border border-purple-500/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-purple-400 font-medium">Complete Solution</span>
                        <span className="text-gray-500 text-sm">Cost: 150 pts</span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-white font-medium mb-2">Step 1: Initial Reconnaissance</h4>
                          <p className="text-gray-300 font-mono text-sm bg-black/30 p-3 rounded">
                            $ nmap -sV -sC -p 80 target.com
                          </p>
                        </div>
                        <div>
                          <h4 className="text-white font-medium mb-2">Step 2: Exploit the Vulnerability</h4>
                          <p className="text-gray-300 font-mono text-sm bg-black/30 p-3 rounded">
                            $ python exploit.py target.com 80
                          </p>
                        </div>
                        <div>
                          <h4 className="text-white font-medium mb-2">Step 3: Get the Flag</h4>
                          <p className="text-gray-300 font-mono text-sm bg-black/30 p-3 rounded">
                            $ cat /home/user/flag.txt<br/>
                            flag{lab.flag}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <EyeOff className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400 mb-4">
                      Unlock the complete solution for 150 points to see the step-by-step walkthrough.
                    </p>
                    <Button 
                      variant="neon"
                      onClick={unlockSolution}
                      disabled={points < 150}
                      className="btn-neon"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Unlock Solution (150 pts)
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Lab Info */}
            <Card className="bg-surface-black border-border-dark">
              <CardHeader>
                <CardTitle className="text-white text-lg">Lab Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Difficulty</span>
                  <Badge className={`${getDifficultyColor(lab.difficulty)} border`}>
                    {lab.difficulty}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Category</span>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    {lab.category}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Points</span>
                  <span className="text-neon-green font-medium">{lab.points}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Time Limit</span>
                  <span className="text-neon-cyan font-medium">{lab.estimatedTime} minutes</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Completions</span>
                  <span className="text-white font-medium">{lab.completions}</span>
                </div>
              </CardContent>
            </Card>

            {/* Similar Labs */}
            <Card className="bg-surface-black border-border-dark">
              <CardHeader>
                <CardTitle className="text-white text-lg">Similar Labs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockLabs
                  .filter(l => l.category === lab.category && l.id !== lab.id)
                  .slice(0, 4)
                  .map(similarLab => (
                    <Link 
                      key={similarLab.id}
                      href={`/labs/${similarLab.slug}`}
                      className="block p-3 bg-deep-black border border-border-dark rounded-lg hover:border-neon-green/50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium text-sm">{similarLab.title}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={`${getDifficultyColor(similarLab.difficulty)} border text-xs`}>
                              {similarLab.difficulty}
                            </Badge>
                            <span className="text-neon-green text-xs">{similarLab.points} pts</span>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-500" />
                      </div>
                    </Link>
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
                  <Link href="/labs">
                    <Terminal className="mr-2 h-4 w-4" />
                    Back to Labs
                  </Link>
                </Button>
                
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/forum">
                    <Users className="mr-2 h-4 w-4" />
                    Discuss in Forum
                  </Link>
                </Button>
                
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href={`/learn/${lab.category.toLowerCase().replace(' ', '-')}`}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Learning Path
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
