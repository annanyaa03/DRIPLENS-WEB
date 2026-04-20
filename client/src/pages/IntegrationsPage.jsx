import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Instagram, 
  Youtube, 
  Twitter, 
  Linkedin, 
  CreditCard, 
  Slack, 
  BarChart, 
  Zap, 
  ArrowRight, 
  ExternalLink, 
  Check, 
  Plus, 
  Search,
  LayoutGrid,
  Filter,
  ShieldCheck,
  Code2,
  Cpu,
  Video,
  Music2,
  Gamepad2,
  Heart,
  ShoppingBag,
  MessageSquare,
  Globe
} from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function IntegrationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ["All", "Social", "Payments", "Productivity", "Analytics", "Automation"];

  const integrations = [
    {
      name: "Instagram",
      description: "Connect and showcase your Instagram portfolio directly on Driplens.",
      icon: <Instagram className="w-8 h-8" />,
      features: ["Portfolio sync", "Analytics", "Content showcase"],
      category: "Social",
      color: "from-purple-500 via-pink-500 to-orange-500",
      status: "Available"
    },
    {
      name: "TikTok",
      description: "Display your TikTok content and reach brands looking for TikTok creators.",
      icon: <Music2 className="w-8 h-8" />,
      features: ["Video showcase", "Engagement metrics", "Creator matching"],
      category: "Social",
      color: "from-black via-gray-900 to-red-600",
      status: "Available"
    },
    {
      name: "YouTube",
      description: "Link your YouTube channel to your creator profile and attract brand partnerships.",
      icon: <Youtube className="w-8 h-8" />,
      features: ["Channel metrics", "Video showcase", "Subscriber data"],
      category: "Social",
      color: "from-red-600 to-red-700",
      status: "Available"
    },
    {
      name: "Twitter/X",
      description: "Connect your Twitter account to display your reach and influence.",
      icon: <Twitter className="w-8 h-8" />,
      features: ["Follower count", "Engagement stats", "Verification"],
      category: "Social",
      color: "from-blue-400 to-blue-600",
      status: "Available"
    },
    {
      name: "LinkedIn",
      description: "Add professional credentials and industry expertise to your profile.",
      icon: <Linkedin className="w-8 h-8" />,
      features: ["Professional profile", "Endorsements", "Experience"],
      category: "Social",
      color: "from-blue-700 to-blue-800",
      status: "Available"
    },
    {
      name: "Stripe",
      description: "Secure payment processing for brand collaborations and sponsorships.",
      icon: <CreditCard className="w-8 h-8" />,
      features: ["Payment processing", "Invoicing", "Payouts"],
      category: "Payments",
      color: "from-indigo-500 to-indigo-600",
      status: "Available"
    },
    {
      name: "Slack",
      description: "Get Driplens notifications directly in your Slack workspace.",
      icon: <Slack className="w-8 h-8" />,
      features: ["Notifications", "Updates", "Collaboration"],
      category: "Productivity",
      color: "from-emerald-500 to-emerald-600",
      status: "Available"
    },
    {
      name: "Google Analytics",
      description: "Track your website traffic and performance metrics from Driplens.",
      icon: <BarChart className="w-8 h-8" />,
      features: ["Traffic analysis", "User behavior", "Conversion tracking"],
      category: "Analytics",
      color: "from-yellow-400 to-orange-500",
      status: "Available"
    },
    {
      name: "Zapier",
      description: "Automate workflows and connect Driplens with 1000+ apps.",
      icon: <Zap className="w-8 h-8" />,
      features: ["Automation", "Workflow building", "App connections"],
      category: "Automation",
      color: "from-orange-500 to-orange-600",
      status: "Available"
    }
  ];

  const comingSoon = [
    { name: "Twitch", icon: <Gamepad2 className="w-8 h-8" />, timeline: "Q3 2024" },
    { name: "Patreon", icon: <Heart className="w-8 h-8" />, timeline: "Q4 2024" },
    { name: "Discord", icon: <MessageSquare className="w-8 h-8" />, timeline: "Q4 2024" },
    { name: "Shopify", icon: <ShoppingBag className="w-8 h-8" />, timeline: "Q1 2025" }
  ];

  const filteredIntegrations = integrations.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1, 
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Integrations | DripLens - Connect Your Toolkit</title>
        <meta name="description" content="Enhance your DripLens experience by connecting with Instagram, TikTok, Stripe, Slack, and more." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-black text-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-900/50 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-wider mb-6">
              <Cpu className="w-3 h-3" />
              Power up your workflow
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Connect your <span className="text-gray-400">ecosystem.</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
              Seamlessly integrate DripLens with the tools you already use. 
              Sync portfolios, automate payouts, and track analytics in one place.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="sticky top-20 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-black text-white shadow-lg"
                    : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search integrations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
            />
          </div>
        </div>
      </section>

      {/* Available Integrations Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-black mb-2">Available Integrations</h2>
              <p className="text-gray-500">Ready to connect with your favorite services.</p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Enterprise-grade security</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredIntegrations.map((item, index) => (
                <motion.div
                  key={item.name}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.95 }}
                  layout
                  className="group relative p-8 rounded-3xl border border-gray-100 bg-white hover:border-black transition-all duration-300 hover:shadow-[0_24px_48px_-15px_rgba(0,0,0,0.08)] flex flex-col"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} p-4 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-black">{item.name}</h3>
                      <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-wider">
                        Active
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                      {item.description}
                    </p>
                    
                    <div className="space-y-3 mb-8">
                      {item.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-gray-50 flex items-center justify-center">
                            <Check className="w-3 h-3 text-black" />
                          </div>
                          <span className="text-xs font-medium text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-black text-white font-bold text-sm hover:opacity-90 transition-all">
                    Connect {item.name}
                    <Plus className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredIntegrations.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex p-4 bg-gray-50 rounded-full mb-4">
                <Search className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">No integrations found</h3>
              <p className="text-gray-500">Try adjusting your search or category filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50/50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black mb-4">On Our Roadmap</h2>
            <p className="text-gray-500">We're constantly expanding our ecosystem. See what's coming next.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {comingSoon.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-3xl bg-white border border-gray-100 text-center flex flex-col items-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-black mb-1">{item.name}</h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.timeline}</p>
                <button className="mt-6 text-xs font-bold text-black border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors">
                  Get Notified
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise / API Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-[40px] bg-black text-white p-12 md:p-20 overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-bold uppercase tracking-wider mb-8">
                <Code2 className="w-3 h-3" />
                For Developers
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Build your own integration.
              </h2>
              <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                Unlock the full power of DripLens with our robust API. 
                Custom integrations are available for Enterprise teams to sync with internal tools.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Link 
                  to="/pricing" 
                  className="px-10 py-5 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-2"
                >
                  View Enterprise Plans
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a 
                  href="#" 
                  className="px-10 py-5 bg-white/10 border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                >
                  API Documentation
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute bottom-[-50px] right-[-50px] w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="pb-32 px-4 text-center">
        <div className="max-w-2xl mx-auto italic text-gray-500 text-lg">
          "Connecting Stripe and Instagram to DripLens changed our workflow. We went from manual invoicing to automated payouts in minutes."
          <div className="mt-4 not-italic flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
              <img src="https://ui-avatars.com/api/?name=Sarah+Chen&background=000&color=fff" alt="Sarah Chen" />
            </div>
            <div className="text-left">
              <span className="block text-sm font-bold text-black leading-none">Sarah Chen</span>
              <span className="text-xs text-gray-400">Founder, Velocity Creative</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
