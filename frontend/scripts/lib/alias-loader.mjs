// Minimal Node ESM resolve hook so plain `node` scripts can import this app's
// TypeScript modules without pulling in a bundler. Node's native TypeScript
// support (stable since Node 23.6, used here on Node 26) strips types but
// does two things Next.js's own (webpack/SWC) resolver does for free:
//   1. read tsconfig's `@/*` path alias
//   2. resolve extensionless relative specifiers (`./form-options`)
// This hook fills both gaps by probing the same suffixes/index files Next
// would try, only for specifiers that plain Node can't already resolve.
import { existsSync } from 'node:fs';
import { pathToFileURL, fileURLToPath } from 'node:url';
import path from 'node:path';

const SRC_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../src');

const CANDIDATE_SUFFIXES = ['', '.ts', '.tsx', '/index.ts', '/index.tsx'];

function probe(basePath) {
  for (const suffix of CANDIDATE_SUFFIXES) {
    const candidate = `${basePath}${suffix}`;
    if (existsSync(candidate)) return candidate;
  }
  return null;
}

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('@/')) {
    const target = probe(path.join(SRC_DIR, specifier.slice(2)));
    if (target) return nextResolve(pathToFileURL(target).href, context);
  } else if (specifier.startsWith('.') && !path.extname(specifier)) {
    const parentDir = path.dirname(fileURLToPath(context.parentURL));
    const target = probe(path.join(parentDir, specifier));
    if (target) return nextResolve(pathToFileURL(target).href, context);
  }
  return nextResolve(specifier, context);
}
