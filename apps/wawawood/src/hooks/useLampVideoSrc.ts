import { useMemo, useSyncExternalStore } from "react";

import type Lamp from "../interface/lamp.interface";

/** Below 768px → `mobile`, from 768px → `desktop`. */
export const MOBILE_VIDEO_MEDIA_QUERY = "(max-width: 767px)";

function subscribeMobileViewport(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  const mql = window.matchMedia(MOBILE_VIDEO_MEDIA_QUERY);

  mql.addEventListener("change", onStoreChange);

  return () => mql.removeEventListener("change", onStoreChange);
}

function getMobileViewportSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(MOBILE_VIDEO_MEDIA_QUERY).matches;
}

function getMobileViewportServerSnapshot(): boolean {
  return false;
}

export function getLampVideoSrcForViewport(
  video: Lamp["video"] | undefined
): string | undefined {
  if (!video) return undefined;
  if (typeof video === "string") return video;
  if (typeof window === "undefined") return video.desktop;
  return window.matchMedia(MOBILE_VIDEO_MEDIA_QUERY).matches
    ? video.mobile
    : video.desktop;
}

/**
 * Resolved lamp video URL for the current viewport; updates when crossing 768px
 * or when `video` changes.
 */
export function useLampVideoSrc(
  video: Lamp["video"] | undefined
): string | undefined {
  const isMobile = useSyncExternalStore(
    subscribeMobileViewport,
    getMobileViewportSnapshot,
    getMobileViewportServerSnapshot
  );

  return useMemo(() => {
    if (!video) return undefined;
    if (typeof video === "string") return video;
    return isMobile ? video.mobile : video.desktop;
  }, [video, isMobile]);
}
