'use client';

/**
 * @file ExperimentCard.tsx
 * @description Card component for displaying experiment status and results
 */

import { cn } from '@/app/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/Card';
import { Badge, StatusBadge } from '@/app/components/ui/Badge';
import { Progress } from '@/app/components/ui/Progress';
import { Button } from '@/app/components/ui/Button';
import type { Experiment } from '@/app/types';

interface ExperimentCardProps {
  experiment: Experiment;
  onViewDetails?: (experiment: Experiment) => void;
  onPause?: (experiment: Experiment) => void;
  onStop?: (experiment: Experiment) => void;
}

export function ExperimentCard({
  experiment,
  onViewDetails,
  onPause,
  onStop,
}: ExperimentCardProps) {
  const statusConfig = {
    draft: { color: 'bg-[var(--ps-gray-500)]', label: 'Draft' },
    running: { color: 'bg-[var(--ps-success)]', label: 'Running' },
    paused: { color: 'bg-[var(--ps-warning)]', label: 'Paused' },
    completed: { color: 'bg-[var(--ps-info)]', label: 'Completed' },
    failed: { color: 'bg-[var(--ps-error)]', label: 'Failed' },
  };

  const status = statusConfig[experiment.status];
  const significanceReached = experiment.currentSignificance >= experiment.targetSignificance;

  // Calculate time remaining
  const daysRemaining = experiment.endDate
    ? Math.max(0, Math.ceil((experiment.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : Math.ceil(experiment.duration * (1 - experiment.progress / 100));

  return (
    <Card variant="default" padding="none" className="overflow-hidden">
      <CardHeader className="p-6 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">🧪</span>
              <CardTitle className="text-lg">{experiment.name}</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'w-2 h-2 rounded-full',
                  status.color,
                  experiment.status === 'running' && 'animate-pulse'
                )}
              />
              <span className="text-sm font-medium text-[var(--text-secondary)]">
                {status.label}
              </span>
              {experiment.status === 'running' && (
                <span className="text-sm text-[var(--text-muted)]">
                  • {daysRemaining}d left
                </span>
              )}
            </div>
          </div>
          {experiment.status === 'completed' && significanceReached && (
            <Badge variant="success" size="sm">
              🏆 Significant
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-0 space-y-6">
        {/* Hypothesis */}
        <div className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
          <p className="text-xs font-medium text-[var(--text-muted)] mb-2">
            HYPOTHESIS
          </p>
          <p className="text-sm text-[var(--text-primary)] line-clamp-2">
            {experiment.hypothesis}
          </p>
        </div>

        {/* Progress */}
        {experiment.status === 'running' && (
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[var(--text-muted)]">Progress</span>
              <span className="font-medium text-[var(--text-primary)]">
                {experiment.progress}%
              </span>
            </div>
            <Progress value={experiment.progress} variant="default" size="md" />
          </div>
        )}

        {/* Variants Comparison */}
        <div className="grid grid-cols-2 gap-4">
          {experiment.variants.map((variant, index) => (
            <div
              key={variant.id}
              className={cn(
                'p-4 rounded-lg border',
                index === 0
                  ? 'bg-[var(--bg-secondary)] border-[var(--border-primary)]'
                  : 'bg-[rgba(33,150,243,0.05)] border-[var(--ps-info)]'
              )}
            >
              <p className="text-xs font-medium text-[var(--text-muted)] mb-1">
                {variant.type === 'control' ? 'CONTROL' : 'VARIANT'} {variant.name}
              </p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">
                {variant.conversionRate.toFixed(1)}%
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                n = {variant.participants.toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {/* Statistical Significance */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[var(--text-muted)]">
              Statistical Significance
            </span>
            <span
              className={cn(
                'text-sm font-semibold',
                significanceReached
                  ? 'text-[var(--ps-success)]'
                  : 'text-[var(--text-primary)]'
              )}
            >
              {experiment.currentSignificance}% (Target: {experiment.targetSignificance}%)
            </span>
          </div>
          <Progress
            value={experiment.currentSignificance}
            max={100}
            variant={significanceReached ? 'success' : 'default'}
            size="sm"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          {experiment.status === 'running' && (
            <>
              <Button variant="ghost" size="sm" onClick={() => onPause?.(experiment)}>
                ⏸️ Pause
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-[var(--ps-error)]"
                onClick={() => onStop?.(experiment)}
              >
                ⏹️ Stop
              </Button>
            </>
          )}
          <Button
            variant="secondary"
            size="sm"
            className="ml-auto"
            onClick={() => onViewDetails?.(experiment)}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
