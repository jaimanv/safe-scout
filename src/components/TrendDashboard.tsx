import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingDown, TrendingUp, Activity, PieChartIcon } from 'lucide-react';
import { trendData, crimeTypeData, hourlyData } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface TrendDashboardProps {
  className?: string;
}

export function TrendDashboard({ className }: TrendDashboardProps) {
  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-2 gap-6', className)}>
      {/* Crime Trend Over Time */}
      <div className="glass rounded-2xl p-6 border border-border animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Crime Trends</h3>
            <p className="text-sm text-muted-foreground">Monthly crime & resolution rates</p>
          </div>
          <div className="flex items-center gap-2 text-safe">
            <TrendingDown className="w-5 h-5" />
            <span className="text-sm font-medium">-15%</span>
          </div>
        </div>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorCrimes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-4))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-4))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.75rem',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Area 
                type="monotone" 
                dataKey="crimes" 
                stroke="hsl(var(--chart-4))" 
                fill="url(#colorCrimes)"
                strokeWidth={2}
                name="Crimes"
              />
              <Area 
                type="monotone" 
                dataKey="resolved" 
                stroke="hsl(var(--chart-2))" 
                fill="url(#colorResolved)"
                strokeWidth={2}
                name="Resolved"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Crime by Type */}
      <div className="glass rounded-2xl p-6 border border-border animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Crime Distribution</h3>
            <p className="text-sm text-muted-foreground">By category</p>
          </div>
          <PieChartIcon className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={crimeTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {crimeTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.75rem',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {crimeTypeData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-muted-foreground">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hourly Risk Pattern */}
      <div className="glass rounded-2xl p-6 border border-border animate-slide-up lg:col-span-2" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Hourly Risk Pattern</h3>
            <p className="text-sm text-muted-foreground">Risk level throughout the day</p>
          </div>
          <Activity className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hourlyData} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
              <XAxis 
                dataKey="hour" 
                className="text-xs" 
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                className="text-xs" 
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.75rem',
                }}
                cursor={{ fill: 'hsl(var(--accent))', opacity: 0.3 }}
              />
              <Bar 
                dataKey="risk" 
                radius={[4, 4, 0, 0]}
                name="Risk Level"
              >
                {hourlyData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.risk > 60 ? 'hsl(var(--danger))' : entry.risk > 40 ? 'hsl(var(--moderate))' : 'hsl(var(--safe))'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-muted-foreground mt-4 text-center">
          🌙 Higher risk observed between 10 PM - 4 AM. Plan travel during safer hours.
        </p>
      </div>
    </div>
  );
}
