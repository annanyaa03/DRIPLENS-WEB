import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { api } from '../lib/api';
import { 
  Search, 
  Filter, 
  X, 
  Check,
  ChevronRight, 
  Plus, 
  MapPin, 
  Zap, 
  ShieldCheck, 
  Layout, 
  ArrowUpRight,
  SlidersHorizontal,
  ChevronDown,
  Star,
  Users,
  BadgeCheck,
  BarChart3,
  Clock
} from 'lucide-react';

// ─── Constants ────────────────────────────────────────────────────────────────
const CATEGORIES = ['Fashion', 'Tech', 'Lifestyle', 'Food', 'Travel', 'Gaming', 'Beauty', 'Fitness', 'Education'];
const PLATFORMS  = ['Instagram', 'TikTok', 'YouTube', 'Twitter'];
const FOLLOWER_TIERS = ['Nano', 'Micro', 'Mid', 'Macro', 'Mega'];
const AUDIENCES = ['Gen Z', 'Millennial', 'Professional', 'Family', 'Luxury'];

// ─── Custom Hook: useDebounce ────────────────────────────────────────────────
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

// ─── Component: Skeleton Card ────────────────────────────────────────────────
function CreatorSkeleton() {
  return (
    <div className="animate-pulse bg-white border border-[#F5F5F5] p-6 space-y-6">
      <div className="aspect-[4/5] bg-[#FAFAFA]" />
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-4 bg-[#F5F5F5] w-1/3" />
          <div className="h-3 bg-[#F5F5F5] w-1/4" />
        </div>
        <div className="h-3 bg-[#F5F5F5] w-full" />
        <div className="h-3 bg-[#F5F5F5] w-2/3" />
        <div className="pt-4 border-t border-[#F5F5F5] flex justify-between">
          <div className="h-3 bg-[#F5F5F5] w-1/4" />
          <div className="h-6 w-6 bg-[#F5F5F5]" />
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function CreatorsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [search,      setSearch]      = useState(searchParams.get('q') || '');
  const [categories,  setCategories]  = useState(searchParams.get('cat')?.split(',').filter(Boolean) || []);
  const [platforms,   setPlatforms]   = useState(searchParams.get('plt')?.split(',').filter(Boolean) || []);
  const [budget,      setBudget]      = useState([parseInt(searchParams.get('minB')) || 0, parseInt(searchParams.get('maxB')) || 10000]);
  const [tier,        setTier]        = useState(searchParams.get('tier') || 'Any');
  const [audience,    setAudience]    = useState(searchParams.get('aud') || 'Any');
  const [engagement,  setEngagement]  = useState(parseFloat(searchParams.get('eng')) || 0);
  const [verified,    setVerified]    = useState(searchParams.get('ver') === 'true');
  const [available,   setAvailable]   = useState(searchParams.get('avail') === 'true');
  const [rating,      setRating]      = useState(parseInt(searchParams.get('rate')) || 0);

  const [creators,    setCreators]    = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showDesktopSidebar, setShowDesktopSidebar] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const debouncedSearch = useDebounce(search, 300);
  const suggestionRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (suggestionRef.current && !suggestionRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const params = {};
    if (debouncedSearch) params.q = debouncedSearch;
    if (categories.length) params.cat = categories.join(',');
    if (platforms.length) params.plt = platforms.join(',');
    if (budget[0] > 50) params.minB = budget[0];
    if (budget[1] < 10000) params.maxB = budget[1];
    if (tier !== 'Any') params.tier = tier;
    if (audience !== 'Any') params.aud = audience;
    if (engagement > 0) params.eng = engagement;
    if (verified) params.ver = 'true';
    if (available) params.avail = 'true';
    if (rating > 0) params.rate = rating;
    
    setSearchParams(params, { replace: true });
  }, [debouncedSearch, categories, platforms, budget, tier, audience, engagement, verified, available, rating, setSearchParams]);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          search: debouncedSearch,
          category: categories.join(','),
          platforms: platforms.join(','),
          minBudget: budget[0],
          maxBudget: budget[1],
          followerTier: tier,
          isAvailable: available,
          minRating: rating,
          limit: 50
        });
        const res = await api.get(`/creators?${query}`);
        setCreators(res.data.creators || []);
        
        if (debouncedSearch.length > 1) {
          const names = (res.data.creators || []).map(c => c.username).slice(0, 5);
          const cats = CATEGORIES.filter(c => c.toLowerCase().includes(debouncedSearch.toLowerCase())).slice(0, 3);
          setSuggestions([...names, ...cats]);
        } else {
          setSuggestions([]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [debouncedSearch, categories, platforms, budget, tier, available, rating]);

  const toggleCategory = (cat) => {
    setCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  const togglePlatform = (plt) => {
    setPlatforms(prev => prev.includes(plt) ? prev.filter(p => p !== plt) : [...prev, plt]);
  };

  const clearFilters = () => {
    setSearch('');
    setCategories([]);
    setPlatforms([]);
    setBudget([50, 10000]);
    setTier('Any');
    setAudience('Any');
    setEngagement(0);
    setVerified(false);
    setAvailable(false);
    setRating(0);
  };

  const activeChips = [
    ...categories.map(c => ({ id: `cat-${c}`, label: c, onRemove: () => toggleCategory(c) })),
    ...platforms.map(p => ({ id: `plt-${p}`, label: p, onRemove: () => togglePlatform(p) })),
    ...(tier !== 'Any' ? [{ id: 'tier', label: `Reach: ${tier}`, onRemove: () => setTier('Any') }] : []),
    ...(audience !== 'Any' ? [{ id: 'aud', label: `Audience: ${audience}`, onRemove: () => setAudience('Any') }] : []),
    ...(engagement > 0 ? [{ id: 'eng', label: `${engagement}%+ Eng.`, onRemove: () => setEngagement(0) }] : []),
    ...(verified ? [{ id: 'ver', label: 'Verified', onRemove: () => setVerified(false) }] : []),
    ...(available ? [{ id: 'avail', label: 'Live Now', onRemove: () => setAvailable(false) }] : []),
    ...(rating > 0 ? [{ id: 'rate', label: `${rating}+ Rating`, onRemove: () => setRating(0) }] : []),
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.02 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] font-inter antialiased selection:bg-black selection:text-white">
      <Helmet>
        <title>Creators — Driplens</title>
      </Helmet>

      {/* Sticky Header Navigation */}
      <div className="border-b border-[#F5F5F5] sticky top-0 z-50 bg-white/80 backdrop-blur-xl">
        <div className="max-w-[1600px] mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="w-2 h-2 bg-black rounded-full" />
             <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-black">Network Discovery</span>
          </div>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-[#AAAAAA]">
               <span className="text-black">{creators.length}</span> Results
             </div>
             <button 
              onClick={() => setShowDesktopSidebar(!showDesktopSidebar)}
              className="text-[9px] uppercase tracking-[0.4em] font-bold text-white bg-black px-5 py-2.5 hover:bg-[#222222] transition-all flex items-center gap-2"
             >
               <SlidersHorizontal className="w-3.5 h-3.5" /> {showDesktopSidebar ? 'Collapse' : 'Parameters'}
             </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 py-8">
        
        {/* Dynamic Hero Section */}
        <div className="relative mb-12 overflow-hidden border border-[#F5F5F5] p-10 md:p-12 group">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#FAFAFA] to-transparent -z-10 opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 border border-[#F9F9F9] rounded-full -z-10 group-hover:scale-110 transition-transform duration-1000" />
          
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="px-3 py-1 border border-black text-[9px] font-bold uppercase tracking-[0.4em]">Intelligence v2.0</div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#AAAAAA]">Verified Talent Pool</div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[0.85] max-w-4xl">
              Precision talent <br />
              <span className="text-[#DDDDDD] hover:text-black transition-colors duration-500 cursor-default">for the elite era.</span>
            </h1>
            <p className="text-[#666666] text-sm font-light leading-relaxed max-w-md mb-8">
              Bypass the noise. Connect with high-impact creators through our algorithmic vetting system.
            </p>

            {/* Integrated Search */}
            <div className="max-w-xl relative" ref={suggestionRef}>
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AAAAAA] group-focus-within:text-black transition-colors" />
                <input 
                  type="text"
                  value={search}
                  onChange={e => { setSearch(e.target.value); setShowSuggestions(true); }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Search by name, niche, or handle..."
                  className="w-full bg-white border border-[#EEEEEE] py-6 pl-14 pr-6 text-sm font-medium focus:outline-none focus:border-black shadow-sm group-hover:shadow-md transition-all"
                />
              </div>
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#EEEEEE] z-50 p-2 shadow-2xl"
                  >
                    {suggestions.map((s, i) => (
                      <button 
                        key={i}
                        onClick={() => { setSearch(s); setShowSuggestions(false); }}
                        className="w-full text-left px-5 py-3 hover:bg-[#FAFAFA] text-[10px] font-bold uppercase tracking-widest flex items-center gap-3 transition-colors"
                      >
                        <Zap className="w-3 h-3 text-blue-600" /> {s}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <div className="flex gap-16 items-start">
          
          {/* ── Enhanced Filter Sidebar ── */}
          <AnimatePresence>
            {showDesktopSidebar && (
              <motion.aside 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="hidden lg:block flex-shrink-0 sticky top-32 space-y-10 overflow-hidden pr-6 border-r border-[#F5F5F5]"
              >
                {/* Advanced Filtering Label */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <h2 className="text-[10px] uppercase tracking-[0.5em] font-black">Parameters</h2>
                    <button 
                      onClick={() => setShowDesktopSidebar(false)}
                      className="group flex items-center gap-1.5 text-[8px] uppercase tracking-widest font-bold text-[#AAAAAA] hover:text-black transition-colors"
                    >
                      <X className="w-2.5 h-2.5 group-hover:rotate-90 transition-transform" /> Hide
                    </button>
                  </div>
                  <button onClick={clearFilters} className="text-[8px] uppercase tracking-widest font-bold text-red-500 hover:underline">Reset System</button>
                </div>

                {/* Categories */}
                <div className="space-y-6">
                  <h3 className="text-[9px] uppercase tracking-[0.4em] font-bold text-[#AAAAAA] flex items-center gap-2">
                    <Layout className="w-3 h-3" /> Discipline
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {CATEGORIES.map(cat => (
                      <button 
                        key={cat}
                        onClick={() => toggleCategory(cat)}
                        className={`px-3 py-2 text-[9px] font-bold uppercase tracking-widest border transition-all ${
                          categories.includes(cat) ? 'bg-black border-black text-white' : 'bg-white border-[#EEEEEE] text-[#AAAAAA] hover:border-black hover:text-black'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Engagement Rate Slider */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-[9px] uppercase tracking-[0.4em] font-bold text-[#AAAAAA] flex items-center gap-2">
                      <BarChart3 className="w-3 h-3" /> Engagement
                    </h3>
                    <span className="text-[10px] font-bold">{engagement}%+</span>
                  </div>
                  <input 
                    type="range" min="0" max="10" step="0.5"
                    value={engagement}
                    onChange={e => setEngagement(parseFloat(e.target.value))}
                    className="w-full accent-black h-1 bg-[#F5F5F5] appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[8px] font-bold text-[#CCCCCC] uppercase tracking-widest">
                    <span>Base</span>
                    <span>High (10%)</span>
                  </div>
                </div>

                {/* Primary Audience */}
                <div className="space-y-6">
                  <h3 className="text-[9px] uppercase tracking-[0.4em] font-bold text-[#AAAAAA] flex items-center gap-2">
                    <Users className="w-3 h-3" /> Core Audience
                  </h3>
                  <div className="grid grid-cols-2 gap-1">
                    {['Any', ...AUDIENCES].map(aud => (
                      <button 
                        key={aud}
                        onClick={() => setAudience(aud)}
                        className={`py-3 text-[9px] font-bold uppercase tracking-widest border transition-all ${
                          audience === aud ? 'bg-black border-black text-white' : 'bg-white border-[#F5F5F5] text-[#AAAAAA] hover:border-black hover:text-black'
                        }`}
                      >
                        {aud}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Verified Only Toggle */}
                <div className="space-y-4">
                   <button 
                    onClick={() => setVerified(!verified)}
                    className={`w-full p-4 border flex items-center justify-between transition-all ${
                      verified ? 'border-blue-600 bg-blue-50/30' : 'border-[#EEEEEE] opacity-60'
                    }`}
                   >
                     <div className="flex items-center gap-3">
                        <BadgeCheck className={`w-4 h-4 ${verified ? 'text-blue-600 fill-blue-600/10' : 'text-[#AAAAAA]'}`} />
                        <span className={`text-[9px] font-bold uppercase tracking-[0.3em] ${verified ? 'text-blue-600' : 'text-[#AAAAAA]'}`}>Verified Only</span>
                     </div>
                     <div className={`w-3 h-3 border ${verified ? 'bg-blue-600 border-blue-600' : 'border-[#CCCCCC]'}`} />
                   </button>

                   <button 
                    onClick={() => setAvailable(!available)}
                    className={`w-full p-4 border flex items-center justify-between transition-all ${
                      available ? 'border-green-600 bg-green-50/30' : 'border-[#EEEEEE] opacity-60'
                    }`}
                   >
                     <div className="flex items-center gap-3">
                        <Zap className={`w-4 h-4 ${available ? 'text-green-600 fill-green-600/10' : 'text-[#AAAAAA]'}`} />
                        <span className={`text-[9px] font-bold uppercase tracking-[0.3em] ${available ? 'text-green-600' : 'text-[#AAAAAA]'}`}>Live Status</span>
                     </div>
                     <div className={`w-1.5 h-1.5 rounded-full ${available ? 'bg-green-600 animate-pulse' : 'bg-[#CCCCCC]'}`} />
                   </button>
                </div>

                {/* Rating Filter */}
                <div className="space-y-6">
                  <h3 className="text-[9px] uppercase tracking-[0.4em] font-bold text-[#AAAAAA] flex items-center gap-2">
                    <Star className="w-3 h-3" /> Performance
                  </h3>
                  <div className="flex gap-1">
                    {[3, 4, 5].map(star => (
                      <button 
                        key={star}
                        onClick={() => setRating(star)}
                        className={`flex-1 py-4 border flex flex-col items-center gap-1 transition-all ${
                          rating === star ? 'bg-black border-black text-white' : 'bg-white border-[#F5F5F5] text-[#CCCCCC] hover:border-black hover:text-black'
                        }`}
                      >
                        <span className="text-[10px] font-bold">{star}</span>
                        <Star className={`w-2.5 h-2.5 ${rating === star ? 'fill-white' : ''}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>
          
          {/* ── Results Main Content ── */}
          <main className="flex-1 min-w-0">
            
            {/* Active Chips & Sort */}
            <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
              <div className="flex flex-wrap items-center gap-3">
                {!showDesktopSidebar && (
                  <button 
                    onClick={() => setShowDesktopSidebar(true)}
                    className="flex items-center gap-2.5 bg-black text-white px-4 py-2 text-[9px] font-bold uppercase tracking-widest hover:bg-[#222222] transition-all"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" /> Parameters
                  </button>
                )}
                {activeChips.length > 0 && activeChips.map(chip => (
                  <button 
                    key={chip.id}
                    onClick={chip.onRemove}
                    className="group flex items-center gap-3 bg-[#FAFAFA] border border-[#EEEEEE] px-4 py-2 hover:border-black transition-all"
                  >
                    <span className="text-[9px] font-bold uppercase tracking-widest">{chip.label}</span>
                    <X className="w-3 h-3 text-[#AAAAAA] group-hover:text-red-500 transition-colors" />
                  </button>
                ))}
              </div>
              
              <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.3em] text-[#AAAAAA]">
                 Sort By: <span className="text-black cursor-pointer hover:underline underline-offset-4">Recommended</span>
              </div>
            </div>

            {/* High-End Results Grid */}
            <motion.div 
              layout
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={`grid gap-1 ${
                showDesktopSidebar 
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              }`}
            >
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => <CreatorSkeleton key={i} />)
              ) : (
                <AnimatePresence mode="popLayout">
                  {creators.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="col-span-full py-40 flex flex-col items-center justify-center text-center border border-dashed border-[#EEEEEE]"
                    >
                      <div className="w-16 h-16 bg-[#FAFAFA] flex items-center justify-center mb-8">
                         <Search className="w-6 h-6 text-[#DDDDDD]" />
                      </div>
                      <h3 className="text-3xl font-bold tracking-tighter mb-4">No profiles match these parameters.</h3>
                      <p className="text-[10px] text-[#AAAAAA] uppercase tracking-[0.4em] mb-12">System update required for this query.</p>
                      <button onClick={clearFilters} className="px-12 py-5 bg-black text-white text-[9px] font-bold uppercase tracking-[0.4em] hover:bg-[#222222] transition-all">Clear System</button>
                    </motion.div>
                  ) : (
                    creators.map((c, i) => (
                      <motion.div key={c.id} variants={itemVariants} layout className="group">
                        <Link 
                          to={`/profile/${c.id}`} 
                          className="block bg-white border border-[#F5F5F5] p-6 hover:border-black hover:shadow-2xl transition-all duration-700 relative overflow-hidden"
                        >
                          {/* Profile Header */}
                          <div className="flex justify-between items-start mb-6">
                            <div className="space-y-1">
                               <div className="flex items-center gap-2">
                                  <h3 className="font-bold text-2xl tracking-tighter">{c.username}</h3>
                                  {i % 3 === 0 && <BadgeCheck className="w-4 h-4 text-blue-600 fill-blue-600/10" />}
                               </div>
                               <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#AAAAAA]">{c.category || 'Creator'}</p>
                            </div>
                            <div className="text-right">
                               <div className="text-[10px] font-black tracking-tight mb-1">${c.min_budget ? Number(c.min_budget).toLocaleString() : '1.5k'}+</div>
                               <div className="text-[8px] uppercase tracking-widest text-[#AAAAAA]">Starting Fee</div>
                            </div>
                          </div>

                          {/* Media Showcase */}
                          <div className="aspect-[4/5] relative overflow-hidden bg-[#FAFAFA] mb-6">
                            {c.avatar_url ? (
                              <img src={c.avatar_url} alt={c.username} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-7xl font-bold text-[#EEEEEE] bg-white italic font-serif">
                                {c.username[0]}
                              </div>
                            )}
                            
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700" />
                          </div>

                          {/* Stats Row */}
                          <div className="grid grid-cols-3 gap-4 border-y border-[#F5F5F5] py-4 mb-6">
                             <div>
                                <div className="text-[10px] font-bold mb-0.5">8.2%</div>
                                <div className="text-[7px] uppercase tracking-widest text-[#AAAAAA]">Engagement</div>
                             </div>
                             <div>
                                <div className="text-[10px] font-bold mb-0.5">24h</div>
                                <div className="text-[7px] uppercase tracking-widest text-[#AAAAAA]">Response</div>
                             </div>
                             <div>
                                <div className="text-[10px] font-bold mb-0.5">98%</div>
                                <div className="text-[7px] uppercase tracking-widest text-[#AAAAAA]">Completion</div>
                             </div>
                          </div>

                          {/* Footer Action */}
                          <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                               {(c.platforms || PLATFORMS).slice(0, 2).map(p => (
                                 <span key={p} className="text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 bg-[#FAFAFA] border border-[#EEEEEE] group-hover:border-black transition-colors">{p}</span>
                               ))}
                            </div>
                            <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-500">
                               View Profile <ArrowUpRight className="w-3.5 h-3.5" />
                            </div>
                          </div>
                          
                          {/* Corner Accent */}
                          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-transparent group-hover:border-black transition-all duration-500" />
                        </Link>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              )}
            </motion.div>
          </main>
        </div>
      </div>
      
      {/* ── Mobile Action Bar ── */}
      <div className="lg:hidden fixed bottom-8 left-8 right-8 z-50">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="w-full bg-black text-white py-6 font-bold text-[11px] uppercase tracking-[0.5em] shadow-2xl flex items-center justify-center gap-4 active:scale-95 transition-all"
        >
          <SlidersHorizontal className="w-4 h-4" /> Refine System
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white overflow-y-auto p-8"
          >
             <div className="flex justify-between items-center mb-12">
               <span className="text-[10px] font-bold uppercase tracking-[0.5em]">System Parameters</span>
               <button onClick={() => setSidebarOpen(false)} className="p-3 border border-[#EEEEEE]"><X className="w-5 h-5" /></button>
             </div>
             
             <div className="space-y-16">
                <div className="space-y-8">
                  <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#AAAAAA]">Discipline</h3>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map(cat => (
                      <button key={cat} onClick={() => toggleCategory(cat)} className={`px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest border transition-all ${categories.includes(cat) ? 'bg-black text-white' : 'border-[#EEEEEE]'}`}>{cat}</button>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#AAAAAA]">Engagement</h3>
                  <input 
                    type="range" min="0" max="10" step="0.5"
                    value={engagement}
                    onChange={e => setEngagement(parseFloat(e.target.value))}
                    className="w-full accent-black h-1 bg-[#F5F5F5] appearance-none"
                  />
                </div>

                <button onClick={() => { clearFilters(); setSidebarOpen(false); }} className="w-full py-5 bg-black text-white text-[10px] font-bold uppercase tracking-[0.5em]">Reset Parameters</button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
