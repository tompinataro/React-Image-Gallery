
const CACHE = 'toms-gallery-a82abeac44b56c00';
const PREFIX = 'toms-gallery-';
const FILES = ["./assets/index-B2m-fyU_.js","./assets/index-BcizMBYW.css","./favicon.ico","./icons/apple-touch-icon.png","./icons/favicon-32.png","./icons/icon-192.png","./icons/icon-512.png","./images/IMG_3795.jpg","./images/IMG_4118.jpg","./images/IMG_4119.jpg","./images/IMG_4200.jpg","./images/IMG_4208.jpg","./images/IMG_4222.jpg","./images/IMG_4230.jpg","./images/IMG_4236.jpg","./images/IMG_4238.jpg","./images/IMG_4305.jpg","./images/IMG_4333.jpg","./images/IMG_4362.jpg","./images/IMG_4390.jpg","./images/IMG_4398.jpg","./images/IMG_4401.jpg","./images/IMG_4532.jpg","./images/IMG_4533.jpg","./images/IMG_4534.jpg","./images/IMG_4536.jpg","./images/IMG_4543.jpg","./index.html","./manifest.webmanifest"];
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
