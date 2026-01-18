---
applyTo: '**'
---

# Architecture & Design Guidelines

## Purpose
Standardize system design patterns and technical structures for building a **static website** using Next.js with static export. All pages should be pre-rendered at build time with no server-side dependencies.

---

## Static Website Architecture

### Core Principles

1. **Static Export Only** - Use `output: 'export'` in next.config.ts
2. **No Server Dependencies** - No API routes, no server actions, no dynamic server rendering
3. **Client-Side Interactivity** - All dynamic behavior happens in the browser
4. **Pre-rendered Pages** - All pages are generated at build time as HTML/CSS/JS
5. **CDN-Ready** - Output can be deployed to any static hosting (Vercel, Netlify, GitHub Pages, S3, etc.)

### Next.js Static Configuration

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',           // Enable static export
  trailingSlash: true,        // Add trailing slashes for static hosting
  images: {
    unoptimized: true,        // Required for static export
  },
  // No rewrites, redirects, or headers that require a server
};

export default nextConfig;
```

### File Structure for Static Sites

```
app/
├── layout.tsx              # Root layout (client component if needed)
├── page.tsx                # Home page
├── globals.css             # Global styles
├── components/             # Reusable components
│   ├── ui/                # Base UI elements
│   ├── layout/            # Header, Footer, Navigation
│   └── sections/          # Page sections (Hero, Features, etc.)
├── lib/                    # Utilities and helpers
├── data/                   # Static data (JSON, constants)
├── [feature]/              # Feature pages
│   └── page.tsx
public/                     # Static assets (images, fonts, icons)
out/                        # Generated static files (after build)
```

### What's NOT Allowed in Static Sites

```typescript
// ❌ NO Server Actions
'use server';  // Not allowed

// ❌ NO API Routes
// app/api/users/route.ts - Not allowed

// ❌ NO Dynamic Server Functions
export const dynamic = 'force-dynamic';  // Not allowed
export const revalidate = 60;            // Not allowed

// ❌ NO Server-Side Data Fetching at Runtime
async function getServerSideData() {
  // This runs at build time only, not request time
}

// ❌ NO cookies(), headers() at runtime
import { cookies, headers } from 'next/headers';  // Not for runtime

// ❌ NO Dynamic Route Segments without generateStaticParams
// [id]/page.tsx requires generateStaticParams()
```

### What's ALLOWED in Static Sites

```typescript
// ✅ Client Components with interactivity
'use client';
import { useState, useEffect } from 'react';

// ✅ Static Data at Build Time
const data = await fetch('https://api.example.com/data');

// ✅ generateStaticParams for dynamic routes
export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

// ✅ Client-side API calls
useEffect(() => {
  fetch('/api/external-service').then(res => res.json());
}, []);

// ✅ localStorage, sessionStorage
const saved = localStorage.getItem('preference');

// ✅ Third-party client SDKs
import { analytics } from 'third-party-sdk';
```

---

## Design Inspiration: Publicis Sapient Enterprise Aesthetic

*Inspired by [Publicis Sapient Wealth Management Accelerator](https://www.publicissapient.com/solutions/wealth-management-accelerator) - Clean, Professional, Human-Centered*

### Color Palette

**Primary Brand Colors**
```css
--ps-orange: #FF5900;              /* Primary brand accent - CTAs, highlights */
--ps-orange-hover: #E64E00;        /* Hover state for primary */
--ps-coral: #FF7847;               /* Secondary accent - gradients, decorative */
```

**Neutral Palette**
```css
--ps-black: #000000;               /* Headings, primary text */
--ps-charcoal: #1A1A1A;            /* Dark backgrounds, cards (dark mode) */
--ps-slate: #2D2D2D;               /* Secondary dark surfaces */
--ps-gray-700: #4A4A4A;            /* Secondary text */
--ps-gray-500: #6B6B6B;            /* Muted text, placeholders */
--ps-gray-300: #B3B3B3;            /* Borders, dividers */
--ps-gray-100: #F5F5F5;            /* Light backgrounds, hover states */
--ps-white: #FFFFFF;               /* Cards, text on dark backgrounds */
```

**Background & Surface**
```css
--bg-light: #FFFFFF;               /* Light mode primary background */
--bg-light-secondary: #F8F9FA;     /* Light mode secondary/card background */
--bg-dark: #0D0D0D;                /* Dark mode primary background */
--bg-dark-secondary: #1A1A1A;      /* Dark mode secondary/card background */
--bg-hover-light: #F5F5F5;         /* Light mode hover */
--bg-hover-dark: #2D2D2D;          /* Dark mode hover */
```

**Text Colors**
```css
--text-primary: #000000;           /* Headings, primary text (light mode) */
--text-primary-dark: #FFFFFF;      /* Headings (dark mode) */
--text-secondary: #4A4A4A;         /* Body text (light mode) */
--text-secondary-dark: #B3B3B3;    /* Body text (dark mode) */
--text-muted: #6B6B6B;             /* Captions, placeholders */
--text-accent: #FF5900;            /* Links, active states */
```

**Semantic Colors**
```css
--success: #00A878;                /* Positive trends, success states */
--warning: #FFB800;                /* Warnings, caution states */
--error: #E53935;                  /* Errors, critical alerts */
--info: #2196F3;                   /* Information, links, progress */
```

### Typography

**Font Stack**
```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-display: 'Inter', sans-serif;     /* Headings, display text */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;  /* Code, data */
```

**Type Scale (Clean & Professional)**
```css
--text-xs: 0.75rem;     /* 12px - Labels, captions */
--text-sm: 0.875rem;    /* 14px - Secondary text, metadata */
--text-base: 1rem;      /* 16px - Body text */
--text-lg: 1.125rem;    /* 18px - Lead paragraphs */
--text-xl: 1.25rem;     /* 20px - Card titles */
--text-2xl: 1.5rem;     /* 24px - Section headers */
--text-3xl: 2rem;       /* 32px - Page titles */
--text-4xl: 2.5rem;     /* 40px - Hero headlines */
--text-display: 3.5rem; /* 56px - Display headlines */
```

**Font Weights**
```css
--font-light: 300;      /* Large display text */
--font-regular: 400;    /* Body text */
--font-medium: 500;     /* Navigation, Labels */
--font-semibold: 600;   /* Headings, Buttons */
--font-bold: 700;       /* Emphasis, CTAs */
```

### Spacing & Layout

**Spacing Scale**
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-24: 6rem;     /* 96px */
```

