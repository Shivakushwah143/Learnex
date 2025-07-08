import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ❌ Remove direct import of @tailwindcss/forms because it's a Tailwind plugin, not a Vite plugin.
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
});
