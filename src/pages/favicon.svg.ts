import type { APIRoute } from 'astro';
import { renderMarkSvg } from '../lib/og';

export const GET: APIRoute = async () =>
  new Response(await renderMarkSvg(), { headers: { 'Content-Type': 'image/svg+xml' } });
