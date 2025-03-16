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
        datetime: z.string().datetime({ offset: true }).optional()
      })
    }),
    site: defineCollection({
      type: 'page',
      source: {
        prefix: '/',
        include: '*.md'
      }
    })
  }
});
