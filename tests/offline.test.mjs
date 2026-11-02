import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import vm from 'node:vm';

test('production worker precaches every photo and serves the app with the origin stopped', async () => {
  const server = createServer(async (req, res) => {
    try {
      const file = 'build/' + decodeURIComponent(req.url.replace('/React-Image-Gallery/', ''));
      res.setHeader('Vary', 'Origin');
      res.end(await readFile(file));
    } catch { res.writeHead(404); res.end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const scope = `http://127.0.0.1:${server.address().port}/React-Image-Gallery/`;
  const handlers = {};
  const entries = new Map();
  const cache = {
    async addAll(urls) {
      for (const url of urls) {
        const response = await fetch(new URL(url, scope));
        assert.equal(response.status, 200, url);
        entries.set(new URL(url, scope).href, new Response(await response.arrayBuffer(), { status: response.status, headers: response.headers }));
      }
    },
    async match(request, options) {
      const url = typeof request === 'string' ? request : request.url;
      const response = entries.get(url);
      // Modules send Origin; precache GETs did not. Respect Vary unless bypassed.
      if (response?.headers.get('Vary') === 'Origin' && request.headers?.get('Origin') && !options?.ignoreVary) return undefined;
      return response?.clone();
    }
  };
  const caches = { open: async () => cache, keys: async () => ['unrelated-app', 'toms-gallery-old'], delete: async key => { assert.equal(key, 'toms-gallery-old'); } };
  vm.runInNewContext(await readFile('build/sw.js', 'utf8'), {
    self: { location: { origin: new URL(scope).origin }, registration: { scope }, clients: { claim: async () => {} }, addEventListener: (name, handler) => { handlers[name] = handler; } },
    caches, URL, fetch
  });
  try {
    let work;
    handlers.install({ waitUntil: promise => { work = promise; } });
    await work;
    assert.equal([...entries.keys()].filter(url => /\/images\/.+\.jpg$/.test(url)).length, 20);
    handlers.activate({ waitUntil: promise => { work = promise; } });
    await work;
  } finally {
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
  async function fromWorker(url, mode = 'cors') {
    let response;
    handlers.fetch({ request: { url: new URL(url, scope).href, method: 'GET', mode, headers: new Headers({ Origin: new URL(scope).origin }) }, respondWith: value => { response = value; } });
    return response;
  }
  const page = await fromWorker('./', 'navigate');
  const html = await page.text();
  const script = html.match(/src="([^"]+\.js)"/)[1];
  assert.ok((await (await fromWorker(script)).text()).length > 1000);
  assert.ok((await (await fromWorker('images/IMG_4118.jpg')).arrayBuffer()).byteLength > 1000);
  const manifest = await (await fromWorker('manifest.webmanifest')).json();
  assert.equal(manifest.display, 'standalone');
  assert.equal((await fromWorker(manifest.icons[0].src)).status, 200);
  assert.equal(await fromWorker('https://example.com/other'), undefined);
  assert.equal(await fromWorker('../another-app/'), undefined);
  assert.ok((await stat('build/icons/apple-touch-icon.png')).size > 0);
});
