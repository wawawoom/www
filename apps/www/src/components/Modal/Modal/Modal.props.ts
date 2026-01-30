import type { WuiColorValue } from "@wawawoom/wui";

import type { Section } from "../../../ts/enum/section.enum.ts";

export interface ModalProps {
  section: Section;
  isAnimating: boolean;
  closeButtonColor?: WuiColorValue;
  onCloseModal: () => void;
}
