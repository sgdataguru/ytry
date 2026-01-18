# 07 Gain Operational Advantage - Implementation Plan

## Project Context
**Technical Stack**: Next.js 16 (App Router), React 19, TypeScript, TailwindCSS 4
**Design System**: Publicis Sapient Enterprise Aesthetic (Clean, Professional, Human-Centered)
**Infrastructure**: Vercel deployment

---

## User Story

**As an** operations analyst,
**I want** to identify and act on operational inefficiencies automatically,
**so that** I can continuously optimize processes and maintain competitive advantage.

---

## Pre-conditions

- User is authenticated with operations role
- Operational metrics are connected and streaming
- Anomaly detection models are trained
- Baseline performance metrics are established
- Optimization execution permissions are configured

---

## Business Requirements

| Requirement | Success Metric |
|-------------|----------------|
| Continuous metric monitoring | 100% uptime monitoring |
| Automatic inefficiency detection | Detection within 15 minutes |
| Root cause analysis | 90%+ accurate root cause identification |
| Time/cost savings estimates | Estimates for all recommendations |
| Before/after metrics | Improvement tracking for all implementations |

---

## Technical Specifications

### Integration Points
- **Metrics Pipeline**: Real-time operational data stream
- **Anomaly Detection**: ML-based anomaly detection service
- **Root Cause Engine**: AI-powered root cause analysis
- **Optimization Engine**: Automated optimization suggestions
- **Implementation Service**: Optimization execution

### Security Requirements
- Operations data access controls
- Optimization approval workflows
- Audit logging for all changes
- Rollback permissions
- System impact assessments

---

## Design Specifications

### Visual Layout & Components

```
┌─────────────────────────────────────────────────────────────────┐
│ [Header - Operations Center]                                     │
│  Live Monitoring | Inefficiencies | Optimizations | Reports      │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 📊 LIVE OPERATIONAL METRICS                               │   │
│  │ ─────────────────────────────────────────────────────────  │   │
│  │                                                            │   │
│  │ System Health: ████████████████░░░░ 85%                   │   │
│  │                                                            │   │
│  │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │   │
│  │ │ Throughput  │ │ Latency     │ │ Error Rate  │          │   │
│  │ │ 12.5K/min   │ │ 45ms ✅     │ │ 0.02% ✅    │          │   │
│  │ │ ↑ 5%        │ │ ↓ 10%       │ │ ↓ 15%       │          │   │
│  │ └─────────────┘ └─────────────┘ └─────────────┘          │   │
│  │                                                            │   │
│  │ [Trend Chart - Last 24 Hours]                              │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ ⚠️ DETECTED INEFFICIENCIES                    [3 Active]   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ INEFFICIENCY CARD                                          │   │
│  │ ─────────────────────────────────────────────────────────  │   │
│  │ 🔴 Database Query Performance Degradation                  │   │
│  │ Detected: 2 hours ago | Impact: HIGH                       │   │
│  │                                                            │   │
│  │ ROOT CAUSE ANALYSIS:                                       │   │
│  │ ┌────────────────────────────────────────────────────┐    │   │
│  │ │ Primary: Missing index on orders.customer_id       │    │   │
│  │ │ Secondary: Increased query volume (+40%)           │    │   │
│  │ │ Contributing: Cache hit rate dropped to 65%        │    │   │
│  │ └────────────────────────────────────────────────────┘    │   │
│  │                                                            │   │
│  │ RECOMMENDED OPTIMIZATION:                                  │   │
│  │ ┌────────────────────────────────────────────────────┐    │   │
│  │ │ Add composite index on (customer_id, created_at)   │    │   │
│  │ │                                                     │    │   │
│  │ │ Estimated Savings:                                  │    │   │
│  │ │ • Time: 200ms → 15ms per query (-92%)              │    │   │
│  │ │ • Cost: $850/month compute savings                  │    │   │
│  │ │ • Risk: LOW (non-blocking operation)               │    │   │
│  │ │                                                     │    │   │
│  │ │ [Preview Changes]  [⚡ Apply Optimization]          │    │   │
│  │ └────────────────────────────────────────────────────┘    │   │
│  │                                                            │   │
│  │ [Dismiss]  [Snooze]  [View Full Analysis]                 │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 📈 IMPLEMENTED OPTIMIZATIONS                              │   │
│  │ ─────────────────────────────────────────────────────────  │   │
│  │                                                            │   │
│  │ ┌────────────────────────────────────────────────────┐    │   │
│  │ │ API Response Caching          Implemented: Jan 10  │    │   │
│  │ │ ─────────────────────────────────────────────────  │    │   │
│  │ │ BEFORE          →          AFTER                   │    │   │
│  │ │ 150ms avg       →          35ms avg ✅             │    │   │
│  │ │ $2,100/mo       →          $1,200/mo ✅            │    │   │
│  │ │                                                     │    │   │
│  │ │ Actual Savings: $900/mo + 77% latency reduction   │    │   │
│  │ └────────────────────────────────────────────────────┘    │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```tsx
<OperationsCenterLayout>
  <OperationsHeader>
    <ViewTabs />
    <AlertSettings />
  </OperationsHeader>
  <MainContent>
    <LiveMetricsPanel>
      <SystemHealthGauge />
      <MetricCards>
        <MetricCard metric="throughput" />
        <MetricCard metric="latency" />
        <MetricCard metric="errorRate" />
      </MetricCards>
      <TrendChart />
    </LiveMetricsPanel>
    <InefficienciesSection>
      <SectionHeader count={activeCount} />
      <InefficiencyCard>
        <IssueHeader />
        <RootCauseAnalysis>
          <CauseItem[] />
        </RootCauseAnalysis>
        <RecommendedOptimization>
          <OptimizationDescription />
          <SavingsEstimate />
          <OptimizationActions />
        </RecommendedOptimization>
        <CardActions />
      </InefficiencyCard>
    </InefficienciesSection>
    <ImplementedOptimizations>
      <OptimizationResult>
        <BeforeAfterComparison />
        <ActualSavings />
      </OptimizationResult>
    </ImplementedOptimizations>
  </MainContent>
