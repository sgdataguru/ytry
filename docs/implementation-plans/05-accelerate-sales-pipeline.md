# 05 Accelerate Sales Pipeline - Implementation Plan

## Project Context
**Technical Stack**: Next.js 16 (App Router), React 19, TypeScript, TailwindCSS 4
**Design System**: Publicis Sapient Enterprise Aesthetic (Clean, Professional, Human-Centered)
**Infrastructure**: Vercel deployment

---

## User Story

**As a** sales representative,
**I want** AI-driven insights on my pipeline opportunities,
**so that** I can prioritize high-potential deals and accelerate revenue growth.

---

## Pre-conditions

- User is authenticated with sales role
- CRM data is connected and synced
- AI scoring model is trained and operational
- Historical deal data is available
- Pipeline stages are defined

---

## Business Requirements

| Requirement | Success Metric |
|-------------|----------------|
| AI win probability score | Scores displayed for 100% of opportunities |
| Next best actions | Recommendations for all active deals |
| Momentum change alerts | Alerts within 1 hour of change detection |
| Historical pattern matching | 85%+ prediction accuracy |
| Revenue impact projection | Projections available for all recommendations |

---

## Technical Specifications

### Integration Points
- **CRM Service**: Deal and contact data sync
- **AI Scoring Engine**: Win probability calculations
- **Activity Tracking**: Engagement and interaction data
- **Notification Service**: Alert delivery
- **Analytics Service**: Revenue projections

### Security Requirements
- Sales territory data isolation
- Deal confidentiality controls
- Audit logging for deal access
- Manager-only aggregate views
- Data retention compliance

---

## Design Specifications

### Visual Layout & Components

```
┌─────────────────────────────────────────────────────────────────┐
│ [Header - Sales Pipeline]                                        │
│  My Pipeline | Team Pipeline | Analytics | [+ Add Deal]          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 📊 PIPELINE SUMMARY                                        │   │
│  │ Total: $2.4M | High Priority: $850K | At Risk: $320K      │   │
│  │ AI Predicted Close This Month: $1.1M (78% confidence)     │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 🎯 PRIORITY OPPORTUNITIES                    [Sort ▼]     │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ DEAL CARD                                                  │   │
│  │ ─────────────────────────────────────────────────────────  │   │
│  │ Acme Corp - Enterprise License                            │   │
│  │ $125,000 | Stage: Negotiation | Close: Jan 30             │   │
│  │                                                            │   │
│  │ Win Probability:  ████████████░░░░ 78% [↑12% this week]   │   │
│  │                                                            │   │
│  │ 💡 NEXT BEST ACTION:                                       │   │
│  │ "Schedule executive sponsor meeting - deals with          │   │
│  │  exec involvement close 40% faster"                        │   │
│  │                                                            │   │
│  │ 📈 Revenue Impact: +$125K if closed this month            │   │
│  │                                                            │   │
│  │ [View Details]  [Log Activity]  [Schedule Action]         │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ ⚠️ MOMENTUM ALERTS                                         │   │
│  │ ─────────────────────────────────────────────────────────  │   │
│  │ 🔴 TechStart Inc - Win probability dropped 25%            │   │
│  │    Reason: No activity in 14 days, competitor mentioned   │   │
│  │    Recommended: Re-engage with value proposition refresh  │   │
│  │                                                            │   │
│  │ 🟢 GlobalFin - Win probability increased 18%              │   │
│  │    Reason: Budget approved, multiple stakeholder meetings │   │
│  │    Recommended: Propose final terms                        │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 📊 DEAL DETAIL (Expanded)                                  │   │
│  │ ─────────────────────────────────────────────────────────  │   │
│  │ Similar Won Deals:                                         │   │
│  │ ┌────────────────────────────────────────────────────┐    │   │
│  │ │ [Deal Pattern Chart - factors that led to wins]    │    │   │
│  │ └────────────────────────────────────────────────────┘    │   │
│  │                                                            │   │
│  │ Key Success Factors:                                       │   │
│  │ ✅ Executive sponsor identified                            │   │
│  │ ✅ Budget confirmed                                        │   │
│  │ ⬜ Technical validation complete                           │   │
│  │ ⬜ Legal review started                                    │   │
│  │                                                            │   │
│  │ Activity Timeline: [Interactive Timeline]                  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```tsx
<SalesPipelineLayout>
  <PipelineHeader>
    <ViewTabs />
    <AddDealButton />
  </PipelineHeader>
  <MainContent>
    <PipelineSummary>
      <TotalValueCard />
      <PriorityValueCard />
      <AtRiskValueCard />
      <PredictedCloseCard />
    </PipelineSummary>
    <PriorityOpportunities>
      <SortControls />
      <DealCard>
        <DealHeader />
        <WinProbabilityBar />
        <NextBestAction />
        <RevenueImpact />
        <DealActions />
      </DealCard>
    </PriorityOpportunities>
    <MomentumAlerts>
      <AlertCard>
        <ChangeIndicator />
        <ReasonExplanation />
        <RecommendedAction />
      </AlertCard>
    </MomentumAlerts>
    <DealDetailPanel>
      <SimilarDealsChart />
      <SuccessFactorChecklist />
      <ActivityTimeline />
    </DealDetailPanel>
  </MainContent>
