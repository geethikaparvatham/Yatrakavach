import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { mockEmergencyContacts } from '../data/mockData';
import { AlertTriangle, Phone, MapPin, Share2, Shield, X, Navigation } from 'lucide-react';

export default function SOS() {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSosActive, setIsSosActive] = useState(false);

  const activateSos = () => {
    setIsSosActive(true);
    setIsConfirmOpen(false);
  };

  const cancelSos = () => {
    setIsSosActive(false);
  };

  if (isSosActive) {
    return (
      <div className="max-w-md mx-auto space-y-4 animate-in fade-in duration-300">
        <div className="bg-red-600 text-white rounded-xl p-6 text-center shadow-lg shadow-red-500/30">
          <AlertTriangle className="h-12 w-12 mx-auto mb-3 animate-pulse" />
          <h1 className="text-2xl font-black tracking-widest mb-1">EMERGENCY MODE ACTIVE</h1>
          <p className="text-red-100 font-medium text-sm">Help is available. Your location is being shared.</p>
        </div>

        <Card className="border-red-200">
          <CardContent className="p-5">
            <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-3">
              <MapPin className="h-5 w-5 text-red-500" /> Current Location
            </h3>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-sm">
              <p className="font-semibold text-slate-800">Hyderabad, Telangana</p>
              <p className="text-slate-500 font-mono mt-1">17.3850° N, 78.4867° E</p>
            </div>
            <Button variant="outline" className="w-full mt-3 font-semibold text-blue-700">
              <Share2 className="h-4 w-4 mr-2" /> Share Live Link
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <button className="bg-slate-900 text-white p-4 rounded-xl font-bold flex flex-col items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-sm">
            <Shield className="h-6 w-6 text-blue-400" />
            Call 112 (Police)
          </button>
          <button className="bg-white border-2 border-slate-200 text-slate-900 p-4 rounded-xl font-bold flex flex-col items-center justify-center gap-2 hover:bg-slate-50 transition-colors shadow-sm">
            <Phone className="h-6 w-6 text-red-500" />
            Call 108 (Ambulance)
          </button>
        </div>

        <Card>
          <CardContent className="p-5 space-y-3">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-center mb-4">Emergency Contacts</h3>
            {mockEmergencyContacts.map(c => (
              <Button key={c.id} variant="outline" className="w-full justify-between h-auto py-3">
                <div className="flex flex-col items-start text-left">
                  <span className="font-bold">{c.name}</span>
                  <span className="text-xs text-slate-500">{c.relation}</span>
                </div>
                <div className="bg-green-100 text-green-700 p-2 rounded-full">
                  <Phone className="h-4 w-4" />
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        <Button variant="ghost" onClick={cancelSos} className="w-full mt-4 text-slate-500 hover:text-slate-900">
          Cancel Emergency Mode
        </Button>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-12rem)] min-h-[500px] flex flex-col items-center justify-center max-w-md mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900">Emergency SOS</h1>
        <p className="text-slate-500 mt-2">Press and hold if you need immediate assistance.</p>
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20 scale-150"></div>
        <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-30 scale-125" style={{ animationDelay: '0.5s' }}></div>
        <button 
          onClick={() => setIsConfirmOpen(true)}
          className="relative z-10 h-48 w-48 bg-red-600 rounded-full shadow-2xl shadow-red-600/50 flex flex-col items-center justify-center text-white border-8 border-red-500 hover:bg-red-700 hover:scale-105 transition-all duration-300"
        >
          <AlertTriangle className="h-16 w-16 mb-2" />
          <span className="text-3xl font-black tracking-widest">SOS</span>
        </button>
      </div>

      <p className="mt-12 text-sm text-slate-500 text-center bg-slate-100 p-4 rounded-lg">
        Activating SOS will immediately notify your emergency contacts and share your live location.
      </p>

      {isConfirmOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
            <CardContent className="p-6 text-center">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="text-xl font-bold mb-2">Activate Emergency SOS?</h2>
              <p className="text-slate-600 mb-6 text-sm">
                This will alert your contacts and prompt you to call emergency services.
              </p>
              <div className="space-y-3">
                <Button variant="danger" className="w-full font-bold text-lg h-12" onClick={activateSos}>
                  Yes, Activate SOS
                </Button>
                <Button variant="outline" className="w-full h-12" onClick={() => setIsConfirmOpen(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
