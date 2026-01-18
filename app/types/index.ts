/**
 * @file index.ts
 * @description Core TypeScript type definitions for the Ytry Innovation Platform
 * @module types
 */

// ============================================
// SECTION: Common Types
// ============================================

export type Priority = 'critical' | 'high' | 'medium' | 'low';
export type Status = 'active' | 'pending' | 'completed' | 'failed' | 'paused';
export type Trend = 'up' | 'down' | 'stable';

export interface TimeRange {
  start: Date;
  end: Date;
}

// ============================================
// SECTION: User & Authentication
// ============================================

export type UserRole = 'admin' | 'leader' | 'analyst' | 'user' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  createdAt: Date;
}

// ============================================
// SECTION: Insights Dashboard (Feature 01)
// ============================================

export type InsightCategory = 'immediate' | 'short-term' | 'strategic';
export type InsightImpact = 'high' | 'medium' | 'low';

export interface Insight {
  id: string;
  title: string;
  description: string;
  category: InsightCategory;
  impact: InsightImpact;
  confidence: number;
  actionItem: string;
  expectedOutcome: string;
  supportingData?: SupportingData[];
  createdAt: Date;
  expiresAt?: Date;
}

export interface SupportingData {
  id: string;
  type: 'chart' | 'metric' | 'table' | 'document';
  title: string;
  data: unknown;
}

// ============================================
// SECTION: AI Recommendations (Feature 02)
// ============================================

export type RecommendationStatus = 'pending' | 'accepted' | 'modified' | 'dismissed';
export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  reasoning: string;
  confidence: number;
  confidenceLevel: ConfidenceLevel;
  status: RecommendationStatus;
  taskContext?: string;
  roleContext?: string;
  createdAt: Date;
  modifiedAt?: Date;
  feedback?: RecommendationFeedback;
}

export interface RecommendationFeedback {
  helpful: boolean | null;
  comment?: string;
  submittedAt: Date;
}

// ============================================
// SECTION: Experiments (Feature 03)
// ============================================

export type ExperimentStatus = 'draft' | 'running' | 'paused' | 'completed' | 'failed';
export type VariantType = 'control' | 'variant';

export interface Experiment {
  id: string;
  name: string;
  hypothesis: string;
  status: ExperimentStatus;
  startDate?: Date;
  endDate?: Date;
  duration: number;
  variants: Variant[];
  metrics: ExperimentMetric[];
  targetSignificance: number;
  currentSignificance: number;
  sampleSize: number;
  progress: number;
  createdBy: string;
  createdAt: Date;
}

export interface Variant {
  id: string;
  name: string;
  type: VariantType;
  allocation: number;
  conversions: number;
  participants: number;
  conversionRate: number;
}

export interface ExperimentMetric {
  id: string;
  name: string;
  type: 'primary' | 'secondary';
  baseline: number;
  target: number;
  current: number;
  unit: string;
}

// ============================================
// SECTION: Scale Operations (Feature 04)
// ============================================

export type ScaleStatus = 'ready' | 'in-progress' | 'completed' | 'rolled-back';
export type RolloutStrategy = 'immediate' | 'gradual' | 'custom';
export type RegionStatus = 'complete' | 'in-progress' | 'pending' | 'failed';
export type InitiativePhase = 'pilot' | 'validation' | 'scaling' | 'scaled';

export interface ScalingReadiness {
  overall: number;
  technical: number;
  organizational: number;
  financial: number;
  market: number;
}

export interface Initiative {
  id: string;
  name: string;
  currentPhase: InitiativePhase;
  geography: string;
  results: {
    actualLift: number;
    targetLift: number;
    confidence: number;
  };
  scalingReadiness: ScalingReadiness;
  experimentId: string;
  potentialImpact: string;
  originalScope: number;
  targetScope: number;
  rolloutStrategy: RolloutStrategy;
  rolloutProgress: number;
  regions: Region[];
  resourceEstimate: ResourceEstimate;
  healthMetrics: HealthMetrics;
  createdAt: Date;
}

export interface Region {
  id: string;
  name: string;
  status: RegionStatus;
  progress: number;
}

export interface ResourceEstimate {
  compute: { instances: number; cost: number };
  storage: { amount: string; cost: number };
  teamHours: { hours: number; cost: number };
  totalMonthly: number;
  totalOneTime: number;
}

export interface HealthMetrics {
  errorRate: number;
  latency: number;
  cpu: number;
  isHealthy: boolean;
}

// ============================================
// SECTION: Sales Pipeline (Feature 05)
// ============================================

export type DealStage = 'prospect' | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
export type DealMomentum = 'accelerating' | 'steady' | 'slowing' | 'stalled';

