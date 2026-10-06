'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/shared/Navbar';
import { LabCard } from '@/components/shared/LabCard';
import { 
  Target, 
  Filter, 
  Search, 
  Terminal, 
  Zap,
  Star,
  Clock,
  Users,
  Shield,
  Lock,
  X,
  SlidersHorizontal
} from 'lucide-react';
import { mockLabs } from '@/lib/mockData';

export default function LabsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories from labs
  const categories = useMemo(() => {
    const cats = new Set(mockLabs.map(lab => lab.category));
    return Array.from(cats);
  }, []);

  // Filter and sort labs
  const filteredAndSortedLabs = useMemo(() => {
    let filtered = mockLabs.filter(lab => {
      const matchesSearch = lab.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lab.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lab.learningObjectives.some(obj => obj.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || lab.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || lab.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });

    // Sort labs
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
  }, [searchTerm, selectedCategory, selectedDifficulty, sortBy]);

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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'SQL Injection':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'XSS':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'CSRF':
        return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      case 'SSRF':
        return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
      case 'XXE':
        return 'bg-teal-500/20 text-teal-400 border-teal-500/30';
      case 'IDOR':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSortBy('newest');
  };

  return (
    <div className="min-h-screen bg-deep-black text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Vulnerability Labs
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Practice real-world cybersecurity scenarios in our hands-on labs
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-surface-black border border-border-dark rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-neon-green mb-1">
                {mockLabs.length}
              </div>
              <div className="text-sm text-gray-400">Total Labs</div>
            </div>
            <div className="bg-surface-black border border-border-dark rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-neon-cyan mb-1">
                {mockLabs.filter(lab => lab.difficulty === 'Easy').length}
              </div>
              <div className="text-sm text-gray-400">Easy Labs</div>
            </div>
            <div className="bg-surface-black border border-border-dark rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-1">
                {mockLabs.filter(lab => lab.difficulty === 'Medium').length}
              </div>
              <div className="text-sm text-gray-400">Medium Labs</div>
            </div>
            <div className="bg-surface-black border border-border-dark rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-400 mb-1">
                {mockLabs.filter(lab => lab.difficulty === 'Hard' || lab.difficulty === 'Insane').length}
              </div>
              <div className="text-sm text-gray-400">Hard Labs</div>
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
                className="w-full pl-10 pr-4 py-3 bg-surface-black border border-border-dark rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/20 transition-all"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 bg-surface-black border border-border-dark rounded-lg text-white focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/20 transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <Target className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="pl-10 pr-8 py-3 bg-surface-black border border-border-dark rounded-lg text-white focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/20 transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
                <option value="Insane">Insane</option>
              </select>
            </div>

            <div className="relative">
              <Star className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-10 pr-8 py-3 bg-surface-black border border-border-dark rounded-lg text-white focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/20 transition-all appearance-none cursor-pointer"
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
        </div>

        {/* Active Filters Display */}
        {(selectedCategory !== 'all' || selectedDifficulty !== 'all' || searchTerm) && (
          <div className="mb-6 flex items-center gap-2">
            <span className="text-gray-400 text-sm">Active filters:</span>
            {selectedCategory !== 'all' && (
              <Badge className={`${getCategoryColor(selectedCategory)} border`}>
                {selectedCategory}
              </Badge>
            )}
            {selectedDifficulty !== 'all' && (
              <Badge className={`${getDifficultyColor(selectedDifficulty)} border`}>
                {selectedDifficulty}
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
            <LabCard key={lab.id} lab={lab} />
          ))}
        </div>

        {/* Empty State */}
        {filteredAndSortedLabs.length === 0 && (
          <div className="text-center py-16">
            <Terminal className="h-16 w-16 text-gray-500 mx-auto mb-4" />
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

        {/* Lab Categories Overview */}
        <div className="mt-16">
          <Card className="bg-surface-black border-border-dark">
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center">
                <Shield className="h-5 w-5 mr-2 text-neon-green" />
                Lab Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {categories.map(category => {
                  const categoryLabs = mockLabs.filter(lab => lab.category === category);
                  return (
                    <div key={category} className="text-center">
                      <div className="w-12 h-12 bg-deep-black rounded-lg flex items-center justify-center border border-border-dark mx-auto mb-2">
                        <Lock className="h-6 w-6 text-gray-400" />
                      </div>
                      <h4 className="text-white font-semibold mb-1">{category}</h4>
                      <div className="text-2xl font-bold text-neon-cyan mb-1">
                        {categoryLabs.length}
                      </div>
                      <div className="text-sm text-gray-400">labs available</div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
