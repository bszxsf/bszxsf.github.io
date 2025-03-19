// https://nuxt.com/docs/api/configuration/nuxt-config
// https://tailwindcss.com/docs/installation/framework-guides/nuxt

import tailwindcss from '@tailwindcss/vite';
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
  }
});
