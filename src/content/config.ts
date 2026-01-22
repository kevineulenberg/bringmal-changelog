import { defineCollection, z } from 'astro:content';

const changelogs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    version: z.string(),
    date: z.date(),
    type: z.enum(['feature', 'fix', 'breaking']),
    category: z.enum(['Table Reservations', 'Shop']),
    draft: z.boolean().default(false),
  }),
});

const tableReservations = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    status: z.enum(['live', 'planned']),
    draft: z.boolean().default(false),
  }),
});

const shop = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    status: z.enum(['live', 'planned']),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  changelogs,
  'table-reservations': tableReservations,
  shop,
};
