# 09 Track Real-World Impact - Implementation Plan

## Project Context
**Technical Stack**: Next.js 16 (App Router), React 19, TypeScript, TailwindCSS 4
**Design System**: Publicis Sapient Enterprise Aesthetic (Clean, Professional, Human-Centered)
**Infrastructure**: Vercel deployment

---

## User Story

**As a** project sponsor,
**I want** to track the measurable impact of implemented initiatives,
**so that** I can demonstrate ROI and justify continued investment in innovation.

---

## Pre-conditions

- User is authenticated with sponsor/leadership role
- Initiatives are tracked in the system
- Baseline metrics are established
- Investment data is available
- Outcome tracking is configured

---

## Business Requirements

| Requirement | Success Metric |
|-------------|----------------|
| Success metrics at inception | 100% of initiatives have defined metrics |
| Progress against baseline | Real-time tracking dashboard |
| ROI calculation | Automatic ROI computation |
| Comparative analysis | Benchmarking against similar initiatives |
| Stakeholder reports | One-click report generation |

---

## Technical Specifications

### Integration Points
- **Initiative Tracker**: Initiative and experiment data
- **Metrics Pipeline**: Outcome measurement data
- **Finance Service**: Investment and cost data
- **Benchmarking Engine**: Comparative analysis
- **Reporting Service**: Report generation and distribution

### Security Requirements
- Financial data access controls
- Initiative visibility restrictions
- Audit logging for all views
- Report distribution controls
- Data export permissions

---

## Design Specifications

### Visual Layout & Components

