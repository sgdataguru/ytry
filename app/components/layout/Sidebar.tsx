'use client';

/**
 * @file Sidebar.tsx
 * @description Main sidebar navigation component
 */

import { cn } from '@/app/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  name: string;
  href: string;
  icon: string;
  badge?: string;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊' },
  { name: 'Recommendations', href: '/recommendations', icon: '🤖' },
  { name: 'Experiments', href: '/experiments', icon: '🧪' },
  { name: 'Scale', href: '/scale', icon: '🚀' },
  { name: 'Pipeline', href: '/pipeline', icon: '💼' },
  { name: 'Decisions', href: '/decisions', icon: '⚡', badge: '2' },
  { name: 'Operations', href: '/operations', icon: '⚙️' },
  { name: 'Impact', href: '/impact', icon: '📈' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-[var(--bg-surface)] border-r border-[var(--border-primary)]">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 px-6 border-b border-[var(--border-primary)]">
        <span className="text-2xl">⚡</span>
        <span className="text-xl font-bold text-[var(--ps-orange)]">Ytry</span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-[rgba(255,89,0,0.1)] text-[var(--ps-orange)]'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'
              )}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="flex-1">{item.name}</span>
              {item.badge && (
                <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold bg-[var(--ps-orange)] text-white rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* AI Assistant Trigger */}
      <div className="absolute bottom-4 left-4 right-4">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[var(--ps-orange)] text-white font-medium hover:bg-[var(--ps-orange-hover)] transition-colors">
          <span className="text-lg">🤖</span>
          <span>AI Assistant</span>
        </button>
      </div>
    </aside>
  );
}
