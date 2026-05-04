// src/cache/memoryCache.js

const store = new Map();

export function setCache(key, data, ttlMs) {
  store.set(key, {
    data,
    expires: Date.now() + ttlMs
  });
}

export function getCache(key) {
  const entry = store.get(key);
  if (!entry) return null;

  if (Date.now() > entry.expires) {
    store.delete(key);
    return null;
  }

  return entry.data;
}
