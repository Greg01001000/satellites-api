import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // Netlify serves from root, not a subpath
  plugins: [react()],
  build: {
    outDir: 'docs', // Match your GitHub Pages folder
    emptyOutDir: true,
  }
});