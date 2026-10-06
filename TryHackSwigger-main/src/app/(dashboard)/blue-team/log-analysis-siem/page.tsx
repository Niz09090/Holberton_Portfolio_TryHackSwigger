'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/shared/Navbar';
import { 
  Shield, 
  Filter, 
  Search, 
  Clock,
  Trophy,
  Star,
  Users,
  ChevronRight,
  ArrowLeft,
  BookOpen,
  Wrench,
  Lock,
  Unlock
} from 'lucide-react';
import { mockBlueLabs, mockBlueModules } from '@/lib/mockData';
import { BlueLabCategory, Difficulty, LabType } from '@/lib/types';

export default function LogAnalysisModulePage() {
  const module = mockBlueModules.find(m => m.slug === 'log-analysis-siem');
  const moduleLabs = mockBlueLabs.filter(lab => lab.category === BlueLabCategory.LOG_ANALYSIS);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

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

  const filteredAndSortedLabs = useMemo(() => {
    let filtered = moduleLabs.filter(lab => {
      const matchesSearch = lab.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lab.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty = selectedDifficulty === 'all' || lab.difficulty === selectedDifficulty;
      const matchesType = selectedType === 'all' || lab.labType === selectedType;
      
      return matchesSearch && matchesDifficulty && matchesType;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'points-high':
          return b.points - a.points;
        case 'points-low':
          return a.points - b.points;
        case 'difficulty-easy':
          return a.difficulty === 'Easy' ? -1 : b.difficulty === 'Easy' ? 1 : 0;
        case 'difficulty-hard':
          return a.difficulty === 'Hard' ? -1 : b.difficulty === 'Hard' ? 1 : 0;
        default:
          return 0;
      }
    });
  }, [searchTerm, selectedDifficulty, selectedType, sortBy, moduleLabs]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDifficulty('all');
    setSelectedType('all');
    setSortBy('newest');
  };

  if (!module) {
    return (
      <div className="min-h-screen bg-deep-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Module Not Found</h1>
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

  const totalPoints = moduleLabs.reduce((sum, lab) => sum + lab.points, 0);
  const completedCount = moduleLabs.filter(lab => lab.completedBy > 0).length;
  const progress = module.totalLabs > 0 ? (completedCount / module.totalLabs) * 100 : 0;

  return (
    <div className="min-h-screen bg-deep-black text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="outline" asChild className="mb-4">
            <Link href="/blue-team">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blue Team
            </Link>
          </Button>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-5xl">{module.icon}</div>
                <div>
                  <h1 className="text-4xl font-bold text-white">
                    {module.title}
                  </h1>
                  <p className="text-xl text-blue-300">
                    {module.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 bg-surface-black border border-border-dark rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Module Progress</h3>
                <p className="text-gray-400 text-sm">Complete all labs to master this module</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-400">{progress.toFixed(0)}%</div>
                <div className="text-sm text-gray-400">{completedCount}/{module.totalLabs} labs</div>
              </div>
            </div>
            <div className="w-full bg-deep-black rounded-full h-3 border border-border-dark">
              <div 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-4 text-sm">
              <div className="flex items-center space-x-2 text-gray-400">
                <Trophy className="h-4 w-4" />
                <span>{totalPoints} total points available</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Clock className="h-4 w-4" />
                <span>{module.estimatedHours} hours estimated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-surface-black border border-border-dark rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">
              {moduleLabs.length}
            </div>
            <div className="text-sm text-gray-400">Total Labs</div>
          </div>
          <div className="bg-surface-black border border-border-dark rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-cyan-400 mb-1">
              {moduleLabs.filter(lab => lab.labType === LabType.GUIDED).length}
            </div>
            <div className="text-sm text-gray-400">Guided Labs</div>
          </div>
          <div className="bg-surface-black border border-border-dark rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">
              {moduleLabs.filter(lab => lab.labType === LabType.SCENARIO).length}
            </div>
            <div className="text-sm text-gray-400">Scenario Labs</div>
          </div>
          <div className="bg-surface-black border border-border-dark rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-teal-400 mb-1">
              {totalPoints}
            </div>
            <div className="text-sm text-gray-400">Total Points</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search labs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-surface-black border border-border-dark rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="pl-10 pr-8 py-3 bg-surface-black border border-border-dark rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer"
            >
              <option value="all">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="relative">
            <BookOpen className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="pl-10 pr-8 py-3 bg-surface-black border border-border-dark rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="Guided">Guided</option>
              <option value="Scenario">Scenario</option>
            </select>
          </div>

          <div className="relative">
            <Star className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="pl-10 pr-8 py-3 bg-surface-black border border-border-dark rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="points-high">Highest Points</option>
              <option value="points-low">Lowest Points</option>
              <option value="difficulty-easy">Easiest First</option>
              <option value="difficulty-hard">Hardest First</option>
            </select>
          </div>
        </div>

        {/* Active Filters Display */}
        {(selectedDifficulty !== 'all' || selectedType !== 'all' || searchTerm) && (
          <div className="mb-6 flex items-center gap-2">
            <span className="text-gray-400 text-sm">Active filters:</span>
            {selectedDifficulty !== 'all' && (
              <Badge className={`${getDifficultyColor(selectedDifficulty)} border`}>
                {selectedDifficulty}
              </Badge>
            )}
            {selectedType !== 'all' && (
              <Badge className={`${getLabTypeColor(selectedType as LabType)} border`}>
                {selectedType}
              </Badge>
            )}
            {searchTerm && (
              <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">
                "{searchTerm}"
              </Badge>
            )}
            <Button 
              variant="outline" 
              size="sm"
              onClick={clearFilters}
              className="text-xs"
            >
              Clear All
            </Button>
          </div>
        )}

        {/* Labs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedLabs.map((lab) => (
            <Card key={lab.id} className="bg-surface-black border-border-dark hover:border-blue-500/50 transition-all duration-300 group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <Badge className={`${getDifficultyColor(lab.difficulty)} border`}>
                    {lab.difficulty}
                  </Badge>
                  <div className="flex items-center space-x-1 text-blue-400">
                    <Trophy className="h-4 w-4" />
                    <span className="text-sm font-bold">{lab.points}</span>
                  </div>
                </div>
                <CardTitle className="text-white text-lg group-hover:text-blue-400 transition-colors">
                  <Link href={`/blue-team/lab/${lab.slug}`} className="hover:underline">
                    {lab.title}
                  </Link>
                </CardTitle>
                <CardDescription className="text-gray-400 mt-1 line-clamp-2">
                  {lab.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0 space-y-3">
                {/* Type and Stats */}
                <div className="flex items-center justify-between text-sm">
                  <Badge className={`${getLabTypeColor(lab.labType)} border`}>
                    {lab.labType}
                  </Badge>
                  <div className="flex items-center space-x-4 text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{lab.estimatedTime}m</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{lab.completedBy}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3" />
                      <span>{lab.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Tools */}
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 font-medium flex items-center">
                    <Wrench className="h-3 w-3 mr-1" />
                    Tools:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {lab.tools.map((tool, index) => (
                      <Badge key={index} variant="outline" className="text-xs text-gray-400 border-gray-600">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Purple Team Badge */}
                {lab.pairedRedLabId && (
                  <div className="flex items-center space-x-2 text-xs text-purple-400 bg-purple-500/10 border border-purple-500/30 rounded p-2">
                    <Shield className="h-3 w-3" />
                    <span>Purple Team Lab</span>
                  </div>
                )}

                {/* Action Button */}
                <Button 
                  className="w-full bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30" 
                  variant="outline"
                  asChild
                >
                  <Link href={`/blue-team/lab/${lab.slug}`}>
                    Start Lab
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredAndSortedLabs.length === 0 && (
          <div className="text-center py-16">
            <Shield className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No labs found
            </h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button 
              variant="outline"
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Module Info */}
        <div className="mt-16">
          <Card className="bg-surface-black border-border-dark">
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-blue-400" />
                About This Module
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-medium mb-2">What You'll Learn</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Splunk SPL (Search Processing Language) fundamentals for log analysis</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Detecting suspicious login patterns and brute force attacks</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Web access log triage for SQL injection, XSS, and path traversal</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Creating detection rules and alerts based on log analysis</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Prerequisites</h4>
                  <p className="text-gray-300">
                    Basic Linux command line knowledge, understanding of HTTP protocols, and familiarity with regular expressions are recommended.
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
