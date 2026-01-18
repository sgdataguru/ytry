'use client';

/**
 * @file DealCard.tsx
 * @description Card component for displaying deal status and momentum
 */

import { cn, formatCurrency, formatRelativeTime } from '@/app/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/Card';
import { Badge } from '@/app/components/ui/Badge';
import { Progress, CircularProgress } from '@/app/components/ui/Progress';
import { Button } from '@/app/components/ui/Button';
import type { Deal } from '@/app/types';

interface DealCardProps {
  deal: Deal;
  onViewDetails?: (deal: Deal) => void;
  onTakeAction?: (deal: Deal, action: string) => void;
}

export function DealCard({ deal, onViewDetails, onTakeAction }: DealCardProps) {
  const stageConfig = {
    prospect: { color: 'bg-[var(--ps-gray-500)]', label: 'Prospect', icon: '👤' },
    qualification: { color: 'bg-[var(--ps-info)]', label: 'Qualification', icon: '✅' },
    proposal: { color: 'bg-[var(--ps-warning)]', label: 'Proposal', icon: '📄' },
    negotiation: { color: 'bg-[var(--ps-orange)]', label: 'Negotiation', icon: '🤝' },
    'closed-won': { color: 'bg-[var(--ps-success)]', label: 'Won', icon: '🏆' },
    'closed-lost': { color: 'bg-[var(--ps-error)]', label: 'Lost', icon: '❌' },
  };

  const momentumConfig = {
    accelerating: { color: 'text-[var(--ps-success)]', icon: '🚀', label: 'Accelerating' },
    steady: { color: 'text-[var(--ps-info)]', icon: '➡️', label: 'Steady' },
    slowing: { color: 'text-[var(--ps-warning)]', icon: '⚠️', label: 'Slowing' },
    stalled: { color: 'text-[var(--ps-error)]', icon: '🛑', label: 'Stalled' },
  };

  const stage = stageConfig[deal.stage];
  const momentum = momentumConfig[deal.momentum];
  const isAtRisk = deal.momentum === 'slowing' || deal.momentum === 'stalled';

  return (
    <Card
      variant="default"
      padding="none"
      className={cn(
        'overflow-hidden transition-all',
        isAtRisk && 'border-[var(--ps-warning)]'
      )}
    >
      <CardHeader className="p-6 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">{stage.icon}</span>
              <CardTitle className="text-lg">{deal.company}</CardTitle>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="default" size="sm">
                {stage.label}
              </Badge>
              <span className={cn('text-sm font-medium flex items-center gap-1', momentum.color)}>
                {momentum.icon} {momentum.label}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-[var(--text-primary)]">
              {formatCurrency(deal.value)}
            </p>
            <p className="text-xs text-[var(--text-muted)]">Deal Value</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-0 space-y-6">
        {/* Win Probability */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-[var(--text-muted)]">Win Probability</span>
            <span
              className={cn(
                'font-semibold',
                deal.winProbability >= 70
                  ? 'text-[var(--ps-success)]'
                  : deal.winProbability >= 40
                  ? 'text-[var(--ps-warning)]'
                  : 'text-[var(--ps-error)]'
              )}
            >
              {deal.winProbability}%
            </span>
          </div>
          <Progress
            value={deal.winProbability}
            variant={
              deal.winProbability >= 70
                ? 'success'
                : deal.winProbability >= 40
                ? 'warning'
                : 'error'
            }
            size="md"
          />
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] text-center">
            <p className="text-lg font-bold text-[var(--text-primary)]">
              {deal.daysInStage}
            </p>
            <p className="text-xs text-[var(--text-muted)]">Days in Stage</p>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] text-center">
            <p className="text-lg font-bold text-[var(--text-primary)]">
              {deal.stakeholders}
            </p>
            <p className="text-xs text-[var(--text-muted)]">Stakeholders</p>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] text-center">
            <p className="text-lg font-bold text-[var(--text-primary)]">
              {formatRelativeTime(deal.lastActivity)}
            </p>
            <p className="text-xs text-[var(--text-muted)]">Last Activity</p>
          </div>
        </div>

        {/* Next Best Action */}
        {deal.nextBestAction && (
          <div className="p-4 rounded-lg bg-[rgba(255,89,0,0.05)] border border-[var(--ps-orange)]">
            <p className="text-xs font-medium text-[var(--ps-orange)] mb-2">
              💡 RECOMMENDED ACTION
            </p>
            <p className="text-sm text-[var(--text-primary)]">{deal.nextBestAction}</p>
          </div>
        )}

        {/* AI Insights */}
        {deal.aiInsights && deal.aiInsights.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-[var(--text-muted)]">AI INSIGHTS</p>
            {deal.aiInsights.slice(0, 2).map((insight, index) => (
              <p key={index} className="text-sm text-[var(--text-secondary)]">
                • {insight}
              </p>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="secondary"
            size="sm"
            className="flex-1"
            onClick={() => onViewDetails?.(deal)}
          >
            View Details
          </Button>
          {deal.nextBestAction && (
            <Button
              variant="primary"
              size="sm"
              className="flex-1"
              onClick={() => onTakeAction?.(deal, deal.nextBestAction!)}
            >
              Take Action
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
