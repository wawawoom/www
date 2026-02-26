import { WuiTitle, WuiTitleAs, WuiTitleLook } from "@wawawoom/wui";

import { ZoneExpanded } from "../ZoneExpanded/ZoneExpanded";
import "./Zone.css";
import type { ZoneProps } from "./Zone.props";

export const Zone = (props: ZoneProps) => {
  const {
    section,
    title,
    titleBack,
    onOpenModal,
    titleColor,
    expandedZone,
    onZoneClick,
  } = props;
  const isExpanded = expandedZone === section;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onZoneClick(section);
  };

  return (
    <div
      className={`zone ${section}${isExpanded ? " expanded" : ""}`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onZoneClick(section);
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
    >
      <div className="zone__cylinder">
        <WuiTitle as={WuiTitleAs.H2} look={WuiTitleLook.H6} color={titleColor}>
          {title}
        </WuiTitle>

        <WuiTitle
          as={WuiTitleAs.H2}
          look={WuiTitleLook.H6}
          color={titleColor}
          className="zone__title-back"
        >
          {titleBack}
        </WuiTitle>
      </div>

      <ZoneExpanded section={section} onOpenModal={onOpenModal} />
    </div>
  );
};
