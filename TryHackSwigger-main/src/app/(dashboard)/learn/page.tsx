'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/shared/Navbar';
import { 
  BookOpen, 
  Clock, 
  Target, 
  Star,
  Users,
  Play,
  Filter,
  Search,
  Shield,
  Lock,
  Zap,
  Award
} from 'lucide-react';
import { mockLearningPaths } from '@/lib/mockData';

export default function LearningPathsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const filteredPaths = mockLearningPaths.filter(path => {
    const matchesSearch = path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         path.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || path.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Intermediate':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Advanced':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getIconForPath = (pathId: string) => {
    switch (pathId) {
      case '1':
        return <Shield className="h-6 w-6 text-green-400" />;
      case '2':
        return <Lock className="h-6 w-6 text-yellow-400" />;
      case '3':
        return <Zap className="h-6 w-6 text-blue-400" />;
      case '4':
        return <Award className="h-6 w-6 text-purple-400" />;
      default:
        return <BookOpen className="h-6 w-6 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-deep-black text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Learning Paths
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Structured learning journeys to master cybersecurity skills
          </p>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search learning paths..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-surface-black border border-border-dark rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/20 transition-all"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="pl-10 pr-8 py-3 bg-surface-black border border-border-dark rounded-lg text-white focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/20 transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        {/* Learning Paths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPaths.map((path) => (
            <Card key={path.id} className="bg-surface-black border-border-dark card-hover group">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-deep-black rounded-lg flex items-center justify-center border border-border-dark group-hover:border-neon-green/50 transition-colors">
                    {getIconForPath(path.id)}
                  </div>
                  <Badge className={`${getDifficultyColor(path.difficulty)} border`}>
                    {path.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-white text-lg mb-2">
                  {path.title}
                </CardTitle>
                <CardDescription className="text-gray-300 line-clamp-3">
                  {path.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{path.estimatedHours}h</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Target className="h-3 w-3" />
                    <span>{path.labs.length} labs</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3" />
                    <span>{path.points || 0} pts</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-neon-green font-medium">{path.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-neon-green to-neon-cyan h-2 rounded-full progress-bar"
                      style={{ width: `${path.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {path.completedLabs || 0} of {path.labs?.length || 0} labs completed
                  </div>
                </div>

                {/* Topics */}
                <div className="flex flex-wrap gap-2">
                  {path.topics?.slice(0, 3).map((topic, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-neon-green/10 text-neon-green text-xs rounded border border-neon-green/30"
                    >
                      {topic}
                    </span>
                  ))}
                  {(path.topics?.length || 0) > 3 && (
                    <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded">
                      +{(path.topics?.length || 0) - 3} more
                    </span>
                  )}
                </div>

                {/* Action Button */}
                <Button 
                  variant="neon" 
                  className="w-full btn-neon"
                  asChild
                >
                  <Link href={`/learn/${path.id}`}>
                    {path.progress > 0 ? 'Continue Learning' : 'Start Path'}
                    <Play className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredPaths.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No learning paths found
            </h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedDifficulty('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Learning Tips */}
        <div className="mt-16">
          <Card className="bg-surface-black border-border-dark">
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center">
                <Award className="h-5 w-5 mr-2 text-neon-green" />
                Learning Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="text-white font-semibold flex items-center">
                    <Target className="h-4 w-4 mr-2 text-neon-cyan" />
                    Start with Basics
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Begin with fundamental concepts before moving to advanced topics. 
                    Each path builds upon previous knowledge.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-white font-semibold flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-neon-cyan" />
                    Consistent Pace
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Dedicate regular time to learning. Even 30 minutes daily 
                    can lead to significant progress over time.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-white font-semibold flex items-center">
                    <Users className="h-4 w-4 mr-2 text-neon-cyan" />
                    Join Community
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Connect with other learners in our forum. Share experiences 
                    and get help when stuck on challenging concepts.
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
