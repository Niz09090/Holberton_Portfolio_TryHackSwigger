'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/shared/Navbar';
import { 
  Shield, 
  Clock, 
  BookOpen, 
  TrendingUp,
  Award,
  Target,
  ChevronRight,
  Lock,
  Unlock
} from 'lucide-react';
import { mockBlueModules, mockBlueLabs } from '@/lib/mockData';
import { BlueLabCategory, Difficulty } from '@/lib/types';

export default function BlueTeamPage() {
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

  const getCategoryColor = (category: BlueLabCategory) => {
    switch (category) {
      case BlueLabCategory.LOG_ANALYSIS:
        return 'bg-teal-500/20 text-teal-400 border-teal-500/30';
      case BlueLabCategory.INCIDENT_RESPONSE:
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case BlueLabCategory.DIGITAL_FORENSICS:
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case BlueLabCategory.THREAT_HUNTING:
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case BlueLabCategory.NETWORK_DEFENSE:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case BlueLabCategory.MALWARE_ANALYSIS:
        return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const totalBlueLabs = mockBlueLabs.length;
  const totalBluePoints = mockBlueLabs.reduce((sum, lab) => sum + lab.points, 0);
  const completedBlueLabs = mockBlueLabs.filter(lab => lab.completedBy > 0).length;

  return (
    <div className="min-h-screen bg-deep-black text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
              <Shield className="h-8 w-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">
                Blue Team Labs
              </h1>
              <p className="text-xl text-blue-300">
                Defensive Security & Incident Response
              </p>
            </div>
          </div>
          <p className="text-gray-300 mt-4">
            Master defensive cybersecurity skills through hands-on labs in log analysis, incident response, 
            digital forensics, threat hunting, network defense, and malware analysis.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-surface-black border border-border-dark rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">
              {totalBlueLabs}
            </div>
            <div className="text-sm text-gray-400">Total Labs</div>
          </div>
          <div className="bg-surface-black border border-border-dark rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-teal-400 mb-1">
              {mockBlueLabs.filter(lab => lab.difficulty === Difficulty.EASY).length}
            </div>
            <div className="text-sm text-gray-400">Easy Labs</div>
          </div>
          <div className="bg-surface-black border border-border-dark rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-cyan-400 mb-1">
              {mockBlueLabs.filter(lab => lab.difficulty === Difficulty.MEDIUM).length}
            </div>
            <div className="text-sm text-gray-400">Medium Labs</div>
          </div>
          <div className="bg-surface-black border border-border-dark rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-indigo-400 mb-1">
              {mockBlueLabs.filter(lab => lab.difficulty === Difficulty.HARD || lab.difficulty === Difficulty.INSANE).length}
            </div>
            <div className="text-sm text-gray-400">Hard Labs</div>
          </div>
        </div>

        {/* Module Cards */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <BookOpen className="h-6 w-6 mr-2 text-blue-400" />
            Learning Modules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockBlueModules.map((module) => {
              const moduleLabs = mockBlueLabs.filter(lab => module.labs.includes(lab.id));
              const completedInModule = moduleLabs.filter(lab => lab.completedBy > 0).length;
              const moduleProgress = module.totalLabs > 0 ? (completedInModule / module.totalLabs) * 100 : 0;
              
              return (
                <Link 
                  key={module.id} 
                  href={`/blue-team/${module.slug}`}
                  className="group"
                >
                  <Card className="bg-surface-black border-border-dark hover:border-blue-500/50 transition-all duration-300 h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <div className="text-4xl">{module.icon}</div>
                        <Badge className={`${getCategoryColor(module.category)} border`}>
                          {module.totalLabs} Labs
                        </Badge>
                      </div>
                      <CardTitle className="text-white text-xl group-hover:text-blue-400 transition-colors">
                        {module.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400 mt-2">
                        {module.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Progress Bar */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-blue-400 font-medium">{moduleProgress.toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-deep-black rounded-full h-2 border border-border-dark">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${moduleProgress}%` }}
                          />
                        </div>
                      </div>

                      {/* Module Stats */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2 text-gray-400">
                          <Clock className="h-4 w-4" />
                          <span>{module.estimatedHours}h</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400">
                          <Award className="h-4 w-4" />
                          <span>{moduleLabs.reduce((sum, lab) => sum + lab.points, 0)} pts</span>
                        </div>
                      </div>

                      {/* Action */}
                      <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                        <span className="text-sm font-medium">Start Learning</span>
                        <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Featured Labs */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Target className="h-6 w-6 mr-2 text-teal-400" />
            Featured Labs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockBlueLabs.slice(0, 6).map((lab) => (
              <Card key={lab.id} className="bg-surface-black border-border-dark hover:border-teal-500/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={`${getDifficultyColor(lab.difficulty)} border`}>
                      {lab.difficulty}
                    </Badge>
                    <Badge className="bg-teal-500/20 text-teal-400 border-teal-500/30">
                      {lab.points} pts
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-lg">
                    {lab.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 mt-1 line-clamp-2">
                    {lab.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <Badge variant="outline" className="text-gray-400 border-gray-600">
                      {lab.category}
                    </Badge>
                    <Badge className={`${lab.labType === 'Guided' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-purple-500/20 text-purple-400 border-purple-500/30'} border`}>
                      {lab.labType}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{lab.estimatedTime}m</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-3 w-3" />
                      <span>{lab.completedBy}</span>
                    </div>
                  </div>

                  {lab.pairedRedLabId && (
                    <div className="flex items-center space-x-2 text-xs text-purple-400 bg-purple-500/10 border border-purple-500/30 rounded p-2">
                      <Award className="h-3 w-3" />
                      <span>Purple Team Lab</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Getting Started */}
        <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Unlock className="h-5 w-5 mr-2 text-blue-400" />
              Getting Started with Blue Team
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-blue-400 font-medium">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-sm font-bold border border-blue-500/30">1</div>
                  <span>Choose a Module</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Start with Log Analysis / SIEM if you're new to Blue Team operations.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-cyan-400 font-medium">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center text-sm font-bold border border-cyan-500/30">2</div>
                  <span>Complete Labs</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Work through guided labs first, then try scenario-based challenges.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-teal-400 font-medium">
                  <div className="w-8 h-8 bg-teal-500/20 rounded-full flex items-center justify-center text-sm font-bold border border-teal-500/30">3</div>
                  <span>Earn Badges</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Complete labs in both RED and BLUE to earn the Full Spectrum badge.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
