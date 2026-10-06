'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Badge as BadgeType, BadgeRarity } from '@/lib/types';

interface BadgeCardProps {
  badge: BadgeType;
  earned?: boolean;
  progress?: number;
}

export function BadgeCard({ badge, earned = false, progress = 0 }: BadgeCardProps) {
  const getRarityColor = (rarity: BadgeRarity) => {
    switch (rarity) {
      case BadgeRarity.COMMON:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case BadgeRarity.RARE:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case BadgeRarity.EPIC:
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case BadgeRarity.LEGENDARY:
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case BadgeRarity.MYTHIC:
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <Card className={`bg-surface-black border-border-dark card-hover ${!earned ? 'opacity-60' : ''}`}>
      <CardHeader className="text-center">
        <div className="relative mx-auto w-20 h-20 mb-3">
          <div className={`w-full h-full rounded-full flex items-center justify-center text-3xl ${getRarityColor(badge.rarity)} border-2`}>
            {badge.icon}
          </div>
          {!earned && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-black/70 flex items-center justify-center">
                <span className="text-gray-400 text-4xl">?</span>
              </div>
            </div>
          )}
        </div>
        <CardTitle className="text-white text-sm">{badge.name}</CardTitle>
        <CardDescription className="text-gray-400 text-xs">
          {badge.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <div className="space-y-2">
          <Badge className={`${getRarityColor(badge.rarity)} text-xs`}>
            {badge.rarity}
          </Badge>
          {!earned && progress > 0 && (
            <div className="text-xs text-gray-400">
              Progress: {progress}%
            </div>
          )}
          <div className="text-xs text-gray-500">
            {badge.id}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
