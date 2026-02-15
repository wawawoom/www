import {
  WuiBadge,
  WuiBadgeColor,
  WuiBadgeSize,
  WuiColorAlias,
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

export const WebZone = (props: { onOpenModal: (section: Section) => void }) => {
  const { onOpenModal } = props;

  return (
    <>
      <WuiTitle
        as={WuiTitleAs.H1}
        look={WuiTitleLook.H2}
        color={WuiColorAlias.NEUTRAL_0}
      >
        Web developper
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_0}>
        I design and build scalable, user-centered interfaces using modern web
        frontend technologies.
      </WuiText>

      <WuiText as={WuiTextAs.P} className="badges">
        <WuiBadge
          color={WuiBadgeColor.TRANSPARENT}
          size={WuiBadgeSize.M}
          style={{ color: WuiColorValue.BLUE_200 }}
        >
          React
        </WuiBadge>

        <WuiBadge
          color={WuiBadgeColor.TRANSPARENT}
          size={WuiBadgeSize.M}
          style={{ color: WuiColorValue.BLUE_200 }}
        >
          HTML
        </WuiBadge>

        <WuiBadge
          color={WuiBadgeColor.TRANSPARENT}
          size={WuiBadgeSize.M}
          style={{ color: WuiColorValue.BLUE_200 }}
        >
          CSS
        </WuiBadge>

        <WuiBadge
          color={WuiBadgeColor.TRANSPARENT}
          size={WuiBadgeSize.M}
          style={{ color: WuiColorValue.BLUE_200 }}
        >
          Javascript
        </WuiBadge>

        <WuiBadge
          color={WuiBadgeColor.TRANSPARENT}
          size={WuiBadgeSize.M}
          style={{ color: WuiColorValue.BLUE_200 }}
        >
          TypeScript
        </WuiBadge>

        <WuiBadge
          color={WuiBadgeColor.TRANSPARENT}
          size={WuiBadgeSize.M}
          style={{ color: WuiColorValue.BLUE_200 }}
        >
          NextJs
        </WuiBadge>

        <WuiBadge
          color={WuiBadgeColor.TRANSPARENT}
          size={WuiBadgeSize.M}
          style={{ color: WuiColorValue.BLUE_200 }}
        >
          Storybook
        </WuiBadge>

        <WuiBadge
          color={WuiBadgeColor.TRANSPARENT}
          size={WuiBadgeSize.M}
          style={{ color: WuiColorValue.BLUE_200 }}
        >
          Web Responsive
        </WuiBadge>
      </WuiText>

      <WuiText
        as={WuiTextAs.P}
        color={WuiColorAlias.NEUTRAL_0}
        size={WuiTextSize.S}
      >
        Frontend developer with a background in graphic design, specializing in
        building scalable, consistent, and user-centered applications using
        React, Next.js, and TypeScript. Experienced in developing reusable
        component libraries and design systems with Storybook, ensuring
        efficiency and consistency across products. My dual expertise in design
        and development enables me to bridge the gap between disciplines,
        streamline workflows, and deliver reliable, maintainable, and
        high-quality user interfaces.
      </WuiText>

      <WuiLink
        href="/web"
        color={WuiLinkColor.LIGHT}
        onClick={(event) => {
          event.preventDefault();

          onOpenModal(Section.WEB);
        }}
      >
        Under the hood
      </WuiLink>
    </>
  );
};