</OperationsCenterLayout>
```

### Design System Compliance

**Color Palette (Publicis Sapient Enterprise Aesthetic)**:
```css
/* Primary Brand Colors */
--ps-orange: #FF5900;              /* Primary brand accent */
--ps-coral: #FF7847;               /* Secondary accent */

/* Health Status Colors */
--health-excellent: #00A878;       /* 90%+ health */
--health-good: #2196F3;            /* 70-89% health */
--health-warning: #FFB800;         /* 50-69% health */
--health-critical: #E53935;        /* <50% health */

/* Metric Trends */
--metric-positive: #00A878;        /* Positive change */
--metric-negative: #E53935;        /* Negative change */
--metric-neutral: #6B6B6B;         /* No change */

/* Savings & Cost */
--savings-highlight: #00A878;      /* Cost savings */
--cost-highlight: #E53935;         /* Cost increase */

/* Risk Levels */
--risk-low: #00A878;               /* Low risk */
--risk-medium: #FFB800;            /* Medium risk */
--risk-high: #E53935;              /* High risk */

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
.inefficiency-card {
  background: var(--ps-white);
  border: 1px solid var(--ps-gray-300);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
}
.optimization-button {
  background: var(--ps-orange);
  color: var(--ps-white);
  border-radius: 8px;
  font-weight: 600;
}
.metric-card {
  background: var(--ps-white);
  border: 1px solid var(--ps-gray-300);
  border-radius: 8px;
  padding: 16px;
}
```

### Interaction Patterns

**Live Metrics**:
- Real-time updates (5s interval)
- Hover for detailed breakdown
- Click for historical view
- Alert threshold indicators

**Optimization Actions**:
- Preview before apply
- Confirmation with impact summary
- Progress indicator during apply
- Instant rollback option

---

## Technical Architecture

### Component Structure

```
app/
├── operations/
│   ├── page.tsx
│   ├── inefficiencies/
│   │   └── page.tsx
│   ├── optimizations/
│   │   └── page.tsx
│   └── components/
│       ├── LiveMetricsPanel/
│       │   ├── PanelContainer.tsx
│       │   ├── SystemHealthGauge.tsx
│       │   ├── MetricCard.tsx
│       │   └── TrendChart.tsx
│       ├── Inefficiencies/
│       │   ├── InefficiencyCard.tsx
│       │   ├── RootCauseAnalysis.tsx
│       │   ├── RecommendedOptimization.tsx
│       │   └── SavingsEstimate.tsx
│       ├── Optimizations/
│       │   ├── OptimizationResult.tsx
│       │   ├── BeforeAfterComparison.tsx
│       │   └── SavingsReport.tsx
│       └── hooks/
│           ├── useLiveMetrics.ts
│           ├── useInefficiencies.ts
│           ├── useOptimizations.ts
│           └── useApplyOptimization.ts
└── lib/
    ├── operations/
    │   ├── operations-api.ts
    │   ├── anomaly-detection.ts
    │   └── optimization-engine.ts
    └── types/
        └── operations.ts
