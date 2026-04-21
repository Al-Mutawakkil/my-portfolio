import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://thufailadib.vercel.app',
  integrations: [react(), sitemap()],
  vite: {
    server: {
      allowedHosts: ['.ngrok-free.app'],
    },
  },
});
