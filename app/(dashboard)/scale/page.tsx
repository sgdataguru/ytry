'use client';

/**
 * @file scale/page.tsx
 * @description Feature 04 - Scale Successful Initiatives
 * Shows scaling-ready initiatives with readiness scores and scaling wizard
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { Badge } from '@/app/components/ui/Badge';
import { Progress, CircularProgress } from '@/app/components/ui/Progress';
import { InitiativeCard } from '@/app/components/features/InitiativeCard';
import { ScalingScorecard } from '@/app/components/features/ScalingScorecard';
import { mockInitiatives } from '@/app/lib/mock-data';
import { cn } from '@/app/lib/utils';
import type { Initiative } from '@/app/types';

export default function ScalePage() {
  const [initiatives] = useState<Initiative[]>(mockInitiatives);
  const [selectedInitiative, setSelectedInitiative] = useState<Initiative | null>(null);
  const [filterPhase, setFilterPhase] = useState<string>('all');

  const filteredInitiatives =
    filterPhase === 'all'
      ? initiatives
      : initiatives.filter((i) => i.currentPhase === filterPhase);

  const scaleReadyCount = initiatives.filter(
    (i) => i.scalingReadiness.overall >= 80 && i.currentPhase !== 'scaled'
  ).length;
  const scaledCount = initiatives.filter((i) => i.currentPhase === 'scaled').length;
  const avgReadiness =
    initiatives.length > 0
      ? initiatives.reduce((acc, i) => acc + i.scalingReadiness.overall, 0) /
        initiatives.length
      : 0;

  const handleScale = (initiative: Initiative) => {
    setSelectedInitiative(initiative);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            🚀 Scale Initiatives
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Identify and scale high-performing initiatives with confidence
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-6">
        <Card variant="default" padding="md">
          <CardContent className="p-0">
            <p className="text-sm text-[var(--text-muted)] mb-1">Scale Ready</p>
            <p className="text-3xl font-bold text-[var(--ps-success)]">{scaleReadyCount}</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Initiatives ready to scale
            </p>
          </CardContent>
        </Card>

        <Card variant="default" padding="md">
          <CardContent className="p-0">
            <p className="text-sm text-[var(--text-muted)] mb-1">Successfully Scaled</p>
            <p className="text-3xl font-bold text-[var(--ps-info)]">{scaledCount}</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">This quarter</p>
          </CardContent>
        </Card>

        <Card variant="default" padding="md">
          <CardContent className="p-0">
            <p className="text-sm text-[var(--text-muted)] mb-1">Avg Readiness</p>
            <p className="text-3xl font-bold text-[var(--text-primary)]">
              {avgReadiness.toFixed(0)}%
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">Across all initiatives</p>
          </CardContent>
        </Card>

        <Card variant="default" padding="md">
          <CardContent className="p-0">
            <p className="text-sm text-[var(--text-muted)] mb-1">Scaling Success Rate</p>
            <p className="text-3xl font-bold text-[var(--ps-success)]">87%</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">Historical average</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left: Initiatives List */}
        <div className="col-span-2 space-y-6">
          {/* Filter Tabs */}
          <div className="flex items-center gap-2 border-b border-[var(--border-primary)] pb-4">
            {[
              { key: 'all', label: 'All Phases' },
              { key: 'pilot', label: 'Pilot' },
              { key: 'validation', label: 'Validation' },
              { key: 'scaling', label: 'Scaling' },
              { key: 'scaled', label: 'Scaled' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilterPhase(tab.key)}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-all',
                  filterPhase === tab.key
                    ? 'bg-[var(--ps-orange)] text-white'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Initiatives Grid */}
          <div className="space-y-4">
            {filteredInitiatives.map((initiative) => (
              <InitiativeCard
                key={initiative.id}
                initiative={initiative}
                onViewDetails={setSelectedInitiative}
                onScale={handleScale}
              />
            ))}
          </div>

          {filteredInitiatives.length === 0 && (
            <div className="text-center py-16">
              <span className="text-6xl mb-4 block">🚀</span>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                No initiatives in this phase
              </h3>
              <p className="text-[var(--text-muted)]">
                Initiatives will appear here as they progress through phases
              </p>
            </div>
          )}
        </div>

        {/* Right: Scorecard Panel */}
        <div className="space-y-6">
          {selectedInitiative ? (
            <>
              <div className="p-4 rounded-lg bg-[var(--ps-orange)] text-white">
                <h3 className="font-semibold mb-1">Selected Initiative</h3>
                <p className="text-sm opacity-90">{selectedInitiative.name}</p>
              </div>

              <ScalingScorecard
                readiness={selectedInitiative.scalingReadiness}
                onImprove={(dimension) =>
                  console.log('Improve:', dimension)
                }
              />

              {selectedInitiative.scalingReadiness.overall >= 80 && (
                <Card variant="elevated" padding="md">
                  <CardContent className="p-0">
                    <h4 className="font-semibold text-[var(--text-primary)] mb-4">
                      🎯 Recommended Scale Plan
                    </h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-3">
                        <span className="text-[var(--ps-success)]">✓</span>
                        <span className="text-[var(--text-secondary)]">
                          Expand to 3 additional regions
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[var(--ps-success)]">✓</span>
                        <span className="text-[var(--text-secondary)]">
                          Increase team capacity by 2 FTEs
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[var(--ps-success)]">✓</span>
                        <span className="text-[var(--text-secondary)]">
                          Allocate $250K additional budget
                        </span>
                      </li>
                    </ul>
                    <Button variant="primary" className="w-full mt-6">
                      🚀 Start Scaling Process
                    </Button>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card variant="default" padding="md">
              <CardContent className="p-0 text-center py-8">
                <span className="text-4xl mb-4 block">📊</span>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">
                  Select an Initiative
                </h3>
                <p className="text-sm text-[var(--text-muted)]">
                  Click on an initiative to view its scaling readiness scorecard
                </p>
              </CardContent>
            </Card>
          )}

          {/* Scaling Checklist */}
          <Card variant="default" padding="md">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-sm">Scaling Best Practices</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3 text-[var(--text-secondary)]">
                  <span className="text-[var(--ps-info)]">💡</span>
                  Ensure 80%+ readiness score before scaling
                </li>
                <li className="flex items-start gap-3 text-[var(--text-secondary)]">
                  <span className="text-[var(--ps-info)]">💡</span>
                  Document learnings from pilot phase
                </li>
                <li className="flex items-start gap-3 text-[var(--text-secondary)]">
                  <span className="text-[var(--ps-info)]">💡</span>
                  Secure stakeholder buy-in early
                </li>
                <li className="flex items-start gap-3 text-[var(--text-secondary)]">
                  <span className="text-[var(--ps-info)]">💡</span>
                  Plan for gradual rollout, not big bang
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
