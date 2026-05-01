import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { useOnboarding } from '../context/OnboardingContext';
import './agency.css';
 
export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const navigate  = useNavigate();
  const location  = useLocation();
  const { login, register, isLoggedIn, user } = useAuth();
  const { update: updateOnboarding } = useOnboarding();
 
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  const initialRole = searchParams.get('role') === 'brand' ? 'brand' : 'creator';
 
  const [mode, setMode]     = useState(initialMode);
  const [role, setRole]     = useState(initialRole);
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    password: '',
    display_name: '',
    tagline: ''
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading]   = useState(false);
 
  useEffect(() => {
    if (isLoggedIn && user) {
      if (user.role === 'creator' && !user.onboarding_complete) {
        navigate('/onboarding/step-1', { replace: true });
      } else {
        const from = location.state?.from?.pathname || `/dashboard/${user.role}`;
        navigate(from, { replace: true });
      }
    }
  }, [isLoggedIn, user, navigate, location.state]);
 
  useEffect(() => {
    setMode(searchParams.get('mode') === 'register' ? 'register' : 'login');
    if (searchParams.get('role')) setRole(searchParams.get('role'));
  }, [searchParams]);
 
  const validate = () => {
    const e = {};
    if (mode === 'register') {
      if (!formData.username.trim()) e.username = 'Username is required';
      if (!formData.display_name.trim()) e.display_name = 'Display name is required';
    }
    if (!formData.email.trim()) e.email = 'Email/Username is required';
    if (formData.password.length < 8) e.password = 'Min 8 characters';
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
        await register(formData.username, formData.email, formData.password, role, {
          display_name: formData.display_name,
          tagline: formData.tagline
        });
        // Sync to onboarding draft
        updateOnboarding({
          display_name: formData.display_name,
          tagline: formData.tagline
        });
      } else {
        await login(formData.email, formData.password);
      }
    } catch (err) {
      setApiError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="agency-auth-page">
      <Helmet>
        <title>{mode === 'register' ? 'Join' : 'Sign In'} — Driplens</title>
      </Helmet>
 
      <div className="auth-left">
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 900, fontSize: '1.2rem' }}>DRIPLENS</Link>
        <div>
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1>{mode === 'register' ? 'JOIN THE' : 'BACK TO'}</h1>
            <h1 className="outline-text" style={{ WebkitTextStroke: '2px white' }}>MOVEMENT</h1>
          </motion.div>
        </div>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px' }}>
          THE PROFESSIONAL MERITOCRACY
        </div>
      </div>
 
      <div className="auth-right">
        <motion.div 
          className="auth-form-wrapper"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2>{mode === 'register' ? 'CREATE ACCOUNT' : 'WELCOME BACK'}</h2>
          
          <div className="auth-tabs">
            <button className={`auth-tab ${mode === 'login' ? 'active' : ''}`} onClick={() => setMode('login')}>LOGIN</button>
            <button className={`auth-tab ${mode === 'register' ? 'active' : ''}`} onClick={() => setMode('register')}>REGISTER</button>
          </div>
 
          {apiError && <div style={{ color: 'red', fontWeight: 700, marginBottom: '1rem', fontSize: '0.8rem' }}>{apiError}</div>}
 
          <form onSubmit={handleSubmit}>
            {mode === 'register' && (
              <div className="agency-form-group">
                <label>USERNAME</label>
                <input 
                  name="username" 
                  value={formData.username} 
                  onChange={handleChange} 
                  className="agency-input" 
                  placeholder="handle"
                />
                {errors.username && <span style={{ color: 'red', fontSize: '10px' }}>{errors.username}</span>}
              </div>
            )}
 
            <div className="agency-form-group">
              <label>EMAIL / USERNAME</label>
              <input 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className="agency-input" 
                placeholder="you@example.com"
              />
              {errors.email && <span style={{ color: 'red', fontSize: '10px' }}>{errors.email}</span>}
            </div>

            {mode === 'register' && (
              <>
                <div className="agency-form-group">
                  <label>{role === 'creator' ? 'DISPLAY NAME' : 'BRAND NAME'}</label>
                  <input 
                    name="display_name" 
                    value={formData.display_name} 
                    onChange={handleChange} 
                    className="agency-input" 
                    placeholder={role === 'creator' ? 'Your Public Name' : 'Company Name'}
                  />
                  {errors.display_name && <span style={{ color: 'red', fontSize: '10px' }}>{errors.display_name}</span>}
                </div>

                <div className="agency-form-group">
                  <label>{role === 'creator' ? 'TAGLINE' : 'BRAND SLOGAN'}</label>
                  <input 
                    name="tagline" 
                    value={formData.tagline} 
                    onChange={handleChange} 
                    className="agency-input" 
                    placeholder={role === 'creator' ? 'Briefly describe what you do' : 'Our Brand Vision'}
                  />
                </div>
              </>
            )}
 
            <div className="agency-form-group">
              <label>PASSWORD</label>
              <input 
                name="password" 
                type="password" 
                value={formData.password} 
                onChange={handleChange} 
                className="agency-input" 
                placeholder="********"
              />
              {errors.password && <span style={{ color: 'red', fontSize: '10px' }}>{errors.password}</span>}
            </div>
 
            {mode === 'register' && (
              <div className="agency-form-group">
                <label>I AM A</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                   <button 
                    type="button" 
                    className="agency-btn-book"
                    onClick={() => setRole('creator')}
                    style={{ flex: 1, backgroundColor: role === 'creator' ? '#0044ff' : 'white', color: role === 'creator' ? 'white' : 'black' }}
                   >CREATOR</button>
                   <button 
                    type="button" 
                    className="agency-btn-book"
                    onClick={() => setRole('brand')}
                    style={{ flex: 1, backgroundColor: role === 'brand' ? '#0044ff' : 'white', color: role === 'brand' ? 'white' : 'black' }}
                   >BRAND</button>
                </div>
              </div>
            )}
 
            <button className="agency-btn-submit" disabled={loading} type="submit">
              {loading ? 'PROCESSING...' : (mode === 'register' ? 'JOIN NOW' : 'SIGN IN')}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

