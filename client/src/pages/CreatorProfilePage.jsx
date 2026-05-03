import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../lib/api';

const DEMO_CREATOR = {
  id: 'demo',
  name: 'Atharv Gadekar',
  username: 'atharvagadekar2906',
  role: 'Creative Director & Cinematographer',
  location: 'Mumbai / Global',
  img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop',
  qualifications: ['Advanced Color Grading', 'Certified Drone Operator', '10+ Years Industry Exp.'],
  pastWork: ['Nike', 'Sony', 'RedBull'],
  brandDeals: ['Nike', 'Sony', 'RedBull', 'Apple'],
  workflow: [
    { step: 'Discovery', description: 'Deep dive into brand guidelines and visual identity.' },
    { step: 'Pre-Production', description: 'Storyboarding, scouting, and preparation.' },
    { step: 'Production', description: 'On-set execution with top-tier equipment.' },
    { step: 'Post & Delivery', description: 'Color grading and final rendering.' }
  ],
  portfolio_items: [
    { id: 1, title: 'Mandai', type: 'Cinematography', img: 'https://images.unsplash.com/photo-1518131672697-613becd4fab5?w=500&auto=format&fit=crop' },
    { id: 2, title: 'Ethnicity', type: 'Direction', img: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=500&auto=format&fit=crop' },
    { id: 3, title: 'Urban Flow', type: 'Photography', img: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=500&auto=format&fit=crop' },
  ],
  packages: [
    {
      title: "Social / Lifestyle",
      price: "₹5,000-₹12,000",
      subtitle: "Perfect for personal branding & short reels",
      features: [
        "2-4 hours shoot time",
        "Professional lighting setup",
        "Basic color grading",
        "2-3 edited short videos",
        "Optimized for Instagram/TikTok",
        "Web-ready delivery"
      ]
    },
    {
      title: "Event Coverage",
      price: "₹15,000-₹25,000",
      subtitle: "Best choice for corporate events & parties",
      features: [
        "6-8 hours event coverage",
        "Dual camera setup for backup",
        "Candid + staged shots",
        "Advanced color correction",
        "1-3 minute highlight reel",
        "Raw footage available"
      ],
      popular: true
    },
    {
      title: "Commercial Film",
      price: "₹35,000-₹80,000+",
      subtitle: "High-end visuals for brands & businesses",
      features: [
        "Full-day shoot (10-12 hours)",
        "Pre-production & storyboarding",
        "Cinema-grade RED/ARRI cameras",
        "Professional crew & sound design",
        "Cinematic color grading",
        "Multiple export formats"
      ]
    }
  ]
};

export default function CreatorProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [error, setError] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [showPricing, setShowPricing] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (id === 'demo') {
        setCreator(DEMO_CREATOR);
        window.scrollTo(0, 0);
        return;
      }
      try {
        const data = await api.get(`/creators/${id}`);
        if (data?.data?.creator) {
          setCreator(data.data.creator);
        } else {
          setError('Creator not found');
        }
      } catch (err) {
        setError(err.message || 'Failed to load creator profile');
      }
    };
    load();
    window.scrollTo(0, 0);
  }, [id]);

  if (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-6">
        <h2 className="text-3xl font-bold">{error}</h2>
        <Link to="/creators" className="btn-primary py-3 px-8">Back to Creators</Link>
      </div>
    );
  }

  if (!creator) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-20 font-poppins">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img 
          src={creator.img} 
          alt="Banner" 
          className="w-full h-full object-cover brightness-50 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#FAFAFA]"></div>
        
        <Link to="/explore" className="absolute top-8 left-8 z-20 flex items-center gap-2 text-white/80 hover:text-white transition-colors">
          <span className="text-xl">←</span> Back to Explore
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Wing: Profile & Quick Info */}
          <div className="lg:w-1/3">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-none p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white"
            >
              <div className="relative -mt-20 mb-6 flex justify-center lg:justify-start">
                <div className="h-32 w-32 md:h-40 md:w-40 rounded-none bg-white p-2 shadow-2xl overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img src={creator.img} alt={creator.name} className="w-full h-full object-cover rounded-none" />
                </div>
              </div>

              <div className="text-center lg:text-left mb-8">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-1">
                  <h1 className="text-3xl font-bold text-black tracking-tight">{creator.name}</h1>
                  <span className="bg-black text-[10px] text-white px-2 py-1 rounded-none font-bold uppercase tracking-wider">Verified</span>
                </div>
                <p className="text-[#888] font-medium text-lg uppercase tracking-wide text-xs">{creator.role} • {creator.location}</p>
              </div>

              <div className="flex gap-3 mb-10">
                <Link to={`/dm/${creator.id}`} target="_blank" rel="noopener noreferrer" className="flex-1 border border-zinc-200 text-black py-4 rounded-none font-bold text-sm text-center hover:bg-zinc-50 transition-all flex items-center justify-center">
                  Message
                </Link>
                <button 
                  onClick={() => setShowPricing(true)}
                  className="flex-1 bg-black text-white py-4 rounded-none font-bold text-sm hover:bg-zinc-800 transition-all shadow-[0_4px_14px_rgba(0,0,0,0.1)]"
                >
                  Hire
                </button>
                <button className="px-5 py-4 rounded-none border border-zinc-200 hover:bg-zinc-50 transition-all text-lg flex items-center justify-center">
                  ★
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-[11px] font-bold text-[#BBB] uppercase tracking-[0.2em] mb-4">Qualification</h3>
                  <ul className="space-y-3">
                    {creator.qualifications.map((q, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-zinc-600">
                        <span className="h-1.5 w-1.5 bg-black rounded-none" />
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-zinc-100">
                  <h3 className="text-[11px] font-bold text-[#BBB] uppercase tracking-[0.2em] mb-4">Past Work</h3>
                  <div className="flex flex-wrap gap-2">
                    {creator.pastWork.map((pw, i) => (
                      <span key={i} className="bg-zinc-100 text-zinc-600 px-3 py-1.5 rounded-none text-[10px] font-bold uppercase">
                        {pw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Brand Deals Wing */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-zinc-900 rounded-none p-8 mt-8 text-white"
            >
               <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-6">Trusted By</h3>
               <div className="grid grid-cols-2 gap-4">
                  {creator.brandDeals.map((brand, i) => (
                    <div key={i} className="bg-zinc-800/50 rounded-none p-4 flex items-center justify-center text-sm font-bold text-zinc-400 hover:text-white transition-colors border border-zinc-800">
                      {brand}
                    </div>
                  ))}
               </div>
            </motion.div>
          </div>

          {/* Right Wing: Main Content */}
          <div className="lg:w-2/3 space-y-12">
            
            {/* Workflow Section */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-8 flex items-center gap-4">
                Stable Workflow 
                <span className="h-[1px] flex-1 bg-zinc-200" />
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {creator.workflow.map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -5 }}
                    className="bg-white p-6 rounded-none border border-zinc-100 shadow-sm relative overflow-hidden"
                  >
                    <div className="absolute -right-4 -top-4 text-zinc-50 text-6xl font-black">{i + 1}</div>
                    <div className="relative z-10">
                      <p className="text-[10px] font-bold text-black uppercase tracking-widest mb-2">{item.step}</p>
                      <p className="text-sm text-zinc-500 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Portfolio Grid */}
            <section>
              <div className="flex justify-between items-end mb-8">
                <h2 className="text-2xl font-bold text-black flex items-center gap-4 flex-1">
                  Portfolio 
                  <span className="h-[1px] flex-1 bg-zinc-200" />
                </h2>
                <div className="flex gap-4 ml-6">
                   {['All', 'Video', 'Photos'].map(f => (
                     <button key={f} className={`text-[10px] font-bold uppercase tracking-widest ${f === 'All' ? 'text-black border-b-2 border-black pb-1' : 'text-[#888]'}`}>
                       {f}
                     </button>
                   ))}
                </div>
              </div>
              
              <div className="columns-1 md:columns-2 gap-6 space-y-6">
                {(creator.portfolio_items || []).map((item, i) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * i }}
                    onClick={() => setSelectedMedia(item)}
                    className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-none bg-zinc-100"
                  >
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 p-6 flex flex-col justify-end">
                      <p className="text-white font-bold text-xl mb-1">{item.title}</p>
                      <p className="text-white/60 text-xs uppercase tracking-widest">{item.type}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-xl"
            onClick={() => setSelectedMedia(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-6xl w-full aspect-video bg-zinc-900 rounded-none overflow-hidden relative shadow-2xl border border-zinc-800" 
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedMedia(null)}
                className="absolute top-8 right-8 text-white p-3 z-10 bg-black/50 backdrop-blur-md rounded-none hover:bg-black transition-all border border-white/10"
              >
                ✕
              </button>
              <img src={selectedMedia.img} alt={selectedMedia.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-12 bg-gradient-to-t from-black via-transparent to-transparent">
                  <h2 className="text-4xl font-bold text-white mb-2">{selectedMedia.title}</h2>
                  <p className="text-white/60 uppercase tracking-widest text-sm">{selectedMedia.type}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pricing Modal */}
      <AnimatePresence>
        {showPricing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md font-poppins"
            onClick={() => setShowPricing(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="max-w-5xl w-full my-auto bg-[#0a0a0a] rounded-3xl overflow-hidden relative shadow-2xl p-6 md:p-8 max-h-[95vh] flex flex-col" 
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8 shrink-0">
                <button 
                  onClick={() => setShowPricing(false)}
                  className="text-white/70 text-[10px] font-bold tracking-widest uppercase hover:text-white flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 transition-all hover:bg-white/10"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  Back
                </button>
                <h2 className="text-xl md:text-2xl font-bold text-white text-center absolute left-1/2 -translate-x-1/2 tracking-wide">Photography</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 overflow-y-auto pb-2 custom-scrollbar pt-2">
                {(creator.packages || []).map((pkg, i) => (
                  <div key={i} className={`rounded-2xl p-6 md:p-8 flex flex-col relative ${pkg.popular ? 'bg-white text-black scale-[1.02] shadow-2xl z-10' : 'bg-[#111] border border-white/5 text-white'}`}>
                    {pkg.popular && (
                      <span className="absolute top-4 right-4 md:top-6 md:right-6 bg-[#2a2a2a] text-[#fcd53f] text-[9px] font-bold px-3 py-1 uppercase tracking-widest rounded-full flex items-center gap-1.5 shadow-lg z-20">
                        <span>★</span> Popular
                      </span>
                    )}
                    <div className="mb-6 relative">
                      <p className={`text-[10px] tracking-[0.2em] uppercase font-bold mb-3 ${pkg.popular ? 'text-gray-500' : 'text-gray-400'}`}>{pkg.title}</p>
                      <h3 className={`text-3xl md:text-4xl font-black mb-3 tracking-tighter leading-none ${pkg.popular ? 'text-black' : 'text-white'}`}>{pkg.price}</h3>
                      <p className={`text-xs ${pkg.popular ? 'text-gray-600' : 'text-gray-400'}`}>{pkg.subtitle}</p>
                    </div>
                    
                    <ul className="space-y-3 mb-6 flex-1">
                      {pkg.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-3 text-xs font-medium">
                          <div className={`mt-0.5 shrink-0 ${pkg.popular ? 'text-black' : 'text-gray-400'}`}>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                          </div>
                          <span className={pkg.popular ? 'text-gray-800' : 'text-gray-300'}>{f}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button 
                      onClick={() => navigate('/checkout', { state: { pkg, creator } })}
                      className={`w-full py-3 font-bold uppercase tracking-widest text-[10px] rounded-full transition-all mt-auto ${pkg.popular ? 'bg-black text-white hover:bg-gray-800' : 'bg-white/10 text-white hover:bg-white/20'}`}
                    >
                      Select Package
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
