import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { MapPin, Navigation, Car, Bike, Bus, User, Navigation2 } from 'lucide-react';

export default function StartJourney() {
  const navigate = useNavigate();
  const { startJourney } = useAppContext();
  
  const [formData, setFormData] = useState({
    from: 'Hyderabad',
    to: 'Warangal',
    mode: 'Car',
    contact: 'Mother (+91 91234 56789)'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    startJourney({
      ...formData,
      distance: '148 km',
      eta: '2h 05m'
    });
    navigate('/app/journey/live');
  };

  const travelModes = [
    { id: 'Car', icon: Car },
    { id: 'Bike', icon: Bike },
    { id: 'Bus', icon: Bus },
    { id: 'Walk', icon: User },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Start Safe Journey</h1>
        <p className="text-slate-500 mt-1">Configure your journey for live tracking and safety alerts.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute left-3 top-3 h-4 w-4 rounded-full border-2 border-blue-900 flex items-center justify-center">
                  <div className="h-1.5 w-1.5 bg-blue-900 rounded-full" />
                </div>
                <Input 
                  value={formData.from}
                  onChange={e => setFormData({...formData, from: e.target.value})}
                  className="pl-10 h-12" 
                  placeholder="Starting Location" 
                  required 
                />
              </div>

              <div className="relative pl-5 -my-2">
                <div className="absolute left-[1.125rem] top-0 bottom-0 w-px bg-slate-300 border-dashed" />
                <button type="button" className="relative z-10 -ml-[1.125rem] h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-500 hover:bg-slate-200">
                  <Navigation2 className="h-4 w-4" />
                </button>
              </div>

              <div className="relative">
                <div className="absolute left-3 top-3 text-red-500">
                  <MapPin className="h-5 w-5" />
                </div>
                <Input 
                  value={formData.to}
                  onChange={e => setFormData({...formData, to: e.target.value})}
                  className="pl-10 h-12" 
                  placeholder="Destination" 
                  required 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Travel Mode</label>
              <div className="grid grid-cols-4 gap-3">
                {travelModes.map(mode => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setFormData({...formData, mode: mode.id})}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-colors ${
                      formData.mode === mode.id 
                        ? 'border-blue-900 bg-blue-50 text-blue-900' 
                        : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    <mode.icon className="h-6 w-6" />
                    <span className="text-xs font-semibold">{mode.id}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Notify Emergency Contact</label>
              <select 
                value={formData.contact}
                onChange={e => setFormData({...formData, contact: e.target.value})}
                className="flex h-12 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
              >
                <option>Mother (+91 91234 56789)</option>
                <option>Ravi - Brother (+91 99887 76655)</option>
                <option>Do not notify</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Optional Note</label>
              <Input placeholder="e.g. Taking the highway route" />
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full text-lg">
              Start Safe Journey
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
