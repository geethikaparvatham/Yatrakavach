import React from 'react';
import { Shield } from 'lucide-react';

export function Logo({ className = "h-8 w-8 text-blue-900" }) {
  // Use a placeholder shield icon until a real image is provided
  // In a real scenario with the uploaded logo: 
  // return <img src="/logo.png" alt="YatraKavach" className={className} />
  
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Shield className={className} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-2 w-1 bg-orange-500 rounded-full" />
      </div>
      <span className="font-bold text-xl text-slate-900 tracking-tight">
        Yatra<span className="text-blue-900">Kavach</span>
      </span>
    </div>
  );
}
