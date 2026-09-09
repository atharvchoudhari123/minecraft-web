import fs from "node:fs/promises";

await fs.mkdir("wasm", { recursive: true });

try {
  await fs.access("wasm/jvm.js");
  await fs.access("wasm/jvm.wasm");
  console.log("WASM runtime found.");
} catch {
  console.log("No WASM JVM found.");
  console.log("Place the compatible runtime at wasm/jvm.js and wasm/jvm.wasm.");
}
