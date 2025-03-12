import { defineContentConfig, defineCollection } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: 'page',
      source: {
        prefix: '/',
        include: 'posts/**/*.md' // Note: '~/content' is implied.
      }
    })
  }
});
