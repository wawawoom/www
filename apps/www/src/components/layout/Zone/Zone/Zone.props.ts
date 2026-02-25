import { WuiColorAlias } from "@wawawoom/wui";

import type { Section } from "../../../../ts/enum/section.enum";

export interface ZoneProps {
  section: Section;
  title: string;
  titleBack: string;
  titleColor: WuiColorAlias;
  onOpenModal: (section: Section) => void;
  expandedZone: Section | null;
  onZoneClick: (section: Section) => void;
}
