'use client';

/**
 * @file page.tsx
 * @description Actionable Insights Dashboard - Feature 01
 */

import { useState } from 'react';
import { InsightColumn } from '@/app/components/features/InsightColumn';
import { InsightDetailPanel } from '@/app/components/features/InsightDetailPanel';
import { Button } from '@/app/components/ui/Button';
import { mockInsights } from '@/app/lib/mock-data';
import type { Insight } from '@/app/types';

export default function DashboardPage() {
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleInsightClick = (insight: Insight) => {
    setSelectedInsight(insight);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
  };

  const handleAction = (
    action: 'accept' | 'dismiss' | 'snooze',
    insight: Insight
  ) => {
    console.log(`Action: ${action}`, insight);
    setIsPanelOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Priority Insights
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Actionable recommendations based on your business data
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <span className="w-2 h-2 rounded-full bg-[var(--ps-success)] animate-pulse" />
            Updated 2 mins ago
          </div>
          <Button variant="secondary" size="sm">
            <span className="mr-2">🔄</span>
            Refresh
          </Button>
          <select className="px-4 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--ps-orange)]">
            <option>All Categories</option>
            <option>Revenue</option>
            <option>Operations</option>
            <option>Growth</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-primary)]">
          <p className="text-sm text-[var(--text-muted)] mb-1">Total Insights</p>
          <p className="text-2xl font-bold text-[var(--text-primary)]">
            {mockInsights.length}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-[rgba(229,57,53,0.05)] border border-[var(--ps-error)]">
          <p className="text-sm text-[var(--text-muted)] mb-1">Immediate</p>
          <p className="text-2xl font-bold text-[var(--ps-error)]">
            {mockInsights.filter((i) => i.category === 'immediate').length}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-[rgba(255,184,0,0.05)] border border-[var(--ps-warning)]">
          <p className="text-sm text-[var(--text-muted)] mb-1">Short-term</p>
          <p className="text-2xl font-bold text-[#B38600]">
            {mockInsights.filter((i) => i.category === 'short-term').length}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-[rgba(33,150,243,0.05)] border border-[var(--ps-info)]">
          <p className="text-sm text-[var(--text-muted)] mb-1">Strategic</p>
          <p className="text-2xl font-bold text-[var(--ps-info)]">
            {mockInsights.filter((i) => i.category === 'strategic').length}
          </p>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-3 gap-6 min-h-[600px]">
        <InsightColumn
          category="immediate"
          insights={mockInsights}
          onInsightClick={handleInsightClick}
        />
        <InsightColumn
          category="short-term"
          insights={mockInsights}
          onInsightClick={handleInsightClick}
        />
        <InsightColumn
          category="strategic"
          insights={mockInsights}
          onInsightClick={handleInsightClick}
        />
      </div>

      {/* Detail Panel */}
      <InsightDetailPanel
        insight={selectedInsight}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
        onAction={handleAction}
      />
    </div>
  );
}