</SalesPipelineLayout>
```

### Design System Compliance

**Color Palette (Publicis Sapient Enterprise Aesthetic)**:
```css
/* Primary Brand Colors */
--ps-orange: #FF5900;              /* Primary brand accent */
--ps-coral: #FF7847;               /* Secondary accent */

/* Win Probability Colors */
--probability-high: #00A878;       /* 70%+ win probability */
--probability-medium: #FFB800;     /* 40-69% win probability */
--probability-low: #E53935;        /* <40% win probability */

/* Momentum Indicators */
--momentum-up: #00A878;            /* Positive trend */
--momentum-down: #E53935;          /* Negative trend */
--momentum-stable: #6B6B6B;        /* No change */

/* Pipeline Specific */
--deal-value: #2196F3;             /* Deal value highlight */
--action-highlight: #FF5900;       /* Next action CTA */
--alert-urgent: #E53935;           /* Urgent attention */

/* Neutral Palette */
--ps-black: #000000;
--ps-charcoal: #1A1A1A;
--ps-slate: #2D2D2D;
--ps-gray-500: #6B6B6B;
--ps-gray-300: #B3B3B3;
--ps-white: #FFFFFF;
```

**Typography**:
```css
--font-primary: 'Inter', -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

**Component Styling**:
```css
.deal-card {
  background: var(--ps-white);
  border: 1px solid var(--ps-gray-300);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
}
.deal-card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border-color: var(--ps-orange);
}
.probability-bar {
  background: var(--ps-gray-100);
  border-radius: 4px;
  height: 8px;
}
```

### Interaction Patterns

**Win Probability Display**:
- Color-coded progress bar
- Trend indicator (↑↓)
- Hover for detailed factors
- Click for full breakdown

**Alert Interactions**:
- Swipe to dismiss (mobile)
- Quick action buttons
- Expand for full context
- Priority sorting

---

## Technical Architecture

### Component Structure

```
app/
├── pipeline/
│   ├── page.tsx
│   ├── [dealId]/
│   │   └── page.tsx
│   └── components/
│       ├── PipelineSummary.tsx
│       ├── DealCard/
│       │   ├── DealCard.tsx
│       │   ├── WinProbabilityBar.tsx
│       │   ├── NextBestAction.tsx
│       │   └── RevenueImpact.tsx
│       ├── MomentumAlerts/
│       │   ├── AlertsContainer.tsx
│       │   ├── AlertCard.tsx
│       │   └── ChangeIndicator.tsx
│       ├── DealDetail/
│       │   ├── DetailPanel.tsx
│       │   ├── SimilarDealsChart.tsx
│       │   ├── SuccessFactors.tsx
│       │   └── ActivityTimeline.tsx
│       └── hooks/
│           ├── usePipeline.ts
│           ├── useWinProbability.ts
│           ├── useMomentumAlerts.ts
│           └── useNextBestActions.ts
└── lib/
    ├── pipeline/
    │   ├── pipeline-api.ts
    │   ├── probability-calculator.ts
    │   └── action-recommender.ts
    └── types/
        └── pipeline.ts
```

### State Management

```typescript
interface PipelineState {
  deals: Deal[];
  selectedDeal: Deal | null;
  alerts: MomentumAlert[];
  summary: PipelineSummary;
  filters: PipelineFilters;
  isLoading: boolean;
}

interface Deal {
  id: string;
  name: string;
  company: Company;
  value: number;
  stage: DealStage;
  expectedCloseDate: Date;
  winProbability: WinProbability;
  nextBestAction: NextBestAction;
  revenueImpact: RevenueImpact;
  activities: Activity[];
  successFactors: SuccessFactor[];
  similarDeals: SimilarDeal[];
  owner: User;
  createdAt: Date;
  updatedAt: Date;
}

interface WinProbability {
  score: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  factors: ProbabilityFactor[];
  lastCalculated: Date;
}

interface NextBestAction {
  id: string;
  action: string;
  reasoning: string;
  expectedImpact: string;
  priority: 'high' | 'medium' | 'low';
  deadline?: Date;
}

interface MomentumAlert {
  id: string;
  dealId: string;
  type: 'increase' | 'decrease';
  changeValue: number;
  reason: string;
  recommendation: string;
  createdAt: Date;
  isRead: boolean;
}
```

### API Integration

