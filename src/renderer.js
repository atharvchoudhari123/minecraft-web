export function getWebGLContext(canvas) {
  return canvas.getContext("webgl2") || canvas.getContext("webgl");
}
