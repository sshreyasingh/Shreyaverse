import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMail, FiMapPin, FiSend, FiGithub, FiLinkedin,
  FiCheckCircle, FiAlertCircle, FiClock, FiUser,
  FiFileText, FiMessageSquare, FiArrowRight,
} from 'react-icons/fi';
import { SiLeetcode, SiCodechef } from 'react-icons/si';
import Section from '../ui/Section';
import Heading from '../ui/Heading';
import GlassCard from '../ui/GlassCard';
import Badge from '../ui/Badge';
import { PERSONAL_INFO } from '../../utils/constants';
import { sendContactMessage } from '../../utils/api';

const contactCards = [
  {
    icon: FiMail,
    label: 'Email',
    value: PERSONAL_INFO.email,
    href: `mailto:${PERSONAL_INFO.email}`,
    color: 'text-primary-400',
  },
  {
    icon: FiMapPin,
    label: 'Location',
    value: PERSONAL_INFO.college,
    color: 'text-accent-light',
  },
  {
    icon: FiClock,
    label: 'Availability',
    value: 'Open to opportunities',
    color: 'text-emerald-400',
  },
];

const socialLinks = [
  { href: 'https://www.linkedin.com/in/shreya-singh-2495512a8/', Icon: FiLinkedin, label: 'LinkedIn' },
  { href: 'https://github.com/sshreyasingh', Icon: FiGithub, label: 'GitHub' },
  { href: 'https://leetcode.com/u/shreyasingh007/', Icon: SiLeetcode, label: 'LeetCode' },
  { href: 'https://www.codechef.com/users/shreyasingh007', Icon: SiCodechef, label: 'CodeChef' },
  { href: `mailto:${PERSONAL_INFO.email}`, Icon: FiMail, label: 'Email' },
];

const initialForm = { name: '', email: '', subject: '', message: '' };

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Name is required';
  else if (form.name.trim().length < 2) errors.name = 'Name must be at least 2 characters';

  if (!form.email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Please enter a valid email';

  if (!form.subject.trim()) errors.subject = 'Subject is required';
  else if (form.subject.trim().length < 3) errors.subject = 'Subject must be at least 3 characters';

  if (!form.message.trim()) errors.message = 'Message is required';
  else if (form.message.trim().length < 10) errors.message = 'Message must be at least 10 characters';

  return errors;
}

function SuccessAnimation({ message, onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-10 text-center"
    >
      {/* Animated checkmark circle */}
      <motion.div
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(16,185,129,0.3)]"
      >
        <motion.div
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <FiCheckCircle className="w-10 h-10 text-white" />
        </motion.div>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-xl font-heading font-bold text-white mb-2"
      >
        Message Sent!
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-sm text-gray-400 max-w-xs"
      >
        {message || "Thanks for reaching out! I'll get back to you within 24 hours."}
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={onReset}
        className="mt-6 px-6 py-2.5 glass text-sm text-gray-300 hover:text-white rounded-xl hover:bg-white/10 transition-all duration-300"
      >
        Send Another Message
      </motion.button>
    </motion.div>
  );
}

function ErrorMessage({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400"
    >
      <FiAlertCircle className="w-4 h-4 shrink-0" />
      {message}
    </motion.div>
  );
}

