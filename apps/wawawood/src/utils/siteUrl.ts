import { SITE_ORIGIN } from "../constants/social";

/**
 * Canonical origin for absolute URLs (OG, Twitter cards).
 */
export function getSiteOrigin(): string {
  return SITE_ORIGIN;
}

/**
 * Resolves an image or asset path to an absolute URL for og:image.
 */
export function toAbsoluteUrl(pathOrUrl: string): string {
  if (
    pathOrUrl.startsWith("http://") ||
    pathOrUrl.startsWith("https://") ||
    pathOrUrl.startsWith("//")
  ) {
    return pathOrUrl.startsWith("//") ? `https:${pathOrUrl}` : pathOrUrl;
  }
  const origin = getSiteOrigin();
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${origin}${base}${path}`;
}

/** Canonical page URL without hash or query (for og:url). */
export function getCanonicalPageUrl(): string {
  if (typeof window === "undefined") {
    return "";
  }
  const { origin, pathname } = window.location;
  return `${origin}${pathname}`.replace(/\/$/, "") || origin;
}
