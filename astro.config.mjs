import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://thufailadib.vercel.app',
  integrations: [mdx(), react(), sitemap()],
  vite: {
    server: {
      allowedHosts: ['.ngrok-free.app'],
    },
  },
});
