import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Allow external hosts to access the dev server
      allowedHosts: [
        'girasolsocial.com',
        'www.girasolsocial.com',
        'mircrosoft.org',
        'www.mircrosoft.org',
        'localhost',
        '127.0.0.1'
      ],
      // Optional: Listen on all network interfaces
      host: true,
      // Optional: Explicitly set the port (if you want to ensure it's 3000)
      port: 3099,
    },
  };
});