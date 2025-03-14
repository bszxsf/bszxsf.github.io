import { defineContentConfig, defineCollection, z } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: 'page',
      source: {
        prefix: '/',
        include: 'posts/**/*.md' // Note: '~/content' is implied.
      },
      schema: z.object({
        published: z.boolean().default(true),
        date: z.string().date()
      })
    })
  }
});
