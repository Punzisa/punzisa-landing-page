import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare'; // Changed from '@astrojs/netlify/functions'
import react from '@astrojs/react';

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  integrations: [react()],
});
