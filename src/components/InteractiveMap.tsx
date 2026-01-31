import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle, Popup, useMap } from 'react-leaflet';
import { Filter, Clock, Layers, Info, Navigation } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { crimeTypes, timeFilters, mockAreas } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import 'leaflet/dist/leaflet.css';

interface InteractiveMapProps {
  selectedArea?: string;
  className?: string;
}

// Bangalore coordinates
const BANGALORE_CENTER: [number, number] = [12.9716, 77.5946];

// Mock crime hotspots with coordinates
const crimeHotspots = [
  { id: '1', name: 'Indiranagar', lat: 12.9784, lng: 77.6408, intensity: 18, riskLevel: 'low' as const },
  { id: '2', name: 'Koramangala', lat: 12.9352, lng: 77.6245, intensity: 25, riskLevel: 'low' as const },
  { id: '3', name: 'MG Road', lat: 12.9756, lng: 77.6066, intensity: 32, riskLevel: 'medium' as const },
  { id: '4', name: 'Whitefield', lat: 12.9698, lng: 77.7499, intensity: 12, riskLevel: 'low' as const },
  { id: '5', name: 'Electronic City', lat: 12.8399, lng: 77.6770, intensity: 55, riskLevel: 'high' as const },
  { id: '6', name: 'Jayanagar', lat: 12.9299, lng: 77.5826, intensity: 9, riskLevel: 'low' as const },
  { id: '7', name: 'HSR Layout', lat: 12.9116, lng: 77.6389, intensity: 28, riskLevel: 'medium' as const },
  { id: '8', name: 'Marathahalli', lat: 12.9591, lng: 77.7011, intensity: 48, riskLevel: 'high' as const },
  { id: '9', name: 'BTM Layout', lat: 12.9166, lng: 77.6101, intensity: 35, riskLevel: 'medium' as const },
  { id: '10', name: 'Hebbal', lat: 13.0358, lng: 77.5970, intensity: 22, riskLevel: 'low' as const },
  { id: '11', name: 'Malleshwaram', lat: 13.0035, lng: 77.5645, intensity: 15, riskLevel: 'low' as const },
  { id: '12', name: 'Yeshwanthpur', lat: 13.0227, lng: 77.5386, intensity: 38, riskLevel: 'medium' as const },
];

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 12);
  }, [center, map]);
  return null;
}

export function InteractiveMap({ selectedArea, className }: InteractiveMapProps) {
  const [crimeType, setCrimeType] = useState('All');
  const [timeFilter, setTimeFilter] = useState('All Day');
  const [mapCenter, setMapCenter] = useState<[number, number]>(BANGALORE_CENTER);

  useEffect(() => {
    if (selectedArea) {
      const hotspot = crimeHotspots.find(
        (h) => h.name.toLowerCase() === selectedArea.toLowerCase()
      );
      if (hotspot) {
        setMapCenter([hotspot.lat, hotspot.lng]);
      }
    }
  }, [selectedArea]);

  const getCircleColor = (riskLevel: 'low' | 'medium' | 'high') => {
    switch (riskLevel) {
      case 'high':
        return { color: 'hsl(0, 72%, 51%)', fillColor: 'hsl(0, 72%, 51%)' };
      case 'medium':
        return { color: 'hsl(45, 93%, 47%)', fillColor: 'hsl(45, 93%, 47%)' };
      case 'low':
        return { color: 'hsl(142, 71%, 45%)', fillColor: 'hsl(142, 71%, 45%)' };
    }
  };

  const getRadius = (intensity: number) => {
    return 300 + intensity * 15;
  };

  return (
    <div className={cn('rounded-2xl glass border border-border overflow-hidden', className)}>
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

            <Button 
              variant="outline" 
              size="sm" 
              className="h-9"
              onClick={() => setMapCenter(BANGALORE_CENTER)}
            >
              <Navigation className="w-4 h-4 mr-2" />
              Reset View
            </Button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-[400px] sm:h-[500px]">
        <MapContainer
          center={mapCenter}
          zoom={12}
          scrollWheelZoom={true}
          className="h-full w-full z-0"
          style={{ background: 'hsl(var(--muted))' }}
        >
          <MapController center={mapCenter} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          
          {crimeHotspots.map((hotspot) => {
            const colors = getCircleColor(hotspot.riskLevel);
            const area = mockAreas.find((a) => a.name === hotspot.name);
            
            return (
              <Circle
                key={hotspot.id}
                center={[hotspot.lat, hotspot.lng]}
                radius={getRadius(hotspot.intensity)}
                pathOptions={{
                  color: colors.color,
                  fillColor: colors.fillColor,
                  fillOpacity: 0.4,
                  weight: 2,
                }}
              >
                <Popup className="crime-popup">
                  <div className="p-1">
                    <h4 className="font-semibold text-foreground mb-1">{hotspot.name}</h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="text-muted-foreground">Risk Level: </span>
                        <span className={cn(
                          'font-medium',
                          hotspot.riskLevel === 'high' ? 'text-danger' :
                          hotspot.riskLevel === 'medium' ? 'text-moderate' : 'text-safe'
                        )}>
                          {hotspot.riskLevel === 'high' ? 'High' : hotspot.riskLevel === 'medium' ? 'Moderate' : 'Low'}
                        </span>
                      </p>
                      {area && (
                        <>
                          <p>
                            <span className="text-muted-foreground">Safety Score: </span>
                            <span className="font-medium">{area.safetyScore}/100</span>
                          </p>
                          <p>
                            <span className="text-muted-foreground">Safest Time: </span>
                            <span className="font-medium">{area.safestTime}</span>
                          </p>
                        </>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        {hotspot.riskLevel === 'high' 
                          ? '⚠️ Exercise caution, especially after dark'
                          : hotspot.riskLevel === 'medium'
                          ? '⚡ Moderate activity, stay alert'
                          : '✓ Generally safe area'}
                      </p>
                    </div>
                  </div>
                </Popup>
              </Circle>
            );
          })}
        </MapContainer>

        {/* Legend */}
        <div className="absolute top-4 right-4 glass rounded-xl p-3 shadow-md z-[1000]">
          <p className="text-xs font-medium text-muted-foreground mb-2">Crime Density</p>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-danger/60" />
              <span className="text-xs text-foreground">High Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-moderate/60" />
              <span className="text-xs text-foreground">Moderate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-safe/60" />
              <span className="text-xs text-foreground">Safe</span>
            </div>
          </div>
        </div>

        {/* Info Badge */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 glass rounded-lg px-3 py-1.5 z-[1000]">
          <Info className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs text-muted-foreground">Click circles for details</span>
        </div>
      </div>
    </div>
  );
}
