import { Link } from 'react-router-dom';
import { CheckCircleIcon, ChartBarIcon, BoltIcon } from '@heroicons/react/24/outline';

export function Home() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Build Better Habits
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Track your daily habits, build consistency, and achieve your goals with our simple and powerful habit tracker.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/register"
                className="btn-primary text-lg px-8 py-3"
              >
                Get started
              </Link>
              <Link
                to="/login"
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary-600"
              >
                Sign in <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">
              Everything you need
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Simple habit tracking
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our app provides all the tools you need to build lasting habits and track your progress over time.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                    <CheckCircleIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Easy Tracking
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Mark habits as complete with a single click. Simple and intuitive interface keeps you focused on what matters.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                    <ChartBarIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Progress Insights
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Visualize your progress with charts and statistics. See your streaks, completion rates, and trends over time.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                    <BoltIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Stay Motivated
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Build momentum with streak tracking and achievement badges. Stay motivated on your journey to better habits.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