export interface Deal {
  id: string;
  company: string;
  title: string;
  value: number;
  stage: DealStage;
  closeDate: Date;
  winProbability: number;
  probabilityChange: number;
  momentum: DealMomentum;
  nextBestAction: string;
  revenueImpact: string;
  successFactors: SuccessFactor[];
  daysInStage: number;
  stakeholders: number;
  lastActivity: Date;
  aiInsights?: string[];
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SuccessFactor {
  id: string;
  name: string;
  completed: boolean;
}

export interface MomentumAlert {
  id: string;
  dealId: string;
  dealName: string;
  type: 'positive' | 'negative';
  changePercent: number;
  reason: string;
  recommendation: string;
  timestamp: Date;
  message: string;
  value?: number;
  suggestedAction?: string;
}

export interface PipelineSummary {
  totalValue: number;
  weightedValue: number;
  avgWinRate: number;
  highPriorityValue: number;
  atRiskValue: number;
  predictedCloseValue: number;
  predictedConfidence: number;
  changePercent: number;
  stageBreakdown: Array<{
    stage: string;
    value: number;
    count: number;
  }>;
}

// ============================================
// SECTION: Decision Center (Feature 06)
// ============================================

export type DecisionPriority = 'critical' | 'high' | 'medium' | 'low';
export type DecisionStatus = 'pending' | 'approved' | 'rejected' | 'delegated';
export type DecisionType = 'budget' | 'resource' | 'strategic' | 'operational' | 'policy';
export type DecisionImpact = 'high' | 'medium' | 'low';

export interface Decision {
  id: string;
  title: string;
  description: string;
  type: DecisionType;
  urgency: DecisionPriority;
  impact: DecisionImpact;
  deadline: Date;
  status: DecisionStatus;
  estimatedValue?: number;
  aiRecommendation?: {
    action: string;
    confidence: number;
    reasoning: string;
  };
  supportingData?: string[];
  createdAt: Date;
  decidedAt?: Date;
}

// ============================================
// SECTION: Operations Center (Feature 07)
// ============================================

export type HealthStatus = 'excellent' | 'good' | 'warning' | 'critical';
export type RiskLevel = 'low' | 'medium' | 'high';

export interface OperationalMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  format: 'percent' | 'currency' | 'number';
  trend: Trend;
  changePercent: number;
  category: 'efficiency' | 'quality' | 'cost';
}

export interface Inefficiency {
  id: string;
  title: string;
  description: string;
  category: 'process' | 'resource' | 'technology' | 'communication';
  severity: 'high' | 'medium' | 'low';
  status: 'new' | 'acknowledged' | 'in_progress' | 'resolved';
  potentialSavings: number;
  hoursLostPerWeek: number;
  affectedTeams: number;
  estimatedFixEffort: number;
  aiSuggestion?: string;
  rootCauses?: string[];
  detectedAt: Date;
}

// ============================================
// SECTION: AI Assistant (Feature 08)
// ============================================

export type MessageRole = 'user' | 'assistant';

export interface FollowUpQuestion {
  id: string;
  question: string;
}

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  supportingChart?: unknown;
  followUpQuestions?: FollowUpQuestion[];
  unexpectedFinding?: string;
}

export interface SavedInsight {
  id: string;
  question: string;
  answer: string;
  savedAt: Date;
  tags?: string[];
}

// ============================================
// SECTION: Impact Tracking (Feature 09)
// ============================================

export interface ImpactInitiative {
  id: string;
  name: string;
  category: string;
  status: 'tracking' | 'exceeded' | 'on_target' | 'below_target';
  launchedAt: Date;
  metrics: {
    actualValue: number;
    targetValue: number;
    investment: number;
  };
  keyOutcomes?: string[];
  attributionConfidence: number;
  dataPoints?: number;
}

export interface ImpactMetric {
  id: string;
  name: string;
  baseline: number;
  current: number;
  target: number;
  unit: string;
  achieved: boolean;
}

export interface ROICalculation {
  investment: number;
  costSavings: number;
  revenueImpact: number;
  productivityGain: number;
  totalAnnualReturn: number;
  roiPercent: number;
  paybackMonths: number;
}

export interface Benchmark {
  yourROI: number;
  averageROI: number;
  topPercentile: number;
  rank: string;
}

export interface PortfolioSummary {
  totalROI: number;
  roiChange: number;
  initiativeCount: number;
  onTrackCount: number;
  totalRevenue: number;
  totalInvestment: number;
  netReturn: number;
  changePercent?: number;
}

// ============================================
// SECTION: Onboarding (Feature 10)
// ============================================

export type OnboardingStep = 'profile' | 'data-sources' | 'ai-setup' | 'templates' | 'complete';
export type IntegrationCategory = 'databases' | 'saas' | 'custom';
export type SyncStatus = 'connected' | 'syncing' | 'error' | 'pending';

export interface OnboardingProgress {
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
  estimatedTimeRemaining: number;
}

export interface Integration {
  id: string;
  name: string;
  icon: string;
  category: IntegrationCategory;
  description: string;
  isRecommended: boolean;
}

export interface ConnectedSource {
  id: string;
  integrationId: string;
  name: string;
  status: SyncStatus;
  recordCount?: number;
  syncProgress?: number;
  lastSyncAt?: Date;
}

export interface AIModel {
  id: string;
  name: string;
  accuracy: number;
  trainingStatus: 'complete' | 'training' | 'pending';
  trainingProgress?: number;
  estimatedTimeRemaining?: number;
}

export interface QuickStartTemplate {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: string;
}
