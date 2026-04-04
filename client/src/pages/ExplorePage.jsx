import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ExplorePage() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/upload');
        if (!res.ok) throw new Error('Failed to fetch content');
        const data = await res.json();
        setContent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div className="max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-black mb-6 tracking-tight"
          >
            Explore Global <br /> Work
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#666666] text-xl leading-relaxed"
          >
            Discover the highest standard of creative output across the industry. Only the best makes it here.
          </motion.p>
        </div>
        
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.2 }}
        >
          <Link 
            to="/upload" 
            className="bg-black text-white px-10 py-5 font-bold text-sm uppercase tracking-[0.2em] hover:bg-black/80 transition-all inline-block shadow-2xl"
          >
            Upload Your Content
          </Link>
        </motion.div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="text-center py-20 text-red-500 uppercase tracking-widest text-xs font-bold">
          {error}
        </div>
      ) : content.length === 0 ? (
        <div className="text-center py-20 text-[#999] uppercase tracking-widest text-xs font-bold">
          No content found. Be the first to upload!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {content.map((item, i) => (
            <motion.div 
              key={item._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/9] overflow-hidden bg-gray-100 relative mb-6">
                {item.mediaType === 'video' ? (
                  <video 
                    src={item.mediaUrl} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    muted
                    loop
                    onMouseOver={e => e.target.play()}
                    onMouseOut={e => e.target.pause()}
                  />
                ) : (
                  <img 
                    src={item.mediaUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="bg-white text-black px-6 py-3 text-[10px] font-bold uppercase tracking-widest shadow-xl">
                    View Project
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-2xl text-black mb-1 group-hover:translate-x-1 transition-transform">{item.title}</h3>
                  <p className="text-xs uppercase tracking-widest font-semibold text-[#999999]">
                    By {item.author?.username || 'Anonymous'} • {item.category}
                  </p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
