import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const configPath = path.join(root, 'seo-pages.json');

const SITE = 'https://focsy.netlify.app';
const PLAY_URL = 'https://play.google.com/store/apps/details?id=com.focsy';

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const renderSections = (sections = []) => sections.map((section) => {
  const paragraphs = (section.paragraphs || [])
    .map((p) => `      <p>${escapeHtml(p)}</p>`)
    .join('\n');

  const steps = section.steps?.length
    ? `      <ol>\n${section.steps.map((step) => `        <li>${escapeHtml(step)}</li>`).join('\n')}\n      </ol>`
    : '';

  return `    <section class="card">\n      <h2>${escapeHtml(section.heading)}</h2>\n${paragraphs}${paragraphs && steps ? '\n' : ''}${steps}\n    </section>`;
}).join('\n\n');

const renderRelated = (pages, currentSlug) => {
  const links = pages
    .filter((page) => page.slug !== currentSlug)
    .map((page) => `        <li><a href="/${escapeHtml(page.slug)}">${escapeHtml(page.headline)}</a></li>`)
    .join('\n');

  return `    <section class="related">\n      <h2>Related Focsy guides</h2>\n      <ul>\n${links}\n      </ul>\n    </section>`;
};

const renderPage = (page, pages) => {
  const canonical = `${SITE}/${page.slug}`;
  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: page.title,
        description: page.description,
        url: canonical,
        isPartOf: { '@type': 'WebSite', name: 'Focsy', url: `${SITE}/` },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Focsy',
        applicationCategory: 'ProductivityApplication',
        operatingSystem: 'Android',
        url: `${SITE}/`,
        downloadUrl: PLAY_URL,
      },
    ],
  });

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#F07B4A" />
  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeHtml(page.description)}" />
  <meta name="robots" content="index,follow,max-image-preview:large" />
  <link rel="canonical" href="${canonical}" />
  <link rel="icon" type="image/svg+xml" href="/focsy.svg" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Focsy" />
  <meta property="og:title" content="${escapeHtml(page.title)}" />
  <meta property="og:description" content="${escapeHtml(page.description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="${escapeHtml(page.title)}" />
  <meta name="twitter:description" content="${escapeHtml(page.description)}" />
  <style>
    :root { font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #201713; background: #fffaf6; }
    * { box-sizing: border-box; }
    body { margin: 0; }
    main { max-width: 900px; margin: 0 auto; padding: 48px 24px 80px; }
    .brand { font-weight: 800; color: #f07b4a; text-decoration: none; font-size: 20px; }
    .eyebrow { margin-top: 56px; color: #f07b4a; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; font-size: 13px; }
    h1 { font-size: clamp(42px, 7vw, 72px); line-height: 1.02; margin: 12px 0 24px; letter-spacing: -.04em; }
    h2 { margin: 0 0 14px; font-size: 28px; line-height: 1.15; }
    p, li { font-size: 18px; line-height: 1.7; color: #4b3b34; }
    .cta { display: inline-block; margin: 10px 0 22px; padding: 15px 22px; border-radius: 999px; background: #f07b4a; color: white; text-decoration: none; font-weight: 800; }
    .card { margin-top: 28px; padding: 28px; background: white; border: 1px solid #f2d7c8; border-radius: 24px; }
    .related { margin-top: 44px; padding-top: 28px; border-top: 1px solid #edd9cf; }
    .related a { color: #c95e32; font-weight: 700; }
    footer { margin-top: 54px; padding-top: 24px; border-top: 1px solid #edd9cf; font-size: 14px; color: #7a675f; }
  </style>
  <script type="application/ld+json">${schema}</script>
</head>
<body>
  <main>
    <a class="brand" href="/">Focsy</a>
    <div class="eyebrow">${escapeHtml(page.eyebrow)}</div>
    <h1>${escapeHtml(page.headline)}</h1>
    <p>${escapeHtml(page.intro)}</p>
    <a class="cta" href="${PLAY_URL}">Get Focsy on Google Play</a>

${renderSections(page.sections)}

${renderRelated(pages, page.slug)}

    <footer>Focsy — app blocking and anti-doomscrolling tools for Android.</footer>
  </main>
</body>
</html>
`;
};

const pages = JSON.parse(await readFile(configPath, 'utf8'));

if (!Array.isArray(pages) || pages.length === 0) {
  throw new Error('seo-pages.json must contain at least one page definition.');
}

const slugs = new Set();
for (const page of pages) {
  if (!page.slug || !page.title || !page.description || !page.headline || !page.intro) {
    throw new Error(`Invalid SEO page definition: ${JSON.stringify(page)}`);
  }
  if (!/^[a-z0-9-]+$/.test(page.slug)) {
    throw new Error(`Invalid slug: ${page.slug}`);
  }
  if (slugs.has(page.slug)) {
    throw new Error(`Duplicate slug: ${page.slug}`);
  }
  slugs.add(page.slug);
}

await mkdir(publicDir, { recursive: true });

for (const page of pages) {
  await writeFile(path.join(publicDir, `${page.slug}.html`), renderPage(page, pages), 'utf8');
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${SITE}/</loc><priority>1.0</priority></url>\n${pages.map((page) => `  <url><loc>${SITE}/${page.slug}</loc><priority>0.9</priority></url>`).join('\n')}\n</urlset>\n`;
await writeFile(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8');

const redirects = `# Generated by scripts/generate-seo-pages.mjs\n${pages.map((page) => `/${page.slug} /${page.slug}.html 200`).join('\n')}\n`;
await writeFile(path.join(publicDir, '_redirects'), redirects, 'utf8');

console.log(`Generated ${pages.length} SEO pages, sitemap.xml and _redirects.`);
