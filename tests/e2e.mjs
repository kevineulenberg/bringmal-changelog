import { chromium } from 'playwright-core';

const BASE = 'http://localhost:4321';
let passed = 0;
let failed = 0;
const consoleErrors = [];

function check(name, cond) {
  if (cond) { passed++; console.log(`  PASS  ${name}`); }
  else { failed++; console.log(`  FAIL  ${name}`); }
}

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage();
page.on('console', (m) => {
  if (m.type() !== 'error') return;
  const url = m.location()?.url ?? '';
  if (url.includes('favicon')) return; // CMS-Admin hat kein eigenes Favicon
  consoleErrors.push(m.text());
});
page.on('pageerror', (e) => consoleErrors.push(String(e)));

console.log('\n== Archive page ==');
await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });

check('Titel enthält "Changelog"', (await page.title()).includes('Changelog'));
check('H1 = "Changelog"', (await page.locator('.pagehead h1').innerText()) === 'Changelog');
check('Featured-Titel sichtbar', await page.locator('.featured__body h2').innerText() === 'Bringmal Tischreservierungen 2.0');
check('Featured-Bild vorhanden', await page.locator('.featured__media img').count() === 1);
check('3 Karten im Grid (4 Posts minus Featured)', await page.locator('#grid .card').count() === 3);
check('Filter-Buttons: Alle + Kategorien', await page.locator('.filters__btn').count() >= 3);

// Bilder vollständig geladen
await page.waitForLoadState('networkidle');
const brokenImgs = await page.locator('img').evaluateAll(
  (imgs) => imgs.filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src)
);
check('Alle Bilder geladen (0 broken)', brokenImgs.length === 0);
if (brokenImgs.length) console.log('   broken:', brokenImgs);

console.log('\n== Kategorie-Filter ==');
await page.locator('.filters__btn[data-filter="shop"]').click();
await page.waitForTimeout(150);
let visible = await page.locator('#grid .card:visible').count();
check('Filter "Shop" → 2 sichtbare Karten', visible === 2);

await page.locator('.filters__btn[data-filter="neuigkeiten"]').click();
await page.waitForTimeout(150);
visible = await page.locator('#grid .card:visible').count();
check('Filter "Neuigkeiten" → 1 sichtbare Karte', visible === 1);
check('Featured bei "Neuigkeiten" ausgeblendet', await page.locator('.featured').isHidden());

await page.locator('.filters__btn[data-filter="tischreservierungen"]').click();
await page.waitForTimeout(150);
check('Filter "Tischreservierungen" → Featured bleibt sichtbar', await page.locator('.featured').isVisible());
check('Filter "Tischreservierungen" → leeres Grid ausgeblendet', await page.locator('#grid').isHidden());
check('Kein Empty-State bei "Tischreservierungen"', await page.locator('#grid-empty').isHidden());

await page.locator('.filters__btn[data-filter="all"]').click();
await page.waitForTimeout(150);
visible = await page.locator('#grid .card:visible').count();
check('Filter "Alle" → 3 sichtbare Karten', visible === 3);
check('Featured bei "Alle" sichtbar', await page.locator('.featured').isVisible());
check('Grid bei "Alle" wieder sichtbar', await page.locator('#grid').isVisible());

console.log('\n== Artikel: Tischreservierungen 2.0 ==');
await page.locator('.featured').click();
await page.waitForLoadState('networkidle');
check('URL = /blog/reservierungstool-2-0/', page.url().includes('/blog/reservierungstool-2-0/'));
check('H1 = Beitragstitel', (await page.locator('h1.article__title').innerText()).includes('Tischreservierungen'));
check('Version-Badge "v2.0" im Tag', (await page.locator('.article .tag').innerText()).toLowerCase().includes('v2.0'));
check('Prose-Bilder vorhanden (>= 10)', await page.locator('.prose img').count() >= 10);
check('H2-Sektionen vorhanden', await page.locator('.prose h2').count() >= 5);

const brokenArt = await page.locator('.prose img').evaluateAll(
  (imgs) => imgs.filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src)
);
check('Alle Artikel-Bilder geladen', brokenArt.length === 0);
if (brokenArt.length) console.log('   broken:', brokenArt);

check('"Weitere Beiträge" mit 2 Karten', await page.locator('.related__grid .card').count() === 2);

console.log('\n== Navigation & Zurück-Link ==');
await page.locator('.article__back').click();
await page.waitForLoadState('networkidle');
check('Zurück auf /', page.url() === `${BASE}/`);

// Karten-Link auf Artikel
await page.locator('#grid .card a').first().click();
await page.waitForLoadState('networkidle');
check('Karten-Link navigiert zu /blog/…', page.url().includes('/blog/'));

console.log('\n== Mobile (375px): Burger-Menü ==');
await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
await page.setViewportSize({ width: 375, height: 800 });
await page.locator('#burger').click();
check('Nav-Links nach Burger-Klick sichtbar', await page.locator('#nav-links.is-open').count() === 1);
await page.locator('#burger').click();
check('Nav-Links schließen wieder', await page.locator('#nav-links.is-open').count() === 0);

console.log('\n== RSS-Feed & CMS ==');
const rssRes = await page.goto(`${BASE}/rss.xml`);
check('RSS-Feed erreichbar', rssRes.status() === 200);
const rssBody = await rssRes.text();
check('RSS enthält 4 Items', (rssBody.match(/<item>/g) || []).length === 4);
check('RSS de-DE + korrekte Links', rssBody.includes('<language>de-DE</language>') && rssBody.includes('/blog/reservierungstool-2-0/'));

const adminRes = await page.goto(`${BASE}/admin/index.html`);
check('CMS-Admin erreichbar', adminRes.status() === 200);
check('Admin lädt Sveltia CMS', (await adminRes.text()).includes('sveltia-cms.js'));

const configRes = await page.goto(`${BASE}/admin/config.yml`);
check('CMS config.yml erreichbar', configRes.status() === 200);
check('Config zeigt auf GitHub-Repo', (await configRes.text()).includes('kevineulenberg/bringmal-changelog'));

console.log('\n== Konsolen-Fehler ==');
check('Keine JS-/Konsolenfehler', consoleErrors.length === 0);
if (consoleErrors.length) console.log('   errors:', consoleErrors);

await browser.close();
console.log(`\n===== ${passed} passed, ${failed} failed =====\n`);
process.exit(failed ? 1 : 0);
