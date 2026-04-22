import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  BarChart, 
  DollarSign, 
  ChevronRight,
  TrendingUp,
  Cpu,
  Users,
  Eye,
  Heart,
  Shield,
  Home,
  GraduationCap
} from "lucide-react";

export default function CareersPage() {
  const [activeDepartment, setActiveDepartment] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const jobListings = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      level: "Senior",
      salary: "$150k - $200k",
      description: "Build beautiful, performant user interfaces for millions of creators and brands."
    },
    {
      id: 2,
      title: "Product Manager - Creator Experience",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      level: "Mid-level",
      salary: "$130k - $170k",
      description: "Lead product strategy for our creator-facing features and initiatives."
    },
    {
      id: 3,
      title: "Brand Partnerships Manager",
      department: "Partnerships",
      location: "New York, NY",
      type: "Full-time",
      level: "Mid-level",
      salary: "$100k - $140k",
      description: "Build and nurture strategic partnerships with leading brands."
    },
    {
      id: 4,
      title: "Community Specialist",
      department: "Community",
      location: "Remote",
      type: "Full-time",
      level: "Entry-level",
      salary: "$60k - $80k",
      description: "Support and engage our creator community across all channels."
    },
    {
      id: 5,
      title: "Backend Engineer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      level: "Mid-level",
      salary: "$140k - $190k",
      description: "Build scalable systems that power millions of creator interactions."
    },
    {
      id: 6,
      title: "Data Analyst",
      department: "Analytics",
      location: "Remote",
      type: "Full-time",
      level: "Mid-level",
      salary: "$110k - $150k",
      description: "Drive data-informed decisions across the organization."
    }
  ];

  const benefits = [
    { icon: <DollarSign className="w-8 h-8 text-black" />, title: "Competitive Salary", description: "Industry-leading compensation packages" },
    { icon: <Heart className="w-8 h-8 text-black" />, title: "Health Insurance", description: "Comprehensive medical, dental, and vision coverage" },
    { icon: <Home className="w-8 h-8 text-black" />, title: "Remote Flexibility", description: "Work from anywhere with flexible schedules" },
    { icon: <GraduationCap className="w-8 h-8 text-black" />, title: "Learning & Development", description: "Annual budget for courses, conferences, and skills" },
    { icon: <Shield className="w-8 h-8 text-black" />, title: "Wellness Programs", description: "Mental health support and wellness initiatives" },
    { icon: <Users className="w-8 h-8 text-black" />, title: "Equity Options", description: "Share in our company's success" },
    { icon: <Clock className="w-8 h-8 text-black" />, title: "Time Off", description: "Generous vacation and parental leave policies" },
    { icon: <Eye className="w-8 h-8 text-black" />, title: "Team Culture", description: "Inclusive, collaborative, and supportive workplace" }
  ];

  const culture = [
    {
      icon: <Users className="w-6 h-6 text-black" />,
      title: "Creator-First Mindset",
      description: "Everything we do is with creators in mind. We listen to their needs and build accordingly."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-black" />,
      title: "Innovation & Impact",
      description: "We empower our team to take risks, experiment, and make meaningful impact on the creator economy."
    },
    {
      icon: <Cpu className="w-6 h-6 text-black" />,
      title: "Diversity & Inclusion",
      description: "We believe diverse perspectives drive better products and decisions. All backgrounds welcome."
    },
    {
      icon: <Eye className="w-6 h-6 text-black" />,
      title: "Transparency",
      description: "Open communication about company performance, challenges, and decisions at all levels."
    }
  ];

  const departments = ["All", ...new Set(jobListings.map(job => job.department))];

  const filteredJobs = activeDepartment === "All" 
    ? jobListings 
    : jobListings.filter(job => job.department === activeDepartment);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Careers at Driplens | Join the Creator Revolution</title>
        <meta name="description" content="Join Driplens and help build the future of the creator economy. Explore open positions in engineering, product, marketing, and more." />
      </Helmet>

      {/* Hero Header */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#E5E5E5] bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-7xl font-bold text-black mb-6 tracking-tighter leading-tight">
              Build the future of <br />
              <span className="text-gray-400">creator economy.</span>
            </h1>
            <p className="text-xl sm:text-2xl text-[#555555] max-w-2xl leading-relaxed">
              We're a team of innovators, creators, and builders on a mission to empower 
              every creator to build a sustainable business.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#open-positions" className="px-8 py-4 bg-black text-white font-bold rounded-none hover:bg-zinc-800 transition-all flex items-center gap-2">
                View Openings <ChevronRight className="w-4 h-4" />
              </a>
              <Link to="/about" className="px-8 py-4 border border-black text-black font-bold rounded-none hover:bg-gray-50 transition-all">
                Learn About Us
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#E5E5E5] overflow-hidden relative">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-black tracking-tighter uppercase">
                Why Work <br />
                <span className="text-zinc-300">at Driplens?</span>
              </h2>
              <div className="w-20 h-1 bg-black mb-8" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <p className="text-xl text-zinc-600 mb-10 leading-relaxed font-light">
                We're not just building a platform—we're transforming the creator economy. 
                Every team member plays a crucial role in empowering millions of creators 
                to build sustainable careers.
              </p>
              
              <div className="relative p-8 bg-zinc-50 border-l-4 border-black">
                <p className="text-lg text-black leading-relaxed italic font-medium">
                  "Our mission is to bridge the gap between creative passion and professional prosperity."
                </p>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-black/5 flex items-center justify-center -z-0">
                  <span className="text-4xl font-serif text-black/10">"</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Benefits & Perks</h2>
            <p className="text-xl text-[#555555]">Invested in your growth and well-being.</p>
          </div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="p-8 rounded-none border border-[#E5E5E5] hover:border-black transition-colors group"
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="font-bold text-black text-xl mb-3">{benefit.title}</h3>
                <p className="text-[#555555] leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl sm:text-5xl font-bold text-black mb-6 tracking-tighter uppercase">Our Culture <br /><span className="text-zinc-300">Pillars</span></h2>
              <p className="text-xl text-zinc-500 font-light leading-relaxed">How we work, lead, and grow together as a team.</p>
            </div>
            <div className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.5em] mb-2">DRIPLENS / INTERNAL</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-zinc-100">
            {culture.map((item, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-10 border-r border-b border-zinc-100 bg-white hover:bg-zinc-50 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-0 bg-black group-hover:h-full transition-all duration-500" />
                <div className="mb-8 p-0 text-black group-hover:scale-110 transition-transform duration-500 origin-left">
                  {item.icon}
                </div>
                <h3 className="font-bold text-black text-xl mb-4 tracking-tight uppercase group-hover:translate-x-2 transition-transform duration-500">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-800 transition-colors duration-500">{item.description}</p>
                <div className="mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <div className="w-8 h-px bg-black" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section id="open-positions" className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-zinc-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 border-b border-zinc-200 pb-12">
            <div className="max-w-xl">
              <h2 className="text-4xl sm:text-5xl font-bold text-black mb-6 tracking-tighter uppercase">Open <span className="text-zinc-300">Positions</span></h2>
              <p className="text-xl text-zinc-500 font-light leading-relaxed">Find your next challenge at Driplens. We're always looking for exceptional talent to join our mission.</p>
            </div>
            
            {/* Department Filter */}
            <div className="flex flex-wrap gap-6">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setActiveDepartment(dept)}
                  className={`group relative py-2 text-[10px] font-bold uppercase tracking-[0.1em] transition-all ${
                    activeDepartment === dept 
                    ? "text-black" 
                    : "text-zinc-400 hover:text-black"
                  }`}
                >
                  {dept}
                  <motion.div 
                    initial={false}
                    animate={{ 
                      width: activeDepartment === dept ? "100%" : "0%",
                      opacity: activeDepartment === dept ? 1 : 0
                    }}
                    className="absolute bottom-0 left-0 h-0.5 bg-black"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-0 border-t border-zinc-200">
            <AnimatePresence mode="popLayout">
              {filteredJobs.map((job) => (
                <motion.div
                  layout
                  key={job.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="group relative border-b border-zinc-200 transition-all duration-500 bg-white hover:bg-zinc-50"
                >
                  <div className="p-8 sm:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-4 mb-6">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em] group-hover:text-zinc-600">
                          {job.department}
                        </span>
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em] group-hover:text-zinc-600">
                          // {job.level}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4 transition-colors duration-500 tracking-tight uppercase">
                        {job.title}
                      </h3>
                      
                      <p className="text-zinc-500 text-lg mb-8 max-w-3xl transition-colors duration-500 font-light">
                        {job.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 group-hover:text-zinc-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" /> {job.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" /> {job.type}
                        </div>
                        <div className="flex items-center gap-2 font-black text-black">
                          <DollarSign className="w-4 h-4" /> {job.salary}
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative overflow-hidden">
                      <button className="relative z-10 px-10 py-5 bg-white text-black font-bold text-xs uppercase tracking-[0.3em] border border-black hover:bg-black hover:text-white transition-all duration-500">
                        Apply Now
                      </button>
                    </div>
                  </div>
                  
                  {/* Interactive indicator on hover */}
                  <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-8 group-hover:translate-x-0 hidden lg:block">
                     <ChevronRight className="w-8 h-8 text-black/10" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredJobs.length === 0 && (
              <div className="text-center py-32 bg-white border-b border-zinc-200">
                <p className="text-xl text-zinc-400 font-light uppercase tracking-widest">No open positions in this department at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="pt-16 pb-32 px-4 sm:px-6 lg:px-8 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.5em] mb-4">The Process</h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-black tracking-tight uppercase">Our Hiring Flow</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative">
            {/* Connector Line (Hidden on Mobile) */}
            <div className="hidden md:block absolute top-[25px] left-0 w-full h-px bg-zinc-100 -z-0" />
            
            {[
              { step: "01", title: "Apply", desc: "Submit your resume and portfolio" },
              { step: "02", title: "Screen", desc: "Initial talk with our recruiting team" },
              { step: "03", title: "Interview", desc: "Deep dive with the hiring team" },
              { step: "04", title: "Offer", desc: "Welcome to the Driplens family" }
            ].map((item, index) => (
              <motion.div 
                key={item.step} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group text-center relative z-10 px-6"
              >
                <div className="w-12 h-12 bg-white border border-zinc-200 flex items-center justify-center font-bold text-xs mx-auto mb-10 transition-all duration-500 group-hover:bg-black group-hover:text-white group-hover:border-black group-hover:scale-110">
                  {item.step}
                </div>
                <h4 className="font-bold text-black text-lg mb-4 tracking-tight uppercase group-hover:translate-y-[-4px] transition-transform duration-500">{item.title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed font-light group-hover:text-zinc-800 transition-colors duration-500">{item.desc}</p>
                
                {/* Visual accent */}
                <div className="mt-8 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <div className="w-4 h-0.5 bg-black" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-12 pb-32 px-4 sm:px-6 lg:px-8 border-t border-zinc-100 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6 tracking-tighter uppercase">Don't see your role?</h2>
          <p className="text-lg text-zinc-500 mb-10 max-w-xl mx-auto leading-relaxed font-light">
            We're always looking for talented people who are passionate about creators. 
            Send us your resume and let us know what you'd like to work on.
          </p>
          <a 
            href="mailto:careers@driplens.com" 
            className="inline-flex items-center gap-3 px-12 py-5 bg-white text-black border border-black font-bold text-xs uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-500"
          >
            Send Your Resume <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