```
┌─────────────────────────────────────────────────────────────────┐
│ [Header - Impact Tracking]                                       │
│  All Initiatives | By Category | My Portfolio | Reports          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 📊 PORTFOLIO SUMMARY                                      │   │
│  │ ─────────────────────────────────────────────────────────  │   │
│  │                                                            │   │
│  │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │   │
│  │ │ Total ROI   │ │ Initiatives │ │ Revenue     │          │   │
│  │ │   287%      │ │    12       │ │   $4.2M     │          │   │
│  │ │ ↑ 45% YoY   │ │ 8 On Track  │ │ Generated   │          │   │
│  │ └─────────────┘ └─────────────┘ └─────────────┘          │   │
│  │                                                            │   │
│  │ Investment: $1.1M  |  Return: $4.2M  |  Net: $3.1M        │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 📈 INITIATIVE IMPACT DASHBOARD                            │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ INITIATIVE CARD                                            │   │
│  │ ─────────────────────────────────────────────────────────  │   │
│  │ AI-Powered Customer Support              Status: 🟢 LIVE  │   │
│  │ Launched: Oct 15, 2025  |  Investment: $150K              │   │
│  │                                                            │   │
│  │ SUCCESS METRICS:                                           │   │
│  │ ┌────────────────────────────────────────────────────┐    │   │
│  │ │ Metric              Baseline    Current    Target  │    │   │
│  │ │ ─────────────────────────────────────────────────  │    │   │
│  │ │ Resolution Time     24 hrs      4 hrs ✅   8 hrs   │    │   │
│  │ │ Customer Sat.       72%         89% ✅     85%     │    │   │
│  │ │ Cost per Ticket     $45         $12 ✅     $20     │    │   │
│  │ │ Ticket Volume       5,000       4,200      -       │    │   │
│  │ └────────────────────────────────────────────────────┘    │   │
│  │                                                            │   │
│  │ PROGRESS VS BASELINE:                                      │   │
│  │ [Progress Chart - Baseline vs Actual Over Time]            │   │
│  │                                                            │   │
│  │ ROI CALCULATION:                                           │   │
│  │ ┌────────────────────────────────────────────────────┐    │   │
│  │ │ Investment:          $150,000                       │    │   │
│  │ │ ─────────────────────────────────────────────────  │    │   │
│  │ │ Cost Savings:        $165,000/year                  │    │   │
│  │ │ Revenue Impact:      $50,000/year                   │    │   │
│  │ │ Productivity Gain:   $30,000/year                   │    │   │
│  │ │ ─────────────────────────────────────────────────  │    │   │
│  │ │ Total Annual Return: $245,000                       │    │   │
│  │ │ ROI: 163%  |  Payback Period: 7.3 months           │    │   │
│  │ └────────────────────────────────────────────────────┘    │   │
│  │                                                            │   │
│  │ COMPARATIVE ANALYSIS:                                      │   │
│  │ ┌────────────────────────────────────────────────────┐    │   │
│  │ │ vs. Similar Initiatives:                            │    │   │
│  │ │ Your ROI: 163%  |  Average: 89%  |  Top 10%: 150%+ │    │   │
│  │ │ Performance: 🏆 Top 10% of similar initiatives     │    │   │
│  │ └────────────────────────────────────────────────────┘    │   │
│  │                                                            │   │
│  │ [View Full Details]  [Generate Report]  [Share]           │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 📋 REPORT GENERATION                                      │   │
│  │ ─────────────────────────────────────────────────────────  │   │
│  │ Report Type: [Executive Summary ▼]                        │   │
│  │ Time Period: [Last Quarter ▼]                             │   │
│  │ Initiatives: [All ▼]                                      │   │
│  │                                                            │   │
│  │ Include:                                                   │   │
│  │ [✓] ROI Calculations  [✓] Progress Charts                │   │
│  │ [✓] Comparative Analysis  [✓] Recommendations            │   │
│  │                                                            │   │
│  │ [Preview Report]          [📥 Download PDF]               │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```tsx
<ImpactTrackingLayout>
  <ImpactHeader>
    <ViewTabs />
    <DateRangeSelector />
  </ImpactHeader>
  <MainContent>
    <PortfolioSummary>
      <SummaryCard metric="totalROI" />
      <SummaryCard metric="initiatives" />
      <SummaryCard metric="revenue" />
      <InvestmentSummary />
    </PortfolioSummary>
    <InitiativeDashboard>
      <InitiativeCard>
        <InitiativeHeader />
        <SuccessMetricsTable>
          <MetricRow[] />
        </SuccessMetricsTable>
        <ProgressChart />
        <ROICalculation>
          <InvestmentBreakdown />
          <ReturnBreakdown />
          <ROISummary />
        </ROICalculation>
        <ComparativeAnalysis>
          <BenchmarkComparison />
          <PerformanceRank />
        </ComparativeAnalysis>
        <InitiativeActions />
      </InitiativeCard>
    </InitiativeDashboard>
    <ReportGenerator>
      <ReportOptions />
      <PreviewButton />
      <DownloadButton />
    </ReportGenerator>
  </MainContent>
</ImpactTrackingLayout>
```

### Design System Compliance

**Color Palette (Publicis Sapient Enterprise Aesthetic)**:
```css
/* Primary Brand Colors */
--ps-orange: #FF5900;              /* Primary brand accent */
--ps-coral: #FF7847;               /* Secondary accent */

/* ROI Indicators */
--roi-positive: #00A878;           /* Positive ROI */
--roi-negative: #E53935;           /* Negative ROI */
--roi-neutral: #FFB800;            /* Break-even */

/* Metric Status */
--metric-achieved: #00A878;        /* Target achieved */
--metric-progress: #2196F3;        /* On track */
--metric-behind: #E53935;          /* Behind target */

