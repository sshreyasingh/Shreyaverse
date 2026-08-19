import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxSection({
  children,
  speed = 0.3,
  className,
  as: Component = 'div',
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);

  return (
    <Component ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </Component>
  );
}
