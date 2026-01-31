import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { AreaSummary } from '@/components/AreaSummary';
import { CrimeHeatmap } from '@/components/CrimeHeatmap';
import { TrendDashboard } from '@/components/TrendDashboard';
import { PoliceStationFinder } from '@/components/PoliceStationFinder';
import { SafetyChatbot } from '@/components/SafetyChatbot';
import { InteractiveMap } from '@/components/InteractiveMap';
import { mockAreas, Area } from '@/lib/mockData';

const AnalysisPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const areaQuery = searchParams.get('area') || '';
  
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);

  useEffect(() => {
    if (areaQuery) {
      // Find matching area from mock data
      const areaName = areaQuery.split(',')[0].trim();
      const found = mockAreas.find(
        (a) => a.name.toLowerCase() === areaName.toLowerCase()
      );
      setSelectedArea(found || mockAreas[0]); // Default to first area if not found
    }
  }, [areaQuery]);

  const handleSearch = (query: string) => {
    navigate(`/analysis?area=${encodeURIComponent(query)}`);
  };

  if (!selectedArea) {
    return (
      <div className="min-h-screen gradient-hero">
        <Header />
        <div className="container mx-auto px-4 pt-24">
          <div className="flex items-center justify-center h-[60vh]">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading area data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-hero">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Back & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="w-fit"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex-1 max-w-md">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>

        {/* Area Summary */}
        <div className="mb-8">
          <AreaSummary area={selectedArea} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Map & Trends (2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Interactive Map */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">Interactive Crime Map</h2>
              <InteractiveMap selectedArea={selectedArea.name} />
            </div>

            {/* Crime Heatmap (simulated visualization) */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">Area Overview</h2>
              <CrimeHeatmap selectedArea={selectedArea.name} />
            </div>

            {/* Trend Dashboard */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">Crime Analytics</h2>
              <TrendDashboard />
            </div>
          </div>

          {/* Right - Sidebar (1 col) */}
          <div className="space-y-6">
            {/* Police Station */}
            <PoliceStationFinder area={selectedArea} />

            {/* Quick Stats */}
            <div className="glass rounded-2xl p-6 border border-border">
              <h3 className="font-semibold text-foreground mb-4">Crime Breakdown</h3>
              <div className="space-y-3">
                {Object.entries(selectedArea.crimeStats).map(([type, count]) => (
                  <div key={type} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground capitalize">{type}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${Math.min((count / 40) * 100, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-foreground w-8 text-right">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Tips */}
            <div className="glass rounded-2xl p-6 border border-border">
              <h3 className="font-semibold text-foreground mb-4">Safety Tips</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-safe">✓</span>
                  Travel in groups after 9 PM
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-safe">✓</span>
                  Use well-lit main roads
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-safe">✓</span>
                  Share location with trusted contacts
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-safe">✓</span>
                  Keep emergency numbers handy
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <SafetyChatbot />
    </div>
  );
};

export default AnalysisPage;
