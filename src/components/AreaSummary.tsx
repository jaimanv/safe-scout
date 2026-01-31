import { MapPin, Shield, AlertTriangle, Clock, Building2, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { SafetyBadge } from './SafetyBadge';
import { SafetyScore } from './SafetyScore';
import { Area } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface AreaSummaryProps {
  area: Area;
}

export function AreaSummary({ area }: AreaSummaryProps) {
  const TrendIcon = {
    up: TrendingUp,
    down: TrendingDown,
    stable: Minus,
  }[area.trendDirection];

  const trendColor = {
    up: 'text-danger',
    down: 'text-safe',
    stable: 'text-muted-foreground',
  }[area.trendDirection];

  const trendLabel = {
    up: 'Rising',
    down: 'Declining',
    stable: 'Stable',
  }[area.trendDirection];

  return (
    <div className="glass rounded-2xl p-6 border border-border animate-slide-up">
      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        {/* Left - Area Info */}
        <div className="flex items-center gap-4 flex-1">
          <SafetyScore score={area.safetyScore} size="md" />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">{area.name}</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{area.city}</p>
            <SafetyBadge level={area.riskLevel} />
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px h-20 bg-border" />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6">
          {/* Risk Level */}
          <div className="flex items-center gap-3">
            <div className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center',
              area.riskLevel === 'low' ? 'bg-safe/10' : area.riskLevel === 'medium' ? 'bg-moderate/10' : 'bg-danger/10'
            )}>
              <AlertTriangle className={cn(
                'w-5 h-5',
                area.riskLevel === 'low' ? 'text-safe' : area.riskLevel === 'medium' ? 'text-moderate' : 'text-danger'
              )} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Risk Level</p>
              <p className="text-sm font-medium text-foreground capitalize">{area.riskLevel}</p>
            </div>
          </div>

          {/* Safest Time */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Safest Time</p>
              <p className="text-sm font-medium text-foreground">{area.safestTime}</p>
            </div>
          </div>

          {/* Nearest Police */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Police Station</p>
              <p className="text-sm font-medium text-foreground">{area.nearestPoliceStation.distance}</p>
            </div>
          </div>

          {/* Crime Trend */}
          <div className="flex items-center gap-3">
            <div className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center',
              area.trendDirection === 'down' ? 'bg-safe/10' : area.trendDirection === 'up' ? 'bg-danger/10' : 'bg-muted'
            )}>
              <TrendIcon className={cn('w-5 h-5', trendColor)} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Crime Trend</p>
              <p className={cn('text-sm font-medium', trendColor)}>{trendLabel}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Last Updated */}
      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Last updated: <span className="text-foreground">{area.lastUpdated}</span>
        </p>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-safe animate-pulse" />
          <span className="text-xs text-muted-foreground">Live data</span>
        </div>
      </div>
    </div>
  );
}
