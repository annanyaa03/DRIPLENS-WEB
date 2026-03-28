import { motion } from 'framer-motion';

export default function BrandsPage() {
  const jobs = [
    { 
      id: 1, 
      brand: "Nike", 
      title: "Summer 2024 Campaign", 
      type: "Videography", 
      budget: "$5,000 - $8,000",
      description: "Looking for a high-energy cinematographer to capture our new running collection in urban environments.",
      tags: ["Fast-paced", "Urban", "Premium"]
    },
    { 
      id: 2, 
      brand: "Apple", 
      title: "Product Launch Visuals", 
      type: "3D Motion Design", 
      budget: "$12,000 - $15,000",
      description: "Seeking 3D artists for hyper-realistic product renders and motion sequences for upcoming hardware.",
      tags: ["Hyper-real", "Minimalist", "High-budget"]
    },
    { 
      id: 3, 
      brand: "LVMH", 
      title: "Heritage Collection Shoot", 
      type: "Photography", 
      budget: "$3,000 - $5,000",
      description: "Portait photographer needed for an editorial series focusing on craftsmanship and legacy.",
      tags: ["Editorial", "Classical", "Luxury"]
    },
    { 
      id: 4, 
      brand: "Red Bull", 
      title: "Extreme Sports Docuseries", 
      type: "Video Editing", 
      budget: "$7,000 - $10,000",
      description: "Editor required for a 6-part series on mountain biking. Must be proficient in fast-cutting styles.",
      tags: ["Action", "Documentary", "Long-term"]
    },
    { 
      id: 5, 
      brand: "Spotify", 
      title: "Artist Portal UI Redesign", 
      type: "UI/UX Design", 
      budget: "$9,000 - $12,000",
      description: "Designer needed to overhaul the creator analytics dashboard. Focus on clarity and data visualization.",
      tags: ["B2B", "Product Design", "Complex Data"]
    },
    { 
      id: 6, 
      brand: "Tesla", 
      title: "Sustainability Report Graphics", 
      type: "Illustration", 
      budget: "$4,000 - $6,000",
      description: "Technical illustrator for a series of diagrams explaining battery recycling and energy flow.",
      tags: ["Technical", "Clean", "Corporate"]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 min-h-screen">
      <div className="mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold text-black mb-6 tracking-tight"
        >
          Brand Opportunities
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[#666666] text-xl max-w-2xl leading-relaxed"
        >
          Discover active briefs from world-class brands looking for elite creative talent.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {jobs.map((job, i) => (
          <motion.div 
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            className="driplens-card p-10 group hover:border-black transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#AAAAAA] mb-2">{job.brand}</p>
                <h3 className="text-2xl font-bold text-black group-hover:translate-x-1 transition-transform">{job.title}</h3>
              </div>
              <span className="bg-gray-50 border border-[#EEEEEE] text-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                {job.type}
              </span>
            </div>
            
            <p className="text-[#666666] text-sm leading-relaxed mb-8 max-w-lg">
              {job.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {job.tags.map((tag, j) => (
                <span key={j} className="text-[9px] uppercase tracking-widest font-bold text-[#999999] border border-[#EEEEEE] px-2 py-1">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center pt-8 border-t border-[#F5F5F5]">
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-[#AAAAAA] mb-1">Budget</p>
                <p className="text-lg font-bold text-black">{job.budget}</p>
              </div>
              <button className="btn-primary">
                View Brief
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
