# Habit Tracker - Monorepo

A full-stack habit tracking application built as a learning project with a modern monorepo structure.

## 🏗️ Architecture

This project uses a monorepo structure with the following components:

```
habit-tracker/
├── backend/          # Django REST API (Python)
├── web/              # React web app (TypeScript)
├── mobile/           # React Native iOS app (TypeScript)
├── shared/           # Shared TypeScript utilities and types
└── docs/             # Project documentation
```

## 🛠️ Tech Stack

### Backend
- **Python 3.11+**
- **Django 4.2+** - Web framework
- **Django REST Framework** - API development
- **PostgreSQL** - Production database
- **SQLite** - Development database

### Frontend (Web)
- **React 18+** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Query** - Data fetching and state management

### Mobile (iOS)
- **React Native** - iOS mobile development
- **TypeScript** - Type safety
- **Expo** - Development toolchain
- **React Navigation** - Navigation

### Shared
- **TypeScript** - Shared types and utilities
- **Zod** - Runtime type validation

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18+)
- **npm** (v9+)
- **Python** (v3.11+)
- **pip** (Python package manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd habit-tracker
   ```

2. **Install all dependencies**
   ```bash
   npm run setup
   ```

3. **Set up environment variables**
   ```bash
   # Copy example env files and fill in your values
   cp backend/.env.example backend/.env
   cp web/.env.example web/.env
   ```

### Development

Start all development servers:

```bash
# Backend (Django)
npm run dev:backend

# Web (React)
npm run dev:web

# Mobile (React Native)
npm run dev:mobile
```

### Available Scripts

- `npm run setup` - Install all dependencies
- `npm run dev:web` - Start web development server
- `npm run dev:mobile` - Start mobile development server
- `npm run dev:backend` - Start Django development server
- `npm run build:web` - Build web app for production
- `npm run test:web` - Run web app tests
- `npm run test:mobile` - Run mobile app tests
- `npm run test:backend` - Run backend tests
- `npm run lint:web` - Lint web code
- `npm run lint:mobile` - Lint mobile code
- `npm run clean` - Remove all node_modules

## 📱 Features (Planned)

- [ ] User authentication and registration
- [ ] Create and manage habits
- [ ] Daily habit tracking
- [ ] Progress visualization and statistics
- [ ] Streak tracking
- [ ] Habit categories and tags
- [ ] Reminders and notifications
- [ ] Data export
- [ ] Dark/light theme support
- [ ] Responsive web design
- [ ] iOS mobile app
