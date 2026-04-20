import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Rocket, 
  Users, 
  Briefcase, 
  Layers, 
  Settings, 
  LifeBuoy, 
  Search, 
  ChevronDown, 
  ChevronRight,
  MessageSquare,
  Mail,
  Globe,
  ArrowRight
} from "lucide-react";

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSection, setExpandedSection] = useState(1);

  const sections = [
    {
      id: 1,
      title: "Getting Started",
      icon: <Rocket className="w-5 h-5" />,
      description: "Begin your journey with Driplens",
      topics: [
        { title: "Creating Your Account", link: "/auth" },
        { title: "Completing Your Profile", link: "/profile/edit" },
        { title: "Choosing Creator vs Brand", link: "https://www.google.com/search?q=creator+vs+brand+partnership+model" },
        { title: "First Steps Guide", link: "/tutorials" }
      ]
    },
    {
      id: 2,
      title: "Creator Features",
      icon: <Users className="w-5 h-5" />,
      description: "Everything creators need to know",
      topics: [
        { title: "Building Your Portfolio", link: "/upload" },
        { title: "Uploading Content", link: "/upload" },
        { title: "Connecting Social Media", link: "/integrations" },
        { title: "Understanding Analytics", link: "https://en.wikipedia.org/wiki/Data_analysis" },
        { title: "Finding Brand Opportunities", link: "/explore" }
      ]
    },
    {
      id: 3,
      title: "Brand Features",
      icon: <Briefcase className="w-5 h-5" />,
      description: "Resources for brand partners",
      topics: [
        { title: "Setting Up Your Brand Profile", link: "/profile/edit" },
        { title: "Searching for Creators", link: "/creators" },
        { title: "Managing Campaigns", link: "/dashboard/brand" },
        { title: "Messaging Creators", link: "/messages" },
        { title: "Campaign Analytics", link: "https://www.google.com/search?q=marketing+campaign+analytics+best+practices" }
      ]
    },
    {
      id: 4,
      title: "Integrations",
      icon: <Layers className="w-5 h-5" />,
      description: "Connect your favorite tools",
      topics: [
        { title: "Social Media Connections", link: "/integrations" },
        { title: "Payment Integration", link: "https://stripe.com/docs" },
        { title: "API Reference", link: "https://swagger.io/docs/specification/about/" },
        { title: "Webhooks & Automation", link: "https://en.wikipedia.org/wiki/Webhook" }
      ]
    },
    {
      id: 5,
      title: "Account & Settings",
      icon: <Settings className="w-5 h-5" />,
      description: "Manage your account",
      topics: [
        { title: "Privacy Settings", link: "/privacy" },
        { title: "Billing & Subscriptions", link: "/pricing" },
        { title: "Two-Factor Authentication", link: "https://www.authy.com/what-is-2fa/" },
        { title: "Deleting Your Account", link: "/support" }
      ]
    },
    {
      id: 6,
      title: "Troubleshooting",
      icon: <LifeBuoy className="w-5 h-5" />,
      description: "Common issues and solutions",
      topics: [
        { title: "Login Issues", link: "https://www.google.com/search?q=how+to+fix+login+problems" },
        { title: "Content Upload Problems", link: "/support" },
        { title: "Payment Issues", link: "https://www.google.com/search?q=common+payment+gateway+issues" },
        { title: "Technical Issues", link: "/support" }
      ]
    }
  ];

  const filteredSections = sections.filter(section => 
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.topics.some(topic => topic.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Auto-expand if search query changes and there's a match
  useEffect(() => {
    if (searchQuery && filteredSections.length > 0) {
      setExpandedSection(filteredSections[0].id);
    }
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Documentation | Driplens</title>
        <meta name="description" content="Comprehensive knowledge base for Driplens creators and brands. Learn how to set up your account, manage campaigns, and integrate tools." />
      </Helmet>

      {/* Hero Header */}
      <div className="relative bg-black py-20 px-4 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/4 w-1/2 h-full bg-blue-600/10 blur-[120px] rounded-full"></div>
          <div className="absolute -bottom-1/2 -right-1/4 w-1/2 h-full bg-purple-600/10 blur-[120px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              Documentation
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
              Master the Driplens platform with our comprehensive guides, technical references, and expert tips.
            </p>
            
            <div className="max-w-xl flex relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics, features, or troubleshooting..."
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 backdrop-blur-sm transition-all"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
                  Quick Navigation
                </h3>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setExpandedSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                        expandedSection === section.id 
                          ? "bg-black text-white shadow-lg shadow-black/10" 
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <span className={expandedSection === section.id ? "text-blue-400" : "text-gray-400"}>
                        {section.icon}
                      </span>
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Quick Links */}
              <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                <h4 className="font-bold text-blue-900 mb-2">Need API help?</h4>
                <p className="text-sm text-blue-700/80 mb-4">Check our developer portal for advanced integrations.</p>
                <Link to="/integrations" className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
                  Developer Portal <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {filteredSections.length > 0 ? (
                  filteredSections.map((section, index) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.05 }}
                      key={section.id}
                      className={`group border rounded-2xl overflow-hidden transition-all duration-300 ${
                        expandedSection === section.id 
                          ? "border-black shadow-xl shadow-black/5" 
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <button
                        onClick={() => setExpandedSection(expandedSection === section.id ? -1 : section.id)}
                        className="w-full p-6 text-left flex items-start justify-between bg-white"
                      >
                        <div className="flex gap-4">
                          <div className={`p-3 rounded-xl transition-colors ${
                            expandedSection === section.id ? "bg-black text-white" : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                          }`}>
                            {section.icon}
                          </div>
                          <div>
                            <h3 className="font-bold text-xl text-black mb-1">{section.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{section.description}</p>
                          </div>
                        </div>
                        <div className={`mt-1 transition-transform duration-300 ${expandedSection === section.id ? "rotate-180" : ""}`}>
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {expandedSection === section.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-gray-50/50"
                          >
                            <div className="p-6 pt-0 ml-16">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {section.topics.map((topic, topicIndex) => {
                                  const isExternal = topic.link.startsWith("http");
                                  return isExternal ? (
                                    <a
                                      key={topicIndex}
                                      href={topic.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="group/item flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-blue-200 hover:shadow-md transition-all"
                                    >
                                      <span className="text-gray-700 font-medium group-hover/item:text-blue-600 transition-colors">
                                        {topic.title}
                                      </span>
                                      <div className="flex items-center gap-2">
                                        <Globe className="w-3 h-3 text-gray-400 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover/item:text-blue-500 group-hover/item:translate-x-1 transition-all" />
                                      </div>
                                    </a>
                                  ) : (
                                    <Link
                                      key={topicIndex}
                                      to={topic.link}
                                      className="group/item flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-blue-200 hover:shadow-md transition-all"
                                    >
                                      <span className="text-gray-700 font-medium group-hover/item:text-blue-600 transition-colors">
                                        {topic.title}
                                      </span>
                                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover/item:text-blue-500 group-hover/item:translate-x-1 transition-all" />
                                    </Link>
                                  );
                                })}
                              </div>

                              {/* Continue Button */}
                              {index < filteredSections.length - 1 && (
                                <div className="mt-8 pt-8 border-t border-gray-100 flex justify-end">
                                  <button
                                    onClick={() => setExpandedSection(filteredSections[index + 1].id)}
                                    className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all group"
                                  >
                                    Continue to {filteredSections[index + 1].title}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200"
                  >
                    <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-black mb-2">No results found</h3>
                    <p className="text-gray-500">We couldn't find any documentation matching "{searchQuery}"</p>
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="mt-6 text-blue-600 font-bold hover:underline"
                    >
                      Clear search and show all
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-24 px-4 bg-gray-950 relative overflow-hidden">
        {/* Abstract background blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/5 blur-[100px] rounded-full"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Still need help?</h2>
          <p className="text-gray-400 text-lg mb-16 max-w-2xl mx-auto">
            Our support team is always here to help you solve any issues and get the most out of our platform.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              {
                icon: <MessageSquare className="w-6 h-6" />,
                title: "Live Chat",
                desc: "Get real-time assistance from our experts.",
                link: "Start Chat",
                href: "https://tawk.to",
                color: "blue"
              },
              {
                icon: <Mail className="w-6 h-6" />,
                title: "Email Support",
                desc: "Send us a message and we'll reply within 24h.",
                link: "support@driplens.com",
                href: "mailto:support@driplens.com",
                color: "purple"
              },
              {
                icon: <Globe className="w-6 h-6" />,
                title: "Community",
                desc: "Connect with thousands of other creators.",
                link: "Visit Forum",
                href: "https://discord.com",
                color: "indigo"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl group hover:bg-white/10 transition-all"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-white/10 text-white group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">{item.desc}</p>
                <a 
                  href={item.href}
                  className="inline-flex items-center gap-2 text-white font-bold group-hover:gap-3 transition-all"
                >
                  {item.link} <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
