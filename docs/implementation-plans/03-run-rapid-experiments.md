# 03 Run Rapid Experiments - Implementation Plan

## Project Context
**Technical Stack**: Next.js 16 (App Router), React 19, TypeScript, TailwindCSS 4
**Design System**: Publicis Sapient Enterprise Aesthetic (Clean, Professional, Human-Centered)
**Infrastructure**: Vercel deployment

---

## User Story

**As a** product manager,
**I want** to quickly set up and run experiments on new ideas,
**so that** I can validate hypotheses fast and iterate based on real-world feedback.

---

## Pre-conditions

- User is authenticated with experiment creation permissions
- At least one data source is connected
- Experiment infrastructure is operational
- User has defined baseline metrics
- Team members are available for experiment participation

---

## Business Requirements

| Requirement | Success Metric |
|-------------|----------------|
| Create experiment with hypothesis | 100% of experiments have defined hypothesis |
| Launch within minutes | Average setup time < 10 minutes |
| Real-time results tracking | Data refresh rate < 30 seconds |
| Statistical significance detection | Automatic notification at 95% confidence |
| Actionable learnings from failures | 100% of failed experiments have documented learnings |

---

## Technical Specifications

### Integration Points
- **Experiment Engine**: REST API for experiment CRUD
- **Analytics Service**: Real-time metrics collection
- **Statistical Engine**: Significance calculation service
- **Notification Service**: Alerts for milestone events
- **Data Warehouse**: Historical experiment data

### Security Requirements
- Role-based experiment access
- Data isolation between experiments
- Audit logging for all changes
- PII protection in experiment data
- Rate limiting on experiment creation

---

## Design Specifications

### Visual Layout & Components

```
┌─────────────────────────────────────────────────────────────────┐
│ [Header - Experiments Navigation]                                │
│  All Experiments | My Experiments | Templates | [+ New Experiment]│
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 🧪 CREATE NEW EXPERIMENT                                   │   │
│  │ ─────────────────────────────────────────────────────────  │   │
│  │                                                            │   │
│  │ Step 1: Define Hypothesis                                  │   │
│  │ ┌────────────────────────────────────────────────────┐    │   │
│  │ │ If we [action], then [expected outcome]            │    │   │
│  │ │ because [reasoning]                                 │    │   │
│  │ └────────────────────────────────────────────────────┘    │   │
│  │                                                            │   │
│  │ Step 2: Success Metrics                                    │   │
│  │ ┌────────────────────────────────────────────────────┐    │   │
│  │ │ Primary: [Select Metric]    Target: [Value] [%/abs] │    │   │
│  │ │ Secondary: [Select Metric]  Target: [Value] [%/abs] │    │   │
│  │ └────────────────────────────────────────────────────┘    │   │
│  │                                                            │   │
│  │ Step 3: Experiment Parameters                              │   │
│  │ Duration: [7 days ▼]  Sample Size: [Auto-calculate]       │   │
│  │ Audience: [All Users ▼]  Variants: [A/B ▼]                │   │
│  │                                                            │   │
│  │ [Save Draft]                          [🚀 Launch Experiment] │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 📊 LIVE EXPERIMENT DASHBOARD                              │   │
│  │ ─────────────────────────────────────────────────────────  │   │
│  │                                                            │   │
│  │ Experiment: [Name]        Status: 🟢 RUNNING               │   │
│  │ Progress: ████████░░░░ 65%    Time Left: 2d 14h           │   │
│  │                                                            │   │
│  │ ┌─────────────────┐  ┌─────────────────┐                  │   │
│  │ │ VARIANT A       │  │ VARIANT B       │                  │   │
│  │ │ Conversion: 4.2%│  │ Conversion: 5.1%│                  │   │
│  │ │ n = 1,234       │  │ n = 1,198       │                  │   │
│  │ └─────────────────┘  └─────────────────┘                  │   │
│  │                                                            │   │
│  │ Statistical Significance: 87% (Target: 95%)               │   │
│  │ [Chart: Conversion Over Time]                              │   │
│  │                                                            │   │
│  │ [Pause] [Stop] [View Details]                             │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```tsx
<ExperimentsLayout>
  <ExperimentsHeader>
    <TabNavigation />
    <CreateExperimentButton />
  </ExperimentsHeader>
  <MainContent>
    <ExperimentWizard>
      <HypothesisStep>
        <HypothesisBuilder />
      </HypothesisStep>
      <MetricsStep>
        <MetricSelector />
        <TargetInput />
      </MetricsStep>
      <ParametersStep>
        <DurationSelector />
        <AudienceSelector />
        <VariantConfig />
      </ParametersStep>
      <WizardActions />
    </ExperimentWizard>
    <LiveDashboard>
      <ExperimentHeader />
      <ProgressBar />
      <VariantComparison />
      <SignificanceIndicator />
      <ResultsChart />
      <ExperimentControls />
    </LiveDashboard>
  </MainContent>
