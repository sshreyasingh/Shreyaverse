import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

const variantStyles = {
  primary:
    'bg-gradient-primary text-white shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30',
  secondary:
    'glass text-white card-glow border-primary-500/10',
  accent:
    'bg-gradient-accent text-surface font-semibold shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30',
  ghost:
    'text-white/70 hover:text-white hover:bg-glass-hover',
  outline:
    'border border-primary-400/30 text-white hover:border-primary-400/60 hover:bg-primary-500/5',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-xs gap-1.5 rounded-lg',
  md: 'px-6 py-2.5 text-sm gap-2 rounded-xl',
  lg: 'px-8 py-3.5 text-base gap-2.5 rounded-xl',
  xl: 'px-10 py-4 text-lg gap-3 rounded-2xl',
};

const iconOnlyStyles = {
  sm: 'p-2',
  md: 'p-2.5',
  lg: 'p-3',
  xl: 'p-4',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  disabled = false,
  className,
  children,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  loading = false,
}) {
  const isIconOnly = !children && icon;
  const classes = cn(
    'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:ring-offset-2 focus:ring-offset-surface disabled:opacity-40 disabled:cursor-not-allowed select-none',
    variantStyles[variant],
    isIconOnly ? iconOnlyStyles[size] : sizeStyles[size],
    fullWidth && 'w-full',
    className
  );

  const content = (
    <>
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12" cy="12" r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {!loading && icon && iconPosition === 'left' && (
        <span className="shrink-0">{icon}</span>
      )}
      {children && <span>{children}</span>}
      {!loading && icon && iconPosition === 'right' && (
        <span className="shrink-0">{icon}</span>
      )}
    </>
  );

  if (href && !disabled) {
    return (
      <motion.a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}
