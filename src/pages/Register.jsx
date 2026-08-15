import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/ui/Logo';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [agreed, setAgreed] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    city: '',
    password: '',
    confirmPassword: '',
    emergencyContact: '',
    language: 'English',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!formData.fullName.trim()) e.fullName = 'Full name is required.';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = 'Enter a valid email address.';
    if (!/^[6-9]\d{9}$/.test(formData.mobile))
      e.mobile = 'Must be 10 digits starting with 6, 7, 8, or 9.';
    if (!formData.city.trim()) e.city = 'City is required.';
    if (formData.password.length < 8 || !/[A-Z]/.test(formData.password) || !/[0-9]/.test(formData.password) || !/[^A-Za-z0-9]/.test(formData.password))
      e.password = 'Min 8 chars, 1 uppercase, 1 number, 1 special character.';
    if (formData.password !== formData.confirmPassword)
      e.confirmPassword = 'Passwords do not match.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const set = (field) => (e) => {
    let val = e.target.value;
    if (field === 'mobile' || field === 'emergencyContact') {
      val = val.replace(/\D/g, '').slice(0, 10);
    }
    setFormData(prev => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    register({ fullName: formData.fullName, email: formData.email, mobile: formData.mobile, city: formData.city, language: formData.language });
    navigate('/app/dashboard');
  };

  const err = (field) => errors[field] ? <p className="mt-1 text-xs text-red-600">{errors[field]}</p> : null;
  const cls = (field) => errors[field] ? 'border-red-500 focus:ring-red-500' : '';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <Link to="/"><Logo className="h-10 w-10 text-blue-900" /></Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">Create your account</h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-900 hover:text-blue-800">Sign in</Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <Card>
          <CardContent className="pt-6">
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <Input type="text" placeholder="e.g. Your Full Name" value={formData.fullName} onChange={set('fullName')} className={cls('fullName')} />
                  {err('fullName')}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <Input type="email" placeholder="e.g. yourname@gmail.com" value={formData.email} onChange={set('email')} className={cls('email')} />
                  {err('email')}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Mobile Number</label>
                  <Input type="text" inputMode="numeric" placeholder="e.g. 9876543210" value={formData.mobile} onChange={set('mobile')} maxLength={10} className={cls('mobile')} />
                  {err('mobile')}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                  <Input type="text" placeholder="e.g. Hyderabad" value={formData.city} onChange={set('city')} className={cls('city')} />
                  {err('city')}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                  <Input type="password" placeholder="Min 8 chars, 1 upper, 1 number, 1 special" value={formData.password} onChange={set('password')} className={cls('password')} />
                  {err('password')}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                  <Input type="password" placeholder="Re-enter password" value={formData.confirmPassword} onChange={set('confirmPassword')} className={cls('confirmPassword')} />
                  {err('confirmPassword')}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Emergency Contact</label>
                  <Input type="text" inputMode="numeric" placeholder="e.g. 9123456789" value={formData.emergencyContact} onChange={set('emergencyContact')} maxLength={10} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Language</label>
                  <select
                    className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
                    value={formData.language}
                    onChange={e => setFormData(prev => ({ ...prev, language: e.target.value }))}
                  >
                    <option>English</option>
                    <option>Telugu</option>
                    <option>Hindi</option>
                    <option>Tamil</option>
                  </select>
                </div>

              </div>

              <div className="flex items-start gap-3">
                <input type="checkbox" id="agree" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-1 h-4 w-4 text-blue-900 border-slate-300 rounded" />
                <label htmlFor="agree" className="text-sm text-slate-600">
                  I agree to the{' '}
                  <a href="#" className="text-blue-900 hover:underline font-medium">Terms of Service</a>{' '}
                  and{' '}
                  <a href="#" className="text-blue-900 hover:underline font-medium">Privacy Policy</a>
                </label>
              </div>

              <Button type="submit" variant="primary" className="w-full" disabled={!agreed}>
                Create Account
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
