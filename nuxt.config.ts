// https://nuxt.com/docs/api/configuration/nuxt-config
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
    '~/assets/style/main.css',
    'element-plus/theme-chalk/dark/css-vars.css'
  ],
  // TODO: icon bundle, see https://nuxt.com/modules/icon
  app: {
    rootId: 'app'
  },
  content: {
    build: {
      pathMeta: {
        slugifyOptions: {
          // See: https://github.com/nuxt/content/pull/2898
          // This keeps as much characters (from corresponding filename) as possible in generated URLs.
          remove: /[$*+~()'"!\-=#?:@]/g
        }
      },
      // Default settings. TS says this is required.
      markdown: {
        toc: {
          depth: 2,
          searchDepth: 2
        }
      }
    }
  }
});
