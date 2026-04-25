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
    const load = async () => {
      try {
        const [hiringData, uploadData] = await Promise.all([
          api.get('/hiring'),
          api.get('/upload?limit=10')
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
  }, []);
 
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
              Welcome back, {user?.username} 👋
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard label="Portfolio Items" value={portfolio.length} loading={loading} />
          <StatCard label="Pending Inquiries" value={pendingRequests.length} loading={loading} />
          <StatCard label="Active Projects" value={accepted.length} loading={loading} />
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
