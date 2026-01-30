import { WuiTitle, WuiTitleAs, WuiTitleLook } from "@wawawoom/wui";

import { ZoneExpanded } from "../ZoneExpanded/ZoneExpanded";
import "./Zone.css";
import type { ZoneProps } from "./Zone.props";

export const Zone = (props: ZoneProps) => {
  const { section, title, onOpenModal, titleColor } = props;

  return (
    <div className={`zone ${section}`}>
      <WuiTitle as={WuiTitleAs.H2} look={WuiTitleLook.H6} color={titleColor}>
        {title}
      </WuiTitle>

      <ZoneExpanded section={section} onOpenModal={onOpenModal} />
    </div>
  );
};
