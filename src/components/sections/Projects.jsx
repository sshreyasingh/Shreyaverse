import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiTailwindcss,
  SiMongodb,
  SiPython,
  SiTensorflow,
  SiPytorch,
  SiDocker,
} from 'react-icons/si';
import Section from '../ui/Section';
import Heading from '../ui/Heading';
import Badge from '../ui/Badge';
import ProjectModal from '../ui/ProjectModal';
import { projects, projectCategories } from '../../data/projects';

const categoryAccents = {
  AI: {
    gradient: 'from-violet-500/20 via-purple-500/20 to-indigo-500/20',
    glow: 'rgba(139,92,246,0.18)',
    text: 'text-violet-300',
    border: 'border-violet-400/40',
  },
  'Machine Learning': {
    gradient: 'from-orange-500/20 via-rose-500/20 to-pink-500/20',
    glow: 'rgba(244,114,182,0.18)',
    text: 'text-rose-300',
    border: 'border-rose-400/40',
  },
  Hackathon: {
    gradient: 'from-amber-500/20 via-orange-500/20 to-red-500/20',
    glow: 'rgba(251,146,60,0.20)',
    text: 'text-amber-300',
    border: 'border-amber-400/40',
  },
};

const projectAccents = {
  1: {
    gradient: 'from-violet-500/25 via-purple-500/25 to-indigo-500/25',
    glow: 'rgba(139,92,246,0.22)',
    text: 'text-violet-300',
  },
  2: {
    gradient: 'from-cyan-500/25 via-sky-500/25 to-blue-500/25',
    glow: 'rgba(56,189,248,0.22)',
    text: 'text-cyan-300',
  },
  3: {
    gradient: 'from-emerald-500/25 via-teal-500/25 to-cyan-500/25',
    glow: 'rgba(52,211,153,0.22)',
    text: 'text-emerald-300',
  },
  4: {
    gradient: 'from-orange-500/25 via-rose-500/25 to-pink-500/25',
    glow: 'rgba(244,114,182,0.24)',
    text: 'text-rose-300',
  },
};

const categoryAccent = (category) =>
  categoryAccents[category] || {
    gradient: 'from-indigo-500/20 via-purple-500/20 to-pink-500/20',
    glow: 'rgba(139,92,246,0.18)',
    text: 'text-indigo-300',
    border: 'border-indigo-400/40',
  };

const projectAccent = (project) =>
  projectAccents[project.id] || categoryAccent(project.category);

const techIconMap = {
  React: SiReact,
  'Next.js': SiNextdotjs,
  TypeScript: SiTypescript,
  'Node.js': SiNodedotjs,
  'Tailwind CSS': SiTailwindcss,
  MongoDB: SiMongodb,
  Python: SiPython,
  TensorFlow: SiTensorflow,
  PyTorch: SiPytorch,
  Docker: SiDocker,
};

function TiltCard({ project, index, onClick }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x: y * -8, y: x * 8 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  const accent = projectAccent(project);
  const getGradient = () => accent.gradient;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => onClick(project)}
        className="glass overflow-hidden group h-full flex flex-col rounded-2xl relative cursor-pointer"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${50 + tilt.y * 6}% ${50 + tilt.x * 6}%, ${accent.glow} 0%, transparent 60%)`,
          }}
        />

        {/* Colored header band */}
        <div className={`h-1.5 bg-gradient-to-r ${getGradient()}`} />

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Category badge */}
          <div className="mb-3">
            <Badge variant="primary" size="sm">
              {project.category}
            </Badge>
          </div>

          {/* Title + tagline */}
          <h3 className={`text-base font-heading font-bold mb-1 ${accent.text}`}>
            {project.title}
          </h3>
          <p className="text-xs text-gray-500 mb-4 font-mono">{project.tagline}</p>

          {/* Description */}
          <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-3 flex-1">
            {project.description}
          </p>

          {/* Features */}
          <div className="mb-4">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-2 block">
              Key Features
            </span>
            <ul className="space-y-1">
              {project.features.slice(0, 2).map((feature, i) => (
                <li key={i} className="text-[11px] text-gray-400 flex items-start gap-1.5">
                  <span className={`${accent.text} mt-[3px] shrink-0`}>▹</span>
                  {feature}
                </li>
              ))}
              {project.features.length > 2 && (
                <li className="text-[10px] text-gray-500 pl-4">+{project.features.length - 2} more</li>
              )}
            </ul>
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap items-center gap-1.5">
            {project.techStack.map((tech) => {
              const TechIcon = techIconMap[tech];
              return TechIcon ? (
                <span
                  key={tech}
                  className="p-1 glass rounded-md text-gray-400 hover:text-white transition-colors duration-200"
                  title={tech}
                >
                  <TechIcon className="w-3.5 h-3.5" />
                </span>
              ) : (
                <Badge key={tech} variant="default" size="sm">
                  {tech}
                </Badge>
              );
            })}
          </div>

          {/* Bottom action buttons */}
          <div className="mt-5 pt-4 border-t border-white/[0.04] flex items-center gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-[11px] font-medium text-gray-400 glass rounded-lg hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <FiGithub className="w-3.5 h-3.5" />
              GitHub
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-[11px] font-medium text-white bg-gradient-to-r from-primary-500 to-violet-500 rounded-lg hover:shadow-lg hover:shadow-primary-500/20 transition-all duration-300"
            >
              <FiExternalLink className="w-3.5 h-3.5" />
              Live Demo
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) =>
          p.categories
            ? p.categories.includes(activeFilter)
            : p.category === activeFilter
        );

  return (
    <Section id="projects">
      <Heading subtitle="Some of my recent work across AI, MERN, and ML" accent="Projects">
        Featured Projects
      </Heading>

      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
        {projectCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
              activeFilter === cat
                ? 'bg-primary-500/10 border border-primary-500/30 text-primary-300 shadow-[0_0_20px_rgba(124,58,237,0.12)]'
                : 'glass text-gray-400 hover:text-white hover:border-white/15'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects grid */}
      <div className="grid sm:grid-cols-2 gap-5 max-w-5xl mx-auto">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <TiltCard key={project.id} project={project} index={i} onClick={setSelectedProject} />
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}
