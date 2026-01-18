# 10 Onboard to Innovation Platform - Implementation Plan

## Project Context
**Technical Stack**: Next.js 16 (App Router), React 19, TypeScript, TailwindCSS 4
**Design System**: Publicis Sapient Enterprise Aesthetic (Clean, Professional, Human-Centered)
**Infrastructure**: Vercel deployment

---

## User Story

**As a** new organization user,
**I want** a guided onboarding experience that connects my data sources and configures AI models,
**so that** I can start gaining insights and running experiments quickly.

---

## Pre-conditions

- User has created an account and verified email
- Organization has been registered
- User has admin privileges for initial setup
- Integration APIs are available
- AI model templates are configured

---

## Business Requirements

| Requirement | Success Metric |
|-------------|----------------|
| Step-by-step wizard | 95%+ completion rate |
| Common integrations available | 10+ pre-built connectors |
| AI model pre-configuration | Industry-specific defaults |
| Setup time < 30 minutes | Average completion time tracked |
| First experiment templates | 5+ quick-start templates |

---

## Technical Specifications

### Integration Points
- **Authentication Service**: User and org management
- **Data Connectors**: Pre-built integration library
- **AI Configuration**: Model setup and training
- **Template Engine**: Quick-start templates
- **Analytics Service**: Onboarding metrics tracking

### Security Requirements
- OAuth 2.0 for data source connections
- Secure credential storage
- Data access scope verification
- Audit logging for setup actions
- GDPR/compliance checks

---

## Design Specifications

### Visual Layout & Components

