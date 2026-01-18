'use client';

/**
 * @file decisions/page.tsx
 * @description Feature 06 - Speed Up Decision Making (Decision Center)
 * Centralized view of pending decisions with AI context and recommendations
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { Badge } from '@/app/components/ui/Badge';
import { Progress } from '@/app/components/ui/Progress';
import { DecisionCard } from '@/app/components/features/DecisionCard';
import { mockDecisions } from '@/app/lib/mock-data';
import { cn, formatRelativeTime } from '@/app/lib/utils';
import type { Decision } from '@/app/types';

export default function DecisionsPage() {
  const [decisions, setDecisions] = useState<Decision[]>(mockDecisions);
  const [filterStatus, setFilterStatus] = useState<string>('pending');
  const [filterUrgency, setFilterUrgency] = useState<string>('all');

  const filteredDecisions = decisions.filter((decision) => {
    if (filterStatus !== 'all' && decision.status !== filterStatus) return false;
    if (filterUrgency !== 'all' && decision.urgency !== filterUrgency) return false;
    return true;
  });

  const pendingCount = decisions.filter((d) => d.status === 'pending').length;
  const criticalCount = decisions.filter(
    (d) => d.status === 'pending' && (d.urgency === 'critical' || d.urgency === 'high')
  ).length;
  const avgDecisionTime = 4.2; // hours
  const decisionsThisWeek = 12;

  const handleApprove = (decision: Decision) => {
    setDecisions((prev) =>
      prev.map((d) => (d.id === decision.id ? { ...d, status: 'approved' } : d))
    );
  };

  const handleReject = (decision: Decision) => {
    setDecisions((prev) =>
      prev.map((d) => (d.id === decision.id ? { ...d, status: 'rejected' } : d))
    );
  };

  const handleDelegate = (decision: Decision) => {
    setDecisions((prev) =>
      prev.map((d) => (d.id === decision.id ? { ...d, status: 'delegated' } : d))
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            ⚡ Decision Center
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Make faster, data-informed decisions with AI-powered context
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-6">
        <Card variant="elevated" padding="md">
          <CardContent className="p-0">
            <p className="text-sm text-[var(--text-muted)] mb-1">Pending Decisions</p>
            <p className="text-3xl font-bold text-[var(--ps-warning)]">{pendingCount}</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">Awaiting your review</p>
          </CardContent>
        </Card>

        <Card variant="default" padding="md">
          <CardContent className="p-0">
            <p className="text-sm text-[var(--text-muted)] mb-1">Critical/High Priority</p>
            <p className="text-3xl font-bold text-[var(--ps-error)]">{criticalCount}</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">Need immediate attention</p>
          </CardContent>
        </Card>

        <Card variant="default" padding="md">
          <CardContent className="p-0">
            <p className="text-sm text-[var(--text-muted)] mb-1">Avg Decision Time</p>
            <p className="text-3xl font-bold text-[var(--ps-success)]">{avgDecisionTime}h</p>
            <p className="text-xs text-[var(--ps-success)] mt-1">↓ 35% faster with AI</p>
          </CardContent>
        </Card>

        <Card variant="default" padding="md">
          <CardContent className="p-0">
            <p className="text-sm text-[var(--text-muted)] mb-1">Decisions This Week</p>
            <p className="text-3xl font-bold text-[var(--text-primary)]">
              {decisionsThisWeek}
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">Made with AI assistance</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left: Decisions List */}
        <div className="col-span-2 space-y-6">
          {/* Filters */}
          <div className="flex items-center gap-4 border-b border-[var(--border-primary)] pb-4">
            <div className="flex items-center gap-2">
              {[
                { key: 'pending', label: 'Pending', count: pendingCount },
                { key: 'approved', label: 'Approved' },
                { key: 'rejected', label: 'Rejected' },
                { key: 'all', label: 'All' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilterStatus(tab.key)}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2',
                    filterStatus === tab.key
                      ? 'bg-[var(--ps-orange)] text-white'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                  )}
                >
                  {tab.label}
                  {tab.count && (
                    <span
                      className={cn(
                        'px-1.5 py-0.5 text-xs rounded-full',
                        filterStatus === tab.key
                          ? 'bg-white/20'
                          : 'bg-[var(--bg-tertiary)]'
                      )}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-[var(--text-muted)]">Priority:</span>
              <select
                value={filterUrgency}
                onChange={(e) => setFilterUrgency(e.target.value)}
                className="px-3 py-2 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] text-sm text-[var(--text-primary)]"
              >
                <option value="all">All</option>
                <option value="critical">🔴 Critical</option>
                <option value="high">🟠 High</option>
                <option value="medium">🟡 Medium</option>
                <option value="low">🟢 Low</option>
              </select>
            </div>
          </div>

          {/* Decisions List */}
          <div className="space-y-4">
            {filteredDecisions.map((decision) => (
              <DecisionCard
                key={decision.id}
                decision={decision}
                onApprove={handleApprove}
                onReject={handleReject}
                onDelegate={handleDelegate}
                onViewDetails={(d) => console.log('View:', d)}
              />
            ))}
          </div>

          {filteredDecisions.length === 0 && (
            <div className="text-center py-16">
              <span className="text-6xl mb-4 block">✅</span>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                All caught up!
              </h3>
              <p className="text-[var(--text-muted)]">
                No decisions matching your filters
              </p>
            </div>
          )}
        </div>

        {/* Right: Decision Insights */}
        <div className="space-y-6">
          {/* Decision Velocity */}
          <Card variant="elevated" padding="md">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-sm">Decision Velocity</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[var(--text-muted)]">Today's Progress</span>
                  <span className="font-semibold text-[var(--text-primary)]">
                    8/12 decisions
                  </span>
                </div>
                <Progress value={67} variant="default" size="md" />
              </div>
              <div className="p-3 rounded-lg bg-[rgba(0,168,120,0.1)] border border-[var(--ps-success)]">
                <p className="text-sm text-[var(--ps-success)]">
                  🎯 You're on track to clear your queue today!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* AI Decision Patterns */}
          <Card variant="default" padding="md">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-sm">🤖 AI Decision Patterns</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <div className="p-3 rounded-lg bg-[var(--bg-secondary)]">
                <p className="text-xs font-medium text-[var(--text-muted)] mb-1">
                  PATTERN DETECTED
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  You approve 89% of budget requests under $50K. Consider auto-approval for low-risk items.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-[var(--bg-secondary)]">
                <p className="text-xs font-medium text-[var(--text-muted)] mb-1">
                  OPTIMIZATION
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Delegating routine decisions could save 3 hours/week.
                </p>
              </div>
              <Button variant="secondary" size="sm" className="w-full">
                Configure Auto-Rules
              </Button>
            </CardContent>
          </Card>

          {/* Decision Impact */}
          <Card variant="default" padding="md">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-sm">Impact Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-3">
              {[
                { label: 'Strategic', value: 3, color: 'bg-[var(--ps-orange)]' },
                { label: 'Budget', value: 5, color: 'bg-[var(--ps-success)]' },
                { label: 'Resource', value: 2, color: 'bg-[var(--ps-info)]' },
                { label: 'Operational', value: 2, color: 'bg-[var(--ps-warning)]' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className={cn('w-3 h-3 rounded-full', item.color)} />
                  <span className="text-sm text-[var(--text-secondary)] flex-1">
                    {item.label}
                  </span>
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    {item.value}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Tips */}
          <Card variant="default" padding="md">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-sm">💡 Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li>• Use AI recommendations as a starting point</li>
                <li>• Batch similar decisions for efficiency</li>
                <li>• Delegate low-impact decisions</li>
                <li>• Set SLAs for decision types</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