/* Benchmark Colors */
--benchmark-top: #FF5900;          /* Top performer */
--benchmark-average: #2196F3;      /* Average */
--benchmark-below: #6B6B6B;        /* Below average */

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
.initiative-card {
  background: var(--ps-white);
  border: 1px solid var(--ps-gray-300);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
}
.roi-badge.positive {
  background: rgba(0, 168, 120, 0.1);
  color: var(--roi-positive);
  border-radius: 20px;
  padding: 4px 12px;
}
.summary-card {
  background: var(--ps-white);
  border: 1px solid var(--ps-gray-300);
  border-radius: 12px;
  padding: 24px;
}
```

### Interaction Patterns

**Metric Tracking**:
- Real-time metric updates
- Trend indicators (↑↓)
- Target comparison
- Historical drill-down

**Report Generation**:
- Template selection
- Custom date ranges
- Initiative filtering
- Preview before download
- Multiple export formats

---

## Technical Architecture

### Component Structure

```
app/
├── impact/
│   ├── page.tsx
│   ├── [initiativeId]/
│   │   └── page.tsx
│   ├── reports/
│   │   └── page.tsx
│   └── components/
│       ├── PortfolioSummary/
│       │   ├── SummaryContainer.tsx
│       │   ├── SummaryCard.tsx
│       │   └── InvestmentSummary.tsx
│       ├── InitiativeCard/
│       │   ├── CardContainer.tsx
│       │   ├── SuccessMetricsTable.tsx
│       │   ├── ProgressChart.tsx
│       │   ├── ROICalculation.tsx
│       │   └── ComparativeAnalysis.tsx
│       ├── ReportGenerator/
│       │   ├── GeneratorContainer.tsx
│       │   ├── ReportOptions.tsx
│       │   └── ReportPreview.tsx
│       └── hooks/
│           ├── useInitiatives.ts
│           ├── useMetrics.ts
│           ├── useROI.ts
│           ├── useBenchmarks.ts
│           └── useReportGenerator.ts
└── lib/
    ├── impact/
    │   ├── impact-api.ts
    │   ├── roi-calculator.ts
    │   ├── benchmark-engine.ts
    │   └── report-generator.ts
    └── types/
        └── impact.ts
```

### State Management

```typescript
interface ImpactTrackingState {
  portfolio: PortfolioSummary;
  initiatives: Initiative[];
  selectedInitiative: Initiative | null;
  benchmarks: BenchmarkData;
  reportConfig: ReportConfig;
  isGeneratingReport: boolean;
}

interface PortfolioSummary {
  totalROI: number;
  totalInvestment: number;
  totalReturn: number;
  netReturn: number;
  initiativeCount: number;
  onTrackCount: number;
  revenueGenerated: number;
  yearOverYearChange: number;
}

interface Initiative {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'completed' | 'paused';
  launchDate: Date;
  investment: Investment;
  metrics: SuccessMetric[];
  roi: ROIData;
  benchmarkPosition: BenchmarkPosition;
  sponsor: User;
  team: User[];
}

interface SuccessMetric {
  id: string;
  name: string;
  type: 'efficiency' | 'revenue' | 'satisfaction' | 'custom';
  baseline: number;
  target: number;
  current: number;
  unit: string;
  trend: number;
  status: 'achieved' | 'on-track' | 'at-risk' | 'behind';
  history: MetricDataPoint[];
}

interface ROIData {
  investment: number;
  returns: {
    costSavings: number;
    revenueImpact: number;
    productivityGain: number;
    other: number;
  };
  totalAnnualReturn: number;
  roi: number;
  paybackPeriod: number;
  npv?: number;
  irr?: number;
}

