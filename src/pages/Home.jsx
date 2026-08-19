import { Suspense, lazy } from 'react';

const Hero = lazy(() => import('../components/sections/Hero'));
const About = lazy(() => import('../components/sections/About'));
const Skills = lazy(() => import('../components/sections/Skills'));
const Projects = lazy(() => import('../components/sections/Projects'));
const Experience = lazy(() => import('../components/sections/Experience'));
const Achievements = lazy(() => import('../components/sections/Achievements'));
const Contact = lazy(() => import('../components/sections/Contact'));

function SectionFallback() {
  return (
    <div className="section-padding section-margin flex items-center justify-center min-h-[200px]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-primary-400/30 border-t-accent-light animate-spin" />
        <span className="text-xs text-gray-500 font-mono">Loading...</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Suspense fallback={<SectionFallback />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Experience />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Achievements />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Contact />
      </Suspense>
    </>
  );
}
