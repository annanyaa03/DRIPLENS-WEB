import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import AnimatedButton from '../components/AnimatedButton';
import Aurora from '../components/Aurora/Aurora';
import './agency.css';
 
export default function LandingPage() {
  return (
    <div className="agency-home">
      <Helmet>
        <title>Driplens — The Professional Meritocracy for Creators</title>
        <meta name="description" content="The Professional Meritocracy for Creators" />
      </Helmet>
 

 
      {/* ── Hero ── */}
      <section className="agency-hero" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Aurora
            colorStops={["#0044ff", "#ff00ff", "#3366ff"]}
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
            className="text-block-sub"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          >
            <p>FOR AMBITIOUS CREATORS</p>
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
 
        <div className="services-list">
          <div className="service-item">
            <h3>ZERO AMBIGUITY CONTRACTS</h3>
            <Plus size={24} />
          </div>
          <div className="service-item">
            <h3>VERIFIED MERIT PORTFOLIOS</h3>
            <Plus size={24} />
          </div>
          <div className="service-item">
            <h3>MILESTONE-BASED WORKFLOWS</h3>
            <Plus size={24} />
          </div>
          <div className="service-item">
            <h3>BRAND DISCOVERY ENGINE</h3>
            <Plus size={24} />
          </div>
          <div className="service-item">
            <h3>GLOBAL CREATOR NETWORK</h3>
            <Plus size={24} />
          </div>
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


