# 01 View Actionable Insights Dashboard - Implementation Plan

## Project Context
**Technical Stack**: Next.js 16 (App Router), React 19, TypeScript, TailwindCSS 4
**Design System**: Publicis Sapient Enterprise Aesthetic (Clean, Professional, Human-Centered)
**Infrastructure**: Vercel deployment

---

## User Story

**As a** business leader,
**I want** to view a dashboard that provides actionable direction instead of just raw data visualizations,
**so that** I can make informed decisions quickly without spending time interpreting complex metrics.

---

## Pre-conditions

- User is authenticated and has appropriate role permissions
- Data sources are connected and actively syncing
- AI recommendation engine is operational
- User has at least one active project/workspace

---

## Business Requirements

| Requirement | Success Metric |
|-------------|----------------|
| Display prioritized recommendations | Users act on 60%+ of shown recommendations |
| Clear action items with expected impact | Average decision time reduced by 40% |
| Categorized urgency levels | Critical actions addressed within 24 hours |
| Drill-down capability | 80%+ users utilize drill-down feature |
| Real-time updates | Data freshness < 5 minutes |

---

## Technical Specifications

### Integration Points
- **Authentication**: Session-based auth with role verification
- **Data Layer**: Real-time WebSocket connection for live updates
- **AI Engine**: REST API for recommendations fetch
- **Analytics**: Event tracking for user interactions

### Security Requirements
- Role-based dashboard access (Admin, Leader, Viewer)
- Data visibility scoped to user's organizational unit
- Audit logging for sensitive data access
- Rate limiting on API endpoints

---

## Design Specifications

### Visual Layout & Components

```
┌─────────────────────────────────────────────────────────────────┐
│ [Header - Navigation Bar]                                        │
│  Logo | Dashboard | Experiments | Impact | Settings | Profile    │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ PRIORITY INSIGHTS                            [Filter ▼]   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │ 🔴 IMMEDIATE    │  │ 🟡 SHORT-TERM   │  │ 🔵 STRATEGIC    │  │
│  │                 │  │                 │  │                 │  │
│  │ [InsightCard]   │  │ [InsightCard]   │  │ [InsightCard]   │  │
│  │ [InsightCard]   │  │ [InsightCard]   │  │ [InsightCard]   │  │
│  │ [InsightCard]   │  │ [InsightCard]   │  │ [InsightCard]   │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ INSIGHT DETAIL PANEL (Slide-out)                          │   │
│  │ Title: [Insight Title]                                    │   │
│  │ Impact: [High/Medium/Low]  |  Confidence: [85%]           │   │
│  │ [Action Item Description]                                  │   │
│  │ Supporting Data: [Interactive Chart/Graph]                 │   │
│  │ [Take Action]  [Dismiss]  [Snooze]                        │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```tsx
<DashboardLayout>
  <Header>
    <Navigation />
    <UserMenu />
  </Header>
  <MainContent>
    <InsightsDashboard>
      <DashboardHeader>
        <Title />
        <FilterControls />
        <RefreshIndicator />
      </DashboardHeader>
      <InsightsGrid>
        <InsightColumn category="immediate" />
        <InsightColumn category="short-term" />
        <InsightColumn category="strategic" />
      </InsightsGrid>
      <InsightDetailPanel />
    </InsightsDashboard>
  </MainContent>
</DashboardLayout>
```

### Design System Compliance

**Color Palette (Publicis Sapient Enterprise Aesthetic)**:
```css
/* Primary Brand Colors */
--ps-orange: #FF5900;              /* Primary brand accent */
--ps-orange-hover: #E64E00;        /* Hover state */
--ps-coral: #FF7847;               /* Secondary accent */

/* Neutral Palette */
--ps-black: #000000;               /* Headings, primary text */
--ps-charcoal: #1A1A1A;            /* Dark backgrounds */
--ps-slate: #2D2D2D;               /* Card backgrounds (dark mode) */
--ps-gray-700: #4A4A4A;            /* Secondary text */
--ps-gray-500: #6B6B6B;            /* Muted text */
--ps-gray-300: #B3B3B3;            /* Borders, dividers */
--ps-gray-100: #F5F5F5;            /* Light backgrounds */
--ps-white: #FFFFFF;               /* Card backgrounds, text on dark */

