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
      const errorMessage = err.response?.data?.email?.[0] || 
                          err.response?.data?.username?.[0] ||
                          err.response?.data?.error ||
                          'Registration failed. Please try again.';
      setError(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="rounded-md bg-error-50 p-4">
              <p className="text-sm text-error-700">{error}</p>
            </div>
          )}
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="first_name" className="form-label">
                  First name
                </label>
                <input
                  {...register('first_name')}
                  type="text"
                  className="form-input"
                  placeholder="First name"
                />
                {errors.first_name && (
                  <p className="form-error">{errors.first_name.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="last_name" className="form-label">
                  Last name
                </label>
                <input
                  {...register('last_name')}
                  type="text"
                  className="form-input"
                  placeholder="Last name"
                />
                {errors.last_name && (
                  <p className="form-error">{errors.last_name.message}</p>
                )}
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                {...register('email')}
                type="email"
                autoComplete="email"
                className="form-input"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="form-error">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                {...register('username')}
                type="text"
                autoComplete="username"
                className="form-input"
                placeholder="Choose a username"
              />
              {errors.username && (
                <p className="form-error">{errors.username.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                {...register('password')}
                type="password"
                autoComplete="new-password"
                className="form-input"
                placeholder="Create a password"
              />
              {errors.password && (
                <p className="form-error">{errors.password.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password_confirm" className="form-label">
                Confirm password
              </label>
              <input
                {...register('password_confirm')}
                type="password"
                autoComplete="new-password"
                className="form-input"
                placeholder="Confirm your password"
              />
              {errors.password_confirm && (
                <p className="form-error">{errors.password_confirm.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex justify-center py-2 px-4"
            >
              {isSubmitting ? (
                <>
                  <div className="spinner mr-2"></div>
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
