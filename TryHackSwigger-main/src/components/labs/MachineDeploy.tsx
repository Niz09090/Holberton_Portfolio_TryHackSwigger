'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, X, RefreshCw, Terminal, Clock, Server, AlertCircle, ExternalLink } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface MachineDeployProps {
  labId: string;
  dockerImage: string;
  ports: number[];
  terminalEnabled: boolean;
}

interface ContainerInfo {
  containerId: string;
  ip: string;
  port: number;
  expiresAt: string;
  terminalPort?: number;
}

interface ContainerStatus {
  status: 'running' | 'stopped' | 'expired' | 'not_found';
  timeRemaining: number;
  ip: string;
  port: number;
  terminalPort?: number;
}

export default function MachineDeploy({ labId, dockerImage, ports, terminalEnabled }: MachineDeployProps) {
  const { user } = useAuth();
  const [containerInfo, setContainerInfo] = useState<ContainerInfo | null>(null);
  const [containerStatus, setContainerStatus] = useState<ContainerStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Poll container status every 30 seconds
  useEffect(() => {
    if (!containerInfo) return;

    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`/api/labs/status/${containerInfo.containerId}`);
        const status: ContainerStatus = await response.json();
        setContainerStatus(status);
        
        if (status.status === 'expired' || status.status === 'not_found') {
          setContainerInfo(null);
          setContainerStatus(null);
          clearInterval(pollInterval);
        }
      } catch (err) {
        console.error('Error polling container status:', err);
      }
    }, 30000);

    return () => clearInterval(pollInterval);
  }, [containerInfo]);

  const handleDeploy = async () => {
    if (!user) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/labs/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ labId, userId: user.id })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to deploy container');
      }
      
      const info: ContainerInfo = await response.json();
      setContainerInfo(info);
      
      // Store lab-container mapping for proxy
      await fetch(`/api/lab-proxy/${labId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ containerId: info.containerId })
      });
      
      // Get initial status
      const statusResponse = await fetch(`/api/labs/status/${info.containerId}`);
      const status: ContainerStatus = await statusResponse.json();
      setContainerStatus(status);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to deploy container');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTerminate = async () => {
    if (!containerInfo) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/labs/terminate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ containerId: containerInfo.containerId })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to terminate container');
      }
      
      setContainerInfo(null);
      setContainerStatus(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to terminate container');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async () => {
    if (!containerInfo || !user) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/labs/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          containerId: containerInfo.containerId,
          labId,
          userId: user.id 
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to reset container');
      }
      
      const info: ContainerInfo = await response.json();
      setContainerInfo(info);
      
      // Get initial status
      const statusResponse = await fetch(`/api/labs/status/${info.containerId}`);
      const status: ContainerStatus = await statusResponse.json();
      setContainerStatus(status);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset container');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimeRemaining = (ms: number): string => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const openTerminal = () => {
    if (!containerInfo?.terminalPort) return;
    window.open(`http://localhost:${containerInfo.terminalPort}`, '_blank');
  };

  if (!user) {
    return null;
  }

  return (
    <Card className="bg-surface-black border-border-dark">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Server className="h-5 w-5 mr-2 text-neon-green" />
          Lab Environment
        </CardTitle>
        <CardDescription className="text-gray-400">
          Deploy a Docker container to practice this lab
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2 mt-0.5" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {!containerInfo && !isLoading && (
          <Button
            onClick={handleDeploy}
            className="w-full bg-neon-green hover:bg-neon-green/80 text-black font-semibold"
            size="lg"
          >
            <Play className="mr-2 h-4 w-4" />
            Start Machine
          </Button>
        )}

        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-8 w-8 text-neon-green animate-spin" />
            <span className="ml-3 text-gray-400">Deploying container...</span>
          </div>
        )}

        {containerInfo && containerStatus && (
          <div className="space-y-4">
            {containerStatus.status === 'running' && (
              <div className="flex items-center space-x-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="h-3 w-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 font-medium">Machine Running</span>
              </div>
            )}

            {containerStatus.status === 'expired' && (
              <div className="flex items-center space-x-2 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                <span className="text-yellow-400 font-medium">Machine Expired</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-deep-black rounded-lg">
                <div className="text-gray-400 text-xs mb-1">IP Address</div>
                <div className="text-white font-mono text-sm">{containerStatus.ip}</div>
              </div>
              <div className="p-3 bg-deep-black rounded-lg">
                <div className="text-gray-400 text-xs mb-1">Port</div>
                <div className="text-white font-mono text-sm">{containerStatus.port}</div>
              </div>
            </div>

            {containerStatus.status === 'running' && (
              <div className="p-3 bg-deep-black rounded-lg flex items-center">
                <div className="flex-1">
                  <div className="text-gray-400 text-xs mb-1">Access URL</div>
                  {(() => {
                    const accessUrl = `http://localhost:3000/api/lab-proxy/${labId}/`;
                    console.log('accessUrl value:', accessUrl);
                    console.log('labId value:', labId);
                    console.log('containerStatus.status:', containerStatus.status);
                    return (
                      <a
                        href={accessUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#6366f1', textDecoration: 'underline', cursor: 'pointer' }}
                      >
                        {accessUrl}
                      </a>
                    );
                  })()}
                </div>
              </div>
            )}

            {containerStatus.status !== 'running' && (
              <div className="p-3 bg-deep-black rounded-lg flex items-center opacity-50">
                <div className="flex-1">
                  <div className="text-gray-400 text-xs mb-1">Access URL</div>
                  <div className="text-gray-500 font-mono text-sm">
                    http://localhost:3000/api/lab-proxy/{labId}/
                  </div>
                </div>
              </div>
            )}

            {containerStatus.status === 'running' && (
              <div className="p-3 bg-deep-black rounded-lg flex items-center">
                <Clock className="h-4 w-4 text-neon-cyan mr-2" />
                <div className="flex-1">
                  <div className="text-gray-400 text-xs mb-1">Time Remaining</div>
                  <div className="text-white font-mono text-sm">
                    {formatTimeRemaining(containerStatus.timeRemaining)}
                  </div>
                </div>
              </div>
            )}

            <div className="flex space-x-2">
              {containerStatus.status === 'running' && (
                <>
                  <Button
                    onClick={handleTerminate}
                    variant="destructive"
                    className="flex-1"
                    disabled={isLoading}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Terminate
                  </Button>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="flex-1 border-border-dark text-white hover:bg-surface-black"
                    disabled={isLoading}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                  {terminalEnabled && containerInfo.terminalPort && (
                    <Button
                      onClick={openTerminal}
                      variant="outline"
                      className="border-border-dark text-white hover:bg-surface-black"
                    >
                      <Terminal className="h-4 w-4" />
                    </Button>
                  )}
                </>
              )}

              {containerStatus.status === 'expired' && (
                <Button
                  onClick={handleReset}
                  className="w-full bg-neon-green hover:bg-neon-green/80 text-black font-semibold"
                  disabled={isLoading}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Restart Machine
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
