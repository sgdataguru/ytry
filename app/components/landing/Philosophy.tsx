/**
 * @file Philosophy.tsx
 * @description Philosophy section explaining Ytrylabs core beliefs
 * @static Pre-rendered at build time
 */

interface Principle {
  title: string;
  description: string;
}

const principles: Principle[] = [
  {
    title: 'Data gives us clarity',
    description: 'Transform raw information into actionable understanding. See what matters, ignore the noise.'
  },
  {
    title: 'AI gives us an edge',
    description: 'Augment human intelligence, don\'t replace it. AI as your strategic advantage, not your replacement.'
  },
  {
    title: 'Cloud gives us speed',
    description: 'Move fast with elastic infrastructure. Launch, iterate, and scale in real-time.'
  },
];

export function Philosophy() {
  return (
    <section className="py-24 px-6 bg-[var(--ps-charcoal)] text-white" id="philosophy">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-[rgba(255,89,0,0.2)] text-[var(--ps-orange)] text-sm font-medium mb-4">
            Our Philosophy
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Built for Organizations That
            <br />
            <span className="text-[var(--ps-orange)]">Refuse to Stand Still</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Innovation isn&apos;t just about technology — it&apos;s about asking better questions 
            and having the courage to act on the answers.
          </p>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {principles.map((principle) => (
            <div
              key={principle.title}
              className="p-8 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] hover:border-[var(--ps-orange)] transition-all duration-300 group"
            >
              <h3 className="text-2xl font-bold text-[var(--ps-orange)] mb-4">
                {principle.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                {principle.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="text-center p-12 rounded-2xl bg-[rgba(255,89,0,0.05)] border border-[rgba(255,89,0,0.2)]">
          <blockquote className="text-2xl md:text-3xl font-light text-white italic mb-4">
            &ldquo;Why not — and how fast can we make it real?&rdquo;
          </blockquote>
          <p className="text-gray-400">
            The question that drives everything we build.
          </p>
        </div>
      </div>
    </section>
  );
}
