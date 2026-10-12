// Bakes the rendered markup into dist/index.html.
// Runs after `vite build` (client) and `vite build --ssr` (server bundle).
import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const root = process.cwd();
const templatePath = path.join(root, 'dist', 'index.html');
const bundlePath = path.join(root, '.prerender', 'entry-server.js');

const MARKER = '<div id="root"></div>';

const { render } = await import(pathToFileURL(bundlePath).href);
const markup = render();

if (typeof markup !== 'string' || markup.length < 2000) {
  throw new Error(`prerender: rendered markup looks wrong (${markup?.length ?? 0} chars)`);
}

const template = await readFile(templatePath, 'utf8');
if (!template.includes(MARKER)) {
  throw new Error(`prerender: ${MARKER} not found in dist/index.html`);
}

await writeFile(templatePath, template.replace(MARKER, `<div id="root">${markup}</div>`));
console.log(`prerender: injected ${markup.length} chars of static markup into dist/index.html`);
