import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserRegistrationSchema, UserRegistration } from '@habit-tracker/shared';
import { useAuth } from '../contexts/AuthContext';

export function Register() {
  const [error, setError] = useState<string>('');
  const { register: registerUser, isAuthenticated, isLoading } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserRegistration>({
    resolver: zodResolver(UserRegistrationSchema),
  });

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/app" replace />;
  }

  const onSubmit = async (data: UserRegistration) => {
    try {
      setError('');
      await registerUser(data);
    } catch (err: any) {
      // Handle specific field errors
      const errorData = err.response?.data;
      let errorMessage = 'Registration failed. Please try again.';
      
      if (errorData) {
        // Check for password errors first (most common)
        if (errorData.password && Array.isArray(errorData.password)) {
          errorMessage = errorData.password.join(' ');
        }
        // Check for email errors
        else if (errorData.email && Array.isArray(errorData.email)) {
          errorMessage = errorData.email.join(' ');
        }
        // Check for username errors
        else if (errorData.username && Array.isArray(errorData.username)) {
          errorMessage = errorData.username.join(' ');
        }
        // Check for first_name errors
        else if (errorData.first_name && Array.isArray(errorData.first_name)) {
          errorMessage = errorData.first_name.join(' ');
        }
        // Check for last_name errors
        else if (errorData.last_name && Array.isArray(errorData.last_name)) {
          errorMessage = errorData.last_name.join(' ');
        }
        // Check for password_confirm errors
        else if (errorData.password_confirm && Array.isArray(errorData.password_confirm)) {
          errorMessage = errorData.password_confirm.join(' ');
        }
        // Check for generic error
        else if (errorData.error) {
          errorMessage = errorData.error;
        }
      }
      
      setError(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12 px-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">H</span>
            </div>
            <span className="text-2xl font-light text-white">HabitTracker</span>
          </div>
          
          <h1 className="text-3xl font-light text-white mb-3">
            Create your account
          </h1>
          <p className="text-gray-400">
            Start building better habits today
          </p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="bg-red-900/20 border border-red-800/50 rounded-lg p-4">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-300 mb-2">
                  First name
                </label>
                <input
                  {...register('first_name')}
                  type="text"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  placeholder="First name"
                />
                {errors.first_name && (
                  <p className="text-red-400 text-sm mt-1">{errors.first_name.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-300 mb-2">
                  Last name
                </label>
                <input
                  {...register('last_name')}
                  type="text"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  placeholder="Last name"
                />
                {errors.last_name && (
                  <p className="text-red-400 text-sm mt-1">{errors.last_name.message}</p>
                )}
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                {...register('email')}
                type="email"
                autoComplete="email"
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                {...register('username')}
                type="text"
                autoComplete="username"
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                placeholder="Choose a username"
              />
              {errors.username && (
                <p className="text-red-400 text-sm mt-1">{errors.username.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                {...register('password')}
                type="password"
                autoComplete="new-password"
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                placeholder="Create a password"
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
              )}
              <div className="mt-2 text-xs text-gray-500">
                <p>Password requirements:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>At least 8 characters long</li>
                  <li>Cannot be too common or entirely numeric</li>
                  <li>Should not be similar to your personal information</li>
                </ul>
              </div>
            </div>
            
            <div>
              <label htmlFor="password_confirm" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm password
              </label>
              <input
                {...register('password_confirm')}
                type="password"
                autoComplete="new-password"
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                placeholder="Confirm your password"
              />
              {errors.password_confirm && (
                <p className="text-red-400 text-sm mt-1">{errors.password_confirm.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-black py-3 px-4 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                Creating account...
              </div>
            ) : (
              'Create account'
            )}
          </button>
          
          <div className="text-center pt-4">
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-white hover:text-purple-400 transition-colors font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}