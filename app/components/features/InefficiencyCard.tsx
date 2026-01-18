'use client';

/**
 * @file InefficiencyCard.tsx
 * @description Card component for displaying detected operational inefficiencies
 */

import { cn, formatCurrency } from '@/app/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/Card';
import { Badge, PriorityBadge } from '@/app/components/ui/Badge';
import { Progress } from '@/app/components/ui/Progress';
import { Button } from '@/app/components/ui/Button';
import type { Inefficiency } from '@/app/types';

interface InefficiencyCardProps {
  inefficiency: Inefficiency;
  onFix?: (inefficiency: Inefficiency) => void;
  onIgnore?: (inefficiency: Inefficiency) => void;
  onViewDetails?: (inefficiency: Inefficiency) => void;
}

export function InefficiencyCard({
  inefficiency,
  onFix,
  onIgnore,
  onViewDetails,
}: InefficiencyCardProps) {
  const categoryConfig = {
    process: { icon: '⚙️', label: 'Process', color: 'bg-[var(--ps-info)]' },
    resource: { icon: '👥', label: 'Resource', color: 'bg-[var(--ps-warning)]' },
    technology: { icon: '💻', label: 'Technology', color: 'bg-[var(--ps-orange)]' },
    communication: { icon: '💬', label: 'Communication', color: 'bg-[var(--ps-success)]' },
  };

  const statusConfig = {
    new: { label: 'New', color: 'text-[var(--ps-info)]' },
    acknowledged: { label: 'Acknowledged', color: 'text-[var(--ps-warning)]' },
    in_progress: { label: 'In Progress', color: 'text-[var(--ps-orange)]' },
    resolved: { label: 'Resolved', color: 'text-[var(--ps-success)]' },
  };

  const category = categoryConfig[inefficiency.category];
  const status = statusConfig[inefficiency.status];
  const isNew = inefficiency.status === 'new';

  return (
    <Card
      variant="default"
      padding="none"
      className={cn(
        'overflow-hidden transition-all',
        isNew && 'border-[var(--ps-warning)]'
      )}
    >
      <CardHeader className="p-6 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">{category.icon}</span>
              <CardTitle className="text-lg">{inefficiency.title}</CardTitle>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="default" size="sm">
                {category.label}
              </Badge>
              <PriorityBadge priority={inefficiency.severity} />
              <span className={cn('text-xs font-medium', status.color)}>
                {status.label}
              </span>
            </div>
          </div>
          {inefficiency.potentialSavings > 0 && (
            <div className="text-right">
              <p className="text-xs text-[var(--text-muted)]">Potential Savings</p>
              <p className="text-xl font-bold text-[var(--ps-success)]">
                {formatCurrency(inefficiency.potentialSavings)}
              </p>
              <p className="text-xs text-[var(--text-muted)]">per year</p>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-0 space-y-6">
        {/* Description */}
        <p className="text-sm text-[var(--text-secondary)]">
          {inefficiency.description}
        </p>

        {/* Impact Metrics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] text-center">
            <p className="text-xs text-[var(--text-muted)] mb-1">Time Lost</p>
            <p className="text-lg font-bold text-[var(--ps-error)]">
              {inefficiency.hoursLostPerWeek}h
            </p>
            <p className="text-xs text-[var(--text-muted)]">per week</p>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] text-center">
            <p className="text-xs text-[var(--text-muted)] mb-1">Affected</p>
            <p className="text-lg font-bold text-[var(--text-primary)]">
              {inefficiency.affectedTeams}
            </p>
            <p className="text-xs text-[var(--text-muted)]">teams</p>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] text-center">
            <p className="text-xs text-[var(--text-muted)] mb-1">Fix Effort</p>
            <p className="text-lg font-bold text-[var(--text-primary)]">
              {inefficiency.estimatedFixEffort}
            </p>
            <p className="text-xs text-[var(--text-muted)]">days</p>
          </div>
        </div>

        {/* AI Suggestion */}
        {inefficiency.aiSuggestion && (
          <div className="p-4 rounded-lg bg-[rgba(255,89,0,0.05)] border border-[var(--ps-orange)]">
            <p className="text-xs font-medium text-[var(--ps-orange)] mb-2">
              🤖 AI RECOMMENDATION
            </p>
            <p className="text-sm text-[var(--text-primary)]">
              {inefficiency.aiSuggestion}
            </p>
          </div>
        )}

        {/* Root Causes */}
        {inefficiency.rootCauses && inefficiency.rootCauses.length > 0 && (
          <div>
            <p className="text-xs font-medium text-[var(--text-muted)] mb-2">
              ROOT CAUSES IDENTIFIED
            </p>
            <ul className="space-y-1">
              {inefficiency.rootCauses.map((cause, index) => (
                <li key={index} className="text-sm text-[var(--text-secondary)]">
                  • {cause}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        {inefficiency.status !== 'resolved' && (
          <div className="flex gap-3 pt-2">
            <Button variant="primary" size="sm" onClick={() => onFix?.(inefficiency)}>
              🔧 Start Fix
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onIgnore?.(inefficiency)}>
              Ignore
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="ml-auto"
              onClick={() => onViewDetails?.(inefficiency)}
            >
              View Analysis
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
