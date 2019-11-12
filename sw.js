const staticAssets = [
    './',
    './styles.css',
    './app.js',
    './src/index.js',
    './fallback.json',
    './images/lost_droid.png'
];

self.addEventListener('install', async evt => {
    let cache = await caches.open('newsStaticItems')
    cache.addAll(staticAssets);
});

self.addEventListener('fetch', evt => {
    console.log("fetch");
    const request = evt.request;
    const url = new URL(request.url);
    if (url.origin === location.origin) {
        evt.respondWith(loadCache(request));
    } else {
        evt.respondWith(loadNew(request));
    }
})

async function loadCache(request) {
    const cacheResponse = await caches.match(request);
    return cacheResponse || fetch(request);
}

async function loadNew(request) {
    const cache = await caches.open('newsDynamicItems');
    try {
        const response = await fetch(request)
        cache.put(request, response.clone());
        return response;
    } catch (e) {
        const cachedResponse =  await cache.match(request);
        debugger
        return cachedResponse || await caches.match('./fallback.json');
    }
}