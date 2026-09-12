import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import { SEO } from '@/lib/constants';
import { buildMetadata } from '@/lib/seo';

// Google typically truncates around ~60 chars for titles and ~155-160 chars
// for descriptions. We budget a little slack (65 / 70-165) so near-boundary
// copy isn't flagged as a false positive while still catching the egregious
// cases the audit found (80+ char titles, 190+ char descriptions).
const TITLE_MAX = 65;
const DESCRIPTION_MIN = 70;
const DESCRIPTION_MAX = 165;
const SUFFIX = ` | ${SEO.siteName}`;

const APP_DIR = path.join(__dirname, '../../app');

function collectMetadataFiles(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectMetadataFiles(full, out);
    } else if (entry.name === 'metadata.ts') {
      out.push(full);
    }
  }
  return out;
}

/**
 * Every metadata.ts in this app sits under the root layout's
 * `%s | GURU Credits` title template with nothing in between that resets it
 * (blog/loan-guides layouts forward the same template — see task-B-brief
 * B1.1), so a plain string title always renders with the suffix appended.
 */
function effectiveTitle(title: Metadata['title']): string {
  if (typeof title === 'string') return `${title}${SUFFIX}`;
  if (title && typeof title === 'object' && 'default' in title) {
    const value = (title as { default?: unknown }).default;
    return typeof value === 'string' ? `${value}${SUFFIX}` : '';
  }
  return '';
}

function imageCount(images: Metadata['openGraph'] extends { images?: infer I } ? I : never): number {
  if (!images) return 0;
  return Array.isArray(images) ? images.length : 1;
}

describe('metadata.ts length + shape budget', () => {
  const files = collectMetadataFiles(APP_DIR);

  it('found metadata.ts files to check', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  for (const file of files) {
    const rel = path.relative(process.cwd(), file);

    it(`${rel} stays within SEO budgets`, async () => {
      const mod = (await import(file)) as { metadata?: Metadata };
      const metadata = mod.metadata;
      expect(metadata, `${rel} must export \`metadata\``).toBeTruthy();
      if (!metadata) return;

      const title = effectiveTitle(metadata.title);
      expect(title.length, `${rel} title "${title}"`).toBeGreaterThan(0);
      expect(title.length, `${rel} title "${title}" (${title.length} chars)`).toBeLessThanOrEqual(TITLE_MAX);

      if (typeof metadata.description === 'string') {
        const { length } = metadata.description;
        expect(length, `${rel} description too short (${length} chars)`).toBeGreaterThanOrEqual(DESCRIPTION_MIN);
        expect(length, `${rel} description too long (${length} chars)`).toBeLessThanOrEqual(DESCRIPTION_MAX);
      }

      const og = metadata.openGraph as { images?: unknown } | undefined;
      expect(imageCount(og?.images as never), `${rel} openGraph.images`).toBeGreaterThan(0);

      expect(metadata.alternates?.canonical, `${rel} alternates.canonical`).toBeTruthy();
    });
  }
});

describe('buildMetadata() output budget', () => {
  const path_ = '/sample-page';
  const title = 'Sample Page Title';
  const description = 'A representative description used to exercise buildMetadata in isolation from any route.';

  it('sets a self-referencing canonical for the given path', () => {
    const result = buildMetadata({ title, description, path: path_ });
    expect(result.alternates?.canonical).toBe(`${SEO.url}${path_}`);
  });

  it('always includes a non-empty openGraph.images, defaulting to SEO.shareImage', () => {
    const result = buildMetadata({ title, description, path: path_ });
    const images = result.openGraph?.images;
    expect(Array.isArray(images) ? images.length : 0).toBeGreaterThan(0);
  });

  it('derives openGraph.locale/alternateLocale from the locale param (default en)', () => {
    const en = buildMetadata({ title, description, path: path_ });
    const ms = buildMetadata({ title, description, path: path_, locale: 'ms' });
    expect(en.openGraph?.locale).toBe('en_MY');
    expect(en.openGraph?.alternateLocale).toEqual(['ms_MY']);
    expect(ms.openGraph?.locale).toBe('ms_MY');
    expect(ms.openGraph?.alternateLocale).toEqual(['en_MY']);
  });

  it('keeps ms hreflang out of alternates.languages while the locale-prefix flag is off', () => {
    const result = buildMetadata({ title, description, path: path_, locale: 'ms' });
    expect(result.alternates?.languages).not.toHaveProperty('ms-MY');
  });
});