```
┌─────────────────────────────────────────────────────────────────┐
│ [Header - Welcome to Ytry]                                       │
│  Logo                                         [Need Help? 💬]    │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ ONBOARDING PROGRESS                                       │   │
│  │ ─────────────────────────────────────────────────────────  │   │
│  │                                                            │   │
│  │   ① ──────── ② ──────── ③ ──────── ④ ──────── ⑤          │   │
│  │ Profile   Data Sources   AI Setup   Templates   Done      │   │
│  │   ✅        🔵 Current    ○          ○          ○          │   │
│  │                                                            │   │
│  │ Estimated time remaining: 15 minutes                       │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ STEP 2: CONNECT YOUR DATA SOURCES                         │   │
│  │ ─────────────────────────────────────────────────────────  │   │
│  │                                                            │   │
│  │ Connect your existing tools to start getting insights.    │   │
│  │ You can always add more later.                            │   │
│  │                                                            │   │
│  │ RECOMMENDED FOR YOUR INDUSTRY (SaaS):                     │   │
│  │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │   │
│  │ │ [Salesforce]│ │ [HubSpot]   │ │ [Stripe]    │          │   │
│  │ │ CRM         │ │ Marketing   │ │ Payments    │          │   │
│  │ │ [Connect]   │ │ [Connect]   │ │ [Connect]   │          │   │
│  │ └─────────────┘ └─────────────┘ └─────────────┘          │   │
│  │                                                            │   │
│  │ ALL INTEGRATIONS:                     [Search...]         │   │
│  │ ┌────────────────────────────────────────────────────┐    │   │
│  │ │ DATABASES                                           │    │   │
│  │ │ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐           │    │   │
│  │ │ │ PG  │ │MySQL│ │Mongo│ │Redis│ │ BQ  │           │    │   │
│  │ │ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘           │    │   │
│  │ │                                                     │    │   │
│  │ │ SAAS APPS                                           │    │   │
│  │ │ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐           │    │   │
│  │ │ │Slack│ │Jira │ │Asana│ │Notion│ │ GA  │           │    │   │
│  │ │ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘           │    │   │
│  │ │                                                     │    │   │
│  │ │ APIs & CUSTOM                                       │    │   │
│  │ │ ┌─────┐ ┌─────┐ ┌─────┐                            │    │   │
│  │ │ │REST │ │Graph│ │CSV  │                            │    │   │
│  │ │ └─────┘ └─────┘ └─────┘                            │    │   │
│  │ └────────────────────────────────────────────────────┘    │   │
│  │                                                            │   │
│  │ CONNECTED SOURCES:                                        │   │
│  │ ┌────────────────────────────────────────────────────┐    │   │
│  │ │ ✅ Salesforce - 12,450 records synced              │    │   │
│  │ │ ✅ PostgreSQL - 3 tables connected                 │    │   │
│  │ │ 🔄 Stripe - Syncing... 45%                         │    │   │
│  │ └────────────────────────────────────────────────────┘    │   │
│  │                                                            │   │
│  │ [← Back]                    [Skip for Now]  [Continue →]  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ STEP 3: CONFIGURE AI MODELS                               │   │
│  │ ─────────────────────────────────────────────────────────  │   │
│  │                                                            │   │
│  │ We've pre-configured AI models for your industry.         │   │
│  │ Adjust settings or use our recommended defaults.          │   │
│  │                                                            │   │
│  │ INDUSTRY: [SaaS / Technology ▼]                           │   │
│  │                                                            │   │
│  │ PRE-CONFIGURED MODELS:                                    │   │
│  │ ┌────────────────────────────────────────────────────┐    │   │
│  │ │ ✅ Customer Churn Prediction                        │    │   │
│  │ │    Accuracy: 92% | Training: Complete               │    │   │
│  │ │    [Customize] [View Details]                       │    │   │
│  │ │                                                     │    │   │
│  │ │ ✅ Sales Forecasting                                │    │   │
│  │ │    Accuracy: 87% | Training: Complete               │    │   │
│  │ │    [Customize] [View Details]                       │    │   │
│  │ │                                                     │    │   │
│  │ │ 🔄 Lead Scoring                                     │    │   │
│  │ │    Training in progress... 78%                      │    │   │
│  │ │    Estimated: 5 minutes remaining                   │    │   │
│  │ └────────────────────────────────────────────────────┘    │   │
│  │                                                            │   │
│  │ [← Back]                              [Continue →]        │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ STEP 5: YOU'RE ALL SET! 🎉                                │   │
│  │ ─────────────────────────────────────────────────────────  │   │
│  │                                                            │   │
│  │ Great job! Your platform is ready. Here's what you can   │   │
│  │ do next:                                                   │   │
│  │                                                            │   │
│  │ QUICK-START TEMPLATES:                                    │   │
│  │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │   │
│  │ │ 🧪 A/B Test │ │ 📊 Dashboard│ │ 🎯 Churn    │          │   │
│  │ │ Pricing     │ │ Sales KPIs  │ │ Analysis    │          │   │
│  │ │ [Start]     │ │ [Start]     │ │ [Start]     │          │   │
│  │ └─────────────┘ └─────────────┘ └─────────────┘          │   │
│  │                                                            │   │
│  │ [🚀 Go to Dashboard]     [📚 View Tutorial]               │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```tsx
<OnboardingLayout>
  <OnboardingHeader>
    <Logo />
    <HelpButton />
  </OnboardingHeader>
  <MainContent>
    <ProgressTracker>
      <ProgressStep[] />
      <TimeEstimate />
    </ProgressTracker>
    <OnboardingWizard>
      {/* Step 1: Profile */}
      <ProfileSetupStep>
        <OrganizationForm />
        <IndustrySelector />
        <TeamSizeInput />
      </ProfileSetupStep>
      
      {/* Step 2: Data Sources */}
      <DataSourcesStep>
        <RecommendedIntegrations />
        <IntegrationGrid>
          <IntegrationCard[] />
        </IntegrationGrid>
        <ConnectedSources>
          <SourceStatus[] />
        </ConnectedSources>
      </DataSourcesStep>
      
      {/* Step 3: AI Setup */}
      <AISetupStep>
        <IndustrySelector />
        <PreConfiguredModels>
          <ModelCard[] />
        </PreConfiguredModels>
      </AISetupStep>
      
      {/* Step 4: Templates */}
      <TemplatesStep>
        <TemplateGrid>
          <TemplateCard[] />
        </TemplateGrid>
      </TemplatesStep>
      
      {/* Step 5: Complete */}
      <CompleteStep>
        <SuccessMessage />
        <QuickStartOptions />
        <NextSteps />
      </CompleteStep>
      
      <WizardNavigation />
    </OnboardingWizard>
  </MainContent>
</OnboardingLayout>
```

### Design System Compliance

**Color Palette (Publicis Sapient Enterprise Aesthetic)**:
```css
/* Primary Brand Colors */
--ps-orange: #FF5900;              /* Primary brand accent */
--ps-coral: #FF7847;               /* Secondary accent */

/* Onboarding Step Status */
--step-complete: #00A878;          /* Completed step */
--step-current: #FF5900;           /* Current step */
--step-pending: #B3B3B3;           /* Upcoming step */

/* Integration Status */
--integration-connected: #00A878;  /* Connected */
--integration-syncing: #2196F3;    /* Syncing */
--integration-error: #E53935;      /* Error */
--integration-pending: #6B6B6B;    /* Not connected */

/* AI Model Status */
--model-ready: #00A878;            /* Ready to use */
--model-training: #2196F3;         /* Training */
--model-error: #E53935;            /* Error */

