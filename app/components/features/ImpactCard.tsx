'use client';

/**
 * @file ImpactCard.tsx
 * @description Card component for displaying initiative impact metrics
 */

import { cn, formatCurrency, formatPercent } from '@/app/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/Card';
import { Badge } from '@/app/components/ui/Badge';
import { Progress, ConfidenceBar } from '@/app/components/ui/Progress';
import { Button } from '@/app/components/ui/Button';
import type { ImpactInitiative } from '@/app/types';

interface ImpactCardProps {
  initiative: ImpactInitiative;
  onViewDetails?: (initiative: ImpactInitiative) => void;
  onExport?: (initiative: ImpactInitiative) => void;
}

export function ImpactCard({ initiative, onViewDetails, onExport }: ImpactCardProps) {
  const statusConfig = {
    tracking: { color: 'bg-[var(--ps-info)]', label: 'Tracking', icon: '📊' },
    exceeded: { color: 'bg-[var(--ps-success)]', label: 'Exceeded', icon: '🏆' },
    on_target: { color: 'bg-[var(--ps-success)]', label: 'On Target', icon: '✅' },
    below_target: { color: 'bg-[var(--ps-warning)]', label: 'Below Target', icon: '⚠️' },
  };

  const status = statusConfig[initiative.status];
  const roiPercent =
    initiative.metrics.investment > 0
      ? (initiative.metrics.actualValue / initiative.metrics.investment - 1) * 100
      : 0;
  const progressPercent =
    initiative.metrics.targetValue > 0
      ? (initiative.metrics.actualValue / initiative.metrics.targetValue) * 100
      : 0;

  return (
    <Card variant="default" padding="none" className="overflow-hidden">
      <CardHeader className="p-6 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">{status.icon}</span>
              <CardTitle className="text-lg">{initiative.name}</CardTitle>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="default" size="sm">
                {initiative.category}
              </Badge>
              <span
                className={cn(
                  'px-2 py-1 rounded-full text-xs font-medium text-white',
                  status.color
                )}
              >
                {status.label}
              </span>
            </div>
          </div>
          {roiPercent > 0 && (
            <div className="text-right">
              <p className="text-xs text-[var(--text-muted)]">ROI</p>
              <p className="text-2xl font-bold text-[var(--ps-success)]">
                {roiPercent.toFixed(0)}%
              </p>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-0 space-y-6">
        {/* Value Metrics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] text-center">
            <p className="text-xs text-[var(--text-muted)] mb-1">Actual Value</p>
            <p className="text-lg font-bold text-[var(--ps-success)]">
              {formatCurrency(initiative.metrics.actualValue)}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] text-center">
            <p className="text-xs text-[var(--text-muted)] mb-1">Target Value</p>
            <p className="text-lg font-bold text-[var(--text-primary)]">
              {formatCurrency(initiative.metrics.targetValue)}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] text-center">
            <p className="text-xs text-[var(--text-muted)] mb-1">Investment</p>
            <p className="text-lg font-bold text-[var(--text-primary)]">
              {formatCurrency(initiative.metrics.investment)}
            </p>
          </div>
        </div>

        {/* Progress to Target */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-[var(--text-muted)]">Progress to Target</span>
            <span
              className={cn(
                'font-semibold',
                progressPercent >= 100
                  ? 'text-[var(--ps-success)]'
                  : progressPercent >= 75
                  ? 'text-[var(--ps-info)]'
                  : 'text-[var(--ps-warning)]'
              )}
            >
              {progressPercent.toFixed(0)}%
            </span>
          </div>
          <Progress
            value={Math.min(progressPercent, 100)}
            variant={progressPercent >= 100 ? 'success' : 'default'}
            size="md"
          />
        </div>

        {/* Key Outcomes */}
        {initiative.keyOutcomes && initiative.keyOutcomes.length > 0 && (
          <div>
            <p className="text-xs font-medium text-[var(--text-muted)] mb-2">
              KEY OUTCOMES
            </p>
            <ul className="space-y-2">
              {initiative.keyOutcomes.slice(0, 3).map((outcome, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-sm text-[var(--text-secondary)]"
                >
                  <span className="text-[var(--ps-success)]">✓</span>
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Attribution Confidence */}
        <div>
          <p className="text-xs font-medium text-[var(--text-muted)] mb-2">
            ATTRIBUTION CONFIDENCE
          </p>
          <ConfidenceBar
            confidence={initiative.attributionConfidence}
          />
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Based on {initiative.dataPoints || 0} data points
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="secondary"
            size="sm"
            className="flex-1"
            onClick={() => onViewDetails?.(initiative)}
          >
            View Analysis
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onExport?.(initiative)}>
            📤 Export
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
