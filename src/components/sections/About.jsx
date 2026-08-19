import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiAward, FiBriefcase, FiTarget, FiStar } from 'react-icons/fi';
import Section from '../ui/Section';
import Heading from '../ui/Heading';
import GlassCard from '../ui/GlassCard';
import RevealAnimation from '../ui/RevealAnimation';
import Badge from '../ui/Badge';
import { PERSONAL_INFO } from '../../utils/constants';

const achievementAccents = {
  1: { gradient: 'from-violet-500 via-purple-500 to-indigo-500', glow: 'rgba(139,92,246,0.22)', text: 'text-violet-300' },
  2: { gradient: 'from-cyan-500 via-sky-500 to-blue-500', glow: 'rgba(56,189,248,0.22)', text: 'text-cyan-300' },
  3: { gradient: 'from-emerald-500 via-teal-500 to-cyan-500', glow: 'rgba(52,211,153,0.22)', text: 'text-emerald-300' },
  4: { gradient: 'from-amber-500 via-orange-500 to-yellow-500', glow: 'rgba(251,191,36,0.22)', text: 'text-amber-300' },
  5: { gradient: 'from-rose-500 via-pink-500 to-fuchsia-500', glow: 'rgba(244,114,182,0.22)', text: 'text-rose-300' },
};

