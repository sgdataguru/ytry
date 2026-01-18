/**
 * @file mock-data.ts
 * @description Mock data for all platform features
 */

import type {
  Insight,
  Recommendation,
  Experiment,
  Initiative,
  Deal,
  MomentumAlert,
  PipelineSummary,
  Decision,
  OperationalMetric,
  Inefficiency,
  Message,
  ImpactInitiative,
  PortfolioSummary,
} from '@/app/types';

// ============================================
// Feature 01: Insights Dashboard
// ============================================

export const mockInsights: Insight[] = [
  {
    id: '1',
    title: 'Revenue Opportunity in Enterprise Segment',
    description: 'Analysis shows 40% of enterprise prospects are ready for upsell based on usage patterns.',
    category: 'immediate',
    impact: 'high',
    confidence: 92,
    actionItem: 'Launch targeted upsell campaign for identified accounts',
    expectedOutcome: '+$450K potential revenue this quarter',
    createdAt: new Date('2026-01-10'),
  },
  {
    id: '2',
    title: 'Customer Churn Risk Detected',
    description: '15 high-value accounts showing decreased engagement in the last 30 days.',
    category: 'immediate',
    impact: 'high',
    confidence: 88,
    actionItem: 'Schedule customer success check-ins with at-risk accounts',
    expectedOutcome: 'Prevent $280K ARR churn',
    createdAt: new Date('2026-01-12'),
  },
  {
    id: '3',
    title: 'Sales Process Bottleneck',
    description: 'Proposal stage taking 40% longer than benchmark. Legal review identified as delay.',
    category: 'short-term',
    impact: 'medium',
    confidence: 85,
    actionItem: 'Implement pre-approved contract templates for standard deals',
    expectedOutcome: 'Reduce sales cycle by 5 days',
    createdAt: new Date('2026-01-11'),
  },
  {
    id: '4',
    title: 'New Market Expansion Signal',
    description: 'Healthcare vertical showing 3x growth in inbound inquiries compared to last quarter.',
    category: 'short-term',
    impact: 'high',
    confidence: 78,
    actionItem: 'Develop healthcare-specific landing page and case studies',
    expectedOutcome: 'Capture emerging market opportunity',
    createdAt: new Date('2026-01-09'),
  },
  {
    id: '5',
    title: 'Product Feature Adoption Gap',
    description: 'Only 23% of users utilizing advanced analytics features despite high engagement.',
    category: 'strategic',
    impact: 'medium',
    confidence: 91,
    actionItem: 'Launch in-app guided tours for advanced features',
    expectedOutcome: 'Increase feature adoption to 50%',
    createdAt: new Date('2026-01-08'),
  },
  {
    id: '6',
    title: 'Competitive Positioning Opportunity',
    description: 'Competitor X facing service issues. Opportunity to capture their dissatisfied customers.',
    category: 'strategic',
    impact: 'high',
    confidence: 72,
    actionItem: 'Launch targeted campaign to competitor customers',
    expectedOutcome: 'Acquire 50+ new enterprise accounts',
    createdAt: new Date('2026-01-07'),
  },
];

// ============================================
// Feature 02: AI Recommendations
// ============================================

