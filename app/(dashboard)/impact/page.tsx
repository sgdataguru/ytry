'use client';

/**
 * @file impact/page.tsx
 * @description Feature 09 - Track Real-World Impact
 * Shows impact portfolio with ROI tracking and attribution analysis
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { Badge } from '@/app/components/ui/Badge';
import { Progress } from '@/app/components/ui/Progress';
import { ImpactCard } from '@/app/components/features/ImpactCard';
import { mockImpactInitiatives, mockPortfolioSummary } from '@/app/lib/mock-data';
import { cn, formatCurrency, formatCompact } from '@/app/lib/utils';
import type { ImpactInitiative } from '@/app/types';

export default function ImpactPage() {
  const [initiatives] = useState<ImpactInitiative[]>(mockImpactInitiatives);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredInitiatives = initiatives.filter((initiative) => {
    if (filterCategory !== 'all' && initiative.category !== filterCategory)
      return false;
    if (filterStatus !== 'all' && initiative.status !== filterStatus) return false;
    return true;
  });

  const summary = mockPortfolioSummary;
  const totalActualValue = initiatives.reduce(
    (acc, i) => acc + i.metrics.actualValue,
    0
  );
  const totalTargetValue = initiatives.reduce(
    (acc, i) => acc + i.metrics.targetValue,
    0
  );
  const totalInvestment = initiatives.reduce(
    (acc, i) => acc + i.metrics.investment,
    0
  );
  const portfolioROI =
    totalInvestment > 0 ? ((totalActualValue / totalInvestment - 1) * 100) : 0;
  const exceededCount = initiatives.filter(
    (i) => i.status === 'exceeded' || i.status === 'on_target'
  ).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            📈 Impact Tracking
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Measure real-world outcomes and demonstrate ROI across all initiatives
          </p>
        </div>
        <Button variant="primary">📤 Generate Report</Button>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-5 gap-4">
        <Card variant="elevated" padding="md" className="col-span-2">
          <CardContent className="p-0">
            <p className="text-sm text-[var(--text-muted)] mb-1">Total Impact Value</p>
            <p className="text-3xl font-bold text-[var(--ps-success)]">
              {formatCurrency(totalActualValue)}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-[var(--ps-success)]">
                ↑ {summary.changePercent}%
              </span>
              <span className="text-sm text-[var(--text-muted)]">vs last quarter</span>
            </div>
          </CardContent>
        </Card>

        <Card variant="default" padding="md">
          <CardContent className="p-0">
            <p className="text-sm text-[var(--text-muted)] mb-1">Portfolio ROI</p>
            <p className="text-2xl font-bold text-[var(--ps-success)]">
              {portfolioROI.toFixed(0)}%
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              On {formatCompact(totalInvestment)} invested
            </p>
          </CardContent>
        </Card>

        <Card variant="default" padding="md">
          <CardContent className="p-0">
            <p className="text-sm text-[var(--text-muted)] mb-1">Hit Rate</p>
            <p className="text-2xl font-bold text-[var(--text-primary)]">
              {initiatives.length > 0
                ? ((exceededCount / initiatives.length) * 100).toFixed(0)
                : 0}
              %
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Meeting/exceeding targets
            </p>
          </CardContent>
        </Card>

        <Card variant="default" padding="md">
          <CardContent className="p-0">
            <p className="text-sm text-[var(--text-muted)] mb-1">Active Initiatives</p>
            <p className="text-2xl font-bold text-[var(--text-primary)]">
              {initiatives.length}
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">Being tracked</p>
          </CardContent>
        </Card>
      </div>

      {/* Target Progress */}
      <Card variant="default" padding="md">
        <CardHeader className="p-0 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Progress to Annual Targets</CardTitle>
            <span className="text-sm text-[var(--text-muted)]">
              {formatCurrency(totalActualValue)} / {formatCurrency(totalTargetValue)}
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Progress
            value={(totalActualValue / totalTargetValue) * 100}
            variant={totalActualValue >= totalTargetValue ? 'success' : 'default'}
            size="lg"
          />
          <div className="flex justify-between text-xs text-[var(--text-muted)] mt-2">
            <span>Q1</span>
            <span>Q2</span>
            <span>Q3</span>
            <span>Q4</span>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left: Initiatives List */}
        <div className="col-span-2 space-y-6">
          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[var(--text-muted)]">Category:</span>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] text-sm text-[var(--text-primary)]"
              >
                <option value="all">All Categories</option>
                <option value="revenue">Revenue</option>
                <option value="efficiency">Efficiency</option>
                <option value="growth">Growth</option>
                <option value="innovation">Innovation</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[var(--text-muted)]">Status:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] text-sm text-[var(--text-primary)]"
              >
                <option value="all">All</option>
                <option value="exceeded">🏆 Exceeded</option>
                <option value="on_target">✅ On Target</option>
                <option value="tracking">📊 Tracking</option>
                <option value="below_target">⚠️ Below Target</option>
              </select>
            </div>
          </div>

          {/* Initiatives Grid */}
          <div className="space-y-4">
            {filteredInitiatives.map((initiative) => (
              <ImpactCard
                key={initiative.id}
                initiative={initiative}
                onViewDetails={(i) => console.log('View:', i)}
                onExport={(i) => console.log('Export:', i)}
              />
            ))}
          </div>

          {filteredInitiatives.length === 0 && (
            <div className="text-center py-16">
              <span className="text-6xl mb-4 block">📈</span>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                No initiatives found
              </h3>
              <p className="text-[var(--text-muted)]">
                Adjust your filters or start tracking a new initiative
              </p>
            </div>
          )}
        </div>

        {/* Right: Insights Panel */}
        <div className="space-y-6">
          {/* Category Breakdown */}
          <Card variant="elevated" padding="md">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-sm">Impact by Category</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              {[
                { label: 'Revenue', value: 2100000, percent: 45, color: 'bg-[var(--ps-success)]' },
                { label: 'Efficiency', value: 1200000, percent: 26, color: 'bg-[var(--ps-info)]' },
                { label: 'Growth', value: 850000, percent: 18, color: 'bg-[var(--ps-warning)]' },
                { label: 'Innovation', value: 500000, percent: 11, color: 'bg-[var(--ps-orange)]' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[var(--text-secondary)]">
                      {item.label}
                    </span>
                    <span className="text-sm font-medium text-[var(--text-primary)]">
                      {formatCompact(item.value)}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
                    <div
                      className={cn('h-full rounded-full', item.color)}
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Performers */}
          <Card variant="default" padding="md">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-sm">🏆 Top Performers</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-3">
              {initiatives
                .sort((a, b) => {
                  const roiA =
                    a.metrics.investment > 0
                      ? a.metrics.actualValue / a.metrics.investment
                      : 0;
                  const roiB =
                    b.metrics.investment > 0
                      ? b.metrics.actualValue / b.metrics.investment
                      : 0;
                  return roiB - roiA;
                })
                .slice(0, 3)
                .map((initiative, index) => {
                  const roi =
                    initiative.metrics.investment > 0
                      ? ((initiative.metrics.actualValue / initiative.metrics.investment - 1) * 100)
                      : 0;
                  return (
                    <div
                      key={initiative.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-secondary)]"
                    >
                      <span className="text-lg">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                          {initiative.name}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">
                          {formatCurrency(initiative.metrics.actualValue)}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-[var(--ps-success)]">
                        {roi.toFixed(0)}% ROI
                      </span>
                    </div>
                  );
                })}
            </CardContent>
          </Card>

          {/* Attribution Quality */}
          <Card variant="default" padding="md">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-sm">📊 Attribution Quality</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-center py-4">
                <p className="text-4xl font-bold text-[var(--text-primary)] mb-2">
                  87%
                </p>
                <p className="text-sm text-[var(--text-muted)]">
                  Avg attribution confidence
                </p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 rounded bg-[rgba(0,168,120,0.1)]">
                  <span className="text-[var(--text-secondary)]">High confidence</span>
                  <span className="font-medium text-[var(--ps-success)]">6 initiatives</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-[rgba(255,184,0,0.1)]">
                  <span className="text-[var(--text-secondary)]">Medium confidence</span>
                  <span className="font-medium text-[var(--ps-warning)]">3 initiatives</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Export Options */}
          <Card variant="default" padding="md">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-sm">📤 Export Reports</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-2">
              <Button variant="secondary" size="sm" className="w-full justify-start">
                📑 Executive Summary
              </Button>
              <Button variant="secondary" size="sm" className="w-full justify-start">
                📊 Full Portfolio Analysis
              </Button>
              <Button variant="secondary" size="sm" className="w-full justify-start">
                📈 ROI Breakdown
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
