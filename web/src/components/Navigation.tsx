import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Navigation() {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return null; // Don't show navigation for unauthenticated users
  }

  return (
    <nav className="border-b border-gray-800/50 backdrop-blur-xl bg-black/50 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/app" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="text-lg font-medium text-white">HabitTracker</span>
          </Link>
          
          <div className="flex gap-6">
            <Link
              to="/app"
              className={`text-sm transition-colors duration-200 ${
                location.pathname === '/app' 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/app/habits"
              className={`text-sm transition-colors duration-200 ${
                location.pathname === '/app/habits' 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Habits
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">
            {user?.first_name || user?.username}
          </span>
          <button
            onClick={logout}
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
}