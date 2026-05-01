import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X, Upload, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { to: '/explore', label: 'Explore' },
  { to: '/creators', label: 'Creators' },
  { to: '/brands', label: 'Brands' },
  { to: '/pricing', label: 'Pricing' },
];

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  const linkClass = ({ isActive }) =>
    `text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${isActive ? 'text-[var(--color-brand-accent)]' : 'text-[var(--color-brand-body)] opacity-60 hover:opacity-100 hover:text-[var(--color-brand-accent)]'
    }`;

  return (
    <nav className="border-b border-[var(--color-brand-border)]/10 bg-[var(--color-brand-bg)]/80 backdrop-blur-md sticky top-0 z-[100]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="font-heading font-bold text-2xl tracking-tighter text-[var(--color-brand-accent)] hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-[var(--color-brand-accent)] hover:to-[var(--color-brand-label)] transition-colors uppercase">
            Driplens
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(l => (
              <NavLink key={l.to} to={l.to} className={linkClass}>{l.label}</NavLink>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {user?.role === 'creator' && (
                  <Link to="/upload" className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-brand-body)] opacity-60 hover:opacity-100 hover:text-[var(--color-brand-accent)] transition-colors flex items-center gap-1.5">
                    <Upload size={13} /> Upload
                  </Link>
                )}
                  <Link
                    to={`/dashboard/${user?.role}`}
                    className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-brand-body)] opacity-60 hover:opacity-100 hover:text-[var(--color-brand-accent)] transition-colors flex items-center gap-1.5"
                  >
                    <LayoutDashboard size={13} /> Dashboard
                  </Link>
                <Link to="/messages" className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-brand-body)] opacity-60 hover:opacity-100 hover:text-[var(--color-brand-accent)] transition-colors">
                  Messages
                </Link>
                <div className="h-4 w-px bg-black/10 mx-1" />
                {/* User Avatar + Name */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[var(--color-brand-accent)] text-white rounded-full flex items-center justify-center text-xs font-bold uppercase">
                    {user?.username?.[0] || user?.email?.[0]}
                  </div>
                  <span className="text-xs font-bold text-[var(--color-brand-headings)] hidden lg:block">{user?.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#999] hover:text-black transition-colors flex items-center gap-1"
                >
                  <LogOut size={13} />
                </button>
              </>
            ) : (
              <>
                <Link to="/auth" className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-brand-headings)] hover:text-[var(--color-brand-accent)] transition-colors">
                  Log in
                </Link>
                <Link to="/auth?mode=register" className="btn-primary py-2.5 px-6">
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-black/5 bg-white px-4 py-6 space-y-4">
          {navLinks.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block text-sm font-bold uppercase tracking-widest py-2 ${isActive ? 'text-black' : 'text-[#999]'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <div className="border-t border-[#E5E5E5] pt-4 space-y-3">
            {isLoggedIn ? (
              <>
                <Link to={`/dashboard/${user?.role}`} onClick={() => setMobileOpen(false)} className="block text-sm font-bold uppercase tracking-widest py-2 text-[#999]">Dashboard</Link>
                <Link to="/messages" onClick={() => setMobileOpen(false)} className="block text-sm font-bold uppercase tracking-widest py-2 text-[#999]">Messages</Link>
                {user?.role === 'creator' && (
                  <Link to="/upload" onClick={() => setMobileOpen(false)} className="block text-sm font-bold uppercase tracking-widest py-2 text-[#999]">Upload</Link>
                )}
                <button onClick={handleLogout} className="block w-full text-left text-sm font-bold uppercase tracking-widest py-2 text-red-500">
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link to="/auth" onClick={() => setMobileOpen(false)} className="block btn-secondary w-full text-center py-3">Log in</Link>
                <Link to="/auth?mode=register" onClick={() => setMobileOpen(false)} className="block btn-primary w-full text-center py-3">Sign up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