</ExperimentsLayout>
```

### Design System Compliance

**Color Palette (Publicis Sapient Enterprise Aesthetic)**:
```css
/* Primary Brand Colors */
--ps-orange: #FF5900;              /* Primary brand accent */
--ps-coral: #FF7847;               /* Secondary accent */

/* Experiment Status Colors */
--experiment-running: #00A878;     /* Active experiment */
--experiment-paused: #FFB800;      /* Paused state */
--experiment-completed: #2196F3;   /* Completed */
--experiment-failed: #E53935;      /* Failed/stopped */

/* Variant Colors */
--variant-a: #FF5900;              /* Primary variant */
--variant-b: #2196F3;              /* Secondary variant */
--variant-c: #00A878;              /* Tertiary variant */

/* Statistical Significance */
--significance-reached: #00A878;   /* 95%+ confidence */
--significance-pending: #FFB800;   /* Still calculating */

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
.experiment-card {
  background: var(--ps-white);
  border: 1px solid var(--ps-gray-300);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
}
.experiment-card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
```

### Interaction Patterns

**Wizard Navigation**:
- Step-by-step progression
- Back/forward navigation
- Progress indicator
- Save draft at any step
- Validation before next step

**Live Dashboard Updates**:
- Real-time metric refresh (30s)
- Animated progress bars
- Significance pulse effect
- Auto-scroll to notifications

---

## Technical Architecture

### Component Structure

```
app/
├── experiments/
│   ├── page.tsx
│   ├── new/
│   │   └── page.tsx
│   ├── [id]/
│   │   ├── page.tsx
│   │   └── results/
│   │       └── page.tsx
│   └── components/
│       ├── ExperimentsList.tsx
│       ├── ExperimentCard.tsx
│       ├── ExperimentWizard/
│       │   ├── WizardContainer.tsx
│       │   ├── HypothesisStep.tsx
│       │   ├── MetricsStep.tsx
│       │   ├── ParametersStep.tsx
│       │   └── ReviewStep.tsx
│       ├── LiveDashboard/
│       │   ├── DashboardContainer.tsx
│       │   ├── VariantCard.tsx
│       │   ├── SignificanceIndicator.tsx
│       │   ├── ProgressBar.tsx
│       │   └── ResultsChart.tsx
│       └── hooks/
│           ├── useExperiments.ts
│           ├── useExperimentWizard.ts
│           ├── useLiveResults.ts
│           └── useStatistics.ts
└── lib/
    ├── experiments/
    │   ├── experiment-api.ts
    │   ├── statistics.ts
    │   └── sample-size.ts
    └── types/
        └── experiment.ts
```

### State Management

```typescript
interface ExperimentsState {
  experiments: Experiment[];
  activeExperiment: Experiment | null;
  wizardState: WizardState;
  liveResults: LiveResults | null;
  isCreating: boolean;
}

interface Experiment {
  id: string;
  name: string;
  hypothesis: Hypothesis;
  metrics: ExperimentMetric[];
  parameters: ExperimentParameters;
  status: ExperimentStatus;
  variants: Variant[];
  results: ExperimentResults | null;
  learnings: string[];
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
}

interface Hypothesis {
  action: string;
  expectedOutcome: string;
  reasoning: string;
}

interface ExperimentMetric {
  id: string;
  name: string;
  type: 'primary' | 'secondary';
  targetValue: number;
  targetType: 'percentage' | 'absolute';
  baselineValue?: number;
}

