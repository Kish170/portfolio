// Build-time image rendering for link previews and icons. Satori lays out
// a JSX-like tree into SVG (text as paths); resvg rasterises it to PNG.
import { readFileSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';

// Satori reads woff/ttf but not woff2, so only the static Plex Mono files work here.
const fontDir = 'node_modules/@fontsource/ibm-plex-mono/files';
const fonts = [
  { name: 'Plex Mono', weight: 400 as const, data: readFileSync(`${fontDir}/ibm-plex-mono-latin-400-normal.woff`) },
  { name: 'Plex Mono', weight: 500 as const, data: readFileSync(`${fontDir}/ibm-plex-mono-latin-500-normal.woff`) },
];

// Dark palette from tokens.css; previews are shown on unknown backgrounds, so
// one fixed, high-contrast palette beats following a theme.
const C = {
  bg: '#0c0e11',
  text: '#e7e9ec',
  muted: '#9ba4ae',
  accent: '#3fd59a',
  building: '#f0b35a',
  grid: 'rgba(231,233,236,0.06)',
};

type Node = { type: string; props: Record<string, unknown> };
const el = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
  type,
  props: { style, children },
});

export interface OgCard {
  title: string;
  subtitle: string;
  /** Short line at the bottom, e.g. current role or stack. */
  footer: string;
  badge?: string;
}

export async function renderOgImage(card: OgCard): Promise<Buffer> {
  const tree = el(
    'div',
    {
      width: '100%',
      height: '100%',
      // Without this the padding adds to the 630px height and pushes the footer off-canvas.
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '72px 80px',
      backgroundColor: C.bg,
      backgroundImage: `linear-gradient(${C.grid} 1px, transparent 1px), linear-gradient(90deg, ${C.grid} 1px, transparent 1px)`,
      backgroundSize: '40px 40px',
      fontFamily: 'Plex Mono',
      color: C.text,
    },
    [
      el('div', { display: 'flex', fontSize: 26, color: C.muted }, 'kishanrajagunathas.ca'),
      el('div', { display: 'flex', flexDirection: 'column', gap: 24 }, [
        el('div', { display: 'flex', alignItems: 'center', gap: 28 }, [
          el('div', { display: 'flex', fontSize: 76, fontWeight: 500, letterSpacing: -2 }, card.title),
          ...(card.badge
            ? [
                el(
                  'div',
                  {
                    display: 'flex',
                    fontSize: 24,
                    color: C.building,
                    border: `2px solid ${C.building}`,
                    borderRadius: 6,
                    padding: '4px 14px',
                  },
                  card.badge,
                ),
              ]
            : []),
        ]),
        el('div', { display: 'flex', fontSize: 34, color: C.muted, lineHeight: 1.35, maxWidth: 1000 }, card.subtitle),
      ]),
      el('div', { display: 'flex', alignItems: 'center', gap: 16, fontSize: 26, color: C.muted }, [
        el('div', { width: 14, height: 14, borderRadius: 7, backgroundColor: C.accent }),
        el('div', { display: 'flex' }, card.footer),
      ]),
    ],
  );
  return toPng(await satori(tree as never, { width: 1200, height: 630, fonts }), 1200);
}

/** The "kr" mark as SVG (text converted to paths, so no font is needed to view it). */
export async function renderMarkSvg(): Promise<string> {
  const tree = el(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: C.bg,
      borderRadius: 14,
      fontFamily: 'Plex Mono',
      fontWeight: 500,
      fontSize: 34,
      color: C.accent,
      letterSpacing: -1,
    },
    'kr',
  );
  return satori(tree as never, { width: 64, height: 64, fonts });
}

export function toPng(svg: string, width: number): Buffer {
  return new Resvg(svg, { fitTo: { mode: 'width', value: width } }).render().asPng();
}

/** ICO container holding one PNG (supported by every browser that requests /favicon.ico). */
export function pngToIco(png: Buffer, size: number): Buffer {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // image count
  header.writeUInt8(size, 6); // width
  header.writeUInt8(size, 7); // height
  header.writeUInt8(0, 8); // palette size
  header.writeUInt8(0, 9); // reserved
  header.writeUInt16LE(1, 10); // colour planes
  header.writeUInt16LE(32, 12); // bits per pixel
  header.writeUInt32LE(png.length, 14); // image size
  header.writeUInt32LE(22, 18); // image offset
  return Buffer.concat([header, png]);
}
