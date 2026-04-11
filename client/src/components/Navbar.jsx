import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="border-b border-black/5 bg-white/80 backdrop-blur-md sticky top-0 z-[100]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="font-heading font-bold text-2xl tracking-tighter text-black uppercase">
              Driplens
            </Link>
          </div>
          <div className="flex items-center space-x-10">
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/explore" className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#999] hover:text-black transition-colors">
                Explore
              </Link>
              <Link to="/creators" className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#999] hover:text-black transition-colors">
                Creators
              </Link>
              <Link to="/brands" className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#999] hover:text-black transition-colors">
                Brands
              </Link>
            </div>
            <div className="h-4 w-px bg-black/10 mx-2"></div>
            <div className="flex items-center space-x-6">
              <Link to="/auth" className="text-[11px] font-bold uppercase tracking-[0.2em] text-black hover:opacity-70 transition-opacity">
                Log in
              </Link>
              <Link to="/auth?mode=register" className="btn-primary py-2.5 px-8 shadow-sm">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
