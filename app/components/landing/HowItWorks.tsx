/**
 * @file HowItWorks.tsx
 * @description How It Works section explaining the Ytrylabs process
 * @static Pre-rendered at build time
 */

interface Step {
  number: string;
  title: string;
  description: string;
  icon: string;
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Connect Your Data',
    description: 'Integrate with your existing data sources in minutes. Databases, APIs, SaaS tools — we support them all.',
    icon: '🔗'
  },
  {
    number: '02',
    title: 'Get AI Insights',
    description: 'Our AI analyzes your data and surfaces actionable recommendations prioritized by impact and urgency.',
    icon: '🧠'
  },
  {
    number: '03',
    title: 'Run Experiments',
    description: 'Test hypotheses quickly with built-in experiment tools. Track results in real-time and learn fast.',
    icon: '🧪'
  },
  {
    number: '04',
    title: 'Scale What Works',
    description: 'When experiments succeed, scale them across your organization with one click. Measure real-world impact.',
    icon: '📈'
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-[var(--bg-primary)]" id="how-it-works">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-[rgba(255,89,0,0.1)] text-[var(--ps-orange)] text-sm font-medium mb-4">
            Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            From Data to Impact
            <br />
            <span className="text-[var(--ps-orange)]">In Four Steps</span>
          </h2>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            Try fast. Learn faster. Scale what works.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--border-primary)] to-transparent transform -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative group">
                {/* Card */}
                <div className="p-6 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-primary)] hover:border-[var(--ps-orange)] transition-all duration-300 hover:shadow-lg">
                  {/* Step Number */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl font-bold text-[var(--ps-orange)] opacity-30 group-hover:opacity-100 transition-opacity">
                      {step.number}
                    </span>
                    <span className="text-3xl">{step.icon}</span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--ps-orange)] transition-colors">
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow (hidden on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-[var(--ps-orange)] text-2xl z-10">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
