import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
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
});
