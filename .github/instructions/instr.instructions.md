---
applyTo: '**'
---
# Copilot Instructions for Project0

## Project Overview

This is a **React 19 + TypeScript + Vite** web application with a modular architecture designed for scalability. The project integrates authentication (Clerk), backend services (Appwrite), and UI components (MUI).

### Tech Stack
- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7 (HMR enabled)
- **Styling**: MUI 7 + Emotion CSS-in-JS
- **Form Management**: React Hook Form with Zod validation
- **Routing**: React Router 7
- **Data Management**: Zustand state management + TanStack Query 5 for server state
- **Backend Services**: Appwrite SDK + Axios HTTP client
- **Authentication**: Clerk React SDK
- **Package Manager**: pnpm (node_modules/.pnpm)

## Architecture & Key Patterns

### Directory Structure Philosophy
```
src/
├── components/     # Reusable UI components (auth/, layout/, ui/)
├── pages/         # Page-level components (route-specific)
├── routes/        # Route configuration & guards
├── services/      # Appwrite & external API integrations
├── store/         # Zustand stores for global state
├── context/       # React Context for app-level concerns
├── hooks/         # Custom React hooks
├── types/         # TypeScript interfaces & types
├── utils/         # Helper functions & utilities
├── lib/           # Library configurations (Appwrite client, axios)
└── assets/        # Static assets (SVGs, images)
```

### Critical Patterns

**State Management Hierarchy**:
- **Component State** (useState): Local UI state only
- **Zustand Stores** (`src/store/`): Global app state (user, settings)
- **TanStack Query** (`@tanstack/react-query`): Server state & caching (data fetching, mutations)
- **Context** (`src/context/`): App-level providers (theme, notifications)

**API Communication**:
- All Appwrite calls go through `src/services/` layer
- Use `axios` for HTTP requests; configure in `src/lib/`
- TanStack Query mutations wrap all write operations
- Example: Don't call Appwrite SDK directly in components; create a service method first

**Form Pattern**:
- Use React Hook Form for forms with `register()`, `handleSubmit`, `watch()`
- Validate with **Zod** schemas (define in separate `validation.ts` files)
- Example pattern:
  ```tsx
  const schema = z.object({ email: z.string().email() });
  const { register, handleSubmit } = useForm({ resolver: zodResolver(schema) });
  ```

**Styling**:
- MUI components preferred for consistency
- Override styles with Emotion's `sx` prop or `styled()` for complex cases
- Avoid inline styles; use MUI's `Box` component for layout

## Developer Workflows

### Local Development
```bash
pnpm install          # Install dependencies (required on first setup)
pnpm dev             # Start Vite dev server with HMR (http://localhost:5173)
pnpm build           # Compile TypeScript + build with Vite (output: dist/)
pnpm lint            # Run ESLint on src/ and config files
pnpm preview         # Preview production build locally
```

### TypeScript Compiler
- Strict mode enabled: all implicit `any` types cause errors
- `noUnusedLocals` & `noUnusedParameters` enforced
- Run `tsc --noEmit` to check types without emitting (useful during development)
- Build task runs `tsc -b` first (composite build mode for fast rebuilds)

### ESLint Configuration
- Uses recommended rules from `@eslint/js`, `typescript-eslint`, and React hooks plugin
- React Refresh plugin ensures fast HMR compatibility
- No path aliases configured (`tsconfig.app.json` has no `compilerOptions.paths`)—import using relative paths or barrel exports

### HMR (Hot Module Replacement)
- Vite automatically refreshes on file saves
- React Fast Refresh preserves component state during edits
- CSS changes apply instantly without full reload

## Integration Points & Dependencies

### Clerk Authentication
- **Purpose**: User authentication & session management
- **Usage**: Import `@clerk/clerk-react` and wrap app with `<ClerkProvider>`
- **Caution**: Never expose API keys in client code; use environment variables

### Appwrite Backend
- **Purpose**: Backend-as-a-Service for databases, storage, auth integration
- **SDK Location**: Configured in `src/lib/` (likely `appwrite.ts` or similar)
- **Pattern**: Create service methods in `src/services/` that wrap Appwrite SDK calls
- **Security**: Server-side validation required; client-side validation is UX only

### TanStack Query (React Query)
- **Caching Strategy**: Automatic background refetching on window focus
- **Mutations**: Use for write operations; handle optimistic updates + rollback
- **Pattern**: 
  ```tsx
  const { data, isPending } = useQuery({ queryKey: ['items'], queryFn: fetchItems });
  const mutation = useMutation({ mutationFn: updateItem });
  ```

### Axios Configuration
- **Interceptors**: Set base URL, auth headers, and error handling in `src/lib/`
- **Error Handling**: Centralized in interceptors; avoid try-catch in components

## Code Quality & Conventions

### TypeScript Practices
- Always define types; avoid `any`
- Use interfaces for objects, `type` for unions/primitives
- Export types used across files from a `types/` barrel export
- Generics for reusable components (e.g., `<Select<T> options={T[]} />`)

### Component Structure
- Functional components only (hooks-based)
- Props typed explicitly via interfaces
- Split large components (>200 lines) into smaller sub-components
- Memoize components only when profiling shows performance issues

### Imports & Exports
- Barrel exports encouraged for organizing related exports (e.g., `src/components/ui/index.ts`)
- Absolute imports preferred over relative if paths are configured (currently not configured)

### Testing (Not Currently Setup)
- ESLint enforces React hooks rules (`exhaustive-deps`, `rules-of-hooks`)
- Recommended pattern for future: Jest + React Testing Library
- Focus on integration tests over unit tests for components

## Important Cautions

- **Environment Variables**: Must be prefixed with `VITE_` to be exposed to client (Vite convention)
- **Build Output**: Vite generates `dist/` directory; this is production-ready
- **Node Modules Lock**: `pnpm-lock.yaml` is checked in; don't delete it
- **TypeScript Errors Block Build**: Ensure `pnpm lint` and type checking pass before committing
- **React 19**: Use new features like React Server Components sparingly; stick to Hooks

## Quick Reference: File Modifications

**Adding a new feature**:
1. Define TypeScript types in `src/types/`
2. Create service layer in `src/services/` (if using Appwrite/APIs)
3. Build UI components in `src/components/`
4. Create route in `src/routes/` and add to router config
5. Add Zustand store in `src/store/` for shared state
6. Test: `pnpm dev`, then `pnpm lint`

**Debugging**:
- Check browser console for runtime errors
- Use React DevTools browser extension for component hierarchy
- Check `pnpm build` output for TypeScript errors before deployment
