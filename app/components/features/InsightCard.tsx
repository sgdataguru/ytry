'use client';

/**
 * @file InsightCard.tsx
 * @description Card component for displaying actionable insights
 */

import { cn } from '@/app/lib/utils';
import { Card, CardContent } from '@/app/components/ui/Card';
import { Badge } from '@/app/components/ui/Badge';
import { ConfidenceBar } from '@/app/components/ui/Progress';
import type { Insight } from '@/app/types';

interface InsightCardProps {
  insight: Insight;
  onClick?: (insight: Insight) => void;
}

export function InsightCard({ insight, onClick }: InsightCardProps) {
  const impactColors = {
    high: 'bg-[rgba(229,57,53,0.1)] text-[var(--ps-error)] border-[var(--ps-error)]',
    medium: 'bg-[rgba(255,184,0,0.1)] text-[#B38600] border-[var(--ps-warning)]',
    low: 'bg-[rgba(33,150,243,0.1)] text-[var(--ps-info)] border-[var(--ps-info)]',
  };

  return (
    <Card
      interactive
      variant="default"
      padding="md"
      className={cn(
        'group cursor-pointer',
        'hover:border-[var(--ps-orange)] hover:shadow-[0_4px_20px_rgba(255,89,0,0.1)]',
        'transition-all duration-200'
      )}
      onClick={() => onClick?.(insight)}
    >
      <CardContent className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <h4 className="text-base font-semibold text-[var(--text-primary)] line-clamp-2 group-hover:text-[var(--ps-orange)] transition-colors">
            {insight.title}
          </h4>
          <Badge
            variant="outline"
            size="sm"
            className={cn('shrink-0 border', impactColors[insight.impact])}
          >
            {insight.impact.toUpperCase()}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
          {insight.description}
        </p>

        {/* Action Item */}
        <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
          <p className="text-xs font-medium text-[var(--text-muted)] mb-1">
            💡 ACTION ITEM
          </p>
          <p className="text-sm text-[var(--text-primary)]">
            {insight.actionItem}
          </p>
        </div>

        {/* Expected Outcome */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-[var(--ps-success)] font-medium">
            📈 {insight.expectedOutcome}
          </span>
        </div>

        {/* Confidence */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-[var(--text-muted)]">Confidence</span>
            <span className="font-medium text-[var(--text-primary)]">
              {insight.confidence}%
            </span>
          </div>
          <ConfidenceBar confidence={insight.confidence} showPercentage={false} />
        </div>
      </CardContent>
    </Card>
  );
}