/* Semantic Colors */
--ps-success: #00A878;             /* Success states, positive trends */
--ps-warning: #FFB800;             /* Warnings, caution */
--ps-error: #E53935;               /* Errors, critical alerts */
--ps-info: #2196F3;                /* Information, links */

/* Background Modes */
--bg-light: #FFFFFF;               /* Light mode background */
--bg-dark: #0D0D0D;                /* Dark mode background */
--bg-surface-light: #F8F9FA;       /* Light mode cards */
--bg-surface-dark: #1A1A1A;        /* Dark mode cards */
```

**Typography (Clean Professional)**:
```css
/* Font Family */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-display: 'Inter', sans-serif;  /* Headings */
--font-mono: 'JetBrains Mono', monospace;  /* Code, data */

/* Type Scale */
--text-display: 3.5rem;    /* 56px - Hero headlines */
--text-h1: 2.5rem;         /* 40px - Page titles */
--text-h2: 2rem;           /* 32px - Section headers */
--text-h3: 1.5rem;         /* 24px - Card titles */
--text-h4: 1.25rem;        /* 20px - Subsections */
--text-body: 1rem;         /* 16px - Body text */
--text-small: 0.875rem;    /* 14px - Secondary text */
--text-xs: 0.75rem;        /* 12px - Labels, captions */

/* Font Weights */
--font-light: 300;
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

**Spacing & Layout**:
```css
/* Spacing Scale */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */

/* Border Radius */
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;

/* Shadows */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
--shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.15);
```

**Component Styling**:
```css
/* Buttons */
.btn-primary {
  background: var(--ps-orange);
  color: var(--ps-white);
  border-radius: var(--radius-md);
  padding: 12px 24px;
  font-weight: 600;
  transition: all 0.2s ease;
}
.btn-primary:hover {
  background: var(--ps-orange-hover);
  transform: translateY(-1px);
}

/* Cards */
.card {
  background: var(--ps-white);
  border: 1px solid var(--ps-gray-300);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.2s ease;
}
.card:hover {
  box-shadow: var(--shadow-md);
}

/* Dark Mode Cards */
.card-dark {
  background: var(--ps-slate);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| Mobile (< 768px) | Single column, stacked cards |
| Tablet (768px - 1023px) | 2 columns, collapsible detail |
| Desktop (1024px+) | 3 columns with slide-out panel |

---

## Technical Architecture

### Component Structure

```
app/
├── dashboard/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   └── components/
│       ├── InsightsDashboard.tsx
│       ├── InsightsGrid.tsx
│       ├── InsightColumn.tsx
│       ├── InsightCard.tsx
│       ├── InsightDetailPanel.tsx
│       ├── FilterControls.tsx
│       ├── RefreshIndicator.tsx
│       └── hooks/
│           ├── useInsights.ts
│           ├── useDashboardState.ts
│           └── useRealTimeUpdates.ts
├── components/ui/
│   ├── Button.tsx
│   ├── Card.tsx
│   └── Badge.tsx
└── lib/
    ├── api/insights-api.ts
    └── utils/insights-utils.ts
```

### State Management

```typescript
interface DashboardState {
  insights: Insight[];
  selectedInsight: Insight | null;
  filters: {
    urgency: UrgencyLevel[];
    category: string[];
    dateRange: DateRange;
  };
  isLoading: boolean;
  isDetailPanelOpen: boolean;
  lastUpdated: Date;
  connectionStatus: 'connected' | 'disconnected' | 'reconnecting';
}

