import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { HabitCreate, HabitCreateSchema, HabitFrequency } from '@habit-tracker/shared';

interface HabitFormProps {
  onSubmit: (data: HabitCreate) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function HabitForm({ onSubmit, onCancel, isSubmitting = false }: HabitFormProps) {
  const [error, setError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<HabitCreate>({
    resolver: zodResolver(HabitCreateSchema),
    defaultValues: {
      frequency: 'daily',
    },
  });

  const handleFormSubmit = async (data: HabitCreate) => {
    try {
      setError('');
      console.log('Form submitting with data:', data);
      await onSubmit(data);
      console.log('Form submission successful, resetting form');
      reset(); // Clear form on success
    } catch (err: any) {
      console.error('Form submission error:', err);
      // Handle specific field errors
      const errorData = err.response?.data;
      let errorMessage = 'Failed to create habit. Please try again.';
      
      if (errorData) {
        if (errorData.name && Array.isArray(errorData.name)) {
          errorMessage = errorData.name.join(' ');
        } else if (errorData.description && Array.isArray(errorData.description)) {
          errorMessage = errorData.description.join(' ');
        } else if (errorData.frequency && Array.isArray(errorData.frequency)) {
          errorMessage = errorData.frequency.join(' ');
        } else if (errorData.error) {
          errorMessage = errorData.error;
        }
      }
      
      setError(errorMessage);
    }
  };

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-light text-white mb-2">Create New Habit</h2>
        <p className="text-gray-400">
          Start building a new habit to track your progress
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {error && (
          <div className="bg-red-900/20 border border-red-800/50 rounded-lg p-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Habit Name *
          </label>
          <input
            {...register('name')}
            type="text"
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
            placeholder="e.g., Exercise, Read, Meditate"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
            Description (Optional)
          </label>
          <textarea
            {...register('description')}
            rows={3}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors resize-none"
            placeholder="Add details about your habit..."
          />
          {errors.description && (
            <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="frequency" className="block text-sm font-medium text-gray-300 mb-2">
            Frequency
          </label>
          <select
            {...register('frequency')}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
          >
            <option value={HabitFrequency.DAILY}>Daily</option>
            <option value={HabitFrequency.WEEKLY}>Weekly</option>
            <option value={HabitFrequency.CUSTOM}>Custom</option>
          </select>
          {errors.frequency && (
            <p className="text-red-400 text-sm mt-1">{errors.frequency.message}</p>
          )}
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-white text-black py-3 px-6 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                Creating...
              </div>
            ) : (
              'Create Habit'
            )}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-6 py-3 border border-gray-700 text-white rounded-lg font-medium hover:bg-gray-800/50 hover:border-gray-600 transition-all duration-200 disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
