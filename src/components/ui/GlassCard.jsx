import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

export default function GlassCard({
  className,
  children,
  hover = true,
  glow = true,
  strong = false,
}) {
  return (
    <motion.div
      className={cn(
        'glass p-6 relative overflow-hidden',
        glow && 'card-glow',
        strong && 'glass-strong',
        className
      )}
      whileHover={
        hover
          ? {
              y: -6,
              transition: { type: 'spring', stiffness: 320, damping: 24 },
            }
          : {}
      }
    >
      {/* Top shimmer accent line */}
      <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary-400/30 to-transparent" />

      {children}
    </motion.div>
  );
}