export const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    title: 'Prioritize Enterprise Demo Requests',
    description: 'Schedule demos for 5 enterprise leads showing high intent signals this week.',
    reasoning: 'Based on your role as Sales Manager and current pipeline targets, these leads have 3x higher conversion probability based on engagement patterns.',
    confidence: 87,
    confidenceLevel: 'high',
    status: 'pending',
    taskContext: 'Weekly Pipeline Review',
    roleContext: 'Sales Manager',
    createdAt: new Date('2026-01-13'),
  },
  {
    id: '2',
    title: 'Adjust Q1 Marketing Spend',
    description: 'Reallocate 20% of display ad budget to LinkedIn sponsored content.',
    reasoning: 'LinkedIn campaigns are generating 4x better qualified leads at 60% lower CAC. This aligns with your B2B focus strategy.',
    confidence: 82,
    confidenceLevel: 'high',
    status: 'pending',
    taskContext: 'Budget Planning',
    roleContext: 'Marketing Director',
    createdAt: new Date('2026-01-12'),
  },
  {
    id: '3',
    title: 'Extend Trial for Key Accounts',
    description: 'Offer 7-day trial extension to 3 accounts in evaluation phase.',
    reasoning: 'Historical data shows accounts with extended trials have 45% higher conversion rate. These accounts match high-value customer profile.',
    confidence: 75,
    confidenceLevel: 'medium',
    status: 'pending',
    taskContext: 'Customer Success Review',
    roleContext: 'Account Executive',
    createdAt: new Date('2026-01-11'),
  },
];

// ============================================
// Feature 03: Experiments
// ============================================

export const mockExperiments: Experiment[] = [
  {
    id: '1',
    name: 'Pricing Page Redesign',
    hypothesis: 'If we simplify the pricing page with clear tier comparisons, then conversion rate will increase by 15% because users can make faster decisions.',
    status: 'running',
    startDate: new Date('2026-01-05'),
    duration: 14,
    variants: [
      { id: 'a', name: 'Control', type: 'control', allocation: 50, conversions: 234, participants: 5580, conversionRate: 4.2 },
      { id: 'b', name: 'Simplified Design', type: 'variant', allocation: 50, conversions: 287, participants: 5520, conversionRate: 5.2 },
    ],
    metrics: [
      { id: 'm1', name: 'Conversion Rate', type: 'primary', baseline: 4.0, target: 4.6, current: 4.7, unit: '%' },
      { id: 'm2', name: 'Time on Page', type: 'secondary', baseline: 45, target: 60, current: 52, unit: 'sec' },
    ],
    targetSignificance: 95,
    currentSignificance: 87,
    sampleSize: 11100,
    progress: 65,
    createdBy: 'product-team',
    createdAt: new Date('2026-01-03'),
  },
  {
    id: '2',
    name: 'Onboarding Email Sequence',
    hypothesis: 'If we add personalized tips in onboarding emails, then activation rate will increase by 20% because users will understand value faster.',
    status: 'completed',
    startDate: new Date('2025-12-15'),
    endDate: new Date('2026-01-10'),
    duration: 26,
    variants: [
      { id: 'a', name: 'Control', type: 'control', allocation: 50, conversions: 890, participants: 3200, conversionRate: 27.8 },
      { id: 'b', name: 'Personalized', type: 'variant', allocation: 50, conversions: 1056, participants: 3180, conversionRate: 33.2 },
    ],
    metrics: [
      { id: 'm1', name: 'Activation Rate', type: 'primary', baseline: 28, target: 33.6, current: 33.2, unit: '%' },
    ],
    targetSignificance: 95,
    currentSignificance: 98,
    sampleSize: 6380,
    progress: 100,
    createdBy: 'growth-team',
    createdAt: new Date('2025-12-12'),
  },
];

// ============================================
// Feature 04: Scale Operations
// ============================================

