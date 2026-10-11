import type { APIRoute } from 'astro';
import { pngToIco, renderMarkSvg, toPng } from '../lib/og';

// Browsers and crawlers request /favicon.ico by default even when an SVG icon is declared.
export const GET: APIRoute = async () =>
  new Response(new Uint8Array(pngToIco(toPng(await renderMarkSvg(), 32), 32)), {
    headers: { 'Content-Type': 'image/x-icon' },
  });
