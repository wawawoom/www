import { Section } from "../../ts/enum/section.enum.ts";
import { DesignSystemZone } from "../DesignSystemZone/DesignSystemZone.tsx";
import { FrontEndZone } from "../FrontEndZone/FrontEndZone.tsx";
import { PortfolioZone } from "../PortfolioZone/PortfolioZone.tsx";
import { ProfileZone } from "../ProfileZone/ProfileZone.tsx";
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
