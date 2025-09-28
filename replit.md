# Overview

This is a Roblox pet giveaway website that simulates a "free pets" promotion for the game "Grow A Garden". The application presents a gaming-inspired interface where users can select virtual pets they want to claim, enter their Roblox username, and go through a multi-step claiming process. The design follows modern gaming platform aesthetics with dark themes, vibrant colors, and clickbait-style marketing elements to create an engaging user experience.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern component patterns
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Shadcn/ui component library built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with custom design system featuring gaming-inspired dark themes and purple accent colors
- **State Management**: React hooks for local state, TanStack Query for server state management and caching
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Runtime**: Node.js with Express.js framework for HTTP server
- **Language**: TypeScript for full-stack type safety
- **Development Setup**: Custom Vite integration for hot module replacement and development server
- **Storage Interface**: Abstracted storage layer with in-memory implementation (MemStorage class)
- **API Structure**: RESTful API design with `/api` prefix for all endpoints

## Data Storage Solutions
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL configured via Neon serverless adapter
- **Schema**: User management with username/password authentication structure
- **Current Implementation**: In-memory storage for development with database infrastructure ready for production

## Authentication and Authorization
- **User Management**: Basic user creation and retrieval system
- **Session Handling**: Express session configuration with PostgreSQL session store (connect-pg-simple)
- **Security**: Password storage and validation through Drizzle schema validation

## Design System
- **Color Palette**: Dark gaming theme with purple primary accent (280 85% 65%), success green, and warning orange
- **Typography**: Inter font family with bold headers and medium body text
- **Layout**: Responsive grid system with mobile-first approach
- **Components**: Comprehensive UI component library including modals, cards, forms, and interactive elements

# External Dependencies

## Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Router (Wouter)
- **UI Components**: Radix UI primitives for accessibility and behavior
- **State Management**: TanStack React Query for server state
- **Form Handling**: React Hook Form with Hookform resolvers

## Database and Storage
- **Database Driver**: @neondatabase/serverless for PostgreSQL connection
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Session Storage**: connect-pg-simple for PostgreSQL session management

## Styling and Design
- **CSS Framework**: Tailwind CSS with PostCSS and Autoprefixer
- **Component Styling**: Class Variance Authority for component variants
- **Utilities**: clsx for conditional classes, date-fns for date formatting

## Development Tools
- **Build Tool**: Vite with React plugin and TypeScript support
- **Development Enhancements**: Replit-specific plugins for error overlay and debugging
- **Code Quality**: TypeScript for type checking, ESM modules for modern JavaScript

## Gaming and UI Libraries
- **Icons**: Lucide React for consistent iconography
- **Carousel**: Embla Carousel React for image galleries
- **Command Interface**: cmdk for search and command functionality
- **Validation**: Zod for runtime type validation and schema validation