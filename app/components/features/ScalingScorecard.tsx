'use client';

/**
 * @file ScalingScorecard.tsx
 * @description Displays scaling readiness score with breakdown
 */

import { cn } from '@/app/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/Card';
import { Progress, CircularProgress } from '@/app/components/ui/Progress';
import type { ScalingReadiness } from '@/app/types';

interface ScalingScorecardProps {
  readiness: ScalingReadiness;
  onImprove?: (dimension: keyof Omit<ScalingReadiness, 'overall'>) => void;
}

export function ScalingScorecard({ readiness, onImprove }: ScalingScorecardProps) {
  const dimensions: {
    key: keyof Omit<ScalingReadiness, 'overall'>;
    label: string;
    icon: string;
    description: string;
  }[] = [
    {
      key: 'technical',
      label: 'Technical',
      icon: '⚙️',
      description: 'Infrastructure, APIs, and system readiness',
    },
    {
      key: 'organizational',
      label: 'Organizational',
      icon: '👥',
      description: 'Team capacity, skills, and change management',
    },
    {
      key: 'financial',
      label: 'Financial',
      icon: '💰',
      description: 'Budget, ROI projections, and cost analysis',
    },
    {
      key: 'market',
      label: 'Market',
      icon: '🌍',
      description: 'Market conditions and competitive landscape',
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-[var(--ps-success)]';
    if (score >= 60) return 'text-[var(--ps-warning)]';
    return 'text-[var(--ps-error)]';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Ready';
    if (score >= 60) return 'Almost Ready';
    return 'Needs Work';
  };

  return (
    <Card variant="elevated" padding="none" className="overflow-hidden">
      <CardHeader className="p-6 pb-4 border-b border-[var(--border-primary)]">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Scaling Readiness Score</CardTitle>
          <div className="flex items-center gap-3">
            <CircularProgress value={readiness.overall} size="lg" showValue />
            <span
              className={cn('text-sm font-medium', getScoreColor(readiness.overall))}
            >
              {getScoreLabel(readiness.overall)}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {dimensions.map((dim) => {
          const score = readiness[dim.key];
          const needsImprovement = score < 80;

          return (
            <div
              key={dim.key}
              className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{dim.icon}</span>
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">{dim.label}</p>
                    <p className="text-xs text-[var(--text-muted)]">{dim.description}</p>
                  </div>
                </div>
                <span className={cn('text-2xl font-bold', getScoreColor(score))}>
                  {score}%
                </span>
              </div>
              <Progress
                value={score}
                variant={score >= 80 ? 'success' : score >= 60 ? 'warning' : 'error'}
                size="md"
              />
              {needsImprovement && (
                <button
                  onClick={() => onImprove?.(dim.key)}
                  className="mt-3 text-sm text-[var(--ps-orange)] hover:underline"
                >
                  View improvement suggestions →
                </button>
              )}
            </div>
          );
        })}

        {/* Summary */}
        <div
          className={cn(
            'p-4 rounded-lg border',
            readiness.overall >= 80
              ? 'bg-[rgba(0,168,120,0.1)] border-[var(--ps-success)]'
              : 'bg-[rgba(255,184,0,0.1)] border-[var(--ps-warning)]'
          )}
        >
          {readiness.overall >= 80 ? (
            <p className="text-sm text-[var(--ps-success)]">
              <strong>✅ Ready to Scale:</strong> This initiative meets all readiness
              criteria. You can proceed with scaling immediately.
            </p>
          ) : (
            <p className="text-sm text-[var(--ps-warning)]">
              <strong>⚠️ Improvements Needed:</strong> Address the highlighted areas
              before scaling to maximize success probability.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
