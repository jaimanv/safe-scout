import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, Minus, ChevronRight, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Header } from '@/components/Header';
import { SafetyBadge } from '@/components/SafetyBadge';
import { SafetyScore } from '@/components/SafetyScore';
import { SafetyChatbot } from '@/components/SafetyChatbot';
import { mockAreas } from '@/lib/mockData';
import { cn } from '@/lib/utils';

const RankingsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const sortedBySafety = [...mockAreas].sort((a, b) => b.safetyScore - a.safetyScore);
  const topSafe = sortedBySafety.slice(0, 5);
  const topRisk = [...mockAreas].sort((a, b) => a.safetyScore - b.safetyScore).slice(0, 5);
  const mostImproved = sortedBySafety.filter((a) => a.trendDirection === 'down').slice(0, 5);
  const mostDeclined = sortedBySafety.filter((a) => a.trendDirection === 'up').slice(0, 5);

  const filteredAreas = mockAreas.filter(
    (area) =>
      area.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      area.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const TrendIcon = ({ direction }: { direction: 'up' | 'down' | 'stable' }) => {
    const Icon = direction === 'up' ? TrendingUp : direction === 'down' ? TrendingDown : Minus;
    const color = direction === 'up' ? 'text-danger' : direction === 'down' ? 'text-safe' : 'text-muted-foreground';
    return <Icon className={cn('w-4 h-4', color)} />;
  };

  const AreaCard = ({ area, rank }: { area: typeof mockAreas[0]; rank?: number }) => (
    <button
      onClick={() => navigate(`/analysis?area=${encodeURIComponent(area.name + ', ' + area.city)}`)}
      className="w-full glass rounded-xl p-4 border border-border hover:border-primary/50 transition-all duration-300 text-left group"
    >
      <div className="flex items-center gap-4">
        {rank !== undefined && (
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-bold text-primary">#{rank}</span>
          </div>
        )}
        <SafetyScore score={area.safetyScore} size="sm" showLabel={false} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-foreground truncate">{area.name}</h4>
            <TrendIcon direction={area.trendDirection} />
          </div>
          <p className="text-sm text-muted-foreground">{area.city}</p>
        </div>
        <SafetyBadge level={area.riskLevel} size="sm" />
        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
        <span>🕒 Best: {area.safestTime}</span>
        <span>👮 {area.nearestPoliceStation.distance}</span>
      </div>
    </button>
  );

  return (
    <div className="min-h-screen gradient-hero">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Safety Rankings</h1>
              <p className="text-muted-foreground">Compare areas and find the safest neighborhoods</p>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search areas..."
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-muted/50 border border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="safest" className="w-full">
          <TabsList className="w-full sm:w-auto glass border border-border h-auto flex-wrap p-1 gap-1 mb-6">
            <TabsTrigger value="safest" className="data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
              🥇 Top Safe
            </TabsTrigger>
            <TabsTrigger value="risky" className="data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
              ⚠️ High Risk
            </TabsTrigger>
            <TabsTrigger value="improved" className="data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
              📈 Improved
            </TabsTrigger>
            <TabsTrigger value="declined" className="data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
              📉 Declined
            </TabsTrigger>
            <TabsTrigger value="all" className="data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
              All Areas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="safest" className="space-y-3">
            <div className="glass rounded-xl p-4 border border-safe/20 bg-safe/5 mb-4">
              <p className="text-sm text-safe font-medium">
                🛡️ These areas have the highest safety scores based on crime data analysis
              </p>
            </div>
            {topSafe.map((area, i) => (
              <AreaCard key={area.id} area={area} rank={i + 1} />
            ))}
          </TabsContent>

          <TabsContent value="risky" className="space-y-3">
            <div className="glass rounded-xl p-4 border border-danger/20 bg-danger/5 mb-4">
              <p className="text-sm text-danger font-medium">
                ⚠️ Exercise caution in these areas. Consider traveling during safer hours.
              </p>
            </div>
            {topRisk.map((area, i) => (
              <AreaCard key={area.id} area={area} rank={i + 1} />
            ))}
          </TabsContent>

          <TabsContent value="improved" className="space-y-3">
            <div className="glass rounded-xl p-4 border border-safe/20 bg-safe/5 mb-4">
              <p className="text-sm text-safe font-medium">
                📈 These areas show declining crime trends - safety is improving!
              </p>
            </div>
            {mostImproved.length > 0 ? (
              mostImproved.map((area, i) => (
                <AreaCard key={area.id} area={area} rank={i + 1} />
              ))
            ) : (
              <p className="text-muted-foreground text-center py-8">No data available</p>
            )}
          </TabsContent>

          <TabsContent value="declined" className="space-y-3">
            <div className="glass rounded-xl p-4 border border-moderate/20 bg-moderate/5 mb-4">
              <p className="text-sm text-moderate font-medium">
                📉 These areas show rising crime trends - stay vigilant.
              </p>
            </div>
            {mostDeclined.length > 0 ? (
              mostDeclined.map((area, i) => (
                <AreaCard key={area.id} area={area} rank={i + 1} />
              ))
            ) : (
              <p className="text-muted-foreground text-center py-8">No data available</p>
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-3">
            {(searchQuery ? filteredAreas : mockAreas).map((area) => (
              <AreaCard key={area.id} area={area} />
            ))}
          </TabsContent>
        </Tabs>
      </main>

      <SafetyChatbot />
    </div>
  );
};

export default RankingsPage;
