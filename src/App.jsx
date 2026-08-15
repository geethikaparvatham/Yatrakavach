import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { AppLayout } from './components/layout/AppLayout';

// Placeholder Imports for Pages (we will create these)
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import StartJourney from './pages/StartJourney';
import LiveTracking from './pages/LiveTracking';
import SOS from './pages/SOS';
import Alerts from './pages/Alerts';
import NearbyHelp from './pages/NearbyHelp';
import Contacts from './pages/Contacts';
import History from './pages/History';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
// import AdminDashboard from './pages/admin/AdminDashboard';
// import AdminAlerts from './pages/admin/AdminAlerts';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected User Routes */}
      <Route path="/app" element={
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="journey/new" element={<StartJourney />} />
        <Route path="journey/live" element={<LiveTracking />} />
        <Route path="sos" element={<SOS />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="help" element={<NearbyHelp />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="history" element={<History />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>

      {/* Admin Routes (Simplified for Prototype) */}
      <Route path="/admin/*" element={
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold">Admin Portal (Coming Soon)</h1>
        </div>
      } />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
