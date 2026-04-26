import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';

function StatCard({ label, value, loading }) {
  return (
    <div className="driplens-card p-6 border-l-4 border-l-black">
      <p className="text-[#999] text-xs font-bold uppercase tracking-wider mb-2">{label}</p>
      {loading
        ? <div className="h-10 w-24 bg-gray-100 animate-pulse rounded" />
        : <h2 className="text-4xl font-bold text-black">{value}</h2>
      }
    </div>
  );
}

export default function CreatorDashboard() {
  const { user } = useAuth();
  const [requests, setRequests]   = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    
    const load = async () => {
      try {
        const [hiringData, uploadData] = await Promise.all([
          api.get('/hiring'),
          api.get(`/upload?limit=10&creator_id=${user.id}`)
        ]);
        setRequests(hiringData.data.requests || []);
        setPortfolio(uploadData.data.items || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user?.id]);
 
   const socket = useSocket();
 
   useEffect(() => {
     if (!socket) return;
 
     const handleHiringUpdate = (updatedReq) => {
       setRequests(prev => {
         const exists = prev.find(r => r.id === updatedReq.id);
         if (exists) {
           return prev.map(r => r.id === updatedReq.id ? updatedReq : r);
         }
         return [updatedReq, ...prev];
       });
     };
 
     socket.on('hiring_update', handleHiringUpdate);
     return () => socket.off('hiring_update', handleHiringUpdate);
   }, [socket]);

  const pendingRequests = requests.filter(r => r.status === 'Pending');
  const accepted = requests.filter(r => r.status === 'Accepted' || r.status === 'Completed');

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/hiring/${id}/status`, { status });
      setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Creator Dashboard — Driplens</title>
        <meta name="description" content="Creator Dashboard on Driplens" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-black mb-1">
              Welcome back, {user?.display_name || user?.username}
            </h1>
            <p className="text-[#555] mb-8 text-sm">Here's what's happening with your profile.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              to="/messages" 
              className="btn-secondary text-xs py-2 px-4 border border-black rounded-[8px] hover:bg-gray-50 font-bold"
            >
              ✉ Messages
            </Link>
            <Link 
              to="/edit-profile" 
              className="btn-primary text-xs py-2 px-4"
            >
              ✎ Edit Profile
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatCard label="Portfolio Items" value={portfolio.length} loading={loading} />
          <StatCard label="Pending Inquiries" value={pendingRequests.length} loading={loading} />
          <StatCard label="Active Projects" value={accepted.length} loading={loading} />
          <StatCard label="Audience Tier" value={user?.audience_tier || 'Nano'} loading={loading} />
        </div>

        {/* Profile Overview (Added Onboarding Data) */}
        <div className="driplens-card p-10 mb-12 bg-black text-white border-none relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
          
          <div className="relative flex flex-col lg:flex-row gap-10 items-start">
            <div className="w-32 h-32 rounded-none border-2 border-white/20 overflow-hidden flex-shrink-0 bg-gray-900 group">
              {user?.avatar_url ? (
                <img src={user.avatar_url} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl font-black">{user?.username?.[0]}</div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-4 mb-3">
                <h2 className="text-4xl font-black uppercase tracking-tighter">{user?.display_name || user?.username}</h2>
                <div className="flex gap-2">
                  {(user?.category?.split(',') || []).map(cat => (
                    <span key={cat} className="bg-white text-black text-[9px] font-black px-2 py-0.5 uppercase tracking-widest leading-none flex items-center">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
              
              <p className="text-gray-400 font-bold mb-4 text-xs uppercase tracking-[0.2em]">{user?.tagline || 'Visual Storyteller'}</p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {user?.tags?.map(tag => (
                  <span key={tag} className="text-[10px] border border-white/10 px-2 py-1 text-gray-400 uppercase tracking-widest">#{tag}</span>
                ))}
              </div>

              <p className="text-gray-300 max-w-3xl text-sm leading-relaxed mb-10 font-light italic">
                "{user?.bio || 'Professional creative production and high-impact visual storytelling.'}"
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-8">
                <div>
                  <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] mb-2">Budget Range</p>
                  <p className="text-base font-bold">${user?.min_budget?.toLocaleString() || 0} — ${user?.max_budget?.toLocaleString() || '10k'}+</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] mb-2">Base Location</p>
                  <p className="text-base font-bold">{user?.location || 'Remote'}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] mb-2">Total Reach</p>
                  <p className="text-base font-bold">{user?.follower_count?.toLocaleString() || 0} <span className="text-[10px] text-gray-500">AVG</span></p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] mb-2">Availability</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 ${user?.is_available ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                    <p className="text-base font-bold">{user?.is_available ? 'Open to Work' : 'Booked'}</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 mt-8">
                {user?.platforms?.map(p => (
                  <a 
                    key={p} 
                    href={user?.platform_urls?.[p] || '#'} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-[10px] font-black text-white hover:text-gray-400 transition-colors uppercase tracking-widest border-b border-white pb-1"
                  >
                    {p}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Portfolio */}
          <div className="lg:col-span-2 space-y-8">
            <div className="driplens-card p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-black">Portfolio</h2>
                <Link to="/upload" className="btn-primary text-xs py-2 px-4">+ Add Work</Link>
              </div>
              {loading ? (
                <div className="space-y-4">
                  {[1,2,3].map(i => <div key={i} className="h-16 bg-gray-50 animate-pulse rounded" />)}
                </div>
              ) : portfolio.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-[#999] text-sm mb-4">No work uploaded yet.</p>
                  <Link to="/upload" className="btn-primary text-xs py-2 px-6">Upload Your First Project</Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {portfolio.map(item => (
                    <div key={item.id} className="py-4 flex items-center gap-4">
                      {item.media_type === 'image'
                        ? <img src={item.media_url} alt={item.title} className="h-12 w-16 object-cover bg-gray-100 rounded" />
                        : <div className="h-12 w-16 bg-gray-900 rounded flex items-center justify-center text-white text-xs">▶</div>
                      }
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-black text-sm truncate">{item.title}</p>
                        <p className="text-xs text-[#999]">{item.category} • {new Date(item.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Inquiries Sidebar */}
          <div className="space-y-6">
            <div className="driplens-card p-6">
              <h2 className="text-xl font-bold text-black mb-5">Inquiries</h2>
              {loading ? (
                <div className="space-y-3">
                  {[1,2].map(i => <div key={i} className="h-24 bg-gray-50 animate-pulse rounded" />)}
                </div>
              ) : pendingRequests.length === 0 ? (
                <p className="text-sm text-[#999]">No pending inquiries.</p>
              ) : (
                <div className="space-y-4">
                  {pendingRequests.map(r => (
                    <div key={r.id} className="border border-[#E5E5E5] p-4">
                      <div className="flex justify-between mb-1">
                        <p className="font-bold text-black text-sm">{r.project_title}</p>
                        <p className="font-bold text-green-600 text-sm">${r.budget?.toLocaleString()}</p>
                      </div>
                      <p className="text-xs text-[#999] mb-1">from {r.brand?.username}</p>
                      <p className="text-xs text-[#555] mb-3 line-clamp-2">{r.project_description}</p>
                      <div className="flex gap-2">
                        <button onClick={() => updateStatus(r.id, 'Accepted')} className="flex-1 btn-primary py-1.5 text-xs">Accept</button>
                        <button onClick={() => updateStatus(r.id, 'Declined')} className="flex-1 btn-secondary py-1.5 text-xs">Decline</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link to="/messages" className="block driplens-card p-4 text-center text-sm font-bold text-black hover:bg-black hover:text-white transition-all">
              View All Messages →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
