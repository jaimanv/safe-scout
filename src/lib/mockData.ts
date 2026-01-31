// Mock data for the crime safety platform

export interface Area {
  id: string;
  name: string;
  city: string;
  safetyScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  safestTime: string;
  nearestPoliceStation: {
    name: string;
    distance: string;
    contact: string;
  };
  crimeStats: {
    theft: number;
    assault: number;
    cyber: number;
    vandalism: number;
    other: number;
  };
  trendDirection: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

export interface CrimeIncident {
  id: string;
  type: string;
  location: { lat: number; lng: number };
  time: string;
  severity: 'low' | 'medium' | 'high';
}

export const mockAreas: Area[] = [
  {
    id: '1',
    name: 'Indiranagar',
    city: 'Bangalore',
    safetyScore: 82,
    riskLevel: 'low',
    safestTime: '6 AM - 10 PM',
    nearestPoliceStation: {
      name: 'Indiranagar Police Station',
      distance: '1.2 km',
      contact: '+91 80 2520 1234',
    },
    crimeStats: { theft: 12, assault: 3, cyber: 8, vandalism: 5, other: 2 },
    trendDirection: 'down',
    lastUpdated: '6 hours ago',
  },
  {
    id: '2',
    name: 'Koramangala',
    city: 'Bangalore',
    safetyScore: 75,
    riskLevel: 'low',
    safestTime: '7 AM - 9 PM',
    nearestPoliceStation: {
      name: 'Koramangala Police Station',
      distance: '0.8 km',
      contact: '+91 80 2552 5678',
    },
    crimeStats: { theft: 18, assault: 5, cyber: 12, vandalism: 8, other: 4 },
    trendDirection: 'stable',
    lastUpdated: '4 hours ago',
  },
  {
    id: '3',
    name: 'MG Road',
    city: 'Bangalore',
    safetyScore: 68,
    riskLevel: 'medium',
    safestTime: '8 AM - 8 PM',
    nearestPoliceStation: {
      name: 'MG Road Police Station',
      distance: '0.5 km',
      contact: '+91 80 2558 9012',
    },
    crimeStats: { theft: 25, assault: 8, cyber: 15, vandalism: 12, other: 6 },
    trendDirection: 'up',
    lastUpdated: '2 hours ago',
  },
  {
    id: '4',
    name: 'Whitefield',
    city: 'Bangalore',
    safetyScore: 88,
    riskLevel: 'low',
    safestTime: '5 AM - 11 PM',
    nearestPoliceStation: {
      name: 'Whitefield Police Station',
      distance: '1.5 km',
      contact: '+91 80 2845 3456',
    },
    crimeStats: { theft: 8, assault: 2, cyber: 5, vandalism: 3, other: 1 },
    trendDirection: 'down',
    lastUpdated: '8 hours ago',
  },
  {
    id: '5',
    name: 'Electronic City',
    city: 'Bangalore',
    safetyScore: 45,
    riskLevel: 'high',
    safestTime: '9 AM - 6 PM',
    nearestPoliceStation: {
      name: 'Electronic City Police Station',
      distance: '2.1 km',
      contact: '+91 80 2783 7890',
    },
    crimeStats: { theft: 35, assault: 12, cyber: 20, vandalism: 18, other: 10 },
    trendDirection: 'up',
    lastUpdated: '1 hour ago',
  },
  {
    id: '6',
    name: 'Jayanagar',
    city: 'Bangalore',
    safetyScore: 91,
    riskLevel: 'low',
    safestTime: '5 AM - 11 PM',
    nearestPoliceStation: {
      name: 'Jayanagar Police Station',
      distance: '0.6 km',
      contact: '+91 80 2663 4567',
    },
    crimeStats: { theft: 5, assault: 1, cyber: 3, vandalism: 2, other: 1 },
    trendDirection: 'down',
    lastUpdated: '5 hours ago',
  },
  {
    id: '7',
    name: 'HSR Layout',
    city: 'Bangalore',
    safetyScore: 72,
    riskLevel: 'medium',
    safestTime: '7 AM - 9 PM',
    nearestPoliceStation: {
      name: 'HSR Layout Police Station',
      distance: '1.0 km',
      contact: '+91 80 2573 8901',
    },
    crimeStats: { theft: 20, assault: 6, cyber: 10, vandalism: 9, other: 5 },
    trendDirection: 'stable',
    lastUpdated: '3 hours ago',
  },
  {
    id: '8',
    name: 'Marathahalli',
    city: 'Bangalore',
    safetyScore: 52,
    riskLevel: 'high',
    safestTime: '10 AM - 5 PM',
    nearestPoliceStation: {
      name: 'Marathahalli Police Station',
      distance: '1.8 km',
      contact: '+91 80 2847 2345',
    },
    crimeStats: { theft: 30, assault: 10, cyber: 18, vandalism: 15, other: 8 },
    trendDirection: 'up',
    lastUpdated: '2 hours ago',
  },
];

export const crimeTypes = ['All', 'Theft', 'Assault', 'Cyber Crime', 'Vandalism', 'Other'];
export const timeFilters = ['All Day', 'Morning (6AM-12PM)', 'Afternoon (12PM-6PM)', 'Evening (6PM-12AM)', 'Night (12AM-6AM)'];

export const trendData = [
  { month: 'Jan', crimes: 120, resolved: 95 },
  { month: 'Feb', crimes: 115, resolved: 100 },
  { month: 'Mar', crimes: 130, resolved: 105 },
  { month: 'Apr', crimes: 110, resolved: 98 },
  { month: 'May', crimes: 95, resolved: 85 },
  { month: 'Jun', crimes: 88, resolved: 80 },
  { month: 'Jul', crimes: 92, resolved: 82 },
  { month: 'Aug', crimes: 85, resolved: 78 },
];

export const crimeTypeData = [
  { name: 'Theft', value: 35, color: 'hsl(var(--chart-1))' },
  { name: 'Assault', value: 15, color: 'hsl(var(--chart-4))' },
  { name: 'Cyber Crime', value: 25, color: 'hsl(var(--chart-3))' },
  { name: 'Vandalism', value: 18, color: 'hsl(var(--chart-5))' },
  { name: 'Other', value: 7, color: 'hsl(var(--chart-2))' },
];

export const hourlyData = [
  { hour: '12AM', risk: 65 },
  { hour: '2AM', risk: 72 },
  { hour: '4AM', risk: 55 },
  { hour: '6AM', risk: 25 },
  { hour: '8AM', risk: 15 },
  { hour: '10AM', risk: 12 },
  { hour: '12PM', risk: 18 },
  { hour: '2PM', risk: 20 },
  { hour: '4PM', risk: 22 },
  { hour: '6PM', risk: 35 },
  { hour: '8PM', risk: 48 },
  { hour: '10PM', risk: 58 },
];

export const searchSuggestions = [
  'Indiranagar, Bangalore',
  'Koramangala, Bangalore',
  'MG Road, Bangalore',
  'Whitefield, Bangalore',
  'Electronic City, Bangalore',
  'Jayanagar, Bangalore',
  'HSR Layout, Bangalore',
  'Marathahalli, Bangalore',
  'Connaught Place, Delhi',
  'Andheri, Mumbai',
];
