import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { mockAlerts } from '../data/mockData';
import { AlertTriangle, MapPin, Clock, Construction, CloudRain, Car } from 'lucide-react';

export default function Alerts() {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Accident', 'Traffic', 'Weather', 'Construction', 'General'];

  // Combine mock alerts with some extra ones for variety
  const allAlerts = [
    ...mockAlerts,
    {
      id: 'alt_4',
      type: 'Construction',
      title: 'Road Works',
      location: 'Madhapur Main Road',
      time: '2 hrs ago',
      severity: 'Low',
      description: 'Lane closure due to metro pillar construction.',
      action: 'Expect slight delays.'
    }
  ];

  const filteredAlerts = filter === 'All' 
    ? allAlerts 
    : allAlerts.filter(a => a.type === filter);

  const getIcon = (type) => {
    switch(type) {
      case 'Accident': return <Car className="h-5 w-5" />;
      case 'Weather': return <CloudRain className="h-5 w-5" />;
      case 'Construction': return <Construction className="h-5 w-5" />;
      default: return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const getSeverityBadge = (severity) => {
    switch(severity) {
      case 'High': return <Badge variant="danger">High Risk</Badge>;
      case 'Medium': return <Badge variant="warning">Medium Risk</Badge>;
      case 'Low': return <Badge variant="success">Low Risk</Badge>;
      default: return <Badge variant="secondary">{severity}</Badge>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Safety Alerts</h1>
        <p className="text-slate-500 mt-1">Real-time road conditions and warnings.</p>
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

      <div className="space-y-4">
        {filteredAlerts.length > 0 ? filteredAlerts.map(alert => (
          <Card key={alert.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row">
                <div className="p-4 sm:w-48 bg-slate-50 border-r border-slate-100 flex flex-col justify-center items-start sm:items-center text-center gap-2">
                  <div className={`p-3 rounded-full ${
                    alert.severity === 'High' ? 'bg-red-100 text-red-600' :
                    alert.severity === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {getIcon(alert.type)}
                  </div>
                  {getSeverityBadge(alert.severity)}
                </div>
                <div className="p-5 flex-1 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg text-slate-900">{alert.title}</h3>
                    <div className="flex items-center text-xs text-slate-500">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      {alert.time}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <MapPin className="h-4 w-4 mr-1.5 text-blue-600" />
                    {alert.location}
                  </div>
                  <p className="text-slate-700 text-sm">{alert.description}</p>
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 mt-2">
                    <p className="text-sm font-medium text-blue-900 flex items-start gap-2">
                      <span className="shrink-0 text-blue-600 font-bold">Action:</span>
                      {alert.action}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )) : (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
            <AlertTriangle className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No alerts for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
