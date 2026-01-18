'use client';

/**
 * @file Header.tsx
 * @description Top header component with search, notifications, and user menu
 */

import { cn } from '@/app/lib/utils';
import { useState } from 'react';

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-30 h-16 bg-[var(--bg-surface)] border-b border-[var(--border-primary)]">
      <div className="flex h-full items-center justify-between px-6">
        {/* Left side - Page title */}
        <div className="flex items-center gap-4">
          {title && (
            <h1 className="text-xl font-semibold text-[var(--text-primary)]">
              {title}
            </h1>
          )}
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                'w-full pl-10 pr-4 py-2 rounded-lg',
                'bg-[var(--bg-secondary)] border border-[var(--border-primary)]',
                'text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
                'focus:outline-none focus:ring-2 focus:ring-[var(--ps-orange)] focus:border-transparent',
                'transition-all duration-200'
              )}
            />
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-[var(--bg-hover)] transition-colors">
            <span className="text-xl">🔔</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--ps-error)] rounded-full" />
          </button>

          {/* Settings */}
          <button className="p-2 rounded-lg hover:bg-[var(--bg-hover)] transition-colors">
            <span className="text-xl">⚙️</span>
          </button>

          {/* User Menu */}
          <button className="flex items-center gap-3 pl-4 border-l border-[var(--border-primary)]">
            <div className="text-right">
              <p className="text-sm font-medium text-[var(--text-primary)]">John Doe</p>
              <p className="text-xs text-[var(--text-muted)]">Business Leader</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[var(--ps-orange)] flex items-center justify-center text-white font-semibold">
              JD
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
