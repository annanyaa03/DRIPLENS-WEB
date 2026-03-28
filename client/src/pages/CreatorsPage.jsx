import { motion } from 'framer-motion';

export default function CreatorsPage() {
  const creators = [
    { id: 1, name: "Alex Rivier", role: "Cinematographer", location: "Paris", work: "Lifestyle Film", img: "bg-slate-200" },
    { id: 2, name: "Sarah Chen", role: "Brand Identity", location: "New York", work: "Minimalist Branding", img: "bg-stone-200" },
    { id: 3, name: "Marcus Thorne", role: "3D Motion Artist", location: "London", work: "Abstract Motion", img: "bg-zinc-200" },
    { id: 4, name: "Elena Rossi", role: "Photographer", location: "Milan", work: "Portrait Series", img: "bg-gray-200" },
    { id: 5, name: "David Kim", role: "UI Designer", location: "Seoul", work: "Fintech App", img: "bg-slate-100" },
    { id: 6, name: "Emma Wilson", role: "Illustrator", location: "Berlin", work: "Editorial Art", img: "bg-stone-100" },
    { id: 7, name: "Lucas Garcia", role: "Video Editor", location: "Madrid", work: "Travel Vlog", img: "bg-zinc-100" },
    { id: 8, name: "Aria Patel", role: "Content Strategist", location: "Mumbai", work: "Brand Narrative", img: "bg-gray-100" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 min-h-screen">
      <div className="mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold text-black mb-6 tracking-tight"
        >
          Discover Creators
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[#666666] text-xl max-w-2xl leading-relaxed"
        >
          Connect with elite talent and explore their latest work and products.
        </motion.p>
      </div>
      
      <div className="flex space-x-8 mb-16 border-b border-[#EEEEEE] pb-6 overflow-x-auto no-scrollbar">
        {["All", "Videographers", "Photographers", "Designers", "Artists", "Strategists"].map((filter, i) => (
          <button key={i} className={`text-sm font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-300 ${i === 0 ? 'text-black border-b border-black pb-6 -mb-[25px]' : 'text-[#BBBBBB] hover:text-black'}`}>
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-16">
        {creators.map((creator, i) => (
          <motion.div 
            key={creator.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            className="group cursor-pointer"
          >
            <div className={`aspect-[4/5] ${creator.img} relative mb-8 overflow-hidden`}>
               <div className="absolute top-6 right-6 bg-black text-white px-3 py-1 text-[10px] font-bold z-10 uppercase tracking-widest">
                 Verified
               </div>
               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <span className="bg-white text-black px-8 py-4 font-bold text-xs uppercase tracking-[0.2em] shadow-2xl">View Portfolio</span>
               </div>
            </div>
            <div>
              <h3 className="font-bold text-2xl text-black mb-1 group-hover:translate-x-1 transition-transform">{creator.name}</h3>
              <p className="text-xs uppercase tracking-[0.15em] font-semibold text-[#AAAAAA] mb-4">{creator.role} • {creator.location}</p>
              <div className="pt-4 border-t border-[#F0F0F0]">
                <p className="text-[10px] uppercase tracking-widest font-bold text-[#888] mb-2">Featured Project</p>
                <p className="text-sm text-black font-medium leading-relaxed">{creator.work}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
