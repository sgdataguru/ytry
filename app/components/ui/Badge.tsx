/**
 * @file Badge.tsx
 * @description Badge component with Publicis Sapient enterprise styling
 */

import { cn } from '@/app/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?:
    | 'default'
    | 'primary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center
      font-medium rounded-full
      whitespace-nowrap
    `;

    const variants = {
      default: `
        bg-[var(--ps-gray-100)] text-[var(--ps-gray-700)]
      `,
      primary: `
        bg-[rgba(255,89,0,0.1)] text-[var(--ps-orange)]
      `,
      success: `
        bg-[rgba(0,168,120,0.1)] text-[var(--ps-success)]
      `,
      warning: `
        bg-[rgba(255,184,0,0.1)] text-[#B38600]
      `,
      error: `
        bg-[rgba(229,57,53,0.1)] text-[var(--ps-error)]
      `,
      info: `
        bg-[rgba(33,150,243,0.1)] text-[var(--ps-info)]
      `,
      outline: `
        bg-transparent border border-[var(--border-primary)] text-[var(--text-secondary)]
      `,
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3 py-1.5 text-base',
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

// Status Badge with dot indicator
export interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: 'active' | 'pending' | 'completed' | 'failed' | 'paused';
}

const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ className, status, children, ...props }, ref) => {
    const statusColors = {
      active: 'bg-[var(--ps-success)]',
      pending: 'bg-[var(--ps-warning)]',
      completed: 'bg-[var(--ps-info)]',
      failed: 'bg-[var(--ps-error)]',
      paused: 'bg-[var(--ps-gray-500)]',
    };

    const statusLabels = {
      active: 'Active',
      pending: 'Pending',
      completed: 'Completed',
      failed: 'Failed',
      paused: 'Paused',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium',
          'bg-[var(--bg-secondary)] text-[var(--text-secondary)]',
          className
        )}
        {...props}
      >
        <span
          className={cn('w-2 h-2 rounded-full', statusColors[status])}
          aria-hidden="true"
        />
        {children || statusLabels[status]}
      </span>
    );
  }
);

StatusBadge.displayName = 'StatusBadge';

// Priority Badge
export interface PriorityBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  priority: 'critical' | 'high' | 'medium' | 'low';
}

const PriorityBadge = forwardRef<HTMLSpanElement, PriorityBadgeProps>(
  ({ className, priority, ...props }, ref) => {
    const priorityConfig = {
      critical: { color: 'bg-[var(--ps-error)]', label: 'Critical', icon: '🔴' },
      high: { color: 'bg-[var(--ps-warning)]', label: 'High', icon: '🟡' },
      medium: { color: 'bg-[var(--ps-info)]', label: 'Medium', icon: '🔵' },
      low: { color: 'bg-[var(--ps-gray-500)]', label: 'Low', icon: '⚪' },
    };

    const config = priorityConfig[priority];

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium',
          'bg-[var(--bg-secondary)] text-[var(--text-primary)]',
          className
        )}
        {...props}
      >
        <span aria-hidden="true">{config.icon}</span>
        {config.label}
      </span>
    );
  }
);

PriorityBadge.displayName = 'PriorityBadge';

export { Badge, StatusBadge, PriorityBadge };
