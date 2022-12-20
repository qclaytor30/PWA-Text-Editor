const { StaleWhileRevalidate, CacheFirst } = require('workbox-strategies');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { warmStrategyCache } = require('workbox-recipes');
const { registerRoute } = require('workbox-routing');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');
precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});
registerRoute(
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);