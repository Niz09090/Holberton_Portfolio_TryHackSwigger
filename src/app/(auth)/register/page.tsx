'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/shared/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Shield, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff,
  Chrome,
  Github,
  ArrowRight,
  Terminal,
  Check,
  Loader2
} from 'lucide-react';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: ''
  });

  const { register, isLoading, error, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const validateForm = () => {
    const newErrors = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: ''
    };

    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.acceptTerms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await register(formData.username, formData.email, formData.password);
        router.push('/dashboard');
      } catch (err) {
        // Error is handled by auth context
      }
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-deep-black text-white">
      <Navbar />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-8">
        <div className="w-full max-w-md">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="h-12 w-12 text-neon-green" />
              <span className="text-3xl font-bold text-white">TryHackSwigger</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Join the Community</h1>
            <p className="text-gray-400">Start your cybersecurity journey today</p>
          </div>

          {/* Registration Form */}
          <Card className="bg-surface-black border-border-dark">
            <CardHeader className="space-y-1">
              <CardTitle className="text-white text-center">Create Account</CardTitle>
              <CardDescription className="text-gray-400 text-center">
                Join thousands of learners mastering cybersecurity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}
              
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Username Field */}
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium text-gray-300">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <input
                      id="username"
                      type="text"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 bg-deep-black border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-all ${
                        errors.username 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                          : 'border-border-dark focus:border-neon-green focus:ring-neon-green/20'
                      }`}
                      placeholder="Choose a username"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  {errors.username && (
                    <p className="text-red-400 text-sm">{errors.username}</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 bg-deep-black border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-all ${
                        errors.email 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                          : 'border-border-dark focus:border-neon-green focus:ring-neon-green/20'
                      }`}
                      placeholder="your@email.com"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-sm">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`w-full pl-10 pr-12 py-3 bg-deep-black border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-all ${
                        errors.password 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                          : 'border-border-dark focus:border-neon-green focus:ring-neon-green/20'
                      }`}
                      placeholder="Create a strong password"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-500 hover:text-neon-green transition-colors"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-sm">{errors.password}</p>
                  )}
                  <div className="text-xs text-gray-500 mt-1">
                    Must be at least 8 characters with numbers and letters
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={`w-full pl-10 pr-12 py-3 bg-deep-black border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-all ${
                        errors.confirmPassword 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                          : 'border-border-dark focus:border-neon-green focus:ring-neon-green/20'
                      }`}
                      placeholder="Confirm your password"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-gray-500 hover:text-neon-green transition-colors"
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-sm">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-2">
                  <label className="flex items-start space-x-2 text-sm text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.acceptTerms}
                      onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                      className={`w-4 h-4 mt-0.5 rounded focus:ring-2 transition-all ${
                        errors.terms 
                          ? 'text-red-500 bg-deep-black border-red-500 focus:ring-red-500' 
                          : 'text-neon-green bg-deep-black border-border-dark focus:ring-neon-green'
                      }`}
                      disabled={isLoading}
                    />
                    <span className="flex-1">
                      I agree to the{' '}
                      <button 
                        type="button"
                        onClick={() => alert('Terms coming soon!')}
                        className="text-neon-cyan hover:text-neon-green transition-colors"
                      >
                        Terms and Conditions
                      </button>
                      {' '}and{' '}
                      <button 
                        type="button"
                        onClick={() => alert('Privacy Policy coming soon!')}
                        className="text-neon-cyan hover:text-neon-green transition-colors"
                      >
                        Privacy Policy
                      </button>
                    </span>
                  </label>
                  {errors.terms && (
                    <p className="text-red-400 text-sm">{errors.terms}</p>
                  )}
                </div>

                {/* Register Button */}
                <Button 
                  type="submit" 
                  variant="neon" 
                  className="w-full btn-neon"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border-dark"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-surface-black text-gray-400">Or register with</span>
                </div>
              </div>

              {/* SSO Buttons */}
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                  onClick={() => alert('SSO integration coming soon!')}
                  disabled={isLoading}
                >
                  <Chrome className="mr-2 h-4 w-4" />
                  Continue with Google
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                  onClick={() => alert('SSO integration coming soon!')}
                  disabled={isLoading}
                >
                  <Github className="mr-2 h-4 w-4" />
                  Continue with GitHub
                </Button>
              </div>

              {/* Login Link */}
              <div className="text-center text-sm text-gray-400">
                Already have an account?{' '}
                <Link 
                  href="/login" 
                  className="text-neon-cyan hover:text-neon-green font-medium transition-colors"
                >
                  Sign in here
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Benefits Section */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center space-x-3 text-sm text-gray-300">
              <Check className="h-4 w-4 text-neon-green flex-shrink-0" />
              <span>Access to 200+ hands-on labs</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-300">
              <Check className="h-4 w-4 text-neon-green flex-shrink-0" />
              <span>Compete in global CTF events</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-300">
              <Check className="h-4 w-4 text-neon-green flex-shrink-0" />
              <span>Join 50,000+ security learners</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-300">
              <Check className="h-4 w-4 text-neon-green flex-shrink-0" />
              <span>Free forever, no credit card required</span>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-neon-green/10 border border-neon-green/30 rounded-lg">
            <div className="flex items-start space-x-2">
              <Terminal className="h-4 w-4 text-neon-green mt-0.5 flex-shrink-0" />
              <div className="text-xs text-neon-green">
                <p className="font-semibold mb-1">Privacy & Security:</p>
                <p className="text-neon-green/80">
                  We never share your data with third parties. Your learning progress 
                  and personal information are encrypted and secure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
