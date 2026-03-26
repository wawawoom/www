import { useSyncExternalStore } from "react";

/** Overlay hover is only for viewports strictly wider than 768px (matches project breakpoints). */
const MIN_WIDTH_MEDIA = "(min-width: 769px)";

/**
 * True when the viewport is wide enough and the primary input supports hover with a fine pointer
 * (mouse / trackpad). Typical phones and tablets report `hover: none` and/or `pointer: coarse`,
 * so the preview overlay is skipped on touch-first devices.
 */
function matchesLampHoverOverlay(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia(MIN_WIDTH_MEDIA).matches &&
    window.matchMedia("(hover: hover)").matches &&
    window.matchMedia("(pointer: fine)").matches
  );
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  const mqs = [
    window.matchMedia(MIN_WIDTH_MEDIA),
    window.matchMedia("(hover: hover)"),
    window.matchMedia("(pointer: fine)"),
  ];
  mqs.forEach((mq) => mq.addEventListener("change", onStoreChange));
  return () =>
    mqs.forEach((mq) => mq.removeEventListener("change", onStoreChange));
}

export function useLampHoverOverlayEnabled(): boolean {
  return useSyncExternalStore(
    subscribe,
    matchesLampHoverOverlay,
    () => false
  );
}
