import { downloadAndCacheAssets } from "./assets.js";
import { startMinecraft } from "./minecraft.js";
import { createLocalGameFilePicker, getLocalGameFile } from "./local-game-files.js";

const importButton = document.querySelector("#import");
const play = document.querySelector("#play");
const status = document.querySelector("#status");
const fileStatus = document.querySelector("#file-status");
const bar = document.querySelector("#bar");
const canvas = document.querySelector("#game");

let clientJar = null;

function setProgress(value, message) {
  bar.style.width = `${Math.max(0, Math.min(100, value))}%`;
  status.textContent = message;
}

async function refreshLocalFile() {
  clientJar = await getLocalGameFile();
  if (clientJar) {
    fileStatus.textContent = `${clientJar.name} imported (${formatBytes(clientJar.size)}).`;
    play.disabled = false;
    status.textContent = "Ready to launch.";
  }
}

importButton.addEventListener("click", async () => {
  importButton.disabled = true;
  try {
    await createLocalGameFilePicker({
      onStatus: message => { fileStatus.textContent = message; }
    });
    await refreshLocalFile();
  } catch (err) {
    fileStatus.textContent = err.message;
  } finally {
    importButton.disabled = false;
  }
});

play.addEventListener("click", async () => {
  if (!clientJar) return;
  play.disabled = true;
  try {
    const metadata = await downloadAndCacheAssets(setProgress);
    setProgress(90, "Preparing Java 25 browser runtime...");
    canvas.style.display = "block";
    canvas.focus();
    await startMinecraft({ canvas, setProgress, metadata, clientJar });
  } catch (err) {
    console.error(err);
    status.textContent = `Error: ${err.message}`;
    play.disabled = false;
  }
});

function formatBytes(bytes) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KiB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MiB`;
}

refreshLocalFile().catch(console.error);
