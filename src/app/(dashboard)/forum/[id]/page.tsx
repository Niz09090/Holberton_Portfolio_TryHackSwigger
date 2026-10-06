'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/shared/Navbar';
import { ArrowLeft, MessageSquare, ThumbsUp, User, Clock, Pin, Lock, Flame } from 'lucide-react';
import Link from 'next/link';
import { mockForumThreads, mockUsers } from '@/lib/mockData';

export default function ForumThreadPage({ params }: { params: { id: string } }) {
  const thread = mockForumThreads.find(t => t.id === params.id);
  const author = thread ? mockUsers.find(u => u.id === thread.authorId) || mockUsers[0] : mockUsers[0];

  if (!thread) {
    return (
      <div className="min-h-screen bg-deep-black text-white">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-white mb-4">Thread Not Found</h1>
            <p className="text-gray-400 mb-6">The thread you're looking for doesn't exist.</p>
            <Button variant="outline" asChild>
              <Link href="/forum">Back to Forum</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-deep-black text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link href="/forum">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Forum
            </Link>
          </Button>
        </div>

        {/* Thread Header */}
        <Card className="bg-surface-black border-border-dark mb-6">
          <CardHeader>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {thread.pinned && <Pin className="h-5 w-5 text-red-400" />}
                {thread.locked && <Lock className="h-5 w-5 text-yellow-400" />}
                {thread.isHot && <Flame className="h-5 w-5 text-orange-400" />}
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  {thread.category}
                </Badge>
                {thread.solved && (
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    Solved
                  </Badge>
                )}
              </div>
            </div>
            <CardTitle className="text-white text-2xl mb-2">{thread.title}</CardTitle>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{author.username}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{new Date(thread.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>{thread.replies.length} replies</span>
              </div>
              <div className="flex items-center space-x-2">
                <ThumbsUp className="h-4 w-4" />
                <span>{thread.likes || 0} likes</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 whitespace-pre-wrap">{thread.content}</p>
            </div>
          </CardContent>
        </Card>

        {/* Replies */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4">Replies</h2>
          {thread.replies.length === 0 ? (
            <Card className="bg-surface-black border-border-dark">
              <CardContent className="p-8 text-center">
                <MessageSquare className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">No replies yet. Be the first to reply!</p>
              </CardContent>
            </Card>
          ) : (
            thread.replies.map((reply, index) => {
              const replyAuthor = mockUsers.find(u => u.id === reply.author.id) || mockUsers[0];
              return (
                <Card key={index} className="bg-surface-black border-border-dark">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-neon-green rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-5 w-5 text-black" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-white">{replyAuthor.username}</span>
                            <span className="text-sm text-gray-400">
                              {new Date(reply.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-300 whitespace-pre-wrap">{reply.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Reply Form Placeholder */}
        <Card className="bg-surface-black border-border-dark mt-6">
          <CardHeader>
            <CardTitle className="text-white">Post a Reply</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              placeholder="Write your reply..."
              className="w-full h-32 p-4 bg-deep-black border border-border-dark rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-green resize-none"
              disabled
            />
            <div className="mt-4">
              <Button className="bg-neon-green text-black hover:bg-neon-green/90" disabled>
                Post Reply
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-2">Reply functionality coming soon</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
