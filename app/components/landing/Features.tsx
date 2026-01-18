/**
 * @file Features.tsx
 * @description Features section showcasing Ytrylabs capabilities
 * @static Pre-rendered at build time
 */

interface Feature {
  icon: string;
  title: string;
  description: string;
  highlight?: string;
}

const features: Feature[] = [
  {
    icon: '📊',
    title: 'Actionable Insights',
    description: 'Get prioritized recommendations, not just data visualizations. Each insight includes clear actions with expected impact.',
    highlight: 'Direction, not dashboards'
  },
  {
    icon: '🤖',
    title: 'AI-Powered Recommendations',
    description: 'AI suggestions that augment your decisions, not replace them. Accept, modify, or dismiss with full transparency.',
    highlight: 'AI that empowers humans'
  },
  {
    icon: '🧪',
    title: 'Rapid Experiments',
    description: 'Launch experiments in minutes, not days. Real-time results tracking with automatic statistical significance detection.',
    highlight: 'Try fast, learn faster'
  },
  {
    icon: '🚀',
    title: 'Scale What Works',
    description: 'One-click scaling for validated initiatives. Track rollout progress with built-in rollback capabilities.',
    highlight: 'Amplify winning strategies'
  },
  {
    icon: '💼',
    title: 'Pipeline Acceleration',
    description: 'AI-generated win probability scores and next best actions for every deal. Prioritize high-potential opportunities.',
    highlight: 'Revenue-focused insights'
  },
  {
    icon: '⚡',
    title: 'Faster Decisions',
    description: 'Complex data synthesized into concise decision briefs. Clear options with pros, cons, and supporting evidence.',
    highlight: 'Reduce analysis paralysis'
  },
];

export function Features() {
  return (
    <section className="py-24 px-6 bg-[var(--bg-secondary)]" id="features">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-[rgba(255,89,0,0.1)] text-[var(--ps-orange)] text-sm font-medium mb-4">
            Capabilities
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Everything You Need to
            <br />
            <span className="text-[var(--ps-orange)]">Innovate at Speed</span>
          </h2>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            A complete platform for organizations that refuse to stand still.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-primary)] hover:border-[var(--ps-orange)] hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-[rgba(255,89,0,0.1)] flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              
              {/* Highlight Tag */}
              {feature.highlight && (
                <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-[rgba(255,89,0,0.05)] text-[var(--ps-orange)] mb-3">
                  {feature.highlight}
                </span>
              )}
              
              {/* Title */}
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--ps-orange)] transition-colors">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
