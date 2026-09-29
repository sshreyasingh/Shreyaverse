import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), 'WEB3FORMS_');
  if (command === 'build' && !env.WEB3FORMS_ACCESS_KEY?.trim()) {
    throw new Error('WEB3FORMS_ACCESS_KEY is required to build the contact form. Set it in the deployment environment.');
  }

  return {
  plugins: [react()],
  // Expose WEB3FORMS_* env vars to the client (Vite only exposes VITE_* by default).
  envPrefix: ['VITE_', 'WEB3FORMS_'],
  server: {
    proxy: {
      // Lets the frontend call /api/* in dev without CORS or a hardcoded port.
      '/api': {
        target: process.env.VITE_API_PROXY || 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          framer: ['framer-motion'],
          icons: ['react-icons'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
    cssMinify: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  css: {
    devSourcemap: false,
  },
  };
});
