import { useState } from "react";

import {
  WuiBadgeColor,
  WuiBadgeSize,
  WuiButton,
  WuiButtonColor,
  WuiColorAlias,
  WuiColorValue,
  WuiLink,
  WuiLinkColor,
  WuiModal,
  WuiText,
  WuiTextAs,
  WuiTextSize,
  WuiTitle,
  WuiTitleAs,
  WuiTitleLook,
} from "@wawawoom/wui";

import { Section } from "../../../../ts/enum/section.enum";
import { Badges } from "../../../Badges/Badges";

export const DesignSystemZone = (props: {
  onOpenModal: (section: Section) => void;
}) => {
  const { onOpenModal } = props;

  const [openTestModal, setOpenTestModal] = useState(false);

  const badgeConfiguration = {
    color: WuiBadgeColor.TRANSPARENT,
    textColor: WuiColorValue.YELLOW_900,
    size: WuiBadgeSize.M,
  };

  return (
    <>
      <WuiTitle as={WuiTitleAs.H1} look={WuiTitleLook.H2}>
        Design system
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_900}>
        Design systems reduce friction, increase speed, and bring consistency at
        scale — I build the architecture that makes that possible.
      </WuiText>

      <Badges
        badges={[
          {
            ...badgeConfiguration,
            label: "Design Tokens",
          },
          {
            ...badgeConfiguration,
            label: "Component Architecture",
          },
          {
            ...badgeConfiguration,
            label: "System Governance",
          },
          {
            ...badgeConfiguration,
            label: "Documentation",
          },
          {
            ...badgeConfiguration,
            label: "Versioning",
          },
          {
            ...badgeConfiguration,
            label: "Cross-Functional Alignment",
          },
          {
            ...badgeConfiguration,
            label: "Figma Foundations",
          },
          {
            ...badgeConfiguration,
            label: "Storybook",
          },
        ]}
      />

      <WuiText as={WuiTextAs.P} size={WuiTextSize.S}>
        A well-structured design system transforms UI from isolated components
        into a scalable product foundation. I help organizations design,
        implement, and evolve systems that ensure consistency, efficiency, and
        long-term maintainability.
      </WuiText>

      <WuiText as={WuiTextAs.P} size={WuiTextSize.S}>
        My approach starts with strong foundations: design tokens, semantic
        structures, and clearly defined component layers. The objective is not
        only visual alignment, but operational clarity across teams and
        products.
      </WuiText>

      <WuiText as={WuiTextAs.P} size={WuiTextSize.S}>
        I connect Figma foundations to production-ready React libraries,
        ensuring that design intent translates accurately into technical
        reality. From token hierarchies to component APIs and documentation
        environments, every layer is designed to scale.
      </WuiText>

      <WuiText as={WuiTextAs.P} size={WuiTextSize.S}>
        Beyond structure, I establish contribution workflows, versioning
        strategies, and collaboration models that allow the system to evolve
        without fragmentation. The result is a governed, resilient system that
        supports product growth rather than slowing it down.
      </WuiText>

      <WuiLink
        href="/design-system"
        color={WuiLinkColor.LIGHT}
        onClick={(event) => {
          event.preventDefault();

          onOpenModal(Section.DESIGN_SYSTEM);
        }}
      >
        Let’s dive in
      </WuiLink>

      <WuiModal
        open={openTestModal}
        onClose={() => setOpenTestModal(false)}
        title="Modal title"
        footer={
          <WuiButton
            color={WuiButtonColor.DARK}
            onClick={() => setOpenTestModal(false)}
          >
            Close
          </WuiButton>
        }
      >
        <WuiText as={WuiTextAs.P}>Your content here.</WuiText>
      </WuiModal>
    </>
  );
};
