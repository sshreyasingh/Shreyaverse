/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f0ff',
          100: '#ede5ff',
          200: '#ddd0ff',
          300: '#c4abff',
          400: '#a67dff',
          500: '#8b4dff',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        accent: {
          light: '#00e5ff',
          DEFAULT: '#00b8d4',
          dark: '#0097a7',
        },
        surface: {
          DEFAULT: '#0d0716',
          light: '#150c24',
          lighter: '#1d1230',
          border: 'rgba(255, 255, 255, 0.06)',
        },
        glass: {
          DEFAULT: 'rgba(255, 255, 255, 0.04)',
          hover: 'rgba(255, 255, 255, 0.07)',
          border: 'rgba(255, 255, 255, 0.08)',
          strong: 'rgba(255, 255, 255, 0.12)',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        heading: ['Space Grotesk', 'Poppins', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out 2s infinite',
        'float-3d': 'float3D 7s ease-in-out infinite',
        'float-3d-delayed': 'float3D 9s ease-in-out 3s infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'blob': 'blob 8s ease-in-out infinite',
        'blob-delayed': 'blob 10s ease-in-out 1s infinite',
        'fade-up': 'fadeUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'rotate-3d': 'rotate3D 8s linear infinite',
        'breathe': 'breathe 3s ease-in-out infinite',
        'draw-path': 'drawPath 1.5s ease-in-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(1deg)' },
          '66%': { transform: 'translateY(5px) rotate(-1deg)' },
        },
        pulseGlow: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(124, 58, 237, 0.2), 0 0 60px rgba(124, 58, 237, 0.05)',
          },
          '50%': {
            boxShadow: '0 0 30px rgba(124, 58, 237, 0.4), 0 0 80px rgba(124, 58, 237, 0.15)',
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        blob: {
          '0%, 100%': {
            transform: 'translate(0, 0) scale(1)',
          },
          '25%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '50%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '75%': {
            transform: 'translate(-40px, -30px) scale(1.05)',
          },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideInLeft: {
          '0%': { opacity: 0, transform: 'translateX(-30px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: 0, transform: 'translateX(30px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        float3D: {
          '0%, 100%': { transform: 'translateY(0px) translateZ(0px) rotateX(0deg)' },
          '25%': { transform: 'translateY(-15px) translateZ(20px) rotateX(2deg)' },
          '50%': { transform: 'translateY(-5px) translateZ(10px) rotateX(-1deg)' },
          '75%': { transform: 'translateY(-20px) translateZ(30px) rotateX(1deg)' },
        },
        rotate3D: {
          '0%': { transform: 'rotateY(0deg) rotateX(0deg)' },
          '100%': { transform: 'rotateY(360deg) rotateX(10deg)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(1.03)', opacity: 0.8 },
        },
        drawPath: {
          '0%': { strokeDashoffset: '1000', opacity: 0 },
          '100%': { strokeDashoffset: '0', opacity: 1 },
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)',
        'gradient-accent': 'linear-gradient(135deg, #00e5ff 0%, #7c3aed 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0a0a0f 0%, #111118 50%, #0a0a0f 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(0, 229, 255, 0.05) 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent 0%, rgba(124, 58, 237, 0.1) 50%, transparent 100%)',
      },
    },
  },
  plugins: [],
};