export const mockInitiatives: Initiative[] = [
  {
    id: '1',
    name: 'Personalized Onboarding Flow',
    currentPhase: 'validation',
    geography: 'North America',
    results: {
      actualLift: 0.19,
      targetLift: 0.15,
      confidence: 0.98,
    },
    scalingReadiness: {
      overall: 85,
      technical: 90,
      organizational: 85,
      financial: 82,
      market: 83,
    },
    experimentId: '2',
    potentialImpact: '$1.2M annual revenue',
    originalScope: 6380,
    targetScope: 150000,
    rolloutStrategy: 'gradual',
    rolloutProgress: 0,
    regions: [
      { id: 'r1', name: 'North America', status: 'pending', progress: 0 },
      { id: 'r2', name: 'Europe', status: 'pending', progress: 0 },
      { id: 'r3', name: 'APAC', status: 'pending', progress: 0 },
    ],
    resourceEstimate: {
      compute: { instances: 12, cost: 1800 },
      storage: { amount: '30GB', cost: 15 },
      teamHours: { hours: 24, cost: 2400 },
      totalMonthly: 1815,
      totalOneTime: 2400,
    },
    healthMetrics: { errorRate: 0, latency: 0, cpu: 0, isHealthy: true },
    createdAt: new Date('2026-01-10'),
  },
  {
    id: '2',
    name: 'AI-Powered Lead Scoring',
    currentPhase: 'scaling',
    geography: 'Global',
    results: {
      actualLift: 0.35,
      targetLift: 0.25,
      confidence: 0.95,
    },
    scalingReadiness: {
      overall: 92,
      technical: 95,
      organizational: 90,
      financial: 88,
      market: 95,
    },
    experimentId: '3',
    potentialImpact: '$850K cost savings',
    originalScope: 2000,
    targetScope: 50000,
    rolloutStrategy: 'gradual',
    rolloutProgress: 60,
    regions: [
      { id: 'r1', name: 'Region A', status: 'complete', progress: 100 },
      { id: 'r2', name: 'Region B', status: 'in-progress', progress: 60 },
      { id: 'r3', name: 'Region C', status: 'pending', progress: 0 },
    ],
    resourceEstimate: {
      compute: { instances: 15, cost: 2400 },
      storage: { amount: '50GB', cost: 25 },
      teamHours: { hours: 40, cost: 4000 },
      totalMonthly: 2425,
      totalOneTime: 4000,
    },
    healthMetrics: { errorRate: 0.02, latency: 45, cpu: 65, isHealthy: true },
    createdAt: new Date('2026-01-05'),
  },
  {
    id: '3',
    name: 'Dynamic Pricing Engine',
    currentPhase: 'pilot',
    geography: 'EMEA',
    results: {
      actualLift: 0.12,
      targetLift: 0.20,
      confidence: 0.72,
    },
    scalingReadiness: {
      overall: 55,
      technical: 75,
      organizational: 45,
      financial: 60,
      market: 40,
    },
    experimentId: '4',
    potentialImpact: '$2.1M revenue uplift',
    originalScope: 1500,
    targetScope: 100000,
    rolloutStrategy: 'gradual',
    rolloutProgress: 0,
    regions: [
      { id: 'r1', name: 'UK', status: 'in-progress', progress: 30 },
      { id: 'r2', name: 'Germany', status: 'pending', progress: 0 },
    ],
    resourceEstimate: {
      compute: { instances: 8, cost: 1200 },
      storage: { amount: '20GB', cost: 10 },
      teamHours: { hours: 60, cost: 6000 },
      totalMonthly: 1210,
      totalOneTime: 6000,
    },
    healthMetrics: { errorRate: 0.05, latency: 120, cpu: 45, isHealthy: true },
    createdAt: new Date('2026-01-08'),
  },
  {
    id: '4',
    name: 'Automated Customer Support',
    currentPhase: 'scaled',
    geography: 'North America',
    results: {
      actualLift: 0.42,
      targetLift: 0.30,
      confidence: 0.99,
    },
    scalingReadiness: {
      overall: 98,
      technical: 98,
      organizational: 97,
      financial: 99,
      market: 98,
    },
    experimentId: '1',
    potentialImpact: '$500K cost reduction achieved',
    originalScope: 5000,
    targetScope: 200000,
    rolloutStrategy: 'gradual',
    rolloutProgress: 100,
    regions: [
      { id: 'r1', name: 'US East', status: 'complete', progress: 100 },
      { id: 'r2', name: 'US West', status: 'complete', progress: 100 },
      { id: 'r3', name: 'Canada', status: 'complete', progress: 100 },
    ],
    resourceEstimate: {
      compute: { instances: 25, cost: 3800 },
      storage: { amount: '100GB', cost: 50 },
      teamHours: { hours: 0, cost: 0 },
      totalMonthly: 3850,
      totalOneTime: 0,
    },
    healthMetrics: { errorRate: 0.001, latency: 25, cpu: 35, isHealthy: true },
    createdAt: new Date('2025-11-15'),
  },
];