```

### State Management

```typescript
interface OperationsState {
  liveMetrics: LiveMetrics;
  inefficiencies: Inefficiency[];
  optimizations: OptimizationResult[];
  isApplying: boolean;
  connectionStatus: 'connected' | 'disconnected';
}

interface LiveMetrics {
  systemHealth: number;
  metrics: {
    throughput: MetricData;
    latency: MetricData;
    errorRate: MetricData;
    cpuUsage: MetricData;
    memoryUsage: MetricData;
  };
  lastUpdated: Date;
}

interface Inefficiency {
  id: string;
  title: string;
  category: InefficiencyCategory;
  severity: 'critical' | 'high' | 'medium' | 'low';
  detectedAt: Date;
  rootCauses: RootCause[];
  recommendation: Optimization;
  status: 'active' | 'snoozed' | 'dismissed' | 'resolved';
}

interface RootCause {
  type: 'primary' | 'secondary' | 'contributing';
  description: string;
  confidence: number;
  evidence: Evidence[];
}

interface Optimization {
  id: string;
  description: string;
  steps: OptimizationStep[];
  estimatedSavings: Savings;
  riskLevel: 'low' | 'medium' | 'high';
  implementationTime: number;
  rollbackPlan: string;
}

interface OptimizationResult {
  id: string;
  optimizationId: string;
  inefficiencyId: string;
  title: string;
  before: MetricSnapshot;
  after: MetricSnapshot;
  actualSavings: Savings;
  implementedAt: Date;
  implementedBy: User;
}
```

### API Integration

```typescript
interface OperationsAPI {
  GET: {
    '/api/operations/metrics': { response: LiveMetrics };
    '/api/operations/metrics/history': { 
      query: TimeRange;
      response: MetricsHistory;
    };
    '/api/operations/inefficiencies': { response: Inefficiency[] };
    '/api/operations/inefficiencies/{id}': { response: InefficiencyDetail };
    '/api/operations/optimizations': { response: OptimizationResult[] };
  };
  POST: {
    '/api/operations/inefficiencies/{id}/dismiss': { response: void };
    '/api/operations/inefficiencies/{id}/snooze': { 
      body: SnoozeDto;
      response: void;
    };
    '/api/operations/optimizations/apply': { 
      body: ApplyOptimizationDto;
      response: OptimizationResult;
    };
    '/api/operations/optimizations/{id}/rollback': { 
      response: RollbackResult;
    };
  };
}

