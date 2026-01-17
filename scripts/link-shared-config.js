#!/usr/bin/env node
const { cpSync, mkdirSync, rmSync, existsSync } = require('node:fs');
const path = require('node:path');

const repoRoot = path.resolve(__dirname, '..');
const sourceDir = path.join(repoRoot, 'packages', 'shared-config', 'dist');
const targets = ['backend', 'frontend', 'admin'];

if (!existsSync(sourceDir)) {
  throw new Error('Shared config has not been built yet.');
}

for (const target of targets) {
  const targetDir = path.join(
    repoRoot,
    target,
    'node_modules',
    '@guru',
    'shared-config',
  );
  mkdirSync(path.dirname(targetDir), { recursive: true });
  rmSync(targetDir, { recursive: true, force: true });
  mkdirSync(targetDir, { recursive: true });
  cpSync(sourceDir, targetDir, { recursive: true });
}

console.log('Linked @guru/shared-config into backend, frontend, and admin.');