interface LiveResults {
  experimentId: string;
  progress: number;
  timeRemaining: number;
  variants: VariantResults[];
  significance: number;
  isSignificant: boolean;
  lastUpdated: Date;
}
```

### API Integration

```typescript
interface ExperimentsAPI {
  GET: {
    '/api/experiments': { response: Experiment[] };
    '/api/experiments/{id}': { response: ExperimentDetail };
    '/api/experiments/{id}/results': { response: LiveResults };
    '/api/experiments/templates': { response: ExperimentTemplate[] };
  };
  POST: {
    '/api/experiments': { body: CreateExperimentDto; response: Experiment };
    '/api/experiments/{id}/launch': { response: Experiment };
    '/api/experiments/{id}/pause': { response: Experiment };
    '/api/experiments/{id}/stop': { response: Experiment };
    '/api/experiments/{id}/learnings': { 
      body: LearningsDto;
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
| ExperimentWizard | Multi-step experiment creation | P0 |
| HypothesisBuilder | Structured hypothesis input | P0 |
| MetricSelector | Metric configuration UI | P0 |
| LiveDashboard | Real-time results display | P0 |
| VariantCard | Variant metrics comparison | P0 |
| SignificanceIndicator | Statistical significance display | P1 |
| ResultsChart | Time-series results visualization | P1 |

### Custom Hooks

| Hook | Purpose |
|------|---------|
| useExperiments() | Fetch and manage experiments list |
| useExperimentWizard() | Wizard state and validation |
| useLiveResults() | Real-time results polling |
| useStatistics() | Statistical calculations |
| useSampleSize() | Sample size estimation |

---

## Acceptance Criteria Checklist

### Functional Requirements
- [ ] User can create experiment with defined hypothesis and success metrics
- [ ] Experiment can be launched within minutes
- [ ] Real-time results tracking is available during runtime
- [ ] System automatically flags statistical significance when reached
- [ ] Failed experiments provide actionable learnings for next iteration

### Non-Functional Requirements
- [ ] Wizard completion < 10 minutes
- [ ] Results refresh < 30 seconds
- [ ] Support for 10+ concurrent experiments
- [ ] Mobile-responsive wizard
- [ ] Accessibility compliant

---

## Modified Files

```
app/
├── experiments/
│   ├── page.tsx ⬜
│   ├── new/page.tsx ⬜
│   ├── [id]/page.tsx ⬜
│   └── components/
│       ├── ExperimentWizard/
│       │   ├── WizardContainer.tsx ⬜
│       │   ├── HypothesisStep.tsx ⬜
│       │   ├── MetricsStep.tsx ⬜
│       │   └── ParametersStep.tsx ⬜
│       ├── LiveDashboard/
│       │   ├── DashboardContainer.tsx ⬜
│       │   ├── VariantCard.tsx ⬜
│       │   └── SignificanceIndicator.tsx ⬜
│       └── hooks/
│           ├── useExperiments.ts ⬜
│           └── useLiveResults.ts ⬜
├── lib/experiments/
│   ├── experiment-api.ts ⬜
│   └── statistics.ts ⬜
└── types/experiment.ts ⬜
```

---

## Implementation Status

**OVERALL STATUS: ⬜ NOT STARTED**

### Phase 1: Foundation
- [ ] Create experiments route structure
- [ ] Define TypeScript types
- [ ] Set up API integration
- [ ] Create base components

### Phase 2: Wizard Implementation
- [ ] Build WizardContainer with step navigation
- [ ] Implement HypothesisStep with validation
- [ ] Create MetricsStep with target inputs
- [ ] Add ParametersStep configuration

### Phase 3: Live Dashboard
- [ ] Implement LiveDashboard container
- [ ] Create VariantCard components
- [ ] Add SignificanceIndicator
- [ ] Build ResultsChart visualization

### Phase 4: Polish
- [ ] Add real-time updates
- [ ] Implement experiment controls
- [ ] Add learnings documentation
- [ ] Write tests

---

## Dependencies

### Internal
- Analytics service
- Notification system
- User permissions

### External
- Statistical calculation library
- Charting library (recharts)
- WebSocket for real-time

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Statistical accuracy | High | Validate with known datasets |
| Real-time performance | Medium | Efficient polling, caching |
| Sample size calculations | Medium | Use proven formulas |
| Experiment interference | High | Isolation mechanisms |

---

## Testing Strategy

### Unit Tests
- Hypothesis builder validation
- Statistical calculations accuracy
- Wizard step transitions

### Integration Tests
- Full experiment creation flow
- Results polling and display
- Significance detection

### E2E Tests
- Complete experiment lifecycle
- Multiple concurrent experiments

---

## Documentation Requirements

- [ ] Experiment creation guide
- [ ] Statistical methodology docs
- [ ] API documentation
- [ ] Best practices guide
