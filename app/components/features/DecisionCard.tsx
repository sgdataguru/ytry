'use client';

/**
 * @file DecisionCard.tsx
 * @description Card component for displaying decision items with context and actions
 */

import { cn, formatRelativeTime, formatCurrency } from '@/app/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/Card';
import { Badge, PriorityBadge } from '@/app/components/ui/Badge';
import { Progress, ConfidenceBar } from '@/app/components/ui/Progress';
import { Button } from '@/app/components/ui/Button';
import type { Decision } from '@/app/types';

interface DecisionCardProps {
  decision: Decision;
  onApprove?: (decision: Decision) => void;
  onReject?: (decision: Decision) => void;
  onDelegate?: (decision: Decision) => void;
  onViewDetails?: (decision: Decision) => void;
}

export function DecisionCard({
  decision,
  onApprove,
  onReject,
  onDelegate,
  onViewDetails,
}: DecisionCardProps) {
  const statusConfig = {
    pending: { color: 'bg-[var(--ps-warning)]', label: 'Pending', icon: '⏳' },
    approved: { color: 'bg-[var(--ps-success)]', label: 'Approved', icon: '✅' },
    rejected: { color: 'bg-[var(--ps-error)]', label: 'Rejected', icon: '❌' },
    delegated: { color: 'bg-[var(--ps-info)]', label: 'Delegated', icon: '↗️' },
  };

  const typeConfig = {
    budget: { icon: '💰', label: 'Budget' },
    resource: { icon: '👥', label: 'Resource' },
    strategic: { icon: '🎯', label: 'Strategic' },
    operational: { icon: '⚙️', label: 'Operational' },
    policy: { icon: '📋', label: 'Policy' },
  };

  const status = statusConfig[decision.status];
  const type = typeConfig[decision.type];
  const isUrgent = decision.urgency === 'critical' || decision.urgency === 'high';
  const isPending = decision.status === 'pending';

  // Calculate time until deadline
  const hoursUntilDeadline = Math.ceil(
    (decision.deadline.getTime() - Date.now()) / (1000 * 60 * 60)
  );
  const isOverdue = hoursUntilDeadline < 0;

  return (
    <Card
      variant="default"
      padding="none"
      className={cn(
        'overflow-hidden transition-all',
        isUrgent && isPending && 'border-[var(--ps-warning)] shadow-md'
      )}
    >
      <CardHeader className="p-6 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">{type.icon}</span>
              <CardTitle className="text-lg">{decision.title}</CardTitle>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="default" size="sm">
                {type.label}
              </Badge>
              <PriorityBadge priority={decision.urgency} />
              <span
                className={cn(
                  'text-xs font-medium flex items-center gap-1',
                  isOverdue ? 'text-[var(--ps-error)]' : 'text-[var(--text-muted)]'
                )}
              >
                {isOverdue ? '⚠️ Overdue' : `⏰ ${hoursUntilDeadline}h left`}
              </span>
            </div>
          </div>
          <div
            className={cn(
              'px-3 py-1 rounded-full text-xs font-medium text-white flex items-center gap-1',
              status.color
            )}
          >
            {status.icon} {status.label}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-0 space-y-6">
        {/* Description */}
        <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
          {decision.description}
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)]">
            <p className="text-xs text-[var(--text-muted)] mb-1">Impact</p>
            <p className="text-lg font-bold text-[var(--text-primary)]">
              {decision.impact === 'high'
                ? '🔥 High'
                : decision.impact === 'medium'
                ? '➡️ Medium'
                : '📉 Low'}
            </p>
          </div>
          {decision.estimatedValue && (
            <div className="p-3 rounded-lg bg-[var(--bg-secondary)]">
              <p className="text-xs text-[var(--text-muted)] mb-1">Est. Value</p>
              <p className="text-lg font-bold text-[var(--ps-success)]">
                {formatCurrency(decision.estimatedValue)}
              </p>
            </div>
          )}
        </div>

        {/* AI Recommendation */}
        {decision.aiRecommendation && (
          <div className="p-4 rounded-lg bg-[rgba(255,89,0,0.05)] border border-[var(--ps-orange)]">
            <div className="flex items-start gap-3">
              <span className="text-xl">🤖</span>
              <div className="flex-1">
                <p className="text-xs font-medium text-[var(--ps-orange)] mb-2">
                  AI RECOMMENDATION
                </p>
                <p className="text-sm text-[var(--text-primary)] mb-2">
                  {decision.aiRecommendation.action}
                </p>
                <ConfidenceBar
                  confidence={decision.aiRecommendation.confidence}
                />
                <p className="text-xs text-[var(--text-muted)] mt-2">
                  {decision.aiRecommendation.reasoning}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Supporting Data */}
        {decision.supportingData && decision.supportingData.length > 0 && (
          <div>
            <p className="text-xs font-medium text-[var(--text-muted)] mb-2">
              SUPPORTING EVIDENCE
            </p>
            <ul className="space-y-1">
              {decision.supportingData.slice(0, 3).map((data, index) => (
                <li key={index} className="text-sm text-[var(--text-secondary)]">
                  • {data}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        {isPending && (
          <div className="flex gap-3 pt-2">
            <Button variant="primary" size="sm" onClick={() => onApprove?.(decision)}>
              ✅ Approve
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onReject?.(decision)}>
              ❌ Reject
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelegate?.(decision)}>
              ↗️ Delegate
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="ml-auto"
              onClick={() => onViewDetails?.(decision)}
            >
              View Full Context
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
