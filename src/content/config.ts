import { defineCollection, z } from 'astro:content';

const baseSchema = z.object({
  title: z.string(),
  date: z.date(),
  type: z.enum(['feature', 'fix', 'improvement', 'announcement']),
  version: z.string().optional(),
  draft: z.boolean().default(false),
});

const shop = defineCollection({
  type: 'content',
  schema: baseSchema,
});

const tischreservierungen = defineCollection({
  type: 'content',
  schema: baseSchema,
});

const app = defineCollection({
  type: 'content',
  schema: baseSchema,
});

const neuigkeiten = defineCollection({
  type: 'content',
  schema: baseSchema,
});

export const collections = {
  shop,
  tischreservierungen,
  app,
  neuigkeiten,
};
