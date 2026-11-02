import { readdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
const root = 'build';
async function filesIn(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(entries.map(entry => entry.isDirectory() ? filesIn(path.join(dir, entry.name)) : path.join(dir, entry.name)));
  return nested.flat();
}
const files = (await filesIn(root)).filter(file => !file.endsWith('/sw.js')).sort();
const digest = createHash('sha256');
digest.update(await readFile(new URL(import.meta.url)));
for (const file of files) digest.update(await readFile(file));
const version = digest.digest('hex').slice(0, 16);
const urls = files.map(file => './' + path.relative(root, file).split(path.sep).join('/'));
await writeFile(path.join(root, 'sw.js'), `
const CACHE = 'toms-gallery-${version}';
const PREFIX = 'toms-gallery-';
const FILES = ${JSON.stringify(urls)};
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith(PREFIX) && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || !url.href.startsWith(self.registration.scope)) return;
  event.respondWith(caches.open(CACHE).then(async cache => {
    if (event.request.mode === 'navigate') return (await cache.match(new URL('./index.html', self.registration.scope).href)) || fetch(event.request);
    return (await cache.match(event.request, { ignoreVary: true })) || fetch(event.request);
  }));
});
`);
console.log('Offline cache prepared:', files.length, 'files, version', version);
