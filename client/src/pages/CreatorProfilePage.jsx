import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CreatorProfilePage() {
  const [selectedMedia, setSelectedMedia] = useState(null);

  const portfolio = [
    { id: 1, title: 'Commercial Edit', type: 'video' },
    { id: 2, title: 'Product Shoot', type: 'image' },
    { id: 3, title: 'Music Video', type: 'video' },
  ];

  return (
    <div className="bg-white">
      {/* Banner */}
      <div className="h-64 md:h-[400px] w-full bg-gray-200 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-end gap-6 mb-8">
              <div className="h-32 w-32 md:h-40 md:w-40 rounded-full bg-white p-2 border border-[#E5E5E5] shadow-sm">
                <div className="w-full h-full bg-gray-300 rounded-full"></div>
              </div>
              <div className="pb-4">
                <h1 className="text-3xl md:text-4xl font-poppins font-bold text-black flex items-center gap-2">
                  Jane Doe
                  <span className="bg-black text-white px-2 py-0.5 rounded-full text-xs font-bold align-middle">
                    VERIFIED
                  </span>
                </h1>
                <p className="text-lg text-[#555555]">Videographer & Editor • Los Angeles</p>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-poppins font-semibold text-black mb-4">About</h2>
              <p className="text-[#555555] max-w-3xl leading-relaxed">
                Specializing in high-energy commercial edits and documentary-style storytelling. 
                I have over 5 years of experience working with top lifestyle brands.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-poppins font-semibold text-black mb-6">Portfolio</h2>
              <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                {portfolio.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => setSelectedMedia(item)}
                    className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-[12px] bg-gray-100 driplens-card"
                  >
                    <div className="aspect-[4/5] bg-gray-200 w-full relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="font-poppins font-semibold">{item.title}</p>
                        <p className="text-sm opacity-80 uppercase tracking-widest">{item.type}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-80 mt-8 md:mt-32 border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm self-start sticky top-24 bg-white">
            <h3 className="text-xl font-poppins font-bold text-black mb-2">Hire Jane</h3>
            <p className="text-sm text-[#999999] mb-6">Typically responds in 2 hours.</p>
            
            <button className="w-full btn-primary mb-3 text-lg py-3">
              Send Hiring Request
            </button>
            <button className="w-full btn-secondary text-base">
              ★ Shortlist Creator
            </button>
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
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedMedia(null)}
          >
            <div className="max-w-5xl w-full max-h-[90vh] bg-black border border-gray-800 rounded-lg overflow-hidden relative" onClick={e => e.stopPropagation()}>
              <button 
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 text-white p-2 z-10 bg-black/50 rounded-full hover:bg-black transition"
              >
                ✕
              </button>
              <div className="aspect-video w-full bg-gray-900 flex items-center justify-center text-gray-500">
                Media Content: {selectedMedia.title}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
