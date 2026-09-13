import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { CATEGORY_LABELS, TYPE_LABELS } from '../utils/labels';

export async function GET(context: APIContext) {
  const entries = await getCollection('blog', ({ data }) => !data.draft);

  const sorted = entries.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: 'Bringmal Produkt Updates',
    description:
      'Alle Produktneuheiten, Verbesserungen und geplanten Beta Releases für Bringmal.de Produkte',
    site: context.site ?? 'https://changelog.bringmal.app',
    items: sorted.map((entry) => {
      const data = entry.data;
      const typeLabel = TYPE_LABELS[data.type] ?? data.type;
      const categoryLabel = CATEGORY_LABELS[data.category] ?? data.category;

      let description = `[${typeLabel}] [${categoryLabel}]`;
      if (data.version) {
        description += ` Version ${data.version}`;
      }
      description += '\n\n';

      if (entry.body) {
        const cleanBody = entry.body
          .replace(/!\[.*?\]\(.*?\)/g, '')
          .replace(/\[.*?\]\(.*?\)/g, '$1')
          .replace(/#{1,6}\s/g, '')
          .replace(/<[^>]*>/g, '')
          .trim();
        description += cleanBody.slice(0, 500);
        if (cleanBody.length > 500) {
          description += '...';
        }
      }

      return {
        title: data.title,
        pubDate: data.date,
        description,
        link: `/blog/${entry.id}/`,
        categories: [categoryLabel],
      };
    }),
    customData: `<language>de-DE</language>`,
  });
}
