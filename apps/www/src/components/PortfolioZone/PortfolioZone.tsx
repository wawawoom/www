import { useTranslation } from "react-i18next";

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

import { useTheme } from "../../context/ThemeContext";
import { Section } from "../../ts/enum/section.enum";
import { Badges } from "../Badges/Badges";

export const PortfolioZone = (props: {
  onOpenModal: (section: Section) => void;
}) => {
  const { onOpenModal } = props;
  const { t } = useTranslation();

  const { theme, getWhiteColor } = useTheme();

  const badgeConfiguration = {
    color: WuiBadgeColor.TRANSPARENT,
    textColor: WuiColorValue.BLUE_0,
    size: WuiBadgeSize.M,
  };

  return (
    <>
      <WuiTitle
        as={WuiTitleAs.H1}
        look={WuiTitleLook.H2}
        color={getWhiteColor()}
      >
        {t("portfolioZone.title")}
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={getWhiteColor()}>
        {t("portfolioZone.intro")}
      </WuiText>

      <Badges
        badges={[
          {
            ...badgeConfiguration,
            label: t("designSystemZone.designTokens"),
          },
          {
            ...badgeConfiguration,
            label: t("designSystemZone.componentArchitecture"),
          },
          {
            ...badgeConfiguration,
            label: t("designSystemZone.systemGovernance"),
          },
          {
            ...badgeConfiguration,
            label: t("designSystemZone.documentation"),
          },
          {
            ...badgeConfiguration,
            label: t("designSystemZone.versioning"),
          },
          {
            ...badgeConfiguration,
            label: t("designSystemZone.crossFunctionalAlignment"),
          },
          {
            ...badgeConfiguration,
            label: t("designSystemZone.figmaFoundations"),
          },
          {
            ...badgeConfiguration,
            label: t("designSystemZone.storybook"),
          },
        ]}
      />

      <WuiText as={WuiTextAs.P} color={getWhiteColor()} size={WuiTextSize.S}>
        {t("portfolioZone.paragraph")}
      </WuiText>

      <WuiLink
        href="/portfolio"
        color={theme === "dark" ? WuiLinkColor.PRIMARY : WuiLinkColor.SECONDARY}
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
