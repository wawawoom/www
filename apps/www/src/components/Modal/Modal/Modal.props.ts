import type { Section } from "../../../ts/enum/section.enum.ts";

export interface ModalProps {
  section: Section;
  isAnimating: boolean;
  onCloseModal: () => void;
}
