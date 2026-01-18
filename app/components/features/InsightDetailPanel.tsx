'use client';

/**
 * @file InsightDetailPanel.tsx
 * @description Slide-out panel for insight details
 */

import { cn } from '@/app/lib/utils';
import { Button } from '@/app/components/ui/Button';
import { Badge } from '@/app/components/ui/Badge';
import { ConfidenceBar } from '@/app/components/ui/Progress';
import type { Insight } from '@/app/types';

interface InsightDetailPanelProps {
  insight: Insight | null;
  isOpen: boolean;
  onClose: () => void;
  onAction?: (action: 'accept' | 'dismiss' | 'snooze', insight: Insight) => void;
}

export function InsightDetailPanel({
  insight,
  isOpen,
  onClose,
  onAction,
}: InsightDetailPanelProps) {
  if (!insight) return null;

  const impactColors = {
    high: 'text-[var(--ps-error)]',
    medium: 'text-[var(--ps-warning)]',
    low: 'text-[var(--ps-info)]',
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-40 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          'fixed right-0 top-0 h-full w-full max-w-lg bg-[var(--bg-surface)] z-50',
          'border-l border-[var(--border-primary)] shadow-2xl',
          'transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--border-primary)]">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            Insight Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
          >
            <span className="text-xl">✕</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto h-[calc(100%-180px)]">
          {/* Title & Impact */}
          <div>
            <div className="flex items-start gap-3 mb-3">
              <Badge
                variant={insight.impact === 'high' ? 'error' : insight.impact === 'medium' ? 'warning' : 'info'}
                size="sm"
              >
                {insight.impact.toUpperCase()} IMPACT
              </Badge>
            </div>
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              {insight.title}
            </h3>
            <p className="text-[var(--text-secondary)]">{insight.description}</p>
          </div>

          {/* Confidence */}
          <div className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-[var(--text-primary)]">
                AI Confidence
              </span>
              <span className={cn('text-lg font-bold', impactColors[insight.impact])}>
                {insight.confidence}%
              </span>
            </div>
            <ConfidenceBar confidence={insight.confidence} showPercentage={false} />
          </div>

          {/* Action Item */}
          <div className="p-4 rounded-lg bg-[rgba(255,89,0,0.05)] border border-[var(--ps-orange)]">
            <p className="text-sm font-bold text-[var(--ps-orange)] mb-2">
              💡 RECOMMENDED ACTION
            </p>
            <p className="text-[var(--text-primary)]">{insight.actionItem}</p>
          </div>

          {/* Expected Outcome */}
          <div className="p-4 rounded-lg bg-[rgba(0,168,120,0.05)] border border-[var(--ps-success)]">
            <p className="text-sm font-bold text-[var(--ps-success)] mb-2">
              📈 EXPECTED OUTCOME
            </p>
            <p className="text-[var(--text-primary)]">{insight.expectedOutcome}</p>
          </div>

          {/* Supporting Data Placeholder */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
              Supporting Data
            </h4>
            <div className="p-8 rounded-lg border-2 border-dashed border-[var(--border-primary)] text-center">
              <span className="text-4xl mb-2 block">📊</span>
              <p className="text-sm text-[var(--text-muted)]">
                Interactive chart would appear here
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-[var(--bg-surface)] border-t border-[var(--border-primary)]">
          <div className="flex gap-3">
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => onAction?.('accept', insight)}
            >
              ✓ Take Action
            </Button>
            <Button
              variant="secondary"
              onClick={() => onAction?.('snooze', insight)}
            >
              ⏰ Snooze
            </Button>
            <Button
              variant="ghost"
              onClick={() => onAction?.('dismiss', insight)}
            >
              ✕ Dismiss
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
