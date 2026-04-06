import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { brands } from '../data/brandsData';

export default function BrandsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 min-h-screen bg-white text-[#555555]">
      <div className="mb-24 px-4 md:px-0">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           className="flex items-center gap-4 mb-8"
        >
          <div className="w-16 h-px bg-black"></div>
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-black">Active Briefs</p>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-bold text-black mb-8 tracking-tighter"
        >
          Brand Opportunities
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[#666666] text-xl md:text-2xl max-w-2xl leading-relaxed font-light"
        >
          Discover active briefs from world-class brands looking for elite creative talent.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {brands.map((brand, i) => (
          <motion.div 
            key={brand.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            className="driplens-card p-12 group hover:border-black transition-all duration-500 overflow-hidden relative"
          >
            {/* Logo and Type */}
            <div className="flex flex-col sm:flex-row justify-between items-start mb-12 gap-6 relative z-10">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 flex items-center justify-center bg-gray-50 border border-[#F5F5F5] grayscale group-hover:grayscale-0 transition-all duration-500 shrink-0">
                  <img src={brand.logo} alt={brand.name} className="w-10 h-10 object-contain" />
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#AAAAAA]">{brand.name}</p>
                        <div className="p-0.5 bg-blue-500 rounded-full">
                            <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                    </div>
                  <h3 className="text-3xl font-bold text-black group-hover:translate-x-1 transition-transform tracking-tight">
                    {brand.briefs[0].title}
                  </h3>
                </div>
              </div>
              <span className="bg-white border border-[#EEEEEE] text-black px-4 py-2 text-[10px] font-bold uppercase tracking-widest group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors whitespace-nowrap">
                {brand.briefs[0].type}
              </span>
            </div>
            
            <p className="text-[#666666] text-lg leading-relaxed mb-12 max-w-lg font-light relative z-10">
              {brand.briefs[0].description}
            </p>

            <div className="flex flex-wrap gap-2 mb-12 relative z-10">
              {brand.briefs[0].tags.map((tag, j) => (
                <span key={j} className="text-[9px] uppercase tracking-widest font-bold text-[#999999] border border-[#F0F0F0] px-3 py-1 bg-gray-50/50">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center pt-10 border-t border-[#F5F5F5] relative z-10">
              <div>
                <p className="text-[9px] uppercase tracking-widest font-bold text-[#AAAAAA] mb-1">Budget Allocation</p>
                <p className="text-2xl font-bold text-black">{brand.briefs[0].budget}</p>
              </div>
              <Link to={`/brand/${brand.id}`} className="btn-primary flex items-center hover:scale-[1.02] active:scale-[0.98] transition-transform">
                SUBMIT PROPOSAL <span className="ml-2 font-light opacity-50">→</span>
              </Link>
            </div>
            
            {/* Background Accent */}
            <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none">
                <img src={brand.logo} className="w-64 h-64 object-contain grayscale" alt="" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
