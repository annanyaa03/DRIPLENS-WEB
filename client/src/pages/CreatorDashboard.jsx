import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Zap, 
  MessageSquare, 
  User, 
  Plus, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Layout,
  BarChart3,
  ArrowUpRight,
  Briefcase,
  PlayCircle
} from 'lucide-react';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';

// ─── StatCard ────────────────────────────────────────────────────────────────
function StatCard({ label, value, loading, icon: Icon }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-[#EEEEEE] p-6 relative overflow-hidden group"
    >
      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-[#AAAAAA] text-[9px] font-bold uppercase tracking-[0.4em] mb-2">{label}</p>
          {loading ? (
            <div className="h-10 w-24 bg-[#F5F5F5] animate-pulse" />
          ) : (
            <h2 className="text-4xl font-bold text-black tracking-tighter">{value}</h2>
          )}
        </div>
        <div className="p-2 bg-[#FAFAFA] border border-[#EEEEEE] group-hover:border-black transition-colors">
          <Icon className="w-4 h-4 text-[#AAAAAA] group-hover:text-black transition-colors" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-black selection:text-white antialiased">
      <Helmet>
        <title>Dashboard — {user?.username}</title>
      </Helmet>

      {/* ── Top Bar Navigation ── */}
      <div className="border-b border-[#F5F5F5] sticky top-0 z-50 bg-white/80 backdrop-blur-xl">
        <div className="max-w-[1600px] mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="w-2 h-2 bg-black rounded-full" />
             <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-black">Console v1.0</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/messages" className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-[#AAAAAA] hover:text-black transition-colors">
              <MessageSquare className="w-3.5 h-3.5" /> Messages
            </Link>
            <Link to="/edit-profile" className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-[#AAAAAA] hover:text-black transition-colors">
              <User className="w-3.5 h-3.5" /> Profile
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 py-12">
        
        {/* ── Header Section ── */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="px-3 py-1 border border-black text-[9px] font-bold uppercase tracking-[0.4em]">Creator Account</div>
            <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#AAAAAA]">Session Active</div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
            Welcome back, <br />
            <span className="text-[#DDDDDD]">{user?.username}</span>
          </h1>
          <p className="text-[#666666] text-sm font-light leading-relaxed max-w-md">
            Monitor your project pipeline, update your portfolio, and engage with top brands in real-time.
          </p>
        </motion.div>

        {/* ── Stats Grid ── */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-1 mb-16"
        >
          <StatCard label="Portfolio Assets" value={portfolio.length} loading={loading} icon={Layout} />
          <StatCard label="Pending Inquiries" value={pendingRequests.length} loading={loading} icon={Clock} />
          <StatCard label="Active Projects" value={accepted.length} loading={loading} icon={Briefcase} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          
          {/* ── Portfolio Section ── */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8 border-b border-[#F5F5F5] pb-6">
              <h2 className="text-[10px] uppercase tracking-[0.5em] font-black">Digital Portfolio</h2>
              <Link to="/upload" className="text-[9px] font-bold uppercase tracking-widest border border-black bg-black text-white px-6 py-2.5 hover:bg-[#222222] transition-all flex items-center gap-2">
                <Plus className="w-3.5 h-3.5" /> Add Work
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="aspect-video bg-[#FAFAFA] animate-pulse" />
                ))}
              </div>
            ) : portfolio.length === 0 ? (
              <div className="border border-dashed border-[#EEEEEE] py-20 text-center">
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#AAAAAA] mb-4">No assets uploaded</p>
                <Link to="/upload" className="text-[9px] font-bold uppercase tracking-widest border border-[#EEEEEE] px-6 py-3 hover:border-black transition-all inline-block">Initialize Portfolio</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                {portfolio.map(item => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="group border border-[#F5F5F5] bg-white p-6 hover:border-black hover:shadow-xl transition-all duration-500 relative overflow-hidden"
                  >
                    <div className="aspect-video relative overflow-hidden bg-[#FAFAFA] mb-6">
                      {item.media_type === 'image' ? (
                        <img src={item.media_url} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#111111] group-hover:bg-black transition-colors">
                          <PlayCircle className="w-8 h-8 text-white/20 group-hover:text-white transition-colors" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold tracking-tight mb-1 truncate">{item.title}</h3>
                      <div className="flex justify-between items-center">
                        <p className="text-[9px] uppercase tracking-widest font-bold text-[#AAAAAA]">{item.category}</p>
                        <p className="text-[8px] uppercase tracking-widest text-[#CCCCCC]">{new Date(item.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-transparent group-hover:border-black transition-all duration-500" />
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* ── Inquiries Sidebar ── */}
          <div className="lg:col-span-1 space-y-12">
            <div>
              <div className="flex items-center justify-between mb-8 border-b border-[#F5F5F5] pb-6">
                <h2 className="text-[10px] uppercase tracking-[0.5em] font-black">Inquiries</h2>
                <span className="text-[9px] uppercase tracking-widest font-bold text-[#AAAAAA]">{pendingRequests.length} Pending</span>
              </div>

              {loading ? (
                <div className="space-y-1">
                  {[1, 2].map(i => (
                    <div key={i} className="h-32 bg-[#FAFAFA] animate-pulse" />
                  ))}
                </div>
              ) : pendingRequests.length === 0 ? (
                <div className="p-12 border border-dashed border-[#EEEEEE] text-center">
                   <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#AAAAAA]">Queue is empty</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {pendingRequests.map(r => (
                    <motion.div 
                      key={r.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="border border-[#F5F5F5] p-6 bg-white hover:border-black transition-all duration-500 group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-sm font-bold tracking-tight mb-1">{r.project_title}</h3>
                          <p className="text-[9px] uppercase tracking-widest font-bold text-[#AAAAAA]">from {r.brand?.username}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-black text-black">${r.budget?.toLocaleString()}</div>
                          <div className="text-[8px] uppercase tracking-widest text-[#AAAAAA]">Offer</div>
                        </div>
                      </div>
                      <p className="text-[10px] text-[#666666] leading-relaxed mb-6 line-clamp-2 italic font-light border-l border-[#EEEEEE] pl-4">
                        "{r.project_description}"
                      </p>
                      <div className="flex gap-1">
                        <button 
                          onClick={() => updateStatus(r.id, 'Accepted')} 
                          className="flex-1 bg-black text-white py-3 text-[9px] font-bold uppercase tracking-widest hover:bg-[#222222] transition-colors"
                        >
                          Accept
                        </button>
                        <button 
                          onClick={() => updateStatus(r.id, 'Declined')} 
                          className="flex-1 border border-[#EEEEEE] text-black py-3 text-[9px] font-bold uppercase tracking-widest hover:border-black transition-colors"
                        >
                          Decline
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/messages"
              className="group border border-[#EEEEEE] p-8 flex items-center justify-between hover:border-black transition-all"
            >
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] mb-1">Encrypted Comms</h3>
                <p className="text-[8px] text-[#AAAAAA] uppercase tracking-widest font-bold">Access all active threads</p>
              </div>
              <div className="p-3 bg-[#FAFAFA] border border-[#EEEEEE] group-hover:border-black transition-colors">
                 <MessageSquare className="w-4 h-4 text-[#AAAAAA] group-hover:text-black transition-colors" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
