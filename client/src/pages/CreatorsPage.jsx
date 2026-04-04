import { motion } from 'framer-motion';

export default function CreatorsPage() {
  const creators = [
    { id: 1, name: "Alex Rivier", role: "Cinematographer", location: "Paris", work: "Lifestyle Film", img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "Sarah Chen", role: "Brand Identity", location: "New York", work: "Minimalist Branding", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "Marcus Thorne", role: "3D Motion Artist", location: "London", work: "Abstract Motion", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "Elena Rossi", role: "Photographer", location: "Milan", work: "Portrait Series", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" },
    { id: 5, name: "David Kim", role: "UI Designer", location: "Seoul", work: "Fintech App", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" },
    { id: 6, name: "Emma Wilson", role: "Illustrator", location: "Berlin", work: "Editorial Art", img: "https://images.unsplash.com/photo-1454165833741-979e3d063004?auto=format&fit=crop&w=800&q=80" },
    { id: 7, name: "Lucas Garcia", role: "Video Editor", location: "Madrid", work: "Travel Vlog", img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80" },
    { id: 8, name: "Aria Patel", role: "Content Strategist", location: "Mumbai", work: "Brand Narrative", img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80" },
    { id: 9, name: "Julian Voss", role: "Director", location: "Hamburg", work: "Automotive Film", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80" },
    { id: 10, name: "Sofia Mendez", role: "Fashion Stylist", location: "Mexico City", work: "Vogue Spread", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80" },
    { id: 11, name: "Kenji Sato", role: "Sound Designer", location: "Tokyo", work: "Ambient Scapes", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80" },
    { id: 12, name: "Olivia Bloom", role: "Floral Artist", location: "Amsterdam", work: "Botanical Design", img: "https://images.unsplash.com/photo-1490750967868-8820025f1976?auto=format&fit=crop&w=800&q=80" },
    { id: 13, name: "Zane Malik", role: "Graphic Designer", location: "Dubai", work: "Luxury Branding", img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80" },
    { id: 14, name: "Isabella Cruz", role: "Architectural Photo", location: "Lisbon", work: "Modern Spaces", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80" },
    { id: 15, name: "Thomas Wright", role: "Web Developer", location: "San Francisco", work: "SaaS Platform", img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80" },
    { id: 16, name: "Nina Ricci", role: "Product Designer", location: "Turin", work: "Ergonomic Furniture", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80" },
    { id: 17, name: "Leo Das", role: "VFX Artist", location: "Toronto", work: "CGI Environments", img: "https://images.unsplash.com/photo-1614850523296-e8c041de2394?auto=format&fit=crop&w=800&q=80" },
    { id: 18, name: "Chloe Sun", role: "UI/UX Designer", location: "Singapore", work: "E-commerce App", img: "https://images.unsplash.com/photo-1541462608141-ad6031ae147c?auto=format&fit=crop&w=800&q=80" },
    { id: 19, name: "Ryan Cole", role: "Documentary Lead", location: "Austin", work: "Social Justice Film", img: "https://images.unsplash.com/photo-1536240478700-b867341ea910?auto=format&fit=crop&w=800&q=80" },
    { id: 20, name: "Mila Kunis", role: "Creative Director", location: "Los Angeles", work: "Brand Strategy", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80" },
    { id: 21, name: "Anders Holm", role: "Industrial Designer", location: "Stockholm", work: "Scandi Furniture", img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80" },
    { id: 22, name: "Maya Angel", role: "Social Media Strategist", location: "London", work: "Viral Campaigns", img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80" },
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
        {creators.map((creator, i) => (
          <motion.div 
            key={creator.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            className="group cursor-pointer"
          >
            <div className={`aspect-[16/9] relative mb-8 overflow-hidden bg-gray-100`}>
               <img 
                 src={creator.img} 
                 alt={creator.name} 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
               />
               <div className="absolute top-6 right-6 bg-black text-white px-3 py-1 text-[10px] font-bold z-10 uppercase tracking-widest">
                 Verified
               </div>
               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
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
