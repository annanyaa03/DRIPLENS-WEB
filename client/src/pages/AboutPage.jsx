import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const teamMembers = [
    {
      name: "Aditi Janugade",
      role: "Co-Founder",
      bio: "Former influencer marketing director with 10+ years in the creator economy.",
      image: ""
    },
    {
      name: "Annanya Ukey",
      role: "Co-Founder",
      bio: "Tech entrepreneur who built platforms serving millions of creators.",
      image: ""
    },
    {
      name: "Ayush Gajbhiye",
      role: "Co-Founder",
      bio: "Creator advocate with deep relationships across all major platforms.",
      image: ""
    },
    {
      name: "Atharv Gadekar",
      role: "Co-Founder",
      bio: "Marketing strategist with experience at Fortune 500 brands.",
      image: ""
    },
    {
      name: "Anandi Khandelwal",
      role: "Co-Founder",
      bio: "Product visionary dedicated to creating seamless and intuitive user experiences.",
      image: ""
    }
  ];

  const values = [
    {
      icon: "",
      title: "Creator-First",
      description: "We prioritize creators' needs and empower them to build sustainable careers."
    },
    {
      icon: "",
      title: "Trust & Transparency",
      description: "Building genuine relationships between creators and brands through honest communication."
    },
    {
      icon: "",
      title: "Innovation",
      description: "Continuously improving our technology to provide the best platform experience."
    },
    {
      icon: "",
      title: "Professionalism",
      description: "Treating creator partnerships with the same respect as traditional talent management."
    },
    {
      icon: "",
      title: "Sustainability",
      description: "Building a business model that supports long-term growth for creators and brands alike."
    },
    {
      icon: "",
      title: "Community",
      description: "Creating a supportive ecosystem where creators help each other succeed."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E5E5] py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl sm:text-7xl font-bold text-black mb-8 tracking-tighter">About Driplens</h1>
          <p className="text-xl text-[#555555] max-w-2xl leading-relaxed">
            Empowering creators to transform their craft into sustainable professional careers through merit-based opportunities.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-zinc-50 border-y border-[#E5E5E5] overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-10 text-black tracking-tighter uppercase">Our Mission</h2>
            <div className="w-24 h-1.5 bg-black mb-10" />
            <p className="text-xl text-zinc-600 mb-8 leading-relaxed font-light">
              Driplens was founded on the belief that talented creators deserve better opportunities to connect with brands. We're building the infrastructure that allows creators to showcase their craft professionally and brands to discover authentic partnerships.
            </p>
            <p className="text-xl text-zinc-600 leading-relaxed font-light">
              In the creator economy, success shouldn't be determined by follower count alone. We've built a merit-based platform that recognizes quality work, genuine engagement, and authentic audience connections.
            </p>
          </motion.div>
          <div className="hidden lg:block relative">
            <div className="aspect-square bg-white border border-[#E5E5E5] flex items-center justify-center p-20">
               <div className="text-[12rem] font-bold text-black/5 select-none">DRIP</div>
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 border border-black/10 -z-10" />
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-black mb-12">Our Story</h2>
          <div className="space-y-8 text-[#555555] text-lg leading-relaxed">
            <p>
              Driplens was founded in 2023 by a dedicated team of five entrepreneurs—Aditi, Annanya, Ayush, Atharv, and Anandi—who witnessed firsthand the challenges creators face in monetizing their work. They saw talented creators struggle with unfair rates and misaligned partnerships, and believed technology could solve this problem.
            </p>
            <p>
              Together, they built Driplens as a response to the broken influencer marketing landscape. We created a platform where creators control their narrative, where engagement quality matters more than follower vanity metrics, and where partnerships are built on genuine alignment.
            </p>
            <p>
              Today, thousands of creators and hundreds of brands use Driplens to build meaningful professional relationships. We're not just a platform—we're a movement to professionalize the creator economy.
            </p>
          </div>
        </div>
      </section>


      {/* How It Works Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#EEEEEE]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">How Driplens Works</h2>
            <p className="text-[#555555] max-w-2xl mx-auto text-lg leading-relaxed">
              A seamless bridge between world-class creative talent and forward-thinking brands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            {/* For Creators */}
            <div className="space-y-10">
              <h3 className="text-2xl font-bold flex items-center gap-4">
                <span className="w-12 h-12 bg-black text-white flex items-center justify-center text-sm font-bold rounded-none">01</span>
                For Creators
              </h3>
              <div className="space-y-8">
                {[
                  { title: "Build Your Identity", desc: "Create a stunning, data-backed portfolio that showcases your best work and professional history." },
                  { title: "Get Discovered", desc: "Our algorithm matches your unique style and skills with brands looking for your exact expertise." },
                  { title: "Work Seamlessly", desc: "Execute projects with zero ambiguity using our structured milestone and payment system." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-1 bg-black/5 group-hover:bg-black transition-colors shrink-0 rounded-none h-auto"></div>
                    <div>
                      <h4 className="font-bold text-xl text-black mb-2">{step.title}</h4>
                      <p className="text-[#555555] leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* For Brands */}
            <div className="space-y-10">
              <h3 className="text-2xl font-bold flex items-center gap-4">
                <span className="w-12 h-12 border-2 border-black text-black flex items-center justify-center text-sm font-bold rounded-none">02</span>
                For Brands
              </h3>
              <div className="space-y-8">
                {[
                  { title: "Define Your Vision", desc: "Post detailed briefs and set clear expectations for your creative projects." },
                  { title: "Source Elite Talent", desc: "Access a curated pool of verified creators vetted for quality, reliability, and professionalism." },
                  { title: "Scalable Creation", desc: "Manage multiple workstreams and creators from a single, unified dashboard." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-1 bg-black/5 group-hover:bg-black transition-colors shrink-0 rounded-none h-auto"></div>
                    <div>
                      <h4 className="font-bold text-xl text-black mb-2">{step.title}</h4>
                      <p className="text-[#555555] leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Our Values</h2>
            <p className="text-[#555555] max-w-2xl mx-auto text-lg">
              The principles that guide every decision we make and every feature we build.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-10 rounded-none border border-[#EEEEEE] hover:border-black transition-colors group">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300 inline-block">{value.icon}</div>
                <h3 className="font-bold text-black text-xl mb-3">{value.title}</h3>
                <p className="text-[#555555] leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Meet Our Team</h2>
            <p className="text-[#555555] max-w-2xl mx-auto text-lg">
              Bridging the gap between creative passion and professional excellence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="bg-[#F3F3F3] aspect-square rounded-none mb-6 flex items-center justify-center text-8xl grayscale group-hover:grayscale-0 transition-all duration-500">
                  {member.image}
                </div>
                <h3 className="font-bold text-black text-xl mb-1">{member.name}</h3>
                <p className="text-black font-semibold text-sm uppercase tracking-wider mb-3">{member.role}</p>
                <p className="text-[#555555] text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-24 p-16 bg-white border border-gray-200 rounded-none text-black relative overflow-hidden transition-all duration-500">
            <h3 className="text-3xl font-bold mb-6 tracking-tight uppercase">We're always looking for talent</h3>
            <p className="text-zinc-500 mb-10 max-w-xl mx-auto text-lg">Interested in helping us build the future of the creator economy? Check out our open roles.</p>
            <Link to="/careers" className="inline-block px-12 py-5 bg-black text-white hover:bg-zinc-800 font-bold rounded-none transition-all uppercase tracking-widest text-xs border border-transparent">
              View Careers
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-zinc-50 border-t border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-20 text-black tracking-tight uppercase">Our Impact</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-16">
            {[
              { label: "Active Creators", value: "5,000+" },
              { label: "Brand Partners", value: "500+" },
              { label: "Collab Value", value: "$10M+" },
              { label: "Countries", value: "50+" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-6xl sm:text-7xl font-bold mb-4 tracking-tighter text-black">{stat.value}</div>
                <p className="text-zinc-400 font-bold uppercase tracking-[0.2em] text-xs">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}
