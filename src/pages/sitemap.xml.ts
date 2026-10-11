import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// Hand-rolled: five URLs do not justify the sitemap integration. Mirrors the
// pages that exist; /styleguide is noindex and left out on purpose.
export const GET: APIRoute = async ({ site }) => {
  const projects = await getCollection('projects');
  const paths = ['/', ...projects.map((p) => `/projects/${p.id}/`)];
  const urls = paths.map((p) => `  <url><loc>${new URL(p, site)}</loc></url>`).join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
};
