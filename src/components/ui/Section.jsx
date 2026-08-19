import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';
import { EASE_OUT } from '../../utils/motion';

export default function Section({
  id,
  className,
  children,
  fullHeight = false,
  noPadding = false,
}) {
  return (
    <section
      id={id}
      className={cn(
        !noPadding && 'section-padding section-margin',
        fullHeight && 'min-h-screen flex items-center',
        className
      )}
    >
      {/* Gentle lift as the section enters — ties every section to one rhythm. */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
        className="max-w-7xl mx-auto w-full relative z-10"
      >
        {children}
      </motion.div>
    </section>
  );
}
