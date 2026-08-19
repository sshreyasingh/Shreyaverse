import { motion } from 'framer-motion';

const presets = {
  gentle: {
    y: [0, -8, 0],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
  moderate: {
    y: [0, -15, 0],
    x: [0, 5, 0, -5, 0],
    transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
  },
  bouncy: {
    y: [0, -25, 5, -15, 0],
    rotate: [0, 2, -1, 1, 0],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
  },
  drift: {
    x: [0, 10, -5, 15, 0],
    y: [0, -10, 5, -8, 0],
    transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
  },
};

export default function FloatingElement({
  children,
  preset = 'gentle',
  delay = 0,
  className,
}) {
  const animation = presets[preset] || presets.gentle;

  return (
    <motion.div
      animate={animation}
      style={{ animationDelay: `${delay}s` }}
      className={className}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
