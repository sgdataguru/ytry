# 08 Ask Better Questions with AI Assistant - Implementation Plan

## Project Context
**Technical Stack**: Next.js 16 (App Router), React 19, TypeScript, TailwindCSS 4
**Design System**: Publicis Sapient Enterprise Aesthetic (Clean, Professional, Human-Centered)
**Infrastructure**: Vercel deployment

---

## User Story

**As a** business user,
**I want** an AI assistant that helps me formulate better analytical questions,
**so that** I can uncover insights I wouldn't have discovered on my own.

---

## Pre-conditions

- User is authenticated with data access permissions
- AI assistant service is operational
- Data sources are connected and indexed
- Natural language processing is configured
- User has at least basic data literacy

---

## Business Requirements

| Requirement | Success Metric |
|-------------|----------------|
| AI assistant accessibility | Available on every screen |
| Natural language input | 95%+ query understanding rate |
| Follow-up suggestions | Minimum 3 follow-ups per query |
| Pattern/correlation detection | Unexpected insights in 40%+ of queries |
| Save and share functionality | Questions and insights shareable |

---

## Technical Specifications

### Integration Points
- **NLP Service**: Natural language query processing
- **Data Query Engine**: Cross-data source querying
- **Pattern Detection**: Statistical anomaly and correlation detection
- **Knowledge Graph**: Entity and relationship mapping
- **Collaboration Service**: Share and bookmark functionality

### Security Requirements
- Query-level data access controls
- Sensitive data masking in responses
- Audit logging for all queries
- Rate limiting on AI queries
- PII detection and handling

---

## Design Specifications

### Visual Layout & Components

```
┌─────────────────────────────────────────────────────────────────┐
│ [Any Screen in Platform]                           [🤖 AI] ←── │
│                                                    Floating     │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 🤖 AI ASSISTANT                              [_] [□] [×] │   │
│  │ ─────────────────────────────────────────────────────────  │   │
│  │                                                            │   │
│  │ ┌────────────────────────────────────────────────────┐    │   │
│  │ │ Hi! I'm here to help you explore your data.        │    │   │
│  │ │ Ask me anything in plain English.                  │    │   │
│  │ │                                                     │    │   │
│  │ │ Example questions:                                  │    │   │
│  │ │ • "What's driving the sales spike in Q4?"         │    │   │
│  │ │ • "Which customer segments are most profitable?"   │    │   │
│  │ │ • "Show me unexpected patterns in user behavior"   │    │   │
│  │ └────────────────────────────────────────────────────┘    │   │
│  │                                                            │   │
│  │ ┌────────────────────────────────────────────────────┐    │   │
│  │ │ 💬 "Why did revenue drop in December?"             │    │   │
│  │ └────────────────────────────────────────────────────┘    │   │
│  │                                                            │   │
│  │ ┌────────────────────────────────────────────────────┐    │   │
│  │ │ 🤖 Based on your data, December revenue dropped    │    │   │
│  │ │ 15% primarily due to:                              │    │   │
│  │ │                                                     │    │   │
│  │ │ 1. Holiday season order delays (-8%)               │    │   │
│  │ │ 2. Reduced B2B purchases (-5%)                     │    │   │
│  │ │ 3. Promotional discount impact (-2%)               │    │   │
│  │ │                                                     │    │   │
│  │ │ 📊 [View Supporting Chart]                         │    │   │
│  │ │                                                     │    │   │
│  │ │ 💡 FOLLOW-UP QUESTIONS:                            │    │   │
│  │ │ ┌──────────────────────────────────────────────┐  │    │   │
│  │ │ │ "How does this compare to last December?"    │  │    │   │
│  │ │ │ "Which products were most affected?"         │  │    │   │
│  │ │ │ "What can we do to prevent this next year?"  │  │    │   │
│  │ │ └──────────────────────────────────────────────┘  │    │   │
│  │ │                                                     │    │   │
│  │ │ 🔍 UNEXPECTED FINDING:                             │    │   │
│  │ │ ┌──────────────────────────────────────────────┐  │    │   │
│  │ │ │ While overall revenue dropped, mobile orders  │  │    │   │
│  │ │ │ actually increased 12%. This correlates with  │  │    │   │
│  │ │ │ your new app launch in November.              │  │    │   │
│  │ │ └──────────────────────────────────────────────┘  │    │   │
│  │ │                                                     │    │   │
│  │ │ [💾 Save] [📤 Share] [📋 Copy]                     │    │   │
│  │ └────────────────────────────────────────────────────┘    │   │
│  │                                                            │   │
│  │ ┌────────────────────────────────────────────────────┐    │   │
│  │ │ Ask a question...                          [Send →]│    │   │
│  │ └────────────────────────────────────────────────────┘    │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 📚 SAVED QUESTIONS & INSIGHTS              [View All →]   │   │
│  │ ─────────────────────────────────────────────────────────  │   │
│  │ • "Customer churn analysis" - Jan 10                      │   │
│  │ • "Sales forecast Q1" - Jan 8                             │   │
│  │ • "Product performance deep dive" - Jan 5                 │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```tsx
<AIAssistantProvider>
  {/* Global Floating Trigger */}
  <AIAssistantTrigger />
  
  {/* Main Assistant Panel */}
  <AIAssistantPanel>
    <PanelHeader>
      <Title />
      <WindowControls />
    </PanelHeader>
    <ConversationArea>
      <WelcomeMessage />
      <ExampleQuestions />
      <MessageThread>
        <UserMessage />
        <AssistantResponse>
          <AnswerContent />
          <SupportingChart />
          <FollowUpQuestions>
            <SuggestionChip[] />
          </FollowUpQuestions>
          <UnexpectedFinding />
          <ResponseActions />
        </AssistantResponse>
      </MessageThread>
    </ConversationArea>
    <InputArea>
      <QueryInput />
      <SendButton />
    </InputArea>
  </AIAssistantPanel>
  
  {/* Saved Items Panel */}
  <SavedInsightsPanel>
    <SavedItem[] />
  </SavedInsightsPanel>
