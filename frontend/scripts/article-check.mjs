#!/usr/bin/env node
// Article quality check for GURU Credits blog modules.
// Usage: node article-check.mjs <file.ts> [...more]
// Parses the `export const post = {...}` object loosely (regex-based; the files are simple TS literals).
import { readFileSync } from 'node:fs';

const FORBIDDEN = [/guaranteed approval/i, /100% approval/i, /no credit check/i, /kelulusan dijamin/i, /kelulusan 100%/i];
const REQUIRED_CTA = /\]\(\/eligibility-test\)/;

function field(src, name) {
  // matches `name: 'value'`, `name: "value"` or template literal `name: \`...\``
  const m = src.match(new RegExp(`\\b${name}:\\s*(?:'((?:[^'\\\\]|\\\\.)*)'|"((?:[^"\\\\]|\\\\.)*)"|\`([\\s\\S]*?)\`(?=\\s*,\\s*\\n\\s*[a-zA-Z]+:|\\s*,?\\s*\\n\\s*\\}))`));
  if (!m) return null;
  return (m[1] ?? m[2] ?? m[3] ?? '').replace(/\\n/g, '\n').replace(/\\'/g, "'").replace(/\\`/g, '`');
}

function words(s) { return s.trim().split(/\s+/).filter(Boolean).length; }
function outline(md) { return [...md.matchAll(/^(#{1,6})\s+(.+)$/gm)].map((m) => `${m[1]} ${m[2].trim()}`); }
function links(md) { return [...md.matchAll(/\]\(([^)]+)\)/g)].map((m) => m[1]); }

let failed = false;
for (const file of process.argv.slice(2)) {
  const src = readFileSync(file, 'utf8');
  const problems = [];
  const title = field(src, 'title') ?? '';
  const seoTitle = field(src, 'seoTitle') ?? title;
  const seoTitleMs = field(src, 'seoTitleMs') ?? (field(src, 'titleMs') ?? '');
  const excerpt = field(src, 'excerpt') ?? '';
  const excerptMs = field(src, 'excerptMs') ?? '';
  const content = field(src, 'content') ?? '';
  const contentMs = field(src, 'contentMs') ?? '';

  const en = words(content), ms = words(contentMs);
  if (en < 1200 || en > 1800) problems.push(`en word count ${en} (want 1200–1800)`);
  const readTimeMatch = src.match(/\breadTime:\s*(\d+)/);
  const readTime = readTimeMatch ? Number(readTimeMatch[1]) : null;
  const expectedReadTime = Math.round(en / 220);
  if (readTime === null) problems.push('readTime field missing');
  else if (Math.abs(readTime - expectedReadTime) > 0) problems.push(`readTime ${readTime} (want ${expectedReadTime}, round(en words / 220))`);
  if (ms < 1000) problems.push(`ms word count ${ms} (want a full translation, ≥ 1000)`);
  if (seoTitle.length > 45) problems.push(`seoTitle ${seoTitle.length} chars (max 45)`);
  if (seoTitleMs.length > 45) problems.push(`seoTitleMs ${seoTitleMs.length} chars (max 45)`);
  if (excerpt.length < 120 || excerpt.length > 155) problems.push(`excerpt ${excerpt.length} chars (want 120–155)`);
  if (excerptMs.length < 100 || excerptMs.length > 170) problems.push(`excerptMs ${excerptMs.length} chars (want 100–170)`);
  for (const [label, md] of [['en', content], ['ms', contentMs]]) {
    if (/^#\s/m.test(md)) problems.push(`${label}: H1 (#) inside content`);
    if (!/^##\s+FAQ|^##\s+Soalan/m.test(md)) problems.push(`${label}: missing "## FAQ" / "## Soalan Lazim" section`);
    if (!REQUIRED_CTA.test(md)) problems.push(`${label}: missing CTA link to /eligibility-test`);
    for (const l of links(md)) if (/^https?:\/\//.test(l)) problems.push(`${label}: external link ${l}`);
    for (const re of FORBIDDEN) if (re.test(md)) problems.push(`${label}: forbidden phrase ${re}`);
    const h2 = outline(md).filter((h) => h.startsWith('## ')).length;
    if (h2 < 5 || h2 > 9) problems.push(`${label}: ${h2} H2 sections (want 5–8 + FAQ)`);
  }
  console.log(`\n=== ${file}\n  title: ${title} | seoTitle(${seoTitle.length}): ${seoTitle}\n  words en=${en} ms=${ms}\n  outline(en): ${outline(content).join(' | ')}\n  links(en): ${[...new Set(links(content))].join(', ')}`);
  if (problems.length) { failed = true; console.log('  PROBLEMS:\n   - ' + problems.join('\n   - ')); } else console.log('  OK');
}
process.exit(failed ? 1 : 0);
