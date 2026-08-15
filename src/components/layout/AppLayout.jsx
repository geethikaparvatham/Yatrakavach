import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAppContext } from '../../context/AppContext';
import { Logo } from '../ui/Logo';
import { 
  Home, 
  Map, 
  AlertTriangle, 
  Phone, 
  User, 
  Settings, 
  LogOut, 
  Bell, 
  History,
  LifeBuoy
} from 'lucide-react';

export function AppLayout() {
  const { user, logout } = useAuth();
  const { isSosActive, activateSos } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { icon: Home, label: 'Dashboard', to: '/app/dashboard' },
    { icon: Map, label: 'Journey', to: '/app/journey/new' },
    { icon: AlertTriangle, label: 'Alerts', to: '/app/alerts' },
    { icon: LifeBuoy, label: 'Nearby Help', to: '/app/help' },
    { icon: History, label: 'History', to: '/app/history' },
    { icon: Phone, label: 'Contacts', to: '/app/contacts' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <Logo />
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-900'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`
                  }
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-200 space-y-2">
          <button 
            onClick={() => navigate('/app/sos')}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-bold shadow-sm transition-colors"
          >
            <AlertTriangle className="h-5 w-5" />
            SOS EMERGENCY
          </button>
          
          <div className="pt-2">
            <NavLink
              to="/app/profile"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              <User className="h-5 w-5" />
              Profile
            </NavLink>
            <NavLink
              to="/app/settings"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              <Settings className="h-5 w-5" />
              Settings
            </NavLink>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200">
          <Logo className="h-6 w-6" />
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/app/notifications')} className="text-slate-500">
              <Bell className="h-6 w-6" />
            </button>
            <div className="h-8 w-8 rounded-full bg-blue-100 overflow-hidden">
              <img src={user?.avatar} alt="Profile" className="h-full w-full object-cover" />
            </div>
          </div>
        </header>

        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200">
          <h1 className="text-xl font-semibold text-slate-800">Dashboard</h1>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/app/notifications')} className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 cursor-pointer" onClick={() => navigate('/app/profile')}>
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900">{user?.fullName}</p>
                <p className="text-xs text-slate-500">Traveler</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-blue-100 overflow-hidden border border-slate-200">
                <img src={user?.avatar} alt="Profile" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex items-center justify-between px-2 pb-safe pt-1 z-50">
        {[
          { icon: Home, label: 'Home', to: '/app/dashboard' },
          { icon: Map, label: 'Journey', to: '/app/journey/new' },
        ].map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center p-2 min-w-[64px] ${
                isActive ? 'text-blue-900' : 'text-slate-500'
              }`
            }
          >
            <item.icon className="h-6 w-6 mb-1" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        ))}
        
        {/* Mobile SOS Button */}
        <div className="relative -top-5">
          <button 
            onClick={() => navigate('/app/sos')}
            className="flex items-center justify-center h-14 w-14 bg-red-600 rounded-full shadow-lg border-4 border-slate-50 text-white"
          >
            <AlertTriangle className="h-6 w-6" />
          </button>
        </div>

        {[
          { icon: AlertTriangle, label: 'Alerts', to: '/app/alerts' },
          { icon: User, label: 'Profile', to: '/app/profile' },
        ].map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center p-2 min-w-[64px] ${
                isActive ? 'text-blue-900' : 'text-slate-500'
              }`
            }
          >
            <item.icon className="h-6 w-6 mb-1" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
