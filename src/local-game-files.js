const DB_NAME = "minecraft-web-26-2";
const STORE = "game-files";

export function createLocalGameFilePicker({ onStatus = () => {} } = {}) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".jar,application/java-archive,application/octet-stream";
  input.multiple = false;
  input.hidden = true;

  document.body.appendChild(input);

  const promise = new Promise((resolve, reject) => {
    input.addEventListener("change", async () => {
      const file = input.files?.[0];
      input.remove();

      if (!file) {
        reject(new Error("No Minecraft client JAR was selected."));
        return;
      }

      if (!file.name.toLowerCase().endsWith(".jar")) {
        reject(new Error("Please select a Minecraft client .jar file."));
        return;
      }

      onStatus(`Importing ${file.name}...`);
      await saveFile(file);
      resolve({ name: file.name, size: file.size });
    }, { once: true });
  });

  input.click();
  return promise;
}

export async function getLocalGameFile() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const request = db.transaction(STORE, "readonly").objectStore(STORE).get("client.jar");
    request.onsuccess = () => resolve(request.result?.file ?? null);
    request.onerror = () => reject(request.error);
  });
}

async function saveFile(file) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const request = db.transaction(STORE, "readwrite").objectStore(STORE).put({
      key: "client.jar",
      file,
      name: file.name,
      size: file.size,
      savedAt: Date.now()
    });
    request.onsuccess = resolve;
    request.onerror = () => reject(request.error);
  });
}

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 2);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("cache")) {
        db.createObjectStore("cache", { keyPath: "key" });
      }
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "key" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
