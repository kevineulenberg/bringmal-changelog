import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.date(),
    category: z.enum(['shop', 'tischreservierungen', 'neuigkeiten', 'app']),
    type: z.enum(['feature', 'fix', 'improvement', 'announcement']).default('feature'),
    version: z.string().optional(),
    draft: z.boolean().default(false),
    readTime: z.number(),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    thumb: z
      .object({
        variant: z.enum([
          'grid',
          'mono',
          'glow-violet',
          'glow-blue',
          'glow-warm',
          'glow-gray',
          'wireframe',
          'hex',
          'pixel',
        ]),
        title: z.string().optional(),
        kicker: z.string().optional(),
        sub: z.string().optional(),
        glyph: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = { blog };
