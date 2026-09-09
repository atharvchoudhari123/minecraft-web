export function attachInput(canvas, handlers = {}) {
  canvas.addEventListener("keydown", e => handlers.keydown?.(e));
  canvas.addEventListener("keyup", e => handlers.keyup?.(e));
  canvas.addEventListener("mousedown", e => handlers.mousedown?.(e));
  window.addEventListener("mouseup", e => handlers.mouseup?.(e));
  window.addEventListener("mousemove", e => handlers.mousemove?.(e));
}
