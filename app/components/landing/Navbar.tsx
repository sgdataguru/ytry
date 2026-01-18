/**
 * @file Navbar.tsx
 * @description Navigation bar for the landing page
 * @static Pre-rendered at build time
 */

'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const navLinks = [
  { name: 'Features', href: '#features' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Philosophy', href: '#philosophy' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[var(--bg-surface)]/95 backdrop-blur-md border-b border-[var(--border-primary)] shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span className="text-xl font-bold text-[var(--ps-orange)]">Ytry</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[var(--text-secondary)] hover:text-[var(--ps-orange)] transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/onboarding"
              className="px-5 py-2 rounded-lg bg-[var(--ps-orange)] text-white font-semibold hover:bg-[var(--ps-orange-hover)] transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[var(--text-primary)]"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[var(--border-primary)]">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[var(--text-secondary)] hover:text-[var(--ps-orange)] transition-colors font-medium py-2"
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-[var(--border-primary)]" />
              <Link
                href="/dashboard"
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors font-medium py-2"
              >
                Sign In
              </Link>
              <Link
                href="/onboarding"
                className="px-5 py-3 rounded-lg bg-[var(--ps-orange)] text-white font-semibold text-center hover:bg-[var(--ps-orange-hover)] transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
