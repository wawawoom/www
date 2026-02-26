import { Section } from "../ts/enum/section.enum";
import { pathWithoutLocale } from "../constants/locale.ts";

export const pathToSection = (pathname: string): Section | null => {
  const path = pathWithoutLocale(pathname);
  const slug = path === "/" ? "" : path.replace(/^\//, "");

  if (!slug || !Object.values(Section).includes(slug as Section)) {
    return null;
  }

  return slug as Section;
};
