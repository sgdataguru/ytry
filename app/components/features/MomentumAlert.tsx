'use client';

/**
 * @file MomentumAlert.tsx
 * @description Alert component for deal momentum changes
 */

import { cn, formatRelativeTime, formatCurrency } from '@/app/lib/utils';
import { Button } from '@/app/components/ui/Button';
import type { MomentumAlert as MomentumAlertType } from '@/app/types';

interface MomentumAlertProps {
  alert: MomentumAlertType;
  onDismiss?: (alert: MomentumAlertType) => void;
  onTakeAction?: (alert: MomentumAlertType) => void;
}

export function MomentumAlert({ alert, onDismiss, onTakeAction }: MomentumAlertProps) {
  const typeConfig = {
    positive: {
      bg: 'bg-[rgba(0,168,120,0.1)]',
      border: 'border-[var(--ps-success)]',
      icon: '🚀',
      iconColor: 'text-[var(--ps-success)]',
    },
    negative: {
      bg: 'bg-[rgba(229,57,53,0.1)]',
      border: 'border-[var(--ps-error)]',
      icon: '⚠️',
      iconColor: 'text-[var(--ps-error)]',
    },
    neutral: {
      bg: 'bg-[var(--bg-secondary)]',
      border: 'border-[var(--border-primary)]',
      icon: 'ℹ️',
      iconColor: 'text-[var(--ps-info)]',
    },
  };

  const config = typeConfig[alert.type];

  return (
    <div
      className={cn(
        'p-4 rounded-lg border transition-all hover:shadow-md',
        config.bg,
        config.border
      )}
    >
      <div className="flex items-start gap-4">
        <span className={cn('text-2xl', config.iconColor)}>{config.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <p className="font-medium text-[var(--text-primary)]">{alert.dealName}</p>
              <p className="text-xs text-[var(--text-muted)]">
                {formatRelativeTime(alert.timestamp)}
              </p>
            </div>
            {alert.value && (
              <span className="text-lg font-bold text-[var(--text-primary)]">
                {formatCurrency(alert.value)}
              </span>
            )}
          </div>
          <p className="text-sm text-[var(--text-secondary)] mb-3">{alert.message}</p>
          {alert.suggestedAction && (
            <p className="text-sm text-[var(--ps-orange)] font-medium mb-3">
              💡 {alert.suggestedAction}
            </p>
          )}
          <div className="flex items-center gap-2">
            {alert.suggestedAction && (
              <Button variant="primary" size="sm" onClick={() => onTakeAction?.(alert)}>
                Take Action
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={() => onDismiss?.(alert)}>
              Dismiss
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
