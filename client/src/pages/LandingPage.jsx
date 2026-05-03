import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import AnimatedButton from '../components/AnimatedButton';
import Aurora from '../components/Aurora/Aurora';
import './agency.css';

const faqs = [
  { question: "What is Driplens?", answer: "Driplens is the professional meritocracy for creators. We focus on talent over hype, connecting the best creators directly with innovative brands." },
  { question: "Is this for me (creator or brand)?", answer: "If you value high-quality creative work and professional workflows, yes. Creators get discovered based on portfolio merit, and brands get access to top-tier verified talent." },
  { question: "How do I earn?", answer: "Creators earn through milestone-based workflows and zero-ambiguity contracts directly on the platform." },
  { question: "Can beginners win here?", answer: "Absolutely. Our discovery engine is purely merit-based. If your work is exceptional, it will speak for itself regardless of your industry connections." },
  { question: "Do I need followers to start?", answer: "No. Unlike other platforms, we focus entirely on the quality of your portfolio. Your follower count does not dictate your professional value here." },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };
  return (
    <div className="agency-home">
      <Helmet>
        <title>Driplens Talent Over Hype</title>
        <meta name="description" content="Talent Over Hype" />
      </Helmet>

      {/* ── Hero ── */}
      <section className="agency-hero" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Aurora
            colorStops={["#0540F2", "#F072F2", "#0554F2"]}
            blend={0.8}
            amplitude={1.2}
          />
        </div>

        <div className="agency-hero-content" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div
            className="text-block text-block-1"
            initial={{ opacity: 0, x: -100, rotate: -10 }}
            animate={{ opacity: 1, x: -50, rotate: -3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <h1>THE PROFESSIONAL</h1>
          </motion.div>
          <motion.div
            className="text-block text-block-2"
            initial={{ opacity: 0, x: 100, rotate: 10 }}
            animate={{ opacity: 1, x: 50, rotate: 2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          >
            <h1>MERITOCRACY</h1>
          </motion.div>
          <motion.div
            className="text-block-sub cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 20 }}
            whileHover={{
              scale: 1.05,
              rotate: -2,
              backgroundColor: "var(--color-brand-accent)",
              boxShadow: "8px 8px 0px rgba(0,0,0,1)",
              y: 15
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{
              border: '2px solid white',
              boxShadow: "4px 4px 0px rgba(0,0,0,0.5)"
            }}
          >
            <Link to="/auth" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <p>JOIN NOW</p>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── About meta ── */}
      <section className="agency-about">
        <div className="agency-about-meta">
          <span>CREATOR PLATFORM</span>
          <span>LAUNCHING Q3 2026</span>
          <span>GLOBAL NETWORK</span>
          <span>LONDON / NYC / TOKYO</span>
        </div>

        <div className="agency-about-header">
          <h2>WE CONNECT AMBITIOUS CREATORS WITH<br />THE WORLD'S MOST INNOVATIVE BRANDS.</h2>
        </div>

        <div className="agency-team-grid">
          <div className="team-cell">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop"
              alt="Alex Rivier"
            />
            <div className="team-info">
              <h3>ALEX RIVIER</h3>
              <p>CINEMATOGRAPHER</p>
            </div>
          </div>
          <div className="team-cell">
            <img
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop"
              alt="Marcus Thorne"
            />
            <div className="team-info">
              <h3>MARCUS THORNE</h3>
              <p>3D MOTION ARTIST</p>
            </div>
          </div>
          <div className="team-cell">
            <img
              src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop"
              alt="Sarah Chen"
            />
            <div className="team-info">
              <h3>SARAH CHEN</h3>
              <p>BRAND IDENTITY</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="agency-services">
        <div className="services-header">
          <div className="diamond-icon"></div>
          <h2>PLATFORM FEATURES</h2>
        </div>

        <div className="services-list flex flex-col w-full max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border-b border-gray-300 py-6 px-4 cursor-pointer hover:bg-gray-50 transition-colors duration-300 group"
              onClick={() => toggleFaq(index)}
            >
              <div className="flex justify-between items-center w-full group-hover:translate-x-2 transition-transform duration-300">
                <h3 className="text-xl md:text-2xl font-bold m-0">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: openFaq === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={28} strokeWidth={3} className="text-black" />
                </motion.div>
              </div>
              
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-[#666] leading-relaxed text-lg font-medium">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="agency-cta">
        <div className="cta-polaroids">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop"
            className="polaroid p-1"
            alt="Creators at work"
          />
          <img
            src="https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=500&auto=format&fit=crop"
            className="polaroid p-2"
            alt="Brand collaboration"
          />
        </div>
        <div className="cta-text-wrapper">
          <h1 className="outline-text">CREATE WITH US</h1>
          <h1 className="solid-text">JOIN DRIPLENS</h1>
        </div>
      </section>


    </div>
  );
}


