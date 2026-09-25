import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import { SEO } from '@/lib/constants';
import { buildMetadata, type LocalizedMetadataInput } from '@/lib/seo';
import { blogPosts } from '@/lib/blog-data';
import { guideTopics } from '@/lib/guide-topics';
import { regions } from '@/lib/content/regions';

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

function imageCount(images: Metadata['openGraph'] extends { images?: infer I } ? I : never): number {
  if (!images) return 0;
  return Array.isArray(images) ? images.length : 1;
}

/**
 * Every metadata.ts in this app exports `meta: LocalizedMetadataInput`
 * (`{ en, ms, path, image?, keywords? }`), consumed by the route's own
 * `generateMetadata()` via `localizedMetadata()` (see src/lib/seo.ts). That
 * function resolves the request's language via `resolveRequestLanguage()`,
 * which needs a real Next.js request context this test doesn't have — so
 * instead of calling it, we exercise both locales directly through
 * `buildMetadata()`, the same function `localizedMetadata()` delegates to.
 * This is also how the Malay side of every localised route gets its own
 * length/shape budget check, not just the English one.
 */
describe('metadata.ts length + shape budget', () => {
  const files = collectMetadataFiles(APP_DIR);

  it('found metadata.ts files to check', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  for (const file of files) {
    const rel = path.relative(process.cwd(), file);

    it(`${rel} stays within SEO budgets`, async () => {
      const mod = (await import(file)) as { meta?: LocalizedMetadataInput };
      const meta = mod.meta;
      expect(meta, `${rel} must export \`meta\``).toBeTruthy();
      if (!meta) return;

      for (const lang of ['en', 'ms'] as const) {
        const copy = meta[lang];
        const metadata = buildMetadata({
          title: copy.title,
          description: copy.description,
          path: meta.path,
          image: meta.image,
          keywords: meta.keywords,
          locale: lang,
        });

        const title = `${copy.title}${SUFFIX}`;
        expect(title.length, `${rel} [${lang}] title "${title}"`).toBeGreaterThan(0);
        expect(title.length, `${rel} [${lang}] title "${title}" (${title.length} chars)`).toBeLessThanOrEqual(
          TITLE_MAX,
        );

        expect(
          copy.description.length,
          `${rel} [${lang}] description too short (${copy.description.length} chars): "${copy.description}"`,
        ).toBeGreaterThanOrEqual(DESCRIPTION_MIN);
        expect(
          copy.description.length,
          `${rel} [${lang}] description too long (${copy.description.length} chars): "${copy.description}"`,
        ).toBeLessThanOrEqual(DESCRIPTION_MAX);

        const og = metadata.openGraph as { images?: unknown } | undefined;
        expect(imageCount(og?.images as never), `${rel} [${lang}] openGraph.images`).toBeGreaterThan(0);

        expect(metadata.alternates?.canonical, `${rel} [${lang}] alternates.canonical`).toBeTruthy();
      }
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

// I3: the effective <title> is `${title} | GURU Credits` (SUFFIX is 15 chars),
// so every long-form title needs a `seoTitle` short enough to keep the whole
// rendered title under Google's ~65-char display budget.
describe('blog post title budget', () => {
  for (const post of blogPosts) {
    it(`${post.slug} title fits the SEO title budget`, () => {
      const effective = post.seoTitle ?? post.title;
      expect(effective.length + 15, `"${effective}" (${effective.length} chars)`).toBeLessThanOrEqual(65);
    });

    it(`${post.slug} Malay title fits the SEO title budget`, () => {
      const effectiveMs = post.seoTitleMs ?? post.titleMs;
      expect(effectiveMs.length + 15, `"${effectiveMs}" (${effectiveMs.length} chars)`).toBeLessThanOrEqual(65);
    });
  }
});

describe('guide topic title budget', () => {
  for (const topic of guideTopics) {
    it(`${topic.slug} title fits the SEO title budget`, () => {
      expect(topic.title.length + 15, `"${topic.title}" (${topic.title.length} chars)`).toBeLessThanOrEqual(65);
    });

    it(`${topic.slug} Malay title fits the SEO title budget`, () => {
      expect(topic.titleMs.length + 15, `"${topic.titleMs}" (${topic.titleMs.length} chars)`).toBeLessThanOrEqual(65);
    });
  }
});

describe('region page title budget', () => {
  for (const region of Object.values(regions)) {
    it(`${region.slug} title fits the SEO title budget`, () => {
      const title = `Personal Loan ${region.name.en}`;
      expect(title.length + 15, `"${title}" (${title.length} chars)`).toBeLessThanOrEqual(65);
    });

    it(`${region.slug} Malay title fits the SEO title budget`, () => {
      const titleMs = `Pinjaman Peribadi ${region.name.ms}`;
      expect(titleMs.length + 15, `"${titleMs}" (${titleMs.length} chars)`).toBeLessThanOrEqual(65);
    });
  }
});
