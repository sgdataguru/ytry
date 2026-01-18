/**
 * @file Card.tsx
 * @description Card component with Publicis Sapient enterprise styling
 */

import { cn } from '@/app/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered' | 'featured';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      padding = 'md',
      interactive = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      rounded-xl
      bg-[var(--bg-surface)]
      transition-all duration-200
    `;

    const variants = {
      default: `
        border border-[var(--border-primary)]
        shadow-[var(--shadow-sm)]
      `,
      elevated: `
        border border-[var(--border-primary)]
        shadow-[var(--shadow-md)]
      `,
      bordered: `
        border-2 border-[var(--border-primary)]
      `,
      featured: `
        border border-[var(--border-primary)]
        border-l-4 border-l-[var(--ps-orange)]
        shadow-[var(--shadow-sm)]
      `,
    };

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const interactiveStyles = interactive
      ? `
        cursor-pointer
        hover:shadow-[var(--shadow-lg)]
        hover:-translate-y-0.5
        active:translate-y-0
      `
      : '';

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          paddings[padding],
          interactiveStyles,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Card Header
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col gap-1.5 pb-4', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

// Card Title
export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'text-lg font-semibold text-[var(--text-primary)]',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
);

CardTitle.displayName = 'CardTitle';

// Card Description
export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-[var(--text-secondary)]', className)}
      {...props}
    >
      {children}
    </p>
  )
);

CardDescription.displayName = 'CardDescription';

// Card Content
export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props}>
      {children}
    </div>
  )
);

CardContent.displayName = 'CardContent';

// Card Footer
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center gap-3 pt-4 mt-4 border-t border-[var(--border-primary)]', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
