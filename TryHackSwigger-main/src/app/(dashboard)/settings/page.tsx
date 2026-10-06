'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/shared/Navbar';
import { 
  User, 
  Shield, 
  Globe,
  CreditCard,
  Bell,
  Lock,
  Key,
  Smartphone,
  Mail,
  Eye,
  EyeOff,
  Save,
  Download,
  Upload,
  Wifi,
  Server,
  Activity,
  Check,
  X,
  AlertTriangle,
  Info,
  Settings,
  LogOut,
  Trash2,
  RefreshCw,
  Copy,
  ExternalLink,
  Clock,
  Calendar,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  UserPlus,
  Users,
  Crown,
  Zap,
  Database,
  FileText,
  HelpCircle,
  Plus,
  Trophy,
  MessageSquare
} from 'lucide-react';
import { currentUser } from '@/lib/mockData';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'vpn' | 'billing' | 'notifications'>('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [vpnConnected, setVpnConnected] = useState(false);

  const handleSaveSettings = () => {
    // In a real app, this would save to backend
    console.log('Settings saved');
  };

  const handleConnectVPN = () => {
    setVpnConnected(!vpnConnected);
  };

  const handleGenerateApiKey = () => {
    // In a real app, this would generate a new API key
    console.log('Generate new API key');
  };

  const handleExportData = () => {
    // In a real app, this would export user data
    console.log('Export user data');
  };

  const handleDeleteAccount = () => {
    // In a real app, this would show confirmation dialog
    console.log('Delete account');
  };

  return (
    <div className="min-h-screen bg-deep-black text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Settings
          </h1>
          <p className="text-xl text-gray-300">
            Manage your account, security, and preferences
          </p>
        </div>

        {/* Settings Navigation */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <Card className="bg-surface-black border-border-dark">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'profile' 
                        ? 'bg-neon-green/20 text-neon-green' 
                        : 'text-gray-400 hover:text-white hover:bg-surface-black'
                    }`}
                  >
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('security')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'security' 
                        ? 'bg-neon-green/20 text-neon-green' 
                        : 'text-gray-400 hover:text-white hover:bg-surface-black'
                    }`}
                  >
                    <Shield className="h-5 w-5" />
                    <span>Security</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('vpn')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'vpn' 
                        ? 'bg-neon-green/20 text-neon-green' 
                        : 'text-gray-400 hover:text-white hover:bg-surface-black'
                    }`}
                  >
                    <Globe className="h-5 w-5" />
                    <span>VPN</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('billing')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'billing' 
                        ? 'bg-neon-green/20 text-neon-green' 
                        : 'text-gray-400 hover:text-white hover:bg-surface-black'
                    }`}
                  >
                    <CreditCard className="h-5 w-5" />
                    <span>Billing</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'notifications' 
                        ? 'bg-neon-green/20 text-neon-green' 
                        : 'text-gray-400 hover:text-white hover:bg-surface-black'
                    }`}
                  >
                    <Bell className="h-5 w-5" />
                    <span>Notifications</span>
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <Card className="bg-surface-black border-border-dark">
                  <CardHeader>
                    <CardTitle className="text-white text-xl flex items-center">
                      <User className="h-5 w-5 mr-2 text-neon-green" />
                      Profile Information
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Update your personal information and profile details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Display Name
                        </label>
                        <input
                          type="text"
                          defaultValue={currentUser.username}
                          className="w-full px-4 py-2 bg-surface-black border border-border-dark rounded-lg text-white focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/20 transition-all"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Username
                        </label>
                        <input
                          type="text"
                          defaultValue={currentUser.username}
                          className="w-full px-4 py-2 bg-surface-black border border-border-dark rounded-lg text-white focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/20 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Bio
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about yourself..."
                        className="w-full px-4 py-2 bg-surface-black border border-border-dark rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/20 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue="user@example.com"
                          className="w-full px-4 py-2 bg-surface-black border border-border-dark rounded-lg text-white focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/20 transition-all"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          defaultValue={currentUser.country}
                          className="w-full px-4 py-2 bg-surface-black border border-border-dark rounded-lg text-white focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/20 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Social Links
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                          <Github className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                          <input
                            type="text"
                            placeholder="GitHub username"
                            className="w-full pl-10 pr-4 py-2 bg-surface-black border border-border-dark rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/20 transition-all"
                          />
                        </div>
                        <div className="relative">
                          <Twitter className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                          <input
                            type="text"
                            placeholder="Twitter handle"
                            className="w-full pl-10 pr-4 py-2 bg-surface-black border border-border-dark rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/20 transition-all"
                          />
                        </div>
                        <div className="relative">
                          <Linkedin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                          <input
                            type="text"
                            placeholder="LinkedIn profile"
                            className="w-full pl-10 pr-4 py-2 bg-surface-black border border-border-dark rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/20 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="neon" onClick={handleSaveSettings}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <Card className="bg-surface-black border-border-dark">
                  <CardHeader>
                    <CardTitle className="text-white text-xl flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-neon-green" />
                      Security Settings
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Manage your account security and authentication
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          defaultValue="password123"
                          className="w-full pr-10 px-4 py-2 bg-surface-black border border-border-dark rounded-lg text-white focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/20 transition-all"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-500 hover:text-white"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          placeholder="Enter new password"
                          className="w-full px-4 py-2 bg-surface-black border border-border-dark rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/20 transition-all"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          placeholder="Confirm new password"
                          className="w-full px-4 py-2 bg-surface-black border border-border-dark rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/20 transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-surface-black rounded-lg border border-border-dark">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="h-5 w-5 text-neon-cyan" />
                        <div>
                          <div className="text-white font-medium">Two-Factor Authentication</div>
                          <div className="text-gray-400 text-sm">Add an extra layer of security</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          twoFactorEnabled ? 'bg-neon-green' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        API Key
                      </label>
                      <div className="flex space-x-2">
                        <div className="flex-1 relative">
                          <input
                            type={showApiKey ? "text" : "password"}
                            defaultValue="hf_live_1234567890abcdef"
                            className="w-full pr-10 px-4 py-2 bg-surface-black border border-border-dark rounded-lg text-white font-mono text-sm focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/20 transition-all"
                          />
                          <button
                            onClick={() => setShowApiKey(!showApiKey)}
                            className="absolute right-3 top-3 text-gray-500 hover:text-white"
                          >
                            {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        <Button variant="outline" onClick={handleGenerateApiKey}>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Regenerate
                        </Button>
                        <Button variant="outline" onClick={() => navigator.clipboard.writeText('hf_live_1234567890abcdef')}>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="neon" onClick={handleSaveSettings}>
                        <Save className="mr-2 h-4 w-4" />
                        Update Security
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* VPN Settings */}
            {activeTab === 'vpn' && (
              <div className="space-y-6">
                <Card className="bg-surface-black border-border-dark">
                  <CardHeader>
                    <CardTitle className="text-white text-xl flex items-center">
                      <Globe className="h-5 w-5 mr-2 text-neon-green" />
                      VPN Connection
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Connect to secure VPN servers for anonymous browsing
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center py-8">
                      <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${
                        vpnConnected ? 'bg-green-500/20' : 'bg-gray-700'
                      }`}>
                        <Wifi className={`h-12 w-12 ${vpnConnected ? 'text-green-400' : 'text-gray-400'}`} />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {vpnConnected ? 'Connected' : 'Disconnected'}
                      </h3>
                      <p className="text-gray-400 mb-6">
                        {vpnConnected ? 'Your connection is secure and anonymous' : 'Connect to protect your privacy'}
                      </p>
                      <Button 
                        variant={vpnConnected ? "outline" : "neon"} 
                        onClick={handleConnectVPN}
                        className="mb-6"
                      >
                        {vpnConnected ? (
                          <>
                            <X className="mr-2 h-4 w-4" />
                            Disconnect
                          </>
                        ) : (
                          <>
                            <Wifi className="mr-2 h-4 w-4" />
                            Connect to VPN
                          </>
                        )}
                      </Button>
                    </div>

                    {vpnConnected && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-surface-black rounded-lg border border-border-dark">
                          <div className="flex items-center space-x-2 mb-2">
                            <Server className="h-4 w-4 text-neon-cyan" />
                            <span className="text-white font-medium">Server</span>
                          </div>
                          <div className="text-gray-400">US-West-01</div>
                        </div>
                        <div className="p-4 bg-surface-black rounded-lg border border-border-dark">
                          <div className="flex items-center space-x-2 mb-2">
                            <Activity className="h-4 w-4 text-neon-green" />
                            <span className="text-white font-medium">Speed</span>
                          </div>
                          <div className="text-gray-400">125 Mbps</div>
                        </div>
                        <div className="p-4 bg-surface-black rounded-lg border border-border-dark">
                          <div className="flex items-center space-x-2 mb-2">
                            <Clock className="h-4 w-4 text-yellow-400" />
                            <span className="text-white font-medium">Connected</span>
                          </div>
                          <div className="text-gray-400">2h 34m</div>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Select Server Location
                      </label>
                      <select className="w-full px-4 py-2 bg-surface-black border border-border-dark rounded-lg text-white focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/20 transition-all">
                        <option>US-West-01 (Fastest)</option>
                        <option>US-East-01</option>
                        <option>Europe-London-01</option>
                        <option>Asia-Tokyo-01</option>
                        <option>Australia-Sydney-01</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Billing Settings */}
            {activeTab === 'billing' && (
              <div className="space-y-6">
                <Card className="bg-surface-black border-border-dark">
                  <CardHeader>
                    <CardTitle className="text-white text-xl flex items-center">
                      <CreditCard className="h-5 w-5 mr-2 text-neon-green" />
                      Billing & Subscription
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Manage your subscription and payment methods
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-6 bg-gradient-to-r from-neon-green/10 to-neon-cyan/10 rounded-lg border border-neon-green/30">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Crown className="h-8 w-8 text-yellow-400" />
                          <div>
                            <div className="text-white font-semibold text-lg">Premium Plan</div>
                            <div className="text-gray-300">Full access to all features</div>
                          </div>
                        </div>
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                          Active
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-neon-green">Unlimited</div>
                          <div className="text-gray-400 text-sm">Labs</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-neon-cyan">Priority</div>
                          <div className="text-gray-400 text-sm">Support</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-400">100GB</div>
                          <div className="text-gray-400 text-sm">VPN Data</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-gray-400 text-sm">Next billing date</div>
                          <div className="text-white font-medium">Dec 15, 2024</div>
                        </div>
                        <div className="text-right">
                          <div className="text-gray-400 text-sm">Amount</div>
                          <div className="text-white font-medium">$29.99/month</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-semibold mb-4">Payment Methods</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-surface-black rounded-lg border border-border-dark">
                          <div className="flex items-center space-x-3">
                            <CreditCard className="h-5 w-5 text-neon-green" />
                            <div>
                              <div className="text-white">•••• 4242</div>
                              <div className="text-gray-400 text-sm">Expires 12/25</div>
                            </div>
                          </div>
                          <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
                            Default
                          </Badge>
                        </div>
                      </div>
                      <Button variant="outline" className="mt-4">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Payment Method
                      </Button>
                    </div>

                    <div>
                      <h4 className="text-white font-semibold mb-4">Billing History</h4>
                      <div className="space-y-2">
                        {[
                          { date: 'Nov 15, 2024', amount: '$29.99', status: 'Paid' },
                          { date: 'Oct 15, 2024', amount: '$29.99', status: 'Paid' },
                          { date: 'Sep 15, 2024', amount: '$29.99', status: 'Paid' },
                        ].map((payment, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-surface-black rounded-lg border border-border-dark">
                            <div>
                              <div className="text-white">Premium Plan</div>
                              <div className="text-gray-400 text-sm">{payment.date}</div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className="text-white font-medium">{payment.amount}</span>
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                                {payment.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <Card className="bg-surface-black border-border-dark">
                  <CardHeader>
                    <CardTitle className="text-white text-xl flex items-center">
                      <Bell className="h-5 w-5 mr-2 text-neon-green" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Control how you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-surface-black rounded-lg border border-border-dark">
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-neon-cyan" />
                          <div>
                            <div className="text-white font-medium">Email Notifications</div>
                            <div className="text-gray-400 text-sm">Receive updates via email</div>
                          </div>
                        </div>
                        <button
                          onClick={() => setEmailNotifications(!emailNotifications)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            emailNotifications ? 'bg-neon-green' : 'bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              emailNotifications ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-surface-black rounded-lg border border-border-dark">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="h-5 w-5 text-purple-400" />
                          <div>
                            <div className="text-white font-medium">Push Notifications</div>
                            <div className="text-gray-400 text-sm">Receive browser notifications</div>
                          </div>
                        </div>
                        <button
                          onClick={() => setPushNotifications(!pushNotifications)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            pushNotifications ? 'bg-neon-green' : 'bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              pushNotifications ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-semibold mb-4">Notification Types</h4>
                      <div className="space-y-3">
                        {[
                          { icon: Trophy, label: 'Achievements Unlocked', enabled: true },
                          { icon: Users, label: 'Race Invitations', enabled: true },
                          { icon: MessageSquare, label: 'Forum Replies', enabled: false },
                          { icon: Zap, label: 'Lab Updates', enabled: true },
                          { icon: AlertTriangle, label: 'Security Alerts', enabled: true },
                        ].map((notification, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-surface-black rounded-lg border border-border-dark">
                            <div className="flex items-center space-x-3">
                              <notification.icon className={`h-4 w-4 ${
                                notification.enabled ? 'text-neon-green' : 'text-gray-500'
                              }`} />
                              <span className="text-white">{notification.label}</span>
                            </div>
                            <button
                              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                                notification.enabled ? 'bg-neon-green' : 'bg-gray-600'
                              }`}
                            >
                              <span
                                className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                                  notification.enabled ? 'translate-x-4' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="neon" onClick={handleSaveSettings}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Preferences
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Danger Zone */}
            <Card className="bg-red-900/10 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-red-400 text-xl flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Danger Zone
                </CardTitle>
                <CardDescription className="text-red-300">
                  Irreversible actions that affect your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-surface-black rounded-lg border border-border-dark">
                  <div>
                    <div className="text-white font-medium">Export Data</div>
                    <div className="text-gray-400 text-sm">Download all your account data</div>
                  </div>
                  <Button variant="outline" onClick={handleExportData}>
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-surface-black rounded-lg border border-border-dark">
                  <div>
                    <div className="text-white font-medium">Delete Account</div>
                    <div className="text-gray-400 text-sm">Permanently remove your account</div>
                  </div>
                  <Button variant="destructive" onClick={handleDeleteAccount}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
