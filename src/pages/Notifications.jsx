import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Bell, CheckCircle, AlertTriangle, MapPin, Navigation, Shield, Phone, Info } from 'lucide-react';

const initialNotifications = {
  today: [
    { id: 'n1', icon: Navigation, color: 'text-blue-600 bg-blue-50', title: 'Journey Started', message: 'Your journey from Hyderabad to Warangal has begun.', time: '2:30 PM', read: false },
    { id: 'n2', icon: AlertTriangle, color: 'text-yellow-600 bg-yellow-50', title: 'Safety Alert Detected', message: 'Heavy traffic reported on Outer Ring Road.', time: '1:45 PM', read: false },
    { id: 'n3', icon: Phone, color: 'text-purple-600 bg-purple-50', title: 'Emergency Contact Notified', message: 'Mother has been notified about your journey.', time: '1:30 PM', read: true },
    { id: 'n4', icon: MapPin, color: 'text-green-600 bg-green-50', title: 'Location Sharing Enabled', message: 'Your live location is being shared with your contacts.', time: '12:00 PM', read: true },
  ],
  yesterday: [
    { id: 'n5', icon: CheckCircle, color: 'text-green-600 bg-green-50', title: 'Journey Completed', message: 'Your journey to Madhapur has been completed safely.', time: '6:30 PM', read: true },
    { id: 'n6', icon: AlertTriangle, color: 'text-orange-600 bg-orange-50', title: 'Route Warning', message: 'Accident reported near Banjara Hills junction. Route updated.', time: '3:15 PM', read: true },
  ],
  earlier: [
    { id: 'n7', icon: Shield, color: 'text-red-600 bg-red-50', title: 'SOS Status Update', message: 'Your previous SOS alert has been marked resolved.', time: 'Aug 12', read: true },
    { id: 'n8', icon: Info, color: 'text-slate-600 bg-slate-100', title: 'App Update Available', message: 'YatraKavach v2.1 is available with improved safety features.', time: 'Aug 10', read: true },
  ]
};

export default function Notifications() {
  const [notifs, setNotifs] = useState(initialNotifications);

  const markAllRead = () => {
    setNotifs(prev => {
      const updated = {};
      for (const group in prev) {
        updated[group] = prev[group].map(n => ({ ...n, read: true }));
      }
      return updated;
    });
  };

  const markRead = (group, id) => {
    setNotifs(prev => ({
      ...prev,
      [group]: prev[group].map(n => n.id === id ? { ...n, read: true } : n)
    }));
  };

  const totalUnread = Object.values(notifs).flat().filter(n => !n.read).length;

  const renderGroup = (label, items, groupKey) => (
    <div key={groupKey}>
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{label}</h3>
      <div className="space-y-2 mb-6">
        {items.map(notif => (
          <button
            key={notif.id}
            onClick={() => markRead(groupKey, notif.id)}
            className={`w-full text-left p-4 rounded-xl border transition-all flex gap-4 items-start ${
              notif.read ? 'bg-white border-slate-100 hover:bg-slate-50' : 'bg-blue-50/60 border-blue-100 hover:bg-blue-50'
            }`}
          >
            <div className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center ${notif.color}`}>
              <notif.icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-2">
                <p className={`text-sm font-semibold ${notif.read ? 'text-slate-700' : 'text-slate-900'}`}>{notif.title}</p>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-slate-400">{notif.time}</span>
                  {!notif.read && <div className="h-2 w-2 rounded-full bg-blue-600 shrink-0"></div>}
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{notif.message}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
          {totalUnread > 0 && <Badge variant="primary">{totalUnread} new</Badge>}
        </div>
        <Button variant="ghost" size="sm" onClick={markAllRead} className="text-blue-900 hover:text-blue-800">
          Mark all as read
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          {renderGroup('Today', notifs.today, 'today')}
          {renderGroup('Yesterday', notifs.yesterday, 'yesterday')}
          {renderGroup('Earlier', notifs.earlier, 'earlier')}
        </CardContent>
      </Card>
    </div>
  );
}
