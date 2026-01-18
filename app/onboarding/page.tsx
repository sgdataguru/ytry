'use client';

/**
 * @file onboarding/page.tsx
 * @description Feature 10 - Onboard to Innovation Platform
 * Progressive onboarding wizard with role-based customization
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { Badge } from '@/app/components/ui/Badge';
import { Progress } from '@/app/components/ui/Progress';
import { cn } from '@/app/lib/utils';

type OnboardingStep =
  | 'welcome'
  | 'role'
  | 'goals'
  | 'data'
  | 'features'
  | 'personalize'
  | 'complete';

interface UserPreferences {
  role: string;
  goals: string[];
  dataSources: string[];
  enabledFeatures: string[];
  theme: 'light' | 'dark';
}

const roles = [
  {
    id: 'ceo',
    title: 'CEO / Executive',
    icon: '👔',
    description: 'Strategic decisions, portfolio oversight',
    recommendedFeatures: ['insights', 'decisions', 'impact'],
  },
  {
    id: 'sales_leader',
    title: 'Sales Leader',
    icon: '💼',
    description: 'Pipeline management, deal acceleration',
    recommendedFeatures: ['pipeline', 'recommendations', 'ai_assistant'],
  },
  {
    id: 'innovation_lead',
    title: 'Innovation Lead',
    icon: '💡',
    description: 'Experiments, scaling initiatives',
    recommendedFeatures: ['experiments', 'scale', 'impact'],
  },
  {
    id: 'ops_leader',
    title: 'Operations Leader',
    icon: '⚙️',
    description: 'Efficiency, process optimization',
    recommendedFeatures: ['operations', 'insights', 'decisions'],
  },
];

const businessGoals = [
  { id: 'revenue', label: 'Increase Revenue', icon: '📈' },
  { id: 'efficiency', label: 'Improve Efficiency', icon: '⚡' },
  { id: 'innovation', label: 'Drive Innovation', icon: '💡' },
  { id: 'decisions', label: 'Faster Decisions', icon: '🎯' },
  { id: 'pipeline', label: 'Grow Pipeline', icon: '💰' },
  { id: 'scale', label: 'Scale Success', icon: '🚀' },
];

const dataSources = [
  { id: 'crm', label: 'CRM (Salesforce, HubSpot)', icon: '📊' },
  { id: 'analytics', label: 'Analytics (Google, Mixpanel)', icon: '📈' },
  { id: 'finance', label: 'Finance (SAP, NetSuite)', icon: '💰' },
  { id: 'hr', label: 'HR Systems (Workday, BambooHR)', icon: '👥' },
  { id: 'project', label: 'Project Tools (Jira, Asana)', icon: '📋' },
  { id: 'manual', label: 'Manual Upload / CSV', icon: '📄' },
];

const features = [
  {
    id: 'insights',
    title: 'Actionable Insights',
    description: 'AI-powered insights prioritized by impact',
    icon: '💡',
  },
  {
    id: 'recommendations',
    title: 'AI Recommendations',
    description: 'Data-driven suggestions with confidence scores',
    icon: '🤖',
  },
  {
    id: 'experiments',
    title: 'Rapid Experiments',
    description: 'Run controlled tests in 48 hours',
    icon: '🧪',
  },
  {
    id: 'scale',
    title: 'Scale Initiatives',
    description: 'Readiness scores and scaling playbooks',
    icon: '🚀',
  },
  {
    id: 'pipeline',
    title: 'Sales Pipeline',
    description: 'Momentum tracking and deal intelligence',
    icon: '💰',
  },
  {
    id: 'decisions',
    title: 'Decision Center',
    description: 'AI context for faster decisions',
    icon: '⚡',
  },
  {
    id: 'operations',
    title: 'Operations Center',
    description: 'Detect and eliminate inefficiencies',
    icon: '⚙️',
  },
  {
    id: 'impact',
    title: 'Impact Tracking',
    description: 'ROI measurement and attribution',
    icon: '📈',
  },
  {
    id: 'ai_assistant',
    title: 'AI Assistant',
    description: 'Natural language queries and insights',
    icon: '💬',
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<OnboardingStep>('welcome');
  const [preferences, setPreferences] = useState<UserPreferences>({
    role: '',
    goals: [],
    dataSources: [],
    enabledFeatures: [],
    theme: 'light',
  });

  const steps: { key: OnboardingStep; label: string }[] = [
    { key: 'welcome', label: 'Welcome' },
    { key: 'role', label: 'Your Role' },
    { key: 'goals', label: 'Goals' },
    { key: 'data', label: 'Data Sources' },
    { key: 'features', label: 'Features' },
    { key: 'personalize', label: 'Personalize' },
    { key: 'complete', label: 'Complete' },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === step);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setStep(steps[nextIndex].key);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setStep(steps[prevIndex].key);
    }
  };

  const handleComplete = () => {
    // Save preferences and redirect
    localStorage.setItem('ytry_preferences', JSON.stringify(preferences));
    router.push('/dashboard');
  };

  const toggleGoal = (goalId: string) => {
    setPreferences((prev) => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter((g) => g !== goalId)
        : [...prev.goals, goalId],
    }));
  };

  const toggleDataSource = (sourceId: string) => {
    setPreferences((prev) => ({
      ...prev,
      dataSources: prev.dataSources.includes(sourceId)
        ? prev.dataSources.filter((s) => s !== sourceId)
        : [...prev.dataSources, sourceId],
    }));
  };

  const toggleFeature = (featureId: string) => {
    setPreferences((prev) => ({
      ...prev,
      enabledFeatures: prev.enabledFeatures.includes(featureId)
        ? prev.enabledFeatures.filter((f) => f !== featureId)
        : [...prev.enabledFeatures, featureId],
    }));
  };

  const selectRole = (roleId: string) => {
    const role = roles.find((r) => r.id === roleId);
    setPreferences((prev) => ({
      ...prev,
      role: roleId,
      enabledFeatures: role?.recommendedFeatures || [],
    }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      {/* Progress Bar */}
      {step !== 'welcome' && step !== 'complete' && (
        <div className="fixed top-20 left-0 right-0 z-10 px-6">
          <div className="max-w-3xl mx-auto">
            <Progress value={progress} variant="default" size="sm" />
            <div className="flex justify-between mt-2">
              {steps.slice(1, -1).map((s, index) => (
                <span
                  key={s.key}
                  className={cn(
                    'text-xs',
                    index <= currentStepIndex - 1
                      ? 'text-[var(--ps-orange)]'
                      : 'text-[var(--text-muted)]'
                  )}
                >
                  {s.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Welcome Step */}
      {step === 'welcome' && (
        <div className="text-center max-w-2xl animate-fade-in">
          <span className="text-7xl mb-6 block">🚀</span>
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
            Welcome to Ytry
          </h1>
          <p className="text-xl text-[var(--text-secondary)] mb-8">
            Your AI-powered innovation platform. Let's set up your workspace
            to match your goals and workflow.
          </p>
          <div className="flex flex-col gap-4 items-center">
            <Button variant="primary" size="lg" onClick={handleNext}>
              Get Started →
            </Button>
            <button
              onClick={() => router.push('/dashboard')}
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
            >
              Skip setup, take me to dashboard
            </button>
          </div>
        </div>
      )}

      {/* Role Selection Step */}
      {step === 'role' && (
        <div className="w-full max-w-3xl animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
              What's your role?
            </h2>
            <p className="text-[var(--text-secondary)]">
              We'll customize your experience based on your focus areas
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => selectRole(role.id)}
                className={cn(
                  'p-6 rounded-xl border text-left transition-all hover:shadow-md',
                  preferences.role === role.id
                    ? 'border-[var(--ps-orange)] bg-[rgba(255,89,0,0.05)] shadow-md'
                    : 'border-[var(--border-primary)] bg-[var(--bg-primary)] hover:border-[var(--border-secondary)]'
                )}
              >
                <span className="text-4xl mb-4 block">{role.icon}</span>
                <h3 className="font-semibold text-[var(--text-primary)] mb-1">
                  {role.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)]">{role.description}</p>
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <Button variant="ghost" onClick={handleBack}>
              ← Back
            </Button>
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={!preferences.role}
            >
              Continue →
            </Button>
          </div>
        </div>
      )}

      {/* Goals Step */}
      {step === 'goals' && (
        <div className="w-full max-w-3xl animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
              What are your key objectives?
            </h2>
            <p className="text-[var(--text-secondary)]">
              Select all that apply - we'll prioritize insights accordingly
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {businessGoals.map((goal) => (
              <button
                key={goal.id}
                onClick={() => toggleGoal(goal.id)}
                className={cn(
                  'p-4 rounded-xl border text-center transition-all hover:shadow-md',
                  preferences.goals.includes(goal.id)
                    ? 'border-[var(--ps-orange)] bg-[rgba(255,89,0,0.05)]'
                    : 'border-[var(--border-primary)] bg-[var(--bg-primary)]'
                )}
              >
                <span className="text-3xl mb-2 block">{goal.icon}</span>
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  {goal.label}
                </span>
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <Button variant="ghost" onClick={handleBack}>
              ← Back
            </Button>
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={preferences.goals.length === 0}
            >
              Continue →
            </Button>
          </div>
        </div>
      )}

      {/* Data Sources Step */}
      {step === 'data' && (
        <div className="w-full max-w-3xl animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
              Connect your data sources
            </h2>
            <p className="text-[var(--text-secondary)]">
              The more data we have, the better insights we can provide
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {dataSources.map((source) => (
              <button
                key={source.id}
                onClick={() => toggleDataSource(source.id)}
                className={cn(
                  'p-4 rounded-xl border flex items-center gap-4 transition-all hover:shadow-md',
                  preferences.dataSources.includes(source.id)
                    ? 'border-[var(--ps-orange)] bg-[rgba(255,89,0,0.05)]'
                    : 'border-[var(--border-primary)] bg-[var(--bg-primary)]'
                )}
              >
                <span className="text-2xl">{source.icon}</span>
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  {source.label}
                </span>
                {preferences.dataSources.includes(source.id) && (
                  <span className="ml-auto text-[var(--ps-success)]">✓</span>
                )}
              </button>
            ))}
          </div>

          <div className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)] mb-8">
            <p className="text-sm text-[var(--text-secondary)]">
              💡 Don't worry, you can connect more data sources later from Settings.
            </p>
          </div>

          <div className="flex justify-between">
            <Button variant="ghost" onClick={handleBack}>
              ← Back
            </Button>
            <Button variant="primary" onClick={handleNext}>
              Continue →
            </Button>
          </div>
        </div>
      )}

      {/* Features Step */}
      {step === 'features' && (
        <div className="w-full max-w-4xl animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
              Enable features
            </h2>
            <p className="text-[var(--text-secondary)]">
              Based on your role, we've pre-selected recommended features
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => toggleFeature(feature.id)}
                className={cn(
                  'p-4 rounded-xl border text-left transition-all hover:shadow-md',
                  preferences.enabledFeatures.includes(feature.id)
                    ? 'border-[var(--ps-orange)] bg-[rgba(255,89,0,0.05)]'
                    : 'border-[var(--border-primary)] bg-[var(--bg-primary)]'
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{feature.icon}</span>
                  {preferences.enabledFeatures.includes(feature.id) && (
                    <span className="text-[var(--ps-success)]">✓</span>
                  )}
                </div>
                <h3 className="font-medium text-[var(--text-primary)] mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  {feature.description}
                </p>
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <Button variant="ghost" onClick={handleBack}>
              ← Back
            </Button>
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={preferences.enabledFeatures.length === 0}
            >
              Continue →
            </Button>
          </div>
        </div>
      )}

      {/* Personalize Step */}
      {step === 'personalize' && (
        <div className="w-full max-w-2xl animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
              Final touches
            </h2>
            <p className="text-[var(--text-secondary)]">
              Customize your experience
            </p>
          </div>

          <Card variant="default" padding="lg" className="mb-8">
            <CardContent className="p-0 space-y-6">
              <div>
                <h3 className="font-medium text-[var(--text-primary)] mb-4">
                  Theme Preference
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() =>
                      setPreferences((prev) => ({ ...prev, theme: 'light' }))
                    }
                    className={cn(
                      'p-4 rounded-lg border transition-all',
                      preferences.theme === 'light'
                        ? 'border-[var(--ps-orange)] bg-[rgba(255,89,0,0.05)]'
                        : 'border-[var(--border-primary)]'
                    )}
                  >
                    <span className="text-2xl mb-2 block">☀️</span>
                    <span className="text-sm font-medium">Light Mode</span>
                  </button>
                  <button
                    onClick={() =>
                      setPreferences((prev) => ({ ...prev, theme: 'dark' }))
                    }
                    className={cn(
                      'p-4 rounded-lg border transition-all',
                      preferences.theme === 'dark'
                        ? 'border-[var(--ps-orange)] bg-[rgba(255,89,0,0.05)]'
                        : 'border-[var(--border-primary)]'
                    )}
                  >
                    <span className="text-2xl mb-2 block">🌙</span>
                    <span className="text-sm font-medium">Dark Mode</span>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-[var(--text-primary)] mb-4">
                  Notification Preferences
                </h3>
                <div className="space-y-3">
                  {[
                    { label: 'Critical insights & alerts', checked: true },
                    { label: 'Daily digest', checked: true },
                    { label: 'Experiment results', checked: true },
                    { label: 'Pipeline momentum changes', checked: false },
                  ].map((item) => (
                    <label
                      key={item.label}
                      className="flex items-center gap-3 text-sm text-[var(--text-secondary)] cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        defaultChecked={item.checked}
                        className="w-4 h-4 rounded border-[var(--border-primary)] accent-[var(--ps-orange)]"
                      />
                      {item.label}
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="ghost" onClick={handleBack}>
              ← Back
            </Button>
            <Button variant="primary" onClick={handleNext}>
              Complete Setup →
            </Button>
          </div>
        </div>
      )}

      {/* Complete Step */}
      {step === 'complete' && (
        <div className="text-center max-w-2xl animate-fade-in">
          <span className="text-7xl mb-6 block">🎉</span>
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
            You're all set!
          </h1>
          <p className="text-xl text-[var(--text-secondary)] mb-8">
            Your innovation platform is ready. Let's start driving impact.
          </p>

          <Card variant="elevated" padding="lg" className="mb-8 text-left">
            <CardContent className="p-0">
              <h3 className="font-semibold text-[var(--text-primary)] mb-4">
                Your Setup Summary
              </h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-[var(--text-muted)]">Role</dt>
                  <dd className="font-medium text-[var(--text-primary)]">
                    {roles.find((r) => r.id === preferences.role)?.title || 'Not set'}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--text-muted)]">Goals</dt>
                  <dd className="font-medium text-[var(--text-primary)]">
                    {preferences.goals.length} selected
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--text-muted)]">Data Sources</dt>
                  <dd className="font-medium text-[var(--text-primary)]">
                    {preferences.dataSources.length} connected
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--text-muted)]">Features</dt>
                  <dd className="font-medium text-[var(--text-primary)]">
                    {preferences.enabledFeatures.length} enabled
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Button variant="primary" size="lg" onClick={handleComplete}>
            Launch Dashboard 🚀
          </Button>
        </div>
      )}
    </div>
  );
}
