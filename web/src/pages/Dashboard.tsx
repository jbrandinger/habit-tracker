import { useAuth } from '../contexts/AuthContext';
import { useHabits } from '../contexts/HabitContext';
import { Link } from 'react-router-dom';

export function Dashboard() {
  const { user } = useAuth();
  const { stats, isLoadingStats, habits, isLoadingHabits } = useHabits();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800/50">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light mb-2">
                Good morning, {user?.first_name || user?.username}
              </h1>
              <p className="text-gray-400">
                Ready to build some great habits today?
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/app/habits"
                className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200 hover:scale-105"
              >
                Manage Habits
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 hover:bg-gray-900/50 hover:border-gray-700 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">Today's Progress</h3>
              <div className="text-2xl">📈</div>
            </div>
            <div className="text-3xl font-light mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {isLoadingStats ? '...' : `${stats?.completed_today || 0}/${stats?.total_today || 0}`}
            </div>
            <p className="text-gray-400 text-sm">Habits completed</p>
          </div>

          <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 hover:bg-gray-900/50 hover:border-gray-700 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">Best Streak</h3>
              <div className="text-2xl">🔥</div>
            </div>
            <div className="text-3xl font-light mb-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              {isLoadingStats ? '...' : stats?.longest_streak || 0}
            </div>
            <p className="text-gray-400 text-sm">Days in a row</p>
          </div>

          <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 hover:bg-gray-900/50 hover:border-gray-700 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">Total Habits</h3>
              <div className="text-2xl">🎯</div>
            </div>
            <div className="text-3xl font-light mb-2 text-gray-400">
              {isLoadingStats ? '...' : stats?.active_habits || 0}
            </div>
            <p className="text-gray-400 text-sm">Active habits</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-light mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-800/30 rounded-xl p-8 hover:from-purple-900/40 hover:to-blue-900/40 transition-all duration-300 group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                ✨
              </div>
              <h3 className="text-xl font-medium mb-3">Create Your First Habit</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Start building lasting change by creating your first habit to track.
              </p>
              <Link
                to="/app/habits"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors font-medium"
              >
                Get started <span>→</span>
              </Link>
            </div>

            <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-8 hover:bg-gray-900/50 hover:border-gray-700 transition-all duration-300 group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                📊
              </div>
              <h3 className="text-xl font-medium mb-3">View Analytics</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Track your progress with detailed insights and visualizations.
              </p>
              <button className="inline-flex items-center gap-2 text-gray-500 cursor-not-allowed font-medium">
                Coming soon <span>→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-light mb-6">Recent Activity</h2>
          <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-8 text-center">
            <div className="text-6xl mb-4 opacity-50">📝</div>
            <h3 className="text-xl font-medium mb-3 text-gray-400">No activity yet</h3>
            <p className="text-gray-500 mb-6">
              Your habit completions and streaks will appear here once you start tracking.
            </p>
            <Link
              to="/app/habits"
              className="inline-block bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200 hover:scale-105"
            >
              Create your first habit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}