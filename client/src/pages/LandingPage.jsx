import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedButton from '../components/AnimatedButton';

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="px-4 py-20 text-center max-w-5xl mx-auto flex flex-col items-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-[64px] font-poppins font-extrabold leading-tight tracking-tight text-[#111111] mb-6"
        >
          The Professional Meritocracy <br/> for Creators
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg md:text-xl text-[#555555] max-w-2xl mb-10"
        >
          Showcase your portfolio, get discovered by top brands, and unlock zero-ambiguity creative partnerships.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <AnimatedButton to="/auth?mode=register&role=creator">
            Join as Creator
          </AnimatedButton>
          <AnimatedButton to="/auth?mode=register&role=brand">
            Hire Talent
          </AnimatedButton>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 border-y border-[#E5E5E5] py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h2 className="text-[32px] font-poppins font-semibold text-black">10k+</h2>
            <p className="text-[14px] text-[#555555]">Verified Creators</p>
          </div>
          <div>
            <h2 className="text-[32px] font-poppins font-semibold text-black">$5M+</h2>
            <p className="text-[14px] text-[#555555]">Paid to Talent</p>
          </div>
          <div>
            <h2 className="text-[32px] font-poppins font-semibold text-black">500+</h2>
            <p className="text-[14px] text-[#555555]">Top Brands</p>
          </div>
          <div>
            <h2 className="text-[32px] font-poppins font-semibold text-black">24h</h2>
            <p className="text-[14px] text-[#555555]">Avg. Match Time</p>
          </div>
        </div>
      </section>

      {/* Featured Grid Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 w-full">
        <h2 className="text-3xl font-poppins font-bold text-center mb-12">Discovered on Driplens</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="driplens-card overflow-hidden group cursor-pointer block">
              <div className="aspect-video bg-gray-200 relative">
                {/* Fallback pattern */}
                <div className="absolute inset-0 bg-gradient-to-tr from-gray-300 to-gray-100 mix-blend-multiply"></div>
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <span className="font-poppins font-semibold">Portfolio {item}</span>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-poppins font-semibold text-lg text-black">Creator Name</h3>
                  <p className="text-sm text-[#999999]">Videographer</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-300"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
