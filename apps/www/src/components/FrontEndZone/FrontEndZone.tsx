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

import { Section } from "../../ts/enum/section.enum";
import { Badges } from "../Badges/Badges";

export const FrontEndZone = (props: {
  onOpenModal: (section: Section) => void;
}) => {
  const { onOpenModal } = props;
  const { t } = useTranslation();

  const badgeConfiguration = {
    color: WuiBadgeColor.TRANSPARENT,
    textColor: WuiColorValue.GREEN_900,
    size: WuiBadgeSize.M,
  };

  return (
    <>
      <WuiTitle as={WuiTitleAs.H1} look={WuiTitleLook.H2}>
        {t("frontEndZone.title")}
      </WuiTitle>

      <WuiText as={WuiTextAs.P}>{t("frontEndZone.intro")}</WuiText>

      <Badges
        badges={[
          {
            ...badgeConfiguration,
            label: t("frontEndZone.reactArchitecture"),
          },
          {
            ...badgeConfiguration,
            label: t("frontEndZone.typescript"),
          },
          {
            ...badgeConfiguration,
            label: t("frontEndZone.scalableComponents"),
          },
          {
            ...badgeConfiguration,
            label: t("frontEndZone.performance"),
          },
          {
            ...badgeConfiguration,
            label: t("frontEndZone.accessibility"),
          },
          {
            ...badgeConfiguration,
            label: t("frontEndZone.testingStrategy"),
          },
          {
            ...badgeConfiguration,
            label: t("frontEndZone.mobile"),
          },
          {
            ...badgeConfiguration,
            label: t("frontEndZone.desktop"),
          },
          {
            ...badgeConfiguration,
            label: t("frontEndZone.responsiveDesign"),
          },
          {
            ...badgeConfiguration,
            label: t("frontEndZone.uxDesign"),
          },
        ]}
      />

      <WuiText as={WuiTextAs.P} size={WuiTextSize.S}>
        {t("frontEndZone.paragraph1")}
      </WuiText>

      <WuiText as={WuiTextAs.P} size={WuiTextSize.S}>
        {t("frontEndZone.paragraph2")}
      </WuiText>

      <WuiText as={WuiTextAs.P} size={WuiTextSize.S}>
        {t("frontEndZone.paragraph3")}
      </WuiText>

      <WuiText as={WuiTextAs.P} size={WuiTextSize.S}>
        {t("frontEndZone.paragraph4")}
      </WuiText>

      <WuiLink
        href="/front-end"
        color={WuiLinkColor.LIGHT}
        onClick={(event) => {
          event.preventDefault();

          onOpenModal(Section.FRONT_END);
        }}
      >
        {t("frontEndZone.underTheHood")}
      </WuiLink>
    </>
  );
};
