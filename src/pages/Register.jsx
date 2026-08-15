import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/ui/Logo';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
    navigate('/app/dashboard');
  };

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
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <Input type="text" required placeholder="Geethika Parvatham" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <Input type="email" required placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Mobile Number</label>
                  <Input type="tel" required placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                  <Input type="text" required placeholder="Hyderabad" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                  <Input type="password" required placeholder="••••••••" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                  <Input type="password" required placeholder="••••••••" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Emergency Contact</label>
                  <Input type="tel" placeholder="+91 91234 56789" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Language</label>
                  <select className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900">
                    <option>English</option>
                    <option>Telugu</option>
                    <option>Hindi</option>
                    <option>Tamil</option>
                  </select>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agree"
                  checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                  className="mt-1 h-4 w-4 text-blue-900 border-slate-300 rounded"
                />
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
