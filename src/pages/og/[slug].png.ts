import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../../data/site';
import { buildMonth, currentRole } from '../../lib/experience';
import { renderOgImage, type OgCard } from '../../lib/og';

// One preview per public page: "home" plus each project.
export const getStaticPaths = (async () => {
  const experience = (await getCollection('experience')).map((e) => e.data);
  const current = currentRole(experience, buildMonth());
  const home: OgCard = {
    title: site.name,
    subtitle: site.headline,
    footer: current ? `${current.role} at ${current.company}` : site.education.school,
  };
  const projects = (await getCollection('projects')).map((p) => ({
    params: { slug: p.id },
    props: {
      card: {
        title: p.data.title,
        subtitle: p.data.tagline,
        footer: p.data.stack.slice(0, 5).join(' · '),
        badge: p.data.status === 'building' ? 'Building' : undefined,
      } satisfies OgCard,
    },
  }));
  return [{ params: { slug: 'home' }, props: { card: home } }, ...projects];
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgImage((props as { card: OgCard }).card);
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