// ============================================
// Feature 05: Sales Pipeline
// ============================================

export const mockPipelineSummary: PipelineSummary = {
  totalValue: 2400000,
  weightedValue: 1650000,
  avgWinRate: 34,
  highPriorityValue: 850000,
  atRiskValue: 320000,
  predictedCloseValue: 1100000,
  predictedConfidence: 78,
  changePercent: 18,
  stageBreakdown: [
    { stage: 'prospect', value: 450000, count: 12 },
    { stage: 'qualification', value: 380000, count: 8 },
    { stage: 'proposal', value: 620000, count: 5 },
    { stage: 'negotiation', value: 750000, count: 4 },
    { stage: 'closing', value: 200000, count: 2 },
  ],
};

export const mockDeals: Deal[] = [
  {
    id: '1',
    company: 'Acme Corp',
    title: 'Enterprise License',
    value: 125000,
    stage: 'negotiation',
    closeDate: new Date('2026-01-30'),
    winProbability: 78,
    probabilityChange: 12,
    momentum: 'accelerating',
    nextBestAction: 'Schedule executive sponsor meeting - deals with exec involvement close 40% faster',
    revenueImpact: '+$125K if closed this month',
    successFactors: [
      { id: 's1', name: 'Executive sponsor identified', completed: true },
      { id: 's2', name: 'Budget confirmed', completed: true },
      { id: 's3', name: 'Technical validation complete', completed: false },
      { id: 's4', name: 'Legal review started', completed: false },
    ],
    daysInStage: 8,
    stakeholders: 4,
    lastActivity: new Date('2026-01-12'),
    aiInsights: [
      'Deal velocity is 25% faster than similar enterprise deals',
      'Executive engagement signals strong buying intent',
    ],
    ownerId: 'user-1',
    createdAt: new Date('2025-11-15'),
    updatedAt: new Date('2026-01-12'),
  },
  {
    id: '2',
    company: 'TechStart Inc',
    title: 'Growth Plan',
    value: 85000,
    stage: 'proposal',
    closeDate: new Date('2026-02-15'),
    winProbability: 45,
    probabilityChange: -25,
    momentum: 'slowing',
    nextBestAction: 'Re-engage with value proposition refresh - competitor mentioned in last call',
    revenueImpact: 'At risk - requires immediate attention',
    successFactors: [
      { id: 's1', name: 'Executive sponsor identified', completed: false },
      { id: 's2', name: 'Budget confirmed', completed: true },
      { id: 's3', name: 'Technical validation complete', completed: true },
      { id: 's4', name: 'Legal review started', completed: false },
    ],
    daysInStage: 14,
    stakeholders: 2,
    lastActivity: new Date('2026-01-03'),
    aiInsights: [
      'Competitor XYZ mentioned in recent communications',
      'No executive sponsor - 40% lower close rate without one',
    ],
    ownerId: 'user-1',
    createdAt: new Date('2025-12-01'),
    updatedAt: new Date('2026-01-10'),
  },
  {
    id: '3',
    company: 'GlobalFin',
    title: 'Premium Suite',
    value: 200000,
    stage: 'negotiation',
    closeDate: new Date('2026-01-25'),
    winProbability: 88,
    probabilityChange: 18,
    momentum: 'accelerating',
    nextBestAction: 'Propose final terms - budget approved, multiple stakeholder meetings completed',
    revenueImpact: '+$200K if closed this month',
    successFactors: [
      { id: 's1', name: 'Executive sponsor identified', completed: true },
      { id: 's2', name: 'Budget confirmed', completed: true },
      { id: 's3', name: 'Technical validation complete', completed: true },
      { id: 's4', name: 'Legal review started', completed: true },
    ],
    daysInStage: 5,
    stakeholders: 6,
    lastActivity: new Date('2026-01-13'),
    aiInsights: [
      'All success factors complete - rare for deals at this stage',
      'Similar deals closed within 10 days on average',
    ],
    ownerId: 'user-1',
    createdAt: new Date('2025-10-20'),
    updatedAt: new Date('2026-01-13'),
  },
  {
    id: '4',
    company: 'StartupXYZ',
    title: 'Startup Package',
    value: 35000,
    stage: 'qualification',
    closeDate: new Date('2026-03-01'),
    winProbability: 35,
    probabilityChange: 0,
    momentum: 'stalled',
    nextBestAction: 'Request discovery call to confirm budget and timeline',
    revenueImpact: 'Low priority - monitor',
    successFactors: [
      { id: 's1', name: 'Executive sponsor identified', completed: false },
      { id: 's2', name: 'Budget confirmed', completed: false },
      { id: 's3', name: 'Technical validation complete', completed: false },
      { id: 's4', name: 'Legal review started', completed: false },
    ],
    daysInStage: 21,
    stakeholders: 1,
    lastActivity: new Date('2025-12-25'),
    aiInsights: [
      'No progress in 3 weeks - consider deprioritizing',
      'Budget not yet allocated for Q1',
    ],
    ownerId: 'user-1',
    createdAt: new Date('2025-12-15'),
    updatedAt: new Date('2026-01-05'),
  },
  {
    id: '5',
    company: 'MegaCorp',
    title: 'Enterprise Platform',
    value: 450000,
    stage: 'proposal',
    closeDate: new Date('2026-02-28'),
    winProbability: 62,
    probabilityChange: 5,
    momentum: 'steady',
    nextBestAction: 'Follow up on proposal questions - address security concerns raised',
    revenueImpact: '+$450K potential - high value target',
    successFactors: [
      { id: 's1', name: 'Executive sponsor identified', completed: true },
      { id: 's2', name: 'Budget confirmed', completed: true },
      { id: 's3', name: 'Technical validation complete', completed: false },
      { id: 's4', name: 'Legal review started', completed: false },
    ],
    daysInStage: 12,
    stakeholders: 5,
    lastActivity: new Date('2026-01-11'),
    aiInsights: [
      'Security review is common for enterprise - not a red flag',
      'Large deal size correlates with longer negotiation phase',
    ],
    ownerId: 'user-1',
    createdAt: new Date('2025-11-01'),
    updatedAt: new Date('2026-01-11'),
  },
];

