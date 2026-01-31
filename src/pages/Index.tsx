import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, MapPin, TrendingUp, Award, AlertCircle, ChevronRight } from 'lucide-react';
import { SearchBar } from '@/components/SearchBar';
import { Header } from '@/components/Header';
import { SafetyChatbot } from '@/components/SafetyChatbot';
import { mockAreas } from '@/lib/mockData';

const features = [
  { icon: MapPin, title: 'Crime Heatmap', description: 'Visualize crime density across neighborhoods with real-time data' },
  { icon: TrendingUp, title: 'Trend Analysis', description: 'Track crime patterns over time with predictive insights' },
  { icon: Award, title: 'Safety Rankings', description: 'Compare areas and find the safest neighborhoods' },
  { icon: AlertCircle, title: 'Incident Reporting', description: 'Report and track incidents in your community' },
];

const Index = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    setTimeout(() => {
      navigate(`/analysis?area=${encodeURIComponent(query)}`);
    }, 300);
  };

  const topSafeAreas = [...mockAreas]
    .sort((a, b) => b.safetyScore - a.safetyScore)
    .slice(0, 4);

  return (
    <div className="min-h-screen gradient-hero selection:bg-primary/20">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-primary/20 mb-8 animate-fade-in">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold tracking-wide text-primary uppercase">AI-Powered Safety Intelligence</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-8 animate-slide-up">
              Know Before You Go
              <span className="block text-gradient mt-2">Stay Safe, Stay Informed</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-slide-up [animation-delay:100ms]">
              Real-time crime analysis and safety predictions for your city. 
              Join thousands of users making safer travel decisions daily.
            </p>

            <div className="max-w-2xl mx-auto animate-slide-up [animation-delay:200ms]">
              <div className="p-2 glass rounded-2xl">
                <SearchBar onSearch={handleSearch} size="large" />
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 animate-slide-up [animation-delay:300ms]">
              {[
                { label: 'Areas Covered', value: '500+' },
                { label: 'Data Points', value: '2M+' },
                { label: 'Daily Updates', value: '24/7' },
                { label: 'Accuracy Rate', value: '94%' },
              ].map((stat, i) => (
                <div key={i} className="glass rounded-2xl p-6 transition-transform hover:scale-105">
                  <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Intelligent Safety Monitoring</h2>
            <p className="text-muted-foreground">Advanced tools designed to keep you and your loved ones secure.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="group glass rounded-3xl p-8 hover:bg-white/40 dark:hover:bg-white/5 transition-all duration-500 hover:-translate-y-2">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Report */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto glass rounded-[2.5rem] p-12 sm:p-20 text-center relative overflow-hidden">
             {/* Decorative Background for CTA */}
            <div className="absolute top-0 left-0 w-full h-full bg-primary/5 -z-10" />
            
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Make Your Neighborhood Safer</h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-lg">
              Every report helps our AI provide more accurate safety scores for your community.
            </p>
            <button 
              onClick={() => navigate('/report')}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-primary text-primary-foreground text-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
            >
              <AlertCircle className="w-6 h-6" />
              Report Incident
            </button>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-primary/10 glass bg-background/20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="SafeScout" className="w-8 h-8 opacity-90" />
            <span className="text-xl font-bold tracking-tight text-foreground">SafeScout</span>
          </div>
          <p className="text-sm text-muted-foreground font-medium">
            © 2024 SafeScout. Built for a safer tomorrow.
          </p>
        </div>
      </footer>

      <SafetyChatbot />
    </div>
  );
};

export default Index;
