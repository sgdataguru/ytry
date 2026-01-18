'use client';

/**
 * @file operations/page.tsx
 * @description Feature 07 - Gain Operational Advantage (Operations Center)
 * Shows operational metrics, detected inefficiencies, and optimization opportunities
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { Badge } from '@/app/components/ui/Badge';
import { Progress } from '@/app/components/ui/Progress';
import { InefficiencyCard } from '@/app/components/features/InefficiencyCard';
import { MetricCard } from '@/app/components/features/MetricCard';
import { mockOperationalMetrics, mockInefficiencies } from '@/app/lib/mock-data';
import { cn, formatCurrency, formatCompact } from '@/app/lib/utils';
import type { OperationalMetric, Inefficiency } from '@/app/types';

export default function OperationsPage() {
  const [metrics] = useState<OperationalMetric[]>(mockOperationalMetrics);
  const [inefficiencies, setInefficiencies] = useState<Inefficiency[]>(mockInefficiencies);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'metrics' | 'inefficiencies'>('metrics');

  const filteredInefficiencies =
    filterCategory === 'all'
      ? inefficiencies
      : inefficiencies.filter((i) => i.category === filterCategory);

  const newInefficiencies = inefficiencies.filter((i) => i.status === 'new').length;
  const totalSavings = inefficiencies.reduce(
    (acc, i) => acc + i.potentialSavings,
    0
  );
  const totalHoursLost = inefficiencies.reduce(
    (acc, i) => acc + i.hoursLostPerWeek,
    0
  );
  const operationalScore = 78; // Calculated score

  const handleFix = (inefficiency: Inefficiency) => {
    setInefficiencies((prev) =>
      prev.map((i) =>
        i.id === inefficiency.id ? { ...i, status: 'in_progress' } : i
      )
    );
  };

  const handleIgnore = (inefficiency: Inefficiency) => {
    setInefficiencies((prev) =>
      prev.map((i) =>
        i.id === inefficiency.id ? { ...i, status: 'resolved' } : i
      )
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            ⚙️ Operations Center
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Monitor operations and eliminate inefficiencies with AI-powered insights
          </p>
        </div>
        <div className="flex items-center gap-2 p-1 rounded-lg bg-[var(--bg-secondary)]">
          <button
            onClick={() => setViewMode('metrics')}
            className={cn(
              'px-4 py-2 text-sm font-medium rounded-md transition-all',
              viewMode === 'metrics'
                ? 'bg-[var(--ps-orange)] text-white'
                : 'text-[var(--text-secondary)]'
            )}
          >
            📊 Metrics
          </button>
          <button
            onClick={() => setViewMode('inefficiencies')}
            className={cn(
              'px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2',
              viewMode === 'inefficiencies'
                ? 'bg-[var(--ps-orange)] text-white'
                : 'text-[var(--text-secondary)]'
            )}
          >
            ⚠️ Issues
            {newInefficiencies > 0 && (
              <span className="px-1.5 py-0.5 text-xs rounded-full bg-[var(--ps-error)] text-white">
                {newInefficiencies}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-6">
        <Card variant="elevated" padding="md">
          <CardContent className="p-0">
            <p className="text-sm text-[var(--text-muted)] mb-1">Operational Score</p>
            <div className="flex items-center gap-3">
              <p className="text-3xl font-bold text-[var(--text-primary)]">
                {operationalScore}
              </p>
              <span className="text-sm text-[var(--ps-success)]">↑ 5pts</span>
            </div>
            <Progress value={operationalScore} variant="success" size="sm" className="mt-2" />
          </CardContent>
        </Card>

        <Card variant="default" padding="md">
          <CardContent className="p-0">
            <p className="text-sm text-[var(--text-muted)] mb-1">Issues Detected</p>
            <p className="text-3xl font-bold text-[var(--ps-warning)]">
              {inefficiencies.length}
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              {newInefficiencies} new this week
            </p>
          </CardContent>
        </Card>

        <Card variant="default" padding="md">
          <CardContent className="p-0">
            <p className="text-sm text-[var(--text-muted)] mb-1">Potential Savings</p>
            <p className="text-3xl font-bold text-[var(--ps-success)]">
              {formatCurrency(totalSavings)}
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">If all issues fixed</p>
          </CardContent>
        </Card>

        <Card variant="default" padding="md">
          <CardContent className="p-0">
            <p className="text-sm text-[var(--text-muted)] mb-1">Time Lost Weekly</p>
            <p className="text-3xl font-bold text-[var(--ps-error)]">{totalHoursLost}h</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">Due to inefficiencies</p>
          </CardContent>
        </Card>
      </div>

      {viewMode === 'metrics' ? (
        /* Metrics View */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              Key Operational Metrics
            </h2>
            <Button variant="secondary" size="sm">
              + Add Custom Metric
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {metrics.map((metric) => (
              <MetricCard
                key={metric.id}
                metric={metric}
                onClick={(m) => console.log('Metric clicked:', m)}
              />
            ))}
          </div>

          {/* Category Breakdown */}
          <div className="grid grid-cols-3 gap-6 mt-8">
            {['efficiency', 'quality', 'cost'].map((category) => {
              const categoryMetrics = metrics.filter(
                (m) => m.category === category
              );
              const avgPerformance =
                categoryMetrics.length > 0
                  ? categoryMetrics.reduce(
                      (acc, m) => acc + (m.value / m.target) * 100,
                      0
                    ) / categoryMetrics.length
                  : 0;

              return (
                <Card key={category} variant="default" padding="md">
                  <CardHeader className="p-0 pb-4">
                    <CardTitle className="text-sm capitalize">{category} Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-[var(--text-primary)]">
                        {avgPerformance.toFixed(0)}%
                      </span>
                      <span
                        className={cn(
                          'text-sm font-medium',
                          avgPerformance >= 90
                            ? 'text-[var(--ps-success)]'
                            : avgPerformance >= 70
                            ? 'text-[var(--ps-warning)]'
                            : 'text-[var(--ps-error)]'
                        )}
                      >
                        {avgPerformance >= 90
                          ? 'On Track'
                          : avgPerformance >= 70
                          ? 'Needs Attention'
                          : 'Critical'}
                      </span>
                    </div>
                    <Progress
                      value={avgPerformance}
                      variant={
                        avgPerformance >= 90
                          ? 'success'
                          : avgPerformance >= 70
                          ? 'warning'
                          : 'error'
                      }
                      size="md"
                    />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ) : (
        /* Inefficiencies View */
        <div className="grid grid-cols-3 gap-6">
          {/* Left: Inefficiencies List */}
          <div className="col-span-2 space-y-6">
            {/* Filters */}
            <div className="flex items-center gap-2">
              {[
                { key: 'all', label: 'All Categories' },
                { key: 'process', label: '⚙️ Process' },
                { key: 'resource', label: '👥 Resource' },
                { key: 'technology', label: '💻 Technology' },
                { key: 'communication', label: '💬 Communication' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilterCategory(tab.key)}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-lg transition-all',
                    filterCategory === tab.key
                      ? 'bg-[var(--ps-orange)] text-white'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Inefficiencies List */}
            <div className="space-y-4">
              {filteredInefficiencies.map((inefficiency) => (
                <InefficiencyCard
                  key={inefficiency.id}
                  inefficiency={inefficiency}
                  onFix={handleFix}
                  onIgnore={handleIgnore}
                  onViewDetails={(i) => console.log('View:', i)}
                />
              ))}
            </div>

            {filteredInefficiencies.length === 0 && (
              <div className="text-center py-16">
                <span className="text-6xl mb-4 block">✅</span>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  No issues found
                </h3>
                <p className="text-[var(--text-muted)]">
                  Your operations are running smoothly
                </p>
              </div>
            )}
          </div>

          {/* Right: Insights Panel */}
          <div className="space-y-6">
            {/* AI Recommendations */}
            <Card variant="elevated" padding="md">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-sm">🤖 AI Optimization Insights</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <div className="p-3 rounded-lg bg-[rgba(255,89,0,0.05)] border border-[var(--ps-orange)]">
                  <p className="text-xs font-medium text-[var(--ps-orange)] mb-1">
                    HIGHEST IMPACT
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Fixing the manual approval bottleneck could save 15 hours/week and $45K/year.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-[var(--bg-secondary)]">
                  <p className="text-xs font-medium text-[var(--text-muted)] mb-1">
                    QUICK WIN
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Automating report generation requires 2 days effort but saves 5 hours weekly.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Impact Summary */}
            <Card variant="default" padding="md">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-sm">Impact by Category</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-3">
                {[
                  { label: 'Process', hours: 25, savings: 75000, color: 'bg-[var(--ps-info)]' },
                  { label: 'Resource', hours: 15, savings: 45000, color: 'bg-[var(--ps-warning)]' },
                  { label: 'Technology', hours: 10, savings: 30000, color: 'bg-[var(--ps-orange)]' },
                  { label: 'Communication', hours: 5, savings: 15000, color: 'bg-[var(--ps-success)]' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className={cn('w-3 h-3 rounded-full', item.color)} />
                    <span className="text-sm text-[var(--text-secondary)] flex-1">
                      {item.label}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">
                      {item.hours}h/wk
                    </span>
                    <span className="text-sm font-medium text-[var(--ps-success)]">
                      {formatCompact(item.savings)}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Action Plan */}
            <Card variant="default" padding="md">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-sm">📋 Suggested Action Plan</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ol className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[var(--ps-orange)] text-white flex items-center justify-center text-xs font-medium">
                      1
                    </span>
                    <span className="text-[var(--text-secondary)]">
                      Automate manual approval workflow
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[var(--bg-secondary)] text-[var(--text-muted)] flex items-center justify-center text-xs font-medium">
                      2
                    </span>
                    <span className="text-[var(--text-secondary)]">
                      Implement self-service reporting
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[var(--bg-secondary)] text-[var(--text-muted)] flex items-center justify-center text-xs font-medium">
                      3
                    </span>
                    <span className="text-[var(--text-secondary)]">
                      Consolidate communication channels
                    </span>
                  </li>
                </ol>
                <Button variant="primary" className="w-full mt-6">
                  Start Optimization Program
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
