// Service Worker para persistencia robusta de datos
const CACHE_NAME = 'cumplea-os-v1';
const DB_NAME = 'cumplea-os-persistent';
const DB_STORE = 'appData';

// Archivos esenciales que siempre se cachean
const ESSENTIAL_FILES = [
    '/',
    '/index.html',
    '/CSS/styles.css',
    '/JavaScript/script.js'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
    console.log('[SW] Instalando Service Worker...');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Cache abierto');
            return cache.addAll(ESSENTIAL_FILES).catch((err) => {
                console.warn('[SW] No se pudieron cachear todos los archivos esenciales:', err);
            });
        })
    );
    self.skipWaiting();
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
    console.log('[SW] Activando Service Worker...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[SW] Eliminando cache antiguo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Estrategia de fetch: Network First, fallback a Cache
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Ignorar solicitudes externas (CDNs, etc)
    if (url.origin !== self.location.origin) {
        return;
    }

    // Para archivos estáticos: Cache First
    if (
        request.url.includes('.css') ||
        request.url.includes('.js') ||
        request.url.includes('.png') ||
        request.url.includes('.jpg') ||
        request.url.includes('.gif') ||
        request.url.includes('.svg') ||
        request.url.includes('.mp3') ||
        request.url.includes('.webp')
    ) {
        event.respondWith(
            caches.match(request).then((cached) => {
                if (cached) {
                    return cached;
                }
                return fetch(request).then((response) => {
                    if (response && response.status === 200) {
                        const cloned = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(request, cloned);
                        });
                    }
                    return response;
                }).catch(() => {
                    console.warn('[SW] No se pudo cargar:', request.url);
                });
            })
        );
        return;
    }

    // Para HTML: Network First, fallback a Cache
    if (request.method === 'GET' && (request.url.endsWith('.html') || request.url.endsWith('/'))) {
        event.respondWith(
            fetch(request).then((response) => {
                if (response && response.status === 200) {
                    const cloned = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, cloned);
                    });
                }
                return response;
            }).catch(() => {
                return caches.match(request).then((cached) => {
                    return cached || caches.match('/index.html');
                });
            })
        );
        return;
    }
});

// Mensajes del cliente para sincronizar datos
self.addEventListener('message', (event) => {
    const { type, data } = event.data;

    if (type === 'CACHE_DATA') {
        cacheData(data).then(() => {
            event.ports[0].postMessage({ success: true });
        }).catch((err) => {
            console.error('[SW] Error al cachear datos:', err);
            event.ports[0].postMessage({ success: false, error: err.message });
        });
    } else if (type === 'GET_CACHED_DATA') {
        getCachedData().then((data) => {
            event.ports[0].postMessage({ success: true, data });
        }).catch((err) => {
            console.error('[SW] Error al obtener datos cacheados:', err);
            event.ports[0].postMessage({ success: false, error: err.message });
        });
    }
});

// Abre IndexedDB del Service Worker
function openDb() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);
        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains(DB_STORE)) {
                db.createObjectStore(DB_STORE);
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Cachea datos en IndexedDB del Service Worker
function cacheData(data) {
    return openDb().then((db) => {
        return new Promise((resolve, reject) => {
            const tx = db.transaction(DB_STORE, 'readwrite');
            const store = tx.objectStore(DB_STORE);
            store.put(data, 'months');
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    });
}

// Obtiene datos cacheados del Service Worker
function getCachedData() {
    return openDb().then((db) => {
        return new Promise((resolve, reject) => {
            const tx = db.transaction(DB_STORE, 'readonly');
            const store = tx.objectStore(DB_STORE);
            const req = store.get('months');
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(tx.error);
        });
    });
}
