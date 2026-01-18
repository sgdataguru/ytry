'use client';

/**
 * @file RecommendationCard.tsx
 * @description Card component for AI-powered recommendations
 */

import { useState } from 'react';
import { cn } from '@/app/lib/utils';
import { Card, CardContent } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { ConfidenceBar } from '@/app/components/ui/Progress';
import type { Recommendation, RecommendationStatus } from '@/app/types';

interface RecommendationCardProps {
  recommendation: Recommendation;
  onAction?: (
    action: 'accept' | 'modify' | 'dismiss',
    recommendation: Recommendation
  ) => void;
  onFeedback?: (helpful: boolean, recommendation: Recommendation) => void;
}

export function RecommendationCard({
  recommendation,
  onAction,
  onFeedback,
}: RecommendationCardProps) {
  const [showFeedback, setShowFeedback] = useState(false);
  const [status, setStatus] = useState<RecommendationStatus>(
    recommendation.status
  );

  const statusStyles: Record<RecommendationStatus, string> = {
    pending: 'border-l-4 border-l-[var(--ps-orange)]',
    accepted: 'border-l-4 border-l-[var(--ps-success)] bg-[rgba(0,168,120,0.02)]',
    modified: 'border-l-4 border-l-[var(--ps-warning)] bg-[rgba(255,184,0,0.02)]',
    dismissed: 'opacity-60 border-l-4 border-l-[var(--ps-gray-300)]',
  };

  const handleAction = (action: 'accept' | 'modify' | 'dismiss') => {
    const newStatus: RecommendationStatus =
      action === 'accept' ? 'accepted' : action === 'modify' ? 'modified' : 'dismissed';
    setStatus(newStatus);
    setShowFeedback(action !== 'dismiss');
    onAction?.(action, recommendation);
  };

  const getConfidenceColor = (conf: number): string => {
    if (conf >= 80) return 'text-[var(--ps-success)]';
    if (conf >= 50) return 'text-[var(--ps-warning)]';
    return 'text-[var(--ps-error)]';
  };

  return (
    <Card
      variant="default"
      padding="none"
      className={cn(
        'overflow-hidden transition-all duration-300',
        statusStyles[status],
        status === 'pending' && 'hover:shadow-[0_4px_20px_rgba(255,89,0,0.1)]'
      )}
    >
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-10 h-10 rounded-lg bg-[rgba(255,89,0,0.1)] flex items-center justify-center shrink-0">
            <span className="text-xl">🤖</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
              {recommendation.title}
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              {recommendation.description}
            </p>
          </div>
        </div>

        {/* Confidence */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[var(--text-muted)]">Confidence</span>
            <span
              className={cn(
                'text-sm font-semibold',
                getConfidenceColor(recommendation.confidence)
              )}
            >
              {recommendation.confidence}%
            </span>
          </div>
          <ConfidenceBar
            confidence={recommendation.confidence}
            showPercentage={false}
          />
        </div>

        {/* Reasoning */}
        <div className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)] mb-4">
          <p className="text-xs font-medium text-[var(--text-muted)] mb-2">
            💭 Why this recommendation:
          </p>
          <p className="text-sm text-[var(--text-primary)] italic">
            &ldquo;{recommendation.reasoning}&rdquo;
          </p>
        </div>

        {/* Context */}
        {(recommendation.taskContext || recommendation.roleContext) && (
          <div className="flex gap-4 mb-4 text-xs text-[var(--text-muted)]">
            {recommendation.taskContext && (
              <span>📋 {recommendation.taskContext}</span>
            )}
            {recommendation.roleContext && (
              <span>👤 {recommendation.roleContext}</span>
            )}
          </div>
        )}

        {/* Actions */}
        {status === 'pending' ? (
          <div className="flex gap-3">
            <Button
              variant="primary"
              size="sm"
              className="flex-1"
              onClick={() => handleAction('accept')}
            >
              ✓ Accept
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="flex-1"
              onClick={() => handleAction('modify')}
            >
              ✏️ Modify
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleAction('dismiss')}
            >
              ✕
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span
              className={cn(
                'text-sm font-medium',
                status === 'accepted' && 'text-[var(--ps-success)]',
                status === 'modified' && 'text-[var(--ps-warning)]',
                status === 'dismissed' && 'text-[var(--text-muted)]'
              )}
            >
              {status === 'accepted' && '✓ Accepted'}
              {status === 'modified' && '✏️ Modified'}
              {status === 'dismissed' && '✕ Dismissed'}
            </span>
          </div>
        )}

        {/* Feedback */}
        {showFeedback && status !== 'dismissed' && (
          <div className="mt-4 pt-4 border-t border-[var(--border-primary)]">
            <p className="text-sm text-[var(--text-secondary)] mb-3">
              Was this recommendation helpful?
            </p>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onFeedback?.(true, recommendation);
                  setShowFeedback(false);
                }}
              >
                👍 Yes
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onFeedback?.(false, recommendation);
                  setShowFeedback(false);
                }}
              >
                👎 No
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
