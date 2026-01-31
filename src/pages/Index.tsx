import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, MapPin, TrendingUp, Award, AlertCircle, ChevronRight } from 'lucide-react';
import { SearchBar } from '@/components/SearchBar';
import { Header } from '@/components/Header';
import { SafetyChatbot } from '@/components/SafetyChatbot';
import { mockAreas } from '@/lib/mockData';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: MapPin,
    title: 'Crime Heatmap',
    description: 'Visualize crime density across neighborhoods with real-time data',
  },
  {
    icon: TrendingUp,
    title: 'Trend Analysis',
    description: 'Track crime patterns over time with predictive insights',
  },
  {
    icon: Award,
    title: 'Safety Rankings',
    description: 'Compare areas and find the safest neighborhoods',
  },
  {
    icon: AlertCircle,
    title: 'Incident Reporting',
    description: 'Report and track incidents in your community',
  },
];

const Index = () => {
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (query: string) => {
    setIsSearching(true);
    // Navigate to analysis page with the area
    setTimeout(() => {
      navigate(`/analysis?area=${encodeURIComponent(query)}`);
    }, 300);
  };

  const topSafeAreas = mockAreas
    .sort((a, b) => b.safetyScore - a.safetyScore)
    .slice(0, 4);

  return (
    <div className="min-h-screen gradient-hero">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Safety Intelligence</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-slide-up">
              Know Before You Go
              <span className="block text-gradient mt-2">Stay Safe, Stay Informed</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Real-time crime analysis and safety predictions for your city.
              Make informed decisions about when and where to travel.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <SearchBar onSearch={handleSearch} size="large" />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              {[
                { label: 'Areas Covered', value: '500+' },
                { label: 'Data Points', value: '2M+' },
                { label: 'Daily Updates', value: '24/7' },
                { label: 'Accuracy Rate', value: '94%' },
              ].map((stat, i) => (
                <div key={i} className="glass rounded-xl p-4 border border-border">
                  <p className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Comprehensive Safety Intelligence
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Powered by advanced analytics and real-time data to keep you safe
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group glass rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safe Areas Preview */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Top Safe Areas
              </h2>
              <p className="text-muted-foreground">Highest rated neighborhoods in Bangalore</p>
            </div>
            <button
              onClick={() => navigate('/rankings')}
              className="flex items-center gap-1 text-primary hover:underline text-sm font-medium"
            >
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topSafeAreas.map((area, i) => (
              <button
                key={area.id}
                onClick={() => navigate(`/analysis?area=${encodeURIComponent(area.name + ', ' + area.city)}`)}
                className="glass rounded-2xl p-5 border border-border hover:border-primary/50 transition-all duration-300 text-left group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">#{i + 1}</span>
                    <div className="w-10 h-10 rounded-xl bg-safe/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-safe">{area.safetyScore}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">{area.name}</h4>
                <p className="text-sm text-muted-foreground">{area.city}</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-safe/10 text-safe text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-safe animate-pulse" />
                    Safe
                  </span>
                  <span className="text-xs text-muted-foreground">{area.safestTime}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto glass rounded-3xl p-8 sm:p-12 border border-border text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Report an Incident
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Help make your community safer by reporting incidents.
              Your reports contribute to real-time safety updates.
            </p>
            <button
              onClick={() => navigate('/report')}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl gradient-primary font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <AlertCircle className="w-5 h-5" />
              Report Crime
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="SafeScout" className="w-6 h-6 object-contain" />
              <span className="font-semibold text-foreground">SafeScout</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 SafeScout. Making cities safer, one neighborhood at a time.
            </p>
          </div>
        </div>
      </footer>

      <SafetyChatbot />
    </div>
  );
};

export default Index;
