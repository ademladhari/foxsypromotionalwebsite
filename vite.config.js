import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Pages from 'vite-plugin-pages';

export default defineConfig({
  plugins: [
    react(),
    Pages(),
  ],
  build: {
    rollupOptions: {
      output: {
        // three.js only loads lazily when a 3D scene nears the viewport; keep it in its own chunk.
        manualChunks(id) {
          if (/node_modules[/\\](three|@react-three|three-stdlib|troika|maath|camera-controls)/.test(id)) return 'three';
        },
      },
    },
    chunkSizeWarningLimit: 1100,
  },
});
