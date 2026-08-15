import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/ui/Logo';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [identifierError, setIdentifierError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateIdentifier = (val) => {
    // Phone number validation: integers only, 10 digits, starts with 6, 7, 8, or 9.
    // Or we can allow email. The prompt says "phone number take as only integers and it should be start with 9,8,7,6".
    // Let's enforce that if it looks like a number, it must match.
    // Assuming the field is strictly for this format based on user prompt:
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(val)) {
      setIdentifierError('Phone number must be exactly 10 digits and start with 6, 7, 8, or 9.');
      return false;
    }
    setIdentifierError('');
    return true;
  };

  const validatePassword = (val) => {
    // one capital letter, one special character, one number
    const capRegex = /[A-Z]/;
    const specialRegex = /[^A-Za-z0-9]/;
    const numRegex = /[0-9]/;
    
    if (!capRegex.test(val) || !specialRegex.test(val) || !numRegex.test(val) || val.length < 8) {
      setPasswordError('Password must contain at least 8 characters, 1 uppercase letter, 1 number, and 1 special character.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const isIdValid = validateIdentifier(identifier);
    const isPassValid = validatePassword(password);
    
    if (isIdValid && isPassValid) {
      login(identifier, password);
      navigate('/app/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <Link to="/">
          <Logo className="h-10 w-10 text-blue-900" />
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Or{' '}
          <Link to="/register" className="font-medium text-blue-900 hover:text-blue-800">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardContent className="pt-6">
            <form className="space-y-6" onSubmit={handleLogin} noValidate>
              <div>
                <label className="block text-sm font-medium text-slate-700">Phone Number</label>
                <div className="mt-1">
                  <Input 
                    type="text" 
                    required 
                    placeholder="e.g. 9876543210" 
                    value={identifier}
                    onChange={(e) => {
                      // Only allow digits
                      const val = e.target.value.replace(/\D/g, '');
                      setIdentifier(val);
                      if (identifierError) validateIdentifier(val);
                    }}
                    maxLength={10}
                    className={identifierError ? "border-red-500 focus:ring-red-500" : ""}
                  />
                  {identifierError && <p className="mt-1 text-sm text-red-600">{identifierError}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <div className="mt-1">
                  <Input 
                    type="password" 
                    required 
                    placeholder="Enter password" 
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError) validatePassword(e.target.value);
                    }}
                    className={passwordError ? "border-red-500 focus:ring-red-500" : ""}
                  />
                  {passwordError && <p className="mt-1 text-sm text-red-600">{passwordError}</p>}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-900 focus:ring-blue-900 border-slate-300 rounded" />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-900 hover:text-blue-800">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <Button type="submit" variant="primary" className="w-full">
                  Sign in
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
