import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { api } from '../lib/api';

// ─── Constants ────────────────────────────────────────────────────────────────
const CATEGORIES = ['Fashion', 'Tech', 'Lifestyle', 'Food', 'Travel', 'Gaming', 'Beauty', 'Fitness', 'Education'];
const PLATFORMS  = ['Instagram', 'TikTok', 'YouTube', 'Twitter'];
const FOLLOWER_TIERS = ['Nano', 'Micro', 'Mid', 'Macro', 'Mega'];
const RADIUS_OPTIONS = ['Local', '10mi', '50mi', '100mi', 'Nationwide', 'Remote'];

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
    <div className="animate-pulse bg-white border border-gray-100 rounded-none overflow-hidden shadow-sm">
      <div className="aspect-[16/10] bg-gray-100" />
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 bg-gray-100 w-1/2 rounded-none" />
          <div className="h-4 bg-gray-100 w-1/4 rounded-none" />
        </div>
        <div className="h-3 bg-gray-100 w-3/4 mb-2 rounded-none" />
        <div className="h-3 bg-gray-100 w-1/2 mb-6 rounded-none" />
        <div className="border-t border-gray-50 pt-4 flex justify-between items-center">
          <div className="h-4 bg-gray-100 w-1/4 rounded-none" />
          <div className="h-4 bg-gray-100 w-1/4 rounded-none" />
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function CreatorsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // ── State synced with URL ──
  const [search,      setSearch]      = useState(searchParams.get('q') || '');
  const [categories,  setCategories]  = useState(searchParams.get('cat')?.split(',').filter(Boolean) || []);
  const [platforms,   setPlatforms]   = useState(searchParams.get('plt')?.split(',').filter(Boolean) || []);
  const [budget,      setBudget]      = useState([parseInt(searchParams.get('minB')) || 50, parseInt(searchParams.get('maxB')) || 10000]);
  const [tier,        setTier]        = useState(searchParams.get('tier') || 'Any');
  const [radius,      setRadius]      = useState(searchParams.get('rad') || 'Nationwide');
  const [available,   setAvailable]   = useState(searchParams.get('avail') === 'true');
  const [rating,      setRating]      = useState(parseInt(searchParams.get('rate')) || 0);

  const [creators,    setCreators]    = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Mobile sheet
  const [showDesktopSidebar, setShowDesktopSidebar] = useState(true); // Desktop toggle
  const [showSuggestions, setShowSuggestions] = useState(false);

  const debouncedSearch = useDebounce(search, 300);
  const suggestionRef = useRef(null);

  // ── Close suggestions on click outside ──
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (suggestionRef.current && !suggestionRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ── Sync with URL ──
  useEffect(() => {
    const params = {};
    if (debouncedSearch) params.q = debouncedSearch;
    if (categories.length) params.cat = categories.join(',');
    if (platforms.length) params.plt = platforms.join(',');
    if (budget[0] > 50) params.minB = budget[0];
    if (budget[1] < 10000) params.maxB = budget[1];
    if (tier !== 'Any') params.tier = tier;
    if (radius !== 'Nationwide') params.rad = radius;
    if (available) params.avail = 'true';
    if (rating > 0) params.rate = rating;
    
    setSearchParams(params, { replace: true });
  }, [debouncedSearch, categories, platforms, budget, tier, radius, available, rating, setSearchParams]);

  // ── Fetch Data ──
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
        
        // Simple mock suggestions logic
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

  // ── Handlers ──
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
    setRadius('Nationwide');
    setAvailable(false);
    setRating(0);
  };

  // ── Render Helpers ──
  const activeChips = [
    ...categories.map(c => ({ id: `cat-${c}`, label: c, onRemove: () => toggleCategory(c) })),
    ...platforms.map(p => ({ id: `plt-${p}`, label: p, onRemove: () => togglePlatform(p) })),
    ...(tier !== 'Any' ? [{ id: 'tier', label: `Tier: ${tier}`, onRemove: () => setTier('Any') }] : []),
    ...(radius !== 'Nationwide' ? [{ id: 'radius', label: radius, onRemove: () => setRadius('Nationwide') }] : []),
    ...(available ? [{ id: 'avail', label: 'Available Now', onRemove: () => setAvailable(false) }] : []),
    ...(rating > 0 ? [{ id: 'rate', label: `${rating}+ Stars`, onRemove: () => setRating(0) }] : []),
  ];

  return (
    <>
      <Helmet>
        <title>Creators — Driplens</title>
      </Helmet>

      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 pt-12 pb-24">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <h1 className="text-6xl md:text-7xl font-bold text-black tracking-tight mb-6">
                Creative <span className="text-gray-200">Network.</span>
              </h1>
              <p className="text-[#666] text-xl font-medium leading-relaxed max-w-lg">
                Discover {creators.length > 0 ? creators.length : ''} world-class talent ready to build your next campaign.
              </p>
            </div>
            
            {/* Search Bar with Suggestions */}
            <div className="relative w-full md:w-[420px] group" ref={suggestionRef}>
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors z-10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
              <input 
                type="text" 
                value={search}
                onChange={e => {
                  setSearch(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Search by name, category, or bio..."
                className="w-full bg-gray-50 border-b border-gray-200 py-5 pl-14 pr-6 text-sm font-medium focus:outline-none focus:border-black transition-all"
              />
              
              {/* Autocomplete Suggestions */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-0 bg-white border border-black shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="py-2">
                      {suggestions.map((s, i) => (
                        <button 
                          key={i}
                          onClick={() => {
                            setSearch(s);
                            setShowSuggestions(false);
                          }}
                          className="w-full text-left px-6 py-3 hover:bg-black hover:text-white flex items-center gap-3 transition-colors"
                        >
                          <svg className="text-gray-300" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                          <span className="text-sm font-bold">{s}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            {/* ── Filter Sidebar (Collapsible on Desktop) ── */}
            <AnimatePresence mode="wait">
              {(showDesktopSidebar || isSidebarOpen) && (
                <motion.aside 
                  initial={isSidebarOpen ? { opacity: 1 } : { width: 0, opacity: 0 }}
                  animate={{ width: 320, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'circOut' }}
                  className={`flex-shrink-0 space-y-12 overflow-hidden ${
                    isSidebarOpen 
                      ? 'fixed inset-0 z-50 bg-white p-8 overflow-y-auto w-full' 
                      : 'hidden lg:block sticky top-8'
                  }`}
                >
                  <div className="w-80">
                    {/* Header (Mobile Only) */}
                    <div className="lg:hidden flex justify-between items-center mb-8">
                      <h2 className="text-2xl font-bold uppercase tracking-tighter">Filters</h2>
                      <button onClick={() => setSidebarOpen(false)} className="w-10 h-10 border border-black flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                      </button>
                    </div>

                    {/* Category */}
                    <div>
                      <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-black mb-6 border-b border-black pb-2">Discipline</h3>
                      <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map(cat => (
                          <button 
                            key={cat}
                            onClick={() => toggleCategory(cat)}
                            className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest border transition-all ${
                              categories.includes(cat) 
                                ? 'bg-black border-black text-white' 
                                : 'bg-white border-gray-100 text-gray-400 hover:border-black hover:text-black'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Budget Range */}
                    <div>
                      <div className="flex justify-between items-end mb-6">
                        <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-black">Budget</h3>
                        <span className="text-xs font-black text-black">${budget[0]}—${budget[1] >= 10000 ? '10k+' : budget[1]}</span>
                      </div>
                      <div className="relative pt-2 h-6">
                        <input 
                          type="range" min="50" max="10000" step="50"
                          value={budget[1]}
                          onChange={e => setBudget([budget[0], parseInt(e.target.value)])}
                          className="absolute w-full accent-black h-px bg-gray-200 appearance-none cursor-pointer z-20"
                        />
                        <div className="absolute top-[13px] left-0 h-px bg-black transition-all" style={{ width: `${(budget[1] / 10000) * 100}%` }} />
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-[9px] font-bold text-gray-300">$50</span>
                        <span className="text-[9px] font-bold text-gray-300">$10,000+</span>
                      </div>
                    </div>

                    {/* Follower Count */}
                    <div>
                      <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-black mb-6 border-b border-black pb-2">Reach</h3>
                      <div className="space-y-1">
                        {['Any', ...FOLLOWER_TIERS].map(t => (
                          <button 
                            key={t}
                            onClick={() => setTier(t)}
                            className={`w-full flex items-center justify-between p-4 border transition-all ${
                              tier === t ? 'bg-black border-black text-white' : 'bg-white border-gray-100 text-gray-500 hover:border-black hover:text-black'
                            }`}
                          >
                            <span className="text-[10px] font-black uppercase tracking-widest">{t}</span>
                            {tier === t && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Location Radius */}
                    <div>
                      <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-black mb-6 border-b border-black pb-2">Location</h3>
                      <div className="grid grid-cols-2 gap-1">
                        {RADIUS_OPTIONS.map(opt => (
                          <button 
                            key={opt}
                            onClick={() => setRadius(opt)}
                            className={`py-3 text-[9px] font-black uppercase tracking-widest border transition-all ${
                              radius === opt ? 'bg-black border-black text-white' : 'bg-white border-gray-100 text-gray-400 hover:text-black hover:border-black'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Platform Filter */}
                    <div>
                      <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-black mb-6 border-b border-black pb-2">Platforms</h3>
                      <div className="grid grid-cols-2 gap-1">
                        {PLATFORMS.map(plt => (
                          <button 
                            key={plt}
                            onClick={() => togglePlatform(plt)}
                            className={`flex items-center justify-center p-3 text-[9px] font-black uppercase tracking-widest border transition-all ${
                              platforms.includes(plt) ? 'bg-black border-black text-white' : 'bg-white border-gray-100 text-gray-400 hover:border-black hover:text-black'
                            }`}
                          >
                            {plt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Availability Toggle */}
                    <button 
                      onClick={() => setAvailable(!available)}
                      className={`w-full p-5 border flex items-center justify-between transition-all ${available ? 'bg-black border-black text-white' : 'bg-white border-gray-100 text-gray-400 hover:border-black hover:text-black'}`}
                    >
                      <span className="text-[10px] font-black uppercase tracking-widest">Available Now</span>
                      <div className={`w-2 h-2 ${available ? 'bg-green-400 animate-pulse' : 'bg-gray-200'}`} />
                    </button>

                    {/* Star Rating */}
                    <div>
                      <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-black mb-6 border-b border-black pb-2">Rating</h3>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(star => (
                          <button 
                            key={star}
                            onClick={() => setRating(star)}
                            className={`flex-1 h-12 border flex items-center justify-center text-[10px] font-black transition-all ${
                              rating === star ? 'bg-black border-black text-white' : 'bg-white border-gray-100 text-gray-300 hover:border-black hover:text-black'
                            }`}
                          >
                            {star}★
                          </button>
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={clearFilters}
                      className="w-full py-6 text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 hover:text-red-500 transition-all pt-12"
                    >
                      Clear Filters
                    </button>
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>
            
            {/* ── Results Main Content ── */}
            <main className="flex-1 min-w-0">
              
              {/* Toolbar */}
              <div className="flex flex-wrap items-center gap-6 mb-10 pb-6 border-b border-black">
                
                {/* Desktop Sidebar Toggle */}
                <button 
                  onClick={() => setShowDesktopSidebar(!showDesktopSidebar)}
                  className="hidden lg:flex items-center gap-3 bg-black text-white px-6 py-4 border border-black hover:bg-white hover:text-black transition-all group"
                >
                  <svg className={`transition-transform duration-500 ${showDesktopSidebar ? 'rotate-180' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="0" ry="0"/><line x1="9" x2="9" y1="3" y2="21"/>
                  </svg>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em]">
                    {showDesktopSidebar ? 'Hide' : 'Show'} Filters
                  </span>
                </button>

                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Current View:</span>
                  <div className="flex flex-wrap gap-1">
                    {activeChips.length === 0 ? (
                      <span className="text-[9px] font-black uppercase tracking-widest text-black">All Talent</span>
                    ) : (
                      activeChips.map(chip => (
                        <button 
                          key={chip.id}
                          onClick={chip.onRemove}
                          className="group flex items-center gap-3 bg-white border border-gray-100 px-4 py-2 hover:border-black transition-all"
                        >
                          <span className="text-[9px] font-black uppercase tracking-widest text-black">{chip.label}</span>
                          <svg className="text-gray-300 group-hover:text-red-500 transition-colors" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                      ))
                    )}
                  </div>
                </div>

                {creators.length > 0 && (
                  <div className="ml-auto flex items-center gap-3 bg-gray-50 px-5 py-3 border border-gray-100">
                    <span className="w-1.5 h-1.5 bg-black" />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-black">{creators.length} Result{creators.length > 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>

              {/* Grid with Animations */}
              <motion.div 
                layout
                className={`grid gap-x-8 gap-y-16 ${
                  showDesktopSidebar 
                    ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3' 
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                }`}
              >
                {loading ? (
                  Array.from({ length: 8 }).map((_, i) => <CreatorSkeleton key={i} />)
                ) : (
                  <AnimatePresence mode="popLayout">
                    {creators.length === 0 ? (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        className="col-span-full py-40 flex flex-col items-center justify-center text-center border border-dashed border-gray-200"
                      >
                        <h3 className="text-4xl font-bold text-black mb-4 uppercase tracking-tighter">No Matches</h3>
                        <p className="text-gray-400 font-medium max-w-xs mb-10 text-xs leading-loose uppercase tracking-widest">Broaden your search criteria to discover more creators.</p>
                        <button onClick={clearFilters} className="bg-black text-white px-12 py-5 font-black text-[9px] uppercase tracking-[0.4em] hover:bg-white hover:text-black border border-black transition-all">Reset All</button>
                      </motion.div>
                    ) : (
                      creators.map((c, i) => (
                        <motion.div
                          key={c.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: i * 0.05, duration: 0.4 }}
                        >
                          <Link to={`/profile/${c.id}`} className="group block bg-white border border-gray-100 p-0 hover:border-black transition-all duration-300">
                            {/* Card Media */}
                            <div className="aspect-[4/5] relative overflow-hidden bg-gray-50">
                              {c.avatar_url ? (
                                <img src={c.avatar_url} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-7xl font-black text-gray-100 bg-white uppercase">
                                  {c.username[0]}
                                </div>
                              )}
                              
                              <div className="absolute top-0 right-0 p-6 flex flex-col items-end gap-2">
                                <span className="bg-white px-3 py-1 text-[8px] font-black uppercase tracking-widest text-black border border-black">
                                  {c.category || 'Creator'}
                                </span>
                              </div>
                              
                              {c.is_available && (
                                <div className="absolute bottom-6 left-6 flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 bg-green-500" />
                                  <span className="text-[8px] font-black uppercase tracking-widest text-white drop-shadow-sm">Live</span>
                                </div>
                              )}
                            </div>

                            {/* Card Content */}
                            <div className="p-8">
                              <div className="flex justify-between items-baseline mb-4 border-b border-gray-50 pb-4">
                                <h3 className="font-bold text-2xl text-black uppercase tracking-tighter">{c.username}</h3>
                                <span className="text-[10px] font-black text-black">
                                  ${c.min_budget ? Number(c.min_budget).toLocaleString() : '1,500'}+
                                </span>
                              </div>
                              
                              <p className="text-xs font-medium text-gray-400 mb-8 line-clamp-2 leading-relaxed uppercase tracking-wide">
                                {c.bio || "Premium creative production and high-impact visual storytelling."}
                              </p>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex gap-2">
                                  {(c.platforms || PLATFORMS).slice(0, 2).map(p => (
                                    <span key={p} className="text-[8px] font-black uppercase tracking-widest border border-gray-100 px-2 py-1">{p}</span>
                                  ))}
                                </div>
                                <div className="w-10 h-10 border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                                </div>
                              </div>
                            </div>
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
      </div>
      
      {/* ── Mobile Action Bar ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="w-full bg-black text-white py-8 font-black text-[10px] uppercase tracking-[0.5em] active:bg-gray-900 transition-all"
        >
          Filters
        </button>
      </div>
    </>
  );
}
      </div>
    </>
  );
}
