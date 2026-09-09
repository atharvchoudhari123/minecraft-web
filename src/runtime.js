const RUNTIME_VERSION = "minecraft-web-jvm-0.1";

export async function createBrowserRuntime({ canvas, metadata, setProgress, runtimeJS, runtimeWasm }) {
  setProgress(93, "Loading JVM runtime...");

  if (!window.MinecraftJVM && !window.createMinecraftJVM) {
    await loadScript(runtimeJS);
  }

  const factory = window.MinecraftJVM?.create || window.createMinecraftJVM;
  if (typeof factory !== "function") {
    throw new Error(`JVM runtime ${RUNTIME_VERSION} was not found. Expected MinecraftJVM.create() or createMinecraftJVM().`);
  }

  const runtime = await factory({
    canvas,
    wasmURL: runtimeWasm,
    version: metadata?.id,
    versionMeta: metadata,
    environment: {
      filesystem: "indexeddb",
      graphics: "webgl2",
      audio: "web-audio",
      input: "pointer-lock"
    }
  });

  if (!runtime || typeof runtime.start !== "function") {
    throw new Error("The JVM runtime loaded, but it does not implement start().");
  }

  return runtime;
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-minecraft-runtime="${CSS.escape(src)}"]`);
    if (existing) {
      if (window.MinecraftJVM || window.createMinecraftJVM) return resolve();
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", () => reject(new Error(`Failed to load JVM runtime: ${src}`)), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.minecraftRuntime = src;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Failed to load JVM runtime: ${src}`));
    document.head.appendChild(script);
  });
}
