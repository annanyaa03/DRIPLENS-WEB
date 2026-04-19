import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../lib/api';
export default function CreatorProfilePage() {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.get(`/creators/${id}`);
        setCreator(data.data.creator);
      } catch {
        setCreator(null); // show not found
      }
    };
    load();
    window.scrollTo(0, 0);
  }, [id]);

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
              className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white"
            >
              <div className="relative -mt-20 mb-6 flex justify-center lg:justify-start">
                <div className="h-32 w-32 md:h-40 md:w-40 rounded-3xl bg-white p-2 shadow-2xl overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img src={creator.img} alt={creator.name} className="w-full h-full object-cover rounded-2xl" />
                </div>
              </div>

              <div className="text-center lg:text-left mb-8">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-1">
                  <h1 className="text-3xl font-bold text-black tracking-tight">{creator.name}</h1>
                  <span className="bg-black text-[10px] text-white px-2 py-1 rounded-full font-bold uppercase tracking-wider">Verified</span>
                </div>
                <p className="text-[#888] font-medium text-lg uppercase tracking-wide text-xs">{creator.role} • {creator.location}</p>
              </div>

              <div className="flex gap-4 mb-10">
                <button className="flex-1 bg-black text-white py-4 rounded-2xl font-bold text-sm hover:bg-zinc-800 transition-all shadow-xl shadow-black/10">
                  Hire Creator
                </button>
                <button className="p-4 rounded-2xl border border-zinc-200 hover:bg-zinc-50 transition-all">
                  ★
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-[11px] font-bold text-[#BBB] uppercase tracking-[0.2em] mb-4">Qualification</h3>
                  <ul className="space-y-3">
                    {creator.qualifications.map((q, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-zinc-600">
                        <span className="h-1.5 w-1.5 bg-black rounded-full" />
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-zinc-100">
                  <h3 className="text-[11px] font-bold text-[#BBB] uppercase tracking-[0.2em] mb-4">Past Work</h3>
                  <div className="flex flex-wrap gap-2">
                    {creator.pastWork.map((pw, i) => (
                      <span key={i} className="bg-zinc-100 text-zinc-600 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase">
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
              className="bg-zinc-900 rounded-3xl p-8 mt-8 text-white"
            >
               <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-6">Trusted By</h3>
               <div className="grid grid-cols-2 gap-4">
                  {creator.brandDeals.map((brand, i) => (
                    <div key={i} className="bg-zinc-800/50 rounded-xl p-4 flex items-center justify-center text-sm font-bold text-zinc-400 hover:text-white transition-colors border border-zinc-800">
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
                    className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm relative overflow-hidden"
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
                    className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-3xl bg-zinc-100"
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
              className="max-w-6xl w-full aspect-video bg-zinc-900 rounded-[32px] overflow-hidden relative shadow-2xl border border-zinc-800" 
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedMedia(null)}
                className="absolute top-8 right-8 text-white p-3 z-10 bg-black/50 backdrop-blur-md rounded-full hover:bg-black transition-all border border-white/10"
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
    </div>
  );
}
