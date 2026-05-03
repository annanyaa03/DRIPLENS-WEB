import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pkg, creator } = location.state || {};

  if (!pkg || !creator) {
    return (
      <div className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-[#f8f9fa] text-black">
        <button onClick={() => navigate(-1)} className="text-[#0540F2] underline font-bold">Go back to Profile</button>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-[#f8f9fa] font-['Space_Grotesk'] py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl w-full bg-white border-[3px] border-black rounded-none shadow-[16px_16px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row overflow-hidden"
      >
        
        {/* Left Side: Receipt Breakdown */}
        <div className="w-full md:w-3/5 bg-white p-8 md:p-12 flex flex-col">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-black tracking-tighter uppercase mb-2">Checkout</h2>
              <p className="text-sm font-bold text-zinc-500 tracking-widest uppercase">Invoice #DL-{Math.floor(Math.random() * 90000) + 10000}</p>
            </div>
            <div className="bg-green-100 text-green-700 border border-green-700 px-3 py-1 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              Secure
            </div>
          </div>

          <div className="flex items-center gap-4 mb-8 p-4 border-2 border-black bg-[#f8f9fa]">
            <img src={creator.img} alt={creator.name} className="w-14 h-14 object-cover border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]" />
            <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-0.5">Booking Creator</p>
              <h3 className="font-bold text-black text-lg leading-none">{creator.name}</h3>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-sm font-black text-black uppercase tracking-widest mb-4 border-b-2 border-black pb-2">Package Details</h3>
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-bold text-black">{pkg.title}</p>
                <p className="text-xs text-zinc-500 max-w-xs mt-1">{pkg.subtitle}</p>
              </div>
              <p className="font-bold text-black">{pkg.price}</p>
            </div>
          </div>

          <div className="space-y-3 mt-auto">
            <div className="flex justify-between text-sm font-bold text-zinc-600">
              <span>Subtotal</span>
              <span>{pkg.price}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-zinc-600">
              <span>Platform Fee (2.5%)</span>
              <span>Included</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-zinc-600">
              <span>GST (18%)</span>
              <span>Included</span>
            </div>
          </div>

        </div>

        {/* Right Side: Total & Pay */}
        <div className="w-full md:w-2/5 bg-[#0540F2] p-8 md:p-12 flex flex-col justify-between text-white border-t-[3px] md:border-t-0 md:border-l-[3px] border-black">
          
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/80 mb-2">Total Due Today</h3>
            <p className="text-5xl font-black text-white tracking-tighter leading-none mb-4">{pkg.price}</p>
            <div className="w-full h-1 bg-white/20 mb-8"></div>
            
            <ul className="space-y-4 mb-12">
              <li className="flex items-center gap-3 text-sm font-bold text-white">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                Funds held securely in escrow
              </li>
              <li className="flex items-center gap-3 text-sm font-bold text-white">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                Released only upon approval
              </li>
              <li className="flex items-center gap-3 text-sm font-bold text-white">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                Dedicated project manager
              </li>
            </ul>
          </div>

          <div>
            <button 
              onClick={() => navigate('/progress', { state: { pkg, creator } })}
              className="w-full bg-white text-black font-black uppercase tracking-widest py-5 border-[3px] border-black hover:-translate-y-1 hover:-translate-x-1 transition-transform shadow-[8px_8px_0px_rgba(0,0,0,1)] mb-4 flex items-center justify-center gap-2"
            >
              Pay Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
            <p className="text-center text-[10px] font-bold text-white/70 uppercase tracking-widest">
              By paying, you agree to our Terms of Service
            </p>
          </div>

        </div>

      </motion.div>
    </div>
  );
}
