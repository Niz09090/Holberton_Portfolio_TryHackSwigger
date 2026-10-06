'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/shared/Navbar';
import { 
  MessageSquare, 
  Users, 
  Clock, 
  TrendingUp, 
  Eye, 
  ThumbsUp, 
  Pin, 
  Lock, 
  Search, 
  Filter, 
  Plus, 
  Calendar, 
  User, 
  Hash, 
  ArrowRight, 
  Flame, 
  Star, 
  Bookmark, 
  Bell, 
  Settings, 
  ChevronRight, 
  Tag,
  Target,
  Shield
} from 'lucide-react';
import { mockForumThreads, mockUsers } from '@/lib/mockData';
import { ForumThread } from '@/lib/types';

export default function ForumPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  // Filter and sort threads
  const filteredThreads = useMemo(() => {
    let threads = [...mockForumThreads];

    // Filter by search
    if (searchTerm) {
      threads = threads.filter(thread => 
        thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        thread.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      threads = threads.filter(thread => thread.category === selectedCategory);
    }

    // Sort threads
    return threads.sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        case 'popular':
          return (b.views || 0) - (a.views || 0);
        case 'replies':
          return b.replies.length - a.replies.length;
        default:
          return 0;
      }
    });
  }, [searchTerm, selectedCategory, sortBy]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'general':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'help':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'showcase':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'announcements':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-deep-black">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Community Forum</h1>
          <p className="text-gray-300">
            Connect with fellow hackers, share knowledge, and grow together
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-surface-black border border-border-dark rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-neon-green mb-1">
              {mockForumThreads.length}
            </div>
            <div className="text-sm text-gray-400">Total Threads</div>
          </div>
          <div className="bg-surface-black border border-border-dark rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-neon-cyan mb-1">
              {mockForumThreads.reduce((sum, thread) => sum + thread.replies.length, 0)}
            </div>
            <div className="text-sm text-gray-400">Total Replies</div>
          </div>
          <div className="bg-surface-black border border-border-dark rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-1">
              {mockUsers.length}
            </div>
            <div className="text-sm text-gray-400">Active Users</div>
          </div>
          <div className="bg-surface-black border border-border-dark rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">
              {mockForumThreads.filter(t => t.pinned).length}
            </div>
            <div className="text-sm text-gray-400">Pinned Threads</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search threads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-surface-black border border-border-dark rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-green"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-surface-black border border-border-dark rounded-lg text-white focus:outline-none focus:border-neon-green"
            >
              <option value="all">All Categories</option>
              <option value="general">General</option>
              <option value="help">Help</option>
              <option value="showcase">Showcase</option>
              <option value="announcements">Announcements</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-surface-black border border-border-dark rounded-lg text-white focus:outline-none focus:border-neon-green"
            >
              <option value="latest">Latest</option>
              <option value="popular">Most Popular</option>
              <option value="replies">Most Replies</option>
            </select>
            <Button className="bg-neon-green text-black hover:bg-neon-green/90">
              <Plus className="h-4 w-4 mr-2" />
              New Thread
            </Button>
          </div>
        </div>

        {/* Threads List */}
        <div className="space-y-4">
          {filteredThreads.map((thread) => {
            const author = mockUsers.find(u => u.id === thread.authorId) || mockUsers[0];
            const lastReply = thread.replies[thread.replies.length - 1];
            const lastActivity = lastReply ? lastReply.createdAt : thread.createdAt;
            
            return (
              <Link href={`/forum/${thread.id}`} key={thread.id}>
                <Card className="bg-surface-black border-border-dark card-hover cursor-pointer">
                  <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Thread Status Icons */}
                    <div className="flex flex-col items-center space-y-2">
                      {thread.pinned && (
                        <Pin className="h-4 w-4 text-red-400" />
                      )}
                      {thread.locked && (
                        <Lock className="h-4 w-4 text-yellow-400" />
                      )}
                      {thread.isHot && (
                        <Flame className="h-4 w-4 text-orange-400" />
                      )}
                    </div>

                    {/* Thread Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Badge className={`${getCategoryColor(thread.category)} border text-xs`}>
                            {thread.category}
                          </Badge>
                          {thread.solved && (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                              Solved
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {thread.views}
                          </span>
                          <span className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            {thread.replies.length}
                          </span>
                          <span className="flex items-center">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {thread.likes || 0}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-white mb-2 hover:text-neon-green cursor-pointer">
                        {thread.title}
                      </h3>
                      
                      <p className="text-gray-300 mb-4 line-clamp-2">
                        {thread.content}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-neon-green rounded-full flex items-center justify-center">
                              <User className="h-4 w-4 text-black" />
                            </div>
                            <div>
                              <div className="text-white font-medium">{author.username}</div>
                              <div className="text-gray-400 text-sm">@{author.username}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-400">
                          Last activity {new Date(lastActivity).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              </Link>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredThreads.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No threads found</h3>
            <p className="text-gray-400">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
