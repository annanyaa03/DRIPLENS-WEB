import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="border-b border-[#E5E5E5] bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="font-heading font-bold text-2xl tracking-tighter text-black uppercase">
              Driplens
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link to="/explore" className="text-sm font-bold uppercase tracking-widest text-[#999] hover:text-black transition-colors">
              Explore
            </Link>
            <Link to="/creators" className="text-sm font-bold uppercase tracking-widest text-[#999] hover:text-black transition-colors">
              Creators
            </Link>
            <Link to="/brands" className="text-sm font-bold uppercase tracking-widest text-[#999] hover:text-black transition-colors">
              Brands
            </Link>
            <div className="h-4 w-px bg-[#E5E5E5] mx-2"></div>
            <Link to="/auth" className="text-sm font-bold uppercase tracking-widest text-black hover:opacity-70 transition-opacity">
              Log in
            </Link>
            <Link to="/auth?mode=register" className="btn-primary py-2 px-6">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
