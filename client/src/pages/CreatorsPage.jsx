import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { api } from '../lib/api';

const CATEGORIES = ['All', 'Videographers', 'Photographers', 'Designers', 'Artists', 'Strategists'];

// Skeleton card while loading
function CreatorSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[16/9] bg-gray-100 mb-6" />
      <div className="h-5 bg-gray-100 w-2/3 mb-2 rounded" />
      <div className="h-3 bg-gray-100 w-1/2 mb-4 rounded" />
      <div className="border-t border-[#F0F0F0] pt-4">
        <div className="h-3 bg-gray-100 w-1/4 mb-2 rounded" />
        <div className="h-4 bg-gray-100 w-3/4 rounded" />
      </div>
    </div>
  );
}

export default function CreatorsPage() {
  const [creators, setCreators]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [activeFilter, setFilter] = useState('All');
  const [search, setSearch]       = useState('');

  useEffect(() => {
    const fetchCreators = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ limit: 30 });
        if (activeFilter !== 'All') params.set('category', activeFilter);
        if (search) params.set('search', search);
        const data = await api.get(`/creators?${params}`);
        setCreators(data.data.creators);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    // Debounce search
    const timer = setTimeout(fetchCreators, search ? 400 : 0);
    return () => clearTimeout(timer);
  }, [activeFilter, search]);

  return (
    <>
      <Helmet>
        <title>Discover Creators — Driplens</title>
        <meta name="description" content="Browse elite creative talent on Driplens. Cinematographers, photographers, designers and more." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-20 min-h-screen">
        <div className="mb-16">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-black mb-6 tracking-tight">
            Discover Creators
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-[#666] text-xl max-w-2xl leading-relaxed">
            Connect with elite talent and explore their latest work.
          </motion.p>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <input
            type="text"
            placeholder="Search creators..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border-b border-[#DDD] py-2 focus:outline-none focus:border-black bg-transparent text-sm w-full md:w-64 transition-colors"
          />
          <div className="flex space-x-6 border-b border-[#EEE] pb-0 overflow-x-auto no-scrollbar flex-1">
            {CATEGORIES.map((f, i) => (
              <button
                key={i}
                onClick={() => setFilter(f)}
                className={`text-sm font-bold uppercase tracking-[0.15em] whitespace-nowrap pb-3 transition-all border-b-2 ${
                  activeFilter === f ? 'text-black border-black' : 'text-[#BBB] border-transparent hover:text-black'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="text-center py-20 text-red-500 text-sm">{error}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <CreatorSkeleton key={i} />)
            : creators.length === 0
              ? <p className="col-span-3 text-center py-20 text-[#999] text-sm uppercase tracking-widest">No creators found.</p>
              : creators.map((creator, i) => (
                <motion.div
                  key={creator.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i }}
                  className="group cursor-pointer"
                >
                  <Link to={`/profile/${creator.id}`} className="block">
                    <div className="aspect-[16/9] relative mb-6 overflow-hidden bg-gray-100">
                      {creator.avatar_url
                        ? <img src={creator.avatar_url} alt={creator.username}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        : <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-300">
                            {creator.username?.[0]?.toUpperCase()}
                          </div>
                      }
                      <div className="absolute top-4 right-4 bg-black text-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest">
                        Verified
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                        <span className="bg-white text-black px-6 py-3 font-bold text-xs uppercase tracking-widest shadow-2xl">
                          View Portfolio
                        </span>
                      </div>
                    </div>
                    <h3 className="font-bold text-xl text-black mb-1 group-hover:translate-x-1 transition-transform">{creator.username}</h3>
                    <p className="text-xs uppercase tracking-[0.15em] font-semibold text-[#AAA] mb-3">
                      {creator.category || 'Creative'}{creator.location ? ` • ${creator.location}` : ''}
                    </p>
                    {creator.bio && (
                      <div className="pt-3 border-t border-[#F0F0F0]">
                        <p className="text-sm text-black leading-relaxed line-clamp-2">{creator.bio}</p>
                      </div>
                    )}
                  </Link>
                </motion.div>
              ))
          }
        </div>
      </div>
    </>
  );
}
