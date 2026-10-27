// Workie service worker — network passthrough (nessuna cache: sempre versione fresca) + Web Push
// Mantiene l'app installabile ma NON serve mai contenuti vecchi.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', () => {
  // nessun respondWith → il browser fa la richiesta di rete normale (contenuto sempre aggiornato)
});

// ===== Notifiche push =====
self.addEventListener('push', event => {
  let d = {};
  try { d = event.data ? event.data.json() : {}; } catch (e) { d = { title: 'Workie', body: (event.data && event.data.text()) || '' }; }
  const title = d.title || 'Workie';
  const options = {
    body: d.body || '',
    icon: d.icon || 'icon-192.png',
    badge: d.badge || 'icon-192.png',
    tag: d.tag || undefined,
    renotify: !!d.tag,
    data: { url: d.url || '/' },
    vibrate: [80, 40, 80]
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || '/';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const c of list) {
        if ('focus' in c) { c.focus(); if ('navigate' in c && url && url !== '/') { try { c.navigate(url); } catch (e) {} } return; }
      }
      if (self.clients.openWindow) return self.clients.openWindow(url);
    })
  );
});
