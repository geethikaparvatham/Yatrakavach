import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { ChevronRight, User, Shield, Settings as SettingsIcon, Lock, Bell, Moon, Globe, MapPin } from 'lucide-react';

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${checked ? 'bg-blue-900' : 'bg-slate-200'}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );
}

function SettingRow({ icon: Icon, label, description, children }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-slate-100 last:border-b-0">
      <div className="flex items-center gap-3">
        {Icon && <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"><Icon className="h-4 w-4" /></div>}
        <div>
          <p className="text-sm font-medium text-slate-900">{label}</p>
          {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

export default function Settings() {
  const navigate = useNavigate();
  const [toggles, setToggles] = useState({
    autoAlerts: true,
    locationSharing: true,
    journeyNotifs: true,
    safetyWarnings: true,
    darkMode: false,
    notifSound: true,
    locationPerms: true,
    dataSharing: false,
  });

  const setToggle = (key) => (val) => setToggles(prev => ({ ...prev, [key]: val }));

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your preferences and privacy.</p>
      </div>

      {/* Account */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2"><User className="h-4 w-4" /> Account</CardTitle></CardHeader>
        <CardContent className="px-6 pb-2">
          {[
            { label: 'Profile', desc: 'Edit your personal information', to: '/app/profile' },
            { label: 'Change Password', desc: 'Update your account password', to: '/app/profile' },
            { label: 'Emergency Contacts', desc: 'Manage who gets alerted', to: '/app/contacts' },
          ].map(item => (
            <button key={item.label} onClick={() => navigate(item.to)} className="w-full flex items-center justify-between py-4 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 -mx-2 px-2 rounded-lg transition-colors group">
              <div>
                <p className="text-sm font-medium text-slate-900 text-left">{item.label}</p>
                <p className="text-xs text-slate-500 mt-0.5 text-left">{item.desc}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Safety */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2"><Shield className="h-4 w-4" /> Safety</CardTitle></CardHeader>
        <CardContent className="px-6 pb-2">
          <SettingRow icon={Bell} label="Automatic Emergency Alerts" description="Receive alerts about hazards on your route">
            <Toggle checked={toggles.autoAlerts} onChange={setToggle('autoAlerts')} />
          </SettingRow>
          <SettingRow icon={MapPin} label="Location Sharing" description="Share your live location with contacts">
            <Toggle checked={toggles.locationSharing} onChange={setToggle('locationSharing')} />
          </SettingRow>
          <SettingRow icon={Bell} label="Journey Notifications" description="Get updates on your active journey">
            <Toggle checked={toggles.journeyNotifs} onChange={setToggle('journeyNotifs')} />
          </SettingRow>
          <SettingRow icon={Shield} label="Safety Warnings" description="Alerts about unsafe conditions">
            <Toggle checked={toggles.safetyWarnings} onChange={setToggle('safetyWarnings')} />
          </SettingRow>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2"><SettingsIcon className="h-4 w-4" /> Preferences</CardTitle></CardHeader>
        <CardContent className="px-6 pb-2">
          <div className="flex items-center justify-between py-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"><Globe className="h-4 w-4" /></div>
              <div>
                <p className="text-sm font-medium text-slate-900">Language</p>
                <p className="text-xs text-slate-500 mt-0.5">App display language</p>
              </div>
            </div>
            <select className="text-sm border border-slate-200 rounded-md px-2 py-1 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-900">
              <option>English</option>
              <option>Telugu</option>
              <option>Hindi</option>
              <option>Tamil</option>
            </select>
          </div>
          <SettingRow icon={Moon} label="Dark Mode" description="Switch to dark theme">
            <Toggle checked={toggles.darkMode} onChange={setToggle('darkMode')} />
          </SettingRow>
          <SettingRow icon={Bell} label="Notification Sound" description="Play sound for alerts">
            <Toggle checked={toggles.notifSound} onChange={setToggle('notifSound')} />
          </SettingRow>
        </CardContent>
      </Card>

      {/* Privacy */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2"><Lock className="h-4 w-4" /> Privacy</CardTitle></CardHeader>
        <CardContent className="px-6 pb-2">
          <SettingRow icon={MapPin} label="Location Permissions" description="Allow YatraKavach to use your GPS">
            <Toggle checked={toggles.locationPerms} onChange={setToggle('locationPerms')} />
          </SettingRow>
          <SettingRow icon={Shield} label="Share Data for Safety Improvements" description="Anonymous data helps improve alerts">
            <Toggle checked={toggles.dataSharing} onChange={setToggle('dataSharing')} />
          </SettingRow>
        </CardContent>
      </Card>
    </div>
  );
}