// WebSocket Events
interface OperationsEvents {
  'metrics:update': LiveMetrics;
  'inefficiency:detected': Inefficiency;
  'inefficiency:resolved': { id: string };
  'optimization:progress': OptimizationProgress;
}
```

---

## Implementation Requirements

### Core Components

| Component | Description | Priority |
|-----------|-------------|----------|
| LiveMetricsPanel | Real-time metrics display | P0 |
| SystemHealthGauge | Overall health indicator | P0 |
| InefficiencyCard | Issue and recommendation display | P0 |
| RootCauseAnalysis | Cause breakdown component | P0 |
| RecommendedOptimization | Optimization suggestion | P0 |
| BeforeAfterComparison | Results comparison | P1 |
| SavingsEstimate | Cost/time savings display | P1 |

### Custom Hooks

| Hook | Purpose |
|------|---------|
| useLiveMetrics() | Real-time metrics streaming |
| useInefficiencies() | Fetch active issues |
| useOptimizations() | Historical optimizations |
| useApplyOptimization() | Execute optimizations |
| useRollback() | Rollback operations |

---

## Acceptance Criteria Checklist

### Functional Requirements
- [ ] System continuously monitors operational metrics for anomalies
- [ ] Inefficiencies are detected and surfaced with root cause analysis
- [ ] Recommended optimizations include estimated time/cost savings
- [ ] User can implement approved optimizations with minimal manual effort
- [ ] Before/after metrics demonstrate realized improvements

### Non-Functional Requirements
- [ ] Anomaly detection < 15 minutes
- [ ] Metrics update < 5 seconds
- [ ] 90%+ root cause accuracy
- [ ] Optimization apply < 30 seconds
- [ ] Mobile-responsive interface

---

## Modified Files

```
app/
├── operations/
│   ├── page.tsx ⬜
│   ├── inefficiencies/page.tsx ⬜
│   ├── optimizations/page.tsx ⬜
│   └── components/
│       ├── LiveMetricsPanel/
│       │   ├── PanelContainer.tsx ⬜
│       │   ├── SystemHealthGauge.tsx ⬜
│       │   └── MetricCard.tsx ⬜
│       ├── Inefficiencies/
│       │   ├── InefficiencyCard.tsx ⬜
│       │   ├── RootCauseAnalysis.tsx ⬜
│       │   └── RecommendedOptimization.tsx ⬜
│       ├── Optimizations/
│       │   └── OptimizationResult.tsx ⬜
│       └── hooks/
│           ├── useLiveMetrics.ts ⬜
│           └── useInefficiencies.ts ⬜
├── lib/operations/
│   ├── operations-api.ts ⬜
│   └── anomaly-detection.ts ⬜
└── types/operations.ts ⬜
```

---

## Implementation Status

**OVERALL STATUS: ⬜ NOT STARTED**

### Phase 1: Foundation
- [ ] Create operations route structure
- [ ] Define TypeScript types
- [ ] Set up API integration
- [ ] Create base components

### Phase 2: Live Monitoring
- [ ] Implement LiveMetricsPanel
- [ ] Build SystemHealthGauge
- [ ] Create MetricCard components
- [ ] Add TrendChart visualization

### Phase 3: Inefficiency Detection
- [ ] Build InefficiencyCard
- [ ] Implement RootCauseAnalysis
- [ ] Create RecommendedOptimization
- [ ] Add SavingsEstimate display

### Phase 4: Optimization Actions
- [ ] Implement apply optimization flow
- [ ] Build BeforeAfterComparison
- [ ] Add rollback functionality
- [ ] Write tests

---

## Dependencies

### Internal
- Metrics pipeline
- Anomaly detection service
- Notification system

### External
- WebSocket for real-time
- Charting library
- ML inference API

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| False positive alerts | Medium | Tunable thresholds |
| Optimization failures | High | Preview + rollback |
| Metric collection gaps | Medium | Data validation |
| System overload | High | Rate limiting |

---

## Testing Strategy

### Unit Tests
- Metric card rendering
- Health gauge calculations
- Savings estimate formatting

### Integration Tests
- Live metrics streaming
- Optimization apply flow
- Rollback procedures

### E2E Tests
- Complete detection → optimize flow
- Real-time updates verification
- Multi-user scenarios

---

## Documentation Requirements

- [ ] Anomaly detection methodology
- [ ] Optimization approval workflow
- [ ] Rollback procedures
- [ ] Threshold configuration guide
