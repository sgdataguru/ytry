'use client';

/**
 * @file experiments/page.tsx
 * @description Feature 03 - Run Rapid Experiments Dashboard
 * Enables users to run controlled experiments in 48 hours with live significance tracking
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { Badge } from '@/app/components/ui/Badge';
import { Progress } from '@/app/components/ui/Progress';
import { ExperimentCard } from '@/app/components/features/ExperimentCard';
import { mockExperiments } from '@/app/lib/mock-data';
import { cn } from '@/app/lib/utils';
import type { Experiment } from '@/app/types';

type WizardStep = 'hypothesis' | 'variants' | 'metrics' | 'audience' | 'duration' | 'review';

interface ExperimentWizardProps {
  onClose: () => void;
  onSubmit: (experiment: Partial<Experiment>) => void;
}

function ExperimentWizard({ onClose, onSubmit }: ExperimentWizardProps) {
  const [step, setStep] = useState<WizardStep>('hypothesis');
  const [formData, setFormData] = useState({
    name: '',
    hypothesis: '',
    controlName: 'A (Control)',
    variantName: 'B',
    primaryMetric: 'conversion_rate',
    audienceSize: 50,
    duration: 48,
  });

  const steps: { key: WizardStep; label: string; icon: string }[] = [
    { key: 'hypothesis', label: 'Hypothesis', icon: '💡' },
    { key: 'variants', label: 'Variants', icon: '🔀' },
    { key: 'metrics', label: 'Metrics', icon: '📊' },
    { key: 'audience', label: 'Audience', icon: '👥' },
    { key: 'duration', label: 'Duration', icon: '⏱️' },
    { key: 'review', label: 'Review', icon: '✅' },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === step);

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

  const handleSubmit = () => {
    onSubmit({
      name: formData.name,
      hypothesis: formData.hypothesis,
      duration: formData.duration,
      status: 'running',
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--bg-primary)] rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-[var(--border-primary)]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">
              🧪 New Experiment
            </h2>
            <button
              onClick={onClose}
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-1">
            {steps.map((s, index) => (
              <div key={s.key} className="flex items-center flex-1">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all',
                    index <= currentStepIndex
                      ? 'bg-[var(--ps-orange)] text-white'
                      : 'bg-[var(--bg-secondary)] text-[var(--text-muted)]'
                  )}
                >
                  {s.icon}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'flex-1 h-0.5 mx-2',
                      index < currentStepIndex
                        ? 'bg-[var(--ps-orange)]'
                        : 'bg-[var(--border-primary)]'
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {step === 'hypothesis' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Experiment Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Homepage CTA Optimization"
                  className="w-full px-4 py-3 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:border-[var(--ps-orange)] focus:ring-2 focus:ring-[rgba(255,89,0,0.2)] outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Hypothesis
                </label>
                <textarea
                  value={formData.hypothesis}
                  onChange={(e) => setFormData({ ...formData, hypothesis: e.target.value })}
                  placeholder="If we [change], then [outcome] will [improve/decrease] because [reason]."
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:border-[var(--ps-orange)] focus:ring-2 focus:ring-[rgba(255,89,0,0.2)] outline-none transition-all resize-none"
                />
              </div>
              <div className="p-4 rounded-lg bg-[rgba(33,150,243,0.1)] border border-[var(--ps-info)]">
                <p className="text-sm text-[var(--ps-info)] font-medium mb-2">
                  💡 Tips for a Good Hypothesis
                </p>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>• Be specific about what you're changing</li>
                  <li>• Define a measurable outcome</li>
                  <li>• State why you believe this will work</li>
                </ul>
              </div>
            </div>
          )}

          {step === 'variants' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-secondary)]">
                  <p className="text-xs font-medium text-[var(--text-muted)] mb-2">
                    CONTROL GROUP
                  </p>
                  <input
                    type="text"
                    value={formData.controlName}
                    onChange={(e) => setFormData({ ...formData, controlName: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-[var(--border-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)] text-sm"
                  />
                  <p className="text-xs text-[var(--text-muted)] mt-2">
                    Current experience (unchanged)
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-[var(--ps-orange)] bg-[rgba(255,89,0,0.05)]">
                  <p className="text-xs font-medium text-[var(--ps-orange)] mb-2">
                    TEST VARIANT
                  </p>
                  <input
                    type="text"
                    value={formData.variantName}
                    onChange={(e) => setFormData({ ...formData, variantName: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-[var(--border-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)] text-sm"
                  />
                  <p className="text-xs text-[var(--text-muted)] mt-2">
                    New experience to test
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="w-full">
                + Add Another Variant
              </Button>
            </div>
          )}

          {step === 'metrics' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-3">
                  Primary Success Metric
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'conversion_rate', label: 'Conversion Rate', icon: '📈' },
                    { value: 'revenue', label: 'Revenue per User', icon: '💰' },
                    { value: 'engagement', label: 'Engagement Rate', icon: '👆' },
                    { value: 'retention', label: 'Retention Rate', icon: '🔄' },
                  ].map((metric) => (
                    <button
                      key={metric.value}
                      onClick={() => setFormData({ ...formData, primaryMetric: metric.value })}
                      className={cn(
                        'p-4 rounded-lg border text-left transition-all',
                        formData.primaryMetric === metric.value
                          ? 'border-[var(--ps-orange)] bg-[rgba(255,89,0,0.05)]'
                          : 'border-[var(--border-primary)] bg-[var(--bg-secondary)] hover:border-[var(--border-secondary)]'
                      )}
                    >
                      <span className="text-2xl mb-2 block">{metric.icon}</span>
                      <span className="text-sm font-medium text-[var(--text-primary)]">
                        {metric.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 'audience' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-3">
                  Traffic Allocation
                </label>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--text-secondary)]">
                      Percentage of traffic to include
                    </span>
                    <span className="text-lg font-semibold text-[var(--ps-orange)]">
                      {formData.audienceSize}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={formData.audienceSize}
                    onChange={(e) =>
                      setFormData({ ...formData, audienceSize: parseInt(e.target.value) })
                    }
                    className="w-full accent-[var(--ps-orange)]"
                  />
                  <div className="flex justify-between text-xs text-[var(--text-muted)]">
                    <span>10%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
                <p className="text-sm text-[var(--text-secondary)]">
                  ⚡ <strong>Recommended:</strong> Start with 50% to balance speed and risk.
                  Higher allocation = faster results.
                </p>
              </div>
            </div>
          )}

          {step === 'duration' && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { hours: 24, label: '24 Hours', desc: 'Quick validation' },
                  { hours: 48, label: '48 Hours', desc: 'Recommended' },
                  { hours: 72, label: '72 Hours', desc: 'Higher confidence' },
                ].map((option) => (
                  <button
                    key={option.hours}
                    onClick={() => setFormData({ ...formData, duration: option.hours })}
                    className={cn(
                      'p-4 rounded-lg border text-center transition-all',
                      formData.duration === option.hours
                        ? 'border-[var(--ps-orange)] bg-[rgba(255,89,0,0.05)]'
                        : 'border-[var(--border-primary)] bg-[var(--bg-secondary)] hover:border-[var(--border-secondary)]'
                    )}
                  >
                    <span className="text-2xl font-bold text-[var(--text-primary)] block mb-1">
                      {option.label}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">{option.desc}</span>
                  </button>
                ))}
              </div>
              <div className="p-4 rounded-lg bg-[rgba(0,168,120,0.1)] border border-[var(--ps-success)]">
                <p className="text-sm text-[var(--ps-success)] font-medium">
                  ✅ With 50% traffic, you can achieve statistical significance in as little as 48 hours
                </p>
              </div>
            </div>
          )}

          {step === 'review' && (
            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
                <h3 className="font-semibold text-[var(--text-primary)] mb-4">
                  Experiment Summary
                </h3>
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-sm text-[var(--text-muted)]">Name</dt>
                    <dd className="text-sm font-medium text-[var(--text-primary)]">
                      {formData.name || 'Untitled'}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-[var(--text-muted)]">Duration</dt>
                    <dd className="text-sm font-medium text-[var(--text-primary)]">
                      {formData.duration} hours
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-[var(--text-muted)]">Traffic</dt>
                    <dd className="text-sm font-medium text-[var(--text-primary)]">
                      {formData.audienceSize}%
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-[var(--text-muted)]">Primary Metric</dt>
                    <dd className="text-sm font-medium text-[var(--text-primary)]">
                      {formData.primaryMetric.replace('_', ' ')}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Hypothesis:</strong> {formData.hypothesis || 'No hypothesis provided'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[var(--border-primary)] flex justify-between">
          <Button variant="ghost" onClick={currentStepIndex === 0 ? onClose : handleBack}>
            {currentStepIndex === 0 ? 'Cancel' : '← Back'}
          </Button>
          {step === 'review' ? (
            <Button variant="primary" onClick={handleSubmit}>
              🚀 Launch Experiment
            </Button>
          ) : (
            <Button variant="primary" onClick={handleNext}>
              Continue →
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ExperimentsPage() {
  const [experiments] = useState<Experiment[]>(mockExperiments);
  const [showWizard, setShowWizard] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredExperiments =
    filterStatus === 'all'
      ? experiments
      : experiments.filter((e) => e.status === filterStatus);

  const runningExperiments = experiments.filter((e) => e.status === 'running');
  const completedExperiments = experiments.filter((e) => e.status === 'completed');
  const avgSignificance =
    runningExperiments.length > 0
      ? runningExperiments.reduce((acc, e) => acc + e.currentSignificance, 0) /
        runningExperiments.length
      : 0;

  const handleCreateExperiment = (experiment: Partial<Experiment>) => {
    console.log('Creating experiment:', experiment);
    setShowWizard(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            🧪 Rapid Experiments
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Launch and monitor controlled experiments with real-time significance tracking
          </p>
        </div>
        <Button variant="primary" onClick={() => setShowWizard(true)}>
          + New Experiment
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-6">
        <Card variant="default" padding="md">
          <CardContent className="p-0">
            <p className="text-sm text-[var(--text-muted)] mb-1">Running</p>
            <p className="text-3xl font-bold text-[var(--ps-success)]">
              {runningExperiments.length}
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">Active experiments</p>
          </CardContent>
        </Card>

        <Card variant="default" padding="md">
          <CardContent className="p-0">
            <p className="text-sm text-[var(--text-muted)] mb-1">Completed</p>
            <p className="text-3xl font-bold text-[var(--ps-info)]">
              {completedExperiments.length}
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">This month</p>
          </CardContent>
        </Card>

        <Card variant="default" padding="md">
          <CardContent className="p-0">
            <p className="text-sm text-[var(--text-muted)] mb-1">Avg Significance</p>
            <p className="text-3xl font-bold text-[var(--text-primary)]">
              {avgSignificance.toFixed(0)}%
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">Running experiments</p>
          </CardContent>
        </Card>

        <Card variant="default" padding="md">
          <CardContent className="p-0">
            <p className="text-sm text-[var(--text-muted)] mb-1">Avg Duration</p>
            <p className="text-3xl font-bold text-[var(--text-primary)]">48h</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">Time to significance</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[var(--border-primary)] pb-4">
        {[
          { key: 'all', label: 'All Experiments' },
          { key: 'running', label: 'Running' },
          { key: 'completed', label: 'Completed' },
          { key: 'draft', label: 'Drafts' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterStatus(tab.key)}
            className={cn(
              'px-4 py-2 text-sm font-medium rounded-lg transition-all',
              filterStatus === tab.key
                ? 'bg-[var(--ps-orange)] text-white'
                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Experiments Grid */}
      <div className="grid grid-cols-2 gap-6">
        {filteredExperiments.map((experiment) => (
          <ExperimentCard
            key={experiment.id}
            experiment={experiment}
            onViewDetails={(e) => console.log('View details:', e)}
            onPause={(e) => console.log('Pause:', e)}
            onStop={(e) => console.log('Stop:', e)}
          />
        ))}
      </div>

      {filteredExperiments.length === 0 && (
        <div className="text-center py-16">
          <span className="text-6xl mb-4 block">🧪</span>
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            No experiments found
          </h3>
          <p className="text-[var(--text-muted)] mb-6">
            Start your first experiment to see results here
          </p>
          <Button variant="primary" onClick={() => setShowWizard(true)}>
            + Create Experiment
          </Button>
        </div>
      )}

      {/* Wizard Modal */}
      {showWizard && (
        <ExperimentWizard
          onClose={() => setShowWizard(false)}
          onSubmit={handleCreateExperiment}
        />
      )}
    </div>
  );
}
