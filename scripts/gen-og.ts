import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const ROOT = resolve(import.meta.dirname, '..');
const OUTPUT = resolve(ROOT, 'public/og-image.png');

async function loadFont(family: 'Bricolage Grotesque' | 'Plus Jakarta Sans' | 'Caveat', weight: number) {
  const urls: Record<string, string> = {
    'Bricolage Grotesque-800':
      'https://fonts.gstatic.com/s/bricolagegrotesque/v9/3y9U6as8bTXq_nANBjzKo3IeZx8z6up5BeSl5jBNz_19PpbpMXuECpwUxJBOm_OJWiaaD30YfKfjZZoLvZvlyM0.ttf',
    'Plus Jakarta Sans-500':
      'https://fonts.gstatic.com/s/plusjakartasans/v12/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_m07NSg.ttf',
    'Caveat-700':
      'https://fonts.gstatic.com/s/caveat/v23/WnznHAc5bAfYB2QRah7pcpNvOx-pjRV6SII.ttf',
  };
  const key = `${family}-${weight}`;
  const url = urls[key];
  if (!url) throw new Error(`No font url for ${key}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${key}: ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

function loadIconBase64(): string {
  const iconPath = resolve(ROOT, 'public/apple-touch-icon.png');
  const data = readFileSync(iconPath);
  return `data:image/png;base64,${data.toString('base64')}`;
}

const CORAL = '#FF6B35';
const LAVENDER = '#C3B1E1';
const YELLOW = '#FFD93D';
const TEXT = '#1a1a1a';
const BG = '#FAFAF7';

function buildMarkup(iconSrc: string) { return {
  type: 'div',
  props: {
    style: {
      width: 1200,
      height: 630,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 80,
      background: BG,
      position: 'relative',
      fontFamily: 'Plus Jakarta Sans',
    },
    children: [
      // Top: decorative blobs
      {
        type: 'div',
        props: {
          style: {
            position: 'absolute',
            top: -120,
            right: -120,
            width: 420,
            height: 420,
            borderRadius: '50%',
            background: LAVENDER,
            opacity: 0.45,
            filter: 'blur(60px)',
          },
        },
      },
      {
        type: 'div',
        props: {
          style: {
            position: 'absolute',
            bottom: -100,
            left: -80,
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: YELLOW,
            opacity: 0.35,
            filter: 'blur(50px)',
          },
        },
      },
      // Top row: logo + badge
      {
        type: 'div',
        props: {
          style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
          children: [
            {
              type: 'div',
              props: {
                style: { display: 'flex', alignItems: 'center', gap: 16 },
                children: [
                  {
                    type: 'img',
                    props: {
                      src: iconSrc,
                      width: 52,
                      height: 52,
                      style: { borderRadius: 12 },
                    },
                  },
                  {
                    type: 'div',
                    props: {
                      style: {
                        fontFamily: 'Caveat',
                        fontSize: 52,
                        fontWeight: 700,
                        color: TEXT,
                        lineHeight: 1,
                      },
                      children: 'adib.',
                    },
                  },
                ],
              },
            },
            {
              type: 'div',
              props: {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '14px 26px',
                  background: 'white',
                  border: '1px solid rgba(0,0,0,0.08)',
                  borderRadius: 999,
                  fontSize: 22,
                  fontWeight: 500,
                  color: TEXT,
                },
                children: [
                  {
                    type: 'div',
                    props: {
                      style: { width: 10, height: 10, borderRadius: '50%', background: '#22c55e' },
                    },
                  },
                  'Available for projects',
                ],
              },
            },
          ],
        },
      },
      // Middle: headline
      {
        type: 'div',
        props: {
          style: { display: 'flex', flexDirection: 'column', gap: 24 },
          children: [
            {
              type: 'div',
              props: {
                style: {
                  fontFamily: 'Bricolage Grotesque',
                  fontSize: 96,
                  fontWeight: 800,
                  lineHeight: 1.02,
                  letterSpacing: '-0.03em',
                  color: TEXT,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0 24px',
                },
                children: [
                  'Developer who ships',
                  {
                    type: 'span',
                    props: {
                      style: { color: CORAL },
                      children: 'real products.',
                    },
                  },
                ],
              },
            },
            {
              type: 'div',
              props: {
                style: {
                  fontSize: 28,
                  fontWeight: 400,
                  color: '#555',
                  maxWidth: 900,
                  lineHeight: 1.4,
                },
                children:
                  'Full-stack product engineer. Web, mobile, and Go backends for startups and small businesses.',
              },
            },
          ],
        },
      },
      // Bottom: domain
      {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 24,
            color: '#666',
            fontWeight: 500,
          },
          children: [
            { type: 'div', props: { children: 'thufailadib.com' } },
            { type: 'div', props: { children: 'Based anywhere, building for everyone.' } },
          ],
        },
      },
    ],
  },
}; }

async function main() {
  console.log('Loading fonts...');
  const [bricolage, jakarta, caveat] = await Promise.all([
    loadFont('Bricolage Grotesque', 800),
    loadFont('Plus Jakarta Sans', 500),
    loadFont('Caveat', 700),
  ]);

  console.log('Loading icon...');
  const iconSrc = loadIconBase64();

  console.log('Rendering SVG via satori...');
  const svg = await satori(buildMarkup(iconSrc) as any, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Bricolage Grotesque', data: bricolage, weight: 800, style: 'normal' },
      { name: 'Plus Jakarta Sans', data: jakarta, weight: 500, style: 'normal' },
      { name: 'Caveat', data: caveat, weight: 700, style: 'normal' },
    ],
  });

  console.log('Rasterizing to PNG...');
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();

  if (!existsSync(dirname(OUTPUT))) mkdirSync(dirname(OUTPUT), { recursive: true });
  writeFileSync(OUTPUT, png);
  console.log(`Wrote ${OUTPUT} (${png.byteLength} bytes)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
