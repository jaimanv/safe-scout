import { useState } from 'react';
import { Filter, Clock, Calendar, Info, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { crimeTypes, timeFilters, mockAreas } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface CrimeHeatmapProps {
  selectedArea?: string;
}

export function CrimeHeatmap({ selectedArea }: CrimeHeatmapProps) {
  const [crimeType, setCrimeType] = useState('All');
  const [timeFilter, setTimeFilter] = useState('All Day');
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  // Generate heatmap zones
  const zones = mockAreas.map((area, index) => ({
    id: area.id,
    name: area.name,
    intensity: 100 - area.safetyScore,
    riskLevel: area.riskLevel,
    x: 15 + (index % 4) * 22,
    y: 20 + Math.floor(index / 4) * 35,
    width: 18,
    height: 28,
  }));

  const getZoneColor = (intensity: number, riskLevel: string) => {
    if (riskLevel === 'high') return 'from-danger/60 to-danger/30';
    if (riskLevel === 'medium') return 'from-moderate/50 to-moderate/20';
    return 'from-safe/40 to-safe/15';
  };

  return (
    <div className="rounded-2xl glass border border-border overflow-hidden animate-slide-up">
      {/* Filters */}
      <div className="p-4 border-b border-border">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filters:</span>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Select value={crimeType} onValueChange={setCrimeType}>
              <SelectTrigger className="w-[160px] h-9 bg-background/50">
                <Layers className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Crime Type" />
              </SelectTrigger>
              <SelectContent>
                {crimeTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-[180px] h-9 bg-background/50">
                <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Time" />
              </SelectTrigger>
              <SelectContent>
                {timeFilters.map((filter) => (
                  <SelectItem key={filter} value={filter}>{filter}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" className="h-9">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </Button>
          </div>
        </div>
      </div>

      {/* Map Area */}
      <div className="relative h-[400px] sm:h-[500px] bg-gradient-to-br from-muted/30 to-muted/10 overflow-hidden">
        {/* Grid Lines */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full">
            {[...Array(10)].map((_, i) => (
              <line
                key={`h-${i}`}
                x1="0"
                y1={`${i * 10}%`}
                x2="100%"
                y2={`${i * 10}%`}
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-foreground"
              />
            ))}
            {[...Array(10)].map((_, i) => (
              <line
                key={`v-${i}`}
                x1={`${i * 10}%`}
                y1="0"
                x2={`${i * 10}%`}
                y2="100%"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-foreground"
              />
            ))}
          </svg>
        </div>

        {/* Heat Zones */}
        {zones.map((zone) => (
          <div
            key={zone.id}
            className={cn(
              'absolute rounded-xl cursor-pointer transition-all duration-300',
              'bg-gradient-to-br',
              getZoneColor(zone.intensity, zone.riskLevel),
              hoveredZone === zone.id && 'ring-2 ring-primary shadow-lg scale-105 z-10',
              selectedArea === zone.name && 'ring-2 ring-primary'
            )}
            style={{
              left: `${zone.x}%`,
              top: `${zone.y}%`,
              width: `${zone.width}%`,
              height: `${zone.height}%`,
            }}
            onMouseEnter={() => setHoveredZone(zone.id)}
            onMouseLeave={() => setHoveredZone(null)}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-medium text-foreground/80 text-center px-2">
                {zone.name}
              </span>
            </div>
          </div>
        ))}

        {/* Hover Tooltip */}
        {hoveredZone && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs glass rounded-xl p-4 shadow-lg animate-fade-in">
            {(() => {
              const zone = zones.find((z) => z.id === hoveredZone);
              const area = mockAreas.find((a) => a.id === hoveredZone);
              if (!zone || !area) return null;
              return (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{zone.name}</h4>
                    <span className={cn(
                      'text-xs font-medium px-2 py-0.5 rounded-full',
                      zone.riskLevel === 'high' ? 'bg-danger/20 text-danger' :
                      zone.riskLevel === 'medium' ? 'bg-moderate/20 text-moderate' :
                      'bg-safe/20 text-safe'
                    )}>
                      {zone.riskLevel === 'high' ? 'High Risk' : zone.riskLevel === 'medium' ? 'Moderate' : 'Safe'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Safety Score: <span className="text-foreground font-medium">{area.safetyScore}/100</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {zone.riskLevel === 'high' 
                      ? 'High risk due to repeated incidents on weekend nights'
                      : zone.riskLevel === 'medium'
                      ? 'Moderate activity, exercise caution after dark'
                      : 'Low crime rate, generally safe throughout the day'}
                  </p>
                </>
              );
            })()}
          </div>
        )}

        {/* Legend */}
        <div className="absolute top-4 right-4 glass rounded-xl p-3 shadow-md">
          <p className="text-xs font-medium text-muted-foreground mb-2">Risk Level</p>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <div className="w-4 h-3 rounded bg-gradient-to-r from-danger/60 to-danger/30" />
              <span className="text-xs text-foreground">High</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-3 rounded bg-gradient-to-r from-moderate/50 to-moderate/20" />
              <span className="text-xs text-foreground">Moderate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-3 rounded bg-gradient-to-r from-safe/40 to-safe/15" />
              <span className="text-xs text-foreground">Safe</span>
            </div>
          </div>
        </div>

        {/* Info Badge */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2 glass rounded-lg px-3 py-1.5">
          <Info className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs text-muted-foreground">Click zones for details</span>
        </div>
      </div>
    </div>
  );
}
