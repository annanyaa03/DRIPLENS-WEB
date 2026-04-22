import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Co-Founder & CEO",
      bio: "Former influencer marketing director with 10+ years in the creator economy.",
      image: ""
    },
    {
      name: "Marcus Johnson",
      role: "Co-Founder & CTO",
      bio: "Tech entrepreneur who built platforms serving millions of creators.",
      image: ""
    },
    {
      name: "Jessica Williams",
      role: "Head of Creator Relations",
      bio: "Creator advocate with deep relationships across all major platforms.",
      image: ""
    },
    {
      name: "David Park",
      role: "VP of Brand Partnerships",
      bio: "Marketing strategist with experience at Fortune 500 brands.",
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
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8">Our Mission</h2>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Driplens was founded on the belief that talented creators deserve better opportunities to connect with brands. We're building the infrastructure that allows creators to showcase their craft professionally and brands to discover authentic partnerships.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              In the creator economy, success shouldn't be determined by follower count alone. We've built a merit-based platform that recognizes quality work, genuine engagement, and authentic audience connections.
            </p>
          </div>
          <div className="hidden lg:flex justify-center">
            <div className="text-[12rem] opacity-20"></div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-black mb-12">Our Story</h2>
          <div className="space-y-8 text-[#555555] text-lg leading-relaxed">
            <p>
              Driplens was founded in 2023 by Sarah Chen and Marcus Johnson, two entrepreneurs who witnessed firsthand the challenges creators face in monetizing their work. Sarah had spent years as an influencer marketing director, watching talented creators struggle with unfair rates and misaligned partnerships. Marcus, a tech innovator, believed technology could solve this problem.
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
          <div className="text-center mt-20 p-12 bg-black rounded-none text-white">
            <h3 className="text-2xl font-bold mb-4">We're always looking for talent</h3>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">Interested in helping us build the future of the creator economy? Check out our open roles.</p>
            <Link to="/careers" className="inline-block px-10 py-4 bg-white text-black font-bold rounded-none hover:bg-gray-200 transition-colors uppercase tracking-widest text-xs">
              View Careers
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-16">Our Impact</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="text-5xl sm:text-6xl font-bold mb-3 tracking-tighter">5,000+</div>
              <p className="text-gray-400 font-medium uppercase tracking-widest text-sm">Active Creators</p>
            </div>
            <div>
              <div className="text-5xl sm:text-6xl font-bold mb-3 tracking-tighter">500+</div>
              <p className="text-gray-400 font-medium uppercase tracking-widest text-sm">Brand Partners</p>
            </div>
            <div>
              <div className="text-5xl sm:text-6xl font-bold mb-3 tracking-tighter">$10M+</div>
              <p className="text-gray-400 font-medium uppercase tracking-widest text-sm">Collab Value</p>
            </div>
            <div>
              <div className="text-5xl sm:text-6xl font-bold mb-3 tracking-tighter">50+</div>
              <p className="text-gray-400 font-medium uppercase tracking-widest text-sm">Countries</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl sm:text-6xl font-bold text-black mb-8 tracking-tighter">Ready to Join Us?</h2>
          <p className="text-xl text-[#555555] mb-12 max-w-2xl mx-auto leading-relaxed">
            Whether you're a creator looking for opportunities or a brand seeking authentic partnerships, Driplens is here for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/auth" className="w-full sm:w-auto px-12 py-5 bg-black text-white font-bold rounded-none hover:bg-zinc-800 transition-all transform hover:scale-105 uppercase tracking-widest text-xs">
              Get Started
            </Link>
            <a href="#learn-more" className="w-full sm:w-auto px-12 py-5 border-2 border-black text-black font-bold rounded-none hover:bg-black hover:text-white transition-all transform hover:scale-105 uppercase tracking-widest text-xs">
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
