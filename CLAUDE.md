# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript learning project demonstrating Zustand state management patterns. The app is a simple todo list application that showcases async state operations with Zustand stores, persistence, and devtools integration.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

## Architecture

### State Management
- **Zustand** is used for all state management
- Main store: `src/lib/stores/useTodoStore.ts` - Todo management with persistence and devtools

### Store Patterns
- All async operations include loading states and error handling
- `useTodoStore` uses Zustand middleware:
  - `persist()` for localStorage persistence with "todo-storage" key
  - `devtools()` for Redux DevTools integration
- State mutations follow immutable patterns with Zustand's `set()` function

### Component Structure
- Components in `src/components/` are functional components using hooks
- Todo component fetches initial data from JSONPlaceholder API
- All async operations simulate 3-second delays to demonstrate loading states

### Styling
- TailwindCSS v4 with Vite plugin integration
- Gradient backgrounds and hover effects throughout
- Responsive design with `md:` breakpoints

## Key Files
- `src/lib/stores/useTodoStore.ts` - Main todo state management
- `src/components/todos.tsx` - Todo list UI component
- `vite.config.ts` - Vite configuration with React and TailwindCSS plugins