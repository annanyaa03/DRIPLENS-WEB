import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { brands } from '../data/brandsData';

export default function BrandProfilePage() {
  const { id } = useParams();
  const brand = brands.find(b => b.id === parseInt(id));

  if (!brand) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Brand Not Found</h2>
          <Link to="/brands" className="text-[#AAAAAA] hover:text-black uppercase tracking-widest text-xs font-bold font-mono">
            Back to Brands
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header / Banner */}
      <div className="h-[400px] bg-gray-50 border-b border-[#F5F5F5] flex items-center justify-center overflow-hidden relative">
        <div className="absolute inset-0 bg-white opacity-40"></div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center"
        >
          <img 
            src={brand.logo} 
            alt={brand.name} 
            className="h-24 mx-auto mb-8 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
          />
          <h1 className="text-5xl md:text-7xl font-bold text-black tracking-tighter mb-4">{brand.name}</h1>
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#AAAAAA]">{brand.sector} • {brand.location}</p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-24">
            <section>
              <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#AAAAAA] mb-8">About the Brand</h2>
              <p className="text-2xl text-[#333333] leading-relaxed font-light">
                {brand.description}
              </p>
            </section>

            <section>
              <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#AAAAAA] mb-8">Mission Statement</h2>
              <div className="bg-black text-white p-16 relative overflow-hidden">
                <div className="relative z-10 italic text-3xl font-light leading-relaxed">
                  "{brand.mission}"
                </div>
                <div className="absolute -bottom-10 -right-10 opacity-10 blur-xl">
                    <img src={brand.logo} className="w-64 grayscale invert" alt="" />
                </div>
              </div>
            </section>

            <section id="briefs">
              <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#AAAAAA] mb-12">Active Creative Briefs</h2>
              <div className="space-y-8">
                {brand.briefs.map((brief) => (
                  <motion.div 
                    key={brief.id}
                    whileHover={{ x: 10 }}
                    className="border border-[#EEEEEE] p-12 group hover:border-black transition-all"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest font-bold text-white bg-black px-2 py-1 mb-4 inline-block">
                          {brief.type}
                        </span>
                        <h3 className="text-3xl font-bold text-black">{brief.title}</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] uppercase tracking-widest font-bold text-[#AAAAAA]">Budget</p>
                        <p className="text-xl font-bold text-black">{brief.budget}</p>
                      </div>
                    </div>
                    
                    <p className="text-[#666666] text-lg mb-8 leading-relaxed max-w-2xl">
                      {brief.description}
                    </p>

                    <div className="flex flex-wrap gap-4 mb-12">
                      {brief.tags.map(tag => (
                        <span key={tag} className="text-[10px] border border-[#EEEEEE] px-3 py-1 font-bold text-[#999999] tracking-widest">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-8 border-t border-[#F5F5F5] flex justify-between items-end">
                      <div className="space-y-2">
                        <p className="text-[9px] uppercase tracking-widest font-bold text-[#AAAAAA]">Key Requirements</p>
                        <ul className="text-sm text-black font-medium">
                          {brief.requirements.map((req, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="w-1 h-1 bg-black rounded-full"></span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <button className="btn-primary hover:bg-white hover:text-black hover:border-black border-transparent border">
                        SUBMIT PROPOSAL
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-16">
            <div className="sticky top-24">
              <div className="driplens-card p-10 bg-gray-50 border-none">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-black mb-8">Brand Vibe</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-[1px] bg-black"></div>
                    <span className="text-sm font-bold uppercase tracking-widest">Aesthetic Focus</span>
                  </div>
                  <p className="text-[#666666] text-sm leading-relaxed">
                    A blend of performance technology and urban storytelling. We prioritize high-contrast visuals, raw human emotion, and kinetic energy.
                  </p>
                  
                  <div className="pt-10 space-y-4">
                    <p className="text-[10px] font-bold text-[#AAAAAA] uppercase tracking-widest">Preferred Formats</p>
                    <div className="flex flex-wrap gap-2">
                      {['4K RAW', 'Anamorphic', 'Vertical (9:16)', 'Docu-style'].map((f) => (
                        <span key={f} className="text-[9px] font-bold px-2 py-1 bg-white border border-[#EEEEEE]">{f}</span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-10 flex flex-col gap-3">
                    <Link to="/messages" className="w-full flex items-center justify-center py-4 border border-black text-black font-bold uppercase text-[10px] tracking-widest hover:bg-black hover:text-white transition-colors">
                      MESSAGE BRAND
                    </Link>
                    <button className="w-full btn-primary">
                      FOLLOW BRAND UPDATES
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-10 flex items-center justify-between group cursor-pointer border border-[#EEEEEE] hover:border-black transition-all">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">View Guidelines</span>
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
