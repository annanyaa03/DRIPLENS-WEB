import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getAllExploreContent } from '../services/externalMediaService';

export default function ExplorePage() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  const fetchContent = async (pageNum, isLoadMore = false) => {
    try {
      if (isLoadMore) setFetchingMore(true);
      else setLoading(true);

      const data = await getAllExploreContent('creative cinematography', pageNum);
      
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setContent(prev => isLoadMore ? [...prev, ...data] : data);
        setHasMore(data.length >= 12); // rough estimate if we get enough items
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setFetchingMore(false);
    }
  };

  useEffect(() => {
    fetchContent(1);
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchContent(nextPage, true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 min-h-screen">
      <Helmet>
        <title>Explore Global Work — Driplens</title>
        <meta name="description" content="Explore Global Work on Driplens" />
      </Helmet>
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
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            {content.map((item, i) => (
              <motion.div 
                key={`${item.id}-${i}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(item)}
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
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-2xl text-black group-hover:translate-x-1 transition-transform">{item.title}</h3>
                      {item.source && (
                        <span className={`text-[10px] px-2 py-0.5 font-bold uppercase tracking-widest ${
                          item.source === 'Local' ? 'bg-black text-white' : 
                          item.source === 'Pexels' ? 'bg-[#05a081] text-white' : 
                          'bg-[#2ece66] text-white'
                        }`}>
                          {item.source}
                        </span>
                      )}
                    </div>
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

          {hasMore && (
            <div className="flex justify-center pb-20">
              <button
                onClick={handleLoadMore}
                disabled={fetchingMore}
                className="bg-black text-white px-12 py-5 font-bold text-sm uppercase tracking-[0.2em] hover:bg-black/80 transition-all disabled:bg-gray-400 min-w-[200px]"
              >
                {fetchingMore ? (
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Loading...</span>
                    </div>
                ) : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedProject(null)}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white w-full max-w-6xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden border-4 border-black shadow-[16px_16px_0px_rgba(0,0,0,1)] relative"
            onClick={e => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 z-10 bg-white border-2 border-black w-10 h-10 flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0px_rgba(0,0,0,1)]"
              onClick={() => setSelectedProject(null)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            
            <div className="md:w-2/3 bg-gray-100 flex items-center justify-center border-b-4 md:border-b-0 md:border-r-4 border-black min-h-[300px]">
              {selectedProject.mediaType === 'video' ? (
                <video src={selectedProject.mediaUrl} controls autoPlay className="w-full h-full object-contain max-h-[90vh]" />
              ) : (
                <img src={selectedProject.mediaUrl} alt={selectedProject.title} className="w-full h-full object-contain max-h-[90vh]" />
              )}
            </div>
            
            <div className="md:w-1/3 p-8 flex flex-col overflow-y-auto">
              <h2 className="text-3xl font-bold font-['Space_Grotesk'] mb-2 uppercase">{selectedProject.title}</h2>
              <p className="text-sm tracking-widest text-gray-500 uppercase font-bold mb-8">{selectedProject.category}</p>
              
              <div className="border-t-2 border-b-2 border-black py-6 mb-8">
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">Creator</p>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-bold text-xl uppercase">
                    {(selectedProject.author?.username || 'A')[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{selectedProject.author?.username || 'Anonymous'}</h3>
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Independent</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-gray-700">
                  {selectedProject.author?.bio || "A multi-disciplinary creative professional with a proven track record of delivering high-impact visual experiences. Passionate about pushing boundaries and setting new industry standards."}
                </p>
              </div>
              
              <div className="mt-auto">
                <Link to="/profile/demo" className="w-full bg-[var(--color-brand-accent)] text-white border-2 border-black py-4 font-bold uppercase tracking-widest shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2 group">
                  <span>Hire Me</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
