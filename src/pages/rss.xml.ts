import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  // Alle Collections laden (Drafts ausfiltern)
  const shop = await getCollection('shop', ({ data }) => data.draft !== true);
  const tischreservierungen = await getCollection('tischreservierungen', ({ data }) => data.draft !== true);
  const app = await getCollection('app', ({ data }) => data.draft !== true);
  const neuigkeiten = await getCollection('neuigkeiten', ({ data }) => data.draft !== true);

  // Alle Einträge kombinieren und sortieren
  const allEntries = [
    ...shop,
    ...tischreservierungen,
    ...app,
    ...neuigkeiten
  ].sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const typeLabels: Record<string, string> = {
    feature: 'Feature',
    fix: 'Fix',
    improvement: 'Verbesserung',
    announcement: 'Ankündigung'
  };

  const productLabels: Record<string, string> = {
    shop: 'Shop',
    tischreservierungen: 'Tischreservierungen',
    app: 'App',
    neuigkeiten: 'Neuigkeiten'
  };

  return rss({
    title: 'Bringmal Changelog',
    description: 'Alle Produktneuheiten, Verbesserungen und geplanten Beta Releases für Bringmal.de Produkte',
    site: context.site || 'https://changelog.bringmal.app',
    items: allEntries.map((entry: any) => {
      const data = entry.data;
      const typeLabel = typeLabels[data.type] || data.type;
      const productLabel = productLabels[entry.collection] || entry.collection;

      // Beschreibung mit Metadaten
      let description = `[${typeLabel}] [${productLabel}]`;
      if (data.version) {
        description += ` Version ${data.version}`;
      }
      description += '\n\n';
      
      // Body-Preview hinzufügen (erste 500 Zeichen)
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
        description: description,
        link: `/${entry.collection}/${entry.slug}/`,
        categories: [productLabel],
      };
    }),
    customData: `<language>de-DE</language>`,
  });
}
