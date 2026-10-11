import type { APIRoute } from 'astro';
import { renderMarkSvg, toPng } from '../lib/og';

export const GET: APIRoute = async () =>
  new Response(new Uint8Array(toPng(await renderMarkSvg(), 512)), { headers: { 'Content-Type': 'image/png' } });
