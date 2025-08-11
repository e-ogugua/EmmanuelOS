# Overview

This is a dual-persona portfolio website for Emmanuel Ogugua, showcasing both his software development skills and business strategy expertise. The application features a full-screen image-driven split landing page where users can interact with two professional identities - the left side displays the developer persona and the right side shows the business strategist persona. Each side uses the full professional images with built-in text overlays, creating an immersive visual experience. The site includes dynamic hover interactions, portfolio sections for both personas, a contact form system, and clean modern animations.

# User Preferences

Preferred communication style: Simple, everyday language.
Landing page design: Single full-screen immersive experience that transitions between personas based on cursor movement (desktop) or swipe/tap (mobile). Each persona should fully own the screen when active, creating a professional single-environment feel rather than showing multiple images simultaneously. The transition should be smooth and elegant.
UI/UX Design: Each persona should feel like a completely different environment with distinct UI elements, navigation styles, typography, and visual accents that match their professional identity. The developer side should have a tech/matrix aesthetic while the business side should feel elegant and professional.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom CSS variables for theme consistency
- **UI Components**: Radix UI primitives with shadcn/ui component library for accessible, customizable components
- **Animations**: Framer Motion for smooth transitions and interactive animations
- **State Management**: React Query (TanStack Query) for server state management and caching
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Runtime**: Node.js with Express.js server framework
- **Language**: TypeScript for full-stack type safety
- **API Design**: RESTful API with dedicated routes for contact form submission
- **Error Handling**: Global error middleware with structured error responses
- **Request Logging**: Custom middleware for API request/response logging

## Data Storage Solution
- **Development**: In-memory storage using Map data structure for rapid prototyping
- **Production Ready**: Drizzle ORM configured for PostgreSQL with Neon database integration
- **Schema Management**: Drizzle Kit for database migrations and schema management
- **Type Safety**: Shared schema definitions using Drizzle-Zod for client-server type consistency

## Design System
- **Theme Management**: CSS custom properties with light/dark theme support
- **Typography**: Multiple font families (JetBrains Mono for code, Playfair Display for elegance, Inter for readability)
- **Color Scheme**: Dual-branded color system supporting both developer (matrix green/cyan) and business (gold/charcoal) aesthetics
- **Responsive Design**: Mobile-first approach with adaptive layouts for different screen sizes

## Development Experience
- **Hot Reloading**: Vite HMR for instant development feedback
- **Type Checking**: Strict TypeScript configuration across client, server, and shared code
- **Path Aliases**: Organized import structure with @ aliases for cleaner code organization
- **Error Overlays**: Runtime error modal plugin for enhanced debugging

# External Dependencies

## Database & Backend Services
- **Neon Database**: Serverless PostgreSQL database for production data storage
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL dialect support

## UI & Design Libraries
- **Radix UI**: Comprehensive set of accessible, unstyled UI primitives
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Framer Motion**: Production-ready motion library for React animations
- **Lucide React**: Consistent icon library for user interface elements

## Form & Validation
- **React Hook Form**: Performant forms library with minimal re-renders
- **Zod**: TypeScript-first schema validation for runtime type checking
- **Hookform Resolvers**: Integration layer between React Hook Form and Zod

## Development Tools
- **Vite**: Next-generation frontend build tool with native ESM support
- **PostCSS**: CSS transformation tool with Tailwind CSS processing
- **ESBuild**: Fast JavaScript bundler for production builds
- **TSX**: TypeScript execution environment for development server

## Asset Management
- **Static Assets**: Local image assets stored in attached_assets directory
- **Web Fonts**: Google Fonts integration for typography (JetBrains Mono, Playfair Display, Inter)

## Replit Integration
- **Cartographer Plugin**: Enhanced development experience within Replit environment
- **Runtime Error Modal**: Development-specific error handling for better debugging