</AIAssistantProvider>
```

### Design System Compliance

**Color Palette (Publicis Sapient Enterprise Aesthetic)**:
```css
/* Primary Brand Colors */
--ps-orange: #FF5900;              /* Primary brand accent */
--ps-coral: #FF7847;               /* Secondary accent */

/* AI Assistant Colors */
--ai-primary: #FF5900;             /* AI accent color */
--ai-bg: rgba(255, 89, 0, 0.05);   /* AI background tint */

/* Message Colors */
--user-message-bg: #F5F5F5;        /* User message background */
--ai-message-bg: #FFFFFF;          /* AI response background */
--message-border: #E5E5E5;         /* Message borders */

/* Interactive Elements */
--follow-up-bg: rgba(33, 150, 243, 0.1);  /* Follow-up suggestions */
--follow-up-text: #2196F3;
--unexpected-bg: rgba(255, 184, 0, 0.1);  /* Unexpected findings */
--unexpected-border: #FFB800;

/* Action Colors */
--save-success: #00A878;           /* Save confirmation */
--share-action: #2196F3;           /* Share button */

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
.ai-panel {
  background: var(--ps-white);
  border: 1px solid var(--ps-gray-300);
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}
.ai-trigger {
  background: var(--ps-orange);
  color: var(--ps-white);
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(255, 89, 0, 0.3);
}
.suggestion-chip {
  background: var(--follow-up-bg);
  color: var(--follow-up-text);
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;
}
```

### Interaction Patterns

**Floating Assistant**:
- Persistent trigger button on all screens
- Click to expand panel
- Drag to reposition
- Minimize/maximize/close controls
- Context-aware positioning

**Conversation Flow**:
- Streaming response display
- Typing indicator
- Quick action buttons
- Copy to clipboard
- Share via link/email

---

## Technical Architecture

### Component Structure

```
app/
├── components/
│   └── ai-assistant/
│       ├── AIAssistantProvider.tsx
│       ├── AIAssistantTrigger.tsx
│       ├── AIAssistantPanel/
│       │   ├── PanelContainer.tsx
│       │   ├── PanelHeader.tsx
│       │   ├── ConversationArea.tsx
│       │   ├── MessageThread.tsx
│       │   ├── UserMessage.tsx
│       │   ├── AssistantResponse.tsx
│       │   ├── FollowUpQuestions.tsx
│       │   ├── UnexpectedFinding.tsx
│       │   ├── SupportingChart.tsx
│       │   └── InputArea.tsx
│       ├── SavedInsightsPanel.tsx
│       └── hooks/
│           ├── useAIAssistant.ts
│           ├── useConversation.ts
│           ├── useFollowUps.ts
│           ├── useSavedInsights.ts
│           └── usePatternDetection.ts
├── saved-insights/
│   └── page.tsx
└── lib/
    ├── ai/
    │   ├── assistant-api.ts
    │   ├── nlp-processor.ts
    │   ├── pattern-detector.ts
    │   └── query-generator.ts
    └── types/
        └── assistant.ts
```

### State Management

```typescript
interface AIAssistantState {
  isOpen: boolean;
  isMinimized: boolean;
  position: Position;
  conversation: Conversation;
  savedInsights: SavedInsight[];
  isProcessing: boolean;
  currentContext: PageContext;
}

interface Conversation {
  id: string;
  messages: Message[];
  context: ConversationContext;
  startedAt: Date;
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  // For assistant messages
  followUpQuestions?: string[];
  unexpectedFindings?: UnexpectedFinding[];
  supportingData?: ChartData;
  sources?: DataSource[];
}

interface UnexpectedFinding {
  id: string;
  title: string;
  description: string;
  significance: 'high' | 'medium' | 'low';
  correlation?: Correlation;
  actionable: boolean;
}

