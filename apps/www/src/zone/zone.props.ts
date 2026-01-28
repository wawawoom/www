import type { Section } from "../ts/enum/section.enum";

export interface ZoneProps {
  onOpenModal: (section: Section) => void;
}
