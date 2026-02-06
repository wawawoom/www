import type { Section } from "../../../../ts/enum/section.enum";

export interface ZoneExpandedProps {
  section: Section;
  onOpenModal: (section: Section) => void;
}
