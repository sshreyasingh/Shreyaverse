import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

export default function Card({
  className,
  children,
  onClick,
  hover = true,
  padding = true,
  glow = false,
}) {
  const Component = hover ? motion.div : 'div';
  const hoverProps = hover
    ? { whileHover: { y: -4, transition: { duration: 0.3 } } }
    : {};

  return (
    <Component
      onClick={onClick}
      className={cn(
        'glass transition-all duration-300',
        padding && 'p-6',
        glow && 'card-glow',
        onClick && 'cursor-pointer',
        className
      )}
      {...hoverProps}
    >
      {children}
    </Component>
  );
}
