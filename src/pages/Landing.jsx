import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/ui/Logo';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Shield, Map, AlertTriangle, Users, Bell, PhoneCall } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Smart Journey Monitoring",
      description: "Monitor your journey and receive important safety updates in real-time.",
      icon: Map,
    },
    {
      title: "Emergency Assistance",
      description: "Access SOS and emergency services instantly with a single tap.",
      icon: PhoneCall,
    },
    {
      title: "Route Safety",
      description: "Identify potentially risky road conditions and receive early warnings.",
      icon: Shield,
    },
    {
      title: "Safety Alerts",
      description: "Get alerts about incidents, hazards, or unusual journey conditions.",
      icon: AlertTriangle,
    },
    {
      title: "Trusted Contacts",
      description: "Keep selected contacts automatically informed during important journeys.",
      icon: Users,
    },
    {
      title: "Real-Time Awareness",
      description: "Keep track of your current journey status and exact location at all times.",
      icon: Bell,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="px-6 py-4 flex items-center justify-between bg-white border-b border-slate-200">
        <Logo />
        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => navigate('/login')}>Log In</Button>
          <Button variant="primary" onClick={() => navigate('/register')}>Sign Up</Button>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="relative px-6 py-20 md:py-32 flex flex-col items-center text-center overflow-hidden">
          <div className="absolute inset-0 bg-blue-900/5 -z-10" />
          <div className="max-w-3xl mx-auto space-y-8">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
              Your Guardian on <span className="text-blue-900">Every Road</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              Travel smarter. Stay connected. Get help when you need it. YatraKavach provides real-time journey awareness, emergency assistance, and route safety.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" variant="primary" onClick={() => navigate('/login')} className="w-full sm:w-auto text-base">
                Start Your Journey
              </Button>
              <Button size="lg" variant="outline" onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto text-base">
                Explore Safety Features
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-6 py-20 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl font-bold text-slate-900">Why choose YatraKavach?</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Our platform combines cutting-edge location tracking with an integrated emergency response system to keep you safe.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, idx) => (
                <Card key={idx} className="border-none shadow-md hover:shadow-lg transition-shadow bg-slate-50">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-900 mb-4">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 grayscale brightness-200">
            <Shield className="h-6 w-6" />
            <span className="font-bold text-lg text-white">YatraKavach</span>
          </div>
          <p className="text-sm">© 2026 YatraKavach. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
