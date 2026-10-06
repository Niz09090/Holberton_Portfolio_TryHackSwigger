'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/shared/Navbar';
import { BadgeCard } from '@/components/shared/BadgeCard';
import { BadgeCategory, BadgeRarity } from '@/lib/types';
import { 
  Trophy, 
  Award, 
  Star,
  Shield,
  Target,
  Zap,
  Crown,
  Medal,
  Lock,
  Check,
  Filter,
  Search,
  TrendingUp,
  Calendar,
  Users,
  Sparkles,
  Gem
} from 'lucide-react';
import { mockBadges } from '@/lib/mockData';
import { useAuth } from '@/contexts/AuthContext';

export default function BadgesPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRarity, setSelectedRarity] = useState<'all' | 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY' | 'MYTHIC'>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'achievement' | 'skill' | 'special'>('all');

  // Filter badges
  const filteredBadges = useMemo(() => {
    let badges = mockBadges;

    // Filter by search term
    if (searchTerm) {
      badges = badges.filter(badge => 
        badge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        badge.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by rarity
    if (selectedRarity !== 'all') {
      badges = badges.filter(badge => badge.rarity === selectedRarity as BadgeRarity);
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      badges = badges.filter(badge => badge.category === selectedCategory as BadgeCategory);
    }

    return badges;
  }, [searchTerm, selectedRarity, selectedCategory]);

  // Get user's earned badges
  const userBadges = useMemo(() => {
    if (!user?.badges?.earned) return [];
    return mockBadges.filter(badge =>
      user.badges.earned.includes(badge.id)
    );
  }, [user]);

  // Get user's achievements
  const userAchievements = useMemo(() => {
    if (!user?.badges?.earned) return [];
    return mockBadges.filter(badge =>
      badge.category === BadgeCategory.ACHIEVEMENT &&
      user.badges.earned.includes(badge.id)
    );
  }, [user]);

  const getRarityColor = (rarity: string) => {
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

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case BadgeRarity.COMMON:
        return <div className="w-3 h-3 bg-gray-400 rounded-full"></div>;
      case BadgeRarity.RARE:
        return <div className="w-3 h-3 bg-blue-400 rounded-full"></div>;
      case BadgeRarity.EPIC:
        return <div className="w-3 h-3 bg-purple-400 rounded-full"></div>;
      case BadgeRarity.LEGENDARY:
        return <div className="w-3 h-3 bg-orange-400 rounded-full"></div>;
      case BadgeRarity.MYTHIC:
        return <div className="w-3 h-3 bg-red-400 rounded-full"></div>;
      default:
        return <div className="w-3 h-3 bg-gray-400 rounded-full"></div>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case BadgeCategory.ACHIEVEMENT:
        return <Trophy className="h-4 w-4" />;
      case BadgeCategory.SKILL:
        return <Target className="h-4 w-4" />;
      case BadgeCategory.SPECIAL:
        return <Sparkles className="h-4 w-4" />;
      default:
        return <Award className="h-4 w-4" />;
    }
  };

  const getProgressPercentage = (badgeId: string) => {
    const badge = mockBadges.find(b => b.id === badgeId);
    if (!badge) return 0;

    const isEarned = user?.badges?.earned?.includes(badgeId) || false;
    return isEarned ? 100 : 0;
  };

  return (
    <div className="min-h-screen bg-deep-black text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Achievements & Badges
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Collect badges and unlock achievements as you progress through your hacking journey
          </p>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-surface-black border border-border-dark rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-neon-green mb-1">
                {userBadges.length}
              </div>
              <div className="text-sm text-gray-400">Badges Earned</div>
            </div>
            <div className="bg-surface-black border border-border-dark rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-neon-cyan mb-1">
                {userAchievements.length}
              </div>
              <div className="text-sm text-gray-400">Achievements</div>
            </div>
            <div className="bg-surface-black border border-border-dark rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-1">
                {mockBadges.filter(b => b.rarity === BadgeRarity.LEGENDARY || b.rarity === BadgeRarity.MYTHIC).length}
              </div>
              <div className="text-sm text-gray-400">Legendary Badges</div>
            </div>
            <div className="bg-surface-black border border-border-dark rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">
                {Math.round((userBadges.length / mockBadges.length) * 100)}%
              </div>
              <div className="text-sm text-gray-400">Collection Progress</div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search badges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-surface-black border border-border-dark rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/20 transition-all"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <select
                value={selectedRarity}
                onChange={(e) => setSelectedRarity(e.target.value as any)}
                className="pl-10 pr-8 py-3 bg-surface-black border border-border-dark rounded-lg text-white focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/20 transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Rarities</option>
                <option value="COMMON">Common</option>
                <option value="RARE">Rare</option>
                <option value="EPIC">Epic</option>
                <option value="LEGENDARY">Legendary</option>
                <option value="MYTHIC">Mythic</option>
              </select>
            </div>

            <div className="relative">
              <Award className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="pl-10 pr-8 py-3 bg-surface-black border border-border-dark rounded-lg text-white focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/20 transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Categories</option>
                <option value="achievement">Achievements</option>
                <option value="skill">Skill Badges</option>
                <option value="special">Special</option>
              </select>
            </div>
          </div>
        </div>

        {/* Recent Achievements */}
        {userAchievements.length > 0 && (
          <div className="mb-8">
            <Card className="bg-surface-black border-border-dark">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-neon-green" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userAchievements.slice(0, 6).map((badge) => (
                    <div key={badge.id} className="flex items-center space-x-4 p-4 bg-deep-black rounded-lg border border-border-dark">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-neon-green to-neon-cyan rounded-lg flex items-center justify-center">
                          <div className="text-2xl">{badge.icon}</div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold">{badge.name}</h4>
                        <p className="text-gray-400 text-sm">{badge.description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge className={`${getRarityColor(badge.rarity)} border text-xs`}>
                            {badge.rarity}
                          </Badge>
                          <span className="text-neon-green text-xs">Earned</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBadges.map((badge) => {
            const isEarned = user?.badges?.earned?.includes(badge.id) || false;
            const progress = getProgressPercentage(badge.id);
            
            return (
              <Card key={badge.id} className={`bg-surface-black border-border-dark card-hover ${isEarned ? 'ring-2 ring-neon-green/20' : ''}`}>
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    {/* Badge Icon */}
                    <div className="relative inline-block">
                      <div className={`w-20 h-20 rounded-lg flex items-center justify-center text-3xl ${
                        isEarned 
                          ? 'bg-gradient-to-br from-neon-green to-neon-cyan' 
                          : 'bg-gray-700'
                      }`}>
                        {badge.icon}
                      </div>
                      
                      {/* Rarity Indicator */}
                      <div className="absolute -top-2 -right-2">
                        {getRarityIcon(badge.rarity)}
                      </div>
                      
                      {/* Earned Indicator */}
                      {isEarned && (
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-neon-green rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Badge Info */}
                    <div className="space-y-2">
                      <h3 className="text-white font-semibold">{badge.name}</h3>
                      <p className="text-gray-400 text-sm line-clamp-2">{badge.description}</p>
                      
                      {/* Badges */}
                      <div className="flex items-center justify-center space-x-2">
                        <Badge className={`${getRarityColor(badge.rarity)} border text-xs`}>
                          {badge.rarity}
                        </Badge>
                        
                        <div className="flex items-center space-x-1">
                          {getCategoryIcon(badge.category)}
                          <span className="text-gray-400 text-xs capitalize">{badge.category}</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      {!isEarned && (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-gray-400">{progress}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-neon-green h-2 rounded-full transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {/* Requirements */}
                      {badge.requirement && (
                        <div className="text-left">
                          <div className="text-xs text-gray-400 mb-1">Requirements:</div>
                          <div className="text-xs text-gray-500">{badge.requirement}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredBadges.length === 0 && (
          <div className="text-center py-16">
            <Award className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No badges found
            </h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedRarity('all');
                setSelectedCategory('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Badge Categories Overview */}
        <div className="mt-16">
          <Card className="bg-surface-black border-border-dark">
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center">
                <Gem className="h-5 w-5 mr-2 text-neon-green" />
                Badge Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Trophy className="h-6 w-6 text-neon-green" />
                    <h4 className="text-white font-semibold">Achievements</h4>
                  </div>
                  <div className="space-y-2">
                    {mockBadges.filter(b => b.category === 'achievement').slice(0, 3).map(badge => (
                      <div key={badge.id} className="flex items-center space-x-3 p-3 bg-deep-black rounded-lg">
                        <div className="text-xl">{badge.icon}</div>
                        <div className="flex-1">
                          <div className="text-white text-sm">{badge.name}</div>
                          <div className="text-gray-400 text-xs">{badge.rarity}</div>
                        </div>
                        {user?.badges?.earned?.includes(badge.id) && (
                          <Check className="h-4 w-4 text-neon-green" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Target className="h-6 w-6 text-neon-cyan" />
                    <h4 className="text-white font-semibold">Skill Badges</h4>
                  </div>
                  <div className="space-y-2">
                    {mockBadges.filter(b => b.category === 'skill').slice(0, 3).map(badge => (
                      <div key={badge.id} className="flex items-center space-x-3 p-3 bg-deep-black rounded-lg">
                        <div className="text-xl">{badge.icon}</div>
                        <div className="flex-1">
                          <div className="text-white text-sm">{badge.name}</div>
                          <div className="text-gray-400 text-xs">{badge.rarity}</div>
                        </div>
                        {user?.badges?.earned?.includes(badge.id) && (
                          <Check className="h-4 w-4 text-neon-green" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Sparkles className="h-6 w-6 text-purple-400" />
                    <h4 className="text-white font-semibold">Special Badges</h4>
                  </div>
                  <div className="space-y-2">
                    {mockBadges.filter(b => b.category === 'special').slice(0, 3).map(badge => (
                      <div key={badge.id} className="flex items-center space-x-3 p-3 bg-deep-black rounded-lg">
                        <div className="text-xl">{badge.icon}</div>
                        <div className="flex-1">
                          <div className="text-white text-sm">{badge.name}</div>
                          <div className="text-gray-400 text-xs">{badge.rarity}</div>
                        </div>
                        {user?.badges?.earned?.includes(badge.id) && (
                          <Check className="h-4 w-4 text-neon-green" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
