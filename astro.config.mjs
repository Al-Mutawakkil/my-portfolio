import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://thufailadib.com',
  integrations: [react()],
  vite: {
    server: {
      allowedHosts: ['.ngrok-free.app'],
    },
  },
});
