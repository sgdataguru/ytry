/**
 * @file Progress.tsx
 * @description Progress bar component with Publicis Sapient enterprise styling
 */

import { cn } from '@/app/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value,
      max = 100,
      variant = 'default',
      size = 'md',
      showLabel = false,
      animated = false,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const sizes = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
    };

    const variants = {
      default: 'bg-[var(--ps-orange)]',
      success: 'bg-[var(--ps-success)]',
      warning: 'bg-[var(--ps-warning)]',
      error: 'bg-[var(--ps-error)]',
      info: 'bg-[var(--ps-info)]',
    };

    return (
      <div className={cn('w-full', className)} ref={ref} {...props}>
        {showLabel && (
          <div className="flex justify-between mb-1 text-sm">
            <span className="text-[var(--text-secondary)]">Progress</span>
            <span className="font-medium text-[var(--text-primary)]">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
        <div
          className={cn(
            'w-full rounded-full bg-[var(--ps-gray-100)] overflow-hidden',
            sizes[size]
          )}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500 ease-out',
              variants[variant],
              animated && 'animate-pulse'
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = 'Progress';

// Confidence Bar - specific for AI confidence display
export interface ConfidenceBarProps extends HTMLAttributes<HTMLDivElement> {
  confidence: number;
  showPercentage?: boolean;
}

const ConfidenceBar = forwardRef<HTMLDivElement, ConfidenceBarProps>(
  ({ className, confidence, showPercentage = true, ...props }, ref) => {
    const getConfidenceColor = (conf: number): string => {
      if (conf >= 80) return 'bg-[var(--ps-success)]';
      if (conf >= 50) return 'bg-[var(--ps-warning)]';
      return 'bg-[var(--ps-error)]';
    };

    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-3', className)}
        {...props}
      >
        <div className="flex-1 h-2 rounded-full bg-[var(--ps-gray-100)] overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500',
              getConfidenceColor(confidence)
            )}
            style={{ width: `${confidence}%` }}
          />
        </div>
        {showPercentage && (
          <span className="text-sm font-medium text-[var(--text-primary)] min-w-[3rem] text-right">
            {confidence}%
          </span>
        )}
      </div>
    );
  }
);

ConfidenceBar.displayName = 'ConfidenceBar';

// Circular Progress
export interface CircularProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  strokeWidth?: number;
  showValue?: boolean;
}

const CircularProgress = forwardRef<HTMLDivElement, CircularProgressProps>(
  (
    {
      className,
      value,
      max = 100,
      size = 'md',
      strokeWidth = 4,
      showValue = true,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    
    const sizes = {
      sm: 40,
      md: 64,
      lg: 96,
    };

    const sizeValue = sizes[size];
    const radius = (sizeValue - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div
        ref={ref}
        className={cn('relative inline-flex items-center justify-center', className)}
        {...props}
      >
        <svg
          width={sizeValue}
          height={sizeValue}
          className="-rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={sizeValue / 2}
            cy={sizeValue / 2}
            r={radius}
            fill="none"
            stroke="var(--ps-gray-100)"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={sizeValue / 2}
            cy={sizeValue / 2}
            r={radius}
            fill="none"
            stroke="var(--ps-orange)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500 ease-out"
          />
        </svg>
        {showValue && (
          <span className="absolute text-sm font-semibold text-[var(--text-primary)]">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    );
  }
);

CircularProgress.displayName = 'CircularProgress';

export { Progress, ConfidenceBar, CircularProgress };