export const mockMomentumAlerts: MomentumAlert[] = [
  {
    id: '1',
    dealId: '2',
    dealName: 'TechStart Inc',
    type: 'negative',
    changePercent: -25,
    reason: 'No activity in 14 days, competitor mentioned',
    recommendation: 'Re-engage with value proposition refresh',
    timestamp: new Date('2026-01-12'),
    message: 'Win probability dropped 25% - no activity in 14 days and competitor was mentioned in last call.',
    value: 85000,
    suggestedAction: 'Schedule a value proposition refresh call with decision maker',
  },
  {
    id: '2',
    dealId: '3',
    dealName: 'GlobalFin',
    type: 'positive',
    changePercent: 18,
    reason: 'Budget approved, multiple stakeholder meetings',
    recommendation: 'Propose final terms',
    timestamp: new Date('2026-01-13'),
    message: 'Deal momentum increased 18% - budget was approved and multiple stakeholder meetings completed.',
    value: 200000,
    suggestedAction: 'Send final proposal terms within 24 hours',
  },
  {
    id: '3',
    dealId: '4',
    dealName: 'StartupXYZ',
    type: 'negative',
    changePercent: 0,
    reason: 'Stalled - no progress in 21 days',
    recommendation: 'Qualify or deprioritize',
    timestamp: new Date('2026-01-05'),
    message: 'Deal has been stalled for 21 days with no progress. Consider re-qualifying or deprioritizing.',
    value: 35000,
    suggestedAction: 'Schedule discovery call to re-qualify opportunity',
  },
];

