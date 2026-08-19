import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiBriefcase, FiCode, FiStar, FiAward } from 'react-icons/fi';
import Section from '../ui/Section';
import Heading from '../ui/Heading';
import GlassCard from '../ui/GlassCard';
import Badge from '../ui/Badge';
import { experiences } from '../../data/experience';

const typeConfig = {
  Internship: { color: 'primary', Icon: FiBriefcase },
  'Open Source': { color: 'accent', Icon: FiCode },
  Leadership: { color: 'success', Icon: FiStar },
  FullTime: { color: 'success', Icon: FiAward },
};

function TimelineItem({ experience, index }) {
  const ref = useRef(null);
  const isLeft = index % 2 === 0;
  const { color, Icon } = typeConfig[experience.type] || typeConfig.Internship;

  return (
    <div ref={ref} className="relative mb-8 md:mb-12 last:mb-0">
      {/* Desktop alternating layout */}
      <div className={`hidden md:flex items-start ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Content side */}
        <div className="w-[calc(50%-28px)]">
          <motion.div
            initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <GlassCard className="!p-6 group" glow>
              {/* Type + duration row */}
              <div className="flex items-center justify-between mb-3">
                <Badge variant={color} size="sm" icon={<Icon className="w-3 h-3" />}>
                  {experience.type}
                </Badge>
                <span className="text-[11px] font-mono text-gray-500">{experience.duration}</span>
              </div>

              {/* Role */}
              <h3 className="text-lg font-heading font-bold text-white mb-1">
                {experience.role}
              </h3>

              {/* Company + location */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-semibold text-primary-400">{experience.company}</span>
                <span className="text-gray-600">·</span>
                <span className="text-xs text-gray-500">{experience.location}</span>
              </div>

              {/* Description */}
              <ul className="space-y-2 mb-5">
                {experience.description.map((bullet, i) => (
                  <li key={i} className="text-sm text-gray-400 flex items-start gap-2.5">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-accent-light/50 shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>

              {/* Tech stack */}
              <div className="mb-4">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-2 block">
                  Tech Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {experience.techStack.map((tech) => (
                    <Badge key={tech} variant="default" size="sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-2 block">
                  Key Achievements
                </span>
                <div className="flex flex-col gap-1.5">
                  {experience.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-xs text-emerald-400">✦</span>
                      <span className="text-xs text-gray-300">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Timeline center column with dot + line */}
        <div className="w-14 shrink-0 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className={`p-2 rounded-full border-2 z-10 ${
              index === 0
                ? 'bg-accent-light/20 border-accent-light shadow-[0_0_16px_rgba(0,229,255,0.4)]'
                : 'bg-surface border-gray-600'
            }`}
          >
            <Icon className={`w-4 h-4 ${index === 0 ? 'text-accent-light' : 'text-gray-400'}`} />
          </motion.div>
        </div>

        {/* Empty spacer for the other side */}
        <div className="w-[calc(50%-28px)]" />
      </div>

      {/* Mobile — single column */}
      <div className="md:hidden pl-10 relative">
        {/* Timeline dot */}
        <div
          className={`absolute left-[14px] top-4 w-3.5 h-3.5 rounded-full border-2 z-10 ${
            index === 0
              ? 'bg-accent-light border-accent-light shadow-[0_0_12px_rgba(0,229,255,0.5)]'
              : 'bg-surface border-gray-600'
          }`}
        />

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="!p-5" glow>
            <div className="flex items-center justify-between mb-3">
              <Badge variant={color} size="sm" icon={<Icon className="w-3 h-3" />}>
                {experience.type}
              </Badge>
              <span className="text-[10px] font-mono text-gray-500">{experience.duration}</span>
            </div>

            <h3 className="text-base font-heading font-bold text-white mb-1">
              {experience.role}
            </h3>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-semibold text-primary-400">{experience.company}</span>
              <span className="text-gray-600">·</span>
              <span className="text-xs text-gray-500">{experience.location}</span>
            </div>

            <ul className="space-y-2 mb-4">
              {experience.description.map((bullet, i) => (
                <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-accent-light/50 shrink-0" />
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="mb-4">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-2 block">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-1">
                {experience.techStack.map((tech) => (
                  <Badge key={tech} variant="default" size="sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-2 block">
                Key Achievements
              </span>
              <div className="flex flex-col gap-1">
                {experience.achievements.map((achievement, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-[10px] text-emerald-400">✦</span>
                    <span className="text-[10px] text-gray-300">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <Section id="experience">
      <Heading subtitle="My professional journey so far" accent="Experience">
        Experience
      </Heading>

      <div ref={sectionRef} className="relative max-w-4xl mx-auto">
        {/* Animated vertical line — desktop */}
        <div className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-white/[0.04]" />
        <motion.div
          style={{ height: lineHeight }}
          className="hidden md:block absolute left-1/2 -translate-x-px top-0 w-0.5 bg-gradient-to-b from-accent-light via-primary-500 to-violet-500 origin-top"
        />

        {/* Animated vertical line — mobile */}
        <div className="md:hidden absolute left-[23px] top-0 bottom-0 w-px bg-white/[0.04]" />
        <motion.div
          style={{ height: lineHeight }}
          className="md:hidden absolute left-[23px] top-0 w-0.5 bg-gradient-to-b from-accent-light via-primary-500 to-violet-500 origin-top"
        />

        {/* Timeline items */}
        <div className="md:pt-4">
          {experiences.map((exp, i) => (
            <TimelineItem key={exp.id} experience={exp} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}
