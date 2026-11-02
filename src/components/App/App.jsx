import { useState, useEffect } from 'react';
import GalleryList from '../Gallery/GalleryList.jsx';
import gallery from '../../data/gallery.json';
import { readLikes, saveLikes } from '../../data/likes.mjs';
import './App.css';

function App() {
  const [likes, setLikes] = useState(() => {
    try { return readLikes(window.localStorage); } catch { return {}; }
  });
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [offlineReady, setOfflineReady] = useState(false);

  useEffect(() => {
    if (!('serviceWorker' in navigator) || !import.meta.env.PROD) return;
    let active = true;
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`)
      .then(() => navigator.serviceWorker.ready)
      .then(() => { if (active) setOfflineReady(true); })
      .catch(() => { /* The online gallery remains usable if caching is unavailable. */ });
    return () => { active = false; };
  }, []);

  function addLike(id) {
    let saved = {};
    try { saved = readLikes(window.localStorage); } catch { /* Keep in-memory likes. */ }
    const next = { ...likes, ...saved, [id]: Math.max(likes[id] || 0, saved[id] || 0) + 1 };
    setLikes(next);
    try { setStorageAvailable(saveLikes(window.localStorage, next)); }
    catch { setStorageAvailable(false); }
  }

  return (
    <div data-testid="app">
      <header>
        <h1 id="pageTitle">Tom Pinataro's React Gallery</h1>
        <h3 id="subTitle">Flowers, etc.</h3>
      </header>
      <main>
        <details className="install-help">
          <summary>Save this flower garden to your iPhone</summary>
          <p>Open this page in Safari. Tap Share, then Add to Home Screen. Leave Open as Web App on if shown, then tap Add.</p>
          <p>Your red zinnia icon opens the gallery. Likes are saved on this device.</p>
        </details>
        <p className="status" role="status">{offlineReady ? 'Ready for offline viewing — all 20 photos are saved.' : '20 photos from the garden. Tap Description to turn a card over.'}</p>
        {!storageAvailable && <p className="status" role="status">Your browser cannot save likes right now. They will last until you close this page.</p>}
        <GalleryList images={gallery} likes={likes} addLike={addLike} />
      </main>
      <footer><p>You can reach me at: <a href="mailto:Tom@Pinataro.com">Tom@Pinataro.com</a></p></footer>
    </div>
  );
}
export default App;
