'use client';

/**
 * @file InsightColumn.tsx
 * @description Column component for categorized insights display
 */

import { cn } from '@/app/lib/utils';
import { InsightCard } from './InsightCard';
import type { Insight, InsightCategory } from '@/app/types';

interface InsightColumnProps {
  category: InsightCategory;
  insights: Insight[];
  onInsightClick?: (insight: Insight) => void;
}

const categoryConfig = {
  immediate: {
    label: 'IMMEDIATE',
    icon: '🔴',
    description: 'Act now',
    color: 'border-[var(--ps-error)]',
    bgColor: 'bg-[rgba(229,57,53,0.05)]',
  },
  'short-term': {
    label: 'SHORT-TERM',
    icon: '🟡',
    description: 'This week',
    color: 'border-[var(--ps-warning)]',
    bgColor: 'bg-[rgba(255,184,0,0.05)]',
  },
  strategic: {
    label: 'STRATEGIC',
    icon: '🔵',
    description: 'Plan ahead',
    color: 'border-[var(--ps-info)]',
    bgColor: 'bg-[rgba(33,150,243,0.05)]',
  },
};

export function InsightColumn({
  category,
  insights,
  onInsightClick,
}: InsightColumnProps) {
  const config = categoryConfig[category];
  const filteredInsights = insights.filter((i) => i.category === category);

  return (
    <div className="flex flex-col h-full">
      {/* Column Header */}
      <div
        className={cn(
          'flex items-center gap-3 p-4 rounded-t-xl border-t-4',
          config.color,
          config.bgColor
        )}
      >
        <span className="text-xl">{config.icon}</span>
        <div>
          <h3 className="text-sm font-bold text-[var(--text-primary)]">
            {config.label}
          </h3>
          <p className="text-xs text-[var(--text-muted)]">{config.description}</p>
        </div>
        <span className="ml-auto px-2 py-0.5 rounded-full bg-[var(--bg-surface)] text-xs font-medium text-[var(--text-secondary)]">
          {filteredInsights.length}
        </span>
      </div>

      {/* Insights List */}
      <div className="flex-1 p-4 space-y-4 bg-[var(--bg-secondary)] rounded-b-xl overflow-y-auto">
        {filteredInsights.length > 0 ? (
          filteredInsights.map((insight) => (
            <InsightCard
              key={insight.id}
              insight={insight}
              onClick={onInsightClick}
            />
          ))
        ) : (
          <div className="text-center py-8 text-[var(--text-muted)]">
            <p className="text-sm">No insights in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
