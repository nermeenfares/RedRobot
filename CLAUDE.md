# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- **Build**: `npm run build`
- **Development**: `npm run dev`
- **Start**: `npm run start`
- **Lint**: `npm run lint`

## Code Style Guidelines
- **Framework**: Next.js with App Router structure
- **Imports**: Use absolute imports with `@/` prefix
- **Types**: Use TypeScript for all new code, define interfaces in appropriate files
- **Component Style**: Use function components with explicit type annotations
- **State Management**: Use React hooks for state management
- **Naming**: Use PascalCase for components, camelCase for functions/variables
- **Error Handling**: Use try/catch blocks with appropriate logging
- **React Performance**: Memoize components using `memo()` where appropriate
- **Folder Structure**: Follow the existing Next.js App Router pattern
- **UI Components**: Place reusable UI components in `/app/ui/` directory
- **Todo API**: Follow the ITodoApi interface for implementing todo functionality