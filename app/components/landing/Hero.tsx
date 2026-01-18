/**
 * @file Hero.tsx
 * @description Hero section for the Ytrylabs landing page
 * @static Pre-rendered at build time
 */

import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--ps-orange)] opacity-5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--ps-coral)] opacity-5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(var(--ps-gray-300) 1px, transparent 1px), linear-gradient(90deg, var(--ps-gray-300) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(255,89,0,0.1)] border border-[var(--ps-orange)] mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[var(--ps-orange)] animate-pulse" />
          <span className="text-sm font-medium text-[var(--ps-orange)]">AI-Powered Innovation Platform</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-[var(--text-primary)] mb-6 leading-tight animate-slide-in-up">
          Stop Guessing.
          <br />
          <span className="text-[var(--ps-orange)]">Start Knowing.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-10 animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
          For leaders who don&apos;t want dashboards — they want <strong>direction</strong>. 
          <br className="hidden md:block" />
          Transform data into action with AI that empowers, not replaces.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          <Link
            href="/dashboard"
            className="px-8 py-4 rounded-lg bg-[var(--ps-orange)] text-white font-semibold text-lg hover:bg-[var(--ps-orange-hover)] hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-[rgba(255,89,0,0.25)]"
          >
            See It In Action →
          </Link>
          <Link
            href="/onboarding"
            className="px-8 py-4 rounded-lg border-2 border-[var(--border-secondary)] text-[var(--text-primary)] font-semibold text-lg hover:border-[var(--ps-orange)] hover:text-[var(--ps-orange)] transition-all duration-200"
          >
            Start Free Trial
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 pt-8 border-t border-[var(--border-primary)] animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p className="text-sm text-[var(--text-muted)] mb-6">Trusted by forward-thinking organizations</p>
          <div className="flex items-center justify-center gap-12 opacity-60">
            <span className="text-2xl font-bold text-[var(--text-secondary)]">TechCorp</span>
            <span className="text-2xl font-bold text-[var(--text-secondary)]">InnovateCo</span>
            <span className="text-2xl font-bold text-[var(--text-secondary)]">FutureScale</span>
            <span className="text-2xl font-bold text-[var(--text-secondary)]">DataFirst</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-[var(--border-secondary)] flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-[var(--ps-orange)]" />
        </div>
      </div>
    </section>
  );
}
