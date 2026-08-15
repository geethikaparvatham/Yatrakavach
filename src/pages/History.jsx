import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { mockJourneyHistory } from '../data/mockData';
import { MapPin, Navigation, Clock, Calendar, Filter, ChevronRight } from 'lucide-react';

export default function History() {
  const [dateFilter, setDateFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const extraJourneys = [
    { id: 'j_4', date: '01 Aug 2026', from: 'Secunderabad', to: 'Shamshabad', duration: '1h 10m', distance: '35 km', status: 'Completed', safety: 'Safe' },
    { id: 'j_5', date: '25 Jul 2026', from: 'Kukatpally', to: 'Gachibowli', duration: '40m', distance: '12 km', status: 'Completed', safety: 'Safe' },
    { id: 'j_6', date: '20 Jul 2026', from: 'Hyderabad', to: 'Karimnagar', duration: '3h 15m', distance: '165 km', status: 'Cancelled', safety: 'N/A' },
  ];

  const allJourneys = [...mockJourneyHistory, ...extraJourneys];

  const filtered = allJourneys.filter(j => {
    if (statusFilter !== 'All' && j.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Journey History</h1>
        <p className="text-slate-500 mt-1">Review your past travels and safety records.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <select 
            className="border-slate-300 rounded-md text-sm py-1.5 focus:ring-blue-900 focus:border-blue-900"
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
          >
            <option>All Time</option>
            <option>This Month</option>
            <option>Last 3 Months</option>
          </select>
        </div>
        <div className="flex gap-2">
          {['All', 'Completed', 'Cancelled'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                statusFilter === s ? 'bg-slate-800 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map(journey => (
          <Card key={journey.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                
                <div className="flex items-center gap-4 flex-1">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <Navigation className="h-5 w-5 text-blue-900" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">{journey.from} → {journey.to}</h3>
                    <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{journey.date}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{journey.duration}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{journey.distance}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-0 border-slate-100 pt-3 sm:pt-0">
                  <div className="flex flex-col sm:items-end gap-1">
                    <Badge variant={journey.status === 'Completed' ? 'success' : 'secondary'}>{journey.status}</Badge>
                    {journey.safety !== 'N/A' && (
                      <Badge variant={journey.safety === 'Safe' ? 'success' : 'warning'} className="text-[10px]">
                        Safety: {journey.safety}
                      </Badge>
                    )}
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400 shrink-0" />
                </div>

              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-10 text-slate-500">No journeys found.</div>
        )}
      </div>
    </div>
  );
}
