/**
 * @file CTA.tsx
 * @description Call to Action section for conversion
 * @static Pre-rendered at build time
 */

import Link from 'next/link';

export function CTA() {
  return (
    <section className="py-24 px-6 bg-[var(--bg-primary)]" id="cta">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main CTA */}
        <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
          Ready to Transform
          <br />
          <span className="text-[var(--ps-orange)]">How You Innovate?</span>
        </h2>
        
        <p className="text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
          Join organizations that are already using Ytry to experiment faster, 
          scale smarter, and make better decisions every day.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/onboarding"
            className="px-10 py-5 rounded-xl bg-[var(--ps-orange)] text-white font-bold text-lg hover:bg-[var(--ps-orange-hover)] hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-[rgba(255,89,0,0.25)]"
          >
            Start Free Trial →
          </Link>
          <Link
            href="/dashboard"
            className="px-10 py-5 rounded-xl border-2 border-[var(--border-secondary)] text-[var(--text-primary)] font-bold text-lg hover:border-[var(--ps-orange)] hover:text-[var(--ps-orange)] transition-all duration-200"
          >
            Explore Platform
          </Link>
        </div>

        {/* Trust Elements */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--text-muted)]">
          <span className="flex items-center gap-2">
            <span className="text-[var(--ps-success)]">✓</span>
            No credit card required
          </span>
          <span className="flex items-center gap-2">
            <span className="text-[var(--ps-success)]">✓</span>
            14-day free trial
          </span>
          <span className="flex items-center gap-2">
            <span className="text-[var(--ps-success)]">✓</span>
            Setup in under 30 minutes
          </span>
        </div>
      </div>
    </section>
  );
}
