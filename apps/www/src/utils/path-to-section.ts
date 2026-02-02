import { Section } from "../ts/enum/section.enum";

export const pathToSection = (path: string): Section | null => {
  const slug = path === "/" ? "" : path.replace(/^\//, "");

  if (!slug || !Object.values(Section).includes(slug as Section)) {
    return null;
  }

  return slug as Section;
};
