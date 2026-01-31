import { cn } from '@/lib/utils';

interface SafetyScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function SafetyScore({ score, size = 'md', showLabel = true }: SafetyScoreProps) {
  const getColor = () => {
    if (score >= 70) return 'safe';
    if (score >= 50) return 'moderate';
    return 'danger';
  };

  const color = getColor();
  const circumference = 2 * Math.PI * 45;
  const progress = ((100 - score) / 100) * circumference;

  const sizeConfig = {
    sm: { wrapper: 'w-16 h-16', text: 'text-lg', label: 'text-xs' },
    md: { wrapper: 'w-24 h-24', text: 'text-2xl', label: 'text-sm' },
    lg: { wrapper: 'w-32 h-32', text: 'text-3xl', label: 'text-base' },
  };

  const colorClasses = {
    safe: 'stroke-safe',
    moderate: 'stroke-moderate',
    danger: 'stroke-danger',
  };

  return (
    <div className={cn('relative flex items-center justify-center', sizeConfig[size].wrapper)}>
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r="45%"
          fill="none"
          stroke="currentColor"
          className="text-muted/30"
          strokeWidth="8"
        />
        <circle
          cx="50%"
          cy="50%"
          r="45%"
          fill="none"
          className={cn('transition-all duration-1000 ease-out', colorClasses[color])}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn('font-bold text-foreground', sizeConfig[size].text)}>{score}</span>
        {showLabel && (
          <span className={cn('text-muted-foreground', sizeConfig[size].label)}>Score</span>
        )}
      </div>
    </div>
  );
}
