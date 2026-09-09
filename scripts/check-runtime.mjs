import { readFile } from "node:fs/promises";
import { access } from "node:fs/promises";

const manifest = JSON.parse(await readFile("wasm/runtime.json", "utf8"));
const required = ["name", "version", "javaMajor", "entry", "wasm", "api"];
for (const key of required) {
  if (!(key in manifest)) throw new Error(`Runtime manifest is missing ${key}`);
}
if (manifest.javaMajor !== 25) {
  throw new Error(`Minecraft 26.2 requires Java 25; runtime declares Java ${manifest.javaMajor}.`);
}

for (const file of [`wasm/${manifest.entry}`, `wasm/${manifest.wasm}`]) {
  try {
    await access(file);
  } catch {
    throw new Error(`Missing runtime build artifact: ${file}`);
  }
}

console.log(`Runtime OK: ${manifest.name} ${manifest.version} (Java ${manifest.javaMajor})`);
