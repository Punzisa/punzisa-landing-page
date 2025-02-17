import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare'; // Changed from '@astrojs/netlify/functions'

export default defineConfig({
  output: 'server',
  adapter: cloudflare()
});
