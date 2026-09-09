# Minecraft 26.2 Web Launcher

This repository is a browser launcher project for a Minecraft 26.2-compatible
WebAssembly/JVM runtime.

## Important

A Java `.jar` cannot simply be renamed or compiled into a `.wasm` file.
Minecraft Java requires a JVM plus compatibility implementations for graphics,
audio, filesystem, input, threading, and networking.

This project therefore separates:

- the launcher
- asset downloading/caching
- browser filesystem
- input/audio/renderer adapters
- the WASM JVM/runtime

The `wasm/` directory intentionally does **not** contain Mojang's game files
or a nonexistent automatically-converted JVM. A real, compatible WASM runtime
must be supplied/built there.

## GitHub + jsDelivr

After pushing this repository to GitHub, the browser can load the project's
JavaScript/WASM files from jsDelivr. Replace `YOUR_USER` and `YOUR_REPO` in
`config/cdn.js` if you want a CDN-only distribution.

## Development

```bash
npm run download:assets
npm run prepare:runtime
npm run build
```

The asset downloader obtains version metadata from Mojang's public version
manifest and records the files that a compatible runtime would need. It does
not redistribute Mojang's copyrighted game files into this repository.

## Runtime

Put your legally obtained/compatible browser runtime in:

```text
wasm/jvm.js
wasm/jvm.wasm
```

Then implement its startup contract in `src/minecraft.js`.
