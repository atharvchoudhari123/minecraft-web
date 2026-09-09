import fs from "node:fs/promises";

const manifestURL = "https://piston-meta.mojang.com/mc/game/version_manifest_v2.json";
const manifest = await fetch(manifestURL).then(r => r.json());
const version = manifest.versions.find(v => v.id === "26.2");

if (!version) throw new Error("Minecraft 26.2 is not present in the manifest.");

const meta = await fetch(version.url).then(r => r.json());
await fs.mkdir("build", { recursive: true });
await fs.writeFile("build/minecraft-26.2.metadata.json", JSON.stringify(meta, null, 2));

console.log("Wrote build/minecraft-26.2.metadata.json");
console.log("Game files are not copied into the repository.");
