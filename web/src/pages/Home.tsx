import { Link } from 'react-router-dom';
import { useState } from 'react';

export function Home() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-32">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-block mb-8">
            <span className="text-sm font-medium text-purple-400 bg-purple-400/10 px-4 py-2 rounded-full border border-purple-400/20">
              Build Better Habits
            </span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-7xl font-light tracking-tight text-white mb-8 leading-tight">
            Welcome to a{' '}
            <span className="font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              better you
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 mb-12 leading-relaxed max-w-2xl font-light">
            Beautifully designed, privacy-focused, and packed with insights. 
            Track your daily habits and build consistency with our elegant, powerful platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4">
            <Link
              to="/register"
              className="bg-white text-slate-950 px-8 py-4 rounded-lg font-medium hover:bg-slate-100 transition-all duration-200 hover:shadow-2xl hover:shadow-white/20 hover:scale-105"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="border border-slate-700 text-white px-8 py-4 rounded-lg font-medium hover:bg-slate-800/50 hover:border-slate-600 transition-all duration-200"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-light text-white mb-6">
            Productivity at its best
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Habit Tracker is packed with features that help you stay consistent and motivated
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Easy Tracking',
              description: 'Mark habits as complete with a single click. Simple and intuitive interface keeps you focused on what matters most.',
              icon: '✓'
            },
            {
              title: 'Progress Insights',
              description: 'Visualize your progress with beautiful charts and statistics. See your streaks, completion rates, and trends over time.',
              icon: '📊'
            },
            {
              title: 'Stay Motivated',
              description: 'Build momentum with streak tracking and achievement badges. Stay motivated on your journey to better habits.',
              icon: '⚡'
            }
          ].map((feature, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
              className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-8 hover:bg-slate-900/80 hover:border-slate-700 transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 group"
            >
              <div className="text-5xl mb-6 text-purple-400 group-hover:scale-110 transition-transform duration-200">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values Section */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-light text-white mb-6">
            Our Core Values
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            We make it our priority to ensure that Habit Tracker strikes the right balance between simplicity, effectiveness, and privacy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              title: 'Private & Secure',
              description: 'Your data stays yours, always',
              icon: '🔒'
            },
            {
              title: 'Simple Yet Powerful',
              description: 'Easy to use, hard to master',
              icon: '⚡'
            },
            {
              title: 'Cross-Platform',
              description: 'Works everywhere you do',
              icon: '📱'
            },
            {
              title: 'Community Driven',
              description: 'Built with love, together',
              icon: '❤️'
            }
          ].map((value, idx) => (
            <div key={idx} className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 bg-slate-900/50 border border-slate-800/50 rounded-2xl flex items-center justify-center group-hover:bg-slate-800/50 group-hover:border-slate-700 group-hover:scale-110 transition-all duration-200">
                <span className="text-2xl">{value.icon}</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {value.title}
              </h3>
              <p className="text-slate-400 text-sm">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-8 py-24 mb-32">
        <div className="text-center">
          <h2 className="text-4xl font-light text-white mb-6">
            Ready to build better habits?
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of users who are already transforming their lives, one habit at a time
          </p>
          <Link
            to="/register"
            className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-200 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-105"
          >
            Start Your Journey
          </Link>
        </div>
      </section>
    </div>
  );
}