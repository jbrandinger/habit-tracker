import { useState } from 'react';
import { useHabits } from '../contexts/HabitContext';
import { HabitForm } from '../components/HabitForm';
import { Modal } from '../components/Modal';

export function Habits() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const {
    habits,
    isLoadingHabits,
    createHabit,
    isCreatingHabit,
    toggleHabitCompletion,
    isTogglingCompletion,
  } = useHabits();

  const handleCreateHabit = async (data: any) => {
    try {
      console.log('Creating habit with data:', data);
      const result = await createHabit(data);
      console.log('Habit created successfully:', result);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error creating habit:', error);
      throw error; // Re-throw so the form can handle it
    }
  };

  const handleToggleCompletion = async (habitId: number, currentStatus: boolean) => {
    await toggleHabitCompletion(habitId, !currentStatus);
  };

  if (isLoadingHabits) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800/50">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light mb-2">Your Habits</h1>
              <p className="text-gray-400">
                Build lasting change through consistent daily actions
              </p>
            </div>
            <button 
              onClick={() => setIsFormOpen(true)}
              className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200 hover:scale-105"
            >
              Add Habit
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {!habits || habits.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="bg-gray-900/30 border border-gray-800 rounded-2xl p-12 max-w-md mx-auto">
              <div className="text-6xl mb-6 opacity-60">🎯</div>
              <h3 className="text-xl font-medium mb-4">No habits yet</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Start building better habits today. Create your first habit and begin tracking your progress.
              </p>
              <button 
                onClick={() => setIsFormOpen(true)}
                className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-700 transition-all duration-200 hover:scale-105"
              >
                Create your first habit
              </button>
            </div>
          </div>
        ) : (
          /* Habits List */
          <div className="space-y-4">
            {habits.map((habit) => (
              <div
                key={habit.id}
                className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 hover:bg-gray-900/50 hover:border-gray-700 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Completion Toggle */}
                    <button
                      onClick={() => handleToggleCompletion(habit.id, habit.is_completed_today)}
                      disabled={isTogglingCompletion}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                        habit.is_completed_today
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-600 hover:border-purple-500'
                      }`}
                    >
                      {habit.is_completed_today && (
                        <span className="text-sm">✓</span>
                      )}
                    </button>

                    {/* Habit Info */}
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">
                        {habit.name}
                      </h3>
                      {habit.description && (
                        <p className="text-gray-400 text-sm">
                          {habit.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span className="capitalize">{habit.frequency}</span>
                        <span>•</span>
                        <span>Current streak: {habit.current_streak} days</span>
                        <span>•</span>
                        <span>Best: {habit.best_streak} days</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="text-right">
                    <div className="text-2xl font-light mb-1">
                      <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        {habit.current_streak}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {habit.completion_rate}% complete
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Habit Form Modal */}
      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
        <HabitForm
          onSubmit={handleCreateHabit}
          onCancel={() => setIsFormOpen(false)}
          isSubmitting={isCreatingHabit}
        />
      </Modal>
    </div>
  );
}