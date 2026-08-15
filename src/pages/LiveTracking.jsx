import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { MapPin, Clock, Navigation, Shield, Share2, AlertTriangle, Phone } from 'lucide-react';

export default function LiveTracking() {
  const { activeJourney, endJourney } = useAppContext();
  const navigate = useNavigate();

  if (!activeJourney) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4 text-center">
        <Navigation className="h-16 w-16 text-slate-300" />
        <h2 className="text-xl font-bold text-slate-700">No Active Journey</h2>
        <p className="text-slate-500">Start a journey to see live tracking information here.</p>
        <Button variant="primary" onClick={() => navigate('/app/journey/new')}>Start Journey</Button>
      </div>
    );
  }

  const handleEnd = () => {
    endJourney();
    navigate('/app/dashboard');
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Live Tracking</h1>
          <p className="text-slate-500 text-sm mt-1">{activeJourney.from} → {activeJourney.to}</p>
        </div>
        <Badge variant="success" className="text-sm px-3 py-1">● Live</Badge>
      </div>

      {/* Mock Map */}
      <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <svg className="h-20 w-20 text-slate-300" viewBox="0 0 100 100" fill="none">
            <rect width="100" height="100" fill="#f1f5f9"/>
            <line x1="10" y1="50" x2="90" y2="50" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="6 4"/>
            <circle cx="20" cy="50" r="7" fill="#1e3a8a"/>
            <circle cx="80" cy="50" r="7" fill="#ef4444"/>
            <circle cx="50" cy="50" r="5" fill="#f97316"/>
          </svg>
          <p className="text-slate-400 text-sm font-medium">Interactive map coming soon</p>
          <p className="text-slate-300 text-xs">Connect Google Maps / Mapbox API</p>
        </div>

        {/* Route overlay badges */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full px-3 py-1.5 flex items-center gap-2 shadow-sm text-xs font-medium text-slate-700">
          <MapPin className="h-3.5 w-3.5 text-blue-600" /> {activeJourney.from}
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full px-3 py-1.5 flex items-center gap-2 shadow-sm text-xs font-medium text-slate-700">
          <MapPin className="h-3.5 w-3.5 text-red-500" /> {activeJourney.to}
        </div>
      </div>

      {/* Journey Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Distance', value: activeJourney.distance || '148 km', icon: Navigation, color: 'text-blue-600' },
          { label: 'ETA', value: activeJourney.eta || '2h 05m', icon: Clock, color: 'text-orange-500' },
          { label: 'Safety', value: activeJourney.safetyStatus || 'Safe', icon: Shield, color: 'text-green-500' },
          { label: 'Mode', value: activeJourney.mode || 'Car', icon: Navigation, color: 'text-purple-500' },
        ].map(stat => (
          <Card key={stat.label}>
            <CardContent className="p-4 text-center">
              <stat.icon className={`h-5 w-5 mx-auto mb-1 ${stat.color}`} />
              <p className="font-bold text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-400">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Button variant="outline" className="gap-2">
          <Share2 className="h-4 w-4" /> Share Live Location
        </Button>
        <Button variant="danger" className="gap-2" onClick={() => navigate('/app/sos')}>
          <AlertTriangle className="h-4 w-4" /> SOS Emergency
        </Button>
        <Button variant="primary" className="gap-2" onClick={handleEnd}>
          End Journey
        </Button>
      </div>
    </div>
  );
}
