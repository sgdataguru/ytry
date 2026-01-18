'use client';

/**
 * @file pipeline/page.tsx
 * @description Feature 05 - Accelerate Sales Pipeline
 * Shows pipeline health with deal momentum tracking and AI-powered recommendations
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { Badge } from '@/app/components/ui/Badge';
import { Progress } from '@/app/components/ui/Progress';
import { DealCard } from '@/app/components/features/DealCard';
import { MomentumAlert } from '@/app/components/features/MomentumAlert';
import { mockDeals, mockMomentumAlerts, mockPipelineSummary } from '@/app/lib/mock-data';
import { cn, formatCurrency, formatCompact } from '@/app/lib/utils';
import type { Deal, MomentumAlert as MomentumAlertType } from '@/app/types';

export default function PipelinePage() {
  const [deals] = useState<Deal[]>(mockDeals);
  const [alerts, setAlerts] = useState<MomentumAlertType[]>(mockMomentumAlerts);
  const [filterStage, setFilterStage] = useState<string>('all');
  const [filterMomentum, setFilterMomentum] = useState<string>('all');

  const filteredDeals = deals.filter((deal) => {
    if (filterStage !== 'all' && deal.stage !== filterStage) return false;
    if (filterMomentum !== 'all' && deal.momentum !== filterMomentum) return false;
    return true;
  });

  const summary = mockPipelineSummary;
  const atRiskDeals = deals.filter(
    (d) => d.momentum === 'slowing' || d.momentum === 'stalled'
  );

  const handleDismissAlert = (alert: MomentumAlertType) => {
    setAlerts((prev) => prev.filter((a) => a.id !== alert.id));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            💰 Sales Pipeline
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Track deal momentum and accelerate your pipeline with AI insights
          </p>
        </div>
        <Button variant="primary">+ Add Deal</Button>
      </div>

      {/* Pipeline Summary */}
      <div className="grid grid-cols-5 gap-4">
        <Card variant="elevated" padding="md" className="col-span-2">
          <CardContent className="p-0">
            <p className="text-sm text-[var(--text-muted)] mb-1">Total Pipeline</p>
            <p className="text-3xl font-bold text-[var(--text-primary)]">
              {formatCurrency(summary.totalValue)}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-[var(--ps-success)]">
                ↑ {summary.changePercent}%
              </span>
              <span className="text-sm text-[var(--text-muted)]">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card variant="default" padding="md">
          <CardContent className="p-0">
            <p className="text-sm text-[var(--text-muted)] mb-1">Weighted Value</p>
            <p className="text-2xl font-bold text-[var(--ps-success)]">
              {formatCurrency(summary.weightedValue)}
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">Expected revenue</p>
          </CardContent>
        </Card>

        <Card variant="default" padding="md">
          <CardContent className="p-0">
            <p className="text-sm text-[var(--text-muted)] mb-1">Avg Win Rate</p>
            <p className="text-2xl font-bold text-[var(--text-primary)]">
              {summary.avgWinRate}%
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">Last 90 days</p>
          </CardContent>
        </Card>

        <Card variant="default" padding="md">
          <CardContent className="p-0">
            <p className="text-sm text-[var(--text-muted)] mb-1">At Risk</p>
            <p className="text-2xl font-bold text-[var(--ps-error)]">
              {atRiskDeals.length}
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">Deals need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Stages Funnel */}
      <Card variant="default" padding="md">
        <CardHeader className="p-0 pb-4">
          <CardTitle className="text-sm">Pipeline by Stage</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex items-end gap-2 h-32">
            {summary.stageBreakdown.map((stage, index) => {
              const maxValue = Math.max(...summary.stageBreakdown.map((s) => s.value));
              const height = (stage.value / maxValue) * 100;
              const colors = [
                'bg-[var(--ps-info)]',
                'bg-[rgba(33,150,243,0.8)]',
                'bg-[var(--ps-warning)]',
                'bg-[var(--ps-orange)]',
                'bg-[var(--ps-success)]',
              ];

              return (
                <div key={stage.stage} className="flex-1 flex flex-col items-center">
                  <span className="text-xs font-medium text-[var(--text-primary)] mb-2">
                    {formatCompact(stage.value)}
                  </span>
                  <div
                    className={cn('w-full rounded-t-lg transition-all', colors[index])}
                    style={{ height: `${height}%`, minHeight: '20px' }}
                  />
                  <span className="text-xs text-[var(--text-muted)] mt-2 capitalize">
                    {stage.stage}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">
                    ({stage.count})
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left: Deals List */}
        <div className="col-span-2 space-y-6">
          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[var(--text-muted)]">Stage:</span>
              <select
                value={filterStage}
                onChange={(e) => setFilterStage(e.target.value)}
                className="px-3 py-2 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] text-sm text-[var(--text-primary)]"
              >
                <option value="all">All Stages</option>
                <option value="discovery">Discovery</option>
                <option value="qualification">Qualification</option>
                <option value="proposal">Proposal</option>
                <option value="negotiation">Negotiation</option>
                <option value="closing">Closing</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[var(--text-muted)]">Momentum:</span>
              <select
                value={filterMomentum}
                onChange={(e) => setFilterMomentum(e.target.value)}
                className="px-3 py-2 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] text-sm text-[var(--text-primary)]"
              >
                <option value="all">All</option>
                <option value="accelerating">🚀 Accelerating</option>
                <option value="stable">➡️ Stable</option>
                <option value="slowing">⚠️ Slowing</option>
                <option value="stalled">🛑 Stalled</option>
              </select>
            </div>
          </div>

          {/* Deals Grid */}
          <div className="space-y-4">
            {filteredDeals.map((deal) => (
              <DealCard
                key={deal.id}
                deal={deal}
                onViewDetails={(d) => console.log('View deal:', d)}
                onTakeAction={(d, action) => console.log('Action:', action, d)}
              />
            ))}
          </div>

          {filteredDeals.length === 0 && (
            <div className="text-center py-16">
              <span className="text-6xl mb-4 block">💰</span>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                No deals found
              </h3>
              <p className="text-[var(--text-muted)]">
                Adjust your filters or add a new deal
              </p>
            </div>
          )}
        </div>

        {/* Right: Alerts Panel */}
        <div className="space-y-6">
          <Card variant="elevated" padding="md">
            <CardHeader className="p-0 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Momentum Alerts</CardTitle>
                <Badge variant="warning" size="sm">
                  {alerts.length} Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              {alerts.length > 0 ? (
                alerts.slice(0, 5).map((alert) => (
                  <MomentumAlert
                    key={alert.id}
                    alert={alert}
                    onDismiss={handleDismissAlert}
                    onTakeAction={(a) => console.log('Take action:', a)}
                  />
                ))
              ) : (
                <div className="text-center py-8">
                  <span className="text-3xl mb-2 block">✅</span>
                  <p className="text-sm text-[var(--text-muted)]">No alerts right now</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Coaching */}
          <Card variant="default" padding="md">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-sm">🤖 AI Pipeline Coach</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <div className="p-3 rounded-lg bg-[var(--bg-secondary)]">
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong className="text-[var(--text-primary)]">Focus Area:</strong> You have 3 deals in the Proposal stage for 10+ days. Consider scheduling follow-ups.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-[var(--bg-secondary)]">
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong className="text-[var(--text-primary)]">Quick Win:</strong> TechCorp deal has high engagement signals. Recommend moving to negotiation.
                </p>
              </div>
              <Button variant="secondary" size="sm" className="w-full">
                Get More Recommendations
              </Button>
            </CardContent>
          </Card>

          {/* Velocity Metrics */}
          <Card variant="default" padding="md">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-sm">Pipeline Velocity</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[var(--text-muted)]">Avg Deal Cycle</span>
                  <span className="font-semibold text-[var(--text-primary)]">45 days</span>
                </div>
                <Progress value={65} variant="default" size="sm" />
                <p className="text-xs text-[var(--ps-success)] mt-1">↓ 12% faster than avg</p>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[var(--text-muted)]">Stage Conversion</span>
                  <span className="font-semibold text-[var(--text-primary)]">72%</span>
                </div>
                <Progress value={72} variant="success" size="sm" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
