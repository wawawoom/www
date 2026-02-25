import {
  WuiBadgeColor,
  WuiBadgeSize,
  WuiColorValue,
  WuiLink,
  WuiLinkColor,
  WuiText,
  WuiTextAs,
  WuiTextSize,
  WuiTitle,
  WuiTitleAs,
  WuiTitleLook,
} from "@wawawoom/wui";

import { Section } from "../../../../ts/enum/section.enum";
import { Badges } from "../../../Badges/Badges";

export const FrontEndZone = (props: {
  onOpenModal: (section: Section) => void;
}) => {
  const { onOpenModal } = props;

  const badgeConfiguration = {
    color: WuiBadgeColor.TRANSPARENT,
    textColor: WuiColorValue.GREEN_900,
    size: WuiBadgeSize.M,
  };

  return (
    <>
      <WuiTitle as={WuiTitleAs.H1} look={WuiTitleLook.H2}>
        Front end implementation
      </WuiTitle>

      <WuiText as={WuiTextAs.P}>
        Frontend implementation is where design becomes a reliable, scalable
        product layer — I ensure it is robust, maintainable, and aligned with
        system foundations.
      </WuiText>

      <Badges
        badges={[
          {
            ...badgeConfiguration,
            label: "React Architecture",
          },
          {
            ...badgeConfiguration,
            label: "TypeScript",
          },
          {
            ...badgeConfiguration,
            label: "Scalable Components",
          },
          {
            ...badgeConfiguration,
            label: "Performance",
          },
          {
            ...badgeConfiguration,
            label: "Accessibility",
          },
          {
            ...badgeConfiguration,
            label: "Testing Strategy",
          },
          {
            ...badgeConfiguration,
            label: "Mobile",
          },
          {
            ...badgeConfiguration,
            label: "Desktop",
          },
          {
            ...badgeConfiguration,
            label: "Responsive Design",
          },
          {
            ...badgeConfiguration,
            label: "UX Design",
          },
        ]}
      />

      <WuiText as={WuiTextAs.P} size={WuiTextSize.S}>
        Frontend implementation is where design foundations become reliable,
        scalable product interfaces. I ensure that every implementation is
        robust, maintainable, and aligned with system principles defined
        upstream.
      </WuiText>

      <WuiText as={WuiTextAs.P} size={WuiTextSize.S}>
        I build production-grade React architectures based on token-driven
        styling, clear component APIs, and modular structures. Each decision is
        made with long-term maintainability, performance, and accessibility as
        baseline requirements.
      </WuiText>

      <WuiText as={WuiTextAs.P} size={WuiTextSize.S}>
        Interfaces are designed to adapt seamlessly across devices — from mobile
        to tablet, laptop, and large desktop environments. I structure layouts
        and interaction patterns to remain consistent and predictable regardless
        of screen size or context of use.
      </WuiText>

      <WuiText as={WuiTextAs.P} size={WuiTextSize.S}>
        By bridging system thinking and real-world product constraints, I help
        teams ship faster without sacrificing structural integrity. The result
        is a frontend layer that scales with the product rather than becoming a
        source of fragmentation or technical debt.
      </WuiText>

      <WuiLink
        href="/front-end"
        color={WuiLinkColor.LIGHT}
        onClick={(event) => {
          event.preventDefault();

          onOpenModal(Section.FRONT_END);
        }}
      >
        Under the hood
      </WuiLink>
    </>
  );
};