**Grid System**
- Fluid container with max-width `1440px`
- 12-column grid with `24px` gutter
- Clean, spacious layouts for enterprise readability

**Border Radius**
```css
--radius-sm: 4px;      /* Inputs, small elements */
--radius-md: 8px;      /* Buttons, tags */
--radius-lg: 12px;     /* Cards, containers */
--radius-xl: 16px;     /* Large cards, modals */
--radius-2xl: 24px;    /* Hero sections */
--radius-full: 9999px; /* Pills, avatars */
```

### UI Component Styling

**Buttons**
```css
/* Primary - Orange Solid */
.btn-primary {
  background: var(--ps-orange);
  color: var(--ps-white);
  border-radius: var(--radius-md);
  padding: 12px 24px;
  font-weight: 600;
  transition: all 0.2s ease;
  border: none;
}

.btn-primary:hover {
  background: var(--ps-orange-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 89, 0, 0.25);
}

/* Secondary - Outline */
.btn-secondary {
  background: transparent;
  border: 2px solid var(--ps-orange);
  color: var(--ps-orange);
  border-radius: var(--radius-md);
  padding: 11px 23px;
}

.btn-secondary:hover {
  background: rgba(255, 89, 0, 0.05);
}

/* Ghost Button */
.btn-ghost {
  background: transparent;
  color: var(--ps-gray-700);
  border: none;
  padding: 12px 24px;
}

.btn-ghost:hover {
  background: var(--ps-gray-100);
  color: var(--ps-black);
}
```

**Cards**
```css
/* Light Mode Card */
.card {
  background: var(--ps-white);
  border: 1px solid var(--ps-gray-300);
  border-radius: var(--radius-lg);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Dark Mode Card */
.card-dark {
  background: var(--ps-charcoal);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
}

/* Featured Card */
.card-featured {
  border-left: 4px solid var(--ps-orange);
}
```

**Form Inputs**
```css
.input {
  background: var(--ps-white);
  border: 1px solid var(--ps-gray-300);
  border-radius: var(--radius-sm);
  padding: 12px 16px;
  font-size: var(--text-base);
  transition: all 0.2s ease;
}

.input:focus {
  border-color: var(--ps-orange);
  box-shadow: 0 0 0 3px rgba(255, 89, 0, 0.1);
  outline: none;
}

.input::placeholder {
  color: var(--ps-gray-500);
}
```

**Visual Effects**
- **Shadows**: Subtle, layered shadows for depth
- **Transitions**: Smooth 0.2s ease for interactions
- **Focus states**: Orange accent with subtle glow

### Design Principles for Enterprise Applications

1.  **Trust through Clarity**
    - Clean, uncluttered layouts
    - Professional typography (Inter)
    - Consistent spacing and alignment
    - Clear visual hierarchy

2.  **Human-Centered Design**
    - Accessible color contrast
    - Readable font sizes
    - Intuitive navigation patterns
    - Helpful error messages

3.  **Visual Professionalism**
    - Use of subtle borders and different shades of navy/black to create hierarchy without heavy drop shadows.
    - "Flat 2.0" aesthetic—mostly flat but with depth from lighting/gradients.

---

## System Architecture Principles

### Separation of Concerns
- Keep UI, business logic, and data access layers separate
- Each module/component should have a single, well-defined responsibility
- Avoid mixing concerns within the same file or function

### Modularity
- Design components to be self-contained and reusable
- Use clear interfaces between modules
- Minimize dependencies between unrelated modules

### Scalability
- Design systems to handle increased load gracefully
- Use stateless components where possible
- Consider horizontal scaling in architecture decisions

---

## Design Patterns

