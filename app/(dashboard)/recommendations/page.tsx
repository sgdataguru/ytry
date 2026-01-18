'use client';

/**
 * @file page.tsx
 * @description AI-Powered Recommendations - Feature 02
 */

import { RecommendationCard } from '@/app/components/features/RecommendationCard';
import { Button } from '@/app/components/ui/Button';
import { mockRecommendations } from '@/app/lib/mock-data';
import type { Recommendation } from '@/app/types';

export default function RecommendationsPage() {
  const handleAction = (
    action: 'accept' | 'modify' | 'dismiss',
    recommendation: Recommendation
  ) => {
    console.log(`Action: ${action}`, recommendation);
  };

  const handleFeedback = (helpful: boolean, recommendation: Recommendation) => {
    console.log(`Feedback: ${helpful ? 'helpful' : 'not helpful'}`, recommendation);
  };

  return (
    <div className="space-y-6">
      {/* Context Bar */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-primary)]">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-[var(--text-muted)]">Task:</span>
            <span className="px-3 py-1 rounded-lg bg-[var(--bg-secondary)] text-sm font-medium text-[var(--text-primary)]">
              Weekly Pipeline Review
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[var(--text-muted)]">Role:</span>
            <span className="px-3 py-1 rounded-lg bg-[var(--bg-secondary)] text-sm font-medium text-[var(--text-primary)]">
              Sales Manager
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--ps-success)] animate-pulse" />
            <span className="text-sm text-[var(--text-muted)]">Context: Active</span>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          ⚙️ Settings
        </Button>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-3">
            <span className="text-3xl">🤖</span>
            AI Recommendations
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Intelligent suggestions to augment your decision-making
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[var(--text-muted)]">
            {mockRecommendations.length} recommendations
          </span>
        </div>
      </div>

      {/* Info Banner */}
      <div className="p-4 rounded-xl bg-[rgba(255,89,0,0.05)] border border-[var(--ps-orange)]">
        <div className="flex items-start gap-3">
          <span className="text-xl">💡</span>
          <div>
            <p className="text-sm font-medium text-[var(--text-primary)]">
              These are AI-generated suggestions based on your data and context
            </p>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              You maintain full control over all decisions. Accept, modify, or dismiss any recommendation.
            </p>
          </div>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {mockRecommendations.map((recommendation) => (
          <RecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
            onAction={handleAction}
            onFeedback={handleFeedback}
          />
        ))}
      </div>

      {/* Empty State (when no recommendations) */}
      {mockRecommendations.length === 0 && (
        <div className="text-center py-16">
          <span className="text-6xl mb-4 block">🤖</span>
          <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
            No recommendations right now
          </h3>
          <p className="text-[var(--text-secondary)]">
            AI is analyzing your data. New recommendations will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