interface Insight {
  id: string;
  title: string;
  description: string;
  actionItem: string;
  urgency: 'immediate' | 'short-term' | 'strategic';
  impact: 'high' | 'medium' | 'low';
  confidenceScore: number;
  expectedOutcome: string;
  supportingData: DataPoint[];
  createdAt: Date;
  expiresAt?: Date;
  status: 'active' | 'dismissed' | 'actioned';
}
```

### API Integration

```typescript
interface InsightsAPI {
  GET: {
    '/api/insights': { response: PaginatedResponse<Insight> };
    '/api/insights/{id}': { response: InsightDetail };
    '/api/insights/{id}/data': { response: SupportingData };
  };
  POST: {
    '/api/insights/{id}/action': { body: ActionDto; response: ActionResult };
    '/api/insights/{id}/dismiss': { body: DismissDto; response: void };
    '/api/insights/{id}/snooze': { body: SnoozeDto; response: void };
  };
}
```

---

## Implementation Requirements

### Core Components

| Component | Description | Priority |
|-----------|-------------|----------|
| InsightsDashboard.tsx | Main dashboard container | P0 |
| InsightCard.tsx | Insight summary card | P0 |
| InsightDetailPanel.tsx | Slide-out detail panel | P0 |
| FilterControls.tsx | Filter dropdowns | P1 |
| RefreshIndicator.tsx | Real-time status | P1 |

### Custom Hooks

| Hook | Purpose |
|------|---------|
| useInsights() | Fetch and cache insights data |
| useDashboardState() | Manage local dashboard state |
| useRealTimeUpdates() | WebSocket connection |
| useInsightActions() | Handle action operations |

---

## Acceptance Criteria Checklist

### Functional Requirements
- [ ] Dashboard displays prioritized recommendations
- [ ] Each insight includes clear action item with expected impact
- [ ] Insights categorized by urgency (immediate, short-term, strategic)
- [ ] User can drill down into supporting data
- [ ] Dashboard updates in real-time

### Non-Functional Requirements
- [ ] Initial load < 2 seconds
- [ ] Interaction response < 200ms
- [ ] Bundle size increase < 50KB
- [ ] WCAG 2.1 AA compliance
- [ ] Keyboard navigation support

---

## Modified Files

```
app/
├── dashboard/
│   ├── page.tsx ⬜
│   ├── layout.tsx ⬜
│   ├── loading.tsx ⬜
│   ├── error.tsx ⬜
│   └── components/
│       ├── InsightsDashboard.tsx ⬜
│       ├── InsightsGrid.tsx ⬜
│       ├── InsightColumn.tsx ⬜
│       ├── InsightCard.tsx ⬜
│       ├── InsightDetailPanel.tsx ⬜
│       ├── FilterControls.tsx ⬜
│       └── hooks/
│           ├── useInsights.ts ⬜
│           └── useDashboardState.ts ⬜
├── components/ui/
│   ├── Button.tsx ⬜
│   ├── Card.tsx ⬜
│   └── Badge.tsx ⬜
├── lib/api/insights-api.ts ⬜
└── types/insights.ts ⬜
```

---

## Implementation Status

**OVERALL STATUS: ⬜ NOT STARTED**

### Phase 1: Foundation & Setup
- [ ] Create dashboard route structure
- [ ] Set up base layout with navigation
- [ ] Define TypeScript types and interfaces
- [ ] Create shared UI components

### Phase 2: Core Implementation
- [ ] Implement InsightsDashboard container
- [ ] Build InsightCard component
- [ ] Create InsightDetailPanel slide-out
- [ ] Implement useInsights data fetching hook

### Phase 3: Enhanced Features
- [ ] Add FilterControls component
- [ ] Implement real-time updates
- [ ] Add drill-down chart functionality
- [ ] Implement action/dismiss/snooze operations

### Phase 4: Polish & Testing
- [ ] Add loading skeletons and error states
- [ ] Implement responsive layouts
- [ ] Add keyboard navigation and accessibility
- [ ] Write unit and integration tests

---

## Dependencies

### Internal
- Authentication context/hook
- Shared UI component library
- API client configuration

### External
- recharts for data visualization
- WebSocket library for real-time updates
- framer-motion for animations (optional)

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Real-time connection instability | High | Implement reconnection logic |
| Large dataset performance | Medium | Virtual scrolling, pagination |
| AI recommendation latency | Medium | Show cached data with indicator |

---

## Testing Strategy

### Unit Tests
- InsightCard renders correctly with all urgency types
- Filter controls update state properly
- Utility functions handle edge cases

### Integration Tests
- Dashboard loads and displays insights
- Detail panel opens with correct data
- Real-time updates reflect in UI

### E2E Tests
- Complete user flow: View → Select → Drill-down → Action

---

## Documentation Requirements

- [ ] Component API documentation
- [ ] State management patterns
- [ ] API integration guide
- [ ] Accessibility guidelines
