import { useState } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../../utils/constants';

/**
 * Animated portrait for the hero.
 * Falls back to a gradient monogram until public/profile.jpg exists,
 * so the layout never collapses to a broken-image icon.
 */
export default function ProfilePhoto() {
  const [failed, setFailed] = useState(false);

  const initials = PERSONAL_INFO.fullName
    .split(' ')
    .map((word) => word[0])
    .join('');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, x: 40 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[420px] mx-auto"
    >
      {/* Ambient glow behind the frame */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.75, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -inset-8 bg-gradient-to-tr from-primary-500/25 via-violet-500/20 to-accent/20 rounded-full blur-3xl -z-10"
      />

      {/* Gentle float */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        {/* Rotating gradient rim.
            overflow-hidden clips the spinning square to the frame's radius,
            so only a thin lit edge sweeps around the border. */}
        <div className="absolute -inset-px rounded-[2.05rem] overflow-hidden pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            className="absolute left-1/2 top-1/2 w-[180%] aspect-square -translate-x-1/2 -translate-y-1/2 opacity-60"
            style={{
              background:
                'conic-gradient(from 0deg, transparent 0deg, rgba(124,58,237,1) 60deg, transparent 130deg, transparent 230deg, rgba(0,229,255,1) 300deg, transparent 360deg)',
            }}
          />
          {/* Punch out the middle so only the rim remains lit. */}
          <div className="absolute inset-px rounded-[2rem] bg-surface" />
        </div>

        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden glass-strong border border-white/10 shadow-[0_20px_60px_-15px_rgba(124,58,237,0.45)]">
          {failed ? (
            <div className="w-full h-full bg-gradient-to-br from-primary-600/30 via-violet-600/20 to-accent/15 flex flex-col items-center justify-center gap-3">
              <span className="text-6xl font-heading font-bold text-gradient">
                {initials}
              </span>
              <span className="text-[10px] font-mono text-gray-500 tracking-wider uppercase px-6 text-center">
                Add public/profile.jpg
              </span>
            </div>
          ) : (
            <img
              src={PERSONAL_INFO.photoUrl}
              alt={PERSONAL_INFO.fullName}
              onError={() => setFailed(true)}
              loading="eager"
              className="w-full h-full object-cover object-center"
            />
          )}

          {/* Bottom scrim so the caption stays readable over any photo */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs font-medium text-white/90 truncate">
              {PERSONAL_INFO.tagline}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Floating accent chips */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        className="absolute -left-4 top-12 px-3 py-2 glass rounded-xl text-[11px] font-mono text-accent-light hidden sm:block"
      >
        &lt;/&gt; MERN
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        className="absolute -right-4 bottom-24 px-3 py-2 glass rounded-xl text-[11px] font-mono text-primary-300 hidden sm:block"
      >
        AI / ML
      </motion.div>
    </motion.div>
  );
}