/* Template Highlight */
--template-highlight: #FF5900;     /* Featured template */
--template-hover: #F5F5F5;         /* Hover state */

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
.wizard-container {
  background: var(--ps-white);
  border: 1px solid var(--ps-gray-300);
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
}
.progress-step.complete {
  background: var(--step-complete);
  color: var(--ps-white);
}
.progress-step.current {
  background: var(--step-current);
  color: var(--ps-white);
}
.integration-card {
  background: var(--ps-white);
  border: 1px solid var(--ps-gray-300);
  border-radius: 8px;
  padding: 16px;
  transition: all 0.2s ease;
}
.integration-card:hover {
  border-color: var(--ps-orange);
  box-shadow: 0 4px 12px rgba(255, 89, 0, 0.15);
}
```

### Interaction Patterns

**Wizard Navigation**:
- Linear progression with back option
- Skip optional steps
- Progress auto-save
- Resume from last step
- Validation before next

**Integration Connection**:
- OAuth popup flow
- Connection status indicators
- Sync progress display
- Error handling with retry
- Test connection option

---

## Technical Architecture

### Component Structure

```
app/
├── onboarding/
│   ├── page.tsx
│   ├── layout.tsx
│   └── components/
│       ├── ProgressTracker.tsx
│       ├── OnboardingWizard.tsx
│       ├── steps/
│       │   ├── ProfileSetupStep.tsx
│       │   ├── DataSourcesStep.tsx
│       │   ├── AISetupStep.tsx
│       │   ├── TemplatesStep.tsx
│       │   └── CompleteStep.tsx
│       ├── integrations/
│       │   ├── IntegrationGrid.tsx
│       │   ├── IntegrationCard.tsx
│       │   ├── ConnectedSources.tsx
│       │   └── OAuthHandler.tsx
│       ├── ai-setup/
│       │   ├── ModelCard.tsx
│       │   ├── ModelCustomizer.tsx
│       │   └── TrainingProgress.tsx
│       ├── templates/
│       │   ├── TemplateGrid.tsx
│       │   └── TemplateCard.tsx
│       └── hooks/
│           ├── useOnboarding.ts
│           ├── useIntegrations.ts
│           ├── useAISetup.ts
│           └── useTemplates.ts
└── lib/
    ├── onboarding/
    │   ├── onboarding-api.ts
    │   ├── integration-service.ts
    │   └── template-service.ts
    └── types/
        └── onboarding.ts
```

### State Management

```typescript
interface OnboardingState {
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
  profile: OrganizationProfile;
  connectedSources: ConnectedSource[];
  aiModels: AIModelConfig[];
  selectedTemplates: Template[];
  timeRemaining: number;
  isComplete: boolean;
}

type OnboardingStep = 
  | 'profile'
  | 'data-sources'
  | 'ai-setup'
  | 'templates'
  | 'complete';

interface OrganizationProfile {
  name: string;
  industry: string;
  teamSize: TeamSize;
  primaryGoals: string[];
  timezone: string;
}

interface ConnectedSource {
  id: string;
  type: IntegrationType;
  name: string;
  status: 'connected' | 'syncing' | 'error' | 'pending';
  syncProgress?: number;
  recordCount?: number;
  lastSynced?: Date;
  errorMessage?: string;
}

interface AIModelConfig {
  id: string;
  name: string;
  type: ModelType;
  industry: string;
  status: 'ready' | 'training' | 'error';
  accuracy?: number;
  trainingProgress?: number;
  isCustomized: boolean;
  config: ModelSettings;
}

