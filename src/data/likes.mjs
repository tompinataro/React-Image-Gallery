const KEY = 'toms-flower-gallery-likes-v1';
export function readLikes(storage) {
  try {
    const value = JSON.parse(storage.getItem(KEY) || '{}');
    if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
    return Object.fromEntries(Object.entries(value).filter(([, count]) => Number.isSafeInteger(count) && count >= 0));
  } catch { return {}; }
}
export function saveLikes(storage, likes) {
  try { storage.setItem(KEY, JSON.stringify(likes)); return true; }
  catch { return false; }
}
