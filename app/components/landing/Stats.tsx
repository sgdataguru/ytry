/**
 * @file Stats.tsx
 * @description Statistics section showing key metrics
 * @static Pre-rendered at build time
 */

interface Stat {
  value: string;
  label: string;
  description: string;
}

const stats: Stat[] = [
  {
    value: '10x',
    label: 'Faster Decisions',
    description: 'Reduce time from insight to action'
  },
  {
    value: '80%',
    label: 'Experiment Success',
    description: 'Insights that lead to positive outcomes'
  },
  {
    value: '3x',
    label: 'Pipeline Velocity',
    description: 'Accelerate sales with AI predictions'
  },
  {
    value: '24/7',
    label: 'Real-time Monitoring',
    description: 'Continuous operational oversight'
  },
];

export function Stats() {
  return (
    <section className="py-20 px-6 bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center group">
              <div className="text-5xl md:text-6xl font-bold text-[var(--ps-orange)] mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-[var(--text-muted)]">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
