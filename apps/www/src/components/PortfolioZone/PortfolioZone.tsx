import { useTranslation } from "react-i18next";

import {
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

export const PortfolioZone = (props: {
  onOpenModal: (section: Section) => void;
}) => {
  const { onOpenModal } = props;
  const { t } = useTranslation();

  const { theme, getWhiteColor } = useTheme();

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

      <WuiTitle
        as={WuiTitleAs.H2}
        look={WuiTitleLook.H4}
        color={getWhiteColor()}
      >
        {t("portfolioZone.smoodTitle")}
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={getWhiteColor()} size={WuiTextSize.S}>
        {t("portfolioZone.smoodIntro")}
      </WuiText>

      <WuiText as={WuiTextAs.P} color={getWhiteColor()} size={WuiTextSize.S}>
        <ul className="wui-ma-0">
          <li>{t("portfolioZone.smoodBullet1")}</li>
          <li>{t("portfolioZone.smoodBullet2")}</li>
          <li>{t("portfolioZone.smoodBullet3")}</li>
          <li>{t("portfolioZone.smoodBullet4")}</li>
          <li>{t("portfolioZone.smoodBullet5")}</li>
        </ul>
      </WuiText>

      <WuiTitle
        as={WuiTitleAs.H2}
        look={WuiTitleLook.H4}
        color={getWhiteColor()}
      >
        {t("portfolioZone.gtlTitle")}
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={getWhiteColor()} size={WuiTextSize.S}>
        {t("portfolioZone.gtlIntro")}
      </WuiText>

      <WuiText as={WuiTextAs.P} color={getWhiteColor()} size={WuiTextSize.S}>
        <ul className="wui-ma-0">
          <li>{t("portfolioZone.gtlBullet1")}</li>
          <li>{t("portfolioZone.gtlBullet2")}</li>
        </ul>
      </WuiText>

      <WuiTitle
        as={WuiTitleAs.H2}
        look={WuiTitleLook.H4}
        color={getWhiteColor()}
      >
        {t("portfolioZone.stentTitle")}
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={getWhiteColor()} size={WuiTextSize.S}>
        {t("portfolioZone.stentIntro")}
      </WuiText>

      <WuiText as={WuiTextAs.P} color={getWhiteColor()} size={WuiTextSize.S}>
        <ul>
          <li>{t("portfolioZone.stentBullet1")}</li>
          <li>{t("portfolioZone.stentBullet2")}</li>
          <li>{t("portfolioZone.stentBullet3")}</li>
        </ul>
      </WuiText>

      <WuiTitle
        as={WuiTitleAs.H2}
        look={WuiTitleLook.H4}
        color={getWhiteColor()}
      >
        {t("portfolioZone.hoozinTitle")}
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={getWhiteColor()} size={WuiTextSize.S}>
        {t("portfolioZone.hoozinIntro")}
      </WuiText>

      <WuiText as={WuiTextAs.P} color={getWhiteColor()} size={WuiTextSize.S}>
        <ul>
          <li>{t("portfolioZone.hoozinBullet1")}</li>
          <li>{t("portfolioZone.hoozinBullet2")}</li>
          <li>{t("portfolioZone.hoozinBullet3")}</li>
          <li>{t("portfolioZone.hoozinBullet4")}</li>
          <li>{t("portfolioZone.hoozinBullet5")}</li>
        </ul>
      </WuiText>

      <WuiLink
        href="/portfolio"
        color={theme === "dark" ? WuiLinkColor.PRIMARY : WuiLinkColor.SECONDARY}
        onClick={(event) => {
          event.preventDefault();

          onOpenModal(Section.PORTFOLIO);
        }}
      >
        {t("portfolioZone.viewDetails")}
      </WuiLink>
    </>
  );
};