// ============================================
// Feature 06: Decision Center
// ============================================

export const mockDecisions: Decision[] = [
  {
    id: '1',
    title: 'Q2 Marketing Budget Reallocation',
    description: 'Based on Q1 performance data, digital channels outperformed traditional by 3x ROI. Decision needed on whether to shift 30% of traditional budget to digital.',
    type: 'budget',
    urgency: 'critical',
    impact: 'high',
    deadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago (overdue)
    status: 'pending',
    estimatedValue: 1500000,
    aiRecommendation: {
      action: 'Approve the 30% budget shift to digital channels',
      confidence: 87,
      reasoning: 'Historical data shows consistent 3x ROI improvement. Risk is low given current market conditions.',
    },
    supportingData: [
      'Q1 digital ROI: 340% vs traditional 112%',
      'Competitor digital spend increased 45% YoY',
      'Customer acquisition cost down 28% on digital',
    ],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: '2',
    title: 'TechCorp Partnership Agreement',
    description: 'TechCorp proposes strategic partnership for joint product development. Initial investment required but potential for significant market expansion.',
    type: 'strategic',
    urgency: 'high',
    impact: 'high',
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    status: 'pending',
    estimatedValue: 5000000,
    aiRecommendation: {
      action: 'Proceed with limited partnership (Phase 1)',
      confidence: 72,
      reasoning: 'Start with limited scope to validate collaboration before full commitment.',
    },
    supportingData: [
      'TechCorp revenue grew 67% last year',
      'Partnership would open access to 3 new markets',
      'Legal review completed with minor concerns',
    ],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    title: 'Engineering Team Expansion',
    description: 'Request to hire 5 additional engineers to support the new product roadmap. Current team is at capacity.',
    type: 'resource',
    urgency: 'medium',
    impact: 'medium',
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    status: 'pending',
    estimatedValue: 750000,
    aiRecommendation: {
      action: 'Approve 3 hires immediately, 2 more in Q3',
      confidence: 81,
      reasoning: 'Phased approach balances immediate needs with budget constraints.',
    },
    supportingData: [
      'Current team velocity: 85% of target',
      'Time-to-hire average: 45 days',
      'Market salary benchmarks reviewed',
    ],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: '4',
    title: 'Cloud Infrastructure Upgrade',
    description: 'Current infrastructure nearing capacity limits. Options to scale vertically or migrate to new architecture.',
    type: 'operational',
    urgency: 'high',
    impact: 'medium',
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    status: 'pending',
    estimatedValue: 200000,
    aiRecommendation: {
      action: 'Migrate to containerized architecture',
      confidence: 78,
      reasoning: 'Long-term cost savings outweigh short-term migration effort.',
    },
    supportingData: [
      'Current capacity at 78%',
      'Projected to hit 95% in 6 weeks',
      '3 options evaluated with cost analysis',
    ],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: '5',
    title: 'Remote Work Policy Update',
    description: 'Proposal to formalize hybrid work policy based on 18-month pilot program results.',
    type: 'policy',
    urgency: 'low',
    impact: 'medium',
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    status: 'pending',
    aiRecommendation: {
      action: 'Approve 3-day in-office minimum policy',
      confidence: 65,
      reasoning: 'Balances flexibility with collaboration needs based on pilot data.',
    },
    supportingData: [
      'Employee satisfaction: 82% favorable',
      'Productivity metrics unchanged',
      'Office utilization data analyzed',
    ],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
  },
];

// ============================================
// Feature 07: Operations Center
// ============================================

