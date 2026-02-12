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

export const MobZone = (props: { onOpenModal: (section: Section) => void }) => {
  const { onOpenModal } = props;

  return (
    <>
      <WuiTitle
        as={WuiTitleAs.H1}
        look={WuiTitleLook.H2}
        color={WuiColorAlias.NEUTRAL_0}
      >
        React Native developper
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_0}>
        I design and build scalable, user-centered mobile applications using the
        React native framework.
      </WuiText>

      <WuiText as={WuiTextAs.P} className="badges">
        <WuiBadge
          color={WuiBadgeColor.TRANSPARENT}
          size={WuiBadgeSize.M}
          style={{ color: WuiColorValue.PINK_100 }}
        >
          React Native
        </WuiBadge>

        <WuiBadge
          color={WuiBadgeColor.TRANSPARENT}
          size={WuiBadgeSize.M}
          style={{ color: WuiColorValue.PINK_100 }}
        >
          Google Play store
        </WuiBadge>

        <WuiBadge
          color={WuiBadgeColor.TRANSPARENT}
          size={WuiBadgeSize.M}
          style={{ color: WuiColorValue.PINK_100 }}
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
        href="/mob"
        color={WuiLinkColor.LIGHT}
        onClick={(event) => {
          event.preventDefault();

          onOpenModal(Section.MOB);
        }}
      >
        Under the hood
      </WuiLink>
    </>
  );
};