interface SavedInsight {
  id: string;
  question: string;
  answer: string;
  findings: UnexpectedFinding[];
  chartData?: ChartData;
  savedAt: Date;
  savedBy: User;
  sharedWith: User[];
  tags: string[];
}
```

### API Integration

```typescript
interface AIAssistantAPI {
  POST: {
    '/api/ai/query': {
      body: QueryDto;
      response: StreamingResponse<AssistantResponse>;
    };
    '/api/ai/follow-up': {
      body: FollowUpDto;
      response: string[];
    };
    '/api/ai/patterns': {
      body: PatternQueryDto;
      response: UnexpectedFinding[];
    };
  };
  GET: {
    '/api/ai/suggestions': {
      query: { context: string };
      response: string[];
    };
    '/api/ai/saved': {
      response: SavedInsight[];
    };
  };
  POST: {
    '/api/ai/save': {
      body: SaveInsightDto;
      response: SavedInsight;
    };
    '/api/ai/share': {
      body: ShareDto;
      response: ShareResult;
    };
  };
}

// Streaming Response Interface
interface StreamingResponse<T> {
  stream: ReadableStream<T>;
  metadata: ResponseMetadata;
}
```

---

## Implementation Requirements

### Core Components

| Component | Description | Priority |
|-----------|-------------|----------|
| AIAssistantProvider | Global state provider | P0 |
| AIAssistantTrigger | Floating trigger button | P0 |
| AIAssistantPanel | Main conversation panel | P0 |
| MessageThread | Conversation display | P0 |
| AssistantResponse | AI response with features | P0 |
| FollowUpQuestions | Suggestion chips | P0 |
| UnexpectedFinding | Insight highlight | P1 |
| InputArea | Query input with send | P0 |
| SavedInsightsPanel | Saved items management | P1 |

### Custom Hooks

| Hook | Purpose |
|------|---------|
| useAIAssistant() | Panel state management |
| useConversation() | Message thread management |
| useFollowUps() | Follow-up generation |
| useSavedInsights() | Save/load insights |
| usePatternDetection() | Unexpected finding detection |
| useStreaming() | Handle streaming responses |

---

## Acceptance Criteria Checklist

### Functional Requirements
- [ ] AI assistant is accessible from any screen in the platform
- [ ] User can ask questions in natural language
- [ ] Assistant suggests follow-up questions based on initial query
- [ ] System highlights unexpected patterns or correlations in data
- [ ] Questions and insights can be saved and shared with team members

### Non-Functional Requirements
- [ ] Query response start < 2 seconds
- [ ] 95%+ query understanding rate
- [ ] Streaming response for long answers
- [ ] Mobile-friendly panel
- [ ] Keyboard accessible

---

## Modified Files

```
app/
├── components/ai-assistant/
│   ├── AIAssistantProvider.tsx ⬜
│   ├── AIAssistantTrigger.tsx ⬜
│   ├── AIAssistantPanel/
│   │   ├── PanelContainer.tsx ⬜
│   │   ├── ConversationArea.tsx ⬜
│   │   ├── MessageThread.tsx ⬜
│   │   ├── AssistantResponse.tsx ⬜
│   │   ├── FollowUpQuestions.tsx ⬜
│   │   ├── UnexpectedFinding.tsx ⬜
│   │   └── InputArea.tsx ⬜
│   ├── SavedInsightsPanel.tsx ⬜
│   └── hooks/
│       ├── useAIAssistant.ts ⬜
│       ├── useConversation.ts ⬜
│       └── useSavedInsights.ts ⬜
├── saved-insights/page.tsx ⬜
├── lib/ai/
│   ├── assistant-api.ts ⬜
│   ├── nlp-processor.ts ⬜
│   └── pattern-detector.ts ⬜
└── types/assistant.ts ⬜
```

---

## Implementation Status

**OVERALL STATUS: ⬜ NOT STARTED**

### Phase 1: Foundation
- [ ] Create AI assistant components structure
- [ ] Define TypeScript types
- [ ] Set up streaming API integration
- [ ] Create AIAssistantProvider

### Phase 2: Core Chat
- [ ] Implement AIAssistantTrigger
- [ ] Build AIAssistantPanel
- [ ] Create MessageThread component
- [ ] Add InputArea with send

### Phase 3: Intelligence Features
- [ ] Implement FollowUpQuestions
- [ ] Add UnexpectedFinding component
- [ ] Create SupportingChart integration
- [ ] Build pattern detection

### Phase 4: Collaboration
- [ ] Implement save functionality
- [ ] Add share feature
- [ ] Create SavedInsightsPanel
- [ ] Write tests

---

## Dependencies

### Internal
- Data query service
- User permissions
- Notification system

### External
- LLM API (streaming)
- NLP processing service
- Pattern detection ML

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Query misunderstanding | High | Clarification prompts |
| Slow response time | Medium | Streaming + caching |
| Hallucination | High | Source citations |
| Data access errors | Medium | Graceful error handling |

---

## Testing Strategy

### Unit Tests
- Message rendering
- Follow-up chip interactions
- Input validation

### Integration Tests
- Streaming response handling
- Save/share workflows
- Panel state management

### E2E Tests
- Complete conversation flow
- Pattern detection accuracy
- Multi-user sharing

---

## Documentation Requirements

- [ ] Natural language query guide
- [ ] Pattern detection explanation
- [ ] Save/share functionality guide
- [ ] API integration documentation
