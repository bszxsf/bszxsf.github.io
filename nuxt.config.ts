// https://nuxt.com/docs/api/configuration/nuxt-config
// https://tailwindcss.com/docs/installation/framework-guides/nuxt

import type { PageCollections } from '@nuxt/content';
import tailwindcss from '@tailwindcss/vite';
import { DateTime } from 'luxon';
import svgLoader from 'vite-svg-loader';

export default defineNuxtConfig({
  compatibilityDate: '2025-03-14',
  devtools: { enabled: true },
  plugins: ['~/plugins/element-plus'],
  modules: [
    '@element-plus/nuxt',
    '@vueuse/nuxt',
    '@nuxt/icon',
    '@nuxt/content',
    '@nuxt/eslint'
  ],
  css: [
    '~/assets/styles/main.css',
    'element-plus/theme-chalk/dark/css-vars.css',
    '~/assets/styles/dark/css-vars.css'
  ],
  // TODO: icon bundle, see https://nuxt.com/modules/icon
  app: {
    rootId: 'app'
  },
  content: {
    build: {
      transformers: ['~/transformers/index-page-title'],
      pathMeta: {
        slugifyOptions: {
          // See: https://github.com/nuxt/content/pull/2898
          // This keeps as much characters (from corresponding filename) as possible in generated URLs.
          remove: /[$*+~()'"!\-=#?:@]/g,
          lower: false
        }
      },
      // Default settings. TS says this is required.
      markdown: {
        toc: {
          depth: 2,
          searchDepth: 2
        },
        highlight: {
          langs: [
            'c',
            'cpp',
            'java',
            'js',
            'ts',
            'html',
            'css',
            'vue',
            'md',
            'mdc',
            'json'
          ]
        }
      }
    }
  },
  vite: {
    plugins: [tailwindcss(), svgLoader()]
  },
  hooks: {
    'content:file:afterParse'(ctx) {
      if (ctx.collection.name == 'posts') {
        // We know what the content is. As ts required, we have to convert it to 'unknown' first.
        const file = (<unknown>ctx.content) as PageCollections['posts'];

        if (file.published && !DateTime.fromISO(file.published).isValid) {
          console.warn(
            "⚠️ file '" + file.id + "' has invalid published datetime"
          );
        }
        if (file.modified && !DateTime.fromISO(file.modified).isValid) {
          console.warn(
            "⚠️ file '" + file.id + "' has invalid modified datetime"
          );
        }
        if (file.published && !file.modified) file.modified = file.published;
      }
    }
  }
});
