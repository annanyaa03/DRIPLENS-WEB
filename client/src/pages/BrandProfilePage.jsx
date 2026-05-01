import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { brands } from '../data/brandsData';
import { 
  ArrowLeft, 
  Globe, 
  MapPin, 
  MessageSquare, 
  Plus, 
  CheckCircle2,
  ExternalLink,
  Target,
  Zap,
  Layout,
  Briefcase
} from 'lucide-react';

export default function BrandProfilePage() {
  const { id } = useParams();
  const brand = brands.find(b => b.id === parseInt(id));

  if (!brand) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white font-inter">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 tracking-tighter text-black">Brand Not Found</h2>
          <Link to="/brands" className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] font-bold text-[#AAAAAA] hover:text-black transition-colors">
            <ArrowLeft className="w-3 h-3" /> Back to Brands
          </Link>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] font-inter antialiased">
      <Helmet>
        <title>{brand.name} — Brand Profile | Driplens</title>
        <meta name="description" content={`Explore creative opportunities and briefs from ${brand.name} on Driplens.`} />
      </Helmet>

      {/* Breadcrumb & Quick Actions Bar */}
      <div className="border-b border-[#F5F5F5] sticky top-0 z-50 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/brands" className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.4em] font-bold text-[#AAAAAA] hover:text-black transition-colors group">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" /> Back to Brands
          </Link>
          <div className="flex items-center gap-6">
            <a href={`https://${brand.domain}`} target="_blank" rel="noopener noreferrer" className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#AAAAAA] hover:text-black transition-colors flex items-center gap-1.5">
              <Globe className="w-3 h-3" /> Website
            </a>
            <button className="px-4 py-2 bg-black text-white text-[9px] font-bold uppercase tracking-[0.3em] hover:bg-[#222222] transition-colors">
              Follow
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          {/* Header Section */}
          <div className="lg:col-span-12 border-b border-[#F5F5F5] pb-10">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
              <div className="flex-1">
                <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white border border-[#EEEEEE] p-3 flex items-center justify-center">
                    <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain grayscale" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                       <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-none">{brand.name}</h1>
                       <CheckCircle2 className="w-4 h-4 text-blue-500" />
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-blue-500">Official Brand Partner</p>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex flex-wrap gap-6 text-[10px] uppercase tracking-[0.3em] font-bold text-[#888888]">
                  <span className="flex items-center gap-1.5">
                    <Target className="w-3 h-3" /> {brand.sector}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" /> {brand.location}
                  </span>
                  <span className="flex items-center gap-1.5 text-black">
                    <Briefcase className="w-3 h-3" /> {brand.briefs.length} Active Briefs
                  </span>
                </motion.div>
              </div>

              <motion.div variants={itemVariants} className="flex items-center gap-3">
                <button className="flex-1 md:flex-none px-6 py-3 border border-black text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5" /> Message
                </button>
                <button className="flex-1 md:flex-none px-6 py-3 bg-black text-white border border-black text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#333333] transition-all">
                  Submit Interest
                </button>
              </motion.div>
            </div>
          </div>

          {/* Sidebar - Left (Compact) */}
          <div className="lg:col-span-3 space-y-10">
            <motion.div variants={itemVariants} className="space-y-6">
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#AAAAAA] mb-4">About</h3>
                <p className="text-sm text-[#444444] leading-relaxed">
                  {brand.description}
                </p>
              </div>
              
              <div className="pt-4 border-t border-[#F5F5F5]">
                <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#AAAAAA] mb-4">Mission</h3>
                <p className="text-sm font-serif italic text-black leading-relaxed">
                  "{brand.mission}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#F5F5F5] space-y-4">
                <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#AAAAAA]">Quick Specs</h3>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { label: 'Tone', value: 'Bold & Premium' },
                    { label: 'Medium', value: 'Digital Native' },
                    { label: 'Response', value: '< 24 Hours' }
                  ].map((spec) => (
                    <div key={spec.label} className="flex justify-between items-center bg-[#FAFAFA] px-3 py-2 border border-[#EEEEEE]">
                      <span className="text-[9px] uppercase tracking-widest font-bold text-[#999999]">{spec.label}</span>
                      <span className="text-[9px] uppercase tracking-widest font-bold text-black">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content - Right (Briefs) */}
          <div className="lg:col-span-9">
            <motion.div variants={itemVariants} className="mb-8 flex items-center justify-between border-b border-[#F5F5F5] pb-4">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-black">Active Creative Briefs</h2>
              <span className="text-[9px] font-bold text-[#AAAAAA] uppercase tracking-widest">Showing {brand.briefs.length} Opportunities</span>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {brand.briefs.map((brief) => (
                <motion.div 
                  key={brief.id}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  className="group border border-[#EEEEEE] p-8 hover:border-black transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] uppercase tracking-widest font-bold px-2 py-0.5 bg-[#F9F9F9] border border-[#EEEEEE] text-[#666666]">
                        {brief.type}
                      </span>
                      <p className="text-[10px] font-bold tracking-tight text-black">{brief.budget.split(' - ')[0]}+</p>
                    </div>
                    <h3 className="text-xl font-bold tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
                      {brief.title}
                    </h3>
                    <p className="text-[#666666] text-xs leading-relaxed line-clamp-3 font-light">
                      {brief.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 pt-2">
                      {brief.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[8px] font-bold text-[#AAAAAA] tracking-widest uppercase border border-[#F0F0F0] px-2 py-0.5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#F5F5F5] flex items-center justify-between">
                    <div className="flex flex-col">
                       <span className="text-[8px] uppercase tracking-widest font-bold text-[#AAAAAA]">Deadline</span>
                       <span className="text-[10px] font-bold">Open Access</span>
                    </div>
                    <Link 
                      to={`/submit-proposal/${brief.id}`}
                      className="text-[9px] font-bold uppercase tracking-[0.3em] flex items-center gap-1 group/link"
                    >
                      View Details <Plus className="w-3 h-3 group-hover/link:rotate-90 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}

              {/* Empty state / More briefs placeholder */}
              <div className="border border-dashed border-[#DDDDDD] p-8 flex flex-col items-center justify-center text-center space-y-3 grayscale opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                  <Zap className="w-4 h-4 text-[#AAAAAA]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest">More coming soon</p>
                  <p className="text-[8px] text-[#AAAAAA] uppercase tracking-widest">Stay updated for new briefs</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tighter Footer CTA */}
      <div className="border-t border-[#F5F5F5] py-12 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tighter mb-1">Scale your creative impact with {brand.name}.</h2>
            <p className="text-xs text-[#888888]">Direct partnership, guaranteed payments, creative freedom.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Link 
              to="/brands"
              className="flex-1 md:flex-none px-8 py-4 border border-[#EEEEEE] bg-white text-[9px] font-bold uppercase tracking-[0.3em] hover:border-black transition-all text-center"
            >
              Explore Others
            </Link>
            <Link 
              to="/post-brief"
              className="flex-1 md:flex-none px-8 py-4 bg-black text-white text-[9px] font-bold uppercase tracking-[0.3em] hover:bg-[#222222] transition-all text-center"
            >
              Start Collaboration
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