export const mockOperationalMetrics: OperationalMetric[] = [
  { id: '1', name: 'Processing Throughput', value: 12500, target: 15000, format: 'number', trend: 'up', changePercent: 5, category: 'efficiency' },
  { id: '2', name: 'Error Rate', value: 2, target: 1, format: 'percent', trend: 'down', changePercent: -15, category: 'quality' },
  { id: '3', name: 'Monthly OpEx', value: 850000, target: 800000, format: 'currency', trend: 'stable', changePercent: 2, category: 'cost' },
  { id: '4', name: 'Customer Response Time', value: 85, target: 95, format: 'percent', trend: 'up', changePercent: 8, category: 'quality' },
  { id: '5', name: 'Resource Utilization', value: 78, target: 85, format: 'percent', trend: 'up', changePercent: 3, category: 'efficiency' },
  { id: '6', name: 'Cost per Transaction', value: 12, target: 10, format: 'currency', trend: 'down', changePercent: -5, category: 'cost' },
];

export const mockInefficiencies: Inefficiency[] = [
  {
    id: '1',
    title: 'Manual Data Entry Bottleneck',
    description: 'Customer onboarding requires 3 separate manual data entry steps that could be automated, causing delays and errors.',
    category: 'process',
    severity: 'high',
    status: 'new',
    potentialSavings: 125000,
    hoursLostPerWeek: 40,
    affectedTeams: 3,
    estimatedFixEffort: 14,
    aiSuggestion: 'Implement OCR-based document scanning with automated field mapping. Similar implementations have reduced onboarding time by 75% and errors by 90%.',
    rootCauses: [
      'Legacy system lacks API integration',
      'No standardized document format',
      'Manual verification required by compliance',
    ],
    detectedAt: new Date('2026-01-13T10:00:00'),
  },
  {
    id: '2',
    title: 'Communication Silos Between Sales & Support',
    description: 'Sales and support teams using different CRM systems, leading to duplicate customer contacts and missed context.',
    category: 'communication',
    severity: 'medium',
    status: 'acknowledged',
    potentialSavings: 75000,
    hoursLostPerWeek: 20,
    affectedTeams: 2,
    estimatedFixEffort: 21,
    aiSuggestion: 'Deploy unified customer data platform with bi-directional sync. This would provide single customer view and reduce duplicate outreach.',
    rootCauses: [
      'Historical technology choices',
      'No cross-team data sharing policy',
    ],
    detectedAt: new Date('2026-01-10T14:30:00'),
  },
  {
    id: '3',
    title: 'Underutilized Cloud Resources',
    description: 'Analysis shows 35% of provisioned cloud instances are running at less than 20% capacity during off-peak hours.',
    category: 'technology',
    severity: 'medium',
    status: 'in_progress',
    potentialSavings: 180000,
    hoursLostPerWeek: 0,
    affectedTeams: 1,
    estimatedFixEffort: 7,
    aiSuggestion: 'Implement auto-scaling policies with spot instances for non-critical workloads. Expected cost reduction of 40-50%.',
    rootCauses: [
      'Static provisioning without auto-scaling',
      'Over-provisioned for peak load that rarely occurs',
    ],
    detectedAt: new Date('2026-01-08T09:15:00'),
  },
  {
    id: '4',
    title: 'Meeting Overload in Engineering',
    description: 'Engineering teams spending average 18 hours/week in meetings, reducing focused development time significantly.',
    category: 'resource',
    severity: 'high',
    status: 'new',
    potentialSavings: 200000,
    hoursLostPerWeek: 90,
    affectedTeams: 5,
    estimatedFixEffort: 3,
    aiSuggestion: 'Implement "No Meeting Wednesdays" policy and reduce recurring meetings by 30%. Async standups via Slack can replace daily syncs.',
    rootCauses: [
      'No meeting culture guidelines',
      'Duplicate alignment meetings across teams',
      'Lack of async communication tools',
    ],
    detectedAt: new Date('2026-01-12T11:00:00'),
  },
];

