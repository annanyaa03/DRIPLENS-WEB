import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { ApiError } from '../lib/api';

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const navigate  = useNavigate();
  const location  = useLocation();
  const { login, register, isLoggedIn, user } = useAuth();

  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  const initialRole = searchParams.get('role') === 'brand' ? 'brand' : 'creator';

  const [mode, setMode]     = useState(initialMode);
  const [role, setRole]     = useState(initialRole);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading]   = useState(false);

  // Already logged in — send to dashboard
  useEffect(() => {
    if (isLoggedIn && user) navigate(`/dashboard/${user.role}`, { replace: true });
  }, [isLoggedIn, user, navigate]);

  useEffect(() => {
    setMode(searchParams.get('mode') === 'register' ? 'register' : 'login');
    if (searchParams.get('role')) setRole(searchParams.get('role'));
  }, [searchParams]);

  const validate = () => {
    const e = {};
    if (mode === 'register' && !formData.username.trim()) e.username = 'Username is required';
    if (mode === 'register' && formData.username.length < 3) e.username = 'Minimum 3 characters';
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) e.email = 'Enter a valid email';
    if (formData.password.length < 8) e.password = 'Password must be at least 8 characters';
    return e;
  };

  const handleChange = (e) => {
    setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(p => ({ ...p, [e.target.name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) { setErrors(validationErrors); return; }

    setLoading(true);
    try {
      if (mode === 'register') {
        const userData = await register(formData.username, formData.email, formData.password, role);
        navigate(`/dashboard/${userData.role}`, { replace: true });
      } else {
        const userData = await login(formData.email, formData.password);
        // Go back to where they came from, or dashboard
        const from = location.state?.from?.pathname || `/dashboard/${userData.role}`;
        navigate(from, { replace: true });
      }
    } catch (err) {
      setApiError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(m => m === 'register' ? 'login' : 'register');
    setErrors({});
    setApiError('');
  };

  const inputClass = (field) =>
    `w-full border-b py-3 focus:outline-none transition-colors bg-transparent text-black placeholder:text-[#CCC] ${
      errors[field] ? 'border-red-400' : 'border-[#DDD] focus:border-black'
    }`;

  return (
    <>
      <Helmet>
        <title>Sign In / Join — Driplens</title>
        <meta name="description" content="Sign In or Join Driplens" />
      </Helmet>

      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-16 px-4 bg-[#FAFAFA]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white p-10 border border-[#E5E5E5]"
        >
          {/* Header */}
          <div className="mb-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#999] mb-3">
              {mode === 'register' ? 'Create Account' : 'Welcome Back'}
            </p>
            <h1 className="text-3xl font-bold text-black tracking-tight">
              {mode === 'register' ? 'Join Driplens' : 'Sign in'}
            </h1>
          </div>

          {/* Role Selector (register only) */}
          {mode === 'register' && (
            <div className="flex gap-3 mb-8">
              {['creator', 'brand'].map(r => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest border transition-all ${
                    role === r
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-[#999] border-[#E5E5E5] hover:border-black hover:text-black'
                  }`}
                >
                  {r === 'creator' ? '🎨 Creator' : '🏢 Brand'}
                </button>
              ))}
            </div>
          )}

          {/* API Error */}
          {apiError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {mode === 'register' && (
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#999] mb-2">
                  Username
                </label>
                <input
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="your_handle"
                  className={inputClass('username')}
                />
                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#999] mb-2">
                Email
              </label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={inputClass('email')}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#999] mb-2">
                Password
              </label>
              <input
                name="password"
                type="password"
                autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 8 characters"
                className={inputClass('password')}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-4 font-bold text-xs uppercase tracking-[0.2em] hover:bg-black/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {loading
                ? <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {mode === 'register' ? 'Creating account...' : 'Signing in...'}
                  </span>
                : mode === 'register' ? 'Create Account' : 'Sign In'
              }
            </button>
          </form>

          <p className="text-center text-sm text-[#999] mt-8">
            {mode === 'register' ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button onClick={switchMode} className="text-black font-bold hover:underline">
              {mode === 'register' ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </motion.div>
      </div>
    </>
  );
}
