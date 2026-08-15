import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { User, Mail, Phone, MapPin, Edit, Save, Key, ChevronRight, ShieldCheck } from 'lucide-react';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    city: '',
    language: 'English',
  });

  // Sync formData whenever user changes
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        mobile: user.mobile || '',
        city: user.city || '',
        language: user.language || 'English',
      });
    }
  }, [user]);

  const handleSave = (e) => {
    e.preventDefault();
    updateUser(formData);
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
        {isEditing ? (
          <Button variant="primary" onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" /> Save Changes
          </Button>
        ) : (
          <Button variant="outline" onClick={() => setIsEditing(true)} className="gap-2">
            <Edit className="h-4 w-4" /> Edit Profile
          </Button>
        )}
      </div>

      <Card>
        <CardContent className="p-6">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left mb-8">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-blue-100 overflow-hidden border-4 border-white shadow-md">
                <img
                  src={user.avatar || `https://i.pravatar.cc/150?u=${user.email}`}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <h2 className="text-2xl font-bold text-slate-900">{user.fullName}</h2>
                <Badge variant="success" className="gap-1 px-2 py-0.5">
                  <ShieldCheck className="h-3 w-3" /> Verified
                </Badge>
              </div>
              <p className="text-slate-500 flex items-center justify-center sm:justify-start gap-2">
                <Mail className="h-4 w-4" /> {user.email}
              </p>
              <p className="text-slate-500 flex items-center justify-center sm:justify-start gap-2">
                <MapPin className="h-4 w-4" /> {user.city || 'Not set'}, India
              </p>
            </div>
          </div>

          {/* Editable Fields */}
          <form className="grid sm:grid-cols-2 gap-5 pt-6 border-t border-slate-100" onSubmit={handleSave}>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <Input
                value={formData.fullName}
                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                disabled={!isEditing}
                className={!isEditing ? 'bg-slate-50 text-slate-600' : ''}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <Input
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
                className={!isEditing ? 'bg-slate-50 text-slate-600' : ''}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Mobile Number</label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-slate-400"><Phone className="h-4 w-4" /></div>
                <Input
                  className={`pl-9 ${!isEditing ? 'bg-slate-50 text-slate-600' : ''}`}
                  value={formData.mobile}
                  onChange={e => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
              <Input
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
                disabled={!isEditing}
                className={!isEditing ? 'bg-slate-50 text-slate-600' : ''}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Language</label>
              <select
                className={`flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 ${!isEditing ? 'bg-slate-50 text-slate-600 cursor-not-allowed opacity-60' : ''}`}
                value={formData.language}
                onChange={e => setFormData({ ...formData, language: e.target.value })}
                disabled={!isEditing}
              >
                <option>English</option>
                <option>Telugu</option>
                <option>Hindi</option>
                <option>Tamil</option>
              </select>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Key className="h-5 w-5 text-slate-400" /> Change Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div className="hidden sm:block" />
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
              <Input type="password" placeholder="••••••••" />
            </div>
          </div>
          <Button variant="outline">Update Password</Button>
        </CardContent>
      </Card>

      {/* Emergency Contacts Link */}
      <button
        onClick={() => navigate('/app/contacts')}
        className="w-full flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all text-left group"
      >
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Emergency Contacts</h3>
            <p className="text-sm text-slate-500">Manage who gets notified during an SOS</p>
          </div>
        </div>
        <ChevronRight className="h-6 w-6 text-slate-400 group-hover:text-slate-600" />
      </button>
    </div>
  );
}
