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
              <a href="#open-positions" className="px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-zinc-800 transition-all flex items-center gap-2">
                View Openings <ChevronRight className="w-4 h-4" />
              </a>
              <Link to="/about" className="px-8 py-4 border border-black text-black font-bold rounded-full hover:bg-gray-50 transition-all">
                Learn About Us
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-8">Why Work at Driplens?</h2>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              We're not just building a platform—we're transforming the creator economy. Every team member plays a crucial role in empowering millions of creators to build sustainable careers.
            </p>
            <p className="text-xl text-gray-300 leading-relaxed italic">
              "Our mission is to bridge the gap between creative passion and professional prosperity."
            </p>
          </motion.div>
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
                className="p-8 rounded-2xl border border-[#E5E5E5] hover:border-black transition-colors group"
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
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 border-y border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-black mb-4">Our Culture Pillars</h2>
            <p className="text-xl text-[#555555] max-w-2xl mx-auto">How we work, lead, and grow together as a team.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {culture.map((item, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-2xl border border-[#E5E5E5] flex gap-6 items-start"
              >
                <div className="p-3 bg-gray-50 rounded-lg">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-black text-2xl mb-4">{item.title}</h3>
                  <p className="text-[#555555] text-lg leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section id="open-positions" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <h2 className="text-4xl font-bold text-black mb-4">Open Positions</h2>
              <p className="text-xl text-[#555555]">Find your next challenge at Driplens.</p>
            </div>
            {/* Department Filter */}
            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setActiveDepartment(dept)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                    activeDepartment === dept 
                    ? "bg-black text-white" 
                    : "bg-gray-100 text-[#555555] hover:bg-gray-200"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredJobs.map((job) => (
                <motion.div
                  layout
                  key={job.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="p-8 rounded-2xl border border-[#E5E5E5] hover:shadow-xl transition-all hover:border-black group"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-3 mb-4">
                        <span className="px-3 py-1 bg-gray-100 text-[#555555] text-xs font-bold rounded-full uppercase tracking-wider">
                          {job.department}
                        </span>
                        <span className="px-3 py-1 bg-black/5 text-black text-xs font-bold rounded-full uppercase tracking-wider">
                          {job.level}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-zinc-600 transition-colors uppercase tracking-tight">
                        {job.title}
                      </h3>
                      <p className="text-[#555555] text-lg mb-6 max-w-3xl">{job.description}</p>
                      
                      <div className="flex flex-wrap gap-6 text-sm font-medium text-[#777777]">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" /> {job.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" /> {job.type}
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" /> {job.salary}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
                      <button className="px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-zinc-800 transition-colors whitespace-nowrap">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredJobs.length === 0 && (
              <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                <p className="text-xl text-[#555555]">No open positions in this department at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-[#E5E5E5]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-black mb-16 text-center">Our Hiring Flow</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connector Line (Hidden on Mobile) */}
            <div className="hidden md:block absolute top-10 left-0 w-full h-[2px] bg-gray-200 -z-1" />
            
            {[
              { step: "01", title: "Apply", desc: "Submit your resume and portfolio" },
              { step: "02", title: "Screen", desc: "Initial talk with our recruiting team" },
              { step: "03", title: "Interview", desc: "Deep dive with the hiring team" },
              { step: "04", title: "Offer", desc: "Welcome to the Driplens family" }
            ].map((item) => (
              <div key={item.step} className="text-center relative z-10">
                <div className="w-20 h-20 rounded-full bg-white border-2 border-black flex items-center justify-center font-bold text-xl mx-auto mb-6 shadow-lg group-hover:bg-black group-hover:text-white transition-all">
                  {item.step}
                </div>
                <h3 className="font-bold text-black text-xl mb-3">{item.title}</h3>
                <p className="text-[#555555] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-[#E5E5E5]">
        <div className="max-w-4xl mx-auto text-center bg-black rounded-[2rem] p-12 sm:p-20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(255,255,255,0.05)_100%)]" />
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-8 relative z-10">Don't see your role?</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto relative z-10 leading-relaxed">
            We're always looking for talented people who are passionate about creators. 
            Send us your resume and let us know what you'd like to work on.
          </p>
          <a 
            href="mailto:careers@driplens.com" 
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-all relative z-10 scale-110"
          >
            Send Your Resume <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
