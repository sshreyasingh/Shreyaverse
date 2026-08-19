import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiExternalLink, FiGithub, FiTarget, FiZap, FiTrendingUp } from 'react-icons/fi';
import Badge from './Badge';

const categoryAccents = {
  AI: {
    gradient: 'from-violet-500/20 via-purple-500/20 to-indigo-500/20',
    text: 'text-violet-300',
    band: 'from-violet-500 via-purple-500 to-indigo-500',
  },
  'Machine Learning': {
    gradient: 'from-orange-500/20 via-rose-500/20 to-pink-500/20',
    text: 'text-rose-300',
    band: 'from-orange-500 via-rose-500 to-pink-500',
  },
  Hackathon: {
    gradient: 'from-amber-500/20 via-orange-500/20 to-red-500/20',
    text: 'text-amber-300',
    band: 'from-amber-500 via-orange-500 to-red-500',
  },
};

const projectAccents = {
  1: {
    text: 'text-violet-300',
    band: 'from-violet-500 via-purple-500 to-indigo-500',
  },
  2: {
    text: 'text-cyan-300',
    band: 'from-cyan-500 via-sky-500 to-blue-500',
  },
  3: {
    text: 'text-emerald-300',
    band: 'from-emerald-500 via-teal-500 to-cyan-500',
  },
  4: {
    text: 'text-rose-300',
    band: 'from-orange-500 via-rose-500 to-pink-500',
  },
};

const categoryAccent = (category) =>
  categoryAccents[category] || {
    gradient: 'from-indigo-500/20 via-purple-500/20 to-pink-500/20',
    text: 'text-indigo-300',
    band: 'from-indigo-500 via-purple-500 to-pink-500',
  };

const projectAccent = (project) =>
  projectAccents[project.id] || categoryAccent(project.category);

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const gradient = categoryAccent(project.category).gradient;
  const accent = projectAccent(project);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={handleBackdropClick}
      data-lenis-prevent
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto py-10 px-4 sm:px-6"
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-full max-w-4xl glass-strong rounded-3xl overflow-hidden"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 glass rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* Colored header band */}
        <div className={`h-2 bg-gradient-to-r ${accent.band}`} />

        {/* Content */}
        <div className="px-6 sm:px-10 pb-10 relative z-10">
          {/* Header */}
          <div className="glass-strong rounded-2xl p-6 mb-8 mt-6">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <Badge variant="primary" size="md">{project.category}</Badge>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-heading font-bold mb-2 ${accent.text}`}>
              {project.title}
            </h2>
            <p className="text-gray-400 text-sm font-mono">{project.tagline}</p>
          </div>

          {/* Overview */}
          <SectionBlock icon={<FiZap />} title="Overview">
            <p className="text-sm text-gray-300 leading-relaxed">{project.overview}</p>
          </SectionBlock>

          {/* Problem + Solution */}
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <SectionBlock icon={<FiTarget />} title="Problem">
              <p className="text-sm text-gray-300 leading-relaxed">{project.problem}</p>
            </SectionBlock>
            <SectionBlock icon={<FiTrendingUp />} title="Solution">
              <p className="text-sm text-gray-300 leading-relaxed">{project.solution}</p>
            </SectionBlock>
          </div>

          {/* Tech Stack */}
          <SectionBlock title="Tech Stack">
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="accent" size="md">{tech}</Badge>
              ))}
            </div>
          </SectionBlock>

          {/* Challenges */}
          <SectionBlock title="Challenges & Learnings">
            <ul className="space-y-2">
              {project.challenges.map((challenge, i) => (
                <li key={i} className="text-sm text-gray-300 flex items-start gap-2.5">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-light shrink-0" />
                  {challenge}
                </li>
              ))}
            </ul>
          </SectionBlock>

          {/* Impact */}
          <SectionBlock title="Impact & Results">
            <p className="text-sm text-gray-300 leading-relaxed">{project.impact}</p>
          </SectionBlock>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/[0.06]">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-violet-500 rounded-xl hover:shadow-lg hover:shadow-primary-500/20 transition-all duration-300"
            >
              <FiExternalLink className="w-4 h-4" />
              Live Demo
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-gray-300 glass rounded-xl hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <FiGithub className="w-4 h-4" />
              View Source
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SectionBlock({ icon, title, children }) {
  return (
    <div className="mb-8">
      <h3 className="flex items-center gap-2 text-sm font-heading font-bold text-white mb-3">
        {icon && <span className="text-accent-light">{icon}</span>}
        {title}
      </h3>
      <div className="glass rounded-xl p-4 sm:p-5">{children}</div>
    </div>
  );
}
