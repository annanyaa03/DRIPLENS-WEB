import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { brands } from '../data/brandsData';
import { 
  ArrowRight, 
  Search, 
  MapPin, 
  DollarSign, 
  Briefcase,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { useState } from 'react';

export default function BrandsPage() {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Videography', '3D Motion Design', 'Product Design', 'Illustration', 'Motion Design', 'Photography'];

  const filteredBrands = activeFilter === 'All' 
    ? brands 
    : brands.filter(brand => brand.briefs[0].type === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] font-inter">
      <Helmet>
        <title>Opportunities — Driplens</title>
        <meta name="description" content="Elite brand opportunities for creative talent." />
      </Helmet>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-black"></span>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#888888]">Direct to Brand</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
            Active <br />
            Opportunities
          </h1>
          <p className="text-xl text-[#666666] font-light max-w-xl leading-relaxed">
            Direct access to high-budget briefs from world-class brands. No middleman, just pure creative execution.
          </p>
        </motion.div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-y border-[#EEEEEE]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar w-full md:w-auto">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`text-[10px] uppercase tracking-widest font-bold transition-all relative whitespace-nowrap ${
                  activeFilter === filter ? 'text-black' : 'text-[#AAAAAA] hover:text-[#555555]'
                }`}
              >
                {filter}
                {activeFilter === filter && (
                  <motion.div 
                    layoutId="activeFilter"
                    className="absolute -bottom-1 left-0 w-full h-[1px] bg-black"
                  />
                )}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#AAAAAA]" />
            <input 
              type="text" 
              placeholder="SEARCH BRIEFS..."
              className="w-full bg-[#F9F9F9] border-none text-[10px] tracking-widest font-bold py-2.5 pl-10 pr-4 focus:ring-1 focus:ring-black outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Brands List */}
      <div className="max-w-7xl mx-auto border-x border-[#EEEEEE]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="divide-y divide-[#EEEEEE]"
        >
          {filteredBrands.map((brand) => (
            <motion.div
              key={brand.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredId(brand.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative bg-white hover:bg-[#F9F9F9] transition-colors duration-500"
            >
              <Link 
                to={`/brand/${brand.id}`}
                className="flex flex-col md:flex-row items-stretch md:items-center px-6 py-8 gap-8 md:gap-12"
              >
                {/* Brand Info */}
                <div className="flex-1 flex items-start gap-6">
                  <div className="w-16 h-16 bg-white border border-[#EEEEEE] flex items-center justify-center p-3 grayscale group-hover:grayscale-0 transition-all duration-700">
                    <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-sm font-bold uppercase tracking-widest text-[#AAAAAA] group-hover:text-black transition-colors">
                        {brand.name}
                      </h2>
                      <CheckCircle2 className="w-3 h-3 text-blue-500" />
                    </div>
                    <h3 className="text-3xl font-bold tracking-tight mb-4 group-hover:translate-x-2 transition-transform duration-500">
                      {brand.briefs[0].title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888]">
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="w-3 h-3" />
                        {brand.briefs[0].type}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" />
                        {brand.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description - Visible on desktop */}
                <div className="hidden lg:block flex-1 max-w-md">
                  <p className="text-[#777777] text-sm leading-relaxed font-light line-clamp-2">
                    {brand.briefs[0].description}
                  </p>
                </div>

                {/* Action Area */}
                <div className="flex items-center justify-between md:justify-end gap-12 w-full md:w-auto">
                  <div className="text-right">
                    <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#AAAAAA] mb-1">Budget Allocation</p>
                    <p className="text-2xl font-bold tracking-tighter">{brand.briefs[0].budget.split(' - ')[0]}+</p>
                  </div>
                  
                  <div className="relative overflow-hidden w-12 h-12 flex items-center justify-center border border-[#EEEEEE] group-hover:bg-black group-hover:border-black transition-all duration-500">
                    <ArrowRight className="w-5 h-5 text-black group-hover:text-white transition-colors duration-500" />
                  </div>
                </div>
              </Link>
              
              {/* Animated Progress Bar at bottom of each item */}
              {hoveredId === brand.id && (
                <motion.div 
                  layoutId="hoverBorder"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-black z-10"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Elevated Footer CTA */}
      <section className="border-t border-[#F5F5F5] bg-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none flex items-center justify-center overflow-hidden">
           <span className="text-[20vw] font-bold tracking-tighter leading-none translate-y-20">COLLABORATE</span>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 py-20 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="w-12 h-[1px] bg-black"></span>
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#AAAAAA]">Direct Partnership</span>
              <span className="w-12 h-[1px] bg-black"></span>
            </div>
            
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] max-w-4xl mx-auto">
              Ready to scale your <br /> 
              brand's creative reach?
            </h2>
            
            <p className="text-lg text-[#666666] font-light max-w-xl mx-auto leading-relaxed">
              Join the world's most innovative brands. Post your creative briefs and collaborate with elite talent directly.
            </p>
            
            <div className="pt-8">
              <Link 
                to="/post-brief"
                className="group relative inline-flex items-center justify-center px-16 py-6 bg-black text-white text-[10px] font-bold uppercase tracking-[0.4em] overflow-hidden"
              >
                <span className="relative z-10">Post an Opportunity</span>
                <motion.div 
                  className="absolute inset-0 bg-[#222222]"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
                <ArrowRight className="w-4 h-4 ml-4 relative z-10 group-hover:translate-x-2 transition-transform duration-500" />
              </Link>
            </div>
            
            <div className="pt-12 flex items-center justify-center gap-12 text-[9px] uppercase tracking-[0.3em] font-bold text-[#AAAAAA]">
              <span>No Middlemen</span>
              <span className="w-1 h-1 bg-[#EEEEEE] rounded-full"></span>
              <span>Direct Licensing</span>
              <span className="w-1 h-1 bg-[#EEEEEE] rounded-full"></span>
              <span>Verified Talent</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