export default function Contact() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverMessage, setServerMessage] = useState('');

  const resetForm = () => {
    setFormData(initialForm);
    setErrors({});
    setTouched({});
    setServerMessage('');
    setStatus('idle');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const fieldErrors = validate({ ...formData, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] || undefined }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldErrors = validate(formData);
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] || undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setStatus('sending');
    const result = await sendContactMessage(formData);

    if (result.ok) {
      setServerMessage(result.message);
      setStatus('success');
      return;
    }

    // Surface per-field errors the server caught but the client missed.
    if (result.errors) setErrors(result.errors);
    setServerMessage(result.message);
    setStatus('error');
  };

  const isFormValid =
    Object.keys(errors).length === 0 &&
    formData.name && formData.email && formData.subject && formData.message;

  const inputBase =
    'w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/60 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(139,77,255,0.12)] transition-all duration-300 text-sm';

  return (
    <Section id="contact">
      <Heading
        subtitle="Have a project in mind? Let's work together!"
        accent="Contact"
      >
        Get In Touch
      </Heading>

      <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
        {/* Form */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <GlassCard className="!p-8" strong>
                  <SuccessAnimation message={serverMessage} onReset={resetForm} />
                </GlassCard>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                <form ref={formRef} onSubmit={handleSubmit} noValidate>
                  <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8">
                    {/* Header band */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-violet-500 to-accent-light" />
                    <div
                      className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-20"
                      style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.6) 0%, transparent 70%)' }}
                    />

                    <div className="relative flex items-center gap-3 mb-6">
                      <span className="p-2.5 glass rounded-xl text-accent-light shadow-[0_0_20px_rgba(0,229,255,0.15)]">
                        <FiSend className="w-5 h-5" />
                      </span>
                      <div>
                        <p className="text-base font-heading font-bold text-white">Send a message</p>
                        <p className="text-xs text-gray-500">I'll get back to you as soon as I can.</p>
                      </div>
                    </div>

                    <div className="relative space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        {/* Name */}
                        <div>
                          <label className="text-[11px] font-mono text-gray-500 uppercase tracking-wider mb-1.5 block">
                            Name
                          </label>
                          <div className="relative">
                            <FiUser className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="John Doe"
                              className={`${inputBase} ${errors.name && touched.name ? 'border-red-500/50 focus:border-red-500' : ''}`}
                            />
                          </div>
                          {errors.name && touched.name && (
                            <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                              <FiAlertCircle className="w-3 h-3" />
                              {errors.name}
                            </p>
                          )}
                        </div>

                        {/* Email */}
                        <div>
                          <label className="text-[11px] font-mono text-gray-500 uppercase tracking-wider mb-1.5 block">
                            Email
                          </label>
                          <div className="relative">
                            <FiMail className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="john@example.com"
                              className={`${inputBase} ${errors.email && touched.email ? 'border-red-500/50 focus:border-red-500' : ''}`}
                            />
                          </div>
                          {errors.email && touched.email && (
                            <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                              <FiAlertCircle className="w-3 h-3" />
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <label className="text-[11px] font-mono text-gray-500 uppercase tracking-wider mb-1.5 block">
                          Subject
                        </label>
                        <div className="relative">
                          <FiFileText className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Project Collaboration"
                            className={`${inputBase} ${errors.subject && touched.subject ? 'border-red-500/50 focus:border-red-500' : ''}`}
                          />
                        </div>
                        {errors.subject && touched.subject && (
                          <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                            <FiAlertCircle className="w-3 h-3" />
                            {errors.subject}
                          </p>
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <label className="text-[11px] font-mono text-gray-500 uppercase tracking-wider mb-1.5 block">
                          Message
                        </label>
                        <div className="relative">
                          <FiMessageSquare className="w-4 h-4 text-gray-500 absolute left-4 top-3.5" />
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Tell me about your project or idea..."
                            rows={5}
                            className={`${inputBase} resize-none ${errors.message && touched.message ? 'border-red-500/50 focus:border-red-500' : ''}`}
                          />
                        </div>
                        {errors.message && touched.message && (
                          <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                            <FiAlertCircle className="w-3 h-3" />
                            {errors.message}
                          </p>
                        )}
                      </div>

                      {/* General error */}
                      {status === 'error' && (
                        <ErrorMessage
                          message={serverMessage || 'Something went wrong. Please try again or email me directly.'}
                        />
                      )}

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="group relative w-full px-6 py-3.5 bg-gradient-to-r from-primary-500 via-violet-500 to-primary-500 bg-[length:200%_100%] hover:bg-[position:100%_0] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                      >
                        {status === 'sending' ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            <FiSend className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            Send Message
                            <FiArrowRight className="w-4 h-4 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-5"
          >
            {/* Contact info cards */}
            {contactCards.map(({ icon: Icon, label, value, href, color }) => (
              <GlassCard key={label} className="!p-5" glow>
                <div className="flex items-start gap-4">
                  <div className={`p-2.5 glass rounded-lg ${color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm text-white font-medium hover:text-primary-400 transition-colors break-all"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-white font-medium">{value}</p>
                    )}
                  </div>
                </div>
              </GlassCard>
            ))}

            {/* Availability indicator */}
            <GlassCard className="!p-5" strong>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <span className="w-3 h-3 bg-emerald-400 rounded-full block" />
                  <span className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping opacity-30" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Available for Opportunities</p>
                  <p className="text-xs text-gray-500">Response time: within 24 hours</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="success" size="sm">Freelance</Badge>
                <Badge variant="primary" size="sm">Internship</Badge>
                <Badge variant="accent" size="sm">Full-Time</Badge>
                <Badge variant="warning" size="sm">Collaboration</Badge>
              </div>
            </GlassCard>

            {/* Social links */}
            <div>
              <p className="text-[11px] font-mono text-gray-500 uppercase tracking-wider mb-3">
                Connect With Me
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="p-3 glass glass-hover rounded-full text-gray-400 hover:text-white transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
