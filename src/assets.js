const MANIFEST =
  "https://piston-meta.mojang.com/mc/game/version_manifest_v2.json";

export async function downloadAndCacheAssets(progress = () => {}) {
  progress(5, "Loading Mojang version manifest...");
  const manifest = await fetch(MANIFEST).then(r => {
    if (!r.ok) throw new Error(`Manifest request failed (${r.status})`);
    return r.json();
  });

  const version = manifest.versions.find(v => v.id === "26.2");
  if (!version) {
    throw new Error("Minecraft 26.2 was not found in Mojang's version manifest.");
  }

  progress(15, "Loading version metadata...");
  const meta = await fetch(version.url).then(r => {
    if (!r.ok) throw new Error(`Version metadata request failed (${r.status})`);
    return r.json();
  });

  const db = await openDB();
  await put(db, "metadata", { key: "version", value: meta });

  // We cache the metadata rather than copying Mojang's copyrighted asset
  // payloads into this GitHub repository. A runtime can use the hashes/URLs
  // from this metadata to obtain files as appropriate.
  progress(100, `Metadata ready for Minecraft ${meta.id}.`);
  return meta;
}

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("minecraft-web-26.2", 1);
    req.onupgradeneeded = () => req.result.createObjectStore("cache", { keyPath: "key" });
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function put(db, store, value) {
  return new Promise((resolve, reject) => {
    const req = db.transaction(store, "readwrite").objectStore(store).put(value);
    req.onsuccess = resolve;
    req.onerror = () => reject(req.error);
  });
}