interface Template {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  industry: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  prerequisites: string[];
}
```

### API Integration

```typescript
interface OnboardingAPI {
  GET: {
    '/api/onboarding/status': { response: OnboardingState };
    '/api/onboarding/integrations': { response: AvailableIntegration[] };
    '/api/onboarding/integrations/recommended': { 
      query: { industry: string };
      response: AvailableIntegration[];
    };
    '/api/onboarding/models': { 
      query: { industry: string };
      response: AIModelConfig[];
    };
    '/api/onboarding/templates': { 
      query: { industry: string };
      response: Template[];
    };
  };
  POST: {
    '/api/onboarding/profile': { 
      body: OrganizationProfile;
      response: void;
    };
    '/api/onboarding/integrations/connect': { 
      body: ConnectIntegrationDto;
      response: ConnectedSource;
    };
    '/api/onboarding/integrations/oauth/callback': { 
      body: OAuthCallbackDto;
      response: ConnectedSource;
    };
    '/api/onboarding/models/customize': { 
      body: CustomizeModelDto;
      response: AIModelConfig;
    };
    '/api/onboarding/complete': { 
      body: CompleteOnboardingDto;
      response: void;
    };
  };
  DELETE: {
    '/api/onboarding/integrations/{id}': { response: void };
  };
}
```

---

## Implementation Requirements

### Core Components

| Component | Description | Priority |
|-----------|-------------|----------|
| ProgressTracker | Step progress display | P0 |
| OnboardingWizard | Step container and navigation | P0 |
| ProfileSetupStep | Organization profile form | P0 |
| DataSourcesStep | Integration selection | P0 |
| IntegrationCard | Individual integration option | P0 |
| AISetupStep | Model configuration | P0 |
| ModelCard | AI model display | P0 |
| TemplatesStep | Template selection | P1 |
| CompleteStep | Success and next steps | P0 |

### Custom Hooks

| Hook | Purpose |
|------|---------|
| useOnboarding() | Overall onboarding state |
| useIntegrations() | Integration management |
| useOAuth() | OAuth flow handling |
| useAISetup() | Model configuration |
| useTemplates() | Template selection |

---

## Acceptance Criteria Checklist

### Functional Requirements
- [ ] Step-by-step onboarding wizard guides initial setup
- [ ] Common data source integrations are available (databases, APIs, SaaS tools)
- [ ] AI models are pre-configured with sensible defaults for user's industry
- [ ] User can complete basic setup within 30 minutes
- [ ] Quick-start templates help users run their first experiment immediately

### Non-Functional Requirements
- [ ] 95%+ wizard completion rate
- [ ] Integration connection < 30 seconds
- [ ] Model training progress real-time
- [ ] Mobile-responsive wizard
- [ ] Accessible navigation

---

## Modified Files

```
app/
├── onboarding/
│   ├── page.tsx ⬜
│   ├── layout.tsx ⬜
│   └── components/
│       ├── ProgressTracker.tsx ⬜
│       ├── OnboardingWizard.tsx ⬜
│       ├── steps/
│       │   ├── ProfileSetupStep.tsx ⬜
│       │   ├── DataSourcesStep.tsx ⬜
│       │   ├── AISetupStep.tsx ⬜
│       │   ├── TemplatesStep.tsx ⬜
│       │   └── CompleteStep.tsx ⬜
│       ├── integrations/
│       │   ├── IntegrationGrid.tsx ⬜
│       │   ├── IntegrationCard.tsx ⬜
│       │   └── OAuthHandler.tsx ⬜
│       ├── ai-setup/
│       │   ├── ModelCard.tsx ⬜
│       │   └── TrainingProgress.tsx ⬜
│       └── hooks/
│           ├── useOnboarding.ts ⬜
│           └── useIntegrations.ts ⬜
├── lib/onboarding/
│   ├── onboarding-api.ts ⬜
│   └── integration-service.ts ⬜
└── types/onboarding.ts ⬜
```

---

## Implementation Status

**OVERALL STATUS: ⬜ NOT STARTED**

### Phase 1: Foundation
- [ ] Create onboarding route structure
- [ ] Define TypeScript types
- [ ] Set up API integration
- [ ] Create base components

### Phase 2: Wizard Flow
- [ ] Implement ProgressTracker
- [ ] Build OnboardingWizard container
- [ ] Create ProfileSetupStep
- [ ] Add step navigation

### Phase 3: Integrations
- [ ] Build IntegrationGrid and cards
- [ ] Implement OAuth handler
- [ ] Create ConnectedSources display
- [ ] Add sync progress tracking

### Phase 4: AI & Templates
- [ ] Implement AISetupStep
- [ ] Build ModelCard with customization
- [ ] Create TemplatesStep
- [ ] Add CompleteStep with next actions

---

## Dependencies

### Internal
- Authentication service
- User management
- Template library

### External
- OAuth providers
- Integration APIs
- AI training service

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| OAuth failures | High | Retry logic, manual option |
| Long sync times | Medium | Background processing, progress |
| Model training delays | Medium | Pre-trained defaults |
| User abandonment | High | Progress saving, reminders |

---

## Testing Strategy

### Unit Tests
- Progress calculation
- Step validation
- Integration card states

### Integration Tests
- OAuth flow completion
- Multi-step wizard navigation
- Data sync verification

### E2E Tests
- Complete onboarding flow
- Skip and resume scenarios
- Error recovery flows

---

## Documentation Requirements

- [ ] Integration setup guides
- [ ] AI model configuration docs
- [ ] Template usage guides
- [ ] Troubleshooting FAQ
