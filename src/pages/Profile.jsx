import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, FEMALE_AVATARS, MALE_AVATARS } from '../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { User, Mail, Phone, MapPin, Edit, Save, Key, ChevronRight, ShieldCheck, Camera, Upload, Check } from 'lucide-react';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    city: '',
    language: 'English',
    gender: 'Female',
    avatar: '',
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
        gender: user.gender || 'Female',
        avatar: user.avatar || '',
      });
    }
  }, [user]);

  const handleSave = (e) => {
    if (e) e.preventDefault();
    updateUser(formData);
    setIsEditing(false);
    setShowAvatarPicker(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newAvatar = reader.result;
        setFormData(prev => ({ ...prev, avatar: newAvatar }));
        updateUser({ avatar: newAvatar });
      };
      reader.readAsDataURL(file);
    }
  };

  const selectAvatar = (url) => {
    setFormData(prev => ({ ...prev, avatar: url }));
    updateUser({ avatar: url });
    setShowAvatarPicker(false);
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
          {/* Profile Header with Avatar Upload */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left mb-6">
            <div className="relative group">
              <div className="h-28 w-28 rounded-full bg-blue-100 overflow-hidden border-4 border-white shadow-md relative">
                <img
                  src={formData.avatar || user.avatar}
                  alt={user.fullName}
                  className="h-full w-full object-cover"
                />
                
                {/* Camera Overlay button */}
                <button
                  type="button"
                  onClick={() => setShowAvatarPicker(prev => !prev)}
                  className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 text-xs font-medium"
                >
                  <Camera className="h-6 w-6" />
                  Change
                </button>
              </div>

              {/* Quick upload trigger below avatar on mobile */}
              <button
                type="button"
                onClick={() => setShowAvatarPicker(prev => !prev)}
                className="mt-2 text-xs font-semibold text-blue-900 hover:underline flex items-center gap-1 justify-center sm:justify-start"
              >
                <Camera className="h-3.5 w-3.5" /> Change Photo
              </button>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <h2 className="text-2xl font-bold text-slate-900">{formData.fullName || user.fullName}</h2>
                <Badge variant="success" className="gap-1 px-2 py-0.5">
                  <ShieldCheck className="h-3 w-3" /> Verified
                </Badge>
              </div>
              <p className="text-slate-500 flex items-center justify-center sm:justify-start gap-2">
                <Mail className="h-4 w-4" /> {formData.email || user.email}
              </p>
              <p className="text-slate-500 flex items-center justify-center sm:justify-start gap-2">
                <MapPin className="h-4 w-4" /> {formData.city || user.city || 'Not set'}, India
              </p>
            </div>
          </div>

          {/* Photo Change / Avatar Selection Box */}
          {showAvatarPicker && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl mb-6 space-y-4 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800">Select Profile Picture</h3>
                <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="gap-1 text-xs">
                  <Upload className="h-3.5 w-3.5" /> Upload from Computer
                </Button>
              </div>

              {/* Female Presets */}
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-2">Female Options</p>
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {FEMALE_AVATARS.map((url, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => selectAvatar(url)}
                      className={`h-14 w-14 rounded-full overflow-hidden border-2 transition-all relative flex-shrink-0 ${
                        formData.avatar === url ? 'border-blue-600 ring-2 ring-blue-600/30' : 'border-transparent hover:opacity-80'
                      }`}
                    >
                      <img src={url} alt={`Female Avatar ${i+1}`} className="h-full w-full object-cover" />
                      {formData.avatar === url && (
                        <div className="absolute inset-0 bg-blue-900/40 flex items-center justify-center text-white">
                          <Check className="h-5 w-5" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Male Presets */}
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-2">Male Options</p>
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {MALE_AVATARS.map((url, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => selectAvatar(url)}
                      className={`h-14 w-14 rounded-full overflow-hidden border-2 transition-all relative flex-shrink-0 ${
                        formData.avatar === url ? 'border-blue-600 ring-2 ring-blue-600/30' : 'border-transparent hover:opacity-80'
                      }`}
                    >
                      <img src={url} alt={`Male Avatar ${i+1}`} className="h-full w-full object-cover" />
                      {formData.avatar === url && (
                        <div className="absolute inset-0 bg-blue-900/40 flex items-center justify-center text-white">
                          <Check className="h-5 w-5" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

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
              <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
              <select
                className={`flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 ${!isEditing ? 'bg-slate-50 text-slate-600 cursor-not-allowed opacity-60' : ''}`}
                value={formData.gender}
                onChange={e => setFormData({ ...formData, gender: e.target.value })}
                disabled={!isEditing}
              >
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
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
