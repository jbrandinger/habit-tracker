import { useAuth } from '../contexts/AuthContext';

export function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome back, {user?.first_name || user?.username}!
            </h1>
            <p className="text-gray-600 mb-8">
              This is your habit tracking dashboard. Here you'll see your daily progress,
              streaks, and insights about your habits.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="card text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Today's Progress
                </h3>
                <p className="text-3xl font-bold text-primary-600 mb-2">0/0</p>
                <p className="text-sm text-gray-500">Habits completed</p>
              </div>
              
              <div className="card text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Current Streak
                </h3>
                <p className="text-3xl font-bold text-success-600 mb-2">0</p>
                <p className="text-sm text-gray-500">Days in a row</p>
              </div>
              
              <div className="card text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Total Habits
                </h3>
                <p className="text-3xl font-bold text-gray-600 mb-2">0</p>
                <p className="text-sm text-gray-500">Active habits</p>
              </div>
            </div>
            
            <div className="mt-8">
              <p className="text-gray-500 text-sm">
                Dashboard features are coming soon! For now, you can navigate to the Habits page
                to start creating your first habits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
