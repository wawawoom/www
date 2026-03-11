export const SUPPORTED_LOCALES = ["en", "fr"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "fr";

export const getLocaleFromPathname = (pathname: string): Locale | null => {
  if (
    pathname.startsWith("/en") &&
    (pathname.length === 3 || pathname[3] === "/")
  ) {
    return "en";
  }
  if (
    pathname.startsWith("/fr") &&
    (pathname.length === 3 || pathname[3] === "/")
  ) {
    return "fr";
  }
  return null;
};

export const pathWithoutLocale = (pathname: string): string => {
  if (pathname.startsWith("/en")) {
    const rest = pathname.slice(3);
    return rest === "" ? "/" : rest;
  }

  if (pathname.startsWith("/fr")) {
    const rest = pathname.slice(3);
    return rest === "" ? "/" : rest;
  }

  return pathname;
};
