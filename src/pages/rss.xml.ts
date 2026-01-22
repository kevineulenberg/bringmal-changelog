import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  // Alle Collections laden (Drafts ausfiltern)
  const changelogs = await getCollection('changelogs', ({ data }) => data.draft !== true);
  const reservations = await getCollection('table-reservations', ({ data }) => data.draft !== true);
  const shop = await getCollection('shop', ({ data }) => data.draft !== true);

  // Alle Einträge kombinieren und sortieren
  const allEntries = [
    ...changelogs,
    ...reservations,
    ...shop
  ].sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'Bringmal Changelog',
    description: 'Alle Produktneuheiten, Verbesserungen und geplanten Beta Releases für Bringmal.de Produkte',
    site: context.site || 'https://changelog.bringmal.de',
    items: allEntries.map((entry) => {
      const data = entry.data;
      const isChangelog = 'version' in data;
      
      // Kategorie und Typ bestimmen
      let category = '';
      if ('category' in data && data.category) {
        category = data.category === 'Table Reservations' ? 'Tischreservierungen' : data.category;
      }
      
      let typeLabel = '';
      if (isChangelog) {
        const type = 'type' in data ? data.type : 'other';
        const labels: Record<string, string> = {
          feature: 'Feature',
          fix: 'Fix',
          breaking: 'Breaking Change'
        };
        typeLabel = labels[type] || type;
      } else {
        const status = 'status' in data ? data.status : 'live';
        const labels: Record<string, string> = {
          live: 'Live',
          planned: 'Geplant'
        };
        typeLabel = labels[status] || status;
      }

      // Beschreibung mit Metadaten
      let description = '';
      if (typeLabel) {
        description += `[${typeLabel}]`;
      }
      if (category) {
        description += ` [${category}]`;
      }
      if ('version' in data && data.version) {
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
        categories: category ? [category] : undefined,
      };
    }),
    customData: `<language>de-DE</language>`,
  });
}
