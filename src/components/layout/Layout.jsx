import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import useSmoothScroll from '../../hooks/useSmoothScroll';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from '../ui/ScrollToTop';
import CursorEffect from '../ui/CursorEffect';
import AnimatedBlobs from '../ui/AnimatedBlobs';
import PageTransition from '../ui/PageTransition';
import LoadingScreen from '../ui/LoadingScreen';
import ParticleScene from '../../scenes/ParticleScene';

export default function Layout() {
  const location = useLocation();

  useSmoothScroll();

  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <div className="relative min-h-screen bg-surface bg-noise">
      {/* Reading progress bar */}
      <motion.div
        style={{ scaleX: progressScale }}
        className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] bg-gradient-to-r from-primary-500 via-violet-500 to-accent-light"
      />

      <LoadingScreen />
      <CursorEffect />
      <AnimatedBlobs />

      {/* Full-page particle field */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ParticleScene />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
      </div>

      {/* Grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.015]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <Navbar />
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
