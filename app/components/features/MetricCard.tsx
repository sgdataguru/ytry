'use client';

/**
 * @file MetricCard.tsx
 * @description Card component for displaying operational metrics
 */

import { cn, formatPercent, formatCompact } from '@/app/lib/utils';
import { Card, CardContent } from '@/app/components/ui/Card';
import { Progress } from '@/app/components/ui/Progress';
import type { OperationalMetric } from '@/app/types';

interface MetricCardProps {
  metric: OperationalMetric;
  onClick?: (metric: OperationalMetric) => void;
}

export function MetricCard({ metric, onClick }: MetricCardProps) {
  const trendConfig = {
    up: { icon: '↑', color: 'text-[var(--ps-success)]' },
    down: { icon: '↓', color: 'text-[var(--ps-error)]' },
    stable: { icon: '→', color: 'text-[var(--text-muted)]' },
  };

  const trend = trendConfig[metric.trend];
  const percentToTarget =
    metric.target > 0 ? (metric.value / metric.target) * 100 : 100;
  const isOnTarget = percentToTarget >= 90;

  const formatValue = (value: number, format: string) => {
    switch (format) {
      case 'percent':
        return formatPercent(value / 100);
      case 'currency':
        return formatCompact(value);
      case 'number':
      default:
        return formatCompact(value);
    }
  };

  return (
    <Card
      variant="default"
      padding="md"
      className={cn(
        'cursor-pointer transition-all hover:shadow-md',
        !isOnTarget && 'border-[var(--ps-warning)]'
      )}
      onClick={() => onClick?.(metric)}
    >
      <CardContent className="p-0">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-sm text-[var(--text-muted)]">{metric.name}</p>
            <p className="text-2xl font-bold text-[var(--text-primary)]">
              {formatValue(metric.value, metric.format)}
            </p>
          </div>
          <div className={cn('text-sm font-medium flex items-center gap-1', trend.color)}>
            {trend.icon} {metric.changePercent}%
          </div>
        </div>

        {metric.target > 0 && (
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[var(--text-muted)]">vs Target</span>
              <span
                className={cn(
                  'font-medium',
                  isOnTarget ? 'text-[var(--ps-success)]' : 'text-[var(--ps-warning)]'
                )}
              >
                {formatValue(metric.target, metric.format)}
              </span>
            </div>
            <Progress
              value={Math.min(percentToTarget, 100)}
              variant={isOnTarget ? 'success' : 'warning'}
              size="sm"
            />
          </div>
        )}

        {metric.category && (
          <p className="text-xs text-[var(--text-muted)] mt-3 capitalize">
            {metric.category}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
