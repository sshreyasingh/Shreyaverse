import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import {
  SiJavascript, SiPython, SiCplusplus, SiC,
  SiReact, SiHtml5, SiCss, SiTailwindcss,
  SiNodedotjs, SiExpress, SiPostman,
  SiMongodb, SiMysql, SiSupabase,
  SiScikitlearn, SiLangchain, SiNumpy, SiPandas,
  SiGithubactions, SiGit, SiVscodium, SiGithub,
  SiSocketdotio, SiAxios, SiMui, SiJsonwebtokens,
} from 'react-icons/si';
import {
  FaCode, FaDatabase, FaChartLine, FaChartArea, FaMobileAlt,
  FaShieldAlt, FaServer, FaPlug, FaProjectDiagram, FaExchangeAlt,
  FaBrain, FaRobot, FaMagic, FaLayerGroup, FaCogs, FaNetworkWired,
  FaSitemap, FaCubes, FaDesktop,
} from 'react-icons/fa';
import Section from '../ui/Section';
import Heading from '../ui/Heading';
import { skillCategories } from '../../data/skills';

const iconMap = {
  SiJavascript, SiPython, SiCplusplus, SiC,
  SiReact, SiHtml5, SiCss, SiTailwindcss,
  SiNodedotjs, SiExpress, SiPostman,
  SiMongodb, SiMysql, SiSupabase,
  SiScikitlearn, SiLangchain, SiNumpy, SiPandas,
  SiGithubactions, SiGit, SiVscodium, SiGithub,
  SiSocketdotio, SiAxios, SiMui, SiJsonwebtokens,
  FaCode, FaDatabase, FaChartLine, FaChartArea, FaMobileAlt,
  FaShieldAlt, FaServer, FaPlug, FaProjectDiagram, FaExchangeAlt,
  FaBrain, FaRobot, FaMagic, FaLayerGroup, FaCogs, FaNetworkWired,
  FaSitemap, FaCubes, FaDesktop,
};

const brandColorMap = {
  SiJavascript: '#F7DF1E',
  SiPython: '#3776AB',
  SiCplusplus: '#00599C',
  SiC: '#A8B9CC',
  SiReact: '#61DAFB',
  SiHtml5: '#E34F26',
  SiCss: '#1572B6',
  SiTailwindcss: '#06B6D4',
  SiNodedotjs: '#339933',
  SiExpress: '#FFFFFF',
  SiPostman: '#FF6C37',
  SiMongodb: '#47A248',
  SiMysql: '#4479A1',
  SiSupabase: '#3FCF8E',
  SiScikitlearn: '#F7931E',
  SiLangchain: '#4E9E81',
  SiNumpy: '#013243',
  SiPandas: '#150458',
  SiGithubactions: '#2088FF',
  SiGit: '#F05032',
  SiVscodium: '#007ACC',
  SiGithub: '#FFFFFF',
  SiSocketdotio: '#FFFFFF',
  SiAxios: '#5A29E4',
  SiMui: '#007FFF',
  SiJsonwebtokens: '#FFFFFF',
  FaCode: '#7C3AED',
  FaDatabase: '#38BDF8',
  FaChartLine: '#34D399',
  FaChartArea: '#818CF8',
  FaMobileAlt: '#22D3EE',
  FaShieldAlt: '#F59E0B',
  FaServer: '#A78BFA',
  FaPlug: '#F472B6',
  FaProjectDiagram: '#38BDF8',
  FaExchangeAlt: '#34D399',
  FaBrain: '#F472B6',
  FaRobot: '#22D3EE',
  FaMagic: '#A78BFA',
  FaLayerGroup: '#F59E0B',
  FaCogs: '#94A3B8',
  FaNetworkWired: '#38BDF8',
  FaSitemap: '#34D399',
  FaCubes: '#A78BFA',
  FaDesktop: '#94A3B8',
};

function CategoryIcon({ iconName }) {
  const Icon = iconMap[iconName];
  return Icon ? <Icon className="w-4 h-4" style={{ color: brandColorMap[iconName] }} /> : null;
}

const bubbleSizes = [
  'w-32 h-32',
  'w-36 h-36',
  'w-40 h-40',
  'w-32 h-32',
  'w-40 h-40',
  'w-36 h-36',
];

function SkillBubble({ skill, index }) {
  const ref = useRef(null);
  const Icon = iconMap[skill.icon];
  const sizeClass = bubbleSizes[index % bubbleSizes.length];

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const radius = 190;

      if (distance < radius) {
        const strength = (radius - distance) / radius;
        const maxPush = 120 * strength;
        const safeDistance = Math.max(distance, 1);
        x.set(-(dx / safeDistance) * maxPush);
        y.set(-(dy / safeDistance) * maxPush);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      style={{
        x,
        y,
        background: '#000000',
        borderColor: 'rgba(255, 255, 255, 0.75)',
        boxShadow: '0 0 18px rgba(255, 255, 255, 0.12)',
      }}
      whileHover={{ scale: 1.12 }}
      className={`${sizeClass} relative flex shrink-0 flex-col items-center justify-center gap-2.5 rounded-full card-glow cursor-default select-none border-2`}
    >
      <div
        className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 35%, rgba(124,58,237,0.12) 0%, transparent 70%)',
        }}
      />

      {Icon && (
        <Icon
          className="w-9 h-9 drop-shadow-[0_0_12px_rgba(255,255,255,0.22)] transition-transform duration-300"
          style={{ color: brandColorMap[skill.icon] }}
        />
      )}
      <span className="px-3 text-sm font-medium text-gray-200 text-center leading-tight transition-colors duration-300">
        {skill.name}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState(0);
  const category = skillCategories[activeTab];

  return (
    <Section id="skills">
      <Heading subtitle="Technologies and tools I work with" accent="Skills">
        Skills &amp; Technologies
      </Heading>

      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-14">
        {skillCategories.map((cat, i) => (
          <button
            key={cat.name}
            onClick={() => setActiveTab(i)}
            className={`group relative px-4 sm:px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              activeTab === i
                ? 'bg-primary-500/10 border border-primary-500/30 text-primary-300 shadow-[0_0_20px_rgba(124,58,237,0.15)]'
                : 'glass text-gray-400 hover:text-white hover:border-white/15'
            }`}
          >
            <span
              className={`transition-colors duration-300 ${
                activeTab === i ? 'text-accent-light' : 'text-gray-500 group-hover:text-gray-300'
              }`}
            >
              <CategoryIcon iconName={cat.icon} />
            </span>
            <span className="hidden sm:inline">{cat.name}</span>
            {activeTab === i && (
              <motion.div
                layoutId="tabIndicator"
                className="absolute -bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-primary-500 to-accent-light rounded-full"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-7 py-8 min-h-[300px]">
            {category.skills.map((skill, i) => (
              <SkillBubble key={skill.name} skill={skill} index={i} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