```typescript
interface PipelineAPI {
  GET: {
    '/api/pipeline/deals': { 
      query: PipelineFilters;
      response: PaginatedResponse<Deal>;
    };
    '/api/pipeline/deals/{id}': { response: DealDetail };
    '/api/pipeline/deals/{id}/probability': { response: WinProbability };
    '/api/pipeline/deals/{id}/actions': { response: NextBestAction[] };
    '/api/pipeline/deals/{id}/similar': { response: SimilarDeal[] };
    '/api/pipeline/alerts': { response: MomentumAlert[] };
    '/api/pipeline/summary': { response: PipelineSummary };
  };
  POST: {
    '/api/pipeline/deals/{id}/activity': { 
      body: ActivityDto;
      response: Activity;
    };
    '/api/pipeline/alerts/{id}/dismiss': { response: void };
    '/api/pipeline/alerts/{id}/action': { 
      body: ActionTakenDto;
      response: void;
    };
  };
}
```

---

## Implementation Requirements

### Core Components

| Component | Description | Priority |
|-----------|-------------|----------|
| PipelineSummary | Aggregate pipeline metrics | P0 |
| DealCard | Individual deal display | P0 |
| WinProbabilityBar | AI score visualization | P0 |
| NextBestAction | Action recommendations | P0 |
| MomentumAlerts | Change notifications | P0 |
| DealDetailPanel | Expanded deal view | P1 |
| SimilarDealsChart | Historical pattern display | P1 |
| ActivityTimeline | Deal activity history | P1 |

### Custom Hooks

| Hook | Purpose |
|------|---------|
| usePipeline() | Fetch and filter deals |
| useWinProbability() | Real-time score updates |
| useMomentumAlerts() | Alert management |
| useNextBestActions() | Action recommendations |
| useDealDetail() | Full deal information |

---

## Acceptance Criteria Checklist

### Functional Requirements
- [ ] Each opportunity displays an AI-generated win probability score
- [ ] System recommends next best actions for each deal
- [ ] Alerts notify user when deal momentum changes
- [ ] Historical patterns inform predictions
- [ ] User can see projected revenue impact of focusing on recommended deals

### Non-Functional Requirements
- [ ] Probability calculation < 2 seconds
- [ ] Alert delivery < 1 hour of change
- [ ] 85%+ prediction accuracy
- [ ] Mobile-responsive interface
- [ ] Accessibility compliant

---

## Modified Files

```
app/
├── pipeline/
│   ├── page.tsx ⬜
│   ├── [dealId]/page.tsx ⬜
│   └── components/
│       ├── PipelineSummary.tsx ⬜
│       ├── DealCard/
│       │   ├── DealCard.tsx ⬜
│       │   ├── WinProbabilityBar.tsx ⬜
│       │   └── NextBestAction.tsx ⬜
│       ├── MomentumAlerts/
│       │   ├── AlertsContainer.tsx ⬜
│       │   └── AlertCard.tsx ⬜
│       ├── DealDetail/
│       │   ├── DetailPanel.tsx ⬜
│       │   └── SimilarDealsChart.tsx ⬜
│       └── hooks/
│           ├── usePipeline.ts ⬜
│           └── useMomentumAlerts.ts ⬜
├── lib/pipeline/
│   ├── pipeline-api.ts ⬜
│   └── probability-calculator.ts ⬜
└── types/pipeline.ts ⬜
```

---

## Implementation Status

**OVERALL STATUS: ⬜ NOT STARTED**

### Phase 1: Foundation
- [ ] Create pipeline route structure
- [ ] Define TypeScript types
- [ ] Set up API integration
- [ ] Create base components

### Phase 2: Core Features
- [ ] Implement PipelineSummary
- [ ] Build DealCard with probability
- [ ] Create WinProbabilityBar
- [ ] Add NextBestAction display

### Phase 3: Intelligence Features
- [ ] Implement MomentumAlerts
- [ ] Build SimilarDealsChart
- [ ] Add SuccessFactors checklist
- [ ] Create ActivityTimeline

### Phase 4: Polish
- [ ] Add real-time updates
- [ ] Implement filtering/sorting
- [ ] Add mobile responsiveness
- [ ] Write tests

---

## Dependencies

### Internal
- CRM data integration
- AI scoring service
- Notification system

### External
- ML inference API
- Activity tracking
- Calendar integration

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Low prediction accuracy | High | Continuous model training |
| Stale CRM data | Medium | Real-time sync, indicators |
| Alert fatigue | Medium | Smart filtering, priorities |
| Privacy concerns | High | Data access controls |

---

## Testing Strategy

### Unit Tests
- Probability bar rendering
- Alert card interactions
- Revenue calculations

### Integration Tests
- Deal list filtering
- Alert management flow
- Action logging

### E2E Tests
- Complete deal workflow
- Alert response flow
- Mobile experience

---

## Documentation Requirements

- [ ] Win probability methodology
- [ ] Action recommendation logic
- [ ] API integration guide
- [ ] User training materials
