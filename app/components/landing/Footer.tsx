/**
 * @file Footer.tsx
 * @description Footer section for the landing page
 * @static Pre-rendered at build time
 */

import Link from 'next/link';

const footerLinks = {
  product: [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Experiments', href: '/experiments' },
    { name: 'Pipeline', href: '/pipeline' },
    { name: 'Operations', href: '/operations' },
  ],
  resources: [
    { name: 'Documentation', href: '#' },
    { name: 'API Reference', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Case Studies', href: '#' },
  ],
  company: [
    { name: 'About', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Press', href: '#' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Security', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="py-16 px-6 bg-[var(--ps-charcoal)] text-white">
      <div className="max-w-6xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">⚡</span>
              <span className="text-xl font-bold text-[var(--ps-orange)]">Ytry</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              AI-powered innovation for organizations that refuse to stand still.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-[var(--ps-orange)] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-[var(--ps-orange)] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-[var(--ps-orange)] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-[var(--ps-orange)] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-[rgba(255,255,255,0.1)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Ytry Labs. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-[var(--ps-orange)] transition-colors">
              Twitter
            </a>
            <a href="#" className="text-gray-400 hover:text-[var(--ps-orange)] transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-gray-400 hover:text-[var(--ps-orange)] transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
