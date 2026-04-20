import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ChevronRight, 
  MessageSquare, 
  Users, 
  Building2, 
  ShieldCheck, 
  Briefcase, 
  ArrowRight,
  Globe
} from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [formStatus, setFormStatus] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("loading");
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setFormStatus(null), 5000);
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const offices = [
    {
      location: "San Francisco HQ",
      address: "123 Creator Street, San Francisco, CA 94103",
      phone: "+1 (415) 555-0100",
      email: "sf@driplens.com",
      hours: "Mon-Fri: 9am-6pm PST",
      icon: <Building2 className="w-8 h-8" />,
      image: "🌉"
    },
    {
      location: "New York Office",
      address: "456 Creator Avenue, New York, NY 10001",
      phone: "+1 (212) 555-0200",
      email: "ny@driplens.com",
      hours: "Mon-Fri: 9am-6pm EST",
      icon: <Building2 className="w-8 h-8" />,
      image: "🗽"
    },
    {
      location: "Europe (Remote)",
      address: "Serving creators across Europe",
      phone: "+44 20 7946 0958",
      email: "eu@driplens.com",
      hours: "Mon-Fri: 9am-6pm GMT",
      icon: <Globe className="w-8 h-8" />,
      image: "🌍"
    }
  ];

  const departments = [
    { name: "General Inquiries", email: "hello@driplens.com", icon: <Mail className="w-5 h-5" /> },
    { name: "Creator Support", email: "creators@driplens.com", icon: <Users className="w-5 h-5" /> },
    { name: "Brand Partnerships", email: "brands@driplens.com", icon: <Briefcase className="w-5 h-5" /> },
    { name: "Media & Press", email: "press@driplens.com", icon: <MessageSquare className="w-5 h-5" /> },
    { name: "Sales Inquiry", email: "sales@driplens.com", icon: <Send className="w-5 h-5" /> },
    { name: "Security Issues", email: "security@driplens.com", icon: <ShieldCheck className="w-5 h-5" /> }
  ];

  const faqs = [
    {
      q: "What is the best way to contact Driplens?",
      a: "For urgent issues, use our live chat. For detailed inquiries, email is best. Check our support center for common questions."
    },
    {
      q: "How long does it take to get a response?",
      a: "We typically respond to emails within 24 hours on business days. Live chat support is available during business hours."
    },
    {
      q: "Can I schedule a demo or call?",
      a: "Yes! For brand inquiries, contact sales@driplens.com. For creators, reach out to creators@driplens.com."
    },
    {
      q: "Do you have a press kit or media contact?",
      a: "Yes, our press team handles all media inquiries. Contact press@driplens.com for press kits and interviews."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] selection:bg-black selection:text-white">
      <Helmet>
        <title>Contact Us | Driplens</title>
        <meta name="description" content="Get in touch with the Driplens team. We're here to help you with creator support, brand partnerships, and general inquiries." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-gray-50 to-transparent -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-7xl font-bold text-black tracking-tight mb-6">
              Let's start a <span className="text-gray-400 italic font-serif">conversation</span>.
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Our team is here to help you build, grow, and connect. Reach out through any of our channels below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Contact Form Container (Col 1-7) */}
          <motion.div 
            className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-sm"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-black mb-8">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-4 text-black focus:ring-2 focus:ring-black outline-none transition-all placeholder:text-gray-300"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-4 text-black focus:ring-2 focus:ring-black outline-none transition-all placeholder:text-gray-300"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-gray-400">Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-4 text-black focus:ring-2 focus:ring-black outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select a reason for contacting</option>
                  {departments.map((dept, i) => (
                    <option key={i} value={dept.name}>{dept.name}</option>
                  ))}
                  <option value="Other">Other Inquiry</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-gray-400">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-4 text-black focus:ring-2 focus:ring-black outline-none transition-all resize-none placeholder:text-gray-300"
                  placeholder="Tell us how we can help..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={formStatus === "loading"}
                className="w-full group relative overflow-hidden bg-black text-white px-8 py-5 rounded-xl font-bold flex items-center justify-center gap-3 active:scale-[0.98] transition-all disabled:opacity-70"
              >
                {formStatus === "loading" ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>

              <AnimatePresence>
                {formStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3 text-green-700"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-medium">Message sent successfully! We'll be in touch soon.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Contact Details (Col 8-12) */}
          <div className="lg:col-span-5 space-y-12">
            
            {/* Quick Connect */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-black mb-8">Reach out directly</h3>
              <div className="space-y-4">
                {departments.slice(0, 3).map((dept, index) => (
                  <a 
                    key={index}
                    href={`mailto:${dept.email}`}
                    className="group flex items-center justify-between p-6 bg-white border border-gray-100 rounded-2xl hover:border-black hover:shadow-lg transition-all transform hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                        {dept.icon}
                      </div>
                      <div>
                        <p className="font-bold text-black text-sm">{dept.name}</p>
                        <p className="text-gray-400 text-sm">{dept.email}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-xl font-bold text-black mb-6">Resources</h3>
              <div className="grid grid-cols-1 gap-3">
                <Link to="/support" className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-black hover:text-white transition-all font-bold text-sm">
                   <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center group-hover:bg-white/10">
                     <MessageSquare className="w-4 h-4" />
                   </div>
                   Help & Support Center
                </Link>
                <a href="#" className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-black hover:text-white transition-all font-bold text-sm">
                   <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center group-hover:bg-white/10">
                     <Phone className="w-4 h-4" />
                   </div>
                   Live Chat Support
                </a>
                <Link to="/careers" className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-black hover:text-white transition-all font-bold text-sm">
                   <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center group-hover:bg-white/10">
                     <Users className="w-4 h-4" />
                   </div>
                   Join our team
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Offices Section */}
      <section className="py-32 bg-black text-white relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold mb-4">Global Presence</h2>
            <p className="text-gray-400">Where magic happens around the world.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors group"
              >
                <div className="text-4xl mb-6 bg-white/10 w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  {office.image}
                </div>
                <h3 className="text-xl font-bold mb-6">{office.location}</h3>
                
                <div className="space-y-4 text-sm text-gray-400">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                    <span>{office.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-600" />
                    <a href={`tel:${office.phone}`} className="hover:text-white transition-colors">{office.phone}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <a href={`mailto:${office.email}`} className="hover:text-white transition-colors">{office.email}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <span>{office.hours}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-black mb-12 text-center">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                className="border border-gray-100 rounded-2xl overflow-hidden"
                initial={false}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-black">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: activeFaq === index ? 180 : 0 }}
                  >
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-6 pt-0 text-gray-500 leading-relaxed bg-white">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="pb-32 px-4">
         <div className="max-w-5xl mx-auto bg-gradient-to-r from-gray-900 to-black rounded-[40px] p-12 sm:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-8">Ready to start?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth" className="w-full sm:w-auto px-10 py-5 bg-white text-black font-bold rounded-2xl hover:bg-gray-100 transition-all transform hover:scale-105">
                Join Driplens
              </Link>
              <Link to="/explore" className="w-full sm:w-auto px-10 py-5 bg-transparent border border-white/20 text-white font-bold rounded-2xl hover:bg-white/10 transition-all">
                Explore Platform
              </Link>
            </div>
         </div>
      </section>
    </div>
  );
}
