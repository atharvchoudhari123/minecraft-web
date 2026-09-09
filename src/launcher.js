import { downloadAndCacheAssets } from "./assets.js";
import { startMinecraft } from "./minecraft.js";

const play = document.querySelector("#play");
const status = document.querySelector("#status");
const bar = document.querySelector("#bar");
const canvas = document.querySelector("#game");

function setProgress(value, message) {
  bar.style.width = `${Math.max(0, Math.min(100, value))}%`;
  status.textContent = message;
}

play.addEventListener("click", async () => {
  play.disabled = true;
  try {
    await downloadAndCacheAssets(setProgress);
    setProgress(100, "Starting browser runtime...");
    canvas.style.display = "block";
    await startMinecraft({ canvas, setProgress });
  } catch (err) {
    console.error(err);
    status.textContent = `Error: ${err.message}`;
    play.disabled = false;
  }
});
