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

export const PortfolioZone = (props: {
  onOpenModal: (section: Section) => void;
}) => {
  const { onOpenModal } = props;
  const badgeColor = WuiColorValue.BLUE_0;

  return (
    <>
      <WuiTitle
        as={WuiTitleAs.H1}
        look={WuiTitleLook.H2}
        color={WuiColorAlias.NEUTRAL_0}
      >
        Selected work
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_0}>
        I design and build scalable, user-centered mobile applications using the
        React native framework.
      </WuiText>

      <WuiText as={WuiTextAs.P} className="badges">
        <WuiBadge
          color={WuiBadgeColor.TRANSPARENT}
          size={WuiBadgeSize.M}
          style={{ color: badgeColor }}
        >
          React Native
        </WuiBadge>

        <WuiBadge
          color={WuiBadgeColor.TRANSPARENT}
          size={WuiBadgeSize.M}
          style={{ color: badgeColor }}
        >
          Google Play store
        </WuiBadge>

        <WuiBadge
          color={WuiBadgeColor.TRANSPARENT}
          size={WuiBadgeSize.M}
          style={{ color: badgeColor }}
        >
          App Store
        </WuiBadge>
      </WuiText>

      <WuiText
        as={WuiTextAs.P}
        color={WuiColorAlias.NEUTRAL_0}
        size={WuiTextSize.S}
      >
        In 2012, on the Hoozin project, I experimented with responsive web
        design and saw its inherent limits. Later, on other projects, I adopted
        React Native: it let me use React—a stack I already knew—to build
        near-native apps for both iOS and Android from one codebase. I went on
        to ship two production mobile apps with two backend developers (REST and
        GraphQL APIs) and was responsible for UI/UX and frontend for both the
        apps and their companion web app.
      </WuiText>

      <WuiLink
        href="/portfolio"
        color={WuiLinkColor.LIGHT}
        onClick={(event) => {
          event.preventDefault();

          onOpenModal(Section.PORTFOLIO);
        }}
      >
        Under the hood
      </WuiLink>
    </>
  );
};
