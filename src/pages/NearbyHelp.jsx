import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { mockNearbyHelp } from '../data/mockData';
import { MapPin, Navigation, Phone, Hospital, Shield, Flame, Fuel, Wrench } from 'lucide-react';

export default function NearbyHelp() {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Hospitals', 'Police Stations', 'Fire Stations', 'Petrol Pumps', 'Repair Centers'];

  const allHelp = [
    ...mockNearbyHelp,
    { id: 'h_4', name: 'City Hospital Emergency', category: 'Hospitals', distance: '3.1 km', address: 'Banjara Hills', contact: '1066', status: 'Open' },
    { id: 'h_5', name: 'Fire Station Madhapur', category: 'Fire Stations', distance: '1.5 km', address: 'Madhapur', contact: '101', status: 'Open' },
    { id: 'h_6', name: 'Raju Auto Repair', category: 'Repair Centers', distance: '0.9 km', address: 'Jubilee Hills Checkpost', contact: '9876543210', status: 'Closed' }
  ];

  const filteredHelp = filter === 'All' 
    ? allHelp 
    : allHelp.filter(h => h.category === filter);

  const getIcon = (category) => {
    switch(category) {
      case 'Hospitals': return <Hospital className="h-6 w-6" />;
      case 'Police Stations': return <Shield className="h-6 w-6" />;
      case 'Fire Stations': return <Flame className="h-6 w-6" />;
      case 'Petrol Pumps': return <Fuel className="h-6 w-6" />;
      case 'Repair Centers': return <Wrench className="h-6 w-6" />;
      default: return <MapPin className="h-6 w-6" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Nearby Help</h1>
        <p className="text-slate-500 mt-1">Locate emergency services and facilities near you.</p>
      </div>

      <div className="flex overflow-x-auto pb-2 gap-2">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === c 
                ? 'bg-blue-900 text-white' 
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filteredHelp.map(help => (
          <Card key={help.id} className="hover:border-blue-300 transition-colors">
            <CardContent className="p-5 flex gap-4">
              <div className="h-12 w-12 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-blue-900">
                {getIcon(help.category)}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-slate-900 leading-tight">{help.name}</h3>
                  <Badge variant={help.status === 'Closed' ? 'secondary' : 'success'} className="shrink-0 ml-2">
                    {help.status || 'Open'}
                  </Badge>
                </div>
                
                <div className="text-sm text-slate-600 space-y-1">
                  <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{help.distance} • {help.address}</p>
                  <p className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" />{help.contact}</p>
                </div>

                <Button variant="outline" size="sm" className="w-full mt-3 flex items-center justify-center gap-2">
                  <Navigation className="h-4 w-4" /> Navigate
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
