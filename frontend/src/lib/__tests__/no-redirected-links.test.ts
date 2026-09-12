import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

// Kept in sync with the `redirects()` sources in next.config.ts. Hardcoded
// rather than importing next.config.ts directly — that module runs
// environment-dependent setup (CSP/API-URL parsing) at import time, which is
// unnecessary risk for a test that only needs the list of redirected paths.
const REDIRECTED_SOURCES = ['/compare', '/calculator', '/dsr-calculator', '/loan-calculator'];

function collectFiles(dir: string, exts: string[], out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectFiles(full, exts, out);
    } else if (exts.some((ext) => entry.name.endsWith(ext))) {
      out.push(full);
    }
  }
  return out;
}

function extractLinkTargets(source: string): string[] {
  const targets: string[] = [];

  // JSX/object href attributes: href="...", href='...', href: '...', href: "..."
  const hrefPattern = /href\s*[:=]\s*["']([^"']+)["']/g;
  for (const match of source.matchAll(hrefPattern)) {
    targets.push(match[1]);
  }

  // Markdown links: [label](/path)
  const markdownPattern = /\]\(([^)\s]+)\)/g;
  for (const match of source.matchAll(markdownPattern)) {
    targets.push(match[1]);
  }

  // Strip any query string / hash / trailing slash so `/compare?x=1` or
  // `/compare#section` still match the bare redirect source.
  return targets.map((target) => target.split(/[?#]/)[0].replace(/\/$/, '') || '/');
}

describe('no links to redirected paths', () => {
  const libFiles = collectFiles(path.join(__dirname, '..'), ['.ts', '.tsx']).filter(
    (f) => !f.includes(`${path.sep}__tests__${path.sep}`),
  );
  const appFiles = collectFiles(path.join(__dirname, '../../app'), ['.tsx']);
  const files = [...new Set([...libFiles, ...appFiles])];

  it('found source files to scan', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  for (const file of files) {
    it(`${path.relative(process.cwd(), file)} has no href/markdown link to a redirected path`, () => {
      const source = fs.readFileSync(file, 'utf8');
      const targets = extractLinkTargets(source);
      const offenders = targets.filter((target) => REDIRECTED_SOURCES.includes(target));
      expect(offenders).toEqual([]);
    });
  }
});
