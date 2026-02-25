import { Section } from "../../../../ts/enum/section.enum.ts";
import { DesignSystemZone } from "../DesignSystem/DesignSystem.tsx";
import { FrontEndZone } from "../FrontEnd/FrontEnd.tsx";
import { PortfolioZone } from "../Portfolio/PortfolioZone.tsx";
import { ProfileZone } from "../Profile/ProfileZone.tsx";
import type { ZoneExpandedProps } from "./ZoneExpanded.props.ts";

export const ZoneExpanded = (props: ZoneExpandedProps) => {
  const { section, onOpenModal } = props;

  return (
    <article>
      {section === Section.PROFILE && <ProfileZone onOpenModal={onOpenModal} />}
      {section === Section.DESIGN_SYSTEM && (
        <DesignSystemZone onOpenModal={onOpenModal} />
      )}
      {section === Section.FRONT_END && (
        <FrontEndZone onOpenModal={onOpenModal} />
      )}
      {section === Section.PORTFOLIO && (
        <PortfolioZone onOpenModal={onOpenModal} />
      )}
    </article>
  );
};
