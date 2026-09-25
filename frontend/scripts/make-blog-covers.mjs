#!/usr/bin/env node
// Generates 1200x630 branded JPEG cover images for blog articles under
// src/lib/content/blog/*.ts. Renders an SVG (site palette + article title)
// and rasterises it with sharp.
//
// Usage: node scripts/make-blog-covers.mjs [slug ...]
//   With no args, generates a cover for every module in src/lib/content/blog.

import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'src/lib/content/blog');
const OUT_DIR = path.join(ROOT, 'public/images/blog');

const WIDTH = 1200;
const HEIGHT = 630;

function extractField(src, name) {
  const m = src.match(new RegExp(`\\b${name}:\\s*'((?:[^'\\\\]|\\\\.)*)'`));
  return m ? m[1].replace(/\\'/g, "'") : null;
}

function escapeXml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Greedy word-wrap into at most `maxLines` lines that each fit within
// `maxCharsPerLine` (an approximation of the rendered glyph width at the
// chosen font size for a proportional sans-serif). If the title doesn't fit
// in maxLines, the last line is truncated with an ellipsis.
function wrapTitle(title, maxCharsPerLine, maxLines) {
  const words = title.split(/\s+/);
  const lines = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxCharsPerLine && current) {
      lines.push(current);
      current = word;
      if (lines.length === maxLines - 1) {
        // Last line: fit as many remaining words as possible, then ellipsis if needed.
        const rest = words.slice(words.indexOf(word)).join(' ');
        if (rest.length > maxCharsPerLine) {
          let truncated = rest.slice(0, maxCharsPerLine - 1).trim();
          truncated = truncated.replace(/\s+\S*$/, '');
          current = `${truncated}…`;
        } else {
          current = rest;
        }
        lines.push(current);
        return lines;
      }
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, maxLines);
}

function buildSvg(title) {
  const FONT = 'Helvetica, Arial, sans-serif';
  const titleSize = 56;
  const lineHeight = 66;
  const lines = wrapTitle(title, 30, 3);
  const blockHeight = lines.length * lineHeight;
  const startY = HEIGHT / 2 - blockHeight / 2 + titleSize * 0.75 - 20;

  const titleTspans = lines
    .map((line, i) => `<tspan x="80" y="${startY + i * lineHeight}">${escapeXml(line)}</tspan>`)
    .join('');

  return `<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="82%" cy="12%" r="65%">
      <stop offset="0%" stop-color="#2563eb" stop-opacity="0.16" />
      <stop offset="55%" stop-color="#2563eb" stop-opacity="0.06" />
      <stop offset="100%" stop-color="#2563eb" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect x="0" y="0" width="${WIDTH}" height="${HEIGHT}" fill="#fafafa" />
  <rect x="0" y="0" width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)" />
  <rect x="0" y="${HEIGHT - 14}" width="220" height="14" fill="#2563eb" />
  <text font-family="${FONT}" font-weight="700" font-size="${titleSize}" fill="#111111">${titleTspans}</text>
  <text x="80" y="${HEIGHT - 44}" font-family="${FONT}" font-weight="700" font-size="22" fill="#2563eb">GURU Credits</text>
</svg>`;
}

async function makeCover(slug, title) {
  const svg = buildSvg(title);
  const outPath = path.join(OUT_DIR, `${slug}.jpg`);
  await sharp(Buffer.from(svg))
    .flatten({ background: '#fafafa' })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(outPath);
  const { size } = fs.statSync(outPath);
  console.log(`${slug}.jpg  ${(size / 1024).toFixed(1)} KB`);
  if (size > 120 * 1024) {
    console.warn(`  WARNING: ${slug}.jpg is over 120 KB`);
  }
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const argSlugs = process.argv.slice(2);
  const files = argSlugs.length
    ? argSlugs.map((s) => `${s}.ts`)
    : fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.ts'));

  for (const file of files) {
    const full = path.join(CONTENT_DIR, file);
    const src = fs.readFileSync(full, 'utf8');
    const slug = extractField(src, 'slug');
    const title = extractField(src, 'title');
    if (!slug || !title) {
      console.error(`Skipping ${file}: could not extract slug/title`);
      continue;
    }
    await makeCover(slug, title);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
