'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/shared/Navbar';
import { 
  BookOpen, 
  Clock, 
  Target, 
  CheckCircle,
  Circle,
  Play,
  ArrowLeft,
  Shield,
  Lock,
  Zap,
  Award
} from 'lucide-react';
import { mockLearningPaths, mockLabs } from '@/lib/mockData';

export default function LearningPathDetailPage({ params }: { params: { slug: string } }) {
  const path = mockLearningPaths.find(p => p.slug === params.slug);

  if (!path) {
    notFound();
  }

  const pathLabs = path.labs.map(labId => mockLabs.find(lab => lab.id === labId)).filter(Boolean);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'EASY':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'MEDIUM':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'HARD':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'INSANE':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getIconForPath = (pathId: string) => {
    switch (pathId) {
      case '1':
        return <Shield className="h-8 w-8 text-green-400" />;
      case '2':
        return <Lock className="h-8 w-8 text-yellow-400" />;
      case '3':
        return <Zap className="h-8 w-8 text-blue-400" />;
      case '4':
        return <Award className="h-8 w-8 text-purple-400" />;
      default:
        return <BookOpen className="h-8 w-8 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-deep-black text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        {/* Back Button */}
        <Link href="/learn">
          <Button variant="ghost" className="mb-6 text-gray-400 hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Learning Paths
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="w-16 h-16 bg-deep-black rounded-lg flex items-center justify-center border border-border-dark">
              {getIconForPath(path.id)}
            </div>
            <Badge className={`${getDifficultyColor(path.difficulty)} border text-sm px-3 py-1`}>
              {path.difficulty}
            </Badge>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4">
            {path.title}
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            {path.description}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mb-6">
            <div className="flex items-center space-x-2 text-gray-400">
              <Clock className="h-5 w-5" />
              <span>{path.estimatedHours} hours estimated</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Target className="h-5 w-5" />
              <span>{path.labs.length} labs</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <BookOpen className="h-5 w-5" />
              <span>{path.enrolledCount} enrolled</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2 mb-8">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Your Progress</span>
              <span className="text-neon-green font-medium">{path.progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-neon-green to-neon-cyan h-3 rounded-full progress-bar"
                style={{ width: `${path.progress}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-500">
              {path.completedCount} of {path.enrolledCount} learners completed
            </div>
          </div>

          {/* Start Path Button */}
          <Button 
            variant="neon" 
            className="w-full md:w-auto btn-neon"
            asChild
          >
            <Link href={`/labs/${pathLabs[0]?.slug}`}>
              {path.progress > 0 ? 'Continue Learning' : 'Start Path'}
              <Play className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Labs List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-4">
            Labs in this Path
          </h2>
          
          {pathLabs.length === 0 ? (
            <Card className="bg-surface-black border-border-dark">
              <CardContent className="py-8 text-center">
                <BookOpen className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">No labs available in this path yet.</p>
              </CardContent>
            </Card>
          ) : (
            pathLabs.map((lab, index) => (
              <Card key={lab?.id} className="bg-surface-black border-border-dark card-hover">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-gray-500 text-sm">Lab {index + 1}</span>
                        <Badge className={`${getDifficultyColor(lab?.difficulty || 'EASY')} border text-xs`}>
                          {lab?.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="text-white text-lg mb-2">
                        {lab?.title}
                      </CardTitle>
                      <CardDescription className="text-gray-300">
                        {lab?.description}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <div className="flex items-center space-x-1 text-neon-green">
                        <Target className="h-4 w-4" />
                        <span className="font-medium">{lab?.points} pts</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-400">
                        <Clock className="h-4 w-4" />
                        <span>{lab?.estimatedTime}m</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <CheckCircle className="h-4 w-4" />
                      <span>{lab?.completedBy || 0} completed</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      asChild
                    >
                      <Link href={`/labs/${lab?.slug}`}>
                        {lab?.completedBy ? 'Review' : 'Start Lab'}
                        <Play className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Tags */}
        {path.tags && path.tags.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-white mb-4">Topics</h3>
            <div className="flex flex-wrap gap-2">
              {path.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-neon-green/10 text-neon-green text-sm rounded border border-neon-green/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
