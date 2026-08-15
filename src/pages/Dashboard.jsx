import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  MapPin, Navigation, Clock, Shield, Phone, AlertTriangle,
  History, LifeBuoy, Share2, CheckCircle2, Wifi, ChevronRight,
  Zap, Map
} from 'lucide-react';
import { mockEmergencyContacts, mockAlerts } from '../data/mockData';

export default function Dashboard() {
  const { user } = useAuth();
  const { activeJourney } = useAppContext();
  const navigate = useNavigate();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const quickActions = [
    { icon: Map, label: 'Start Journey', color: 'bg-blue-50 text-blue-900 hover:bg-blue-100', to: '/app/journey/new' },
    { icon: AlertTriangle, label: 'SOS', color: 'bg-red-50 text-red-600 hover:bg-red-100', to: '/app/sos' },
    { icon: Share2, label: 'Share Location', color: 'bg-green-50 text-green-700 hover:bg-green-100', to: '/app/journey/live' },
    { icon: LifeBuoy, label: 'Nearby Help', color: 'bg-orange-50 text-orange-600 hover:bg-orange-100', to: '/app/help' },
    { icon: AlertTriangle, label: 'Safety Alerts', color: 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100', to: '/app/alerts' },
    { icon: History, label: 'Journey History', color: 'bg-purple-50 text-purple-700 hover:bg-purple-100', to: '/app/history' },
  ];

  const primaryContact = mockEmergencyContacts.find(c => c.isPrimary);
  const recentAlert = mockAlerts[0];

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{greeting}, {user?.fullName?.split(' ')[0]} 👋</h1>
        <p className="text-slate-500 mt-1">Stay safe. Your journey is being watched over.</p>
      </div>

      {/* Active Journey Banner */}
      {activeJourney ? (
        <Card className="bg-blue-900 text-white border-none shadow-lg">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <Badge className="bg-green-400 text-green-900 border-none mb-2">● Live Journey</Badge>
                <h3 className="font-bold text-lg">{activeJourney.from} → {activeJourney.to}</h3>
                <p className="text-blue-200 text-sm mt-1">{activeJourney.distance} • ETA: {activeJourney.eta}</p>
              </div>
              <Button variant="accent" size="sm" onClick={() => navigate('/app/journey/live')}>
                View Live
              </Button>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-blue-800">
              <div className="text-center"><p className="text-blue-200 text-xs">Distance</p><p className="font-semibold text-sm">{activeJourney.distance}</p></div>
              <div className="text-center"><p className="text-blue-200 text-xs">ETA</p><p className="font-semibold text-sm">{activeJourney.eta}</p></div>
              <div className="text-center"><p className="text-blue-200 text-xs">Status</p><p className="font-semibold text-sm text-green-400">{activeJourney.safetyStatus}</p></div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-dashed border-2 border-slate-200 bg-slate-50">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-700">No active journey</p>
              <p className="text-sm text-slate-500 mt-0.5">Start a journey to enable live tracking & alerts.</p>
            </div>
            <Button variant="primary" size="sm" onClick={() => navigate('/app/journey/new')}>
              Start Journey
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Safety Status */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-slate-500">Safety Status</p>
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">SAFE</p>
                <p className="text-xs text-slate-500">All systems normal</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5"><Wifi className="h-3.5 w-3.5 text-green-500" /><span className="text-slate-600">Connected</span></div>
              <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-green-500" /><span className="text-slate-600">GPS Active</span></div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-slate-500">Primary Contact</p>
              <Phone className="h-5 w-5 text-blue-500" />
            </div>
            <p className="font-bold text-slate-900 text-lg">{primaryContact?.name}</p>
            <p className="text-sm text-slate-500 mt-0.5">{primaryContact?.relation} · {primaryContact?.phone}</p>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="primary" className="flex-1 text-xs">
                <Phone className="h-3.5 w-3.5 mr-1.5" /> Call
              </Button>
              <Button size="sm" variant="outline" className="flex-1 text-xs">
                Notify
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Active Alert */}
        <Card className="border-orange-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-slate-500">Latest Alert</p>
              <Badge variant="warning">{recentAlert?.severity}</Badge>
            </div>
            <p className="font-semibold text-slate-900">{recentAlert?.title}</p>
            <p className="text-sm text-slate-500 mt-1 flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{recentAlert?.location}</p>
            <button onClick={() => navigate('/app/alerts')} className="mt-4 text-sm text-blue-900 font-medium flex items-center gap-1 hover:underline">
              View all alerts <ChevronRight className="h-4 w-4" />
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.to)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-colors ${action.color}`}
              >
                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-white/70">
                  <action.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium text-center leading-tight">{action.label}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Journey History */}
      <Card>
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-base">Recent Journeys</CardTitle>
          <button onClick={() => navigate('/app/history')} className="text-xs text-blue-900 font-medium flex items-center gap-1 hover:underline">
            View all <ChevronRight className="h-4 w-4" />
          </button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { from: 'Hyderabad', to: 'Warangal', date: '12 Aug', status: 'Safe', dist: '148 km' },
              { from: 'Office (Madhapur)', to: 'Home', date: '10 Aug', status: 'Safe', dist: '15 km' },
            ].map((j, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center">
                    <Navigation className="h-4 w-4 text-blue-900" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{j.from} → {j.to}</p>
                    <p className="text-xs text-slate-500">{j.date} · {j.dist}</p>
                  </div>
                </div>
                <Badge variant="success">{j.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
