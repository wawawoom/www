import { DEFAULT_DESCRIPTION, SITE_NAME } from "../constants/social";
import type Lamp from "../interface/lamp.interface";
import { toAbsoluteUrl } from "./siteUrl";

/**
 * Lamp title / description / URLs for meta tags and share links.
 * Keep aligned with scripts/generate-project-html.mjs (static HTML for crawlers).
 */

const DESCRIPTION_MAX = 300;

function stripHtml(text: string): string {
  return text
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Lamp name without emoji, for search-friendly titles. */
export function getLampPlainName(lamp: Lamp): string {
  return lamp.name
    .replace(/[\p{Extended_Pictographic}️‍]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function getLampTitle(lamp: Lamp): string {
  return `${getLampPlainName(lamp)} — Lampe artisanale en bois | ${SITE_NAME}`;
}

export function getLampDescription(lamp: Lamp): string {
  const text = stripHtml(
    [lamp.description, lamp.details].filter(Boolean).join(" ")
  );
  if (!text) {
    return DEFAULT_DESCRIPTION;
  }
  if (text.length <= DESCRIPTION_MAX) {
    return text;
  }
  return `${text.slice(0, DESCRIPTION_MAX - 1).trim()}…`;
}

/** Canonical lamp page URL (trailing slash: the server redirects without it). */
export function getLampPageUrl(lamp: Lamp): string {
  return toAbsoluteUrl(`/project/${lamp.slug}/`);
}

export function isLampInStock(lamp: Lamp): boolean {
  return lamp.availability !== "sold";
}
