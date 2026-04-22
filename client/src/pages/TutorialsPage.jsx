import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";

export default function TutorialsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const tutorials = [
    {
      id: 1,
      title: "Getting Started as a Creator",
      duration: "5 min read",
      level: "Beginner",
      category: "Creator",
      description: "Learn the basics of setting up your creator profile and getting your first followers.",
      videoUrl: "#",
      thumbnail: "🎬"
    },
    {
      id: 2,
      title: "Optimizing Your Portfolio",
      duration: "8 min read",
      level: "Intermediate",
      category: "Creator",
      description: "Strategies to showcase your work and attract more brand partnerships.",
      videoUrl: "#",
      thumbnail: "🎨"
    },
    {
      id: 3,
      title: "Mastering Social Media Analytics",
      duration: "10 min read",
      level: "Intermediate",
      category: "Creator",
      description: "Understand your metrics and use them to grow your audience effectively.",
      videoUrl: "#",
      thumbnail: "📊"
    },
    {
      id: 4,
      title: "Connecting Your Social Accounts",
      duration: "3 min watch",
      level: "Beginner",
      category: "Creator",
      description: "Step-by-step guide to linking Instagram, TikTok, YouTube and other platforms.",
      videoUrl: "#",
      thumbnail: "🔗"
    },
    {
      id: 5,
      title: "Negotiating Brand Partnerships",
      duration: "12 min read",
      level: "Advanced",
      category: "Creator",
      description: "Expert tips on negotiating rates and creating successful brand collaborations.",
      videoUrl: "#",
      thumbnail: "🤝"
    },
    {
      id: 6,
      title: "Finding Your Target Audience",
      duration: "7 min read",
      level: "Intermediate",
      category: "Creator",
      description: "Identify and understand your ideal audience to create more engaging content.",
      videoUrl: "#",
      thumbnail: "👥"
    },
    {
      id: 7,
      title: "Setting Up Your Brand Profile",
      duration: "6 min read",
      level: "Beginner",
      category: "Brand",
      description: "Complete guide to creating a compelling brand profile on Driplens.",
      videoUrl: "#",
      thumbnail: "🏢"
    },
    {
      id: 8,
      title: "Finding the Right Creators",
      duration: "9 min read",
      level: "Intermediate",
      category: "Brand",
      description: "Learn advanced search techniques to find creators that match your brand.",
      videoUrl: "#",
      thumbnail: "🔍"
    },
    {
      id: 9,
      title: "Creating Successful Campaigns",
      duration: "15 min read",
      level: "Advanced",
      category: "Brand",
      description: "Best practices for planning and executing influencer marketing campaigns.",
      videoUrl: "#",
      thumbnail: "📢"
    },
    {
      id: 10,
      title: "Measuring Campaign ROI",
      duration: "10 min read",
      level: "Advanced",
      category: "Brand",
      description: "Track and analyze the performance of your influencer partnerships.",
      videoUrl: "#",
      thumbnail: "📈"
    },
    {
      id: 11,
      title: "Using Analytics Dashboard",
      duration: "8 min watch",
      level: "Beginner",
      category: "General",
      description: "Navigate and understand all the metrics in your analytics dashboard.",
      videoUrl: "#",
      thumbnail: "📱"
    },
    {
      id: 12,
      title: "Advanced Messaging Features",
      duration: "5 min watch",
      level: "Intermediate",
      category: "General",
      description: "Master the messaging platform for efficient communication.",
      videoUrl: "#",
      thumbnail: "💬"
    }
  ];

  const categories = ["All", "Creator", "Brand", "General"];

  const filteredTutorials = activeCategory === "All" 
    ? tutorials 
    : tutorials.filter(t => t.category === activeCategory);

  const getLevelStyles = (level) => {
    switch (level) {
      case "Beginner":
        return "bg-green-50 text-green-700 border-green-100";
      case "Intermediate":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "Advanced":
        return "bg-purple-50 text-purple-700 border-purple-100";
      default:
        return "bg-gray-50 text-gray-700 border-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-black selection:text-white">
      <Helmet>
        <title>Tutorials | Driplens Knowledge Base</title>
        <meta name="description" content="Master Driplens with our comprehensive step-by-step video and written guides for creators and brands." />
      </Helmet>

      {/* Hero Header */}
      <div className="relative overflow-hidden bg-white border-b border-gray-100 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-gray-50 rounded-none blur-3xl opacity-50" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-7xl font-bold text-black mb-8 tracking-tighter">
              Level up your <br />
              <span className="text-gray-400">content game.</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
              Everything you need to know about mastering Driplens. From setting up your profile to launching multi-channel campaigns.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Featured Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-none overflow-hidden bg-black shadow-2xl group cursor-pointer"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white rounded-none flex items-center justify-center text-black group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4.5 3a.5.5 0 00-.5.5v13a.5.5 0 00.757.429l11-6.5a.5.5 0 000-.858l-11-6.5a.5.5 0 00-.257-.071z" />
                  </svg>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
            
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-none bg-black text-white text-[10px] font-bold uppercase tracking-widest mb-6">
                Featured Tutorial
              </div>
              <h2 className="text-4xl font-bold text-black mb-6 tracking-tight">Getting Started with Driplens</h2>
              <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                In this comprehensive 15-minute guide, we'll walk you through everything you need to know to get started on Driplens, from creating your account to your first collaboration.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-black text-white font-bold rounded-none hover:bg-gray-800 transition-all active:scale-95">
                  Watch Video
                </button>
                <button className="px-8 py-4 border border-black text-black font-bold rounded-none hover:bg-black hover:text-white transition-all active:scale-95">
                  Read Transcript
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-none text-sm font-medium transition-all ${
                    activeCategory === cat 
                      ? "bg-black text-white" 
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative max-w-md w-full">
              <input 
                type="text" 
                placeholder="Search tutorials..." 
                className="w-full pl-12 pr-6 py-3 bg-gray-50 border-none rounded-none focus:ring-2 focus:ring-black transition-all outline-none text-black"
              />
              <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            <AnimatePresence mode="popLayout">
              {filteredTutorials.map((tutorial) => (
                <motion.div
                  key={tutorial.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group"
                >
                  <div className="relative aspect-video rounded-none overflow-hidden bg-gray-100 mb-6 group-hover:shadow-xl transition-all duration-500">
                    <div className="absolute inset-0 flex items-center justify-center text-5xl grayscale group-hover:grayscale-0 transition-all duration-500">
                      {tutorial.thumbnail}
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                  </div>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-0.5 rounded-none text-[10px] font-bold uppercase tracking-wider border ${getLevelStyles(tutorial.level)}`}>
                      {tutorial.level}
                    </span>
                    <span className="text-[11px] font-medium text-gray-400 tracking-wide uppercase">{tutorial.duration}</span>
                  </div>

                  <h3 className="text-xl font-bold text-black mb-3 group-hover:text-gray-600 transition-colors">
                    {tutorial.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
                    {tutorial.description}
                  </p>
                  
                  <a href={tutorial.videoUrl} className="inline-flex items-center text-sm font-bold text-black gap-2 group/link">
                    <span>View Tutorial</span>
                    <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-none blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white rounded-none blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold mb-8 tracking-tight">Still have questions?</h2>
          <p className="text-gray-400 text-xl mb-12">
            Our support team is available 24/7 to help you with any issues you might encounter.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/contact" className="px-10 py-4 bg-white text-black font-bold rounded-none hover:bg-gray-200 transition-all">
              Contact Support
            </Link>
            <Link to="/documentation" className="px-10 py-4 border border-white/20 text-white font-bold rounded-none hover:bg-white hover:text-black transition-all">
              Browse Docs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