interface BenchmarkPosition {
  percentile: number;
  category: string;
  averageROI: number;
  topQuartileROI: number;
  ranking: string;
}
```

### API Integration

```typescript
interface ImpactAPI {
  GET: {
    '/api/impact/portfolio': { response: PortfolioSummary };
    '/api/impact/initiatives': { 
      query: InitiativeFilters;
      response: Initiative[];
    };
    '/api/impact/initiatives/{id}': { response: InitiativeDetail };
    '/api/impact/initiatives/{id}/metrics': { 
      query: TimeRange;
      response: MetricHistory;
    };
    '/api/impact/initiatives/{id}/roi': { response: ROIData };
    '/api/impact/benchmarks': { 
      query: BenchmarkParams;
      response: BenchmarkData;
    };
  };
  POST: {
    '/api/impact/initiatives/{id}/metrics': { 
      body: MetricUpdateDto;
      response: SuccessMetric;
    };
    '/api/impact/reports/generate': { 
      body: ReportConfigDto;
      response: ReportResult;
    };
  };
}
```

---

## Implementation Requirements

### Core Components

| Component | Description | Priority |
|-----------|-------------|----------|
| PortfolioSummary | Aggregate impact metrics | P0 |
| InitiativeCard | Individual initiative display | P0 |
| SuccessMetricsTable | Metrics with targets | P0 |
| ROICalculation | ROI breakdown display | P0 |
| ProgressChart | Baseline vs actual chart | P0 |
| ComparativeAnalysis | Benchmark comparison | P1 |
| ReportGenerator | Report creation tool | P1 |

### Custom Hooks

| Hook | Purpose |
|------|---------|
| useInitiatives() | Fetch initiative data |
| useMetrics() | Real-time metrics tracking |
| useROI() | ROI calculations |
| useBenchmarks() | Comparative analysis |
| useReportGenerator() | Report generation |

---

## Acceptance Criteria Checklist

### Functional Requirements
- [ ] Each initiative has defined success metrics set at inception
- [ ] Impact dashboard shows progress against baseline metrics
- [ ] System calculates ROI based on actual outcomes vs. investment
- [ ] Comparative analysis shows performance vs. similar initiatives
- [ ] Reports can be generated for stakeholder communication

### Non-Functional Requirements
- [ ] Metrics refresh < 5 minutes
- [ ] ROI calculation < 2 seconds
- [ ] Report generation < 30 seconds
- [ ] Support for 100+ initiatives
- [ ] Mobile-responsive dashboard

---

## Modified Files

```
app/
├── impact/
│   ├── page.tsx ⬜
│   ├── [initiativeId]/page.tsx ⬜
│   ├── reports/page.tsx ⬜
│   └── components/
│       ├── PortfolioSummary/
│       │   ├── SummaryContainer.tsx ⬜
│       │   └── SummaryCard.tsx ⬜
│       ├── InitiativeCard/
│       │   ├── CardContainer.tsx ⬜
│       │   ├── SuccessMetricsTable.tsx ⬜
│       │   ├── ProgressChart.tsx ⬜
│       │   ├── ROICalculation.tsx ⬜
│       │   └── ComparativeAnalysis.tsx ⬜
│       ├── ReportGenerator/
│       │   └── GeneratorContainer.tsx ⬜
│       └── hooks/
│           ├── useInitiatives.ts ⬜
│           ├── useROI.ts ⬜
│           └── useBenchmarks.ts ⬜
├── lib/impact/
│   ├── impact-api.ts ⬜
│   ├── roi-calculator.ts ⬜
│   └── report-generator.ts ⬜
└── types/impact.ts ⬜
```

---

## Implementation Status

**OVERALL STATUS: ⬜ NOT STARTED**

### Phase 1: Foundation
- [ ] Create impact tracking route structure
- [ ] Define TypeScript types
- [ ] Set up API integration
- [ ] Create base components

### Phase 2: Portfolio View
- [ ] Implement PortfolioSummary
- [ ] Build SummaryCard components
- [ ] Create InvestmentSummary
- [ ] Add filtering and sorting

### Phase 3: Initiative Details
- [ ] Build InitiativeCard
- [ ] Implement SuccessMetricsTable
- [ ] Create ProgressChart
- [ ] Add ROICalculation display

### Phase 4: Advanced Features
- [ ] Implement ComparativeAnalysis
- [ ] Build ReportGenerator
- [ ] Add export functionality
- [ ] Write tests

---

## Dependencies

### Internal
- Initiative tracking service
- Metrics pipeline
- Finance data service

### External
- Charting library
- PDF generation
- Benchmarking service

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Inaccurate ROI data | High | Multiple data source validation |
| Missing metrics | Medium | Default values, alerts |
| Benchmark availability | Medium | Industry standard defaults |
| Report complexity | Low | Templates, previews |

---

## Testing Strategy

### Unit Tests
- ROI calculation accuracy
- Metric status determination
- Benchmark percentile calculation

### Integration Tests
- Full initiative loading
- Report generation
- Metric history tracking

### E2E Tests
- Complete impact tracking flow
- Report download workflow
- Multi-initiative comparison

---

## Documentation Requirements

- [ ] Success metric definition guide
- [ ] ROI calculation methodology
- [ ] Benchmarking explanation
- [ ] Report template guide
