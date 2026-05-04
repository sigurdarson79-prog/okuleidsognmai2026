const cache = new Map();

export function getCache(key) {
  const item = cache.get(key);
  if (!item) return null;

  if (Date.now() > item.expire) {
    cache.delete(key);
    return null;
  }

  return item.value;
}

export function setCache(key, value, ttlMs = 60_000) {
  cache.set(key, {
    value,
    expire: Date.now() + ttlMs
  });
}