### Component Architecture (Next.js/React)
```
app/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI elements (Button, Input, Card)
│   ├── layout/          # Layout components (Header, Footer, Sidebar)
│   └── features/        # Feature-specific components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and helpers
├── services/            # API and external service integrations
├── types/               # TypeScript type definitions
└── constants/           # Application constants
```

### Server vs Client Components
- **Default to Server Components** for better performance
- Use Client Components (`'use client'`) only when:
  - Using React hooks (useState, useEffect, etc.)
  - Handling user interactions (onClick, onChange)
  - Accessing browser-only APIs
  - Using third-party client libraries

### Data Flow Patterns
- **Unidirectional data flow**: Props down, events up
- Use React Context sparingly for truly global state
- Prefer composition over prop drilling
- Colocate state as close to where it's used as possible

### API Design
- Follow RESTful conventions for API routes
- Use consistent response structures:
  ```typescript
  interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: {
      code: string;
      message: string;
    };
  }
  ```
- Implement proper error handling and status codes
- Version APIs when breaking changes are necessary

---

## Security Protocols

### Authentication & Authorization
- Never expose sensitive credentials in client-side code
- Use environment variables for secrets (`.env.local`)
- Implement proper session management
- Validate user permissions on both client and server

### Data Protection
- Sanitize all user inputs
- Use parameterized queries to prevent SQL injection
- Implement CSRF protection for forms
- Validate and sanitize data on the server, never trust client input

### API Security
- Implement rate limiting on API routes
- Use HTTPS for all communications
- Validate request origins with CORS policies
- Never expose internal error details to clients

### Environment Variables
```bash
# Public (exposed to browser) - prefix with NEXT_PUBLIC_
NEXT_PUBLIC_API_URL=https://api.example.com

# Private (server-only) - no prefix
DATABASE_URL=postgresql://...
API_SECRET_KEY=...
```

---

## Code Organization Standards

### File Naming
| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `UserProfile.tsx` |
| Hooks | camelCase with `use` prefix | `useAuth.ts` |
| Utilities | camelCase | `formatDate.ts` |
| Types/Interfaces | PascalCase | `User.types.ts` |
| Constants | UPPER_SNAKE_CASE | `API_ENDPOINTS.ts` |
| Routes/Pages | lowercase-kebab | `user-settings/page.tsx` |

### Import Organization
```typescript
// 1. External libraries
import { useState, useEffect } from 'react';
import Image from 'next/image';

// 2. Internal modules (absolute imports)
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

// 3. Types
import type { User } from '@/types/User';

// 4. Relative imports (styles, local files)
import styles from './Component.module.css';
```

### Absolute Imports
Configure and use absolute imports for cleaner paths:
```typescript
// ✅ Good
import { Button } from '@/components/ui/Button';

// ❌ Avoid
import { Button } from '../../../components/ui/Button';
```

---

## Error Handling Architecture

### Error Boundaries
- Implement error boundaries for graceful failure handling
- Provide user-friendly error messages
- Log errors for debugging (server-side)

### Try-Catch Patterns
```typescript
async function fetchData(): Promise<Result<Data, Error>> {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return { success: false, error };
  }
}
```

### Error Logging
- Use structured logging format
- Include context (user ID, request ID, timestamp)
- Never log sensitive information (passwords, tokens)

---

## Performance Guidelines

### Rendering Optimization
- Use React.memo() for expensive pure components
- Implement proper key props for lists
- Avoid inline function definitions in JSX
- Use useMemo/useCallback appropriately (not everywhere)

### Data Fetching
- Leverage Next.js caching strategies
- Implement loading and error states
- Use optimistic updates for better UX
- Deduplicate requests where possible

### Bundle Optimization
- Use dynamic imports for code splitting
- Analyze bundle size regularly
- Tree-shake unused code
- Lazy load below-the-fold content

---

## Testing Architecture

### Test Structure
```
__tests__/
├── unit/           # Unit tests for functions/hooks
├── components/     # Component tests
├── integration/    # Integration tests
└── e2e/           # End-to-end tests
```

### Testing Priorities
1. **Critical paths**: Authentication, payments, core features
2. **Business logic**: Utility functions, calculations
3. **Component behavior**: User interactions
4. **Edge cases**: Error states, empty states

---

## Documentation Requirements

### Code Documentation
- Document complex business logic with comments
- Use JSDoc for public APIs and utilities
- Keep README files updated
- Document architectural decisions (ADRs)

### Component Documentation
```typescript
/**
 * Button component with gaming aesthetic styling.
 * 
 * @param label - Button text content
 * @param variant - Visual style variant
 * @param onClick - Click handler function
 * @param disabled - Whether the button is disabled
 * 
 * @example
 * <Button label="Start Game" variant="primary" onClick={handleStart} />
 */
```

---

## Compliance Checklist

Before merging code, ensure:
- [ ] Follows separation of concerns
- [ ] Uses appropriate design patterns
- [ ] Implements proper error handling
- [ ] Follows security protocols
- [ ] Has necessary documentation
- [ ] Passes all tests
- [ ] No sensitive data exposed
- [ ] Follows naming conventions