// ============================================
// Feature 08: AI Assistant
// ============================================

export const mockMessages: Message[] = [
  {
    id: '1',
    role: 'user',
    content: 'Why did revenue drop in December?',
    timestamp: new Date('2026-01-13T09:00:00'),
  },
  {
    id: '2',
    role: 'assistant',
    content: 'Based on your data, December revenue dropped 15% primarily due to:\n\n1. Holiday season order delays (-8%)\n2. Reduced B2B purchases (-5%)\n3. Promotional discount impact (-2%)',
    followUpQuestions: [
      { id: 'fq1', question: 'How does this compare to last December?' },
      { id: 'fq2', question: 'Which products were most affected?' },
      { id: 'fq3', question: 'What can we do to prevent this next year?' },
    ],
    unexpectedFinding: 'While overall revenue dropped, mobile orders actually increased 12%. This correlates with your new app launch in November.',
    timestamp: new Date('2026-01-13T09:00:05'),
  },
];

// ============================================
// Feature 09: Impact Tracking
// ============================================

export const mockPortfolioSummary: PortfolioSummary = {
  totalROI: 287,
  roiChange: 45,
  initiativeCount: 12,
  onTrackCount: 8,
  totalRevenue: 4200000,
  totalInvestment: 1100000,
  netReturn: 3100000,
  changePercent: 23,
};

export const mockImpactInitiatives: ImpactInitiative[] = [
  {
    id: '1',
    name: 'AI-Powered Customer Support',
    category: 'Customer Experience',
    status: 'exceeded',
    launchedAt: new Date('2025-10-15'),
    metrics: {
      actualValue: 485000,
      targetValue: 350000,
      investment: 150000,
    },
    keyOutcomes: [
      'Reduced average response time from 24hrs to 4hrs',
      'Customer satisfaction increased from 72% to 89%',
      'Cost per ticket reduced by 73%',
    ],
    attributionConfidence: 92,
    dataPoints: 45000,
  },
  {
    id: '2',
    name: 'Predictive Inventory Management',
    category: 'Operations',
    status: 'on_target',
    launchedAt: new Date('2025-11-01'),
    metrics: {
      actualValue: 320000,
      targetValue: 300000,
      investment: 200000,
    },
    keyOutcomes: [
      'Stockout incidents reduced by 65%',
      'Inventory carrying costs down 22%',
      'Forecast accuracy improved to 94%',
    ],
    attributionConfidence: 87,
    dataPoints: 12000,
  },
  {
    id: '3',
    name: 'Sales Pipeline Optimization',
    category: 'Revenue',
    status: 'below_target',
    launchedAt: new Date('2025-12-01'),
    metrics: {
      actualValue: 180000,
      targetValue: 400000,
      investment: 175000,
    },
    keyOutcomes: [
      'Lead qualification time reduced by 40%',
      'Win rate improved from 18% to 23%',
    ],
    attributionConfidence: 68,
    dataPoints: 3200,
  },
  {
    id: '4',
    name: 'Automated Financial Reporting',
    category: 'Finance',
    status: 'exceeded',
    launchedAt: new Date('2025-09-15'),
    metrics: {
      actualValue: 275000,
      targetValue: 150000,
      investment: 80000,
    },
    keyOutcomes: [
      'Report generation time reduced from 5 days to 2 hours',
      'Error rate in reports dropped by 95%',
      'Compliance audit preparation time cut by 70%',
    ],
    attributionConfidence: 95,
    dataPoints: 8500,
  },
  {
    id: '5',
    name: 'Employee Engagement Platform',
    category: 'HR',
    status: 'tracking',
    launchedAt: new Date('2026-01-05'),
    metrics: {
      actualValue: 45000,
      targetValue: 200000,
      investment: 120000,
    },
    keyOutcomes: [
      'Initial onboarding completion rate up 15%',
    ],
    attributionConfidence: 45,
    dataPoints: 850,
  },
];
