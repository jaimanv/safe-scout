import { Building2, Phone, Navigation, ExternalLink, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Area } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface PoliceStationFinderProps {
  area: Area;
  className?: string;
}

export function PoliceStationFinder({ area, className }: PoliceStationFinderProps) {
  const { nearestPoliceStation } = area;

  return (
    <div className={cn('glass rounded-2xl p-6 border border-border', className)}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Building2 className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Nearest Police Station</h3>
          <p className="text-sm text-muted-foreground">{nearestPoliceStation.distance} away</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-foreground">{nearestPoliceStation.name}</span>
        </div>
        
        <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
          <Phone className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-foreground">{nearestPoliceStation.contact}</span>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <Button className="flex-1 gradient-primary" size="sm">
          <Navigation className="w-4 h-4 mr-2" />
          Get Directions
        </Button>
        <Button variant="outline" size="sm">
          <Phone className="w-4 h-4" />
        </Button>
      </div>

      {/* Emergency Button */}
      <div className="mt-4 pt-4 border-t border-border">
        <Button 
          variant="destructive" 
          className="w-full bg-danger hover:bg-danger/90"
          size="lg"
        >
          🚨 Emergency: Call 100
        </Button>
      </div>
    </div>
  );
}
