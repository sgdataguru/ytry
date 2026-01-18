'use client';

/**
 * @file InitiativeCard.tsx
 * @description Card component for displaying initiative scaling status
 */

import { cn } from '@/app/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/Card';
import { Badge } from '@/app/components/ui/Badge';
import { Progress, CircularProgress } from '@/app/components/ui/Progress';
import { Button } from '@/app/components/ui/Button';
import type { Initiative } from '@/app/types';

interface InitiativeCardProps {
  initiative: Initiative;
  onViewDetails?: (initiative: Initiative) => void;
  onScale?: (initiative: Initiative) => void;
}

export function InitiativeCard({
  initiative,
  onViewDetails,
  onScale,
}: InitiativeCardProps) {
  const phaseConfig = {
    pilot: { color: 'bg-[var(--ps-info)]', label: 'Pilot', icon: '🧪' },
    validation: { color: 'bg-[var(--ps-warning)]', label: 'Validation', icon: '✅' },
    scaling: { color: 'bg-[var(--ps-orange)]', label: 'Scaling', icon: '📈' },
    scaled: { color: 'bg-[var(--ps-success)]', label: 'Scaled', icon: '🏆' },
  };

  const phase = phaseConfig[initiative.currentPhase];
  const readinessScore = initiative.scalingReadiness.overall;
  const isScaleReady = readinessScore >= 80;

  return (
    <Card variant="default" padding="none" className="overflow-hidden">
      <CardHeader className="p-6 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">{phase.icon}</span>
              <CardTitle className="text-lg">{initiative.name}</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default" size="sm">
                {phase.label}
              </Badge>
              <span className="text-sm text-[var(--text-muted)]">
                {initiative.geography}
              </span>
            </div>
          </div>
          <CircularProgress value={readinessScore} size="lg" showValue />
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-0 space-y-6">
        {/* Results Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-[rgba(0,168,120,0.1)] border border-[var(--ps-success)]">
            <p className="text-xs font-medium text-[var(--text-muted)] mb-1">
              IMPACT
            </p>
            <p className="text-2xl font-bold text-[var(--ps-success)]">
              +{(initiative.results.actualLift * 100).toFixed(0)}%
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              vs target {(initiative.results.targetLift * 100).toFixed(0)}%
            </p>
          </div>
          <div className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <p className="text-xs font-medium text-[var(--text-muted)] mb-1">
              CONFIDENCE
            </p>
            <p className="text-2xl font-bold text-[var(--text-primary)]">
              {(initiative.results.confidence * 100).toFixed(0)}%
            </p>
            <p className="text-xs text-[var(--text-muted)]">Statistical significance</p>
          </div>
        </div>

        {/* Scaling Readiness Breakdown */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-[var(--text-primary)]">
            Scaling Readiness
          </p>
          {[
            { key: 'technical', label: 'Technical', value: initiative.scalingReadiness.technical },
            { key: 'organizational', label: 'Organizational', value: initiative.scalingReadiness.organizational },
            { key: 'financial', label: 'Financial', value: initiative.scalingReadiness.financial },
            { key: 'market', label: 'Market', value: initiative.scalingReadiness.market },
          ].map((item) => (
            <div key={item.key}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[var(--text-muted)]">{item.label}</span>
                <span
                  className={cn(
                    'font-medium',
                    item.value >= 80
                      ? 'text-[var(--ps-success)]'
                      : item.value >= 60
                      ? 'text-[var(--ps-warning)]'
                      : 'text-[var(--ps-error)]'
                  )}
                >
                  {item.value}%
                </span>
              </div>
              <Progress
                value={item.value}
                variant={item.value >= 80 ? 'success' : item.value >= 60 ? 'warning' : 'error'}
                size="sm"
              />
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="secondary"
            size="sm"
            className="flex-1"
            onClick={() => onViewDetails?.(initiative)}
          >
            View Details
          </Button>
          {isScaleReady && initiative.currentPhase !== 'scaled' && (
            <Button
              variant="primary"
              size="sm"
              className="flex-1"
              onClick={() => onScale?.(initiative)}
            >
              🚀 Scale Now
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
