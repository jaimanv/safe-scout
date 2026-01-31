import { cn } from '@/lib/utils';

interface SafetyBadgeProps {
  level: 'low' | 'medium' | 'high';
  size?: 'sm' | 'md' | 'lg';
}

export function SafetyBadge({ level, size = 'md' }: SafetyBadgeProps) {
  const config = {
    low: {
      label: 'Safe',
      bgClass: 'bg-safe/10',
      textClass: 'text-safe',
      dotClass: 'bg-safe',
    },
    medium: {
      label: 'Moderate',
      bgClass: 'bg-moderate/10',
      textClass: 'text-moderate',
      dotClass: 'bg-moderate',
    },
    high: {
      label: 'High Risk',
      bgClass: 'bg-danger/10',
      textClass: 'text-danger',
      dotClass: 'bg-danger',
    },
  };

  const { label, bgClass, textClass, dotClass } = config[level];

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        bgClass,
        textClass,
        sizeClasses[size]
      )}
    >
      <span className={cn('w-2 h-2 rounded-full animate-pulse-slow', dotClass)} />
      {label}
    </span>
  );
}
