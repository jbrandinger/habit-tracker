import React from 'react';
import { Link } from 'react-router-dom';

export function HomeLinear() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="text-lg font-medium">HabitTracker</span>
          </div>
          <div className="flex items-center gap-8">
            <button className="text-gray-400 hover:text-white transition-colors text-sm">Features</button>
            <button className="text-gray-400 hover:text-white transition-colors text-sm">Pricing</button>
            <Link
              to="/register"
              className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Linear's signature style */}
      <section className="relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_50%)]"></div>
        
        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gray-900/50 border border-gray-800 rounded-full px-4 py-2 mb-8">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">Built for productivity</span>
            </div>

            {/* Main headline - Linear's typography style */}
            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6 leading-tight">
              Build better habits,
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent font-normal">
                achieve more
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              A minimalist habit tracker designed for focus. Track what matters, 
              eliminate distractions, and build momentum towards your goals.
            </p>

            {/* CTA Buttons - Linear's button style */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/register"
                className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200 hover:scale-105"
              >
                Start tracking habits
              </Link>
              <Link
                to="/login"
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <span>Sign in</span>
                <span className="text-sm">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Linear's card style */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light mb-4">
            Everything you need to build lasting habits
          </h2>
          <p className="text-gray-400 text-lg">Simple tools that actually work</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Daily tracking',
              description: 'Mark habits complete with a single click. Visual streaks keep you motivated.',
              icon: '✓'
            },
            {
              title: 'Smart insights',
              description: 'Understand your patterns with clean analytics and progress visualization.',
              icon: '📊'
            },
            {
              title: 'Stay focused',
              description: 'Minimal interface removes distractions. Focus on what truly matters.',
              icon: '🎯'
            }
          ].map((feature, idx) => (
            <div
              key={idx}
              className="group relative bg-gray-900/30 border border-gray-800 rounded-xl p-8 hover:bg-gray-900/50 hover:border-gray-700 transition-all duration-300"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-200">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section - Linear's minimal approach */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-2xl p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { number: '10k+', label: 'Habits tracked' },
              { number: '95%', label: 'Success rate' },
              { number: '30 days', label: 'Average streak' }
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-4xl font-light mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA - Linear's clean finish */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h2 className="text-4xl font-light mb-6">
          Ready to build better habits?
        </h2>
        <p className="text-gray-400 mb-8 text-lg">
          Join thousands of people building lasting change
        </p>
        <Link
          to="/register"
          className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-700 transition-all duration-200 hover:scale-105"
        >
          Get started for free
        </Link>
      </section>
    </div>
  );
}
