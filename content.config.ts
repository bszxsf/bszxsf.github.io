import { defineContentConfig, defineCollection, z } from '@nuxt/content';

// Sadly, Nuxt Content v3 does not support this currently. Or am I using it wrong?
// const postsSchemaValidator = (val: {
//   published?: string;
//   modified?: string;
// }) => {
//   // 'Date' APIs are s**t, we won't use it anyway. This should be OK with ISO 8601...
//   if (val.modified) {
//     if (val.published == undefined) return false;
//     if (val.modified < val.published) return false;
//   }
//   return true;
// };
const postsSchema = z.object({
  published: z.string().datetime({ offset: true }).optional(),
  // Only considered published if 'publishedAt' is set
  modified: z.string().datetime({ offset: true }).optional(),
  tags: z.array(z.string()).optional()
});
// .refine(postsSchemaValidator);

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: 'page',
      source: {
        prefix: '/',
        include: 'posts/**/*.md' // Note: '~/content' is implied.
      },
      schema: postsSchema
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
