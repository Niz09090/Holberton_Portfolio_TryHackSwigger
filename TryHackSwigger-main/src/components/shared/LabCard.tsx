'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Star, Trophy } from 'lucide-react';
import { Lab, Difficulty } from '@/lib/types';

interface LabCardProps {
  lab: Lab;
}

const getDifficultyColor = (difficulty: Difficulty) => {
  switch (difficulty) {
    case Difficulty.EASY:
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case Difficulty.MEDIUM:
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case Difficulty.HARD:
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    case Difficulty.INSANE:
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

export const LabCard: React.FC<LabCardProps> = ({ lab }) => {
  return (
    <Card className="bg-surface-black border-border-dark hover:border-neon-green/50 transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-white text-lg group-hover:text-neon-green transition-colors">
              <Link href={`/labs/${lab.slug}`} className="hover:underline">
                {lab.title}
              </Link>
            </CardTitle>
            <CardDescription className="text-gray-400 mt-1 line-clamp-2">
              {lab.description}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end space-y-2 ml-4">
            <Badge className={`${getDifficultyColor(lab.difficulty)} border`}>
              {lab.difficulty}
            </Badge>
            <div className="flex items-center space-x-1 text-neon-cyan">
              <Trophy className="h-4 w-4" />
              <span className="text-sm font-bold">{lab.points}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Category and Stats */}
          <div className="flex items-center justify-between text-sm">
            <Badge variant="outline" className="text-gray-400 border-gray-600">
              {lab.category}
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

          {/* Learning Objectives */}
          <div className="space-y-1">
            <p className="text-xs text-gray-500 font-medium">Learning Objectives:</p>
            <ul className="text-xs text-gray-400 space-y-1">
              {lab.learningObjectives.slice(0, 2).map((objective, index) => (
                <li key={index} className="flex items-start space-x-1">
                  <span className="text-neon-green mt-0.5">▸</span>
                  <span>{objective}</span>
                </li>
              ))}
              {lab.learningObjectives.length > 2 && (
                <li className="text-gray-500">
                  +{lab.learningObjectives.length - 2} more objectives
                </li>
              )}
            </ul>
          </div>

          {/* Action Button */}
          <Button 
            className="w-full" 
            variant="neon"
            asChild
          >
            <Link href={`/labs/${lab.slug}`}>
              Start Lab
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
