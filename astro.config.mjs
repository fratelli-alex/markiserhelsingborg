import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeLankar from './src/lib/rehype-lankar.mjs';
import rehypeEnsamma from './src/lib/rehype-ensamma.mjs';
import rehypeRaw from 'rehype-raw';
import { DOMAN } from './src/data/doman.mjs';

// SITE_URL sätts till den tillfälliga adressen i Sevalla tills switch-dagen.
const site = (process.env.SITE_URL || `https://${DOMAN}`).replace(/\/$/, '');

export default defineConfig({
  site,
  trailingSlash: 'always',
  // Liten CSS läggs direkt i sidan: inga renderingsblockerande anrop
  build: { format: 'directory', inlineStylesheets: 'always' },
  compressHTML: true,
  // rehype-raw först, så att rå HTML i Markdown (t.ex. tabeller) också går genom reglerna
  markdown: { rehypePlugins: [rehypeRaw, rehypeEnsamma, rehypeLankar], smartypants: false },
  integrations: [
    sitemap({
      // Sidor med noindex hör inte hemma i sitemapen
      filter: url => !/\/(tack|mallprov)\//.test(url),
    }),
  ],
});
