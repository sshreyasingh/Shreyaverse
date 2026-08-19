import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const directionVariants = {
  up: { y: 50, x: 0, rotateX: 0 },
  down: { y: -50, x: 0, rotateX: 0 },
  left: { x: 50, y: 0, rotateY: 0 },
  right: { x: -50, y: 0, rotateY: 0 },
};

const effectOverrides = {
  scale: { scale: { initial: 0.85, animate: 1 } },
  rotate: { rotate: { initial: 8, animate: 0 } },
  fade: { opacity: { initial: 0, animate: 1 } },
};

export default function RevealAnimation({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  effect,
  className,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const initial = {
    opacity: 0,
    ...directionVariants[direction],
  };

  if (effect === 'scale') initial.scale = 0.85;
  if (effect === 'rotate') initial.rotate = 8;
  if (effect === 'pop') {
    initial.scale = 0.5;
    initial.opacity = 0;
  }

  const animate = isInView
    ? {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
      }
    : {};

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
