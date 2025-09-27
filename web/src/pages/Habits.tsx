export function Habits() {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-3xl font-bold text-gray-900">Your Habits</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage your daily habits and track your progress over time.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="btn-primary"
            >
              Add Habit
            </button>
          </div>
        </div>

        <div className="mt-8">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-12">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No habits yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating your first habit to track.
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  className="btn-primary"
                >
                  Create your first habit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
