import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import { SiLeetcode, SiCodechef } from 'react-icons/si';
import { NAV_LINKS, PERSONAL_INFO } from '../../utils/constants';
import { scrollToSection } from '../../utils/helpers';
import Badge from '../ui/Badge';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socials = [
    { name: 'GitHub', href: 'https://github.com/sshreyasingh', Icon: FiGithub },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/shreya-singh-2495512a8/', Icon: FiLinkedin },
    { name: 'LeetCode', href: 'https://leetcode.com/u/shreyasingh007/', Icon: SiLeetcode },
    { name: 'CodeChef', href: 'https://www.codechef.com/users/shreyasingh007', Icon: SiCodechef },
    { name: 'Email', href: `mailto:${PERSONAL_INFO.email}`, Icon: FiMail },
  ];

  return (
    <footer className="relative z-10">
      {/* Animated gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary-500 to-accent-light animate-shimmer" />

      <div className="bg-surface/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto section-padding py-14">
          {/* Main footer grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('home');
                }}
                className="inline-block text-2xl font-heading font-bold text-gradient mb-3"
              >
                {PERSONAL_INFO.name}
              </a>
              <p className="text-sm text-gray-400 leading-relaxed mb-4 max-w-xs">
                Software Engineer &amp; AI + MERN Developer from {PERSONAL_INFO.college}. Building intelligent, scalable web applications.
              </p>
              <Badge variant="accent" size="sm">Available for opportunities</Badge>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-heading font-bold text-white uppercase tracking-wider mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href.replace('#', ''));
                      }}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-accent-light transition-colors duration-200" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-xs font-heading font-bold text-white uppercase tracking-wider mb-4">
                Connect
              </h4>
              <div className="flex flex-wrap gap-3">
                {socials.map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="p-2.5 glass rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Colophon */}
            <div className="flex lg:flex-col lg:items-end justify-between lg:justify-start">
              <p className="text-xs text-gray-600 hidden lg:block text-right leading-relaxed">
                Made with <FiHeart className="w-3 h-3 inline text-red-400" /> using
                <br />
                React • Tailwind CSS
                <br />
                Framer Motion • Vite
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              &copy; {currentYear} {PERSONAL_INFO.name}. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <p className="text-xs text-gray-600 hidden sm:block">
                Made with <FiHeart className="w-3 h-3 inline text-red-400" /> using React • Tailwind CSS • Framer Motion
              </p>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-xs text-gray-500 hover:text-primary-400 transition-colors duration-200"
              >
                {PERSONAL_INFO.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
