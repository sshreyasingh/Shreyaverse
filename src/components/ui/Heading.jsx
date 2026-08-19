import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

export default function Heading({
  children,
  subtitle,
  className,
  size = 'default',
  align = 'center',
  accent = false,
}) {
  const sizeStyles = {
    sm: 'text-2xl sm:text-3xl lg:text-4xl',
    default: 'text-3xl sm:text-4xl lg:text-5xl',
    lg: 'text-4xl sm:text-5xl lg:text-6xl',
    xl: 'text-5xl sm:text-6xl lg:text-7xl',
  };

  return (
    <motion.div
      className={cn(
        'mb-16',
        align === 'center' && 'text-center',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      {/* Accent label */}
      {accent && (
        <span className="inline-block px-4 py-1.5 glass rounded-full text-xs font-mono text-accent-light tracking-wider uppercase mb-4">
          {accent}
        </span>
      )}

      <h2
        className={cn(
          'font-heading font-bold tracking-tight text-gradient',
          sizeStyles[size]
        )}
      >
        {children}
      </h2>

      {subtitle && (
        <p className="mt-4 text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Decorative line */}
      <div className="mt-6 mx-auto w-20 h-1 bg-gradient-to-r from-primary-400 via-primary-500 to-accent-light rounded-full" />
    </motion.div>
  );
}
