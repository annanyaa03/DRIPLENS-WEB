import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | Driplens</title>
        <meta name="description" content="The page you're looking for doesn't exist. Head back to Driplens." />
      </Helmet>

      <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center select-none">

        {/* Giant 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <span
            className="text-[clamp(7rem,22vw,18rem)] font-black leading-none tracking-tighter text-black/[0.06] select-none pointer-events-none"
            aria-hidden="true"
          >
            404
          </span>

          {/* Overlay text — sharp, on top */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5, ease: 'easeOut' }}
            className="absolute inset-0 flex items-center justify-center text-[clamp(7rem,22vw,18rem)] font-black leading-none tracking-tighter text-black mix-blend-multiply"
            aria-hidden="true"
          >
            404
          </motion.p>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.55, ease: 'easeOut' }}
          className="-mt-4 space-y-3 max-w-md"
        >
          <h1 className="text-2xl font-bold tracking-tight text-black">
            This page doesn't exist.
          </h1>
          <p className="text-[#777] text-sm leading-relaxed">
            The URL might be mistyped, or the page may have been moved.
            <br />
            Either way, you've wandered off the lens.
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.55, duration: 0.5, ease: 'easeOut' }}
          className="w-12 h-px bg-black my-8 origin-left"
        />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.45, ease: 'easeOut' }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-3 bg-black text-white text-sm font-bold uppercase tracking-widest px-8 py-4 hover:bg-[#222] transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Driplens
          </Link>
        </motion.div>

      </div>
    </>
  );
}
