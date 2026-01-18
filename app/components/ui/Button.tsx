/**
 * @file Button.tsx
 * @description Button component with Publicis Sapient enterprise styling
 */

import { cn } from '@/app/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center gap-2
      font-semibold rounded-lg
      transition-all duration-200 ease-in-out
      focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ps-orange)] focus-visible:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    const variants = {
      primary: `
        bg-[var(--ps-orange)] text-white
        hover:bg-[var(--ps-orange-hover)] hover:-translate-y-0.5
        hover:shadow-[0_4px_12px_rgba(255,89,0,0.25)]
        active:translate-y-0
      `,
      secondary: `
        bg-transparent text-[var(--ps-orange)]
        border-2 border-[var(--ps-orange)]
        hover:bg-[rgba(255,89,0,0.05)]
      `,
      ghost: `
        bg-transparent text-[var(--text-secondary)]
        hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]
      `,
      danger: `
        bg-[var(--ps-error)] text-white
        hover:bg-[#c62828] hover:-translate-y-0.5
        hover:shadow-[0_4px_12px_rgba(229,57,53,0.25)]
        active:translate-y-0
      `,
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-5 py-2.5 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
