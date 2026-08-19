import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorEffect() {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const springX = useSpring(cursorX, { stiffness: 120, damping: 14, mass: 0.5 });
  const springY = useSpring(cursorY, { stiffness: 120, damping: 14, mass: 0.5 });
  const dotSpringX = useSpring(dotX, { stiffness: 350, damping: 22, mass: 0.2 });
  const dotSpringY = useSpring(dotY, { stiffness: 350, damping: 22, mass: 0.2 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      dotX.set(e.clientX - 4);
      dotY.set(e.clientY - 4);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleElementHover = (e) => {
      const target = e.target;
      const isInteractive =
        target.matches('a, button, input, textarea, [role="button"], .cursor-pointer') ||
        target.closest('a, button, input, textarea, [role="button"], .cursor-pointer');

      if (isInteractive) {
        setIsHovering(true);
        target.addEventListener('mouseleave', () => setIsHovering(false), { once: true });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleElementHover, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleElementHover);
    };
  }, [cursorX, cursorY, dotX, dotY, isVisible]);

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block"
        style={{
          x: springX,
          y: springY,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          borderColor: isHovering
            ? 'rgba(0, 229, 255, 0.5)'
            : 'rgba(124, 58, 237, 0.35)',
          boxShadow: isHovering
            ? '0 0 30px rgba(0, 229, 255, 0.25)'
            : '0 0 18px rgba(124, 58, 237, 0.12)',
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-full h-full rounded-full border-2 mix-blend-difference" />
      </motion.div>

      <motion.div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block rounded-full"
        style={{
          x: dotSpringX,
          y: dotSpringY,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width: isHovering ? 6 : 8,
          height: isHovering ? 6 : 8,
          backgroundColor: isHovering
            ? 'rgba(0, 229, 255, 1)'
            : 'rgba(124, 58, 237, 0.8)',
          boxShadow: isHovering
            ? '0 0 20px rgba(0, 229, 255, 0.7)'
            : '0 0 10px rgba(124, 58, 237, 0.5)',
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
