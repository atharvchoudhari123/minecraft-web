import fs from "node:fs/promises";

await fs.mkdir("build", { recursive: true });
await fs.cp("index.html", "build/index.html");
await fs.cp("css", "build/css", { recursive: true });
await fs.cp("src", "build/src", { recursive: true });
await fs.cp("config", "build/config", { recursive: true });

console.log("Browser project copied to build/.");
console.log("A real WASM JVM must be supplied separately.");
