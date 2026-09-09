import { jsDelivr } from "../config/cdn.js";

export async function startMinecraft({ canvas, setProgress }) {
  /*
   * This is the integration point for the actual browser JVM/runtime.
   *
   * Expected runtime files:
   *   wasm/jvm.js
   *   wasm/jvm.wasm
   *
   * The runtime must provide a browser-compatible JVM and the adapters needed
   * by Minecraft Java. A normal Minecraft JAR cannot execute directly in a
   * browser.
   */
  setProgress(100, "Runtime placeholder loaded. A compatible WASM JVM is required.");

  // Fail clearly rather than pretending that a Java JAR is executable as WASM.
  throw new Error(
    "No compatible WASM JVM/runtime is installed. Build or provide the runtime in wasm/."
  );
}
