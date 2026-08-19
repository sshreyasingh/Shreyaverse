import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import Section from '../ui/Section';
import Heading from '../ui/Heading';
import Badge from '../ui/Badge';
import { cn } from '../../utils/helpers';
import { achievementCategories, achievementsSummary } from '../../data/achievements';

const colorAccent = {
  primary: 'text-primary-400',
  accent: 'text-accent-light',
  success: 'text-emerald-400',
  warning: 'text-amber-400',
};

const categoryAccents = {
  hackathons: {
    gradient: 'from-violet-500 via-purple-500 to-indigo-500',
    glow: 'rgba(139, 92, 246, 0.22)',
    text: 'text-violet-300',
    ring: 'ring-violet-400/40',
  },
  competitive: {
    gradient: 'from-cyan-500 via-sky-500 to-blue-500',
    glow: 'rgba(56, 189, 248, 0.22)',
    text: 'text-cyan-300',
    ring: 'ring-cyan-400/40',
  },
  leadership: {
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    glow: 'rgba(52, 211, 153, 0.22)',
    text: 'text-emerald-300',
    ring: 'ring-emerald-400/40',
  },
  certificates: {
    gradient: 'from-amber-500 via-orange-500 to-yellow-500',
    glow: 'rgba(251, 191, 36, 0.22)',
    text: 'text-amber-300',
    ring: 'ring-amber-400/40',
  },
};

function CountUp({ end, suffix = '', duration = 1.5, playOnce = true }) {
  const [count, setCount] = useState(0);
  const countedRef = useRef(false);

  useEffect(() => {
    if (countedRef.current && playOnce) return;
    countedRef.current = true;

    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, playOnce]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

function AchievementCard({ item, index, accent, categoryColor, featured = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.08,
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={cn('h-full', featured && 'sm:col-span-2')}
    >
      <div
        className={cn(
          'glass relative overflow-hidden h-full flex flex-col group card-glow rounded-2xl',
          featured && 'ring-1'
        )}
        style={featured ? { boxShadow: `0 0 40px ${accent.glow}` } : undefined}
      >
        {/* Colored header band */}
        <div className={`h-1 bg-gradient-to-r ${accent.gradient}`} />

        {/* Featured radial glow */}
        {featured && (
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background: `radial-gradient(circle at 20% 0%, ${accent.glow} 0%, transparent 55%)`,
            }}
          />
        )}

        <div className={cn('relative flex flex-col flex-1', featured ? 'p-6 sm:p-8' : 'p-5 sm:p-6')}>
          {/* Year + tag */}
          <div className="flex items-center justify-between gap-3 mb-4">
            <span className="text-[11px] font-mono text-gray-500">{item.year}</span>
            <div className="flex items-center gap-2">
              {featured && (
                <span
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-medium',
                    accent.text,
                    'bg-white/[0.03]'
                  )}
                  style={{ borderColor: accent.glow }}
                >
                  <FiStar className="w-3 h-3" />
                  Highlight
                </span>
              )}
              <Badge variant={categoryColor} size="sm">{item.tag}</Badge>
            </div>
          </div>

          {/* Title */}
          <h4
            className={cn(
              'font-heading font-bold mb-1 group-hover:opacity-90 transition-opacity duration-300',
              featured ? 'text-xl sm:text-2xl' : 'text-base',
              accent.text
            )}
          >
            {item.title}
          </h4>
          <p className={cn('text-gray-500 mb-3 font-mono', featured ? 'text-sm' : 'text-xs')}>
            {item.subtitle}
          </p>

          {/* Description */}
          <p
            className={cn(
              'text-gray-400 leading-relaxed flex-1',
              featured ? 'text-sm' : 'text-xs'
            )}
          >
            {item.description}
          </p>

          {/* Bottom accent */}
          <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between">
            <div className={`h-0.5 w-12 rounded-full bg-gradient-to-r ${accent.gradient}`} />
            <span className="text-[10px] font-mono text-gray-600">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  const [activeTab, setActiveTab] = useState(0);
  const category = achievementCategories[activeTab];
  const Icon = category.icon;
  const accent = categoryAccents[category.id];

  const [featured, ...rest] = category.items;
  const oddRest = rest.length % 2 === 1;

  return (
    <Section id="achievements">
      <Heading subtitle="Milestones, awards, and recognition" accent="Achievements">
        Achievements &amp; Awards
      </Heading>

      {/* Summary counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
        {achievementsSummary.map((item, i) => {
          const SIcon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="h-full"
            >
              <div className="glass text-center !p-5 card-glow rounded-2xl h-full flex flex-col justify-center">
                <SIcon className="w-5 h-5 text-accent-light mx-auto mb-2" />
                <p className="text-3xl sm:text-4xl font-bold text-gradient font-heading">
                  <CountUp end={item.value} suffix={item.suffix} />
                </p>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-1.5 tracking-wide uppercase font-mono">
                  {item.label}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
        {achievementCategories.map((cat, i) => {
          const CatIcon = cat.icon;
          const tabAccent = categoryAccents[cat.id];
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(i)}
              className={`relative px-4 sm:px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === i
                  ? 'bg-primary-500/10 border border-primary-500/30 text-primary-300 shadow-[0_0_20px_rgba(124,58,237,0.12)]'
                  : 'glass text-gray-400 hover:text-white hover:border-white/15'
              }`}
            >
              <CatIcon className={`w-3.5 h-3.5 ${activeTab === i ? 'text-accent-light' : 'text-gray-500'}`} />
              <span className="hidden sm:inline">{cat.title}</span>
              {activeTab === i && (
                <motion.div
                  layoutId="achievementTab"
                  className={`absolute -bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r ${tabAccent.gradient} rounded-full`}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Category stat + items */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
        >
          {/* Category header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <span
              className={`p-3 glass rounded-xl ${colorAccent[category.color]}`}
              style={{ boxShadow: `0 0 24px ${accent.glow}` }}
            >
              <Icon className="w-6 h-6" />
            </span>
            <div>
              <h3 className="text-xl font-heading font-bold text-white">{category.title}</h3>
              <p className="text-sm text-gray-500 font-mono">
                {category.stats.value}{category.stats.suffix} {category.stats.label}
              </p>
            </div>
          </motion.div>

          {/* Featured achievement */}
          <div className="max-w-5xl mx-auto">
            <AchievementCard
              item={featured}
              index={0}
              accent={accent}
              categoryColor={category.color}
              featured
            />

            {/* Remaining achievements */}
            {rest.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mt-4 sm:mt-5">
                {rest.map((item, i) => (
                  <AchievementCard
                    key={item.id}
                    item={item}
                    index={i + 1}
                    accent={accent}
                    categoryColor={category.color}
                  />
                ))}
                {oddRest && <div className="hidden sm:block" />}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
