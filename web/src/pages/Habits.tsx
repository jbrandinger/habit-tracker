export function Habits() {
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
            <button className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200 hover:scale-105">
              Add Habit
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Empty State */}
        <div className="text-center py-16">
          <div className="bg-gray-900/30 border border-gray-800 rounded-2xl p-12 max-w-md mx-auto">
            <div className="text-6xl mb-6 opacity-60">🎯</div>
            <h3 className="text-xl font-medium mb-4">No habits yet</h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Start building better habits today. Create your first habit and begin tracking your progress.
            </p>
            <button className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-700 transition-all duration-200 hover:scale-105">
              Create your first habit
            </button>
          </div>
        </div>

        {/* Future: Habit List would go here */}
        {/* 
        <div className="space-y-4">
          {habits.map(habit => (
            <div key={habit.id} className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 hover:bg-gray-900/50 hover:border-gray-700 transition-all duration-300">
              // Habit item content
            </div>
          ))}
        </div>
        */}
      </div>
    </div>
  );
}