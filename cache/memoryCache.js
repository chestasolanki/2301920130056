
class MemoryCache {
  constructor() {
    this.store = new Map();
  }

  set(key, value, ttlMs = 30000) {
    const expiresAt = Date.now() + ttlMs;
    this.store.set(key, { value, expiresAt });
  }

  get(key) {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return undefined;
    }
    return entry.value;
  }

  clear() {
    this.store.clear();
  }
}

module.exports = new MemoryCache();
