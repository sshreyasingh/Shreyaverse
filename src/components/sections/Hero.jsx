import { motion } from 'framer-motion';
import { HiChevronDoubleDown } from 'react-icons/hi2';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { SiLeetcode, SiCodechef } from 'react-icons/si';
import Button from '../ui/Button';
import { PERSONAL_INFO } from '../../utils/constants';
import { scrollToSection } from '../../utils/helpers';
import useTypewriter from '../../hooks/useTypewriter';
import ProfilePhoto from '../ui/ProfilePhoto';

const socialRows = [
  {
    href: 'https://www.linkedin.com/in/shreya-singh-2495512a8/',
    Icon: FiLinkedin,
    label: 'LinkedIn',
  },
  {
    href: 'https://github.com/sshreyasingh',
    Icon: FiGithub,
    label: 'GitHub',
  },
  {
    href: 'https://leetcode.com/u/shreyasingh007/',
    Icon: SiLeetcode,
    label: 'LeetCode',
  },
  {
    href: 'https://www.codechef.com/users/shreyasingh007',
    Icon: SiCodechef,
    label: 'CodeChef',
  },
  {
    href: `mailto:${PERSONAL_INFO.email}`,
    Icon: FiMail,
    label: 'Email',
  },
];

export default function Hero() {
  const typedText = useTypewriter(PERSONAL_INFO.typingTexts, {
    typeSpeed: 70,
    deleteSpeed: 35,
    pauseDuration: 2000,
  });

  const charVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.03,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  const nameChars = PERSONAL_INFO.fullName.split('');

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center section-padding overflow-hidden"
    >
      {/* Social left bar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="hidden lg:flex absolute left-8 bottom-8 flex-col items-center gap-5 z-10"
      >
        {socialRows.map(({ href, Icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-gray-400 hover:text-white hover:-translate-y-1 transition-all duration-300 group"
          >
            <Icon className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(124,58,237,0.6)]" />
          </a>
        ))}
        <div className="w-px h-16 bg-gradient-to-b from-primary-500/50 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-28 pb-20 lg:py-0">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-indigo-400 font-mono text-sm sm:text-base mb-4 tracking-wide"
          >
            Hi there, I'm
          </motion.p>

          {/* Animated name — character by character */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold mb-2 flex flex-wrap">
            {nameChars.map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={charVariants}
                initial="hidden"
                animate="visible"
                className="text-gradient inline-block"
                style={char === ' ' ? { width: '0.35em' } : undefined}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </h1>

          {/* Tagline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-300 mb-2"
          >
            {PERSONAL_INFO.tagline}
          </motion.h2>

          {/* Typing animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex items-center gap-1 mb-3"
          >
            <span className="text-lg sm:text-xl lg:text-2xl font-semibold text-accent-light">
              {typedText}
            </span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
              className="inline-block w-0.5 h-6 sm:h-7 bg-accent-light"
            />
          </motion.div>

          {/* College */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="flex items-center gap-2 text-gray-400 text-sm sm:text-base mb-10"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-400" />
            {PERSONAL_INFO.college}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollToSection('projects')}
            >
              View Projects
            </Button>
            <Button variant="outline" size="lg" href={PERSONAL_INFO.resumeUrl}>
              Download Resume
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => scrollToSection('contact')}
            >
              Contact Me
            </Button>
          </motion.div>

          {/* Mobile social */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="flex lg:hidden items-center gap-5 mt-8"
          >
            {socialRows.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>
          </div>

          {/* Portrait */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <ProfilePhoto />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <HiChevronDoubleDown className="w-5 h-5 text-gray-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
