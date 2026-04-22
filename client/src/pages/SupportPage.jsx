import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Users, 
  Search, 
  ChevronRight, 
  CheckCircle2, 
  Globe, 
  MapPin, 
  Clock,
  ArrowRight
} from "lucide-react";

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState("Account");
  const [searchQuery, setSearchQuery] = useState("");

  const faqItems = [
    {
      category: "Account",
      items: [
        {
          q: "How do I create a Driplens account?",
          a: "Visit our sign-up page and enter your email address. Then choose whether you're a creator or brand, complete your profile, and you're ready to go!"
        },
        {
          q: "Can I change my account type later?",
          a: "You can have both creator and brand accounts using the same email. Simply switch between them in your account settings."
        },
        {
          q: "How do I reset my password?",
          a: "Click 'Forgot Password' on the login page. We'll send you an email with a link to reset your password securely."
        },
        {
          q: "Is my data secure on Driplens?",
          a: "Yes, we use industry-standard encryption and security measures to protect your personal information. See our Privacy Policy for details."
        }
      ]
    },
    {
      category: "Creators",
      items: [
        {
          q: "What content can I upload?",
          a: "You can upload photos, videos, and links to your social media portfolios. Ensure all content follows our community guidelines."
        },
        {
          q: "How are creators matched with brands?",
          a: "Our algorithm analyzes your niche, engagement rate, audience demographics, and portfolio to match you with relevant brands."
        },
        {
          q: "Can I hide my account from brands?",
          a: "Yes! You can adjust your privacy settings to be visible only to other creators or make your profile private."
        },
        {
          q: "How do I negotiate with brands?",
          a: "Use our in-app messaging to discuss rates and deliverables. Our guide on creator pricing can help you determine fair rates."
        }
      ]
    },
    {
      category: "Brands",
      items: [
        {
          q: "How do I find creators for my campaign?",
          a: "Use our advanced search filters to find creators by niche, engagement rate, audience demographics, and more."
        },
        {
          q: "What's included in campaign management?",
          a: "Track campaign performance, communicate with creators, manage contracts, and measure ROI all in one place."
        },
        {
          q: "Can I set up multiple brand accounts?",
          a: "Enterprise customers can set up team accounts and manage multiple brands from one dashboard."
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept all major credit cards and bank transfers. Invoicing is available for Enterprise customers."
        }
      ]
    },
    {
      category: "Payments",
      items: [
        {
          q: "How do creator payments work?",
          a: "Brands pay Driplens, and we process payouts to creators. Payouts are processed monthly to your connected bank account."
        },
        {
          q: "What are the payment processing fees?",
          a: "Creator payouts have a small processing fee. Check your account settings for exact details on your plan."
        },
        {
          q: "When do I receive my payment?",
          a: "Payouts are processed monthly, typically arriving in 3-5 business days after processing."
        },
        {
          q: "Is there a minimum payout amount?",
          a: "Yes, the minimum payout is $20. If your balance is below this, it carries over to the next month."
        }
      ]
    }
  ];

  const supportChannels = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "Mon-Fri, 9am-6pm EST",
      action: "Start Chat",
      color: "bg-blue-500"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Support",
      description: "Detailed help for complex issues",
      availability: "Response within 24 hours",
      action: "Send Email",
      link: "mailto:support@driplens.com",
      color: "bg-purple-500"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Support",
      description: "Talk directly with our team",
      availability: "Enterprise customers only",
      action: "Schedule Call",
      color: "bg-emerald-500"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community",
      description: "Get help from other users",
      availability: "Available 24/7",
      action: "Visit Forum",
      color: "bg-orange-500"
    }
  ];

  const filteredFaqs = faqItems.find(cat => cat.category === activeTab)?.items || [];

  return (
    <div className="min-h-screen bg-[#fafafa] text-black selection:bg-black selection:text-white pb-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-white border-b border-zinc-100">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-zinc-50 rounded-none blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-zinc-50 rounded-none blur-3xl opacity-50" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              How can we <span className="text-zinc-400">help?</span>
            </h1>
            <p className="text-xl text-zinc-500 max-w-2xl mx-auto mb-12">
              Search our knowledge base or reach out to our dedicated support team.
            </p>

            <div className="max-w-2xl mx-auto relative group">
              <div className="absolute inset-0 bg-black/5 rounded-none blur-xl group-hover:bg-black/10 transition-all duration-500" />
              <div className="relative flex items-center bg-white border border-zinc-200 rounded-none p-2 pl-6 focus-within:border-black transition-all shadow-sm">
                <Search className="w-5 h-5 text-zinc-400 mr-3" />
                <input
                  type="text"
                  placeholder="Ask a question..."
                  className="flex-1 bg-transparent py-4 outline-none text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="bg-black text-white px-8 py-4 rounded-none font-bold hover:bg-zinc-800 transition-colors">
                  Search
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportChannels.map((channel, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="group p-8 bg-white border border-zinc-100 rounded-none hover:border-black/10 hover:shadow-2xl hover:shadow-black/5 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-none ${channel.color} flex items-center justify-center text-white mb-6 shadow-lg shadow-black/5`}>
                {channel.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{channel.title}</h3>
              <p className="text-zinc-500 text-sm mb-4 leading-relaxed">{channel.description}</p>
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 mb-6 bg-zinc-50 py-2 px-3 rounded-none w-fit">
                <Clock className="w-3 h-3" />
                {channel.availability}
              </div>
              <a
                href={channel.link || "#"}
                className="flex items-center gap-2 font-bold group-hover:gap-3 transition-all"
              >
                {channel.action} <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white border-y border-zinc-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-zinc-500">Quick answers to common questions from our community.</p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center flex-wrap gap-2 mb-12">
            {faqItems.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveTab(cat.category)}
                className={`px-8 py-3 rounded-none font-bold transition-all ${
                  activeTab === cat.category
                    ? "bg-black text-white shadow-xl shadow-black/20"
                    : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid gap-4"
              >
                {filteredFaqs.map((faq, idx) => (
                  <div 
                    key={idx} 
                    className="p-8 border border-zinc-100 rounded-none bg-[#fafafa] hover:bg-white hover:border-zinc-200 hover:shadow-sm transition-all"
                  >
                    <h4 className="text-lg font-bold mb-4 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-none bg-black text-white flex items-center justify-center text-[10px] shrink-0 mt-1">Q</span>
                      {faq.q}
                    </h4>
                    <p className="text-zinc-600 leading-relaxed pl-9">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* System Status card */}
          <div className="bg-white p-10 border border-zinc-100 rounded-none relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8">
              <div className="w-16 h-16 bg-green-50 rounded-none flex items-center justify-center animate-pulse">
                <div className="w-4 h-4 bg-green-500 rounded-none" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-8">System Status</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-100 rounded-none">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
                <div>
                  <div className="font-bold text-green-900">All Systems Operational</div>
                  <div className="text-sm text-green-700">Performance is normal across all regions.</div>
                </div>
              </div>
              <button className="flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-black transition-colors">
                View detailed status <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-8 bg-zinc-900 text-white rounded-none flex flex-col justify-between group">
              <Globe className="w-8 h-8 text-zinc-500 group-hover:text-white transition-colors mb-8" />
              <div>
                <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest block mb-2">Our Office</span>
                <p className="text-lg font-medium leading-relaxed">
                  123 Creator Street<br />
                  San Francisco, CA 94103
                </p>
              </div>
            </div>
            <div className="p-8 bg-white border border-zinc-100 rounded-none flex flex-col justify-between">
              <MapPin className="w-8 h-8 text-black mb-8" />
              <div>
                <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest block mb-2">Connect</span>
                <p className="text-lg font-bold">support@driplens.com</p>
                <div className="mt-4 flex items-center gap-2 text-zinc-400 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-none" />
                  Avg response: 4h
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ExternalLink({ className }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" x2="21" y1="14" y2="3" />
    </svg>
  );
}
