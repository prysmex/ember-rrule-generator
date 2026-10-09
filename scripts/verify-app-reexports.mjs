#!/usr/bin/env node
// Guards against the bug fixed in 0.6.1: an app-tree file under dist/_app_
// re-exporting `default` from a dist module that has no default export.
// Embroider eagerly imports every app-tree file via compat-modules, so a
// stale entry like this breaks consumers' builds with [MISSING_EXPORT].
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const appDir = 'dist/_app_';

function walk(dir) {
  let files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files = files.concat(walk(full));
    } else if (entry.endsWith('.js')) {
      files.push(full);
    }
  }
  return files;
}

function exportedNames(source) {
  const names = new Set();
  for (const match of source.matchAll(/export\s*\{([^}]*)\}/g)) {
    for (const part of match[1].split(',')) {
      const piece = part.trim();
      if (!piece) continue;
      const asMatch = piece.match(/^\S+\s+as\s+(\S+)$/);
      names.add(asMatch ? asMatch[1] : piece);
    }
  }
  if (/export\s+default\s/.test(source)) {
    names.add('default');
  }
  return names;
}

const problems = [];

for (const appFile of walk(appDir)) {
  const source = readFileSync(appFile, 'utf8');
  const reexport = source.match(
    /export\s*\{([^}]*)\}\s*from\s*["']([^"']+)["']/,
  );
  if (!reexport) continue;

  const importedNames = reexport[1].split(',').map((part) => {
    const piece = part.trim();
    const asMatch = piece.match(/^(\S+)\s+as\s+\S+$/);
    return asMatch ? asMatch[1] : piece;
  });
  if (!importedNames.includes('default')) continue;

  const specifier = reexport[2];
  const prefix = `${pkg.name}/`;
  if (!specifier.startsWith(prefix)) continue;
  const targetFile = `dist/${specifier.slice(prefix.length)}.js`;

  let targetSource;
  try {
    targetSource = readFileSync(targetFile, 'utf8');
  } catch {
    problems.push(`${appFile}: re-exports from missing file ${targetFile}`);
    continue;
  }

  if (!exportedNames(targetSource).has('default')) {
    problems.push(
      `${relative('.', appFile)}: re-exports "default" from ` +
        `"${specifier}", but ${targetFile} has no default export`,
    );
  }
}

if (problems.length > 0) {
  console.error('Found broken app-tree re-exports:\n');
  for (const problem of problems) console.error(`  - ${problem}`);
  console.error(
    '\nEither add a default export to the target module, or exclude it ' +
      'from addon.appReexports(...) in rollup.config.mjs.',
  );
  process.exit(1);
}

console.log(`Verified ${walk(appDir).length} app-tree re-exports.`);
