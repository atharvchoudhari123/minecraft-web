import { jsDelivr } from "../config/cdn.js";
import { createBrowserRuntime } from "./runtime.js";

export async function startMinecraft({ canvas, setProgress, metadata }) {
  setProgress(92, "Preparing Java 25 browser runtime...");

  const runtime = await createBrowserRuntime({
    canvas,
    metadata,
    setProgress,
    runtimeJS: jsDelivr("wasm/jvm.js"),
    runtimeWasm: jsDelivr("wasm/jvm.wasm")
  });

  await runtime.start();
  setProgress(100, "Minecraft runtime started.");
}
