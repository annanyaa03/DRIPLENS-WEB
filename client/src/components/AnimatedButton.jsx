import { Link } from 'react-router-dom';

export default function AnimatedButton({ to, children, className = '', onClick }) {
  const base = `inline-flex items-center justify-center px-8 py-4 bg-black text-white font-bold text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:-translate-y-[2px] hover:opacity-90 ${className}`;

  if (to) {
    return (
      <Link to={to} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={base}>
      {children}
    </button>
  );
}
