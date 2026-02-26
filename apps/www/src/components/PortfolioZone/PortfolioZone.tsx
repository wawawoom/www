import { useTranslation } from "react-i18next";

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

import { Section } from "../../ts/enum/section.enum";

export const PortfolioZone = (props: {
  onOpenModal: (section: Section) => void;
}) => {
  const { onOpenModal } = props;
  const { t } = useTranslation();
  const badgeColor = WuiColorValue.BLUE_0;

  return (
    <>
      <WuiTitle
        as={WuiTitleAs.H1}
        look={WuiTitleLook.H2}
        color={WuiColorAlias.NEUTRAL_0}
      >
        {t("portfolioZone.title")}
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_0}>
        {t("portfolioZone.intro")}
      </WuiText>

      <WuiText as={WuiTextAs.P} className="badges">
        <WuiBadge
          color={WuiBadgeColor.TRANSPARENT}
          size={WuiBadgeSize.M}
          style={{ color: badgeColor }}
        >
          {t("portfolioZone.reactNative")}
        </WuiBadge>

        <WuiBadge
          color={WuiBadgeColor.TRANSPARENT}
          size={WuiBadgeSize.M}
          style={{ color: badgeColor }}
        >
          {t("portfolioZone.googlePlayStore")}
        </WuiBadge>

        <WuiBadge
          color={WuiBadgeColor.TRANSPARENT}
          size={WuiBadgeSize.M}
          style={{ color: badgeColor }}
        >
          {t("portfolioZone.appStore")}
        </WuiBadge>
      </WuiText>

      <WuiText
        as={WuiTextAs.P}
        color={WuiColorAlias.NEUTRAL_0}
        size={WuiTextSize.S}
      >
        {t("portfolioZone.paragraph")}
      </WuiText>

      <WuiLink
        href="/portfolio"
        color={WuiLinkColor.LIGHT}
        onClick={(event) => {
          event.preventDefault();

          onOpenModal(Section.PORTFOLIO);
        }}
      >
        {t("portfolioZone.underTheHood")}
      </WuiLink>
    </>
  );
};
