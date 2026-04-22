import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "How to Build an Engaged Audience as a Creator",
      excerpt: "Discover proven strategies for growing your audience organically and building genuine connections with followers. Learn how to leverage storytelling and consistent engagement to create a loyal community.",
      date: "April 10, 2024",
      author: "Sarah Chen",
      authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      category: "Creator Tips",
      readTime: "8 min",
      image: "/images/blog/featured.png",
      isFeatured: true
    },
    {
      id: 2,
      title: "The Future of Influencer Marketing in 2024",
      excerpt: "Explore emerging trends in influencer marketing and what brands should expect this year. From AI-driven campaigns to the rise of micro-communities.",
      date: "April 8, 2024",
      author: "Marcus Johnson",
      authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
      category: "Industry Insights",
      readTime: "10 min",
      image: "/images/blog/industry-insights.png"
    },
    {
      id: 3,
      title: "5 Brands That Nailed Influencer Partnerships",
      excerpt: "Case studies of successful brand-creator collaborations and what made them work. Analysis of campaign ROI and creative execution.",
      date: "April 5, 2024",
      author: "Jessica Lee",
      authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
      category: "Case Studies",
      readTime: "12 min",
      image: "/images/blog/creator-tips.png"
    },
    {
      id: 4,
      title: "Pricing Your Collaborations: A Creator's Guide",
      excerpt: "Learn how to determine fair rates for your influencer work and negotiate with brands like a pro. Pricing models explained.",
      date: "March 28, 2024",
      author: "Alex Rivera",
      authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      category: "Creator Tips",
      readTime: "9 min",
      image: "/images/blog/creator-tips.png"
    },
    {
      id: 5,
      title: "How Driplens Is Changing Creator-Brand Relationships",
      excerpt: "Inside look at how our platform is revolutionizing the way creators and brands connect, focusing on transparency and merit.",
      date: "March 25, 2024",
      author: "David Park",
      authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      category: "Company News",
      readTime: "6 min",
      image: "/images/blog/featured.png"
    },
    {
      id: 6,
      title: "The Science Behind Authentic Engagement",
      excerpt: "Understanding what makes content resonate with audiences and how to apply psychological principles to your strategy.",
      date: "March 22, 2024",
      author: "Emma Wilson",
      authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      category: "Industry Insights",
      readTime: "11 min",
      image: "/images/blog/industry-insights.png"
    },
    {
      id: 7,
      title: "Brand Safety: Protecting Your Creator Reputation",
      excerpt: "Best practices for creators to maintain brand alignment and avoid controversial partnerships that could hurt longevity.",
      date: "March 19, 2024",
      author: "Tom Anderson",
      authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom",
      category: "Creator Tips",
      readTime: "7 min",
      image: "/images/blog/creator-tips.png"
    },
    {
      id: 8,
      title: "The ROI of Micro-Influencers vs Macro-Influencers",
      excerpt: "Data-driven comparison of different influencer tiers and their effectiveness for niche brand conversions.",
      date: "March 15, 2024",
      author: "Rachel Green",
      authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel",
      category: "Case Studies",
      readTime: "13 min",
      image: "/images/blog/industry-insights.png"
    },
    {
      id: 9,
      title: "2024 Creator Economy Report",
      excerpt: "Annual industry report with statistics on creator earnings, platform dominance, and emerging growth trends in the ecosystem.",
      date: "March 12, 2024",
      author: "Driplens Team",
      authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Driplens",
      category: "Industry Insights",
      readTime: "15 min",
      image: "/images/blog/featured.png"
    }
  ];

  const categories = ["All", "Creator Tips", "Industry Insights", "Case Studies", "Company News"];

  const filteredPosts = selectedCategory === "All"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  // Separate featured post (it's always the first one in this mockup but logic can vary)
  const featuredPost = blogPosts.find(p => p.isFeatured) || blogPosts[0];
  const otherPosts = filteredPosts.filter(p => p.id !== (selectedCategory === "All" ? featuredPost.id : null));

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-20">
      <Helmet>
        <title>Blog | Industry Insights & Creator Tips | Driplens</title>
        <meta name="description" content="Explore the latest in the creator economy. Get expert tips, industry insights, and platform updates from the Driplens team." />
      </Helmet>

      {/* Hero / Header */}
      <div className="bg-white border-b border-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-7xl font-bold text-black mb-6 tracking-tighter">Insights & <br />Updates</h1>
            <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
              Exploring the intersection of creativity, commerce, and technology in the modern creator economy.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Featured Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-none overflow-hidden bg-black aspect-[21/9] flex items-center group cursor-pointer"
          >
            <img 
              src={featuredPost.image} 
              alt={featuredPost.title}
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
            
            <div className="relative z-10 p-8 md:p-16 max-w-3xl">
              <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-none text-xs font-bold text-white mb-6 uppercase tracking-widest leading-none">
                Featured Article
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {featuredPost.title}
              </h2>
              <p className="text-gray-300 text-lg mb-8 line-clamp-2 md:line-clamp-none">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <img src={featuredPost.authorImage} alt={featuredPost.author} className="w-10 h-10 rounded-none border border-white/20 bg-gray-800" />
                <div>
                  <p className="text-white font-semibold">{featuredPost.author}</p>
                  <p>{featuredPost.date} • {featuredPost.readTime} read</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Area */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-gray-100 pb-8">
              <div>
                <h3 className="text-sm font-bold text-black uppercase tracking-[0.2em] mb-2">Categories</h3>
                <p className="text-sm text-gray-500">Filter by topic to find what interests you</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-2.5 rounded-none text-sm font-bold transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-black text-white shadow-xl shadow-black/10 scale-105"
                        : "bg-white border border-gray-200 text-gray-600 hover:border-black hover:text-black"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 mb-20"
          >
            <AnimatePresence mode="popLayout">
              {otherPosts.map((post, index) => (
                <motion.article 
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group flex flex-col"
                >
                  <div className="relative aspect-[4/3] rounded-none overflow-hidden mb-6 bg-gray-100">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-none text-[10px] font-bold text-black uppercase tracking-wider shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                      <span>{post.date}</span>
                      <span className="w-1 h-1 rounded-none bg-gray-300"></span>
                      <span>{post.readTime} Read</span>
                    </div>
                    <h3 className="text-xl font-bold text-black mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                      <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    </h3>
                    <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <img src={post.authorImage} alt={post.author} className="w-8 h-8 rounded-none bg-gray-200" />
                      <span className="text-xs font-semibold text-black">{post.author}</span>
                    </div>
                    <Link to={`/blog/${post.id}`} className="text-xs font-bold text-black underline underline-offset-4 decoration-2 hover:text-gray-600 transition-colors">
                      Read More
                    </Link>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Pagination */}
          {otherPosts.length > 0 && (
            <div className="flex justify-center items-center gap-4 py-10 border-t border-gray-100">
              <button className="p-3 border border-gray-200 text-black rounded-none hover:bg-black hover:text-white transition-all transform hover:-translate-x-1">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="flex gap-2">
                <button className="w-10 h-10 bg-black text-white rounded-none font-bold">1</button>
                <button className="w-10 h-10 border border-gray-200 text-black rounded-none font-bold hover:border-black transition-colors">2</button>
                <button className="w-10 h-10 border border-gray-200 text-black rounded-none font-bold hover:border-black transition-colors">3</button>
              </div>
              <button className="p-3 border border-gray-200 text-black rounded-none hover:bg-black hover:text-white transition-all transform hover:translate-x-1">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}

          {otherPosts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-gray-500 italic">No articles found in this category yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-500/10 to-transparent blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-purple-500/10 to-transparent blur-3xl opacity-50"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Stay ahead of the curve</h2>
            <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
              Join 5,000+ creators and brands receiving our weekly digest on performance-based influencer marketing.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                required
                className="flex-1 px-6 py-4 rounded-none bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/40 transition-all"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-white text-black font-bold rounded-none hover:bg-gray-200 transition-all active:scale-95 whitespace-nowrap"
              >
                Join Newsletter
              </button>
            </form>
            <p className="mt-6 text-xs text-gray-500">
              No spam, ever. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
