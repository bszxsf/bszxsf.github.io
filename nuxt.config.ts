// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
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
  }
});