function CountUp({ end, suffix = '', duration = 1.5 }) {
  const [count, setCount] = useState(0);
  const countedRef = useRef(false);

  useEffect(() => {
    if (countedRef.current) return;
    countedRef.current = true;
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <Section id="about">
      <Heading subtitle="Get to know me better" accent="About">
        About Me
      </Heading>

      {/* --- INTRO + IMAGE --- */}
      <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start mb-20">
        <RevealAnimation direction="left" className="lg:col-span-2">
          <div className="relative">
            <div className="w-full aspect-[3/4] max-w-sm mx-auto glass p-2 rounded-3xl overflow-hidden">
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-primary-500/20 via-violet-500/20 to-accent/10 flex items-center justify-center relative overflow-hidden">
                {photoFailed ? (
                  <span className="text-8xl">👩‍💻</span>
                ) : (
                  <img
                    src={PERSONAL_INFO.aboutPhotoUrl || PERSONAL_INFO.photoUrl}
                    alt={PERSONAL_INFO.fullName}
                    onError={() => setPhotoFailed(true)}
                    loading="eager"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                )}
                <div className="absolute bottom-4 left-0 right-0 px-4 text-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/70 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm shadow-lg">
                    {PERSONAL_INFO.college}
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute -inset-6 bg-gradient-to-r from-primary-500/10 via-violet-500/10 to-accent/10 rounded-3xl blur-3xl -z-10" />
          </div>
        </RevealAnimation>

        <RevealAnimation direction="right" className="lg:col-span-3">
          <div>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
              {PERSONAL_INFO.aboutDescription}
            </p>

            {/* Current Focus */}
            <h4 className="text-sm font-mono text-primary-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <FiTarget className="w-4 h-4" />
              Current Focus
            </h4>
            <div className="space-y-2.5 mb-6">
              {PERSONAL_INFO.currentFocus.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-light shrink-0" />
                  <span className="text-sm text-gray-400">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Quick tags */}
            <div className="flex flex-wrap gap-2">
              {['MERN Stack', 'AI/ML', 'DSA', 'Open Source'].map((tag) => (
                <Badge key={tag} variant="accent" size="md">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </RevealAnimation>
      </div>

      {/* --- STATS CARDS --- */}
      <RevealAnimation className="mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PERSONAL_INFO.aboutStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="text-center !p-5" glow>
                <p className="text-3xl sm:text-4xl font-bold text-gradient font-heading">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1.5 tracking-wide uppercase font-mono">
                  {stat.label}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </RevealAnimation>

      {/* --- EXPERIENCE + EDUCATION (side by side on desktop) --- */}
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
        {/* Experience Highlights */}
        <RevealAnimation direction="left">
          <div>
            <h3 className="text-xl font-heading font-bold text-white mb-6 flex items-center gap-2.5">
              <span className="p-2 glass rounded-lg">
                <FiBriefcase className="w-4 h-4 text-accent-light" />
              </span>
              Experience
            </h3>
            <div className="space-y-4">
              {PERSONAL_INFO.experienceHighlights.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <GlassCard className="!p-5">
                    <span className="text-xs font-mono text-primary-400">
                      {exp.duration}
                    </span>
                    <h4 className="text-sm font-semibold text-white mt-1">
                      {exp.role}
                    </h4>
                    <p className="text-xs text-violet-400 mt-0.5">
                      {exp.company}
                    </p>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                      {exp.description}
                    </p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </RevealAnimation>

        {/* Education Timeline */}
        <RevealAnimation direction="right">
          <div>
            <h3 className="text-xl font-heading font-bold text-white mb-6 flex items-center gap-2.5">
              <span className="p-2 glass rounded-lg">
                <FiBookOpen className="w-4 h-4 text-accent-light" />
              </span>
              Education
            </h3>
            <div className="relative pl-8">
              {/* Timeline bar */}
              <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-primary-500 via-violet-500 to-transparent" />

              {PERSONAL_INFO.education.map((edu, i) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="relative pb-8 last:pb-0"
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute -left-[29px] top-1.5 w-3.5 h-3.5 rounded-full border-2 z-10 ${
                      edu.highlight
                        ? 'bg-accent-light border-accent-light shadow-[0_0_12px_rgba(0,229,255,0.5)]'
                        : 'bg-surface border-gray-500'
                    }`}
                  />

                  <GlassCard className="!p-4">
                    <span className="text-[11px] font-mono text-primary-400">
                      {edu.duration}
                    </span>
                    <h4 className="text-sm font-semibold text-white mt-1">
                      {edu.institution}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {edu.degree}
                    </p>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                      {edu.description}
                    </p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </RevealAnimation>
      </div>

      {/* --- ACHIEVEMENTS --- */}
      <RevealAnimation>
        <div>
          <h3 className="text-xl font-heading font-bold text-white mb-6 text-center flex items-center justify-center gap-2.5">
            <span className="p-2 glass rounded-lg">
              <FiAward className="w-4 h-4 text-accent-light" />
            </span>
            Achievements
          </h3>

          {/* Featured achievement */}
          {(() => {
            const [featured, ...rest] = PERSONAL_INFO.achievements;
            const featuredAccent = achievementAccents[featured.id] || achievementAccents[1];
            const oddRest = rest.length % 2 === 1;

            return (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45 }}
                >
                  <div
                    className="glass relative overflow-hidden rounded-2xl card-glow ring-1"
                    style={{ boxShadow: `0 0 40px ${featuredAccent.glow}` }}
                  >
                    <div className={`h-1 bg-gradient-to-r ${featuredAccent.gradient}`} />
                    <div
                      className="pointer-events-none absolute inset-0 opacity-70"
                      style={{
                        background: `radial-gradient(circle at 20% 0%, ${featuredAccent.glow} 0%, transparent 55%)`,
                      }}
                    />
                    <div className="relative p-6 sm:p-8">
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <Badge variant="primary" size="sm">
                          {featured.year}
                        </Badge>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[10px] font-medium text-accent-light">
                          <FiStar className="w-3 h-3" />
                          Highlight
                        </span>
                      </div>
                      <h4 className={`text-xl sm:text-2xl font-heading font-bold mb-2 ${featuredAccent.text}`}>
                        {featured.title}
                      </h4>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {featured.description}
                      </p>
                      <div className="mt-4 pt-3 border-t border-white/[0.05]">
                        <div className={`h-0.5 w-12 rounded-full bg-gradient-to-r ${featuredAccent.gradient}`} />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {rest.length > 0 && (
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    {rest.map((achievement, i) => {
                      const accent = achievementAccents[achievement.id] || achievementAccents[1];
                      return (
                        <motion.div
                          key={achievement.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.08 }}
                        >
                          <div className="glass relative overflow-hidden h-full flex flex-col rounded-2xl card-glow">
                            <div className={`h-1 bg-gradient-to-r ${accent.gradient}`} />
                            <div className="p-5 flex flex-col flex-1">
                              <div className="flex items-center justify-between mb-3">
                                <Badge variant="primary" size="sm">
                                  {achievement.year}
                                </Badge>
                              </div>
                              <h4 className={`text-sm font-semibold mb-2 ${accent.text}`}>
                                {achievement.title}
                              </h4>
                              <p className="text-xs text-gray-400 leading-relaxed flex-1">
                                {achievement.description}
                              </p>
                              <div className="mt-4 pt-3 border-t border-white/[0.05]">
                                <div className={`h-0.5 w-10 rounded-full bg-gradient-to-r ${accent.gradient}`} />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                    {oddRest && <div className="hidden sm:block" />}
                  </div>
                )}
              </>
            );
          })()}
        </div>
      </RevealAnimation>
    </Section>
  );
}
